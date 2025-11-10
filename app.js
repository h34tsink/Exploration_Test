// State Management
const state = {
  activeTab: "verbs",
  rewards: [],
  materials: [],
  currentMaterial: null,
  ecology: {
    temperature: 20,
    radiation: 30,
    floraDensity: 75,
    faunaActivity: 50,
    worldHealth: 100,
    timeOfDay: 12,
    harvestCount: 0,
    totalHours: 0,
    log: [],
  },
  loopTimers: {
    detect: 0,
    approach: 0,
    interact: 0,
    reward: 0,
    record: 0,
  },
  currentPhase: 0,
  phaseStartTime: null,
  metrics: {
    curiosity: 0,
    loopTime: 0,
    souvenirs: 0,
    predictions: { total: 0, correct: 0 },
    history: [],
  },
};

// Global data loaded from JSON
let SCIENTIFIC_FIELDS = {};
let TECH_TREE = {};

// Load game data from JSON
async function loadGameData() {
  try {
    const statusEl = document.getElementById("loadingStatus");
    if (statusEl) statusEl.textContent = "Loading data.json...";

    const response = await fetch("data.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    SCIENTIFIC_FIELDS = data.scientificFields;
    TECH_TREE = data.techTree;

    if (statusEl) statusEl.textContent = "Data loaded successfully!";
    return true;
  } catch (error) {
    console.error("Failed to load game data:", error);
    const statusEl = document.getElementById("loadingStatus");
    if (statusEl) {
      statusEl.innerHTML = `<span style="color: #e74c3c;">Error loading data: ${error.message}</span><br>Check console for details.`;
    }
    return false;
  }
}

// Initialize app
document.addEventListener("DOMContentLoaded", async () => {
  // Load data first
  const dataLoaded = await loadGameData();
  if (!dataLoaded) {
    console.error("Could not load game data. App cannot start.");
    return;
  }

  // Hide loading screen
  const loadingEl = document.getElementById("loading");
  if (loadingEl) {
    loadingEl.style.display = "none";
  }

  // Initialize all systems
  initTabs();
  initExplorationVerbs();
  initMaterialGenerator();
  initRewardSystem();
  initEcologySimulator();
  initMysteryBudget();
  initLoopTimer();
  initMetricsDashboard();
});

// Tab Navigation
function initTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetTab = btn.dataset.tab;

      tabBtns.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));

      btn.classList.add("active");
      document.getElementById(targetTab).classList.add("active");

      state.activeTab = targetTab;
    });
  });
}

// Exploration Verbs
function initExplorationVerbs() {
  initTrace();
  initSample();
  initDecode();
  initShadow();
  initExcavate();
}

function initTrace() {
  const canvas = document.getElementById("traceCanvas");
  const ctx = canvas.getContext("2d");
  const btn = document.querySelector('[data-verb="trace"] .action-btn');
  const resultBox = document.querySelector('[data-verb="trace"] .result-box');

  let signals = [];
  let playerPos = null;

  btn.addEventListener("click", () => {
    signals = Array(3)
      .fill(null)
      .map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        strength: Math.random() * 50 + 50,
      }));

    playerPos = { x: canvas.width / 2, y: canvas.height / 2 };
    drawTrace(ctx, canvas, signals, playerPos);

    // Simulate triangulation
    setTimeout(() => {
      const target = signals.reduce(
        (acc, s) => ({
          x: acc.x + s.x / signals.length,
          y: acc.y + s.y / signals.length,
        }),
        { x: 0, y: 0 }
      );

      const distance = Math.sqrt(
        Math.pow(target.x - playerPos.x, 2) +
          Math.pow(target.y - playerPos.y, 2)
      );
      const accuracy = Math.max(0, 100 - (distance / canvas.width) * 100);

      resultBox.innerHTML = `
                <div class="reward-item">
                    <h4>🎯 Trace Complete</h4>
                    <p>Accuracy: ${accuracy.toFixed(1)}%</p>
                    <p>Discovered: <strong>Catalyst Deposit</strong></p>
                    <p class="rep-gain">+${Math.floor(accuracy)} REP</p>
                </div>
            `;
    }, 2000);
  });
}

function drawTrace(ctx, canvas, signals, playerPos) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw signals
  signals.forEach((signal) => {
    const gradient = ctx.createRadialGradient(
      signal.x,
      signal.y,
      0,
      signal.x,
      signal.y,
      signal.strength
    );
    gradient.addColorStop(0, "rgba(74, 144, 226, 0.5)");
    gradient.addColorStop(1, "rgba(74, 144, 226, 0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });

  // Draw player
  if (playerPos) {
    ctx.fillStyle = "#2ecc71";
    ctx.beginPath();
    ctx.arc(playerPos.x, playerPos.y, 5, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initSample() {
  const btn = document.querySelector('[data-verb="sample"] .action-btn');
  const resultBox = document.querySelector('[data-verb="sample"] .result-box');
  const targetsContainer = document.querySelector(
    '[data-verb="sample"] .sample-targets'
  );

  // Create sample targets
  const targets = Array(6)
    .fill(null)
    .map((_, i) => {
      const div = document.createElement("div");
      div.className = "sample-target";
      div.dataset.index = i;
      targetsContainer.appendChild(div);
      return div;
    });

  targets.forEach((target) => {
    target.addEventListener("click", () => {
      if (!target.classList.contains("sampled")) {
        target.classList.add("sampled");
        const sampleTypes = [
          "Enzyme",
          "Mineral",
          "Organic",
          "Crystal",
          "Gas",
          "Fluid",
        ];
        const sample =
          sampleTypes[Math.floor(Math.random() * sampleTypes.length)];

        resultBox.innerHTML = `
                    <div class="reward-item">
                        <h4>🧪 Sample Collected</h4>
                        <p>Type: <strong>${sample}</strong></p>
                        <p>Purity: ${(Math.random() * 40 + 60).toFixed(1)}%</p>
                        <p class="rep-gain">+${Math.floor(
                          Math.random() * 30 + 20
                        )} REP</p>
                    </div>
                `;
      }
    });
  });
}

function initDecode() {
  const btn = document.querySelector('[data-verb="decode"] .action-btn');
  const resultBox = document.querySelector('[data-verb="decode"] .result-box');
  const patternDisplay = document.querySelector(
    '[data-verb="decode"] .pattern-display'
  );
  const input = document.querySelector('[data-verb="decode"] .pattern-input');

  const patterns = [
    {
      pattern: "⬡ ⬢ ⬡ ⬢ ⬡",
      answer: "hexagon",
      reward: "Propulsion Blueprint Shard",
    },
    {
      pattern: "△ ▽ △ ▽ △",
      answer: "triangle",
      reward: "Energy Blueprint Shard",
    },
    {
      pattern: "◯ ◉ ◯ ◉ ◯",
      answer: "circle",
      reward: "Shield Blueprint Shard",
    },
    { pattern: "101010", answer: "binary", reward: "Data Core Fragment" },
  ];

  let currentPattern = patterns[Math.floor(Math.random() * patterns.length)];
  patternDisplay.textContent = currentPattern.pattern;

  btn.addEventListener("click", () => {
    const userAnswer = input.value.toLowerCase().trim();
    if (userAnswer === currentPattern.answer) {
      resultBox.innerHTML = `
                <div class="reward-item">
                    <h4>🔐 Decode Successful!</h4>
                    <p>Unlocked: <strong>${currentPattern.reward}</strong></p>
                    <p class="rep-gain">+${Math.floor(
                      Math.random() * 50 + 50
                    )} REP</p>
                </div>
            `;

      // Generate new pattern
      setTimeout(() => {
        currentPattern = patterns[Math.floor(Math.random() * patterns.length)];
        patternDisplay.textContent = currentPattern.pattern;
        input.value = "";
      }, 2000);
    } else {
      resultBox.innerHTML = `<p style="color: #e74c3c;">Incorrect pattern. Try again.</p>`;
    }
  });
}

function initShadow() {
  const btn = document.querySelector('[data-verb="shadow"] .action-btn');
  const resultBox = document.querySelector('[data-verb="shadow"] .result-box');
  const trackingDisplay = document.querySelector(
    '[data-verb="shadow"] .tracking-display'
  );

  btn.addEventListener("click", () => {
    const marker = document.createElement("div");
    marker.className = "creature-marker";
    trackingDisplay.innerHTML = "";
    trackingDisplay.appendChild(marker);

    const path = [
      { x: 10, y: 10 },
      { x: 50, y: 80 },
      { x: 150, y: 60 },
      { x: 200, y: 120 },
      { x: 350, y: 100 },
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < path.length) {
        marker.style.left = path[step].x + "px";
        marker.style.top = path[step].y + "px";
        step++;
      } else {
        clearInterval(interval);
        resultBox.innerHTML = `
                    <div class="reward-item">
                        <h4>👁️ Tracking Complete</h4>
                        <p>Species: <strong>Migratory Luminite</strong></p>
                        <p>Behavior Pattern Recorded</p>
                        <p class="rep-gain">+${Math.floor(
                          Math.random() * 40 + 30
                        )} REP</p>
                    </div>
                `;
      }
    }, 1000);
  });
}

function initExcavate() {
  const btn = document.querySelector('[data-verb="excavate"] .action-btn');
  const resultBox = document.querySelector(
    '[data-verb="excavate"] .result-box'
  );
  const progressBar = document.querySelector(
    '[data-verb="excavate"] .progress-bar'
  );

  btn.addEventListener("click", () => {
    let progress = 0;
    progressBar.style.setProperty("--progress", "0%");

    const interval = setInterval(() => {
      progress += 10;
      progressBar.querySelector("::after") ||
        (progressBar.style.background = `linear-gradient(90deg, var(--primary) ${progress}%, rgba(0,0,0,0.3) ${progress}%)`);

      if (progress >= 100) {
        clearInterval(interval);
        const artifacts = [
          "Ancient Relic",
          "Precursor Data Cube",
          "Crystalline Artifact",
          "Quantum Fragment",
        ];
        const artifact =
          artifacts[Math.floor(Math.random() * artifacts.length)];

        resultBox.innerHTML = `
                    <div class="reward-item">
                        <h4>⛏️ Excavation Complete</h4>
                        <p>Found: <strong>${artifact}</strong></p>
                        <p>Condition: ${(Math.random() * 30 + 70).toFixed(
                          1
                        )}%</p>
                        <p class="rep-gain">+${Math.floor(
                          Math.random() * 60 + 40
                        )} REP</p>
                    </div>
                `;
      }
    }, 200);
  });
}

// Scientific Fields Configuration
// Material Generator
function initMaterialGenerator() {
  const generateBtn = document.getElementById("generateMaterial");
  const batchBtn = document.getElementById("generateBatch");
  const evolveBtn = document.getElementById("evolveMaterial");
  const analyzeBtn = document.getElementById("analyzeMaterial");

  generateBtn.addEventListener("click", () => generateSingleMaterial());
  batchBtn.addEventListener("click", () => generateBatchMaterials());
  evolveBtn.addEventListener("click", () => evolveMaterial());
  analyzeBtn.addEventListener("click", () => analyzeMaterial());

  // Filter buttons
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      filterInventory(btn.dataset.filter);
    });
  });

  // Tech tree tabs
  document.querySelectorAll(".tech-tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".tech-tab-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      displayTechRequirements(btn.dataset.branch);
    });
  });

  // Calculate research button
  document
    .getElementById("calculateResearch")
    ?.addEventListener("click", () => calculateResearch());

  // Initial tech display
  displayTechRequirements("biotech");
}

