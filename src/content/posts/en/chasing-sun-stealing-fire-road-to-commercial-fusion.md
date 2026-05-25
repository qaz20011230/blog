---
title: "Chasing the Sun, Stealing Fire: The Road to Commercial Controlled Nuclear Fusion"
date: '2026-05-16'
category: AI & Technology
tags:
  - Nuclear Fusion
  - Plasma Physics
  - Literature Review
  - Energy
  - Tokamak
  - AI
description: >
  A complete literature roadmap — from basic to mastery — for graduate students aspiring to work on commercial controlled nuclear fusion: from Jackson's Electrodynamics to CFEDR integrated design, from the Grad-Shafranov equation to AI-driven fusion control.
---

**Liang Zhi**

**May 2026 · Guangzhou**

> Prometheus stole fire from the chariot of the gods. Zeus, enraged, bound him to the cliffs of the Caucasus, sending an eagle each day to devour his liver.
> But the fire had already scattered among humankind, never to be reclaimed.
> Today's fire-stealers remain bound to the cliff. But we have sharper shackles to break—they are called literature.

## Preface: Literature Is the Only Ticket into the Sanctuary

Every year, hundreds of young people worldwide pour into the study of plasma physics and fusion energy. Most of them spend a year cramming for the GRE and TOEFL, two years completing coursework credits, three more years earning their degree—and then leave.

Not because fusion is too hard. Because no one has ever taught them: **what to read, in what order to read it, and to what depth constitutes truly "getting it."**

They can recite the Lawson criterion by heart, yet do not know that the original paper on this criterion is only two-and-a-half pages long. They can derive the Grad-Shafranov equation, yet have never manually computed the equilibrium configuration of a real tokamak. They know the name ITER, yet have never read through any chapter of the *ITER Physics Basis* in its entirety.

This is a failure of education, not a failure of the students.

This article attempts to accomplish one thing: **to draw, for graduate students aspiring to work on commercial controlled nuclear fusion, a complete literature roadmap from entry to mastery.** This is not a "recommended reading list" but a precisely calculated learning system. Every piece of literature included here is present because it is irreplaceable in the position it occupies.

The full text is approximately thirty thousand characters. After reading it, you will not need to attend any course. You will simply need to work through these texts, one by one.

## Chapter One: Foundations—Become a Physicist Before Entering Fusion

### 1.1 What You Need to Supplement Is Not Knowledge but Thinking

Fusion plasma is one of the most complex forms of matter in the universe. It simultaneously involves five complete branches: electromagnetism, magnetohydrodynamics, statistical mechanics, atomic physics, and nuclear physics. Thus the true predicament of fusion researchers is not "not understanding fusion," but rather **an inadequately laid foundation in physics**. If, after reading all the foundational texts recommended in this article, you still cannot derive the dispersion relation of Alfvén waves from Maxwell's equations within half an hour, you should not enter this field. You should go back and retake electrodynamics.

The following three books must be read in their entirety during the first year of graduate study.

**Required Reading 1: J. D. Jackson, *Classical Electrodynamics*, 3rd ed., Wiley, 1999.**

This is the common language of all plasma physics. When reading MHD, every equation speaks the language of Jackson. You need not complete all the exercises, but Chapter 5 (Magnetostatics), Chapter 7 (Electromagnetic Waves), Chapter 8 (Waveguides and Resonant Cavities), and Chapter 10 (Scattering and Diffraction) must be read page by page.

**Required Reading 2: L. D. Landau & E. M. Lifshitz, *Fluid Mechanics*, 2nd ed., Pergamon, 1987.**

The macroscopic description of plasma is magnetohydrodynamics, and MHD is fluid mechanics plus the Lorentz force. Without understanding the Navier-Stokes equation, it is impossible to understand MHD. Focus: Chapters 1–3, particularly the section on the Reynolds number in Chapter 2—you will see its shadow repeatedly in tokamak turbulent transport.

