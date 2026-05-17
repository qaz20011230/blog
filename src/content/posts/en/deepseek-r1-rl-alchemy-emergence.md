---
title: "DeepSeek-R1's Reinforcement Learning Alchemy: A Philosophical Revolution on Reasoning, Autonomy, and Emergence"
date: '2025-02-01'
category: AI & Technology
tags:
  - DeepSeek
  - Reinforcement Learning
  - Reasoning
  - Emergence
description: >
  An in-depth dissection of the reinforcement learning paradigm shift behind DeepSeek-R1: abandoning the prior constraints of SFT, witnessing how silicon-based intelligence spontaneously emerges advanced reasoning capabilities such as reflection and epiphany through pure GRPO algorithms and rule-based rewards.
---

While people were still marveling at DeepSeek-V3's astonishing cost efficiency and engineering miracle, DeepSeek-AI quietly accomplished a far more fundamental paradigm shift. This time, they were no longer simply pursuing "a smarter model," but began exploring a more essential question: **Can intelligence, without being told how to think, learn to think on its own?**

DeepSeek-R1 provided the answer. This is not merely a technical report, but a philosophical manifesto. It declares: the reasoning capabilities of large language models can be **incentivized**, not **taught**; they can **emerge**, not be **programmed**. It is a pure experiment of reinforcement learning in the domain of linguistic intelligence—a re-enactment of the ancient question spanning millennia—is knowledge a priori or empirical?—upon silicon-based life forms.

Today, with the eyes of a geek, we will dissect the core配方 of this alchemy. We will see how the GRPO algorithm becomes the engine driving wisdom, how rule-based rewards become the North Star guiding direction, and how "aha moments" spontaneously and dramatically emerge in the crucible of training. This will be the most profound and thorough interpretation of DeepSeek-R1 in the English-speaking world.

---

### **Chapter 1: The Holy Grail of Pure RL—DeepSeek-R1-Zero and the Spontaneous Emergence of Intelligence**

The story of DeepSeek-R1 begins with an audacious hypothesis bordering on hubris: **We do not need hand-holding instruction (SFT); we only need to provide the right incentives and sufficient freedom for exploration, and a strong base model can learn to reason on its own.** This hypothesis gave birth to DeepSeek-R1-Zero—a reasoning behemoth forged directly from DeepSeek-V3-Base through reinforcement learning, completely bypassing the traditional supervised fine-tuning stage.

#### **1.1 Why SFT Might Become a Shackles**

Traditional post-training of large models follows a seemingly self-evident pipeline: first perform supervised fine-tuning (SFT) on high-quality human-annotated data, allowing the model to "learn" how to produce good answers, and then use RLHF (Reinforcement Learning from Human Feedback) to fine-tune preferences. This is known as "imitate first, then optimize."

But this pipeline conceals a fundamental flaw. Human thought trajectories—those carefully annotated CoT data—**are not optimal solutions; they may even be biased and misleading.** When humans explain their reasoning processes, they tend to omit crucial "reflection," "verification," and "backtracking" steps. These steps are essential for solving complex problems, but they are often implicit, messy, and difficult to externalize clearly as training data.

As the report states: "Human-defined reasoning patterns may constrain model exploration, while unrestricted RL training can better incentivize the emergence of novel reasoning capabilities in LLMs." The design philosophy of DeepSeek-R1-Zero is precisely based on this: **Abandon human priors, and let the model discover the optimal thinking path under the "natural selection" pressure of RL.**

#### **1.2 GRPO: The Engine of Wisdom**

To realize this ambition, a powerful and efficient RL algorithm is needed. DeepSeek-R1 chose Group Relative Policy Optimization (GRPO), a weapon延续 and refined since the DeepSeek-V2 era. Why GRPO, rather than the more mainstream PPO (Proximal Policy Optimization)?

PPO's core problem is: it requires a **value model (Critic)** of comparable scale to the policy model (Actor). This Critic is responsible for estimating the "expected future returns" (i.e., the advantage function) in the current state. This brings two catastrophic issues in long-horizon reasoning tasks:

1. **Memory and computational overhead doubles.** A 671B Actor requires another 671B Critic.
2. **Training is extremely difficult.** The Critic must accurately evaluate the value of every intermediate token during generation based solely on the final outcome reward. When the model engages in reflection and revision during generation, early tokens may be overturned later, making value estimation based on partial responses nearly impossible. This is especially致命 for long chain-of-thought models.

