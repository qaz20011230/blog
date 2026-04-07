from __future__ import annotations

import re
from dataclasses import dataclass
from datetime import date
from pathlib import Path

from pypdf import PdfReader


@dataclass(frozen=True)
class PdfArchive:
    title: str
    abstract: str
    keywords: str
    body_markdown: str
    pages: int
    source_filename: str


def _clean_line(line: str) -> str:
    line = line.replace("\u00a0", " ")
    return re.sub(r"[ \t]+", " ", line).strip(" \t")


def _is_page_number_line(line: str) -> bool:
    s = line.strip()
    return bool(re.fullmatch(r"\d{1,4}", s))


def _promote_headings(lines: list[str]) -> list[str]:
    out: list[str] = []
    section_re = re.compile(r"^(\d+(?:\.\d+)*)\s+(.+)$")
    for raw in lines:
        line = _clean_line(raw)
        if not line:
            out.append("")
            continue
        if _is_page_number_line(line):
            continue
        if line in {"摘要", "关键词", "关键词：", "关键词:"}:
            out.append(f"## {line.rstrip('：:')}")
            continue

        m = section_re.match(line)
        if m:
            index = m.group(1)
            title = m.group(2).strip()
            try:
                first_num = int(index.split(".", 1)[0])
            except ValueError:
                first_num = 0
            if first_num > 100:
                out.append(line)
                continue
            depth = index.count(".")
            hashes = "##" if depth == 0 else "###" if depth == 1 else "####" if depth == 2 else "#####"
            out.append(f"{hashes} {index} {title}")
            continue

        out.append(line)
    return out


def _extract_first_page_metadata(first_page_text: str) -> tuple[str, str, str]:
    lines = [l for l in (first_page_text or "").splitlines()]

    top_title_lines: list[str] = []
    for raw in lines[:30]:
        line = _clean_line(raw)
        if not line:
            continue
        if "@" in line:
            break
        if line.startswith("20") and "年" in line:
            break
        if line in {"摘要", "关键词", "关键词：", "关键词:"}:
            break
        if re.search(r"\bAbstract\b", line, flags=re.IGNORECASE):
            break
        if re.search(r"\bKeywords?\b", line, flags=re.IGNORECASE):
            break
        if len(line) <= 2:
            continue
        top_title_lines.append(line)
        if len("".join(top_title_lines)) >= 10 and len(top_title_lines) >= 2:
            break

    title = "".join(top_title_lines).strip()
    title = re.sub(r"\s+", "", title)

    full = "\n".join(lines)
    abstract = ""
    keywords = ""

    m_abs = re.search(r"摘要\s*\n(.+?)(?:\n关键词\s*[:：]?\s*|\n关键词\s*\n)", full, flags=re.DOTALL)
    if m_abs:
        abstract = m_abs.group(1).strip()

    m_kw = re.search(r"关键词\s*[:：]\s*(.+?)(?:\n\s*\n|\n\d+\s|$)", full, flags=re.DOTALL)
    if m_kw:
        keywords = m_kw.group(1).strip()

    abstract = re.sub(r"\s+", " ", abstract)
    keywords = re.sub(r"\s+", " ", keywords)
    keywords = re.split(r"[∗†]", keywords)[0].strip()
    keywords = keywords.replace(" ", "")
    keywords = keywords.replace("信\u0020息论", "信息论")
    keywords = keywords.rstrip(".。")

    return title, abstract, keywords


def extract_pdf_as_markdown(pdf_path: Path) -> PdfArchive:
    reader = PdfReader(str(pdf_path))
    pages = len(reader.pages)
    page_texts: list[str] = []
    for page in reader.pages:
        page_texts.append(page.extract_text() or "")

    first_title, abstract, keywords = _extract_first_page_metadata(page_texts[0] if page_texts else "")

    merged_lines: list[str] = []
    for text in page_texts:
        merged_lines.extend(text.splitlines())
        merged_lines.append("")

    body_lines = _promote_headings(merged_lines)
    start_idx = 0
    for i, line in enumerate(body_lines):
        if line.startswith("## 1 "):
            start_idx = i
            break
    body_markdown = "\n".join(body_lines[start_idx:]).strip() + "\n"

    title = first_title or pdf_path.stem
    title = title.strip()
    if "PDF" not in title and "归档" not in title:
        title = f"{title}（PDF归档）"

    return PdfArchive(
        title=title,
        abstract=abstract,
        keywords=keywords,
        body_markdown=body_markdown,
        pages=pages,
        source_filename=pdf_path.name,
    )


def _truncate_description(text: str, limit: int = 120) -> str:
    s = re.sub(r"\s+", " ", (text or "").strip())
    if not s:
        return "PDF 归档文本（由 PDF 自动抽取生成）。"
    if len(s) <= limit:
        return s
    return s[:limit].rstrip() + "…"


def write_post_markdown(archive: PdfArchive, out_path: Path, *, post_date: date) -> None:
    description = _truncate_description(archive.abstract)
    kw_list = []
    for part in re.split(r"[;；,，]\s*", archive.keywords or ""):
        p = part.strip()
        if p:
            kw_list.append(p)

    tags = [
        "推荐系统",
        "E-Commerce",
        "统一架构",
        "序列建模",
        "特征交互",
        "论文",
        "存档",
    ]
    for kw in kw_list:
        if kw not in tags and len(tags) < 14:
            tags.append(kw)

    tag_block = "\n".join([f"  - {t}" for t in tags])
    post = (
        "---\n"
        f"title: {archive.title}\n"
        f"date: '{post_date.isoformat()}'\n"
        "category: Ecommerce\n"
        "tags:\n"
        f"{tag_block}\n"
        "description: >-\n"
        f"  {description}\n"
        "---\n\n"
        "> 说明：本文由 PDF 文本自动抽取生成，公式与排版可能存在差异；以原 PDF 为准。\n\n"
        f"> 原始文件名：`{archive.source_filename}`\n"
        f"> 页数：{archive.pages}\n\n"
        "---\n\n"
    )

    if archive.abstract:
        post += "## 摘要\n\n" + archive.abstract.strip() + "\n\n"
    if archive.keywords:
        post += "## 关键词\n\n" + archive.keywords.strip() + "\n\n"

    post += "## 正文（自动抽取）\n\n" + archive.body_markdown + "\n---\n\n"
    post += f"{post_date.year}年{post_date.month}月{post_date.day}日\n"

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(post, encoding="utf-8")


if __name__ == "__main__":
    pdf_path = Path(
        r"D:\Phaenarete Project\Towards Unifying Sequence Modeling and Feature Interaction for Large-scale Recommendation\deepseek_latex_20260327_4e5046.pdf"
    )
    post_date = date.today()
    archive = extract_pdf_as_markdown(pdf_path)
    slug = "unirec-unifying-sequence-modeling-feature-interaction-archive"
    out_path = Path(__file__).resolve().parents[1] / "src" / "content" / "posts" / f"{slug}.md"
    write_post_markdown(archive, out_path, post_date=post_date)
