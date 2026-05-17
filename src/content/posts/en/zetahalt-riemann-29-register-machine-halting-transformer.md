---
title: ZetaHalt：将黎曼猜想编码为一台 29 寄存器机的停机问题
date: '2026-04-07'
category: Mathematics & Logic
tags:
  - Riemann Hypothesis
  - mathematics
  - 数论
description: >
  把黎曼猜想等价转换为一台 29 寄存器机是否停机的问题，并以可复现模拟与因果 Transformer 为工具，探索系统可能存在的不变量与形式化验证路径。
---

## 1. Introduction: Why We Need a New Perspective

The Riemann Hypothesis (RH), since its inception in 1859, has been one of the most captivating problems in mathematics. It has deep connections with the distribution of prime numbers and entails numerous seemingly unrelated conclusions in number theory. For over a century, mathematicians have approached it from multiple directions—analytic, algebraic, geometric, spectral theory—achieving brilliant results such as infinitely many zeros on the critical line (Hardy, 1914), a positive proportion of zeros (Selberg, 1942), and zero density estimates (Guth–Maynard, 2024). Yet we remain far from a final proof.

In this article, I wish to discuss a less mainstream but, in my view, highly illuminating research direction: equivalently transforming the Riemann Hypothesis into a question about whether a specific register machine halts, and on this basis, constructing a data-driven, human-machine collaborative experimental platform. This platform is called ZetaHalt and is a subproject of the Phaenarete Project.

My interest in this direction is not because it offers a shortcut to proving RH—indeed, it most likely will not yield a proof in the near term. Rather, it is because it projects RH from "a continuous problem concerning the distribution of zeros of an analytic function" onto "a discrete, deterministic, observable computational trajectory." This projection enables us to explore the structure of an ancient problem using entirely new tools—such as time series prediction, causal Transformers, interpretability analysis, and symbolic regression.

In other words: we cannot directly observe the zeros of $\zeta(s)$, but we can simulate every step of a 29-register machine and record the integer contents of each register. Then we can ask: from this data, can machine learning models learn to predict the machine's future states? If so, what have they learned? Do some high-weighted variables exhibit某种 invariant? Can these invariants be translated into mathematical conjectures and ultimately subjected to formal verification?

This is precisely the core question of the ZetaHalt project.

## 2. Matiyasevich's Register Machine: A Computationally Equivalent Form of RH

### 2.1 From $\psi(n)$ to Integer Recursion

To understand ZetaHalt, we must first review the key result of Matiyasevich (Matiyasevich, 2020). He takes the Chebyshev function $\psi(n)$ as his starting point:

$$
\psi(n) = \ln \operatorname{lcm}(1,2,\dots,n).
$$

The Riemann Hypothesis is equivalent to a precise inequality (Schoenfeld, 1976):

$$
|\psi(n) - n| < \frac{1}{8\pi} \sqrt{n} \ln^2 n \quad \text{for all } n>1.
$$

Matiyasevich discretized and integerized this continuous inequality, defining several integer sequences:

- $q(n) = \operatorname{lcm}(1,\dots,n)$, the least common multiple;
- $p(n) = \pi(n)$, the number of primes not exceeding $n$;
- $f_0(n) = 2^{n-1} n!$;
- $f_3(n) = (2n+3)!! / 5!!$;
- $d(n)$ defined via the recurrence $d(n+1) = 2n\, d(n) - 2(-1)^n f_0(n)$, which approximates an integer version of $\psi(n)$.

He then constructed the discriminant:

$$
r(n) = f_3(n) - p(n)^2 \bigl( d(n) \lfloor \log_2 q(n) \rfloor - f_0(n) \bigr).
$$

Core theorem: The Riemann Hypothesis is true if and only if $r(n) > 0$ for all $n \ge 1$.

In other words, if we compute these integers for each $n$ in sequence, and discover some $n$ such that $r(n) \le 0$, we have found a counterexample to RH. If no such $n$ is ever found, then RH holds.

### 2.2 Encoding as a Register Machine

A register machine is an extremely minimal computational model with only two types of instructions:

- `R ++`: Increment register R by 1, then proceed to the next instruction;
- `R -- jump`: If R > 0, decrement it by 1 and proceed to the next instruction; otherwise, jump to the instruction at `jump`.

Matiyasevich translated the above recursive algorithm into an explicit machine with 29 registers and 130 instructions. The machine's initial state has all registers empty. It essentially executes an infinite loop: for $n=1,2,3,\dots$, it computes $r(n)$ in sequence and halts whenever $r(n) \le 0$. Therefore:

> RH is true ⇔ this register machine never halts.

This is a $\Pi_1^0$ statement, i.e., a universally quantified recursive predicate. Its truth value is equivalent to the halting problem of a specific Turing machine.

### 2.3 Metaphor: Putting the Elephant in the Refrigerator

