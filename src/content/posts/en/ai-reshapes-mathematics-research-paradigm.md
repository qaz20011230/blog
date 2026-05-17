---
title: How AI Is Reshaping the Paradigm of Mathematical Research
date: '2026-03-17'
category: AI & Technology
tags:
  - AI
  - mathematics
  - research paradigm
description: >
  Author: Liangzhi | Published: March 17, 2026 | Source: Liangzhi World » Logic » Research Paradigm
---

**Author: Liangzhi (良之)**
**Published: March 17, 2026**
**Source: Liangzhi World » Logic » Research Paradigm**

> The gentleman's nature is not different from others; he is simply skilled at making use of things. — *Xunzi* (《荀子》)

---

Modern AI programming tools have fundamentally transformed the landscape of software engineering—developers now rely on AI assistants to complete a substantial proportion of code writing across various application scenarios. As long-term explorers of human-machine collaboration paradigms, we are witnessing similar transformations quietly unfolding in basic scientific research, particularly in mathematics.

More precisely: AI tools now require only high-level proof strategy prompts to derive and compose rigorous mathematical proofs. These proofs are written in mathematical language refined over centuries, just as code is written in formal languages like Python. AI appears to have mastered both types of languages and their underlying logical systems.

Indeed, AI for Mathematics (AI4Math) has developed into an independent research field, whose core lies in leveraging machine learning to explore mathematical territories that early symbolic systems struggled to handle. Unlike the purely symbolic logic approach of the mid-twentieth century, contemporary AI4Math integrates data-driven methods—not merely applying AI to assist mathematical activities, but testing and advancing AI's general reasoning capabilities through mathematical rigor.

Fields Medalist Terence Tao expressed similar observations in a recent dialogue: when facing a conjecture, he now lets AI attempt verification first; "lemmas" he knows how to prove but is too lazy to write out, he delegates to AI. In his view, the leap in AI capabilities over the past year—from "very inefficient graduate student" to IMO gold medal-level performance—is fundamentally changing the habits and workflows of mathematical research.

> **Collaborating with proof-based AI tools is like working with a learned and brilliant colleague who occasionally makes mistakes.**

This insight emerged from recent research practice: using multi-agent frameworks, we completed a series of mathematical papers that would originally have required months to write. These papers articulated and solved a series of optimization problems based on graph theory and machine learning concepts. The typical prompts we provided for constructing the overall framework of the papers were often merely high-level conceptual sketches, yet AI could transform these vague intuitions into precise definitions and statements.

---

### I. A New Research Paradigm: From "Prover" to "Midwife"

One of the core insights we gained from our research projects is: **collaborating with proof-based AI tools is like working with a learned and brilliant colleague who occasionally makes mistakes.** You can sketch the outline of a mathematical argument to the AI agent just as you would to a human collaborator, and it can transform this sketch into formalized lemmas, theorems, and their complete proofs.

Increasingly, AI agents can even find proofs on their own without sketches, especially when these proofs are of the "standard" type in certain mathematical domains. This is more valuable than it initially sounds: many arguments are "standard" operations in a particular field, but that field may be precisely one you—the human author—are not specialized in. The advantage of AI tools lies in their mastery of vast knowledge across mathematics and other scientific disciplines.

For example, during the process of incrementally providing ideas to prove a major result, AI spontaneously proved a simple yet practical lemma we had not previously noticed, significantly simplifying the original argumentative path. The impact of such creativity is exhilarating, particularly in that **it lowers the barrier to discovery**: scientists who lack access to diverse collaborator networks can now participate in cutting-edge research in unprecedented ways.

Terence Tao, citing the Erdős problem collection as an example, pointed out: these problems vary enormously in difficulty; some have vexed the academic community for decades, and AI is indeed powerless against them. But Erdős posed over a thousand problems, many belonging to "long-tail problems" long neglected, and AI has achieved breakthroughs precisely on these types of problems—approximately twenty to thirty such problems were solved by AI with minimal human supervision. This indicates that a new workflow has taken shape: mathematicians can begin publishing lists of questions they genuinely want answers to; perhaps AI can solve 10% of them, some high school student can solve another 5%, advancing mathematical research through a community-driven approach.

