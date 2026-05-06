---
title: UniRec：面向大规模推荐的序列建模与特征交互统一架构（TeX归档）
date: '2026-03-27'
category: "AI & Technology"
tags: ["推荐系统", "序列建模", "特征交互", "架构"]
description: >-
  推荐系统支撑着大规模内容平台与数字广告，其点击率与转化率预测直接影响用户体验、参与度和商业收入。然而，尽管历经数十年发展，现代推荐流水线仍然在结构上呈现碎片化：特征交互模型与序列行为模型往往被作为基本独立的系统进行开发、优化和部署。本文认为…
---


> 说明：本文由 TeX 源文件自动转换生成，公式与排版可能存在差异；以 TeX/PDF 原件为准。

> 原始文件名：`unirec-sequence-modeling-feature-interaction-unified-architecture.tex`
> 源文件下载：https://liang.world/archives/unirec/unirec-sequence-modeling-feature-interaction-unified-architecture.tex

---

## 摘要

推荐系统支撑着大规模内容平台与数字广告，其点击率与转化率预测直接影响用户体验、参与度和商业收入。然而，尽管历经数十年发展，现代推荐流水线仍然在结构上呈现碎片化：特征交互模型与序列行为模型往往被作为基本独立的系统进行开发、优化和部署。本文认为，这种历史性割裂隐藏了三个日益脆弱的假设——即对行为序列的过早压缩是充分的、跨源交互可以推迟进行、序列模块与非序列模块可以准独立优化。针对这一问题，我们提出 UniRec，一个以“先统一，后压缩”为核心原则的理论奠基式统一架构。UniRec 通过结构保持令牌化将有序事件、无序特征域和连续上下文变量映射到公共令牌空间，应用混合掩码注意力算子实现因果性但非对角线的交互，并在跨源条件化发生之后才进行渐进压缩。我们进一步通过基于 GRU 的用户状态实现持续更新，使预测依赖于演化的交互轨迹而非静态摘要。本报告贡献三方面理论内容：第一，形式化了碎片化推荐流水线背后隐含的假设；第二，证明过早压缩只会通过数据处理减少任务相关信息，而一个近乎单射的统一表示则能将与响应的联合互信息保持到 $\epsilon$ 碰撞项之内；第三，提供简洁的结构性理由：范畴论视角激励源感知令牌化，而几何视角则激励将混合掩码与延迟压缩作为对抗退化交互模式的归纳约束。本文档旨在作为挑战“面向大规模推荐的序列建模与特征交互统一化”后续工程工作的存档理论奠基报告；基准测试结果与实现工件将在配套的实证修订版中呈现。

## 关键词

推荐系统；统一架构；序列建模；特征交互；Transformer；信息论

## 引言

推荐系统支撑着大规模内容平台——信息流、短视频生态及其他以参与度为核心的界面——以及数字广告，其中点击率与转化率预测直接影响用户体验、货币化与平台效率。在巨大流量和严格延迟约束下，这类系统每日做出数十亿实时决策，并支撑着规模庞大的广告经济。

过去二十年，推荐研究沿着两条主线发展。一条主线聚焦于特征交互：对用于排序和校准的高维多域类别与上下文特征进行建模。另一条主线聚焦于序列行为：通过循环架构、注意力机制以及受自注意力启发的 Transformer 风格排序模型对时间有序的用户交互进行建模 [vaswani2017attention]。两条传统均取得了显著成功。然而，它们在很大程度上是并行演化而非协同演化的。

这种分离在工业系统中造成了结构性瓶颈。在许多已部署的技术栈中，行为序列首先被汇总成一个或几个向量，然后才与特征侧表示合并。由此产生的流水线易于模块化，但也强制了浅层的跨范式交互，鼓励组件间不一致的优化目标，使扩展复杂化，并随着序列长度与模型规模的持续增长而增加工程与硬件负担。

当前挑战“面向大规模推荐的序列建模与特征交互统一化”恰逢其时，因为它直接瞄准了这一结构性瓶颈。其核心问题不仅仅在于一个新模块能否提升 AUC，而在于推荐架构能否被重新设计，使得有序行为与非序列域在同质化、可堆叠的骨干中联合建模。这个问题首先是一个架构问题，其次才是经验问题。因此，它需要一种“理论优先”的处理方式。

