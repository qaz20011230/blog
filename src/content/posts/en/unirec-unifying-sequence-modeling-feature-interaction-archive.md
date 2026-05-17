---
title: "UniRec: A Unified Architecture for Sequence Modeling and Feature Interaction in Large-Scale Recommendation (TeX Archive)"
date: '2026-03-27'
category: AI & Technology
tags:
  - recommendation systems
  - sequence modeling
  - feature interaction
  - architecture
description: >
  Recommendation systems support large-scale content platforms and digital advertising, where click-through rate and conversion rate predictions directly impact user experience, engagement, and commercial revenue. However, despite decades of development, modern recommendation pipelines remain structurally fragmented: feature interaction models and sequential behavior models are often developed, optimized, and deployed as fundamentally independent systems. This paper argues...
---

> Note: This article was automatically converted from a TeX source file; formulas and formatting may differ from the original. The TeX/PDF originals are authoritative.

> Original filename: `unirec-sequence-modeling-feature-interaction-unified-architecture.tex`
> Source file download: https://liang.world/archives/unirec/unirec-sequence-modeling-feature-interaction-unified-architecture.tex

---

## Abstract

Recommendation systems support large-scale content platforms and digital advertising, where click-through rate and conversion rate predictions directly impact user experience, engagement, and commercial revenue. However, despite decades of development, modern recommendation pipelines remain structurally fragmented: feature interaction models and sequential behavior models are often developed, optimized, and deployed as fundamentally independent systems. This paper argues that this historical separation conceals three increasingly fragile assumptions—that premature compression of behavioral sequences is sufficient, that cross-source interactions can be deferred, and that sequential and non-sequential modules can be quasi-independently optimized. Addressing this problem, we propose UniRec, a theoretically foundational unified architecture centered on the core principle of "unify first, then compress." UniRec maps ordered events, unordered feature domains, and continuous context variables to a common token space through structure-preserving tokenization, applies a mixed-mask attention operator to achieve causal but off-diagonal interactions, and performs progressive compression only after cross-source conditioning has occurred. We further implement continuous updating through a GRU-based user state, making predictions depend on an evolving interaction trajectory rather than a static summary. This report contributes theoretical content in three respects: first, it formalizes the implicit assumptions underlying fragmented recommendation pipelines; second, it demonstrates that premature compression can only reduce task-relevant information through data processing, whereas a nearly injective unified representation preserves the joint mutual information with the response within an $\epsilon$ collision term; third, it provides a concise structural rationale: the category-theoretic perspective motivates source-aware tokenization, while the geometric perspective motivates mixed masking and delayed compression as inductive constraints against degenerate interaction patterns. This document is intended as an archival theoretical foundational report for subsequent engineering work on the challenge "Unifying Sequence Modeling and Feature Interaction for Large-Scale Recommendation"; benchmark results and implementation artifacts will be presented in a companion empirical revision.

## Keywords

Recommendation systems; unified architecture; sequence modeling; feature interaction; Transformer; information theory

## Introduction

Recommendation systems support large-scale content platforms—information feeds, short-video ecosystems, and other engagement-centric interfaces—as well as digital advertising, where click-through rate and conversion rate predictions directly impact user experience, monetization, and platform efficiency. Under massive traffic volume and strict latency constraints, such systems make billions of real-time decisions daily and underpin an advertising economy of enormous scale.

Over the past two decades, recommendation research has developed along two main lines. One line focuses on feature interaction: modeling high-dimensional multi-domain categorical and contextual features for ranking and calibration. The other line focuses on sequential behavior: modeling temporally ordered user interactions through recurrent architectures, attention mechanisms, and self-attention-inspired Transformer-style ranking models [vaswani2017attention]. Both traditions have achieved remarkable success. However, they have largely evolved in parallel rather than in concert.

This separation creates a structural bottleneck in industrial systems. In many deployed technology stacks, behavioral sequences are first aggregated into one or a few vectors before being merged with feature-side representations. The resulting pipeline is easy to modularize, but it also enforces shallow cross-paradigm interactions, encourages inconsistent optimization objectives between components, complicates scaling, and increases engineering and hardware burdens as sequence length and model scale continue to grow.