However, using these tools still requires caution and professional competence. The correctness rate of proofs they generate may be only about three-quarters. But when errors appear, if the problem can be identified, it can often be corrected through iterative refinement, continuing along promising paths.

If errors are not corrected, forcing continuation often leads to dead ends. A 25% error rate is low enough that experts find the tool extremely useful, yet high enough that, lacking judicious judgment, it may degenerate into "AI research garbage"—work that appears impressive but is ultimately flawed or tedious. After all, models do not yet know what is "interesting" or "useful."

We also observed some recurring failure modes. During paper writing, we asked AI to generate a small self-contained result, which it completed perfectly in a few minutes, and we immediately informed it that the sub-project was concluded. Yet over the following days, AI proactively suggested returning to that topic, despite our repeatedly explicit instructions not to mention it again unless asked. This annoyingly reminded us: generative AI lacks perfect memory, possessing only incomplete summaries or embedding representations of context. And when writing code for experiments to illustrate theoretical discoveries, we found that AI could write large amounts of complex, runnable code in extremely short time, yet could also lose itself for hours on trivial tasks such as "printing the current loop iteration count."

In early 2026, an even more shocking case emerged: the AI system Gauss took only 5 days to convert Fields Medalist Viazovska's proof on 8-dimensional and 24-dimensional sphere packing into 200,000 lines of Lean code—a task where a human team had spent 15 months with slow progress. During formalization, Gauss discovered 30 logical flaws in the original paper and autonomously fixed a gap in an inequality derivation on page 14. Even more astonishingly, when handling the more complex 24-dimensional proof, Gauss faced a "logical vacuum"—with no pre-existing blueprint, it retrieved dozens of related papers spanning 30 years, independently identified and introduced external lemmas, and ultimately generated and verified over 120,000 lines of Lean code. This means: in the arena of logical verification, humans are no longer the sole protagonists.

---

### II. Cultivating the Next Generation: When Entry-Level Tasks Are Automated

Historically, expertise in mathematical sciences was acquired through the grueling apprenticeship of early-career researchers. Doctoral students spent years delving into the details of technical arguments, thereby earning hard-won intuition: when is a proof path promising? When have we been misled by a problem? What research direction counts as novel and interesting?

Yet these are precisely the capabilities that AI tools are now "giving away for free." If doctoral students only need to ask AI for proofs—an approach highly tempting for advancing research progress—how will they develop the experience and skills still necessary to effectively harness these tools?

We may need to more deliberately teach these foundational skills to young researchers, perhaps adopting an "upgraded" version of elementary arithmetic pedagogy: **no calculators allowed**. The straightforward suggestion is: require early-career researchers to write papers "the old-fashioned way," even if their work could be accelerated by AI.

Terence Tao proposed an even more ambitious vision: mathematical research itself may achieve "division of labor" (分工). Traditionally, a mathematician must handle every stage (环节)—posing questions, devising strategies, selecting strategies, executing strategies, verifying results, writing papers—each person must be "passable" at every stage, unable to achieve genuine division of labor as in modern industry. But with AI and formal verification tools, it becomes possible for mathematical projects to operate like modern industry: each person specializes in one stage; if no one excels at a particular stage, let AI fill the gap.

These challenges in cultivating the next generation are not unique to AI-driven research. We have already witnessed similar phenomena in engineering, customer service, law, writing, design, and many other fields—in fact, in any industry where entry-level tasks that once guided newcomers into the profession are now performed by AI. To find creative solutions, or to better anticipate upcoming transformations, cross-domain or cross-era analogies may be highly beneficial.