**Required Reading 3: L. D. Landau & E. M. Lifshitz, *Statistical Physics, Part 1*, 3rd ed., Pergamon, 1980.**

The kinetic description of plasma originates from statistical mechanics. The roots of the Boltzmann equation and the Vlasov equation are all in this book. You must understand the fundamental structure of Chapter 4 (Ideal Gases) and Chapter 7 (Non-Equilibrium States).

### 1.2 The Nuclear Physics Entry Point: The Foundations of Fusion Reactions

**Required Reading 4: G. Gamow & E. Teller, "The Rate of Selective Thermonuclear Reactions," *Physical Review*, vol. 53, pp. 608–609, 1938.**

This two-page paper is the true origin of your entry into the field of fusion. Gamow and Teller applied the quantum mechanical tunneling effect to nuclear reaction cross sections and derived the famous Gamow window theory: in a thermonuclear plasma, only collisions within a narrow energy interval actually produce fusion reactions. This paper is the admission ticket you must understand before entering plasma physics.

**Supplementary Reading 5: C. M. Braams & P. E. Stott, *Nuclear Fusion: Half a Century of Magnetic Confinement Fusion Research*, IOP Publishing, 2002.**

This is not a technical text but a historical narrative of fusion research. It is important because you need to know the historical depth of the subject you are inheriting. After reading it you will know: why the tokamak emerged from a classified Soviet laboratory; why the United States initially did not believe in it and later fully pivoted to tokamaks; why ITER was delayed for twenty years.

## Chapter Two: Entry Level—First Principles of Plasma and Fusion Energy

### 2.1 Your Core Texts

The following five books constitute your core curriculum. They are arranged in reading order, and the fatal weakness of each book is noted—no single book is perfect; you must cross-read.

**Required Reading 1: F. F. Chen, *Introduction to Plasma Physics and Controlled Fusion*, 3rd ed., Springer, 2016.**

This is the first plasma physics textbook I recommend. Chen's strength is his extraordinary clarity and engineering intuition; every chapter lets you "feel" what the plasma is doing. From Chapter 1's fundamental definitions of plasma (Debye shielding, plasma frequency), through single-particle motion, magnetohydrodynamics, waves and instabilities, and finally to the fundamentals of fusion, the book's structure is impeccable. Can be read alongside Li Zheng's Chinese textbook for comparison.

**Required Reading 2: Li Zheng, *Plasma Physics and Fusion Energy*, Science Press, 2010.**

For native Chinese speakers, Li Zheng's text is more direct. If you do not understand a section in Chen, turn to the corresponding chapter in Li Zheng; and vice versa.

**Required Reading 3: John Wesson et al., *Tokamaks*, 4th ed., Oxford University Press, 2011.**

The *Bible* of tokamaks. 1,300 pages, not a single wasted sentence. This book comprehensively covers measurement methods and technological frontiers for high-temperature plasma physical parameters, beginning from fusion energy principles and tokamak device fundamentals and delving into magnetic measurements, microwave diagnostics, active spectroscopy, laser scattering, laser interferometry, radiation diagnostics, and fusion product measurement techniques, with a particular focus on the multi-dimensional diagnostic system of ITER and its integrated application in device operation and control. This should be the primary work for your intensive reading during the second year of graduate study.

**Required Reading 4: J. W. Connor & H. R. Wilson, "Survey of Theories of Anomalous Transport," *Plasma Physics and Controlled Fusion*, vol. 36, pp. 719–795, 1994.**

This 77-page review is your key to entering transport theory. Connor and Wilson systematically compare all known transport models—from simple empirical scaling laws to complex gyrokinetic simulations—starting from first principles. After reading this, when you encounter the term "turbulent transport," you will not be reciting a definition, but genuinely knowing what you are dealing with.

**Required Reading 5: P. C. Stangeby, *The Plasma Boundary of Magnetic Fusion Devices*, IOP Publishing, 2000.**

