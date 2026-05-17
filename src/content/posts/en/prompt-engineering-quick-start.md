---
title: 提示词工程快速入门：小瑶的七天学习笔记
date: '2026-03-09'
category: AI & Technology
tags:
  - 提示词工程
  - 入门
  - AI
description: >
  从词源到实战，用七天掌握七个最实用的提示词框架（CLEAR, ART, RICE, PAIR, SCAMPER, PESTEL, LIGHT）。这是一份给大一新生小瑶的入门指南，也是给所有希望驾驭AI的人的思维工具箱。
---

> *"Prompt the actor, and the play unfolds; prompt the mind, and wisdom speaks."*
> ——Adapted from a Shakespearean theatrical proverb

---

## Introduction: From Etymology to Wisdom—The Origins and Significance of Prompt Engineering

### I. The Etymology of "Prompt": A Soft Whisper on the Stage

In late 16th-century London, on the south bank of the Thames at the Globe Theatre, Shakespeare's *Hamlet* was being performed. An actor, immersed in his role, suddenly experienced a blank mind—among 1,500 lines of dialogue, he had forgotten one. In an era without electronic prompters, this would have been a致命失误. Yet the audience noticed nothing, because from a concealed trapdoor beneath the stage floor, a **prompter (提词员)** softly delivered the key phrase. The actor picked it up, and the performance continued.

This is the original theatrical image of the English word **prompt**. It derives from the Latin verb **promere**, composed of the prefix **pro-** (forward) and **emere** (to take), literally meaning "to bring forth." Its past participle **promptus** evolved into an adjective meaning "ready" or "at hand"—just as the prompter's ever-available script. After entering English in the 14th century, it expanded from "prompting action" to "cueing actors," then by the 17th century broadly to "reminding or prompting someone to act," and ultimately in the computer age, becoming the symbol on a screen awaiting user input.

Every time you type words into an AI dialogue box, you are playing the prompter beneath the stage. And the AI is the actor awaiting a cue.

### II. The Etymology of "Engineering": The Art of Innate Talent and Creation

**Engineering** likewise possesses noble lineage. It originates from the Latin **ingenium**, meaning "innate talent, ability, invention." This root also衍生出 ingenious (possessing genius) and engine (originally referring to a tool of天赋 or ingenuity). By the Middle Ages, *ingeniator* referred to those who designed or operated siege engines; after the Renaissance, *engineer* gradually指向 those who applied mathematical and scientific knowledge to solve practical problems.

Thus, **Prompt Engineering (提示词工程)** carries two layers of profound meaning from its etymological roots: first, "delivering prepared words forward at the right moment" (prompt), and second, "运用 innate talent and wisdom to creatively design solutions" (engineering). It is not simple指令输入, but a discipline融合 linguistics, psychology, logic, and creativity—both art and science.

### III. 5W1H: Precisely Defining Prompt Engineering

To enable thorough understanding from scratch, let us use the classic 5W1H method to parse this emerging discipline.

| Dimension | Question | Answer |
|------|------|------|
| **What** | What is prompt engineering? | The practice of designing and optimizing text (prompts) input to AI models, to引导 them toward generating outputs that meet expectations. |
| **Why** | Why learn it? | AI output quality极大地 depends on input quality. A good question has already solved half the problem. Mastering it transforms you from "passive recipient" to "active驾驭者." |
| **Who** | Who needs to learn? | Anyone interacting with AI: students, teachers, researchers, creators, programmers, managers... especially freshmen just entering university, because AI will become your most powerful learning companion for the next four years. |
| **When** | When to start learning? | Now. AI technology is exponentially integrating into education and work; the earlier you master it, the earlier you benefit. |
| **Where** | In which scenarios to apply? | Academic writing, literature retrieval, creative generation, data analysis, programming debugging, language learning, daily Q&A... virtually无处不在. |
| **How** | How to learn? | Through structured thinking frameworks. This article will use seven days to guide you through seven of the most practical prompt frameworks, witnessing from the perspective of freshman Xiaoyao (小瑶) her transformation from AI novice to熟练使用者. |

---

## Day 0: Xiaoyao's First Encounter with AI