To help non-specialist readers understand, I like to use this metaphor: proving RH is like putting an elephant into a refrigerator. Traditional analytic number theory attempts to directly design a massive refrigerator (complex functional equations and estimates), then prove that the elephant (the zeros of the $\zeta$ function) must be inside. Matiyasevich's approach, by contrast, is: first construct an infinitely long conveyor belt, with a refrigerator door placed every meter along it. Then we check meter by meter: if some refrigerator door cannot close ($r(n) \le 0$), the elephant is outside; if all doors close properly, the elephant is inside. The conveyor belt is the state sequence of the register machine, and our task is to observe this belt, checking whether any door fails to close.

## 3. The ZetaHalt Project: From Theory to Experiment

### 3.1 Current Status: A Reproducible Baseline

As part of the Phaenarete Project, we established the ZetaHalt repository, with the following work already completed:

- Original paper archive: `papers/matiyasevich2020riemann.pdf`.
- Integer simulator: `scripts/riemann_full_csv.py`, a Python implementation strictly following Figure 2 of the paper, capable of simulating for $n=1,\dots,100$.
- State data: `data/raw/riemann_states.csv`, containing `n, p, d, m, f0, f1, f3, q, r, b` at each step. All `r > 0`, consistent with RH.

The importance of this baseline lies in its being fully independently reproducible. Any researcher can clone the repository, run the scripts, and verify whether we have faithfully reproduced Matiyasevich's recursion. This is the first step of open science.

### 3.2 Numerical Explosion and Log-Domain Stabilization

From the CSV data, one can observe that $f_0(100)$ has already reached approximately $10^{200}$. Ordinary integers cannot continue further. However, we can apply logarithmic transformations to all recursive formulas, thereby converting multiplication into addition and enabling simulation to easily reach $n=10^4$ or even $10^5$. The key challenge lies in handling subtraction, e.g., when computing $d(n+1) = 2n d(n) - 2(-1)^n f_0(n)$, we need to compute $\log(A - B)$. This can be implemented via the `log_sub_exp` function:

```python
def log_sub_exp(log_a: float, log_b: float) -> float:
    """return log(exp(log_a) - exp(log_b)) for a > b"""
    if log_a <= log_b:
        return float('-inf')
    return log_a + math.log1p(-math.exp(log_b - log_a))
```

We will implement this stabilized version in the next phase and generate large-scale Parquet-format datasets for machine learning use.

### 3.3 Causal Transformer Prediction

Once we have long-sequence data (e.g., $n=1,\dots,10^4$), we can model the state evolution as a multivariate time series prediction task. Specifically:

- Input: state feature vectors from the past $L=20$ steps, including `n, p, log_d, log_m, log_f0, log_f1, log_f3, log_q, log_r, b`.
- Output: the next step's `log_r` (regression task) and the sign of $r$ (binary classification task, i.e., whether > 0).

We choose a causal Transformer as the model architecture (4 layers, 4 attention heads, hidden dimension 128), jointly optimizing MSE loss and cross-entropy loss.

Why use a Transformer? Because long-distance dependencies exist among state variables: for instance, changes in the prime count $p$ affect the computation of all subsequent $r$ values. The self-attention mechanism can capture such cross-stride relationships.

An interesting test: train the model on $n \le 5000$, then test on 5001–10000. If the model's sign prediction accuracy remains near 100%, it has likely learned某种 invariant structure independent of $n$; if performance collapses, it indicates the model merely overfit specific patterns within the training distribution—this itself is an important conclusion, telling us that system behavior undergoes qualitative change at some scale.

### 3.4 Interpretability: From Invariant Discovery to Formal Verification

Machine learning models are typically viewed as black boxes. But in ZetaHalt, we specifically wish to open this black box and extract understandable mathematical knowledge. We will employ the following tools:

- Attention heatmaps: Analyze which historical steps and which variables the model focuses on most during prediction. We expect $p$ (prime count) and $d$ (approximation of $\psi$) to receive high weights.
- Integrated Gradients: Quantify the marginal contribution of each input feature to the prediction of `log_r`. This can tell us which variable combinations are critical.
- Symbolic Regression (PySR): Fit the mapping learned by the model (e.g., the increment from `log_d, log_f0, log_p` to `log_r`) as an analytic expression. For instance, the model may suggest the existence of a constant $C$ such that

$$
\log r \approx \log f_3 - C \log\bigl(p^2 (m - f_0)\bigr).
$$

If $C$ is very close to 1, we have obtained a candidate invariant: $r \approx f_3 - p^2(m-f_0)$. This happens to be the original definition, so the model may have simply learned the identity. But a more subtle possibility is that the model might discover a tighter bound, such as

$$
r > f_3 - \frac{25}{24} p^2(m-f_0) \quad \text{for all } n>1000.
$$

Such conjectures can be directly handed to Phaenarete Project's PrimeClaw system: the Prover agent attempts to prove it in Lean 4, while Sentinel verifies the proof's correctness. If the proof succeeds, we obtain a new number-theoretic lemma; if it fails, the failure record is stored as a marker of "this path is impassable."

