---
title: "Putting the Elephant in the Fridge: On Approaching the Riemann Hypothesis with Computational Methods"
date: '2026-05-15'
category: Mathematics & Logic
tags:
  - Riemann Hypothesis
  - mathematics
  - Turing machine
  - halting problem
  - ZetaHalt
  - formal verification
  - Hilbert's Eighth Problem
description: >
  Systematically elaborating a path for approaching the Riemann Hypothesis with computational methods—converting the Riemann Hypothesis equivalently into the halting problem of a 744-state Turing machine, and establishing a data-driven, human-machine collaborative observation and experimentation platform.
---

**Author: Ang Li (李昂)**

**Phaenarete Project · Guangzhou Phaenarete AI Technology Co., Ltd. (广州菲娜睿特人工智能科技有限责任公司)**

**May 2026**

---

**Abstract**

Among the 23 problems proposed by Hilbert in 1900, the eighth problem encompasses the Riemann Hypothesis. One hundred and twenty-six years later, this conjecture still challenges the boundaries of human reason. This article, directed at researchers in the formal sciences (mathematics, logic, philosophy, theoretical computer science), systematically elaborates a path for approaching the Riemann Hypothesis with computational methods. The core idea of this path is: to convert the Riemann Hypothesis equivalently into the halting problem of a specific small Turing machine, and to study its computational behavior within the "observable" range. We will review the key advances from Yedidia-Aaronson to Matiyasevich and then to O'Rear—the Riemann Hypothesis has been encoded as a Turing machine with merely 744 states. On this basis, we propose the "ZetaHalt" project: not attempting exhaustive search in classical deterministic computation, but establishing a data-driven, human-machine collaborative observation and experimentation platform, using machine learning models to learn this machine's behavioral patterns, using interpretability tools to extract candidate mathematical invariants, and using formal verification systems (Lean 4) for rigorous verification. This article will also discuss the philosophical significance of this research path: it transforms the relationship between "proof" and "understanding," and provides a quantifiable experimental ground for the boundary between "undecidable" and "unknowable" in the formal sciences.

**Keywords**: Riemann Hypothesis; Hilbert's Eighth Problem; Turing machine; halting problem; Busy Beaver; ZetaHalt; formal verification; mathematical experimentation

## 1. Introduction: Hilbert's Eighth Problem and the New Tools of Our Age

On August 8, 1900, David Hilbert delivered his lecture that would change the history of mathematics at the International Congress of Mathematicians in Paris. Among the 23 problems he proposed, the eighth problem encompassed several core conjectures in number theory, the most far-reaching of which—in Hilbert's own words—"perhaps the most important"—was the conjecture concerning the non-trivial zeros of the Riemann ζ function.

Riemann himself proposed this conjecture in his eight-page 1859 paper, then casually remarked: "After a brief and futile attempt, I have temporarily set it aside." For a century and a half, this "temporarily" (暂时) has become the longest wait in the history of mathematics.

Why is this problem so difficult? A fundamental reason is: the Riemann Hypothesis connects two seemingly incompatible mathematical structures. On one side are the primes—discrete, stubborn integers that refuse to be captured by simple formulas. On the other side are the zeros of the ζ function—continuous, analytic, deeply embedded in the precise structures of complex function theory. The Riemann Hypothesis asserts that a precise correspondence exists between these two. To prove it, one must bridge these two great mountains.

Traditional methods—from Hardy (1914) proving infinitely many zeros on the critical line, to Selberg (1942) proving a positive proportion of zeros lie on the line, to Maynard and Guth (2024) breaking through zero density estimates using decoupling techniques—all advance step by step within the framework of traditional analytic number theory. Each step requires decades of accumulation.

What this article discusses is a fundamentally different approach. It is not analytic, but computational. It is not asymptotic, but precise. It does not attempt to directly prove the Riemann Hypothesis, but rather seeks to study the behavior of an equivalent computational model to its utmost extent.

The intellectual history of this approach can be traced back to the work of Turing, Gödel, and Church. In 1936, while solving Hilbert's decision problem, Turing created the concept of the Turing machine—an extremely simplified computational model that nonetheless captures the essence of all "computability." Turing proved that the halting problem is undecidable: no universal algorithm can determine whether an arbitrary Turing machine halts. Gödel's incompleteness theorem tells us that in any axiomatic system containing basic arithmetic, there exist propositions that can neither be proved nor disproved.

