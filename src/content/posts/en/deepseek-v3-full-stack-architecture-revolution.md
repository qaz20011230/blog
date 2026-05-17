---
title: "From MLA to MTP, from FP8 to DualPipe: DeepSeek-V3—A Full-Stack Architecture Revolution on Efficiency, Intelligence, and Engineering Philosophy"
date: '2024-12-31'
category: AI & Technology
tags:
  - DeepSeek
  - architecture
  - FP8
  - full-stack
description: >
  A deep dissection of the DeepSeek-V3 architecture revolution: a textbook of geek romanticism finding the unique optimal solution in the impossible triangle, revealing the full-stack innovation behind auxiliary-loss-free load balancing and DualPipe.
---

On the last day of 2024, fasten your seatbelts. Last time we used a "master butcher's dissection" (庖丁解牛) to break down DeepSeek-V2, exploring how it used MLA and DeepSeekMoE—two "blades of巧力"—to carve a blood path through AI's compute siege. Today, we face a全新, more massive "silicon creature"—DeepSeek-V3.

This is not merely a simple version iteration. If V2 proved the possibility of "doing big things with less money" (省钱办大事), then V3 builds upon that foundation to launch an epic charge toward the throne of "standing equal with closed-source hegemony" (与闭源霸权平起平坐). This technical report, published on December 31, 2024, is not a bland engineering summary—it is a manifesto, a textbook of geek romanticism about finding the unique optimal solution in the "impossible triangle" (performance, cost, efficiency).

Today, I will combine geek-level rigor with the 53-page technical report, guiding you into every gear and crevice of DeepSeek-V3. Our title:

**"From MLA to MTP, from FP8 to DualPipe: DeepSeek-V3—A Full-Stack Architecture Revolution on Efficiency, Intelligence, and Engineering Philosophy"**

This lecture will be hardcore, but I will ensure every logical loop is clear enough to make any STEM graduate slam the table in admiration. Let us begin.

### **Introduction: From "Saving Money" to "Performance Equality" (性能平权)—V3's Mission Escalation**

Looking back at V2, its core narrative was "economy"—using less compute, smaller KV Cache, achieving stronger performance. It was a love letter to engineers. And V3? Its narrative has escalated. The report abstract's first sentence: "We present DeepSeek-V3, a strong MoE language model with 671B total parameters, 37B activated per token." The challenge it targets: GPT-4o and Claude 3.5 Sonnet directly. Its mission is **performance equality**—maintaining extreme economy while正面 piercing through closed-source models' technical moat.

Did it succeed? The data speaks:
* **Training cost**: Only 2.788 million H800 GPU hours, approximately $5.576 million. This is merely a fraction of同等规模 closed-source model training costs.
* **Training stability**: Throughout the entire 14.8T token预训练 cycle, **no unrecoverable loss spikes occurred, no rollbacks were performed**. In超大规模 model training, this is an engineering miracle.
* **Performance comparison**: On MMLU, GPQA, MATH 500, AIME 2024, Codeforces, and a series of hardcore benchmarks, DeepSeek-V3 not only comprehensively surpassed all open-source models, but on多个关键指标 can match or surpass GPT-4o and Claude 3.5 Sonnet.

How did DeepSeek-V3 achieve this performance leap while pushing costs to the limit? The answer: it didn't optimize at one point—it conducted a "full-stack," exquisitely coordinated design across **architecture, algorithms, infrastructure, and post-training**. This is what we will dissect today.

---

### **Chapter 1: Foundation Architecture—"Standing on Giants' Shoulders" with "守正" (Conservation) and "出奇" (Innovation)**

DeepSeek-V3's skeleton still employs V2's two proven weapons: Multi-head Latent Attention (MLA) and DeepSeekMoE. But this is not simple reuse—it's "守正出奇" (conserving the core while innovating brilliantly): while坚守 core values, it plays two extremely beautiful "innovative strikes"—**auxiliary-loss-free load balancing** and **Multi-Token Prediction (MTP)**.

#### **1.1 Conservation: MLA—The De-Redundancy Philosophy of Compression Art**

For MLA, we already dissected it thoroughly in the V2 analysis. Its core idea: the KV Cache "minute book" is full of redundancy; we only need to compress its essence into a极低 dimension "latent space" vector $\mathbf{c}_t^{KV}$. Then the decoupled RoPE mechanism ensures位置 information is unpolluted, allowing the matrix absorption optimization to运行 perfectly.

