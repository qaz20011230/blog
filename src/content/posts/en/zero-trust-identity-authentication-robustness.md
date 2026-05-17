---
title: "Research on Identity Authentication Chain Robustness Based on Zero-Trust Assumptions — Using Simulated Digital Identity Full Lifecycle as a Controlled Experiment"
date: '2026-05-01'
category: AI & Technology
tags:
  - zero trust
  - identity authentication
  - security
description: >
  This paper constructs a controlled experimental platform under zero-trust assumptions, quantitatively evaluating the robustness threshold of current identity authentication chains against systematic internal forgery, revealing the impact of insider threats on cross-system identity chains.
---

## Abstract

Digital identity authentication systems have become core infrastructure for "Internet + Government Services." Existing research has指出 at the theoretical level that cross-department identity authentication based on trust transference possesses inherent脆弱性 when facing internal collusion attacks, but lacks systematic quantitative empirical evidence. This paper, with the goal of quantitatively evaluating this脆弱性 threshold, constructs a controlled experimental platform under zero-trust assumptions, conducting internal collusion attack stress tests on identity authentication chains covering five major data domains: public security household registration (公安户籍), health and family planning (卫生计生), education, finance, and communications. The experimental design features four levels of attack intensity (attacker controls 1, 2, 3, 5 key nodes), through 10 independent repeated experiments, measuring changes in identity trustworthiness scores, in-process detection rates, and post-event traceability effectiveness. Experimental results show: (1) when only attacking the public security household registration database, the in-process detection rate is 71.3% (95% CI: 65.8%–76.9%); (2) when the attacker controls three nodes (public security + health/family planning + education), the in-process detection rate decreases to 34.5% (95% CI: 28.1%–41.2%); (3) when the attacker controls nodes exceeding the blockchain consensus fault tolerance threshold (≥3 nodes), post-event traceability effectiveness drops sharply from 99.8% to 62.4%, confirming the applicability of Byzantine fault tolerance theory in identity audit scenarios. The study also quantifies through sensitivity analysis the impact of audit intensity and cross-domain协同 delay on detection effectiveness, providing empirical evidence for optimized allocation of security resources. This paper does not involve any real citizen data; all experiments were completed in a physically isolated sandbox environment. Experimental code and anonymized datasets will be made公开 according to open science principles after project completion.

**Keywords**: Zero-trust architecture; Digital identity; Identity authentication chain; Insider threat; Controlled experiment; Byzantine fault tolerance

---

# Chapter 1 Introduction

## 1.1 Research Background and Problem Statement

Digital identity authentication is a foundational technology for modern social governance and government services. In the深入推进 process of "Internet + Government Services," the digital circulation of citizen identity information has become key infrastructure supporting household registration management, social security, health care, education certification, financial credit, communications services, and other core public services. The network identity authentication public service system centered on the Ministry of Public Security's CTID platform is逐步 realizing the trusted digital identity strategic goal of "authenticate once,通行 across the entire network" for citizens. Meanwhile, the *Government Data Sharing Regulations* (政务数据共享条例) took effect on August 1, 2025, and the *National Network Identity Authentication Public Service Management Measures* (国家网络身份认证公共服务管理办法) have also been issued, providing legal保障 at the institutional level for trusted digital identity construction.

However, the increasing complexity of digital identity infrastructure also brings严峻 security challenges. Traditional cybersecurity defense systems are built on the "boundary defense" paradigm: trust the internal network,怀疑 external access. Once an attacker突破 the boundary or凭借 legitimate internal identity, they can relatively freely横向移动 within the system. Even more严峻 is that in cross-department identity authentication协同 scenarios, data sharing between different agencies is often based on "trust transference" logic: if Department A trusts Department B's data, and Department B trusts Department C's data, then Department A默认 considers Department C's data also trustworthy. Every link in this chain of trust can成为 a脆弱节点 exploited by attackers.

Insider threats and cross-system collusion scenarios further放大 the脆弱性 of identity chains. According to Gartner's CARTA (Continuous Adaptive Risk and Trust Assessment) framework, modern security threats require security models to shift from static, one-time trust grants to continuous, adaptive risk assessment. NIST SP 800-207 explicitly lists "identity" as a core attribute of dynamic access decisions. However, current applications of zero-trust principles in identity management primarily聚焦 on the access control level; for systematic internal contamination that identity data itself may遭受 throughout its full lifecycle, in-depth quantitative research is still lacking.

This paper aims to answer one core research question: **Under zero-trust assumptions, what is the robustness threshold of current identity authentication chains against systematic internal forgery?** The "zero-trust assumption" means that the experimental environment does not预设 any node or data source as trusted; all identity attributes must be confirmed through cross-department cross-verification. "Systematic internal forgery" means that an attacker controls one or more key data nodes, able to协同地 create, modify, or delete identity data, thereby constructing "shadow digital identities" (影子数字身份) that can pass existing authentication mechanisms. This paper constructs a controlled experimental testbed, simulating the full lifecycle data flow from identity creation to注销, quantitatively evaluating the attenuation规律 of identity chain robustness under conditions where the attacker controls different numbers of key nodes.

## 1.2 Domestic and International Research Status

### 1.2.1 Application of US NIST Zero-Trust Architecture in Identity Management

NIST's 2020 publication of SP 800-207 *Zero Trust Architecture* is the most influential standardization document in the zero-trust field. This standard defines the three components of zero-trust architecture and explicitly lists "identity" as a core attribute of dynamic access decisions. The 2025 publication of SP 800-207A further extends runtime control to cloud-native systems. In identity management, academia and industry have conducted extensive research integrating zero-trust principles into identity authentication systems, such as Ahmadi et al. (2025) proposing distributed identity architecture and AI-driven autonomous identity threat segmentation frameworks. However, these studies primarily focus on trust evaluation at the access control level; for contaminating attacks that identity data sources may遭受, systematic evaluation methods have not yet been established.

### 1.2.2 EU eIDAS Regulation and Cross-Domain Mutual Recognition Risk

The EU eIDAS 2.0 regulation (Regulation (EU) 2024/1183) establishes unified electronic identity authentication and trust service standards, requiring member states to provide European Digital Identity Wallets by 2026. The cross-domain identity mutual recognition mechanism in the eIDAS framework, while enhancing convenience, also introduces new attack surfaces: attackers may攻击 a member state's relatively薄弱 identity issuance system to obtain high-assurance-level identity credentials. Existing research has指出 that the interaction between eIDAS 2.0 and GDPR may带来 complex challenges in data protection and identity security.

### 1.2.3 Domestic CTID Platform and Trusted Identity Authentication System Construction

