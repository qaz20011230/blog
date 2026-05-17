---
title: From DeepSeekMath to Xanthippe, From "Surpassing Humans" to "Defining Perfection"
date: '2026-04-25'
category: AI & Technology
tags:
  - DeepSeek
  - Xanthippe
  - AGI
  - mathematics
description: >
  Greatness speaks for itself. We will create an ASI for the Gaokao (高考) mathematics exam. A deep dissection of how the Xanthippe architecture achieves logical necessity and perfect scores through million-token context and full-paper self-verification flywheels on 7B parameters.
---

## Prologue · Three Incompletions

**In 2016, AlphaGo completed the first.**

When Lee Sedol bowed at the post-match press conference and apologized—"I should have done better"—that moment crystallized the watershed in humanity's perception of AI. AlphaGo did not prevail through brute-force exhaustive search, but through the exquisite coordination of a policy network and a value network, supplemented by massive test-time computational scaling via Monte Carlo tree search. It demonstrated that within a clearly defined rule system, sufficient training data and a sufficiently intelligent search mechanism can stably output "perfection" that surpasses human intuition.

**In 2024, DeepSeekMath completed the second.**

With merely 7B parameters, it surpassed the 540B Minerva, achieving 51.7% accuracy on the MATH dataset. More importantly, it proposed the GRPO (Group Relative Policy Optimization) algorithm, revealing a fundamental property of reinforcement learning in mathematical reasoning: **what is improved is not the base generation capability (Pass@K), but the ranking of correct answers within the output distribution (Maj@K).** This means the model does not need to become "smarter"—it only needs to become "better at knowing which answer is correct"—and "knowing correctness from incorrectness" is precisely the fundamental characteristic that distinguishes mathematics from other cognitive activities.

But DeepSeekMath left three "incompletions."

First, **it could not demonstrate comparable strength on geometry and theorem proving.** This is not a matter of data volume, but of the architecture itself: the standard Transformer has an inherently weak capacity for modeling spatial relations and diagram information, while standard next-token prediction is far less expressive for strict logical deduction than formal verification systems. This is an "original defect," not "yet to be optimized."

Second, **its context window limited the possibility of global reasoning.** 32k tokens can accommodate the complete derivation of a single difficult problem, but cannot accommodate the cross-problem consistency verification of a complete exam paper. A single-problem perfect score can be covered by probability-driven "high scores," but a full-paper perfect score requires deterministic "correctness"—a correctness that can self-prove its own correctness. Such a capability cannot emerge within a 32k context.

Third, **and most importantly: it did not set for itself a decidable, mathematically meaningful objective.** "MATH accuracy 90%" is an engineering target, not a mathematical proposition. Because it cannot answer a fundamental question: behind this score, has the AI truly "mastered" mathematics, or has it merely not committed errors within a larger statistical sense? The chasm between these two is precisely the dividing line between "intelligence" and "automation."

These three "incompletions" are not DeepSeekMath's failures, but its legacy. Because each "incompletion" is not a forgotten corner, but a precisely marked future direction.

**Now, it is time to complete the third.**

---

## Chapter One · What Is a "Stable Perfect Score"? A Falsifiable Manifesto

Before formally unfolding the technical architecture, we must first accomplish one thing: **provide a falsifiable definition of "perfect score."** Because if "perfect score" cannot be rigorously defined, it is merely a marketing slogan, not a mathematical proposition. Slogans can be vague; propositions must have boundaries.

Xanthippe (赞希佩) defines "stable perfect score" as follows:

> **Across all publicly released Gaokao (高考) mathematics exam papers from 1977 through the year prior to verification, Xanthippe shall output a score of 150 (perfect score) under the following conditions: (1) using the same problem input format as human test-takers; (2) completing the entire paper's solutions in a single run; (3) all intermediate steps satisfying mathematical rigor, with no skipped steps, no semantic contradictions, and no cross-problem inconsistencies; (4) final answers confirmed by an automated verification system to be fully consistent with the standard answers.**

This definition possesses fourfold rigor.