V3's MLA structure is virtually identical to V2, which means **the MLA architecture has been validated at scale and is now the optimal solution**. It remains the基石 of DeepSeek-V3's efficient inference. The entire KV Cache compression dimension $d_c$ is still 512, the decoupled key dimension $d_h^R$ still 64. Compared to standard MHA, the memory savings during 128K long-context inference are decisive. In the V3 paper, they didn't restate MLA's performance advantages over MHA/GQA—this is already settled结论; their重心 shifts to the next step. This is our thinking's起点, not终点.

#### **1.2 First Innovation: Auxiliary-Loss-Free Load Balancing—Liberating MoE's "Free Market"**

This is DeepSeek-V3's greatest思想解放 in MoE architecture. To appreciate its brilliance, we must first critique the旧时代's "original sin" (原罪).

**1.2.1 The Original Sin of the Old Era: How Auxiliary Loss Harms "Expert Specialization"**
Traditional MoE, like GShard, introduces "Auxiliary Loss" to ensure no expert is "idle" (赋闲) or "overworked" (过劳). This loss function is like a planned-economy committee (计划经济委员会), directly computing the variance of expert load and硬塞 gradient penalty terms into the model's total loss, forcibly making experts practice "egalitarianism" (平均主义).

What's the problem? It's huge. The report's experimental results一针见血 reveal this. Comparing auxiliary-loss-based versus auxiliary-loss-free models, the latter show **significantly stronger expert specialization patterns** across different domains (e.g., Wikipedia, Github, mathematics). Some experts become "code gods" (代码大神), others become "math professors" (数学教授).

**Auxiliary loss's essence is using a全局, rigid metric to constrain a system that should be高度灵活 and self-organizing.** It's like requiring all university professors to recruit exactly the same number of students—结果 flattening disciplinary差异, so no one can become a领域顶尖 expert. This is why V2, though strong, had its MoE potential still束缚 by this planned-economy system.

**1.2.2 The New World Order: Dynamic Adjustment Based on Bias**
V3's "出奇" (innovation) lies in completely discarding the auxiliary-loss backbone, designing a堪称天才 "auxiliary-loss-free load balancing" strategy. Its core: introducing a极其简单 mechanism—adding a learnable **bias term** $b_i$ for each routed expert $i$.

* **Dynamic adjustment**: After each training iteration, the system统计 all experts' load across the entire batch.
  * If an expert is "overworked" (received above-average tokens), in the next step subtract a small value $\gamma$ (bias update speed) from its $b_i$,降低 its affinity score, letting it "rest."
  * If an expert is "idle," add $\gamma$ to $b_i$,提升 its presence.
* **The art of decoupling**: This bias term $b_i$ **is only used for Top-K routing decisions**, i.e., determining which experts are activated. Once activated, the gating value $g_{i,t}$ actually multiplied with the expert's FFN output is still computed from the **original, unbias-corrected, semantically truthful affinity score** $s_{i,t}$.

**This decoupling is妙到毫巅 (brilliant to the utmost)!** It means the model's routing decisions can make轻微 adjustments for the systemic need of "load balancing" (bias routing), but the "voice weight" (话语权) the model ultimately赋予 each expert—the gating value—still rests on their真实理解 of that token. It's like in a parliament, where to平衡各党派 speaking time, the rotating chair can微调 speaking order (bias), but议员' speaking content, weight, and depth (gating value) are entirely determined by their own专业水平,不受 the chair's intervention.

Experiments证明 this auxiliary-loss-free strategy consistently outperforms pure auxiliary-loss-based methods on几乎 all benchmarks, with higher expert specialization. This is a深刻颠覆 of MoE training methodology: **We don't need an external "god" to强制 balance; we only need a simple, self-adaptive market rule to let the system自发 reach dynamic equilibrium and specialization.** This is economic liberalism's完美映射 in AI.

**1.2.3 Third Insurance: Sequence-Level Complementary Loss and Node Constraints**
For绝对 safety, V3 also retains an ultra-lightweight "sequence-level auxiliary loss" $\mathcal{L}_{Bal}$, with平衡因子 $\alpha$ set to an极小值 of 0.0001. It merely prevents灾难性 extreme imbalance within some极短 sequence—a "low-pressure safety airbag."

