---
title: The Rights and Wrongs of Recommendation Systems
date: '2026-03-26'
category: AI & Technology
tags:
  - recommendation systems
  - ethics
description: >
  Questioning recommendation systems through 5W1H: they are not merely click-through rate predictors or matching algorithms, but decision engines that help users discover value amid information overload; a unified architecture is not about stacking models, but placing sequences, features, and context into the same space, enabling understanding and long-term value to become possible.
---

> This is not a mild blog post. This is a challenge letter written to recommendation system practitioners. If you have ever tuned models late at night until your hands grew numb, if you have ever fallen into nihilism facing a three-thousandths AUC improvement, if you have ever suspected whether we are using increasingly complex tools to solve a problem that should be fundamentally restructured—this article is written for you.

---

## Preface: The 5W1H of Recommendation Systems?

5W1H is not a management cliché. It is a Socratic interrogation.

Why, What, Who, When, Where, How. Six questions, each striking at the heart. If you cannot answer them, don't proceed. If you answer well, don't hesitate.

The biggest problem with recommendation systems today is not that models are insufficiently deep, data insufficiently abundant, or GPUs insufficiently expensive. Rather—**we have not seriously answered these six questions for a long time.**

We default Why to "the boss wants to increase GMV." Default What to "click-through rate prediction." Default Who to "users." Default When to "real-time." Default Where to "the feed." Default How to "add another Transformer layer."

These answers are all correct. But they are also all wrong.

Because they are too shallow. So shallow that we have forgotten to ask: what right do you have to recommend to users? What right do you have to make choices for users? Will recommendation systems still exist in this form ten years from now?

This article attempts to answer these six questions. Not to write a paper, but to give ourselves an accounting. If after reading you think "this person is crazy," congratulations—you are fortunate. If after reading you think "this indeed needs someone to do it," then welcome aboard.

**If you don't do it, others will.** (不做，有的是人做)

---

## Why: Why Do We Need Recommendation Systems?

### The First Why: Information Overload

Human capacity for processing information has not changed from ancient times to the present. At most a few dozen bits per second. At most a few hundred items of content per day.

Yet the internet generates information every second that a single human could never finish viewing in a lifetime.

This scissors-shaped divergence is the fundamental reason recommendation systems exist. Not because you are clever, but because you are limited. Recommendation systems are an extension of your cognition, the hand that retrieves the needle from the ocean haystack.

Without recommendation systems, you return to 1995—browsing directories yourself, finding websites yourself, judging for yourself whether something is worth reading. In those days, going online was a skill, not a lifestyle.

### The Second Why: Vague Needs

Do you know what you want?

If you know, you will search. But most of the time, you don't. You don't know what movie you want to watch tonight, don't know where you want to eat next weekend, don't know that such a book, such music, such a viewpoint exists in the world.

The second task of recommendation systems is to **help you discover things you don't know you would like**. This is not "matching"; this is "inspiration" (启发).

Matching is "you want A, I give you A." Inspiration is "you like B, you might also like C, because C and B share some connection you haven't yet realized." These are two entirely different logics. Matching is waiting for the rabbit to crash into the tree (守株待兔, a Chinese fable of passive waiting); inspiration is proactive engagement (主动出击).

### The Third Why: Economic Efficiency

From the platform's perspective, recommendation systems are resource allocators.

Content creators need audiences for their work, merchants need buyers for their goods, advertisers need clicks on their ads. The platform holds only users' limited time; whoever delivers the greatest value to users should receive more of that time.

This is not cold-blooded economics; this is fair resource allocation. Good recommendation systems let good content be seen, let good merchandise be purchased, let good advertisements be clicked. This is efficiency, and also justice.

### Why "Unified"?

Because information overload, vague needs, and economic efficiency are not independent.

To address information overload, you need to process massive historical behaviors. To address vague needs, you need to understand user profiles and item attributes. To pursue economic efficiency, you need to balance short-term clicks and long-term retention.

These three goals point in the same direction: **a system capable of simultaneously processing sequences and features**. Without sequences, you cannot see user changes. Without features, you cannot understand user essence. Without unification, you are forever patching things together.

---

## What: What Exactly Is a Recommendation System?

### It Is Not "Click-Through Rate Prediction"

Click-through rate is a proxy metric, not the goal.

Users clicking does not mean they are satisfied; satisfaction does not mean conversion; conversion does not mean long-term retention. We use click-through rate because it is easy to measure, not because it is the ultimate objective.

