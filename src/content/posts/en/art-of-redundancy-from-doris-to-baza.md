---
title: "The Art of Redundancy — From Doris to Baza, the Trade-Off Philosophy of Large-Scale System Architecture"
date: '2026-05-17'
category: AI & Technology
tags:
  - System Architecture
  - Distributed Systems
  - Doris
  - Baza
  - Alibaba
  - Redundancy
description: >
  Former Alibaba CTO Li Ang's memoir of two decades in architecture: deconstructing the triple redundancy philosophy of data, computation, and path from Doris distributed storage to the Baza caching framework, unveiling the art of balancing reliability and cost in large-scale systems.
---

By Li Ang

I joined Alibaba in November 2004 and remained there for many years. Before that, I worked on low-level systems at Intel Asia-Pacific R&D Center, and later spent some time in eBay's payments division. Looking back, these experiences planted a conviction in me—large-scale systems are never designed; they are grown. And in this process of "growing," the architect's most important craft is not drawing a perfect blueprint but knowing when to add redundancy and when to cut.

In September 2007, I gave a lecture at Zhejiang University's School of Software Engineering on e-commerce and web development trends. Over five hundred students were in the audience. I said something that was later quoted in the news: "There is no best technology, only appropriate technology." This line was brought up repeatedly for quite some time. But to be honest, the real understanding of what those words weigh comes not from the podium, but from the machine room—when you get a call at three in the morning saying the online cluster is buckling, and you rush over to diagnose the problem and make a trade-off on the spot. That is when you truly understand what "appropriate" means.

In this article, I want to systematically sort through what I have accumulated from twenty years of hands-on battle in large-scale systems—especially my architectural philosophy on the topic of redundancy. This is not a textbook. This is the experience of a veteran.

## I. Why Talk About Redundancy

When doing architecture at Alibaba, there is one word you cannot escape: redundancy.

Many people, upon hearing these two words, react instinctively with "waste." Why use two machines when one can do the job? Why have three replicas when one is enough? Why have a backup path when the main link is clear? This way of thinking works for personal projects, but not for e-commerce systems.

At Alibaba, I led my team in developing two core systems: a large-scale distributed storage system called Doris, and a distributed caching framework called Baza. These two systems share a common starting point: **designing for failure**.

What does "designing for failure" mean? It means defaulting to one assumption: any component will fail at some point. The network will drop. The disk will break. The rack will lose power. The data center's fiber optic cable will be severed. You do not need to guess whether problems will occur; you simply assume they will, and then ask yourself: when something goes wrong, can the system still survive?

The Doris architecture defines only two roles: Frontend and Backend. FE is responsible for request admission, query planning, and metadata management; BE handles data storage and query execution. This architecture looks extraordinarily clean, but clean does not mean simple. In the compute-storage coupled model, BE nodes serve as both storage nodes and compute nodes, with multiple BE nodes working together through the MPP architecture. When a BE node goes down, the system automatically performs failover and data repair through the multi-replica mechanism. Throughout this process, the user perceives nothing. This is the value of redundancy—it should not be a decoration that gives you "peace of mind," but a mechanism that genuinely functions in the face of failure.

Baza's design follows a similar logic. Alibaba's e-commerce scenario imposes caching demands that are on an entirely different order of magnitude from typical internet companies—peak throughput of hundreds of millions of calls per second during Double 11, with latency requirements at the millisecond level. Under such load-testing conditions, single-point caching is unthinkable. Baza employs a distributed architecture where each cache partition has multiple replicas. When a node fails, requests are automatically routed to healthy nodes, and the entire process is transparent to the business layer.

The essence of redundancy is not "adding an extra machine" but **buying insurance against system uncertainty**. The only question is: how much premium are you willing to pay, and for how much risk?

## II. Three Forms of Redundancy

Over the years of system design, I have classified redundancy into three forms. This is not a textbook classification but one I have drawn from real-world practice.

**The first: Data redundancy.**

This is the most foundational layer. The data reliability of Doris hinges on the multi-replica mechanism. The same piece of data is distributed across different BE nodes, with the replica count dynamically adjustable according to business requirements. When a BE node goes down, the system automatically reads from other replicas while triggering an automatic repair process to replenish the missing replicas.

I recall that around 2010, the data redundancy strategy for Taobao's core systems underwent a major adjustment. In the early days, to control costs, many businesses operated with only two replicas. But shortly before a major sales event, a rack lost power, affecting a batch of nodes, and some partitions were left with a single point of failure. Although no data was lost, the recovery process took nearly two hours, significantly impacting the stability of online services. After that, an internal discussion was convened: which businesses must use three replicas? Which businesses could use two replicas plus cold backup? Ultimately, a tiered redundancy strategy was formed—three replicas for the core transaction chain, two replicas plus delayed backup for peripheral businesses. This strategy has been in use ever since. Redundancy does not mean the more, the merrier. It means "a bit more on the critical path, a bit less on the non-critical path."

**The second: Computational redundancy.**