This book discusses the interaction between plasma and material surfaces—one of the greatest bottlenecks for commercial fusion. From physical sputtering to chemical erosion, from tritium retention to dust formation, Stangeby is the encyclopedia of boundary plasma physics. If you want to make a real contribution to commercial fusion, you must digest this book.

### 2.2 Two Foundational Papers—The Lawson Criterion and Power Balance

There are two papers that you must read in full, regardless of your specific direction. Not because they are "classics," but because they define the number you chase every day in the lab.

**Required Paper 1: J. D. Lawson, "Some Criteria for a Power Producing Thermonuclear Reactor," *Proceedings of the Physical Society, Section B*, vol. 70, no. 1, pp. 6–10, 1957.**

This paper is only five pages long. Starting from energy balance, Lawson asked an extraordinarily plain question: for a fusion reactor to produce net power output, what relationship must the plasma temperature, density, and energy confinement time satisfy? The answer is the famous Lawson criterion: for D-T reactions, the `nTτ_E` product must exceed `3×10^21 m^{-3}·keV·s`. If you can only read three fusion papers, this is the first.

**Required Paper 2: R. W. Conn & J. Kesner, "Space-Dependent Effects on the Lawson Criterion and the Ignition Condition," *Nuclear Fusion*, vol. 16, pp. 397–408, 1976.**

This paper extends the Lawson criterion from zero dimensions to one dimension. Key finding: peaked density and temperature profiles can significantly lower the ignition condition, potentially increasing the fusion power density by several times. The lesson: do not merely memorize the criterion value; understand the profile effects behind it.

## Chapter Three: Professional Core—The Five Pillars of Tokamak Physics

If you have completed the foundational readings of Chapter Two, you are now ready to enter the core of the field. Tokamak physics has five technical pillars; missing any one renders the edifice unstable.

### 3.1 Plasma Equilibrium: The Grad-Shafranov Equation

In a tokamak, the plasma is confined within a toroidal vacuum vessel by a strong toroidal magnetic field. Its macroscopic equilibrium is described by the Grad-Shafranov equation—a nonlinear elliptic partial differential equation whose solution determines the plasma's shape, position, and overall stability.

**Required Paper 3: V. D. Shafranov, "On Magnetohydrodynamical Equilibrium Configurations," *Soviet Physics JETP*, vol. 6, pp. 545–554, 1958.**

This is a paper you must derive by hand. In your notebook, begin from the MHD momentum equation, impose axisymmetry, introduce the poloidal magnetic flux function ψ, obtain the Grad-Shafranov equation, and then explain the physical meaning of each term. This is the initiation rite for becoming a fusion researcher.

### 3.2 Confinement and Transport: From Neoclassical to Turbulence

**Required Paper 4: F. L. Hinton & R. D. Hazeltine, "Theory of Plasma Transport in Toroidal Confinement Systems," *Reviews of Modern Physics*, vol. 48, pp. 239–308, 1976.**

This 70-page review is the high wall you must scale to enter transport theory. Hinton and Hazeltine systematically develop neoclassical transport theory—transport mechanisms caused by the combined effects of Coulomb collisions and toroidal geometry that cannot be described by simple diffusion equations. You need to spend at least two weeks reading this intensively, taking notes on every section.

**Required Reading 5: E. J. Doyle et al., "Chapter 2: Plasma Confinement and Transport," *Nuclear Fusion*, vol. 47, pp. S18–S127, 2007.**

This is part of the ITER Physics Basis and represents humanity's highest understanding of tokamak confinement physics as of 2007. Doyle et al. systematically review the discovery of the H-mode, the formation mechanism of the edge transport barrier, multiple empirical scaling laws (the IPB98(y,2) scaling law is foundational), and the transition relationships between various confinement modes (H-mode, I-mode, super H-mode). This is the core text you must read sentence by sentence during your graduate studies—there is no substitute.

### 3.3 MHD Stability: The Physics of Disruptions

**Required Paper 6: T. C. Hender et al., "Chapter 3: MHD Stability, Operational Limits and Disruptions," *Nuclear Fusion*, vol. 47, pp. S128–S202, 2007.**