If you define recommendation systems as "click-through rate predictors," you are training a machine that caters to short-term preferences. Whatever the user wants to see today, you give them. Tomorrow they change, you follow. Always trailing behind, never delivering surprise.

### It Is Not "A Matching Algorithm"

Matching is static: user profile vs. item profile, compute a similarity, take the highest.

But users are not static. Yesterday they liked science fiction; today they may be obsessed with philosophy. In the morning they want something light; in the evening something profound. Matching algorithms cannot see these changes.

A genuine recommendation system is dynamic. It does not ask "who are you," but asks "who are you at this moment." This moment is the moment shaped by your history, defined by your features, bounded by your context.

### It Is Not "A Personalization Engine"

Personalization is a means, not an end.

The end is helping users discover value. If the user needs what everyone else has (such as trending news everyone is reading), then personalization is actually interference. If you forcibly personalize for them, they will think the system is broken.

A good recommendation system knows when to personalize and when to follow the crowd. This judgment requires a global perspective.

### What Is It?

If forced to define it in one sentence, I would say:

**A recommendation system is a decision engine that, in an information-overloaded environment, helps users discover value by understanding their past (sequences), present (features), and context.**

In this sentence, every word carries weight:

- "Information-overloaded environment": its raison d'être.
- "Understanding the user's past, present, and context": what it does. Past is sequences, present is features, context is time, place, device.
- "Helping users discover value": its objective. Not "pushing," not "converting," but "discovering."
- "Decision engine": its nature. Not a statistical model, not a matching algorithm, but a machine that continuously makes decisions.

A unified architecture is the technical solution that makes this definition a reality. It lets past, present, and context interact within the same space, makes "understanding" possible, makes "discovery" traceable.

---

## Who: Who Is Building? Who Is Using? Who Benefits?

### Who Is Building?

Technicians. Researchers. Engineers. Data scientists.

What you do every day is essentially **building a black box that understands users**. This black box must be fast enough that users sense no delay. Accurate enough that users feel "this system understands me." Stable enough to operate 365 days a year without downtime.

You are the most fortunate group of this era. Because what you are doing did not exist twenty years ago and may not exist twenty years hence. Now is the golden age of recommendation systems; technology is moving from separation to unification, and the paradigm is shifting from prediction to understanding.

But you are also the most exhausted group. Because you stand on the front lines of business. The boss wants growth, products need iteration, users want experience. You are caught in the middle, using code and models to satisfy everyone's expectations.

### Who Is Using?

Users. You are also being recommended to every day.

Do you know what being recommended feels like? Sometimes a pleasant surprise—"so this exists too." Sometimes aversion—"why is this being pushed to me again." Sometimes numbness—"whatever."

Every click, every scroll, every lingering pause by a user tells the system: what I like, what I dislike, what I hesitate over. These signals are the fuel of recommendation systems. Without users, the system is dead.

But users are not merely data sources. They are people with expectations. They expect to be understood, expect to be discovered, expect to be respected. If you merely treat them as labels and sequences, they will sooner or later leave.

### Who Benefits?

Platforms, creators, advertisers, society.

Platforms need user activity, need dwell time, need commercial monetization. Creators need to be seen, need fans, need creative motivation. Advertisers need to reach target audiences, need conversion, need ROI. Society needs information to flow effectively, needs good content to triumph over bad, needs attention not to be wasted.

Good recommendation systems let all roles benefit. Users discover value, creators gain returns, platforms achieve growth, social efficiency improves. This is a positive-sum game, not a zero-sum game.

But the prerequisite is: recommendation systems must be good. Bad recommendation systems trap users in filter bubbles (茧房, silkworm cocoons), hold creators hostage to algorithms (被算法绑架), let platforms pursue short-term interests, and flood society with false information.

A unified architecture is one path toward "good recommendation systems."

---

## When: When to Start? When to End?

### When to Start?

It has already started.

Twenty years ago, collaborative filtering was the answer. Ten years ago, deep learning was the answer. Five years ago, Transformer was the answer. Now, unified architecture is the answer being explored.

Every paradigm shift has people who hesitate. They say "collaborative filtering is sufficient," "deep learning is too expensive," "Transformer cannot be interpreted." But they were wrong. Because technology does not stand still, user expectations do not stand still, competition does not stand still.

The window for unified architecture is right now. OneTrans, HyFormer, PLR have already proven the viability of this path. But it is far from the finish line. Whoever can produce the most compelling unified module in TAAC2026 will leave their name on this direction.

### When to End?

Never.

Not because technology has no endpoint, but because recommendation systems' objectives are changing.

