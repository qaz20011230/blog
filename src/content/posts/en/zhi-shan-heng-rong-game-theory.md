---
title: "Zhi Shan Heng Rong: The Invincible Mindset of Life's Game"
date: '2026-04-25'
category: Philosophy
tags:
  - game theory
  - life
  - philosophy
description: >
  From Alibaba B2B's platform governance to the Phaenarete project's human-AI collaboration, using the Prisoner's Dilemma and Axelrod's computer tournament as entry points, this essay explores the four iron laws of survival in repeated games: Zhi Shan (strive for goodness), Chi Heng (maintain balance), Cun Rong (preserve tolerance), and Shou Qing (keep clarity).
---

Late at night, reading Conway's Game of Life, cells on the screen flickering on and off, gliders crossing the boundaries of the grid, replicators quietly copying themselves. Simple rules iterated repeatedly can emerge such complex patterns of life. I have worked in computer systems for over twenty years, seen countless sophisticated architectures, complex strategies, advanced algorithms. But the ones that truly withstand the erosion of time are always the simplest few.

The way of games is also like this.

## One: The Smart People in the Cage

The setup of the Prisoner's Dilemma is nearly cruel: two suspects interrogated separately, both silent and each gets one year, both confess and each gets eight years, one confesses and one stays silent, the confessor walks free, the silent one gets ten years.

Play only one round, what do you choose? Betrayal. Because no matter what the other chooses, betraying always gives you an advantage. The other is also a smart person, and can also calculate this logic. Two smart people meet, and the result is both serving long prison sentences.

When I first joined Alibaba in 2004, China's internet landscape was full of such "one-shot games." Fake goods, embezzled funds, false advertising—each case wore the hat of "rationality"—since we won't meet again tomorrow, why not take advantage now?

But Alibaba took the opposite path. Review systems, guaranteed transactions, credit scores—these mechanisms seemed clumsy, but actually harbored deeper wisdom: they forcibly transformed one-shot transactions between strangers into a web of repeated games among acquaintances. If you deceive one person today, the entire market will know tomorrow. If you honestly do business for three years, all your good reviews and credit will become endorsements for every future order.

**In a one-shot game, betrayal is rational; in a repeated game, cooperation is rational.** Grasping this turn requires not just cleverness, but vision.

## Two: What the Tournament Taught Us

In the 1980s, political scientist Robert Axelrod did something epoch-making. He invited strategy programs from top scholars worldwide and had them compete against each other in repeated Prisoner's Dilemma matches for two hundred rounds.

The contestants showed their ingenuity. Some programs built profiles for each opponent, analyzing the probability of the opponent's reaction after being betrayed, and deciding whether to show goodwill or strike next. Some programs had nested logic, appearing profound and inscrutable. Some believed in "one betrayal, never forgiven"—once betrayed, they would never forgive. Others tried to anticipate the opponent's anticipation, precisely calculating the gains and losses of each step between cooperation and betrayal.

Who was the winner?

A strategy with only four lines of code. **Tit for Tat.** The rules are absurdly simple: cooperate on the first move, then on every subsequent move repeat whatever the opponent did on their previous move. You cooperate, I cooperate; you betray, I betray; you come back, I turn the page.

In the second tournament, sixty-three experts returned with countermeasures specifically designed to defeat the champion. More cunning probes, more precise betrayals, more brutal revenge—all aimed at cracking those four lines of code. The champion was still Tit for Tat.

Those complex strategies that calculated three extra steps and anticipated your anticipation all lost to a four-line-code "fool."

During my years leading technical systems at Alibaba, I verified this principle countless times. A distributed architecture handling a billion calls per day fears not single failures, but over-engineering. Those layered disaster-recovery logic, mirrored degradation plans, often collapse in cascading fashion during real disasters. When the moment comes, what works best is the simplest primary-backup switching plus automatic retry—unremarkable, yet standing the test every time.

**Simplicity is the highest form of strength.**

## Three: The Fourfold Mindset of Zhi Shan Heng Rong

Axelrod broke down all the top strategies and extracted four common traits. They are not some profound theories, but iron laws of survival repeatedly validated after tens of thousands of rounds of game trials. I condensed them into four characters—**Zhi Shan Heng Rong (致善衡容)**.

**First: Zhi Shan (致善)—Strive for Goodness—Do not draw the first blade.**

