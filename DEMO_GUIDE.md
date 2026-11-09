# 🎓 PromptCraft: Demonstration Guide for Faculty & Evaluators

This guide provides a structured, step-by-step presentation script designed for faculty project reviews, laboratory evaluations, and capstone viva examinations.

---

## ⏱️ Demonstration Timeline (10-15 Minutes)

| Phase | Duration | Core Focus | Key HCI Concept |
| :--- | :--- | :--- | :--- |
| **1. Problem Statement** | 2 mins | The "Blank Page" barrier and why prompt engineering is hard for non-experts | Gulf of Execution |
| **2. Guided Builder Demo** | 4 mins | Scaffolding, affordances, and real-time prompt assembly | Norman's Affordances & Progressive Disclosure |
| **3. Prompt Improver Demo** | 4 mins | Transforming naive queries into structured prompts with itemized reasons | Explainable AI (XAI) & Learnability |
| **4. Templates & Learning Hub** | 3 mins | Research patterns (White et al., 2023) and cognitive scaffolding | Vygotsky's ZPD |
| **5. Technical Verification & Q&A** | 2 mins | Offline reliability, test suite execution, and architecture defense | Robust Software Architecture |

---

## 🎬 Step-by-Step Live Demonstration Script

### Step 1: Setting the Stage (2 minutes)
1. **Open the Homepage** (`http://localhost:5173/`).
2. **Key Talking Point for Faculty:**
   > *"Good morning respected evaluators. When people use generative AI today, they are confronted with a blank text box. Research published at ACM CHI 2023 by Zamfirescu-Pereira et al. titled 'Why Johnny Can't Prompt' proved that non-experts treat AI models like human conversationalists—omitting context, roles, and constraints. Existing tools like PromptPerfect optimize prompts behind closed doors, creating user dependency. PromptCraft is designed as a human-centric guidance interface that scaffolds the prompt writing process and teaches users why certain structures work."*
3. Scroll down on the homepage to point out the **Interactive Before/After Demonstration** showing the naive bakery prompt versus the structured prompt.

---

### Step 2: The Guided Prompt Builder (4 minutes)
1. **Navigate to the "Prompt Builder"** via the top navigation bar.
2. **Showcase Norman's Affordances & Signifiers:**
   - Point out that instead of a blank box, the user chooses their task domain (e.g., click **Writing & Content**).
   - Show the **Quick Mode vs. Detailed Mode toggle** in the top right.
   - Explain **Progressive Disclosure**:
     > *"Notice that by default, non-experts are not overwhelmed by 10 different text boxes. We present 3 essential fields. If they want deeper control, one click reveals advanced constraint and tone options."*
3. **Fill in the fields live:**
   - **Type of Content:** `LinkedIn post`
   - **Topic or Subject:** `launching an open-source environmental tracking tool`
   - **Target Audience:** `software engineers and climate tech enthusiasts`
4. **Showcase the Live Output Preview (Right Column):**
   - Note how the synthesized prompt updates in real-time.
   - Point out the **Prompt Quality Analyzer**: Specificity, Context, Clarity, Structure, and Actionability dynamically adjust their scores.
   - Click **Save** to demonstrate local persistence.

---

### Step 3: The Prompt Improver & Explainable AI (4 minutes)
1. **Navigate to the "Prompt Improver"** tab.
2. **Demonstrate with a realistic non-expert prompt:**
   - Click one of the quick sample buttons: `Marketing Email` (`Write an email about our new product.`).
   - Notice the **Initial Quality Baseline** badge displays low scores with clear warnings.
3. **Click "Improve Prompt & Explain Why":**
   - If offline: the **Rule-Based Heuristic Engine** executes in < 50ms.
   - If connected with Gemini API: the **Gemini 2.0 Flash engine** generates a custom optimization.
4. **Highlight the Academic Contribution:**
   > *"Unlike commercial prompt rewriters that output an improved prompt with zero explanation, PromptCraft itemizes every single change made. It tells the user: Change #1 added a Persona Pattern; Change #2 defined an explicit output constraint. This transforms prompt engineering into a learnable digital literacy skill."*
5. Highlight the **Quality Rating Gain** meter showing the measurable leap from 40% to 75%+.

---

### Step 4: Templates & The Learning Hub (3 minutes)
1. **Navigate to "Templates":**
   - Filter by `Education` or `Programming`.
   - Click on **Customize Template Variables** to demonstrate interactive variable substitution and the inline **HCI Insights**.
2. **Navigate to the "Learning Hub":**
   - Click the **Academic Patterns** tab.
   - Show the **Persona Pattern**, **Chain-of-Thought Pattern**, and **Output Automator Pattern** based on Vanderbilt University research (*White et al., 2023*).
   - Emphasize that students and general users can review these lessons anytime to build autonomous mastery.

---

### Step 5: History & Technical Validation (2 minutes)
1. **Navigate to "History":**
   - Show that the saved prompts from the builder and improver are recorded with timestamps, quality scores, and tags.
   - Click **Export JSON** to show how users can export their prompt library.
2. **Run the Automated Test Suite in Terminal:**
   ```bash
   npm test
   ```
   Show faculty that all 18 automated heuristic and architectural test cases pass with 100% success.

---

## 💡 Anticipated Viva Questions & Answers

### Q1: "Why didn't you connect the application to send prompts directly to ChatGPT and show the output?"
**Answer:**
> *"That was an intentional human-computer interaction design decision. If PromptCraft executed prompts directly, users would judge the output of the model rather than their own prompt structure. Our research objective is AI literacy and prompt construction. Keeping PromptCraft model-agnostic means users can copy their engineered prompts into any LLM—ChatGPT, Claude, Gemini, or local models like Llama."*

### Q2: "What if there is no internet during the evaluation?"
**Answer:**
> *"PromptCraft features a dual-engine architecture. While it supports Google's Gemini 2.0 Flash API for live generative suggestions, it has a fully offline heuristic rule engine built with pattern-matching heuristics. It requires zero cloud connectivity to demonstrate complete functionality, guaranteeing 100% uptime."*

### Q3: "How does this demonstrate Human-Centric Computing?"
**Answer:**
> *"Traditional AI tools place the burden of adaptation on the human: you must learn how the AI 'thinks' or suffer from hallucinations. Human-centric computing reverses this paradigm: the interface scaffolds human intent through affordances, signifiers, and progressive disclosure, reducing the cognitive load and bridging Norman's Gulf of Execution."*