function generateSingleMaterial() {
  const type = document.getElementById("materialType").value;
  const biome = document.getElementById("biomeOrigin").value;
  const rarityOverride = document.getElementById("rarityOverride").value;

  const material = generateMaterial(type, biome, rarityOverride);
  state.currentMaterial = material;
  state.materials.push(material);

  displayMaterial(material, document.getElementById("currentMaterial"));
  displayScientificStats(material);
  updateInventory();
}

function generateBatchMaterials() {
  for (let i = 0; i < 10; i++) {
    const types = [
      "plant",
      "animal",
      "mineral",
      "crystal",
      "gas",
      "artifact",
      "microorganism",
      "compound",
    ];
    const biomes = [
      "volcanic",
      "arctic",
      "forest",
      "desert",
      "ocean",
      "cave",
      "asteroid",
      "space",
      "radioactive",
    ];

    const material = generateMaterial(
      types[Math.floor(Math.random() * types.length)],
      biomes[Math.floor(Math.random() * biomes.length)],
      "random"
    );

    state.materials.push(material);
  }

  updateInventory();
}

function generateMaterial(type, biome, rarityOverride = "random") {
  // Procedural name generation
  const prefixes = {
    volcanic: ["Pyro", "Magma", "Inferno", "Volcanic", "Lava", "Thermal"],
    arctic: ["Cryo", "Frost", "Glacial", "Arctic", "Ice", "Frozen"],
    forest: ["Bio", "Chloro", "Sylvan", "Flora", "Verdant", "Arboreal"],
    desert: ["Arid", "Dune", "Solar", "Desert", "Silic", "Xeric"],
    ocean: ["Aqua", "Hydro", "Marine", "Oceanic", "Tidal", "Pelagic"],
    cave: ["Umbra", "Shadow", "Cavern", "Subterran", "Depth", "Spelean"],
    asteroid: ["Astro", "Cosmo", "Stellar", "Meteor", "Orbital", "Lithic"],
    space: ["Void", "Nebula", "Cosmic", "Astral", "Quantum", "Ethereal"],
    radioactive: [
      "Radio",
      "Quantum",
      "Atomic",
      "Isotopic",
      "Nuclear",
      "Plutonic",
    ],
  };

  const suffixes = {
    plant: ["flora", "moss", "fern", "bloom", "vine", "weed"],
    animal: ["beast", "creature", "fauna", "organism", "serpent", "leviathan"],
    mineral: ["ite", "ore", "stone", "deposit", "vein", "nodule"],
    crystal: ["shard", "prism", "geode", "lattice", "matrix", "formation"],
    gas: ["ogen", "on", "ane", "ene", "vapor", "mist"],
    artifact: [
      "relic",
      "artifact",
      "construct",
      "remnant",
      "monolith",
      "cache",
    ],
    microorganism: [
      "bacteria",
      "microbe",
      "spore",
      "colony",
      "culture",
      "strain",
    ],
    compound: [
      "compound",
      "mixture",
      "solution",
      "catalyst",
      "reagent",
      "polymer",
    ],
  };

  const prefix =
    prefixes[biome][Math.floor(Math.random() * prefixes[biome].length)];
  const suffix =
    suffixes[type][Math.floor(Math.random() * suffixes[type].length)];
  const name = prefix + suffix.charAt(0).toUpperCase() + suffix.slice(1);

  // Determine rarity
  let rarity;
  if (rarityOverride !== "random") {
    rarity = rarityOverride;
  } else {
    const rarityRoll = Math.random();
    if (rarityRoll < 0.5) rarity = "common";
    else if (rarityRoll < 0.75) rarity = "uncommon";
    else if (rarityRoll < 0.9) rarity = "rare";
    else if (rarityRoll < 0.97) rarity = "epic";
    else rarity = "legendary";
  }

  // Stat pool based on rarity
  const statPools = {
    common: 300,
    uncommon: 450,
    rare: 600,
    epic: 800,
    legendary: 1000,
  };

  const totalStatPool = statPools[rarity];

  // Generate stats for all scientific fields
  const stats = {};

  // Define which fields are primary for each object type
  const primaryFields = {
    plant: ["biology", "ecology", "chemistry"],
    animal: ["biology", "ecology", "medicine"],
    mineral: ["geology", "chemistry", "physics"],
    crystal: ["physics", "engineering", "geology"],
    gas: ["chemistry", "physics", "astronomy"],
    artifact: ["engineering", "astronomy", "physics"],
    microorganism: ["biology", "medicine", "chemistry"],
    compound: ["chemistry", "medicine", "engineering"],
  };

  const primaries = primaryFields[type] || ["biology", "chemistry"];

  // Distribute stat pool across fields
  let remainingPool = totalStatPool;
  const fieldDistribution = {};

  Object.keys(SCIENTIFIC_FIELDS).forEach((field, index, arr) => {
    if (index === arr.length - 1) {
      // Last field gets remaining pool
      fieldDistribution[field] = remainingPool;
    } else {
      // Primary fields get more allocation
      const isPrimary = primaries.includes(field);
      const weight = isPrimary ? 1.5 : 0.5;
      const allocation = Math.floor((Math.random() * 80 + 20) * weight);
      fieldDistribution[field] = Math.min(allocation, remainingPool);
      remainingPool -= fieldDistribution[field];
    }
  });

  // Generate subfield stats
  Object.keys(SCIENTIFIC_FIELDS).forEach((field) => {
    const fieldData = SCIENTIFIC_FIELDS[field];
    stats[field] = {};

    let fieldPool = fieldDistribution[field];

    fieldData.subfields.forEach((subfield, index, arr) => {
      if (index === arr.length - 1) {
        // Last subfield gets remaining
        stats[field][subfield] = Math.max(0, Math.min(100, fieldPool));
      } else {
        const value = Math.floor(Math.random() * Math.min(100, fieldPool));
        stats[field][subfield] = value;
        fieldPool -= value;
      }
    });
  });

  // Calculate field totals
  const fieldTotals = {};
  Object.keys(stats).forEach((field) => {
    fieldTotals[field] = Object.values(stats[field]).reduce((a, b) => a + b, 0);
  });

  // Calculate REP value
  const baseREP = {
    common: 20,
    uncommon: 50,
    rare: 120,
    epic: 250,
    legendary: 500,
  };

  const repValue = Math.floor(
    baseREP[rarity] *
      (1 + Object.values(fieldTotals).reduce((a, b) => a + b, 0) / 1000)
  );

  return {
    id: Date.now() + Math.random(),
    name,
    type,
    biome,
    rarity,
    stats,
    fieldTotals,
    repValue,
    discovered: new Date().toISOString(),
    evolved: false,
    mutations: [],
  };
}

