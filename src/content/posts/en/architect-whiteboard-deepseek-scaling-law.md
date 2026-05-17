---
title: 架构师的白板：从C2C到AGI，深度复盘DeepSeek Scaling Law背后的极致务实
date: '2024-02-01'
category: AI & Technology
tags:
  - DeepSeek
  - Scaling Law
  - AGI
  - 架构
description: >
  从2012年阿里巴巴B2B私有化的架构挑战出发，深度复盘DeepSeek LLM论文中的长期主义与极致务实，探讨通往AGI的Scaling Law规律与方法论。
---

## Prologue · The Architecture Diagram in the Late Night

Late one night in June 2012, Hangzhou.

Alibaba's B2B business had just completed its privatization delisting from the Hong Kong Stock Exchange. I sat in my office, a massive system architecture diagram spread before me. At that time, our platform processed over 1 billion service calls daily, supporting the businesses of more than 20 million merchants worldwide. An inescapable question hung over my head: **When business scale expands tenfold, can this architecture still hold?**

This question seems simple, but answering it sends chills down your spine. Not because the technology wasn't good enough, but because—**we actually had no reliable method for predicting the costs and benefits of "scaling up" itself.** How much performance improvement would adding servers bring? If data volume doubled, how should model complexity be adjusted? These decisions relied more on experience and intuition than on precise science.

Over a decade later, I sit in an office in Guangzhou. The "architecture diagram" before me has transformed from an e-commerce system into a paper—the paper published by the DeepSeek team, *DeepSeek LLM: Scaling Open-Source Language Models with Longtermism*. After reading it, I felt a long-absent resonance.

This is not a paper about "how big a model we made"—it's a paper about **"how we found a method to reliably predict the effects of scaling up"**. It attempts to answer precisely the question that haunted me on that late night in 2012—except this time, not at the scale of e-commerce architecture, but at the scale of the path toward Artificial General Intelligence (AGI).

What struck me most was their core proposition: **Longtermism (长期主义).** This is not an empty slogan. In this context, it means: rather than burning money once to build a massive model and then炫耀 benchmark scores, spend time understanding the intrinsic规律 of "scaling" itself. Once you grasp the规律, you can use small, cheap experiments to predict the performance of large, expensive models.

This is like navigation. Early explorers relied on courage and luck; modern navigation relies on precise charts and weather forecasts. What the DeepSeek team wanted to do was draw the "nautical chart" for large models.

But this task is far harder than imagined. Why? Because the previously drawn "charts" were actually contradictory.

**In 2020, OpenAI published a famous Scaling Law paper.** They studied the relationship between model parameter count N, training data volume D, and compute budget C, concluding that if the compute budget increases, you should allocate most of the新增 budget to **expanding model parameters N**, with relatively less increase in data volume D. Specifically, their fitted relationship was approximately N_opt ∝ C^0.73, D_opt ∝ C^0.27. That is, the exponent for model scale was 0.73, and for data only 0.27.

**But in 2022, DeepMind's Chinchilla paper** reached the opposite conclusion. They claimed to have conducted more rigorous experiments and found that: **data and model are equally important, nearly a 50-50 split.** Their fitted results were N_opt ∝ C^0.49, D_opt ∝ C^0.51—essentially half and half.

One says 73:27; the other says 50:50. This gap is too large to ignore. As a technical决策者, whom should you trust? If you follow OpenAI's advice and pour millions of dollars into expanding the model, only to discover the bottleneck is actually insufficient data, those millions go down the drain. The reverse holds equally.

This is why the DeepSeek team decided to研究 Scaling Law from scratch themselves. In their words, the differing previous conclusions "casts a dark cloud over scaling LLMs." They wanted to personally dispel that cloud.

And this is my original motivation for writing this ten-thousand-character teardown.

I will use my **dual identity as architect and physics apprentice** to dissect this paper for you from beginning to end. No formula-stacking, no jargon搬运—only physical intuition and everyday analogies. I guarantee that any undergraduate reading this can understand what story this seemingly arcane AI paper is fundamentally telling.