本报告从一个简单观察出发。历史事件的相关性往往取决于当前特征上下文，而特征的相关性又往往取决于用户在行为轨迹中的位置。如果这一点成立，那么过早压缩历史的系统就可能丢弃那些恰恰是后续特征交互所必需的事件级区分。

为此，我们提出 UniRec，一个以逆转常规顺序为核心原则的第一性原理架构：

**先统一，后压缩**，

而非先压缩再交互。UniRec 结合了四个设计要素：结构保持令牌化、混合掩码注意力、渐进压缩以及通过循环用户状态实现的持续更新。

本文档刻意作为理论奠基文件。在工程研究完成之前，我们并不声称基准优越性，而是固定架构论点及其应被证伪的标准。因此，本报告是存档性和准备性的：它为后续在挑战设定下的大规模实验提供了概念基础。

主要贡献如下：

- 识别并形式化了分离式推荐流水线背后的三个隐含假设，并说明为何它们在规模化时变得日益脆弱。
- 提出 UniRec，一个以“先统一，后压缩”为核心组织原则的统一架构。
- 提供了一个紧凑的结构性理由：其中源感知令牌化可赋予范畴论解读，而混合掩码与延迟压缩则可赋予几何解读，作为优化中的归纳约束。
- 通过基于 GRU 的用户状态实例化持续更新，并定义替代距离视角以区分动态用户建模与冻结用户建模。
- 针对挑战目标指定了公平且可证伪的经验协议，使得后续工程结果能够被结构性地解读，而非仅仅数值性地比较。

报告其余部分组织如下。第 2 节回顾相关工作。第 3 节形式化问题并精确陈述隐含假设。第 4 节介绍 UniRec。第 5 节解释结构与几何设计理由。第 6 节给出信息论基础。第 7 节阐述挑战对齐、经验协议与工程议程。第 8 节讨论启示与局限。第 9 节总结。

## 相关工作

### 分离式推荐流水线

大量工业推荐模型遵循“编码再交互”逻辑，即便通过多个子系统实现。Deep Crossing [shan2016deep]、Wide&Deep [cheng2016wide]、DeepFM [guo2017deepfm]、DCN [wang2017deep] 与 DCNv2 [wang2021dcnv2] 代表了多域特征交互与排序的重要方法。这些方法在稀疏和上下文特征上极为有效，但它们通常将行为历史视为浅层聚合或外部产生的嵌入。

### 序列建模

另一条研究线关注用户行为的时间结构。GRU4Rec [hidasi2016session]、DIN [zhou2018deep]、DIEN [zhou2019deep]、SASRec [kang2018self] 与 BERT4Rec [sun2019bert4rec] 使用循环或注意力机制建模序列依赖，而更广泛的 Transformer 范式 [vaswani2017attention] 已更普遍地重塑了排序架构。然而在许多工业部署中，所得的序列表示在融入特征侧堆栈之前仍然被缩减为少量向量。

### 特征交互架构

除了 FM 类模型，xDeepFM [lian2018xdeepfm] 与 AutoInt [song2019autoint] 通过显式交叉层与自注意力交互丰富了跨特征表达能力。然而这些模型通常假设序列信息已被汇总。其后果是，事件级的序列-特征条件化要么缺失，要么极为有限。

### 统一化为何重要

近期工作已开始探索统一的令牌化方案、共享骨干以及晚期或渐进压缩机制，这表明序列建模与特征交互之间的长期分离既非不可避免，也非理论上必需。然而，迄今仍缺乏一个关于“统一化为何重要”的第一性原理阐述，也未能清晰说明哪些输入结构应在统一化下被保持，以及何时压缩才是合法而非破坏性的。本报告正是要回应这些问题，其目的不仅仅是倡导一个同质化骨干，更是要解释操作顺序——先交互，后压缩——本身就是一个具有信息论后果的建模承诺。

## 问题设置与隐含假设

我们考虑一个输入元组

$$
(S,\mathcal{F},\mathcal{C}),
$$

其中