On a September morning, sunlight filtered through parasol tree leaves onto the campus. Xiaoyao dragged her suitcase to the freshman registration desk of the School of Information Science and Technology, feeling both excited and忐忑. She was a newly enrolled freshman, majoring in Digital Media Technology. In high school she had heard of ChatGPT but never truly used it—it felt like "something only senior students could master."

At the first class meeting after registration, the counselor said: "The most important skill you must learn over four years of university is not memorizing knowledge points, but **learning to ask questions, learning to think**. In the age of artificial intelligence, those who can ask questions are the true masters."

Xiaoyao半懂不懂地 noted this down. Back in her dorm, she opened her laptop and for the first time clicked on DeepSeek's dialogue box. The cursor blinked on the screen, as if asking: "What would you like me to do?"

She typed: "Hello."

The AI immediately replied: "Hello! How can I help you?"

Xiaoyao froze. She didn't know what to say next. That blinking cursor was like an actor on stage awaiting a cue, while she had forgotten that she herself was the prompter.

She closed the computer, deciding first to understand this "art of prompting." She found several books about AI and prompts in the library, and watched many online tutorials. Over the next seven days, she learned one framework each day, practicing with her own real needs.

---

## Day 1: The CLEAR Framework—Turning模糊想法 into Clarity

### 1.1 Xiaoyao's Confusion

After the first class, the teacher assigned a short essay on the topic "Analysis of the Current State of the Chip Industry." Xiaoyao thought this was simple, so she opened DeepSeek and typed:

> "Help me write something about the chip industry."

The AI output a large passage, from chip definitions to manufacturing processes to market landscape,洋洋洒洒 over a thousand words. But Xiaoyao frowned after reading: "This content is too broad—I wanted analysis suitable for the assignment, not a popular science overview!"

She tried a second input:

> "Write an article about the chip industry."

The result was similar. Xiaoyao felt沮丧: "Why does AI never understand what I want?"

### 1.2 Introducing the CLEAR Framework

She recalled the counselor's words: "Those who can ask questions are the true masters." She began searching for "how to ask better questions" and found a prompt framework called **CLEAR**:

- **C - Concise**: Remove冗余信息, hit the core directly
- **L - Logical**: Ensure coherent reasoning, sound structure
- **E - Explicit**: Specifically state requirements, avoid歧义
- **A - Adaptive**: Flexibly adjust the prompt based on反馈
- **R - Reflective**: Evaluate output quality and continually optimize

Xiaoyao恍然大悟: the problem lay with herself—her prompts were too模糊! It's like walking into a restaurant and only saying "give me something to eat"—the chef当然 doesn't know whether to serve rice or braised pork.

### 1.3 Practice: Re-prompting with CLEAR

Xiaoyao took up pen and paper, redesigning her prompt using CLEAR's five elements:

| Element | Thinking Process | Reflected in Prompt |
|------|----------|----------------|
| **Concise** | Need to control length, not too long | "简要说明" (briefly explain) |
| **Logical** | Need upstream/downstream information and historical脉络 | "关键上下游信息" (key upstream/downstream information), "主要发展脉络" (main development trajectory) |
| **Explicit** | Assignment requires objectivity; uncertain points should be noted | "若有不确定信息，直接说明并给出可能来源" (if uncertain information exists, state it directly and give possible sources) |
| **Adaptive** | Leave AI room for adjustment | "可能来源" (possible sources)—allowing AI to提出 hypotheses |
| **Reflective** | After output, check whether it meets requirements | Not written yet, but will反思 upon receiving the answer |

Final prompt:

> "请简要说明芯片产业的关键上下游信息，并逻辑清晰地给出其主要发展脉络与现状。若有不确定信息，直接说明并给出可能来源。" (Please briefly explain the key upstream and downstream information of the chip industry, and logically clearly present its main development trajectory and current state. If there is uncertain information, state it directly and provide possible sources.)

This time, the AI's output was entirely different: it clearly listed upstream materials (silicon wafers, photoresist), midstream manufacturing (design, fabrication, packaging and testing), downstream applications (consumer electronics, automotive, communications), and the evolutionary trajectory from integrated circuits to AI chips, also noting prediction divergences regarding the future 3nm production timeline. This was exactly what Xiaoyao needed.

