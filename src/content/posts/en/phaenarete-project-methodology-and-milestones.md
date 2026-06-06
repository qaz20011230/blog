---
title: "On the Methodological Foundations and Milestones of the Phaenarete Project"
date: '2026-03-20'
category: AI & Technology
tags:
  - Phaenarete
  - mathematics
  - methodology
description: >
This article is addressed to researchers in mathematics and computer science, aiming to clarify in technical language the methodological core, engineering architecture, and milestone deliverables of the Phaenarete Project. We will focus on three questions: what we are doing, why we are doing it now, and how we judge whether we have succeeded.
---

## Preface

This article is addressed to researchers in mathematics and computer science, aiming to clarify in technical language the methodological内核, engineering architecture, and milestone deliverables of the Phaenarete Project. We will focus on three questions: what we are doing, why we are doing it now, and how we judge whether we have succeeded.

We do not回避 one fact: the probability that the Riemann Hypothesis will be证明 within this project's周期 is extremely low. But we equally do not回避 another fact: the current moment is the best窗口期 for building "human-AI collaborative mathematical research infrastructure," and analytic number theory—particularly the core problem cluster围绕 the distribution of zeros of the $\zeta$ function—is the ideal试金石 for testing this infrastructure.

Choosing the hardest problem is not because we are自信 we can solve it, but because only the hardest problems can暴露 all the defects of the infrastructure.

---

## I. The Structure of the Problem: Why RH Is Difficult

Researchers初次 encountering the Riemann Hypothesis easily understand it as an isolated proposition. But 166 years of research history indicate that RH is actually the焦点 of a problem network, whose difficulty stems from the交汇 of multiple deep structures.

**Analytic dimension.** The distribution of zeros of the $\zeta$ function is本质上 a problem of精细 estimation concerning Dirichlet series. This线索 begins with Hardy's 1914 proof that infinitely many zeros lie on the critical line, proceeds through Selberg's 1940s proof that a正比例 of zeros lie on the critical line, to Guth and Maynard's 2024 improvement of zero-density estimates using decoupling技术—the core tools始终 being harmonic analysis and large-value estimates. Each step耗费 decades; each step melts only a一角 of the iceberg.

**Algebraic-geometric dimension.** Weil's 1949 analogous conjecture for $\zeta$ functions over finite fields was最终证明 by Deligne in 1974. Gaitsgory et al.'s 2024 proof of the geometric Langlands conjecture (approximately 800 pages, completed by 9 mathematicians collaborating) further打通 the通道 between automorphic forms and geometric objects. But from geometric Langlands to number-theoretic Langlands, and then to RH, there仍然 exists a巨大鸿沟 from characteristic 0 to $\mathbb{Z}$.

**Spectral dimension.** In 1972, at a tea party in Princeton, Montgomery described to Dyson the pair correlation of $\zeta$ function zero spacings; Dyson immediately指出 that this matches the eigenvalue spacings of GUE random matrices. This偶然发现 opened a half-century-long对话 between number theory and random matrix theory. Connes's noncommutative geometry program attempted to provide an operator-theoretic framework for this connection, but至今 has not delivered a complete spectral解释.

Deep connections exist among these three dimensions, but目前 no single framework can统一 them. This is precisely the core difficulty of RH, and the reason we chose it as an infrastructure stress test.

---

## II. A Calm Assessment of the Current Technical Window

### 2.1 Guth-Maynard: A Methodological Demonstration

In 2024, Larry Guth and James Maynard published new results on large-value estimates for Dirichlet polynomials. They引入 Bourgain-Demeter's $\ell^2$ decoupling theorem into analytic number theory, achieving an improvement in zero-density estimates—substantive progress unseen in that direction for decades since Ingham's classical work.

The methodological significance of this进展 outweighs its numerical significance. It证明 that modern tools of harmonic analysis can effectively act upon classical analytic number theory problems. But we must指出 its limitations:

- decoupling技术 suffers essential efficiency衰减 as $\sigma \to 1/2^+$; this is not a technical detail, but because the structural特征 of zero distribution near the critical line is incompatible with the frequency separation假设 that decoupling relies upon.
- The history of zero-density estimates indicates that every substantive improvement requires new conceptual input, rather than parameter微调 of existing methods.