Another chapter from the ITER Physics Basis. Hender systematically introduces all known MHD instabilities in tokamaks: internal modes, external modes, neoclassical tearing modes, resistive wall modes, edge-localized modes (ELMs), and the most lethal of all—plasma major disruptions.

You must understand: where the Troyon limit (`β_N ≤ 3.5`) comes from; the experimental basis of the Greenwald density limit (`n_G = I_p/πa^2`); and why ELMs are an unavoidable cost in H-mode operation. Grasping these, you will understand why, in AI control, these limits must be embedded as rigid constraints that cannot be learned—the price of violating them is not reduced accuracy, but destruction of the device.

### 3.4 Instability Simulation and Prediction

After reading Hender's review, you need to master the technical landscape of modern MHD simulation and understand how researchers use nonlinear MHD codes (such as JOREK) to simulate transient events in tokamaks. Recent progress in the JOREK code has enabled full-scale simulation of vertical displacement events, shattered pellet injection, and runaway electron beam termination.

### 3.5 Heating and Current Drive

**Required Reading 7: N. J. Fisch, "Theory of Current Drive in Plasmas," *Reviews of Modern Physics*, vol. 59, pp. 175–234, 1987.**

Fisch established the complete theoretical framework for current drive: from radio-frequency wave current drive (including lower hybrid current drive and electron cyclotron current drive) to non-inductive current drive via neutral beam injection. You must understand why the bootstrap current is the lifeline of steady-state tokamaks—it is driven by the pressure gradient and requires no external input.

### 3.6 Diagnostics: Measuring Plasma Parameters

**Required Reading 8: ITER Physics Expert Group on Diagnostics, "Chapter 7: Measurement of Plasma Parameters," *Nuclear Fusion*, vol. 39, pp. 2541–2607, 1999.**

This 66-page text systematically introduces ITER's complete diagnostic system. You need to understand the measurement principle, spatial resolution, temporal response, and measurement error of each diagnostic method. This monograph comprehensively covers measurement methods and technological frontiers for high-temperature plasma physical parameters, delving into magnetic measurements, microwave diagnostics, active spectroscopy, laser scattering, and other core techniques.

## Chapter Four: Frontiers—Breakthroughs and Latest Progress, 2025–2026

**Important Note**: The fusion field is evolving at an extraordinarily rapid pace. As of 2026, the following advances must be part of your knowledge base.

### 4.1 Confinement and Transport: The Formation Mechanism of Internal Transport Barriers

**Required Paper 9: T. Wu, S. Wang et al., "Effects of Geometric Curvature and Weak Magnetic Shear on the Ion-Temperature Gradient Instability Near the Magnetic Axis in a Tokamak," *Physical Review Letters*, vol. 136, 015102, 2026.**

A research team from the University of Science and Technology of China, using their independently developed five-dimensional phase-space nonlinear gyrokinetic massively parallel simulation code NLT, for the first time revealed the key regulatory mechanism of geometric curvature effects and weak magnetic shear acting in concert on ion-temperature gradient (ITG) instability near the magnetic axis of a tokamak. The study is the first to elucidate the formation principle of the core weak magnetic shear internal transport barrier, finding that the average radial electric field potential well near the magnetic axis can significantly raise the critical temperature instability gradient of ITG modes only in a weak magnetic shear configuration. The reviewer praised it as "revealing a new mechanism for suppressing ITG mode turbulence near the magnetic axis." This means we now have precise theoretical tools for regulating internal transport barriers—a critical technical reserve for both the successful operation of ITER and the steady-state design of future fusion power plants.

### 4.2 Energetic Particle Physics: The Unique Challenges of Burning Plasmas

**Required Paper 10: Ph. Lauber et al., "Chapter 7: Energetic Particle Physics," *Nuclear Fusion*, 2024.**