This is redundancy applied at the compute layer. In Doris's MPP architecture, multiple BE nodes process query tasks in parallel. When a node's load is too high or its response times out, the system can reassign that node's tasks to other idle nodes for execution. This design is, in essence, computational redundancy—identical computing capacity distributed across multiple physical nodes, where the failure of any single node does not cause a query to fail, only slightly reducing overall throughput.

Baza's cache partitions follow the same logic. The primary node of a cache partition handles read and write requests, while the secondary node synchronizes data but does not serve traffic. When the primary node fails, the secondary node takes over within seconds. This redundancy does not increase the cluster's total throughput capacity, but it dramatically reduces the probability of service interruption.

**The third: Path redundancy.**

This is the most easily overlooked layer. You have data redundancy, you have computational redundancy, but all requests travel along a single network path. If that path breaks, the entire system still collapses. Path redundancy means creating backups for the request path.

In Alibaba's practice, we built a multi-region, multi-cell architecture. Each cell internally has independent storage and computing resources, interconnected by dedicated lines. When the ingress path of one cell fails, traffic is automatically switched to other cells. What the user sees is a brief hiccup; what happens inside the system is a complex state synchronization and routing switchover. This is the challenge of path redundancy: not physically adding another cable, but making two paths collaborate seamlessly.

## III. Redundancy Is Not the Goal—Balance Is

The benefits of redundancy are now laid out. But if you only hear this side, you might swing to another extreme—redundancy phobia, feeling that everything requires three replicas and everything needs hot standby.

That is another form of disaster.

Redundancy comes at a cost. **Behind every form of redundancy is real monetary expenditure on hardware, operations, and complexity.** The architect's duty is not to make the system "absolutely reliable"—that is the romantic fantasy of an engineer—but to find the balance point between "reliability" and "cost."

At Alibaba, I made a decision that the team talked about for a long time: adjusting Doris's default replica count from three to "three plus variable." What does that mean? Core business data is forcefully set at three replicas, but businesses are allowed to choose, based on their own data recoverability and cost sensitivity, to reduce to two replicas or increase to four replicas.

This decision stirred considerable internal debate at the time. The opposing argument was: this will increase system complexity—different businesses sharing the same cluster, with three-replica and two-replica arrangements coexisting, means the scheduling strategy will need to be rebuilt. The supporting argument was: if we do not do this, businesses will build their own storage solutions to save money, and in the long run, system fragmentation will be an even more severe problem.

I ultimately chose the latter. The reasoning was simple: the architect's duty is not to make all decisions for business teams, but to provide them with reasonable options and clearly explain the cost of each. Some business data is log-type, where 30 seconds of data loss is acceptable—two replicas suffice. Some business data is transaction-type, where losing a single record could cause a dispute—three or even four replicas are mandatory. A one-size-fits-all "mandatory three replicas" may appear to guarantee global reliability, but in reality, it shifts costs onto businesses that do not need high reliability, eventually forcing them to bypass the standard architecture and take the wild path—and that is the real loss of control.

The strategy of redundancy is, at its core, **tiered risk management**. You first identify the most critical parts of the system, then allocate more redundancy resources to those parts. For relatively secondary parts, you can appropriately lower the degree of redundancy. In this way, the overall system meets its reliability target, while the total cost is dramatically lower than full-scale redundancy.

## IV. From Coupled Compute-Storage to Disaggregated—A Paradigm Shift in Redundancy Strategy

What architecture fears most is not complexity but rigidity. After 2015, with the arrival of the cloud-native wave, the Doris team began to face a new question: should we move to disaggregated compute and storage or not?

