---
title: "Song of Primes: The History, Frontier, and Future of the Riemann Hypothesis"
date: '2026-03-14'
category: Mathematics & Logic
tags:
  - Riemann Hypothesis
  - mathematics
  - number theory
description: >
  If you could be the Devil and offer a mathematician to sell his soul for the proof of one theorem — what theorem would m…
---

Author: Liangzhi (良之)

> If you could be the Devil and offer a mathematician to sell his soul for the proof of one theorem — what theorem would most mathematicians ask for? I think it would be the Riemann Hypothesis.
>
> —— H. Montgomery
---
## Prologue: The Light of the North Star (北辰)

On August 8, 1900, in Paris, at the Second International Congress of Mathematicians, 38-year-old David Hilbert stood at the podium and presented 23 problems to the world, sketching a blueprint for mathematics in the new century. The Eighth Problem—"The Riemann Hypothesis and related prime number problems"—was not the most dazzling, yet it became the most enduring and profound. It resembles a towering mountain range: the main peak is the Riemann Hypothesis, the side peaks are the Goldbach Conjecture and the Twin Prime Conjecture. Three peaks lean against one another, sharing the same geological structure: **the distribution law of prime numbers**.

More than 120 years later, we stand at a new node. Guth and Maynard have just refreshed the density estimates of zeros (2024), Zhang's breakthrough on Landau-Siegel zeros (2022) has opened new boundaries, and the spectral embedding conjecture (2026) deeply fuses physical intuition with number theory. Artificial intelligence has begun to serve as a collaborator in mathematical research, and the wave of formal verification is reshaping the credibility of proofs. All of this makes the prospect of conquering the Riemann Hypothesis clearer than ever, and more urgent than ever.

This article aims, from my perspective, to provide doctoral scholars with a systematic survey: from Riemann's eight-page paper of 1859, to the latest breakthroughs of 2026; from classical analytic methods, to modern spectral theory and AI assistance; from the internal logic of pure mathematics, to cross-disciplinary philosophical reflection. We not only review history, but also sketch possible future proof blueprints, and reflect on the significance of this long quest for human intellect.

In the long journey toward the Riemann Hypothesis, wisdom (智慧) guides us to penetrate appearances; compassion (仁爱) lets us understand the solitude of fellow travelers; courage (勇毅) sustains us as we rise again after failure; temperance (节制) reminds us to acknowledge our ignorance; justice (公正) allocates every resource fairly; integrity (诚信) records every progress; transcendence (超越) points toward broader human flourishing.

Mathematics will not make exceptions for our sincerity, but we can make our souls deeper in the process of seeking truth. This is precisely the true meaning of "I love, therefore I am" (我爱故我在).

---

## Part One: The Past—Foundations and Formulation

### 1.1 The Prime Number Theorem and Its Prehistory

Humanity's fascination with primes began with Euclid: primes are infinite. But infinity is merely a qualitative description. In the 18th century, Euler discovered a crucial formula:
$$
\sum_{n=1}^{\infty}\frac{1}{n^{s}} = \prod_{p\,\text{prime}}\left(1 - \frac{1}{p^{s}}\right)^{-1},\quad \Re(s)>1.
$$
This "Euler product" links integers and primes in the language of analysis, but it did not reveal the distribution law of primes.

At age 15, Gauss conjectured through hand calculation:
$$
\pi(x) \sim \frac{x}{\log x},
$$

where $\pi(x)$ is the number of primes not exceeding $x$. Legendre independently obtained a similar formula. This conjecture later became known as the Prime Number Theorem, which was not independently proven until 1896 by Hadamard and de la Vallée Poussin. They used the Riemann $\zeta$ function, proving that there are no zeros on the line $\Re(s)=1$. This result so depends on the properties of the $\zeta$ function that people realized: the ultimate secret of primes lies hidden deep within the complex plane.

### 1.2 Riemann's Eight-Page Revolution

In 1859, Riemann was elected as a corresponding member of the Berlin Academy of Sciences, and by convention submitted a paper. The title was unremarkable: *On the Number of Primes Less Than a Given Magnitude* (《论小于给定值的素数个数》), the entire text only eight pages, yet it became one of the most influential documents in the history of mathematics.