So, specifically regarding the Riemann Hypothesis: does there exist a specific, small Turing machine whose halting behavior is equivalent to the negation of the Riemann Hypothesis? If so, what is its "size"? Can we acquire new knowledge about the Riemann Hypothesis by studying this machine's computational behavior?

These questions received a breakthrough answer in 2016. In this article, I will:
1. Systematically review the theoretical chain encoding the Riemann Hypothesis as a Turing machine halting problem (Section 2);
2. Report the latest progress in this field—the 744-state Turing machine (Section 3);
3. Propose our "ZetaHalt" project, elaborating a research paradigm different from exhaustive search (Section 4);
4. Discuss the philosophical significance of this path for the relationship between "proof" and "understanding" (Section 5).

Before proceeding formally, I must make an honest declaration: the computational path described in this article, in the foreseeable future, is nearly impossible to "prove" or "disprove" the Riemann Hypothesis. What it can do is provide a entirely new perspective, a set of accumulable data assets, and an experimental ground for studying the boundaries of mathematical formal systems.

This is the story I wish to tell.

## 2. Theoretical Foundation: From the Riemann Hypothesis to the Halting Problem

### 2.1 Davis-Matiyasevich-Putnam-Robinson: The Legacy of Hilbert's Tenth Problem

To understand how the Riemann Hypothesis can be encoded as a Turing machine halting problem, one must first start with Hilbert's tenth problem.

The tenth problem asks: does there exist a universal algorithm that can determine whether an arbitrary Diophantine equation (polynomial equation with integer coefficients) has integer solutions? In 1970, Yuri Matiyasevich gave a negative answer, completing a grand project initiated by Davis, Putnam, and Robinson. This result can be stated as:

> Every recursively enumerable set is Diophantine.

Translated into the language of computability theory: any set that can be semi-decided by a Turing machine (i.e., for which there exists an algorithm that outputs "yes" when the input belongs to the set, and otherwise never halts) can be encoded as the solvability condition of a Diophantine equation.

A consequence of this theorem is: **every Π₁⁰ statement (i.e., a statement of the form "for all natural numbers n, P(n) holds," where P is a primitive recursive predicate) is equivalent to the halting problem of some specific Turing machine.**

The Riemann Hypothesis is precisely such a Π₁⁰ statement.

### 2.2 From the Riemann Hypothesis to Π₁⁰

How can the Riemann Hypothesis be formulated as a Π₁⁰ statement? This requires several key steps.

First, the Riemann Hypothesis is equivalent to an inequality concerning the Chebyshev function ψ(n) (Schoenfeld, 1976):

\[
|\psi(n) - n| < \frac{1}{8\pi} \sqrt{n} \ln^2 n \quad \text{for all } n > 1
\]

where \(\psi(n) = \ln \operatorname{lcm}(1, 2, \dots, n)\).

Matiyasevich (2020) further converted this continuous inequality into a purely integer inequality. He defined several integer sequences:

- \(q(n) = \operatorname{lcm}(1, 2, \dots, n)\), the least common multiple
- \(p(n) = \pi(n)\), the number of primes not exceeding n
- \(f_0(n) = 2^{n-1} n!\)
- \(f_3(n) = (2n+3)!! / 5!!\)
- \(d(n)\) defined through the recurrence \(d(n+1) = 2n \cdot d(n) - 2(-1)^n f_0(n)\)

Then he constructed the discriminant quantity:

\[
r(n) = f_3(n) - p(n)^2 \left(d(n) \lfloor \log_2 q(n) \rfloor - f_0(n)\right)
\]

**Core theorem: The Riemann Hypothesis is true if and only if for all \(n \geq 1\), \(r(n) > 0\).**

This is a Π₁⁰ statement: it asserts for all natural numbers n that a primitive recursive predicate \(r(n) > 0\) holds true. If there exists any counterexample n such that \(r(n) \leq 0\), the Riemann Hypothesis is falsified.

### 2.3 Matiyasevich's Register Machine

Based on the above equivalence, Matiyasevich (2020) further encoded the algorithm for computing \(r(n)\) into a register machine possessing 29 registers and 130 instructions.