GRPO's solution is a stroke of brilliance: **It simply discards the value model!**

How does it estimate advantages? GRPO's method is: for **the same question**, let the old policy model generate a group (Group, typically 16 or 64) of different outputs $\{o_1, o_2, \dots, o_G\}$. Then, use a rule-based reward function $r_i$ to score this group of outputs. Finally, **the advantage $A_i$ of each output is defined as its normalized score within the group**:

$$
A_i = \frac{r_i - \text{mean}(\{r_1, r_2, \dots, r_G\})}{\text{std}(\{r_1, r_2, \dots, r_G\})}
$$

The elegance of this formula lies in:

* **No value model needed**: It defines "good" through intra-group comparison, rather than relying on an absolute valuation of the environment. Whether an answer is good or bad is determined by comparing it with its "siblings."
* **Adaptive baseline**: $\text{mean}$ and $\text{std}$ are dynamically calculated for each question, providing an adaptive, task-aware baseline. For simple questions, all answers may score high, so the baseline is high; for difficult ones, all may score low, so the baseline is low. This naturally prevents the model from being overconfident on easy problems or blindly pessimistic on hard ones.

Additionally, GRPO directly incorporates a KL divergence penalty term in the loss function, preventing policy updates from proceeding too rapidly and causing training collapse. Unlike PPO's approach of implicitly penalizing KL in per-token rewards, GRPO's method is more direct and avoids PPO's potential side effect of **effectively penalizing long responses** through accumulated KL penalties—this is a decisive advantage for models designed to cultivate long chain-of-thought reasoning.

When training DeepSeek-R1-Zero, the team set stringent conditions: $G=16$ (sampling 16 outputs per group, depth of 1, maximum length expanding from 32,768 to 65,536), KL coefficient 0.001, sampling temperature 1. Each training step contained 32 unique questions, with a total batch size of 512. Every 400 steps, the reference model was updated to the latest policy model. This precision RL engine prepared the fertile ground for the emergence of intelligence.

#### **1.3 Reward Is Destiny: The God of Rules**

The core of reinforcement learning is the reward function. If reward signals contain loopholes, the model will find shortcuts and engage in "reward hacking," leading to alignment failure. To ensure the purity and reliability of rewards, DeepSeek-R1-Zero adopted a rule-based reward system consisting of two parts:

* **Accuracy reward ($\text{Reward}_{acc}$)**: For math problems, the model is required to place the final answer in `\boxed{}`, then perform strict string matching or symbolic computation verification; for code problems, compilers are used to run test cases for objective evaluation. There is no room for ambiguity.
* **Format reward ($\text{Reward}_{format}$)**: The model is forced to place its reasoning process within `</think>` tags and the final answer within `<answer>...</answer>` or `\boxed{}`. This is purely for readability and parsability, with no content bias involved.

**A crucial design decision: they explicitly excluded neural network-based reward models (Neural Reward Model), whether outcome-oriented or process-oriented (PRM).** They observed that in large-scale RL training, Neural Reward Models are extremely susceptible to "reward hacking," and retraining reward models introduces enormous computational overhead and training pipeline complexity. Rules—only rules—can serve as the sole reliable North Star in RL training. While this limits the training scope to domains that can be precisely verified (mathematics, code, logic), it also ensures the absolute integrity of training signals.

#### **1.4 "Aha Moment": The Spectacle of Behavioral Emergence**

Under such pure RL training, astonishing phenomena occurred.

**1.4.1 The Leap in AIME Scores**
DeepSeek-R1-Zero's performance trajectory on the AIME 2024 benchmark demonstrated remarkable growth. As RL training progressed, its `pass@1` score soared from 15.6% to 77.9%. When using self-consistency, the `cons@16` score reached an astonishing 86.7%, **surpassing the average level of human participants**. This is a historic achievement achieved solely through pure RL without any SFT data.

**1.4.2 Natural Growth in Thinking Length**
A more profound change: the model's average response length (i.e., thinking time) **increased autonomously** during training. The model was never explicitly instructed to "think step by step," yet it learned on its own: to solve more complex problems, I need to spend more time and generate more tokens for exploration and verification. This adaptively driven computational resource allocation based on intrinsic need is a hallmark of advanced intelligence.

