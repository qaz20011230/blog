---
title: "Zeros Are Not Free: The Riemann Hypothesis over Function Fields, or a Geometric Fugue"
date: '2026-06-27'
category: "Mathematics & Logic"
tags:
  - Riemann Hypothesis
  - function fields
  - finite fields
  - algebraic curves
  - Hasse
  - Weil
  - Grothendieck
  - Deligne
  - étale cohomology
  - Frobenius
description: >
  The Riemann Hypothesis over function fields was proved by Weil in 1948. This article retraces three proofs — Hasse (elliptic curves, 1933), Weil (Jacobians and surface intersection, 1948), and Grothendieck–Deligne (étale cohomology, 1974) — showing they share a single logical skeleton: the Frobenius operator turns zeros into eigenvalues, duality pairs them, and a positivity structure pins them to the critical circle. It then asks: why can't this machinery be transferred to the integers? The answer lies in three structural absences — no global Frobenius, no finite-dimensional cohomology, no base field.
---

## Introduction: Two Worlds, One Conjecture

In 1859, Bernhard Riemann, in his only paper on number theory, proposed the conjecture that transformed mathematics: all non-trivial zeros of the $\zeta$ function lie on the critical line $\operatorname{Re}(s) = 1/2$. A century and a half later, this conjecture still confronts the world's finest minds. It stands like an undefended city — none can breach it, none can bypass it.

Yet, in another seemingly distant mathematical world, a proposition spiritually identical to the Riemann Hypothesis was completely proved by André Weil in 1948. This is the world of **algebraic curves over finite fields** — the world of function fields. Here, the original infinite sequence of prime numbers is replaced by points on a finite field; the transcendental Riemann $\zeta$ function collapses into a rational function; the inscrutable distribution of zeros becomes the roots of a finite polynomial. It is in this compressed, finite model that the Riemann Hypothesis first reveals its true geometric face.

This article guides the reader through this proof trajectory. The goal is not merely to know "it was proved," but to see clearly **how it was proved** — to see what mechanism pins zeros to the critical line exactly. After reading, we will find that the three historical proofs — Hasse, Weil, Grothendieck–Deligne — are like three voices of a fugue: a single theme, repeatedly sounded in ever grander structures. And this theme can be condensed into a single sentence:

> **Zeros are not free. A positivity structure locks them onto the critical line.**

Once this theme is clear, we also understand why the Riemann Hypothesis over integers remains unassailable: not for lack of a clever inference, but because the geometric structure that carries that positivity does not yet exist over the integers.

---

## I. Setting the Stage: From Integers to Curves

### 1.1 The Root of the Analogy

One of the oldest observations in number theory is the persistent similarity between integers and polynomials. An integer factors uniquely into primes; a polynomial with coefficients in a field factors uniquely into irreducible polynomials. Integer addition mirrors polynomial addition; the size of an integer — its absolute value $|n|$ — mirrors the "size" of a polynomial — its degree. This river of analogy has flowed beneath the riverbed of mathematics for over two millennia, and laying it out fully before us is the starting point for understanding all divergence and unity.

The ring of integers $\mathbb{Z}$ corresponds to the polynomial ring $\mathbb{F}_q[t]$; the field of rational numbers $\mathbb{Q}$ corresponds to the rational function field $\mathbb{F}_q(t)$; a prime $p$ corresponds to a monic irreducible polynomial, i.e., a closed point $P$ on the curve; $|n|$ corresponds to the norm $q^{\deg P}$; $\operatorname{Spec}\mathbb{Z}$ — the geometric avatar of the integers — corresponds to the curve $C$ itself; the Riemann $\zeta$ function
$$\zeta(s)=\sum_{n=1}^\infty\frac{1}{n^s}=\prod_{p}\frac{1}{1-p^{-s}}$$
corresponds to the curve's $\zeta$ function
$$Z_C(u)=\prod_{P}\frac{1}{1-u^{\deg P}};$$
and the archimedean prime $\infty$, suspended alone beyond all finite primes over the integers, finds solid grounding on the function field side — one or more points at infinity on the curve.

But this seemingly perfect dictionary conceals a fatal rupture at its foundation. A curve $C$ over a finite field is a geometric object defined **above** a base field $\mathbb{F}_q$ — there is a layer beneath it. $\operatorname{Spec}\mathbb{Z}$ is the absolute bottom; beneath it lies nothing — no more fundamental field to rely upon. This single asymmetry is the waterfall of the entire analogy: on one side, the conjecture was proved in 1948; on the other, it still glimmers silently in the night sky. The entire burden of this article rests here.