function displayMaterial(material, container) {
  const rarityColors = {
    common: "#95a5a6",
    uncommon: "#3498db",
    rare: "#9b59b6",
    epic: "#e67e22",
    legendary: "#f39c12",
  };

  const typeIcons = {
    plant: "🌱",
    animal: "�",
    mineral: "💎",
    crystal: "🔮",
    gas: "💨",
    artifact: "🗿",
    microorganism: "🦠",
    compound: "⚗️",
  };

  // Get top 3 fields
  const topFields = Object.entries(material.fieldTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  container.innerHTML = `
        <div class="material-name">
            <span style="font-size: 1.5em;">${typeIcons[material.type]}</span>
            <span style="color: ${rarityColors[material.rarity]}">${
    material.name
  }</span>
        </div>
        
        <div style="display: flex; gap: 10px; margin-bottom: 15px; flex-wrap: wrap;">
            <span class="material-type-badge" style="background: rgba(74, 144, 226, 0.3);">
                ${material.type.toUpperCase()}
            </span>
            <span class="material-type-badge" style="background: ${
              rarityColors[material.rarity]
            }; color: #fff;">
                ${material.rarity.toUpperCase()}
            </span>
        </div>
        
        <div class="material-stats">
            <div style="margin-bottom: 10px;">
                <strong>Primary Fields:</strong>
                <div style="font-size: 0.85em; color: #95a5a6; margin-top: 5px;">
                    (Field Total = sum of 4 subfields, each 0-100%)
                </div>
            </div>
            ${topFields
              .map(
                ([field, total]) => `
                <div class="stat-row">
                    <span class="stat-label">${
                      SCIENTIFIC_FIELDS[field].name
                    }:</span>
                    <span class="stat-value">${total.toFixed(0)}%</span>
                </div>
                <div class="stat-bar-container">
                    <div class="stat-bar-fill" style="width: ${Math.min(
                      100,
                      total / 4
                    )}%; background: ${SCIENTIFIC_FIELDS[field].color};"></div>
                </div>
            `
              )
              .join("")}
            
            <div class="stat-row" style="margin-top: 15px;">
                <span class="stat-label">Total Stat Pool:</span>
                <span class="stat-value">${Object.values(material.fieldTotals)
                  .reduce((a, b) => a + b, 0)
                  .toFixed(0)}</span>
            </div>
            
            <div class="stat-row" style="margin-top: 10px;">
                <span class="stat-label">REP Value:</span>
                <span class="rep-gain">+${material.repValue}</span>
            </div>
        </div>
        
        <div style="margin-top: 15px; padding: 10px; background: rgba(0,0,0,0.3); border-radius: 5px; font-size: 0.85em;">
            <strong>Origin:</strong> ${
              material.biome.charAt(0).toUpperCase() + material.biome.slice(1)
            }<br>
            <strong>Discovered:</strong> ${new Date(
              material.discovered
            ).toLocaleTimeString()}<br>
            ${
              material.evolved
                ? `<strong style="color: #e67e22;">⚡ Evolved (${material.mutations.length} mutations)</strong>`
                : ""
            }
        </div>
    `;
}

function displayScientificStats(material) {
  const statsDiv = document.getElementById("scientificStats");
  if (!statsDiv) return;

  statsDiv.innerHTML = Object.keys(SCIENTIFIC_FIELDS)
    .map((fieldKey) => {
      const field = SCIENTIFIC_FIELDS[fieldKey];
      const total = material.fieldTotals[fieldKey];

      return `
            <div class="field-card">
                <h4 style="color: ${field.color}">${field.name}</h4>
                <div class="field-total" title="Sum of 4 subfields below">${total.toFixed(
                  0
                )}% total</div>
                ${field.subfields
                  .map(
                    (subfield) => `
                    <div class="subfield-stat">
                        <span class="subfield-name">${subfield}:</span>
                        <span class="subfield-value">${material.stats[fieldKey][
                          subfield
                        ].toFixed(0)}%</span>
                    </div>
                `
                  )
                  .join("")}
            </div>
        `;
    })
    .join("");
}

function evolveMaterial() {
  if (!state.currentMaterial) {
    alert("No object selected to evolve!");
    return;
  }

  // Only living things can evolve
  if (
    !["plant", "animal", "microorganism"].includes(state.currentMaterial.type)
  ) {
    alert("Only living organisms can evolve!");
    return;
  }

  // Random field to boost
  const fieldKeys = Object.keys(SCIENTIFIC_FIELDS);
  const randomField = fieldKeys[Math.floor(Math.random() * fieldKeys.length)];
  const subfieldKey =
    SCIENTIFIC_FIELDS[randomField].subfields[
      Math.floor(
        Math.random() * SCIENTIFIC_FIELDS[randomField].subfields.length
      )
    ];

  const boost = Math.floor(Math.random() * 15 + 10); // 10-25% boost
  state.currentMaterial.stats[randomField][subfieldKey] = Math.min(
    100,
    state.currentMaterial.stats[randomField][subfieldKey] + boost
  );

  // Recalculate totals
  Object.keys(state.currentMaterial.stats).forEach((field) => {
    state.currentMaterial.fieldTotals[field] = Object.values(
      state.currentMaterial.stats[field]
    ).reduce((a, b) => a + b, 0);
  });

  state.currentMaterial.evolved = true;
  state.currentMaterial.mutations.push({
    field: randomField,
    subfield: subfieldKey,
    boost,
    timestamp: new Date().toISOString(),
  });

  displayMaterial(
    state.currentMaterial,
    document.getElementById("currentMaterial")
  );
  displayScientificStats(state.currentMaterial);
  updateInventory();

  document.getElementById("materialAnalysis").innerHTML = `
        <div style="color: #e67e22; font-weight: bold;">
            ⚡ Evolution Successful!<br>
            <span style="color: ${SCIENTIFIC_FIELDS[randomField].color}">${
    SCIENTIFIC_FIELDS[randomField].name
  }</span> 
            → ${subfieldKey}: +${boost}%<br>
            New total: ${state.currentMaterial.fieldTotals[randomField].toFixed(
              0
            )}%
        </div>
    `;
}

