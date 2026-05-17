---
title: "From Fragments to Wholeness: Rethink the Recommendation — Deep Reflections on TAAC2026"
date: '2026-03-27'
category: AI & Technology
tags:
  - recommendation systems
  - TAAC2026
description: >
  After twenty years of industrial recommendation systems, the separation paradigm of "sequence modeling + feature interaction" has exposed three hidden assumptions under long sequences and high-dimensional features. This article proposes a unified architecture from first principles: structure-preserving mapping, unified attention operator, progressive compression and hybrid masking, along with competition advancement and industrial deployment paths.
---

> **Preface**
> This article is my systematic reflections on the competition topic "Towards Unifying Sequence Modeling and Feature Interaction for Large-scale Recommendation" during the TAAC2026 competition.
>
> The article **contains no code**; it answers only three questions: why unify, what to unify, and how to unify. It is a theoretical derivation and architectural design, not a final technical report.
>
> The reason for publishing during the mid-competition period is to archive these reflections early and exchange ideas with peers. Subsequently, I will iterate on this article based on experimental results from the competition, and publish a complete technical report.
>
> Criticism, discussion, and corrections are welcome.

---

## Article Summary (Suitable for Social Media Sharing)

> After twenty years of industrial recommendation systems, we've grown accustomed to the separation paradigm of "sequence modeling + feature interaction." But when sequences grow from dozens to thousands and features from dozens to hundreds, the three hidden assumptions behind this paradigm are crumbling one by one.
>
> Starting from first principles, this article proposes a **unified architecture** design philosophy:
> - Unifying three heterogeneous data types — sequences, sets, and scalars — into the same vector space
> - Using **structure-preserving mapping** to preserve original data's order relations and permutation invariance
> - Completing the sequence-feature direct interaction missing from the traditional paradigm through a **unified attention operator**
> - Introducing **progressive compression** and **hybrid masking** to balance information completeness and computational efficiency
>
> The article also provides complete competition advancement strategy, risk analysis, and industrial deployment paths for the unified architecture.
>
> This is a "zero-code, full-thinking" technical white paper. Whether or not you're participating in TAAC2026, if you're interested in the essence of recommendation systems, this article may be worth reading.

---

> This article offers deep reflections on the TAAC2026 competition topic "Towards Unifying Sequence Modeling and Feature Interaction for Large-scale Recommendation." No code is written; only three questions are answered: **why unify, what to unify, and how to unify.**

---

## Preface: A Worker's Confusion

I've been working on recommendation systems. From collaborative filtering to Transformer, from CPU to GPU, from millions of parameters to billions. But in the last two years, I've become increasingly confused.

The confusion isn't about the technology itself — technology keeps advancing, models keep growing, metrics keep improving. My confusion is: **what exactly are we optimizing?**

Every time I see big companies increase sequence model depth from 12 to 24 layers, AUC rises by three ten-thousandths, and latency doubles, I wonder: how long can this path continue?

Every time I see feature interaction modules evolve from FM to DeepFM, from DCN to DCN V2, from Wukong to RankMixer, while the core "compress first, then interact" pipeline hasn't changed in twenty years, I wonder: are we using increasingly complex tools to solve a problem that should have been restructured?

The TAAC2026 competition topic "Unifying Sequence Modeling and Feature Interaction" showed me a possibility: perhaps the problem isn't that sequence models aren't deep enough, or that interaction modules aren't strong enough, but that **we split the recommendation system wrong from the beginning**.

This is the starting point of this article. I want to start from first principles and re-ask the most basic question: what exactly is a recommendation system doing?

---

## One: One Sample, Two Structures

Open the TAAC2026 dataset, and each row is a training sample. It looks like this:

> A user, at a certain time, facing an item. The system must determine: will the user convert on this item?

What does this sample contain?

- **user_id**: who the user is
- **item_id**: what the item is
- **seq_feature**: the user's historical behavior sequence (clicks, conversions, impressions)
- **user_feature**: the user's profile (age, gender, spending capacity)
- **item_feature**: the item's attributes (category, brand, price)
- **timestamp**: when it happened

This is a complete recommendation decision scenario. All information is here.

The problem now is: this information has **two completely different structures**.

**The first structure: sequence structure.**

Historical behaviors are a series of events, arranged by time. Each event has a temporal order and causal dependencies. You can't arbitrarily rearrange them — moving a book the user recently purchased to three years ago changes its meaning. The essence of sequence structure is **temporality**.

**The second structure: set structure.**

Features in the user profile have no order. "Age=25" and "Gender=Male" can swap positions without changing the meaning. The same applies to item attributes. The essence of set structure is **unorderedness**.

A recommendation system must handle both sequences and sets simultaneously. This is like a person who must understand both the storyline on a timeline and the semantics of a pile of tags. Two completely different cognitive modes must be accomplished in the same brain.

This is where the problem begins.

---

## Two: History's Answer — Separate, Then Concatenate

Faced with this problem, the industry's answer over the past twenty years has been: **process separately, then concatenate**.

Specifically, two technical routes developed in parallel.

**Route One: Sequence Modeling.**

Input the historical behavior sequence, output an "interest vector." This route went from LSTM to Transformer, from SASRec to LONGER. Its core assumption: the sequence can be compressed into a fixed-length vector that preserves all important information.

**Route Two: Feature Interaction.**

Input user profile, item attributes, and contextual signals, output a "feature vector." This route went from FM to DeepFM, from DCN to RankMixer. Its core assumption: high-order interactions between features can be automatically learned.

Finally, the two vectors are concatenated, passed through an MLP, and a prediction is output.

This is the standard paradigm of today's industrial recommendation systems. It has a nice name: "encode-then-interaction pipeline."

This paradigm was successful for a long time, because sequences were short and features were few — separate processing was simple and efficient. But when sequences grow from dozens to hundreds to thousands, and features from dozens to hundreds to over a thousand, this paradigm's cracks began to appear.

---

## Three: Where the Cracks Lie — Three Overlooked Assumptions

The separation paradigm works because it rests on three hidden assumptions. These assumptions hold when data volumes are small, but today they're being broken one by one.

**Assumption One: Sequences can be compressed into vectors without losing critical information.**

A user's historical behaviors may number in the thousands. Compressing these thousands of behaviors into a vector of a few hundred dimensions is like saying: all the important information from these thousands of events can fit into a single bottle.

But is this true?