### 1.4 Xiaoyao's Reflection (R)

"It turns out I wasn't 'unable to use AI'—I was 'unable to ask questions.'" Xiaoyao noted in her notebook:

> **CLEAR心法 (Core Method)**: Before writing a prompt, ask yourself—is my need concise? Is the logic clear? Are the requirements explicit? Have I left AI room for adjustment? If the result is unsatisfactory, how should I revise?

She also realized that the CLEAR framework applies not only to AI prompting but also to日常沟通. From then on, whenever she sent WeChat messages to classmates or emails to teachers, she would subconsciously check whether they were clear and comprehensible.

---

## Day 2: The ART Framework—Who You Write For Matters More Than What You Write

### 2.1 Xiaoyao's New Challenge

On the weekend, Xiaoyao called her mom and mentioned the "supply-demand relationship" she had learned in economics class. Mom said: "What's this supply-demand thing? Can you explain it in words I can understand?"

Xiaoyao tried explaining using the textbook definition: "Supply refers to the quantity of goods producers are willing and able to sell within a given period, and demand is the quantity consumers are willing and able to purchase..."

"Stop, stop, stop!" Mom interrupted. "You're talking too professionally—I don't understand. Just tell me what this has to do with my grocery shopping!"

Xiaoyao froze. She realized she could write assignments but couldn't make her mom, who didn't understand economics, comprehend the concept.

### 2.2 Introducing the ART Framework

She thought: if AI were to explain it, how would it do so? She found the **ART Framework**:

- **A - Audience**: Identify target readers (e.g., professional background, knowledge level, interests)
- **R - Response**: Expected content and format of AI output (e.g., explanation, story, checklist)
- **T - Tone**: Specify language style (friendly, formal, humorous, critical, etc.)

### 2.3 Practice: Two Versions, One Concept

**Version One: For Mom (non-professional audience)**

> **Audience**: My mom, 50, housewife, knows nothing about economics, but grocery shops every day.
> **Expected Response**: Explain supply-demand using grocery shopping examples, under 500 words, vivid and engaging.
> **Tone**: Friendly, like casual conversation.

Prompt: "Please use my mom's daily grocery shopping examples to explain to her what the supply-demand relationship is. Use scenarios she's familiar with (like cabbage prices rising, pork getting cheaper), and avoid any专业术语. The tone should be as natural as chatting with mom."

AI output (excerpt):

"Mom, you often ask me: why is cabbage sometimes one yuan per pound and sometimes three yuan? That's the supply-demand relationship at work. Think about it—in summer, lots of cabbage hits the market, more sellers (high supply), but buyers stay about the same (demand unchanged), so prices drop. But in winter, local cabbage is scarce, it has to be shipped from the south (low supply), and everyone still needs to eat cabbage (demand unchanged), so prices naturally rise. That's 'demand exceeding supply' drives prices up; 'supply exceeding demand' drives prices down. Cheap pork works the same way—last year pork was expensive, so more people raised pigs; this year there are more pigs (supply increases), so prices come down..."

Xiaoyao read this passage to her mom. Mom laughed heartily: "Now I get it! Turns out I've been doing economics every time I buy groceries!"

**Version Two: For Classmates (professional beginners)**

> **Audience**: University economics freshmen, just studied supply-demand curves.
> **Expected Response**: A 500-word academic-style review, including definition, basic laws, and a real-world example.
> **Tone**: Formal but accessible, avoiding complex mathematical models.

Prompt: "Target readers are university economics freshmen. Please generate a brief academic-style review of the supply-demand relationship, maintaining a formal tone, including definition, basic laws, and a real-world example (such as the real estate market)."

The AI output was clear and规范, perfect for exam review.

### 2.4 Xiaoyao's收获

> **ART心法 (Core Method)**: Before you start writing, ask yourself—who am I speaking to? What do they need? What tone is most appropriate? Speaking differently to different people is not虚伪—it is respect.

She began using the ART framework to write self-introductions in different styles for different club interviews, succeeding every time.

---

## Day 3: The RICE Framework—Letting AI Play a Professional Role

