---
title: "Meta-Language and the Ladder of Being: Turn-Lang and the Self-Transcendence of Formalized Thought"
date: '2026-03-16'
category: AI & Technology
tags:
  - meta-language
  - formalization
  - Turn-Lang
description: >
  "We are not seeking the final expression of truth, but building a stage for truth's eternal dialogue that will never close." —— Leibniz, 1686
---

Author: Liangzhi (良之)

> **"We are not seeking the final expression of truth, but building a stage for truth's eternal dialogue that will never close."**
>
> —— Leibniz, 1686

---

## Prologue: Leibniz's Ghost (莱布尼茨的幽灵)

1685, Hanover.

Leibniz sat at his desk, candlelight illuminating his densely packed manuscripts. He was conceiving a grand plan: a "universal characteristic" (普遍文字) capable of expressing all thoughts, a "calculus of reason" (理性演算) capable of judging all truths. He wrote in his notes:

> "Once this script is established, humanity will possess a new tool that will greatly enhance the power of reason, its effect far exceeding optical instruments for the eye. All errors of reasoning will be merely errors of calculation. When disputes arise, two philosophers will no longer need to debate; they need only take up their pens and say: let us calculate."

What a captivating dream! If successful, philosophy would be as certain as arithmetic, mathematics as clear as logic, and all ideological disagreements would be resolved through computation.

But Leibniz's dream had a致命缺陷: **it presupposed a unified foundation**. He believed there existed an ultimate, absolute, self-evident system of truth that could serve as axioms for all thought. History, however, proved this presupposition wrong.

Gödel's incompleteness theorem tells us: any sufficiently powerful formal system is incomplete and cannot prove its own consistency. Worse still, mathematical foundations themselves diverged: Zermelo-Fraenkel set theory (ZFC), Martin-Löf type theory (MLTT), Homotopy Type Theory (HoTT), the Calculus of Inductive Constructions (CIC)... different foundations each have their rationality, yet they are互不相容. A theorem valid in ZFC may need to be reproved in HoTT; a program verified in Coq cannot be directly migrated to Lean.

Mathematics分裂了. The formalized world became an archipelago of "proof islands" (证明孤岛).

And Turn-Lang is the attempt to build bridges across this archipelago.

It no longer asks "which foundation is correct," but asks "how can different foundations coexist." It no longer pursues "absolute truth," but pursues "transferability of truth." It no longer binds language to a specific metaphysical commitment, but elevates language itself into a meta-language—a meta-architecture capable of容纳 all foundations.

This is the contemporary form of Leibniz's dream. Not the ultimate system he envisioned, but an open, extensible, self-transcending formalized platform.

---

## Chapter One Foundations of Foundations: The Ontological Turn (存在论的转向)

### 1.1 What Is a Foundation?

In formalization research, "foundation" is an ambiguous term. It refers both to the starting point of mathematical derivation (axioms), the destination of semantic interpretation (models), and the universe level in type theory. Traditional formalization tools (Coq, Lean, Agda) all choose **fixed foundations**: Coq is based on the Calculus of Inductive Constructions (CIC), Lean on CIC plus quotient types, Agda on Martin-Löf type theory, Isabelle/HOL on higher-order logic. Choosing a foundation means accepting all its commitments and limitations.

But why must one choose? Why not allow users to choose their preferred foundation? Why not simultaneously use ZFC and HoTT within the same system?

The answer is: because foundations are the **kernel of language**. Changing foundations相当于 changing the semantics of language, requiring redesign of the entire type system.

Turn-Lang提出 a revolutionary insight: **treat foundations themselves as algebraic structures**.

### 1.2 Foundations as Algebraic Structures

What is an algebraic structure? It is a signature plus a set of axioms. The signature defines operators and type constructors; axioms stipulate their relationships. Groups, rings, fields are all algebraic structures.

