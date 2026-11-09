# 📑 Academic Project Synopsis

## 1. Project Identification
- **Project Title:** PromptCraft: A Human-Centric Prompt Guidance Interface for Non-Expert Users of Generative AI
- **Domain:** Human-Computer Interaction (HCI) / Human-Centric Generative AI
- **Target Degree:** Bachelor of Technology / Master of Science in Computer Science & Engineering
- **Academic Year:** 2025–2026

---

## 2. Abstract
Generative Artificial Intelligence (GenAI) interfaces currently present users with an unconstrained, blank text box. While natural language interaction ostensibly promises universal accessibility, empirical studies show that non-expert users experience severe friction: they struggle to articulate context, role, constraints, and formatting, leading to generic outputs, trial-and-error fatigue, and premature tool abandonment.

This project introduces **PromptCraft**, a web-based prompt-guidance environment grounded in human-computer interaction principles. By applying Donald Norman’s theories of perceived affordances and signifiers, Jakob Nielsen’s progressive disclosure, and Lev Vygotsky’s instructional scaffolding, PromptCraft transforms prompt engineering from an obscure technical art into an intuitive, educational craft. PromptCraft provides an interactive Prompt Builder, an Explainable Prompt Improver, a multi-dimensional Quality Analyzer, and an Educational Learning Hub. The platform implements a dual-engine architecture combining the Google Gemini 2.0 Flash API with an offline heuristic rule engine, ensuring 100% operational reliability.

---

## 3. Problem Statement & Research Gap
Current prompt engineering software suffers from three critical limitations:
1. **Black-Box Automation Trap:** Tools such as PromptPerfect optimize prompts behind closed doors without explaining structural choices, fostering user dependency rather than capability.
2. **The Blank Page Dilemma:** Novices lack mental models of how Large Language Models (LLMs) interpret tokens, attempting to interact with them as conversational humans (*Zamfirescu-Pereira et al., CHI 2023*).
3. **Absence of Explainable Scaffolding:** No existing tool couples real-time visual prompt assembly with explainable annotations grounded in formal prompt pattern literature (*White et al., 2023*).

---

## 4. Research Objectives
1. **RO1:** Formulate an interface architecture utilizing visual affordances and signifiers to eliminate the blank-page dilemma for novice users.
2. **RO2:** Implement a progressive disclosure framework (Quick Mode vs. Detailed Mode) to minimize cognitive load while enabling advanced control.
3. **RO3:** Engineer an Explainable AI (XAI) prompt improvement module that itemizes syntactic and semantic upgrades with educational rationales.
4. **RO4:** Develop a multi-dimensional heuristic quality analyzer evaluating prompts across Specificity, Context, Clarity, Structure, and Actionability.
5. **RO5:** Formulate an empirical evaluation protocol based on the System Usability Scale (SUS) to assess perceived learnability and user efficacy.

---

## 5. Methodology & Technical Approach
- **Phase I (User Requirements & HCI Modeling):** Mapping Norman's Gulf of Execution/Evaluation to LLM prompt construction workflows.
- **Phase II (System Architecture & Engine Design):** Developing dual-layer prompt improvement (cloud LLM inference paired with offline deterministic heuristics).
- **Phase III (Frontend & Interaction Engineering):** Implementing modern Single Page Application (SPA) architecture in React 19, Tailwind CSS v4, and Vite.
- **Phase IV (Verification & Evaluation):** Executing automated test suites across all heuristic dimensions and authoring a standard SUS experimental testing protocol.

---

## 6. Expected Outcomes & Deliverables
- Fully operational, verified web application with zero deployment cost and complete offline resilience.
- Complete documentation suite including Software Requirements Specification (SRS), System Design Document, Testing Report, and Demonstration Guide.
- Formal academic evaluation protocol ready for student and faculty usability trials.