Simultaneously, V3延续 V2's device/node-limited routing: each token is sent to at most 4 nodes ($M=4$), activating 8 experts per token. This组合拳 ensures the entire training process remains rock-solid under the复杂拓扑 of 256 routed experts with 64-way expert parallelism.

#### **1.3 Second Innovation: Multi-Token Prediction (MTP)—Forcing the Model to Learn "Long-Term Planning"**

This is a training objective that makes the model smarter.

**1.3.1 From "Guessing the Next Word" to "Predicting the Next Chess Move"**
Standard自回归 language models only predict the next token. This is like learning chess by only looking one move ahead. V3's MTP (Multi-Token Prediction) objective要求 the model at each position to not only predict the next token but also **sequentially predict the subsequent N tokens** (in V3, $D=1$, i.e., predict the next 1 and next 2 tokens).

This idea comes from Gloeckle et al., but V3's implementation is more精巧. It doesn't use several independent output heads for并行 prediction; it establishes a **complete causal chain**.

**1.3.2 Sequential Prediction on the Causal Chain**
V3's MTP implementation is非常讲究. It consists of $D$ sequential MTP modules. For the 1st MTP module (predicting the 2nd-next token):
* **Input fusion**: It concatenates the main model's representation of the current token $\mathbf{h}_i^{main}$ with **the embedding of the next future token** $\text{Emb}(t_{i+1})$, fusing them through a projection matrix $M_1$.
* **Module processing**: This fused vector is fed into an independent Transformer Block $\text{TRM}_1$.
* **Independent output**: A **shared output head** $\text{OutHead}$ predicts $t_{i+2}$ based on that Block's output.

The精妙之处: the MTP module's Transformer Block, Embedding layer, and Output Head are all **independent but partially shared with the main model**. It lets the model, when predicting $t_{i+2}$, not only see $t_i$'s深层语义 representation but also directly feed $t_{i+1}$'s word embedding as a "hint." This迫使 the model, when expressing $t_i$, to "pre-install" plans and blueprints useful for predicting multiple future tokens, not just considering one step.

Experimental results show MTP策略 consistently improves model performance on大多数 benchmarks. More importantly, this has an逆天外挂 at inference time: **Speculative Decoding** (投机采样). During inference, the main model can quickly draft $t_{i+1}$, then MTP modules低成本 verify $t_{i+2}$, thereby generating multiple tokens at once—achieving up to 1.8x TPS (tokens/second) acceleration.

This is the远见 of architectural design.

---

### **Chapter 2: Infrastructure—Extreme Engineering Compression for $180K/1T Tokens**

If Chapter 1 is algorithmic art, this chapter is engineering's brute-force aesthetics. To make a 671B creature run on 2048 H800 GPUs with costs as low as only 180K GPU hours per 1T tokens, the DeepSeek team conducted a revolution at the system level no less than the architectural innovation. Their goal: **swallow all communication overhead, squeeze every transistor's value.**

#### **2.1 Compute Cluster and Training Framework: H800's 2048-Part Symphony**
The cluster is 2048 NVIDIA H800 GPUs, intra-node NVLink (160 GB/s), inter-node InfiniBand (IB, 50 GB/s). This is a typical bandwidth-asymmetric environment. The training framework is their self-developed高效轻量级 HAI-LLM. The overall parallelism strategy: 16-way pipeline parallelism (PP) + 64-way expert parallelism (EP,跨 8 nodes) + ZeRO-1 data parallelism (DP). This is the总谱 of this engineering symphony. But to perform it well requires全新 instruments.

#### **2.2 DualPipe: Treating Time as Lego, Treating Communication as Air**
Old pipeline parallelism (like 1F1B) has大量 "pipeline bubbles"—GPU idle waiting. To消除 bubbles and solve MoE跨节点 communication as the核心瓶颈, they invented **DualPipe**, whose核心思想 is极致疯狂: **complete overlap of computation and communication.**