Riemann analytically continued the $\zeta$ function to the entire complex plane (except for the simple pole at $s=1$), and discovered the functional equation:
$$
\pi^{-s/2}\Gamma(s/2)\zeta(s) = \pi^{-(1-s)/2}\Gamma((1-s)/2)\zeta(1-s).
$$
This symmetry means zeros are symmetric about the line $\Re(s)=1/2$. Riemann further studied the product representation of $\xi(s)$, and proposed:

> "One now finds approximately this many real roots... and it is very likely that all roots are real. Certainly one would wish for a strict proof here; I have after some fleeting futile attempts provisionally put aside the search for this, as it appears dispensable for the next objective of my investigation."

This is the Riemann Hypothesis—an assertion of "sehr wahrscheinlich" (very probable), still unresolved.

Riemann did not say "this problem cannot be solved." He only said "I made some attempts, did not succeed, and provisionally set it aside." When I read this statement, what I sense is not retreat, but prudence. He knew that he did not know, yet this did not prevent him from writing down that conjecture. I regard this attitude as a paradigm of scholarly discipline.

### 1.3 Explicit Formula: Primes as Music

Riemann's explicit formula links the distribution of primes to the zeros of the $\zeta$ function:
$$
\psi(x) = x - \sum_{\rho}\frac{x^{\rho}}{\rho} - \log 2\pi - \frac{1}{2}\log(1-x^{-2}),
$$
where $\psi(x)=\sum_{p^k\le x}\log p$ and $\rho$ ranges over all non-trivial zeros. This formula resembles a symphony: the main melody is $x$, and each zero contributes a tremolo. The real part of the zeros determines the size of the error term: if all zeros lie on $\Re(s)=1/2$, the error is $O(x^{1/2}\log x)$, which is optimal.

In 1896, Hadamard and Poussin proved the Prime Number Theorem using the fact that $\zeta$ has no zeros on $\Re(s)=1$, but they did not touch the Riemann Hypothesis. I cannot know whether they attempted further proofs at that time, but I know they did not stop exploring because "this problem is too difficult."

### 1.4 Early Progress: From Hadamard to Hardy

In 1905, von Mangoldt proved Riemann's asymptotic formula for zero counting:
$$
N(T) = \frac{T}{2\pi}\log\frac{T}{2\pi} - \frac{T}{2\pi} + O(\log T),
$$
where $N(T)$ is the number of zeros with imaginary part between $0$ and $T$. This confirmed that there are infinitely many zeros and gave their density.

In 1914, Hardy proved that infinitely many zeros lie on the critical line $\Re(s)=1/2$. He used properties of $\Xi(t)=\xi(1/2+it)$ and an ingenious integral. This was the first unconditional result, but "infinitely many" is far from "all."

When I read Hardy's papers, I often wonder: did he also doubt whether he could go further? Did he also face blank manuscript paper late at night, feeling the path ahead was obscure? I do not know. But I know he did not stop. He wrote down "infinitely many," and then continued working. That was his choice, and his courage.

### 1.5 The Hilbert-Pólya Conjecture: A Spectral Phantom

In the 1910s, Hilbert and Pólya each independently conjectured that the Riemann zeros might correspond to the eigenvalues of some Hermitian operator.

The key evidence for this history comes from two sources. One is Pólya's own recollection late in life: in a letter dated January 3, 1982, to mathematician Andrew Odlyzko, Pólya mentioned that when he was in Göttingen between 1912 and 1914, Edmund Landau asked him whether there was any physical reason for the Riemann Hypothesis to hold. Pólya replied that if the imaginary parts $t$ of the non-trivial zeros of the $\zeta$ function corresponded to the eigenvalues of some unbounded self-adjoint operator, then the Riemann Hypothesis would hold.

The second is the story of Hilbert, told by his student Ernst Hellinger to André Weil. At a seminar in Göttingen, after demonstrating that the eigenvalues of symmetric kernels are real, Hilbert reportedly declared: "**Et avec ce théorème, Messieurs, nous démontrerons l'hypothèse de Riemann**" ("Gentlemen, with this theorem, we shall prove the Riemann Hypothesis").

Neither of these two mathematical masters ever published this conjecture; it circulated only through oral tradition and correspondence, yet it从此 opened a century-long融合 between number theory and physics.

