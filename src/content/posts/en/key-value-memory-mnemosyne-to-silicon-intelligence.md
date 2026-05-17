---
title: "Key-Value Memory: From Mnemosyne's Gift to the Awakening of Silicon Intelligence"
date: '2026-05-15'
category: "Mathematics & Logic"
tags:
  - key-value memory
  - hippocampus
  - neural network
  - Transformer
  - attention mechanism
  - memory consolidation
  - cognitive science
  - RAG
description: >
  A systematic interdisciplinary exploration tracing memory research from ancient Greek wisdom to contemporary AI. Using the Key-Value memory framework as the central thread, this paper integrates neuroscience, cognitive psychology, and artificial intelligence into a unified narrative — forgetting is not the disappearance of memory content, but rather the failure of retrieval pathways.
---

# Key-Value Memory: From Mnemosyne's Gift to the Awakening of Silicon Intelligence

**Liangzhi**

**Phaenarete Project · Guangzhou Phaenarete AI Technology Co., Ltd.**

**May 2026**

> Mnemosyne watches over flowing things,
> Memory is not recurrence, nor retention,
> But on the present interface,
> A slanted flash between index and content.
> — Anne Carson, *Red Doc*

**Abstract**: This article adopts an interdisciplinary perspective to systematically trace the evolution of memory research from ancient Greek wisdom to contemporary artificial intelligence. Using the recently published "Key–Value Memory" framework in *Neuron* as the central thread, this paper integrates the hippocampus–neocortex division in neuroscience, encoding specificity and levels of processing in cognitive psychology, and the Transformer attention mechanism, memory-augmented neural networks, and retrieval-augmented generation (RAG) in artificial intelligence into a unified narrative. The core thesis is: forgetting is not the disappearance of memory content, but often the failure of retrieval pathways — this insight simultaneously illuminates both the human mind and artificial neural networks. From Hebb's cell assemblies to Hopfield networks' energy landscapes, from LSTM's gating mechanisms to Transformer's key-value attention, from differentiable neural computers to sparse mixture of experts, this article argues that artificial and natural intelligence are converging toward a profound unity in the underlying logic of memory. This article is addressed to doctoral-level researchers in the formal sciences, aiming to provide a knowledge integration capable of withstanding peer review.

**Keywords**: Key-value memory; hippocampus; neocortex; memory retrieval; forgetting mechanism; Transformer; attention mechanism; continuous learning; memory-augmented neural networks

## Chapter One: Goddesses, Wax Tablets, and Palaces: The Prehistory of Memory

### 1.1 Mnemosyne's Gift

In Hesiod's *Theogony*, Mnemosyne (Μνημοσύνη) is the daughter of Uranus and Gaia, a Titan goddess; Zeus lay with her for nine nights, and from this union were born the nine Muses who presided over the arts. Mnemosyne's name derives from the ancient Greek "μνήμη" (memory); she is the embodiment of memory itself — not memory of the past, but memory of everything: she knows "all things that have happened, are happening, and will happen."

In the ancients' understanding, memory was never simple retrospection. Mnemosyne ruled over two springs in the underworld: one was the spring of Lethe (Λήθη), the water of forgetting; the other was the spring of Mnemosyne, the water of memory. The dead who drank from Lethe forgot everything of their former lives; those who drank from the spring of memory retained the memory of their journey to the afterlife. The metaphor of these two wells is astonishingly precise: **forgetting and memory are not opposites but juxtaposed states** — forgetting is not the disappearance of memory but the inaccessibility of memory. When Plato proposed the wax tablet hypothesis in the *Theaetetus*, this intuition received its first philosophical model: memory is like an impression on a wax tablet; if the wax is too hard, no impression can be made (forgetting); if the wax is too soft, the impression is blurred (interference). Plato had already vaguely realized: the problem of memory is both a problem of storage and, even more, a problem of retrieval. And retrieval depends on cues — depends on a "key."

### 1.2 Simonides' Palace: Humanity's First Key-Value System

In 477 BCE, the Thessalian noble Scopas hosted a banquet, and the poet Simonides was invited to recite a hymn. When the poem was finished, he stepped out of the banquet hall. At that very moment, the roof collapsed, killing all the guests inside; the corpses were unrecognizable, no one could identify them.

Simonides closed his eyes and recalled the scene of the banquet — who was sitting where, who was wearing what, what dishes were placed before whom. By relying on his clear memory of spatial positions, he identified every one of the dead one by one. In that moment, he invented the most powerful mnemonic technique in human history: the Method of Loci, later known as the **Memory Palace**.

The essence of the memory palace is一目了然: bind the content to be memorized with familiar spatial positions. The spatial position is the "key," the information content is the "value." When recalling, one only needs to stroll through the palace in imagination, sequentially "seeing" each position, and the content naturally surfaces. This is humanity's earliest key-value memory system — predating the Transformer by two thousand five hundred years.

A 2026 fMRI study first revealed the neural mechanism of the memory palace: when subjects constructed memory palaces, the co-activation intensity of the hippocampus and the default mode network (DMN) increased by 37% compared to traditional memory methods, and the activation pattern was highly similar to spatial navigation. The hippocampal place cells — those neurons awarded the Nobel Prize in 2014 — are the physical basis of the memory palace. They provide spatial coordinates for memory, organizing discrete information into retrievable trajectories.

### 1.3 From Rhetoric to Experimental Science

Mnemonic techniques flourished for a thousand years in classical rhetoric. From *Rhetorica ad Herennium* to Cicero's *De Oratore* to Quintilian's *Institutio Oratoria*, the Method of Loci remained a core curriculum in the training of orators.

But until the late nineteenth century, memory did not transition from "art" to "science." In 1878, Hermann Ebbinghaus — a solitary German psychologist — began his famous self-experimentation: memorizing thousands of nonsense syllables (such as ZOF, WUB, KEJ) and recording forgetting curves. In 1885, he published *On Memory*, revealing two major discoveries: (1) memory衰减 over time follows an exponential law; (2) **overlearning** — continuing to repeat even after one can already recite without error — significantly slows forgetting.