**1.4.3 "Aha Moment": The Natural Awakening of Reflective Behavior**
The most dramatic scene in the report is the "aha moment" (顿悟时刻). In the middle of solving a math problem, the model suddenly wrote:

> "Wait, wait. Wait. That's an aha moment I can flag here."

Then, it began **re-evaluating** its previous steps, identifying potential errors, and pivoting to a new reasoning path. This behavior was never hard-coded; it is a product of natural evolution under the RL reward mechanism.

A more systematic analysis tracked the frequency of reflective words (such as "wait," "mistake," "however," "but," "retry," "error," "verify," "evaluate," "check"). As training progressed, the frequency of these words increased by 5 to 7 times. And the distinctive emergence pattern of the word "wait"—almost nonexistent in early training, occasionally appearing in the middle phase, and dramatically exploding after 8,000 steps—signifies that the model **acquired a specific reflective strategy** at a particular training stage.

All of this points to one conclusion: **RL did not explicitly teach the model how to reason; it merely provided an environment—where the correct answer is the sole law of survival. To survive, the model must evolve its own advanced problem-solving strategies such as reflection, verification, and backtracking.** The training process of DeepSeek-R1-Zero is the purest and most powerful proof of the philosophical principle of "incentivizing" rather than "teaching."

---

### **Chapter 2: From Wildness to Domestication—DeepSeek-R1 and Multi-Stage Alchemy**

Despite DeepSeek-R1-Zero's power, it was like an unpolished rough diamond, with serious usability issues: **poor readability, language mixing (Chinese-English混杂), and insufficient capability on non-reasoning tasks such as writing.** To create a powerful yet practical product, DeepSeek-R1 inherited R1-Zero's reasoning capabilities and domesticated and封装 them. This was achieved through a complex multi-stage training pipeline, representing the pinnacle of AI alchemy.

#### **2.1 Stage One: Cold Start—Planting the Seed of Humanization**

DeepSeek-R1's training did not start from zero. The first step was collecting **thousands of high-quality "cold start" long CoT data** to fine-tune DeepSeek-V3-Base. The design goals of this data were very clear:

* **Humanized thinking process**: Adopting a first-person perspective (thinking with "I"), colloquial reflection, clear formatting.
* **Language consistency**: Think in Chinese when asked in Chinese; think in English when asked in English.
* **Readable final summary**: Distilling the complex reasoning process into a clear, well-formatted final answer.

The creation of cold start data itself was a精密 process. They used DeepSeek-R1-Zero (temperature set to 1.0) to generate multiple reasoning trajectories for each question, screened out correctly formatted and correctly answered samples, and then had DeepSeek-V3 serve as an "editor," translating and rewriting these wild thought processes into more natural, fluent human conversational style. For code tasks, they also developed a method using DeepSeek-V2.5 to generate candidate test cases with strict verification. These doubly verified data (by both humans and models) provided a high-quality, controllable starting point for subsequent RL training.

This cold start SFT significantly improved the model's performance on IF-Eval (instruction following) and ArenaHard (human preference), proving the success of humanization alignment. But the cost was a slight decline in performance on reasoning benchmarks like AIME (from 77.9 to 59.0). **This precisely proves that core hypothesis: pure, unconstrained SFT data, even when high-quality, will to some extent constrain the model's exploration potential.**

#### **2.2 Stage Two: Reasoning RL—Returning to Wildness Within Constraints**

Next came the crucial step of reactivating R1's reasoning capabilities. The DeepSeek-R1 Dev1 model began receiving large-scale RL training, with a configuration similar to R1-Zero but adding a key constraint: **language consistency reward**.

$$
\text{Reward}_{language} = \frac{\text{Num}(\text{Words}_{target})}{\text{Num}(\text{Words})}
$$

This reward was directly added to the total reward, forcing the model to use the target language consistent with the question in its chain of thought. Although ablation experiments showed this causes a slight decline in reasoning performance, it was crucial for improving the end-user experience.

This RL training pulled the AIME score from 59.0 back to 74.0 and achieved tremendous progress on code (LiveCodeBench) and STEM (GPQA Diamond) benchmarks. More importantly, the model's **reasoning capabilities were significantly enhanced**, while improvements on other general tasks were relatively limited. This indicates that this stage of RL was highly focused on refining the core of reasoning.