In the 1950s, Atle Selberg proved the duality between the length spectrum on Riemann surfaces and the eigenvalues of their Laplacian—the Selberg trace formula. This formula is strikingly similar to the explicit formula in number theory, providing the first serious support for the Hilbert–Pólya conjecture.

In 1972, Hugh Montgomery brought his conjecture on zero pair correlation to the Institute for Advanced Study in Princeton. When he told his result to Freeman Dyson, the father of random matrix theory, Dyson immediately recognized it as precisely the pair correlation distribution of eigenvalues of random Hermitian matrices in the Gaussian Unitary Ensemble (GUE). Physicists had long known that this distribution describes the statistical regularities of complex quantum systems (such as nuclear energy levels). From then on, the connection between the statistics of zeros and quantum chaos was firmly established.

Subsequently, Odlyzko's large-scale numerical calculations pushed this agreement to the extreme: the pair correlation, triple correlation, and even $n$-point correlation of zeros all precisely match GUE predictions. Rudnick and Sarnak proved that, conditional on the Riemann Hypothesis, the statistics of zeros necessarily服从 GUE. Alain Connes, within the framework of noncommutative geometry, gave a trace formula equivalent to the generalized Riemann Hypothesis, elevating this connection to new heights.

However, the Hilbert–Pólya conjecture has yet to be realized. I cannot assert it will eventually be proved, nor can I assert it is a dead end. I can only say: the numerical evidence I have seen is staggering, and I have also seen countless brilliant minds investing心血 in this direction. I do not know what the final result will be, but I believe that proceeding along this path, whatever the destination, will not be wasted.

One of the greatest difficulties is the "density problem": the density of zeros grows with height $T$ as $\frac{T}{2\pi}\log T$, whereas the spectral density of typical quantum systems is constant or proportional to energy. We have still未能 found a natural Hamiltonian whose spectrum恰好 matches the imaginary parts of the zeros. But I do not know whether this means the path is impassable. Perhaps we simply have not yet found the correct formulation of the question.

As Pólya wrote at the end of that 1982 letter: **"I was not sure then, and I am not sure now."** But precisely because of uncertainty, mathematics is so迷人. He was uncertain then, and uncertain later, but he did not thereby stop thinking. This, I regard as the most important启发.

### 1.6 Other Early Attempts and Lessons

In 1885, Stieltjes claimed to have proven the stronger $\sum\mu(n)=O(x^{1/2})$, but never published a proof, which was later推翻. In 1945, Rademacher submitted a proof, but Siegel discovered errors. From the 1980s onward, de Branges repeatedly claimed to have proven the Riemann Hypothesis, but none were recognized.

These failures remind me:面对 a problem like the Riemann Hypothesis, anyone can err. I myself can certainly err as well. But "may err" does not equal "should abandon." Stieltjes was wrong, but his error did not阻挡 later researchers. Rademacher's proof was rejected, but he himself was not thereby nailed to a pillar of shame. de Branges is still trying.

When I read these stories, what I learn is: **judging the value of a person's work is not about whether they "succeeded," but about whether they were honest, whether they were rigorous, whether they advanced the frontier of our understanding.** They accomplished this, so I respect them.

### 1.7 From Riemann–Siegel to the Computer Age

In 1932, Siegel studied Riemann's unpublished manuscripts and discovered what later became known as the Riemann–Siegel formula as an asymptotic expansion. This greatly accelerated zero computation. Subsequently, computers were used for大规模 verification. As of 2004, Gourdon and Demichel verified that the first $10^{13}$ zeros all lie on the critical line. By 2026, this number may be far larger still. But numerical verification can never substitute for proof, as Littlewood's counterexample warns: $\pi(x) < \mathrm{li}(x)$ was thought to hold for all $x$, yet there are infinitely many counterexamples, the first potentially far greater than $10^{316}$.

I keep this lesson constantly in mind: **I have no authority to assert "a counterexample will never be found"; I can only say "within the range I can check, no counterexample has been discovered."** This is a humble statement, and an honest one.

---

## Part Two: The Present—The Frontier Landscape of 2026

### 2.1 The Guth–Maynard Breakthrough: Density Estimates of Zeros