**First, it specifies the verification set—all publicly released exam papers.** Not a single paper, not a single year, but all papers from the restoration of the Gaokao to the present, as well as every new paper added in future years. This set is open and cannot be exhausted by "drilling problems"—because the exam-setting committee will continuously create new problems that the model has never seen.

**Second, it requires single-pass completion.** Not the best result after multiple sampling, but completing all problems in one complete full-paper inference run. This eliminates the possibility of "getting it right by luck through multiple attempts," and also forces the model to perform a global trade-off between time and accuracy.

**Third, it requires rigorous steps, not merely correct answers.** In Gaokao mathematics scoring rules, "skipping steps" loses points. But for Xanthippe, step rigor is not merely for scoring—it is an intrinsic requirement: every derivation step must have a clear mathematical basis, and must hold within a formalizable framework that can be externally verified. This is the key distinction between "statistical correctness" and "logical correctness."

**Fourth, it is falsifiable.** Any third party with basic technical capability can take a publicly available exam paper, run Xanthippe on standard hardware, and verify whether its output satisfies the above conditions. If on any given year's paper it does not achieve 150 points, this "manifesto" is falsified.

This is precisely the core spirit of the AlphaGo paradigm: **not to claim "we are strong," but to precisely define "what counts as winning," and then entrust the winning process to algorithms and compute.** The "winning" of Go is defined by rules; the "winning" of Gaokao mathematics has now been precisely defined by us.

This leads to the complete design logic of the Xanthippe V2.0 architecture.

---

## Chapter Two · Architecture: From "Predicting the Next Token" to "Verifying Every Proposition"

Xanthippe V2.0 is not an improved version of the standard Transformer. It is a reasoning system redesigned around a "generate-verify-search" closed loop. The transition from the first generation to V2.0 centers on three breakthroughs: context, attention mechanisms, and the verification closed loop.

### 2.1 Context: The Million-Token Full-Paper Reasoning Space

A complete Gaokao mathematics exam paper typically contains 6,000 to 10,000 tokens (including problems, figure annotations, and instructions). If the model only does "see one problem, solve one problem" direct inference, this volume is easily handled within a 32k window.

But what Xanthippe aims to do is **"full-paper reasoning"**—not merely solving each problem in sequence, but also performing at least the following operations across the entire paper:

- **Cross-problem consistency verification**: Is the same symbol used with the same meaning across different problems? Are unit conversions consistent? Are later problems that depend on earlier results correctly transmitted?
- **Global strategy pre-allocation**: Which problems require more reasoning steps? Which problems are suited for cross-verification with different methods? How should time and compute be optimally allocated across the entire paper?
- **Multi-path exploration and comparison**: For key problems, parallel generation of 8-16 candidate derivation paths, cross-comparison in the self-verification stage, and retention of the path with the most rigorous logic.
- **Scratch paper engineering**: Storing intermediate derivation results in different regions of the context, allowing review, modification, and reorganization at any time, just as human test-takers do on scratch paper.

The token overhead叠加 from these operations easily exceeds the carrying capacity of 32k. According to our estimates, a typical-difficulty Gaokao mathematics paper under "full-paper self-verification mode" has peak token requirements reaching 80k-120k.

Therefore, V2.0's context window is set to **128k-1M tokens**, with near-lossless reasoning quality achieved within 128k.

The core of achieving this goal is **Hybrid Compressed Attention**: differentially compressing context tokens according to their information density. "Information-type" tokens such as problem descriptions and condition statements are compressed at a ratio of $R = 16-32$; "logic-type" tokens such as core calculation steps and equation system transformations are maintained at the high-precision range of $R = 1-2$. Through selective focus of attention, the system achieves approximately 3-4 times computationally equivalent reasoning depth on 128k context at the 7B parameter scale—**reduced compute, increased intelligence.**

### 2.2 Reasoning Engine: DLCM 2.0 and Concept-Space Reasoning

Standard Transformer reasoning occurs in token space. Each token computes attention weights with all other tokens, with complexity $\mathcal{O}(L^2)$. This is "brute-force aesthetics" direct computation, with no structure, no hierarchy, no concept compression.

Xanthippe V2.0 introduces **DLCM 2.0 (Dynamic Latent Concept Model 2.0)**, deeply fused with hybrid compressed attention, restructuring reasoning as an alternating process across two spaces.

