# 📊 Academic Presentation & Viva Defense Outline

## Slide 1: Title & Author Slide
- **Title:** PromptCraft: A Human-Centric Prompt Guidance Interface for Non-Expert Users of Generative AI
- **Subtitle:** Bridging the AI Accessibility Gap Through Perceived Affordances, Scaffolding, and Explainable Feedback
- **Candidate:** Vignesh (Final Year Capstone Project)
- **Department:** Department of Computer Science & Engineering

---

## Slide 2: Context & Motivation
- **The Generative AI Boom:** Over 100M+ people interact with LLMs weekly.
- **The Core Paradox:** Natural language implies zero barrier to entry ("just type what you want"), but prompt engineering requires programming-like mental models.
- **Consequence:** Non-experts experience vague outputs, hallucinations, and frustration (*Zamfirescu-Pereira et al., CHI 2023*).

---

## Slide 3: The Research Problem & Existing Gaps
- **The "Blank Page" Trap:** Modern LLMs provide no signifiers of what inputs are needed.
- **Black-Box Tools (PromptPerfect, AIPRM):** Automate prompts without education, worsening user dependency.
- **Research Question:** *How can human-centered computing principles enable non-experts to construct effective prompts while developing autonomous AI literacy?*

---

## Slide 4: Theoretical HCI Framework
- **Donald Norman:** Affordances, Signifiers, and bridging the Gulf of Execution & Evaluation.
- **Jakob Nielsen:** Progressive Disclosure (mitigating cognitive overload via Quick vs. Detailed modes).
- **Lev Vygotsky:** Zone of Proximal Development (ZPD) & instructional scaffolding.
- **Vanderbilt Catalog (White et al., 2023):** Grounding in formal prompt patterns (Persona, Chain-of-Thought, Output Automator).

---

## Slide 5: System Architecture & Dual-Engine Design
- **Architecture Diagram:** Single Page Application (React 19 + Tailwind CSS + Vite).
- **Dual Engine Innovation:**
  - *Cloud AI Layer:* Google Gemini 2.0 Flash API for live, context-aware prompt reconstruction.
  - *Offline Deterministic Heuristic Engine:* Pattern-matching rules guaranteeing 100% demo reliability without internet connectivity.
- **Zero Server Footprint:** Complete privacy; all history stored in browser `localStorage`.

---

## Slide 6: Key Feature Walkthrough
- **Guided Prompt Builder:** 7 specialized domains, progressive disclosure, live prompt preview.
- **Explainable Prompt Improver:** Itemized reasons showing *what* was changed, *why* it helps, and the *applied principle*.
- **Quality Analyzer:** Real-time scoring across Specificity, Context, Clarity, Structure, and Actionability.
- **Annotated Templates:** Customizable parameter placeholders with inline HCI insights.
- **Learning Hub:** Interactive lessons, before/after comparisons, and quick rules.

---

## Slide 7: Live Demonstration
*(Transition to live browser session following `DEMO_GUIDE.md`)*
- Demonstration 1: Constructing a structured prompt via Guided Builder.
- Demonstration 2: Improving a vague 5-word prompt and reviewing itemized XAI feedback.
- Demonstration 3: Executing the 18 automated verification tests in the terminal.

---

## Slide 8: Evaluation Methodology
- **Target Audience:** Non-expert students and professionals ($N=30$).
- **Controlled Tasks:** Comparing unguided blank text boxes against PromptCraft's guided scaffolding.
- **Standardized Instrument:** System Usability Scale (SUS) with 10 alternating Likert items.
- **Target Metric:** Grade A SUS benchmark ($>80.3$).

---

## Slide 9: Limitations & Future Enhancements
- **Current Limitations:** Client-side only; heuristic quality scoring is rule-modeled rather than statistically benchmarked across millions of users.
- **Future Work:** Multi-modal prompt guidance (image/audio prompting for Midjourney/Sora), browser extensions for inline ChatGPT assistance, and localized multi-lingual support.

---

## Slide 10: Conclusion & Key Takeaways
- The difficulty of generative AI is an **interface design problem**, not a user failure.
- By shifting the burden of structure from the user to affordance-based interface scaffolding, non-experts achieve high-quality results.
- Explainable AI feedback transforms passive users into critical, literate prompt crafters.

---

## Slide 11: Questions & Viva Defense
- *Thank you to the examination committee. Open for questions.*