#### **2.3 Stage Three: Rejection Sampling and SFT—Embracing All Streams, Re-casting Glory**

To make the model excel at both reasoning and handling diverse tasks such as writing, translation, and role-playing, the DeepSeek team executed a large-scale **Rejection Sampling** and SFT pipeline.

* **Data generation**: Using an intermediate checkpoint (Dev2) from the second stage of RL training as the generator. Multiple responses were sampled for each question, **only retaining those with correct answers**.
* **Data expansion**: Beyond the original RL stage's math, code, STEM, and logic data, a large amount of non-reasoning data was incorporated from DeepSeek-V3's SFT dataset, such as writing, factual Q&A, self-cognition, translation, and even software engineering data including program repair and front-end development.
* **Total dataset**: Ultimately, approximately **600,000** reasoning-related training samples and **200,000** non-reasoning samples were collected. A total of approximately 800,000 high-quality SFT data points integrating reasoning capabilities and general skills.

The results of this stage (Dev3) were astonishing: AIME scores further improved to 78.1, AlpacaEval 2.0 scores jumped from 55.8 to 62.1, and Aider-Polyglot scores surged from 25.6 to 44.8. The model achieved a perfect balance between reasoning and practicality.

#### **2.4 Stage Four: All-Scenario RL—Ultimate Alignment and Sublimation**

The final工序 was to place the Dev3 model in a RL environment mixing reasoning data (using rule-based rewards) and general data (using model-based rewards), for comprehensive preference alignment.

* **Reward models**: They specifically trained **helpfulness reward models** and **safety reward models**. The helpfulness RM was trained on 66,000 pairs of preference data from Arena-Hard format prompts, using pairwise comparison loss and specifically filtering out length bias. The safety RM was trained on 106,000 entries labeled "safe" or "unsafe" in a pointwise manner.
* **Training details**: The temperature in this stage was lowered to 0.7 to prevent high temperatures causing text incoherence. General data and preference-based reward signals were only added in the final 400 steps to avoid reward hacking from overuse.

Ultimately, the culmination DeepSeek-R1 was born. It achieved qualitative improvements on AlpacaEval 2.0 and ArenaHard (jumping to 87.6 and 92.3 respectively), while maintaining top-tier performance on reasoning benchmarks. An all-round warrior—brilliantly intelligent, skilled in communication, and reliably safe—was thus forged.

---

### **Chapter 3: R1's Intelligence Atlas—Capabilities, Analysis, and Distillation**

#### **3.1 Comprehensive Dominance: Proof of Supremacy Under Benchmarks**

The report's data irrefutably proves DeepSeek-R1's dominance. On AIME 2024, it matched o1-1217 with a 79.8% pass@1; on MATH-500, it reached 97.3%, nearly a perfect score; on Codeforces, it defeated 96.3% of human participants; on knowledge-intensive tasks like MMLU and GPQA Diamond, it同样 ranked in the first tier. Its并列 first place on the human preference platform Chatbot Arena alongside the world's strongest models was equally remarkable.

What is particularly important is that **DeepSeek-R1 demonstrated strong generalization capabilities**. On the newly released AIME 2025, its score (11.3/15, 75%) was comparable to o1 (12.0/15), and combined with its AMC 12 results, it met the qualification标准 for the United States Mathematical Olympiad (USAMO). This eloquently proves that the model's reasoning capabilities do not come from memorization of specific test problems.

#### **3.2 In-depth Analysis: Multi-dimensional Measurement of Reasoning Capabilities**
DeepSeek-R1's intelligence is not一团混沌. It exhibits distinctive characteristics:

* **Adaptive computational resource allocation (test-time compute scaling)**: As problem difficulty increases, DeepSeek-R1 automatically invests more "thinking tokens" to solve problems, spending 18,000+ tokens on the hardest problems while spending <7,000 tokens on easy ones. This forms a stark contrast with the constant "shallow thinking"模式 of the non-reasoning model GPT-4o, which, despite being able to expand total computation through majority voting, cannot improve single-attempt success rates due to the lack of self-reflection.
* **Areas of capability advantage**: R1 is extremely strong in number theory and algebra, but still has significant room for improvement in geometry and combinatorics.
* **Structural improvement in educational knowledge**: From V3 to R1, the areas with the greatest improvement on MMLU-Pro are STEM (mathematics, physics, etc.). Especially in categories like MATH and physics, R1 achieved massive performance leaps compared to V3. Even in non-STEM fields such as social sciences and humanities, long chain-of-thought brought unexpected improvements due to deeper problem understanding.