The function field is this analogy taken to its limit. Take a smooth, projective, geometrically irreducible curve $C$ over a finite field $\mathbb{F}_q$; its function field $K = \mathbb{F}_q(C)$ is a transcendence degree 1 extension; the "primes" (places) of $K$ correspond to closed points $P$ on $C$, and the "norm" of a closed point is precisely $q^{\deg P}$.

### 1.2 The Miracle of Collapse

Set $u = q^{-s}$ and let $N_k = \#C(\mathbb{F}_{q^k})$ be the number of rational points of the curve over the degree-$k$ extension. Reorganizing closed points by degree, the Euler product collapses through a beautiful combinatorial calculation into a generating function:
$$Z_C(u) = \exp\left(\sum_{k=1}^\infty N_k \frac{u^k}{k}\right).$$

Why is the integer $\zeta(s)$ a transcendental function with infinitely many zeros, while the function-field $Z_C(u)$ is rational? The answer again lies in the difference of "bases." The residue field of every closed point is a power of $q$, so the infinite product becomes a power series in $u$; and by the finiteness of the curve's point counts, this power series converges to a rational function.

The cleanest example is the projective line $\mathbb{P}^1$. It has exactly $q^k+1$ points over $\mathbb{F}_{q^k}$, hence
$$Z_{\mathbb{P}^1}(u) = \exp\left(\sum_{k \ge 1} (q^k+1) \frac{u^k}{k}\right) = \exp\left(-\log(1-qu) - \log(1-u)\right) = \frac{1}{(1-u)(1-qu)}.$$
The numerator is $1$, genus $g = 0$. The machine idles in the simplest case, but has already laid its structure bare: the denominator $(1-u)(1-qu)$ corresponds to $H^0$ and $H^2$, while all interesting information will reside in the numerator.

In general, Weil proved
$$Z_C(u) = \frac{P(u)}{(1-u)(1-qu)}, \quad P(u) \in \mathbb{Z}[u], \quad \deg P = 2g,$$
where $g$ is the genus of $C$. Everything here becomes finite: there are only $2g$ zeros, all inside $P(u)$. These $2g$ zeros are the entire object of the function-field Riemann Hypothesis.

### 1.3 Weil's Three Movement Theorem

Write $P(u) = \prod_{i=1}^{2g}(1 - \alpha_i u)$. We adopt a convention throughout: the $\alpha_i$ are the **Frobenius eigenvalues**; the actual roots of $P(u)$ are $\alpha_i^{-1}$. Weil's 1948 theorem consists of three statements:

**First Movement: Rationality.** $Z_C(u)$ is a rational function.

**Second Movement: Functional Equation.** $P(u)$ satisfies
$$P(u) = \pm q^g u^{2g} P\!\left(\frac{1}{qu}\right),$$
equivalent to $\zeta_C(s)$ under $s \leftrightarrow 1-s$. It forces the eigenvalues to come in pairs: if $\alpha$ is an eigenvalue, then $q/\alpha$ is too; and $\prod\alpha_i = q^g$.

**Third Movement: Riemann Hypothesis.** Every eigenvalue has absolute value exactly $\sqrt{q}$:
$$|\alpha_i| = \sqrt{q} \quad (i=1,\dots,2g).$$

Translated back to $s$: the root $u = \alpha_i^{-1}$ satisfies $|u| = q^{-1/2}$, hence $\operatorname{Re}(s) = 1/2$. The substitution $u = q^{-s}$ maps the circle $|u| = q^{-1/2}$ onto the critical line $\operatorname{Re}(s) = 1/2$.

A historical correction is needed: rationality and the functional equation were not first proved by Weil. F. K. Schmidt had already obtained both in 1931 from Riemann–Roch; the genus-$1$ Riemann Hypothesis was completed by Hasse in 1933–1936; Weil's true conquest was the third movement for arbitrary genus — the jewel in the crown.

### 1.4 The Origin of the Functional Equation: Riemann–Roch and Serre Duality

Why is the functional equation "nearly free"? Because it is the shadow of duality, and duality already exists at the curve level — no Frobenius is needed.