The current challenge "Unifying Sequence Modeling and Feature Interaction for Large-Scale Recommendation" arrives at an opportune moment because it directly targets this structural bottleneck. Its core question is not merely whether a new module can improve AUC, but whether recommendation architecture can be redesigned so that ordered behavior and non-sequential domains are jointly modeled within a homogeneous, stackable backbone. This question is primarily an architectural question, and only secondarily an empirical one. It therefore requires a "theory-first" approach.

This report begins from a simple observation. The relevance of historical events often depends on the current feature context, and the relevance of features often depends on the user's position within the behavioral trajectory. If this is true, then systems that prematurely compress history may discard event-level distinctions that are precisely what subsequent feature interactions require.

To this end, we propose UniRec, a first-principles architecture whose core principle reverses the conventional order:

**Unify first, then compress**,

rather than compress first, then interact. UniRec combines four design elements: structure-preserving tokenization, mixed-mask attention, progressive compression, and continuous updating through recurrent user states.

This document is deliberately a theoretical foundational document. Prior to the completion of engineering research, we do not claim benchmark superiority, but rather fix the architectural arguments and the standards by which they should be falsified. Accordingly, this report is archival and preparatory: it provides the conceptual foundation for subsequent large-scale experimentation under the challenge setting.

The main contributions are as follows:

- Identifying and formalizing the three implicit assumptions underlying separated recommendation pipelines, and explaining why they become increasingly fragile at scale.
- Proposing UniRec, a unified architecture with "unify first, then compress" as its core organizing principle.
- Providing a compact structural rationale: source-aware tokenization admits a category-theoretic interpretation, while mixed masking and delayed compression admit a geometric interpretation, as inductive constraints in optimization.
- Instantiating continuous updating through a GRU-based user state, and defining a surrogate distance perspective to distinguish dynamic user modeling from frozen user modeling.
- Specifying fair and falsifiable empirical protocols for the challenge objectives, so that subsequent engineering results can be structurally interpreted rather than merely numerically compared.

The remainder of the report is organized as follows. Section 2 reviews related work. Section 3 formalizes the problem and precisely states the implicit assumptions. Section 4 introduces UniRec. Section 5 explains the structural and geometric design rationale. Section 6 provides the information-theoretic foundation. Section 7 articulates challenge alignment, empirical protocols, and the engineering agenda. Section 8 discusses implications and limitations. Section 9 concludes.

## Related Work

### Separated Recommendation Pipelines

A large number of industrial recommendation models follow an "encode-then-interact" logic, even when implemented through multiple subsystems. Deep Crossing [shan2016deep], Wide&Deep [cheng2016wide], DeepFM [guo2017deepfm], DCN [wang2017deep] and DCNv2 [wang2021dcnv2] represent important approaches for multi-domain feature interaction and ranking. These methods are highly effective on sparse and contextual features, but they typically treat behavioral history as shallow aggregation or externally generated embeddings.

### Sequence Modeling

Another line of research focuses on the temporal structure of user behavior. GRU4Rec [hidasi2016session], DIN [zhou2018deep], DIEN [zhou2019deep], SASRec [kang2018self] and BERT4Rec [sun2019bert4rec] use recurrent or attention mechanisms to model sequential dependencies, while the broader Transformer paradigm [vaswani2017attention] has more generally reshaped ranking architectures. However, in many industrial deployments, the resulting sequence representations are still reduced to a small number of vectors before being incorporated into the feature-side stack.

### Feature Interaction Architectures

Beyond FM-class models, xDeepFM [lian2018xdeepfm] and AutoInt [song2019autoint] enrich cross-feature expressiveness through explicit crossing layers and self-attention interactions. However, these models typically assume that sequence information has already been aggregated. The consequence is that event-level sequence-feature conditioning is either absent or extremely limited.

### Why Unification Matters

Recent work has begun exploring unified tokenization schemes, shared backbones, and late or progressive compression mechanisms, suggesting that the long-standing separation between sequence modeling and feature interaction is neither inevitable nor theoretically necessary. However, a first-principles account of "why unification matters" remains lacking, as does a clear specification of which input structures should be preserved under unification, and when compression is legitimate rather than destructive. This report responds precisely to these questions, its purpose not merely to advocate a homogeneous backbone, but to explain that the operation order—interact first, compress later—is itself a modeling commitment with information-theoretic consequences.

## Problem Setting and Implicit Assumptions

We consider an input tuple