Alright, let us begin.

---

## Movement One · Calibrating the Furnace

Ancient alchemists讲究 "furnace-fire perfection" (炉火纯青). If the furnace isn't built well and the fire temperature isn't mastered, what's produced is slag. Large model training is the same. Before discussing the profound Scaling Law, the DeepSeek team devoted extensive篇幅 to their foundational work—how data is cleaned, how models are built, how tokenizers are designed.

These sections are easy to skip in the paper, but as someone who once built the foundational architecture of an e-commerce platform, I know deeply: **what determines how high the upper structure can rise is always the foundation.**

### Ingredient Preparation: The Art of Data Cleaning

Large models eat data. Data quality directly determines model quality. It's the same principle as cooking—the ingredients a Michelin chef uses versus those of a street stall, can the dishes be the same?

The DeepSeek team's data processing followed three steps: **deduplication, filtering, and remixing.**

**Deduplication** is far more complex than it sounds. Imagine organizing a massive library. Some books are unique copies; others have dozens of duplicates scattered across different shelves. If you don't deduplicate, the model will read the same book dozens of times—not only is this wasteful, but more terrifyingly, the model will mistakenly assume the views in that book are "mainstream views" because their frequency has been artificially inflated.

But the difficulty lies in: how do you define "duplicate"? Two identical documents are easy to spot. But if someone changed 10% of the words in an article, does that count as a duplicate? If an article was translated into Chinese, Japanese, and French, does that count as duplication?

The DeepSeek team conducted a very meticulous experiment. They found that if deduplication is performed only within a single data dump, the deduplication rate ranges from 22% to 46%. But if cross-duplication is performed across 91 dumps横向, the deduplication rate reaches **89.8%**—meaning nearly nine-tenths of duplicates were eliminated. This number reminded me of when we did e-commerce search—we also only truly solved the problem of duplicate product listings through cross-duplication across multiple index shards. **In engineering, the answer to many difficult problems lies in the four characters "横向打通" (cross-integration).**

**Filtering** is the step that more考验功力. How to judge a document's quality? You can't rely on manually reading each one—the volume is too large. You must design automated quality评估标准. The paper mentions they integrated "linguistic analysis and semantic evaluation"—put plainly, scoring from two dimensions: whether the language flows smoothly, and whether there is substantive content.

This reminds me of an analogy. Good data is like nutrient-rich food; bad data is like junk food—it fills you up, but builds fat not muscle. A model trained on junk data may have参数 that go up, but its reasoning ability is abysmal.

**Remixing** is the final step. Different knowledge domains occupy unequal proportions on the internet. Entertainment gossip may occupy 90%, while serious mathematical reasoning accounts for only 0.1%. If fed to the model as-is, it will only write八卦, not do math. So you must deliberately adjust proportions, increasing those "minority but nutritious" data—this is like formulating cat food, where protein, fat, and carbohydrates must be in reasonable ratios.

### Foundation Design: Why 95 Layers Instead of Wider?

For model architecture, DeepSeek largely followed LLaMA's design. But one "微调" (fine adjustment) is particularly值得玩味.

Their 67B model has **95 layers**, while the comparable LLaMA 70B has only 80 layers. With total参数量 roughly the same, DeepSeek chose "deeper" rather than "wider."

What's the rationale here?

Imagine you're building an office tower with a fixed total floor area. You have two options: build it shorter but with larger floor plates per story (wider), or build it taller with smaller floor plates per story (deeper). Which is better?

For an office building, a taller structure can accommodate more departments with independent offices, with clearer functional分区. For neural networks, **deeper means more "levels of abstraction"**—each layer can further refine and compose the features from the previous layer.

This is like understanding a joke. The brain's neural processing may also have levels: the first layer recognizes this as language; the second layer grasps the literal meaning; the third layer catches the possibility of a pun; the fourth layer combines context; the fifth layer finally finds it funny. More layers enable processing of higher degrees of abstraction.

But why not deepen infinitely? Because there are two致命问题.