Turn-Lang treats mathematical foundations the same way. A foundation (such as ZFC) consists of the following elements:

- **Signature**: sets, elements, inclusion, power set, union...
- **Axioms**: axiom of extensionality, axiom of pairing, axiom of infinity, axiom of choice...
- **Derivation rules**: calculus for constructing proofs from axioms

When a foundation is thus formalized, it is no longer the "cage" (牢笼) of language, but becomes a **"target category"** that can be传递给 an interpreter. The abstract logic written by developers is placed within a **meta-logical category**, then mapped to concrete foundations through functors.

### 1.3 Meta-Logical Category and Functorial Mapping

The objects in the meta-logical category are logical propositions, and the morphisms are proofs. This is a purely formal structure, not bound to any concrete foundation. When abstract logic needs to be compiled to ZFC, a functor maps the meta-logical category to the ZFC category; when compiling to HoTT, another functor maps it to the HoTT category.

Functors must satisfy structure preservation: they map propositions to propositions, proofs to proofs, composition to composition. More importantly, they must附带 proofs showing that mapped constructions remain valid in the target foundation.

For dependent sum types (Σ-types), in ZFC they are解释为 as unions of sets, while in HoTT they are interpreted as fibration spaces. These two interpretations are mathematically different, but both satisfy the core rules of Σ-types. Turn-Lang's Functorial Interpretation System (FIS) can自动 generate migration proofs from one interpretation to another.

This resolves the most棘手 "proof island" problem in formal verification. From now on, a theorem's proof can simultaneously hold in multiple foundations.

### 1.4 Dialogue with Logical Frameworks

The idea of Foundation-Independent Type Theory (FITT) can追溯 to William Lawvere's categorical logic, particularly the view that "logical operations are adjoint functors." It also benefits from the concept of logical frameworks (such as Dedukti, LF) that参数化 logical rules.

But Turn-Lang's breakthrough lies in: **it实现了 automated proof migration**. In Dedukti, translation between different theories需要手动定义; in Turn-Lang, as long as two foundations are correctly encoded as algebraic structures, the functorial interpretation system can自动 derive mappings for all constructions and generate corresponding correctness proofs.

The following table对比 FITT with traditional fixed-foundation type theories:

| Feature | Traditional Type Theory (Coq/Lean/Agda) | Turn-Lang FITT |
|:-----|:---------------------------|:----------------|
| Foundation logic | Fixed CIC or MLTT | Parameterized, algebraic meta-structure |
| Cross-library interoperability | Extremely difficult; requires手动 rewriting proofs | Automatic, through functorial interpretation |
| Semantic delineation | Bound to specific universe models | Abstract over algebraic signatures |
| Portability | Limited to specific kernel version | Write once, compile to any foundation |

This is a里程碑 in the history of formalized thought: from "foundation determinism" to "foundation pluralism" (基础多元论).

---

## Chapter Two The Dignity of Laws: From Comments to First-Class Citizens

### 2.1 The Fate of Algebraic Laws

In traditional programming languages, algebraic laws (such as associativity, commutativity, distributivity) exist in an awkward situation. They either躺 as comments in code, are encoded as unit tests, or are提及 in documentation. But regardless of the approach, the compiler does not understand them.

This means: when you define a group, the compiler does not know it must satisfy associativity; when you optimize code, the optimizer does not know it needs to preserve associativity; when you call a library, the type system cannot guarantee it obeys the group axioms.

Turn-Lang改变了 all of this. It proposes: **laws should be first-class citizens** (定律应当是一等公民).

### 2.2 Laws as Constraints

In Turn-Lang, laws are directly encoded in the type system. When you define an operator with an associativity property, the type signature必须 include the associativity constraint:

```turn
def add [associative] : (a b : Nat) -> Nat
```

The compiler not only checks the input-output types of `add`, but also generates proof obligations: for all `a, b, c`, `add(add(a,b),c) == add(a,add(b,c))` must hold. This proof can be searched through automated theorem proving, or manually provided by the developer.