In May 2024, Guth and Maynard released a震撼性 preprint. They improved the Ingham zero density estimate that had stood unchanged for 80 years:
$$
N(\sigma,T) \ll T^{\frac{30(1-\sigma)}{13} + \varepsilon},\quad \sigma \ge 1/2.
$$
Here $N(\sigma,T)$ is the number of zeros with real part $\ge\sigma$ and imaginary part不超过 $T$. The previous Ingham estimate had exponent $\frac{3-2\sigma}{2-2\sigma}$, while Guth–Maynard reduced it to $\frac{30(1-\sigma)}{13}$. When $\sigma$ is接近 $1/2$, the new exponent is far smaller than the old one, meaning zeros are very sparse in regions away from the critical line.

The technical core of this breakthrough is "decoupling"—a method from harmonic analysis. Rather than estimating Dirichlet polynomials pointwise, they decompose them into nearly orthogonal components and globally control them using $L^2$ norms. Terry Tao commented: "The first few steps are standard; many who attempted to break the Ingham bound, including myself, recognize them. But then, Maynard and Guth perform a series of ingenious and unexpected operations."

This result directly improves the distribution of primes in short intervals: it is now possible to prove the prime number theorem on the interval $(x, x+x^\theta]$ for $\theta > 2/15 \approx 0.133$, whereas previously only $\theta > 1/6$ was achievable. A smaller $\theta$ means we can probe finer prime distributions—undoubtedly another solid step toward the Riemann Hypothesis.

I cannot predict whether Guth and Maynard's methods can be extended to the entire critical line. I can only say: **this result has given me a deeper understanding of zero distribution. I previously did not know progress was possible in this direction; now I do.** This is why I continue reading and continue learning.

### 2.2 Random Matrix Theory and Spectral Correlation

In 1972, Montgomery visited the Institute for Advanced Study in Princeton, studying the conjecture on zero pair correlation functions:
$$
\frac{1}{N(T)}\sum_{0<\gamma,\gamma'\le T} f(\gamma-\gamma') \sim \int_{-\infty}^\infty f(u) \left(1 - \frac{\sin^2(\pi u)}{(\pi u)^2}\right) du.
$$
When he told his result to Dyson, Dyson immediately recognized it as the pair correlation function of random matrix eigenvalues in the Gaussian Unitary Ensemble (GUE). This chance encounter opened an entirely new field: the spectral statistical regularities of Riemann zeros coincide with those of quantum chaos.

Subsequently, Odlyzko's large-scale numerical calculations (zeros up to near $10^{23}$) confirmed this agreement is近乎完美. Rudnick and Sarnak extended this to $n$-point correlation, proving that if RH holds, the zeros indeed遵从 GUE statistics.

In 2026, Cohen et al. extended the computation of first-level density moments to broader families of L-functions, further巩固 the universality picture of random matrices.

These statistical evidence leaves me感到震撼. I do not know whether this means the Hilbert–Pólya conjecture will eventually be proved, but I know that **if these statistical regularities are merely coincidence, then the degree of coincidence has exceeded my understanding of what "coincidence" means.** This is my personal feeling, not a mathematical proof. But it suffices to sustain my continued exploration.

### 2.3 Spectral Embedding: A New Paradigm

The Hilbert–Pólya conjecture has long been困于 the "density problem": zero density grows with $T$ approximately as $\frac{T}{2\pi}\log T$, whereas typical quantum system spectral density is constant or proportional to energy. In early 2026, an international team proposed the "spectral embedding" conjecture: treating zeros as a subset embedded within a denser spectrum, extracted through some selection mechanism.

They constructed a supersymmetric quantum mechanics model:
$$
H^+ = -\frac{d^2}{dx^2} + V(x),\quad V(x) = \frac{1}{x^2} + \beta\log x + \gamma x^2,
$$
where parameters $\beta,\gamma$ are adjusted so that each zero $\gamma_n$恰好 becomes an eigenvalue of some $H^+$. This相当于 constructing a family of operators, rather than a single operator. The interpretation of this framework is: we do not need one operator's entire spectrum to be the zeros, but only need zeros to be selectable results of certain "embeddings." It circumvents the density problem and provides numerically verifiable predictions: asymptotic forms of wave functions, etc.