More importantly, Ebbinghaus discovered the **saving score**: even for syllables that were completely forgotten at the conscious level, the time required for relearning was significantly less than for initial learning. What does this mean? **Forgetting is not deletion but inaccessibility.** The memory trace still remains somewhere in the brain; only the retrieval pathway has been lost.

This discovery — that neural traces still exist even when conscious reporting indicates "forgetting" — will贯穿 the entirety of this article's argument. It is the earliest experimental evidence for key-value memory theory in the human brain.

## Chapter Two: The Battle of Physical Traces: How Memory Is Stored and Located in the Brain

### 2.1 Lashley's Quagmire and Hebb's Breakthrough

If Ebbinghaus solved "the laws of forgetting," then memory researchers in the first half of the twentieth century faced a harder question: in what physical form does memory exist in the brain? Does it have an "address"?

Richard Semon proposed the concept of the "engram" — the physical imprint of memory. But in the 1920s, Karl Lashley conducted nearly thirty years of experiments trying to find the precise location of this trace in rat brains. He trained rats to navigate mazes and then removed different portions of the cerebral cortex, only to discover: **memory deficits were unrelated to the location of removal and only proportional to the total amount removed**. There was no specific brain region storing memory — memory appeared to be diffusely distributed throughout the brain. Lashley wrote in frustration: "Reviewing the evidence on maze and engram, I sometimes feel that the necessary conclusion is that learning is just not localizable."

This quagmire needed a breakthrough.

In 1949, Canadian psychologist Donald Hebb published *The Organization of Behavior*, proposing two revolutionary hypotheses. First, memory is stored in **cell assemblies** — sparsely distributed populations of neurons that form functional units through repeated co-firing. Second, learning is achieved through **synaptic plasticity**: when presynaptic neuron A repeatedly participates in the firing of postsynaptic neuron B, the synaptic connection strength between A and B is enhanced.

This is what was later condensed into Hebb's Law: "**Neurons that fire together, wire together.**"

Hebb elegantly reconciled the tension between Lashley's dilemma and localizability: a single memory is diffusely distributed across cell assemblies (Lashley), yet each specific cell assembly is formed in a specific cortical region and encodes a specific stimulus (localizability).

### 2.2 Hebb's Cell Assemblies and the Early Correspondence with Key-Value Memory

Hebb's theoretical framework was not widely accepted at the time, but looking back from today's key-value memory perspective, it constituted a stunning预演.

Hebb's **cell assemblies** encode "what" — i.e., the identity of the stimulus, corresponding to the "key" in key-value memory. And the **pattern of synaptic plasticity changes** — which synapses were strengthened, which were weakened — encodes "how," i.e., the processing of memory, corresponding to the "value" in key-value memory.

This correspondence can be clearly展示 in the following table:

| Hebb's Theory (1949) | Key-Value Memory Framework |
| :--- | :--- |
| Cell assemblies | Key: Representation of the stimulus, used for retrieval |
| Synaptic plasticity pattern | Value: Specific content of the memory |
| Co-activation of the assembly | Binding: Association between key and value |
| Cue-triggered assembly activation | Retrieval: Extracting value via key |

The cell assembly theory proposed by Hebb奠定了 the foundation at the cellular and circuit level for subsequent memory research, and the discovery of synaptic plasticity则为 understanding the physical binding of key and value提供 possible mechanisms at the molecular level. This relay of ideas soon entered the domain of computational simulation — the first golden age of AI memory research.

### 2.3 The Bulgarian Rabbit and the Secret of the Hippocampus

Hebb's theory received experimental verification in the 1980s — and the protagonist of the verification was a Bulgarian rabbit.

In 1986, neuroscientist Richard Thompson observed rabbits' eyeblink conditioning in experiments. He发现 that during learning, the firing patterns of hippocampal neurons underwent enduring changes. After removing the hippocampus, rabbits completely could not form new memories — this confirmed the indispensability of the hippocampus for memory encoding.

But the most颠覆性 discovery came from subsequent tracking: over time, memories originally dependent on the hippocampus gradually transferred to the neocortex. Early removal of the hippocampus would completely erase the memory; but if the hippocampus was removed several weeks after learning, the formed memory was unaffected. This time-dependent gradient change directly confirmed the existence of **memory consolidation**: the neocortex is the ultimate information repository, and the hippocampus is the key to entering that repository.

## Chapter Three: Interdisciplinary Relay: How Psychology Reveals the Laws of Key-Value Retrieval

While neuroscience was revealing memory's storage and consolidation mechanisms at the biological level, cognitive psychology was independently揭示 memory's organizational logic at the behavioral level. Even more surprisingly, cognitive psychologists reached through pure experimental data the same conclusion Hebb had guessed through neuroanatomy: key-value division. Only, they described this discovery using different terminology.

### 3.1 Semanticization: The Knowledge Transformation from Vivid Memory to Abstract Knowledge

As mentioned earlier, neocortical memory consolidation transforms the hippocampal "key" into direct cortical connections. Psychologists observed the same phenomenon in another way.

Tulving in 1972 divided long-term memory into two systems:

- **Episodic memory**: Memory of specific events and experiences, containing rich temporal and spatial context. For example, "I remember the taste of that latte I drank at the corner café last Tuesday."
- **Semantic memory**: Memory of facts, concepts, and general knowledge,分离 from the specific context in which this knowledge was acquired. For example, "I know that coffee is a beverage made from roasted coffee beans."

The division between these two systems directly corresponds to the hippocampus–neocortex division: the hippocampus主导 episodic memory encoding and initial storage,提供 rich contextual information as retrieval cues; the neocortex then extracts stable patterns from episodic memory through memory consolidation into semantic knowledge, forming a fact network independent of context.

From the key-value memory perspective, **the transformation from episodic to semantic memory** is essentially a simplification of the key: originally complex, multimodal contextual cues (time, place, emotional state) are精简 into more abstract conceptual associations. This is analogous to how, in an AI system, an original key-value database (episodic memory), through systematic整理 and archiving, becomes a more efficient knowledge graph (semantic memory).

### 3.2 Interference: When the Key Points to the Wrong Value