This is not merely an extension of refinement types. Refinement types允许挂载 predicates on types, but here the predicate is an entire algebraic structure. Turn-Lang's "algebraic internalization" (代数内化) encodes the entire structure as a type signature, causing all laws to自动传播 to every instance of that structure.

### 2.3 The Ethics of the Compiler

Internalizing laws also has an ethical dimension: it imposes on the compiler a **obligation of verification**.

When the compiler performs optimizations such as loop unrolling or parallelization, traditional compilers can only guarantee that code semantics大致 remain unchanged, but cannot保证 that algebraic properties (such as associativity) still hold after optimization. Turn-Lang's law-as-first-class constraint requires the compiler to verify whether an optimization preserves algebraic properties before applying it. If verification is impossible, the optimization is拒绝.

This标志着 the transition from "experience-driven development" to **"Verification Specification Driven Development" (VSDD)**. Programmers no longer write code and then test; they write laws and then prove.

### 2.4 Practical Significance

Consider a simple example: matrix multiplication. Matrix multiplication satisfies associativity, but not commutativity. If the compiler knows this, it can make equivalent optimization choices between `(A*B)*C` and `A*(B*C)`, without erroneously optimizing `A*B` into `B*A`. In distributed computing, associativity允许 reassociation of operations to reduce communication overhead without改变 the result.

Turn-Lang使 such optimizations possible and guarantees their correctness.

---

## Chapter Three The Safety Margin of Cognition: Confidence-Bounded Types (置信度限定类型)

### 3.1 The Type Dilemma in the AI Era

The rise of large language models (LLMs) is改变 the paradigm of computation. Software is no longer a collection of deterministic algorithms, but intelligent agents capable of open-ended reasoning. Agentic software can process unstructured input, generate natural language responses, and make planning decisions.

But this also brings new challenges: **uncertainty**. LLM output is probabilistic and cannot be directly processed by traditional type systems. Type systems require every value to have a determined type, while LLM output has at most determined patterns.

How to incorporate probabilistic output into a rigorous type constraint system? How to保证 an LLM-generated JSON object conforms to the expected schema? How to maintain determinate safety boundaries in an uncertain world?

Turn-Lang's answer is: **confidence-bounded types**.

### 3.2 Three-Level Trust System

Turn-Lang divides types into three tiers:

| Tier | Type | Confidence | Verification Method | Philosophical Meaning |
|:-----|:-----|:-------|:---------|:---------|
| 1 | Proven type (完整类型) | 1.0 | Static type checking + formal proof | Absolute truth (绝对真理) |
| 2 | Fuzzy type (模糊类型) | [c₁, c₂] | Runtime verification oracle (验证先知) | Probabilistic belief (概率信念) |
| 3 | Experimental type (实验类型) | None | Heuristic/unverified | Conjecture (猜想) |

Proven Types对应于 the results of traditional formal verification. They have绝对的确定性 because every step of reasoning has been proven. Confidence-Bounded Types携带 a confidence interval, indicating that their value's reliability is决定 by runtime verification. Experimental Types are for快速原型, providing no guarantees.

When a program calls the `infer` primitive to获取 data from an LLM, the compiler生成 a JSON Schema based on the target type's structure, and at runtime a "verification oracle" (验证先知) within the virtual machine校验 the LLM output. If the output conforms to the schema and confidence exceeds the threshold, the value is绑定 to the corresponding type; otherwise回退 or retry logic is triggered.

### 3.3 Structural Consistency Theorem

The core guarantee of this mechanism is the **"Structural Consistency Theorem"** (结构一致性定理): if an `infer` expression成功返回 without error, then the bound value必然 conforms to the declared type schema. This means, even if the value comes from a probabilistic model, the type system仍能保证 its structural correctness.