function analyzeMaterial() {
  if (!state.currentMaterial) {
    alert("No object selected to analyze!");
    return;
  }

  const m = state.currentMaterial;
  const analysisDiv = document.getElementById("materialAnalysis");

  // Find strongest fields
  const sortedFields = Object.entries(m.fieldTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Find strongest subfields
  const allSubfields = [];
  Object.keys(m.stats).forEach((field) => {
    Object.entries(m.stats[field]).forEach(([subfield, value]) => {
      allSubfields.push({ field, subfield, value });
    });
  });
  const topSubfields = allSubfields
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // Check tech applicability
  const applicable = [];
  Object.entries(TECH_TREE).forEach(([branch, branchData]) => {
    Object.entries(branchData.techs).forEach(([techKey, tech]) => {
      const meetsReqs = Object.entries(tech.requirements).every(
        ([field, required]) => {
          return m.fieldTotals[field] >= required;
        }
      );

      if (meetsReqs) {
        applicable.push(tech.name);
      }
    });
  });

  analysisDiv.innerHTML = `
        <h4 style="color: var(--primary); margin-bottom: 10px;">Analysis Report: ${
          m.name
        }</h4>
        
        <div style="margin-bottom: 15px;">
            <strong>Strongest Fields:</strong>
            <div style="margin-top: 5px;">
                ${sortedFields
                  .map(
                    ([field, total]) => `
                    <div style="margin: 5px 0;">
                        <span style="color: ${
                          SCIENTIFIC_FIELDS[field].color
                        }">■</span>
                        ${
                          SCIENTIFIC_FIELDS[field].name
                        }: <strong>${total.toFixed(0)}%</strong>
                    </div>
                `
                  )
                  .join("")}
            </div>
        </div>
        
        <div style="margin-bottom: 15px;">
            <strong>Top Subfield Stats:</strong>
            <div style="margin-top: 5px; font-size: 0.9em;">
                ${topSubfields
                  .map(
                    (sf) => `
                    <div style="margin: 3px 0;">
                        ${sf.subfield}: <strong>${sf.value.toFixed(0)}%</strong>
                    </div>
                `
                  )
                  .join("")}
            </div>
        </div>
        
        ${
          applicable.length > 0
            ? `
            <div style="margin-bottom: 15px;">
                <strong style="color: var(--success);">✓ Applicable to Technologies:</strong>
                <div style="margin-top: 5px; color: #2ecc71;">
                    ${applicable.map((tech) => `• ${tech}`).join("<br>")}
                </div>
            </div>
        `
            : `
            <div style="margin-bottom: 15px; color: #95a5a6;">
                No immediate tech applications. Combine with other objects for research.
            </div>
        `
        }
        
        <div style="margin-top: 10px; padding: 10px; background: rgba(46, 204, 113, 0.1); border-left: 3px solid #2ecc71;">
            <strong>Research Value:</strong> This ${m.rarity} ${
    m.type
  } is worth <span class="rep-gain">+${m.repValue} REP</span> when cataloged.
            ${
              m.rarity === "epic" || m.rarity === "legendary"
                ? '<br><strong style="color: #f39c12;">⭐ First discoverer bonus available!</strong>'
                : ""
            }
        </div>
    `;
}

function updateInventory() {
  const inventoryDiv = document.getElementById("materialInventory");
  const countSpan = document.getElementById("inventoryCount");

  countSpan.textContent = state.materials.length;

  // Get current filter
  const activeFilter =
    document.querySelector(".filter-btn.active")?.dataset.filter || "all";
  const filtered = filterMaterialsByType(state.materials, activeFilter);

  inventoryDiv.innerHTML = filtered
    .map((m) => {
      const typeIcons = {
        plant: "🌱",
        animal: "�",
        mineral: "💎",
        crystal: "🔮",
        gas: "💨",
        artifact: "🗿",
        microorganism: "🦠",
        compound: "⚗️",
      };

      const rarityColors = {
        common: "#95a5a6",
        uncommon: "#3498db",
        rare: "#9b59b6",
        epic: "#e67e22",
        legendary: "#f39c12",
      };

      const topField = Object.entries(m.fieldTotals).sort(
        (a, b) => b[1] - a[1]
      )[0];

      return `
            <div class="material-card" onclick="selectMaterial(${m.id})">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <span style="font-weight: bold; color: ${
                      rarityColors[m.rarity]
                    }">
                        ${typeIcons[m.type]} ${m.name}
                    </span>
                    <span style="font-size: 0.8em; color: #95a5a6;">${
                      m.type
                    }</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.85em; align-items: center;">
                    <span style="color: ${
                      SCIENTIFIC_FIELDS[topField[0]].color
                    }">
                        ${
                          SCIENTIFIC_FIELDS[topField[0]].name
                        }: ${topField[1].toFixed(0)}%
                    </span>
                    <span class="rep-gain" style="font-size: 0.9em;">+${
                      m.repValue
                    } REP</span>
                </div>
            </div>
        `;
    })
    .join("");
}

function selectMaterial(materialId) {
  const material = state.materials.find((m) => m.id === materialId);
  if (material) {
    state.currentMaterial = material;
    displayMaterial(material, document.getElementById("currentMaterial"));
    displayScientificStats(material);
    document.getElementById("materialAnalysis").innerHTML = "";
  }
}

function filterInventory(filterType) {
  updateInventory();
}

function filterMaterialsByType(materials, filterType) {
  switch (filterType) {
    case "all":
      return materials;
    case "plant":
      return materials.filter((m) => m.type === "plant");
    case "animal":
      return materials.filter((m) => m.type === "animal");
    case "mineral":
      return materials.filter((m) => m.type === "mineral");
    case "rare":
      return materials.filter(
        (m) =>
          m.rarity === "rare" || m.rarity === "epic" || m.rarity === "legendary"
      );
    default:
      return materials;
  }
}

function displayTechRequirements(branch) {
  const techDiv = document.getElementById("techRequirements");
  if (!techDiv) return;

  const branchData = TECH_TREE[branch];
  if (!branchData) return;

  // Calculate total available stats from inventory
  const availableStats = calculateAvailableStats();

  techDiv.innerHTML = `
        <div style="margin-bottom: 20px; padding: 15px; background: rgba(52, 152, 219, 0.1); border-left: 3px solid #3498db; border-radius: 5px;">
            <h4 style="color: #3498db; margin-bottom: 10px;">📊 How Tech Requirements Work</h4>
            <div style="font-size: 0.9em; line-height: 1.6;">
                <strong>Field Requirements:</strong> Cumulative totals from ALL objects in your inventory.<br>
                <span style="color: #95a5a6;">• Add objects to your research allocation to combine their field stats</span><br>
                <span style="color: #95a5a6;">• Biology 200% needed = sum of all objects' Biology field totals must reach 200%</span><br>
                <br>
                <strong>Specific Requirements:</strong> Highest individual subfield value across any single object.<br>
                <span style="color: #95a5a6;">• Only your best object's value counts for each subfield</span><br>
                <span style="color: #95a5a6;">• Genetic Diversity 80% needed = at least one object must have 80% in that subfield</span><br>
                <br>
                <strong>Unlocking:</strong> ALL requirements must reach 100% (green checkmark ✓)
            </div>
        </div>
        
        <h4 style="margin-bottom: 15px;">${branchData.name} Branch</h4>
        ${Object.entries(branchData.techs)
          .map(([key, tech]) => {
            const requirements = Object.entries(tech.requirements);
            const allMet = requirements.every(
              ([field, required]) => availableStats[field] >= required
            );

            let subfieldStatus = "";
            if (tech.subfieldReqs) {
              const subfieldsMet = Object.entries(tech.subfieldReqs).map(
                ([subfield, required]) => {
                  const available = getHighestSubfieldValue(subfield);
                  const met = available >= required;
                  return { subfield, required, available, met };
                }
              );

              subfieldStatus = `
                    <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--border);">
                        <strong style="font-size: 0.9em;">Specific Requirements:</strong>
                        ${subfieldsMet
                          .map((sf) => {
                            const percentage =
                              sf.required > 0
                                ? ((sf.available / sf.required) * 100).toFixed(
                                    0
                                  )
                                : 0;
                            return `
                                <div class="requirement-item ${
                                  sf.met
                                    ? "requirement-met"
                                    : "requirement-unmet"
                                }">
                                    <span>${sf.subfield}:</span>
                                    <span>${percentage}% ${
                              sf.met ? "✓" : "✗"
                            }</span>
                                </div>
                            `;
                          })
                          .join("")}
                    </div>
                `;
            }

            return `
                <div class="tech-card ${allMet ? "unlockable" : "locked"}">
                    <div class="tech-name">
                        ${allMet ? "✓" : "🔒"} ${tech.name}
                    </div>
                    <div class="tech-requirements-list">
                        ${requirements
                          .map(([field, required]) => {
                            const available = availableStats[field];
                            const met = available >= required;
                            const percentage =
                              required > 0
                                ? ((available / required) * 100).toFixed(0)
                                : 0;
                            return `
                                <div class="requirement-item ${
                                  met ? "requirement-met" : "requirement-unmet"
                                }">
                                    <span style="color: ${
                                      SCIENTIFIC_FIELDS[field].color
                                    }">
                                        ${SCIENTIFIC_FIELDS[field].name}:
                                    </span>
                                    <span>${percentage}% ${
                              met ? "✓" : "✗"
                            }</span>
                                </div>
                            `;
                          })
                          .join("")}
                    </div>
                    ${subfieldStatus}
                </div>
            `;
          })
          .join("")}
    `;
}

