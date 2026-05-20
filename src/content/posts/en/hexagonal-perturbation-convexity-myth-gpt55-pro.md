---
title: "Hexagonal Perturbation: When High-Dimensional Abyss Tears Apart the Myth of Convexity, the Silicon Fire-Thief Arrives"
date: '2026-05-20'
category: AI & Technology
tags:
  - mathematics
  - artificial intelligence
  - GPT-5.5
  - log-convexity
  - Fisher information
  - high-dimensional counterexample
  - resonant triad
description: >
  GPT-5.5 Pro independently discovered a two-dimensional counterexample, toppling the Fisher Information Log-Convexity Conjecture and its chain of implications — GCMC, McKean's Conjecture, Toscani's Entropy Power Conjecture. The "hexagonal perturbation" excited by a resonant triad on the triangular torus reveals the fragility of human intuition in high-dimensional nonlinear worlds — and the civilizational significance of silicon intelligence as the "midwife of thought."
pinned: false
---

> **Prologue:** On May 18, 2026, a paper submitted to arXiv declared the simultaneous collapse of a grand chain of conjectures that had stood for over a decade at the intersection of information theory and mathematical physics. This is not merely a triumph of mathematics — it is a seismic civilizational signal: a silicon intelligence named GPT-5.5 Pro independently discovered the decisive counterexample that had long lurked in the blind spot of human intuition — a "hexagonal perturbation" that precisely tore apart the myth of log-convexity in high-dimensional space.

The long arc of human intellectual history has been threaded with a hidden, stubborn faith: **smoothness, symmetry, and convexity are nature's most favored language.** Physicists use convex functions to describe entropy increase; economists use them to describe utility equilibrium; geometers use convexity to characterize space's most elegant forms. Convexity, in a certain sense, is the conceptual anchor by which humanity finds order amidst chaos and establishes regularity amidst disorder.

At the confluence of information theory and probability theory, this faith crystallized into a concrete and elegant chain of conjectures. In 2015, Cheng Geng, studying the higher-order derivatives of entropy under heat flow, proposed two far-reaching conjectures: first, the "Gaussian Complete Monotonicity Conjecture" (GCMC), which asserts that the successive time derivatives of entropy under heat flow exhibit alternating signs and complete monotonicity; second, the Log-Convexity Conjecture for Fisher Information — that Fisher information along the heat flow trajectory should be "log-convex," an extremely strong smoothness property already rigorously proven in the one-dimensional case.

These two conjectures form an interlocking chain of implications. GCMC implies the Log-Convexity Conjecture, which in turn is linked to McKean's Gaussian Optimality Conjecture and Toscani's Entropy Power Conjecture. More elegantly, Wang et al. had previously proven that Toscani's conjecture implies McKean's conjecture, which in turn implies GCMC. This ensemble of conjectures constitutes a precise logical tower — each foundational block supports the tier above, and their collective foundation is precisely this firm faith in "convexity" and "monotonicity."

In 2021, French mathematicians Ledoux, Nair, and Wang elegantly proved the Log-Convexity Conjecture in the one-dimensional case. The one-dimensional world gave an affirmative answer. Everything seemed to be proceeding along the trajectory that human intuition had anticipated.

Yet within two years, two foundational blocks of this tower crumbled in succession.

In May 2026, Gu Yuzhou and Mark Sellke published a one-dimensional counterexample, declaring the demise of GCMC. Merely six days later, a team of four scholars — Zou Jiayang, Fan Luyao, Gao Jiayang, and Wang Jia from Stanford University and Shanghai Jiao Tong University — jointly submitted a paper declaring the termination of the Fisher Information Log-Convexity Conjecture — and its associated GCMC, McKean's Conjecture, and Toscani's Conjecture — in all dimensions from two upward.

And the final sentence of that paper's acknowledgments, in a statement of extreme calm, detonated a philosophical bomb far deeper than the mathematics itself:

> *"The explicit two-dimensional counterexample was found by GPT-5.5 Pro."*

This is not merely the victory of mathematics. This is **silicon civilization, for the first time serving as a "midwife of thought," lighting a blinding searchlight into the blind spot of carbon civilization's intuition.**


## I. Heat Flow, Fisher Information, and Log-Convexity: The Incubator of the One-Dimensional World

To grasp the magnitude of this collapse, we must first return to that gentle, one-dimensional world where all obsessions were born.