### 3.1 Xiaoyao's Calculus Difficulty

In higher mathematics class, the teacher covered the ε-δ definition of limits, and Xiaoyao was completely茫然. She tried asking AI to explain:

> "Please explain the ε-δ definition of limits."

The AI output a pile of mathematical symbols and rigorous definitions, leaving Xiaoyao even more confused. She realized: it wasn't that AI explained incorrectly, but that the explanation style was unsuitable for her as a "beginner."

### 3.2 Introducing the RICE Framework

She then learned the **RICE Framework**, a prompt design method emphasizing "role-playing":

- **R - Role**: Specify the role AI should play (e.g., tutor, teaching assistant, study companion)
- **I - Instructions**: Clearly state the task to be executed
- **C - Context**: Provide necessary background information
- **E - Expectations**: Specify output format and content requirements

### 3.3 Practice: Letting AI Be My Personal Math Tutor

Xiaoyao redesigned her prompt:

> **Role**: You are a math tutor skilled at explaining abstract concepts through everyday analogies, having taught many confused freshmen about limits.
> **Instructions**: Please explain the ε-δ definition of limits in a way I can understand.
> **Context**: I am a freshman just encountering calculus. I understand the intuitive concept of limits ("approaching"), but the rigorous definition confuses me.
> **Expected Results**: First give a life analogy, then gradually transition to mathematical language, and finally provide two simple practice problems to help me consolidate.

The AI's output dazzled Xiaoyao:

**Life Analogy**:
> "Imagine you're a sniper, aiming at the bullseye (the limit value L). Your coach demands: no matter how small he draws the bullseye (any small ε), you must be able to find an aiming point (δ) such that whenever your aiming point is sufficiently close to the bullseye (within δ), the bullet will definitely land within the small ring around the bullseye (error less than ε). Your proof of being a sharpshooter is that for any small target ring, you can provide a corresponding aiming range."

**Mathematical Translation**:
> Corresponding to the limit definition: for any given positive number ε (target ring size), there exists a positive number δ (aiming range) such that when x's distance from a is less than δ (aiming point sufficiently close), f(x)'s difference from L is less than ε (bullet lands within the ring).

**Practice Problems**:
> 1. Use ε-δ language to explain why lim_{x→2} (3x-2) = 4.
> 2. For the function f(x) = x², if you want the error between f(x) and 4 to be less than 0.1, how close should x be to 2?

Xiaoyao恍然大悟: "So ε-δ just means 'no matter how precisely you demand, I can satisfy you!'" For the first time, she felt a mathematical definition could be亲切.

### 3.4 Extended Applications

Xiaoyao began collecting useful "role cards":
- IELTS speaking examiner (for English practice)
- Academic writing tutor (for paper revision)
- Efficiency expert (for planning)
- Psychological counselor (for emotional support)

> **RICE心法 (Core Method)**: Giving AI a role means giving it a perspective. The same知识, spoken by different "people," produces vastly different效果.

---

## Day 4: The PAIR Framework—Iterating toward Perfection through Dialogue

### 4.1 Xiaoyao's Literature Retrieval Difficulty

A professional course required writing a literature综述 on the topic "Applications of Artificial Intelligence in Education." Xiaoyao tried several keyword combinations on Web of Science—either too many results (5000+) or too few (under 10). She asked AI for help:

> "Help me find English literature on applications of AI in education."

The AI gave a pile of general suggestions, but Xiaoyao's attempts remained unsatisfactory.

### 4.2 Introducing the PAIR Framework

She then learned the **PAIR Framework**, designed specifically for multi-round iteration:

- **P - Problem**: Clearly express the problem to be solved
- **A - AI**: Let AI participate in analysis, providing初步见解
- **I - Interaction**: Optimize generated content through multiple rounds of交互
- **R - Reflection**: Evaluate AI's answers and adjust prompt细节

Xiaoyao realized her previous queries were one-shot, but literature retrieval is a process requiring continual adjustment. She decided to put the PAIR framework to use.

### 4.3 Practice: Three Rounds of Dialogue, Progressively Deeper