#### **3.3 The Transmission of Intelligence: Distillation Technology—Nurturing Students with the Teacher's Wisdom**

To promote technological democratization, the DeepSeek team "distilled" DeepSeek-R1's intelligence into smaller models. They used the 800,000 SFT data collected in the third stage to fine-tune open-source models from the Qwen and LLaMA series, **without conducting additional RL training**.

The results were highly convincing: a 1.5B distilled model surpassed GPT-4o and Claude 3.5 Sonnet on math benchmarks. At scales from 7B to 70B, distillation performance steadily improved with model size. Crucial comparative experiments revealed a deeper conclusion: large-scale pure RL training on a 32B model (such as Qwen2.5-32B-Zero) yielded performance **far inferior** to a model distilled from the stronger R1 model (DeepSeek-R1-Distill-Qwen-32B). This clearly indicates that **at smaller scales, inheriting the thinking patterns of a powerful teacher model is far more economical and effective than letting a small model explore from scratch through RL.**

---

### **Chapter 4: Lessons and Reflections—Failures and Admonitions on the Path of Wisdom**

The DeepSeek team candidly shared their failed attempts; these experiences are invaluable for any researcher致力于 AI reasoning:

1. **The tragedy of Process Reward Models (PRM)**: Although PRM can theoretically provide feedback at every step of reasoning, they found that in general reasoning tasks, clearly defining a "fine-grained step" is extremely difficult; judging the correctness of intermediate steps is very棘手; and once a model-based PRM is used, one immediately faces the risk of "reward hacking," plus the high cost of retraining. They ultimately concluded that in current large-scale RL training, the benefits PRM bring are disproportionate to the complexity and overhead they introduce.
2. **The困境 of Monte Carlo Tree Search (MCTS)**: Inspired by AlphaGo, they tried MCTS. But the search space of word-level generation is infinitely larger than a Go board, and exponential explosion makes search prohibitively difficult. The Value Model trained to guide search at each step同样 encountered difficulties in accurate evaluation. Although MCTS can be effective during inference, using it for "self-search" to **iteratively improve model performance** remains extremely challenging at present.

Finally, the Key Findings proposed in the report—that base model scale is crucial (7B/16B models barely benefit from pure RL), and the inviolability of reliable verifiers—point us toward future directions.

---

### **Epilogue: The Dawn of Pure RL and the Unfinished Road**

As we stand at the beginning of 2026, looking back at this report published a year ago, the significance of DeepSeek-R1 has long transcended its scores alone. It was a successful scientific experiment that validated a new path to advanced reasoning capabilities, distinct from traditional imitation learning. It proved that under appropriate reward mechanisms, intelligent behavior can be "incentivized" to emerge spontaneously, rather than having to be "instilled" through human experience.

The "aha moment" mentioned in the report is not merely an advancement of the model, but a reminder of our own cognitive biases—we may have一直 underestimated the potential of model self-evolution and过度 relied on human, perhaps suboptimal, thinking patterns.

Of course, the path of pioneers is never smooth. R1 still has limitations: it is not yet proficient in tool use and structured output, sometimes "overthinks," is extremely sensitive to prompt wording, and the multi-language mixing problem remains unresolved. But more importantly, it points to a future: **any task that can be effectively evaluated by a reliable Verifier, no matter how complex for humans, will be conquered by this kind of pure RL approach.**

The spirit of DeepSeek-R1 lies not in the model's parameter scale, but in the methodology it practices: **Emancipate the mind, seek truth from facts.** It is a brave return—returning to the most originary definition of intelligence: within constraints, through trial and error and feedback, autonomously discovering the optimal path to truth. The flame of this "geek way" has been ignited, and it will burn long and brightly on the journey toward artificial general intelligence.

> **Copyright Notice**: This is a preview translation — Chinese original is the authoritative version. Copyright belongs to Guangzhou Phaenarete AI Technology Co., Ltd. Unauthorized reproduction, citation, or distribution is prohibited.