None of the winning strategies would initiate betrayal. The reason is almost simple: if you strike first, the other remembers you, and will surely retaliate later. The temporary advantage gained cannot offset the cumulative cost of prolonged revenge.

In 2007, when Alibaba B2B went public, the platform already had tens of millions of small and medium business users. Our systems team worked day and night on one thing: making integrity visible. Not through slogans, but through technology. The review system left traces of every act of trustworthiness and every act of breach; guaranteed transactions gave trust a basis to rely on. We were not teaching merchants to be good people—we were designing a game environment where "being a good person" earns more than "being a bad person."

**Goodness is not a moral virtue; it is a form of foresight.** In the world of repeated games, goodwill is not a loss—it is the longest-term investment.

**Second: Chi Heng (持衡)—Maintain Balance—Do not let others bully you.**

But goodness absolutely does not mean weakness. Tit for Tat does not tolerate betrayal; once you betray, it immediately retaliates, without a moment of hesitation.

In the *Analects* (*Lunyu*, 《论语》), someone asked Confucius, "What about repaying injury with kindness?" Confucius countered, "Then what would you repay kindness with? Repay injury with justice, repay kindness with kindness." Eastern wisdom from over two thousand years ago coincides exactly with the optimal solution derived from twentieth-century game theory.

During my years doing platform governance at Alibaba, this line was the most challenging to calibrate. Brushers (*shuadan*, 刷单), counterfeiters, subsidy scammers—if there were no penalties, the rules would be meaningless, and those who followed the rules would instead become laughingstocks. So the rules must have teeth, and penalties must make transgressors feel pain. **Tolerance without boundaries is indulgence; goodness without limits is cowardice.** Let the other know that crossing the line will definitely have consequences. This is precisely the greatest protection for all those who follow the rules.

**Third: Cun Rong (存容)—Preserve Tolerance—Leave a path back.**

This is the most easily overlooked, yet the most crucial point. After Tit for Tat retaliates, it immediately turns the page. As long as you cooperate in the next round, it resumes cooperation immediately. No grudges. There is no ledger of "you wronged me three years ago, now I need to make up for it."

How many relationships are destroyed by holding grudges. Today an unintentional mistake, I note it; another day I find an opportunity to retaliate, you note it too; you counterattack, and the hatred snowballs. Ultimately the foundation of cooperation shatters completely, and both sides forget what originally brought them together.

During my years on the B2B platform, I saw countless merchants facing permanent bans for a single mistake. But we always held to one principle: penalties must be swift, but the door back to normal business after penalization must also remain open. Not leniency—but knowing that once you push someone to a dead end, they can only fight you to the bitter end. The later "noise tolerance" experiments in game theory also proved that Tit for Tat with about a one to five percent forgiveness probability is the ultimate winner in an imperfect world. Real-world cooperation always has mistakes, misunderstandings, information asymmetry; zero-tolerance strategies may be logically perfect in computer simulations, but in the real world they are destined not to go far.

**Tolerance with boundaries is not weakness, but vision.** Retaliation establishes boundaries, tolerance opens the way forward; both are indispensable.

**Fourth: Shou Qing (守清)—Keep Clarity—Let others see through you.**

Tit for Tat's ability to inspire the broadest cooperation lies precisely in its transparency, devoid of any scheming. Opponents quickly figure it out: this person doesn't play double games, doesn't engage in probing, doesn't hide anything. Cooperation earns cooperation, betrayal earns retaliation—everything is predictable.

In complex systems, the most expensive cost is never money, but uncertainty. Once the rules become vague, changing day to day, participants' first reaction will inevitably be "who knows what the rules will be tomorrow, better to grab what I can now and run."

When I led the e-commerce technology department at Zhejiang University's Software College, I often told students one thing: the best code is code that others can understand at a glance; the best rules are rules that everyone can understand at once. At Alibaba, we spent enormous effort making platform rules transparent. What can be done, what cannot be done, what the consequences are for crossing red lines—all written clearly in black and white. Large merchants and small merchants, newcomers and veterans, all could operate with peace of mind under the same rules.

**Predictability is the greatest reliability.** Those too deep in scheming have no friends. Ecosystems with transparent rules thrive. If you make yourself inscrutable, others won't dare to play with you; if you are sufficiently candid, collaborators will naturally gather.