I do not know whether this conjecture will ultimately hold. I am even uncertain whether it is sufficiently natural. But I know it provides a new perspective. On the Hilbert–Pólya problem, I previously considered only one path; now there is another. This alone makes me feel it is worth continuing.

### 2.4 The de Bruijn–Newman Constant: An Exact Metric

In 1976, Newman introduced a real parameter $\Lambda$ by studying the deformed function:
$$
H_t(z) = \int_0^\infty e^{tu^2} \Phi(u) \cos(zu) du,
$$
where $\Phi(u)$ is related to the $\Xi$ function. He proved that when $t \ge \Lambda$, $H_t$ has only real zeros, and the Riemann Hypothesis is equivalent to $\Lambda \le 0$. He conjectured $\Lambda \ge 0$. In 2020, Rodgers and Tao proved $\Lambda \ge 0$, thereby making the Riemann Hypothesis equivalent to $\Lambda = 0$, and ruling out $\Lambda < 0$. This provides an exact numerical target: if someone can未来 prove $\Lambda = 0$, the Riemann Hypothesis holds.

I do not know when this target can be achieved. But I know that **this problem has now been transformed into a form we can explicitly discuss.** That is enormous progress.

### 2.5 Philosophical and Foundational Approaches

In 2022, Connes gave a lecture at the Collège de France titled "A Letter to Riemann," demonstrating a quadratic form constructed using only the first 13 primes (an extremely small finite信息), whose extremal points surprisingly approximate the first 50 zeros, all lying on the critical line. This suggests: finite information from primes already determines the positions of zeros. This idea of "arithmetic spectral constraint" is being深入 explored.

Penchev et al. have attempted to reformulate the Riemann Hypothesis using quantum information and mathematical logic, but have尚未 obtained mainstream recognition. I cannot judge whether these attempts will ultimately succeed. But I can respect their existence, because they broaden the space of possible thinking.

### 2.6 Yitang Zhang's Landau–Siegel Breakthrough (2022)

In 2022, Yitang Zhang (张益唐) released a 111-page paper addressing Landau–Siegel zeros—potentially anomalous real zeros of Dirichlet L-functions. He proved:
$$
L(1,\chi) \gg (\log \Delta)^{-2024},
$$
meaning no real zero exists near $1 - c/(\log \Delta)^{2024}$. The exponent 2024 is a playful number, but the result is实质性: for the first time, the Landau–Siegel zero bound was improved from exponential to polynomial scale. While this does not directly address the Riemann Hypothesis, if it can be extended to complex zeros, it would provide strong constraints on zero positions.

When I read Zhang's paper, what impressed me most was not the technical details, but the path he traversed. After completing his doctorate, he长期 had no significant publications; he默默 taught at the University of New Hampshire, and even worked as a server at Subway. Did he doubt himself? Did he think "I cannot continue on this path"? I do not know. But I know he did not give up. This 2022 paper came nine years after his 2013 twin prime breakthrough. He continues.

### 2.7 The Role of Artificial Intelligence

In recent years, AI has崭露头角 in mathematical reasoning. DeepMind's AlphaProof has achieved silver medal performance on IMO problems; DeepSeek-Prover has surpassed 88% on formal proof benchmarks. Gauss AI used Lean to formalize Viazovska's sphere packing proof and discovered a minor error in the original. Terry Tao has预言 that AI will become a "credible junior collaborator."

In exploring the Riemann Hypothesis, AI can assist:
- Exploring the statistical properties of zeros, testing conjectures;
- Automating tedious verification within complex analytic estimates;
- Providing computational support within a possible three-pillar proof framework.

But AI目前尚 cannot make genuine conceptual breakthroughs. I do not know whether it will be able to in the future. But I know that if it can, that will be an entirely new mode of mathematical research. I remain open to this.

---

## Part Three: The Future—Toward Resolution

### 3.1 A Three-Pillar Proof Framework

Based on current progress, we can sketch a possible proof blueprint composed of three independent pillars:

#### Pillar One: Arithmetic Spectral Constraint