$$
(S,\mathcal{F},\mathcal{C}),
$$

where

- $S = (s_1,\ldots,s_n)$ is an ordered sequence of historical events;
- $\mathcal{F} = \{f_1,\ldots,f_m\}$ is an unordered set of domain-style categorical features;
- $\mathcal{C} = \{c_1,\ldots,c_q\}$ is a set of continuous scalars or low-dimensional vectors with a metric structure.

The target variable is the response $R$, e.g., click, conversion, or post-click conversion.

**Notation**. Throughout the paper, $n$ denotes sequence length, $m$ denotes the number of categorical feature domains, and $q$ denotes the number of continuous context variables.

### Three Implicit Assumptions

The dominant separated pipeline is underpinned by the following assumptions.

> **Assumption** (Early compression is sufficient)
>
> There exists a low-dimensional summary $h_S = g(S)$ such that replacing $S$ with $h_S$ before cross-source interaction incurs negligible task-relevant information loss for jointly predicting $R$ from $\mathcal{F},\mathcal{C}$.

> **Assumption** (Interaction can be deferred)
>
> Most useful interactions between sequential events and domain-style features do not need to occur before sequence compression.

> **Assumption** (Branches can be quasi-independently optimized)
>
> The sequence encoder and feature interaction module can be largely independently designed and optimized, requiring only shallow downstream fusion.

These assumptions become increasingly fragile as history grows longer and auxiliary information grows richer. The concern is not that compression may abstractly lose information; more specifically, the relevance of sequence events often depends on the current feature context. Once interactions are deferred until after sequence compression, event-level conditioning may become irrecoverable.

### Why Early Compression Is Structurally Costly

Let $H_t$ denote the history available at time $t$, and $X_t$ denote the non-sequential features available at prediction time. A separated system typically computes $Z_t = g(H_t)$ and predicts $R$ from $(Z_t, X_t)$.

> **Proposition** (Conditional data processing inequality)
>
> For any deterministic compressor $g$, $$ I(g(H_t);R\mid X_t) \leq I(H_t;R\mid X_t). $$ Equivalently, $$ I(g(H_t),X_t;R) \leq I(H_t,X_t;R). $$

> **Proof**
>
> Since $g(H_t)$ is a measurable function of $H_t$, the variables form a Markov chain $R \leftrightarrow (H_t,X_t) \leftrightarrow (g(H_t),X_t)$. The conclusion follows directly from the data processing inequality.

> **Proposition** (Bayes error lower bound under early compression)
>
> Let $R$ take values in a finite label set $\mathcal{R}$. Denote by $P_e(g)$ the Bayes error of any predictor restricted to $(g(H_t),X_t)$. Then $$ P_e(g) \ge \frac{H(R\mid g(H_t),X_t)-1}{\log|\mathcal{R}|} = \frac{H(R\mid X_t) - I(g(H_t);R\mid X_t) - 1}{\log|\mathcal{R}|}. $$

> **Proof**
>
> This is a direct application of Fano's inequality to the representation pair $(g(H_t),X_t)$.

Propositions 3.4 and 3.5 formalize the core concern of this report: if the response depends on historical details that only reveal their relevance when combined with auxiliary information, then early compression introduces a structural information bottleneck. UniRec addresses this by delaying compression until sufficient cross-source interaction has occurred.

## UniRec: Unified Recommendation from First Principles

UniRec is built around four components: structure-preserving tokenization, mixed-mask attention, progressive compression, and continuous updating. The architecture is shown in Figure 1.

### Overview

Given $(S,\mathcal{F},\mathcal{C})$, UniRec first maps all input types to a common space $\mathbb{R}^d$, then applies stacked homogeneous UniBlocks with structured mixed attention masks, progressively compressing only the sequence portion across depth, and finally producing task-specific representations for prediction. When the dynamic module is enabled, the current user state is inserted as an additional feature-side token prior to unified interaction.

### Structure-Preserving Tokenization

We define three mappings to the common embedding space $\mathbb{R}^d$:

$$
\Phi_S: S \to \mathbb{R}^d,\quad \Phi_F: \mathcal{F} \to \mathbb{R}^d,\quad \Phi_C: \mathcal{C} \to \mathbb{R}^d.
$$

**Sequence tokens**. For the $i$-th event $s_i$, define