A register machine is an extremely minimal computational model with only two types of instructions:
- `R++`: Increment register R by 1, then proceed to the next instruction
- `R-- jump`: If R>0, decrement it by 1 and proceed to the next instruction; otherwise jump to the instruction at the jump address

The machine starts with all registers empty, computing r(n) sequentially for n=1,2,3,.... Once some n is found such that \(r(n) \leq 0\), the machine halts immediately. Therefore:

**The Riemann Hypothesis is true ⇔ this register machine never halts.**

This equivalence is rigorous. No approximation is needed, no probabilistic assumptions are required. It is purely a translation between formal systems.

## 3. The Race: Making the Machine as Small as Possible

### 3.1 Yedidia and Aaronson's Breakthrough (2016)

In May 2016, MIT doctoral student Adam Yedidia and his advisor Scott Aaronson published a paper that attracted widespread attention. They constructed:

- A 4,888-state Turing machine that halts iff Goldbach's conjecture is false
- A 5,372-state Turing machine that halts iff the Riemann Hypothesis is false
- A 7,918-state Turing machine Z whose halting behavior is unprovable in ZFC (standard set theory), under a consistency assumption

This was the first time in human history that **explicit state upper bounds** were obtained for these undecidability problems.It should be noted, while Gödel's incompleteness theorem tells us that "there exists" some program whose behavior ZFC cannot prove, providing the **specific size** of such a program is an achievement of an entirely different magnitude.

To construct these machines, Yedidia created the Laconic language—a high-level language specifically compiled into small Turing machines. Their work employed three key ideas:
1. **Friedman's "natural" independent propositions**: Logician Harvey Friedman spent decades seeking "natural" arithmetic propositions provably independent of ZFC. His work provided material for encoding.
2. **"On-tape processing"**: Rather than compiling directly to low-level Turing machines, they first wrote a Turing machine interpreter (approximately 4000 states), then wrote high-level programs on the tape to be interpreted. This avoided multiplication overhead.
3. **"Introspective encoding"**: Fully utilizing the log(n) bits of information implicitly contained in each Turing machine state, rather than using an entire state to represent a single bit.

### 3.2 The Crazy State Compression Race

Yedidia-Aaronson's work triggered an intense "state compression race." Programmers and mathematicians from around the world began using various techniques to reduce these machines' state counts.

**Stefan O'Rear** was one of the most active improver. In late May 2016, he reported:

- Using his self-created Not-Quite-Laconic system, he compressed the Riemann Hypothesis Turing machine to **1,008 states**
- Further compressed the result of joint work with Aaronson and Matiyasevich to **744 states**

This is an astonishing number. 744 states. This means that among the "simplest" batch of machines in the single-tape, two-symbol Turing machine space, structures sufficient to encode the full complexity of the Riemann Hypothesis are already latent.

For comparison, the Busy Beaver numbers currently known exactly by humanity are only four: BB(1)=1, BB(2)=6, BB(3)=21, BB(4)=107. The lower bound for BB(5) has already reached 47,176,870, and its exact value may永远 be undeterminable. Yet within a 744-state machine, there already exists a proposition equivalent to one of the deepest unresolved problems in human mathematical history.

### 3.3 The Busy Beaver Function: The Boundary Between Knowable and Unknowable

The work of Yedidia-Aaronson-O'Rear reveals a profound philosophical fact: **the cliff of knowability is much closer than most people imagine.**

BB(4) is known. BB(5) may be determinable; BB(6) may forever be undeterminable. But BB(744) is not merely uncertain—determining its value would be equivalent to solving the Riemann Hypothesis. BB(7,918) is even more so: determining its value would be equivalent to resolving a proposition independent of ZFC.

This is not an asymptotic, theoretical boundary. This is a precise, explicit number. In the sequence of single-tape, two-symbol Turing machines, approximately between 700-800 states, mathematics' "knowable region" begins to overlap with the "Gödel region."

For anyone concerned with the boundaries of formal systems, this is a chilling fact.

## 4. ZetaHalt: Not Solving, but Observing

### 4.1 The Limits of Exhaustion and the Possibility of Observation

Facing a 744-state machine, the most direct idea is: run it and see if it halts. But this is infeasible—at least for classical computation.