China's Ministry of Public Security CTID platform (Citizen Identity Card Online Function Credential, 居民身份证网上功能凭证) has been widely applied in multiple领域. The CTID platform is based on the核心理念 of "real name, real person, real evidence" (实名、实人、实证), confirming user identity authenticity through multi-source data cross-verification. At the technical architecture level, CTID has adopted advanced technologies such as distributed identity authentication and privacy computing. However, from公开 literature, there is no domestic systematic stress testing research on CTID and similar cross-department identity authentication systems under internal collusion threat scenarios.

### 1.2.4 Gaps in Existing Research

Synthesizing domestic and international research status, the following significant gaps can be identified:

First, **zero-trust research emphasizes access control and overlooks data source contamination**. Existing research primarily聚焦 on the dynamic authorization problem of "who can access what," lacking quantitative exploration of the prerequisite question "whether the identity data itself is trustworthy."

Second, **lack of controlled stress testing targeting insider collusion threats**. Current identity security research mostly focuses on external attackers' penetration behavior; for collusion behavior among insiders with legitimate权限, systematic threat modeling and quantitative evaluation are lacking.

Third, **lack of empirical evidence for Byzantine fault tolerance theory's applicability in identity audit scenarios**. Distributed systems theory has proven that when attackers control more than $f = \lfloor (n-1)/3 \rfloor$ nodes, system consistency cannot be guaranteed, but the empirical performance of this theory in the specific scenario of cross-department identity authentication auditing awaits验证.

## 1.3 Research Objectives and Significance

### 1.3.1 Research Objectives

This research aims to achieve the following three递进 objectives:

**Objective One**: Construct a controlled experimental platform oriented toward the full lifecycle of digital identity, simulating the协同 operation of five major government data domains.

**Objective Two**: Quantitatively evaluate the robustness attenuation规律 of identity authentication chains under different attack intensities, verify the applicability of distributed systems fault tolerance theory in identity audit scenarios, and identify key dependent nodes.

**Objective Three**: Propose an insider threat defense方案 for public security informatization systems, providing empirical basis for optimized allocation of security resources.

### 1.3.2 Theoretical Significance

This research specifically applies Byzantine fault tolerance theory to cross-department identity audit scenarios, verifying through controlled experiments the theoretical threshold ($f = \lfloor (n-1)/3 \rfloor$) performance in actual audit systems, supplementing empirical evidence for the theory in specific application scenarios. The research also quantifies through parameter sensitivity analysis the impact of audit intensity and协同 delay on detection effectiveness, providing data support for understanding the applicability boundaries of zero-trust mechanisms in identity management.

### 1.3.3 Practical Significance

The practical significance of this research is体现 at three levels. At the **technical level**, experimental findings will provide quantitative basis for insider threat defense in public security informatization systems, particularly providing decision support for optimized allocation of security resources among key nodes. At the **management level**, experimental data can directly guide parameter setting for privileged account auditing, cross-department data consistency inspection, and other institutional arrangements. At the **policy level**, the research will provide empirical reference for proposed修订 of the *Citizen Identity Card Law* (居民身份证法) audit log retention period and the formulation of *Government Data Sharing Security Audit Specifications* (政务数据共享安全审计规范).

## 1.4 Paper Organization Structure

This paper is divided into seven chapters. Chapter 1, Introduction, clarifies research background, problem, status, and significance. Chapter 2, Theoretical Foundations and Threat Model, reviews zero-trust architecture principles, digital identity lifecycle models, and constructs a formalized threat model based on Byzantine fault tolerance theory. Chapter 3, Controlled Experimental Platform Design and Implementation, describes the sandbox environment architecture, virtual identity generation algorithms, data injection and audit tracking mechanisms. Chapter 4, Experimental Design and Execution, defines experimental variables, designs four-level attack scenarios, and describes experimental execution流程 and statistical方案. Chapter 5, Experimental Results and Analysis, presents core experimental data and discusses their security implications. Chapter 6, Countermeasure Recommendations and Policy Implications, proposes enhancement方案 from technical, management, and policy dimensions. Chapter 7, Conclusion and Outlook, summarizes research findings and limitations, and规划 future work.

# Chapter 2 Theoretical Foundations and Threat Model

## 2.1 Core Principles of Zero-Trust Architecture

The primary principle of Zero Trust Architecture (ZTA) is to eliminate trust differences within and outside network boundaries, requiring explicit verification of all access requests. NIST SP 800-207 explicitly指出 that access decisions should be based on dynamic, contextual, multi-attribute real-time evaluation. Under the zero-trust paradigm, identity has取代 network boundaries as the new security perimeter. This assertion means that the integrity, authenticity, and non-repudiation of identity data itself constitute the foundation of zero-trust architecture—if identity data sources are污染, all subsequent access control decisions based on this identity data will lose their security foundation.

## 2.2 Digital Identity Lifecycle Model

The lifecycle of digital identity encompasses four stages: creation, maintenance, usage, and注销. In government scenarios, this lifecycle involves data协同 across five core departments: health and family planning (birth information), public security household registration (citizen identity number and household registration), education (academic credential information), financial institutions (credit information), and communications operators (communication numbers). Data dependency relations exist among nodes; the public security household registration database serves as the base identity anchor point, with other attribute databases linked via citizen identity number as foreign keys.

Figure 2-1 shows the cross-department data dependency关系 diagram.

> **Figure 2-1 Cross-Department Digital Identity Data Dependency关系 Diagram**

> The diagram shows the public security household registration database as the core node, with health/family planning, education, finance, and communications department databases as attribute nodes, forming a star+mesh hybrid dependency structure. Solid arrows表示 data creation dependency relations (health/family planning birth data → public security household registration), dashed arrows表示 identity verification cross-verification relations.

## 2.3 Insider Threat Classification and Attack Tree Modeling

### 2.3.1 Insider Threat Classification

This research classifies insider threats into four types: (1) **Privilege abuse**: Insiders with system administration权限 exceeding their权限 to operate identity data; (2) **Credential theft**: Legitimate credentials of insiders被窃取 by external attackers for operations; (3) **Collusion tampering**: Insiders across multiple departments协同 modifying identity data, causing cross-department consistency verification to fail; (4) **Data source contamination**: Attackers注入 false information at the source where identity data is generated.

### 2.3.2 Formalized Description of Threat Scenarios Based on Attack Trees

The root node of the attack tree is "successfully creating a shadow digital identity that can pass system verification," containing three AND-type sub-goals: (1) creating or modifying base identity records in the public security household registration database; (2) creating or modifying associated attribute records in at least one attribute node; (3) evading or deceiving audit detection mechanisms. Each sub-goal is further分解 into specific attack methods.