**Bottom layer (Token space, hybrid compressed attention)**: Responsible for processing the raw token sequence, filtering redundant information at high compression ratios and preserving key semantic nodes. This layer is concerned with "what words to use"—processing at the language level.

**Top layer (Concept space, dynamic pooling and deep reasoning)**: On top of the compressed semantic representations, DLCM 2.0 abstracts the token sequence into higher-level "concept nodes"—not isolated mathematical symbols, but mathematical objects such as "function," "equation," "hypothesis," "conclusion," "corollary." In concept space, attention is computed not between tokens, but between propositions.

The key implication of this dual-layer design is: **reasoning capability is no longer held hostage by the square of the token count.** A 1000-token algebraic derivation may map to only 5 key operations in concept space—"factorization," "substitution," "simplification," "solution," "verification." The model performs deep association and logical verification among these 5 nodes in concept space, then unfolds them into a complete derivation expressed in precise symbols within token space.

This is strikingly consistent with how human mathematicians think. When we mentally compute a complex integral, what surfaces in our minds is not every intermediate symbol, but several key transformation operations. Only when we put pen to paper do we unfold concepts into line-by-line derivations.

### 2.3 Full-Paper Self-Verification Flywheel: From "Solving Problems" to "Verifying"

This is Xanthippe V2.0's most core innovation, and the fundamental feature that distinguishes it from all existing mathematical AI.

As noted earlier, the "self-reflection" that emerged after DeepSeekMath's reinforcement learning is essentially a **single-problem-level outcome-oriented verification**—"Is this answer correct?" Xanthippe's Meta-Verifier advances verification to four levels:

- **Step Verification**: Does each derivation step conform to logical rules? Has it committed common calculation errors? Are there implicit assumptions that remain un stated?
- **Item Verification**: Does the complete derivation chain strictly derive the conclusion from the premises? Are classifications missing from case analysis? Is the domain of definition properly handled?
- **Cross-Item Verification**: Is cross-problem symbol consistency maintained? Are cross-problem logical dependencies accurately transmitted? Is the unit system unified? Is concept usage consistent throughout?
- **Meta-Cognitive Verification**: Is the current solving strategy optimal? Are there redundant steps that can be streamlined? Self-consistency checks on approximations and conjectures.

This verification mechanism is not "post-solving manual grading," but a flywheel system that **continuously operates, corrects in real time, and feeds back in a closed loop** during the reasoning process. When the model is solving Problem 18, the Meta-Verifier may detect an inconsistent symbol usage relative to Problem 3 in the background, triggering a local "backtrack-correct-recompute" restart. When the model is solving the last problem, the full-paper verification flywheel ensures that the derivation of every preceding problem withstands the most stringent logical scrutiny.

This is the qualitative transition from "probabilistic correctness" to "logical necessity." A "probabilistically correct" model would assert "$\sin^2 x + \cos^2 x = 1$" because it has seen it thousands of times in training data. But a "logically necessary" model can derive this identity in any context, thereby avoiding subtle errors caused by "misremembering formulas" during complex transformations.

---

## Chapter Three · Data: High-Density, High-Precision, Evolvable Knowledge Barriers

The true capability ceiling of an AI model depends substantially on the "information density" of its training data. DeepSeekMath achieved world-startling performance on a 7B model with 120B tokens of mathematical data—this is the best validation of "data quality determines model capability."

Xanthippe goes further in data engineering, deploying a multi-dimensional, sustainably evolving data strategy.

### 3.1 Fulcrum Initiative: Community-Based Production of Crowdsourced Data

The "Fulcrum Initiative" (支点计划) is Xanthippe's core mechanism for data collection. This initiative is open to high school students nationwide: participants format mathematics problems according to standards—including complete derivation steps, common-error annotations, and reflection notes—and for every 100 qualifying entries, receive a 30 RMB Mixue (蜜雪冰城) gift card.

This seemingly simple "exchange milk tea for data" actually蕴含 threefold strategic consideration.

**Cost restructuring.** Compared to professional annotation teams, the Fulcrum Initiative reduces per-problem cost by approximately 70%. The acquisition cost of 200,000 high-quality problems compresses from millions of RMB to an affordable range.