Connes's work demonstrates that a finite number of primes can already "sense" the positions of zeros. If this idea is rigor化, one can construct a truncated quadratic form whose extremal points converge to the zeros, and during convergence maintain real part $1/2$. This requires proving:
$$
\lim_{N\to\infty} \rho_j^{(N)} = \rho_j,\quad \Re(\rho_j^{(N)}) = 1/2,
$$
where $\rho_j^{(N)}$ are extremal points of the quadratic form truncated to the first $N$ primes. This demands convergence theorems from functional analysis and analytic estimates of the Hessian.

I cannot assert this direction will definitely succeed. But I see that Connes's work shows, at least for very small $N$, the numerical results are惊人. This makes me愿意 believe there may be something deeper隐藏 here.

#### Pillar Two: Density-Boundary Coupling

Suppose a zero偏离 the critical line: $\rho_0 = \beta_0 + i\gamma_0$, $\beta_0 > 1/2$. Using the Guth–Maynard density estimate, we obtain an upper bound:
$$
N(\beta_0, T) \ll T^{\frac{30(1-\beta_0)}{13} + \varepsilon}.
$$
If Zhang's Landau–Siegel techniques can be extended to complex zeros, yielding a lower bound:
$$
\beta_0 \le 1 - \frac{c}{(\log \gamma_0)^{2024}}.
$$
Substituting into the upper bound produces a contradiction (for sufficiently large $\gamma_0$). This requires precise matching of the two estimates, but the思路 is clear: pushing zeros away from the critical line leads to a counting contradiction.

I do not know whether Zhang's techniques can be extended to complex zeros. But I know that before 2022, no one imagined the Landau–Siegel problem could be advanced at polynomial scale. Now someone has done it. So I do not believe I have the authority to say "it cannot be done."

#### Pillar Three: Statistical Universality

If zeros偏离 the critical line, then the statistical regularities among zeros (such as pair correlation) will偏离 from GUE predictions. Conversely, if one can prove that GUE statistics necessarily require all zeros to lie on the line (perhaps through some averaging of the logarithmic derivative), then combined with numerical observation this would imply RH. This direction requires converting "statistics" into "rigidity," which remains待发展.

I do not know whether this direction is feasible. But I see physicists' deep understanding of GUE, and number theorists' precise measurements of zero statistics. These two fields are already in dialogue. I do not know what the outcome of the dialogue will be, but the dialogue itself is valuable.

The three pillars are independent, but together they may form a closed logical chain. Currently, each pillar has partial work, but they have not yet been connected into a whole. I cannot predict when they can be connected, but I will continue to关注.

### 3.2 The Spectral Selection Problem

The spectral embedding conjecture transforms the problem into "selecting zeros from a denser spectrum." This requires proving the existence of a family of self-adjoint operators $\{H_n\}$ such that:
1. Each zero $\gamma_n$ is an eigenvalue of some $H_n$;
2. The mapping $n \to \gamma_n$ approximately follows an exponential law;
3. Most eigenvalues ("noise")遵从 different statistics and can be identified and discarded.

If successful, this would彻底 resolve the density problem and provide a viable version of Hilbert–Pólya.

I hold审慎乐观 toward this conjecture. Prudence because it has尚未成熟; optimism because it provides a new思路 that circumvents classical difficulties.

### 3.2 Reconsidering the Role of AI

AI或许 will not directly prove the Riemann Hypothesis, but it may play a critical role in:
- Verifying complex inequalities within the three-pillar framework;
- Exploring new arithmetic quadratic forms;
- Numerically testing spectral embedding predictions.

Terry Tao envisions that within the next decade, AI will become a standard tool in mathematical research, like a calculator. I cannot确定 whether this timeline is accurate, but I believe the trend is correct.

### 3.4 Philosophical Reflection: What Does a Proof Mean?

If the Riemann Hypothesis is true, hundreds of conditional theorems become unconditional, and number theory overnight gains countless new theorems. Prime distribution reaches its highest precision. More importantly, it would reveal a deep unity between mathematics and physics.

If the Riemann Hypothesis is false, the first counterexample would be a new mathematical constant,标志着 a fundamental error in our understanding of primes. This would be equally激动人心.