- $S = (s_1,\ldots,s_n)$ 是有序历史事件序列；
- $\mathcal{F} = \{f_1,\ldots,f_m\}$ 是无序的域式类别特征集合；
- $\mathcal{C} = \{c_1,\ldots,c_q\}$ 是带有度量结构的连续标量或低维向量集合。

目标变量是响应 $R$，例如点击、转化或后点击转化。

**记号**。全文用 $n$ 表示序列长度，$m$ 表示类别特征域个数，$q$ 表示连续上下文变量个数。

### 三个隐含假设

占主导地位的分离式流水线由以下假设支撑。

> **假设**（早期压缩是充分的）
>
> 存在低维摘要 $h_S = g(S)$，使得在跨源交互之前用 $h_S$ 替换 $S$ 对联合 $\mathcal{F},\mathcal{C}$ 预测 $R$ 的任务相关信息损失可忽略。

> **假设**（交互可以推迟）
>
> 大部分序列事件与域式特征之间的有用交互无需在序列压缩之前发生。

> **假设**（分支可以准独立优化）
>
> 序列编码器与特征交互模块可以基本独立地设计与优化，仅需浅层下游融合。

这些假设在历史变长、辅助信息变丰富时日益脆弱。问题不在于压缩可能抽象地损失信息，更具体的问题是，序列事件的相关性往往取决于当前特征上下文。一旦交互被推迟到序列压缩之后，事件级条件化可能就无法恢复。

### 为何早期压缩在结构上代价高昂

设 $H_t$ 表示 $t$ 时刻可用的历史，$X_t$ 表示预测时可用的非序列特征。一个分离系统通常计算 $Z_t = g(H_t)$ 并从 $(Z_t, X_t)$ 预测 $R$。

> **命题**（条件数据处理不等式）
>
> 对任意确定性压缩器 $g$， $$ I(g(H_t);R\mid X_t) \leq I(H_t;R\mid X_t). $$ 等价地， $$ I(g(H_t),X_t;R) \leq I(H_t,X_t;R). $$

> **证明**
>
> 由于 $g(H_t)$ 是 $H_t$ 的可测函数，变量构成马尔可夫链 $R \leftrightarrow (H_t,X_t) \leftrightarrow (g(H_t),X_t)$。结论直接由数据处理不等式得出。

> **命题**（早期压缩下的贝叶斯误差下界）
>
> 设 $R$ 取值于有限标签集 $\mathcal{R}$。记 $P_e(g)$ 为限制在 $(g(H_t),X_t)$ 上的任意预测器的贝叶斯误差。则 $$ P_e(g) \ge \frac{H(R\mid g(H_t),X_t)-1}{\log|\mathcal{R}|} = \frac{H(R\mid X_t) - I(g(H_t);R\mid X_t) - 1}{\log|\mathcal{R}|}. $$

> **证明**
>
> 这是对表示对 $(g(H_t),X_t)$ 直接应用 Fano 不等式的结果。

命题 3.4 与 3.5 形式化了本报告的核心关切：若响应依赖于那些只有与辅助信息结合才显露出相关性的历史细节，则早期压缩引入了一个结构性信息瓶颈。UniRec 通过将压缩延迟到充分的跨源交互发生之后来解决这一问题。

## UniRec：源于第一性原理的统一推荐

UniRec 围绕四个组件构建：结构保持令牌化、混合掩码注意力、渐进压缩与持续更新。架构如图 1 所示。

### 概览

给定 $(S,\mathcal{F},\mathcal{C})$，UniRec 首先将所有输入类型映射到公共空间 $\mathbb{R}^d$，然后应用堆叠的同质 UniBlock 及结构化的混合注意力掩码，仅对序列部分随深度渐进压缩，最终产生任务特定的表示用于预测。当启用动态模块时，当前用户状态作为一个额外的特征侧令牌在统一交互之前加入。

### 结构保持令牌化

我们定义三个映射到公共嵌入空间 $\mathbb{R}^d$：

$$
\Phi_S: S \to \mathbb{R}^d,\quad \Phi_F: \mathcal{F} \to \mathbb{R}^d,\quad \Phi_C: \mathcal{C} \to \mathbb{R}^d.
$$

**序列令牌**。对于第 $i$ 个事件 $s_i$，定义