**Data freshness.** No professional team can be closer to "current" exam trends than students preparing for the Gaokao. Students' error notebooks reflect the real-time distribution of the latest problem types, latest traps, and latest solving approaches.

**Community building.** This is not merely collecting data, but establishing a network connecting the most excellent young minds. When Xanthippe ultimately announces its perfect score achievement, this community will become the most powerful collective witness and disseminator.

### 3.2 Multi-Source Fusion and Structured Annotation

Xanthippe's final training corpus target is 125,000+ high-quality problems, with data sources covering:

- Historical Gaokao exam papers (1977-2025, including national and regional papers), approximately 30,000 problems;
- Provincial and municipal mock exam papers, approximately 40,000 problems selected;
- High-quality original problems and error compilations contributed by the Fulcrum Initiative, targeting 35,000 problems;
- Special-topic training and variant problems compiled by professional teaching research teams, approximately 20,000 problems.

Each problem's annotation format extends beyond traditional fields (problem, solution, knowledge point, difficulty, common errors) to include two key dimensions:

**Compression Mask**: Annotating each token's expected compression level in hybrid compressed attention. This provides the model with a structural signal akin to "the teacher highlights key points before explaining," reinforcing training for differential compression. Only through massive precisely annotated compression masks can the model truly learn how to retain high precision in information-dense regions and perform high-ratio compression in background narrative regions.

**Cross-Item Dependencies**: Annotating symbol associations and logical dependencies between different problems on the same exam paper, providing the requisite supervision signal for training the full-paper self-verification flywheel. This is structured annotation that no existing mathematical corpus possesses.

It should be emphasized that Xanthippe does not use synthetic data. Under current technical conditions, synthetic mathematics problems generated by other large models cannot satisfy the "logical necessity" standard in reasoning rigor and symbolic accuracy. Using AI-generated data to train AI only causes the model to inherit others' errors—this is not the technical route for pursuing 150 points.

### 3.3 From Data Barriers to Capability Barriers

Xanthippe's data engineering is not merely about collecting enough problems, but about constructing a **"data-capability" bidirectional barrier**.

In the forward direction: high-quality, high-density, finely annotated training data pushes the model's baseline performance to a height difficult for generic training schemes to replicate. A language model that has never encountered the concept of "full-paper cross-problem consistency" during training cannot spontaneously emerge such a capability at test time.

In the reverse direction: once the full-paper self-verification flywheel begins operating, Xanthippe will generate more high-quality verification data in each solving session—which steps are prone to misjudgment? Which cross-problem dependencies are most easily overlooked? This data in turn guides the next round of data collection and annotation optimization.

This is the flywheel: **better data $\rightarrow$ stronger verification $\rightarrow$ more discoveries $\rightarrow$ better data.**

---

## Chapter Four · Roadmap: The Last Mile from 142 to 150

The meaning of a manifesto lies in its commitments. Xanthippe's commitment is a publicly trackable, third-party verifiable roadmap.

**Phase One: 2026, Full-Paper Context Prototype Verification**

Currently, Xanthippe's first-generation model has achieved an average score of 142+ on all 2025 Gaokao national exam paper sets. Points lost are concentrated in two problem types: solid geometry requiring complex spatial imagination, and complex algebra finale problems requiring cross-step consistency across multi-step derivations.

By the end of 2026, targets include: completion of the integration of hybrid compressed attention and DLCM 2.0, engineering落地 of the 128k context window, and maturation of single-round inference for the full-paper self-verification mechanism. At that point, a score of 145-148 is expected on 2026 exam papers, with the aim of achieving 150 for the first time on a specific year's paper.

**Phase Two: 2027, Perfect Score on Any Paper**

In 2027, the full-paper self-verification flywheel will enter production-grade operation. The optimization focus shifts from "can solve correctly" to "never solves incorrectly"—the Meta-Verifier's step-level precision will be pushed to the extreme. The multi-path cross-verification mechanism supported by million-token context will be realized: for every problem with multiple possible solution approaches, the model explores different paths in parallel, cross-compares results, and submits the most concise, most irrefutable one. Cross-problem consistency checks will cover all subsequent problems that depend on preceding ones, logically eliminating transitive errors.