function calculateAvailableStats() {
  const totals = {};
  Object.keys(SCIENTIFIC_FIELDS).forEach((field) => {
    totals[field] = 0;
  });

  state.materials.forEach((material) => {
    Object.keys(material.fieldTotals).forEach((field) => {
      totals[field] += material.fieldTotals[field];
    });
  });

  return totals;
}

function getHighestSubfieldValue(subfieldName) {
  let highest = 0;

  state.materials.forEach((material) => {
    Object.keys(material.stats).forEach((field) => {
      if (material.stats[field][subfieldName] !== undefined) {
        highest = Math.max(highest, material.stats[field][subfieldName]);
      }
    });
  });

  return highest;
}

function calculateResearch() {
  const resultsDiv = document.getElementById("researchResults");
  if (!resultsDiv) return;

  const available = calculateAvailableStats();
  const unlockedTechs = [];

  Object.entries(TECH_TREE).forEach(([branch, branchData]) => {
    Object.entries(branchData.techs).forEach(([key, tech]) => {
      const meetsReqs = Object.entries(tech.requirements).every(
        ([field, required]) => {
          return available[field] >= required;
        }
      );

      let meetsSubfields = true;
      if (tech.subfieldReqs) {
        meetsSubfields = Object.entries(tech.subfieldReqs).every(
          ([subfield, required]) => {
            return getHighestSubfieldValue(subfield) >= required;
          }
        );
      }

      if (meetsReqs && meetsSubfields) {
        unlockedTechs.push(tech.name);
      }
    });
  });

  const totalREP = state.materials.reduce((sum, m) => sum + m.repValue, 0);

  resultsDiv.innerHTML = `
        <div class="research-results">
            <h4 style="color: var(--success); margin-bottom: 10px;">Research Results</h4>
            <div style="margin-bottom: 10px;">
                <strong>Total Objects Allocated:</strong> ${
                  state.materials.length
                }
            </div>
            <div style="margin-bottom: 10px;">
                <strong>Combined REP Value:</strong> <span class="rep-gain">+${totalREP}</span>
            </div>
            <div style="margin-bottom: 10px;">
                <strong>Technologies Unlocked:</strong> ${unlockedTechs.length}
            </div>
            ${
              unlockedTechs.length > 0
                ? `
                <div style="margin-top: 10px; padding: 10px; background: rgba(46, 204, 113, 0.2); border-radius: 5px;">
                    ${unlockedTechs
                      .map((tech) => `<div>✓ ${tech}</div>`)
                      .join("")}
                </div>
            `
                : `
                <div style="margin-top: 10px; color: #95a5a6;">
                    No technologies unlocked yet. Keep exploring to find more objects!
                </div>
            `
            }
        </div>
    `;
}

// Reward System
function initRewardSystem() {
  const generateBtn = document.getElementById("generateReward");
  const raritySelect = document.getElementById("raritySelect");
  const discoveryCount = document.getElementById("discoveryCount");
  const rewardDisplay = document.getElementById("rewardDisplay");
  const clearBtn = document.getElementById("clearLog");

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      state.rewards = [];
      updateRewardStats();
      document.getElementById("discoveryLog").innerHTML =
        '<p style="color: #95a5a6; font-style: italic;">No discoveries yet. Start generating rewards above.</p>';
    });
  }

  if (generateBtn) {
    generateBtn.addEventListener("click", () => {
      const rarity = raritySelect.value;
      const globalCount = parseInt(discoveryCount.value);
      const reward = generateReward(rarity, globalCount);

      displayReward(reward, rewardDisplay);
      displayComparison(reward);
      state.rewards.push(reward);
      updateRewardStats();
      logDiscovery(reward);
    });
  }
}

function generateReward(rarity, globalCount) {
  const rewards = {
    common: {
      base: 20,
      types: ["Blueprint Shard", "Catalyst Sample", "Data Fragment"],
    },
    uncommon: {
      base: 50,
      types: ["Refined Catalyst", "Complete Blueprint", "Specimen Card"],
    },
    rare: { base: 100, types: ["Artifact", "Advanced Blueprint", "Data Core"] },
    unique: {
      base: 250,
      types: ["Ancient Relic", "Legendary Blueprint", "Precursor Artifact"],
    },
  };

  const rewardData = rewards[rarity];
  const type =
    rewardData.types[Math.floor(Math.random() * rewardData.types.length)];

  // First discoverer bonus
  const firstDiscovererBonus = globalCount === 0 ? 2 : 1;

  // Diminishing returns for common discoveries
  const rarityMultiplier = Math.max(0.1, 1 - globalCount * 0.05);

  const repGain = Math.floor(
    rewardData.base * firstDiscovererBonus * rarityMultiplier
  );

  return {
    type,
    rarity,
    repGain,
    globalCount,
    isFirstDiscoverer: globalCount === 0,
    baseREP: rewardData.base,
    multiplier: rarityMultiplier,
    timestamp: Date.now(),
  };
}

function displayReward(reward, container) {
  const rarityColors = {
    common: "#95a5a6",
    uncommon: "#3498db",
    rare: "#9b59b6",
    unique: "#f39c12",
  };

  container.innerHTML = `
        <div class="reward-item" style="border: 2px solid ${
          rarityColors[reward.rarity]
        }; background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; margin-top: 15px;">
            <h4 style="color: ${rarityColors[reward.rarity]}; margin-top: 0;">${
    reward.type
  }</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.9em;">
                <div><strong>Rarity:</strong> ${reward.rarity.toUpperCase()}</div>
                <div><strong>Global Count:</strong> ${reward.globalCount}</div>
                <div><strong>Base REP:</strong> ${reward.baseREP}</div>
                <div><strong>Multiplier:</strong> ${(
                  reward.multiplier * 100
                ).toFixed(0)}%</div>
            </div>
            ${
              reward.isFirstDiscoverer
                ? '<p style="color: #f39c12; margin: 10px 0; font-weight: bold;">⭐ FIRST DISCOVERER BONUS! (2x REP)</p>'
                : ""
            }
            <div style="text-align: center; margin-top: 15px; padding: 15px; background: rgba(46, 204, 113, 0.2); border-radius: 5px;">
                <div style="font-size: 0.9em; color: #95a5a6;">Total REP Earned</div>
                <div class="rep-gain" style="font-size: 2em; color: #2ecc71; font-weight: bold;">+${
                  reward.repGain
                }</div>
            </div>
        </div>
    `;
}

