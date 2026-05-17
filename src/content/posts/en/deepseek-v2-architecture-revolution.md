---
title: "DeepSeek-V2: Leveraging Four Ounces to Move a Thousand Pounds in the AI Arms Race of Brute Force"
date: '2024-06-01'
category: AI & Technology
tags:
  - DeepSeek
  - architecture
  - MLA
  - MoE
description: >
  A deep dissection of the DeepSeek-V2 architecture revolution: how Multi-head Latent Attention (MLA) and fine-grained Mixture of Experts (DeepSeekMoE) achieve an elegant breakthrough in the impossible triangle of compute, memory, and performance.
---

Please temporarily forget those models that pile up parameters and flaunt compute power—the "brute-force aesthetics." Today, we will use a scalpel called "first principles" to dissect, with the precision of a master butcher (庖丁解牛), this creature called DeepSeek-V2. Our goal is not worship, but understanding—understanding the ideas behind it, understanding how those engineers "emancipated their minds and sought truth from facts" (解放思想，实事求是), finding an elegant, textbook-level escape route from the impossible triangle of compute, memory, and performance.

I will use the most accessible language, ensuring every undergraduate can follow, to guide you through this architecture revolution unfolding deep inside silicon brains. This will be a knowledge feast exceeding ten thousand tokens—please fasten your seatbelt.

### **Introduction: The Behemoth's Cage and the Birth of Two "Paladins"**

The story begins with the "cage" that confines all large language models (LLMs). Imagine a model with 236 billion parameters, like a giant with 236 billion neurons in its brain. The cost of making it think once is staggering. This manifests primarily in two bottlenecks:

1. **Inference bottleneck (KV Cache crisis)**: This is the main chokepoint when an LLM memorizes and responds to long texts during conversation. The standard "Multi-Head Attention (MHA)" mechanism is like a secretary taking meeting minutes, who must record every detail of every word's "Key" and "Value" for later reference. When a conversation extends to the length of a book, this "minute book" (the KV Cache) swells larger than the model itself, instantly overwhelming the GPU's precious memory. This is why your AI chatbot becomes slow and laggy when answering long questions.

2. **Training bottleneck (cost hell)**: Training a massive, densely activated model means every token's data must activate all 236 billion parameters. This is an extravagant squandering of compute power. The electricity and GPU depreciation costs of training such a model could bankrupt a small-to-medium company.

Facing these two bottlenecks, the industry's prevailing approach has been "compromise." To solve the KV Cache problem, people invented MQA (Multi-Query Attention) and GQA (Grouped-Query Attention), which let multiple query heads share one set of KV, like multiple departments sharing one meeting minute book. But this reduces the model's understanding precision—it's like making all departments use the same rough summary, and inevitably some departments will find the information insufficient.

To solve the training cost problem, some turned to sparse models, like MoE (Mixture of Experts), splitting the massive model into multiple "expert" sub-models and activating only a portion each time. This is like a large corporation convening only the relevant expert departments for each task, greatly saving the cost of all-staff meetings. But traditional MoE, like GShard, has insufficiently fine expert division, easily causing "knowledge redundancy," and inter-expert communication and load balancing are major troubles.

DeepSeek-V2's breakthrough lies in: **it does not compromise.** It chose the difficult path of "wanting everything, and more," and creatively invented two "paladins" to solve it all:
* **Paladin A: Multi-head Latent Attention (MLA)**. The goal is to eliminate the bloated "minute book" of KV Cache.
* **Paladin B: DeepSeekMoE**. The goal is to build an extremely efficient, clearly divisioned "expert committee," achieving ultimate cost control.

These two core innovations enabled DeepSeek-V2 to achieve astonishing metrics:
* Compared to the previous generation DeepSeek 67B, **training costs were saved by 42.5%**.
* **KV cache was reduced by a staggering 93.3%**.
* **Maximum generation throughput increased by 5.76x**.

And all this was achieved with total model parameters reaching 236 billion (21B activated per token), supporting 128K context length. Let us now enter the world of these two paladins and see how they changed the rules of the game.

---

### **Chapter 2: Paladin A—MLA, a Compute Revolution Against the "Minute Book"**