View $Z_C(u)$ as a sum over all effective divisors. For a divisor $D$, Riemann–Roch asserts
$$\ell(D) - \ell(K-D) = \deg D - g + 1.$$
Serre duality $H^i(C, \mathcal{L}(D)) \cong H^{1-i}(C, \mathcal{L}(K-D))^*$ gives the symmetry exchanging "degree $d$" with "degree $2g-2-d$" — precisely the source of $u \leftrightarrow 1/qu$.

Remember this: **functional equation = Serre duality.** In Grothendieck's language, the same duality will reappear as Poincaré duality. Throughout the fugue, duality is responsible for "pairing the zeros," while positivity is responsible for "pinning that pair to the critical circle."

---

## II. The Minimal Model: Hasse's Elliptic Curves (1933)

Every grand proof has a tiny beginning. For the function-field Riemann Hypothesis, that beginning is $g=1$ — elliptic curves. Hasse's proof, though handling only two zeros, already contains the entire mechanism in its purest form.

### 2.1 Point Counts and Frobenius

Take an elliptic curve $E$ over $\mathbb{F}_q$ with $N_1$ rational points. Define the deviation $a$:
$$N_1 = q+1 - a.$$
The functional equation yields $P(u) = 1 - au + qu^2$; two eigenvalues $\alpha, \bar{\alpha}$ satisfy $\alpha\bar{\alpha} = q$, $\alpha+\bar{\alpha} = a$. The Riemann Hypothesis $|\alpha| = \sqrt{q}$ is equivalent to $|a| \le 2\sqrt{q}$ — the famous **Hasse bound**.

Hasse's key move: view the $q$-power Frobenius $\varphi: (x,y) \mapsto (x^q, y^q)$ as an endomorphism of the curve. $\varphi$ is an $\mathbb{F}_q$-scheme morphism — it fixes every element of the base field, making it a well-defined isogeny of $E$ (defined over $\mathbb{F}_q$) of degree $q$, inseparable. Its most important property: the fixed points of $\varphi$ are exactly the $\mathbb{F}_q$-rational points $E(\mathbb{F}_q)$. Hence
$$N_1 = \deg(\varphi - 1).$$

### 2.2 Endomorphism Ring and Degree

The endomorphisms of $E$ form a ring $\operatorname{End}(E)$ carrying a natural degree function $\deg$. Each $\psi \in \operatorname{End}(E)$ has a dual $\hat{\psi}$ with $\hat{\psi}\psi = [\deg\psi]$, and $\deg$ induces a bilinear form $\langle \psi_1, \psi_2\rangle = \deg(\psi_1+\psi_2) - \deg\psi_1 - \deg\psi_2$ which is **positive definite** on $\operatorname{End}(E) \otimes \mathbb{R}$. Frobenius satisfies the quadratic equation
$$\varphi^2 - [a]\varphi + [q] = 0,$$
with "roots" $\alpha, \bar{\alpha}$. Point count and zeros, threaded together by the very same operator $\varphi$.

### 2.3 Positivity Strikes

For arbitrary integers $m, n$, non-negativity of degree gives:
$$\deg(m\varphi - n[1]) \ge 0.$$
Expanding:
$$q \cdot m^2 - a \cdot mn + 1 \cdot n^2 \ge 0.$$
A binary quadratic form non-negative for all integer $m,n$ has non-positive discriminant:
$$a^2 - 4q \le 0,$$
i.e., $|a| \le 2\sqrt{q}$. QED.

The proof has only three steps: (1) find a geometric object (endomorphism ring) carrying Frobenius; (2) Frobenius satisfies a quadratic equation linking point count and zeros; (3) the ring carries a positive-definite quadratic form (degree), whose discriminant automatically yields $|a| \le 2\sqrt{q}$.

---

## III. Weil's Leap: From Curve to Surface (1948)

### 3.1 The $g>1$ Impasse

Hasse's proof relied heavily on the rich endomorphism ring of elliptic curves. For $g \ge 2$, the endomorphisms of a general curve are only the trivial ones $[n]$ — too small to host the argument. Weil's genius: don't work on the curve; move the stage to a **larger geometric object** where positivity can be found anew.

### 3.2 The Jacobian: Zeros Become Eigenvalues