**Round One (P - Problem Definition)**:
> "My research topic is 'Applications of AI in Education,' focusing particularly on personalized learning. I've tried keyword combinations on Web of Science, but results are either too many or too few. Please help optimize my retrieval strategy."

AI suggested:
> Recommend using the following keyword combinations:
> - ("artificial intelligence" OR "AI") AND ("education" OR "learning")
> - Time range limited to: recent 5 years
> - Consider adding "personalized learning" as a secondary keyword

**Round Two (I - Interactive Feedback)**:
> "I tried the first组合 and got 5000+ results—too many. My research focuses more on K-12 education, not higher education. How to further narrow the scope?"

AI optimized:
> Can add the following限制:
> - ("K-12" OR "primary education" OR "secondary education")
> - Limit literature type to "review" (综述), first understand the field overview
> - Use "adaptive learning" to substitute部分 "AI" keywords

**Round Three (I - Continued Interaction)**:
> "综述 articles are a good idea. I've found several key papers. Now I want to expand retrieval based on the references of these papers—any methods?"

AI suggested:
> Try "snowball sampling":
> 1. Identify citation counts of core papers
> 2. Use the "Cited References" function in Web of Science
> 3. Follow authoritative authors in the field, search using "author:" field
> 4. Also try the "Connected Papers" tool to visualize literature relationships

After three rounds of dialogue, Xiaoyao not only found over 20 high-quality papers but also learned a systematic method for literature retrieval.

### 4.4 Xiaoyao's Reflection

She summarized the keys to the PAIR framework:
- **Ask only one question per round**: Don't throw a pile of questions in the first round.
- **Provide specific反馈**: Tell AI what was useful and what wasn't.
- **Record the iteration process**: You can ask AI to record each modification point.

> **PAIR心法 (Core Method)**: Good answers aren't asked—they're conversed into. Transform a single query into a dialogue, like exploring the unknown together with a friend.

---

## Day 5: The SCAMPER Framework—Letting Creativity Flow Boundlessly

### 5.1 Xiaoyao's Club Activity Challenge

Xiaoyao joined the Student Union's publicity department. The director要求 each member to design a creative activity for the upcoming "Club Recruitment Carnival." Xiaoyao racked her brain, but all she could come up with were clichés like "hand out flyers," "post posters," "set up a booth with games." She desperately needed fresh ideas.

### 5.2 Introducing the SCAMPER Framework

With AI's help, she found the **SCAMPER Framework**, a classic creativity-stimulation tool:

- **S - Substitute**: Can you replace certain parts?
- **C - Combine**: Can you combine with other elements?
- **A - Adapt**: How to adapt to new scenarios?
- **M - Modify**: Can you放大 or modify certain features?
- **P - Put to other uses**: Are there other uses?
- **E - Eliminate**: Can you simplify or remove?
- **R - Reverse/Rearrange**: Can you reverse the order or rearrange?

### 5.3 Practice: From "Boring Flyer Distribution" to "Campus Treasure Hunt"

She took "handing out flyers" as a starting point and applied SCAMPER item by item:

| Angle | Question | Creative Idea |
|------|------|----------|
| **Substitute** | Can paper flyers be replaced with something else? | AR flyers: scan campus landmarks with a phone, club intro videos pop up |
| **Combine** | Can it be combined with other activities? | Flyers + mini games: puzzle printed on flyer背面, solve it to win prizes at the booth |
| **Adapt** | Can time/location be adjusted? | Don't distribute at cafeteria entrance; instead distribute during evening study sessions, with a 10-minute pitch |
| **Modify** | Can the flyer's role be amplified? | Design flyers as "stamp collection cards"—collect stamps from five clubs to enter a prize draw |
| **Put to other uses** | What other uses do flyers have? | Print course schedules and备忘录 on flyer背面, turning them into practical items students won't throw away |
| **Eliminate** | Can we simply not distribute flyers? | Fully digitize: post club recruitment short videos on campus confession walls and Douyin accounts |
| **Reverse** | What if new students distributed flyers? | Invite new students to experience one day of club work, letting them introduce the club to other newcomers |