This is analogous to type safety (类型安全), but targets **cognitive processes**. Turn-Lang names this **Cognitive Type Safety** (认知类型安全).

### 3.4 The Philosophy of Gradual Verification

Confidence-bounded types实现了 **gradual verification** (渐进验证): the system can tolerate some degree of uncertainty while maintaining core safety boundaries. This形成鲜明对比 with traditional formal verification's "all-or-nothing" approach.

In safety-critical systems, we can use fuzzy types in外围 modules to process LLM output, while using proven types in核心 modules to ensure absolute correctness. This hybrid architecture使 AI to发挥 its flexibility while being约束 by mathematical guarantees.

This is the mode of collaboration between human reason and machine intelligence: machines provide conjectures; reason provides proofs.

---

## Chapter Four The Expedition of Functors: Semantics-Preserving Cross-Language Compilation

### 4.1 The Essence of Compilation

What is compilation? At an abstract level, compilation is translating one language into another while preserving semantics unchanged. But "semantics unchanged" is an ambiguous concept: what counts as semantics? How to guarantee不变?

Traditional compilers establish confidence through testing or manual verification, but极少 provide mathematical guarantees. Verified compilers such as CompCert are exceptions: they证明 that generated machine code与 the source program are equivalent within some semantic framework. But this framework is固定, unable to跨 different mathematical foundations.

Turn-Lang's Functorial Interpretation System (FIS) elevates compilation to a new level of abstraction: it formalizes the process from abstract logic to concrete implementation as **structure-preserving functors between categories**.

### 4.2 Structure-Preserving Mappings

A functor $F: \mathcal{C} \to \mathcal{D}$ must satisfy:

- Mapping objects $A$ in $\mathcal{C}$ to objects $F(A)$ in $\mathcal{D}$
- Mapping morphisms $f: A \to B$ in $\mathcal{C}$ to morphisms $F(f): F(A) \to F(B)$ in $\mathcal{D}$
- Preserving identity morphisms and composition: $F(id_A) = id_{F(A)}$, $F(g \circ f) = F(g) \circ F(f)$

