from __future__ import annotations

import re
from dataclasses import dataclass
from datetime import date
from pathlib import Path


@dataclass(frozen=True)
class TexArchive:
    title: str
    abstract: str
    keywords: str
    body_markdown: str
    source_filename: str


_CMD_SIMPLE_MAP: list[tuple[re.Pattern[str], str]] = [
    (re.compile(r"\\textbf\{([^{}]+)\}"), r"**\1**"),
    (re.compile(r"\\emph\{([^{}]+)\}"), r"*\1*"),
    (re.compile(r"\\texttt\{([^{}]+)\}"), r"`\1`"),
]


def _strip_comments(tex: str) -> str:
    out_lines: list[str] = []
    for line in tex.splitlines():
        if "%" in line:
            prefix = line.split("%", 1)[0]
            out_lines.append(prefix)
        else:
            out_lines.append(line)
    return "\n".join(out_lines)


def _extract_block(tex: str, begin: str, end: str) -> tuple[str, str]:
    start = tex.find(begin)
    if start < 0:
        return "", tex
    start += len(begin)
    stop = tex.find(end, start)
    if stop < 0:
        return tex[start:], tex[: start - len(begin)]
    block = tex[start:stop]
    remaining = tex[: start - len(begin)] + tex[stop + len(end) :]
    return block, remaining


def _extract_preamble_field(tex: str, cmd: str) -> str:
    m = re.search(rf"\\{cmd}\{{([\s\S]*?)\}}", tex)
    if not m:
        return ""
    return m.group(1).strip()


def _cleanup_inline(tex: str) -> str:
    s = tex
    for pattern, repl in _CMD_SIMPLE_MAP:
        s = pattern.sub(repl, s)

    s = re.sub(r"\\href\{([^{}]+)\}\{([^{}]+)\}", r"[\2](\1)", s)
    s = re.sub(r"\\url\{([^{}]+)\}", r"<\1>", s)

    s = re.sub(r"\\\((.*?)\\\)", lambda m: f"${m.group(1).strip()}$", s, flags=re.DOTALL)

    s = re.sub(r"\\cite\{([^{}]+)\}", lambda m: f"[{m.group(1).strip()}]", s)
    s = re.sub(r"\\ref\{([^{}]+)\}", lambda m: f"（见 {m.group(1).strip()}）", s)
    s = re.sub(r"\\label\{([^{}]+)\}", "", s)

    s = s.replace("\\&", "&")
    s = s.replace("\\%", "%")
    s = s.replace("\\_", "_")
    s = s.replace("\\#", "#")

    s = re.sub(r"\s+", " ", s).strip()
    return s


def _convert_math_blocks(tex: str) -> str:
    s = tex
    s = re.sub(r"\\\((.*?)\\\)", lambda m: f"${m.group(1).strip()}$", s, flags=re.DOTALL)
    s = re.sub(r"\\\[(.*?)\\\]", lambda m: f"\n\n$$\n{m.group(1).strip()}\n$$\n\n", s, flags=re.DOTALL)
    s = re.sub(
        r"\\begin\{(equation\*?|align\*?|gather\*?|aligned)\}(.*?)\\end\{\1\}",
        lambda m: f"\n\n$$\n{m.group(2).strip()}\n$$\n\n",
        s,
        flags=re.DOTALL,
    )
    return s


def _convert_lists(tex: str) -> str:
    s = tex
    s = re.sub(r"\\begin\{itemize\}", "\n", s)
    s = re.sub(r"\\end\{itemize\}", "\n", s)
    s = re.sub(r"\\begin\{enumerate\}", "\n", s)
    s = re.sub(r"\\end\{enumerate\}", "\n", s)
    s = re.sub(r"\\item\s+", "- ", s)
    return s


def _convert_headings(tex: str) -> str:
    s = tex
    s = re.sub(r"\\section\{([^{}]+)\}", lambda m: f"\n\n## {_cleanup_inline(m.group(1))}\n\n", s)
    s = re.sub(r"\\subsection\{([^{}]+)\}", lambda m: f"\n\n### {_cleanup_inline(m.group(1))}\n\n", s)
    s = re.sub(r"\\subsubsection\{([^{}]+)\}", lambda m: f"\n\n#### {_cleanup_inline(m.group(1))}\n\n", s)
    return s


