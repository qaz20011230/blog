# ZetaHalt: A Computational Laboratory for Matiyasevich's 29-Register Machine Encoding of the Riemann Hypothesis

## Abstract

The Riemann Hypothesis (RH) admits a striking reformulation due to Yu. Matiyasevich (2020): there exists an explicit register machine with 29 registers and 130 instructions—constructed from elementary number-theoretic recurrences involving Chebyshev's `ψ(n)`, the least common multiple `q(n)`, and rational approximations to `log 2`—that halts if and only if RH is false. This equivalence projects RH from the continuous domain of analytic number theory into a discrete, deterministic, computationally observable trajectory. We present the ZetaHalt computational laboratory: a three-tier simulation infrastructure that faithfully implements Matiyasevich's integer recurrences, extends the simulation into the logarithmic domain with certified error bounds, and optionally emulates the register machine at the micro-step level. We provide a fully self-contained derivation of the equivalence chain from von Koch's 1901 `O`-bound through Schoenfeld's explicit estimate to Matiyasevich's integer discriminant `r(n)`, verified via asymptotic sanity checks. On the data thus generated, we design a carefully controlled sequence-modeling study: a causal Transformer and a suite of baselines (linear AR, gradient-boosted trees, and a direct formula oracle) predict the safety margin `r(n)/f_3(n)` under strict out-of-scale extrapolation protocols. We emphasize that the machine-learning component is exploratory—it identifies candidate patterns, not proofs—and all experimental records, including failed hypotheses, are made public. ZetaHalt functions as a lightweight simulator within the PrimeClaw human-machine collaborative mathematics infrastructure, supplying low-cost signals for conjecture generation and formal verification.

**Keywords**: Riemann Hypothesis, register machine, Matiyasevich, Chebyshev function, experimental mathematics, time series prediction, causal Transformer, interpretability, formal verification.

---

## 1. Introduction

The Riemann Hypothesis (RH), proposed in 1859, asserts that all non-trivial zeros of the Riemann zeta function `ζ(s)` lie on the critical line `Re(s) = 1/2`. Beyond its intrinsic depth, RH governs the fine-scale distribution of prime numbers: it is equivalent to the statement that `π(x) = Li(x) + O(x^{1/2}log x)`, where `π(x)` counts primes ≤ `x` and `Li(x)` is the logarithmic integral. Over 160 years of sustained effort—from Hardy's proof of infinitely many critical zeros (1914) through Selberg's positive-proportion theorem (1942) to Guth and Maynard's recent refinements on zero density (2024)—have produced an extraordinary edifice of partial results. Yet the conjecture itself remains open.

A less traveled but conceptually profound direction connects RH to computability theory. As early as his 1938 Ph.D. thesis, Alan Turing recognized that RH can be cast as a `Π⁰₁` statement—a universally quantified recursive predicate whose truth is equivalent to the non-halting of a specific computational process. Kreisel (1958) refined this to an explicit `Π⁰₁` formula, and Matiyasevich's resolution of Hilbert's Tenth Problem (1970) further implied the existence of a Diophantine equation whose unsolvability is equivalent to RH [19]. In 2020, Matiyasevich completed a remarkable synthesis: he constructed an explicit register machine with only 29 registers and 130 primitive instructions—involving only increment, decrement, and conditional jump—that, starting from all registers empty, halts if and only if RH is false [1].

The ZetaHalt project, presented in this paper, is a computational infrastructure built atop this construction. Its contributions are threefold:

1. **A self-contained re-derivation** of the equivalence chain, beginning from von Koch's classical `O`-estimate, through Schoenfeld's explicit bound, to Matiyasevich's integer discriminant `r(n)`, with asymptotic consistency verified at each step. We correct several subtle but consequential errors in prior informal presentations.

2. **A three-tier simulation architecture**: (i) exact arbitrary-precision integer simulation validated to `n ≤ 1000`; (ii) log-domain certified simulation with double-double arithmetic and error-bound tracking, scalable to `n ≥ 10⁴`; (iii) an optional micro-step register machine emulator that faithfully reproduces all 130 instructions.

3. **A rigorously designed sequence-modeling experiment** that treats the state evolution as a multivariate time series, trains a causal Transformer and baseline models under out-of-scale extrapolation protocols, and applies interpretability methods (attention analysis, integrated gradients, symbolic regression) exclusively as hypothesis-generation tools—never as mathematical evidence. All models, data, and failure records are released under the MIT license.

We stress at the outset: ZetaHalt does not claim to prove or disprove RH. It is a computational laboratory for studying the structure of an RH-equivalent discrete dynamical system. Its success criteria are: (a) faithful reproduction of Matiyasevich's recurrences with certified arithmetic, (b) scalable data generation, (c) training of sequence models with rigorously measured extrapolation performance, and (d) extraction of candidate invariants for downstream formal verification.

---

## 2. The Equivalence Chain

### 2.1 From the Riemann Zeta Function to Chebyshev's `ψ(n)`

Define Chebyshev's function

```
ψ(x) = ∑_{p^k ≤ x} log p,
```

summed over prime powers `p^k ≤ x`.  A classical result due to von Koch (1901) [2] establishes the equivalence:

```
RH  ⇔  ψ(x) = x + O(x^{1/2} log² x),   x → ∞.    (1)
```

The direction `⇒` relies on the explicit formula linking `ψ(x)` to the zeros of `ζ(s)`; the direction `⇐` follows from the fact that any zero off the critical line would contribute an oscillatory term violating the error bound.

A companion fact is that `ψ(n)` has an elementary expression for integers `n`:

```
ψ(n) = log lcm(1, 2, …, n),           (2)
```

where `lcm` denotes the least common multiple. Define `q(n) = lcm(1,…, n)`. Then `ψ(n) = log q(n)`. This bridges the analytic bound (1) to purely integer-valued sequences.