$$
\Phi_S(s_i) = \text{Embed}(item_i) + \text{Embed}(action_i) + \text{Pool}(content_i) + \text{TimeEncoding}(t_i). (4.1)
$$

时间编码需在弱但操作上有意义的层面上保持先后顺序，即事件间的序关系在嵌入空间中可区分。

**特征令牌**。对于域-值对 $f_j = (\text{field}_j, \text{value}_j)$，定义

$$
\Phi_F(f_j) = \text{FieldEmbed}(\text{field}_j, \text{value}_j). (4.2)
$$

由于特征集是无序的，对该子集的下游操作应当关于列表顺序具有置换不变性或置换等变性。

**上下文令牌**。对于连续标量或向量 $c \in \mathcal{C}$，定义

$$
\Phi_C(c) = \sigma(W_c c + b_c), (4.3)
$$

其中 $\sigma$ 为 Lipschitz 连续的非线性函数，例如 GELU 或 SiLU。

**统一令牌顺序**。令牌序列排列为

$$
[S_1,\ldots,S_n, F_1,\ldots,F_m, C_1,\ldots,C_q].
$$

当启用持续更新时，当前用户状态 $u_t$ 作为一个额外的特征侧令牌插入。添加源类型嵌入，以便源信息在投影到公共空间后仍被保留。

### 混合掩码注意力

令

$$
\mathbf{Z}^{(l)} = [\Phi_S(s_i); \Phi_F(f_j); \Phi_C(c_k)] \in \mathbb{R}^{L \times d},
$$

其中 $L = n+m+q$（若存在用户状态令牌则为 $n+m+q+1$）。在层 $l$，UniRec 应用

$$
\mathbf{Z}^{(l+1)} = \text{Softmax}\left(\frac{(\mathbf{Z}^{(l)}\mathbf{W}_Q)(\mathbf{Z}^{(l)}\mathbf{W}_K)^\top}{\sqrt{d_h}} + \mathbf{M}\right)\mathbf{Z}^{(l)}\mathbf{W}_V. (4.4)
$$

掩码为

$$
\mathbf{M} =
\mathbf{M}_{SS} & \mathbf{M}_{SF}

\mathbf{M}_{FS} & \mathbf{M}_{FF}
. (4.5)
$$

其四个区块编码了源感知的可见性：

- $\mathbf{M}_{SS}$ 是因果的，故序列令牌 $i$ 只能关注 $j \le i$ 的位置；
- $\mathbf{M}_{FF}$ 完全开放，故特征与上下文令牌密集连接；
- $\mathbf{M}_{FS}$ 完全开放，故特征侧令牌可以读取整个序列；
- $\mathbf{M}_{SF}$ 选择性开放，使得序列令牌可以访问上下文安全或用户侧信息，而不引入目标泄露。图 2 展示了区块结构。

### 渐进压缩

为控制长序列成本，UniRec 渐进地压缩序列块，而非在输入处压缩。设 $\mathbf{S} \in \mathbb{R}^{n \times d}$ 为当前序列表示。引入可学习查询

$$
Q_c \in \mathbb{R}^{k \times d}
$$

并定义

$$
\text{Compress}(\mathbf{S}) = \text{Softmax}\left(\frac{Q_c \mathbf{S}^\top}{\sqrt{d}}\right)\mathbf{S}. (4.6)
$$

由于压缩仅在若干轮统一交互之后应用，所得的令牌不仅编码历史本身，而且编码了已经过侧信息条件化的历史。

一个代表性的 8 层调度如下：

| **层数** | **序列分辨率** |
| --- | --- |
| 1-2 | $n$ |
| 3-4 | $n/2$ |
| 5-6 | $n/4$ |
| 7-8 | $n/8$ |

精确调度将在实证配套研究中作为可调工程变量处理。

### 基于 GRU 用户状态的持续更新

设 $u_t \in \mathbb{R}^d$ 表示紧邻交互 $t$ 之前的用户状态，$e_t \in \mathbb{R}^d$ 表示从当前统一模型中提取的交互嵌入。定义

$$

$$
z_t &= \sigma(W_z e_t + U_z u_t + b_z),

r_t &= \sigma(W_r e_t + U_r u_t + b_r),

\tilde{u}_t &= \tanh(W_h e_t + U_h (r_t \odot u_t) + b_h),