$$
\Phi_S(s_i) = \text{Embed}(item_i) + \text{Embed}(action_i) + \text{Pool}(content_i) + \text{TimeEncoding}(t_i). (4.1)
$$

Time encoding must preserve temporal ordering at a weak but operationally meaningful level, i.e., the ordering relation between events should be distinguishable in the embedding space.

**Feature tokens**. For the domain-value pair $f_j = (\text{field}_j, \text{value}_j)$, define

$$
\Phi_F(f_j) = \text{FieldEmbed}(\text{field}_j, \text{value}_j). (4.2)
$$

Since the feature set is unordered, downstream operations on this subset should be permutation-invariant or permutation-equivariant with respect to list order.

**Context tokens**. For a continuous scalar or vector $c \in \mathcal{C}$, define

$$
\Phi_C(c) = \sigma(W_c c + b_c), (4.3)
$$

where $\sigma$ is a Lipschitz-continuous nonlinear function, e.g., GELU or SiLU.

**Unified token order**. The token sequence is arranged as

$$
[S_1,\ldots,S_n, F_1,\ldots,F_m, C_1,\ldots,C_q].
$$

When continuous updating is enabled, the current user state $u_t$ is inserted as an additional feature-side token. Source-type embeddings are added so that source information is preserved after projection to the common space.

### Mixed-Mask Attention

Let

$$
\mathbf{Z}^{(l)} = [\Phi_S(s_i); \Phi_F(f_j); \Phi_C(c_k)] \in \mathbb{R}^{L \times d},
$$

where $L = n+m+q$ (or $n+m+q+1$ if a user state token is present). At layer $l$, UniRec applies

$$
\mathbf{Z}^{(l+1)} = \text{Softmax}\left(\frac{(\mathbf{Z}^{(l)}\mathbf{W}_Q)(\mathbf{Z}^{(l)}\mathbf{W}_K)^\top}{\sqrt{d_h}} + \mathbf{M}\right)\mathbf{Z}^{(l)}\mathbf{W}_V. (4.4)
$$

The mask is

$$
\mathbf{M} =
\mathbf{M}_{SS} & \mathbf{M}_{SF}

\mathbf{M}_{FS} & \mathbf{M}_{FF}
. (4.5)
$$

Its four blocks encode source-aware visibility:

- $\mathbf{M}_{SS}$ is causal, so sequence token $i$ can only attend to positions $j \le i$;
- $\mathbf{M}_{FF}$ is fully open, so feature and context tokens are densely connected;
- $\mathbf{M}_{FS}$ is fully open, so feature-side tokens can read the entire sequence;
- $\mathbf{M}_{SF}$ is selectively open, allowing sequence tokens to access context-safe or user-side information without introducing target leakage. Figure 2 illustrates the block structure.

### Progressive Compression

To control the cost of long sequences, UniRec progressively compresses sequence blocks rather than compressing at the input. Let $\mathbf{S} \in \mathbb{R}^{n \times d}$ be the current sequence representation. Introduce learnable queries

$$
Q_c \in \mathbb{R}^{k \times d}
$$

and define

$$
\text{Compress}(\mathbf{S}) = \text{Softmax}\left(\frac{Q_c \mathbf{S}^\top}{\sqrt{d}}\right)\mathbf{S}. (4.6)
$$

Since compression is applied only after several rounds of unified interaction, the resulting tokens encode not only the history itself, but the history already conditioned on side information.

A representative 8-layer schedule is as follows:

| **Layer** | **Sequence Resolution** |
| --- | --- |
| 1-2 | $n$ |
| 3-4 | $n/2$ |
| 5-6 | $n/4$ |
| 7-8 | $n/8$ |

The precise schedule will be treated as a tunable engineering variable in the empirical companion study.

### Continuous Updating via GRU-Based User State

Let $u_t \in \mathbb{R}^d$ denote the user state just prior to interaction $t$, and $e_t \in \mathbb{R}^d$ denote the interaction embedding extracted from the current unified model. Define

$$

$$
z_t &= \sigma(W_z e_t + U_z u_t + b_z),

r_t &= \sigma(W_r e_t + U_r u_t + b_r),

\tilde{u}_t &= \tanh(W_h e_t + U_h (r_t \odot u_t) + b_h),

u_{t+1} &= (1 - z_t) \odot u_t + z_t \odot \tilde{u}_t.
$$