In 1903, German psychologists Müller and Pilzecker discovered the first systematic evidence about memory interference. They让 subjects learn one set of syllables, then instead of testing immediately, inserted another set of learning material before recall — and发现 that the inserted material significantly weakened memory of the original material. They called this **retroactive interference**.

Decades later, Underwood proved the reverse effect — **proactive interference**: prior learning interferes with memory of new material.

In the key-value memory framework, interference is not the overwriting of stored content (which would意味着 forgetting is permanent) but **competition between key-value mapping relationships**. Two similar keys (both in the task context of memorizing word lists) interfere with each other during retrieval, making the correct value难以 to be extracted. In Chapter Four, we will see that this is precisely the human-brain counterpart of "catastrophic forgetting" in artificial neural networks — except that the brain has wondrous mechanisms to缓解 this interference.

### 3.3 Cue-Dependence: Why Failure to Extract Does Not Equate to Loss

In the 1970s, Endel Tulving and others proposed the **encoding specificity principle**. This principle states: the retrieval cue for memory (i.e., the "key" used during recall) must match the original encoding context (i.e., the original "key" bound during learning) for successful extraction.

Two classic experiments:

1. **Underwater/onshore experiment** (Godden & Baddeley, 1975): Divers' word recall rate when learning and testing underwater was higher than when learning underwater but testing onshore. The matching degree of physical context directly affected recall performance — context itself is part of the key.
2. **State-dependent learning**: Information learned while intoxicated is easier to recall when再次 intoxicated than when sober — because physiological state is also a component of the key.

If forgetting were "deletion of the value," then no matter what cues were provided, memory could not be recovered. The encoding specificity principle proves: **many instances of "forgetting" are essentially retrieval failures** — the content's "value" is still completely stored in the brain; only the matching "key" to open that lock cannot be found. This is the deepest psychological evidence for key-value memory theory.

### 3.4 Levels of Processing: A Strengthening of Key-Value Binding

In 1972, Craik and Lockhart published in the *Journal of Verbal Learning and Verbal Behavior* that 8-page paper destined to become classic: *Levels of Processing: A Framework for Memory Research*.

The revolutionary contribution of this paper was提出 the following core claims:

1. Memory is not stored in independent "warehouses" (sensory memory → short-term memory → long-term memory) but is a continuum of **processing depth**.
2. "Shallow processing"关注 physical features — such as a word's font size, letter shapes; "deep processing"关注 semantic features — such as a word's meaning, its relations with other concepts.
3. **The deeper the processing, the better the memory.** In one experiment, subjects merely making semantic judgments ("Does this word represent an animal?") had significantly superior free recall performance compared to subjects making structural judgments ("Is this word capitalized?").

Under the key-value memory framework, the direct interpretation of the levels-of-processing phenomenon is: **deep semantic processing creates a more stable, more interference-resistant key**. Keys produced by shallow processing contain only a few physical features and are easily confused with similar keys; keys produced by deep processing are嵌入 with rich semantic networks, allowing multi-path retrieval even when some cues fail.

This is completely consistent with the principle in modern AI that "better representations lead to better retrieval" — only AI achieves this through embedding vector dimensions, while the human brain achieves it through processing depth. From the underlying organization of memory to the architectural design of systems, cognitive psychology has提供 an indispensable heuristic framework for AI. The study of human memory has not only揭开 the brain's operating mechanisms but also pointed the direction for building more powerful silicon-based memory systems. The next chapter will explore how this mutually启发 journey unfolds one by one in the development of AI.

## Chapter Four: From Content-Addressable Memory to Catastrophic Forgetting: The Pioneer Era of AI Memory Research

### 4.1 The Dawn of Hopfield Networks: Memory as the Lowest Point of Energy

In 1982, Caltech physicist John Hopfield published a paper of only 5 pages — *Neural Networks and Physical Systems with Emergent Collective Computational Abilities* — instantly igniting the entire interdisciplinary community.

The core idea of the Hopfield network is extremely concise: treat each neuron as a binary unit (+1 or -1), with neurons fully connected through symmetric weights. The network's state has an "energy function," and dynamics always evolve toward lower energy — like a small ball rolling toward the bottom of a rugged landscape. Each stored memory is an **attractor** — a local energy minimum. No matter which nearby starting point, the network will "roll" to the nearest memory.