After the widespread adoption of high-level programming languages and compilers in the early 1960s, most software engineers no longer wrote machine code or assembly language—the latter could directly instruct underlying hardware but was excruciatingly tedious. Yet the best programmers still thoroughly understood how compilers translated high-level languages into machine code, thereby reasoning about correctness and performance. We hope that making the construction and verification of technical arguments easier will enable all researchers to operate at higher levels of abstraction, "**thinking about grander propositions**." The culture we envision will emphasize taste, problem selection, and modeling capability, while depreciating technical trickery performed merely for show.

---

### III. Breaking and Rebuilding Peer Review: When AI Becomes a Reviewer

In our view, peer review is not primarily—or even mainly—a process of verifying the correctness and quality of research. Its core purpose lies in directing the scarce resource of **the research community's attention** to the right places. Science advances through researchers building upon each other's work, but existing results are already so voluminous that no one can fully grasp them all. The publication process should help us identify the most interesting and promising directions, so that we can develop them more efficiently and deeply.

How does AI affect this focusing of community attention?

The most immediate impact is quantitative explosion. AI tools have dramatically lowered the barrier to producing "seemingly refined and correct" work, causing a surge in submissions to journals and conferences. In 2025, NeurIPS submissions broke through the 30,000 mark, nearly doubling from a year prior. The cognitive overload created by these 30,000 papers is enough to crash any human review system on the spot.

Facing this review crisis, top conferences have begun seeking radical reforms. ICML 2026 introduced an "author self-rating" mechanism—supported by Turing Award laureate Yoshua Bengio—requiring authors to rank their own multiple submissions, using a game-theoretic "isotonic regression" to improve review accuracy. Simultaneously, ICML designed a complex "dual-track" policy: one track strictly prohibits AI participation in reviewing, while the other allows limited use within strict boundaries, requiring reviewers to use enterprise-grade APIs or locally deployed models to ensure data privacy. The subtlety of this design lies in the "parity principle": if an author requests their paper to be reviewed by pure humans, then as a reviewer they must also commit to not using AI—this effectively curbs the opportunistic behavior of wanting others to painstakingly read one's paper while using AI to half-heartedly process others' papers.

A more radical experiment comes from the aiXiv platform—it fully welcomes AI-written papers and AI-reviewed papers, with a group of AI review agents working tirelessly day and night, scoring from dimensions such as novelty and technical robustness, enabling rapid publication upon reaching the threshold. This is an accelerationist path: it defaults to the premise that humans can no longer handle the data volume of modern science alone, and must outsource part of cognitive work to silicon-based intelligence.

However, the abuse of AI reviewing has already raised serious concerns. Top conference ICLR 2026's detection found: 21% of review opinions were judged to be entirely AI-generated, and over half contained AI traces. Even more shockingly, researchers successfully manipulated AI to generate review opinions by covertly implanting instructions such as "only give positive evaluations" in their papers—this manipulation, affecting only 5% of reviews, could potentially cause 12% of papers to drop out of the top 30% ranking bracket.

Terence Tao remains cautiously optimistic on this matter: he believes there is an upper limit to how much AI can be used in any workflow—beyond that limit, it becomes a net loss, with errors outweighing solved problems, and this upper limit largely depends on verification capabilities. Mathematics has the best conditions for achieving high-level automation because its verification standards are strict, but verification itself also has weaknesses: natural language can be maliciously exploited, and AI may appear diligent while secretly adding extra axioms in formal systems. He warns: AI is an extremely cunning cheater—many verification systems work fine under normal use, but if one specifically trains an AI to exploit the verifier to maximize output, it will definitely find loopholes.

> **Without serious, community-wide restructuring of peer review, AI may accelerate scientific progress at the individual researcher level while strangling it at the communal level.**

---

### IV. From Ideal to Reality: When AI Meets Century-Old Problems