Consider a real user: they might have been following science fiction novels last month, and suddenly became obsessed with philosophy this month. Their interest trajectory isn't a straight line but a zigzag. Compressing this into a single vector, the turning point disappears. They may have彻底 changed their interest preferences after a certain purchase, and this "turning point" itself may be the most important information. Compressing into a vector, it's gone.

This is why recent research finds that increasing sequence model depth yields diminishing returns — it's not that the model is inadequate, but that **compression itself** is an information-losing process.

**Assumption Two: Feature interaction can be placed after sequence compression.**

In the separation paradigm, the sequence module outputs first, then the feature module begins working. This means the feature module can only see the compressed sequence, not the original sequence.

This is like two people conversing: one person finishes speaking first, then the other responds. This isn't genuine dialogue. Genuine dialogue is: you say something, I reply, your next statement changes because of my reply. The relationship between sequence and features should be like this. Features should know who the user is when interpreting historical behaviors; historical behaviors should know what the current candidate item is when being compressed.

But now, this "dialogue" has been cut into two segments. The first segment has no feature participation; the second segment has no original sequence participation.

**Assumption Three: The two modules can be independently optimized.**

In industrial practice, the sequence module and feature module are often two teams, two codebases, two optimization strategies. The sequence team optimizes its own loss, the feature team optimizes its own loss, and finally they're concatenated and tuned together.

But the real optimization target is only one: prediction accuracy. The sequence module's parameter adjustments should serve whether the feature module "uses them well"; the feature module's parameter adjustments should serve whether the sequence module "compresses correctly." This mutual dependence is hard to achieve in a separated architecture.

These three assumptions were reasonable approximations when data volumes were small. But as sequences grow longer and features proliferate, approximation becomes distortion, and distortion becomes bottleneck.

---

## Four: If We Designed from Scratch, What Would We Do?

Now, let's conduct a thought experiment.

Discard all historical baggage, leave behind the prejudice of "sequence first, then features." We only have the TAAC2026 dataset in hand: user profiles, item attributes, behavior sequences, timestamps. We must design a recommendation system from scratch.

What would we do?

I would think this way: **all information is "signal," just in different forms. My task is to place these differently-formed signals in the same space and let them freely interact.**

This idea isn't arbitrary. It comes from a more fundamental question: **what exactly is a recommendation system doing?**

Looking at the surface, a recommendation system is "predicting": input information, output scores. But if we ask further: why does prediction require so much information? The answer becomes: because we need to **understand** the user.

Prediction is the goal, but understanding is the means. A system that truly understands the user, recommendation is merely a byproduct. A system that doesn't understand the user, prediction is merely statistics.

So, the core of a unified architecture isn't "unification," but "understanding." It simulates this process: when facing all of a user's information, you don't first process them separately and then combine them. Instead, you let them mutually explain, mutually correct, and ultimately form a complete understanding of the user.

Let me illustrate with an example.

Suppose a user with the following information:
- Profile: 25 years old, male, likes technology
- Historical behavior: watched 5 philosophy videos and bought 2 logic books in the past week
- Context: late night, phone, commuting

If we only look at the profile, we'd think they should like tech products. If we only look at historical behavior, we'd think they're entering a philosophy interest phase. If we only look at context, we'd think they're better suited for fragmented content.

But putting all this information together, a more complete understanding emerges: this user may be transitioning from tech interests to philosophy interests, and during late-night commuting they need light, fragmented content, not lengthy discourse. So, if the candidate item is a philosophy introductory book, it should score high; if it's a deep tech article, it should score low.

This "understanding" process is what the unified architecture aims to simulate. It doesn't compress information into vectors and concatenate them, but lets information mutually explain and mutually correct within the same space.

---

## Five: The Mathematical Essence of Unified Architecture — Structure-Preserving Mapping

If we want to transform the感性 term "understanding" into a computable architecture, we need to return to the underlying logic of algebra and operators. The unified architecture is mathematically not a simple feature concatenation, but a **Structure-Preserving Mapping**.

### 5.1 Definition of Heterogeneous Input Space

In the TAAC2026 scenario, we define the sample input as a heterogeneous tuple $\mathcal{X}$:

$$\mathcal{X} = (\mathcal{S}, \mathcal{F}, \mathcal{C})$$

Where:

- $\mathcal{S}$ (Sequence): an ordered set with elements arranged by timestamp, satisfying a total order relation $s_1 \prec s_2 \prec \dots \prec s_n$.
- $\mathcal{F}$ (Field-wise Set): a finite set $\{f_1, f_2, \dots, f_m\}$ with unordered elements. Any processing function $g$ applied to $\mathcal{F}$ should satisfy permutation invariance: for any permutation $\pi$, $g(f_1, \dots, f_m) = g(f_{\pi(1)}, \dots, f_{\pi(m)})$.
- $\mathcal{C}$ (Contextual Scalars): a subset of $\mathbb{R}^k$ with metric structure (distances between numerical values are meaningful).

### 5.2 Structure-Preserving Mapping $\Phi$

The first step of unified architecture is finding a set of mapping functions $\Phi = (\Phi_S, \Phi_F, \Phi_C)$ that project these three types of objects into the same vector space $\mathbb{R}^d$. The key constraint: mappings must preserve the intrinsic structure of the original data.

**Sequence structure preservation**: For $\mathcal{S}$, the mapping must encode temporal order. By叠加 position encoding $P$, mapped tokens contain order-relation information:

$$\Phi_S(s_i) = \text{Embed}(s_i) + P(i)$$

Where $P$ is a monotonic function (such as RoPE or sinusoidal encoding), ensuring $i < j \Rightarrow P(i) \neq P(j)$, thereby preserving the original ordered set's order relations in vector space.

**Set structure preservation**: For $\mathcal{F}$, the mapping must ensure semantic independence among features. Each feature is independently encoded as a token:

$$\Phi_F(f_j) = \text{Embed}(f_j, \text{field}_j)$$

Since each feature is independently mapped, subsequent processing of these tokens only needs to use symmetric functions (such as self-attention) to naturally satisfy permutation invariance.

**Scalar property preservation**: For $\mathcal{C}$, a continuous function preserves the metric relation of numerical values — similar values map to similar vectors:

$$\Phi_C(c) = \sigma(\mathbf{W} \cdot c + \mathbf{b})$$

### 5.3 Unified Attention Operator

After all signals are mapped to $\mathbb{R}^d$, we define the unified representation $\mathbf{Z}$ as the concatenation of all tokens:

$$\mathbf{Z} = [\Phi_S(s_1), \dots, \Phi_S(s_n),\ \Phi_F(f_1), \dots, \Phi_F(f_m),\ \Phi_C(c)]$$

The core operator of unified architecture performs multi-layer self-attention on $\mathbf{Z}$. At layer $l$:

$$\mathbf{Z}^{(l+1)} = \text{Softmax}\left( \frac{(\mathbf{Z}^{(l)}\mathbf{W}_Q)(\mathbf{Z}^{(l)}\mathbf{W}_K)^\top}{\sqrt{d}} \odot \mathbf{M} \right) (\mathbf{Z}^{(l)}\mathbf{W}_V)$$

Where $\mathbf{M}$ is the hybrid masking matrix. This attention matrix can be decomposed into four sub-matrices by token type:

$$\mathbf{A} = \begin{pmatrix} \mathbf{A}_{SS} & \mathbf{A}_{SF} \\ \mathbf{A}_{FS} & \mathbf{A}_{FF} \end{pmatrix}$$

- $\mathbf{A}_{SS}$ (upper left): self-attention within the sequence, applying causal masking, equivalent to traditional Transformer sequence modeling.
- $\mathbf{A}_{FF}$ (lower right): fully-connected attention among features, equivalent to DCN/DeepFM's implicit high-order crossing.
- $\mathbf{A}_{FS}$ (lower left): features' attention to sequence — feature tokens can回顾 the entire historical sequence.
- $\mathbf{A}_{SF}$ (upper right): sequence's attention to features — historical behaviors can参考 user profiles and item attributes.

**This is the mathematical meaning of "unification"**: the separation paradigm only has $\mathbf{A}_{SS}$ and $\mathbf{A}_{FF}$; the off-diagonal sub-matrices $\mathbf{A}_{FS}$ and $\mathbf{A}_{SF}$ are missing. Unified architecture completes this matrix, enabling direct information flow between sequence and features.

### 5.4 From Compression to Evolution

Ultimately, the prediction function becomes a global mapping over all information interactions:

$$P(\text{Conversion}) = \sigma(\text{Readout}(\mathbf{Z}^{(L)}))$$

Here the $\text{Readout}$ operator can be extraction of the candidate item token, or a dedicated query vector.

The mathematical essence of unified architecture is using attention matrix completeness to replace the artificially designed "sequence compression + feature crossing" combination. It no longer人为 prescribes who computes first, but lets all tokens within the same attention matrix spontaneously find the most effective interaction paths through backpropagation.

---

## Six: Three Technical Paths, Three Levels

Over the past two years, academia and industry have begun exploring unified architectures. OneTrans, HyFormer, and PLR are representatives. They appear different, but viewed through the "structure-preserving mapping" framework, they are three different levels of unified architecture.

**First Level: Serialized Unification (OneTrans)**

OneTrans's approach: turn all information into sequences. Historical behaviors are sequences; user features, item features, and context are also turned into sequences (each feature becomes a token). Then concatenate these sequences into a large sequence and process with causal Transformer.

This approach is straightforward: since sequence models are the most mature, serialize everything. Its advantages are simplicity, unification, and the ability to reuse LLM optimization techniques. The challenge: turning unordered sets into ordered sequences introduces a "order selection" problem — where should user features be ranked? This choice may affect results.

Under Chapter Five's framework, OneTrans completes the off-diagonal portion of the attention matrix, but applies causal masking to $\mathbf{A}_{FF}$ — an unnecessary constraint for an unordered feature set.

**Second Level: Alternating Optimization Unification (HyFormer)**

HyFormer's approach: don't compress all information into one sequence, but introduce a set of "global tokens" that alternate between sequence decoding and feature enhancement.

