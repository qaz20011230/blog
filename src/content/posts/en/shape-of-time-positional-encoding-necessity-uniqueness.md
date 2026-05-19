---
title: "The Shape of Time: On the Necessity and Uniqueness of Positional Encoding in Attention Mechanisms"
date: '2026-05-18'
category: AI & Technology
tags:
  - positional encoding
  - RoPE
  - group theory
  - attention mechanism
  - Transformer
description: >
  A rigorous first-principles derivation of the mathematical boundaries of positional encoding: linearity + translation invariance + continuity → one-parameter groups → generator classification. Proving that RoPE, exponential decay, and their combinations are the "almost unique" admissible solutions. Group theory reveals that engineers are not inventing — they are discovering the shape of time locked in by mathematics itself.
pinned: false
---

**Liangzhi**

**May 2026**


## Introduction: A Fundamental Question Overlooked

In building modern language models, there is a question that seems simple yet proves unfathomably deep: **how does a model perceive "time"?**

Recurrent neural networks (RNNs) naturally process inputs in temporal order. Convolutional neural networks (CNNs) capture local temporal relationships through sliding windows. But the Transformer — the architecture that dominated artificial intelligence in the 2020s — possesses no intrinsic concept of time whatsoever. In pure self-attention, all positions in a sequence are treated indiscriminately. For a language model, this means that "I love you" and "you love me" would be indistinguishable without special treatment.

This is precisely the problem that **positional encoding** sets out to solve. It must inject the crucial information of "position" into the self-attention computation, so that the model can perceive whether "love" precedes "you" or "you" precedes "love."

The most popular solution at present is RoPE (Rotary Position Embedding). It rotates query and key vectors by position-dependent angles, like the hands of a clock turning with time. RoPE works beautifully, but it is far from the only candidate. In fact, a fundamental question has long gone unasked: **exactly how many possible positional encoding schemes exist? What are their boundaries?**

This essay attempts to answer that question. We proceed from first principles, rigorously deriving the mathematical constraints that any positional encoding must satisfy, and then prove that, among all "reasonable" candidates, only a few families are mathematically possible — and these families happen to be precisely those that human engineers have already discovered and deployed in practice.

This is a thorough interrogation of the mathematical form that "time" takes in deep learning.


## I. Formalizing the Problem

### 1.1 Attention Without Positional Encoding

Let us first review pure self-attention. Suppose we have a sequence of query vectors $\{q_t\}$ and a sequence of key vectors $\{k_t\}$, where $t$ denotes time (or the positional index in the sequence). Without positional encoding, the attention score is simply the vector inner product:

$$\text{Attention}(q_t, k_s) = \langle q_t, k_s \rangle$$

This inner product is time-agnostic — it depends only on the contents of $q_t$ and $k_s$, not on the relative position of $t$ and $s$. For any task requiring an understanding of order (language, time-series forecasting, video understanding), this is a fundamental deficiency.

### 1.2 Introducing Positional Encoding

To inject positional information, the most direct idea is: **treat time as a parameter and explicitly transform the query and key vectors.** Let $f_t$ and $g_t$ be time-dependent transformation functions for queries and keys, respectively:

$$q_t' = f_t(q_t), \quad k_s' = g_s(k_s)$$

Then the position-aware attention score becomes:

$$\text{Attention}(q_t, k_s) = \langle f_t(q_t), g_s(k_s) \rangle$$

We assume $f_t$ and $g_t$ do not change the vector dimension (otherwise we could apply a time-independent projection before positional encoding, which does not affect the subsequent analysis).

### 1.3 The Linearity Assumption

We need to impose constraints to make the mathematical problem tractable. The first key assumption is **linearity**:

> **Assumption 1 (Linearity):** $f_t$ is a linear function of $q_t$, and $g_s$ is a linear function of $k_s$.

This means there exist time-dependent square matrices $F(t)$ and $G(s)$ such that:
$$f_t(q_t) = F(t) q_t, \quad g_s(k_s) = G(s) k_s$$