Our positioning: formalize其 core techniques, understand其 boundaries, rather than期望 linear extrapolation through compute堆砌.

### 2.2 Yitang Zhang's Landau-Siegel Work

In 2022, Yitang Zhang released a预印本 on the Landau-Siegel zero problem, claiming to prove that Dirichlet L-functions have no abnormal zeros near $s=1$. If valid, this would be the first跨越 from exponential to polynomial scale on this problem.

It must be honestly指出 that: as of this article's writing, the paper's peer review has not been completed, and the mathematical community has not yet reached共识 on its completeness and correctness. When we引用 this work in the project, we will strictly区分 "published预印本" from "results确认 through peer review."

Even if the result is最终确认, extending其 techniques to complex zeros still faces fundamental障碍. The core of Zhang's method依赖于 the arithmetic properties of $L(1, \chi)$—particularly其 connection with the class number formula—properties that have no direct类比 at $\text{Re}(s) = 1/2$.

Our positioning: formalize the core lemmas in其 argument that can be independently验证, precisely刻画 the mathematical structures where extension受阻, and record the obstacles themselves as knowledge assets.

### 2.3 Rodgers-Tao: The de Bruijn-Newman Constant

During 2018-2020, Brad Rodgers and Terence Tao proved that the de Bruijn-Newman constant $\Lambda \geq 0$. This result makes the Riemann Hypothesis等价 to $\Lambda = 0$, i.e., a precise numerical equality.

This equivalent form is conceptually优美, but technically does not降低 the problem's difficulty—proving a constant恰好 equals zero is通常 more difficult than proving其 sign. However, it provides a clear objective function for numerical exploration, which has潜在 value for PrimeClaw's Explorer agent.

### 2.4 Geometric Langlands

In 2024, the team led by Dennis Gaitsgory (including Raskin, Rozenblyum, and 7 others, totaling 9 mathematicians) released a complete proof of the geometric Langlands conjecture,总计 approximately 800 pages. This work打通 the deep logic from D-modules to stacks.

But we should not overestimate其 direct impact on RH. Geometric Langlands handles the function field case over characteristic 0, while RH关心 arithmetic over $\mathbb{Z}$. The "arithmetization" from前者 to后者 is one of the most difficult unsolved problems in the Langlands program. We将其视为 an important node in PrimeClaw's knowledge graph, not a primary attack direction.

---

## III. An Honest Assessment of AI Capabilities

### 3.1 Verified Capability Boundaries

During 2024-2026, AI achieved several milestone-level进展 in mathematical reasoning. We evaluate each one's relevance to this project:

**Formalized proof search.** In 2024, DeepMind's AlphaProof system solved 4 out of 6 problems at the International Mathematical Olympiad (IMO 2024), reaching silver medal水平. Its core architecture combines language models with Lean 4 formal verification, training proof search strategies through reinforcement learning. This证明 that AI has reached a usable水平 in competition-level formalized reasoning.

But there exists an essential差异 between IMO problems and research-level mathematics:前者 have definite solutions and bounded search spaces;后者 may have unknown existence of solutions and unbounded search spaces. AlphaProof's success cannot be linearly extrapolated to RH-level problems.

**Mathematical intuition of large models.** Terence Tao has stated on multiple occasions that he has adopted AI as a daily research辅助 tool, for quickly testing conjectures, generating counterexamples, and searching literature for相关 results. This "AI as a junior collaborator"模式 is the direct inspiration for our PrimeClaw design.

**Autoformalization.** The ability to翻译 natural-language mathematics into formalized proofs is rapidly提升, but still insufficient at the frontier research level. Autoformalization of mature theories (such as undergraduate-level real analysis) is基本上 usable; autoformalization of frontier techniques (such as refined versions of decoupling estimates) still requires大量 manual intervention.

### 3.2 Unverified Capabilities

- **Conceptual innovation.** There is no证据 that AI can independently发明 new mathematical concepts or frameworks. Guth-Maynard's引入 of decoupling into analytic number theory—this kind of cross-domain conceptual迁移 remains human-exclusive.
- **Long-range proof planning.** AI excels at局部 reasoning, but has no令人信服 cases for long-range planning requiring hundreds of steps跨越 multiple sub-fields.
- **Failure diagnosis.** AI can尝试大量 paths and报告 failures, but提炼 the structural causes of failure still requires human intervention.