Xiaoyao compiled seven ideas into a creative清单 and sent it to the director. The director was大为惊喜, especially loving the "AR flyer" and "stamp collection card" ideas, deciding to adopt them for the recruitment event.

### 5.4 Creating a Fairy Tale with SCAMPER

Xiaoyao also tried writing a story using SCAMPER:

> "Please help me create a modern fairy tale with a fox and a princess as protagonists. Apply SCAMPER: reverse chronological order (start from the ending), combine tech elements (holographic projections, robots), and replace magical props with tech devices."

The AI created a精彩故事: the fox破解 the city's holographic map, helping the princess find the lost ancient forest.

### 5.5 Xiaoyao's Insights

> **SCAMPER心法 (Core Method)**: Innovation isn't凭空想象—it's systematically transforming existing things through套路. Seven angles are like seven keys; try them one by one, and you'll always unlock a new door.

---

## Day 6: The PESTEL Framework—Analyzing Problems Like an Expert

### 6.1 Xiaoyao's Major Selection Dilemma

The school required freshmen to确定 their major direction before the end of the first year. Xiaoyao was纠结 among Digital Media Technology, Computer Science, and Artificial Intelligence. She gathered lots of information, but it was too much and too杂, making her even more迷茫.

### 6.2 Introducing the PESTEL Framework

AI recommended the **PESTEL Framework** to Xiaoyao, a macro-environment analysis tool commonly used in business analysis and strategic planning:

- **P - Political**: Policies, regulations, government support
- **E - Economic**: Industry prospects, salary levels, job market
- **S - Social**: Social需求, cultural acceptance, ethical争议
- **T - Technological**: Technology maturity, development速度, breakthrough directions
- **E - Environmental**: Environmental impact, sustainability
- **L - Legal**: Legal risks, intellectual property,合规 requirements

### 6.3 Practice: Using PESTEL to Analyze Three Majors

She asked AI to help, using PESTEL to analyze the prospects of each major. Taking AI as an example, an excerpt of the output:

| Dimension | Key Points |
|------|--------|
| **Political** | Nations elevate AI to national strategy, strong policy support; but also face data security and tech export control risks |
| **Economic** | Related positions command high salaries, active investment and financing; but capital泡沫 risk exists, some sectors may face洗牌 |
| **Social** | Public understanding of AI gradually deepens, acceptance increases; but "AI replacing jobs" anxiety persists |
| **Technological** | Rapid breakthroughs in large models, multimodal, etc.; but theoretical innovation enters瓶颈期, compute costs are high |
| **Environmental** | Large model training consumes electricity and water,引发 environmental争议; green AI emerges as a new direction |
| **Legal** | AI regulatory bills陆续 enacted across nations,合规 costs rise; intellectual property issues (e.g., training data copyright) remain unresolved |

Similar analyses were conducted for Computer Science and Digital Media Technology. After comparison, combined with her childhood love of drawing, Xiaoyao chose Digital Media Technology.

### 6.4 Advanced Application: Cross-Analysis

AI also taught her to perform cross-analysis: how does technology affect society? How does policy推动 technology? This reveals a dynamic picture.

> **PESTEL心法 (Core Method)**: When making choices, don't only look at the present—look at the macro environment. Six dimensions are like six searchlights, illuminating the path ahead.

---

## Day 7: The LIGHT Framework—Giving Thought Warmth

### 7.1 Xiaoyao's Public Welfare Project

The school organized a "Tech for Good" public welfare project competition. Xiaoyao and several classmates formed a team. They wanted to design an app to help elderly people in the community, but after prolonged discussion, their ideas remained stuck at the "feature list" level: emergency calls, medication reminders, health monitoring... something still felt missing.

### 7.2 Introducing the LIGHT Framework

AI recommended a special framework to Xiaoyao—**LIGHT**, a value-oriented framework:

- **L - Love of Wisdom (爱智慧)**: Pursue deep thinking and rational exploration, not settling for surface-level answers
- **I - Inquiry for Truth (求真理)**: Base conclusions on facts and evidence, avoiding偏见 and盲从
- **G - Gain Freedom (得自由)**: Achieve spiritual or practical freedom through knowledge and truth
- **H - Humanity in Service (以服务)**: Serve others as the core, embodying empathy and social responsibility
- **T - Towards Peace (创和平)**: Commit to harmony and reconciliation, promoting understanding and cooperation