def _convert_theorem_like(tex: str) -> str:
    s = tex

    def env_to_block(env: str, label: str) -> None:
        nonlocal s
        pattern = re.compile(rf"\\begin\{{{env}\}}(?:\[([^\]]+)\])?([\s\S]*?)\\end\{{{env}\}}")

        def repl(m: re.Match[str]) -> str:
            title = _cleanup_inline(m.group(1) or "")
            body = m.group(2).strip()
            body = _cleanup_inline(body)
            head = f"**{label}**" + (f"（{title}）" if title else "")
            return f"\n\n> {head}\n>\n> {body}\n\n"

        s = pattern.sub(repl, s)

    env_to_block("assumption", "假设")
    env_to_block("definition", "定义")
    env_to_block("proposition", "命题")
    env_to_block("theorem", "定理")
    env_to_block("corollary", "推论")

    proof_pattern = re.compile(r"\\begin\{proof\}([\s\S]*?)\\end\{proof\}")

    def proof_repl(m: re.Match[str]) -> str:
        body = _cleanup_inline(m.group(1).strip())
        return f"\n\n> **证明**\n>\n> {body}\n\n"

    s = proof_pattern.sub(proof_repl, s)
    return s


def _convert_tables(tex: str) -> str:
    s = tex

    tabular_pattern = re.compile(r"\\begin\{tabular\}\{[^}]*\}([\s\S]*?)\\end\{tabular\}")

    def tabular_repl(m: re.Match[str]) -> str:
        raw = m.group(1)
        raw = raw.replace("\\toprule", "").replace("\\midrule", "").replace("\\bottomrule", "")
        rows = []
        for line in raw.splitlines():
            line = line.strip()
            if not line:
                continue
            if line.endswith("\\\\"):
                line = line[:-2].strip()
            if not line:
                continue
            parts = [_cleanup_inline(p) for p in line.split("&")]
            if all(not p for p in parts):
                continue
            rows.append(parts)

        if not rows:
            return "\n"
        width = max(len(r) for r in rows)
        rows = [r + [""] * (width - len(r)) for r in rows]

        header = rows[0]
        sep = ["---"] * width
        out_lines = [
            "| " + " | ".join(header) + " |",
            "| " + " | ".join(sep) + " |",
        ]
        for r in rows[1:]:
            out_lines.append("| " + " | ".join(r) + " |")
        return "\n" + "\n".join(out_lines) + "\n"

    s = tabular_pattern.sub(tabular_repl, s)
    s = re.sub(r"\\begin\{center\}", "\n", s)
    s = re.sub(r"\\end\{center\}", "\n", s)
    s = re.sub(r"\\centering", "", s)
    s = re.sub(r"\\caption\{([^{}]+)\}", lambda m: f"\n\n> 表：{_cleanup_inline(m.group(1))}\n\n", s)
    s = re.sub(r"\\begin\{table\}[^}]*", "\n", s)
    s = re.sub(r"\\end\{table\}", "\n", s)
    return s


def _convert_bibliography(tex: str) -> str:
    s = tex
    bib_pattern = re.compile(r"\\begin\{thebibliography\}\{[^}]*\}([\s\S]*?)\\end\{thebibliography\}")

    def bib_repl(m: re.Match[str]) -> str:
        block = m.group(1)
        items: list[tuple[str, str]] = []
        current_key = ""
        current_lines: list[str] = []

        for line in block.splitlines():
            line = line.strip()
            if not line:
                continue
            m_item = re.match(r"\\bibitem\{([^}]+)\}", line)
            if m_item:
                if current_key:
                    items.append((current_key, " ".join(current_lines).strip()))
                current_key = m_item.group(1).strip()
                current_lines = []
                continue
            if line.startswith("\\newblock"):
                line = line.replace("\\newblock", "").strip()
            current_lines.append(_cleanup_inline(line))

        if current_key:
            items.append((current_key, " ".join(current_lines).strip()))

        if not items:
            return "\n"

        out = ["\n\n## 参考文献\n"]
        for key, content in items:
            out.append(f"- [{key}] {content}")
        out.append("")
        return "\n".join(out)

    s = re.sub(r"\\bibliographystyle\{[^}]*\}", "", s)
    s = bib_pattern.sub(bib_repl, s)
    return s


def _normalize_whitespace(md: str) -> str:
    s = md
    s = re.sub(r"\n{3,}", "\n\n", s)
    s = re.sub(r"[ \t]+\n", "\n", s)
    return s.strip() + "\n"