u_{t+1} &= (1 - z_t) \odot u_t + z_t \odot \tilde{u}_t.
$$

(4.10)
$$

在下一次交互时，$u_{t+1}$ 被嵌入为一个额外的特征侧令牌，并重新插入统一骨干。由此，未来预测依赖于内部状态更新的轨迹，而非单一的冻结摘要。

## 结构与几何设计理由

本节旨在提供解释性而非公理化的论述。这里使用的结构性词汇是适度的，其目的在于阐明为何有序序列与无序特征集不应过早被压平为单一无类型列表。

### 结构性视角

我们将输入源建模为两个范畴。设 Seq 为序列位置构成的偏序范畴，其中态射编码时间先后。设 Ftr 为特征域构成的离散范畴。异构输入域因此更应被理解为余积

$$
\mathbf{Seq} \oplus \mathbf{Ftr}
$$

而非单一无区别的列表。映射

$$
\Phi: \mathbf{Seq} \oplus \mathbf{Ftr} \to \mathbf{Vec}
$$

可赋予函子性解读。

> **命题**（令牌化的函子性解读）
>
> 在 4.2 节的令牌化规则下，UniRec 在统一交互之前保持了顺序敏感的序列结构与顺序不敏感的特征结构之间的区分。

**设计直觉**。在序列侧，顺序通过时间编码显式表示。在特征侧，内在顺序的缺失通过域感知嵌入以及对待域顺序的置换不敏感性来尊重。这里的要点并非声称一个深刻的范畴论定理，而是说明为何源感知令牌化比简单拼接更具原则性。

### 几何视角

Transformer 定义了一个庞大的函数类。在该类中，优化可能收敛到退化解，它们拟合标签却丢弃了有意义的源结构。UniRec 背后的几何直觉是：混合掩码与延迟压缩充当归纳约束，降低了这种退化的风险。因果掩码保持了时间可容许性；特征到序列的开放注意力允许侧信息条件化事件级相关性；延迟压缩防止模型在条件化发生之前坍缩序列。在这个意义上，“先统一，后压缩”并非一句启发式口号，而是一项具体的架构纪律。更完整的形式化评注留待附录 A。

## 信息论基础

令 $H_t$ 表示可用历史，$X_t$ 表示侧信息，$R$ 表示响应。令 $\Phi(H_t \oplus X_t)$ 表示统一表示，而 $g(H_t)$ 与 $h(X_t)$ 表示分离流水线中使用的任意确定性压缩器。

> **定理**（近单射统一表示界）
>
> 假设统一映射 $\Phi$ 在 $(H_t,X_t)$ 的支撑集上是近单射的，即 $$ H(H_t,X_t \mid \Phi(H_t \oplus X_t)) \le \epsilon. $$ 则 $$ I(\Phi(H_t \oplus X_t); R) \ge I(H_t,X_t; R) - \epsilon. (6.1) $$

> **证明**
>
> 由于 $\Phi(H_t \oplus X_t)$ 是 $(H_t,X_t)$ 的确定性函数，有 $$ I(H_t,X_t,\Phi(H_t \oplus X_t); R) = I(H_t,X_t; R). $$ 由链式法则， $$ I(H_t,X_t; R) = I(\Phi(H_t \oplus X_t); R) + I(H_t,X_t; R \mid \Phi(H_t \oplus X_t)). $$ 因此 $$ I(\Phi(H_t \oplus X_t); R) = I(H_t,X_t; R) - I(H_t,X_t; R \mid \Phi(H_t \oplus X_t)). $$ 最后， $$ I(H_t,X_t; R \mid \Phi(H_t \oplus X_t)) \le H(H_t,X_t \mid \Phi(H_t \oplus X_t)) \le \epsilon. $$

> **推论**（统一表示在 $\epsilon$ 内支配分离压缩）
>
> 对任意确定性压缩器 $g,h$， $$ I(\Phi(H_t \oplus X_t); R) \ge I(g(H_t),h(X_t); R) - \epsilon. (6.2) $$

> **证明**
>
> 由命题 3.4，联合确定性压缩不会增加任务相关信息： $$ I(g(H_t),h(X_t); R) \le I(H_t,X_t; R). $$ 结合定理 6.1 即得结果。

