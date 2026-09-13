export type ProjectProcess = {
  focus: string; audience: string; hypothesis: string;
  artifact: { kind: string; title: string; body: string; steps: string[] };
  decision: string; evidence: string; method: string; plan: string;
};

export const projectProcess: Record<string, ProjectProcess> = {
  "nova": {
    "focus": "Prioritizing the next useful decision.",
    "audience": "Working audience assumption: a product or operations lead reviewing performance between meetings. Segment by decision responsibility and frequency of review, rather than age or job title alone.",
    "hypothesis": "A stable summary with details on demand may help someone identify the next action without opening every metric. The risk is hiding the context needed to judge an apparent change.",
    "artifact": {
      "kind": "TASK FLOW",
      "title": "From overview to explanation",
      "body": "This flow documents the current prototype structure; it is not an observed user journey.",
      "steps": [
        "Review the daily overview and selected period.",
        "Open the relevant analysis or activity view.",
        "Inspect the supporting figures before acting."
      ]
    },
    "decision": "Keep navigation independent of the amount of content in each view. Use the accent for the selected tool, with labels and figures carrying the explanation.",
    "evidence": "Portfolio review exposed navigation buttons moving between views. The sidebar was changed to keep its navigation group anchored. This is a documented interface correction, not evidence of improved task performance.",
    "method": "Contextual inquiry + task-based evaluation",
    "plan": "Observe how team leads currently review a report, using redacted examples. Then ask them to explain an unusual change in NOVA. Record wrong turns, requests for missing context, and whether their explanation matches the supplied data. Use those findings to decide which detail deserves the first screen."
  },
  "serein": {
    "focus": "From a sense of place to a considered stay.",
    "audience": "Working audience assumption: a guest comparing a short retreat, with uncertainty about rooms, the daily experience, and total cost. A first-time visitor and a returning guest may need different amounts of reassurance.",
    "hypothesis": "Organizing the residence around sleep, bathing, and food may help guests imagine a stay. Atmosphere alone will not answer practical booking questions.",
    "artifact": {
      "kind": "JOURNEY OUTLINE",
      "title": "Imagine → compare → plan",
      "body": "A proposed guest journey based on the concept. The questions below are design prompts, not quotations from research participants.",
      "steps": [
        "Arrival: What kind of place is this? The landscape and dawn/dusk views establish the setting.",
        "Exploration: What would my day look like? Suite, onsen, and table pages reveal the three rituals.",
        "Planning: What am I choosing and what will it cost? The stay form makes the selection and illustrative total explicit."
      ]
    },
    "decision": "Separate the emotional introduction from practical room details, while keeping a clear route back to the residence and portfolio.",
    "evidence": "The built prototype includes connected residence pages and a local booking demonstration. It does not establish real availability or complete a reservation.",
    "method": "Comparative review + guest interviews",
    "plan": "Compare retreat websites on room facts, pricing clarity, cancellation information, and the path to availability. Interview people about a recent accommodation decision rather than asking whether they like this design. Test whether guests can describe the stay and explain the quoted total before adding more atmospheric content."
  },
  "form": {
    "focus": "Making wandering and retrieval coexist.",
    "audience": "Working audience assumption: a culturally curious browser arriving without a specific title, alongside a returning reader looking for a known story. These are different intentions, not fixed personas.",
    "hypothesis": "An expressive editorial grid can invite browsing if categories, search, and article metadata remain dependable. Unusual composition becomes a liability when a reader cannot predict where a card leads.",
    "artifact": {
      "kind": "INFORMATION ARCHITECTURE",
      "title": "Two ways into the archive",
      "body": "A compact map of the implemented experience. Categories narrow the index; story pages hold the longer reading experience.",
      "steps": [
        "Archive → browse Objects, People, or Ideas → select a story.",
        "Archive → search for a known subject → select a matching story.",
        "Story → read the article and imagery → return to the archive."
      ]
    },
    "decision": "Let imagery and scale vary between stories; keep the information that explains a destination in a consistent order.",
    "evidence": "The prototype connects category filters and search with complete story pages. Its content is a curated concept collection, not evidence that the taxonomy matches readers’ mental models.",
    "method": "Card sorting + findability testing",
    "plan": "Ask prospective readers to group sample stories and name their groups before showing the existing categories. Then test a specific retrieval task and an open-ended browsing task separately. Record category confusion and unexpected destinations; revise the taxonomy before refining card styling."
  },
  "aura": {
    "focus": "A quieter transition into focused time.",
    "audience": "Working audience assumption: someone creating a brief boundary between activities who wants a low-effort choice. Motion preferences and keyboard or touch use are relevant differences within this audience.",
    "hypothesis": "Choosing an emotional tone before a session may reduce the effort of browsing a large catalog. Labels such as Still and Open may also be too ambiguous without a useful preview.",
    "artifact": {
      "kind": "SCENARIO",
      "title": "A short pause before beginning work",
      "body": "A design scenario, not a participant account. The person has a few minutes and wants to choose a session without exploring every page.",
      "steps": [
        "Choose Still, Open, or Warm in the listening room.",
        "Start, pause, or seek through the visual session preview.",
        "Explore Library or Rituals, then return using the same navigation positions."
      ]
    },
    "decision": "Keep the route menu stable and separate from playback controls. Describe the current environment in text as well as color.",
    "evidence": "Phone feedback revealed a clipped environment selector; subsequent review found mismatched navigation across pages. The selector now uses normal mobile flow, and all four pages share one menu. Audio remains unconnected, so the prototype cannot validate listening quality or wellbeing outcomes.",
    "method": "Diary study + usability sessions",
    "plan": "Invite volunteers to describe the moments when they seek a transition between activities, then test whether they can predict the tone labels and control the preview. Include reduced-motion and keyboard sessions. Test actual audio separately before making claims about focus or calm."
  },
  "vernacular": {
    "focus": "Connecting material claims to visible structure.",
    "audience": "Working audience assumption: a person planning a small gathering who needs to compare formats and quantities. Separate the purchaser’s questions from the handling needs of guests and food-service staff.",
    "hypothesis": "Showing the rim, ribs, and stack alongside clear specifications may explain the proposed object better than an abstract sustainability message.",
    "artifact": {
      "kind": "PROTOTYPE SCOPE",
      "title": "Digital configuration, physical questions",
      "body": "The current deliverable is a high-fidelity product presentation and local pack configurator. It is not a tested material sample.",
      "steps": [
        "Inspect the proposed form and construction details.",
        "Choose a pack and adjust quantity.",
        "Review the illustrative price in the concept bag."
      ]
    },
    "decision": "Use product details as the bridge between expressive typography and a practical configuration decision.",
    "evidence": "The interface demonstrates configuration and local bag states. Strength, heat resistance, food safety, and disposal claims would require separate physical and supply-chain evidence; imagery cannot establish them.",
    "method": "Physical prototyping + contextual observation",
    "plan": "Begin with low-cost form models to compare grip, carrying, and stacking. Observe serving and clearing tasks before selecting a geometry. Material performance and disposal requirements need qualified testing and documented sourcing before the concept can be presented as a production product."
  },
  "field": {
    "focus": "Reading a route at a glance.",
    "audience": "Working audience assumption: a recreational walker comparing a few routes before leaving. Planning experience, screen visibility, and access needs matter more than a generic outdoors persona.",
    "hypothesis": "Keeping the route line and its key facts synchronized may make comparison easier. A visually plausible map can also create unjustified confidence if its limitations are unclear.",
    "artifact": {
      "kind": "TASK SCENARIO",
      "title": "Choose a route before setting out",
      "body": "This scenario is limited to planning with illustrative data; it is not a live navigation journey.",
      "steps": [
        "Select a route and compare distance, elevation, and estimated time.",
        "Switch a map layer to inspect the available context.",
        "Save the route or download its notes for later review."
      ]
    },
    "decision": "Give essential route facts a stable reading position. Keep the illustrative-map limitation explicit rather than suggesting real location tracking.",
    "evidence": "Route selection updates the drawing and facts together, and saves belong to each route. There is no validated trail database, offline navigation, or field-safety evaluation.",
    "method": "Contextual inquiry + glanceability testing",
    "plan": "Study how walkers choose a route before a trip. Test the prototype in a controlled setting under varied screen brightness and with larger text; ask participants to explain the route facts after a brief look. Research actual map and data requirements before proposing an outdoor navigation product."
  },
  "atelier": {
    "focus": "Turning editorial interest into a fitting decision.",
    "audience": "Working audience assumption: someone interested in a garment’s silhouette who needs more evidence about fit before committing. Distinguish browsing for inspiration from selecting a specific size.",
    "hypothesis": "Alternating full-look imagery with construction detail may connect atmosphere to a practical choice. Editorial restraint should not conceal fit information.",
    "artifact": {
      "kind": "USER STORY",
      "title": "Understand the garment before choosing",
      "body": "As a prospective wearer, I want to connect the overall silhouette with sizing and construction details so I can make a considered fitting choice. This is a design assumption, not a research-derived story.",
      "steps": [
        "Choose a look from the collection.",
        "Inspect the garment and available prototype sizing.",
        "Save the look or add it to the local fitting bag."
      ]
    },
    "decision": "Treat the bag as a continuation of the garment study and clearly name simulated transaction states.",
    "evidence": "The high-fidelity prototype supports look selection, sizing, saving, and a local bag. It does not establish fit accuracy, purchasing conversion, or the longevity of the physical garment.",
    "method": "Comparative analysis + fit-information testing",
    "plan": "Compare how fashion sites explain measurements, sizing uncertainty, and returns. Give participants a concrete fitting scenario and ask them to explain their selection. Track unanswered questions and missing measurements rather than relying on visual preference alone."
  },
  "signal": {
    "focus": "Explaining what a balance leaves out.",
    "audience": "Working audience assumption: someone manually tracking money across accounts who wants to distinguish current balance from planned commitments. Income regularity and existing budgeting habits are useful segmentation questions.",
    "hypothesis": "Showing reserves next to the balance may make available money easier to understand. The interpretation fails if users cannot explain which bills, goals, and buffer are included.",
    "artifact": {
      "kind": "USER STORY + ACCEPTANCE CRITERIA",
      "title": "Make a change and understand its effect",
      "body": "As someone planning upcoming expenses, I want to record a transaction and see how it changes my balance and available amount. This story is a working design assumption.",
      "steps": [
        "Record a dated transaction against an account.",
        "Check that the balance and relevant period summary reflect the change.",
        "Inspect the reserve breakdown and explain the available amount.",
        "Correct a mistaken entry and check the revised result."
      ]
    },
    "decision": "Connect week, month, and year charts to one daily ledger. Pair each trend color with the amount and direction of change.",
    "evidence": "Portfolio review identified inconsistent range patterns and chart rendering. The implementation now shares a ledger and dollar scale between ranges. This documents a logic and presentation correction; no user comprehension study has been completed.",
    "method": "Moderated comprehension testing",
    "plan": "Use fictional balances and commitments, never participants’ bank credentials. Ask people to predict the result of an edit and explain available funds in their own words. Record calculation misunderstandings, recovery errors, and confusion between transfers and spending. Revise labels and the breakdown before adding more metrics."
  },
  "civic": {
    "focus": "Making the next step and its owner visible.",
    "audience": "Working audience assumption: a resident reporting a local issue, plus the service staff who would eventually receive it. Language, access to devices, and familiarity with departments may change the journey.",
    "hypothesis": "Organizing around resident questions may reduce the need to understand an institution’s department structure. Clear submission feedback must still explain who would act next.",
    "artifact": {
      "kind": "SERVICE JOURNEY",
      "title": "Notice → describe → understand the next step",
      "body": "A proposed resident journey. The staff handoff is a research gap, not an implemented municipal service.",
      "steps": [
        "Identify the issue and inspect relevant service information.",
        "Choose a category and describe the request in the local form.",
        "Review the simulated confirmation and request state.",
        "Future service requirement: route to a responsible team and communicate the next update."
      ]
    },
    "decision": "Use plain status labels and visible ownership cues; distinguish a simulated request from a real submission.",
    "evidence": "The prototype covers local reporting and participation states. It neither contacts a public agency nor demonstrates an operational response workflow.",
    "method": "Resident interviews + service blueprint",
    "plan": "Interview residents about a recent request and staff about triage, handoffs, and exceptions. Build a service blueprint linking each public status to an accountable backstage action. Test category labels and confirmation comprehension before proposing live integration; include people using assistive technology."
  },
  "lumen": {
    "focus": "Testing a human ritual before adding software.",
    "audience": "Working audience assumption: a small team coordinating shared work with unclear ownership or too many competing priorities. Observe the team’s existing ritual before assuming another application is needed.",
    "hypothesis": "One daily promise and three time horizons may support a shared understanding of the plan. The constraint may be too rigid when dependencies or competing commitments matter.",
    "artifact": {
      "kind": "LOW-FIDELITY STUDY PLAN",
      "title": "Try the worktable on paper",
      "body": "A proposed next study, not a claim that paper sessions preceded the coded prototype. The physical format makes changes inexpensive.",
      "steps": [
        "Write one shared daily promise on a sheet of paper.",
        "Put work on index cards with an owner; sort into Now, Next, and Later.",
        "Ask the team to explain a changed priority and move the affected cards.",
        "Compare what the paper exercise reveals with the current digital interaction."
      ]
    },
    "decision": "The implemented concept uses owners, movable cards, and three horizons instead of a feed of updates.",
    "evidence": "The current deliverable is a high-fidelity local planning room. Its analog starting point is a design rationale; team adoption, coordination quality, and productivity have not been measured.",
    "method": "Contextual observation + facilitated paper prototype",
    "plan": "Observe an existing planning meeting with consent, then try the paper worktable with the same kind of task. Record disagreements about ownership, work that does not fit a horizon, and missing dependency information. Use those observations to decide what belongs in the digital version."
  },
  "pantry": {
    "focus": "Keeping appetite and purchase clarity together.",
    "audience": "Working audience assumption: someone choosing a meal under a time constraint. Dietary requirements, available ingredients, and household size may affect the choice and need direct research.",
    "hypothesis": "Illustration can invite exploration if product names, quantities, and prices stay explicit. Mood-based browsing may not answer a specific ingredient need.",
    "artifact": {
      "kind": "WIREFLOW OUTLINE",
      "title": "Find a meal, then review the bag",
      "body": "A textual map of the implemented screen states, created from the current prototype rather than presented as an earlier wireframe.",
      "steps": [
        "Browse → apply a mood filter or enter a search term.",
        "Results → inspect a matching meal → add to the bag.",
        "Bag → change quantities → review the subtotal.",
        "Prototype checkout → receive explicit feedback that no purchase was made."
      ]
    },
    "decision": "Keep the illustrated personality in the discovery surface while making quantity, price, and checkout state concrete.",
    "evidence": "Search, filters, bag quantities, subtotal, and simulated checkout are implemented. There is no fulfillment service or validated dietary-matching model.",
    "method": "Search-language research + task testing",
    "plan": "Ask prospective shoppers to describe a recent dinner decision and the words they would search for. Compare those terms with recipe labels before changing filters. Test a constrained shopping task and check whether people can explain the quantity and total; investigate dietary information separately before claiming suitability."
  }
};