(4.10)
$$

At the next interaction, $u_{t+1}$ is embedded as an additional feature-side token and reinserted into the unified backbone. Thus, future predictions depend on the trajectory of internal state updates, rather than a single frozen summary.

## Structural and Geometric Design Rationale

This section aims to provide an explanatory rather than axiomatic discussion. The structural vocabulary employed here is modest, its purpose being to clarify why ordered sequences and unordered feature sets should not be prematurely flattened into a single untyped list.

### Structural Perspective

We model input sources as two categories. Let Seq be the partially ordered category of sequence positions, where morphisms encode temporal precedence. Let Ftr be the discrete category of feature domains. The heterogeneous input domain should therefore be understood as a coproduct

$$
\mathbf{Seq} \oplus \mathbf{Ftr}
$$

rather than a single undifferentiated list. The mapping

$$
\Phi: \mathbf{Seq} \oplus \mathbf{Ftr} \to \mathbf{Vec}
$$

admits a functorial interpretation.

> **Proposition** (Functorial interpretation of tokenization)
>
> Under the tokenization rules of Section 4.2, UniRec preserves the distinction between order-sensitive sequence structure and order-insensitive feature structure prior to unified interaction.

**Design intuition**. On the sequence side, ordering is explicitly represented through time encoding. On the feature side, the absence of intrinsic ordering is respected through domain-aware embeddings and permutation insensitivity with respect to domain order. The point here is not to claim a profound category-theoretic theorem, but to explain why source-aware tokenization is more principled than simple concatenation.

### Geometric Perspective

Transformers define a vast function class. Within this class, optimization may converge to degenerate solutions that fit labels yet discard meaningful source structure. The geometric intuition behind UniRec is that mixed masking and delayed compression serve as inductive constraints, reducing the risk of such degeneration. Causal masking preserves temporal admissibility; open feature-to-sequence attention allows side information to condition event-level relevance; delayed compression prevents the model from collapsing the sequence before conditioning has occurred. In this sense, "unify first, then compress" is not merely a heuristic slogan, but a concrete architectural discipline. A more complete formal commentary is reserved for Appendix A.

## Information-Theoretic Foundation

Let $H_t$ denote available history, $X_t$ denote side information, and $R$ denote the response. Let $\Phi(H_t \oplus X_t)$ denote the unified representation, and $g(H_t)$ and $h(X_t)$ denote arbitrary deterministic compressors used in a separated pipeline.

> **Theorem** (Near-injective unified representation bound)
>
> Suppose the unified mapping $\Phi$ is near-injective on the support of $(H_t,X_t)$, i.e., $$ H(H_t,X_t \mid \Phi(H_t \oplus X_t)) \le \epsilon. $$ Then $$ I(\Phi(H_t \oplus X_t); R) \ge I(H_t,X_t; R) - \epsilon. (6.1) $$

> **Proof**
>
> Since $\Phi(H_t \oplus X_t)$ is a deterministic function of $(H_t,X_t)$, we have $$ I(H_t,X_t,\Phi(H_t \oplus X_t); R) = I(H_t,X_t; R). $$ By the chain rule, $$ I(H_t,X_t; R) = I(\Phi(H_t \oplus X_t); R) + I(H_t,X_t; R \mid \Phi(H_t \oplus X_t)). $$ Therefore $$ I(\Phi(H_t \oplus X_t); R) = I(H_t,X_t; R) - I(H_t,X_t; R \mid \Phi(H_t \oplus X_t)). $$ Finally, $$ I(H_t,X_t; R \mid \Phi(H_t \oplus X_t)) \le H(H_t,X_t \mid \Phi(H_t \oplus X_t)) \le \epsilon. $$

> **Corollary** (Unified representation dominates separated compression within $\epsilon$)
>
> For any deterministic compressors $g,h$, $$ I(\Phi(H_t \oplus X_t); R) \ge I(g(H_t),h(X_t); R) - \epsilon. (6.2) $$

> **Proof**
>
> By Proposition 3.4, joint deterministic compression does not increase task-relevant information: $$ I(g(H_t),h(X_t); R) \le I(H_t,X_t; R). $$ Combining with Theorem 6.1 yields the result.