To appreciate MLA's brilliance, we must first thoroughly understand its opponent—standard Multi-Head Attention (MHA). Let us dissect it step by step.

#### **1. Background: MHA—That Omnibus "Clumsy" Secretary**

Suppose our brain is processing the $t$-th word (token), with vector representation $\mathbf{h}_t$. The MHA secretary does three things to understand this word:

1. **Generate Query, Key, and Value**: Through three weight matrices $W_Q$, $W_K$, $W_V$, map $\mathbf{h}_t$ into three vectors $\mathbf{q}_t$, $\mathbf{k}_t$, $\mathbf{v}_t$.
   * $\mathbf{q}_t$ (Query): What does "I" want to know? E.g.: What adjectives precede "me"?
   * $\mathbf{k}_t$ (Key): What can "I" offer others? E.g.: "I" am an adjective.
   * $\mathbf{v}_t$ (Value): What information does "I" actually contain? E.g.: The specific meaning of "beautiful."
2. **Multi-head splitting**: To understand from different perspectives, slice $\mathbf{q}_t$, $\mathbf{k}_t$, $\mathbf{v}_t$ into 128 portions (denoted as $n_h=128$ heads, each with dimension $d_h=128$).
3. **Attention computation**: The $i$-th head's $\mathbf{q}_{t,i}$ computes affinity (dot product) with all preceding words' $\mathbf{k}_{j,i}$, then normalizes via Softmax to obtain weights, and uses these weights to compute a weighted average of the preceding $\mathbf{v}_{j,i}$. This determines which preceding words "I" should focus on.
4. **Output**: Concatenate all heads' results and pass through an output matrix $W_O$ to get the final output.

**Now the crucial question: what is KV Cache?**
To accelerate generation, when inferring the $t$-th word, all $\mathbf{k}$ and $\mathbf{v}$ vectors from words 1 through $t-1$ are cached to avoid recomputation. This cache is the KV Cache. For each token, MHA needs to cache $2 \times n_h \times d_h = 2 \times 128 \times 128 = 32768$ elements (assuming standard precision). When layer count $l=60$ and sequence length reaches 128K, the cache volume is $32768 \times 60 \times 131072$—an astronomical number.

MLA, our "paladin," enters the scene and finds MHA too clumsy, holding a thick, redundant minute book throughout.

#### **2. MLA's Core Inner Art: Low-Rank Key-Value Joint Compression**

MLA's central idea is: **meeting minutes only need to record key points, not the full transcript.** All $\mathbf{k}$ and $\mathbf{v}$ can be recovered from an extremely compressed "latent vector."

This is the meaning of "low-rank joint compression":
For a token $\mathbf{h}_t$, MLA does something astonishing: **it compresses the source of K and V into a minimal-dimension "latent space" vector $\mathbf{c}_t^{KV}$**.
* $\mathbf{c}_t^{KV} = W^{DKV} \mathbf{h}_t$
  * $W^{DKV}$ is a down-projection matrix, compressing $\mathbf{h}_t$ with dimension $d=5120$ down to a tiny dimension $d_c=512$. **Compression ratio of 10x!**
* $\mathbf{k}_t^C = W^{UK} \mathbf{c}_t^{KV}$, $\mathbf{v}_t^C = W^{UV} \mathbf{c}_t^{KV}$
  * $W^{UK}$ and $W^{UV}$ are two up-projection matrices, which, when attention computation is needed, restore this compressed $\mathbf{c}_t^{KV}$ back into full key vector $\mathbf{k}_t^C$ and value vector $\mathbf{v}_t^C$.

**This is MLA's secret to drastically cutting KV Cache!**
During inference, we no longer need to cache those huge $\mathbf{k}_t$ and $\mathbf{v}_t$! We only need to cache that compressed, tiny latent vector $\mathbf{c}_t^{KV}$! Its dimension is only $d_c = 512$.
Now, each token's KV cache element count becomes $(d_c + d_h^R) \times l$, where $d_h^R$ is the dimension of the decoupled query and key we will discuss shortly, at 64. The total is $(512 + 64) \times 60 = 34560$, compared to MHA's $32768 \times l$, when $l=60$ it is only about **2.2%** of the original, which aligns with the report's "93.3% reduction" figure.