## 4. Role Within the Phaenarete Project

ZetaHalt is not isolated. It is a subproject of the Phaenarete Project, which is dedicated to constructing a human-machine collaborative mathematical research infrastructure called PrimeClaw. PrimeClaw comprises four agents:

- Archivist: Maintains the mathematical knowledge graph, including theorems, lemmas, known counterexamples, and failed paths.
- Explorer: Uses Monte Carlo tree search and policy networks to generate candidate conjectures and lemmas.
- Prover: Transforms natural language or pseudocode into Lean 4 proof scripts.
- Sentinel: Invokes the Lean 4 kernel for deterministic verification; it is the only component in the system that does not employ probabilistic models.

ZetaHalt plays two roles within PrimeClaw:

1. As a lightweight simulator for Explorer: When Explorer searches for new lemmas, it needs to rapidly evaluate certain numerical patterns. ZetaHalt's log-domain simulator can compute the sign of $r(n)$ for arbitrary $n$ within milliseconds, providing low-cost heuristic signals for MCTS.
2. As an experimental ground for invariant discovery: Candidate invariants generated by ZetaHalt (via symbolic regression) can be directly injected into PrimeClaw's proof pipeline, forming a closed loop of "data-driven conjecture → formal verification → knowledge graph update."

## 5. Honest Risk Assessment and a Philosophy of Failure

I must candidly acknowledge: the probability that the ZetaHalt project will prove or disprove the Riemann Hypothesis within 18 months is close to zero. This is not a "solve RH plan," but rather a "explore the structure of RH's equivalent computational model" plan. Our success criteria are:

- Successfully construct a log-domain stabilized simulator, generating state sequences for $n \ge 10^4$.
- Train a Transformer model with in-distribution prediction accuracy > 99%.
- Extract at least one candidate mathematical invariant through interpretability methods (regardless of whether it is ultimately proven).
- Record all attempts (including failures) as structured data and publish them publicly.

The record of failure is itself knowledge. In the history of mathematics, many major breakthroughs have been built upon predecessors' systematic elimination of erroneous paths. Lakatos, in *Proofs and Refutations*, emphasized that mathematical progress comes not only from correct proofs but also from deep understanding of erroneous cases. ZetaHalt will公开 all "dead ends": those falsified candidate invariants, those models that cannot extrapolate, those numerically unstable boundaries. These records will serve as a navigation chart for subsequent researchers, preventing them from repeating the same mistakes.

## 6. How to Participate

ZetaHalt is a fully open-source project (MIT License). We welcome three types of contributions:

- Mathematical direction: Help verify the correctness of the recursive formulas, analyze the asymptotic behavior of $r(n)$, or point out details in Matiyasevich's original proof that we may have misunderstood.
- Formalization direction: Use Lean 4 to formalize Matiyasevich's recursive definitions and basic properties, submitting to the `Phaenarete-Project/ZetaHalt` repository. This is the first step toward constructing a formalized number theory library.
- Machine learning direction: Try different sequence models (LSTM, Transformer, state space models), design better extrapolation tests, or improve symbolic regression search strategies.

All code, data, model weights, and exploration logs will be made public. We believe that open collaboration is the best strategy for confronting extremely difficult problems.

## 7. Conclusion

Hilbert, in his 1930 retirement address, declared: "We must know, we shall know." This statement is filled with confidence in the power of reason. Yet a century later, the Riemann Hypothesis remains unresolved. This is not a failure of reason, but proof of mathematics' depth.

The ZetaHalt project does not intend to proclaim "we shall soon know." What it wishes to say is: we can use new tools to observe, simulate, and predict a discrete system equivalent to RH. Even if we cannot reach the summit in the near term, we can draw more refined maps, marking dangerous swamps and steep cliffs. These maps themselves constitute increments of knowledge.

Therefore, I invite you—whether you are a number theorist, logician, formal verification expert, or machine learning researcher—to jointly explore the behavior of this 29-register machine. It may not tell us the ultimate answer to the Riemann Hypothesis, but it will certainly reveal things we never knew about the deep connections between computation and number theory.

---

Project Links

- Code Repository: https://github.com/Phaenarete-Project/ZetaHalt
- Project Homepage (planned): https://riemann.phaenarete.org
- Contact: <contact@example.com>

Acknowledgments

Thanks to Professor Matiyasevich for his pioneering work, and to all mathematicians who have contributed to numerical verification and theoretical research on the Riemann Hypothesis. Thanks to the Phaenarete Project team members, especially 良之 (Liangzhi) and Travor Liu, for providing solid support to this project.

---

*This article is based on a technical report from the Phaenarete Project; all factual statements have been verified. If errors are found, please contact us via the email address above, and we will correct them within 24 hours.*

> **Copyright Notice**: This is a preview translation — Chinese original is the authoritative version. Copyright belongs to Guangzhou Phaenarete AI Technology Co., Ltd. Unauthorized reproduction, citation, or distribution is prohibited.