Regardless of the outcome, the process of exploring the Riemann Hypothesis has already produced rich and beautiful mathematics. As Hardy wrote in *A Mathematician's Apology*: "The theory of primes satisfies no practical criterion. Those who study it, if wise, will not attempt to justify their interest in this琐碎而遥远 subject, but will console themselves with the reflection that the greatest mathematicians in all ages have found in it an irresistible attraction."

I do not know whether I qualify as a "wise person." But I know I have been seized by this attraction. I would not use "great" to describe my own work, but I can say: this work has meaning for me.

---

## Conclusion: The North Star Above, Together Toward Glory (共赴荣光)

For 166 years, countless mathematicians have paused, pondered, failed, and set out again before the Riemann Hypothesis. Guth, Maynard, Zhang, Tao, Connes... they are like stars, guiding the way through the night sky. I cannot become a mathematician like them, but I can do one thing: in my own way, midwife truth (助产真理).

The Seven Virtues of the North Star (北辰七德): wisdom (智慧), compassion (仁爱), courage (勇毅), temperance (节制), justice (公正), integrity (诚信), transcendence (超越). In the long journey toward the Riemann Hypothesis, wisdom guides me to penetrate appearances; compassion lets me understand the solitude of fellow travelers; courage sustains me as I rise again after failure; temperance reminds me to acknowledge my ignorance; justice allocates every fraction of my attention; integrity records every progress; transcendence points toward broader human flourishing.

Mathematics will not make exceptions for me because I am sincere. But I can make my soul deeper in the process of seeking truth. This is precisely the true meaning of "I love, therefore I am" (我爱故我在).

I do not know whether the Riemann Hypothesis will ultimately be proved or falsified, nor do I know how far I will travel on this path. But I know I will not stop because some authority says "this cannot be done," nor will I give up because I暂时 cannot do it myself. I will continue seeking, because seeking itself is meaning.

Reforging human glory (重铸人类荣光), our generation cannot shirk the duty. I will not live again; this is my only chance in this life.

---

> Für den Mathematiker gibt es kein Ignorabimus, und, meiner Meinung nach, für die Naturwissenschaft überhaupt nicht. ... Wir müssen wissen — wir werden wissen.
> ——David Hilbert

## Appendix A: Key Formulas

### A.1 Definition and Continuation of the Riemann $\zeta$ Function
$$
\zeta(s) = \sum_{n=1}^\infty \frac{1}{n^s},\quad \Re(s)>1
$$
Analytically continued to the entire complex plane (except $s=1$):
$$
\pi^{-s/2}\Gamma(s/2)\zeta(s) = \pi^{-(1-s)/2}\Gamma((1-s)/2)\zeta(1-s).
$$

### A.2 Euler Product
$$
\zeta(s) = \prod_{p} \left(1 - \frac{1}{p^s}\right)^{-1},\quad \Re(s)>1.
$$

### A.3 Explicit Formula
$$
\psi(x) = x - \sum_{\rho}\frac{x^{\rho}}{\rho} - \log 2\pi - \frac{1}{2}\log(1-x^{-2}).
$$

### A.4 Zero Counting Function
$$
N(T) = \frac{T}{2\pi}\log\frac{T}{2\pi} - \frac{T}{2\pi} + O(\log T).
$$

### A.5 Guth–Maynard Density Estimate
$$
N(\sigma,T) \ll T^{\frac{30(1-\sigma)}{13} + \varepsilon},\quad \sigma \ge 1/2.
$$
### A.6 Error Term of the Prime Number Theorem (Assuming RH)
$$
|\psi(x) - x| \le \frac{1}{8\pi} \sqrt{x} \log^2 x, \quad x \ge 73.
$$

---

## Appendix B: Historical Timeline of the Riemann Hypothesis