For a curve $C$ of arbitrary genus $g$, Weil constructed its **Jacobian** $\operatorname{Jac}(C)$ — a $g$-dimensional abelian variety, the "linearization" of the curve. Frobenius induces $\varphi_J$ on $\operatorname{Jac}(C)$, and $P(u)$ is precisely the characteristic polynomial of $\varphi_J$ acting on the $\ell$-adic Tate module $T_\ell$ (a $2g$-dimensional $\mathbb{Q}_\ell$-vector space):
$$P(u) = \det(1 - u\varphi_J \mid T_\ell).$$
The $2g$ numbers $\alpha_i$ are eigenvalues of Frobenius on a $2g$-dimensional space — explaining why we called them "eigenvalues" from the start.

### 3.3 Surfaces and Intersection: The New Home of Positivity

Weil's strategy: consider the surface $S = C \times C$. The graph $\Gamma_{\varphi}$ and the diagonal $\Delta$ intersect on $S$, and
$$N_k = \Gamma_{\varphi^k} \cdot \Delta.$$
These intersection numbers live in the Néron–Severi group — a finitely generated abelian group with a symmetric bilinear form given by intersection pairing. This form is **negative definite** on the subspace spanned by hyperplane sections: the Hodge Index Theorem (Weil himself established its positive characteristic version). Applying negative definiteness to linear combinations of $\Gamma_{\varphi}$ and $\Delta$, Cauchy–Schwarz again forces $|\alpha_i| = \sqrt{q}$.

The fugue theme resounds: Hasse used "degree non-negative"; Weil used "Hodge index of surface intersection." The source of positivity is upgraded; the logical skeleton remains identical.

### 3.4 Cost and Legacy

To make the Hodge Index Theorem rigorous in positive characteristic, Weil had to rebuild the foundations of algebraic geometry from scratch — his 1946 *Foundations of Algebraic Geometry* was written precisely for this proof. One theorem forced an entire new mathematics into existence — the most exhilarating pattern in mathematical history.

---

## IV. The Ultimate Form: Grothendieck and Étale Cohomology (1960–1974)

### 4.1 The Panorama of the Weil Conjectures

In 1949, Weil generalized the function-field Riemann Hypothesis into four conjectures for algebraic varieties of any dimension:

1. **Rationality** of the $\zeta$ function;
2. **Functional equation**;
3. **Riemann Hypothesis**: absolute values of zeros and poles are half-integer powers of $q$;
4. **Betti number analogy**: degrees match topological Betti numbers of a characteristic-zero lift.

### 4.2 Étale Cohomology: The Correct Language

Grothendieck, with Artin, Verdier, and others, built **étale cohomology** from the ground up. In this language, Frobenius $\varphi$ acts naturally on each $H^i$, and the Lefschetz trace formula gives
$$N_k = \sum_{i=0}^{2d} (-1)^i \operatorname{tr}(\varphi^k \mid H^i).$$
The $\zeta$ function becomes
$$Z_X(u) = \prod_{i=0}^{2d} \det(1 - u\varphi \mid H^i)^{(-1)^{i+1}}.$$
Zeros become eigenvalues of a linear operator on cohomology — no more detour through surfaces and intersections.

### 4.3 Weights and Purity: The True Statement of the Riemann Hypothesis

Deligne distilled the third conjecture into a single unifying principle — **purity**: $H^i$ is pure of weight $i$, meaning every eigenvalue of $\varphi$ on $H^i$ satisfies
$$|\alpha| = q^{i/2}.$$
For the $H^1$ of a curve (weight $1$), this is exactly $|\alpha| = \sqrt{q}$.

And the functional equation is now an immediate corollary of Poincaré duality: the perfect pairing
$$H^i \times H^{2d-i} \to H^{2d} \cong \mathbb{Q}_\ell(-d)$$
locks $\alpha$ on $H^i$ together with $q^d/\alpha$ on $H^{2d-i}$.

**Duality pairs; purity pins.** The theme sounds a third time, in its final form.

### 4.4 Deligne's Final Blow

The difficulty: the full axioms of étale cohomology only yield the functional equation (pairing $\alpha \leftrightarrow q^d/\alpha$) but cannot constrain the modulus of an individual eigenvalue. An extra input of positivity is needed.

Deligne's breakthrough came from an unexpected direction — the Rankin squaring trick from automorphic form theory. Assume some eigenvalue $|\alpha| > \sqrt{q}$; take high tensor powers to amplify the contribution, construct an auxiliary $L$-function (in the spirit of Rankin–Selberg convolution); its coefficients are non-negative due to a cohomological pairing sign, forcing it to have no poles in a certain region; but if $|\alpha|$ is too large, an Euler factor creates a pole — contradiction. Hence $|\alpha| \le \sqrt{q}$. By the symmetry $\alpha \leftrightarrow q/\alpha$, all $|\alpha_i| = \sqrt{q}$.