def convert_tex_to_markdown(tex: str) -> TexArchive:
    tex = _strip_comments(tex)
    title = _extract_preamble_field(tex, "title")

    body, _ = _extract_block(tex, "\\begin{document}", "\\end{document}")
    abstract_block, body_wo_abs = _extract_block(body, "\\begin{abstract}", "\\end{abstract}")

    keywords = ""
    m_kw = re.search(r"\\textbf\{关键词\}\s*[:：]\s*([^\n]+)", abstract_block)
    if m_kw:
        keywords = _cleanup_inline(m_kw.group(1)).rstrip(".。")
        abstract_block = re.sub(r"\\textbf\{关键词\}\s*[:：]\s*([^\n]+)", "", abstract_block)

    abstract = _cleanup_inline(abstract_block)

    content = body_wo_abs
    content = re.sub(r"\\maketitle", "", content)
    content = re.sub(r"\\appendix", "\n\n## 附录\n\n", content)

    content = _convert_math_blocks(content)
    content = _convert_lists(content)
    content = _convert_tables(content)
    content = _convert_theorem_like(content)
    content = _convert_bibliography(content)
    content = _convert_headings(content)

    content = re.sub(r"\\begin\{[^}]+\}", "", content)
    content = re.sub(r"\\end\{[^}]+\}", "", content)
    content = re.sub(r"\\(usepackage|documentclass|newtheorem)\b[\s\S]*?\n", "", content)

    content = re.sub(r"\\tag\{([^}]+)\}", r"(\1)", content)
    content = re.sub(r"\\mathrm\{([^{}]+)\}", r"\\text{\1}", content)

    content = re.sub(r"\\\\", "\n", content)
    content = _normalize_whitespace(content)
    content = "\n".join(_cleanup_inline(line) if line and not line.startswith(("#", ">", "-", "|")) and not line.startswith("$$") else line for line in content.splitlines())
    content = _normalize_whitespace(content)

    return TexArchive(
        title=_cleanup_inline(title) if title else "TeX 归档",
        abstract=abstract,
        keywords=keywords,
        body_markdown=content,
        source_filename="",
    )


def _truncate_description(text: str, limit: int = 120) -> str:
    s = re.sub(r"\s+", " ", (text or "").strip())
    if not s:
        return "TeX 归档文本。"
    if len(s) <= limit:
        return s
    return s[:limit].rstrip() + "…"


def write_post(
    archive: TexArchive,
    out_path: Path,
    *,
    post_date: date,
    source_url: str | None,
) -> None:
    description = _truncate_description(archive.abstract)
    kw_list = []
    for part in re.split(r"[;；,，]\s*", archive.keywords or ""):
        p = part.strip()
        if p:
            kw_list.append(p)

    tags = [
        "推荐系统",
        "统一架构",
        "序列建模",
        "特征交互",
        "Transformer",
        "信息论",
        "论文",
        "存档",
        "TeX",
    ]
    for kw in kw_list:
        if kw not in tags and len(tags) < 14:
            tags.append(kw)

    tag_block = "\n".join([f"  - {t}" for t in tags])
    md = (
        "---\n"
        f"title: {archive.title}（TeX归档）\n"
        f"date: '{post_date.isoformat()}'\n"
        "category: Ecommerce\n"
        "tags:\n"
        f"{tag_block}\n"
        "description: >-\n"
        f"  {description}\n"
        "---\n\n"
        "> 说明：本文由 TeX 源文件自动转换生成，公式与排版可能存在差异；以 TeX/PDF 原件为准。\n\n"
        f"> 原始文件名：`{archive.source_filename}`\n"
    )

    if source_url:
        md += f"> 源文件下载：{source_url}\n\n"
    else:
        md += "\n"

    md += "---\n\n"

    if archive.abstract:
        md += "## 摘要\n\n" + archive.abstract.strip() + "\n\n"
    if archive.keywords:
        md += "## 关键词\n\n" + archive.keywords.strip() + "\n\n"

    md += archive.body_markdown
    md += "\n---\n\n"
    md += f"{post_date.year}年{post_date.month}月{post_date.day}日\n"

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(md, encoding="utf-8")


if __name__ == "__main__":
    repo_root = Path(__file__).resolve().parents[1]
    tex_path = Path(
        r"D:\Phaenarete Project\Towards Unifying Sequence Modeling and Feature Interaction for Large-scale Recommendation\deepseek_latex_20260327_4e5046.tex"
    )
    tex = tex_path.read_text(encoding="utf-8")
    archive = convert_tex_to_markdown(tex)
    archive = TexArchive(
        title=archive.title,
        abstract=archive.abstract,
        keywords=archive.keywords,
        body_markdown=archive.body_markdown,
        source_filename=tex_path.name,
    )

    post_date = date(2026, 3, 27)
    slug = "unirec-unifying-sequence-modeling-feature-interaction-archive"
    out_post = repo_root / "src" / "content" / "posts" / f"{slug}.md"

    archive_tex_filename = "unirec-sequence-modeling-feature-interaction-unified-architecture.tex"
    public_tex = repo_root / "public" / "archives" / "unirec" / archive_tex_filename
    public_tex.parent.mkdir(parents=True, exist_ok=True)
    public_tex.write_text(tex, encoding="utf-8")

    source_url = f"https://liang.world/archives/unirec/{archive_tex_filename}"
    archive = TexArchive(
        title=archive.title,
        abstract=archive.abstract,
        keywords=archive.keywords,
        body_markdown=archive.body_markdown,
        source_filename=archive_tex_filename,
    )
    write_post(archive, out_post, post_date=post_date, source_url=source_url)