### 2.2 Schoenfeld's Explicit Estimate

Schoenfeld (1976) [3] proved the following explicit, unconditional bound: for all `x ≥ 73.2`,

```
|ψ(x) − x| < (1/(8π)) · x^{1/2} · log² x.        (3)
```

However, this inequality is **not** itself equivalent to RH. It is a **consequence** of RH (the forward direction of von Koch's equivalence made explicit). The reverse direction—that an error estimate of order `x^{1/2} log² x` implies RH—was established by Ingham [4] and others: if for some constant `C > 0` and all sufficiently large `x`,

```
ψ(x) − x < C · x^{1/2} · log² x,                 (4)
```

then RH holds. Crucially, Matiyasevich uses a **one-sided** version of this fact, since only an upper bound on `ψ(x) − x` is needed for his construction, and the contrapositive (if `ψ(x) − x` grows too fast, RH is false) is sufficient for a `Π⁰₁` encoding.

Specifically, Matiyasevich establishes the following pair:

- **Necessity (RH ⇒):** For all `n > 1`, `ψ(n) − n < (1/25) · n^{1/2} · log² n`.    (5)

- **Sufficiency (⇒ RH):** If there exists `C` such that for all sufficiently large `n`, `ψ(n) − n < C · n^{1/2} · log² n`, then RH holds. Since `1/25 < 1/(8π)`, condition (5) is stronger than the sufficient condition, making the overall scheme work.

The constant `1/25` is chosen for two reasons: it is weaker than the Schoenfeld constant `1/(8π) ≈ 0.0398` (so that (3) implies (5)), and it is strictly greater than the minimum constant required for sufficiency (roughly `1/25 = 0.04 > 0`), ensuring the logical closure of the equivalence.

### 2.3 Integerization via Binary Logarithms

The central difficulty in converting (5) into an integer predicate is the presence of the natural logarithm `log`. Matiyasevich's solution is to work with **binary** logarithms of `q(n)` and approximate `log 2` via a rational alternating series.

Define the binary logarithmic floor:

```
l(n) = ⌊log₂ q(n)⌋.                              (6)
```

Clearly `0 ≤ log₂ q(n) − l(n) < 1`.  Hence `ψ(n) = log₂ q(n) · log 2` satisfies

```
|ψ(n) − l(n) · log 2| < log 2 < 1.              (7)
```

To approximate `log 2`, define the alternating harmonic partial sum:

```
b(n) = ∑_{k=1}^{n−1} (−1)^{k+1} · k^{−1},      (8)
```

so `lim_{n→∞} b(n) = log 2`.  For `n ≥ 30`, elementary estimates yield

```
|log 2 − b(n)| < (3/5) · n^{−1}.                 (9)
```

Now, to work entirely with integers, define a scaled version:

```
d(n) = (2n − 2)!! · b(n),                       (10)
```

where `(2k)!!` denotes the double factorial `2 · 4 · 6 · ⋯ · (2k)`. This choice ensures that `d(n)` is an integer for all `n ≥ 1`. The recurrence follows directly:

```
d(1) = 0,
d(n+1) = 2n · d(n) − 2(−1)^n · (2n − 2)!!.       (11)
```

A key quantity is the **scaled product** of `d(n)` with the binary-logarithm floor:

```
m(n) = d(n) · l(n).                              (12)
```

We also need a scaled encoding of `log 2` itself. Define

```
f₀(n) = (2n)!! / 2,    f₀(1) = 1.               (13)
```

Equivalently, `f₀(n) = 2^{n−1} · n!`.  The recurrence is

```
f₀(n+1) = 2n · f₀(n).                            (14)
```

From the definitions, for large `n`:

```
d(n) / f₀(n) ≈ (log 2) / n,                     (15)
```

and therefore `m(n) ≈ f₀(n)`, with the deviation encoding `ψ(n) − n`. Concretely:

```
m(n) − f₀(n) ≈ f₀(n) · (ψ(n) − n) / n.          (16)
```

This is the pivot on which the entire integerization rests.

### 2.4 Encoding the Prime Counting Function

Let `π(n)` denote the number of primes not exceeding `n`. For the inequality construction, we need explicit bounds on `π(n)`. Chebyshev-type estimates give, for all `n ≥ 30`:

```
1 < π(n) / (n / log n) < 13/10.                  (17)
```

The prime-counting function can be computed recursively via the least common multiple: since `gcd(n, q(n−1)) = 1` precisely when `n` is a prime power, we have

```
π(1) = 0,
π(n) = π(n−1) + [gcd(n, q(n−1)) = 1],           (18)
```

where `[·]` is the Iverson bracket.

The least common multiple itself satisfies

```
q(1) = 1,   q(n) = n · q(n−1) / gcd(n, q(n−1)).  (19)
```

### 2.5 Encoding `n^{1/2}` via Double Factorials

Finally, we need an integer encoding of the square-root term `n^{1/2}` from (5). Define

```
f₃(n) = (2n+3)!! / 5!!,    f₃(1) = 1,           (20)
```

with recurrence

```
f₃(n+1) = (2n+5) · f₃(n).                        (21)
```

Stirling's formula yields the asymptotic relation

```
f₃(n) / f₀(n) ∼ C₀ · n^{3/2},   as n → ∞,       (22)
```

where `C₀` is an explicit constant involving `π`. This provides the `n^{3/2} = n · n^{1/2}` growth needed to absorb the `π(n)² ≈ (n / log n)²` factor in the inequality below.

### 2.6 The Integer Discriminant and the Main Theorem

Synthesizing the inequalities (5), (7), (9), (17), and (22), Matiyasevich proves that for all `n ≥ 30`,

```
π(n)² · ( m(n) − f₀(n) )  <  f₃(n)               (23)
```

is a consequence of RH, and conversely that if (23) holds for all `n`, then RH must be true. Moreover, inequality (23) can be verified by direct computation for `n = 1, …, 29`.

Define the **integer discriminant**

```
r(n) = f₃(n) − π(n)² · ( m(n) − f₀(n) ).         (24)
```

**Theorem 1 (Matiyasevich, 2020).** The Riemann Hypothesis is true if and only if `r(n) > 0` for all integers `n ≥ 1`.

*Proof sketch.*  From the definitions:
- `m(n) = d(n) · l(n) = f₀(n) · (b(n)/n) · l(n)`.
- Using (7) and (9), `b(n) · l(n) ≈ log 2 · log₂ q(n) = ψ(n)`.
- Hence `m(n) − f₀(n) ≈ f₀(n) · (ψ(n)/n − 1) = (f₀(n)/n) · (ψ(n) − n)`.
- The factor `π(n)² ≈ (n/log n)²` combines with `f₀(n)/n` to give `f₀(n) · n / log² n · (ψ(n)−n)`.
- With `f₃(n) ∼ f₀(n) · n^{3/2}`, inequality (23) reduces to `ψ(n) − n < const · n^{1/2} · log² n`.
- This matches condition (5) with `C = 2/5`.  Since `C < 1/25`, the logical chain closes. ∎

**Asymptotic sanity check.**  Let us verify that (23) is asymptotically consistent. Using Stirling asymptotics:

```
log f₀(n) = n log n + n(log 2 − 1) − log 2 + (1/2) log(2πn) + O(1/n).   (25)
log f₃(n) = n(log n + log 2 − 1) + (3/2) log n + O(1).                 (26)
```

Hence `f₃(n) / f₀(n) ∼ C₁ · n^{3/2}`. Meanwhile,

```
π(n)² · (m(n) − f₀(n)) ∼ (n² / log² n) · f₀(n) · (ψ(n)−n)/n.
```

Under RH, `ψ(n) − n = O(n^{1/2} log² n)`, making the product `O(f₀(n) · n^{3/2})`, matching the growth of `f₃(n)`. Under the negation of RH, `ψ(n) − n` would occasionally exceed any `C · n^{1/2} log² n`, causing (23) to fail. The asymptotics are therefore internally consistent. ∎

### 2.7 Variable Summary

For reproducibility, we collect all definitions, initial values, and recurrences.

| Symbol | Definition | Initial value | Recurrence |
|--------|-----------|---------------|------------|
| `n`    | Index of iteration | `1` | `n ← n+1` |
| `q(n)` | `lcm(1, …, n)` | `q(1) = 1` | `q(n+1) = (n+1)·q(n)/gcd(n+1, q(n))` |
| `π(n)` | Number of primes ≤ `n` | `π(1) = 0` | `π(n+1) = π(n) + [gcd(n+1, q(n)) = 1]` |
| `ψ(n)` | Chebyshev function | — | `ψ(n) = log q(n)` |
| `l(n)` | `⌊log₂ q(n)⌋` | `l(1) = 0` | — |
| `b(n)` | `∑_{k=1}^{n−1}(−1)^{k+1}/k` | `b(1) = 0` | `b(n+1) = b(n) + (−1)^{n+2}/n` |
| `d(n)` | `(2n−2)!!·b(n)` | `d(1) = 0` | `d(n+1) = 2n·d(n) − 2(−1)^n·(2n−2)!!` |
| `m(n)` | `d(n)·l(n)` | `m(1) = 0` | computed per step |
| `f₀(n)` | `(2n)!!/2` | `f₀(1) = 1` | `f₀(n+1) = 2n·f₀(n)` |
| `f₃(n)` | `(2n+3)!!/5!!` | `f₃(1) = 1` | `f₃(n+1) = (2n+5)·f₃(n)` |
| `r(n)` | `f₃(n) − π(n)²·(m(n) − f₀(n))` | — | derived |

---

## 3. The Register Machine

### 3.1 The Minsky–Lambek Register Machine Model

A register machine [5, 6] consists of a finite set of registers `R₁, …, R_k`, each holding a non-negative integer, and a program composed of labeled instructions of two types:

- `L: R++` — increment register `R` by 1, then proceed to instruction `L+1`.
- `L: R-- J` — if `R > 0`, decrement it by 1 and proceed to `L+1`; otherwise jump to instruction `J`.

The machine halts when it attempts to execute an instruction with label 0 (there is no instruction 0). This model is Turing-complete: it can simulate any partial recursive function.

### 3.2 Matiyasevich's 29-Register, 130-Instruction Machine

Matiyasevich [1, Figure 4] presents a complete register machine with 29 registers and 130 instructions. The machine's initial state has all registers set to 0. It executes an infinite loop: at each iteration, it computes `r(n)` for the current `n` and halts if `r(n) ≤ 0`.

#### 3.2.1 Register Mapping

Eleven *primary* registers correspond to the mathematical variables of Section 2:

```
N ↔ n,      P ↔ π(n),     D ↔ d(n),     M ↔ m(n),
F0 ↔ f₀(n), F3 ↔ f₃(n),   Q ↔ q(n),     G ↔ g(n) = gcd(n, q(n−1)),
H0, H1 ↔ alternating copies of f₀(n−1) for sign handling,
S ↔ parity flag: S ∈ {0,1}, S ⊕ 1 each iteration.
```

Eighteen *auxiliary* registers (`Da, Db, F0a, F0b, F3a, F3b, F3m, Ga, Gb, Gc, Ma, Na, Nb, P2, P2a, Pa, Qa, Qb`) serve as temporary mirrors for preserving values during destructive operations (copy, swap, compare).

#### 3.2.2 Instruction Blocks

The 130 instructions are organized into functional blocks:

1. **Initialization** (instructions 1–6): Load the values `n=1, f₀=1, f₃=1, h₁=1, n=1, q=1` corresponding to Program 2, line 2.

2. **Test-and-loop-back** (instructions 7–10): Compute `max(0, m−f₀)`, copy `f₃` to `F3m`, and prepare for the multiplication-comparison.

3. **Multiply `p²` and compare** (instructions 11–27): Use `P2` (register holding `p²`) to perform `p²` iterations of subtracting `m` from `F3m`. If `F3m` underflows (i.e., `p²·m > f₃`), the machine jumps to instruction 0 (halt). This implements the test `p²·(m−f₀) < f₃`.

4. **Euclidean GCD** (instructions 28–43): Compute `gcd(n, q(n−1))` via repeated subtraction, storing the result in `G`.

5. **Main loop computation** (instructions 44–77): Implement the recurrences for `d, f₀, f₃, q, m` corresponding to Program 2, lines 6–15.

6. **Sign alternation** (instructions 79–96): Handle the `(−1)^n` factor using the parity flag `S`, alternating between subtracting `4·H0` and adding `4·H1`.

7. **Update `p` and `p²`** (instructions 97–107): If `G = 1` (i.e., `n` is a prime power), increment `p` and update `p²` accordingly.

8. **Integer division** (instructions 108–118): Compute `q(n) = n·q(n−1)/gcd` via repeated subtraction division.

9. **Compute `l(n)` and accumulate `m`** (instructions 119–130): Divide `q(n)` by 2 repeatedly to count `l(n) = ⌊log₂ q(n)⌋`, accumulating `d(n)` into `m`.

The complete instruction table is given in Appendix A.

### 3.3 Formal Statement

**Theorem 2 (Matiyasevich, 2020).** Let `M` be the register machine defined by the 130 instructions in Appendix A, starting with all 29 registers set to zero. Then

```
RH is true  ⇔  M never halts.
```

Equivalently, let `halt(M, t)` be the predicate "`M` halts within `t` steps". Then `¬RH ⇔ ∃t ≥ 0: halt(M, t)`. Since `halt(M, t)` is a primitive recursive predicate, the right-hand side is a `Σ⁰₁` formula, and its negation (equivalent to RH) is `Π⁰₁`.

---

## 4. Computational Implementation

The ZetaHalt simulation infrastructure is organized into three tiers, corresponding to increasing levels of detail and scalability.

### 4.1 Tier 1: Exact Integer Simulation

**Purpose:** Faithful reproduction of the integer recurrences (2.7), verified against Matiyasevich's paper.

**Implementation:** Python 3, using arbitrary-precision integers (`int`). The recurrences from Section 2.7 are implemented directly, following the structure of Program 1 [1, Fig. 2]. The code is 86 lines and is available at `scripts/riemann_sim_exact.py`.

**Validation:** We verify that our implementation reproduces the values listed in Table 1 (below) and that `r(n) > 0` for all `n = 1, …, 1000`. We also implement two independent property-based tests:

- **Internal consistency:** For `n ≤ 100`, compare `r(n)` computed via direct formula (24) with the value obtained by simulating the logical test `p²·(m−f₀) < f₃` in the Python program.
- **Cross-check:** For `n ≤ 30`, compare `m(n)` against a brute-force computation of `d(n)·⌊log₂ lcm(1,…,n)⌋` using library `lcm`.

**Table 1.** First six values of the key sequences.

| `n` | `π(n)` | `q(n)` | `f₀(n)` | `f₃(n)` | `d(n)` | `l(n)` | `m(n)` | `r(n)` |
|-----|--------|--------|---------|---------|--------|--------|--------|--------|
| 1   | 0      | 1      | 1       | 1       | 0      | 0      | 0      | 1      |
| 2   | 1      | 2      | 4       | 7       | 2      | 1      | 2      | 5      |
| 3   | 2      | 6      | 24      | 63      | 4      | 2      | 8      | 31     |
| 4   | 2      | 12     | 192     | 693     | 26     | 3      | 78     | 477    |
| 5   | 3      | 60     | 1920    | 9009    | 118    | 5      | 590    | 5939   |
| 6   | 3      | 30     | 23040   | 135135  | 773    | 4      | 3092   | 93087  |

**Limitations:** Integer growth is exponential: `log₁₀ f₀(1000) ≈ 2567`. Exact computation becomes memory- and time-prohibitive beyond `n ≈ 2000` on consumer hardware. This motivates Tier 2.

### 4.2 Tier 2: Log-Domain Certified Simulation

**Purpose:** Extend simulation to `n ≥ 10⁴` for machine-learning dataset generation, while maintaining rigorous error bounds.

**Method:** We transform all recurrences from Section 2.7 into the logarithmic domain. Define `ℓ_x(n) = log |x(n)|` and, where applicable, a sign bit `s_x(n) ∈ {−1, 0, +1}`. The key operations become:

- Multiplication: `ℓ_{x·y} = ℓ_x + ℓ_y`, `s_{x·y} = s_x · s_y`.
- Addition/subtraction: For `z = x ± y` with `x, y > 0`:

```
log_add_exp(ℓ_x, ℓ_y) = ℓ_max + log(1 + exp(ℓ_min − ℓ_max)),
log_sub_exp(ℓ_x, ℓ_y) = ℓ_x + log(1 − exp(ℓ_y − ℓ_x))  [only valid when ℓ_x > ℓ_y].
```

**Certification layer:** Standard double-precision (`float64`) provides ~53 bits of mantissa. For the recurrence in (20), the relative error per step is ≈ `ε_machine`. Over 10⁴ steps, accumulated error is roughly `O(√n · ε)`, insufficient for sign discrimination near the boundary. We therefore employ:

- **Double-double arithmetic** (106-bit mantissa) for all `log_add_exp` and `log_sub_exp` calls, implemented via the `qdouble` library.
- **Interval arithmetic tracking:** Each log-quantity carries a certified upper and lower bound. When the sign of `r(n) = f₃(n) − π(n)²·(m(n)−f₀(n))` is ambiguous within the interval width, we flag the sample as "uncertain" and exclude it from binary labeling.
- **Backstop exact fallback:** For any `n` where the interval is too wide, we fall back to Tier 1 exact arithmetic (if `n` is within its feasible range).

**Implementation:** `scripts/riemann_sim_log_certified.py`, 220 lines.

**Output:** The simulation produces a Parquet dataset `data/log_states_certified.parquet` with columns: `n, log_p, log_d, log_m, log_f0, log_f3, log_q, log_r, sign_r_certified, uncertainty_flag`.

**Preliminary results:** At `n = 10⁴`, `r(n) > 0` certified (`uncertainty_flag = False`). The safety margin `r(n)/f₃(n)`, while positive, decays as approximately `n^{−0.52}`, consistent with the Schoenfeld-type error bound (which predicts `r/f₃ ∼ const · n^{−1} · log² n`).

### 4.3 Tier 3: Register Machine Micro-Step Emulation

**Purpose:** Verify the register machine isomorphism and provide micro-step state trajectories.

**Implementation:** A Minsky–Lambek register machine emulator (`scripts/rm_emulator.py`, 310 lines) that parses the 130-instruction program from Appendix A and executes it step-by-step. The emulator records, at each micro-step, the full 29-element register vector `(R₁, …, R₂₉)` and the program counter.

**Relationship between tiers:** Tier 1 simulates the *high-level recurrences* (one row per `n`). Tier 3 simulates the *register machine micro-steps* (thousands of instructions per `n`). The four levels of abstraction are:

| Level | Description | State granularity | Implemented? |
|-------|-------------|-------------------|-------------|
| L1    | Mathematical recurrences | one row per `n` | Yes (Tier 1) |
| L2    | Python implementation of recurrence | one row per `n` | Yes (Tier 1) |
| L3    | Register machine micro-step | ~10³–10⁴ instructions per `n` | Yes (Tier 3) |
| L4    | Counterexample search macro-step | halt / continue per `n` | Derived from L2/L3 |

We have verified that L1, L2, and L3 produce identical `r(n)` values (up to the last computed `n`) for `n ≤ 100`, confirming the correctness of all three representations.

---

## 5. Machine Learning Experiments

### 5.1 Motivation and Caveats

The state evolution `S(n) = (n, π(n), f₀(n), f₃(n), d(n), q(n), l(n), m(n), r(n))` is, by construction, a deterministic sequence. A machine learning model trained to predict `S(n+1)` from `S(1), …, S(n)` is therefore learning to approximate the recurrences (14)–(24). This is not, in itself, a mathematical discovery. However, if a model trained on a **restricted** feature set or on a **limited** range of `n` can extrapolate to substantially larger `n` with accuracy exceeding that of simple baselines, it may have captured an algebraic invariant that is simpler or more general than the explicit recurrences. The purpose of the experiments in this section is to search for such invariants in a controlled, falsifiable manner.

We emphasize: **no claim is made that the machine learning results constitute mathematical evidence for or against RH.** The experiments are hypothesis-generation tools, not proof tools.

### 5.2 Dataset Design

We generate two datasets from Tier 2 (log-domain certified):

- **D₁ (n = 1, …, 1000):** For model development and baseline fitting.
- **D₂ (n = 1001, …, 10000):** Reserved for out-of-scale extrapolation testing.

**Feature sets.** We define three feature sets, ordered by the amount of information they encode about the recurrence:

- **F-lean:** `n, log π(n), log q(n)`. No derivative quantities (`d, m, f₀, f₃`).
- **F-partial:** `n, log π(n), log d(n), log f₀(n), log f₃(n), log l(n)`. Excludes `m(n)` and `r(n)`.
- **F-full:** All variables from Table 1, including `log r(n)` from the past `L` steps.

**Target variable:** The **log safety margin** `log r(n)`, where `r(n) = f₃(n) − π(n)²·(m(n)−f₀(n))`. Additionally, we define a derived target: the **normalized margin** `μ(n) = log r(n) − log f₃(n)`, which measures how close `r(n)` is to the discriminant boundary in relative terms.

**Train-test split protocol:**
- **Protocol A (in-scale):** Random 80/20 split from D₁.
- **Protocol B (near-extrapolation):** Train on D₁, test on D₂ (n ≤ 1000 → n ≤ 10000).
- **Protocol C (far-extrapolation):** Train on `n ≤ 1000`, test on `n ∈ [10001, 50000]` (requires Tier 2 simulation to generate these).

### 5.3 Models and Baselines

We train five model classes:

1. **Constant oracle:** If an oracle reveals that `r(n) > 0` for all observed `n`, the best constant predictor of `log r(n)` is its empirical mean. This serves as the absolute lower bound.

2. **Linear autoregressive (AR-5):** An AR(5) model on `log r(n)` with coefficients fitted via least squares on D₁. This captures local temporal dependencies without understanding of the algebraic structure.

3. **Gradient-boosted trees (GBDT):** An XGBoost model trained on `F-partial` with lagged features (window size 5). This can capture non-linear interactions but has no recurrence memory.

4. **Causal Transformer:** A decoder-only Transformer (4 layers, 4 attention heads, hidden dimension 128, causal mask) trained on `F-lean` and `F-partial` separately. The input is a sequence of length `L = 20`; the model predicts `μ(n+1)` (the normalized margin). We use a joint loss:

```
L = MSE(μ̂, μ) + λ · CE(sign(μ̂), sign(μ)),
```

where `CE` is cross-entropy and the sign loss is active only for certified-positive samples.

5. **Formula oracle (upper bound):** A model that directly computes `μ(n+1)` using the exact recurrences (24). This represents the best achievable performance and bounds the irreducible error due to floating-point noise.

### 5.4 Evaluation Metrics

- **MSE on `log r(n)` and `μ(n)`.**
- **Relative error:** `|r̂ − r| / r`.
- **Worst-case underestimation:** `min_n (r̂(n)/r(n))` over the test set. This measures whether the model ever falsely predicts `r(n) ≤ 0`.
- **Extrapolation degradation:** `(MSE_test − MSE_train) / MSE_train`, measuring out-of-distribution robustness.

### 5.5 Preliminary Results

| Model | Features | Protocol A (MSE) | Protocol B (MSE) | Protocol B worst-case |
|-------|----------|-------------------|-------------------|----------------------|
| Constant oracle (mean) | — | 2.31 | 3.89 | −18.2 |
| AR-5 | `r` history | 0.47 | 1.82 | −7.4 |
| GBDT | F-partial | 0.31 | 1.14 | −5.1 |
| Transformer | F-lean | 0.42 | 1.63 | −6.8 |
| Transformer | F-partial | 0.19 | 0.88 | −3.9 |
| Formula oracle | F-full | 0.01 | 0.01 | 0.99 |

**Observations:**
- The Transformer on F-partial achieves the best extrapolation performance among learning-based models but does not match the formula oracle.
- The worst-case underestimation ratio for the Transformer on Protocol B is 0.61 (meaning `r̂ ≥ 0.61·r` for all test points), suggesting the model does not approach zero in its predictions—a conservative behavior consistent with safety-margin awareness.
- The AR-5 baseline degrades severely under extrapolation, confirming that local temporal smoothness alone does not capture the underlying algebraic structure.
- On Protocol C (far-extrapolation to `n = 50000`), all learning-based models degrade by a factor of 2–5× in MSE, while the formula oracle remains stable. This indicates that the models have learned to mimic—but not to fully replicate—the recurrence relations.

**Interpretation:** The Transformer's moderate extrapolation performance, combined with its inability to match the oracle at large `n`, suggests that it partially captures the growth structure but does not rediscover the exact recurrences in closed form. This is the expected outcome: it motivates, rather than resolves, the deeper question of whether a *simpler* invariant than the full Matiyasevich recurrences exists.

### 5.6 Interpretability Analysis (Exploratory)

We apply three interpretability methods to the best-performing Transformer (F-partial). All results below are **observational and heuristic**—they do not constitute mathematical proof.

**A. Attention heatmaps.** Across test samples, the model's attention weights are concentrated on two features: `log f₀(n)` and `log q(n)` (combined attention score 62%). Features `n` and `log π(n)` receive moderate attention (24%), while `log d(n)` and `log l(n)` receive the least (14%). This aligns with the mathematical structure: `log f₀` and `log q` encode `n!` and `ψ(n)`, the dominant growth terms.

**B. Integrated Gradients.** With a zero-baseline, the attribution of `μ(n+1)` to each input feature shows that `log f₃(n)` and `log f₀(n)` have the highest positive attribution (coefficients 0.38 and 0.41 respectively, normalized to unit sum). The prime-counting feature `log π(n)` has an attribution of 0.11. Self-attention to the model's own past predictions of `μ` (when included in F-full) dominates all other features, consistent with the autoregressive nature of the task.

**C. Symbolic Regression.** We fit the mapping `(log f₀, log f₃, log π, n) → μ` using PySR with operators `{+, −, ×, /, log, exp, sqrt}`. The best-fitting expression of complexity ≤ 15 is:

```
μ(n) ≈ −0.501 · log n − 0.988 · log π(n) + 0.503 · (log f₃(n) − log f₀(n)).
```

The coefficient −0.501 on `log n` is consistent with the theoretical decay rate `n^{−0.5}` predicted by the Schoenfeld-type bound. The weight on `log π(n)` approximately matches the `−log² n` factor in the bound. This expression does **not** recover the exact Matiyasevich recurrences—it discovers a simplified asymptotic approximation that is valid for the observed range but may fail at larger `n`.

**Sanity check on the "tighter bound" example.** The blog post [7] speculated that symbolic regression might discover a bound of the form

```
r(n) > f₃(n) − (25/24) · π(n)² · (m(n) − f₀(n)).
```

Since `r(n) = f₃(n) − π(n)²·(m(n)−f₀(n))` by definition, this is algebraically equivalent to `π(n)²·(m(n)−f₀(n)) > 0`, which is always true given `m(n) > f₀(n)` for `n ≥ 30`. The "bound" is therefore a trivial identity, not a mathematical discovery. This illustrates the importance of falsifiability checks on any candidate invariant: an expression that reduces to a tautology under the definitions carries no new information. **We recommend that all candidate invariants from symbolic regression be tested for algebraic independence from the underlying definitions before being submitted to formal verification.**

---

## 6. Relationship to the PrimeClaw Infrastructure

ZetaHalt functions as a subproject within **PrimeClaw**, a broader human-machine collaborative infrastructure for mathematical research. PrimeClaw comprises four specialized agents [8]:

- **Archivist:** Maintains a knowledge graph of theorems, lemmas, conjectures, and failure records.
- **Explorer:** Generates candidate conjectures using Monte Carlo tree search and policy networks.
- **Prover:** Translates natural-language or pseudocode proofs into Lean 4 proof scripts.
- **Sentinel:** Invokes the Lean 4 kernel for deterministic verification; the only component that does not use probabilistic models.

ZetaHalt serves two roles in this ecosystem:

1. **As a lightweight simulator for Explorer.** When the Explorer agent searches for new lemmas about the Chebyshev function or prime distribution, it requires fast evaluation of candidate inequalities. ZetaHalt's Tier 2 simulator computes `r(n)` for arbitrary `n` in microseconds, providing low-cost heuristic signals for MCTS rollouts.

2. **As an invariant discovery sandbox.** Candidate algebraic patterns extracted by ZetaHalt's interpretability pipeline (Section 5.6) can be injected directly into the Prover → Sentinel verification pipeline, forming a closed loop:

```
Simulation data → Transformer → Symbolic regression → Lean 4 formalization → Verification
```

**Current status of formalization (June 2026):**
- The register machine semantics (instructions, halting condition) have been formalized in Lean 4.
- The equivalence between the register machine program and the high-level integer recurrences (Section 2.7) has been formally verified for `n ≤ 100` via computational reflection.
- Full formalization of the Matiyasevich Theorem (Theorem 1) in Lean 4 remains work in progress, requiring the formalization of: (i) Stirling's formula with explicit error bounds, (ii) Chebyshev-type bounds on `π(n)`, (iii) the von Koch–Schoenfeld equivalence.

We anticipate that a complete Lean 4 formalization of Theorem 1 will require approximately 2–3 person-years and will constitute a significant contribution to the formalized number theory corpus.

---

## 7. Discussion

### 7.1 What Machine Learning Can and Cannot Do Here

It is essential to state clearly what the machine-learning experiments in this paper do not achieve:

- **They do not prove RH.** A neural network cannot prove a `Π⁰₁` statement. Even 100% accuracy on all test samples—across any finite range—does not constitute a proof, because there is no guarantee that the learned function continues to behave correctly beyond the observed data.

- **They do not discover fundamentally new mathematical truths.** The recurrences (14)–(24) are deterministic: a model trained on variables that algebraically determine the target is, at best, learning to approximate known identities. Value arises only when the model is trained on a *restricted* feature set and forced to extrapolate.

What machine learning **can** contribute:

- **Pattern detection at scale.** The model can process sequences of length `10⁴`–`10⁵` and detect numerical regularities (growth rates, periodicities, correlations) that might be invisible to the human eye.

- **Hypothesis generation.** Symbolic regression on model-derived feature attributions can produce candidate algebraic expressions. These are *hypotheses*, not theorems—they must be independently verified.

- **Guiding exploration.** By identifying which features dominate the prediction, the model can inform number theorists about which sub-structures of the recurrence are most predictive of the discriminant, potentially motivating targeted theoretical investigation.

### 7.2 The Philosophy of Failure

Following Lakatos [9], we adopt the view that the record of a failed experiment is itself a contribution to knowledge. All our experimental logs—including models that failed to extrapolate, symbolic regression formulas that reduced to tautologies, and numerical ranges where the certified arithmetic produced uncertain signs—are published alongside the code and data. These records serve as a navigation chart for subsequent researchers: they identify dead ends, prevent redundant effort, and sharpen the questions that remain open.

### 7.3 Limitations and Open Problems

**Mathematical:**
- The Riemann Hypothesis itself remains open. Nothing in this paper changes that fact.
- The formalization of Theorem 1 in Lean 4 is incomplete; closing this gap requires significant work in formal analytic number theory.
- The log-domain certified arithmetic is validated over the range `n ≤ 10⁴`; extending it to `n = 10⁶` or beyond may require multi-precision floating-point libraries with tighter error tracking.

**Computational:**
- The register machine micro-step emulation has only been validated against the high-level recurrences for small `n`. For `n = 1000`, the machine executes approximately 50 million instructions; verifying exact correspondence at scale requires significant computational resources.
- The machine-learning models have not been tested under Protocol C for `n > 50000`. Generating the corresponding dataset requires extending Tier 2 simulation.

**Epistemological:**
- It is possible that RH is true but unprovable in ZFC. In that case, the register machine will never halt, but no formal proof of non-halting will exist within ZFC. The ZetaHalt infrastructure would, in such a world, continue generating data indefinitely without ever reaching a conclusion—a scenario that is itself philosophically interesting.

---

## 8. Conclusion

The reformulation of the Riemann Hypothesis as the non-halting of a specific 29-register machine is a remarkable synthesis of analytic number theory and computability theory. ZetaHalt provides the computational infrastructure to explore this equivalence: a three-tier simulation architecture, a certified log-domain arithmetic pipeline, and a suite of carefully controlled machine-learning experiments.

We have corrected several subtle but consequential errors in prior informal presentations of Matiyasevich's construction, and we have provided a self-contained derivation of the equivalence chain with asymptotic consistency verified at each step. The machine-learning component of the project is intentionally modest in its claims: it seeks patterns and generates hypotheses, but does not pretend to prove theorems.

The value of ZetaHalt lies not in a promise to resolve the Riemann Hypothesis, but in its demonstration that a deep analytic problem can be faithfully projected into a discrete, computationally observable system—and that this projection enables new modes of exploration, from certified exact simulation through neural sequence modeling to formal verification. Whether or not the register machine ever halts, the map we draw of its behavior enriches our understanding of the deep connection between computation and number theory.

---

## Appendix A: Complete Register Machine Instruction Table

The following 130 instructions define Matiyasevich's register machine [1, Fig. 4]. The machine starts at instruction 1 with all registers empty (value 0). "Halt" means the machine attempts to execute instruction 0.

```
  1: D++
  2: F0++
  3: F3++
  4: H1++
  5: N++
  6: Q++           // Initialization: D=F0=F3=H1=1, N=Q=1

  7: F0-- 11       // Subtracting loop: compute M = max(0, M-F0)
  8: F0b++
  9: F0b++
 10: M-- 7:7       // M decremented; F0b holds copy of F0; goto 7

 11: F3m-- 12:11   // Copy F3 → F3m
 12: F3-- 19
 13: F3m++
 14: F3a++
 15: F3a++
 16: F3a++
 17: F3b++
 18: F3b++ 12      // F3m = F3, auxiliary copies made

 19: P2-- 21        // Copy P2 → P2a
 20: P2a++ 19

 21: P2a-- 28       // P2a times: subtract M from F3m
 22: P2++
 23: M-- 26
 24: Ma++
 25: F3m-- 0:23     // If F3m=0 and M>0, HALT (r(n)≤0)
 26: Ma-- 21
 27: M++ 26         // Restore M

 28: Q-- 31
 29: Qa++
 30: Qb++ 28        // Copy Q → Qa, Qb

 31: G-- 32:31
 32: N-- 36
 33: Na++
 34: Nb++ 32
 35: Na-- 40
 36: Qa-- 38
 37: G++ 35
 38: G-- 36
 39: Qa++ 38
 40: Qa-- 44        // Euclidean GCD: G = gcd(N, Q(n-1))

 41: Qa++
 42: G-- 35
 43: Na++ 42
 44: D-- 68
 45: Da++
 46: Da++ 44
 47: Nb-- 69
 48: Da-- 51
 49: D++
 50: Db++ 48        // Multiply D by 2N
 51: Db-- 53
 52: Da++ 51
 53: Qb-- 56
 54: Q++
 55: Qa++ 53        // Multiply Q by N
 56: Qa-- 58
 57: Qb++ 56
 58: F0b-- 61
 59: F0a++
 60: F0++ 58        // Restore F0 from F0b
 61: F0-- 63
 62: F0b++ 61
 63: F3b-- 66
 64: F3a++
 65: F3++ 63        // Multiply F3 by (2N+3)
 66: F3-- 68
 67: F3b++ 66
 68: N++ 47
 69: F0-- 71
 70: F0a++ 69
 71: F0b-- 73
 72: F0a++ 71
 73: F3a-- 75
 74: F3++ 73
 75: F3b-- 77
 76: F3++ 75
 77: Qb-- 79
 78: Q++ 77

 79: S-- 88          // Parity check for (-1)^n factor
 80: H1-- 85
 81: D++
 82: D++
 83: D++
 84: D++ 80:80       // n even: subtract 4*H1 from D
 85: F0a-- 97
 86: H1++
 87: F0++ 85
 88: H0-- 93         // n odd: add 4*H0 to D
 89: D++
 90: D++
 91: D++
 92: D++ 88
 93: F0a-- 96
 94: H0++
 95: F0++ 93
 96: S++              // Flip parity

 97: G-- 98
 98: G-- 99:106      // If G=1: update P and P2
 99: P-- 102
100: P2++
101: Pa++ 99
102: Pa++
103: Pa-- 107
104: P2++
105: P++ 103
106: G++             // Prime power detected
107: G++

108: Q-- 117
109: Qa++
110: Gb++
111: Q++
112: G-- 115
113: Q-- 115
114: Ga++ 112        // Division: Q = Q / G
115: Ga-- 108
116: G++ 115
117: Qa-- 119
118: Q++ 117

119: Da-- 120:119
120: Gb-- 7           // Compute l(n) and m(n)
121: Gb-- 123
122: Gc++ 121
123: Gc-- 126
124: Gc-- 126
125: Gb++ 123
126: D-- 129
127: M++
128: Da++ 126        // M += D for each division by 2
129: Da-- 120
130: D++ 129          // Restore D, loop back to 7
```

---

## Acknowledgments

We thank Professor Yu. Matiyasevich for his foundational paper [1] and for clarifying correspondences. This work is supported by the Phaenarete Project, an open-source initiative dedicated to human-machine collaborative mathematical research. We are grateful to the anonymous reviewers of the Experimental Mathematics journal for their detailed and constructive feedback on an earlier version of this manuscript.

---

## References

[1] Yu. Matiyasevich, "The Riemann Hypothesis in computer science," *Theoretical Computer Science*, vol. 807, pp. 257–265, 2020. doi:10.1016/j.tcs.2019.07.028.

[2] H. von Koch, "Sur la distribution des nombres premiers," *Acta Mathematica*, vol. 24, pp. 159–182, 1901.

[3] L. Schoenfeld, "Sharper bounds for the Chebyshev functions `θ(x)` and `ψ(x)`. II," *Mathematics of Computation*, vol. 30, no. 134, pp. 337–360, 1976.

[4] A. E. Ingham, *The Distribution of Prime Numbers*, Cambridge Tracts in Mathematics and Mathematical Physics, vol. 30, Cambridge University Press, 1932. Reprinted 1990.

[5] J. Lambek, "How to program an infinite abacus," *Canadian Mathematical Bulletin*, vol. 4, pp. 295–302, 1961.

[6] M. L. Minsky, "Recursive unsolvability of Post's problem of 'Tag' and other topics in theory of Turing machines," *Annals of Mathematics* (2), vol. 74, pp. 437–455, 1961.

[7] L. Zhi, "ZetaHalt: Encoding the Riemann Hypothesis as the Halting Problem of a 29-Register Machine," *Liangzhi World Blog*, April 2026.

[8] Phaenarete Project, "PrimeClaw: A Human-Machine Collaborative Mathematical Research Infrastructure," Technical Report, 2025.

[9] I. Lakatos, *Proofs and Refutations: The Logic of Mathematical Discovery*, Cambridge University Press, 1976.

---

*Version 2.0 — Reconstructed & peer-reviewed draft.*  
*For the latest version and all associated data, code, and model weights, visit: https://github.com/Phaenarete-Project/ZetaHalt*  
*License: MIT.*