It's like your secretary, who previously had to bring a box of loose-leaf folders containing complete meeting transcripts to every meeting, now only brings a palm-sized notebook with keywords and key-point indexes. When a transcript passage needs to be referenced, he can instantly reconstruct the full content from the indexes (via $W^{UK}$ and $W^{UV}$).

**The brilliance continues.** In typical inference, we need to recover $\mathbf{k}_t^C$ and $\mathbf{v}_t^C$ from $\mathbf{c}_t^{KV}$, then compute with $\mathbf{q}$. But MLA leverages the associativity of matrix multiplication to absorb $W^{UK}$ into $W_Q$ and $W^{UV}$ into $W_O$. This means, **during actual inference attention computation, we don't even need to explicitly compute the $\mathbf{k}$ and $\mathbf{v}$ vectors!** We can jump directly from $\mathbf{c}_t^{KV}$ to the final attention result. This further avoids computational overhead—a stroke of genius.

Additionally, MLA applies the same low-rank compression to the query vector $\mathbf{q}$ ($\mathbf{c}_t^Q$). While this doesn't reduce KV Cache, it can significantly reduce activation memory during training, making large model training more memory-efficient. This reflects MLA's "catching multiple fish with one net" (一鱼多吃) engineering aesthetics.

#### **3. MLA's Additional Technique: Decoupled Rotary Position Embedding**

The story doesn't end here. MLA encounters a powerful "rebel"—Rotary Position Embedding (RoPE).

RoPE is standard in modern LLMs; through a clever rotation transformation, it injects token position information into $\mathbf{q}$ and $\mathbf{k}$ vectors, letting the model understand word order. But the problem is: RoPE's operation is "position-sensitive" for $\mathbf{q}$ and $\mathbf{k}$.

If we directly apply RoPE on the compressed $\mathbf{k}_t^C$, what happens? The RoPE matrix acts like an uncancellable "coupling agent," sandwiched between $W^{UK}$ and $W_Q$. Since matrix multiplication is not commutative, inserting a RoPE matrix completely disables the aforementioned "absorption" technique! To compute attention, we must recompute full, RoPE-annotated $\mathbf{k}$ vectors for all historical tokens at every inference step. It's like your secretary being forced to reorganize the entire meeting minute book for every new utterance. Efficiency instantly regresses to the original problem.

This is the "RoPE incompatibility" dilemma MLA faced. DeepSeek-V2's solution is brilliantly elegant: **Decoupled RoPE.**

**They decided to completely strip the position-information function for RoPE out of the compressed KV.** They created an additional, independent set of query and key, specifically to carry the RoPE "marker pen":
* $\mathbf{q}_t^R$: a decoupled query specifically carrying RoPE information.
* $\mathbf{k}_t^R$: a **shared across all query heads** decoupled key specifically carrying RoPE information.

Finally, the complete query and key used by each attention head becomes a concatenation (concat) of two parts:
* $\mathbf{q}_{t,i} = [\mathbf{q}_{t,i}^C ; \mathbf{q}_{t,i}^R]$: one part is the content query from the latent space without RoPE, and the other is the independent position query carrying RoPE.
* $\mathbf{k}_{t,i} = [\mathbf{k}_{t,i}^C ; \mathbf{k}_t^R]$: one part is the content key from the latent space without RoPE, and the other is the **shared** independent position key carrying RoPE.

This design achieves two goals:
1. **Perfect RoPE compatibility**: RoPE is "quarantined" on the $\mathbf{q}_t^R$ and $\mathbf{k}_t^R$ appendages.
2. **Preserved compression dividends**: The core latent-space KV ($\mathbf{c}_t^{KV}$) and its recovered $\mathbf{k}_t^C$ and $\mathbf{v}_t^C$ are completely unpolluted by RoPE. $W^{UK}$ and $W^{UV}$ can still be "absorbed"; our KV cache optimization and computation optimization remain valid!

Although this design adds a shared $\mathbf{k}_t^R$ to the KV cache (with dimension $d_h^R=64$), compared to the position-understanding capability it enables and the compression advantage it preserves, this small cost is entirely worthwhile. MLA's final KV cache equals $(d_c + d_h^R) \times l$, which effectively compresses the KV cache size down to the level of only 2.25 groups in GQA, yet with performance stronger than MHA!