Today's objective is conversion rate; tomorrow's is user satisfaction; the day after's is long-term value; the day after that may be social welfare. When objectives change, technology must follow. Unified architecture is merely the current direction, not eternal truth.

But the thinking pattern of unified architecture—placing information of different structures in the same space and letting them freely interact—may persist for a long time. Because the essence of information is plural, and the process of understanding is unified. This insight will not become obsolete.

---

## Where: Where to Build? Where to Use?

### Where to Build?

In laboratories, in competitions, in companies, at the computer late at night.

Laboratories are the incubator of idealism. No business pressure, no latency constraints; you can think slowly, experiment slowly. But laboratory results are often far from deployment.

Competitions are the battlefield of realism. There are deadlines, leaderboards, competitors. They force you to produce working things within limited time, forcing you to confront the trade-off between efficiency and effectiveness.

Companies are the examination hall of pragmatism. Code must go live, models must serve, metrics must grow. Every line of code you write could affect millions of users' experience.

The computer late at night is the ascetic practice of solitude. No one rushes you, no one helps you; only you and the screen. Thinking at such moments is most pure, and most profound.

### Where to Use?

In feeds, in short videos, in e-commerce, in advertising, in maps, in music, in social networks.

Recommendation systems are everywhere. Every day you open your phone, you are recommended to at least dozens of times. Every piece of content, every product, every advertisement you see has a recommendation system working behind it.

But the more ubiquitous they are, the more easily overlooked. Users don't know you're working behind the scenes; bosses think this is infrastructure; society takes it for granted.

Only when problems arise do people remember you. Recommendations are inaccurate, users curse you; metrics drop, bosses come looking for you; ethical issues emerge, the whole society discusses you.

This is the fate (宿命) of recommendation systems: when done well, no one thanks you; when done poorly, everyone criticizes you.

### Where Is Unified Architecture Most Needed?

In scenarios with long sequences, many features, and high latency sensitivity.

Short video: user behavior sequences are extremely long, features extremely numerous, latency requirements extremely high. Unified architecture is most valuable here, and also most challenging.

E-commerce: user behavior sequences are long, feature dimensions are high, but latency tolerance is relatively higher. Unified architecture can go deeper and more complex.

Advertising: user behavior sequences are moderate, features are very rich, latency requirements are extremely high. Unified architecture needs to find balance between efficiency and effectiveness.

Information feed: user behavior sequences are long, features are diverse, latency is sensitive. Unified architecture has a natural advantage.

Choosing which scenario depends on your resources and objectives. If pursuing ultimate effectiveness, choose short video or information feed. If pursuing deployment feasibility, choose e-commerce or advertising. If pursuing academic value, you can choose a cross-scenario unified framework.

---

## How: How to Do It?—From Theory to Practice

This is the hardest question to answer. The preceding five W's were all "why"; only How is "how." This is also the longest section of the article.

### Layer One: Understanding Data

TAAC's data gives you:
- User profile: dozens of features
- Item attributes: dozens of features
- Historical behavior: three subsequences—item_seq, action_seq, content_seq
- Timestamps: the time of each behavior
- Labels: whether conversion occurred

Your first task is not to write a model, but to understand this data.

Compute the distribution of sequence lengths. Examine the ratio of positive and negative samples. Analyze correlations among features. Discover patterns in timestamps. Draw the data flow diagram.

This process may consume a week. But that week is worth it. Because the deeper your understanding of data, the more well-grounded your design.

### Layer Two: Constructing Tokens

Each historical behavior is a "mini-triplet": item, action type, content features.

You must fuse them into a single vector. This is the first step of unified tokenization.

Fusion methods are many:
- Concatenation: concatenate three embeddings, pass through one MLP layer
- Addition: add three embeddings (assuming dimension consistency)
- Gated fusion: learn a gate, dynamically determine the importance of three parts
- Cross-attention: let three parts mutually attend, then aggregate

Which method to choose depends on your preference and experimental resources. Concatenation is most stable, gated is most flexible, cross-attention is most complex.

I suggest starting with concatenation. First get the pipeline running, then optimize details.

### Layer Three: Designing the Backbone

The backbone is a stack of stackable modules. Each module contains:
- Multi-head self-attention
- Feed-forward network
- Residual connections
- Layer normalization

This is a standard Transformer structure. But two places need customization.

**First, causal masking.**

The sequence portion (historical behavior) must maintain causality: each position can only see preceding positions. This is straightforward—add a causal mask.

**Second, progressive compression.**

Sequence tokens are too many to always retain. They need to be progressively compressed in later layers.