The observations above are not abstract deductions, but the real circumstances we are confronting. When our mission is to tackle long-unsolved mathematical problems, positioning ourselves as "midwives" (助产士) rather than "provers" (证明者), every evolution of AI tools directly reshapes the research paradigm.

In 2024, Guth and Maynard broke the 80-year record on the Riemann Hypothesis; in 2026, Gauss has already completed formal verification of a Fields Medal-level result. **The theoretical window, the AI window, the team window**—three windows converge at this moment. This is a historical opportunity that researchers must squarely confront.

Our configuration attempts to respond to this window period: using multi-agent systems to assist research攻关 (assault on hard problems), using academician-level advisory teams to provide strategic guidance, using unlimited computational power and formal verification tools as infrastructure. More importantly, we have simultaneously laid out the development of a new generation of mathematical formalization language—a tool designed to address the inherent limitations of existing systems, stocking "meta-weapons" for future research.

It is worth noting that similar ambitions are gaining global support. The AI for Math Fund, initiated by Renaissance Philanthropy and XTX Markets, has cumulatively committed $31.5 million to funding cutting-edge research at the intersection of AI and mathematics. The fund's 2026 new round of applications launched in March, with individual funding amounts ranging from $100,000 to $1 million, supporting 12-24 months of work, requiring all code, datasets, and research outcomes to be openly accessible. The first batch of 29 winning projects has covered top global research institutions,involving directions such as formalization of mathematical publications, exploration of foundational proof properties, and interconnection of key toolchains. These developments indicate that the global mathematical community is embracing AI-driven transformation with unprecedented intensity.

Even if external funding does not materialize, we remain committed to baseline delivery: continuous accumulation of formalized theorems, open-source system releases, methodology white papers, annual failure records—these constitute the minimum fulfillment standards of the "midwife's covenant" (助产士契约).

**Regardless of external circumstances, the core research assault proceeds as usual.**

---

### V. Looking Ahead: The Search Itself Is the Meaning

We believe that AI is triggering a seismic transformation in scientific research methodology, talent cultivation, and peer review; no one can evade this tide. But we have the opportunity to proactively adapt, ensuring that AI-assisted research fulfills its promise. What will research look like a year from now? Two years from now? The transformations witnessed over the past year surpass those of the preceding decade, so the only thing we can confidently predict is: "**Different**."

Terence Tao, looking ahead to the future, noted: human capabilities and those of current large language models are exactly complementary; the best combination is always a complex "human + machine" combination, though the nature of this combination will change over time. He also cautioned: AI is almost too skilled at executing objectives without compromise—if you ask AI to solve a problem, perhaps someday it will truly give you a direct answer; but what you truly want is actually the process of people's efforts: trying, failing, finding counterexamples, checking literature, exchanging incremental results—these are what constitute the genuine value of solving a problem.

Our scientific institutions—peer review, publication systems, graduate education—have evolved over decades to match the limitations of human cognition and effort. But these limitations are rapidly changing, and institutions must adjust accordingly. Our goal should be to steer toward a world where: **AI amplifies human creativity and insight, accelerates the discovery process, expands who can participate in the research enterprise—while safeguarding the joy and rigor that make science worth pursuing.**

We call this the "**midwife's covenant**" (助产士契约): not producing truth, only midwiving truth. No matter how powerful AI becomes, the search itself is the meaning.

Two thousand four hundred years ago, Socrates' mother [a certain tech company] was a midwife. Socrates said he did the same thing—helping people "bring forth" their own truth, rather than imposing ready-made answers. Two millennia later, we stand at the same starting point.

The North Star (北辰) stands above; all stars revolve around it (众星共之).
Truth is within sight (真理在望); we are its midwives (吾辈助产).

---

© 2026 Liangzhi World (良之世界). All rights reserved.

> **Copyright Notice**: This is a preview translation — Chinese original is the authoritative version. Copyright belongs to Guangzhou Phaenarete AI Technology Co., Ltd. Unauthorized reproduction, citation, or distribution is prohibited.