**Interpretation**. Theorem 6.1 and Corollary 6.2 do not say that any nominally unified model automatically outperforms any separated model. They express a more fundamental point: if a unified representation approximately preserves joint input structure, then its available mutual information with the response is, within an $\epsilon$ collision term, no less than that of any deterministically compressed separated representation. Thus, early compression is lossy by default; delayed compression becomes defensible only after sufficient joint conditioning.

> **Definition** (Surrogate distance)
>
> Let $f_{\text{dyn}}$ be a dynamic predictor that updates its internal user state over time, and $\mathcal{H}_{\text{stat}}$ be a class of static predictors. For time horizon $T$ and loss $\ell$, define $$ D_T(f_{\text{dyn}}, \mathcal{H}_{\text{stat}}) = \inf_{h \in \mathcal{H}_{\text{stat}}} \mathbb{E}\left[ \frac{1}{T} \sum_{t=1}^{T} \ell\bigl(f_{\text{dyn}}(x_{\le t}), h(x_{\le t})\bigr) \right]. (6.3) $$ This quantity is not intended for closed-form computation, but rather to provide a clear objective for future engineering experiments: approximate the best static surrogate under matched parameter budgets, and measure how well it mimics the trajectory-dependent model over the interaction range.

Proof details are summarized in Appendix B.

}

| l} |  |  |
| --- | --- | --- |
| **Study** | **Assumption/Conclusion to be read out** | **Status** |
| Off-diagonal attention ablation | Full UniRec should outperform variants with $A_{FS}=0$, $A_{SF}=0$, or both disabled, thereby testing whether explicit sequence-feature interaction has substantive effect | Protocol fixed |
| Compression timing | Under matched computation, delayed compression should outperform early compression, directly testing the core architectural principle | Protocol fixed |
| Dynamic update ablation | GRU-updated UniRec should surpass static UniRec on long-horizon metrics, and increase surrogate distance relative to frozen user summaries | Protocol fixed |
| Scaling study | Unified modeling gains over model scale, data scale, and history length should surpass strong separated baselines | Planned |
| Latency and memory | Progressive compression should improve cost efficiency while retaining most of the unified interaction benefit | Protocol fixed |
| Qualitative analysis | Attention maps and user state trajectories should exhibit meaningful event selection and preference drift | Planned |

## Challenge Alignment, Empirical Protocols, and Engineering Agenda

This document is intentionally a theoretical foundational technical report. Its purpose is to state architectural hypotheses, formal guarantees, and evaluation standards with sufficient clarity that subsequent engineering research can falsify them.

**Challenge setting**. The anticipated downstream evaluation environment is the "Unifying Sequence Modeling and Feature Interaction for Large-Scale Recommendation" challenge. The primary prediction target is CVR, and submissions are ranked by a single ROC-AUC metric. Beyond leaderboard position, the workshop also explicitly values unified module innovation and scaling law analysis. This report's theory-first orientation is precisely to align with this spirit: first fix structural hypotheses, so that subsequent empirical results can be interpreted as evidence supporting or opposing a principled architectural claim.

### Principal Empirical Questions

The future empirical revision will be organized around a set of direct questions.

### Fair Baseline Policy

To preempt fairness concerns, comparison policies are fixed here rather than after results are obtained.

**Hyperparameter policy**. All models will be tuned within the same search space: learning rate $\{10^{-4}, 3\times10^{-4}, 10^{-3}\}$, dropout $\{0.1,0.2,0.3\}$, matched hidden width tiers, and early stopping based on validation AUC.

**Budget policy**. All models will be compared under matched effective batch size, matched maximum update count, and feasible matched parameter tiers. Hardware configuration and clock budgets will be disclosed in the empirical companion revision.

}

| p{5cm}} |  |  |
| --- | --- | --- |
| **Model** | **Implementation Source** | **Fairness Rule** |
| Deep Crossing | Internal PyTorch reimplementation | No event-level sequence encoder; only non-sequential domains; matched tuning grid and maximum updates |
| DeepFM / xDeepFM | Internal PyTorch reimplementation | Feature interaction baseline without explicit long-sequence modeling; matched parameter tier and optimization budget |
| AutoInt | Internal PyTorch reimplementation | Self-attention feature interaction baseline without event-level sequence branch; matched tuning grid and effective batch size |
| SASRec + DCNv2 | Internal PyTorch reimplementation | SASRec compresses history into one vector, then fused with DCNv2; matched parameter tier and optimization budget |
| UniRec | Reference implementation | Unified interaction before progressive compression; optional recurrent user state; same budget as the strongest baseline tier |