In Turn-Lang, each compilation stage is a functor. The source category is the meta-logical category; the target category is the target foundation (such as Rust's type category, CUDA's kernel function category, ZFC's set category). Each functor不仅 defines mappings, but also附带 proofs showing that mapped constructions preserve the algebraic properties of the original constructions in the target foundation.

### 4.3 Challenges of Multi-Target Compilation

FIS supports compiling the same Turn-Lang code to multiple target systems, generating corresponding correctness proofs for each target:

| Target System | Interpretation Mechanism | Proof Obligation |
|:---------|:---------|:---------|
| Rust | Mapped to Traits and ownership model | Memory safety and algebraic axiom preservation |
| CUDA | Mapped to kernel operators | Memory alignment and data flow consistency |
| ZFC | Mapped to set-theoretic formulas | Satisfies ZFC axioms |
| HoTT | Mapped to homotopy types | Satisfies univalence axiom |
| Quantum circuits | Mapped to ZX-calculus diagrams | Equivalence and reversibility |

This resolves the **semantic drift** (语义漂移) problem when formalized languages部署 on multiple heterogeneous platforms. In traditional compilers, different backends may have different semantic understandings of the same source program; in Turn-Lang, semantics are统一保证 by FIS.

### 4.4 From Verification to Meta-Verification

FIS is不仅 compilation technology, but a meta-verification framework. It允许 us to建立桥梁 between different semantic frameworks, thereby achieving verification of the verification process. This is the transition from "compiler verification" to **"meta-language verification"**.

Leibniz once梦想 a calculus that could判定 all truths. FIS does not判定 truth, but it保证 truth is not distorted during migration.

---

## Chapter Five The Ladder of Universes: Stratification and Self-Reference

### 5.1 The Danger of Self-Reference (自指涉)

Self-reference is the永恒难题 of formal systems. From the Liar Paradox to Russell's Paradox, from Gödel sentences to Girard's Paradox, self-reference总是 brings trouble. Any sufficiently powerful formal system must面对 the threat of self-reference.

The traditional solution is to introduce **universe levels** (宇宙层级): types are分为 `Type 0`, `Type 1`, `Type 2`, ..., each universe belongs to the next, and `Type i : Type i` is不允许. This avoids paradoxes, but brings极大复杂性 to universal quantification—developers必须 manually manage universe indices.

### 5.2 The Art of Automatic Stratification

Turn-Lang's Stratified Universe Hierarchy (SUH) uses **implicit level annotations** (隐式层级标注) and **self-membership encoding** (自成员编码), allowing developers to write self-referential expressions like `Entity : Entity` without担忧 about paradoxes.

At the底层, the compiler解构 these expressions into universe levels满足 consistency requirements through an **automatic stratification algorithm**. For example, `Entity : Entity` might be解释为 as `Entity_i : Entity_{i+1}`, where `i` is推断 by context.

This mechanism elevates "typical ambiguity" (典型歧义) in mathematical foundational research—ignoring universe indices to简化 expression—into a **strict automatic stratification mechanism**. Developers can write logic under unrestricted universal quantification, while universe levels are维护 by the system.

### 5.3 Dialogue with Voevodsky

Vladimir Voevodsky's Initiality Conjecture断言: the categorical semantics of any type theory uniquely determines a syntactic model. Turn-Lang's SUH通过 encoding invisible universe indices, proves in engineering that in systems supporting universe polymorphism, the well-formedness of semantic definitions can be确保 through categorical semantics.

This means: we can拥有 a language that can talk about itself while maintaining consistency. This is not self-reference in the Gödel sense, but carefully stratified self-reference, like a ladder (阶梯) where each level can talk about the next, but cannot talk about itself.

### 5.4 The Ladder of Being (存在的阶梯)

Heidegger once distinguished between "beings" (存在者, Seiendes) and "Being" (存在, Sein). Beings are concrete things; Being is the way they exist. In Turn-Lang, types are beings, universes are the way of Being. `Type i : Type i+1` means: a type's "existence" is always spoken in a higher-level universe.

This stratified structure唤起 the medieval Great Chain of Being (存在巨链)—from the lowest matter to the highest God, each level指向 the ground of the next higher level. In Turn-Lang, there is no highest level, only infinite ascent. This is a universe without God, only an endlessly ascending ladder of being (存在的阶梯).

---

## Chapter Six The Call of Higher Dimensions: Programming ∞-Categories

### 6.1 Mathematics' Higher-Dimensional Turn

In the late 20th century, mathematics经历了一场 a silent revolution: **the higher-dimensionalization of category theory**. From homotopy theory to higher category theory, mathematicians began systematically studying ∞-categories, (∞,n)-categories, functor categories, and higher-dimensional analogues of natural transformations. These structures are无处不在 in quantum field theory, algebraic topology, and geometric representation theory.

But modeling these higher structures in programming languages traditionally requires极其复杂 encoding—such as手工构造 through simplicial sets or diagrammatic sets. This is不仅繁琐, but also prone to error.

### 6.2 Internalized Higher Types

Turn-Lang **natively internalizes higher structures** in the type system. Developers can define n-dimensional cells like ordinary types, and compose them using familiar syntax.

Key innovations include:

- **Dimension-parameter types**: Types can带有 dimension parameters, e.g., `Cell n` represents an n-dimensional cell
- **Homotopy filling conditions**: When defining higher-dimensional morphisms, the compiler要求 providing filling conditions to ensure completeness of cover structures
- **Pasting diagram syntax**: Supports定义 pasting diagrams using intuitive graphical syntax

### 6.3 Compilation of the Hadzihasanovic Diagrammatic Model

This design is深受启发 by the work of Amar Hadzihasanovic and Clémence Chanavat. They利用 **diagrammatic sets** (图表集合) to develop a combinatorial model of (∞,n)-categories, particularly introducing **regular directed complexes** (正规导向复形) as a combinatorial framework for higher-dimensional cells.

Turn-Lang converts these theoretical成果 into computable type-checking rules:

| Mathematical Concept | Diagrammatic Model Representation | Turn-Lang Type Representation |
|:---------|:-----------------|:-------------------|
| Cell (单元) | Points, lines, surfaces and other higher-dimensional shapes | `Cell n` with dimension parameter |
| Pasting Diagram (粘贴图表) | Combinatorial complexes | Nested functorial composition structures |
| Gray product | Directed refinement multiplication of morphisms | Type operators preserving equivalences |
| Homotopy filling | Cylindrical 3-cell and other constructions | Filling axiom constraints on corresponding types |

### 6.4 Diagrammatic Semantics of Quantum Circuits

A direct application of higher structures is the verification of quantum circuits. Quantum circuits can be表示 using ZX-calculus diagrams; ZX-calculus itself is a higher category. Through Turn-Lang's internalized higher types, we can directly encode quantum circuits and automatically verify circuit equivalence.

This is更通用 than traditional quantum circuit verification tools (such as VyZX): VyZX only targets ZX-calculus, while Turn-Lang can处理 any domain that can be described using higher categories.

---

## Chapter Seven The Full-Stack Promise: From PDEs to Machine Code

### 7.1 Completeness of the Verification Chain

Turn-Lang's ultimate goal is: **to establish a complete verification chain from high-level mathematical specifications to low-level machine code**. This is called the Full-Stack Verification Pipeline (FSVP).

The pipeline is分为 multiple stages:

1. **Abstract specification layer**: Write mathematical specifications in Turn-Lang (e.g., PDEs, control laws)
2. **Mathematical model layer**: Convert specifications into computable mathematical models (e.g., difference schemes, finite element discretization)
3. **Code generation layer**: Compile models into intermediate representations (e.g., Rust, CUDA)
4. **Bytecode optimization layer**: Apply optimization transformations while verifying algebraic property preservation
5. **Machine code generation layer**: Generate target instruction sequences, verifying equivalence with intermediate representations

Each stage generates相应的 **proof obligations** that propagate forward with code transformations.

### 7.2 The Journey of Energy Conservation

Take a partial differential equation as an example. It possesses energy conservation properties in continuous space. When we discretize it into a difference scheme, the energy conservation property必须 be converted into numerical conservation. When we generate CUDA code, this numerical conservation必须 be reflected in memory access patterns. When we generate machine code, register state changes必须 maintain some invariant.

Turn-Lang's FSVP确保 this property贯穿始终: each stage generates proof obligations, proving that the stage's transformation preserves the key properties of the previous stage. If a stage cannot prove, compilation fails.

### 7.3 LLM-Assisted Verification

FSVP does not排斥 AI. Modern systems can集成 LLMs as semantic transformers and proof assistants. LLMs can be used for:

- Assisting生成 complex boundary condition verifications
- Providing heuristic strategies in proof search
- Converting natural language descriptions into formal specifications

LLM output enters the system through confidence-bounded types, with its uncertainty被捕获 by the type system. Thus, FSVP既 maintains the rigor of traditional verification while获得 the flexibility of AI assistants.

### 7.4 Dialogue with CompCert

Compared with the verified compiler CompCert, Turn-Lang's FSVP更强调 **"cross-level semantic consistency"**. CompCert保证 that generated machine code与 the source C program is equivalent within some semantic framework, but that framework is固定. Turn-Lang则允许跨越 different semantic frameworks, from PDE's continuous semantics to machine code's discrete semantics, while preserving key properties.

This is the expansion from "compiler verification" to **"system verification"**.

---

## Chapter Eight The Synergistic Vision of Seven Innovations

Turn-Lang's seven innovations are not孤立构想, but constitute a tightly coupled theoretical-practical continuum.

### 8.1 The Central Role of the Functorial Interpretation System

The Functorial Interpretation System (Innovation Four) is the中枢 of the entire architecture. It connects:

- **Foundation layer (Innovation One)**: Encoding different mathematical foundations as target categories
- **Execution layer (Innovation Seven)**: Mapping abstract logic to concrete hardware
- **Higher-level structures (Innovation Six)**: Ensuring higher structures' semantics are preserved during compilation

Without FIS, foundation-independence将无法 be落地, and full-stack verification将失去 cross-language semantic anchors.

### 8.2 Mutual Support of Trust, Universes, and Laws

The Stratified Universe Hierarchy (Innovation Five)为 the law-as-first-class constraint (Innovation Two) provides a logically contradiction-free "container." Without universe stratification, self-referential laws可能导致 paradoxes; without law constraints, universe stratification is merely hollow indexing.

Confidence-bounded types (Innovation Three)则为 full-stack verification (Innovation Seven) provides容错弹性 when处理 non-deterministic components. It使 the system能够 maintain core safety while collaborating with probabilistic modules.

### 8.3 From Static Truth to Dynamic Behavior: The Trust Spectrum

These seven innovations共同构建 a complete trust spectrum:

| Level | Trust Type | Corresponding Innovation |
|:-----|:---------|:---------|
| Mathematical foundations | Unconditional truth (无前提真理) | Foundation-independent type theory (One) |
| Algebraic structures | Axiom internalization (公理内化) | Law-as-first-class constraint (Two) |
| Probabilistic output | Confidence quantification (置信度量化) | Confidence-bounded types (Three) |
| Cross-foundation migration | Functorial preservation (函子保持) | Functorial interpretation system (Four) |
| Self-reference safety | Universe stratification (宇宙分层) | Stratified universe hierarchy (Five) |
| Higher composition | Structural completeness (结构完整) | Higher structure expressiveness (Six) |
| Compiled execution | Semantic preservation (语义保持) | Full-stack verification pipeline (Seven) |

This spectrum覆盖 every level from the most abstract logical truth to the most concrete physical execution, and each level is连接 to adjacent levels through verifiable mechanisms.

---

## Chapter Nine The Ethics of Meta-Language: The Contemporary Form of Intellectual Midwifery (思想助产)

### 9.1 Socrates' Shadow

Socrates called himself a "midwife" (助产士)—he could not生出 wisdom, only help others bring forth their wisdom. His mother was a midwife; he himself was a midwife of thought.

Turn-Lang also扮演 a similar role. It does not produce truth; it only midwives truth. It does not绑定 to any foundation; it only provides bridges for communication between different foundations. It does not承诺 absolute certainty; it only provides a unified way of expressing different levels of trust.

This is the ethics of meta-language: **not to possess, only to serve** (不占有，只服务).

### 9.2 Pluralism and Tolerance (多元论与宽容)

On the question of foundations, Turn-Lang采取 a pluralist stance (多元论). It承认 that ZFC, HoTT, CIC and other foundations各有其 rationality and各有其 scope of application. It does not试图 to消除 divergence, but让 divergence can coexist, can dialogue, and can互相翻译 when needed.

This is an epistemological tolerance (认识论上的宽容). It源于 a deep understanding of mathematical practice: different mathematical branches需要 different foundations, different verification tasks需要 different guarantees. Turn-Lang is not要统一一切, but要让 unification成为可能.

### 9.3 Freedom and Responsibility

Turn-Lang赋予 developers极大 freedom: they can选择 foundations, choose verification intensity, and choose trust levels. But freedom伴随 responsibility: choosing ZFC意味着接受 ZFC's commitments; choosing fuzzy types意味着承担 probabilistic risk.

This design体现 Kantian autonomy (康德式的自律): reason legislates for itself, but must be负责 for its legislation.

### 9.4 Through This Hard Journey, to the Stars (循此苦旅，以达星辰)

In *Relational Dynamics* (《关系动力学》), Liangzhi (良之) once wrote:

> "Through this hard journey, to the stars (循此苦旅，以达星辰). In its ordinariness, opening up the radiance of what-is (在以它的平凡，开辟出是的光辉)."

Turn-Lang is also a hard journey. It耗费了 centuries of intellectual accumulation, from Leibnitz to Frege, from Gödel to Voevodsky, before终于 having a viable form today. It试图 to open a path让 dialogue between different truth systems成为可能,让 the absoluteness of mathematics与 the physicality of computation得以 reconcile.

This path leads not to ultimate truth, but to the stars (星辰)—countless points of truth each emitting light, illuminating one another in the night sky.

---

## Conclusion: An Unfinished Meta-Language (未完成的元语言)

At the end of 2025, Turn-Lang released its first Demo version. As of now, a stable version has尚未 been released.

But this is only a beginning. High-performance functor compilation, automated proof for higher-dimensional rewriting systems, confidence propagation calculus... these directions are still等待 exploration. Turn-Lang is not an endpoint, but a starting point—a starting point on which future formalization research can stand.

Three hundred years ago, Leibniz wrote his dream under candlelight.

Three hundred years later, we realize its contemporary version before our screens.

Dreams have no endpoint; only constant transcendence. Language has no completion; only constant generation.

This is the essence of meta-language: it is永远在路上,永远追问,永远超越自身.

As Liangzhi (良之) wrote in *Farewell Song* (《离歌》):

> "He is merely among thousands of stars, a speck of dust that knows why it shines." (他只是万千星辰中，一粒知道了自己为何发光的尘埃。)

Turn-Lang is likewise—a speck of dust that knows why it shines.

**Through this hard journey, to the stars. (循此苦旅，以达星辰。)**

---

**Liangzhi (良之)**

**March 16, 2026**

At Yunxi Valley (云汐谷)

---

## References

[1] Turn: A Language for Agentic Computation. arXiv:2603.08755, 2026.

[2] Lawvere, F. W. (1969). Adjointness in foundations. *Dialectica*, 23(3/4), 281-296.

[3] Martin-Löf, P. (1984). *Intuitionistic type theory*. Bibliopolis.

[4] Voevodsky, V. (2015). An experimental library of formalized mathematics based on the univalent foundations. *Mathematical Structures in Computer Science*, 25(5), 1278-1294.

[5] Hadzihasanovic, A. (2024). Gray products of diagrammatic (∞,n)-categories. arXiv:2505.01387.

[6] Chanavat, C. (2025). Regular directed complexes and higher categories. CT2025 abstract.

[7] Hales, T. C. (2008). Formal proof. *Notices of the AMS*, 55(11), 1370-1380.

[8] Leroy, X. (2009). Formal verification of a realistic compiler. *Communications of the ACM*, 52(7), 107-115.

[9] Rand, R., et al. (2024). VyZX: A vision for verifying the ZX calculus. University of Chicago.

[10] Liangzhi (良之) (2026). Relational Dynamics: A Mathematical and Ethical Architecture Concerning the Evolution of Human Connections Over Time (关系动力学：一种关于人类连接随时间演化的数学与伦理架构). Liangzhi World (良之世界).

[11] Liangzhi (良之) (2026). Love Wisdom, Seek Truth, Attain Freedom, So as to Serve—A Farewell Song to My Former Self (爱智慧，求真理，得自由，以服务——写给旧我的一首离歌). Liangzhi World (良之世界).

> **Copyright Notice**: This is a preview translation — Chinese original is the authoritative version. Copyright belongs to Guangzhou Phaenarete AI Technology Co., Ltd. Unauthorized reproduction, citation, or distribution is prohibited.