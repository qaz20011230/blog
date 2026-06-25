---
title: "Hilbert's Eighth Problem: A Comprehensive Review of the Riemann Hypothesis"
date: '2026-06-26'
category: "Mathematics & Logic"
tags:
  - Riemann Hypothesis
  - Hilbert problems
  - analytic number theory
  - Riemann zeta function
  - L-functions
  - prime number theorem
  - Landau-Siegel conjecture
  - zero distribution
description: >
  The most comprehensive and systematic review of Hilbert's Eighth Problem—the Riemann Hypothesis—in the Chinese-speaking world. From Riemann's 1859 original paper through analytic continuation, explicit formulas, the prime number theorem, zero counting, critical line theorems, zero density estimates, L-function theory, Landau-Siegel zeros, to the cutting-edge Selberg positive proportion theorem and open conjectures. A faithful, expressive, and elegant account of the deepest dialogue between prime distribution and complex analysis.
---

**Abstract:** Hilbert's Eighth Problem—the Riemann Hypothesis—stands as the most profound mathematical enigma confronting human reason. It asserts that all non-trivial zeros of the Riemann zeta function lie on the critical line $\Re(s)=1/2$. This seemingly simple geometric statement is in fact the ultimate expression of the law governing prime distribution. If true, primes are distributed with near-perfect randomness; if false, it means the primes conceal deep structures we have not yet understood. Based on TravorLZH's thirty-article series *Understanding the Riemann Hypothesis*, this review systematically traces the complete intellectual landscape from Riemann's groundbreaking 1859 paper to the frontiers of contemporary analytic number theory.

---

## I. The Birth of a Conjecture

August 8, 1900. The Second International Congress of Mathematicians, Paris. David Hilbert, thirty-eight years old, stepped onto the podium and presented twenty-three problems to the world's mathematicians. These problems, like searchlights cast into the future, illuminated the entire course of twentieth-century mathematics. The eighth among them—the Riemann Hypothesis—remains unsolved, suspended in the mathematical firmament like a star that never sets.

The seed of the Riemann Hypothesis had been planted forty-one years earlier.

In 1859, the Berlin Academy. In recognition of the profound contributions of Eduard Kummer, Karl Weierstrass, and Leopold Kronecker to number theory, Bernhard Riemann, a thirty-two-year-old lecturer at the University of Bonn, was elected as a corresponding member. By tradition, he was expected to submit a paper demonstrating his research abilities. His chosen topic appeared unremarkable: *On the Number of Primes Less Than a Given Magnitude* (*Über die Anzahl der Primzahlen unter einer gegebenen Größe*).

This eight-page manuscript irrevocably transformed analytic number theory.

Riemann's starting point was a remarkable identity discovered by Euler in 1737:

$$\zeta(s)=\sum_{n=1}^\infty\frac{1}{n^s}=\prod_p\frac{1}{1-p^{-s}},\quad\Re(s)>1$$

The Euler product is like a hidden door: opening it, we step from the world of positive integers directly into the world of primes. Through this door, primes are no longer a heap of discrete, patternless numbers—they are the most secret threads woven into the multiplicative fabric of all positive integers.

But Riemann did not stop there. He did two unprecedented things: first, he analytically continued $\zeta(s)$ to the entire complex plane (except for a simple pole at $s=1$); second, he discovered an exact correspondence between the prime counting function $\pi(x)$ and the non-trivial zeros of $\zeta(s)$. The second discovery alone would have earned him immortality.


## II. The Mellin Transform and Euler Product: A Bridge from the Discrete to the Continuous

To grasp Riemann's insight, one must first understand a mathematical bridge—the Mellin transform. Writing down

$$\Gamma(s)=\int_0^\infty x^{s-1}e^{-x}dx$$

is but the integral definition of the Gamma function. Yet Riemann's paper hinted at a deeper connection: if we set

$$g(x)=\sum_{n=1}^\infty a_n e^{-nx}$$

then

$$\Gamma(s)\sum_{n=1}^\infty\frac{a_n}{n^s}=\int_0^\infty x^{s-1}g(x)dx$$

In other words, multiplying any Dirichlet series by the Gamma function converts it into an integral transform. This is the essence of the Mellin transform: it transforms discrete series summation into continuous integration, opening the passage from number theory to complex analysis.

Following this path, Riemann defined the weighted prime counting function

$$\Pi_0(x)=\sum_{p^n\le x}\frac{1}{n}$$