### 3.3 Our Usage Principles

Based on the above assessment, PrimeClaw's design philosophy is: let AI do what AI擅长, let humans do what humans擅长, and use engineering architecture to ensure接口 clarity.

Humans are responsible for: selecting attack paths, providing high-dimensional intuition, evaluating mathematical significance, diagnosing failure causes.

AI is responsible for: large-scale lemma search and generation, formalized translation, parameter space scanning,组合 and variant generation of known techniques, formalized verification.

Engineering architecture is responsible for: ensuring AI output passes formalized verification before entering the knowledge base, managing uncertainty through confidence-level分级, recording complete logs of all exploration paths.

---

## IV. PrimeClaw Technical Architecture

### 4.1 Four-Agent Collaboration

PrimeClaw consists of four specialized agents:

**Archivist (Knowledge Agent).** Maintains a semantic knowledge graph, whose nodes are mathematical concepts, theorems, and techniques, and whose edges are logical dependencies, analogous relationships, and known obstacles. Input sources include arXiv预印本, Mathlib updates, and project internal exploration logs. Daily incremental updates.

**Explorer (Exploration Agent).** Based on Monte Carlo Tree Search (MCTS), generates candidate lemmas, conjecture variants, and analogous mappings under knowledge graph constraints. Its output is标记 with confidence intervals, not binary judgments. Explorer is allowed to "make mistakes"—its value lies not in每次 output being correct, but in覆盖 a sufficiently large search space.

**Prover (Proof Agent).** Receives Lean 4 tactic skeletons translated by the Formalizer, attempts to fill `sorry` placeholders to generate complete proofs. Core technique is the combination of fine-tuned code generation models with Lean 4 tactic search.

**Sentinel (Verification Agent).** The only component in the entire system that does not use probabilistic models. It invokes the Lean 4 kernel type checker to perform deterministic验证 on Prover's output. Propositions passing Sentinel have其 correctness guaranteed by Lean 4's type theory, not依赖于 any AI model's confidence level.

### 4.2 Autoformalization Intermediary Layer (Formalizer)

This is the most critical and most fragile环节 in the architecture.

Explorer's output is通常 informal (e.g., "apply Cauchy-Schwarz to this Dirichlet polynomial, then use the large sieve to control the remainder"). Directly handing this to Prover for Lean 4 implementation would cause cascade failures due to implicit假设暴露, "obvious" steps requiring expansion, and type mismatches.

Formalizer's职责 is to standardize this translation process: receiving Explorer's pseudocode output, generating Lean 4 tactic skeletons with `sorry` placeholders, then由 Prover fills them.

Current assessment: on mature theories, translation success rate is基本上 usable; on frontier research, success rate is不足. This is the key engineering bottleneck for the first 6 months of the project. We have designed a manual fallback mechanism—when auto-translation fails, Lean 4 engineers manually complete关键 steps.

### 4.3 Confidence-Bounded Types

The confidence-bounded type system引入 by Turn-Lang provides PrimeClaw with a formalized framework for managing uncertainty:

- **Proven (confidence = 1.0).** Verified by the Lean 4 kernel. The only level that can be无条件引用 by downstream proofs.
- **Bounded (confidence ∈ $[c_1, c_2]$).** Verified numerically or heuristically检验 but not formally证明. Can be引用, but the引用方 automatically inherits其 confidence upper bound, ensuring that uncertainty propagation is显式 trackable.
- **Speculative (confidence undefined).** Explorer's raw conjectures. Cannot be引用 by any proof; serves仅 as search direction hints.

Engineering implementation依赖于 Lean 4's tactic framework. We have designed custom `oracle` tactics for Bounded types, invoking external oracles and包装 results as items标记 with confidence levels. The compiler追踪 confidence propagation chains during type checking, ensuring that最终 output contains no unresolved Bounded dependencies.

---

## V. Milestones and Deliverables

### Phase 1 (Months 1-6): Infrastructure Building

**Deliverables:**

1. **Lean4 Analytic Number Theory Foundation Library v0.1.** Coverage: Euler-Maclaurin summation formula, Perron's formula及 variants, large sieve inequalities (Bombieri-type), Dirichlet polynomial mean-value theorems, $\zeta$ function basic analytic properties (functional equation, classical zero-free regions). Target: no fewer than 200 verified lemmas.