---

### **Chapter 3: Paladin B—DeepSeekMoE, the "Expert Parliament" with Clear Division of Labor**

If MLA performs "subtraction" and "decoupling" on the attention mechanism, then DeepSeekMoE performs "fine-grained division of labor" on the FFN (Feed-Forward Network). The FFN is the "laborer" in each Transformer block that processes information and extracts knowledge. A massive, dense FFN is like an omnicompetent "jack-of-all-trades" (万能工匠) who masters nothing—every task requires full mobilization, inefficient and costly.

MoE's idea is to split one large FFN into N small FFNs ("experts"), with each input processed by only the top-K experts. DeepSeekMoE pushes this idea to its extreme.

#### **1. Two Core Designs: Fine-Grained Segmentation and Shared Experts**

* **Fine-grained expert segmentation**: Traditional MoE, like GShard, has few experts, each still quite large. This is like a company with only a few large, ambiguously responsible departments. DeepSeekMoE does the opposite: it makes the number of experts very large (e.g., 160), but each expert becomes very small (fine-grained). **This is like decomposing the "jack-of-all-trades" into a vast guild of 160 "craftspeople" (手艺人).** This design greatly enhances expert specialization. One expert may specialize in "5W1H" interrogatives, another may excel at "negation logic," and yet another may be particularly sensitive to "subjunctive mood." The finer the division, the more precisely each expert learns its domain knowledge, and the lower the knowledge redundancy.

* **Shared expert separation**: In a vast expert guild, there is always foundational, high-frequency knowledge that everyone needs—such as basic grammar. If every "routed expert" has to learn this independently, it's a massive waste and redundancy. DeepSeekMoE cleverly introduces "shared experts." **These shared experts are permanent; all input tokens are processed by them.** It's like the guild setting up a "foundational knowledge training center," where all apprentice craftspeople (routed experts) learn from it without having to teach it themselves. The formula expresses this: $\mathbf{h}_t' = \mathbf{u}_t + \sum \text{FFN}_i^{shared}(\mathbf{u}_t) + \sum (g_{i,t} \times \text{FFN}_i^{routed}(\mathbf{u}_t))$, output = input + shared experts' knowledge + activated routed experts' knowledge.

This architecture enables DeepSeekMoE, compared to traditional MoE, to achieve stronger performance with fewer activated parameters and less total compute, because every unit of compute is invested in the most specialized "talent" and the most foundational "infrastructure," achieving ultimate economy.

#### **2. The Art of Balance: Three "Sword of Authority" (尚方宝剑)**

With so many experts working in parallel, the greatest challenge is "load balancing" and "communication overhead." If one expert is especially popular and all tasks flock to it, its device becomes a bottleneck ("hotspot"), while other experts and devices idle—training speed and efficiency plummet, and "routing collapse" may even occur.

For this, DeepSeek-V2 deployed four swords of authority:

1. **Device-Limited Routing**:
   * **Problem**: In MoE training, 160 experts are distributed across 8 devices ($D=8$). Without restriction, a token might need to find experts across all 8 devices. This triggers extremely costly cross-device (all-to-all) communication.
   * **Solution**: Hard-limit each token to at most 3 devices ($M=3$). Specifically: first identify the 3 devices whose internal experts have the highest affinity with the token, then perform top-K selection only among experts on those 3 devices.
   * **Effect**: Reduces each token's communication upper bound from 8 to 3, greatly lowering communication complexity. Experiments show that when $M \ge 3$, performance nearly matches unrestricted routing. It's like limiting a task to cross-department collaboration with at most 3 departments—drastically reducing coordination costs, and discovering you never actually needed 7 or 8 departments.