Target timeline: Q2 2027, public release of Xanthippe V2.0, and acceptance of third-party evaluation on all 1977-2026 exam papers.

**Phase Three: From "Can Achieve Perfect Score" to "Always Achieves Perfect Score"**

Completing Phase Two only proves "Xanthippe can achieve perfect scores on all past papers." But the true challenge is "the next paper"—new problems set by the Gaokao committee tomorrow that the model has never seen.

The core of this phase is generalization verification. We will introduce adversarial test sets compiled by an independent team of mathematics experts—deliberately designed problems aimed at discovering model weaknesses. If Xanthippe can lose zero points on adversarial testing, the probability of it losing points on real Gaokao papers will also趋近于零.

Simultaneously, the flywheel continues to turn. Each year's newly released exam papers will be incorporated into the training and verification system. Open-source community contributions, teaching research team feedback, and discoveries by teachers and students will collectively refine Xanthippe's verification precision. From "can achieve perfect score" to "always achieves perfect score" is not a single technological leap, but the organization of a long-term evolutionary capability.

---

## Chapter Five · Why 7B? A Philosophy of "Reduced Compute, Increased Intelligence"

**Why insist on 7B?**

Using a larger model would, in theory, make it easier to approach the Gaokao mathematics perfect score. This is an engineering-intuition-correct inference. But it is wrong—within Xanthippe's logic, it is wrong on two levels.

**First, the cost level.** Xanthippe's ultimate form is not a demo in a research institute, but a public product that can genuinely serve millions of test-takers. The高昂 inference cost required by a 70B model would永远 prevent it from reaching the students who most need high-quality mathematics tutoring—especially those in third- and fourth-tier cities without the economic conditions to purchase premium educational services. If Xanthippe is merely the privilege of a few, it is not a victory; it is arrogance.

But cost is not the only reason. More importantly—**the thinking level.**

**AlphaGo's true insight is not "use a stronger model," but "invest more computation at test time."** AlphaGo's policy network is itself only a medium-scale convolutional network; alone, it can play professional-level Go, but absolutely cannot produce "divine moves." What truly enabled it to surpass top human players was how many Monte Carlo simulations it conducted within "thinking time" at each move.

Xanthippe inherits the same philosophy. Using an extremely optimized 7B model as a "policy generator," at inference time it invests far more than static reasoning through full-paper context, multi-path exploration, cross-verification, and self-correction—test-time computation. For each problem solved, the attention and verification computation Xanthippe actually invests is 10-20 times that of standard inference.

Research has already reached the same conclusion: **post-reinforcement-learning model performance improvement primarily comes from ranking improvement of correct answers within the output distribution (Maj@K), rather than improvement in base generation capability (Pass@K).** This means a smaller model carefully trained with reinforcement learning, supplemented by strong search and verification strategies, can outperform a larger model未经 reinforcement learning optimization.

This is both mathematical intuition and an engineering necessity. Using an optimized 7B model to accomplish what an unoptimized 70B model cannot—this is the true value of a technological breakthrough.

**"Deploy what is needed, subtract what is superfluous" (尽其所需，减其所余)**—these eight characters permeate Xanthippe's design philosophy. It is not the first time they have appeared in our architecture discussions, nor will it be the last. They represent a conviction: find the essence, focus precisely, and waste not a single unit of compute on details that are irrelevant to the grand purpose.

---

## Chapter Six · From the Gaokao to Beyond: Xanthippe's Mathematical Expedition

If Xanthippe achieves a stable perfect score on Gaokao mathematics in 2027, its impact will far transcend the level of "AI can do high school math problems."

**It will prove a paradigm.** In a boundary-clear vertical domain, a carefully designed 7B model + high-density high-quality data + frontier training strategy + self-verification flywheel can stably surpass any-scale general large model. The reproducibility of this path will be validated in disciplines such as physics, chemistry, and biology that similarly possess clear standards, ultimately forming a "Xanthippe-level" disciplinary AI matrix.