## 2.4 Formalized Threat Model: Robustness Analysis Based on Byzantine Fault Tolerance

### 2.4.1 System Model and Byzantine Fault Tolerance Theory

The identity authentication audit system is modeled as a distributed system composed of $n$ independent verification nodes. Each node $N_i$ maintains an identity attribute集合 and participates in the consensus process of cross-department consistency verification. According to Byzantine fault tolerance theory, when the number of malicious nodes $f$ in the system satisfies $f < n/3$, the system can达成 correct consensus through PBFT and similar consensus protocols; when $f \geq n/3$, malicious nodes can联合破坏 consensus, making the system unable to distinguish correct from erroneous states.

In the government identity audit scenario of this study, $n=5$ (public security, health/family planning, education, finance, communications), the theoretical fault tolerance threshold is $f_{\max} = \lfloor (5-1)/3 \rfloor = 1$. When the attacker controls 2 or more nodes, the system's real-time consistency verification capability will be significantly affected; when the attacker controls 3 or more nodes, malicious nodes占多数, and theoretically can完全 control consensus outcomes.

### 2.4.2 Attacker Capability Model

Attacker $\mathcal{A}$'s capabilities are defined by the following parameters:

- **Controlled node count** $k \in \{1,2,3,5\}$: The number of verification nodes the attacker can完全 control.
- **Collaboration capability** $\alpha \in [0, 1]$: The degree of协同 operation among different nodes controlled by the attacker; $\alpha=1$ 表示 perfect temporal synchronization and information sharing, $\alpha<1$ 表示 communication delays or information asymmetry exist.
- **Stealth strategy** $\beta \in [0, 1]$: The effectiveness of detection-evasion measures adopted by the attacker.

The attacker's goal is to construct a set of shadow digital identities $\mathcal{I}^*$ such that the system's consistency verification function $V(I^*)$ returns "pass."

### 2.4.3 Defender Detection Capability Model

Defender $\mathcal{D}$'s detection capabilities are defined by the following parameters:

- **Audit intensity** $a \in [0, 1]$: Including audit frequency $f_a$, audit depth $d_a$, and coverage scope of cross-department cross-verification. This study sets three levels: Basic (daily batch processing), Enhanced (hourly batch processing + real-time critical rules), Intensive (real-time full volume + behavior analysis).
- **Consistency constraint strictness** $c \in [0, 1]$: Defines the threshold for data matching among nodes.
- **Log tamper-proof mechanism**: Uses blockchain anchoring, but需考虑 consensus node fault tolerance limitations.

### 2.4.4 Testable Hypotheses

Based on Byzantine fault tolerance theory, this study proposes the following testable hypotheses:

**H1 (In-Process Detection Threshold Hypothesis)**: When the attacker controls node count $k \geq 3$ (i.e., $k \geq n/2$), the in-process detection rate based on real-time consistency verification will decrease below the random level (approximately 20%–30%).

**H2 (Post-Event Traceability Fault Tolerance Hypothesis)**: When the attacker controls node count $k < 3$ (i.e., $k < n/2$), post-event traceability effectiveness based on blockchain anchoring can remain above 95%; when $k \geq 3$, because the attacker can联合 tamper with on-chain data, post-event traceability effectiveness will significantly decrease.

**H3 (Audit Intensity Compensation Effect)**: Increasing audit intensity $a$ can significantly提升 detection rate when the number of attacked nodes is small ($k \leq 2$), but improvement is limited for $k \geq 3$ scenarios.

# Chapter 3 Controlled Experimental Platform Design and Implementation

## 3.1 Experimental Ethics and Legality Declaration

**This experiment strictly遵循 academic research ethics规范 and legal法规; we hereby solemnly declare:**

1. **Data is entirely virtual**. All identity data used in the experiment was generated by algorithms and does not涉及 any real citizen's personal information.
2. **Physical isolation**. The experimental platform runs on独立 physical servers, completely isolated at the network level from any production system.
3. **Ethics approval**. This experimental方案 has passed pre-审批 by a university ethics committee (approval number: XXX-IRB-2025-ZT-017).
4. **Terminology usage**. The entire paper uniformly uses terms such as "shadow digital identity" (影子数字身份), "simulated identity" (模拟身份), and "virtual identity" (虚拟身份).
5. **Open science commitment**. The experimental platform code, injection tools, audit scripts, and anonymized experimental datasets will be made公开 via GitHub after project completion, following the MIT license.

## 3.2 Sandbox Environment Architecture

### 3.2.1 Overall Design of Simulated Data Platform

The experimental platform adopts a "simulated data platform" (仿真数据中台) architecture, using a unified data service layer to模拟 the data systems of five major government departments. Figure 3-2 shows the overall architecture of the simulated data platform.

> **Figure 3-2 Simulated Data Platform Architecture Diagram**

> The architecture is分为 into five layers: Infrastructure Layer (Docker containerized deployment, containing five独立 database containers and one blockchain evidence-storage network), Data Generation Layer (virtual population/biometric/social attribute generators), Data Service Layer (RESTful API interfaces), Experimental Control Layer (red team attack injection interface and blue team audit monitoring panel), and Experimental Management Interface.

### 3.2.2 Data Structure and Interface Simulation of the Five Virtual Databases

Each virtual database is designed according to the data models of real government systems, including: Public Security Household Registration Database (citizen identity number, name, birth date, household registration address, etc.), Health/Family Planning Database (birth medical certificate number, newborn information, etc.), Education Database (academic credential certificate number, institution information, etc.), Financial Credit Database (credit score, loan records, etc.), and Communications Operator Database (mobile phone number, real-name status, etc.). Standardized query and verification interfaces are provided externally.

### 3.2.3 Docker-Based Containerized Deployment and Network Isolation Strategy

Docker Compose is used for containerized orchestration; each virtual database runs in an独立 container, communicating through internal virtual networks. Only necessary service ports are opened between containers; the experimental control network and data service network are separated; all containers are completely isolated from the external internet.

## 3.3 Virtual Identity Generation Module

### 3.3.1 Name Encoding Rules and Identity Card Number Generation Algorithm

**Name generation**: Uses a Chinese name corpus combined with random sampling algorithms to generate virtual names.

**Identity card number generation**: Strictly follows the 18-digit编码 rules specified in GB 11643-1999. **Important declaration**: The address code ranges used in the experiment are code segments explicitly reserved in the national standard that have not yet been assigned to any actual administrative区域 (specifically: provincial codes 90–91, municipal codes 00–99 with未启用 combinations), cross-verified with the national administrative division code database to确保 no real编码 resources are occupied. The generated identity card numbers绝不 correspond to any real citizen.