2. **PrimeClaw Prototype v0.1.** Four-agent basic framework setup complete. Acceptance标准: on at least 3 non-trivial but known analytic number theory propositions, complete the full pipeline from natural language input to Lean 4 proof output.

3. **Knowledge Graph v0.1.** Coverage of analytic number theory core literature (approximately 200 key papers), nodes包含 formalization status markers.

### Phase 2 (Months 7-12): Technical Breakthrough

**Deliverables:**

1. **Formalization of Guth-Maynard core estimates.** Strategy:优先 formalize the logical skeleton of the paper (dependency relationships between关键 propositions),逐步 filling in technical details. Even if 100% completion is not achievable, the skeleton本身 will precisely揭示 where current formalization tools' bottlenecks lie.

2. **Zero-density estimate parameter exploration report.** Using Explorer to systematically search for parameter improvements within the Guth-Maynard framework. Honest expectation: most likely will not find substantive improvements. But the search process will generate大量 formalized records about "why certain parameter combinations don't work," released as structured public data.

3. **Turn-Lang Compiler Prototype v0.1.** Supporting basic functor mappings from meta-language to CIC. Acceptance标准: at least 10 propositions correctly compile to Lean 4 code and pass type checking.

### Phase 3 (Months 13-18): Expansion and Integration

**Deliverables:**

1. **Lean 4 Formalization Library v1.0.** No fewer than 500 verified lemmas, submitted for Mathlib review, open-sourced under MIT license.

2. **PrimeClaw v1.0.** Complete system,附 technical documentation and usage guide, open-source release.

3. **Spectral dimension exploration report.** Generating formalizable-verified conjecture variants in the random matrix and spectral theory directions.

4. **Turn-Lang Compiler v0.5.** Supporting runtime oracles for confidence-bounded types.

5. **"Exploration Log" complete collection.** Complete records of all paths (successes and failures),包含 natural language descriptions, formalization status, failure cause analysis, relevant literature citations.

6. **Final evaluation report.** Honest assessment of exploration progress across the three major dimensions, clearly stating which directions值得后续 investment and which should be放弃.

---

## VI. Team and Governance

### 6.1 Core Team

- **Liangzhi (Project Lead).** Overall architecture design, Turn-Lang development, resource coordination.
- **Travor Liu (Chief Mathematician).** Stanford University PhD student, mathematical direction judgment, critical path selection.
- **2-3 full-time formalization engineers (to be hired).** Translating mathematical insights into Lean code, maintaining Prover and Sentinel.

### 6.2 Advisory Team and Participation Mechanism

We will not pretend that academicians are reviewing code every week. Advisors' value lies in strategic direction oversight, not daily technical participation.

- **Academician Liu Jianya, Academician Sun Binyong.** Monthly written consultation (no more than 5 pages of technical摘要), quarterly video evaluation.
- **Professor Yuri Matiyasevich.** On-demand email consultation, targeting specific technical questions in the Diophantine direction.
- **Professor Yitang Zhang.** Honorary advisor; participation primarily体现在 the project's formalization of其 work.

### 6.3 Quality Control

Four-layer mechanism:
- **Automatic layer**: Sentinel performs Lean 4 type checking on all formalized output, non-bypassable.
- **Engineering layer**: Weekly code交叉 review.
- **Mathematical layer**: Travor Liu evaluates the mathematical significance of all propositions entering the库.
- **Strategic layer**: Monthly advisor反馈, quarterly全体 evaluation.

---

## VII. Risk Register

| Risk | Probability | Impact | Mitigation |
|------|------|------|----------|
| Formalization工作量 exceeds expectations | High | Phase 1 delay | Prioritize formalizing logical skeletons; collaborate with Mathlib community |
| Formalizer效率 insufficient | Medium-High | Explorer→Prover pipeline堵塞 | Dedicated optimization + manual fallback mechanism |
| Turn-Lang engineering延迟 | Medium | Phase 2 deliverables缩水 | Decouple from PrimeClaw主线, ensure独立 operation |
| All mathematical paths受阻 | High | Zero mathematical results | Deliverables已 decoupled from "proving RH"; systematic recording of failure itself is core产出 |
| Critical personnel or funding中断 | Low-Medium | Project缩减 or termination | All code and data open-sourced from day one |