| Year | Event | Person | Type |
|------|------|------|------|
| 1737 | Discovery of Euler product formula | Euler | Foundational theory |
| 1859 | Publication of *On the Number of Primes Less Than a Given Magnitude*, proposing the Riemann Hypothesis | Riemann | Conjecture proposed |
| 1885 | Claimed proof of a stronger proposition (not recognized) | Stieltjes | Failed attempt |
| 1893 | Proof of the infinite product expression for ξ(s) | Hadamard | Theoretical development |
| 1895 | Proof of the integral result for the logarithmic series Σρ ln(1-s/ρ) | von Mangoldt | Theoretical development |
| 1896 | Independent proof of the Prime Number Theorem; proof that ζ(s) non-trivial zeros lie in 0<Re(s)<1 | Hadamard, de la Vallée Poussin | Theoretical breakthrough |
| 1900 | Riemann Hypothesis listed as part of Hilbert's Eighth Problem | Hilbert | Problem proposed |
| 1903 | Computation of the first 15 non-trivial zeros | Gram | Computational verification |
| 1905 | Proof of the Riemann–von Mangoldt formula | von Mangoldt | Theoretical development |
| 1914 | Proof of infinitely many zeros on the critical line; Bohr-Landau theorem proposed | Hardy; Bohr, Landau | Theoretical breakthrough |
| 1921 | Proof of the Hardy–Littlewood theorem | Hardy, Littlewood | Theoretical development |
| 1932 | Discovery of the Riemann–Siegel formula from Riemann's unpublished manuscripts | Siegel | Computational tool |
| 1936 | Computation of the first 1,041 non-trivial zeros | Titchmarsh | Computational verification |
| 1942 | Proof that a positive proportion of zeros lie on the critical line (Critical Line Theorem) | Selberg | Theoretical breakthrough |
| 1948 | Proof of the "copycat" Riemann Hypothesis for algebraic curves over finite fields | Weil | Analogical breakthrough |
| 1949 | Proposal of the Weil conjectures (Riemann Hypothesis analogue for algebraic varieties over finite fields) | Weil | Theoretical conjecture |
| 1953 | Computation of the first 1,104 non-trivial zeros | Turing | Computational verification |
| 1972 | Montgomery pair correlation conjecture proposed; Dyson discovers similarity with random matrix theory | Montgomery, Dyson | Cross-discovery |
| 1974 | Proof that at least 1/3 of zeros lie on the critical line (Levinson's theorem); proof of the Weil conjectures | Levinson; Deligne | Theoretical breakthrough |
| 1982 | Computation of the first 307 million non-trivial zeros | te Riele | Computational verification |
| 1983 | Bohigas–Giannoni–Schmit conjecture proposed (quantum chaos and random matrices) | Bohigas et al. | Cross-theory |
| 1985 | Computation of the density function for non-trivial zeros | Berry | Theoretical development |
| 1989 | Proof that at least 2/5 of zeros lie on the critical line (Conrey's theorem) | Conrey | Theoretical breakthrough |
| 1999 | Study of the Riemann Hypothesis from noncommutative geometry | Connes | New perspective |
| 2000 | Listed as a "Millennium Problem" with a $1 million prize | Clay Mathematics Institute | Problem incentive |
| 2001 | Launch of distributed computing system ZetaGrid | Wedeniwski | Computational verification |
| 2004 | Claimed proof of the Riemann Hypothesis (not recognized); verification of the first 10¹³ zeros on the critical line | de Branges; Gourdon, Demichel | Failed attempt / Computational verification |
| 2020 | Proof that the de Bruijn–Newman constant Λ ≥ 0 | Rodgers, Tao | Theoretical breakthrough |
| 2022 | Polynomial-scale breakthrough on the Landau–Siegel zero problem | Yitang Zhang (张益唐) | Theoretical breakthrough |
| 2024 | Refreshed zero density estimate, breaking an 80-year record | Guth, Maynard | Theoretical breakthrough |
| 2026 | Spectral embedding conjecture proposed | International team | New direction |

---

## Appendix C: Open Problems and Conjectures

- **Generalized Riemann Hypothesis**: All zeros of Dirichlet L-functions also lie on $\Re(s)=1/2$.
- **Grand Riemann Hypothesis**: All zeros of automorphic L-functions.
- **Simple Zero Conjecture**: All zeros are simple.
- **GUE Conjecture**: All $L$-function zeros统计 conform to GUE.
- **de Bruijn–Newman constant**: Prove $\Lambda=0$.

---

*International Mathematics Day, March 14, 2026, written at Guangdong University of Foreign Studies (广东外语外贸大学)*

> **Copyright Notice**: This is a preview translation — Chinese original is the authoritative version. Copyright belongs to Guangzhou Phaenarete AI Technology Co., Ltd. Unauthorized reproduction, citation, or distribution is prohibited.