### Engineering Release Plan

The empirical companion revision will release, within policy and licensing allowances:

- Legitimate exact data preprocessing details;
- Model hyperparameters, random seeds, and hardware configuration;
- Ablation tables for interaction blocks, compression timing, and dynamic updating;
- Scaling curves over parameters, data scale, and sequence length;
- Latency and memory profiles;
- Code and experiment scripts permissible for public release.

Therefore, this report should be read as an archival theoretical document that fixes what subsequent engineering work must verify, rather than as a paper with completed benchmarks.

## Discussion

This report advances a specific claim about recommendation architecture: the long-standing separation between sequence modeling and feature interaction is not merely engineering convenience, but a modeling choice carrying implicit assumptions. Once these assumptions are explicitly stated, the standard "encode-then-interact" pipeline becomes vulnerable to direct theoretical criticism.

The first implication is methodological. If the relevance of historical events depends on the current feature context, then event-level interaction cannot always be deferred until after sequence compression. In such cases, off-diagonal attention is not a cosmetic improvement, but the operational counterpart of underlying statistical dependencies.

The second implication is architectural. Unified design does not mean undifferentiated everywhere-interaction, but rather that heterogeneous inputs share a backbone while preserving source-aware constraints. In UniRec, the structural perspective motivates independent source mappings prior to shared interaction, while the geometric perspective motivates mixed masking and delayed compression as regularizers along the optimization path.

The third implication is conceptual. Static recommendation models, even large ones, are structurally distinct from models whose internal user state changes irreversibly over time. We do not claim that state updating suffices for intelligence or understanding in any strong sense. The narrower claim is: once future predictions depend on an internal update trajectory, replacing that model with a frozen lookup table becomes a different, empirically testable approximation problem. This is precisely what the surrogate distance captures.

This report also has notable limitations. First, it deliberately takes a theory-first approach and has not yet provided full empirical validation. Second, the GRU-based dynamic module adds system complexity and may require careful engineering in production. Third, the structural and geometric arguments are explanatory frameworks, not complete formalizations of intelligent behavior. Their role in this paper is to provide discipline for architectural design, not to substitute for evidence.

## Conclusion

We have proposed UniRec, a unified architecture for large-scale recommendation centered on the core principle of "unify first, then compress." The central argument of this report is: separated recommendation pipelines rest on three implicit assumptions—the sufficiency of early compression, the deferrability of interaction, and the quasi-independent optimization of sequence and feature branches. We have explained why these assumptions become increasingly fragile as history grows longer and auxiliary information grows richer.

UniRec's technical contributions are not isolated components, but a coherent architectural principle. Structure-preserving tokenization keeps source differences explicit before unified interaction. Mixed-mask attention enables controlled off-diagonal interaction without sacrificing causal admissibility. Progressive compression defers information loss until after cross-source conditioning. A concrete GRU-based continuous update mechanism extends the model from static aggregation to trajectory-dependent user state evolution.

This document is intended as the final archival theoretical foundational report for subsequent engineering work on the challenge "Unifying Sequence Modeling and Feature Interaction for Large-Scale Recommendation." Its purpose is to state conceptual commitments, formal guarantees, and falsification standards with sufficient clarity that subsequent experiments can refer to it without ambiguity. Complete empirical results, implementation artifacts, and permissible dataset statistics will be presented in a companion revision.

## Appendix

## Further Structural Commentary

Let Seq be the partially ordered category induced by sequence ordering, with objects $\{1,\ldots,n\}$ and a morphism $i \to j$ whenever $i \le j$. Let Ftr be the discrete category whose objects are feature domains, with only identity morphisms. The coproduct

$$
\mathbf{Seq} \oplus \mathbf{Ftr}
$$

preserves the distinction between temporal precedence and unordered domain structure prior to projection to Vec. A more complete formalization (reserved for future work) would characterize which architectural alternatives preserve the same source-side invariants under tokenization and interaction. This report does not require that stronger machinery; its claims are narrower and architectural.

## Proof Details

Since $\Phi(H_t \oplus X_t)$ is a deterministic function of $(H_t,X_t)$,