**解释**。定理 6.1 与推论 6.2 并非说任何名义上的统一模型都自动优于任何分离模型。它们表达了一个更基础的观点：如果一个统一表示近似保持联合输入结构，则其与响应的可用互信息在 $\epsilon$ 碰撞项内不低于任何确定性压缩分离表示的互信息。因此，早期压缩默认是有损的；延迟压缩只有在充分的联合条件化之后才变得可辩护。

> **定义**（替代距离）
>
> 设 $f_{\text{dyn}}$ 是一个动态预测器，它随时间更新内部用户状态，$\mathcal{H}_{\text{stat}}$ 是一类静态预测器。对于时间范围 $T$ 与损失 $\ell$，定义 $$ D_T(f_{\text{dyn}}, \mathcal{H}_{\text{stat}}) = \inf_{h \in \mathcal{H}_{\text{stat}}} \mathbb{E}\left[ \frac{1}{T} \sum_{t=1}^{T} \ell\bigl(f_{\text{dyn}}(x_{\le t}), h(x_{\le t})\bigr) \right]. (6.3) $$ 该量并非为了闭式计算，而是为未来工程实验提供一个清晰目标：在匹配参数预算下近似最佳静态替代，并测量其在交互范围内模仿轨迹依赖模型的程度。

证明细节总结于附录 B。

}

| l} |  |  |
| --- | --- | --- |
| **研究** | **假设/读出的结论** | **状态** |
| 非对角线注意力消融 | 完整 UniRec 应优于 $A_{FS}=0$、$A_{SF}=0$ 或两者均禁用的变体，从而检验显式序列-特征交互是否具有实质性作用 | 协议固定 |
| 压缩时机 | 在同等计算量下，延迟压缩应优于早期压缩，从而直接检验核心架构原则 | 协议固定 |
| 动态更新消融 | GRU 更新的 UniRec 应在长时程指标上超越静态 UniRec，并相对于冻结用户摘要增加替代距离 | 协议固定 |
| 扩展性研究 | 统一建模在模型规模、数据规模与历史长度上的收益应强于强分离基线 | 计划中 |
| 延迟与内存 | 渐进压缩应在保留统一交互大部分收益的同时提升成本效率 | 协议固定 |
| 定性分析 | 注意力图与用户状态轨迹应展示有意义的事件选择与偏好漂移 | 计划中 |

## 挑战对齐、经验协议与工程议程

本文档有意作为理论奠基技术报告。其目的是将架构假设、形式化保证与评估标准陈述得足够清晰，使后续工程研究能够对其进行证伪。

**挑战设定**。预期下游评估环境是“面向大规模推荐的序列建模与特征交互统一化”挑战。主要预测目标是 CVR，提交按单一 ROC-AUC 指标排名。除排行榜位置外，研讨会也明确重视统一模块创新与扩展规律分析。本报告的理论优先取向正是为了契合这一精神：先固定结构假设，使后续实证结果能被解释为支持或反对某一原则性架构主张的证据。

### 主要经验问题

未来的实证修订版将围绕一组直接问题组织。

### 公平基线政策

为提前应对公平性问题，比较政策在此处而非结果出来后固定。

**超参数政策**。所有模型将在相同的搜索空间内调优：学习率 $\{10^{-4}, 3\times10^{-4}, 10^{-3}\}$，dropout $\{0.1,0.2,0.3\}$，匹配的隐藏宽度档次，以及基于验证 AUC 的早停。

**预算政策**。所有模型将在匹配的有效批量大小、匹配的最大更新次数以及可行的匹配参数档次下进行比较。硬件配置与时钟预算将在实证配套修订版中披露。

}

| p{5cm}} |  |  |
| --- | --- | --- |
| **模型** | **实现来源** | **公平性规则** |
| Deep Crossing | 内部 PyTorch 重实现 | 无事件级序列编码器；仅非序列域；匹配调优网格与最大更新 |
| DeepFM / xDeepFM | 内部 PyTorch 重实现 | 无显式长序列建模的特征交互基线；匹配参数档次与优化预算 |
| AutoInt | 内部 PyTorch 重实现 | 无事件级序列分支的自注意力特征交互基线；匹配调优网格与有效批量大小 |
| SASRec + DCNv2 | 内部 PyTorch 重实现 | SASRec 将历史压缩为一个向量，然后与 DCNv2 融合；匹配参数档次与优化预算 |
| UniRec | 参考实现 | 渐进压缩前的统一交互；可选循环用户状态；与最强基线档次相同预算 |