* **Bidirectional pipeline scheduling**: DualPipe injects micro-batches from both ends of the pipeline simultaneously, like two逆流 streams meeting in a valley for energy exchange. This本身就大大 reduces traditional单向 pipeline idle等待 time.
* **Surgical decomposition and orchestration of micro-batches**: This is the精华所在. They精细拆解 each micro-batch's forward and backward computation into four compute components: Attention (ATTN), All-to-All Dispatch, MLP, All-to-All Combine. Backward is further拆解 into "backward w.r.t. input" and "backward w.r.t. weights."
* **Time Lego**: Like assembling Lego, they交错编排 these compute components and communication time slices. When one micro-batch is communicating (e.g., dispatching its tokens to experts on other GPUs), while that communication channel is occupied, another micro-batch on the same GPU starts executing MLP computation on the compute units (Tensor Cores). **Through精细手动调整, they achieved让 expensive All-to-All全互联 communication overhead be almost 100% hidden by computation time.**

This means, for the model, expensive跨节点 communication overhead仿佛消失了! The paper lists DualPipe's advantages over 1F1B and ZB1P in bubbles and memory. Even更惊人, they指出: "As long as we maintain a constant compute-communication ratio, we can continue扩大跨节点 fine-grained experts while maintaining near-zero All-to-All communication overhead." This paves the way for future万卡, 十万卡 cluster training.

#### **2.3 Customized Communication Kernels: Squeezing the Last Drop of Bandwidth from IB and NVLink**
Paper-only overlap algorithms must靠极致底层实现 to work. The report展示 their purpose-built专用内核 for跨节点 All-to-All communication.

* **Topology-aware communication pattern**: They深刻理解 IB and NVLink's bandwidth差异 (~1:3.2), thus designing dedicated communication flows. Each token first sends via IB to the目标节点's same-index GPU, then immediately "lightning forwards" via NVLink to the GPU持有 the目标专家. Thus, IB and NVLink communication is also完全重叠 and流水线化.
* **Warp Specialization and Dynamic Adjustment**: They dedicate 20 SMs (Streaming Multiprocessors) to communication, dividing them into 10 communication channels. Using PTX instructions for线程束特化, separately handling IB sending, IB-to-NVLink forwarding, and NVLink receiving. And the warp count分配 per task动态调整 based on实时 load. This极限压榨 of hardware resources使得 only 20 SMs吃满 IB and NVLink's full bandwidth.

#### **2.4 The Light of Open Source: FP8 Training—First Successful Validation on Ultra-Large-Scale Models**
This may be DeepSeek-V3's最伟大 technical contribution to the entire AI community. If BF16 is AI training's gold standard, then FP8 is a theoretically faster but极其危险 "alchemy" (炼金术). Due to极窄 dynamic range, overflow and instability risks are极高. The V3 team not only率先 validated FP8 training's可行性 on such a庞大 model but also提出 a complete, very细致 methodology.

**2.4.1 Mixed-Precision Framework: Putting Steel Where It Matters**
Their FP8 mixed-precision framework's core思想: most compute-intensive operations (the three GEMMs of linear layers: forward Fprop, activation backward Dgrad, weight backward Wgrad) are conducted in FP8 to实现 theoretical throughput doubling. But precision-sensitive components—embedding layers, output heads, MoE gating, normalization operators, attention operators—are **all kept at BF16 or FP32 precision**. This精细分类 governance is稳定训练's first line of defense.

**2.4.2 Fine-Grained Quantization: The Weapon Against "Feature Outliers"**
Standard FP8 quantization is张量级: one scaling factor for the entire activation or weight matrix. But极端 "outliers" (异常值) in activations can崩溃 the entire tensor's quantization precision. V3's approach: "Fine-Grained Quantization" (精细粒度量化):
* **Activations**: grouped and scaled at the $1 \times 128$ "tile" level (i.e., per token, per 128 channels).
* **Weights**: grouped and scaled at the $128 \times 128$ "block" level.

This operation requires applying per-group scaling factors along GEMM's inner dimension K, which standard FP8 GEMM不支持. But结合 their efficient FP32 accumulation strategy, it can be巧妙实现. More importantly, this design高度一致 with the "microscaling format"未来 NVIDIA Blackwell GPUs will支持, demonstrating前瞻性 architectural intuition.

**2.4.3 Improving Accumulation Precision: The "Mid-Promotion" That Rescues Precision**
FP8 GEMM on NVIDIA H800's Tensor Core internally accumulates with only approximately 14-bit precision,远低于 FP32. Under large inner dimension K, this引入巨大误差. They adopted a "promote to CUDA Core" strategy: every $N_C=128$ elements of matrix multiply-add operations (MMA), partial sums are copied from Tensor Core's有限精度 registers to FP32-precision CUDA Core registers for完整精度 accumulation.

