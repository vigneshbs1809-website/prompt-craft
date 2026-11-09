# 📊 Usability Evaluation Strategy & Research Methodology

> **Academic Notice:** This document outlines the proposed empirical human-computer interaction evaluation protocol designed to test PromptCraft with human participants. In accordance with academic integrity guidelines, these testing frameworks and statistical hypotheses are presented as a structured study protocol for evaluation rather than fabricated experimental results.

---

## 1. Research Objectives & Hypotheses

### Primary Research Questions
- **RQ1:** Does a guided, affordance-rich prompt builder significantly improve the structural quality of novice prompts compared to an unguided text box?
- **RQ2:** Does itemized Explainable AI (XAI) feedback accelerate the acquisition of transferable prompt engineering skills?
- **RQ3:** What is the perceived usability score of PromptCraft among non-technical users on the standardized System Usability Scale (SUS)?

### Hypotheses
- **$H_1$:** Participants using PromptCraft will produce prompts with significantly higher specificity and constraint scores ($p < 0.05$) than participants in an unguided control group.
- **$H_2$:** PromptCraft will achieve a mean System Usability Scale (SUS) score exceeding the industry benchmark of 68 (targeting Grade A: $>80.3$).
- **$H_3$:** Users will report a statistically significant reduction in perceived cognitive load (NASA-TLX) during complex prompt creation tasks.

---

## 2. Participant Profile & Sampling Strategy

- **Target Sample Size:** $N = 30$ participants (divided into Experimental Group $n=15$ and Control Group $n=15$).
- **Inclusion Criteria:**
  - Undergraduate or postgraduate college students from non-computer science disciplines (Humanities, Business, Biology, Arts).
  - Prior experience with ChatGPT or similar conversational LLMs of less than 5 hours total.
  - Self-reported confidence in prompt writing $\le 3$ on a 5-point Likert scale.
- **Exclusion Criteria:** Professional software engineers, AI researchers, or students who have completed formal prompt engineering courses.

---

## 3. Evaluation Protocol & Experimental Tasks

### Task 1: Cold Start Prompt Creation (Task Domain: Educational Aid)
- **Scenario:** *"You need ChatGPT to explain the concept of Photosynthesis to your 10-year-old cousin using simple household kitchen analogies, under 200 words, without mentioning chemical ATP formulas."*
- **Control Condition:** Participant uses a blank ChatGPT-style text box.
- **Experimental Condition:** Participant uses PromptCraft Guided Builder.
- **Metrics Collected:** Task completion time, prompt length, number of revisions, heuristic quality score.

### Task 2: Prompt Refinement & Learning Transfer (Task Domain: Business)
- **Scenario:** *"Take the vague prompt 'write marketing email for shoe store' and transform it into an effective promotional campaign."*
- **Experimental Flow:** Participant pastes the prompt into PromptCraft Improver, inspects the itemized educational explanations, and exports the improved output.
- **Post-Task Assessment:** Participant is asked to independently identify which prompt patterns were applied (evaluating learnability and concept retention).

---

## 4. Standardized Evaluation Instruments

### 4.1 System Usability Scale (SUS) Questionnaire
Administered immediately following task completion:

| # | Item Statement | Scale |
| :--- | :--- | :--- |
| 1 | I think that I would like to use this system frequently. | 1 (Strongly Disagree) — 5 (Strongly Agree) |
| 2 | I found the system unnecessarily complex. | 1 (Strongly Disagree) — 5 (Strongly Agree) |
| 3 | I thought the system was easy to use. | 1 (Strongly Disagree) — 5 (Strongly Agree) |
| 4 | I think that I would need the support of a technical person to be able to use this system. | 1 (Strongly Disagree) — 5 (Strongly Agree) |
| 5 | I found the various functions in this system were well integrated. | 1 (Strongly Disagree) — 5 (Strongly Agree) |
| 6 | I thought there was too much inconsistency in this system. | 1 (Strongly Disagree) — 5 (Strongly Agree) |
| 7 | I would imagine that most people would learn to use this system very quickly. | 1 (Strongly Disagree) — 5 (Strongly Agree) |
| 8 | I found the system very cumbersome to use. | 1 (Strongly Disagree) — 5 (Strongly Agree) |
| 9 | I felt very confident using the system. | 1 (Strongly Disagree) — 5 (Strongly Agree) |
| 10 | I needed to learn a lot of things before I could get going with this system. | 1 (Strongly Disagree) — 5 (Strongly Agree) |

### 4.2 Standard SUS Scoring Methodology (Brooke, 1996)
1. For odd-numbered items (1, 3, 5, 7, 9): Score Contribution = $\text{Raw Score} - 1$.
2. For even-numbered items (2, 4, 6, 8, 10): Score Contribution = $5 - \text{Raw Score}$.
3. Calculate Sum of all 10 contributions and multiply by $2.5$:

$$\text{SUS Score} = 2.5 \times \sum_{i=1}^{10} \text{Adjusted Item}_i \in [0, 100]$$

### 4.3 Interpretation Benchmark (Bangor, Kortum & Miller, 2008)
- **Score > 80.3:** Grade A (Exceptional usability)
- **Score 68.0 – 80.3:** Grade B / C (Acceptable benchmark)
- **Score < 68.0:** Marginal or unacceptable usability

---

## 5. Qualitative Feedback & Heuristic Analysis

In addition to quantitative SUS metrics, participants participate in a semi-structured debriefing interview addressing:
1. **Perceived Affordances:** *"Did the input boxes and category pills make it immediately clear what you needed to supply?"*
2. **Cognitive Scaffolding:** *"Did the 'Why this matters' tips help you understand why constraints improve AI answers?"*
3. **Autonomy vs. Dependency:** *"Do you feel you could write a better prompt now without using PromptCraft?"*