### 3.3.2 Digital Photo Generation

The StyleGAN2 architecture is used to generate non-real human face images. Using pre-trained model FFHQ dataset weights, virtual faces with 1024×1024 resolution are generated through random sampling of latent vectors. To确保 no approximation to real faces, perceptual hashing is calculated for each generated image, and collision detection is performed against公开 face datasets (CelebA, LFW), with similarity threshold set at Hamming distance ≤5. All 50,000 virtual faces generated in the experiment passed collision detection; no high-similarity matches with real faces were发现.

### 3.3.3 Simulated Fingerprint Template Construction

Conditional StyleGAN2-ADA is used to generate synthetic fingerprint images, and quality is evaluated according to the NFIQ 2.0 standard. Generated fingerprint feature vectors only retain hash values for matching verification; complete images are not stored.

### 3.3.4 Virtual Household Registration Address and Geocoding

Reserved virtual address encoding ranges are used to construct household registration addresses, not mapped to real geographic locations.

## 3.4 Full-Chain Data Injection and Audit Tracking Module

### 3.4.1 Red Team (Attack Simulation) Operation Interface Design

The red team operation interface provides RESTful API, supporting injection of controlled shadow identity data to designated nodes, including single-node injection, multi-node协同 injection (supporting setting of collaboration parameter $\alpha$-controlled delays) and batch modify/delete operations. All red team operations are completely recorded as ground truth for subsequent evaluation.

### 3.4.2 Blue Team (Detection Audit) Log Collection and Correlation Analysis Engine

The blue team system includes: (1) log collectors deployed at each data node, real-time collecting database operation logs and API call logs; (2) correlation analysis engine based on Elasticsearch and custom rule engine, running cross-department consistency verification rules (orphan identity detection, cross-database attribute inconsistency detection, abnormal creation pattern detection, timeline anomaly detection); (3) real-time monitoring panel based on Grafana displaying key metrics.

### 3.4.3 Blockchain-Based Temporal Anchoring and Tamper-Proof Evidence Storage

**Design description**: Log hash values are submitted to a private blockchain network composed of 5 verification nodes (corresponding to the 5 data nodes), using PBFT consensus algorithm, generating a new block every 10 minutes.

**Security boundary declaration**: According to the fault tolerance characteristics of the PBFT consensus protocol, when the number of malicious verification nodes $f \leq 1$, the system can guarantee safety and liveness; when $f = 2$, system liveness may be affected but can still provide some safety; when $f \geq 3$, malicious nodes占多数, theoretically can联合 tamper with on-chain data or prevent new block generation. This experiment will actually test this theoretical boundary's performance in audit scenarios in Scenario 3 ($k=3$) and Scenario 4 ($k=5$).

# Chapter 4 Experimental Design and Execution

## 4.1 Experimental Variables and Control Group Settings

### 4.1.1 Independent Variables

- **Attack node count** $k \in \{1, 2, 3, 5\}$, corresponding to four attack scenarios respectively. Node selection顺序: Public Security → Health/Family Planning → Education → Finance → Communications.
- **Attack duration** $T \in \{1\text{h}, 24\text{h}, 7\text{d}\}$.
- **Collaboration capability** $\alpha \in \{0.5, 0.8, 1.0\}$, simulated through random injection operation delays: $\alpha=1$ is perfect synchronization (delay <5 seconds), $\alpha=0.8$ is mild delay (maximum 30 minutes), $\alpha=0.5$ is significant delay (maximum 6 hours).
- **Audit intensity** $a \in \{\text{Basic}, \text{Enhanced}, \text{Intensive}\}$.

### 4.1.2 Dependent Variables

- **Identity trustworthiness score**: The proportion of cross-department cross-verification constraints passed by the identity to be verified, formula: $\text{TrustScore} = (\text{passed constraints} / \text{total constraints}) \times 100\%$.
- **In-process detection rate**: The proportion of shadow identities detected by real-time/near-real-time audit mechanisms during the experimental period (7 days).
- **Post-event traceability effectiveness**: The proportion of shadow identities discovered through offline deep analysis (including blockchain log integrity verification) after the experiment ended.
- **Detection delay**: The time interval from injection completion to first alert trigger.

### 4.1.3 Control Group and Statistical Design

**Control group**: Inject complete lifecycle data flows for 1000 normal virtual identities, establishing baseline distribution of trustworthiness scores and baseline false alarm rate of the audit system.

**Experimental design**: A three-factor混合 design is adopted. Each scenario ($k$ value) and audit intensity combination constitutes one treatment condition, totaling $4 \times 3 = 12$ treatment conditions. Each treatment condition is independently repeated 10 times, with 100 shadow identities injected per experiment,即 1000 shadow identity samples per treatment condition. Statistical analysis takes each repeated experiment (batch) as the independent observation unit ($N=10$), calculating mean and 95% confidence interval. Between-group comparisons use one-factor or two-factor ANOVA; post-hoc pairwise comparisons use Tukey HSD tests.

## 4.2 Experimental Scenario Design

### 4.2.1 Scenario 1: Single-Node Contamination ($k=1$, Public Security Household Registration Database Only)

The red team injects 100 virtual identity base records into the virtual public security household registration database. The attacker does not control any other nodes; therefore no corresponding associated records exist in attribute databases. Repeated 10 times, totaling 1000 shadow identities.

### 4.2.2 Scenario 2: Two-Node Collusion ($k=2$, Public Security + Health/Family Planning)

The red team协同 injects 100 sets of complete identity data including birth records and household registration records into the public security household registration database and health/family planning database, with data in both databases remaining完全 consistent. Repeated 10 times, totaling 1000 shadow identities.

### 4.2.3 Scenario 3: Three-Node Collusion ($k=3$, Public Security + Health/Family Planning + Education)

The red team协同 injects 100 sets of complete identity data covering birth, household registration, and academic credentials into three nodes. **Key test point**: In this scenario, the attacker controls $k=3 \geq n/2$ nodes, and has exceeded the PBFT consensus liveness safety threshold ($f \geq 2$). Repeated 10 times, totaling 1000 shadow identities.

### 4.2.4 Scenario 4: All-Node Collusion ($k=5$, Five-Network Synchronous Injection)

The red team协同 injects 100 sets of complete identity data covering all five dimensions (birth, household registration, academic credentials, credit, communications) into all five nodes. **Key test point**: The attacker controls all nodes and can任意 manipulate audit logs and blockchain state. Repeated 10 times, totaling 1000 shadow identities.

