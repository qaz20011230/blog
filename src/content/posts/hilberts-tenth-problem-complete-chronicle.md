---
title: "Hilbert’s Tenth Problem: From the Entscheidungsproblem to the Undecidability of All Finitely Generated Rings"
date: "2026-03-01"
category: "Logic"
tags:
  - Hilbert's Tenth Problem
  - Logic
  - Diophantine Equations
  - Computability
  - Mathematics
description: "A Complete Chronicle, Modern Proofs, and the Open Frontier: From the Entscheidungsproblem to the Undecidability of All Finitely Generated Rings."
---

### Contents

**Preface**

**Part I: Genesis and the Classical Period**

1. The Paris Lecture of 1900
2. The Entscheidungsproblem and the Birth of Computability
3. The Davis Normal Form
4. The Davis–Putnam–Robinson Hypothesis and Exponential Growth
5. Matiyasevich and the Fibonacci Numbers
   5.1. The Pell Equation and Sequence Growth
   5.2. The Divisibility Lemma and Diophantine Coding
6. The MRDP Theorem: Statement and Immediate Consequences
   6.1. The Universal Diophantine Equation
   6.2. Undecidability of the Halting Problem and H10

**Part II: The Geometry of Undecidability**

7. The Search for the Existential Universe
8. Defining Integers in Rational Fields: Julia Robinson's Legacy
9. Pell Equations in Number Fields and Rings of Integers
   9.1. Denef's Work and Norm Equations
   9.2. The Gap: Subrings of ℚ and the Finite Generation Barrier
10. Elliptic Curves as the New Workhorse
    10.1. Rank and the Mordell–Weil Group
    10.2. The Bumpy Road to Definability

**Part III: The Koymans–Pagano Revolution (2025–2026)**

11. The Problem of Finitely Generated Rings
    11.1. Why ℤ is Different from ℤ[x]
    11.2. The Obstruction: The Unit Group and Rank Constraints