The kernel of this final blow is identical in structure to Hasse and Weil: "a positive / non-negative pairing + power amplification = modulus pinning."

---

## V. Anatomy of the Proof

Three components shared by all three proofs:

**Component I: Frobenius Operator.** Hasse: $(x,y)\mapsto(x^q,y^q)$; Weil: lifted to Jacobian; étale cohomology: intrinsic arithmetic Frobenius. It rules everything — its fixed points yield counts, its eigenvalues yield zeros.

**Component II: Duality and Functional Equation.** Riemann–Roch / Serre duality → intersection pairing → Poincaré duality. It pairs the zeros but cannot pin the modulus alone.

**Component III: Positivity.** Degree quadratic form → Hodge Index on surfaces → cohomological pairing sign. This is the true engine. Without positivity, zeros *could* lie anywhere; with positivity, they *must* lie on the critical circle.

---

## VI. The Rupture: Why This Cannot Be Transferred to $\mathbb{Z}$

Three structural absences block the transfer:

### 6.1 No Global Frobenius

Over integers, each prime $p$ has its own *local* Frobenius (an element of the Galois group), but they are scattered, forming no unified operator on "cohomology of the integer curve." The Euler product $\prod(1-p^{-s})^{-1}$ resists analysis precisely because it is assembled from infinitely many independent $p$-factors with no single $\varphi$ binding them together.

### 6.2 No Finite-Dimensional Cohomology

Over function fields, $H^1$ is finite-dimensional ($2g$), Frobenius is a finite matrix, and positivity is an inequality on a finite-dimensional quadratic form. Over integers, the Riemann $\zeta$ has **infinitely many** zeros; any cohomology space carrying them must be infinite-dimensional, where positivity requires spectral definitions and Cauchy–Schwarz cannot be applied directly.

### 6.3 No Base

The deepest luxury: the curve $C$ exists *over* a base field $\mathbb{F}_q$. This is what allows $C \times C$, intersection theory, Poincaré duality. $\operatorname{Spec}\mathbb{Z}$ has nothing beneath it. The entire **$\mathbb{F}_1$ program** is motivated by the desire to manufacture an imaginary base $\mathbb{F}_1$ so that $\operatorname{Spec}\mathbb{Z}$ becomes "a curve over $\mathbb{F}_1$."

---

## Coda: Two Futures of the Riemann Hypothesis

The history of the function-field Riemann Hypothesis leaves us with a profound lesson:

> **The proof of a great conjecture often consists not in finding a clever path of reasoning, but in discovering an entirely new structure, one that makes the conjecture an inevitable consequence of that structure.**

Hasse proved $|a| \le 2\sqrt{q}$ not by refining analytic estimates — he discovered a positive-definite quadratic form on the endomorphism ring. Weil did not polish estimates — he built the entire foundations of abstract algebraic geometry because the old foundations could not contain his proof. Grothendieck and Deligne did not patch Weil's argument — they invented étale cohomology, a mathematical universe that did not previously exist.

The Riemann Hypothesis over integers is likely the same. It is not conquerable by any existing technique, because the "bridge of positivity" it requires has yet to be built. Every attempt to prove it will ultimately find itself constructing not a chain of reasoning, but a new mathematical world — one that simultaneously supplies $\operatorname{Spec}\mathbb{Z}$ with a base, a Frobenius, and a cohomology, and one that must, upon restriction to function fields, reproduce the Hasse and Weil versions (otherwise it is certainly wrong).

Perhaps this is why the Riemann Hypothesis is so captivating. It is not merely a proposition of number theory — it is a signpost toward the future of mathematics. Its proof will necessarily be accompanied by a refounding of mathematical foundations no less revolutionary than the one that function fields witnessed.

---

**Acknowledgments**: This article benefited from extended discussions with an anonymous interlocutor, whose insights into the structural differences between the function-field and integer Riemann Hypotheses directly shaped its central argument. The advancement of mathematics is often driven by such questioners — those unsatisfied with merely "it was proved," who must ask "why was it provable?", "why is the other not yet?", and the hardest question of all: "what must I build, with my own hands, to make it provable?" This article is dedicated to that spirit of inquiry.