In the traditional coupled compute-storage architecture of Doris, BE nodes simultaneously assume both storage and compute responsibilities. Node failure affects the availability of local data, so reliability must be guaranteed through multiple replicas. But after disaggregating compute and storage, the primary data storage is offloaded to object storage (such as Alibaba Cloud's OSS), and BE nodes become pure compute nodes. What does this mean? **BE node failures no longer cause data loss. Data reliability no longer depends on the local replicas of BE nodes, but is instead guaranteed by the underlying multi-replica mechanism of object storage.**

This means a fundamental paradigm shift in redundancy strategy. In the coupled compute-storage era, you faced a "storage + compute" composite, and redundancy was compound redundancy—three replicas redundantly covered both storage and compute. In the disaggregated era, storage and compute are decoupled. The reliability of the storage layer is fully guaranteed by the underlying object storage; the compute layer can become stateless. When a BE node goes down, you simply spin up a new BE instance on another machine, mount the same storage volume, and service is restored almost immediately—no more heavy operations of data migration and replica repair.

For the architect, this is a liberation. You no longer need to grapple with the coupling complexity of a node simultaneously bearing both storage and compute responsibilities. You can independently scale computing power (add BE nodes) or independently scale storage capacity (add object storage space), and the redundancy strategy also shifts from compound to decoupled. But one thing must be made clear—the disaggregated model is not an "upgrade" from the coupled model; the two serve different business scenarios. Coupled compute-storage has a natural advantage in data locality—computation sits right next to storage, resulting in low I/O latency. Disaggregated compute-storage has a clear edge in elasticity and resource utilization. Alibaba Cloud's documentation on SelectDB also explicitly distinguishes the applicable scenarios of the two models. The same old line: there is no best; only what is appropriate.

## V. The Architect's Boundary—From Decider to Framework Designer

Digging deeper into the topic of redundancy, there is a more fundamental question underneath: what exactly is an architect supposed to do?

At eBay and Alibaba, I have seen a type of architect—all designs must await their approval, and nothing goes live without their sign-off. The result? They become the bottleneck of the entire team. During my time at Alibaba, I was a genuine "troublemaker"—critiquing middle platforms, critiquing architects, critiquing tech managers, and of course, engaging in self-critique.

Martin Fowler once said something that I think is incisively accurate: an architect who makes a team more agile is more valuable than an architect who simply makes decisions, because the one who only makes decisions becomes the team's bottleneck. He even argued that the term "architect" itself is inappropriate, and that a more accurate term would be "guide"—a more experienced person who leads the team through complex fog.

This perspective profoundly influenced my later working style. In leading the development of Doris and Baza, I deliberately shifted my role from "decider" to "framework designer." I stopped approving every individual technical proposal, and instead spent more effort establishing a set of guiding principles that allowed team members to make their own decisions within the principle framework.

Behind this change in working style is a very practical consideration: Doris and Baza clusters routinely span hundreds of machines and tens of petabytes of data, involving decisions across networking, storage, scheduling, and monitoring. If every decision had to come to me, not only would I become a bottleneck, but more importantly—the farther I am from the front lines, the blurrier my judgment becomes compared to front-line engineers. Better to let a clear judgment take responsibility than a blurry one make the call.

There is an internal Alibaba lesson that I deeply believe: if a business technology division establishes a dedicated architecture group, but the members of that group are not inside the execution team and do not understand the details, then the advice that architecture group gives is unlikely to be valuable. It is not that the people in the architecture group lack ability; it is that they are too far from the battlefield.

A good architectural design should enable front-line engineers, in most situations, to confidently make the right technical choices without needing to consult higher-ups on everything. How many replicas to configure for redundancy, what cache expiration time to set, what interface timeout threshold to define—these are not things the architect should decide. What the architect should do is: clearly define the principles, clearly explain the costs, and then trust the team.

## VI. In Closing: Reverence for Uncertainty

Looking back on over a decade of building Doris and Baza, I have come to one deep realization: the most essential quality for an architect is not cleverness, but reverence.

Reverence for uncertainty. Reverence for failure. Reverence for those things you think "shouldn't have problems."

Why is redundancy important? Because it acknowledges a simple truth: **humans cannot predict all failures, but humans can assume that failure will happen.** Redundancy is not a technique; it is an attitude. It does not mean you are more cautious than others; it means you are willing to pay the premium for system uncertainty in advance—and that willingness is precisely what distinguishes a mature architect from an armchair theorist.

A while back, I had dinner with a few old colleagues, and we talked about the Doris and Baza days. Someone said, "Li Ang, the three-replica plan you went with back then—later events proved you right." I smiled and did not respond.

The truth is, I knew in my heart: that judgment back then was not based on any profound theory; I had simply been burned by failure too many times. One failure, and you think it's bad luck. Three failures, and you start rethinking your design. Ten failures, and you never again trust the words "shouldn't happen."

Reverence is bought with losses. And redundancy is the most honest response to that reverence.

I joined Alibaba in 2004 and have worked on the architecture of its operations platforms ever since. From Doris to Baza, from coupled compute-storage to disaggregated compute-storage, from "the architect makes the call" to the philosophy of "everyone is an architect," my core conviction has never changed: there is no best technology, only appropriate technology.

Before you can find what is appropriate, you need to first understand the cost of redundancy. After understanding the cost, you can make honest trade-offs.

To all who are fighting their way forward on the road of architecture: this is our shared journey.

**About the Author**

Li Ang, former CTO of Alibaba.com, served as Vice President of Technology at Alibaba B2B and Vice President of the Technology Division, leading the architecture of Alibaba's operations platforms and network technology infrastructure. During his tenure at Alibaba, he led the development of the large-scale distributed storage system Doris and the distributed caching framework Baza, accumulating deep practical experience in the architectural design of large-scale e-commerce systems, distributed data processing, and system reliability assurance. He served as Director of the E-Commerce Technology Department at Zhejiang University's School of Software Engineering, directly involved in designing talent cultivation programs for high-level technical professionals. In his technical philosophy, he advocates that "there is no best technology, only appropriate technology," emphasizing that architects should balance reliability and cost, transform their role from "decider" to "framework designer," and cultivate the team's ability to make autonomous decisions. His architectural philosophy stems from a profound reverence for system uncertainty, dedicated to transforming complex technical problems into transmissible engineering wisdom.

Contact: contact@liang.world