### 工程发布计划

实证配套修订版将在政策和许可允许范围内发布：

- 合法的确切数据预处理细节；
- 模型超参数、随机种子与硬件配置；
- 交互块、压缩时机与动态更新的消融表；
- 参数、数据比例与序列长度上的扩展曲线；
- 延迟与内存剖面；
- 允许公开的代码与实验脚本。

因此，本报告应被解读为一份存档理论文档，它固定了后续工程工作必须验证的内容，而非一份已完成基准测试的论文。

## 讨论

本报告提出了一个关于推荐架构的特定主张：序列建模与特征交互之间的长期分离不仅是工程便利，更是一个带有隐含假设的建模选择。一旦这些假设被显式陈述，标准的“编码再交互”流水线就变得容易受到直接的理论批评。

第一个启示是方法论上的。如果历史事件的相关性取决于当前特征上下文，那么事件级交互就不能总是被推迟到序列压缩之后。在这种情况下，非对角线注意力并非修饰性改进，而是潜在统计依赖性的操作对应物。

第二个启示是架构上的。统一设计并不意味着无差别的处处交互，而是指异构输入共享一个骨干，同时保留源感知约束。在 UniRec 中，结构性视角激励了共享交互前的独立源映射，而几何视角激励了混合掩码与延迟压缩作为优化路径上的正则器。

第三个启示是概念上的。静态推荐模型，即使是大型模型，在结构上仍不同于那些内部用户状态随时间不可逆变化的模型。我们并不主张状态更新足以实现任何强意义上的智能或理解。更狭窄的主张是：一旦未来预测依赖于内部更新轨迹，用冻结查找表替换该模型就成为一个不同的、可经验检验的逼近问题。这正是替代距离所要捕捉的。

本报告也有明显局限。首先，它刻意采取理论优先，尚未提供充分实证验证。其次，基于 GRU 的动态模块增加了系统复杂性，可能在生产中需要细致工程。第三，结构与几何论证是解释性框架，而非智能行为的完整形式化。它们在本文中的角色是为架构设计提供纪律，而非替代证据。

## 结论

我们提出了 UniRec，一个以“先统一，后压缩”为核心原则的大规模推荐统一架构。本报告的核心论点是：分离式推荐流水线依赖于三个隐含假设——早期压缩的充分性、交互的可推迟性以及序列与特征分支的准独立优化。我们说明了为何这些假设在历史变长、辅助信息变丰富时日益脆弱。

UniRec 的技术贡献并非孤立组件，而是一个连贯的架构原则。结构保持令牌化在统一交互前保持源差异显式化。混合掩码注意力在不牺牲因果可容许性的前提下实现受控的非对角线交互。渐进压缩将信息损失延迟到跨源条件化之后。一个具体的基于 GRU 的持续更新机制将模型从静态汇总扩展为轨迹依赖的用户状态演化。

本文档旨在作为挑战“面向大规模推荐的序列建模与特征交互统一化”后续工程工作的最终存档理论奠基报告。其目的是将概念承诺、形式保证与证伪标准陈述得足够清晰，使后续实验能在无歧义的情况下以此为准。完整实证结果、实现工件以及可披露的数据集统计信息将在配套修订版中呈现。

## 附录

## 进一步结构评注

令 Seq 为由序列顺序诱导的偏序范畴，对象为 $\{1,\ldots,n\}$，当 $i \le j$ 时存在态射 $i \to j$。令 Ftr 为离散范畴，其对象为特征域，唯一态射为恒等。余积

$$
\mathbf{Seq} \oplus \mathbf{Ftr}
$$

在投影到 Vec 之前保留了时间先后与无序域结构之间的区分。一个更完整的形式化程序（留待未来工作）将刻画哪些架构替代能在令牌化与交互下保持相同的源侧不变量。本报告不要求那套更强的机器，其主张更为狭窄且架构性。