The attention score then becomes:
$$\langle F(t) q_t, G(s) k_s \rangle = q_t^T F(t)^T G(s) k_s$$

For notational simplicity, we define:
$$A(t, s) = F(t)^T G(s)$$

The entire core of positional encoding is now condensed into this time-dependent square matrix $A(t, s)$. It determines how the inner product between "the key at time $s$" and "the query at time $t$" will be modulated.


## II. Translation Invariance: The Mandate of Relative Position

The second core assumption is **translation invariance**:

> **Assumption 2 (Translation Invariance):** The attention score depends only on the relative position between query and key, not on their absolute positions.

$$A(t + \tau, s + \tau) = A(t, s), \quad \forall t, s, \tau$$

This arises from practical generalization needs. If a model has only seen sequences of length $N$ during training, but must process longer sequences during inference, absolute position indices become unreliable. Only encoding based on relative position can generalize naturally to longer sequences.

If we consider the table formed by all time pairs $(t, s)$, translation invariance means: **along any diagonal (where $t - s$ is constant), the value of $A(t, s)$ is the same.** We need only concern ourselves with the single variable: the time difference.

### 2.1 The Diagonal Matrix Assumption and Natural Reduction

We add one more technically cost-free assumption: for the query and key at the same time, positional encoding should have no effect. That is, $A(t, t) = I$ (the identity matrix). If the original positional encoding does not satisfy this, we can absorb it by applying a time-independent linear transformation to the keys (redefining $k_s$). This is compatible with our analytical framework.

Combined with translation invariance, we immediately obtain:
$$A(t, t) = A(0, 0) = I$$

Furthermore, let $\tau = t - s$ and define:
$$R(\tau) = A(t, s) = A(\tau, 0)$$

Thus positional encoding is entirely determined by the single-variable matrix family $\{R(\tau)\}$. It dictates how the attention inner product should be modulated when we "look forward by $\tau$ steps."

### 2.2 The Birth of Group Structure

A profound consequence of translation invariance is: **the matrix family $\{R(\tau)\}$ forms a group.**

Consider translating in two steps: first by $\tau_1$, then by $\tau_2$. This is equivalent to a single translation by $\tau_1 + \tau_2$:
$$A(t+\tau_1+\tau_2, t) = A(t+\tau_1+\tau_2, t+\tau_1) \cdot A(t+\tau_1, t)$$

(Here we rely on the composition property of linear transformations in linear algebra, combined with translation invariance.)

Rewriting in terms of $R(\tau)$:
$$R(\tau_1 + \tau_2) = R(\tau_1) \cdot R(\tau_2)$$

This is an extraordinarily strong constraint. It states that $R$ is a **group homomorphism** from the additive group of real numbers $(\mathbb{R}, +)$ to the multiplicative group of matrices.

### 2.3 The Continuity Assumption

We add one final mild constraint:

> **Assumption 3 (Continuity):** $R(\tau)$ is a continuous function of $\tau$.

(This excludes pathological solutions that require the Axiom of Choice to construct and cannot be realized on physical computers — these fall outside the scope of this essay.)

Matrix families that satisfy both the group homomorphism property and continuity have a precise name in mathematics: **one-parameter groups**. And one-parameter groups are fully classified — they are determined by a fixed **generator** matrix $M$, and take the form:
$$R(\tau) = \exp(\tau M)$$
where $\exp$ is the matrix exponential.

This theorem transforms our task from a "design problem" into a "classification problem": **we need only enumerate all possible generators $M$ to enumerate all possible positional encodings.** This is the central insight of this essay.


## III. Enumerating All Positional Encodings

Since $R(\tau) = \exp(\tau M)$, the algebraic properties of the generator $M$ determine the entire behavior of the positional encoding. We can analyze $M$ through diagonalization.

### 3.1 Diagonalizable Generators

If $M$ is diagonalizable (over the complex numbers), there exists a change of basis (an invertible matrix $P$) such that:
$$M = P \Lambda P^{-1}, \quad \Lambda = \text{diag}(\lambda_1, \lambda_2, \ldots, \lambda_d)$$