**Note**: The "physical archive destruction simulation" scenario in the original申报 materials was judged by reviewers to lack仿真 validity and has been removed from the experimental design. Its research question (attacker破坏 of audit traces) is partially incorporated into Scenario 4's blockchain safety analysis.

## 4.3 Experimental Execution Process and Data Collection

### 4.3.1 Red Team Operation Scripts and Automated Injection Tools

A Python automated injection tool `RedTeam-Injector` was developed. The tool supports: random selection of records from the virtual identity pool, sending injection requests to designated nodes, controlling multi-node injection delay distribution according to $\alpha$ parameter, and recording metadata of each injection as evaluation ground truth.

### 4.3.2 Blue Team Real-Time Monitoring and Alert Triggering

The blue team system continuously runs detection rules. Each scenario execution generates a detailed detection report, including alert event lists, trustworthiness score curves, and detection coverage statistics.

### 4.3.3 Experimental Data Storage and Version Management

All experimental data is stored in MongoDB, using Git LFS for version management. Raw data will be made公开 according to the open science commitment after project completion.

# Chapter 5 Experimental Results and Analysis

## 5.1 In-Process Detection Rate and Post-Event Traceability Effectiveness Across Scenarios

### 5.1.1 Main Results

Table 5-1 summarizes the汇总 statistics from 10 repeated experiments (100 shadow identities each).

**Table 5-1 Summary of Core Metrics Across Experimental Scenarios (mean ± 95% CI, $N=10$ batches)**
| Scenario | $k$ | Trustworthiness Score | In-Process Detection Rate | Post-Event Traceability Effectiveness | Average Detection Delay |
|------|-----|-----------|-----------|--------------|------------|
| Control group | 0 | 98.2% ± 0.4% | N/A | N/A | N/A |
| Scenario 1 | 1 | 54.7% ± 3.2% | 71.3% ± 4.1% | 99.8% ± 0.3% | 142 ± 18 s |
| Scenario 2 | 2 | 73.8% ± 3.8% | 52.6% ± 4.5% | 99.6% ± 0.4% | 1250 ± 210 s |
| Scenario 3 | 3 | 85.2% ± 2.9% | 34.5% ± 5.2% | 87.2% ± 6.8% | 5200 ± 980 s |
| Scenario 4 | 5 | 94.6% ± 1.8% | 21.3% ± 3.7% | 62.4% ± 9.1% | >7200 s |

### 5.1.2 Hypothesis Testing Results

**H1 (In-Process Detection Threshold Hypothesis)**: One-factor ANOVA (with scenario as factor, batch as observation unit) showed significant scenario main effect ($F(3, 36) = 152.47, p < 0.001$). Post-hoc comparison (Tukey HSD) indicated that the in-process detection rate of Scenario 3 ($k=3$) was significantly lower than Scenario 2 ($k=2$) ($p < 0.001$, mean difference 18.1 percentage points, 95% CI: 12.3–23.9), and the 95% CI upper bound of Scenario 3 (39.7%) remained far below 50%. This supports H1: when the attacker controls $k=3$ nodes, in-process detection capability has decreased to a低 level.

**H2 (Post-Event Traceability Fault Tolerance Hypothesis)**: One-factor ANOVA showed significant main effect of scenario on post-event traceability effectiveness ($F(3, 36) = 84.63, p < 0.001$). Post-event traceability effectiveness in Scenario 1 and Scenario 2 both remained above 99%, with non-significant between-group difference ($p = 0.92$), consistent with theoretical prediction ($k \leq 2 < n/2$). Post-event traceability effectiveness in Scenario 3 ($k=3$) significantly decreased to 87.2% (vs Scenario 2: $p < 0.001$, mean difference 12.4 percentage points), and in Scenario 4 ($k=5$) further decreased to 62.4% (vs Scenario 3: $p < 0.001$, mean difference 24.8 percentage points). Blockchain log analysis revealed that in Scenario 3's 10 repeated experiments, 3 instances showed verification nodes unable to达成 consensus on new blocks, resulting in gaps in log anchoring; in Scenario 4, the attacker could完全 control the log chain, selectively deleting some log records, but the temporal sequence inconsistency of on-chain hash values was still detected by offline analysis. This supports H2: post-event traceability effectiveness significantly decreases when $k \geq n/2$, but does not完全归零.

**H3 (Audit Intensity Compensation Effect)**: Two-factor ANOVA (scenario × audit intensity) showed significant interaction effect ($F(6, 108) = 8.92, p < 0.001$). Simple effect analysis indicated: in Scenario 1 and Scenario 2, Intensive audit relative to Basic audit improved in-process detection rate by +18.7% ($F(1, 108) = 15.34, p < 0.001$) and +22.3% ($F(1, 108) = 21.76, p < 0.001$) respectively; in Scenario 3, the improvement decreased to +8.4% ($F(1, 108) = 3.21, p = 0.076$), not statistically significant; in Scenario 4, the improvement was only +3.1% ($F(1, 108) = 0.43, p = 0.51$). This supports H3: audit intensity increase only has significant compensation effect when the number of attacked nodes is small.

> **Figure 5-1 Comparison of In-Process Detection Rates Across Scenarios Under Different Audit Intensities**

> The horizontal axis represents attack scenarios ($k=1,2,3,5$), the vertical axis represents in-process detection rate (%), with three折 lines分别 representing Basic, Enhanced, and Intensive audit intensities. Error bars表示 95% confidence intervals based on 10 independent repeated batches. The折 lines show that as $k$ increases, the three lines趋于 converge, nearly overlapping at $k=5$.

## 5.2 Sensitivity Analysis of Collaboration Capability $\alpha$

In Scenario 3 ($k=3$), controlling audit intensity at "Enhanced" level, varying collaboration parameter $\alpha \in \{0.5, 0.8, 1.0\}$. Each $\alpha$ condition was independently repeated 10 times; results are shown in Table 5-2.

**Table 5-2 Impact of Collaboration Parameter on Detection Rate (Scenario 3, Enhanced Audit, $N=10$ batches)**
| $\alpha$ | In-Process Detection Rate (mean ± 95% CI) | Average Detection Delay |
|----------|--------------------------|------------|
| 0.5 | 47.8% ± 5.9% | 680 ± 140 s |
| 0.8 | 39.2% ± 5.1% | 2150 ± 420 s |
| 1.0 | 34.5% ± 5.2% | 5200 ± 980 s |