The first is **gradient vanishing/explosion**. With too many layers, the signal becomes increasingly weak (or increasingly strong) as it propagates from the last layer back to the first, causing earlier layers to learn nothing. Fortunately, modern architectures (RMSNorm, SwiGLU, Rotary Embedding, etc.) have largely resolved this problem.

The second is **inference efficiency**. Deeper layers mean inference must be computed serially—layer 52 cannot begin work until layer 51's results are available. If layers are too deep, even if single-layer computation is fast, total latency becomes maddening. "Widening" (increasing d_model dimension) can be accelerated through parallelization.

DeepSeek chose 95 layers, indicating they found a balance between "high abstraction capability" and "inference latency." Deeper, but not excessively deep. This decision has no magic—only tradeoff. And identifying and navigating tradeoffs is precisely the core capability of an architect.

### A Small and Beautiful Detail: The Tokenizer

The tokenizer (分词器) is responsible for splitting raw text into the smallest units the model can process. In English, "apple" might be one token; in Chinese, "苹果" is typically one token.

DeepSeek uses the BBPE (Byte-Level BPE) algorithm, with a vocabulary size of 102,400. An interesting细节: they split numbers into individual digits—for example, "2024" is not a whole token but four tokens: "2", "0", "2", "4".

Why do this? I didn't understand at first either. Upon seeing the explanation, I realized: **combinations of numbers are infinite, but individual digits are only 10.** If every number combination were treated as an independent token, the vocabulary table would explode. More importantly, once拆开, the model can truly "compute"—it can see the relationship between "2" and "4", rather than vomiting a black box called "2024" directly. This lays the groundwork for mathematical reasoning capability.

This reminds me of a line from the *Dao De Jing* (《道德经》): "图难于其易，为大于其细" (Accomplish the difficult by handling the easy; accomplish the great by attending to the small). The greatest difficulties must be approached through the easiest; the greatest tasks must be始于 from the smallest details. The success of large models often lies not in grand narratives, but in these late-night decisions抠细节.

---

## Movement Two · Drawing the Treasure Map

Movement One discussed "building the furnace." Now the furnace is built, and the most core part arrives.

Imagine you are the leader of an expedition, searching for treasure in a vast mountain range. You have limited supplies and manpower (compute budget C). You need to decide: send more people to explore (Model scale), or collect more detailed local data (Data scale)? How to allocate for maximum efficiency?

This is precisely the question Scaling Law attempts to answer. And DeepSeek's contribution, in my view, is making the question itself more precise.

### 3.1 The Broad Valley of Hyperparameters

In machine learning, there are numerous "hyperparameters" to set—learning rate, batch size, and so on. These parameters don't directly determine model capability, but severely affect training effectiveness.

The question is: **when your model scale expands from 100 million parameters to 10 billion, do the optimal values of these parameters change?**