## Four: The Foundation of the Invincible

In 2012, Alibaba B2B was privatized and delisted from the Hong Kong Stock Exchange, and the entire group underwent a transformative restructuring. During that period, as CTO, I led the technical team through architectural evolution, supporting the subsequent reshaping of the entire group. In the storm, I repeatedly experienced one truth: the more turbulent the environment, the more precious simple principles become. Not those flashy strategies, not those intricate calculations, but those good, firm, tolerant, clear choices—like an anchor in a gale, steadying the course that enabled us to navigate through cycles.

In 2007, Alibaba's IPO: offering price 13.5 HKD, closing price 39.5 HKD, market cap surging to 199.6 billion HKD, oversubscribed 258 times, setting a record for Hong Kong IPOs. What sustained that capital myth? Not outlandish stories, not shocking technology, but the plain fact of tens of millions of small and medium businesses doing business day after day on a single platform. Every honest transaction was an accumulation of trust; every fulfilled contract was an investment in the future. The market's eyes are sharp—when it saw the stability and endurance of this game structure, capital's vote followed naturally.

From the 1980s computer tournament, to the billions of real transactions on Alibaba's platform, from the few lines of Conway's code that can emerge life patterns, to the trust mechanisms that human civilization has evolved over thousands of years—different scales, the same thread:

**The ultimate winner is not the person who can calculate best, but the person who can make others most willing to cooperate with them.**

Those who strive for goodness do not raise the blade first; those who maintain balance do not let rules be trampled; those who preserve tolerance do not block the way forward over old grievances; those who keep clarity do not make their minds inscrutable. When all four are present, one becomes the invincible hero on the game field.

## Five: From Alibaba to Hilbert: The Larger Chessboard of Game Theory

In 2018, I left Alibaba and turned to an entirely new field—the intersection of artificial intelligence and mathematics. Today, as co-founder and CTO of [a certain AI company], I lead a group of young people devoted to the "Phaenarete Project"—exploring human-AI collaboration at the frontier of mathematics, targeting Hilbert's eighth problem, that peak of the Riemann Hypothesis standing for over 160 years.

From the business world to the mathematical world, the chessboard has changed, but the underlying logic of the game has not.

Mathematical research is also a repeated game. Between mathematicians and the unknown, each attempt is either cooperation or a dead end; between research communities, each sharing and verification is a round of trust-building. The PrimeClaw multi-agent framework we developed enables AI and humans to mutually verify each other in formal verification, based on the same conviction: transparency, predictability, fault tolerance, no first malicious move. Complex conjectures require long periods of approach, and in this lengthy repetition, only good strategies can reach the end.

What my team and I are doing is designing the rules of human-AI collaboration with the spirit of game theory—ensuring AI does not first "betray" human intuition, ensuring humans do not permanently shut the door of collaboration because of a single AI error, making the verification process clear and transparent, giving every step of reasoning a basis to stand on. **Zhi Shan Heng Rong is not only the mindset for business games, but can also become the ethical framework for human-AI collaboration.** This is what I figured out when leaving Alibaba, and the driving force that keeps me moving forward today.

## Conclusion

"Hide your edge, and brilliance shines forth naturally" (*yin fengmang zi hui'ang*, 隐锋芒自辉昂)—this was the advertising slogan for the Volkswagen Phideon (*Da zhong Hui'ang*, 大众辉昂). When I first read it, my heart stirred.

Edges do not need to be constantly displayed. Those aggressive, competitive strategies that wear cleverness on their face often cannot go far. On the contrary, those who do not strike first but do not fear retaliation, who let bygones be bygones, who keep their rules clear—without needing to proclaim themselves—possess a power that makes others feel safe to approach. When this power accumulates, it becomes the foundation of invincibility.

Choosing goodness is not naivety, holding to principles is not rigidity, letting bygones be bygones is not forgetfulness, being simple and transparent is not shallowness. They are, in this complex world, the truly invincible wisdom of survival—filtered through long evolution and repeated games.

*Written on April 25, 2026, by Liangzhi (良之) at Jiahe Wanggang (嘉禾望岗)*

> **Copyright Notice**: This is a preview translation — Chinese original is the authoritative version. Copyright belongs to Guangzhou Phaenarete AI Technology Co., Ltd. Unauthorized reproduction, citation, or distribution is prohibited.