## 证明细节

由于 $\Phi(H_t \oplus X_t)$ 是 $(H_t,X_t)$ 的确定性函数，

$$
I(H_t,X_t,\Phi(H_t \oplus X_t); R) = I(H_t,X_t; R).
$$

应用链式法则得

$$
I(H_t,X_t; R) = I(\Phi(H_t \oplus X_t); R) + I(H_t,X_t; R \mid \Phi(H_t \oplus X_t)).
$$

因此

$$
I(\Phi(H_t \oplus X_t); R) = I(H_t,X_t; R) - I(H_t,X_t; R \mid \Phi(H_t \oplus X_t)).
$$

残差项由条件熵界定：

$$
I(H_t,X_t; R \mid \Phi(H_t \oplus X_t)) \le H(H_t,X_t \mid \Phi(H_t \oplus X_t)) \le \epsilon.
$$

## 参考文献

- [shan2016deep] Y. Shan, T. R. Hoens, J. Jiao, H. Wang, D. Yu, and J. C. Mao. Deep crossing: Web-scale modeling without manually crafted combinatorial features. In *Proceedings of the 22nd ACM SIGKDD International Conference on Knowledge Discovery and Data Mining*, pages 255--262, 2016.
- [cheng2016wide] H.-T. Cheng, L. Koc, J. Harmsen, et al. Wide & deep learning for recommender systems. *arXiv preprint arXiv:1606.07792*, 2016.
- [guo2017deepfm] H. Guo, R. Tang, Y. Ye, Z. Li, and X. He. DeepFM: A factorization-machine based neural network for CTR prediction. In *Proceedings of the 26th International Joint Conference on Artificial Intelligence*, pages 1725--1731, 2017.
- [wang2017deep] R. Wang, B. Fu, G. Fu, and M. Wang. Deep & cross network for ad click predictions. In *Proceedings of the ADKDD'17*, pages 1--7, 2017.
- [wang2021dcnv2] R. Wang, R. Shivanna, D. Cheng, et al. DCN V2: Improved deep & cross network and practical lessons for web-scale learning to rank systems. In *Proceedings of the Web Conference 2021*, pages 1785--1797, 2021.
- [hidasi2016session] B. Hidasi, A. Karatzoglou, L. Baltrunas, and D. Tikk. Session-based recommendations with recurrent neural networks. In *Proceedings of the 4th International Conference on Learning Representations*, 2016.
- [zhou2018deep] G. Zhou, C. Zhu, R. Song, et al. Deep interest network for click-through rate prediction. In *Proceedings of the 24th ACM SIGKDD International Conference on Knowledge Discovery and Data Mining*, pages 1059--1068, 2018.
- [zhou2019deep] G. Zhou, N. Mou, Y. Fan, et al. Deep interest evolution network for click-through rate prediction. In *Proceedings of the 33rd AAAI Conference on Artificial Intelligence*, pages 5941--5948, 2019.
- [kang2018self] W.-C. Kang and J. McAuley. Self-attentive sequential recommendation. In *2018 IEEE International Conference on Data Mining*, pages 197--206, 2018.
- [sun2019bert4rec] F. Sun, J. Liu, J. Wu, et al. BERT4Rec: Sequential recommendation with bidirectional encoder representations from transformer. In *Proceedings of the 28th ACM International Conference on Information and Knowledge Management*, pages 1441--1450, 2019.
- [lian2018xdeepfm] J. Lian, X. Zhou, F. Zhang, Z. Chen, X. Xie, and G. Sun. xDeepFM: Combining explicit and implicit feature interactions for recommender systems. In *Proceedings of the 24th ACM SIGKDD International Conference on Knowledge Discovery and Data Mining*, pages 1754--1763, 2018.
- [song2019autoint] W. Song, C. Shi, Z. Xiao, et al. AutoInt: Automatic feature interaction learning via self-attentive neural networks. In *Proceedings of the 28th ACM International Conference on Information and Knowledge Management*, pages 1161--1170, 2019.
- [vaswani2017attention] A. Vaswani, N. Shazeer, N. Parmar, et al. Attention is all you need. In *Advances in Neural Information Processing Systems*, volume 30, pages 5998--6008, 2017.

---

2026年3月27日