Through the combination of the Mellin transform and the Euler product, he obtained a landmark relation:

$$\frac{\ln\zeta(s)}{s}=\int_0^\infty\Pi_0(x)x^{-s-1}dx$$

This deceptively tranquil equation carries a staggering implication: the analytic properties of $\zeta(s)$—in particular, the locations of its zeros—directly determine the asymptotic behavior of $\Pi_0(x)$ as $x\to\infty$, and hence the distribution of primes in the natural numbers.

By the Möbius inversion formula, $\Pi_0(x)$ can be interconverted with the standard prime counting function $\pi(x)$:

$$\pi(x)=\sum_{n\ge 1}\frac{\mu(n)}{n}\Pi_0(x^{1/n})$$

where $\mu(n)$ is the Möbius function, itself defined through the reciprocal series of $\zeta(s)$: $\zeta(s)^{-1}=\sum_{n=1}^\infty\mu(n)n^{-s}$. The entire problem of prime counting is thus folded entirely into the analytic properties of $\zeta(s)$.


## III. Analytic Continuation, Functional Equation, and Zero Symmetries

Riemann's second revolutionary contribution was to continue $\zeta(s)$—initially defined only in the half-plane $\Re(s)>1$—to a meromorphic function on the entire complex plane. His instrument remains astonishing to this day: the Jacobi theta function $\psi(x)=\sum_{n=1}^\infty e^{-n^2\pi x}$ satisfies a functional equation derived from the Poisson summation formula:

$$\psi(x)=\frac{1}{\sqrt{x}}\psi\left(\frac{1}{x}\right)+\frac{1}{2\sqrt{x}}-\frac{1}{2}$$

Using this identity, Riemann deformed the contour of the integral representation of $\zeta(s)$ to obtain the analytic continuation to the whole plane, along with the celebrated functional equation:

$$\zeta(s)=2^s\pi^{s-1}\sin\left(\frac{\pi s}{2}\right)\Gamma(1-s)\zeta(1-s)$$

This equation reveals the symmetry of $\zeta(s)$ under the transformation $s\mapsto 1-s$. Its implications for zero distribution are decisive.

First, from the zeros of $\sin(\pi s/2)$, all negative even integers $s=-2,-4,-6,\dots$ are zeros of $\zeta(s)$—these are the **trivial zeros**, fully within Riemann's grasp.

Second, the functional equation implies the existence of another class of zeros—the **non-trivial zeros**—which are distributed symmetrically about the line $\Re(s)=1/2$, and because $\zeta(\overline{s})=\overline{\zeta(s)}$, also symmetric about the real axis. That is, non-trivial zeros appear in **quadruplets**: if $\beta+i\gamma$ is a zero (with $\beta<1/2$), then $1-\beta+i\gamma$, $\beta-i\gamma$, and $1-\beta-i\gamma$ are also zeros.

Riemann introduced the auxiliary function

$$\xi(s)=\frac{1}{2}s(s-1)\pi^{-s/2}\Gamma\left(\frac{s}{2}\right)\zeta(s)$$

which satisfies $\xi(s)=\xi(1-s)$ and $\xi(\overline{s})=\overline{\xi(s)}$, establishing a one-to-one correspondence between non-trivial zeros and zeros of $\Xi(t)=\xi(1/2+it)$. Since $\Xi(t)$ is an even function of a real variable, real-analytic tools become available for studying the zero distribution.

In his manuscript, Riemann wrote: *"It is very probable that all non-trivial zeros satisfy $\Re(s)=1/2$."* Having computed the zeros at a few low ordinates, he formulated this famous conjecture—what we now call the **Riemann Hypothesis (RH)**.


## IV. Riemann's Explicit Formula: The Score of Prime Music

Riemann's third and most magnificent contribution was an exact expression for the prime counting function—what posterity calls **Riemann's Explicit Formula** or **Riemann's Main Formula**.

Let $J(x)$ be Riemann's weighted prime counting function. Riemann proved:

$$J(x)=\operatorname{li}(x)-\sum_{\rho}\operatorname{li}(x^\rho)-\log 2+\int_x^\infty\frac{dt}{t(t^2-1)\log t}$$

where $\operatorname{li}(x)$ is the logarithmic integral and the sum $\sum_\rho$ runs over all non-trivial zeros of $\zeta(s)$.