$$
I(H_t,X_t,\Phi(H_t \oplus X_t); R) = I(H_t,X_t; R).
$$

Applying the chain rule yields

$$
I(H_t,X_t; R) = I(\Phi(H_t \oplus X_t); R) + I(H_t,X_t; R \mid \Phi(H_t \oplus X_t)).
$$

Therefore

$$
I(\Phi(H_t \oplus X_t); R) = I(H_t,X_t; R) - I(H_t,X_t; R \mid \Phi(H_t \oplus X_t)).
$$

The residual term is bounded by conditional entropy:

$$
I(H_t,X_t; R \mid \Phi(H_t \oplus X_t)) \le H(H_t,X_t \mid \Phi(H_t \oplus X_t)) \le \epsilon.
$$

## References

- [shan2016deep] Y. Shan, T. R. Hoens, J. Jiao, H. Wang, D. Yu, and J. C. Mao. Deep crossing: Web-scale modeling without manually crafted combinatorial features. In *Proceedings of the 22nd ACM SIGKDD International Conference on Knowledge Discovery and Data Mining*, pages 255--262, 2016.
- [cheng2016wide] H.-T. Cheng, L. Koc, J. Harmsen, et al. Wide & deep learning for recommender systems. *arXiv preprint arXiv:1606.07792*, 2016.
- [guo2017deepfm] H. Guo, R. Tang, Y. Ye, Z. Li, and X. He. DeepFM: A factorization-machine based neural network for CTR prediction. In *Proceedings of the 26th International Joint Conference on Artificial Intelligence*, pages 1725--1731, 2017.
- [wang2017deep] R. Wang, B. Fu, G. Fu, and M. Wang. Deep & cross network for ad click predictions. In *Proceedings of the ADKDD'17*, pages 1--7, 2017.
- [wang2021dcnv2] R. Wang, R. Shivanna, D. Cheng, et al. DCN V2: Improved deep & cross network and practical lessons for web-scale learning to rank systems. In *Proceedings of the Web Conference 2021*, pages 1785--1797, 2021.
- [hidasi2016session] B. Hidasi, A. Karatzoglou, L. Baltrunas, and D. Tikk. Session-based recommendations with recurrent neural networks. In *Proceedings of the 4th International Conference on Learning Representations*, 2016.
- [zhou2018deep] G. Zhou, C. Zhu, R. Song, et al. Deep interest network for click-through rate prediction. In *Proceedings of the 24th ACM SIGKDD International Conference on Knowledge Discovery and Data Mining*, pages 1059--1068, 2018.
- [zhou2019deep] G. Zhou, N. Mou, Y. Fan, et al. Deep interest evolution network for click-through rate prediction. In *Proceedings of the 33rd AAAI Conference on Artificial Intelligence*, pages 5941--5948, 2019.
- [kang2018self] W.-C. Kang and J. McAuley. Self-attentive sequential recommendation. In *2018 IEEE International Conference on Data Mining*, pages 197--206, 2018.
- [sun2019bert4rec] F. Sun, J. Liu, J. Wu, et al. BERT4Rec: Sequential recommendation with bidirectional encoder representations from transformer. In *Proceedings of the 28th ACM International Conference on Information and Knowledge Management*, pages 1441--1450, 2019.
- [lian2018xdeepfm] J. Lian, X. Zhou, F. Zhang, Z. Chen, X. Xie, and G. Sun. xDeepFM: Combining explicit and implicit feature interactions for recommender systems. In *Proceedings of the 24th ACM SIGKDD International Conference on Knowledge Discovery and Data Mining*, pages 1754--1763, 2018.
- [song2019autoint] W. Song, C. Shi, Z. Xiao, et al. AutoInt: Automatic feature interaction learning via self-attentive neural networks. In *Proceedings of the 28th ACM International Conference on Information and Knowledge Management*, pages 1161--1170, 2019.
- [vaswani2017attention] A. Vaswani, N. Shazeer, N. Parmar, et al. Attention is all you need. In *Advances in Neural Information Processing Systems*, volume 30, pages 5998--6008, 2017.

---

March 27, 2026

> **Copyright Notice**: This is a preview translation — Chinese original is the authoritative version. Copyright belongs to Guangzhou Phaenarete AI Technology Co., Ltd. Unauthorized reproduction, citation, or distribution is prohibited.