This is the latest update to the ITER Physics Basis, specifically addressing energetic particle physics—the behavior of the 3.5 MeV α particles produced by fusion reactions within the plasma. Because their velocity far exceeds the Alfvén velocity, α particles can excite various Alfvén eigenmodes (TAE, EAE, KTA, etc.), which resonantly enhance particle losses and may cause the plasma to extinguish. This is a required course for understanding burning plasmas.

### 4.3 ELM Control: From H-Mode Stability to ELM Suppression

The control of edge-localized modes (ELMs) is one of the critical challenges for the successful operation of ITER. Recent advances in instability theory indicate that integrated simulation frameworks based on MHD, gyrokinetics, and neoclassical transport can now conduct meaningful experimental validation of ELM triggering mechanisms, control techniques, and H-mode pedestal transport, successfully predicting experimental behavior in multiple devices (EAST, KSTAR, AUG, JT-60SA). Humanity is acquiring the theoretical capacity to predict and control ELMs—which is critically important for the safe operation of future fusion power plants.

## Chapter Five: Engineering Physics—From Plasma to Power Plant

### 5.1 Fusion Reactor Design: CFETR and DEMO

China's CFETR (China Fusion Engineering Test Reactor) is currently one of the world's most advanced fusion reactor designs. CFETR aims to bridge the technological gap between ITER and future fusion demonstration reactors (DEMO). Its primary scientific objectives are to achieve fusion power of 200 MW in Phase I and 1 GW in Phase II, demonstrate steady-state operation of a fusion reactor (duty factor 0.3–0.5), and achieve tritium fuel self-sufficiency (tritium breeding ratio TBR > 1.0).

As of 2025, the engineering design of CFETR has been completed, with integrated solutions based on 13 thematic groups covering core-edge integration, shape optimization and waveform design, disruption prediction and control, divertor design, pedestal optimization, first-wall heat flux and particle flux assessment, MHD stability analysis, burning plasma physics, tritium cycle, and other core topics. Meanwhile, a new CFEDR (China Fusion Engineering Demonstration Reactor) design was released in 2025, with a major radius of 7.8 m, minor radius of 2.5 m, toroidal field of 6.3 T, aiming to achieve fusion power plant-level fusion power (1.5–3 GW), fusion gain Q = 15–30, net electrical power output, and steady-state burning plasma operation.

**Required Paper 11**: R. Ding, V. S. Chan, J. Li et al., "Integrated Physics Design of Conventional H-mode Scenario for China Fusion Engineering Demo Reactor," *Plasma Science and Technology*, vol. 27, no. 10, 100101, 2025. This paper provides a systematic exposition of the complete design of CFEDR.

At the same time, it is essential to understand China's engineering progress in fusion reactor tritium plant systems, including hundred-curie-level in-pile tritium production and in-situ extraction demonstration experiments conducted at CMRR, as well as 1:1-scale tritium extraction and hydrogen isotope separation demonstration experiments achieved in breeding blankets.

### 5.2 Materials: The Engineering Bottleneck of Fusion Energy

The first-wall materials of a fusion reactor must withstand sustained bombardment by 14.1 MeV fusion neutrons, which causes cascade collisions inside the material, generating large numbers of point defects, dislocation loops, and voids, leading to material embrittlement, swelling, and creep. Neither existing fission reactors nor spallation neutron sources can fully reproduce these damage conditions.

To address this, the International Fusion Materials Irradiation Facility (IFMIF) is under construction. IFMIF will generate a 14 MeV neutron flux through deuterium-lithium stripping reactions to experimentally validate the mechanical property degradation data of candidate structural materials—particularly reduced activation ferritic/martensitic (RAFM) steels—under fusion neutron irradiation. China's independently developed CLAM (China Low Activation Martensitic) steel has entered the irradiation qualification phase.

### 5.3 Inertial Confinement Fusion: When Lasers Ignite Starlight

Magnetic confinement is not the only path. Since Nuckolls proposed the laser implosion scheme in *Nature* in 1972, inertial confinement fusion (ICF) has carved out an entirely different route: using high-energy drivers to compress millimeter-scale capsules to ultra-high density and temperature on nanosecond timescales, achieving ignition at the capsule center.