A 744-state Turing machine, if it truly never halts, will wander through infinite state space. Even if it eventually halts, the number of steps required may far exceed the computational resources available in the universe. Yedidia and Aaronson mention that they did run these machines "for about a day," but of course without any result. They even told a joke: a Turing machine searching for "a counterexample where a square number is greater than or equal to 5," compiled with Laconic, needs to run for over an hour before finding \(3^2=9\) and halting.

In the world of the Busy Beaver function, "run it and see if it halts" is not a viable research strategy, except for very few state counts.

### 4.2 Our Paradigm: Data-Driven Human-Machine Collaboration

This is the starting point of the ZetaHalt project. We do not attempt exhaustive search of this machine's state space in deterministic computation. What we aim to do is:

1. **Simulate and record**: Within a finite range of n (target: n=10^4 to 10^6, using log-domain stabilization techniques to handle numerical explosion), run Matiyasevich's 29-register machine simulator, generating precise state sequence data.

2. **Learn**: Use a causal Transformer model to learn, on the generated data, to predict the register machine's next state (specifically, predicting the value of log r(n) and the sign of r(n)).

3. **Extrapolate and test**: Test the model's predictive capability in out-of-distribution ranges. If the model can maintain high accuracy in unseen n intervals, this indicates it has learned some invariant structure independent of n.

4. **Interpret**: Use attention heatmaps, integrated gradients, and symbolic regression to extract candidate mathematical invariants from the trained model. For example, the model may discover some constant C such that:
   \[
   \log r \approx \log f_3 - C \log(p^2(m - f_0))
   \]
   If C's fitted value is highly stable and C precisely equals 1, then the model may have merely rediscovered an identity. If C stabilizes around 1.05, the model may have discovered some new, tighter lower bound.

5. **Verify**: Inject candidate conjectures generated through symbolic regression into the Phainarete Project's PrimeClaw system. The Prover agent attempts formalized proof in Lean 4. Sentinel verifies the correctness of every reasoning step. If the proof passes, we obtain new mathematical lemmas; if it fails, the failure records are also stored in the knowledge graph.

### 4.3 What Is the Goal?

We must be honest: the probability of the ZetaHalt project proving or disproving the Riemann Hypothesis within 18 months is approaching zero.

This is not a plan to "solve the Riemann Hypothesis." This is a plan to "build infrastructure for studying the computational counterpart of the Riemann Hypothesis." Specifically, our 18-month goals are:

1. Build a log-domain stabilization simulator, generating high-quality state sequences for n ≥ 10^4
2. Train a Transformer model with in-distribution prediction accuracy > 99%
3. Extractat least one candidate mathematical invariant通过 interpretability methods
4. Record all attempts (including failures) as structured data and publish them openly

Failure records themselves are knowledge. In the history of mathematics, many major breakthroughs have been built on predecessors' systematic elimination of wrong paths. Lakatos, in *Proofs and Refutations* (《证明与反驳》), emphasizes that mathematical progress comes not only from correct proofs, but also from deep understanding of counterexamples and errors.

What ZetaHalt aims to become is precisely such a system: even if it cannot reach the summit, it will map detailed terrain for later arrivals, marking which paths have already been traversed and which cliffs must be avoided.

## 5. Philosophical Reflection: Proof, Understanding, and the Machine's "Cognition"

### 5.1 The Separation of "Knowing" and "Understanding"

In January 2026, Google DeepMind's Gemini model produced a proof in algebraic geometry that a Stanford professorevaluated as "if I had come up with this myself, I would brag about it for the rest of my life." But the logical chain of that proof was nearly impossible for humans to trace—it was "correct," but no one "understood" why it was correct.

This is the core of the fourth crisis of mathematics: machines produce truths that humans cannot understand.

Encoding the Riemann Hypothesis as a Turing machine further amplifies this problem. Suppose someone someday proves the value of BB(744), and this value precisely "proves" the Riemann Hypothesis—would we "understand" this proof?

### 5.2 Formal Verification as a Bridge

Our answer is: formal verification. Interactive theorem provers like Lean 4 have at their core a deterministic type checker that depends neither on probability nor on intuition, relying solely on axioms and inference rules. Any proof verified through Lean 4, regardless of whether it was originally generated by humans, AI, or a Turing machine, can be progressively decomposed, inspected, and understood.