This is like an accountant doing庞杂 addition—periodically transcribing figures from scratch paper to a formal precise ledger. Although理论上 slightly降低 Tensor Core's instruction dispatch rate, through two Warpgroups交替执行 (one computing, one promoting),高度重叠 is achieved, with极小 impact on overall speed. This is one of the决定性 technical细节 enabling FP8 training success.

#### **2.5 The "Combined Punch" for Memory Savings**
* **Recomputation**: RMSNorm and MLA up-projection both选择 recomputation, not saving their output activations,大大 saving memory.
* **Low-precision storage and communication**: Optimizer states use BF16; activations cached as FP8 (for attention backend input, even a定制 E5M6 format is used); MoE up-projection pre-activations are量化为 FP8 before communication. This组合拳下来, memory and communication bandwidth压力骤减, enabling them to **完全避免 using expensive and复杂 tensor parallelism (TP)**.

In summary, the infrastructure chapter展现 is a geek spirit that does not妥协 to physical limits: through协同设计 of algorithms, software, and hardware potential, every瓶颈 is crushed, swallowed, or fused. This is DeepSeek-V3's true基石 for achieving不可思议 economy.

---

### **Chapter 3: Pre-training—Steady Sailing in the Ocean of 14.8T Tokens**

With powerful engines, it's time to set sail. DeepSeek-V3's预训练 process is likewise a典范 of engineering and data science.

#### **3.1 Data and Hyperparameters: The Art of Scale and Detail**
* **Data**: 14.8T tokens, improving data quality over V2, especially增强数学 and code sample比例, expanding多语言 coverage. Notably, they沿用 DeepSeekCoder-V2's validated **Fill-in-Middle (FIM)** strategy, applied with 0.1 probability in预训练, further增强 the model's code understanding and generation capabilities.
* **Learning rate**: Adopted an极其精细 scheduling strategy. Before 10T tokens, maintain $2.2 \times 10^{-4}$ constant learning rate; then use 4.3T tokens for cosine decay to $2.2 \times 10^{-5}$; finally 500B tokens with a two-stage极低 learning rate微调. This strategy is like精心打磨 a massive crystal—first using coarse abrasive to shape, then fine sandpaper to polish, pursuing极致.
* **The miracle of stability**: Throughout the entire 14.8T token预训练,历时 less than two months, **no loss spikes occurred, no rollbacks**. In超大规模 model training, this is virtually a神迹. This得益于 all the前面 architecture and infrastructure's solid design, especially the auxiliary-loss-free MoE strategy. This stability itself is价值连城.

#### **3.2 Long-Context Extension and Performance: 128K Is Just the Beginning**
Using a similar YaRN method as V2, in two stages extending context window from 4K to 32K then to 128K. "Needle in a haystack" (大海捞针) test passed完美.
The final预训练 base model DeepSeek-V3-Base became **当时 the strongest open-source base model, especially on code and mathematics**. It数据碾压 Qwen2.5 72B and LLaMA-3.1 405B. This证明 V3's先进 architecture and training strategy enable 37B activated parameters to爆发 energy far超越 their "size."

---

### **Chapter 4: Post-Training—Distillation and Alignment from "Wise" (智者) to "Sagely" (慧者)**

The base model has strong "intelligence" (智力); subsequent post-training赋予 it "wisdom" (智慧) and "emotional intelligence" (情商).

#### **4.1 SFT: Distilling DeepSeek-R1's "Inner Cultivation Method" (内功心法)**
This section is one of the report's精华. They faced a dilemma: DeepSeek-R1 series models, through Long Chain-of-Thought (Long-CoT), solve极难 problems, but输出冗长,过度思考,格式糟糕. How to注入 R1's强大推理能力 into the general model V3 while保持 response concisense and elegance?

They adopted the **art of knowledge distillation** (知识蒸馏).
1. **Train expert models**: First use SFT and RL on code, mathematics, etc. to train "expert models." These expert models themselves融合 R1's long-CoT data and traditional short-CoT data.
2. **Carefully construct SFT data**: For each problem, they generate two types of training data:
   * Type 1: <question, original concise response>. Preserves direct, efficient response style.
   * Type 2: <system prompt + question, R1-style detailed response>. The system prompt includes instructions like "please include reflection and verification mechanisms," using R1's thinking process as an范例.