**Required Paper 12: R. Betti & O. A. Hurricane, "Inertial-Confinement Fusion with Lasers," *Nature Physics*, vol. 12, pp. 435–448, 2016.**

This review outlines the full technological landscape of inertial confinement fusion from NIF to fast ignition, explaining why indirect drive is so difficult in engineering terms.

## Chapter Six: New Paradigms and Databases—Revolutionary Directions That Must Not Be Ignored

I have said before: **"Self-play is not the endpoint; learning to organize is."** By the same token, physical intuition and manual analysis are not the endpoint of fusion research either.

### 6.1 Why Fusion Needs AI

Traditional tokamak physics research relies on physicists using simplified analytical theories (such as the Grad-Shafranov equation) and semi-empirical scaling laws (such as IPB98(y,2)) to predict plasma behavior. But these methods have limited precision and cannot handle highly nonlinear multi-physics coupling.

The core idea of AI for Fusion is: to use deep learning to build predictive models of plasma states for real-time feedback control, and to predict the future performance of burning plasmas in ITER and next-generation fusion test devices at lower computational cost through first-principles-based simplified integrated physics modeling. In 2022, DeepMind successfully used deep reinforcement learning to control the plasma shape of the TCV tokamak—a major milestone for AI-controlled fusion devices.

**If you are a PhD student in this field, you must at minimum be familiar with the following databases:**
- ITER IMAS (Integrated Modelling & Analysis Suite)
- JT-60SA Experimental Database
- NIF Experimental Database
- EXFOR Nuclear Reaction Cross Section Database
- OPEN-ADAS Atomic Data and Plasma Radiation Database
- DIII-D National Fusion Program Database
- JET (Joint European Torus) Data Warehouse—the first device in human history to achieve D-T fusion power output
- CFETR Integrated Design Database
- PHTS (Plasma Heating and Technology Systems)
- UKAEA STEP Open Data—open research data from the UK Atomic Energy Authority's spherical tokamak fusion prototype reactor

### 6.2 The Paradigm Revolution of Spherical Tokamaks and High-Temperature Superconductors

From a plasma physics perspective, the core advantage of the spherical tokamak (ST) is its extremely high β value (the ratio of plasma pressure to magnetic pressure). Conventional tokamaks are constrained by the Troyon limit, with β_N typically not exceeding 3.5. Spherical tori (aspect ratio < 2) can push the beta limit higher, meaning that for the same magnetic field, higher fusion power density can be achieved.

However, the compact geometry of the spherical torus severely constrains the central solenoid space, making traditional inductive current drive schemes extremely difficult to sustain in STs for long-pulse operation. This is precisely where high-temperature superconducting magnets provide their advantage—smaller size, lower power consumption, and stronger magnetic fields, a combination that could fundamentally transform the economics of fusion power plants.

## Chapter Seven: The Working Language and Soft Equipment of the Fusion Community

In the field of fusion, English is the absolute working language. The following core terminology and databases must not only be understood from reading the literature but also committed to memory:

turbulent transport, disruption prediction, divertor detachment, Tritium Breeding Ratio / TBR, RAFM (reduced activation ferritic/martensitic steel), ELM control, integrated modeling, GAM (geodesic acoustic mode), zonal flows, H-mode pedestal.

Codes such as OpenADAS, HELIOS, CRONOS, ASTRA, ONETWO, TRANSP, and JINTRAC are the daily tools of the fusion community for transport simulation and integrated modeling.

**In terms of soft equipment, you must at minimum be able to use the following tools:**
- **JOREK**: Nonlinear MHD simulation code
- **NLT**: China's independently developed five-dimensional phase-space nonlinear gyrokinetic code
- **TEQ**: Tokamak equilibrium configuration design code
- **Python scientific computing stack** (NumPy, SciPy, Matplotlib)
- **EFIT**: Plasma magnetohydrodynamic equilibrium reconstruction code
- **SOLPS-ITER**: Scrape-off layer plasma simulation code
- **TRANSX**: Neutron transport cross section processing code