Reading these words, a warm current surged in Xiaoyao's heart. She realized the team had only been thinking about "what features to build," rarely considering "why build," "for whom," and "how to do it better."

### 7.3 Practice: Redesigning the Project with LIGHT

She used the LIGHT framework to guide the team's重新思考:

**Love of Wisdom**:
> "Do we truly understand the elderly? What are their real needs? Is it an emergency call button, or a sense of安心 and companionship?"

The team decided to first conduct community调研, chatting with elderly residents. They discovered many seniors weren't afraid of sudden illness (the community hospital was nearby), but were very afraid of loneliness. One grandmother said: "I have eight apps on my phone, but what I want most is someone to teach me how to use WeChat video calls to chat with my grandson."

**Inquiry for Truth**:
> The调研 results颠覆 the initial design assumptions.

**Gain Freedom**:
> The team重新定义 the goal: not "monitor elderly health," but "help elderly maintain independent, dignified lives." The app's features shifted from "reminding the elderly what to do" to "enabling the elderly to actively learn and autonomously社交."

**Humanity in Service**:
> They decided to add a "Silver Age Classroom" section, where volunteers (university students) record simple, easy-to-understand phone usage tutorials, with online Q&A available.

**Towards Peace**:
> Considering that conflicts between elderly and children often arise from "can't teach them to use phones," they designed a "Parent-Child Sync Learning" mode: children claim learning tasks on the app; when the elderly complete learning, both parties earn积分 rewards.

Ultimately, their app was named "Warm Sun" (暖阳), and it won first prize in the competition. A judge commented: "You didn't just design an app—you designed a warm community relationship."

### 7.4 Xiaoyao's升华

> **LIGHT心法 (Core Method)**: Technology is cold; the human heart is warm. The LIGHT framework reminds me: whatever I do, I must ask—is this truly useful? For whom? Could it cause harm? Can it make the world even slightly better?

---

## Framework Selection Guide: Xiaoyao's Quick Reference

| Task Type | Preferred Framework | Why |
|----------|----------|--------|
| Homework, daily questions | CLEAR | First clarify your needs |
| Explaining the same thing to different people | ART | Audience determines expression |
| Need a professional perspective | RICE | Give AI a role |
| Complex problems requiring multiple rounds | PAIR | Good answers need conversation |
| Brainstorming, creative generation | SCAMPER | Seven angles break固定思维 |
| Analyzing trends, making decisions | PESTEL | Six dimensions view the big picture |
| Reflecting on values, designing public welfare | LIGHT | Give technology warmth |

---

## Combined Application: Xiaoyao's Final Major Assignment

At the end of the semester, the teacher assigned a major project: design a campus service product for freshmen. Xiaoyao decided to use all seven frameworks:

1. **PESTEL** analyzed the macro environment: a mini-program is more suitable than an app, focusing on freshman pain points (registration, course selection, socializing).
2. **SCAMPER** stimulated creativity: designed the "Xiaohe" (小禾) mini-program, featuring AR real-scene navigation, senior Q&A community, textbook recycling, lost-and-found, etc.
3. **RICE** refined features: had AI play a product manager role, improving the Q&A community's interaction logic and incentive mechanisms.
4. **ART** adjusted expression: wrote different versions of product introductions for freshmen, seniors, and judges.
5. **PAIR** iterated the plan: collected trial feedback from classmates, conducting multiple dialogue rounds with AI to optimize features.
6. **CLEAR** wrote documentation: used CLEAR to generate the product specification初稿, then refined it.
7. **LIGHT** calibrated values: added a "Freshman Care" section where volunteers post encouraging words, giving the product warmth.

The final方案 was recommended by the school to participate in the university-level competition and won an award. Xiaoyao had truly内化 all seven frameworks.

---

## Conclusion: Xiaoyao's Seven Days, and Your Infinite Possibilities