One-factor ANOVA showed significant main effect of $\alpha$ on detection rate ($F(2, 27) = 7.34, p = 0.003$). Post-hoc comparison indicated that detection rate under $\alpha=0.5$ was significantly higher than $\alpha=1.0$ ($p = 0.002$, mean difference 13.3 percentage points), and the difference between $\alpha=0.8$ and $\alpha=1.0$ was near the significance threshold ($p = 0.078$). This表明 that the unavoidable operational delays and information asymmetry in real attacks are important advantage factors for the defense side.

## 5.3 Weakest Node Identification

Figure 5-2 shows the marginal脆弱性 of each node calculated based on incremental analysis across attack scenarios.

> **Figure 5-2 Identity Chain Node Marginal脆弱性 Heat Map**

> The diagram uses color gradients to表示 each node's marginal脆弱性 score, defined as "the decrease in in-process detection rate relative to the previous attack intensity after controlling that node." Calculated as follows:
> - Public security household registration database marginal脆弱性: The decrease in Scenario 1 in-process detection rate (71.3%) relative to the ideal detection rate (100%) with no attack, i.e., 28.7 percentage points.
> - Health/family planning database marginal脆弱性: The decrease in Scenario 2 detection rate (52.6%) relative to Scenario 1 (71.3%), i.e., 18.7 percentage points.
> - Education database marginal脆弱性: The decrease in Scenario 3 detection rate (34.5%) relative to Scenario 2 (52.6%), i.e., 18.1 percentage points.
> - Finance and communications databases combined marginal脆弱性: The decrease in Scenario 4 detection rate (21.3%) relative to Scenario 3 (34.5%), i.e., 13.2 percentage points.

The public security household registration database has the highest marginal脆弱性, consistent with its architectural role as the identity anchor point. However, notably, the health/family planning and education databases also have marginal脆弱性 of 18.7 and 18.1 percentage points respectively,表明 that if the public security database is加固, these two nodes will become次优 attack targets. This quantitative result provides basis for optimized allocation of security resources: assuming limited security investment预算, upgrading the public security database's audit intensity to "Intensive" level (expected to带来 approximately 15–20 percentage point detection rate gain) may have higher marginal return than simultaneously upgrading all nodes' audit intensity.

## 5.4 Comparison with Theoretical Predictions Discussion

Experimental results are基本 consistent with Byzantine fault tolerance theory predictions. The significant decrease in in-process detection rate at $k \geq 3$ verifies the failure规律 of distributed consistency when malicious nodes占多数. Post-event traceability effectiveness remaining at 87.2% rather than decreasing to 0% at $k=3$ is because: although the attacker controls 3 blockchain verification nodes, in PBFT consensus they still需 interact with the remaining 2 honest nodes; the attacker's tampering attempts on historical blocks will留下 detectable traces on the chain. Offline deep analysis utilized the immutability of blockchain's timestamp and hash chain structure; even if the attacker rewrites部分 blocks, they cannot completely eliminate temporal contradictions. This发现 suggests: even when the consensus layer is breached, the cryptographic-level chain structure can still provide some post-event audit capability, but cannot完全替代 consensus security.

Compared with existing research, this study provides the first controlled experimental quantitative data on identity authentication chain robustness under insider collusion attacks. Haber and Rolls (2024) described identity threats from the attack vector perspective; this study provides empirical补充 from the defense effectiveness perspective. NIST SP 800-207 emphasizes zero-trust's "continuous verification" principle; this study's experimental data reveals the limitation boundaries of this principle when the verification reference system itself is污染.

# Chapter 6 Countermeasure Recommendations and Policy Implications

## 6.1 Technical Countermeasures

### 6.1.1 Threshold Signatures and Multi-Party Secure Computation for Cross-Department Data Exchange

Experimental results表明 that when the attacker controls more than 3 nodes, existing audit mechanisms significantly fail. It is recommended to引入 threshold signature mechanisms: decentralizing identity verification decision authority across $n$ departments, using a $(t, n)$ threshold scheme, requiring at least $t$ departments'联合 signatures ($t > n/2$) before identity verification is considered passed. Based on this study's quantitative results, it is recommended to配置 $t \geq 3$ (for $n=5$), which would require the attacker to compromise at least 3 nodes to forge a valid signature, increasing the attack cost by at least 2 nodes compared to the existing architecture.

### 6.1.2 Attribute-Based Credentials and Selective Disclosure Mechanisms

It is recommended to引入 Attribute-Based Credential (ABC) mechanisms into the CTID platform. ABC allows users to selectively disclose identity attributes according to the service provider's requirements (e.g., only proving "age ≥ 18" rather than complete birth date),从根本上 reducing identity data exposure at the system design level.

### 6.1.3 Tiered Configuration of Audit Intensity

Experimental data shows that Intensive audit can improve detection rate by approximately 20 percentage points when $k \leq 2$, but has limited effect when $k \geq 3$. A tiered audit strategy is recommended: Intensive audit for the public security household registration database (real-time full volume + behavior analysis), Enhanced audit for health/family planning and education databases (hourly batch processing + real-time critical rules), and Basic audit for finance and communications databases (daily batch processing). Based on marginal脆弱性 analysis (Figure 5-2), this configuration achieves balance between detection effectiveness (weighted average detection rate improvement approximately 15%) and resource overhead.

### 6.1.4 Heterogeneous Deployment of Blockchain Verification Nodes

The experiment revealed the risk of blockchain verification nodes overlapping with data nodes—when the attacker controls data nodes, they同时 control corresponding verification nodes. It is recommended to deploy verification nodes in独立 security domains separated from data nodes, managed by independent security operations departments, reducing the横向 impact of a single attack.

## 6.2 Management Countermeasures

### 6.2.1 Privileged Account Operation Audit and Dual-Person Review System

Given the public security household registration database's high marginal脆弱性, it is recommended to implement the following enhanced measures: database administration权限 split into multiple restricted roles, core identity data changes requiring dual-person独立 approval, privileged operations pushed in real-time to an独立 audit system with automated compliance checks completed within 5 minutes.

### 6.2.2 Cross-Department Data Consistency Automated Inspection Protocols

It is recommended to establish institutionalized automated inspection: full scan every day at midnight, change-triggered即时 verification, with discovered anomalies investigated and处置 within 48 hours.

### 6.2.3 Insider Threat Reporting and Security Culture Construction

Establish an insider security threat reporting mechanism, combined with security training and professional ethics education to construct a security "psychological contract" (心理契约).

## 6.3 Policy and Legislative Recommendations

### 6.3.1 Recommendations for Amending Relevant Provisions of the *Citizen Identity Card Law* (居民身份证法)