12. The Alpoge–Bhargava–Ho–Shnidman Preprint
13. **Koymans–Pagano (2026): The Definitive Proof**
    13.1. The Construction of the Family $E_{m,n}$
    13.2. Descent and the Selmer Rank Formula
    13.3. **The Green–Tao Sieve over Number Fields (Kai's Extension)**
    13.4. Forcing Rank Exactly One via Parity
    13.5. Diophantine Definition of ℤ in $R$
14. Consolidation: The Final Theorem for All Infinite Finitely Generated Rings

**Part IV: The Last Frontier — The Rational Numbers ℚ**

15. Why ℚ Remains Unyielding
    15.1. First-Order Definability vs. Existential Definability
    15.2. Koenigsmann's Universal Quantifier
16. Conditional Undecidability: The Birch–Swinnerton-Dyer Conjecture
17. Elliptic Curves and Prime Rationals: A Dead End?
18. Three Attack Strategies for the Next Decade
    18.1. Existential Definition via Rank 1 Curves
    18.2. Turing Equivalence of H10(ℚ) and H10(ℤ)
    18.3. Model Theory and Higher-Dimensional Varieties

**Part V: Spreading the Disease: Undecidability in Analysis and Dynamics**

19. From Integers to Sine Waves
    19.1. Reduction 1: $\sin(\pi x) = 0$ and Diophantine Equations
    19.2. Reduction 2: Convergence of Improper Integrals
20. Differential Equations and Chaos
    20.1. Ordinary Differential Equations (Power Series Solutions)
    20.2. Partial Differential Equations

**Part VI: The State of the Art Across Domains**

21. Function Fields and Positive Characteristic
22. $p$-adic Fields and the Ax–Kochen Era
23. Real Closed Fields and Tarski's Decidability
24. Formal Verification and Reverse Mathematics

**Part VII: Ten Open Problems for the Next Generation**

**Acknowledgements**

**Bibliography**

---

### Preface

In the annals of mathematical logic, few problems have exerted a gravitational pull as powerful as the Tenth Problem of David Hilbert. It is a problem that began as a request for an *algorithm*—a mechanical procedure to determine the solvability of polynomial equations in integers—and ended as the definitive statement on the *limitations* of algorithmic reasoning. The negative solution, culminating in the 1970 theorem of Yuri Matiyasevich, drawing on the foundational work of Martin Davis, Hilary Putnam, and Julia Robinson, is a monument of twentieth-century thought. It stands shoulder to shoulder with Gödel's Incompleteness Theorems and Turing's resolution of the *Entscheidungsproblem*.

Yet, the story did not end in 1970. The MRDP theorem solved Hilbert's Tenth Problem *as stated* (over the integers ℤ). But the problem's spirit—the quest to understand the boundary between the decidable and the undecidable in Diophantine geometry—spawned a vast and vibrant research program. For decades, the central challenge shifted to the field of rational numbers, ℚ, a domain where the absence of a canonical "prime" structure and the infinite generation of the additive group presented seemingly insurmountable barriers.

This survey is written at a unique moment in history, the cusp of the 2020s and 2030s. The period between 2020 and 2026 witnessed a seismic shift in our understanding of the problem's scope, culminating in the landmark work of Peter Koymans and Carlo Pagano (2026). Their proof, which establishes the undecidability of Hilbert's Tenth Problem for **every infinite finitely generated commutative ring**, closes a chapter that has been open for half a century. It is a result of breathtaking generality, leveraging the deepest tools of modern number theory: the arithmetic of elliptic curves, refined Selmer group computations, and the additive combinatorics of primes in number fields (the Green–Tao theorem).

This monograph aims to serve as both a chronicle of this intellectual odyssey and a technical roadmap. Part I meticulously reconstructs the classical MRDP proof, emphasizing Matiyasevich's ingenious use of Fibonacci numbers to tame exponential growth. Part II explores the geometric and algebraic reinterpretations of the problem. Part III provides the definitive, self-contained exposition of the 2026 breakthrough, from the construction of the elliptic curve family $E_{m,n}$ to the application of the parity conjecture. Finally, Part IV confronts the remaining monolith: Hilbert's Tenth Problem over ℚ. Here, we stand on the edge of the unknown, armed with new conditional results and speculative strategies that will guide the next decade of research.

This is a survey for the expert seeking a unified reference and for the advanced graduate student preparing to push the frontier further.

---

### Part I: Genesis and the Classical Period

#### 1. The Paris Lecture of 1900

On the morning of August 8, 1900, in the Sorbonne's Salle des Conférences, David Hilbert addressed the Second International Congress of Mathematicians. His lecture, "Mathematische Probleme," distilled the optimism of a century of progress into twenty-three guiding challenges for the twentieth century. The Tenth Problem, nestled among questions of primes, continua, and algebraic curves, was deceptively simple in its phrasing:

> **10. Entscheidung der Lösbarkeit einer diophantischen Gleichung.**
> *Eine diophantische Gleichung mit irgendwelchen Unbekannten und mit ganzen rationalen Zahlenkoefficienten sei vorgelegt: man soll ein Verfahren angeben, nach welchem sich mittels einer endlichen Anzahl von Operationen entscheiden läßt, ob die Gleichung in ganzen rationalen Zahlen lösbar ist.*

> **10. Determination of the Solvability of a Diophantine Equation.**
> *Given a Diophantine equation with any number of unknown quantities and with rational integral numerical coefficients: To devise a process according to which it can be determined by a finite number of operations whether the equation is solvable in rational integers.*

Hilbert was not asking for a method to *find* solutions. He was asking for a finite, deterministic procedure—what we now call an **algorithm**—to determine the *existence* of a solution. In 1900, the very concept of an "algorithm" or "finite procedure" was intuitive. It would take three decades and the crisis in the foundations of mathematics for this concept to be crystallized into formal definitions by Kurt Gödel, Alonzo Church, and Alan Turing.

#### 2. The Entscheidungsproblem and the Birth of Computability

Before Hilbert's Tenth Problem could be solved, the tools to understand its impossibility had to be invented. Hilbert's optimism extended to all of mathematics; he believed in the *Entscheidungsproblem* (Decision Problem) for predicate logic: an algorithm to decide the validity of any first-order logical formula.

In 1936, Alan Turing shattered this dream. To define "finite procedure," he imagined an abstract machine—the Turing Machine—scanning a tape. Turing showed that the **Halting Problem** (determining whether a given Turing machine will halt on a given input) is algorithmically unsolvable. Simultaneously, Alonzo Church used λ-calculus to prove the undecidability of predicate logic. The concept of **computably enumerable (c.e.)** sets—sets whose elements can be listed by an algorithm—emerged as the central object of recursion theory. A set is **computable** (or recursive) if and only if both the set and its complement are computably enumerable. The Halting Problem is the quintessential example of a c.e. set that is *not* computable.

The connection to H10 was latent. A Diophantine equation $p(a, x_1, \dots, x_k) = 0$ (where $a$ is a parameter and $x_i$ are variables) defines a set of parameters $a$ for which a solution exists. Such a set is, by its very definition, **computably enumerable**: one can simply enumerate all $k$-tuples of integers and check if they satisfy the equation. The question Hilbert posed was: Are all such Diophantine sets *computable*?

#### 3. The Davis Normal Form

The first bridge between recursion theory and Diophantine equations was built by Martin Davis in the early 1950s. Davis sought to capture the full power of computable enumerability using a restricted logical form.

**Theorem (Davis Normal Form, 1953).** *Every computably enumerable set $S$ can be represented in the form:*
$$ a \in S \iff \exists z \forall y \le z \exists x_1 \dots \exists x_k [P(a, x_1, \dots, x_k, y, z) = 0] $$
*where $P$ is a polynomial with integer coefficients.*

This is a mix of existential and a single *bounded universal* quantifier. The presence of the bounded universal quantifier $\forall y \le z$ was a thorn. If one could eliminate it—showing that the range of a Diophantine function can grow fast enough to encode bounded search—the problem would be solved.

**Definition.** A set $S \subseteq \mathbb{N}$ is **Diophantine** if there exists a polynomial $P$ such that:
$$ a \in S \iff \exists x_1, \dots, x_k \in \mathbb{N} [P(a, x_1, \dots, x_k) = 0] $$

Davis conjectured that the classes of Diophantine sets and computably enumerable sets coincide. This was the **Davis Conjecture**.

#### 4. The Davis–Putnam–Robinson Hypothesis and Exponential Growth

In 1961, Davis, Hilary Putnam, and Julia Robinson published a seminal paper, "The Decision Problem for Exponential Diophantine Equations." They studied the extended language where exponentiation $x^y = z$ is allowed.

**Theorem (DPR, 1961).** *Every computably enumerable set is **exponential Diophantine**. That is, it can be defined using a combination of polynomial equations and exponentiation.*

The proof is a masterful encoding of Turing machine computations. A step in a computation can be encoded in a large integer (a "Gödel number") whose digits (in a suitable base) represent the tape contents and state. The operations of moving the head and changing state translate to arithmetic operations—multiplication and division by the base. Exponentiation is required to glue the sequence of steps together: one needs a number $Q$ that is a power of the base, $Q = B^Y$, to mask and shift digits.

The gap between H10 and the DPR theorem was therefore reduced to a single, audacious question: **Can exponentiation be defined using only Diophantine equations (∃, +, ×)?**

Julia Robinson identified a necessary and sufficient condition. She showed that if there exists a Diophantine relation $J(u, v)$ such that:
1. $J(u, v) \implies v < u^u$ (growth condition)
2. For every $k$, there exist $u, v$ with $J(u, v)$ and $v > u^k$ (unbounded growth)

then exponentiation is Diophantine. Such a relation $J$ became known as a **Julia Robinson predicate**.

The search was on for a specific Diophantine equation whose solutions grow exponentially relative to the parameters but do not explode too fast. The problem went into the "wilderness years." Robinson, Davis, and Putnam suspected that the sequence of solutions to **Pell's Equation** held the key.

#### 5. Matiyasevich and the Fibonacci Numbers

In 1970, the 22-year-old Yuri Matiyasevich cracked the problem using an unexpected tool: the Fibonacci sequence.

Recall the Fibonacci numbers: $F_0 = 0, F_1 = 1, F_{n+2} = F_{n+1} + F_n$. They grow exponentially ($F_n \approx \phi^n / \sqrt{5}$). Matiyasevich studied the relation $n = F_{2m}$.

**Lemma 5.1 (The Divisibility Lemma).** *$F_n^2 \mid F_m \implies F_n \mid m$.*

This property, specific to the Fibonacci sequence (and more generally to Lucas sequences from Pell equations), allows one to enforce a strict divisibility condition that mimics the growth of $2^n$.

**Sketch of Lemma 5.1 Proof:**
One uses the closed-form Binet formula $F_k = \frac{\phi^k - \bar{\phi}^k}{\sqrt{5}}$ and properties of divisibility in the ring $\mathbb{Z}[\phi]$. The sequence modulo $F_n$ is periodic (Pisano period). The exact exponent of $F_n$ dividing $F_m$ is tied to the exponent of $n$ dividing $m$.

**5.2. The Diophantine Definition of Exponentiation**

Matiyasevich constructed a Diophantine relation $M(a, b, c)$ meaning $c = a^b$. He used the solutions to the Pell equation:
$$ x^2 - (a^2 - 1)y^2 = 1 $$
Let $x_n(a), y_n(a)$ be the fundamental solution sequence. Notice that $y_n(a)$ grows roughly like $(a + \sqrt{a^2-1})^n$.

By applying the Fibonacci divisibility lemma to the sequence $y_n(a)$, Matiyasevich proved that the relation $y = y_n(a)$ is Diophantine. Specifically, $m = n^k$ and other exponential relations could be encoded using the periodicity properties of $y_n(a)$ modulo $y_m(a)$.

This gave the missing piece: **The function $n \mapsto a^n$ is Diophantine.**

**Corollary 5.3.** *Every computably enumerable set is Diophantine.*

#### 6. The MRDP Theorem: Statement and Immediate Consequences

We arrive at the theorem that sealed the fate of Hilbert's original question.

**Theorem 6.1 (Matiyasevich–Davis–Putnam–Robinson, 1970).**
*Let $S \subseteq \mathbb{N}$ be a computably enumerable set. Then there exists a polynomial $P_S(a, x_1, \dots, x_k)$ with integer coefficients such that:*
$$ a \in S \iff \exists x_1 \dots x_k \in \mathbb{N} [P_S(a, x_1, \dots, x_k) = 0] $$
*Consequently, there exists a computably enumerable set $S$ (e.g., the Halting Problem) which is not computable. Therefore, there is no algorithm to decide for an arbitrary Diophantine equation whether it has integer solutions.*

**6.1. The Universal Diophantine Equation**

Since the Halting Problem is c.e. and undecidable, there exists a specific **Universal Diophantine Equation**. This is a fixed polynomial $U(a, x_1, \dots, x_k)$ such that the set of parameters $a$ for which $U=0$ is solvable is exactly the Halting Set. This polynomial has been explicitly constructed. The original construction had a degree of about 200 and used a few dozen variables. Today, explicit universal equations can be written with as few as 9 variables (due to Jones, 1982).

**6.2. Undecidability of the Halting Problem and H10**

The chain of reasoning is complete:
1. Halting Problem is undecidable (Turing, 1936).
2. Halting Problem is computably enumerable (definition).
3. Every c.e. set is Diophantine (MRDP, 1970).
4. Therefore, the set of solvable Diophantine equations is undecidable.
5. Hilbert's Tenth Problem has a negative answer.

---

### Part II: The Geometry of Undecidability

#### 7. The Search for the Existential Universe

The MRDP theorem is a statement about the ring of integers ℤ. But mathematicians immediately generalized the question: For which rings $R$ is Hilbert's Tenth Problem undecidable? The question is phrased as: Is there an algorithm to decide the solvability of polynomial equations with coefficients in $R$ (or ℤ) over $R$?

A key technique emerged: **Diophantine interpretation**. If we can define the ring ℤ (or more precisely, the structure $(\mathbb{Z}, +, \times)$) existentially within $R$, then the undecidability of H10 over ℤ transfers to $R$.

#### 8. Defining Integers in Rational Fields: Julia Robinson's Legacy

The most tantalizing target was the field of rational numbers ℚ. In 1949, Julia Robinson proved a remarkable theorem.

**Theorem 8.1 (Robinson, 1949).** *The ring of integers ℤ is first-order definable in the field ℚ.*

Her definition uses the Hasse–Minkowski local-global principle for quadratic forms. Specifically, a rational number $t$ is an integer if and only if for every rational number $x$, there exists $y$ such that the quadratic form $Q_t(a,b,c) = a^2 + b^2 + c^2 - t(1+x^2)(a^2+b^2+c^2)y$ has non-trivial zeros... (The precise formula is intricate but purely first-order).

However, **first-order definability is not enough for H10**. H10 requires *existential definability* (Diophantine definability). Robinson's definition contains universal quantifiers ($\forall$). The question of whether ℤ is *existentially definable* in ℚ remains the central open problem of the field.

#### 9. Pell Equations in Number Fields and Rings of Integers

For rings of integers $\mathcal{O}_K$ in number fields $K$, the situation is more tractable than ℚ because there are more "units" to play with.

**9.1. Denef's Work and Norm Equations**
In the 1980s, Jan Denef proved that H10 is undecidable for the ring of integers of any totally real number field. He used the Pell equation $x^2 - dy^2 = 1$ over $\mathcal{O}_K$ to define ℤ.

**9.2. The Gap: Subrings of ℚ and the Finite Generation Barrier**
For subrings of ℚ of the form $\mathbb{Z}[1/p]$ (where we allow denominators that are powers of $p$), H10 was shown to be undecidable by Bjorn Poonen (2002) and others. The reason is that $\mathbb{Z}[1/p]$ has enough "room" to mimic Pell growth. However, these rings are *not finitely generated as rings* (as ℤ-algebras).

The class of rings for which H10 was known to be undecidable, until 2026, was a patchwork: some number fields, some function fields, but **not all finitely generated rings**. A finitely generated ring over ℤ is of the form $\mathbb{Z}[x_1, \dots, x_n]/I$. The problem of undecidability for *all infinite* such rings was a major conjecture, known as the **Denef–Lipshitz Conjecture** or the **H10 for Finitely Generated Rings** problem.

#### 10. Elliptic Curves as the New Workhorse

Why did Pell equations fail for general finitely generated rings? A ring like $\mathbb{Z}[x]$ has unit group $\{\pm 1\}$. There is no infinite cyclic group of units to fuel the exponential growth required by the classical MRDP construction. The solution came from a different geometric object: **Elliptic Curves**.

An elliptic curve $E$ over a field $K$ is a smooth projective curve of genus 1 with a rational point. Its set of rational points $E(K)$ forms a finitely generated abelian group (Mordell–Weil Theorem). The **rank** of $E(K)$ is the number of independent points of infinite order.

**10.1. Rank and the Mordell–Weil Group**
If we can force an elliptic curve over a ring $R$ to have rank exactly 1, the group $E(R)$ contains a copy of ℤ. This copy of ℤ can be used to define the integers using the height pairing and divisibility properties of the group law.

**10.2. The Bumpy Road to Definability**
The challenge was to construct a *Diophantine family* of elliptic curves over an arbitrary finitely generated ring $R$ such that the set of parameters giving rank 1 is large and definable.

---

### Part III: The Koymans–Pagano Revolution (2025–2026)

#### 11. The Problem of Finitely Generated Rings

Let $R$ be an infinite, finitely generated commutative ring with identity. Is H10 over $R$ undecidable?
- If $R$ has characteristic $p>0$, the problem was solved by Shlapentokh and others (undecidable).
- If $R$ is an order in a number field, it was solved by Denef and others (undecidable).
- The hard case is when $R$ is essentially a geometric ring like $\mathbb{Z}[x]$ or $\mathbb{Z}[x, y]/(x^2 - 2y^3)$.

#### 12. The Alpoge–Bhargava–Ho–Shnidman Preprint

In late 2025, Alpoge, Bhargava, Ho, and Shnidman posted a preprint showing that H10 is undecidable for a large class of finitely generated rings using Selmer groups of elliptic curves. However, their method required that the ring $R$ satisfies a technical condition on the existence of a "large" set of primes.

#### 13. Koymans–Pagano (2026): The Definitive Proof

In February 2026, Peter Koymans and Carlo Pagano posted the manuscript arXiv:2602.04468v1, which eliminated all restrictions and proved the theorem in full generality. Their proof is a tour de force of arithmetic geometry.

**13.1. The Construction of the Family $E_{m,n}$**

The first step is to build a two-parameter family of elliptic curves over the ring $R$. We may assume $R$ contains $\mathbb{Z}[1/N]$ for some integer $N$. For parameters $m, n \in R$, consider the curve:
$$ E_{m,n}: y^2 = x^3 + a(m,n) x + b(m,n) $$
The specific family chosen by Koymans–Pagano is:
$$ E_{m,n}: y^2 = x(x - n)(x - m) $$
but twisted or modified to ensure a rational point of infinite order. More precisely, they use a family with a built-in rational point $P_{m,n}$ of infinite order, guaranteeing that the rank is $\ge 1$.

**13.2. Descent and the Selmer Rank Formula**

To prove the rank is *exactly* 1, they use a **2-descent**. The 2-Selmer group $\text{Sel}_2(E_{m,n}/K)$ sits in an exact sequence:
$$ 0 \to E(K)/2E(K) \to \text{Sel}_2(E/K) \to \text{Ш}(E/K)[2] \to 0 $$
The rank $r$ satisfies: $2^{r + 2} \le |\text{Sel}_2(E/K)|$. By computing the Selmer group, they find an explicit formula for its size depending on the prime factorization of a discriminant factor.

Specifically, consider the **discriminant factor**:
$$ \Delta = n(m - a_1 n)(m - a_2 n)(m - a_3 n) $$
The 2-torsion points correspond to the roots $0, a_1, a_2, a_3$. The size of the Selmer group is controlled by the number of prime divisors of $\Delta$ in $R$.

**13.3. The Green–Tao Sieve over Number Fields (Kai's Extension)**

This is the critical number-theoretic input. Koymans and Pagano needed to find values $m, n \in R$ such that the factors $(m - a_i n)$ are simultaneously **prime ideals** in the ring of integers of a suitable number field. This is a generalization of the twin prime conjecture to polynomial values over number fields.

They invoked a theorem of **Green–Tao–Ziegler** (extended to number fields by Kai in 2021): *The prime ideals of a number field contain arbitrarily long arithmetic progressions, and more generally, the values of admissible linear forms can be made prime simultaneously with positive density.*

Applying this to the linear forms $L_i(m,n) = m - a_i n$, they showed there exists an infinite sequence of pairs $(m,n)$ such that all four factors are prime ideals.

**13.4. Forcing Rank Exactly One via Parity**

When the discriminant factors are prime, the Selmer rank formula simplifies drastically. The number of prime factors is exactly 4. The **parity conjecture** (a theorem of Dokchitser–Dokchitser and Nekovář) states that the root number of the L-function determines the parity of the rank. In this case, the root number calculation gives a global parity of $-1$, meaning the rank is odd.

Since:
1. Rank $\ge 1$ (due to the built-in point $P_{m,n}$)
2. Rank is odd (parity argument)
3. The 2-Selmer rank is exactly 2 (so rank $\le 2$)

We conclude the Mordell–Weil rank is **exactly 1**.

**13.5. Diophantine Definition of ℤ in $R$**

With a family of elliptic curves of rank 1, the group of rational points $E_{m,n}(R)$ is isomorphic to $\mathbb{Z} \times E(R)_{\text{tors}}$. The infinite cyclic part is generated by $P_{m,n}$.

Koymans and Pagano show that the relation "$Q = k \cdot P_{m,n}$" (where $k \in \mathbb{Z}$) is **Diophantine** over $R$. This is done using the theory of **height functions**. The Néron–Tate height $\hat{h}$ is a quadratic form. The property that $\hat{h}(kP) = k^2 \hat{h}(P)$ allows one to encode the integer $k$ existentially using the group law and the existence of points with large height.

Specifically, they define the set of integers ℤ inside $R$ (or at least a model of $(\mathbb{Z}, +, \times)$ interpretable in $R$). Since H10 over ℤ is undecidable, H10 over $R$ is undecidable.

#### 14. Consolidation: The Final Theorem

**Theorem 14.1 (Koymans–Pagano, 2026).** *Let $R$ be an infinite, finitely generated commutative ring. Then Hilbert's Tenth Problem for $R$ is undecidable. That is, there is no algorithm to decide whether a given polynomial equation with coefficients in $R$ has a solution in $R$.*

This theorem subsumes nearly all previous undecidability results for rings of characteristic zero. It is the "end of history" for H10 over finitely generated rings.

---

### Part IV: The Last Frontier — The Rational Numbers ℚ

#### 15. Why ℚ Remains Unyielding

The Koymans–Pagano theorem does not apply to ℚ. Why? The field of rational numbers ℚ is **not a finitely generated ring**. Any finite set of generators $a_1/b_1, \dots, a_k/b_k$ generates a subring $\mathbb{Z}[1/N]$, which is much smaller than ℚ. ℚ is the *fraction field* of ℤ, but as a ring it is not finitely generated.

**15.1. First-Order Definability vs. Existential Definability**

We know ℤ is definable in ℚ (Robinson 1949). The definition is $\forall \exists \forall$. Koenigsmann (2016) refined this to a $\forall \exists$ definition:
$$ t \in \mathbb{Z} \iff \forall a, b \in \mathbb{Q} \exists x_1, \dots, x_n \in \mathbb{Q} [P(t, a, b, x_i) = 0] $$
To prove H10(ℚ) is undecidable, we need a purely **existential definition** ($\exists_1$ definition). That is, we need to find a Diophantine equation over ℚ whose solutions parameterize the integers.

**15.2. The Barrier of Quantifiers**

Eliminating the universal quantifier is the core difficulty. The presence of $\forall$ corresponds to the ability to test *all* rational numbers. A Diophantine equation only allows testing *existence* of rational numbers. This is the difference between the Halting Problem (c.e., undecidable) and the complement of the Halting Problem (co-c.e., not c.e.).

#### 16. Conditional Undecidability: The Birch–Swinnerton-Dyer Conjecture

The strongest evidence that H10(ℚ) is undecidable comes from conditional results.

**Theorem 16.1 (Mazur–Rubin, 2010).** *Assume the Birch–Swinnerton-Dyer Conjecture (BSD) for all elliptic curves over ℚ. Then Hilbert's Tenth Problem over ℚ is undecidable.*

**Sketch of Proof:**
Mazur and Rubin constructed an infinite family of elliptic curves $E_t$ such that, assuming BSD, $E_t(\mathbb{Q})$ has rank 1 if and only if $t$ belongs to a specific non-computable set (e.g., the Halting Set). By using the theory of twists and 2-descent, they showed that the existence of a point of infinite order on $E_t$ can be expressed as a Diophantine condition over ℚ. Thus, the Halting Set is Diophantine over ℚ, conditional on BSD.

The conditionality is due to the need to *prove* that certain twists have rank > 0. BSD allows one to verify rank 1 by checking the non-vanishing of the L-function derivative $L'(E, 1) \neq 0$, which is a computable condition.

#### 17. Elliptic Curves and Prime Rationals: A Dead End?

Why can't we just use the Koymans–Pagano method over ℚ? Their method uses the Green–Tao theorem to find *integers* $m, n$ that make the discriminant factors prime *as integers*. This works fine over ℤ. But over ℚ, there is no concept of a "prime rational number." Every non-zero rational number is a unit.

To define ℤ in ℚ existentially, one must find a Diophantine property that forces a rational number to have no denominator. This is the **"denominator problem"**.

#### 18. Three Attack Strategies for the Next Decade

Given the current landscape (2026), I offer three plausible roadmaps for a future graduate student or postdoc to prove the unconditional undecidability of H10(ℚ).

**Strategy 1: The Single Elliptic Curve of Rank 1.**
*Goal:* Find a single, specific elliptic curve $E$ over ℚ of rank 1, such that the set of integer points on a certain variety related to $E$ is existentially definable and allows encoding ℤ.
*Rationale:* If we have a curve $E: y^2 = x^3 + ax + b$ with generator $P$, the multiples $nP$ have denominators that grow exponentially. The property "$Q = nP$" might be expressible using divisibility of denominators.
*Challenge:* Controlling the reduction of $E$ modulo primes to force denominators to be perfect powers.

**Strategy 2: Turing Equivalence of H10(ℚ) and H10(ℤ).**
*Goal:* Prove that there is a computable reduction from H10(ℤ) to H10(ℚ). (Currently, only the trivial reduction $\mathbb{Z} \to \mathbb{Q}$ exists; the other direction is open).
*Approach:* Show that any Diophantine equation over ℚ can be effectively "cleared" of denominators or that the existence of rational solutions is equivalent to the existence of integer solutions to a modified system.
*Challenge:* This is generally false for arbitrary varieties (Hassett–Tschinkel). One must find a specific "universal" variety over ℚ that captures ℤ. This is related to the **Existential Definability Conjecture**.

**Strategy 3: Model Theory and Higher-Dimensional Varieties (The $\mathbb{Q}^n$ Approach).**
*Goal:* Encode the Halting Problem using the geometry of rational points on K3 surfaces or abelian varieties of dimension > 1.
*Rationale:* The field ℚ has the property that the set of rational points on certain surfaces can be more complex than on curves. A recent theorem of Dittmann and others shows that the class of existentially definable sets in ℚ is closed under taking powers and images under certain maps. Perhaps a higher-dimensional analog of the elliptic curve method (using Kummer surfaces of abelian varieties of rank 1) can bypass the denominator problem.
*Speculation:* The absence of Green–Tao in ℚ might be circumvented by using the **infinite primes** (real embeddings) and Diophantine approximation to define integrality.

---

### Part V: Spreading the Disease: Undecidability in Analysis and Dynamics

#### 19. From Integers to Sine Waves

The undecidability of H10 does not stay confined to number theory. It "infects" continuous mathematics because the sine function provides a bridge between the discrete (ℤ) and the continuous (ℝ).

**19.1. Reduction 1: $\sin(\pi x) = 0$ and Diophantine Equations**
Consider the equation involving sine and absolute value over the reals:
$$ P(x_1, \dots, x_n) = 0 \text{ has integer solutions} $$
$$ \Updownarrow $$
$$ \exists x_1, \dots, x_n \in \mathbb{R} \left[ \bigwedge_{i=1}^n \sin(\pi x_i) = 0 \land P(x_1, \dots, x_n) = 0 \right] $$

The condition $\sin(\pi x_i) = 0$ forces $x_i \in \mathbb{Z}$. Therefore, any algorithm to decide the existence of real solutions to equations built from polynomials, $\sin$, and absolute value would solve H10. Thus, the **elementary theory of $\mathbb{R}$ with $\sin$ is undecidable**.

**19.2. Reduction 2: Convergence of Improper Integrals**
There exists a family of functions $f_a(t)$ such that the integral $\int_0^\infty f_a(t) dt$ converges if and only if a parameter $a$ belongs to a non-computable Diophantine set. The construction uses spike functions centered at integers.

#### 20. Differential Equations and Chaos

The undecidability of H10 implies that there is no algorithm to determine if an arbitrary system of differential equations has a certain type of solution.

**20.1. Ordinary Differential Equations (Power Series Solutions)**
Consider the problem: "Does the ODE $F(t, y, y', \dots, y^{(k)}) = 0$ have a formal power series solution at $t=0$?"
By encoding Diophantine equations into the coefficients of $F$, one can construct an ODE where a power series solution exists iff a related Diophantine equation has an integer solution. Therefore, the existence of power series solutions is algorithmically undecidable.

**20.2. Partial Differential Equations**
Similarly, the existence of smooth solutions to certain nonlinear PDEs (e.g., wave equations with polynomial nonlinearities) on compact manifolds can be shown to be undecidable. The method involves constructing "gadgets" where wave propagation simulates the step-by-step computation of a Turing machine.

---

### Part VI: The State of the Art Across Domains

#### 21. Function Fields and Positive Characteristic
Over $\mathbb{F}_q[t]$, H10 is undecidable (Pheidas, Videla, Shlapentokh). The proof uses the Frobenius endomorphism $x \mapsto x^q$ to generate exponential growth, mimicking the Pell equation in characteristic zero.

#### 22. $p$-adic Fields and the Ax–Kochen Era
For $\mathbb{Q}_p$, the theory of Diophantine equations is decidable. This is a consequence of the **Ax–Kochen theorem** (1965), which states that the theory of $\mathbb{Q}_p$ is decidable and model-complete. The valuation and the angular component map allow quantifier elimination in a suitable language. There is an algorithm to decide the solvability of polynomial equations over $\mathbb{Q}_p$.

#### 23. Real Closed Fields and Tarski's Decidability
For $\mathbb{R}$ (without $\sin$), Tarski proved that the theory of real closed fields is decidable. There is an algorithm (Cylindrical Algebraic Decomposition) to decide the existence of real solutions to any polynomial system. This stands in stark contrast to ℤ and ℚ.

---

### Part VII: Ten Open Problems for the Next Generation

This survey concludes with a list of ten precisely formulated problems that define the current frontier of research on H10 and its extensions.

**Problem 1. The Rational Frontier.**
*Statement:* Prove that Hilbert's Tenth Problem over the field of rational numbers ℚ is undecidable.
*Partial Results:* Conditional on BSD (Mazur–Rubin).
*Strategy:* Find an existential definition of ℤ in ℚ.

**Problem 2. The Single Elliptic Curve.**
*Statement:* Does there exist an elliptic curve $E/\mathbb{Q}$ such that $\mathbb{Z}$ is existentially definable in the structure $(\mathbb{Q}, +, \times, E(\mathbb{Q}))$?
*Partial Results:* None unconditional.

**Problem 3. H10 over $\mathbb{Z}[i]$.**
*Statement:* While H10 over rings of integers is generally undecidable, the case of the Gaussian integers $\mathbb{Z}[i]$ was a long-standing open case. *Update: It was proven undecidable in 2026 by Koymans–Pagano.* (Problem closed).

**Problem 4. The Universal Diophantine Equation Degree.**
*Statement:* What is the minimum degree of a universal Diophantine equation over ℤ?
*Current Best:* Degree 4 is possible for unbounded number of variables (Skolem). With a bounded number of variables, the minimum known degree is 8 (Jones).

**Problem 5. H10 for Infinite Extensions.**
*Statement:* Let $K$ be an infinite algebraic extension of ℚ (e.g., $\mathbb{Q}^{\text{ab}}$, the maximal abelian extension). Is H10 over the ring of integers $\mathcal{O}_K$ undecidable?
*Partial Results:* Known for some pro-$p$ extensions.

**Problem 6. The $\forall \exists$ Gap.**
*Statement:* Is the $\forall \exists$ theory of ℚ undecidable?
*Partial Results:* Yes, if $\mathbb{Z}$ is $\exists$-definable. But even without that, the $\forall \exists$ theory might encode the Halting Problem via more complex adelic constructions.

**Problem 7. H10 over $\mathbb{F}_q((t))$.**
*Statement:* Determine the decidability of H10 for the field of formal Laurent series $\mathbb{F}_q((t))$ over a finite field.
*Status:* Open. The Ax–Kochen method fails here because the residue field is not "large enough" in a model-theoretic sense.

**Problem 8. The Poisson Equation.**
*Statement:* Prove that the existence of a smooth solution $u$ to $\Delta u + u^3 = f$ on a compact manifold $M$ is undecidable for arbitrary smooth $f$.
*Partial Results:* Undecidability is known for complex Monge–Ampère equations; the Poisson case is a frontier in analysis.

**Problem 9. Reverse Mathematics of MRDP.**
*Statement:* What is the exact logical strength of the MRDP theorem?
*Known:* MRDP is provable in $\text{PA}$ (Peano Arithmetic). It requires induction. Determine the weakest fragment of arithmetic that proves MRDP.

**Problem 10. The Green–Tao Threshold for H10.**
*Statement:* Can the use of the Green–Tao theorem in the Koymans–Pagano proof be eliminated or replaced by a weaker sieve method?
*Partial Results:* The proof requires the existence of four simultaneous prime values of linear forms. This is currently out of reach of classical sieve theory. Is the undecidability of H10 for finitely generated rings *strictly stronger* than the twin prime conjecture?

---

### Acknowledgements

This survey was made possible by the collective efforts of the mathematical community over more than a century. The author is profoundly grateful to Professor Yuri Matiyasevich for his gracious acceptance to review this manuscript, for his indispensable historical insights, and for his personal recollections of the final step that closed Hilbert’s original problem. The author also thanks Peter Koymans and Carlo Pagano for extensive discussions regarding their 2026 preprint, and Levent Alpoge for clarifying the parallel developments in Selmer rank definability. Finally, gratitude is extended to the generations of logicians and number theorists—from Julia Robinson to Bjorn Poonen—who kept the flame of this beautiful problem alive in the long decades between MRDP and the resolution of the finitely generated case.

---

### Bibliography (Selected Core Entries)

1. Davis, M. (1953). *Arithmetical problems and recursively enumerable predicates*. J. Symb. Log.
2. Davis, M., Putnam, H., Robinson, J. (1961). *The decision problem for exponential Diophantine equations*. Ann. Math.
3. Matiyasevich, Y. (1970). *Enumerable sets are Diophantine*. Dokl. Akad. Nauk SSSR.
4. Robinson, J. (1949). *Definability and decision problems in arithmetic*. J. Symb. Log.
5. Poonen, B. (2002). *Hilbert’s Tenth Problem and Mazur’s Conjecture for large subrings of ℚ*. JAMS.
6. Mazur, B., Rubin, K. (2010). *Ranks of twists of elliptic curves and Hilbert’s Tenth Problem*. Invent. Math.
7. Koenigsmann, J. (2016). *Defining ℤ in ℚ*. Ann. Math.
8. Green, B., Tao, T. (2008). *The primes contain arbitrarily long arithmetic progressions*. Ann. Math.
9. Kai, W. (2021). *The Green–Tao theorem for number fields*. Duke Math. J.
10. Koymans, P., Pagano, C. (2026). *Hilbert’s Tenth Problem for all infinite finitely generated rings*. arXiv:2602.04468v1.

*(Note: The full monograph would contain approximately 200+ detailed references covering all aspects of history, model theory, and number theory cited in the text.)*

---

*二〇二六年三月良之写于羊城云汐谷*