Seven days of learning have ended, but Xiaoyao's collaboration with AI has just begun. She developed a habit: before each question, she considers which framework to use. She更明白: **frameworks are tools;灵活运用 is the key.** CLEAR makes her clear, ART makes her体贴, RICE lets her leverage strength, PAIR lets her go deep, SCAMPER makes her innovative, PESTEL gives her远见, LIGHT gives her warmth.

Returning to the etymology story—Prompt, from "bring forth" to "ready," to "the art of human-machine collaboration"; Engineering, from "innate talent" to "creatively solving problems." Prompt Engineering is运用天赋, delivering prepared words at the right moment, awakening AI's wisdom, and together演绎 brilliant chapters.

Dear reader, if you are also a freshman, or anyone wishing to collaborate deeply with AI, I hope Xiaoyao's notes offer you some inspiration. Remember:

> **Those who can ask questions are the masters of the AI era.**
> **And a good question has already solved half the problem.**

Now, it's your turn to take the stage. Open your AI assistant and begin your first "prompting."

> *"The fool doth think he is wise, but the wise man knows himself to be a fool."*
> ——Shakespeare, *As You Like It*

---

## Afterword: Three heartfelt words for Xiaoyao and friends—Warm reminders from Dr. Dayao

Dear Xiaoyao, and all friends reading these notes:

When you've finished learning seven frameworks and are ready to embark on your AI collaboration journey, I'd like to share three heartfelt words from the perspective of psycholinguistic research. These are not "correct answers," but hopes that while enjoying AI's便利, you also safeguard your mental health.

### First, Remember: AI Is a Tool, Not a Person

In the story, I had AI "play a tutor" and "create stories," using拟人化 approaches to make it easier for you to understand. But please务必记住: AI is fundamentally a complex **pattern-matching and text-generation system**. It doesn't真正 "understand" your emotions, has no "consciousness," and doesn't "think." Its outputs are based on statistical规律 from海量数据, not human-level intent or belief.

Think of it as a **super-intelligent prompter**, not another human companion. This way, you can enjoy its power without过度依赖 or misunderstanding its capabilities—for instance, don't倾诉 emotional problems to it expecting empathy, and don't treat its words as absolute truth without verification.

### Second, Frameworks Help You Think—They're Not Meant to Make You Anxious

After learning seven frameworks, you might feel as tense as I did—wondering "which framework to use" before every question, making things even more tiring. This is a normal **cognitive load phase**; psychology tells us this is an必经之路 when learning new skills.

My减负 suggestions:
- **Beginner period, just learn three**: Master CLEAR (clarity), ART (audience), and RICE (role) first, handling 80% of scenarios.
- **Intermediate period, consult as needed**: Store the SCAMPER, PESTEL, and LIGHT quick-reference tables on your phone; look them up when needed.
- **Advanced period,内化 as habit**: Gradually, you'll naturally ask "Who is my audience?" or "What angle haven't I considered?"—at this point, frameworks have become part of your thinking.

If any framework feels exhausting, it means you're not yet ready for it—set it aside and start from simpler ones.

### Third, Always Maintain审慎 toward AI Outputs

In the story, I often "satisfactorily accepted" AI's answers, but in reality, you must always take one extra step: **verify**. AI may generate "hallucinations"—information that seems合理 but is entirely wrong; its training data may contain偏见 and timeliness issues; it lacks the ability to verify information's真实性.

Every time you use AI output, ask yourself three questions:
1. Where can I verify this information? (Textbooks, official websites, original papers?)
2. In AI's表述, what is fact, what is opinion, and what is speculation?
3. If I'm wrong, what consequences would follow?

**AI's answers require your verification.** It's like a knowledgeable but偶尔出错 senior student—you can leverage its wisdom, but ultimately you must take responsibility for information's真实性. This isn't distrust of AI—it's being responsible toward yourself.

---

Finally, three sentences for you, wishing you well in the AI era:
**Use it清醒地, without沉迷;**
**Accept it批判地, without盲从;**
**Collaborate warmly, without依赖.**

Your friend,
Dayao (大瑶)

> **Copyright Notice**: This is a preview translation — Chinese original is the authoritative version. Copyright belongs to Guangzhou Phaenarete AI Technology Co., Ltd. Unauthorized reproduction, citation, or distribution is prohibited.