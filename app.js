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
  settings: {
    statPools: {
      common: 300,
      uncommon: 450,
      rare: 600,
      epic: 800,
      legendary: 1000,
    },
    dropRates: {
      common: 60,
      uncommon: 25,
      rare: 10,
      unique: 5,
    },
    repValues: {
      common: 20,
      uncommon: 50,
      rare: 100,
      unique: 250,
    },
    firstDiscovererMultiplier: 2,
    diminishingReturnsRate: 5,
    repFloor: 10,
    ecology: {
      floraRegenRate: 2,
      faunaRegenRate: 1.5,
      healthRegenRate: 1,
      floraLossPerHarvest: 8,
      faunaLossPerHarvest: 5,
      healthLossPerHarvest: 3,
      criticalThreshold: 30,
      stressedThreshold: 60,
      frequentHarvestWarning: 5,
    },
    mysteryBudget: {
      sparse: { landmarks: [1, 2], microPoints: [8, 12], secrets: [2, 3] },
      normal: { landmarks: [2, 3], microPoints: [15, 25], secrets: [3, 5] },
      dense: { landmarks: [3, 5], microPoints: [30, 40], secrets: [5, 8] },
    },
    mutation: {
      minBoost: 10,
      maxBoost: 25,
      allowMultiple: true,
    },
    loopTargets: {
      microMin: 5,
      microMax: 8,
      macroMin: 60,
      macroMax: 120,
    },
    metricsTargets: {
      curiosity: 25,
      souvenirTime: 15,
      predictive: 60,
      parityTolerance: 12,
    },
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
  initializeSettings();
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
    const rarityRoll = Math.random() * 100;
    const { common, uncommon, rare } = state.settings.dropRates;

    if (rarityRoll < common) rarity = "common";
    else if (rarityRoll < common + uncommon) rarity = "uncommon";
    else if (rarityRoll < common + uncommon + rare) rarity = "rare";
    else if (rarityRoll < 97) rarity = "epic";
    else rarity = "legendary";
  }

  // Stat pool based on rarity
  // Use settings-based stat pools
  const totalStatPool = state.settings.statPools[rarity];

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

  // Calculate REP value using settings
  const repValue = Math.floor(
    state.settings.repValues[rarity] *
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

  const boost = Math.floor(
    Math.random() *
      (state.settings.mutation.maxBoost - state.settings.mutation.minBoost) +
      state.settings.mutation.minBoost
  ); // Use settings for mutation range
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
      base: state.settings.repValues.common,
      types: ["Blueprint Shard", "Catalyst Sample", "Data Fragment"],
    },
    uncommon: {
      base: state.settings.repValues.uncommon,
      types: ["Refined Catalyst", "Complete Blueprint", "Specimen Card"],
    },
    rare: {
      base: state.settings.repValues.rare,
      types: ["Artifact", "Advanced Blueprint", "Data Core"],
    },
    unique: {
      base: state.settings.repValues.unique,
      types: ["Ancient Relic", "Legendary Blueprint", "Precursor Artifact"],
    },
  };

  const rewardData = rewards[rarity];
  const type =
    rewardData.types[Math.floor(Math.random() * rewardData.types.length)];

  // First discoverer bonus using settings
  const firstDiscovererBonus =
    globalCount === 0 ? state.settings.firstDiscovererMultiplier : 1;

  // Diminishing returns for common discoveries using settings
  const diminishingRate = state.settings.diminishingReturnsRate / 100;
  const minMultiplier = state.settings.repFloor / 100;
  const rarityMultiplier = Math.max(
    minMultiplier,
    1 - globalCount * diminishingRate
  );

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

  // Recovery rate depends on world health (use settings)
  const baseRecoveryRate =
    state.ecology.worldHealth > 50
      ? state.settings.ecology.floraRegenRate
      : state.settings.ecology.floraRegenRate * 0.5;

  // Flora slowly recovers
  if (state.ecology.floraDensity < 100) {
    state.ecology.floraDensity = Math.min(
      100,
      state.ecology.floraDensity + baseRecoveryRate
    );
    state.ecology.worldHealth = Math.min(
      100,
      state.ecology.worldHealth + state.settings.ecology.healthRegenRate
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

  // Use settings for harvest impact
  state.ecology.floraDensity = Math.max(
    0,
    state.ecology.floraDensity - state.settings.ecology.floraLossPerHarvest
  );
  state.ecology.worldHealth = Math.max(
    0,
    state.ecology.worldHealth - state.settings.ecology.healthLossPerHarvest
  );

  // Use settings for frequent harvest warning threshold
  if (
    state.ecology.harvestCount > state.settings.ecology.frequentHarvestWarning
  ) {
    state.ecology.faunaActivity = Math.max(
      0,
      state.ecology.faunaActivity -
        state.settings.ecology.faunaLossPerHarvest * 2
    );
    addEcologyLog("⚠️ Overharvesting detected! Fauna migrating away.");
  } else if (
    state.ecology.harvestCount >
    Math.floor(state.settings.ecology.frequentHarvestWarning * 0.6)
  ) {
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

  const logContainer = document.getElementById("ecologyLog");
  logContainer.innerHTML = state.ecology.log
    .map((log) => `<div>${log}</div>`)
    .join("");
}

// Mystery Budget
let currentMysteryBudget = null;

function initMysteryBudget() {
  const generateBtn = document.getElementById("generateMystery");
  const revealBtn = document.getElementById("revealSecrets");
  const exportBtn = document.getElementById("exportMap");
  const biomeSelect = document.getElementById("biomeType");
  const densitySelect = document.getElementById("densityLevel");
  const canvas = document.getElementById("mysteryCanvas");
  const statsDiv = document.getElementById("mysteryStats");

  generateBtn.addEventListener("click", () => {
    const biome = biomeSelect.value;
    const density = densitySelect.value;
    currentMysteryBudget = generateMysteryBudget(biome, density);
    drawMysteryMap(canvas, currentMysteryBudget);
    displayMysteryStats(statsDiv, currentMysteryBudget);
  });

  revealBtn.addEventListener("click", () => {
    if (currentMysteryBudget) {
      currentMysteryBudget.occludedSecrets.forEach(
        (secret) => (secret.revealed = true)
      );
      drawMysteryMap(canvas, currentMysteryBudget);
      displayMysteryStats(statsDiv, currentMysteryBudget);
    }
  });

  exportBtn.addEventListener("click", () => {
    if (currentMysteryBudget) {
      const dataStr = JSON.stringify(currentMysteryBudget, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `mystery_budget_${
        currentMysteryBudget.biome
      }_${Date.now()}.json`;
      link.click();
      URL.revokeObjectURL(url);
    }
  });

  // Make secrets clickable to reveal
  canvas.addEventListener("click", (e) => {
    if (!currentMysteryBudget) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    currentMysteryBudget.occludedSecrets.forEach((secret) => {
      const dist = Math.sqrt((x - secret.x) ** 2 + (y - secret.y) ** 2);
      if (dist < 12 && !secret.revealed) {
        secret.revealed = true;
        drawMysteryMap(canvas, currentMysteryBudget);
        displayMysteryStats(statsDiv, currentMysteryBudget);
      }
    });
  });
}

function generateMysteryBudget(biome, density = "normal") {
  const densityMultipliers = {
    sparse: 0.6,
    normal: 1.0,
    dense: 1.5,
  };
  const mult = densityMultipliers[density];

  const budget = {
    biome,
    density,
    landmarks: [],
    microPoints: [],
    occludedSecrets: [],
    totalArea: 600 * 400,
    generatedAt: new Date().toISOString(),
  };

  // Biome-specific landmark types
  const biomeData = {
    volcanic: {
      landmarks: ["Lava Peak", "Caldera", "Geothermal Vent", "Obsidian Tower"],
      microPoints: [
        "Sulfur Crystal",
        "Thermal Glow",
        "Magma Pool",
        "Ash Formation",
      ],
      secrets: ["Ancient Lava Tube", "Cooling Chamber", "Mineral Vein"],
    },
    arctic: {
      landmarks: ["Ice Spire", "Glacier", "Frozen Waterfall", "Snow Monument"],
      microPoints: [
        "Ice Crystal",
        "Frozen Nest",
        "Aurora Glow",
        "Snow Formation",
      ],
      secrets: ["Ice Cave", "Buried Structure", "Frozen Artifact"],
    },
    forest: {
      landmarks: [
        "Ancient Tree",
        "Canopy Tower",
        "Stone Circle",
        "Overgrown Ruins",
      ],
      microPoints: [
        "Bioluminescent Fungus",
        "Nest",
        "Rare Flower",
        "Crystal Formation",
      ],
      secrets: ["Hidden Grove", "Underground Root System", "Treehouse Ruins"],
    },
    desert: {
      landmarks: ["Rock Formation", "Sand Dune Peak", "Stone Arch", "Oasis"],
      microPoints: ["Desert Glass", "Fossil", "Cactus Bloom", "Wind Pattern"],
      secrets: ["Buried Temple", "Underground Spring", "Ancient Caravan"],
    },
    ocean: {
      landmarks: [
        "Coral Tower",
        "Underwater Volcano",
        "Trench",
        "Reef Monument",
      ],
      microPoints: [
        "Bioluminescent Algae",
        "Shell Formation",
        "Thermal Vent",
        "Rare Coral",
      ],
      secrets: ["Sunken Ship", "Cave System", "Abyssal Creature"],
    },
    cave: {
      landmarks: [
        "Stalactite Formation",
        "Underground Lake",
        "Crystal Chamber",
        "Chasm",
      ],
      microPoints: [
        "Glowing Mineral",
        "Fossil",
        "Mushroom Colony",
        "Echo Chamber",
      ],
      secrets: ["Hidden Passage", "Buried Treasure", "Ancient Drawing"],
    },
    asteroid: {
      landmarks: [
        "Core Fragment",
        "Impact Crater",
        "Metal Deposit",
        "Gravity Anomaly",
      ],
      microPoints: [
        "Rare Element",
        "Space Crystal",
        "Metallic Formation",
        "Void Pocket",
      ],
      secrets: ["Alien Structure", "Ancient Tech", "Unstable Core"],
    },
  };

  const data = biomeData[biome] || biomeData.volcanic;

  // Generate 2-4 landmarks (scaled by density)
  const landmarkCount = Math.floor((2 + Math.random() * 3) * mult);
  for (let i = 0; i < landmarkCount; i++) {
    budget.landmarks.push({
      x: 50 + Math.random() * 500,
      y: 50 + Math.random() * 300,
      type: data.landmarks[Math.floor(Math.random() * data.landmarks.length)],
      visibility: "high",
    });
  }

  // Generate 15-30 micro points (scaled by density)
  const microCount = Math.floor((15 + Math.random() * 16) * mult);
  for (let i = 0; i < microCount; i++) {
    budget.microPoints.push({
      x: Math.random() * 600,
      y: Math.random() * 400,
      type: data.microPoints[
        Math.floor(Math.random() * data.microPoints.length)
      ],
      visibility: "medium",
    });
  }

  // Generate 3-6 occluded secrets (scaled by density)
  const secretCount = Math.floor((3 + Math.random() * 4) * mult);
  for (let i = 0; i < secretCount; i++) {
    budget.occludedSecrets.push({
      x: Math.random() * 600,
      y: Math.random() * 400,
      type: data.secrets[Math.floor(Math.random() * data.secrets.length)],
      revealed: false,
      visibility: "hidden",
    });
  }

  return budget;
}

function drawMysteryMap(canvas, budget) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Biome-specific colors
  const biomeColors = {
    volcanic: ["#ff4400", "#ff6622", "#ff8844"],
    arctic: ["#88ccff", "#aaddff", "#cceeee"],
    forest: ["#228844", "#44aa66", "#66cc88"],
    desert: ["#ffcc66", "#ffdd88", "#ffeeaa"],
    ocean: ["#2266aa", "#4488cc", "#66aaee"],
    cave: ["#554466", "#776688", "#9988aa"],
    asteroid: ["#666666", "#888888", "#aaaaaa"],
  };

  const colors = biomeColors[budget.biome] || biomeColors.volcanic;

  // Draw gradient background
  const gradient = ctx.createLinearGradient(0, 0, 600, 400);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(0.5, colors[1]);
  gradient.addColorStop(1, colors[2]);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 600, 400);

  // Draw grid
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 600; i += 50) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 400);
    ctx.stroke();
  }
  for (let i = 0; i < 400; i += 50) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(600, i);
    ctx.stroke();
  }

  // Draw micro points (smallest, drawn first)
  budget.microPoints.forEach((point) => {
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.beginPath();
    ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
    ctx.fill();
  });

  // Draw landmarks (larger, more visible)
  budget.landmarks.forEach((landmark) => {
    ctx.fillStyle = "#ffff00";
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(landmark.x, landmark.y, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Draw name label
    ctx.fillStyle = "#ffffff";
    ctx.font = "10px monospace";
    ctx.fillText(landmark.type, landmark.x + 12, landmark.y + 4);
  });

  // Draw occluded secrets (only if revealed)
  const revealedCount = budget.occludedSecrets.filter((s) => s.revealed).length;
  budget.occludedSecrets.forEach((secret) => {
    if (secret.revealed) {
      ctx.fillStyle = "#ff00ff";
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(secret.x, secret.y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Draw type label
      ctx.fillStyle = "#ff00ff";
      ctx.font = "10px monospace";
      ctx.fillText(secret.type, secret.x + 10, secret.y + 4);
    } else {
      // Draw subtle hint (very faint)
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      ctx.beginPath();
      ctx.arc(secret.x, secret.y, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  // Draw legend
  const legendX = 10;
  const legendY = 10;
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(legendX, legendY, 180, revealedCount > 0 ? 85 : 65);

  ctx.fillStyle = "#ffff00";
  ctx.beginPath();
  ctx.arc(legendX + 10, legendY + 15, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = "12px monospace";
  ctx.fillText(
    `Landmarks (${budget.landmarks.length})`,
    legendX + 25,
    legendY + 20
  );

  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.beginPath();
  ctx.arc(legendX + 10, legendY + 35, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.fillText(
    `Micro Points (${budget.microPoints.length})`,
    legendX + 25,
    legendY + 40
  );

  ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
  ctx.beginPath();
  ctx.arc(legendX + 10, legendY + 55, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.fillText(
    `Hidden Secrets (${budget.occludedSecrets.length - revealedCount})`,
    legendX + 25,
    legendY + 60
  );

  if (revealedCount > 0) {
    ctx.fillStyle = "#ff00ff";
    ctx.beginPath();
    ctx.arc(legendX + 10, legendY + 75, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ff00ff";
    ctx.fillText(`Revealed (${revealedCount})`, legendX + 25, legendY + 80);
  }
}

function displayMysteryStats(container, budget) {
  const revealedCount = budget.occludedSecrets.filter((s) => s.revealed).length;
  const hiddenCount = budget.occludedSecrets.length - revealedCount;

  container.innerHTML = `
        <div style="margin-bottom: 10px;">
            <strong>Biome:</strong> ${budget.biome.toUpperCase()} 
            <span style="margin-left: 20px; opacity: 0.7;">(Density: ${
              budget.density
            })</span>
        </div>
        <div style="margin-bottom: 10px;">
            <strong>Landmarks:</strong> ${budget.landmarks.length}
            <ul style="margin-left: 20px; margin-top: 5px; font-size: 0.9em;">
                ${budget.landmarks.map((l) => `<li>${l.type}</li>`).join("")}
            </ul>
        </div>
        <div style="margin-bottom: 10px;">
            <strong>Micro Points:</strong> ${budget.microPoints.length}
            <ul style="margin-left: 20px; margin-top: 5px; font-size: 0.9em; max-height: 100px; overflow-y: auto;">
                ${budget.microPoints.map((p) => `<li>${p.type}</li>`).join("")}
            </ul>
        </div>
        <div style="margin-bottom: 10px;">
            <strong>Occluded Secrets:</strong> ${
              budget.occludedSecrets.length
            } total
            <div style="margin-left: 20px; margin-top: 5px; font-size: 0.9em;">
                ${hiddenCount > 0 ? `🔒 Hidden: ${hiddenCount}` : ""}
                ${revealedCount > 0 ? `<br>🔓 Revealed: ${revealedCount}` : ""}
            </div>
            ${
              revealedCount > 0
                ? `
            <ul style="margin-left: 20px; margin-top: 5px; font-size: 0.9em; color: #ff00ff;">
                ${budget.occludedSecrets
                  .filter((s) => s.revealed)
                  .map((s) => `<li>${s.type}</li>`)
                  .join("")}
            </ul>
            `
                : ""
            }
        </div>
        <div style="margin-top: 15px; padding: 10px; background: rgba(0,0,0,0.3); border-radius: 5px;">
            <strong>Mystery Quota:</strong> ${(
              budget.occludedSecrets.length / 10
            ).toFixed(1)} surprises per 10 min travel
            <div style="font-size: 0.85em; margin-top: 5px; opacity: 0.8;">
                Target: ~0.5 discoveries per 10 min (feel surprise while exploring)
            </div>
        </div>
        <div style="margin-top: 10px; font-size: 0.85em; opacity: 0.7; font-style: italic;">
            ${
              hiddenCount > 0
                ? "💡 Tip: Click on faint circles to reveal individual secrets, or use 'Reveal All Secrets' button"
                : "✅ All secrets revealed!"
            }
        </div>
    `;
}

// Loop Timer
function initLoopTimer() {
  const phases = document.querySelectorAll(".loop-phase");

  phases.forEach((phase, index) => {
    const btn = phase.querySelector(".phase-btn");
    const timeDisplay = phase.querySelector(".phase-time");

    btn.addEventListener("click", () => {
      if (index === state.currentPhase) {
        startPhase(index, phase, timeDisplay);
      }
    });
  });
}

function startPhase(index, phaseElement, timeDisplay) {
  state.phaseStartTime = Date.now();

  const phaseNames = ["detect", "approach", "interact", "reward", "record"];
  const phaseName = phaseNames[index];

  const timer = setInterval(() => {
    const elapsed = Math.floor((Date.now() - state.phaseStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    timeDisplay.textContent = `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, 1000);

  phaseElement.querySelector(".phase-btn").textContent = "Complete Phase";
  phaseElement.querySelector(".phase-btn").onclick = () => {
    clearInterval(timer);
    const elapsed = Math.floor((Date.now() - state.phaseStartTime) / 1000);
    state.loopTimers[phaseName] = elapsed;

    phaseElement.classList.add("completed");
    phaseElement.classList.remove("active");

    if (index < 4) {
      state.currentPhase = index + 1;
      document
        .querySelectorAll(".loop-phase")
        [index + 1].classList.add("active");
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

  const resultsDiv = document.getElementById("loopResults");
  resultsDiv.innerHTML = `
        <div class="reward-item" style="border-color: ${
          isOptimal ? "#2ecc71" : "#f39c12"
        }">
            <h4>Loop Complete!</h4>
            <p><strong>Total Time:</strong> ${minutes}:${seconds
    .toString()
    .padStart(2, "0")}</p>
            <p><strong>Target Range:</strong> 5:00 - 8:00</p>
            <p style="color: ${isOptimal ? "#2ecc71" : "#f39c12"}">
                ${isOptimal ? "✓ Optimal pacing!" : "⚠ Outside optimal range"}
            </p>
            <div style="margin-top: 10px;">
                <strong>Phase Breakdown:</strong>
                <ul style="margin-left: 20px; margin-top: 5px;">
                    ${Object.entries(state.loopTimers)
                      .map(
                        ([phase, time]) =>
                          `<li>${phase}: ${Math.floor(time / 60)}:${(time % 60)
                            .toString()
                            .padStart(2, "0")}</li>`
                      )
                      .join("")}
                </ul>
            </div>
        </div>
    `;

  // Update metrics
  state.metrics.loopTime = totalTime;
  updateMetric("loopTime", totalTime, targetMin, targetMax);

  // Reset for next loop
  setTimeout(() => {
    state.currentPhase = 0;
    state.loopTimers = {
      detect: 0,
      approach: 0,
      interact: 0,
      reward: 0,
      record: 0,
    };
    document.querySelectorAll(".loop-phase").forEach((p, i) => {
      p.classList.remove("active", "completed");
      p.querySelector(".phase-time").textContent = "0:00";
      if (i === 0) p.classList.add("active");
    });
  }, 3000);
}

// Metrics Dashboard
function initMetricsDashboard() {
  const exportBtn = document.getElementById("exportMetrics");
  const resetBtn = document.getElementById("resetMetrics");

  document.querySelectorAll(".metric-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const metric = btn.dataset.metric;
      simulateMetric(metric);
    });
  });

  exportBtn.addEventListener("click", exportMetrics);
  resetBtn.addEventListener("click", resetMetrics);

  updateMetricsDisplay();
}

function simulateMetric(metric) {
  switch (metric) {
    case "curiosity":
      state.metrics.curiosity = Math.min(
        100,
        state.metrics.curiosity + Math.random() * 15
      );
      updateMetric("curiosity", state.metrics.curiosity, 25, 100);
      break;
    case "souvenir":
      state.metrics.souvenirs++;
      updateMetric("souvenir", state.metrics.souvenirs, 1, 5);
      break;
    case "predictive":
      state.metrics.predictions.total++;
      if (Math.random() > 0.4) state.metrics.predictions.correct++;
      const successRate =
        (state.metrics.predictions.correct / state.metrics.predictions.total) *
        100;
      updateMetric("predictive", successRate, 60, 100);
      break;
  }

  state.metrics.history.push({
    timestamp: Date.now(),
    metric,
    value: state.metrics[metric],
  });

  updateMetricsChart();
}

function updateMetric(metric, value, target, max) {
  const displays = {
    curiosity: {
      value: "curiosityMetric",
      fill: "curiosityFill",
      format: (v) => `${v.toFixed(1)}%`,
    },
    loopTime: {
      value: "loopTimeMetric",
      fill: "loopTimeFill",
      format: (v) => {
        const m = Math.floor(v / 60);
        const s = v % 60;
        return `${m}:${s.toString().padStart(2, "0")}`;
      },
    },
    souvenir: {
      value: "souvenirMetric",
      fill: "souvenirFill",
      format: (v) => `${v}/15min`,
    },
    predictive: {
      value: "predictiveMetric",
      fill: "predictiveFill",
      format: (v) => `${v.toFixed(1)}%`,
    },
  };

  const display = displays[metric];
  if (display) {
    document.getElementById(display.value).textContent = display.format(value);
    const percentage = Math.min(100, (value / max) * 100);
    document.getElementById(display.fill).style.width = `${percentage}%`;
  }
}

function updateMetricsDisplay() {
  updateMetric("curiosity", state.metrics.curiosity, 25, 100);
  updateMetric("loopTime", state.metrics.loopTime, 300, 480);
  updateMetric("souvenir", state.metrics.souvenirs, 1, 5);

  if (state.metrics.predictions.total > 0) {
    const successRate =
      (state.metrics.predictions.correct / state.metrics.predictions.total) *
      100;
    updateMetric("predictive", successRate, 60, 100);
  }
}

function updateMetricsChart() {
  const canvas = document.getElementById("metricsChart");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (state.metrics.history.length === 0) return;

  const data = state.metrics.history.slice(-20);
  const maxValue = Math.max(
    ...data.map((d) => (typeof d.value === "number" ? d.value : 0))
  );

  ctx.strokeStyle = "#4a90e2";
  ctx.lineWidth = 2;
  ctx.beginPath();

  data.forEach((point, i) => {
    const x = (i / (data.length - 1)) * (canvas.width - 40) + 20;
    const y =
      canvas.height - 20 - (point.value / maxValue) * (canvas.height - 40);

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
    timestamp: new Date().toISOString(),
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `exploration-metrics-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function resetMetrics() {
  if (confirm("Reset all metrics data?")) {
    state.metrics = {
      curiosity: 0,
      loopTime: 0,
      souvenirs: 0,
      predictions: { total: 0, correct: 0 },
      history: [],
    };
    state.rewards = [];
    updateMetricsDisplay();
    updateMetricsChart();
  }
}

// ==================== SETTINGS MANAGEMENT ====================

function initializeSettings() {
  // Load settings from localStorage if available
  const savedSettings = localStorage.getItem("explorationSettings");
  if (savedSettings) {
    try {
      state.settings = JSON.parse(savedSettings);
    } catch (e) {
      console.error("Failed to load saved settings:", e);
    }
  }

  // Populate all input fields with current settings
  updateSettingsUI();

  // Add event listeners to all settings inputs
  const settingsInputs = document.querySelectorAll(
    '#settings input[type="number"], #settings input[type="checkbox"]'
  );
  settingsInputs.forEach((input) => {
    input.addEventListener("input", handleSettingChange);
  });

  // Add event listeners to buttons
  const exportBtn = document.getElementById("exportSettings");
  const importBtn = document.getElementById("importSettings");
  const resetBtn = document.getElementById("resetSettings");

  if (exportBtn) exportBtn.addEventListener("click", exportSettings);
  if (importBtn) importBtn.addEventListener("click", importSettings);
  if (resetBtn) resetBtn.addEventListener("click", resetSettings);
}

function updateSettingsUI() {
  // Stat Pools
  setInputValue("setting-statpool-common", state.settings.statPools.common);
  setInputValue("setting-statpool-uncommon", state.settings.statPools.uncommon);
  setInputValue("setting-statpool-rare", state.settings.statPools.rare);
  setInputValue("setting-statpool-epic", state.settings.statPools.epic);
  setInputValue(
    "setting-statpool-legendary",
    state.settings.statPools.legendary
  );

  // Drop Rates
  setInputValue("setting-droprate-common", state.settings.dropRates.common);
  setInputValue("setting-droprate-uncommon", state.settings.dropRates.uncommon);
  setInputValue("setting-droprate-rare", state.settings.dropRates.rare);
  setInputValue("setting-droprate-unique", state.settings.dropRates.unique);

  // REP Values
  setInputValue("setting-rep-common", state.settings.repValues.common);
  setInputValue("setting-rep-uncommon", state.settings.repValues.uncommon);
  setInputValue("setting-rep-rare", state.settings.repValues.rare);
  setInputValue("setting-rep-unique", state.settings.repValues.unique);

  // Multipliers
  setInputValue(
    "setting-first-discoverer",
    state.settings.firstDiscovererMultiplier
  );
  setInputValue(
    "setting-diminishing-rate",
    state.settings.diminishingReturnsRate
  );
  setInputValue("setting-rep-floor", state.settings.repFloor);

  // Ecology
  setInputValue("setting-flora-regen", state.settings.ecology.floraRegenRate);
  setInputValue("setting-fauna-regen", state.settings.ecology.faunaRegenRate);
  setInputValue("setting-health-regen", state.settings.ecology.healthRegenRate);
  setInputValue(
    "setting-flora-loss",
    state.settings.ecology.floraLossPerHarvest
  );
  setInputValue(
    "setting-fauna-loss",
    state.settings.ecology.faunaLossPerHarvest
  );
  setInputValue(
    "setting-health-loss",
    state.settings.ecology.healthLossPerHarvest
  );
  setInputValue(
    "setting-critical-threshold",
    state.settings.ecology.criticalThreshold
  );
  setInputValue(
    "setting-stressed-threshold",
    state.settings.ecology.stressedThreshold
  );
  setInputValue(
    "setting-frequent-warning",
    state.settings.ecology.frequentHarvestWarning
  );

  // Mystery Budget - Sparse
  setInputValue(
    "setting-sparse-landmarks-min",
    state.settings.mysteryBudget.sparse.landmarks[0]
  );
  setInputValue(
    "setting-sparse-landmarks-max",
    state.settings.mysteryBudget.sparse.landmarks[1]
  );
  setInputValue(
    "setting-sparse-micro-min",
    state.settings.mysteryBudget.sparse.microPoints[0]
  );
  setInputValue(
    "setting-sparse-micro-max",
    state.settings.mysteryBudget.sparse.microPoints[1]
  );
  setInputValue(
    "setting-sparse-secrets-min",
    state.settings.mysteryBudget.sparse.secrets[0]
  );
  setInputValue(
    "setting-sparse-secrets-max",
    state.settings.mysteryBudget.sparse.secrets[1]
  );

  // Mystery Budget - Normal
  setInputValue(
    "setting-normal-landmarks-min",
    state.settings.mysteryBudget.normal.landmarks[0]
  );
  setInputValue(
    "setting-normal-landmarks-max",
    state.settings.mysteryBudget.normal.landmarks[1]
  );
  setInputValue(
    "setting-normal-micro-min",
    state.settings.mysteryBudget.normal.microPoints[0]
  );
  setInputValue(
    "setting-normal-micro-max",
    state.settings.mysteryBudget.normal.microPoints[1]
  );
  setInputValue(
    "setting-normal-secrets-min",
    state.settings.mysteryBudget.normal.secrets[0]
  );
  setInputValue(
    "setting-normal-secrets-max",
    state.settings.mysteryBudget.normal.secrets[1]
  );

  // Mystery Budget - Dense
  setInputValue(
    "setting-dense-landmarks-min",
    state.settings.mysteryBudget.dense.landmarks[0]
  );
  setInputValue(
    "setting-dense-landmarks-max",
    state.settings.mysteryBudget.dense.landmarks[1]
  );
  setInputValue(
    "setting-dense-micro-min",
    state.settings.mysteryBudget.dense.microPoints[0]
  );
  setInputValue(
    "setting-dense-micro-max",
    state.settings.mysteryBudget.dense.microPoints[1]
  );
  setInputValue(
    "setting-dense-secrets-min",
    state.settings.mysteryBudget.dense.secrets[0]
  );
  setInputValue(
    "setting-dense-secrets-max",
    state.settings.mysteryBudget.dense.secrets[1]
  );

  // Mutation
  setInputValue("setting-mutation-min", state.settings.mutation.minBoost);
  setInputValue("setting-mutation-max", state.settings.mutation.maxBoost);
  setCheckboxValue(
    "setting-multi-mutation",
    state.settings.mutation.allowMultiple
  );

  // Loop Targets
  setInputValue("setting-micro-loop-min", state.settings.loopTargets.microMin);
  setInputValue("setting-micro-loop-max", state.settings.loopTargets.microMax);
  setInputValue("setting-macro-loop-min", state.settings.loopTargets.macroMin);
  setInputValue("setting-macro-loop-max", state.settings.loopTargets.macroMax);

  // Metrics Targets
  setInputValue(
    "setting-curiosity-target",
    state.settings.metricsTargets.curiosity
  );
  setInputValue(
    "setting-souvenir-time",
    state.settings.metricsTargets.souvenirTime
  );
  setInputValue(
    "setting-predictive-target",
    state.settings.metricsTargets.predictive
  );
  setInputValue(
    "setting-parity-tolerance",
    state.settings.metricsTargets.parityTolerance
  );
}

function setInputValue(id, value) {
  const input = document.getElementById(id);
  if (input) {
    input.value = value;
    updateSettingDisplay(input);
  }
}

function setCheckboxValue(id, value) {
  const input = document.getElementById(id);
  if (input) {
    input.checked = value;
    updateSettingDisplay(input);
  }
}

function handleSettingChange(event) {
  const input = event.target;
  const id = input.id;
  const value =
    input.type === "checkbox" ? input.checked : parseFloat(input.value);

  // Update state based on input ID
  switch (id) {
    // Stat Pools
    case "setting-statpool-common":
      state.settings.statPools.common = value;
      break;
    case "setting-statpool-uncommon":
      state.settings.statPools.uncommon = value;
      break;
    case "setting-statpool-rare":
      state.settings.statPools.rare = value;
      break;
    case "setting-statpool-epic":
      state.settings.statPools.epic = value;
      break;
    case "setting-statpool-legendary":
      state.settings.statPools.legendary = value;
      break;

    // Drop Rates
    case "setting-droprate-common":
      state.settings.dropRates.common = value;
      break;
    case "setting-droprate-uncommon":
      state.settings.dropRates.uncommon = value;
      break;
    case "setting-droprate-rare":
      state.settings.dropRates.rare = value;
      break;
    case "setting-droprate-unique":
      state.settings.dropRates.unique = value;
      break;

    // REP Values
    case "setting-rep-common":
      state.settings.repValues.common = value;
      break;
    case "setting-rep-uncommon":
      state.settings.repValues.uncommon = value;
      break;
    case "setting-rep-rare":
      state.settings.repValues.rare = value;
      break;
    case "setting-rep-unique":
      state.settings.repValues.unique = value;
      break;

    // Multipliers
    case "setting-first-discoverer":
      state.settings.firstDiscovererMultiplier = value;
      break;
    case "setting-diminishing-rate":
      state.settings.diminishingReturnsRate = value;
      break;
    case "setting-rep-floor":
      state.settings.repFloor = value;
      break;

    // Ecology
    case "setting-flora-regen":
      state.settings.ecology.floraRegenRate = value;
      break;
    case "setting-fauna-regen":
      state.settings.ecology.faunaRegenRate = value;
      break;
    case "setting-health-regen":
      state.settings.ecology.healthRegenRate = value;
      break;
    case "setting-flora-loss":
      state.settings.ecology.floraLossPerHarvest = value;
      break;
    case "setting-fauna-loss":
      state.settings.ecology.faunaLossPerHarvest = value;
      break;
    case "setting-health-loss":
      state.settings.ecology.healthLossPerHarvest = value;
      break;
    case "setting-critical-threshold":
      state.settings.ecology.criticalThreshold = value;
      break;
    case "setting-stressed-threshold":
      state.settings.ecology.stressedThreshold = value;
      break;
    case "setting-frequent-warning":
      state.settings.ecology.frequentHarvestWarning = value;
      break;

    // Mystery Budget - Sparse
    case "setting-sparse-landmarks-min":
      state.settings.mysteryBudget.sparse.landmarks[0] = value;
      break;
    case "setting-sparse-landmarks-max":
      state.settings.mysteryBudget.sparse.landmarks[1] = value;
      break;
    case "setting-sparse-micro-min":
      state.settings.mysteryBudget.sparse.microPoints[0] = value;
      break;
    case "setting-sparse-micro-max":
      state.settings.mysteryBudget.sparse.microPoints[1] = value;
      break;
    case "setting-sparse-secrets-min":
      state.settings.mysteryBudget.sparse.secrets[0] = value;
      break;
    case "setting-sparse-secrets-max":
      state.settings.mysteryBudget.sparse.secrets[1] = value;
      break;

    // Mystery Budget - Normal
    case "setting-normal-landmarks-min":
      state.settings.mysteryBudget.normal.landmarks[0] = value;
      break;
    case "setting-normal-landmarks-max":
      state.settings.mysteryBudget.normal.landmarks[1] = value;
      break;
    case "setting-normal-micro-min":
      state.settings.mysteryBudget.normal.microPoints[0] = value;
      break;
    case "setting-normal-micro-max":
      state.settings.mysteryBudget.normal.microPoints[1] = value;
      break;
    case "setting-normal-secrets-min":
      state.settings.mysteryBudget.normal.secrets[0] = value;
      break;
    case "setting-normal-secrets-max":
      state.settings.mysteryBudget.normal.secrets[1] = value;
      break;

    // Mystery Budget - Dense
    case "setting-dense-landmarks-min":
      state.settings.mysteryBudget.dense.landmarks[0] = value;
      break;
    case "setting-dense-landmarks-max":
      state.settings.mysteryBudget.dense.landmarks[1] = value;
      break;
    case "setting-dense-micro-min":
      state.settings.mysteryBudget.dense.microPoints[0] = value;
      break;
    case "setting-dense-micro-max":
      state.settings.mysteryBudget.dense.microPoints[1] = value;
      break;
    case "setting-dense-secrets-min":
      state.settings.mysteryBudget.dense.secrets[0] = value;
      break;
    case "setting-dense-secrets-max":
      state.settings.mysteryBudget.dense.secrets[1] = value;
      break;

    // Mutation
    case "setting-mutation-min":
      state.settings.mutation.minBoost = value;
      break;
    case "setting-mutation-max":
      state.settings.mutation.maxBoost = value;
      break;
    case "setting-multi-mutation":
      state.settings.mutation.allowMultiple = value;
      break;

    // Loop Targets
    case "setting-micro-loop-min":
      state.settings.loopTargets.microMin = value;
      break;
    case "setting-micro-loop-max":
      state.settings.loopTargets.microMax = value;
      break;
    case "setting-macro-loop-min":
      state.settings.loopTargets.macroMin = value;
      break;
    case "setting-macro-loop-max":
      state.settings.loopTargets.macroMax = value;
      break;

    // Metrics Targets
    case "setting-curiosity-target":
      state.settings.metricsTargets.curiosity = value;
      break;
    case "setting-souvenir-time":
      state.settings.metricsTargets.souvenirTime = value;
      break;
    case "setting-predictive-target":
      state.settings.metricsTargets.predictive = value;
      break;
    case "setting-parity-tolerance":
      state.settings.metricsTargets.parityTolerance = value;
      break;
  }

  updateSettingDisplay(input);
  saveSettings();
  showSettingsStatus();
}

function updateSettingDisplay(input) {
  const label = input.closest("label");
  if (!label) return;

  const valueSpan = label.querySelector(".setting-value");
  if (!valueSpan) return;

  if (input.type === "checkbox") {
    valueSpan.textContent = input.checked ? "Enabled" : "Disabled";
  } else {
    const value = parseFloat(input.value);
    const id = input.id;

    // Format based on type
    if (
      id.includes("droprate") ||
      id.includes("regen") ||
      id.includes("loss") ||
      id.includes("threshold") ||
      id.includes("target") ||
      id.includes("tolerance") ||
      id.includes("mutation")
    ) {
      valueSpan.textContent = `${value}%`;
    } else if (id.includes("multiplier")) {
      valueSpan.textContent = `${value}x`;
    } else if (id.includes("loop")) {
      valueSpan.textContent = `${value} min`;
    } else {
      valueSpan.textContent = value.toString();
    }
  }
}

function saveSettings() {
  localStorage.setItem("explorationSettings", JSON.stringify(state.settings));
}

function showSettingsStatus() {
  const status = document.getElementById("settingsStatus");
  if (status) {
    status.style.display = "block";
    setTimeout(() => {
      status.style.display = "none";
    }, 3000);
  }
}

function exportSettings() {
  const blob = new Blob([JSON.stringify(state.settings, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `exploration-settings-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importSettings() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/json";
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const settings = JSON.parse(event.target.result);
        state.settings = settings;
        updateSettingsUI();
        saveSettings();
        showSettingsStatus();
        alert("Settings imported successfully!");
      } catch (err) {
        alert("Failed to import settings: Invalid JSON file");
        console.error(err);
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

function resetSettings() {
  if (!confirm("Reset all settings to default values?")) return;

  state.settings = {
    statPools: {
      common: 300,
      uncommon: 450,
      rare: 600,
      epic: 800,
      legendary: 1000,
    },
    dropRates: {
      common: 60,
      uncommon: 25,
      rare: 10,
      unique: 5,
    },
    repValues: {
      common: 20,
      uncommon: 50,
      rare: 100,
      unique: 250,
    },
    firstDiscovererMultiplier: 2,
    diminishingReturnsRate: 5,
    repFloor: 10,
    ecology: {
      floraRegenRate: 2,
      faunaRegenRate: 1.5,
      healthRegenRate: 1,
      floraLossPerHarvest: 8,
      faunaLossPerHarvest: 5,
      healthLossPerHarvest: 3,
      criticalThreshold: 30,
      stressedThreshold: 60,
      frequentHarvestWarning: 5,
    },
    mysteryBudget: {
      sparse: { landmarks: [1, 2], microPoints: [8, 12], secrets: [2, 3] },
      normal: { landmarks: [2, 3], microPoints: [15, 25], secrets: [3, 5] },
      dense: { landmarks: [3, 5], microPoints: [30, 40], secrets: [5, 8] },
    },
    mutation: {
      minBoost: 10,
      maxBoost: 25,
      allowMultiple: true,
    },
    loopTargets: {
      microMin: 5,
      microMax: 8,
      macroMin: 60,
      macroMax: 120,
    },
    metricsTargets: {
      curiosity: 25,
      souvenirTime: 15,
      predictive: 60,
      parityTolerance: 12,
    },
  };

  updateSettingsUI();
  saveSettings();
  showSettingsStatus();
}