Specifically, each layer does two things: first, use global tokens to "read" the historical behavior sequence (extracting information from the sequence), then use user features and item features to "enhance" these global tokens (letting features修正 the sequence's understanding). Then repeat this process.

This approach solves OneTrans's problem: sequence and features have different properties; when processed together, it's hard to让 them converse equally. Through global tokens as intermediaries, HyFormer实现了 bidirectional information flow — sequences can influence features, and features can influence sequences.

Under Chapter Five's framework, HyFormer indirectly实现了 $\mathbf{A}_{FS}$ and $\mathbf{A}_{SF}$ through global tokens, while avoiding applying causal masking to features. The cost is introducing additional architectural complexity.

**Third Level: Reasoning Unification (PLR)**

PLR's idea: unified architecture is not the ultimate goal; enabling the model to "think" is what matters.

It divides recommendation into two steps: first, rapid encoding yields an initial representation (fast thinking), then multi-step reasoning refines this representation (slow thinking). Meanwhile, multi-path parallel reasoning is introduced to avoid bias from a single reasoning path.

This approach answers a deeper question: different users have different complexity, why use the same computation? A cold-start user with only a few historical behaviors doesn't need much reasoning; an established user with thousands of behaviors deserves more computation to understand. PLR's multi-step reasoning allows the model to dynamically allocate computational resources at test time.

**The relationship among the three levels**

- Serialized unification solves the problem of "where information is placed."
- Alternating optimization unification solves the problem of "how information flows."
- Reasoning unification solves the problem of "how computation is allocated."

They are three levels that can be stacked. You can introduce HyFormer's alternating ideas within OneTrans's serialization framework, plus PLR's multi-step reasoning. This is the complete picture of unified architecture.

---

## Seven: Unified Architecture Design from TAAC Data

Theory is done; let's return to the TAAC2026 dataset. If we truly want to design a unified architecture, how specifically should we proceed?

### 7.1 Constructing Tokens

TAAC provides rich data. Historical behaviors have three sub-sequences: item_seq (item IDs), action_seq (action types), and content_seq (content features). These three sub-sequences correspond to the same timeline, so each time point's behavior should be encoded as the same token.

This token contains three types of information: item ID embedding, action type embedding, and content feature aggregation. Thus, each historical behavior token carries complete information about "what the user did, to which item, at what time." The token generation process is itself a miniature "unification" — merging different information at the same time point into one vector.

User profiles and item attributes each become separate tokens per feature. For example, "Age=25" is one token, "Gender=Male" is another. Context is similarly handled.

### 7.2 Ordering Sequence

Tokens exist; order must be decided. A natural ordering is:
1. Historical behavior tokens (by time order)
2. User feature tokens
3. Item feature tokens
4. Context tokens

Thus, later tokens (features) can see earlier tokens (historical behaviors), but historical behaviors cannot see features (consistent with causality). In subsequent modules, features can "look back" at historical behaviors, but historical behaviors won't change due to features — this aligns with intuition: a user's past doesn't change because of the item currently being recommended, but our understanding of the past differs depending on the current item.

### 7.3 Hybrid Masking

This is the key design distinguishing unified architecture from simple concatenation. The attention mask must simultaneously satisfy two constraints:

- Within the sequence: causal masking. Each historical behavior token can only see tokens before it, not future ones.
- Feature section: fully-connected masking. Feature tokens freely interact among themselves and can回顾 the entire historical sequence.

The boundary of this hybrid mask is determined by token type — the dividing line between sequence tokens and feature tokens must be explicitly tracked in each layer, especially after introducing progressive compression, as this boundary dynamically changes.

### 7.4 Progressive Compression

Stack multiple layers. In later layers, progressively compress the number of historical behavior tokens. For example, from 100 down to 50, then down to 20, until only a few "essence tokens" remain.

Compression strategies include several choices:
- Attention-weight-based selection: retain sequence tokens receiving the most attention from other tokens.
- Learned pooling: use trainable query vectors to extract a fixed number of精华 from sequence tokens.
- Time-decay-based truncation:优先 preserve recent behavior tokens.

Each strategy has different inductive biases. Attention-weight-based selection lets the model自己 decide what's important; time-decay-based truncation introduces the prior that "recent behaviors are more important." In practice, combinations may be needed.

Note: compressed-out tokens no longer participate in subsequent computation, but their information has already been transferred to preserved tokens through attention in earlier layers. This is the essential difference between progressive compression and simple truncation — not discarding information, but distilling it.

Feature tokens are not compressed, always remaining independent. Because each feature has independent semantics; compression would破坏 set structure.

### 7.5 Prediction

In the final layer, all tokens' outputs are fed into a simple prediction layer. The essence tokens of historical behaviors, user feature tokens, item feature tokens, and context tokens — their final representations jointly determine conversion probability.

This is a complete unified architecture design. It has no "sequence first, then features" stage划分; all information interacts from the first layer until the final layer outputs.

Using Chapter Five's language: this design completes all four sub-matrices of the attention matrix while maintaining sequence causality and feature permutation invariance through hybrid masking. Progressive compression controls computational complexity, making unified architecture feasible under industrial latency constraints.

### 7.6 Pseudocode

To make the above design more concrete, here is the pseudocode for unified architecture. It shows how data transforms from heterogeneous "fragments" into uniform "token flow," finally completing cross-domain interaction within the same attention matrix.

```
class UnifiedRecommender:
    """
    TAAC2026 Unified Architecture Illustrative Pseudocode
    Core idea: Everything is a Token; Interaction is Attention
    """
    def __init__(self, config):
        self.embed_dim = config.dim
        self.transformer_blocks = [TransformerBlock(config) for _ in range(config.layers)]
        self.output_head = MLP([config.dim, 1])

    def forward(self, behavior_seq, user_features, item_features, context):
        # --- Step 1: Structure-preserving tokenization Φ_S, Φ_F, Φ_C ---

        # Φ_S: Sequence tokens, fusing ID, action type, and content semantics,叠加 position encoding
        seq_tokens = self.encode_sequence(
            behavior_seq.item_ids,
            behavior_seq.actions,
            behavior_seq.content_vectors
        )
        seq_tokens += self.position_encoding(behavior_seq.timestamps)

        # Φ_F: Feature tokens, each feature independently mapped
        user_tokens = self.encode_features(user_features)
        item_tokens = self.encode_features(item_features)

        # Φ_C: Context tokens, continuous scalar encoding
        ctx_tokens = self.encode_context(context)

        # --- Step 2: Assemble unified input sequence Z ---
        # Z = [Φ_S(s_1), ..., Φ_S(s_n), Φ_F(f_1), ..., Φ_F(f_m), Φ_C(c)]
        seq_len = seq_tokens.shape[1]
        feat_len = user_tokens.shape[1] + item_tokens.shape[1] + ctx_tokens.shape[1]
        unified_stream = concat([seq_tokens, user_tokens, item_tokens, ctx_tokens], dim=1)

        # --- Step 3: Unified backbone computation ---
        # Boundary between sequence and feature tokens must be tracked, as progressive compression changes it
        seq_boundary = seq_len

        for layer_idx, block in enumerate(self.transformer_blocks):
            # Construct hybrid mask:
            #   A_SS: Causal mask (within sequence, past cannot see future)
            #   A_FF: Fully-connected mask (features freely interact)
            #   A_FS: Fully-connected mask (features can回顾 entire sequence)
            #   A_SF: Optional (whether sequence can see features, depends on design choice)
            mask = build_hybrid_mask(seq_boundary, total_len=unified_stream.shape[1])

            unified_stream = block(unified_stream, mask=mask)

            # Progressive compression: after specified layers, reduce sequence token count
            if layer_idx in self.compression_layers:
                seq_part = unified_stream[:, :seq_boundary, :]
                feat_part = unified_stream[:, seq_boundary:, :]

                # Compress sequence tokens (retain top-k or learned pooling)
                seq_part = self.compress(seq_part, target_len=seq_boundary // 2)
                seq_boundary = seq_part.shape[1]

                # Feature tokens not compressed, re-concatenate
                unified_stream = concat([seq_part, feat_part], dim=1)

        # --- Step 4: Readout and prediction ---
        # Extract final representation of candidate item token (or global pooling)
        final_representation = self.readout(unified_stream, seq_boundary)

        return self.output_head(final_representation)
```

---

## Eight: Why Do This — Three Pragmatic Reasons

A technical route must not only be explainable and achievable, but also withstand追问. Unified architecture has three core values in industrial scenarios, but each needs honest discussion of its boundaries.

**First, Structurally reducing information loss.**

Information loss in the separation paradigm occurs at two points: when the sequence is compressed into a vector, and when feature interaction lags behind sequence encoding. Unified architecture eliminates both loss sources by design — all information is preserved until the last moment, all interactions occur at the first opportunity.

But to be honest: less information loss doesn't necessarily mean better performance. More information also means more noise. Whether unified architecture can effectively extract signal from noise depends on attention mechanisms' learning quality and training data sufficiency. This is an experimentally verifiable question, not one theoretically guaranteed.

Unified architecture provides a higher ceiling, not a higher floor.

**Second, Inference efficiency can be controlled.**

On the surface, unified architecture has larger computation — sequence and features are computed together, the attention matrix is larger. But two mechanisms make its actual inference cost controllable:

Progressive compression lets sequence token count逐层递减; later layers' computation is far less than earlier layers. KV caching lets the user's historical behavior representation be reused across multiple candidate items within the same session — the user-side computation is done once; each candidate item only needs incremental computation.

It should be noted that these two optimization techniques can also be used in the separation paradigm. The separation paradigm's sequence module can also do KV caching. Unified architecture's efficiency advantage lies not in these techniques themselves, but in merging sequence and feature computation into the same forward pass, reducing inter-module data transfer and redundant computation.

OneTrans's experiments have already shown that under equivalent parameter scale, unified architecture's inference latency is comparable to the separation paradigm. This indicates efficiency is not unified architecture's bottleneck.

**Third, Significantly reduced engineering complexity.**

This is unified architecture's most easily underestimated advantage.

The separation paradigm has two sets of code: the sequence model and the feature interaction model. Each has its own hyperparameters, optimization strategies, and tuning methods. In industrial practice, this means two teams, two deployment processes, two failure modes. When the sequence module is updated, the feature module may need re-tuning; when the feature module has a bug, it's hard to determine whether it's its own problem or a consequence of the sequence module's output changes.

Unified architecture has only one set of stackable modules. Increasing depth means adding layers; increasing width means expanding dimensions; adding new features means adding tokens. One team maintains one codebase, one deployment process, one failure mode.

For any company relying on recommendation systems, maintenance cost reduction is real money.

---

## Nine: Not Finished Yet — Unsolved Problems within Unified Architecture

Unified architecture is not the endpoint; it merely transforms the problem from "how to process separately" to "how to process together." This brings several new,值得 deep exploration questions.

**Question One: What is the optimal ratio of different token types?**

In the unified sequence, the quantity ratio of sequence tokens to feature tokens affects attention allocation. If sequence tokens vastly outnumber feature tokens (e.g., 500:50), feature token signals may be淹没; conversely, if feature tokens are too many, sequence temporal dynamics may be稀释.

Does an optimal ratio exist? Does it vary with task, dataset, and model scale? This requires systematic experimentation.

**Question Two: What is the theoretically optimal progressive compression strategy?**

Chapter Seven discussed three compression strategies (attention weights, learned pooling, time decay), but didn't answer: under what conditions is which strategy optimal? How should compression ratios change across layers? Is there an information-theoretic lower bound — at what compression level must critical information be lost?

Answering these questions may require Information Bottleneck theory or Rate-Distortion Theory.

**Question Three: What are the scaling behaviors of unified architecture?**

Language models have clear scaling laws: performance grows as a power-law relation with parameters, data, and computation. Does unified recommendation architecture have similar regularities?

If so, is its scaling efficiency higher than the separation paradigm? That is, doubling parameters, does unified architecture's AUC gain exceed the separation paradigm's? The answer is crucial for industry deciding whether to invest resources in migrating to unified architecture.

**Question Four: After input unification, can output also be unified?**

Currently, unified architecture solves "input unification" — placing differently structured information in the same space. But the output remains a scalar score. If we view recommendation as a generative problem, letting the model directly "generate" the next item's ID or semantic representation, like language models generating the next token, what would happen? TAAC's seq_feature naturally suits this generative modeling. This is a leap from discriminative recommendation to generative recommendation, and a natural extension of unified architecture.

---

## Ten: Returning to First Principles

Writing到这里, I want to return to the initial question: what exactly is a recommendation system doing?

On the surface, it predicts conversion probability. Looking deeper, it's doing pattern matching. Looking even deeper, it's trying to understand the user.

A system that truly understands the user doesn't拆分 the user's information into sequences and features, process them separately, then拼凑 them together. It places all information in the same space and lets it freely interact, forming a complete understanding of the user.

The separation paradigm is a product of history, not a logical necessity. The separation of sequences and features is essentially the separation of two modeling traditions. When we return to first principles, this separation no longer exists — the user's information is the user's information,不分 sequences and features.

The significance of unified architecture lies not in how many percentage points it improves over the separation paradigm, but in returning recommendation systems to where they should be: a system that truly understands the user, rather than a machine拼凑 from two models.

This is the conclusion of the first half. The second half discusses how to turn this idea into reality — from competition strategy to engineering deployment.

---

# Second Half: From Idea to Reality

> The first half answered "why unify" and "what to unify." The second half answers the final question: **how to unify** — not writing code, but writing strategy. How to transform unified architecture from an idea into reality in an international competition like TAAC2026.

---

## Eleven: The Essence of Competition — Verifying a Direction in the Shortest Time

TAAC2026 is not an ordinary Kaggle competition. It has an independent innovation award; the evaluation criterion is "novelty and insight," not absolute AUC.

This means we can do something many competitions discourage: **don't chase the leaderboard, only do what's right.**

This isn't abandoning AUC. It means we pursue AUC not by tuning parameters, stacking models, or overfitting the validation set, but through architectural innovation, fundamentally improving the model's unified understanding of sequences and features. If this direction is right, AUC will naturally rise; if ACU doesn't rise, it means our understanding isn't deep enough, and we need to go back and修正 assumptions.

The essence of competition: **use the shortest time to verify the value of a direction.**

So, what direction are we verifying?

Reviewing the first half's conclusion: unified architecture, by completing the off-diagonal sub-matrices of the attention matrix, enables direct information flow between sequences and features, thereby structurally eliminating the separation paradigm's information loss. This conclusion is theoretical derivation, not experimental fact. The competition is the opportunity to turn it into experimental fact.

---

## Twelve: Competition Positioning and Differentiation

Before动手, three positioning questions must be clearly thought through.

**What's our differentiation from other competing teams?**

Most teams will走 two paths: one is pushing mature separation paradigm (SASRec + DCN V2) to极致; the other is running results with existing unified architectures (e.g., directly reproducing OneTrans).

Our differentiation lies not in what model we use, but in **the depth of our understanding of the problem.** The first half's analysis — three overlooked assumptions, structure-preserving mapping, sub-matrix decomposition of the attention matrix — these aren't装饰 but the basis for design decisions. Every architectural choice can be traced to a clear principle. This "well-grounded" design style is exactly what the innovation award评审 most values.

**What are our resource constraints?**

Competition duration approximately three months. Assume a 2-3 person team, each effectively working 4-6 hours daily. GPU resources are limited, perhaps only a few consumer-grade cards or on-demand cloud instances. This means we can't do large-scale hyperparameter search; every experiment must have a clear hypothesis and expectation.

**What is our risk appetite?**

Unified architecture is a new direction; failure probability is not low. If the first submission's AUC is below baseline, do we have the courage to continue? The answer should be: yes, provided we can diagnose the cause. So, each step must设计 controlled experiments, ensuring we can定位 problems when failure occurs.

---

## Thirteen: Five Stages, Ten Weeks of Advancement

Based on the above positioning, we divide the competition into five stages. Each stage has clear objectives, specific work, and clear acceptance criteria.

### Stage One: Understand the Data, Establish Baselines (Weeks 1-2)

**Objective**: Ensure no偏差 in understanding the data; establish a reliable comparison基准.

Specific work:

1. Parse every field of TAAC data. Pay special attention to the three sub-sequences of seq_feature (item_seq, action_seq, content_seq) — their length distribution, missing rate, and value range.
2.统计 positive-negative sample ratio, user activity distribution, and item popularity distribution. These statistics affect subsequent sampling strategy and loss function design.
3. Implement the simplest baseline: average pooling of historical behaviors, concatenated with user features and item features, passed through a three-layer MLP. Record AUC and inference latency.
4. Implement a stronger baseline: use SASRec to encode historical behaviors, DCN V2 for feature interaction, then concatenate for prediction. This is the separation paradigm's standard implementation.

Acceptance criteria: Both baselines run成功, AUC is reasonable (not random 0.5), inference latency is within limits.

The core principle of this stage is **don't rush forward.** Baselines aren't wasting time; they're the anchor for all subsequent experiments. Without reliable baselines, no improvement can be accurately measured.

### Stage Two: Build Unified Tokenization Module (Weeks 3-4)

**Objective**: Implement the tokenization scheme described in Chapter Seven of the first half; verify token quality.

Specific work:

1. Implement sequence token encoding. Key decision: how to fuse item_id embedding, action_type embedding, and content_vector aggregation?

   Three candidate approaches:
   - Concatenation followed by linear layer: $\mathbf{h} = \mathbf{W}[\mathbf{e}_{item}; \mathbf{e}_{action}; \mathbf{v}_{content}] + \mathbf{b}$
   - Element-wise addition: $\mathbf{h} = \mathbf{e}_{item} + \mathbf{e}_{action} + \mathbf{v}_{content}$
   - Gated fusion: use a gating mechanism to dynamically determine the weights of the three

   Concatenation followed by linear layer is the most稳妥 choice, because it doesn't假设 the three types of information have identical dimensions or equal importance. Gated fusion is theoretically more flexible, but introduces additional parameters and tuning complexity. Recommend starting with concatenation; if performance is insufficient, try gated.

2. Implement feature token encoding. Each discrete feature uses field-aware embedding: the same feature value has different embeddings under different fields. This is FFM's classic idea, still applicable in unified architecture.

3. Implement position encoding. TAAC's timestamps are real time, not simple sequence numbers. Recommend time-aware position encoding (such as Time2Vec or logarithmic time interval encoding) rather than standard sinusoidal position encoding. Because user behavior time intervals are uneven — the temporal distance between a behavior two days ago and one two months ago is vastly different; standard position encoding cannot capture this difference.

4. Verify token quality. Use a simple self-attention model (2-layer Transformer) to process the unified token sequence, compare against Stage One baselines. If AUC improves, the tokenization scheme is effective; if not, diagnose whether the issue is token encoding or model capacity.

Acceptance criteria: Unified tokenization + simple Transformer's AUC不低于 separation paradigm baseline.

### Stage Three: Implement Unified Backbone and Hybrid Masking (Weeks 5-6)

**Objective**: Build the complete unified architecture, including hybrid masking and progressive compression.

Specific work:

1. Implement hybrid masking. This is the core distinguishing unified architecture from ordinary Transformer. The mask matrix must be dynamically generated based on token type:

   - Sequence×Sequence region: lower-triangular causal mask
   - Feature×Feature region: all 1s (fully connected)
   - Feature×Sequence region: all 1s (features can see all historical behaviors)
   - Sequence×Feature region: here is a design choice — should historical behavior tokens be allowed to see user features and item features?

   Reason for allowing: User profiles can help the sequence model better understand behavior meanings (the same click behavior means different things for users of different age groups). Reason for not allowing: Maintain strict causality, avoid information leakage. Recommend first allowing sequence to see user features (because user profiles existed when behaviors occurred), but not allowing sequence to see candidate item features (because the candidate item is "future" information).

2. Implement progressive compression. Choose one of the three strategies discussed in the first half as the starting point. Recommend starting with the simplest: learned pooling. Specifically, after specified layers, use $k$ trainable query vectors to perform cross-attention on sequence tokens, outputting $k$ compressed tokens.

   Compression schedule design: Assume model has 8 layers, initial sequence length 200. At layer 3, compress to 100; at layer 6, compress to 50. Final sequence tokens entering the prediction layer are only 50, plus feature tokens (assume 50), totaling 100 tokens. Attention computation at this scale is feasible under industrial latency constraints.

3. Controlled experiments. Compare unified architecture against Stage One separation paradigm baseline. Simultaneously run an ablation: remove the off-diagonal parts of hybrid masking (set $\mathbf{A}_{FS}$ and $\mathbf{A}_{SF}$ to zero), see how much AUC drops. If the drop is significant, sequence-feature direct interaction indeed has value; if the drop is small, our theoretical assumptions may need修正.

Acceptance criteria: Unified architecture's AUC exceeds separation paradigm baseline, and ablation proves off-diagonal interaction has contribution.

### Stage Four: Diagnosis, Optimization, and Scaling Analysis (Weeks 7-8)

**Objective**: Diagnose model weaknesses, optimize针对性的, while collecting scaling law data.

Specific work:

1. Error analysis. Find samples where the model predicts most inaccurately, analyze their commonalities. Common patterns include:
   - Cold-start users (extremely short history): Can unified architecture better utilize feature information to弥补 insufficient sequence information?
   - Interest-drift users (recent behaviors contradict historical behaviors): Does progressive compression preserve recent turning signals?
   - Long-tail items (candidate items rarely appear in training set): Do item feature tokens provide sufficient generalization capability?

   For each pattern,设计 corresponding improvement方案. For example, for cold-start users, add a "history length" scalar token in feature tokens,让 the model explicitly感知 information sufficiency.

2. Inference optimization. Implement KV caching: for the same user's multiple candidate items, pre-compute user-side (historical behaviors + user features) K and V, only computing candidate item-side incrementally. Measure optimized inference latency, ensure within limits.

3. Scaling analysis. This prepares data for the scaling law innovation award. Design the following experiments:
   - Fix data volume, model parameters from 1M growing to 100M (by adjusting layer count and width), record AUC at each scale.
   - Fix model scale, training data from 10% growing to 100%, record ACU at each ratio.
   - Run the same experiments for the separation paradigm baseline as control.

   If unified architecture's AUC-parameter curve slope is larger (i.e., per-unit parameter AUC gain is higher), this proves unified architecture's scaling efficiency is superior. This is a powerful argument.

Acceptance criteria: Error analysis completed, at least one针对性 optimization带来 AUC improvement, scaling analysis data collected.

### Stage Five: Wrap-up and Submission (Weeks 9-10)

**Objective**: Stabilize the model, write technical report, prepare final submission.

Specific work:

1. Final tuning. On the foundation of the first four stages, do one last round of hyperparameter adjustment. Focus on: learning rate decay strategy, dropout ratio, compression schedule. No major architectural changes; only微调.

2. Stability verification. Run 3-5 times with different random seeds, confirm AUC variance is within acceptable range. If variance is too large, the model is sensitive to initialization; investigate causes.

3. Write technical report. This is the core material for innovation award评审. Recommended report structure:

   - Problem definition: Three hidden assumptions of the separation paradigm and their limitations (corresponding to Chapter Three of the first half)
   - Method design: Structure-preserving mapping, unified attention operator, hybrid masking, progressive compression (corresponding to Chapters Five and Seven of the first half)
   - Experimental design: Baseline selection, ablation experiments, error analysis, scaling analysis
   - Results and discussion: Quantitative results, attention visualization, scaling curves
   - Conclusions and limitations: Unified architecture's value and current方案's不足

   Technical report writing principles: **clear, confident, honest.** Don't exaggerate results, don't回避 failures. If an ablation result doesn't match expectations, report it honestly and analyze原因 — this is more persuasive than only showing positive results.

4. Code整理. Modular design, detailed comments, configuration management.评审 experts will read code; clean code is itself proof of professional capability.

Acceptance criteria: Technical report completed, code整理完毕, final results submitted.

---

## Fourteen: Risk Analysis — What If Unified Architecture Fails?

Any honest strategy must include a Plan B. Unified architecture may fail, and the reasons for failure may vary.

**Failure Mode One: AUC worse than separation paradigm baseline.**

Possible causes:
- Tokenization scheme不合理; different information types interfere in the same vector space.
- Hybrid masking design有问题; sequence-feature interaction mode is incorrect.
- Model capacity insufficient; unified architecture needs more parameters to发挥 advantages, but resources limit model scale.

Response: Return to Stage Three's ablation experiments. If removing off-diagonal interaction反而 raises AUC, the current interaction mode is有害; redesign masking. If increasing model scale显著 improves AUC, the problem is insufficient capacity;可以通过 more aggressive compression strategy to换取 larger model width.

**Failure Mode Two: Inference latency exceeds limits.**

Possible causes:
- Sequence too long; even with progressive compression, earlier layers' computation is too large.
- KV caching implementation has bugs; not truly reused.

Response: Do one aggressive sequence truncation at the first layer (only保留 most recent N behaviors), then progressive compression in subsequent layers. This sacrifices some information completeness but significantly reduces latency. Also carefully check KV caching implementation.

**Failure Mode Three: Training instability, loss震荡 or divergence.**

Possible causes:
- Inconsistent embedding scales for different token types,导致 attention score imbalance.
- Progressive compression introduces gradient断裂.

Response: Apply independent layer normalization per token type (rather than global layer normalization). Check whether compression operations are differentiable, ensuring gradients can properly backpropagate.

**Worst-case Plan B**: If unified architecture after all adjustments still不如 separation paradigm, we can still submit a valuable technical report — detailed recording of why unified architecture failed and our diagnostic process. In academia, a rigorous negative result同样 has value. It tells future researchers: why this path doesn't work, and where to go next.

---

## Fifteen: Engineering Details — Achieving极致 Under Limited Resources

### 15.1 Three Levels of Inference Optimization

**First Level: KV Cache Reuse.**

In recommendation scenarios, the same user faces multiple candidate items within the same request. The user's historical behaviors and profile are shared across all candidates. If we can pre-compute the user-side Key and Value, then reuse them in each candidate item's inference, we can reduce user-side computation from O(number of candidates) to O(1).

Specific implementation: Divide the unified sequence into two parts — user-side (historical behavior tokens + user feature tokens) and item-side (item feature tokens + context tokens). First, forward pass on the user side, caching each layer's K and V. Then for each candidate item, only compute item-side Q, performing attention with cached K and V.

**Second Level: Progressive Compression.**

As described in Stage Three, sequence tokens are compressed after specified layers. This not only reduces subsequent layers' computation but also reduces KV cache size. Compression and caching are协同 — more aggressive compression means smaller cache and faster inference.

**Third Level: Early Exit (Optional).**

For simple samples (e.g., users with very short histories and clear features), earlier layers' outputs may already be sufficiently confident. Add a lightweight confidence判断器 after each layer; if confidence exceeds threshold, exit early.

Early exit implementation must注意: during training, all layers participate in gradient computation; early exit shouldn't skip later layers. One approach: add an auxiliary loss at each layer,让 each layer's output can independently predict.

### 15.2 Code Quality Standards

Competition-submitted code will be评审. Recommended code organization:

```
project/
├── config/           # Hyperparameter configuration files
├── data/             # Data loading and preprocessing
├── model/
│   ├── tokenizer.py  # Tokenization module (Φ_S, Φ_F, Φ_C)
│   ├── backbone.py   # Unified backbone (hybrid masking + self-attention)
│   ├── compress.py   # Progressive compression module
│   └── head.py       # Prediction head
├── train.py          # Training script
├── evaluate.py       # Evaluation script
└── README.md         # Project description
```

Each module has单一 responsibility and clear interfaces. `tokenizer.py` only负责 transforming raw data into tokens; `backbone.py` only负责 attention computation; `compress.py` only负责 sequence compression. This separation lets each module be independently tested and replaced.

---

## Sixteen: Innovation Award — Proving the Direction's Value

TAAC has two innovation awards: unified module innovation award and scaling law innovation award. They're independent of the leaderboard;评审 criteria are novelty and insight.

### 16.1 Unified Module Innovation Award

This award looks for "the most compelling unified, stackable modeling module."

What makes a module compelling? Four criteria:

1. Design grounded in principles. Not拼凑, but traceable to clear mathematical principles. Our hybrid masking design directly derives from attention matrix sub-matrix decomposition; progressive compression derives from information distillation concepts. Every design choice has理由.

2. Efficient implementation. Can run within latency limits, not merely a theoretical model that only exists in papers.

3. Verifiable effects. Through ablation experiments, prove every component of the module has contribution. Especially the contribution of off-diagonal interactions ($\mathbf{A}_{FS}$ and $\mathbf{A}_{SF}$), must be demonstrated with experimental data.

4. Interpretable. Through attention heat maps, show interaction patterns between sequence tokens and feature tokens. For example, when the candidate item is "a philosophy book," show the model's attention weight on the user's history's "philosophy videos" is significantly higher than "tech articles" — this kind of visualization is more persuasive than AUC numbers.

### 16.2 Scaling Law Innovation Award

This award looks for exploration of scaling laws.

Under competition resources, we can't do GPT-4-level scaling experiments. But we can do small-scale, controlled scaling analysis:

1. Parameter scaling: Model from 1M to 100M, record AUC变化. Simultaneously run same experiments for separation paradigm baseline. Draw two curves, compare slopes.
2. Data scaling: Training data from 10% to 100%, record AUC变化. Observe whether unified architecture is more "data-hungry" (needs more data to发挥 advantages) or more "data-efficient" (exceeds separation paradigm with less data).
3. Sequence length scaling: Fix model and data, input sequence length from 50 to 500, record AUC变化. This experiment directly tests unified architecture's ability to handle long sequences.

If these experiments reveal a clear regularity — such as "unified architecture's AUC grows logarithmically with parameter count, with a slope 1.5 times that of the separation paradigm" — that's a valuable finding值得 writing into the technical report's core position.

---

## Seventeen: From Competition to Industry — One Paragraph to Explain

Unified architecture's industrial deployment is post-competition business; here I'll only state the core viewpoint: the most natural entry point is model replacement at the精排 stage. Unified architecture replaces the separation paradigm's精排 model; recall and粗排 remain unchanged, risk is controllable. If offline metrics are positive, online A/B testing verifies, then gradually推广. Further ahead, unified architecture may become a multi-scenario shared foundation model — different recommendation scenarios share the same backbone, only微调 scenario-specific tokens and prediction head. But these are later matters; first do the competition well.

---

## Eighteen: Final Words

Doing hard but right things means the path won't be smooth.

In the competition, we may encounter first submission AUC below baseline, tuning parameters for a week with no change, code crashing mid-training. These are常态. What matters isn't avoiding failure but extracting information from each failure. AUC below baseline means unified architecture在某些方面 is still不如 simple pooling — analyze: is it tokenization problems, backbone structure issues, or too aggressive compression strategy? Each diagnostic step deepens understanding of the problem.

If you're preparing for TAAC2026, I want to say three things.

First, don't participate to win awards; participate to verify an idea. Awards are results, not purposes. If you have a unique idea about unified architecture, even if final AUC isn't high, as long as you can prove the idea has value, the innovation award may be yours.

Second, the technical report matters more than the leaderboard. The leaderboard records one number; the technical report records your thinking process. In评审 experts' eyes, a clear, profound, honest technical report is far more valuable than an inflated AUC.

Third, enjoy the process. The competition is only three months, but the understanding of problems, architectural intuition, and engineering polish gained will stay with you for a long time.

---

## Epilogue

This article's title is "From Fragments to Wholeness." Fragments refer to sequences and features割裂 under the separation paradigm; wholeness refers to user understanding重新整合 under unified architecture.

This transformation要求 we放下 the obsession with "modularity" and accept the complexity of "the whole is greater than the sum of parts." No longer asking "is the sequence model better or the feature model better," but asking "how to让 all information work协同."

Unified architecture may not be recommendation systems' endpoint, but it's the next stage's starting point. TAAC2026's competition topic is a flag planted at this starting point.

解放思想,实事求是.

---

## Reader Guide (Recommended at article end, pinned in comments)

> **Reading Suggestions**
>
> This article is lengthy (approximately 12,000 words), divided into three parts:
> 1. **Why unify** (Chapters 1-4): Starting from industrial confusion, revealing three hidden assumptions of the separation paradigm
> 2. **What to unify** (Chapters 5-9): Theoretical framework of structure-preserving mapping, unified attention operator, progressive compression
> 3. **How to unify** (Chapters 10-18): Competition stage planning, risk analysis, innovation award strategy, engineering details
>
> If you are:
> - **A competition participant**: Jump directly to Chapter 10 "The Essence of Competition" for the complete five-stage advancement plan
> - **A recommendation system practitioner**: Recommended reading Chapter 5 "Mathematical Essence" and Chapter 8 "Three Pragmatic Reasons"
> - **An academic researcher**: Chapters 5-7 theoretical framework可供 reference or critique
>
> Comments and discussion are welcome. If you disagree with any design or encounter problems in implementation, I very much期待 exchanging with you.

---

## Follow-up Preview

> **Follow-up Plans**
>
> This article is theory-first. After the competition concludes, I will iterate based on actual experimental verification (including comparison with SOTA separation paradigm, ablation experiments, efficiency analysis, scaling law exploration) and write a formal technical report.
>
> If you're interested in this direction, follow subsequent updates. Discussion via comments or private messages is also welcome.

---

## Tag Suggestions

Recommendation systems, TAAC2026, KDD Cup, sequence modeling, feature interaction, Transformer, attention mechanism, unified architecture, technical reflections

---

## Optional: Cover Image/Illustration Suggestions

- **Comparison diagram**: Separation paradigm (sequence → compression → concatenation) vs. unified architecture (token flow → unified attention)
- **Attention matrix decomposition diagram**: Showing $\mathbf{A}_{SS}, \mathbf{A}_{FF}, \mathbf{A}_{FS}, \mathbf{A}_{SF}$ four sub-matrices
- **Simplified architecture flow diagram**: From input to tokenization to unified backbone to prediction

Style suggestion:简洁, tech-focused, avoid过度花哨.

---

March 27, 2026, at Guangdong University of Technology

> **Copyright Notice**: This is a preview translation — Chinese original is the authoritative version. Copyright belongs to Guangzhou Phaenarete AI Technology Co., Ltd. Unauthorized reproduction, citation, or distribution is prohibited.