**It will accumulate a methodology.** Step verification, process reward, global consistency checking, cross-problem dependency annotation—these techniques are not exclusive to Gaokao mathematics. They are general methods for "achieving extreme reliability on verifiable cognitive tasks." Applying this methodology to more advanced mathematical domains is Xanthippe's inevitable extension. Full-paper self-verification can be upgraded to "multi-theorem cross-domain verification," 128k context can be upgraded to "paper-level context"—when these capabilities mature, IMO-level difficult problems will no longer be unattainable holy grails.

**It will change a perception.** For a long time, AI has been understood by the public as a "probabilistic existence"—it is probably correct, but you cannot truly trust it. A stable perfect score on Gaokao mathematics will prove with irrefutable certainty: AI can achieve precision and reliability that humans cannot match, within specific, boundary-clear cognitive domains. Once such trust is established, AI will evolve from "assistant" to "expert," from "you use it and then double-check" to "you can genuinely rely on its judgment."

**It will lay a foundation.** If we believe AGI will eventually arrive, then the "self-verification" and "necessary correctness" capabilities that Xanthippe explores will be AGI's most core cornerstone. A truly general intelligence must be able to make verifiably correct judgments within every boundary-clear domain it cognizes. Xanthippe chose mathematics—the purest domain of human rationality—as its first battleground, not because it is easy, but because it is hardest. A victory here will prove at the epistemological level: certainty is possible, necessity is attainable.

---

## Epilogue · Give Me a Fulcrum

When DeepSeekMath was published in 2024, its methodology section cited an Archimedes quotation, unstated yet permeating the entire text:

**"Give me a fulcrum, and I shall move the earth."**

DeepSeekMath forged the lever—the GRPO algorithm, 120B high-quality mathematical tokens, and the core discovery that "reinforcement learning improves ranking rather than generation."

Hybrid compressed attention and DLCM 2.0 found that fulcrum—releasing computationally equivalent 3-4 times reasoning depth within a 7B model, delivering a 128k-token context window to mathematical reasoning.

The full-paper self-verification flywheel赋予 the force of leverage—allowing the model to continuously verify after generation, continuously improve within verification, and within improvement趋近于 impeccable perfection.

Now, it is time to test this millennium-old aphorism.

This is not merely a technology release, but an epistemological experiment. We wish to use the most stringent method—any year, any difficulty Gaokao mathematics exam paper, single run, full-paper perfect score—to answer an ancient and profound question: **within the boundaries of certainty, can necessity be stably attained?**

Mathematicians have long given affirmative answers: starting from axioms, through strict logical deduction, one necessarily arrives at theorems. This is mathematics' very reason for existence.

What we wish to do is to enable AI to complete the same arrival.

Socrates' wife Xanthippe (赞希佩) was据说 of fierce temperament yet ultimately the only one who陪伴 beside him at his deathbed. Across millennia, her name has承载 an uncompromising spirit of truth-seeking. The project named Xanthippe pursues precisely this quality of **"never compromising with 'almost'"**—writing a perfect-score answer on this boundary-clear exam paper of Gaokao mathematics.

This is not a technological victory; this will be the victory of a mathematical experiment concerning certainty, perfection, and self-verification.

We have chosen 2027 as the year to兑现 our承诺. Not because that year will be special, but because we believe true manifestos should not merely "say," but "do." By then, when Xanthippe outputs perfect scores on all publicly released exam papers, every assertion in this manifesto will be precisely兑现.

**"Deploy what is needed, subtract what is superfluous."**

**"Within the boundaries of certainty, seek necessity."**

From today to that perfect-score moment in 2027, every day, every line of code, every training run, every verification cycle will be driven by these two principles.

We深知 this is a road few choose to walk. In an era where pursuing "larger and stronger" has become mainstream, choosing "small yet absolutely precise" requires conviction and courage. But the history of mathematics has long told us: the most powerful theorems often emerge from the most concise forms.

*Wir müssen wissen, wir werden wissen.*

---

**Guangzhou, April 25, 2026**

> **Copyright Notice**: This is a preview translation — Chinese original is the authoritative version. Copyright belongs to Guangzhou Phaenarete AI Technology Co., Ltd. Unauthorized reproduction, citation, or distribution is prohibited.