The physical metaphor is exquisitely beautiful. $\operatorname{li}(x)$ is the "fundamental tone"—the smooth approximation to the primes. Each term $\operatorname{li}(x^\rho)$ is an "overtone" contributed by the zero $\rho$—every non-trivial zero superimposes an oscillation of a specific wavelength onto the prime distribution curve. The trivial zeros contribute negligible "background noise" (the integral term).

In plain words: **the distribution of primes is the interference pattern produced by the superposition of all non-trivial zeros.**

Converting $J(x)$ to $\pi(x)$ via Möbius inversion, Riemann further proposed approximating the prime counting function by the series

$$R(x)=\sum_{m\ge 1}\frac{\mu(m)}{m}\operatorname{li}(x^{1/m})=1+\sum_{n\ge 1}\frac{(\log x)^n}{n\cdot n!\cdot\zeta(n+1)}$$

This is **Riemann's $R$-function**. Incorporating zero contributions:

$$\pi(x)\approx R(x)-\sum_\rho R(x^\rho)$$

Each zero $\rho$ corresponds to a correction term. The more zeros, the more precise the approximation. Riemann himself computed the zeros at a few low ordinates and found the approximating curve fitted the staircase function of the prime distribution almost perfectly—hence the origin of what is called the "music of the primes": the non-trivial zeros of $\zeta(s)$ are the **notes** of this music.


## V. The Prime Number Theorem: From Chebyshev to Hadamard and de la Vallée Poussin

If Riemann's explicit formula provides the "full score" relating primes and zeros, the next question is: **what exactly is the Prime Number Theorem?**

Long before Riemann, Gauss and Legendre had conjectured, through numerical experience:

$$\pi(x)\sim\frac{x}{\ln x}$$

The first step toward a rigorous proof was taken by the Russian mathematician Pafnuty Chebyshev. He introduced the **Chebyshev functions**:

$$\vartheta(x)=\sum_{p\le x}\ln p,\qquad\psi(x)=\sum_{n\le x}\Lambda(n)$$

where $\Lambda(n)$ is the **von Mangoldt function** ($\ln p$ when $n=p^k$, otherwise 0). Chebyshev proved the existence of constants $0<A<1<B$ such that

$$A\cdot\frac{x}{\ln x}<\pi(x)<B\cdot\frac{x}{\ln x}$$

This was the limit of purely elementary methods.

The true breakthrough came in 1896. Hadamard and de la Vallée Poussin independently completed the rigorous proof of the Prime Number Theorem:

$$\pi(x)\sim\operatorname{li}(x)\sim\frac{x}{\ln x},\quad x\to\infty$$

Their proof circumvented Riemann's explicit formula (whose Hadamard product convergence had not yet been rigorously established) by a more direct strategy: proving that $\zeta(s)$ has no zeros on $\Re(s)=1$.

The core of the proof is a deceptively crude inequality:

$$|\zeta^3(\sigma)\zeta^4(\sigma+it)\zeta(\sigma+2it)|\ge 1$$

where the coefficients $3,4,1$ arise from the trigonometric identity $3+4\cos\theta+\cos 2\theta=2(1+\cos\theta)^2\ge 0$. The brilliance of this inequality: if $\zeta(1+it_0)=0$, then as $\sigma\to 1^+$ the triple product at $t=t_0$ would tend to infinity—yet from growth estimates it remains bounded, yielding a contradiction.

De la Vallée Poussin further proved a **zero-free region**: there exists a constant $c>0$ such that $\zeta(s)$ has no zeros in the region

$$\sigma\ge 1-\frac{c}{\log|t|}$$

Using this zero-free region, he obtained the Prime Number Theorem with an error term:

$$\pi(x)=\operatorname{li}(x)+O\left(xe^{-c\sqrt{\ln x}}\right)$$

This error term, though not optimal, reveals precisely how the accuracy of the Prime Number Theorem improves as zeros recede from $\Re(s)=1$.


## VI. Zero Counting: The Riemann–von Mangoldt Formula

The first step in understanding the distribution of non-trivial zeros is counting them. Riemann conjectured the asymptotic formula in his paper; the rigorous proof was given by Hans von Mangoldt in 1905:

$$N(T)=\frac{T}{2\pi}\ln\frac{T}{2\pi}-\frac{T}{2\pi}+O(\ln T)$$

where $N(T)$ counts non-trivial zeros (with multiplicity) whose imaginary part lies in $[0,T]$. The proof rests on the Argument Principle:

$$N(T)=\frac{1}{2\pi i}\oint_C\frac{\xi'}{\xi}(s)ds$$

Combined with the symmetry of $\xi(s)$, the contour can be reduced to a half-contour. Stirling's formula is used to estimate the logarithmic derivative of the Gamma function precisely, while the integral of $\zeta'/\zeta$—namely $S(T)=\frac{1}{\pi}\arg\zeta(1/2+iT)$—is bounded by $O(\ln T)$ via the Borel–Carathéodory lemma.

From this follows the asymptotic formula for the ordinates of non-trivial zeros:

$$\beta_n\sim\frac{2\pi n}{\ln n}$$

This result shows that non-trivial zeros become ever more densely distributed along the critical strip. Near height $T$, the average spacing between zeros is approximately $2\pi/\ln T$.


## VII. Zeros on the Critical Line: From Hardy to Selberg

The Riemann–von Mangoldt formula tells us how the total number of zeros grows, but it entirely fails to answer the critical question: **how many of them lie on the critical line $\Re(s)=1/2$?**

Let $N_0(T)$ denote the number of zeros on the critical line with ordinate not exceeding $T$. The first qualitative breakthrough came from G. H. Hardy.

**Hardy's Theorem (1914):** $\zeta(s)$ has infinitely many zeros on the critical line. That is, $N_0(T)\to\infty$ as $T\to\infty$.

Hardy's proof is elegant and indirect: he considered $\Xi(t)=\xi(1/2+it)$, an even function of a real variable, and constructed its Mellin transform. Through the functional equation of the Jacobi theta function, he could compute certain integrals exactly. If $\Xi(t)$ changed sign only finitely often, one would derive $m\cdot 2^{2n}\le K$ (with $K$ independent of $n$); letting $n\to\infty$ yields a contradiction.

Hardy's theorem established $N_0(T)\to\infty$ but revealed no growth rate. The significant advance came from Hardy and Littlewood in 1921:

**Hardy–Littlewood Theorem (1921):** $N_0(T)>CT$, i.e., zeros on the critical line grow at least linearly.

This result showed for the first time that critical-line zeros occupy "some density" among all zeros. Their proof introduced the Hardy–Littlewood zero-detection principle—a method for systematically converting sign-change points on the critical line into lower bounds.

The true turning point came in 1942. The Norwegian mathematician Atle Selberg proved a landmark result:

**Selberg's Positive Proportion Theorem (1942):** $N_0(T)\gg T\log T$, i.e., zeros on the critical line constitute a **positive proportion** of all non-trivial zeros.

Since $N(T)\sim(2\pi)^{-1}T\log T$, this means there exists a constant $\alpha>0$ such that $\liminf_{T\to\infty} N_0(T)/N(T)\ge\alpha$. Selberg's proof introduced **mollifier** technology—using a truncated Dirichlet series to "smooth out" the violent oscillations of $\zeta(s)$ near $1/2$—to obtain more precise zero lower bounds.

Since then, the lower bound for this positive proportion has been repeatedly improved:

| Year | Researcher(s) | Lower bound $\alpha$ |
|------|---------------|----------------------|
| 1942 | Selberg | $\alpha>0$ |
| 1956 | Min Sihe | $\alpha\ge 1/60000\approx0.0016\%$ |
| 1974 | Levinson | $\alpha\ge 0.342$ |
| 1989 | Conrey | $\alpha\ge 0.4077$ |
| 2020 | Pratt, Robles, Zaharescu, Zeindler | $\alpha\ge 5/12\approx41.67\%$ |

This means **at least 41% of non-trivial zeros are currently known to satisfy the Riemann Hypothesis**. Each improvement in this number is another step human reason has taken toward that unfathomable truth.


## VIII. Zero Density Estimates: Almost All Zeros Hug the Critical Line

Beyond frontal assault (proving zeros lie on the critical line), another approach is "encirclement from behind"—showing that zeros deviating from the critical line are vanishingly rare.

Let $N(\sigma,T)$ count zeros with $\Re(\rho)\ge\sigma$, $0<\Im(\rho)\le T$. In 1914, Bohr and Landau proved:

$$\lim_{T\to\infty}\frac{N(1/2+\delta,T)}{N(T)}=0$$

for any fixed $\delta>0$. In other words, **almost all non-trivial zeros cluster arbitrarily close to the critical line**. This is the most powerful indirect evidence for the truth of the Riemann Hypothesis.

Subsequently, upper bounds on zero density have been continuously refined. Using mollifier techniques, one obtains:

$$N(\sigma,T)\ll_\varepsilon T^{4\sigma(1-\sigma)+\varepsilon},\quad\sigma>1/2$$

Selberg himself further gave a "flat" upper bound:

$$N(\sigma,T)\ll\frac{T}{\sigma-1/2}$$

This shows zero density is nearly uniform near the critical line but decays sharply away from it. More importantly, Selberg proved that for any function $\Phi(t)\to\infty$, **almost all zeros** satisfy

$$|\beta-1/2|<\frac{\Phi(|\gamma|)}{\log|\gamma|}$$

In other words, as the ordinate increases, non-trivial zeros converge logarithmically toward the critical line. $\Re(s)=1/2$ exerts an irresistible gravitational pull.


## IX. L-Functions and Landau–Siegel Zeros: Ghosts in the Darkness

The essence of the Riemann Hypothesis is an assertion about the relationship between arithmetic sequences and analytic functions. This relationship is not unique to $\zeta(s)$.

In studying the distribution of primes in arithmetic progressions, Dirichlet introduced **Dirichlet characters** $\chi$ and constructed the corresponding **Dirichlet L-functions**:

$$L(s,\chi)=\sum_{n=1}^\infty\frac{\chi(n)}{n^s}=\prod_p\frac{1}{1-\chi(p)p^{-s}}$$

For $\zeta(s)$, we know it has no zeros on $\Re(s)\ge 1$ and admits a zero-free region. For $L(s,\chi)$ with $\chi$ a complex character, analogous results hold. But for **real characters** ($\chi$ taking only real values), a disturbing anomaly appears:

We cannot exclude the possibility that $L(s,\chi)$ possesses a simple real zero near $s=1$—this ghostly zero is called a **Siegel zero** or **exceptional zero**.

Landau proved that among the L-functions of all real characters, at most one exceptional zero can exist. The **Landau–Siegel conjecture** asserts that exceptional zeros simply do not exist. If this conjecture could be proved, the error term in the Prime Number Theorem for arithmetic progressions would be dramatically improved.

The **Generalized Riemann Hypothesis (GRH)**—that all non-trivial zeros of all Dirichlet L-functions satisfy $\Re(s)=1/2$—would imply:

$$\pi(x;q,a)=\frac{\operatorname{li}(x)}{\varphi(q)}+O(\sqrt{x}\ln x)$$

where $\pi(x;q,a)$ counts primes not exceeding $x$ in the arithmetic progression $a+q\mathbb{N}$. Remarkably, even without assuming GRH, Page proved an unconditional result—**Page's Theorem**—which is nearly as powerful as the GRH-conditional statement, the sole difference being the possible appearance of an extra negative contribution term $-\chi(a)\operatorname{li}(x^\beta)/\varphi(q)$ if an exceptional zero $\beta$ exists.

The existence of Siegel zeros remains unresolved. It is the greatest open problem in analytic number theory after the Riemann Hypothesis itself.


## X. The Unfinished Journey

From Riemann's eight-page manuscript of 1859 to the thousands of pages of scholarly literature today, the Riemann Hypothesis has long since transcended its original context. It concerns not only the distribution of primes—though that remains its central concern—but a deeper meta-mathematical question: **can discrete arithmetic structures be exhausted by continuous analytic tools?**

On this point, the picture painted by the Riemann Hypothesis is optimistic. It tells us that primes—those most discrete, most untamed members of the natural numbers—obey, at some profound level, an exquisitely beautiful order. Every non-trivial zero is a note in the symphony of primes. The set of all zeros is the hidden full score of Nature.

But optimism is not certainty. One hundred and sixty years have passed, and we have still not found the proof that could dissolve all doubt into dust. We have Hardy and Littlewood, we have Selberg, we have the 40% positive proportion lower bound, we have ever more precise zero-free regions—each theorem like a searchlight beam piercing the unknown darkness, illuminating a new patch of territory. But the darkness itself remains vast and immeasurable.

Perhaps this is precisely the charm of mathematics. As Hilbert said in 1900: *"We hear within us the perpetual call: There is the problem. Seek its solution. You can find it by pure reason, for in mathematics there is no ignorabimus."*

For the Riemann Hypothesis, we are still on the search.

---

*This review is based on TravorLZH's thirty-article Zhihu column series "Understanding the Riemann Hypothesis," with gratitude to this outstanding expositor of analytic number theory in the Chinese-speaking world.*