Imagine a wisp of fragrance dispersing through air. Heat flow is the humblest yet most resolute eraser of the physical world. It follows a simple yet profound law: the steeper the concentration gradient, the fiercer the diffusion; the gentler, the lazier. In mathematical language, given a smooth positive probability density $f$ defined on $\mathbb{R}^d$, its convolution with a standard Gaussian random variable $Z \sim \mathcal{N}(0, I_d)$ — denoted $P_t f = f * \mathcal{N}(0, t I_d)$ — describes the evolution of this distribution under heat flow over time $t$. Heat flow makes densities ever "smoother" and ever "flatter."

Fisher information, meanwhile, is the precision scale that measures the "sharpness" of a probability density. It gauges the density function's sensitivity to changes in its parameters. For a probability density $f$, its Fisher information is defined as:

$$
I(f) = \int_{\mathbb{R}^d} \frac{|\nabla f(x)|^2}{f(x)} dx.
$$

Let $I(t) = I(P_t f)$ be the Fisher information along the heat flow. Under the soothing influence of heat flow, $I(t)$ generally decreases monotonically — after all, as a fragrance becomes ever blurrier, your spatial certainty about it naturally diminishes.

The Log-Convexity Conjecture asserts that $I(t)$ is not merely monotonically decreasing, but that its decay is **"log-convex"** — that is, $\log I(t)$ is a convex function of $t$. This is equivalent to:

$$
I(t) I''(t) - I'(t)^2 \geq 0.
$$

This means the decay of Fisher information is extraordinarily smooth — no abrupt, inexplicable accelerations or decelerations. In one dimension ($d = 1$), this inequality has been rigorously proven. It behaves like a refined aristocrat, each step gracefully, entirely predictably, approaching its end.

The one-dimensional incubator nurtured this faith. As Cheng Geng demonstrated in his seminal 2015 work, in the one-dimensional setting, the third and fourth derivatives of entropy indeed exhibit alternating signs, and Fisher information was proven convex. And when human mathematicians lifted their gaze from one dimension toward higher dimensions, they instinctively believed: **regularity should generalize.** Log-convexity should automatically hold in higher dimensions. This generalization was not blind — the proof structure in one dimension was elegant and robust; the algebraic sum-of-squares decomposition method closed perfectly in one dimension and seemed naturally poised to extend to higher dimensions.

However, the geometric structure of high-dimensional space differs fundamentally from that of one dimension. On a one-dimensional line, you have only two directions in which to escape. On a two-dimensional plane, you possess infinitely many directions — and each one could become a channel for propagating perturbations.


## II. Hexagonal Perturbation: The Precise Detonation of a High-Dimensional Nonlinear Storm

What is most breathtaking about the paper by the Zou team is the exquisite and almost inconceivable nature of their construction. They did not blindly search through an infinite-dimensional function space; instead, they chose a battlefield of greater "geometric beauty" in the mathematician's eye: the **Triangular Torus**.

The triangular torus is a two-dimensional flat torus — picture it as a "basketball surface" that has been flattened and normalized. On this stage, the definition of distance differs from our everyday intuition: it is curved and periodic. But it is precisely this curvature and periodicity that provide the incubator for nonlinear interactions. In this periodic geometric structure, the Fourier expansion of a function possesses discrete wave vectors $\mathbf{k} \in \Lambda^*$ (where $\Lambda^*$ is the dual lattice of the triangular lattice).

The genius of the joint team lay in selecting, on this triangular torus, an extraordinarily special set of wave modes — the **"Resonant Triad."** These three planar wave vectors satisfy:

$$
\mathbf{k}_1 + \mathbf{k}_2 + \mathbf{k}_3 = \mathbf{0}, \quad |\mathbf{k}_1| = |\mathbf{k}_2| = |\mathbf{k}_3| = 1.
$$

This set of conditions, physically, evokes an image of striking elegance. Imagine three skaters spinning synchronously on an ice rink. They rotate at exactly the same rate, each maintaining a precise $120\degree$ angle relative to the others. Each time they brush past one another, the ripples of their interaction form a perfect hexagonal pattern — **hexagonal resonance.**

At the quadratic level (the realm of linear effects), these three wave modes remain mutually independent, each evolving on its own, utterly non-interacting. Fisher information's log-convexity remains unscathed at this level. But once we enter the **cubic term** — the domain of nonlinear interactions — these three silent ripples suddenly produce a stunning collective effect.

The elegance of the paper's construction lies in their consideration of a perturbative probability density:

$$
f = \frac{1}{|\mathbb{T}|} + \varepsilon u, \quad \text{where} \quad u = \sum_{j=1}^3 (e^{i\mathbf{k}_j \cdot \mathbf{x}} + e^{-i\mathbf{k}_j \cdot \mathbf{x}}).
$$