function displayComparison(reward) {
  const comparisonDiv = document.getElementById("comparisonDisplay");
  if (!comparisonDiv) return;

  const rarityColors = {
    common: "#95a5a6",
    uncommon: "#3498db",
    rare: "#9b59b6",
    unique: "#f39c12",
  };

  // Calculate what this would be worth at different discovery counts
  const scenarios = [
    { count: 0, label: "First Discovery" },
    { count: 5, label: "After 5 Finds" },
    { count: 10, label: "After 10 Finds" },
    { count: 20, label: "After 20 Finds" },
  ];

  const comparisons = scenarios.map((scenario) => {
    const mult = scenario.count === 0 ? 2 : 1;
    const dimReturns = Math.max(0.1, 1 - scenario.count * 0.05);
    const rep = Math.floor(reward.baseREP * mult * dimReturns);
    return { ...scenario, rep };
  });

  comparisonDiv.innerHTML = `
        <div style="font-size: 0.9em; margin-bottom: 10px; color: #95a5a6;">
            REP value for <strong style="color: ${
              rarityColors[reward.rarity]
            }">${reward.rarity.toUpperCase()}</strong> discoveries:
        </div>
        ${comparisons
          .map(
            (c) => `
            <div style="display: flex; justify-content: space-between; padding: 8px; background: rgba(0,0,0,0.2); margin-bottom: 5px; border-radius: 3px;">
                <span>${c.label}:</span>
                <span style="color: #2ecc71; font-weight: bold;">+${c.rep} REP</span>
            </div>
        `
          )
          .join("")}
        <div style="margin-top: 15px; padding: 10px; background: rgba(52, 152, 219, 0.1); border-radius: 5px; font-size: 0.85em;">
            <strong>💡 Insight:</strong> Diminishing returns encourage finding NEW species rather than farming the same location repeatedly.
        </div>
    `;
}

function updateRewardStats() {
  const counts = { common: 0, uncommon: 0, rare: 0, unique: 0 };
  let totalREP = 0;

  state.rewards.forEach((r) => {
    counts[r.rarity]++;
    totalREP += r.repGain;
  });

  document.getElementById("totalCommon").textContent = counts.common;
  document.getElementById("totalUncommon").textContent = counts.uncommon;
  document.getElementById("totalRare").textContent = counts.rare;
  document.getElementById("totalUnique").textContent = counts.unique;
  document.getElementById("totalREP").textContent = totalREP;

  const avgREP =
    state.rewards.length > 0 ? Math.floor(totalREP / state.rewards.length) : 0;
  document.getElementById("avgREP").textContent = avgREP;
}