Regarding the risk of "all mathematical paths受阻," we need to be particularly坦诚: this is the most likely outcome. RH has remained未解 for 166 years not because predecessors were不够聪明 or tools不够 advanced, but because it may require mathematics that has not yet been发明. Our project cannot guarantee发明 such mathematics, but can guarantee: if it exists within our search space, PrimeClaw has the ability to find it; if it does not, we will precisely record the boundaries of the search space, saving time for those who come later.

---

## VIII. Open Science Commitments

The following commitments are无条件:

1. All code open-sourced under MIT license, hosted on GitHub.
2. All formalization libraries submitted for Mathlib review.
3. All exploration logs (including失败 paths) released as structured public data.
4. Quarterly progress reports公开 on the project website, containing honest records of successes and failures.
5. All papers published via arXiv预印本, with no access restrictions.

In mathematical research, "we tried it, it doesn't work, and here is why" has同等 knowledge value as "we proved it." The前者 may even be more valuable, because it helps subsequent researchers avoid repeated labor.

---

## IX. Why We Still Do It

Researchers reading到这里 may ask: since you yourselves承认 that RH will most likely not be证明, why still do it?

Three reasons.

First, the value of infrastructure is独立 of RH. Lean 4 formalization libraries for analytic number theory are目前 nearly空白. Formalized content in Mathlib directly相关 to the $\zeta$ function is extremely limited. Regardless of whether RH is触及, a formalization library containing 500+ core lemmas is a substantive contribution to the entire number theory community.

Second, the value of methodology is独立 of RH. PrimeClaw's "four-agent collaboration + confidence-level分级 + formalized verification" architecture, if证明 usable under RH-level stress testing, can迁移 to any mathematical research problem. We are building not a key that can only open one door, but a set of forging tools that can be used反复.

Third, the record of failure itself is knowledge. Throughout mathematical history, many major breakthroughs建立 upon predecessors' systematic排除 of erroneous paths. Lakatos in *Proofs and Refutations*指出 that mathematical progress comes not only from correct proofs, but also from deep understanding of errors. The "Exploration Log" we承诺 to publicly release—containing formalized records of each failed path, structural analysis of failure causes, and precise刻画 of search space boundaries—will become a navigation chart for subsequent researchers.

The common指向 of these three reasons is: the success标准 of the Phaenarete Project is not "whether RH was证明," but "whether sustainable-use assets were left for the mathematical community."

---

## X. Self-Reflection on Narrative

We recognize that the project's early promotional texts used大量 rhetorical language—引用 of Kennedy's moon-landing speech, "historical singularity"措辞, "infinite computing power of thought" and similar expressions. Such language has其 role in激发 public interest, but in academic contexts may产生 counter-effects.

Mathematicians are naturally警惕 toward narratives of "claiming to攻克 RH"; this警惕 is healthy. History is不乏 attempts claiming to prove RH, the vast majority of which rapidly瓦解 under expert review. We do not wish to be归类 in this category.

Therefore, we hereby clarify the narrative boundaries of this project:

- We do not claim to拥有 a path to proving RH. What we拥有 is a systematic method for exploring paths.
- We do not claim that AI can独立 solve RH. What we claim is that AI can significantly加速 formalized verification and lemma search, thereby提高 human mathematicians' exploration efficiency.
- We do not claim that there will be mathematical breakthroughs after 18 months. What we claim is that after 18 months there will be a set of verifiable infrastructure deliverables.

If these deliverables ultimately促成 some mathematical advancement in a certain direction—even a微小的 improvement—that would be additional收获, not a预设 commitment.

---

## XI. An Invitation to Peers

The Phaenarete Project has been an open project from day one. We invite researchers from the following directions to participate:

**Analytic number theory direction.** If you are familiar with zero-density estimates, large-value conjectures, or the fine structure of Dirichlet polynomials, we need your professional judgment to校准 Explorer's search direction. Even merely指出 "this direction is not值得 exploring, because..." has巨大 value for us.