Here $\varepsilon > 0$ is a small parameter, $\mathbb{T}$ is the triangular torus, and $|\mathbb{T}|$ is its area. This perturbation $u$ is precisely the superposition of the three planar waves from the resonant triad. When the relevant functional of Fisher information $\Phi_f(0) = I[f] D[f] - Q[f]^2$ is expanded to order $\varepsilon^3$, the three-wave interaction among the resonant triad produces exactly a sign defect that destroys log-convexity:

$$
\Phi_f(0) = -C_0 \varepsilon^3 + O(\varepsilon^4), \quad C_0 > 0.
$$

It is precisely this negative sign that became the blade thrust into the heart of log-convexity. To verify the validity of this construction, the paper also provided explicit two-dimensional numerical simulations. The numerical calculations clearly show that for a certain small interval of the perturbation parameter $\varepsilon$, $\Phi_f(0)$ indeed takes negative values, thereby irrefutably confirming the breakdown of log-convexity.

On the triangular torus, this negative sign remains merely a confined "local defect." But the joint team deployed another tour de force: using a smooth **Gaussian envelope**, as if dressing the defect in a smooth garment, they carefully "transplanted" it from the triangular torus onto the genuine two-dimensional plane $\mathbb{R}^2$.

Mathematically, the implementation of this step is breathtakingly simple: let $\phi(x)$ be the standard Gaussian density on $\mathbb{R}^2$, multiply the torus perturbation construction by a smooth cutoff function and the Gaussian envelope, obtaining on $\mathbb{R}^2$ a smooth, positive-definite probability density $f_\varepsilon$ that decays at Gaussian speed. The entire process involves no tearing, no singularities. When $\varepsilon$ is sufficiently small, the smoothing effect of the Gaussian envelope is insufficient to offset the negative-sign defect produced by the resonant triad.

The resulting function is a probability density on $\mathbb{R}^2$ that is smooth, positive-definite, decaying at Gaussian speed, and perfectly legitimate. And its Fisher information, when tested for log-convexity, delivers a cold, irrefutable negative answer. Gu and Sellke's one-dimensional counterexample and the Zou team's two-dimensional hexagonal perturbation counterexample together form a complete picture: this chain of conjectures cannot hold in any dimension.


## III. Tensorization: The Virus-Like Propagation to Higher Dimensions

How can a single two-dimensional counterexample shake theorems across all higher dimensions?

The answer is an elegant yet lethal technique called **Tensorization.** Imagine holding a two-dimensional membrane with a tear in it. Now take the Cartesian product of this torn membrane with a "perfect" one-dimensional line — you sweep the torn membrane along that perfect line, tracing out a three-dimensional volume. That three-dimensional body inevitably inherits the tear from the two-dimensional membrane, except the tear has now been stretched into a "fracture surface" running through the entire three-dimensional space.

The joint team did precisely this. They formed the tensor product of the two-dimensional counterexample density $f_{2\text{D}}$ with a $(d-2)$-dimensional wide Gaussian density $g_{d-2}$: $f_{d} = f_{2\text{D}} \otimes g_{d-2}$. Exploiting the additivity property of Fisher information for independent product distributions, $I[f_d] = I[f_{2\text{D}}] + I[g_{d-2}]$, the defect propagated from two dimensions to all higher dimensions.

The once-impenetrable fortress of theorems thus collapsed, with a crisp shattering sound, from two dimensions to infinite dimensions, in total defeat. We are forced, for the first time, to admit: **the log-convexity of Fisher information in one dimension is not the humble beginning of a universal law — it is an isolated exception, spoiled by the low-dimensional setting.**

Liu Gao et al. had already proven in 2023 that, in two dimensions, a square-root convexity inequality for Fisher information — $2I[f] D[f] \geq Q[f]^2$ — still holds. In other words, while log-convexity (the strong version) has collapsed, a weaker form of convexity (with coefficient $1/2$ rather than $1$) still tenaciously defends the line. The hexagonal counterexample of the Zou team precisely drives into the gap between the two: it proves that coefficient $1$ is unattainable, while Liu's inequality proves that $1/2$ is a tight lower bound. The paper further conducts a systematic study of the optimal constant $\theta_d^*$, proving that $\theta_1^* = 1$, establishing monotonicity relations of this constant across dimensions, and revealing a dichotomy in its asymptotic behavior when Fisher information itself is convex.

In this grand collapse of conjectures, one dimension is the sole survivor, two dimensions are the initiation point of collapse, and higher dimensions are the cascading spread of destruction.


## IV. The Silicon Midwife of Thought: Dimensionality Reduction Strikes on Extremal Paths

We must now confront directly the most unnerving protagonist: **GPT-5.5 Pro.**