function logDiscovery(reward) {
  const logDiv = document.getElementById("discoveryLog");
  if (!logDiv) return;

  const rarityColors = {
    common: "#95a5a6",
    uncommon: "#3498db",
    rare: "#9b59b6",
    unique: "#f39c12",
  };

  const time = new Date(reward.timestamp).toLocaleTimeString();
  const entry = document.createElement("div");
  entry.style.cssText =
    "padding: 8px; margin-bottom: 5px; background: rgba(0,0,0,0.3); border-radius: 5px; border-left: 3px solid " +
    rarityColors[reward.rarity];
  entry.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="color: ${
              rarityColors[reward.rarity]
            }; font-weight: bold;">${reward.type}</span>
            <span style="color: #2ecc71;">+${reward.repGain} REP</span>
        </div>
        <div style="font-size: 0.8em; color: #95a5a6; margin-top: 3px;">
            ${time} • ${reward.rarity} • Discovery #${reward.globalCount + 1}
            ${reward.isFirstDiscoverer ? " • ⭐ First Discovery" : ""}
        </div>
    `;

  if (logDiv.firstChild && logDiv.firstChild.tagName === "P") {
    logDiv.innerHTML = "";
  }

  logDiv.insertBefore(entry, logDiv.firstChild);
}

// Ecology Simulator
function initEcologySimulator() {
  const canvas = document.getElementById("ecologyCanvas");
  const ctx = canvas.getContext("2d");

  const advanceBtn = document.getElementById("advanceTime");
  const advanceDayBtn = document.getElementById("advanceDay");
  const harvestBtn = document.getElementById("harvestResource");
  const resetBtn = document.getElementById("resetEcology");

  drawEcology(ctx, canvas);
  updateEcologyStats();

  advanceBtn.addEventListener("click", () => {
    advanceTime();
    drawEcology(ctx, canvas);
    updateEcologyStats();
  });

  advanceDayBtn.addEventListener("click", () => {
    for (let i = 0; i < 24; i++) {
      advanceTime(true);
    }
    addEcologyLog(
      "⏰ Full day cycle completed. Ecosystem recovered significantly."
    );
    drawEcology(ctx, canvas);
    updateEcologyStats();
  });

  harvestBtn.addEventListener("click", () => {
    harvestResource();
    drawEcology(ctx, canvas);
    updateEcologyStats();
  });

  resetBtn.addEventListener("click", () => {
    resetEcology();
    drawEcology(ctx, canvas);
    updateEcologyStats();
  });
}

function advanceTime(silent = false) {
  state.ecology.timeOfDay = (state.ecology.timeOfDay + 1) % 24;
  state.ecology.totalHours++;

  // Temperature varies with time
  const tempVariation =
    Math.sin((state.ecology.timeOfDay / 24) * Math.PI * 2) * 15;
  state.ecology.temperature = 20 + tempVariation;

  // Fauna activity increases at dusk/dawn
  if (state.ecology.timeOfDay >= 18 || state.ecology.timeOfDay <= 6) {
    state.ecology.faunaActivity = Math.min(
      100,
      state.ecology.faunaActivity + 5
    );
  } else {
    state.ecology.faunaActivity = Math.max(20, state.ecology.faunaActivity - 3);
  }

  // Recovery rate depends on world health
  const recoveryRate = state.ecology.worldHealth > 50 ? 2 : 1;

  // Flora slowly recovers
  if (state.ecology.floraDensity < 100) {
    state.ecology.floraDensity = Math.min(
      100,
      state.ecology.floraDensity + recoveryRate
    );
    state.ecology.worldHealth = Math.min(
      100,
      state.ecology.worldHealth + recoveryRate * 0.5
    );
  }

  // Reduce harvest penalty over time
  if (state.ecology.harvestCount > 0 && state.ecology.timeOfDay === 0) {
    state.ecology.harvestCount = Math.max(0, state.ecology.harvestCount - 1);
  }

  if (!silent) {
    addEcologyLog(
      `Time advanced to ${
        state.ecology.timeOfDay
      }:00. Temperature: ${state.ecology.temperature.toFixed(1)}°C`
    );
  }
}

function harvestResource() {
  state.ecology.harvestCount++;
  const harvestPenalty = Math.min(25, 10 + state.ecology.harvestCount * 2);

  state.ecology.floraDensity = Math.max(
    0,
    state.ecology.floraDensity - harvestPenalty
  );
  state.ecology.worldHealth = Math.max(0, state.ecology.worldHealth - 10);

  if (state.ecology.harvestCount > 5) {
    state.ecology.faunaActivity = Math.max(0, state.ecology.faunaActivity - 10);
    addEcologyLog("⚠️ Overharvesting detected! Fauna migrating away.");
  } else if (state.ecology.harvestCount > 3) {
    addEcologyLog(
      "⚠️ Ecosystem stress increasing. Consider waiting for recovery."
    );
  } else {
    addEcologyLog(
      `Resource harvested. Flora density: ${state.ecology.floraDensity.toFixed(
        0
      )}%`
    );
  }
}

function resetEcology() {
  state.ecology = {
    temperature: 20,
    radiation: 30,
    floraDensity: 75,
    faunaActivity: 50,
    worldHealth: 100,
    timeOfDay: 12,
    harvestCount: 0,
    totalHours: 0,
    log: [],
  };
  addEcologyLog("Ecosystem reset to default state.");
}

function drawEcology(ctx, canvas) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background gradient (time-based)
  const isDaytime =
    state.ecology.timeOfDay >= 6 && state.ecology.timeOfDay <= 18;
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);

  if (isDaytime) {
    gradient.addColorStop(0, "#87CEEB");
    gradient.addColorStop(1, "#98D98E");
  } else {
    gradient.addColorStop(0, "#1a1a2e");
    gradient.addColorStop(1, "#16213e");
  }

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw flora
  const floraCount = Math.floor((state.ecology.floraDensity / 100) * 50);
  ctx.fillStyle = "#2ecc71";
  for (let i = 0; i < floraCount; i++) {
    const x = (i * 8) % canvas.width;
    const y = canvas.height - 20 - Math.random() * 30;
    ctx.fillRect(x, y, 3, 20);
  }

  // Draw fauna
  const faunaCount = Math.floor((state.ecology.faunaActivity / 100) * 20);
  ctx.fillStyle = "#f39c12";
  for (let i = 0; i < faunaCount; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * (canvas.height - 50);
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw time indicator
  ctx.fillStyle = "#ecf0f1";
  ctx.font = "16px Arial";
  ctx.fillText(`Time: ${state.ecology.timeOfDay}:00`, 10, 20);
}

function updateEcologyStats() {
  document.getElementById(
    "tempValue"
  ).textContent = `${state.ecology.temperature.toFixed(1)}°C`;
  document.getElementById("tempBar").style.width = `${Math.min(
    100,
    ((state.ecology.temperature + 20) / 60) * 100
  )}%`;

  document.getElementById("radValue").textContent =
    state.ecology.radiation < 50 ? "Low" : "High";
  document.getElementById("radBar").style.width = `${state.ecology.radiation}%`;

  document.getElementById(
    "floraValue"
  ).textContent = `${state.ecology.floraDensity.toFixed(0)}%`;
  document.getElementById(
    "floraBar"
  ).style.width = `${state.ecology.floraDensity}%`;

  const activityLevel =
    state.ecology.faunaActivity < 30
      ? "Low"
      : state.ecology.faunaActivity < 70
      ? "Medium"
      : "High";
  document.getElementById("faunaValue").textContent = activityLevel;
  document.getElementById(
    "faunaBar"
  ).style.width = `${state.ecology.faunaActivity}%`;

  document.getElementById(
    "healthValue"
  ).textContent = `${state.ecology.worldHealth.toFixed(0)}%`;
  document.getElementById(
    "healthBar"
  ).style.width = `${state.ecology.worldHealth}%`;

  // Update harvest impact stats
  document.getElementById("harvestCount").textContent =
    state.ecology.harvestCount;

  // Calculate recovery time needed
  const healthDeficit = 100 - state.ecology.worldHealth;
  const recoveryHours = Math.ceil(healthDeficit / 0.5);
  document.getElementById("recoveryTime").textContent = `${recoveryHours} hrs`;

  // Update warning message
  const warningEl = document.getElementById("harvestWarning");
  if (state.ecology.worldHealth < 30) {
    warningEl.textContent =
      "🔴 Critical ecosystem damage! Stop harvesting immediately.";
    warningEl.style.borderLeftColor = "var(--danger)";
    warningEl.style.background = "rgba(231, 76, 60, 0.15)";
  } else if (state.ecology.worldHealth < 60) {
    warningEl.textContent =
      "⚠️ Ecosystem stressed. Reduce harvesting frequency.";
    warningEl.style.borderLeftColor = "var(--warning)";
    warningEl.style.background = "rgba(241, 196, 15, 0.1)";
  } else if (state.ecology.harvestCount > 3) {
    warningEl.textContent =
      "⚡ Frequent harvesting detected. Consider moving to new location.";
    warningEl.style.borderLeftColor = "#3498db";
    warningEl.style.background = "rgba(52, 152, 219, 0.1)";
  } else {
    warningEl.textContent =
      "✅ Ecosystem stable. Sustainable harvesting possible.";
    warningEl.style.borderLeftColor = "var(--success)";
    warningEl.style.background = "rgba(46, 204, 113, 0.1)";
  }
}

function addEcologyLog(message) {
    state.ecology.log.unshift(`[${new Date().toLocaleTimeString()}] ${message}`);
    state.ecology.log = state.ecology.log.slice(0, 10);
    
    const logContainer = document.getElementById('ecologyLog');
    logContainer.innerHTML = state.ecology.log.map(log => `<div>${log}</div>`).join('');
}

// Mystery Budget
function initMysteryBudget() {
    const generateBtn = document.getElementById('generateMystery');
    const biomeSelect = document.getElementById('biomeType');
    const canvas = document.getElementById('mysteryCanvas');
    const statsDiv = document.getElementById('mysteryStats');
    
    generateBtn.addEventListener('click', () => {
        const biome = biomeSelect.value;
        const budget = generateMysteryBudget(biome);
        drawMysteryMap(canvas, budget);
        displayMysteryStats(statsDiv, budget);
    });
}

function generateMysteryBudget(biome) {
    const budget = {
        biome,
        landmarks: [],
        microPoints: [],
        occludedSecrets: []
    };
    
    // Generate 2-3 landmarks
    for (let i = 0; i < 2 + Math.floor(Math.random() * 2); i++) {
        budget.landmarks.push({
            x: Math.random() * 600,
            y: Math.random() * 400,
            type: ['Peak', 'Crater', 'Tower', 'Monument'][Math.floor(Math.random() * 4)]
        });
    }
    
    // Generate 15-25 micro points
    for (let i = 0; i < 15 + Math.floor(Math.random() * 11); i++) {
        budget.microPoints.push({
            x: Math.random() * 600,
            y: Math.random() * 400,
            type: ['Glow', 'Nest', 'Ruin', 'Crystal'][Math.floor(Math.random() * 4)]
        });
    }
    
    // Generate 3-5 occluded secrets
    for (let i = 0; i < 3 + Math.floor(Math.random() * 3); i++) {
        budget.occludedSecrets.push({
            x: Math.random() * 600,
            y: Math.random() * 400,
            revealed: false
        });
    }
    
    return budget;
}

function drawMysteryMap(canvas, budget) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Background
    const biomeColors = {
        volcanic: ['#e74c3c', '#c0392b'],
        arctic: ['#ecf0f1', '#bdc3c7'],
        forest: ['#27ae60', '#229954'],
        desert: ['#f39c12', '#d68910'],
        ocean: ['#3498db', '#2980b9']
    };
    
    const colors = biomeColors[budget.biome];
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, colors[0]);
    gradient.addColorStop(1, colors[1]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw landmarks (large)
    budget.landmarks.forEach(landmark => {
        ctx.fillStyle = '#f39c12';
        ctx.beginPath();
        ctx.arc(landmark.x, landmark.y, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.fillStyle = '#fff';
        ctx.font = '10px Arial';
        ctx.fillText(landmark.type, landmark.x - 15, landmark.y + 25);
    });
    
    // Draw micro points (small)
    budget.microPoints.forEach(point => {
        ctx.fillStyle = '#2ecc71';
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        ctx.fill();
    });
    
    // Draw occluded secrets (hidden until revealed)
    budget.occludedSecrets.forEach(secret => {
        ctx.fillStyle = secret.revealed ? '#9b59b6' : 'rgba(155, 89, 182, 0.3)';
        ctx.beginPath();
        ctx.arc(secret.x, secret.y, 8, 0, Math.PI * 2);
        ctx.fill();
        
        if (!secret.revealed) {
            ctx.strokeStyle = '#9b59b6';
            ctx.setLineDash([2, 2]);
            ctx.stroke();
            ctx.setLineDash([]);
        }
    });
    
    // Legend
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px Arial';
    ctx.fillText('🟡 Landmarks', 10, 20);
    ctx.fillText('🟢 Micro Points', 10, 40);
    ctx.fillText('🟣 Occluded Secrets', 10, 60);
}

function displayMysteryStats(container, budget) {
    container.innerHTML = `
        <div style="margin-bottom: 10px;">
            <strong>Biome:</strong> ${budget.biome.toUpperCase()}
        </div>
        <div style="margin-bottom: 10px;">
            <strong>Landmarks:</strong> ${budget.landmarks.length}
            <ul style="margin-left: 20px; margin-top: 5px;">
                ${budget.landmarks.map(l => `<li>${l.type}</li>`).join('')}
            </ul>
        </div>
        <div style="margin-bottom: 10px;">
            <strong>Micro Points:</strong> ${budget.microPoints.length}
        </div>
        <div style="margin-bottom: 10px;">
            <strong>Occluded Secrets:</strong> ${budget.occludedSecrets.length}
        </div>
        <div style="margin-top: 15px; padding: 10px; background: rgba(0,0,0,0.3); border-radius: 5px;">
            <strong>Mystery Quota:</strong> ${(budget.occludedSecrets.length / 10).toFixed(1)} surprises per 10 min travel
        </div>
    `;
}

// Loop Timer
function initLoopTimer() {
    const phases = document.querySelectorAll('.loop-phase');
    
    phases.forEach((phase, index) => {
        const btn = phase.querySelector('.phase-btn');
        const timeDisplay = phase.querySelector('.phase-time');
        
        btn.addEventListener('click', () => {
            if (index === state.currentPhase) {
                startPhase(index, phase, timeDisplay);
            }
        });
    });
}

function startPhase(index, phaseElement, timeDisplay) {
    state.phaseStartTime = Date.now();
    
    const phaseNames = ['detect', 'approach', 'interact', 'reward', 'record'];
    const phaseName = phaseNames[index];
    
    const timer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - state.phaseStartTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
    
    phaseElement.querySelector('.phase-btn').textContent = 'Complete Phase';
    phaseElement.querySelector('.phase-btn').onclick = () => {
        clearInterval(timer);
        const elapsed = Math.floor((Date.now() - state.phaseStartTime) / 1000);
        state.loopTimers[phaseName] = elapsed;
        
        phaseElement.classList.add('completed');
        phaseElement.classList.remove('active');
        
        if (index < 4) {
            state.currentPhase = index + 1;
            document.querySelectorAll('.loop-phase')[index + 1].classList.add('active');
        } else {
            completeLoop();
        }
    };
}

function completeLoop() {
    const totalTime = Object.values(state.loopTimers).reduce((a, b) => a + b, 0);
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;
    
    const targetMin = 5 * 60;
    const targetMax = 8 * 60;
    const isOptimal = totalTime >= targetMin && totalTime <= targetMax;
    
    const resultsDiv = document.getElementById('loopResults');
    resultsDiv.innerHTML = `
        <div class="reward-item" style="border-color: ${isOptimal ? '#2ecc71' : '#f39c12'}">
            <h4>Loop Complete!</h4>
            <p><strong>Total Time:</strong> ${minutes}:${seconds.toString().padStart(2, '0')}</p>
            <p><strong>Target Range:</strong> 5:00 - 8:00</p>
            <p style="color: ${isOptimal ? '#2ecc71' : '#f39c12'}">
                ${isOptimal ? '✓ Optimal pacing!' : '⚠ Outside optimal range'}
            </p>
            <div style="margin-top: 10px;">
                <strong>Phase Breakdown:</strong>
                <ul style="margin-left: 20px; margin-top: 5px;">
                    ${Object.entries(state.loopTimers).map(([phase, time]) => 
                        `<li>${phase}: ${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}</li>`
                    ).join('')}
                </ul>
            </div>
        </div>
    `;
    
    // Update metrics
    state.metrics.loopTime = totalTime;
    updateMetric('loopTime', totalTime, targetMin, targetMax);
    
    // Reset for next loop
    setTimeout(() => {
        state.currentPhase = 0;
        state.loopTimers = { detect: 0, approach: 0, interact: 0, reward: 0, record: 0 };
        document.querySelectorAll('.loop-phase').forEach((p, i) => {
            p.classList.remove('active', 'completed');
            p.querySelector('.phase-time').textContent = '0:00';
            if (i === 0) p.classList.add('active');
        });
    }, 3000);
}

// Metrics Dashboard
function initMetricsDashboard() {
    const exportBtn = document.getElementById('exportMetrics');
    const resetBtn = document.getElementById('resetMetrics');
    
    document.querySelectorAll('.metric-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const metric = btn.dataset.metric;
            simulateMetric(metric);
        });
    });
    
    exportBtn.addEventListener('click', exportMetrics);
    resetBtn.addEventListener('click', resetMetrics);
    
    updateMetricsDisplay();
}

function simulateMetric(metric) {
    switch (metric) {
        case 'curiosity':
            state.metrics.curiosity = Math.min(100, state.metrics.curiosity + Math.random() * 15);
            updateMetric('curiosity', state.metrics.curiosity, 25, 100);
            break;
        case 'souvenir':
            state.metrics.souvenirs++;
            updateMetric('souvenir', state.metrics.souvenirs, 1, 5);
            break;
        case 'predictive':
            state.metrics.predictions.total++;
            if (Math.random() > 0.4) state.metrics.predictions.correct++;
            const successRate = (state.metrics.predictions.correct / state.metrics.predictions.total) * 100;
            updateMetric('predictive', successRate, 60, 100);
            break;
    }
    
    state.metrics.history.push({
        timestamp: Date.now(),
        metric,
        value: state.metrics[metric]
    });
    
    updateMetricsChart();
}

function updateMetric(metric, value, target, max) {
    const displays = {
        curiosity: { value: 'curiosityMetric', fill: 'curiosityFill', format: v => `${v.toFixed(1)}%` },
        loopTime: { value: 'loopTimeMetric', fill: 'loopTimeFill', format: v => {
            const m = Math.floor(v / 60);
            const s = v % 60;
            return `${m}:${s.toString().padStart(2, '0')}`;
        }},
        souvenir: { value: 'souvenirMetric', fill: 'souvenirFill', format: v => `${v}/15min` },
        predictive: { value: 'predictiveMetric', fill: 'predictiveFill', format: v => `${v.toFixed(1)}%` }
    };
    
    const display = displays[metric];
    if (display) {
        document.getElementById(display.value).textContent = display.format(value);
        const percentage = Math.min(100, (value / max) * 100);
        document.getElementById(display.fill).style.width = `${percentage}%`;
    }
}

function updateMetricsDisplay() {
    updateMetric('curiosity', state.metrics.curiosity, 25, 100);
    updateMetric('loopTime', state.metrics.loopTime, 300, 480);
    updateMetric('souvenir', state.metrics.souvenirs, 1, 5);
    
    if (state.metrics.predictions.total > 0) {
        const successRate = (state.metrics.predictions.correct / state.metrics.predictions.total) * 100;
        updateMetric('predictive', successRate, 60, 100);
    }
}

function updateMetricsChart() {
    const canvas = document.getElementById('metricsChart');
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (state.metrics.history.length === 0) return;
    
    const data = state.metrics.history.slice(-20);
    const maxValue = Math.max(...data.map(d => typeof d.value === 'number' ? d.value : 0));
    
    ctx.strokeStyle = '#4a90e2';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    data.forEach((point, i) => {
        const x = (i / (data.length - 1)) * (canvas.width - 40) + 20;
        const y = canvas.height - 20 - ((point.value / maxValue) * (canvas.height - 40));
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
}

function exportMetrics() {
    const data = {
        metrics: state.metrics,
        rewards: state.rewards,
        ecology: state.ecology,
        loopTimers: state.loopTimers,
        timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `exploration-metrics-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function resetMetrics() {
    if (confirm('Reset all metrics data?')) {
        state.metrics = {
            curiosity: 0,
            loopTime: 0,
            souvenirs: 0,
            predictions: { total: 0, correct: 0 },
            history: []
        };
        state.rewards = [];
        updateMetricsDisplay();
        updateMetricsChart();
    }
}