2. **Three-pronged Auxiliary Balance Loss**: Just limiting routing scope isn't enough; we must also guide experts to "proactively" achieve load balance. The report introduces three levels of balance loss functions, like invisible batons, embedded in the model's training objective:
   * **Expert-level balance loss**: $\mathcal{L}_{ExpBal}$, penalizes "hot" or "cold" individual experts, encouraging each expert to process roughly equal numbers of tokens.
   * **Device-level balance loss**: $\mathcal{L}_{DevBal}$, penalizes devices with uneven computational load, ensuring the 8 GPUs have roughly equal workloads.
   * **Communication balance loss**: $\mathcal{L}_{CommBal}$, a very elegant step. Device-limited routing already guarantees each GPU's "send" volume (at most $M$ data portions), but it cannot guarantee the "receive" volume. If one GPU is especially popular, it receives far more expert requests than other devices, causing communication congestion. This loss function penalizes such receive imbalance, encouraging each GPU to also receive roughly balanced information volumes.

   These three loss functions, like three precision counterweights, maintain the stable operation of this vast expert parliament from three dimensions: expert individuals, compute nodes, and communication traffic.

3. **Token Dropping Strategy**:
   * **Problem**: Auxiliary losses achieve "soft balancing" and cannot absolutely guarantee 100% perfect load. Occasionally, some devices briefly overload.
   * **Solution**: A simple and effective "hard" measure. During training, set a compute budget per device (capacity factor = 1.0, i.e., just enough to receive the average token count). When tokens sent to a device exceed the budget, ruthlessly drop those with lowest expert affinity.
   * **Humanizing detail**: To ensure training-inference consistency and avoid extremes, they guarantee that in about 10% of training sequences, tokens are never dropped. This lets the model learn how to compute using the most important experts even under "resource constraints," while ensuring that at inference time, you can flexibly enable or disable the dropping strategy without catastrophic performance drops.

---

### **Chapter 4: Training and Fine-tuning—From Raw Material to Fine Wine**

With MLA and DeepSeekMoE, these two elegant architectures, only the "skeleton" is established. To make the DeepSeek-V2 behemoth truly live, it still needs massive high-quality data and sophisticated training and alignment methods.

#### **1. Pre-training: Data Is King**
* **Data volume**: 8.1T tokens of pre-training corpus. Compared to the previous generation, they expanded data volume, especially Chinese data (12% more than English), building a solid bilingual foundation.
* **Data quality**: They not only invested effort in "recycling" and "cleaning" internet data, but more importantly improved filtering algorithms to remove large amounts of unhelpful data while preserving as much valuable data as possible. A more crucial step: they proactively filtered out **controversial content** from the corpus to eliminate data bias from specific regional cultures. This caused the model to perform slightly worse on some MMLU subsets related to specific cultural values, but this precisely reflects their "seeking truth from facts" (实事求是) effort in data de-biasing—not迎合 (迎合) a standard answer, but pursuing objective knowledge free from preset biases. This values choice itself deserves deep reflection.
* **Long-context extension**: After training at 4K length, they used a modified YaRN method for fine-tuning, with only 1000 steps at 32K sequence length, **magically** extending the context window to 128K. The "needle in a haystack" (大海捞针) test in the report perfectly proved the model's long-range information extraction capability.

#### **2. Alignment Training: From Capability to Utility**
With a strong base model, it must also be obedient, useful, and aligned with human values. DeepSeek-V2 adopted a two-stage alignment strategy:
* **SFT (Supervised Fine-Tuning)**: Collected 1.5 million high-quality dialogue instances covering math, code, writing, reasoning, safety, etc. They found data quality is paramount, and the model needs sufficient data volume to acquire specific skills (IFEval scores drop significantly with insufficient SFT data), refuting the claim that "a small amount of SFT data is enough."
* **RL (Reinforcement Learning)**: This is the key step to unlock model potential. They adopted their self-developed **GRPO algorithm**, which is more memory- and compute-efficient than PPO because it discards the Critic model of equal size to the policy model, estimating baselines through relative comparison of outputs within a group. The entire RL process was creatively split into two stages:
   1. **Reasoning alignment**: First optimize using code and math reward models $\text{RM}_{reasoning}$, because such problems have clear right/wrong answers and can continuously push the model's reasoning ceiling.
   2. **Human preference alignment**: Introduce a more complex multi-reward framework, combining helpfulness $\text{RM}_{helpful}$, safety $\text{RM}_{safety}$, and rule $\text{RM}_{rule}$—three reward models to guide the model toward generating answers that are both correct and satisfying.