In this new basis:
$$R(\tau) = \exp(\tau M) = P \cdot \text{diag}(e^{\tau \lambda_1}, \ldots, e^{\tau \lambda_d}) \cdot P^{-1}$$

The basis transformation $P$ itself is time-independent and can therefore be "absorbed" into the preprocessing of queries and keys. That is, **we may always pretend that $M$ is already diagonal**, treating the change of basis as part of the neural network's linear layers. Thus the subspaces corresponding to different eigenvalues $\lambda_i$ are mutually decoupled: positional encoding acts independently on each subspace.

Each eigenvalue $\lambda = a + i\omega$ ($a, \omega \in \mathbb{R}$) corresponds either to a one-dimensional subspace (if real) or a pair of two-dimensional subspaces (if complex, with $M$ originally real, in which case complex eigenvalues appear in conjugate pairs).

#### 3.1.1 Real Eigenvalues: Exponential Decay or Growth

If $\lambda = a$ is real, then on that subspace $R(\tau) = e^{\tau a}$. The attention inner product is modulated as:
$$\langle q, k \rangle \mapsto e^{\tau a} \langle q, k \rangle$$

*   **$a > 0$**: As the time difference $\tau$ grows, $e^{\tau a}$ grows exponentially. This means the influence of past keys on the current query would explosively intensify — this is neither practical nor stable. **We exclude this possibility.**
*   **$a = 0$**: $R(\tau) = 1$, positional encoding vanishes on this subspace. This is precisely the "No Positional Encoding" (NoPE) case.
*   **$a < 0$**: $e^{\tau a}$ decays exponentially. The influence of past keys on the current query fades exponentially with the passage of time. This is the **exponential decay commonly found in linear attention mechanisms**, seen in models like RetNet and Mamba-3.

#### 3.1.2 Complex Eigenvalues: Rotation (RoPE)

If $\lambda = a + i\omega$ and its conjugate $\bar{\lambda} = a - i\omega$ appear as a pair, their action on the corresponding two-dimensional subspace can be equivalently expressed as the following real matrix (via standard realization):
$$R(\tau) \simeq e^{\tau a} \begin{pmatrix} \cos(\tau \omega) & -\sin(\tau \omega) \\ \sin(\tau \omega) & \cos(\tau \omega) \end{pmatrix}$$

Here we see two factors:
1.  **The rotation matrix** $\begin{pmatrix} \cos(\tau \omega) & -\sin(\tau \omega) \\ \sin(\tau \omega) & \cos(\tau \omega) \end{pmatrix}$: this is precisely the core of Rotary Position Embedding (RoPE). The rotation angle $\tau \omega$ grows linearly with relative position, like the hands of a clock turning with time.
2.  **The exponential decay factor** $e^{\tau a}$: as in the real eigenvalue case, we require $a \leq 0$ to prevent explosion. When $a < 0$, we obtain rotary position encoding with exponential decay — precisely the positional encoding adopted by **RetNet** and **Mamba-3**.

When $a = 0$, we recover pure RoPE — currently the most popular and effective choice.

### 3.2 Non-Diagonalizable (Defective) Generators: A New Frontier?

Now let us enter a stranger, but also more fascinating, territory: what happens if the generator $M$ is **non-diagonalizable** (i.e., a defective matrix)?

Linear algebra tells us that when a matrix is non-diagonalizable, we can bring it into **Jordan Normal Form** through a similarity transformation. A Jordan block takes the following form (using the $2 \times 2$ case as an example, corresponding to eigenvalue $\lambda$):
$$M = \begin{pmatrix} \lambda & 1 \\ 0 & \lambda \end{pmatrix}$$

Computing its matrix exponential:
$$R(\tau) = \exp(\tau M) = e^{\tau \lambda} \begin{pmatrix} 1 & \tau \\ 0 & 1 \end{pmatrix}$$

Note: **a polynomial factor in $\tau$ has appeared!** For a $k \times k$ Jordan block, $R(\tau)$ will contain a polynomial in $\tau$ of degree $k-1$.