### 7.1 Academic Contribution: How to Define Your Research Problem

Making a contribution in the field of commercial fusion means you must find a genuinely existing problem and solve it with rigorous scientific methods. The following are several directions that urgently await breakthroughs:

- **Quantitative prediction of H-mode pedestal physics**: There is still no fully first-principles model that can precisely predict pedestal width and height
- **Active suppression of ELMs**: Optimization of RMP coil control parameters is a multi-dimensional search problem
- **Divertor heat load control**: How to reduce heat flux to engineering-acceptable levels while maintaining high confinement
- **Disruption prediction**: Using machine learning and multi-diagnostic signal fusion to achieve >95% accuracy with an extremely low false alarm rate
- **Burning plasma self-organization**: The nonlinear coupling among α-particle self-heating, bootstrap current, and turbulent transport

## Chapter Eight: Conclusion and Reading Blueprint

### 8.1 The Turning Point from Student to Builder

Below is an 18-month reading blueprint divided into four phases:

**Phase 1: Physics Foundations (Months 1–3)**
- Jackson, *Classical Electrodynamics*
- Chen, *Introduction to Plasma Physics*
- Landau, *Fluid Mechanics* (focus on Chapters 1–3)
- Gamow & Teller (1938)
- Lawson (1957)

**Phase 2: Tokamak Core (Months 4–8)**
- Wesson, *Tokamaks* (intensive reading of the entire book)
- Connor & Wilson (1994) transport theory review
- Stangeby, *Plasma Boundary*
- Shafranov (1958) G-S equation
- Hender et al. (2007) MHD stability
- Doyle et al. (2007) confinement physics

**Phase 3: Frontier Topics (Months 9–14)**
- Betti & Hurricane (2016) ICF review
- CFEDR integrated physics design (Ding et al., 2025)
- Advances in China's fusion reactor tritium breeding technology
- Remaining chapters of the ITER Physics Basis
- Latest published papers on ELM control, runaway electrons, and disruption prediction

**Phase 4: Research Practice (Months 15–18)**
- Independently run large-scale simulation codes (JOREK, NLT, SOLPS-ITER, etc.)
- Analyze experimental data from at least one device
- Complete a publishable research paper

### 8.2 An Independent Discourse for Chinese Researchers

Chinese fusion researchers must establish their own academic discursive authority.

The specific method is: read more original research papers published by Chinese scholars—especially firsthand data generated on EAST, HL-2A/HL-3, and CFETR. For example: the 2026 *Physical Review Letters* publication from the USTC team on the regulation of ion-temperature gradient instability; the chapters of the ITER Physics Basis led by Chinese scholars; and the comprehensive argument for the "compact fusion reactor" pathway in the CFEDR integrated physics design paper.

What you must achieve is this: when international peers discuss CFETR and CFEDR, the first paper that comes to mind is yours.

### 8.3 Closing Words

I have mentored many students. Those who have gone the distance in fusion are never merely clever—they possess a peculiar kind of patience. They are willing to spend three years devouring a book that others abandon after half a year, willing to derive a paper ten times through until the middle of the night, willing to stand guard at a device for months just for a single clean H-mode discharge.

When these texts have been digested and reshaped into your mode of thinking, when you look back at your own research topic, you will no longer see a fog but a clear, navigable map. You will know where your work sits on this map, and know that each step forward fills which hole and crosses which pass.

The commercialization of fusion will most likely not be seen by your generation. But the academic foundation of commercial fusion—that will most likely be built by your generation.

The fire of fusion has not yet been kindled. But the literature has already prepared the flint for you.

The fire is now in your hands.

---

*Liang Zhi, May 2026, Guangzhou*

*This article is written based on publicly available academic literature in the field of fusion physics. All data cited originates from published papers and official databases.*