**Formalized mathematics direction.** If you have Lean 4 (or other proof assistant) development experience, our formalization library needs contributors. We have设立 a bounty pool, providing financial rewards to contributors who complete the formalization of specific lemmas. The specific lemma list will be持续 updated on the project's GitHub page.

**AI and machine learning direction.** If you have experience in neural theorem proving, autoformalization, or large-model mathematical reasoning, every component of PrimeClaw has optimization space. Formalizer's translation efficiency is the most紧迫 engineering bottleneck currently.

**Philosophy of mathematics direction.** The confidence-bounded type system引发 a series of epistemological questions: in what sense is a "proof"依赖于 a probabilistic oracle still a proof? Does formalized verification change the本质 of mathematical truth? We welcome thinking and criticism in these directions.

All contributions will receive明确 attribution on the project website and in相关 papers. We believe that the future of mathematical research belongs to open collaboration, not封闭 competition.

---

## XII. Technical Appendix: Formalization of the North Star Proposition

To ensure the PrimeClaw system has a统一 formalized target, we write the Riemann Hypothesis as a proposition in Lean 4. This code is the project's engineering起点—we write the goal clearly and testably, but do not伪装 it as a completed theorem.

```lean
import Mathlib.Analysis.SpecialFunctions.Complex.Log
import Mathlib.Analysis.Complex.Basic

open Complex

/-!
# Phaenarete Project: Riemann Hypothesis — North Star Proposition

This file defines the Riemann Hypothesis as a formal Lean 4 proposition.
It serves as the project's engineering anchor: a machine-checkable goal
that all subsystems orient toward, without claiming any progress on its proof.

## Design Notes

- `riemannZeta` is declared as an axiom pending Mathlib's complete
  formalization of the analytic continuation of ζ(s).
- The statement restricts to the critical strip 0 < Re(s) < 1,
  excluding trivial zeros at negative even integers.
- This file compiles cleanly and contains zero `sorry`.
-/

/--
Placeholder for the Riemann zeta function, analytically continued
to the entire complex plane (except s = 1).

This axiom will be replaced by a concrete definition once Mathlib
provides a complete formalization of the meromorphic continuation.
-/
axiom riemannZeta : ℂ → ℂ

/--
**Riemann Hypothesis** (conjecture):

Every non-trivial zero of the Riemann zeta function lies on the
critical line Re(s) = 1/2. Equivalently, if ζ(s) = 0 and
0 < Re(s) < 1, then Re(s) = 1/2.
-/
def RiemannHypothesis : Prop :=
  ∀ s : ℂ, riemannZeta s = 0 →
    0 < s.re → s.re < 1 →
    s.re = 1 / 2

#check RiemannHypothesis
```

This proposition本身 contains no mathematical content—it is merely a type signature. But its existence ensures that all components of the project's output最终 point toward the same formalized target. When Mathlib completes the formalization of the $\zeta$ function's analytic continuation, `axiom riemannZeta` will be替换 by a concrete definition, at which point this proposition will获得 complete mathematical semantics.

---

## Conclusion

This article deliberately回避 two narratives: the bold proclamation of "we are about to攻克 RH," and the nihilism of "RH cannot be prove." We choose a third stance: acknowledging the extreme difficulty of the problem, while believing that systematic effort—even if it cannot reach the summit—can pave the way for those who come later.

166 years ago, when Riemann wrote down that conjecture in an eight-page paper, he probably did not imagine it would become the most enduring未解 problem in the history of mathematics. We同样 cannot预知 where we will stand after eighteen months. But what we can承诺 is: wherever we stand, we will honestly report the scenery we see—including the scenery in those dead ends.

Project homepage: [Phaenarete Project](https://phaenarete-project.github.io/Maieutica/)
Code repository: [GitHub](https://github.com/Phaenarete-Project)
Contact: contact@liang.world

---

*All factual statements in this article have been核实 through公开 sources. For information that cannot be independently验证 (such as systems not yet公开发表 or papers still in peer review), we have clearly标注其 status in the text. If you发现 any factual errors, please contact us via the email above; we will correct them within 24 hours.*

> **Copyright Notice**: This is a preview translation — Chinese original is the authoritative version. Copyright belongs to Guangzhou Phaenarete AI Technology Co., Ltd. Unauthorized reproduction, citation, or distribution is prohibited.