What does this mean? If we restrict ourselves to diagonalizable generators (as virtually everyone does), positional encoding behavior consists solely of **exponential decay** and **rotation**. But Jordan blocks — these mathematically "pathological" matrices — open a door to **polynomial modulation** in positional encoding.

A simple physical example helps with intuition. Consider a hockey puck sliding at constant velocity $v$ (no friction). At time $t$, the state vector of its position $x_t$ and velocity $v_t$ (constant) is $\begin{pmatrix} x_t \\ v_t \end{pmatrix}$. The evolution equation is:
$$\begin{pmatrix} x_t \\ v_t \end{pmatrix} = \underbrace{\begin{pmatrix} 1 & t \\ 0 & 1 \end{pmatrix}}_{R(t)} \begin{pmatrix} x_0 \\ v_0 \end{pmatrix}$$

This is precisely the positional encoding produced by a non-diagonalizable generator. Here, $x_0$ and $v_0$ correspond to two components in the query or key vector: one is the "position" signal (drifting linearly with time), and the other is the "velocity" signal (held constant).

**Does this polynomial positional encoding have practical significance?** Frankly, the jury is still out. The presence of polynomial terms means certain attention interactions would grow linearly (or to even higher orders) with time, which seems to have no obvious correspondence in typical language modeling. Indeed, I would venture to assert that all positional encodings that have performed well in practice have already been exhaustively enumerated within the "diagonalizable" category above. But non-diagonalizable generators remain theoretically admissible, and they open up surprising possibilities at the frontier for future exploration.

In fact, after writing this essay, I came across a recent paper by Zhang Yifan et al., *GRAPE*, which independently utilized the one-parameter group framework and explicitly pointed out the connection between defective generators and ALiBi. This is a beautiful example of theoretical insight transcending the individual researcher.


## IV. Coda: The Form of Time, and the Person Behind the Form

We have transformed an ostensibly open-ended design problem — "which positional encoding should we use?" — into a closed mathematical problem: **positional encodings satisfying linearity, translation invariance, and continuity, after discarding inessential changes of basis, are determined entirely by the algebraic properties of the generator $M$.** And generators are simply either diagonalizable (corresponding to exponential decay and rotation) or non-diagonalizable (corresponding to polynomial time modulation).

This result is philosophically profound. It means: **when human engineers design positional encodings, they seem to possess infinite freedom, yet they are in fact tightly constrained by mathematical laws.** The RoPE, exponential decay, and their combinations that we have found most successful in practice are not accidental innovations — they are the "almost unique" necessary products of this system of mathematical constraints. This is precisely the conviction I have repeatedly asserted in the Tendre Necessity Theorem: **in the face of logical necessity, the engineer's degrees of freedom are not as large as they imagine.**

Just as physical laws limit the possible types of particles in the universe, group-theoretic laws limit the possible types of positional encoding in attention mechanisms. We are not creating; we are discovering. Discovering the shape of time — a shape that mathematics itself had already locked in place.

**References**

[1] Puranik, A. (2026). Using group theory to explore the space of positional encodings for attention. *Jane Street Tech Blog*.

[2] Su, J., Lu, Y., Pan, S., Wen, B., & Liu, Y. (2021). RoFormer: Enhanced transformer with rotary position embedding. *arXiv preprint arXiv:2104.09864*.

[3] Sun, Y., Dong, L., Patra, B., Ma, S., Huang, S., Benhaim, A., ... & Wei, F. (2023). Retentive network: A successor to transformer for large language models. *arXiv preprint arXiv:2307.08621*.

[4] Zhang, Y., et al. (2025). GRAPE: Group Representational Positional Encoding. *arXiv preprint*.

[5] Press, O., Smith, N. A., & Lewis, M. (2021). Train short, test long: Attention with linear biases enables input length extrapolation. *arXiv preprint arXiv:2108.12409*. (ALiBi)


*Liangzhi, May 2026, Guangzhou*