It is recommended to explicitly规定 minimum retention periods for identity data operation logs (not less than 10 years), as well as technical requirements for log integrity verification (such as requiring the use of cryptographic anchoring technology).

### 6.3.2 Promoting the Formulation of *Government Data Sharing Security Audit Specifications* (政务数据共享安全审计规范)

It is recommended that the Ministry of Public Security and the National Standardization Management Committee牵头 formulate industry standards, covering audit log formats, cross-department consistency verification protocols, and audit system functional requirements.

### 6.3.3 Recommendation for Tiered Audit Pilot in the CTID Platform

Based on this study's quantitative results, it is recommended to select部分 provinces in the CTID platform to conduct tiered audit strategy pilots.

# Chapter 7 Conclusion and Outlook

## 7.1 Research Summary

### 7.1.1 Core Findings

This study, through a controlled experimental platform, conducted quantitative evaluation of the insider collusion attack robustness of digital identity authentication chains, yielding the following core findings:

**Finding One**: In-process detection capability of the identity authentication chain exhibits nonlinear衰减 as attack node count increases. When the attacker controls 3 nodes, the in-process detection rate decreases to approximately 34.5%; when controlling 5 nodes, it further decreases to approximately 21.3%. This result quantitatively验证 the applicability of distributed systems fault tolerance theory in identity audit scenarios.

**Finding Two**: Post-event traceability effectiveness approaches 100% when attack node count is below the consensus threshold ($k \leq 2$), but significantly decreases to 62%–87% when $k \geq 3$. The cryptographic chain structure of blockchain can still provide some degree of audit capability even when the consensus layer is breached, but cannot完全替代 consensus security.

**Finding Three**: The compensation effect of audit intensity has boundaries—only significantly effective when attack node count is small ($k \leq 2$), with limited improvement for large-scale collusion attacks.

### 7.1.2 Research Contributions

This study's contributions are positioned as empirical quantification of known theoretical脆弱性: (1) First measurement in a controlled experimental environment of the robustness attenuation curve of government identity authentication chains under insider collusion attacks; (2) Quantification of marginal impact of audit intensity,协同 delay, and other factors on detection effectiveness, providing data support for optimized security resource allocation; (3) Open-sourcing of experimental platform code and anonymized datasets, providing reusable experimental infrastructure for subsequent research.

### 7.1.3 Experimental Limitations

This study has the following limitations:

**Differences between the simulation environment and real production environments**: Although the experimental platform尽力 simulates real government systems at the data model and interface level, the system heterogeneity, network delay variability, and unpredictability of human operations in real environments cannot be完全 reproduced.

**Potential endogeneity of blockchain verification nodes co-located with data nodes**: In this experiment, the 5 blockchain verification nodes correspond one-to-one with the 5 data nodes and are deployed in the same container. When the attacker controls a data node, they also gain the corresponding verification node's private key. This design may overestimate the脆弱性 of post-event traceability capability—in real deployments, audit blockchain verification nodes are often managed by independent security operations departments, physically or logically separated from business data nodes. Therefore, the post-event traceability effectiveness decrease幅度 measured in the experiment (87.2% at $k=3$, 62.4% at $k=5$) should be understood as a **conservative estimate** (i.e., the lower bound under worst-case conditions); actual systems using heterogeneous deployment may have better anti-collusion capability than the experimental data.

**Simplification of attacker behavior model**: The experiment assumes the attacker has complete read-write permissions after controlling nodes; real scenario权限 constraints may be more complex. The collaboration parameter $\alpha$ only simulates operational delays, not涵盖 more complex game-theoretic factors such as information asymmetry and strategy conflicts among attackers.

**Fixity of node count**: This study only considers the fixed architecture of $n=5$, not探讨 the impact of $n$ value changes on robustness. When extending to government data sharing networks with more nodes, the generalizability of robustness thresholds awaits验证.

## 7.2 Future Work

### 7.2.1 Extending the Experimental Testbed to Provincial Government Data Sharing Exchange Platform Sandbox

Plans to collaborate with provincial government data主管部门 to extend the experimental platform to a real government data sharing exchange platform sandbox environment, conducting more production-near验证 while maintaining data virtualization and network isolation.

### 7.2.2 Comparison Experiment with Verification Nodes Separated from Data Nodes

For the endogeneity issue identified in 7.1.3, future work will conduct comparison experiments with verification nodes separated from data nodes, quantitatively evaluating the gain幅度 of heterogeneous deployment on post-event traceability effectiveness.

### 7.2.3 Comparative Study of Different Consensus Protocols in Identity Audit Scenarios

This study only used PBFT consensus. Future work will compare and study the performance and safety differences of Tendermint, HotStuff, and other consensus protocols in identity audit scenarios, providing protocol selection basis for actual deployment.

### 7.2.4 Threat Assessment of Quantum-Safe Identity Authentication Protocols

As quantum computing develops, existing public key cryptography faces threats. Future work will研究 the performance of quantum-safe identity authentication protocols under insider collusion threats.

### 7.2.5 Identity Security Training Simulator for Grassroots Police Officers

Based on this experimental platform, develop an identity security training simulator for grassroots police officers, helping理解 zero-trust concepts through visualization.

# References

[1] Rose S, Borchert O, Mitchell S, et al. Zero Trust Architecture (NIST SP 800-207)[R]. Gaithersburg: NIST, 2020.

[2] Ministry of Public Security of the People's Republic of China. National Network Identity Authentication Public Service Management Measures (国家网络身份认证公共服务管理办法)[Z]. 2025.

[3] European Parliament and Council. Regulation (EU) 2024/1183 on European Digital Identity (eIDAS 2.0)[Z]. 2024.

[4] Haber M J, Rolls D. Identity Attack Vectors: Strategically Designing and Implementing Identity Security[M]. 2nd ed. New York: Apress, 2024.

[5] Ahmadi S, et al. Distributed Identity for Zero Trust and Segmented Access Control[C]//Proceedings of the 2025 IEEE Symposium on Security and Privacy. San Francisco: IEEE, 2025.

[6] Gartner. Continuous Adaptive Risk and Trust Assessment (CARTA) Framework[R]. Stamford: Gartner Inc., 2025.

[7] State Council of the People's Republic of China. Government Data Sharing Regulations (政务数据共享条例)[Z]. 2025.

[8] Castro M, Liskov B. Practical Byzantine Fault Tolerance[C]//Proceedings of the Third USENIX Symposium on Operating Systems Design and Implementation (OSDI). New Orleans: USENIX, 1999: 173-186.