Compression methods:
- Simple truncation: retain only the last k tokens
- Attention pooling: use learnable queries to extract k tokens from all tokens
- Clustering: cluster tokens into k groups, take cluster centers

Simple truncation is easiest to implement but may lose information. Attention pooling is more flexible but computationally heavier. Clustering falls between the two.

I suggest trying simple truncation first. If results are poor, then upgrade.

### Layer Four: Introducing Inference-Time Computation

Using the same computation for all samples is not optimal. Cold-start users and history-rich users require different inference depths.

Implementation:
- Train an auxiliary classifier, predicting at each layer whether continued inference is needed
- Or more simply: dynamically determine inference layer count based on history length

This optimization can be done in the last two weeks. If time is tight, it can be skipped.

### Layer Five: Engineering Optimization

Inference latency is a hard constraint. Must be controlled within limits.

The optimization three-pronged approach:
- KV cache: user portion precomputed, reused across candidates
- Progressive compression: sequence tokens decrease layer by layer, computation volume drops
- Mixed precision: FP16 inference, speed doubles, precision loss negligible

These three must be done. Without them, your model may not meet latency limits.

### Layer Six: Iteration and Tuning

Start from the simplest baseline. Then gradually increase complexity.

Record at each step:
- AUC changes
- Latency changes
- Parameter count changes

If you discover some change yields minimal AUC improvement but latency spikes, abandon it. In competition, efficiency is sometimes more important than effectiveness.

### Layer Seven: Writing the Technical Report

The technical report is your sole opportunity to dialogue with review experts.

Report structure:
- Problem definition: what does unified architecture solve?
- Design philosophy: on what principles was it designed?
- Technical details: tokenization, backbone, compression, optimization
- Experimental design: baselines, comparisons, metrics
- Results analysis: quantitative results, qualitative analysis, failure cases
- Scaling analysis: scaling laws for parameters, data, computation
- Conclusion and outlook: the future of unified architecture

Writing style: clear, confident, deep. No exaggeration, no false modesty, seeking truth from facts (实事求是).

---

## After the Six Questions: If You Don't Do It, Others Will

After writing these six questions, my conclusion is:

**Unified architecture is the next paradigm for recommendation systems.**

This is not an optimistic prediction, but a cool-headed judgment. Because the separation paradigm has hit a ceiling. Sequences are growing longer, features are growing more numerous, latency requirements are growing higher; the separation architecture's efficiency is declining, effectiveness is plateauing. A new architecture is needed to break this bottleneck.

Unified architecture is not the only direction, but it is the most natural extension. Because it does not negate past accumulation, but integrates it into one framework. Sequence models don't need to be discarded, feature interaction doesn't need to be overturned, only the organization method changes.

This opportunity is right before us. TAAC2026 provides data, compute, prize money, exposure. Three months is sufficient to verify an idea.

But opportunity belongs to those bold enough to act.

Acting boldly is not charging in blindly. It is thinking clearly, then pressing forward with determination.

Think clearly about what?
- Think clearly about why (Why)
- Think clearly about what (What)
- Think clearly about for whom (Who)
- Think clearly about when (When)
- Think clearly about where (Where)
- Think clearly about how (How)

How many of these six questions can you answer?

If you can answer all six, you already have a clear roadmap. The remainder is merely execution.

If you can answer only one or two, you need more time to think. Don't rush to act; think clearly first.

If you cannot answer any, you probably should not proceed. Because this is difficult, exhausting, and solitary. If you cannot even articulate why you are doing it, you will not endure those late-night debugging sessions, stagnant AUC, and code crashes.

But if you have thought it through, then go do it.

**If you don't do it, others will.** (不做，有的是人做)

---

## Final Words

Recommendation systems do not need to be saved. They are doing fine.

But recommendation system practitioners need to be reminded. Reminded not to forget the original inquiry: what right do you have to recommend to users?

This article is not an answer; it is questions. Six questions, for yourself, for your team, for this industry.

If, after reading this article, you decide to participate in TAAC2026, to try unified architecture, to challenge that thing where "if you don't do it, others will"—then this article has had meaning.

The bird that survives the fire is a phoenix (烧不死的鸟是凤凰). Only by doing difficult and correct things do you have the chance to become that bird.

A tough bone (硬骨头)—will you gnaw it?

---

**End of full text**

**March 26, 2026**

> **Copyright Notice**: This is a preview translation — Chinese original is the authoritative version. Copyright belongs to Guangzhou Phaenarete AI Technology Co., Ltd. Unauthorized reproduction, citation, or distribution is prohibited.