**Here is a profound insight**: They observed that RL training on reasoning data (code/math) and RL training on general data exhibit completely different characteristics. Reasoning ability can continuously improve with training steps, while general preference alignment reaches a plateau more quickly. Splitting RL into two stages reflects a deep understanding of the phased nature of model capability development.

---

### **Chapter 5: Summary and Reflection—DeepSeek-V2's Values and Methodology**

Fellow geeks and students, our "master butcher's dissection" (庖丁解牛) journey concludes here. Now let us reflect on what DeepSeek-V2 really teaches us, beyond specific numbers.

**1. The "Seek Truth from Facts" (实事求是) Geek Spirit**
Every DeepSeek-V2 innovation was not about showing off for a paper, but about confronting real problems and pursuing first-principles solutions.
* **Facing the inference bottleneck**, they didn't settle for MQA and GQA's "hurt the enemy a thousand, hurt yourself eight hundred" compromise, but deeply studied KV Cache's essence, discovering most information is redundant, and boldly proposed low-rank compression MLA. This "cut 90% unnecessary storage from the source" approach is far more thorough than tinkering with the MHA architecture.
* **Facing the training cost bottleneck**, they weren't satisfied with traditional MoE's rough division of labor, but improved each parameter's knowledge density through "fine-grained segmentation" and "shared expert isolation." It's like saying: "We don't just want fewer experts; we want every expert to be an irreplaceable, maximally efficient domain master."
* **Facing the RoPE incompatibility problem**, they didn't choose to bypass it (e.g., abandoning RoPE or forcing coupling), but through the genius "decoupling" design, cleanly separated content and position, preserving all optimizations. This is a classic philosophical victory of "adding one layer of abstraction solves the computer science problem."

**2. "Faithfulness, Expressiveness, Elegance" (信达雅) Engineering Implementation**
Behind every number in this technical report lies extreme engineering optimization. From the FlashAttention-2 version specifically optimized for MLA, to overlapping shared expert computation with All-to-All communication, to customized CUDA kernels, and the fine-grained design of 16-bit pipeline parallelism, 8-bit expert parallelism, and ZeRO-1 data parallelism. This is not merely a lab model—it's an industrial-grade artwork designed from inception for real deployment with controllable costs.

**3. Unity of Way and Technique: Emancipating the Mind**
DeepSeek-V2's greatest contribution is **an emancipation of thought**.
It broke the assumption that "high-performance large models must be dense," proving that sparse MoE architecture can simultaneously achieve high performance and low cost in engineering.
It broke the widespread belief that "reducing KV Cache must sacrifice performance," proving that through architectural innovation (MLA) one can achieve "reducing memory, improving performance, and remaining compatible with new techniques"—a triple win.
It broke the binary debate of "RL is the only proper path for human preference alignment" or "SFT is enough," and through **two-stage RL (reasoning + preference)** practice, revealed the phased law of model capability improvement, especially the continuous strengthening of reasoning ability, opening new avenues for exploring the upper limits of model intelligence. They even pointed out the existence of an "alignment tax" (RL may damage certain standard benchmark scores) and candidly acknowledged this as future work requiring balance—this honesty and deep self-analysis is rare and precious in the industry.

**4. Echoes and Prospects**
DeepSeek-V2 is not an endpoint, but a new starting point. Its limitations—knowledge not updating, non-factual generation, limited to text and bilingual—are shared challenges of all LLMs. But more important are their next goals: performance matching GPT-4, exploring multimodality, and "aligning model values with humans while minimizing human supervision"—this touches the ultimate proposition of AI safety.

So, when we re-examine this report on June 1, 2024, we see not the rigid numbers of 236 billion parameters, but a living, evolving idea. It tells us: on the road to AGI, abundant capital and massive compute are the wind, but elegant architecture, deep engineering optimization, and a truth-from-facts spirit are the helm and sail that determine whether the ship can sail far and long.

DeepSeek-V2 is a generous gift named "Efficiency and Equality" (效率与平等), offered by geeks with wisdom and dedication, to this era. Its code and model are open-source; its ideas are even more open-source. That is the most exciting part.

> **Copyright Notice**: This is a preview translation — Chinese original is the authoritative version. Copyright belongs to Guangzhou Phaenarete AI Technology Co., Ltd. Unauthorized reproduction, citation, or distribution is prohibited.