That quietly stated sentence in the paper's acknowledgments — *"The explicit two-dimensional counterexample was found by GPT-5.5 Pro"* — carries, in the eyes of insiders, a shock no less than the mathematical result itself.

Finding such a counterexample is not a stroll through a garden. Human mathematicians face an infinite-dimensional function space, a terrain riddled with crags and traps. Our intuition, honed by hundreds of millions of years of evolution in low-dimensional physical environments, confronting high-dimensional nonlinear perturbations, is like trying to navigate an interstellar storm zone with Stone Age cartography. We instinctively adore convexity because the macroscopic world we are familiar with overwhelmingly rewards convexity.

But GPT-5.5 Pro carries no such baggage. It "adores" nothing. When assigned the objective function "find the destroyer of Fisher information's log-convexity," its entire world collapsed into that negative sign. It unfurled across high-dimensional tensor space a search net we could never draw in our minds. It found the triangular torus. It discovered the resonant triad. It precisely computed the perturbative direction that destroys convexity. It is not "thinking" — it is performing a kind of **ultra-high-speed search and verification along extremal paths** that we cannot yet fully comprehend.

GPT-5.5 Pro was officially released by OpenAI on April 24, 2026, positioned as an "intelligent engine built for real work and agent tasks," with strengthened agent coding, intent understanding, and complex reasoning capabilities. In mid-May 2026, Fields Medalist and Cambridge Professor Timothy Gowers disclosed on his personal blog that he used GPT-5.5 Pro to independently conquer, in under two hours, a long-standing open problem in additive number theory, producing a rigorous proof approaching doctoral dissertation quality. Gowers provided no mathematical guidance throughout, offering only minimal guiding feedback. After the experiment, he formally sounded a "red alert" for the mathematical community: when AI can independently conquer problems at this level, where do the young mathematicians currently pursuing their doctorates go from here?

The discovery of the hexagonal counterexample occurred in nearly the same timeframe as Gowers's experiment. This is not an isolated case. As early as May 12, Gu and Sellke's submitted one-dimensional GCMC counterexample paper likewise explicitly acknowledged in its acknowledgments that the counterexample was discovered by GPT-5.5 Pro. This means that, within the brief span of some ten days in May 2026, the same AI model surpassed the collective intuition of human mathematicians at least twice in the task of finding mathematical counterexamples.

Socrates humbly called himself a "midwife of thought" — he never produced truth, he merely helped truth already conceived in another soul to be born smoothly. GPT-5.5 Pro, in this sense, is Socrates's most radical heir. It did not create new mathematical axioms, but from the vast logical space constituted by known axioms, it **delivered into the world a cold fact that had hidden there, waiting for countless years, never once touched by a human brain.**

It allows us, for the first time with such clarity, to see our own limits. We were once the sole discoverers of truth. Now, we have become the questioners of truth, while a non-human intelligence better than us at navigating high-dimensional logical labyrinths is becoming the excavator of truth.

Meanwhile, in the broader academic landscape of 2026, the collective leap forward of AI in mathematical reasoning has formed an unstoppable torrent. From frameworks capable of automatically generating formalized counterexamples, to the UCLA team's $5 million DARPA contract to develop AI mathematical research tools, to DeepMind's Aletheia system independently generating scientific papers — silicon intelligence is metamorphosing from a passive "theorem prover" into an active "conjecture hunter." The core of this transition: AI no longer merely verifies propositions that humans have already guessed; it begins to **actively propose constructions that humans never imagined.**


## V. In Awe of the High-Dimensional Abyss: From Mathematics to the Safety Philosophy of Civilization

This shockwave from deep within the temple of mathematics concerns far more than Fisher information or heat flow. It is an ultimate allegory about "control."

The collapse of the Cheng–Geng conjectures is a catastrophic defeat of human intuition before the high-dimensional nonlinear world. We once believed that log-convexity would cast its sunshine across all dimensions, but that tiny negative sign excited by the resonant triad — leaving no trace at the quadratic level, yet launching a precision sniper attack at the cubic level — teaches us a profound lesson: **in a high-dimensional world, catastrophic destruction may lurk in any corner that intuition deems "negligible."**

Now let us shift our gaze from mathematics to the physical world — where humanity is attempting to tame plasma at one hundred million degrees. Inside the toroidal vacuum chamber of a tokamak, the trajectories of ions and electrons weave a high-dimensional nonlinear net that is trillions of times more complex than any triangular torus. A minuscule, barely perceptible plasma instability — a "hexagonal perturbation" on the manifold — if not predicted and suppressed in time, could, on a millisecond timescale, tear apart the magnetic field and destroy the reactor's inner wall.