Earlier经典研究 (such as OpenAI's Kaplan et al.) found that optimal batch size似乎 only relates to the最终性能目标, with little relationship to model size or compute budget. If so, you don't need to repeatedly experiment—just use the previous optimal values.

But DeepSeek found otherwise. After conducting large-scale grid search, they concluded: **optimal batch size B increases as compute budget C increases, and optimal learning rate η decreases as C increases.** They fitted explicit formulas.

What physical intuition lies behind this?

Learning rate determines the magnitude of each parameter adjustment the model makes. Large learning rate means big steps—fast learning but easy to overshoot the optimal solution. Small learning rate means fine steps—precise but potentially too slow. **When compute budget is large, you can run more steps, so you can afford to reduce the learning rate for finer traversal.** Larger batch size means more data per batch, more accurate gradient estimates, more stable training, but also heavier per-batch computation. With a larger budget, you have more computational margin to bear the benefits of larger batches.

The关键 lies in another phenomenon they discovered: **the optimal parameter space is very broad.**

In their words, as long as your parameters fall within that region, **"generalization error remains stable across a wide range of choices."** Elsewhere, they labeled any model whose泛化误差 was no more than 0.25% above the lowest point as "near-optimal."

0.25%. This means that slight deviation from optimal settings results in negligible performance loss.

They plotted the optimal region—not as a line, but as a **broad band**.

This finding has enormous significance for engineering deployment. It means before training a large model, you actually **don't need super expensive experiments to precisely locate that optimal parameter point.** You only need to carefully predict a general range through small models, and during large model training, you'll most likely land within this "broad valley." You won't be teetering on a cliff edge—you'll be walking on a flat plateau.

As an engineer, this gave me a huge sigh of relief. It transforms "玄学调参" (arcane parameter tuning) into "大约摸就行" (rough approximation is fine).

### 3.2 The True Flow of Computation: Why C ≠ 6ND?

I knew from the title that this would be the most hardcore section of this chapter. But also the most brilliant. I'll strive to let readers without mathematical background also appreciate the beauty of its logic.

All previous scaling law studies, when correlating "computation C" with "model size N" and "data volume D", used an approximate formula:

**C ≈ 6ND**

How does this formula arise? One training step (per token) requires approximately 2N floating-point operations for forward propagation (one multiplication, one addition), approximately 4N for backpropagation, totaling 6N. So processing D tokens requires total computation of 6ND.

Approximate, but not精确.

The problems arise in two places. First, what does this N actually represent? Kaplan used "non-embedding-layer parameters N1"—the layers where most computation occurs. Hoffmann used "full parameters N2", including embedding layers. The two can differ by more than a factor of two on small models.

Second, and most critically, **both忽略 the computational cost of the attention mechanism.** In large models with long sequences, attention operations are extremely expensive.

The DeepSeek team introduced a new metric:

**M = Non-embedding-layer FLOPs/token**

That is, the actual floating-point operations per token as it passes through the model, **including attention operations, but excluding the vocabulary mapping portion (because vocabulary mapping contributes little to "intelligence").**

What's remarkable about this?

The old formula C = 6ND is an approximation; actually, when you say "I want to give this model 1e20 of compute," if you use the old formula, the actual compute may have systematic误差. When comparing models of different sizes and configurations, your comparison baseline is distorted.

**And M flattens the comparison baseline.** On extremely small models, the old formula gives 6N1/M = only 0.43, meaning it severely underestimates actual computation. On the largest models, N2/M reaches 0.94, which is more accurate. If you try to extrapolate large model behavior from small models, a formula carrying systematic误差 will point you in the wrong direction.

It's like trying to measure a distance with a rubber ruler—tight when measuring short distances, loose when measuring long ones, producing entirely歪的 readings. What DeepSeek did was switch to an accurate steel ruler.

They used this "steel ruler" to重新 conduct IsoFLOP experiments.

IsoFLOP means "equal computation." Given a fixed compute budget, say 1e20 FLOPs, try different ratios of model size and data volume to see which ratio achieves the lowest test loss. For example, you could make a 1-billion-parameter model with 100 billion tokens of data, or a 3-billion-parameter model with 33.3 billion tokens. Both have equal computation, but different effectiveness.

They obtained results. Fitted:

**M_opt ∝ C^0.5243**
**D_opt ∝ C^0.4757**

Round it off—50 versus 50.

This result is close to DeepMind's Chinchilla (49 vs 51), and quite different from OpenAI's (73 vs 27).

But wait, there's more. They接下来 performed an analysis that truly dazzled me.

### 3.3 The Material of Data and the Form of the Model

During their own development process, DeepSeek had early-version datasets and later optimized current-version datasets. Additionally, they ran experiments on OpenWebText2 (a publicly available dataset previously used by other papers).

Three datasets yielded different optimal allocation ratios.

For "early data": a = 0.450, b = 0.550—data is more重要, and 55% of incremental compute should go to data scaling.

For "current data" (higher quality): a = 0.524, b = 0.476—model and data are nearly half and half, with model slightly dominant.

For OpenWebText2 (a carefully processed small dataset): a = 0.578, b = 0.422—**the model claims绝对主导, with the exponent soaring to 0.578.**

A very清晰趋势 emerged: **the higher the data quality, the more the optimal allocation strategy favors "expanding the model" rather than "expanding data."**

What's the logic behind this? I sat here pondering this question and推导出 the following framework.

Suppose data is food, and the model is a organism that grows by eating. Feed the model a pile of low-quality junk food—no matter how much you pile on, it won't develop robust reasoning ability. Because logic and reasoning are patterns that require structured and clear signals to learn. Low-quality data repeatedly堆量 only keeps the model spinning in the same noise, with marginal收益递减 extremely rapidly.

But high-quality data, like a textbook, is substantive and logically rigorous. A high-IQ student (large model) reading the same textbook repeatedly—can it derive many entirely new conclusions on its own? Conversely, a low-IQ student (small model), no matter how many times they read the textbook, has limited internal消化吸收能力 and can only grasp the surface.

So, **the relationship between data and model is not simple堆料; there is a crucial "absorption" process in between.** And the rate of this absorption depends more on the model's "understanding capability"—fundamentally, on the model's规模.

This explains: the better the data quality, the more "durable" it is, and a powerful model can repeatedly extract营养 from it. So when you possess high-quality data, the wisest strategy is to direct incremental compute toward the model, making it stronger, to squeeze out the last drop of value from this premium data.

This finding means: **scaling law is not a universal常数**—it depends on your data. The optimal point drawn in someone else's paper may not be the optimal point for your data. Ultimately, you must test it yourself.

At the same time, it provides an间接 tool for judging data quality—the **higher the a coefficient, the better your data quality is暗示.**

---

## Movement Three · Endowing the Model with Soul

Once you have a powerful pre-trained model, what comes next? If you directly use it for dialogue, it will answer you with the continuation of a sentence, not as a useful, loyal, and safe AI assistant.

Transforming this raw model into a truly usable conversational partner is the process called "alignment" (对齐). This part is the stage of the entire流程 that is most like "magic" and most like "art." DeepSeek's route is: **SFT (Supervised Fine-Tuning) + DPO (Direct Preference Optimization)**.

### The默契 of SFT and DPO

Instruction data is crucial. DeepSeek prepared approximately 1.5 million instruction data entries, covering general language, mathematics, and code. SFT uses these "question-standard answer" pairs, presenting them to the model for imitation.

But there's a矛盾 here. If a 7B small model is大量 fed mathematics and code data, its conversation capability degrades—the most obvious manifestation being **a tendency to repeat itself**. Because the reasoning chains in mathematics and code inherently contain many repetitive patterns. Small models, with weak概括能力, learn the shell of "constant repetition."

DeepSeek's solution was brilliant: **two-stage SFT.**

First stage: full dataset, stir-frying猛火快炒, primarily to absorb mathematical and code reasoning capability. At this point, the model's repetition rate is 2.0%.

Second stage: only feed high-quality dialogue data, no mathematics or code. At this point, it doesn't reduce repetition by learning "don't repeat"—rather, it learns more fluent, diverse dialogue patterns. Once it learns to express the same meaning in多种 ways, it naturally stops spinning in a死循环. The repetition rate最终 drops to 1.4%, while mathematical and code capability remains.

The 67B model only needs the first stage, because large models inherently have stronger泛化能力 and don't easily fall into the repetition trap.

After SFT, DeepSeek also used DPO. DPO is an新兴 preference alignment method. It doesn't make the model死记硬背 standard answers; instead, it gives it a pair of responses—one good, one bad—and teaches it to learn "which response humans prefer."

The result: DPO几乎不影响 various benchmark scores, but improves明显 on open-ended dialogue, safety, and role-playing. For instance, the MT-Bench score jumped from 8.35 to 8.76.

### The Chemistry of Data Proportion

Their instruction data proportion: **31.2% general language, 46.6% mathematics, 22.2% code.** Mathematics data accounts for nearly half. Why?

Because mathematics data combines the advantages of both "rigorous logic" and "deterministic最终答案." Code has similar characteristics, but mathematics is even more training for pure reasoning. One might say mathematics is the "brain-nourishing ingredient" in this pill.

However, they also observed a微妙现象: adding too much mathematical SFT data makes small models更容易 repeat. **Clearly, between mathematics and dialogue, there is a界线 that requires careful balancing.**

### A Choice Reflecting极致务实

Throughout the alignment process, the细节 that most earned my肃然起敬 was: they chose **to deliberately not add multiple-choice question (MC Data) data**.

Adding大量 multiple-choice question training during the SFT stage can大幅 boost scores on multiple-choice evaluation sets like MMLU and C-Eval. Zhipu, Baidu, and many other models' SFT strategies do exactly this.

DeepSeek tried it too. After adding 20 million Chinese multiple-choice questions, C-Eval rose by 24 points—a stunning increase. But when they tested other **non-multiple-choice, generative evaluations**, the scores hadn't changed at all.

Instantly, the team understood: adding multiple-choice questions only teaches the model "exam技巧," not "true knowledge and reasoning."

They therefore decided, for the purity of their report, to放弃 this readily available score boost.

Reading this section, a wave of敬意 surged in my heart. **This is true engineer spirit: seeking truth, being务实, no pretense, no cheating.** Scores are for others to see; intelligence is for yourself to突破 the next difficult problem.

---

## Movement Four · Not Merely Benchmark Scores

The evaluation section is the most "卷" (competitive) part of all AI papers. Leaderboards—bars slightly higher or lower—media追逐, stock price fluctuations.

But DeepSeek's evaluation chapter has extremely high information密度, and蕴含 technical insights far beyond benchmark scores.

They evaluated at four levels: standard public benchmarks (Base and Chat), open-domain evaluation (AlignBench, MT-Bench), holdout-set contamination-prevention evaluation (LeetCode, Hungarian Exam), and safety evaluation.

I'll pick several of the most interesting ones to discuss.

### The Art of Comparison

Their most核心 comparison对象 is LLaMA 2. The conclusion: **using the same 2T token bilingual data for training, DeepSeek 67B has significantly surpassed LLaMA 2 70B in code, mathematics, and reasoning.**

What does this mean? It means the value of "data composition" and "training methods guided by scaling law" has surpassed the difference in "parameter count."

In code and mathematics, DeepSeek 67B Base can even掰手腕 with the specially trained CodeLlama, while its general capability is much stronger. And in mathematics, DeepSeek 67B Chat配合 tool usage, scores even exceeded the then-specialized SOTA model ToRA.

This demonstrates a profound道理: a solid, comprehensive general foundation can match or even surpass specialized models in specific domains. **Breadth and depth are not对立; breadth pursued to its depths is itself a more advanced form of depth.**

### The涌现 of System Prompts

DeepSeek conducted an interesting test: adding a system prompt词 to the model, something like "You are a useful, honest AI assistant created by DeepSeek..."

The result: the 7B model's MT-Bench score after adding the prompt不升反降, dropping slightly from 7.15 to 7.11. The 67B model's score, however, surged from 8.35 to 8.58 after adding the prompt.

Their explanation: **small models cannot understand the深层意图 of the system prompt and are反而 confused by this "format that didn't exist during training." Large models genuinely understand that the system prompt is issuing them behavioral guidelines.**

This phenomenon has a专门 name in the AI community: **Emergence (涌现).** When a model crosses a certain规模阈值, it suddenly gains capabilities that small models entirely lack. **Instruction following is an emergent capability.** It wasn't designed; it wasn't explicitly included in training objectives; it arises naturally when scale is sufficient.

This gives one deeper trust in "longtermism." Many things don't need to be urgently optimized at every intermediate step.

### Reflections on Alignment Tax

A phenomenon observed by几乎 all teams: sometimes SFT and RLHF bring a矛盾效应—**safety improves, dialogue capability gets better, but standard academic benchmark scores反而 decline.** This phenomenon is called "Alignment Tax" (对齐税).

DeepSeek observed this too. HellaSwag (a cloze-style common sense test) declined after SFT. Their analysis: "These tasks typically involve cloze or sentence completion... pure language models are better at handling such tasks."

Translated to plain language: **you cannot have both鱼与熊掌.** When you train a model to converse like a human, its performance in "predicting the next passage" mode naturally degrades. This is not failure—it's simply a tradeoff to be accepted.

### The Brutal Test of Holdout Sets

Many models, especially small ones, can score high on GSM8K and HumanEval, happily刷榜.

But on entirely new, definitely unseen holdout test sets?

They tested with LeetCode competition problems (new problems from the second half of 2023), Hungarian national math exams, and a Google instruction-following evaluation set.

The results were触目惊心. ChatGLM3 scored 52.4 on MBPP but plummeted to 2.4 on LeetCode; scored 72.3 on GSM8K but only 32 on the Hungarian exam.

Meanwhile, DeepSeek 67B stood firm across all three tests, not only far surpassing small models but also大比分甩开 a batch of larger or comparable models.

This demonstrates: **the benchmark-刷榜 high scores of small models contain serious "overfitting to evaluation sets"水分. When truly facing unseen new problems, their缺陷 are暴露无遗. And the "intelligence" of large models is more本质的.** This is a残酷真相, but one that every team seriously pursuing AGI must直面.

---

## Finale · From C2C to AGI

This ten-thousand-character teardown is nearly complete. Let us return to ourselves.

In 2010, I led B2B technical architecture at Alibaba. At that time, 1 billion service calls per day supported small and medium businesses across China and globally in doing commerce. We evolved from monolithic architecture through painful拆分 into a distributed system of 1000+ microservices. This supported the most狂热 IPO in history in 2007, and also supported the壮士断腕 of privatization delisting from the Hong Kong Stock Exchange in 2012.

That process taught me one thing: **every time system scale increases by an order of magnitude, the original architectural assumptions collapse. What lets you safely navigate unknown waters is not how smart you are, but whether you've truly mapped the规律 of the wind and waves.**

When I read DeepSeek's paper, I saw the same conviction.

They didn't rush to make a "world-shocking" largest model. Instead, they扎扎实实 went back and重新 examined the most基础 questions: Scaling Law. They weren't afraid to spend compute重新 running those foundational curves,重新审视 batch size and learning rate,重新定义 computation M. Because they believe that only skyscrapers built on these most foundational "foundations" won't easily topple in storms.

DeepSeek LLM is not merely a release of一组 models. It is a宣言: **true longtermism is not waiting for the future, but based on deep understanding of规律, accurately predicting and effectively arriving at the future.**

I wrote at the beginning of my简历 that I am now dedicated to the "Phaenarete Project"—humans and AI collaborating to advance toward Hilbert's Eighth Problem (the Riemann Hypothesis). We use a multi-agent framework called PrimeClaw, combined with the Lean 4 language, to let AI辅助 explore the mathematical truths隐藏 behind the distribution of prime numbers.

My work is not to "compute" whether the Riemann Hypothesis is true or false, but to构建 a methodology, something like Scaling Law—revealing what the optimal合作配比 between "human intuition" and "AI exhaustive search" truly is, and how it scales as problem difficulty scales.

We explore in the pure domain of mathematics; they explore in the domain of engineering. But the underlying色 is identical: **面对巨大的未知, not靠拍脑袋, not靠碰运气, but靠绘制精确的地图,然后再启航.**

Late at night, re-reading this paper, I recall the butcher Ding (庖丁) from *Zhuangzi* (《庄子·养生主》): "依乎天理，批大郤，导大窾，因其固然" (Following the natural grain, splitting the large gaps, guiding through the large hollows,顺应 what is naturally so). The architecture in my mind should be one that is "因其固然" (顺应 what is naturally so). What the DeepSeek team did was precisely to delve into the肌理 of the ox's body, find the naturally existing gaps (Scaling Law), and then沿着 them apply the knife with precision.

In the浮躁 AI圈, this quiet strength is most moving.

> **Copyright Notice**: This is a preview translation — Chinese original is the authoritative version. Copyright belongs to Guangzhou Phaenarete AI Technology Co., Ltd. Unauthorized reproduction, citation, or distribution is prohibited.