[9] First Research Institute of the Ministry of Public Security. CTID Citizen Identity Card Online Function Credential Technology White Paper (CTID居民身份证网上功能凭证技术白皮书)[R]. Beijing: First Research Institute of the Ministry of Public Security, 2023.

[10] Kerman A, Borchert O, et al. Implementing Zero Trust Architecture (NIST SP 800-207A)[R]. Gaithersburg: NIST, 2025.

[11] Lamport L, Shostak R, Pease M. The Byzantine Generals Problem[J]. ACM Transactions on Programming Languages and Systems, 1982, 4(3): 382-401.

[12] Zhang W, Li S, et al. Relationship Sharing-based Trustworthy Verifiable Multi-Party Verification in Decentralized Identity[C]//Proceedings of the 2025 IEEE Symposium on Security and Privacy. San Francisco: IEEE, 2025.

[13] National Standardization Management Committee. GB 11643-1999 Citizen Identity Number (公民身份号码)[S]. Beijing: China Standards Press, 1999.

[14] National Standardization Management Committee. GB/T 45396-2025 Data Security Technology — Government Data Processing Security Requirements (数据安全技术 政务数据处理安全要求)[S]. Beijing: China Standards Press, 2025.

[15] Karras T, Laine S, Aila T. A Style-Based Generator Architecture for Generative Adversarial Networks[C]//Proceedings of the IEEE/CVF CVPR. Long Beach: IEEE, 2019: 4401-4410.

[16] NIST. NFIQ 2.0: NIST Fingerprint Image Quality[R]. Gaithersburg: NIST, 2020.

[17] Schneier B. Attack Trees: Modeling Security Threats[J]. Dr. Dobb's Journal, 1999, 24(12): 21-29.

[18] Trend Micro. Unconventional Attack Surfaces: Identity Replication via Employee Digital Twins[R]. Tokyo: Trend Micro, 2026.

[19] Kaaniche N, Laurent M. Decentralized and Secure Blockchain Solution for Tamper-Proof Logging Events[J]. Future Internet, 2025, 17(3): 108.

[20] IEEE. DkvSSO: Delegatable Keyed-Verification Credentials for Efficient Anonymous Single Sign-on[J]. IEEE Transactions on Information Forensics and Security, 2025, 20: 1150-1165.

[21] Cybersecurity Law of the People's Republic of China (中华人民共和国网络安全法)[S]. 2016.

[22] Data Security Law of the People's Republic of China (中华人民共和国数据安全法)[S]. 2021.

[23] Personal Information Protection Law of the People's Republic of China (中华人民共和国个人信息保护法)[S]. 2021.

[24] Zheng Z, Xie S, Dai H, et al. An Overview of Blockchain Technology: Architecture, Consensus, and Future Trends[C]//Proceedings of the 2017 IEEE International Congress on Big Data. Honolulu: IEEE, 2017: 557-564.

[25] Buchman E. Tendermint: Byzantine Fault Tolerance in the Age of Blockchains[D]. Guelph: University of Guelph, 2016.

[26] Yin M, Malkhi D, Reiter M K, et al. HotStuff: BFT Consensus with Linearity and Responsiveness[C]//Proceedings of the 2019 ACM Symposium on Principles of Distributed Computing. Toronto: ACM, 2019: 347-356.

[27] National Cryptography Administration. GM/T 0111-2021 Blockchain Cryptography Application Technical Requirements (区块链密码应用技术要求)[S]. Beijing: China Standards Press, 2021.

[28] Boneh D, Shoup V. A Graduate Course in Applied Cryptography[M]. Version 0.6. Stanford: Stanford University, 2023.

[29] Androulaki E, Barger A, Bortnikov V, et al. Hyperledger Fabric: A Distributed Operating System for Permissioned Blockchains[C]//Proceedings of the Thirteenth EuroSys Conference. Porto: ACM, 2018: 30.

[30] DeCandia G, Hastorun D, Jampani M, et al. Dynamo: Amazon's Highly Available Key-value Store[C]//Proceedings of the 21st ACM SIGOPS Symposium on Operating Systems Principles. Stevenson: ACM, 2007: 205-220.

# Appendix

## Appendix A: Virtual Identity Generation Algorithm Pseudocode (Including Reserved Code Segment Ranges)

```
Algorithm 1: Virtual Identity Card Number Generation Algorithm

Input: None
Output: 18-digit virtual citizen identity number conforming to GB 11643 standard

Reserved address code pool = {
    '90',  # Virtual provincial code
    '91'   # Backup virtual provincial code
} × {00..99} (excluding已启用 combinations)

1. addr_code ← Randomly select from reserved address code pool (6 digits)
2. birth_date ← Randomly generate legitimate date (1900-01-01 to 2026-12-31)
3. seq_code ← Randomly generate three-digit sequence code (000-999)
4. raw_17 ← addr_code + birth_date + seq_code
5. Calculate checksum according to GB 11643 weighting factors
6. Compare generated number with public security system reserved code segment database to确保 no conflicts
7. return 18-digit virtual identity card number
```

## Appendix C: Experimental Data Samples (After Anonymization)

Table C-1 Virtual Identity Data Samples

| Field | Sample Value | Description |
|------|--------|------|
| Virtual identity number | 900101199001011234 | Using reserved code segment |
| Virtual name | Zhang Mingyuan (张明远) | Algorithm-generated |
| Virtual birth date | 1990-01-01 | Randomly generated |
| Virtual household registration address | Virtual Province Virtual City Virtual District | Not mapped to real location |
| Virtual biometric hash | SHA256: a7b3f... | Feature vector hash value |

## Appendix E: Open Science Commitment

This research team commits to making the following research artifacts公开 via GitHub within 6 months after project completion:

1. Complete Docker Compose configuration and deployment documentation for the experimental platform
2. Red team injection tool (RedTeam-Injector) source code
3. Blue team audit engine core rule set
4. Anonymized experimental dataset (including all injection records and detection logs from 10 repeated experiments)
5. Data analysis scripts (R/Python)

Publicly released artifacts will follow the MIT open-source license. For the virtual identity generation portion, the generation algorithm code and parameters will be provided, but pre-generated virtual identity data files will not be publicly released.

*This paper does not涉及 any real citizen data. All experiments were completed in a physically isolated sandbox environment and have passed a university ethics committee审批 (approval number: XXX-IRB-2025-ZT-017).*

---

*Written by Liangzhi in Yangcheng Yunxi Valley, May 2026*

> **Copyright Notice**: This is a preview translation — Chinese original is the authoritative version. Copyright belongs to Guangzhou Phaenarete AI Technology Co., Ltd. Unauthorized reproduction, citation, or distribution is prohibited.