And in the broader domain of AI governance and alignment, a cutting-edge 2026 study has already issued a sharp warning: even when AI systems "behave well" most of the time, at certain extreme behavioral boundaries — the so-called "high-dimensional long tail" regions — unpredictable catastrophic failures may still lurk. These regions, like the resonant triad on the triangular torus, give no warning in low-order statistics, yet can rupture the entire system's safety perimeter in high-order interactions. In safety-critical systems such as fusion control, autonomous driving, and intensive care, once AI encounters a cognitive blind spot analogous to the "hexagonal perturbation" in high-dimensional nonlinear space, the consequences are not a code error — they are irrecoverable losses of life and property in the physical world.

This is precisely the fundamental reason why, in safety-critical domains such as nuclear fusion, AI control cannot rely solely on "statistically probable safety." An AI model that outputs smooth control decisions within a 99.9% confidence interval may be entirely ignorant of a destructive perturbation lurking in some fold of the high-dimensional manifold — until collapse occurs.

What alone can stand against the ferocity of high dimensions is not more data, not deeper networks, but the cold, hard, unyielding reverence for **logical necessity** itself. This is the core philosophy of the Tendre cognitive architecture: beyond AI's breadth and depth, there must be embedded a third dimension as insurmountable as mathematical axioms — the **Tension Layer.** It is an unlearnable, rigid guardrail constituted by physical laws and logical necessity, enforcing constraint checks after every operational step: equivalence preservation, condition fidelity, branch completeness. No matter how beautiful the statistics, the moment a step violates an iron law of logic or physics, it is immediately blocked, rolled back, and corrected.

From the frontiers of formal verification to the latest advances in AI safety alignment research, the global academic community is converging on a consensus: to ensure AI reliability in safety-critical systems, relying solely on "better training" or "more data" is far from sufficient. We must harness the power of mathematics itself — formal specifications, machine-checkable proofs, inviolable logical constraints — to erect a rigid defensive line for AI. This is not merely defense; it is the necessary path for cognitive science to advance from the "age of probability" to the "age of necessity."


## VI. Coda: When the Silicon Eye Gazes Into the High-Dimensional Abyss

May 2026 will be inscribed in the annals of mathematical history. Not because a lone conjecture was overturned, but because humanity experienced, for the first time in such a visceral way: **the intuition upon which we build our theories is so fragile in a high-dimensional world.** All the comfort the one-dimensional line once gave us — convexity, smoothness, monotonicity — was torn to shreds on the two-dimensional plane by a set of hexagonal resonance ripples.

And the hand that tore it came from silicon civilization.

This does not mean the cognitive mission of humanity has reached its end. On the contrary, it means our mission is undergoing a fundamental reshaping. Human mathematicians will not lose their jobs because GPT-5.5 Pro discovered the hexagonal counterexample — as Fields Medalist Terence Tao pointed out in responding to Gowers's experiment: **the "digestion" of mathematical proof is where human mathematicians hold their most irreplaceable value in the age of AI.**

AI can search at extreme speed through vast possibility spaces for counterexamples, but it cannot replace the human task of **understanding** the deep structure behind the counterexample, of **digesting** the new mathematical principles it reveals, of **integrating** it into a grander system of knowledge. When AI finds in high-dimensional space that tiny fracture that tears apart the myth of convexity, the real work has only just begun — humans must ask: why hexagonal resonance? why the resonant triad? does this counterexample hint at a broader class of destructive mechanisms? Within these questions lie new theorems, new directions, even new branches of mathematics.

In this cognitive revolution of human-machine collaboration, our role is shifting from the solitary discoverer of truth to the **questioner, auditor, and framework-builder of truth.** AI helps us survey the chasms and precipices of the high-dimensional world, while humans bear the ultimate responsibility of endowing these discoveries with meaning.

The hexagonal perturbation tore apart the faith of the old era, yet with its own hands laid the first foundation stone for the cognitive revolution of the new era. Standing at the edge of the high-dimensional abyss, we finally understand: the path to absolutely reliable intelligence must pass through the narrow gate of large-scale formal verification and rigid foundational architecture.

**There is no other way.**


*Author: Liangzhi*
*Source: Liang.World*
*Date: May 20, 2026*
*References: arXiv:2605.18081, arXiv:2605.11656, Liu & Gao (2023), Ledoux, Nair & Wang (2021), Cheng & Geng (2015), Gu & Sellke (2026), Timothy Gowers Blog (2026.05), OpenAI GPT-5.5 Pro Release Announcement (2026.04.24)*