This is why the PrimeClaw system designates "Sentinel" as the sole component that does not use probabilistic models. It must be rigid. It must not lie.

### 5.3 Why 744?

The number 744 itself carries a certain aesthetic significance.

It is not large—far smaller than theoretical estimates of the smallest "unknowable" state count in mathematics (possibly in the tens of millions or higher). It is also not small—far larger than BB(4)=107, which humans can currently exhaustively explore.

It precisely rests at the boundary between the light of human reason and Gödel's shadow.

For researchers in the formal sciences, this means: we need not reach infinity to touch the boundary of undecidability. We only need a 744-state Turing machine, and sufficient courage to face it directly.

## 6. An Invitation

ZetaHalt is a fully open-source project (MIT license). We welcome researchers from mathematics, logic, philosophy, and theoretical computer science to participate.

What you can do:
- Help verify the correctness of Matiyasevich's recursive formula;
- Formalize in Lean 4 the equivalence proof for the 29-register machine;
- Design better sequence models to predict state evolution;
- Or simply join this conversation—about what we, as finite rational beings, can do at the boundary between knowable and unknowable.

Hilbert said: "We must know, we will know." (Wir müssen wissen, wir werden wissen.)

A century later, perhaps what we need to add is:

**"We must know—that what we do not know is far more than we once thought. But this does not impede us from continuing to inquire, nor does it impede us from enjoying the inquiry itself."**

Because on that 744-state conveyor belt, every fridge door is a knocking.

And the knocking itself is already a kind of answer.

**References**

[1] Hilbert, D. (1900). Mathematische Probleme. *Nachrichten von der Königlichen Gesellschaft der Wissenschaften zu Göttingen, Mathematisch-Physikalische Klasse*, 253-297.

[2] Riemann, B. (1859). Ueber die Anzahl der Primzahlen unter einer gegebenen Grösse. *Monatsberichte der Berliner Akademie*.

[3] Schoenfeld, L. (1976). Sharper bounds for the Chebyshev functions θ(x) and ψ(x). II. *Mathematics of Computation*, 30(134), 337-360.

[4] Matiyasevich, Y. (2020). The Riemann Hypothesis in computer science. *Theoretical Computer Science*, 812, 49-65.

[5] Yedidia, A., & Aaronson, S. (2016). A relatively small Turing machine whose behavior is independent of set theory. *arXiv:1605.04343*.

[6] Matiyasevich, Y., O'Rear, S., & Aaronson, S. (2016). 744-state Turing machine that halts iff there's a counterexample to the Riemann Hypothesis. [Announcement on Shtetl-Optimized, May 30, 2016].

[7] Turing, A. M. (1937). On computable numbers, with an application to the Entscheidungsproblem. *Proceedings of the London Mathematical Society*, 2(1), 230-265.

[8] Gödel, K. (1931). Über formal unentscheidbare Sätze der Principia Mathematica und verwandter Systeme I. *Monatshefte für Mathematik und Physik*, 38, 173-198.

[9] Davis, M., Matiyasevich, Y., & Robinson, J. (1976). Hilbert's tenth problem: Diophantine equations: positive aspects of a negative solution. *Proceedings of Symposia in Pure Mathematics*, 28, 323-378.

[10] Lakatos, I. (1976). *Proofs and Refutations: The Logic of Mathematical Discovery*. Cambridge University Press.

---

**Project Links**

- Code repository: [https://github.com/Phaenarete-Project/ZetaHalt](https://github.com/Phaenarete-Project/ZetaHalt)
- Project homepage: [https://riemann.phaenarete.org](https://riemann.phaenarete.org) (under development)
- Contact: contact@liang.world

---

*Ang Li (李昂), founder of the Phaenarete Project, founder of Guangzhou Phaenarete AI Technology Co., Ltd. (广州菲娜睿特人工智能科技有限责任公司). Affiliate member of the American Philosophical Practitioners Association (APPA), research assistant at the Institut de Pratique Philosophique (France). Research interests include cognitive architecture, formal verification, philosophical practice (哲学践行), and foundational questions at the intersection of mathematics and computation.*

> **Copyright Notice**: This is a preview translation — Chinese original is the authoritative version. Copyright belongs to Guangzhou Phaenarete AI Technology Co., Ltd. Unauthorized reproduction, citation, or distribution is prohibited.