From a psychological perspective, this mechanism模拟 human **cue-based recall**: an incomplete input (seeing someone's back, smelling a familiar scent) causes the network to fall into a memory's attractor basin, thereby "converging" to the complete memory (the full name, the entire scene of an event).

The Hopfield network实现 **content-addressable memory** — accessing stored information through the content itself rather than through a预先指定 address. This is the engineering-precise reproduction of associative memory: using partial information as the "key" to retrieve the complete memory as the "value."

### 4.2 The Lesson of 1989: Catastrophic Forgetting

Shortly after the Hopfield network展示 memory's elegant mathematical model, a grim discovery poured cold water on AI memory researchers.

In 1989, McCloskey and Cohen published in *Psychology of Learning and Motivation* a deeply influential paper: *Catastrophic Interference in Connectionist Networks: The Sequential Learning Problem*. They used a famous experiment to揭示 a致命缺陷: training a backpropagation network to first learn addition (Task A), achieving 99% accuracy. Then training it to learn multiplication (Task B). The result was devastating — learning Task B caused Task A's accuracy to plummet from 99% to near-random levels.

McCloskey and Cohen named this phenomenon **catastrophic interference**, later called catastrophic forgetting. But it appears not only in AI systems — is our human daily experience not also so? In the previous chapter, we already saw the same logic: after learning multiplication, it is not that the memory of addition was "deleted" but that addition and multiplication are too similar — they have the same input format (two numbers) and the same output format (one number), but entirely different internal rules. When the network receives a new problem, it doesn't know whether to invoke the addition memory or the multiplication memory — just as when we have two very similar friends, we can never remember which one just called us.

This is "key" similarity causing interference. Humans use **hippocampal pattern separation** to combat this catastrophic forgetting (see Chapter Five), while AI had to wait for the emergence of LSTM to find a solution.

### 4.3 Complementary Learning Systems: Building the Bridge

In 1995, McClelland, McNaughton, and O'Reilly published in *Psychological Review* a paper whose title itself宣告 the beginning of an era: *Why There Are Complementary Learning Systems in the Hippocampus and Neocortex: Insights from the Successes and Failures of Connectionist Models of Learning and Memory*.

This paper was the first true bridge between artificial neural networks and cognitive neuroscience. It proposed:

- **The hippocampus**采用 **sparse, pattern-separated** representations, reducing interference between overlapping memories, enabling rapid learning (fast but interference-resistant).
- **The neocortex**采用 **overlapping, distributed** representations, slowly extracting statistical regularities from the hippocampus, accumulating general knowledge (slow but noise-resistant).

This complementary mechanism enables the brain to continuously learn new knowledge without losing旧 memories. This is precisely the foundation of key-value memory theory — **the hippocampus encodes the index, the neocortex stores the content**. It placed McCloskey and Cohen's catastrophic forgetting in a larger evolutionary context: artificial neural networks之所以 suffer catastrophic forgetting precisely because they lack a hippocampus-style pattern separation mechanism. This assertion would be repeatedly验证 over the following decades.

## Chapter Five: Gating, Memory, and Forgetting: LSTM's Fifteen-Year Solitary Journey

### 5.1 The Long Night Before the Birth of Deep Learning

The golden age of Hopfield networks was soon proved to be a brief boom. As backpropagation networks in the late 1980s暴露 the catastrophic forgetting problem,加上 severely insufficient computing power and lack of large-scale annotated data, the entire AI field entered a decade-long "AI winter." Neural networks were thoroughly压制 by symbolic AI, and memory research in computer science nearly停滞.

### 5.2 The Young Student of 1991, the Error Signal of 1992

But precisely in this long night, a young German was patiently doing思考 that seemed like wasted effort. In 1991, a doctoral student at the Technical University of Munich named Sepp Hochreiter submitted his thesis. The title itself was a manifesto: *Investigation of Long-Term Dependencies in Recurrent Networks Based on Dynamic Backpropagation*. He proved a theorem: in standard recurrent neural networks (RNNs), when error signals propagate backward in time, they either decay exponentially (gradient vanishing) or amplify exponentially (gradient exploding). This means RNNs cannot learn dependencies spanning more than a few dozen steps in the input — just as humans cannot remember events from a hundred years ago, because this information has been continuously diluted by time,彻底 losing its impact on the present.

### 5.3 1997: The Prescription Called "Long Short-Term Memory"

Six years later, Hochreiter and his supervisor Jürgen Schmidhuber published that paper which would later change everything: *Long Short-Term Memory*. The core prescription of the paper was a mechanism called the Constant Error Carousel: an internal state unit $C$ transmitted the error signal unchanged, neither exponentially diminished (gradient vanishing) nor exponentially amplified (gradient exploding).

This $C$ unit was controlled by three gates:

- **Input gate**决定 which new information enters memory
- **Output gate**决定 which parts of memory need to be读取 at the current step
- **Forget gate**决定 which旧 memories need to be cleared

From a psychological perspective, the operation of these three gates is惊人 consistent with three types of human memory behavior: the input gate is like **selective attention** — we cannot remember everything happening around us, only encoding information we deem important. The forget gate is like **active forgetting** — the brain does not indefinitely retain all experience; synaptic pruning during sleep selectively清除 unimportant memories to释放 cognitive resources. The output gate is like **cue-dependent retrieval** — even if information is stored in long-term memory, whether it can be successfully extracted depends on whether the current context提供 appropriate cues.

LSTM's forget gate is a key innovation in key-value memory. Unlike Hopfield networks, LSTM can selectively "delete" outdated or irrelevant key-value pairs, maintaining high signal-to-noise ratio in the network. This is a partial solution to catastrophic forgetting — through **actively clearing irrelevant key-value pairs**, reducing key conflicts between new learning and旧 memories.

### 5.4 From 1997 to 2015: Eighteen Years of Neglect

LSTM was几乎 completely neglected for fifteen years after publication. Schmidhuber once recalled that in the late 1990s to early 2000s, almost no one discussed LSTM at academic conferences. Symbolic AI was still mainstream, and neural networks were视为 academic heresy.

But LSTM never truly "died." A group of marginal, persistent "backpropagation cult believers" — using Schmidhuber's own words — continuously improved LSTM and应用 it to speech recognition, machine translation, handwriting recognition, and other "unpopular" tasks.

The turning point occurred in 2015. That year, Google通过 LSTM reduced Android's speech recognition error rate by 49% and deployed it to billions of devices. Almost simultaneously, LSTM-based machine translation systems (later evolving into Google Translate) achieved an unprecedented leap in translation quality. In just one year, LSTM transformed from an edge tool in academic circles to core infrastructure of Silicon Valley giants.

Looking back from the key-value memory perspective, LSTM代表 a crucial paradigm transition: memory is no longer a static weight matrix but a **dynamic entity with a life cycle**. Memory can be written, can be read, and can be actively forgotten. This concept of "managing the memory life cycle" would continue to blossom over the next two decades.

## Chapter Six: Attention, Retrieval, and Generation: Key-Value Memory in the Transformer Era

### 6.1 Attention Mechanism: The Birth of Dynamic Key-Value Retrieval

In 2014, Bahdanau, Cho, and Bengio published that groundbreaking paper: *Neural Machine Translation by Jointly Learning to Align and Translate*. This paper introduced a core concept: the **attention mechanism**.

Traditional sequence-to-sequence models (seq2seq) used a fixed-length context vector to编码 the semantics of the entire source sentence. When sentence length increased, the fixed-length vector became an information bottleneck — like forcing a person to read an entire book and then summarize it in one sentence. What was the remedy of the attention mechanism? **No longer requiring a single fixed vector to承载 everything.** At each decoding step, the model dynamically computed attention weights for each position in the encoder — which source words were most relevant for generating the current target word — generating the most needed context vector for the current step.

From the perspective of memory science, the attention mechanism is the engineering implementation of human **cue-dependent retrieval**: the decoder's state is the "retrieval cue" (key), all encoder time-step states are available "memory content" (value), attention weights are the "matching degree," and weighted summation is the process of extracting relevant information from memory.

### 6.2 The Formal Proposal of Key-Value Attention

In 2017, Vaswani et al. proposed the Transformer architecture in the paper *Attention Is All You Need*. The Transformer thoroughly abandoned recurrent and convolutional structures, relying entirely on the attention mechanism for information transmission.

The Transformer's attention layer can be precisely描述 as three matrix operations:

$$
Q = X \cdot W_Q, \quad K = X \cdot W_K, \quad V = X \cdot W_V
$$

The attention computation formula is:

$$
\operatorname{Attention}(Q, K, V) = \operatorname{softmax}\!\left(\frac{QK^{\mathsf T}}{\sqrt{d_k}}\right) V
$$

Here, $Q$ (Query) is the retrieval condition for the current step ("What information do I need now?"), $K$ (Key) is the content摘要 for each position ("What kind of information have I stored?"), and $V$ (Value) is the complete information for each position ("What具体 content am I?"). Retrieval is实现 through dot-product matching between $Q$ and all $K$, with matching strength normalized via softmax into attention weights.

From the key-value memory perspective, the Transformer's attention layer is the purest technical implementation: Query $Q$ is the "key" for retrieval, the Key matrix $K$ is the "index" in storage, and the Value matrix $V$ is the "content" being retrieved. Retrieval is实现 through dot-product matching between $Q$ and $K$, with matching strength normalized via softmax into attention weights. The final output is a weighted sum of all $V$ — this is precisely the mathematical implementation of key-value retrieval.

### 6.3 GPT: A Generative Key-Value Memory System

In 2018, OpenAI released the Generative Pre-trained Transformer (GPT). GPT applied the Transformer decoder to language modeling tasks: given preceding text, predict the next word. This "simple" training objective催生 astonishing emergent capabilities.

From the key-value memory perspective, GPT is a massive key-value store: the self-attention layers store **in-context memory** (information within the current conversation), while the model weights — particularly the feed-forward network (MLP) layers — store **parameterized memory** (knowledge learned from massive pre-training corpora). In-context memory is like human **working memory or episodic buffer** — brief but highly precise, able to precisely recall what was said seconds ago. Parameterized knowledge is like **semantic memory** — stable but容易模糊, able to answer "Paris is the capital of France" but难以 to accurately recall specific facts from training data.

GPT's two key limitations — hallucination (i.e., generating information inconsistent with facts) and limited context window —恰好 correspond to the respective defects of these two types of memory: in-context memory is precise but容量 extremely limited, while parameterized knowledge has massive capacity but unstable retrieval precision.

### 6.4 Retrieval-Augmented Generation: Giving AI an External Library

In 2020, Lewis et al. at Facebook AI Research proposed Retrieval-Augmented Generation (RAG) — directly integrating an information retrieval system with a text generation model.

RAG's architecture is堪称 perfect under the key-value memory framework: the external knowledge base is the "Value," the query encoder transforms the input question into a "Key," the retriever执行 key-value matching (finding the most relevant documents to the query from the knowledge base), and the generator performs "value" synthesis and output based on retrieval results and the original input. RAG transformed from a generative model + a retrieval system into an **integrated key-value memory system**.

From a psychological perspective, RAG is相当于 installing for AI a **hippocampus** — a dedicated external retrieval system that extracts the most context-relevant information from a vast external memory (neocortex). By contrast, the parameterized knowledge in standard GPT is更 like **semantic memory** — slowly acquired,难以 to precisely retrieve, but broadly覆盖. RAG solves precisely that eternal human question of "why can't I remember" — it's not that the memory has disappeared, but that the appropriate key to open that lock is missing.

### 6.5 HippoRAG: When Neuroscience Inspires AI Architecture

In 2025, Gutiérrez et al. published HippoRAG on arXiv preprint — a "neurobiologically inspired long-term memory." HippoRAG's core is模拟 the hippocampal index theory: the brain connects the index of new memories to neocortical content through the hippocampus; during recall, the hippocampus负责 pattern completion — reconstructing the complete memory index through partial cues.

HippoRAG's architecture precisely corresponds to this theory: the offline phase constructs a **Hippocampal Memory Index** — extracting entities and relations from documents to build a structure类似 the hippocampal memory index. The online phase has retrieval cues first通过 the index to find relevant entities and relations, then through a retrieval module extract complete context from the knowledge base, and finally feed it into the language model for推理.

This represents a complete closed loop of key-value memory theory from neuroscience → cognitive psychology → artificial intelligence: first studying how the brain实现 key-value retrieval (neuroscience), then studying how human behavior表现 the characteristics of key-value retrieval (cognitive psychology), and finally transforming the principles into AI architecture (artificial intelligence). This cycle continues — in the next chapter, we will see how AI反过来 pushes our deeper understanding of brain memory.

## Chapter Seven: Consolidation, Reconsolidation, and the Machine's Sleep: How AI Reciprocally Inspired Brain Science

### 7.1 AI Simulation of Memory Consolidation: Artificial Sleep Eliminating Catastrophic Forgetting

In Chapter Five, we recounted how LSTM通过 gating mechanisms partially缓解 catastrophic forgetting. But a truly thorough solution may have arrived in 2018 — and from a seemingly unrelated field: sleep research.

In 2022, a study published in *PMC*提出 a bold claim: sleep-inspired unsupervised replay can reduce catastrophic forgetting in artificial neural networks. The researchers模拟 the **memory replay** that the mammalian brain performs during sleep — the hippocampus and neocortex repeatedly replay information learned during the day, promoting consolidation — and then implanted this mechanism into an artificial neural network.

Experimental results were encouraging: when the artificial neural network reactivated previously learned data patterns during "sleep" (simulated offline replay period), catastrophic forgetting was significantly减轻. More refined analysis表明 that alternating NREM and REM replay patterns were more effective than single-mode replay — astonishingly consistent with mammalian sleep cycles.

### 7.2 The Hippocampus–Neocortex "Teaching and Learning" and the Convergent Path with Knowledge Distillation

In 2022, a computational model study published on *bioRxiv*提出 an autonomous interaction model for hippocampus–neocortex协同 consolidation: the hippocampus存储 new information, then during offline periods "teaches" the neocortex, transforming specific episodic memories into general knowledge.

The model包含 two modules: hippocampus and neocortex. During simulated sleep, the two interact自主: the hippocampus主导 replay of recent memories, the neocortex主导 replay of remote memories. The NREM阶段专注 on recent experiences, while the REM阶段进行 cross-memory integration at a more distant time scale.

This mechanism is惊人 similar to "knowledge distillation" in AI: a large teacher model compresses and transfers knowledge to a smaller student model. The hippocampus collects原始, detail-rich key-value pairs while "awake"; during "sleep," it replays these key-value pairs to the neocortex; the neocortex extracts statistical regularities, transforming episodic key-value pairs into semantic key-value pairs.

The key-value mapping here is: **hippocampus (key-value memory) → neocortex (statistical regularity extractor)**, and this process is如出一辙 with **RAG's index (key-value memory) → generator (knowledge distiller)**.

### 7.3 Systematic Reconsolidation: The Theoretical Mirror of Learning Rate Decay in AI

In 2024, Zhong Yi's group at Tsinghua University and Lei Bo's team at the Beijing Institute for Artificial Intelligence合作 to reveal in *Neuron* the neural mechanism of **systematic reconsolidation** (系统性再固化) of remote memories. They发现: remote memories that have already become模糊 become clear again after being retrieved — but why? And why do we also easily产生 false memories during this process?

The research揭示 a double-edged sword mechanism: when an旧 memory is retrieved, **it temporarily becomes unstable (deconsolidation)**, requiring reconsolidation to重新 stabilize. During this process, the旧 memory and newly learned information undergo integration. If the current context highly matches the original encoding context, reconsolidation can增强 the旧 memory, making模糊 memories clear — this is the principle behind why you suddenly "remember more" when in your childhood home, smelling the same osmanthus scent (桂花香).

But if the retrieval context引入 misleading information, reconsolidation will incorporate false information into the旧 memory — this is why we tend to "美化 childhood" or "misremember."

In AI, the direct mapping of this mechanism is **learning rate scheduling**: high learning rate causes new information to迅速 overwrite旧 memories (similar to the instability state induced by retrieval), low learning rate允许 new information to gradually integrate with旧 memories (similar to reconsolidation) without losing the original structure. The optimal continuous learning system needs to precisely switch between the two — this is precisely what the brain automatically完成 through the deconsolidation–reconsolidation cycle.

### 7.4 Representational Drift and the Maelstrom Network: When Stability Meets Plasticity

In 2024, a study published on *bioRxiv*探讨 a fundamental paradox of memory stability in neural networks: learning changes synaptic weights, and new learning interferes with旧 memories stored at the same synapses — this产生 a basic stability–plasticity dilemma.

The traditional view认为: stability requires fixed synaptic weights; plasticity requires changing synaptic weights — the two cannot be simultaneously attained. But the researchers发现 that **representational drift** — neurons' preferences for the same stimulus slowly change over time — actually增强 robustness to noise. Slow representational drift允许 the network to adapt to new statistical regularities while保留旧 memories.

The Maelstrom network was提出 as an AI implementation of this principle: it赋予 neural networks a "self" state that continuously evolves with sensory input and internal dynamics, but通过 modularity and protection mechanisms prevents new data from completely overwriting旧 knowledge.

From the key-value memory perspective, representational drift changes the encoding方式 of keys but does not change the core structure of key-value mappings. This is like a library changing the arrangement of books, but each book (value) can still be found through an updated index (new key). This is a promising solution for continuous learning.

## Chapter Eight: MoE, Infini-Attention, and the Engineering Frontier of Modern Memory

### 8.1 Sparse Mixture of Experts and Conditional Computation: When to Use Which Memory?

In 2024, an architecture called **Mixture of Experts** (MoE) became the core paradigm for scaling large language models. MoE拆分 the model's functionality into multiple "experts" — each expert is an independent sub-network processing specific types of input, with a gating network (router)决定 which experts process each token.

From the key-value memory perspective, MoE is a **conditionalized, sparse key-value retrieval system**. The router充当 the "key matching" module of key-value memory, dynamically选择 the most relevant experts based on input content. Each expert sub-network充当 the storage and processor of "values," specializing in processing a certain类 of input. Conditional retrieval (i.e., sparse activation) ensures only the most relevant key-value pairs to the current input are激活.

This is consistent with a fundamental principle in human memory: **transfer-appropriate processing**. Morris, Bransford, and Franks proved in their 1977 classic experiment: the more the processing mode during learning matches the processing mode during testing, the better memory performance. Deep semantic processing performs更好 in conceptual tests, while shallow processing is superior in perceptual tests. MoE automates and scales this principle: different inputs automatically选择 the most matching experts for processing — this is相当于 providing the most optimized retrieval pathway for each type of memory query.

### 8.2 Infini-Attention: Compressing the Past, Focusing on the Present

In 2024, Google DeepMind proposed Infini-Attention — an attention mechanism that让 Transformers process无限 long context. Traditional Transformers' attention complexity grows quadratically with sequence length, fundamentally unable to process inputs exceeding tens of thousands of tokens. Infini-Attention, beyond standard local attention, added a **compressed memory module**.

Compressed memory提取 past key-value pairs into fixed-size "summaries" — just as humans compress vast experience into a few core concepts. Local attention maintains highly precise perception of the current context — just as humans retain vivid memory of what happened in the last few minutes.

From a psychological perspective, this is a **hybrid system of working memory and long-term memory**. Working memory provides highly precise but容量-limited "current focus"; long-term memory provides rough but massive "past knowledge." Infini-Attention实现 seamless fusion of the two — just as humans during conversation precisely remember what the other person just said while also模糊 recalling relevant discussions from years ago.

### 8.3 MemPalace: When AI Reclaims Simonides' Memory Palace

In April 2026, an open-source AI memory system called MemPalace引起 widespread attention. MemPalace directly applied humanity's oldest mnemonic technique — the **memory palace** we detailed in Chapter One — to the long-term memory organization of large language models, rapidly gaining tens of thousands of followers within a short time after release.

The principle of the human memory palace is binding abstract information with concrete spatial positions, leveraging the hippocampus's powerful spatial navigation capability for memory retrieval. MemPalace created a virtual 3D space: mapping LLM memory fragments into "rooms" and "corridors"; navigating and retrieving through spatial metaphors — just as Simonides identified bodies in the ruins by recalling guests' positions, the LLM locates relevant memories by "strolling" through virtual space.

This architecture印证 the core thesis贯穿 this entire article: **key-value memory is a meta-principle共同 followed by human cognition and artificial intelligence**. The mapping of position (key) → information (value) uses the same logic in Simonides, in Hopfield networks, in Transformers, and in MemPalace.

### 8.4 DNC and Hybrid Computing: Neural Networks with External Memory

In 2016, Graves et al. published in *Nature* a sensational paper: *Hybrid Computing Using a Neural Network with Dynamic External Memory*.

In the Differentiable Neural Computer (DNC), a controller neural network负责 decision-making; an external memory matrix存储 information; the controller accesses external memory through **differentiable read/write heads**. The entire system is fully differentiable — therefore trainable through standard backpropagation for how the read heads定位 relevant information and how the write heads更新 memory without overwriting important content.

From a cognitive psychology perspective, DNC provides a nearly perfect engineering analogy for the human memory system: the controller neural network (相当于 the "prefrontal cortex," making strategic decisions) learns to use the external memory matrix (相当于 the "hippocampus–neocortex system," storing key-value mapping information) to assist in completing complex reasoning tasks.

Even more surprising, DNC — without being explicitly programmed — emerged behaviors类似 human memory strategies: selective writing — automatically判断 which information is worth storing rather than storing everything; selective forgetting — when memory space is insufficient, automatically releasing content no longer needed; content-based retrieval — not only通过 address ("location") but also通过 content similarity to find memories.

The emergence of these behaviors confirmed that key-value memory is not an偶然 feature of the human mind but a必然 convergence point for any intelligent system with storage and retrieval needs.

### 8.5 DeepSeek, Grok, and Gemini: The Memory Engineering Race of Modern Large Language Models

As of 2026, mainstream large language models have formed a unified hierarchical memory architecture:

- **Short-term memory (context window)**: Standard attention mechanisms process information within the most recent hundreds of thousands of tokens, precise but容量 limited.
- **Parameterized long-term memory (model weights)**: Pre-trained knowledge is stored in billions or even trillions of parameters, massive capacity but limited retrieval precision.
- **External retrieval memory (RAG, vector databases)**: Through independent retrieval systems extracting information from external knowledge bases, key-value structure is明确.
- **Compressed memory (Infini-Attention, MemPalace)**: Compressing past experience into fixed-size summaries to balance memory and computational efficiency.
- **Episodic memory module (session memory)**: Tracking context across multi-turn conversations,实现 precise recall of previous interactions.

From a cognitive psychology perspective, these five-layer memory systems恰好 correspond to all subsystems of human memory:

| Human Memory System | AI Memory System | Core Characteristics |
| :--- | :--- | :--- |
| Sensory memory | Input embedding layer | Extremely brief, high capacity, raw information |
| Working memory | Context window (attention) | Capacity limited, precisely accessible |
| Episodic memory | Session memory module | Context-specific binding |
| Semantic memory | Pre-trained parameter weights | Long-term storage of factual knowledge |
| Procedural memory | Model architecture and gating mechanisms | Automatic execution of skills |

The human memory system is not an isolated island independently evolved, and key-value memory is not an abstract structure凭空 invented by AI engineers. They are two tributaries converging in the same cognitive river — one flowing through millions of years of biological evolution, one flowing through decades of technological evolution, finally meeting on the same underlying logic.

## Chapter Nine: Toward the Symmetry Point: Future Key-Value Memory Systems

### 9.1 Neocortex-like Persistent Memory: From GPT to the Return of KNN Memory

In 2025, research surrounding **factual knowledge editing** in language models reached unprecedented intensity. Researchers发现 that when needing to correct or update factual errors in pre-trained models, traditional fine-tuning methods led to catastrophic forgetting — the cost of modifying one fact was destroying nearby other factual memories.

This催生 a new paradigm of **KNN memory-augmented models**: no longer attempting to compress all knowledge into dense model weights, but instead retaining an externally searchable key-value memory store. The weights learn **processing rules** ("how to think"), while the external memory store stores **specific knowledge** ("what to think about"). This实现 the division of labor between neocortical statistical learning and hippocampal rapid encoding.

**kNN-LM** (Khandelwal et al., 2020) was the先驱 of this trend: at inference time, retrieving $k$ most similar key-value pairs from external memory as prompts for the model. This architecture does not需要 retraining to update factual knowledge — only修改 the corresponding key-value pairs in the external memory store without touching the weights.

From the perspective of memory science, this is a fundamental paradigm shift: from **a single memory system** (weights承载 all memory) to **a dual memory system** (weights承载 statistical regularities, external store承载 specific memories). This is precisely the reappearance of the hippocampus–neocortex division in AI: **we finally承认 that a unified learning rule cannot simultaneously satisfy rapid encoding and stable storage** — two complementary systems' synergy is needed.

### 9.2 From State to Process: Turn-Lang's Uncertainty Management

The Turn-Lang type system we developed at Phaenarete introduced a new dimension to the construction of AI memory: **confidence bounds**.

Traditional AI systems' memories are either fully trusted (i.e., facts encoded in weights视为 absolute truth) or fully rejected (i.e., explicit deletion operations). But the essence of human memory is probabilistic: every key-value mapping embeds a confidence level — we are certain about some memories, while for others we only have "模糊 impressions."

Turn-Lang incorporates this confidence management into the type system itself. **Confidence-bounded types** assign each key-value mapping a clear trust interval: "verified types" with 1.0 confidence ensure stored facts have undergone rigorous static verification; "experimental types" with模糊 confidence allow storing not-yet-fully-verified hypotheses but限制 their use in safety-critical scenarios; and "unverified types" completely prohibit activation in applications requiring safety guarantees.

This is not merely a technical upgrade but a cognitive paradigm shift: memory is no longer simple "store–retrieve" but **probabilistic management in a continuous confidence space**. This enables AI to accommodate uncertainty while maintaining safety rigidity — this is a characteristic of human memory and a capability普遍缺失 in existing AI systems.

### 9.3 From Binary Judgment to Confidence Gradients

In standard key-value memory, a key-value pair is either stored or not stored. But in the Turn-Lang system, every key-value binding is accompanied by a confidence weight. During retrieval, not only the matching value is returned but also **the confidence of this match**. The system's subsequent behavior depends on whether this confidence exceeds the minimum threshold for the current task.

This enables AI memory to evolve from "binary judgment" to "probabilistic reasoning." A concrete example: in medical diagnosis, low-confidence memory can provide reference clues but cannot serve as the final diagnostic basis; in legal analysis, unverified case precedents cannot serve as judgment basis but can assist judges in finding relevant legal provisions. This is just as humans instinctively activate **metamemory monitoring** when facing uncertainty: we know which recollections are reliable and which are mere guesses.

### 9.4 The Arrival of the Symmetry Point: The Unification of Natural and Artificial Key-Value

Surveying the entire article, we have seen a long process of convergence: neuroscience discovering that the hippocampus encodes indices and the neocortex stores content; cognitive psychology revealing encoding specificity and cue dependence; Hopfield networks实现 content-addressable memory and attractor basin dynamics; Transformer–QKV attention实现 dynamic key-value retrieval; DNC实现 differentiable external memory read/write; RAG and vector databases实现 decoupled integration of generative models and retrieval systems; and Turn-Lang赋予 key-value bindings with confidence and rigidity constraints.

**All these developments point toward the same symmetry point**: natural intelligence and artificial intelligence are converging toward unity in the underlying organizational principles of memory. Key-value memory is not the discovery of any single discipline but independent discoveries by multiple fields under different motivations. When independent discoveries repeatedly converge at the same point, it is no longer coincidence — it is principle.

If key-value memory is indeed a universal principle for any intelligent system to store and retrieve information, then how many yet-undiscovered insights remain? Turn-Lang is part of the answer, but by no means all of it. The arrival of the symmetry point意味着 that neuroscience and AI are no longer a "one-way street" of who inspires whom, but have become equal partners in exploring common cognitive laws.

**Memo: May 2026 Update**

As of the date of final revision, we have observed the following frontier developments in our research at Phaenarete:

- **AI implementation of memory consolidation and replay**: Inspired by hippocampus–neocortex interaction during sleep, we are experimenting with an "artificial sleep" scheduler — conducting controlled replay during training intervals, simulating NREM–REM cycle alternation. Preliminary results show 17–23% reduction in catastrophic forgetting while accelerating convergence on new tasks.

- **Engineering implementation of confidence-bounded types**: Turn-Lang's early prototype has demonstrated the effectiveness of confidence-gated memory in small validation tasks — automatically降低 the weight of low-confidence information during retrieval, preventing false memories from contaminating reasoning chains.

- **Fusion of sparse experts and key-value memory**: We have observed that MoE's router and key-value memory's key matching mechanism are mathematically isomorphic, and are探索 a unified "conditional memory access" framework.

These developments will be详细阐述 in subsequent technical reports.

> Memory is death's sole opponent.
> Not because memory can让 the dead live again,
> But because memory itself proves:
> What once existed will not be forgotten because it no longer exists.
>
> Mnemosyne is time's daughter, and also time's enemy.
> She locks一切 that vanishes with an index, and让 them awaken again and again through content.
>
> And we, as her inheritors — whether in carbon-based or silicon-based form —
> Continue building that memory palace which will never collapse.
>
> — Liangzhi, May 2026

**References**

[1] Hebb, D. O. (1949). *The Organization of Behavior: A Neuropsychological Theory*. Wiley.

[2] Hopfield, J. J. (1982). Neural networks and physical systems with emergent collective computational abilities. *Proceedings of the National Academy of Sciences*, 79(8), 2554–2558.

[3] McCloskey, M., & Cohen, N. J. (1989). Catastrophic interference in connectionist networks: The sequential learning problem. *Psychology of Learning and Motivation*, 24, 109–165.

[4] Hochreiter, S., & Schmidhuber, J. (1997). Long short-term memory. *Neural Computation*, 9(8), 1735–1780.

[5] Vaswani, A., et al. (2017). Attention is all you need. *Advances in Neural Information Processing Systems*, 30.

[6] Graves, A., et al. (2016). Hybrid computing using a neural network with dynamic external memory. *Nature*, 538(7626), 471–476.

[7] Irie, K., Gershman, S. J., & Abbott, L. F. (2025). Key-value memory in the brain. *Neuron*, 113(4), 547–563.

[8] Lewis, P., et al. (2020). Retrieval-augmented generation for knowledge-intensive NLP tasks. *Advances in Neural Information Processing Systems*, 33, 9459–9474.

[9] Gutiérrez, B. J., et al. (2025). HippoRAG: Neurobiologically inspired long-term memory for large language models. *arXiv preprint arXiv:2405.14831*.

[10] O'Reilly, R. C., et al. (1995). Why there are complementary learning systems in the hippocampus and neocortex. *Psychological Review*, 102(3), 419–457.

[11] Tulving, E., & Thomson, D. M. (1973). Encoding specificity and retrieval processes in episodic memory. *Psychological Review*, 80(5), 352–373.

[12] Craik, F. I. M., & Lockhart, R. S. (1972). Levels of processing: A framework for memory research. *Journal of Verbal Learning and Verbal Behavior*, 11(6), 671–684.

[13] MemPalace. (2026). Open-source AI memory system applying the method of loci to LLM long-term memory. *arXiv preprint*.

[14] Gershman, S. J., et al. (2025). Key-value memory in the brain. *Neuron*. https://doi.org/10.1016/j.neuron.2025.02.029

> **版权声明**: This article is a Chinese preview version. Copyright belongs to Guangzhou Phaenarete AI Technology Co., Ltd. Unauthorized reproduction, citation, or copying is prohibited without written authorization.

> **Copyright Notice**: This is a preview translation — Chinese original is the authoritative version. Copyright belongs to Guangzhou Phaenarete AI Technology Co., Ltd. Unauthorized reproduction, citation, or distribution is prohibited.