3. **RL internalization**: Use this expert model as a generator,筛选 high-quality samples through rejection sampling. Then let V3微调 with this SFT data包含 R1 thinking patterns, followed by RL training.

Through this方式, V3 is like a天才学徒—by观摩 the master's (R1) detailed解题草稿 (long CoT), learning that严谨 reflection-verification pattern, but最终呈现 its own clear, accurate perfect答卷. After adding R1 distillation, accuracy on MATH-500 soared from 74.6% to 83.2%, at the代价 of average response length increasing from 769 to 1510. They最终选择 the configuration achieving最佳平衡 between accuracy and length. This is简直是 the AI version of "learn from the barbarians' superior skills to strengthen oneself" (师夷长技以自强).

#### **4.2 RL: Self-Rewarding and Constitutional AI**
In the RL stage, besides the惯例 of using GRPO to替代 PPO for memory savings, V3's greatest亮点 lies in **Self-Rewarding** and **Constitutional AI** thinking.
* **In general domains**, many problems lack standard answers (e.g., creative writing),无法 be scored by rules or compilers. They转而 use DeepSeek-V3 itself, through **Voting**, as a Generative RM (Generative Reward Model) to provide反馈 on its own responses.
* DeepSeek-V3 as a评判者, its performance on RewardBench already并驾齐驱 with GPT-4o-0806 and Claude 3.5 Sonnet, and can be even stronger through voting.
* This意味着 V3 can将 its own强大 evaluation capability to optimize itself, forming a自我改进 flywheel. This opens Pandora's box of "AI aligning AI," also展现 DeepSeek's极致追求 of automated and scalable methods on the path toward AGI.

---

### **Chapter 5: Summary and Prospects—The Light of Open Source and Unfinished Roads**

On the last day of 2024, looking back at this沉甸甸 technical report, how should we定义 DeepSeek-V3?

**1. It is a systemic, full-stack victory.**
V3's strength is not any single technology's strength, but a完整链条 victory comprising algorithms (MLA/DeepSeekMoE/MTP), algorithmic策略 (Aux-Loss-Free), compute framework (DualPipe),底层 precision (FP8), data策略 (FIM), and post-training方法 (R1 distillation). Every环节 is pushed to极致, interlocking,最终 creating this高效, stable, and强大 inference machine.

**2. It emancipated thought, redefining MoE.**
The auxiliary-loss-free strategy is its最大哲学贡献. It证明 we can放弃强制性,惩罚性 loss functions and, through a简单, self-adaptive feedback dynamic bias mechanism, let a复杂系统自发 tend toward equilibrium and specialization. This is an优雅结合 of engineering and science that尊重 system complexity.

**3. It accelerated AGI's democratization process.**
A model with training costs of only $5.57 million,追平 or超越 closed-source behemoths耗费数百 millions or even数十亿 dollars on多个指标. DeepSeek-V3 not only open-sourced model weights but公开 all关键 engineering details and algorithmic配方 in the report. This is top-tier open-source spirit of "giving fish, but also teaching fishing" (授人以鱼，更授人以渔). It让 worldwide researchers and engineers believe the path to未来 AGI is不止 one capital-paved thoroughfare; there is also a险峰 of思想 and engineering innovation.

**Of course, it also candidly faces limitations.**
* **Deployment门槛**: Recommended deployment units are large, burdening small teams.
* **Factual knowledge**: Still落后于 GPT-4o on English SimpleQA, a result of training data distribution and策略选择 (stronger Chinese).
* **Architectural potential**: They themselves展望突破 the Transformer architecture, pursuing无限上下文 futures.

**Conclusion**
DeepSeek-V3 is not an endpoint; it is a起点. It昭示 us that on the漫长征途 toward AGI, abundant capital may be the initial booster, but only执着探究 of first principles,极致追求 of systems engineering, and the scientific spirit of "emancipating minds, seeking truth from facts" (解放思想，实事求是) are the永恒引擎 driving us to最终突破 the "singularity."

This report is DeepSeek's gift to the entire AI world in 2024—a perfect答卷 titled "How We Approach the Future" (我们如何接近未来). And now, the future has arrived—it is just not yet popular (未来已来，只是尚未流行).

> **Copyright Notice**: This is a preview translation — Chinese original is the authoritative version. Copyright belongs to Guangzhou Phaenarete AI Technology Co., Ltd. Unauthorized reproduction, citation, or distribution is prohibited.