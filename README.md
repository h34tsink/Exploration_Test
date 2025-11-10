# Exploration System Tester

An interactive web application for testing and iterating on exploration game mechanics based on the Exploration Overhaul Design Document.

## Features

### 🎯 Exploration Verbs Testing
Test all five exploration verbs with interactive simulations:
- **Trace**: Signal triangulation mechanics
- **Sample**: Resource collection from targets
- **Decode**: Pattern-based puzzle solving
- **Shadow**: Creature tracking and behavior observation
- **Excavate**: Progressive excavation mechanics

### 🎁 Reward System
- Generate rewards with different rarity levels
- Test first discoverer bonuses
- Adaptive scaling based on global discovery counts
- Visual statistics and charts

### 🌍 Ecology Simulator
- Dynamic biome states with time progression
- Resource harvesting impact simulation
- World health tracking
- Reactive ecology with diminishing returns
- Environmental parameters (temperature, radiation, flora, fauna)

### 🗺️ Mystery Budget Manager
- Procedural discovery distribution
- Landmark, micro-point, and occluded secret placement
- Biome-specific generation
- Visual map representation

### ⏱️ Loop Timer
- Micro loop phase tracking (5-8 minutes target)
- Phase-by-phase breakdown
- Optimal pacing validation
- Automatic metrics collection

### 📊 Metrics Dashboard
- Real-time KPI tracking:
  - Curiosity Conversion Rate (Target: +25%)
  - Loop Completion Time (Target: 5-8 min)
  - Souvenir Density (Target: 1/12-15min)
  - Predictive Success (Target: 60%)
  - Solo/Co-op Parity (Target: ±12%)
- Session history visualization
- Export data to JSON
- Reset functionality

## Usage

1. Open `index.html` in a modern web browser
2. Navigate between tabs to test different systems
3. Use the interactive controls to simulate gameplay scenarios
4. Monitor metrics in the dashboard
5. Export data for analysis

## Testing Workflow

1. **Test Exploration Verbs**: Click through each verb to understand interaction patterns
2. **Generate Rewards**: Experiment with different rarity levels and discovery counts
3. **Simulate Ecology**: Advance time and harvest resources to observe ecosystem changes
4. **Create Mystery Budgets**: Generate maps for different biomes
5. **Time Loop Phases**: Practice optimal loop pacing
6. **Monitor Metrics**: Track performance against design targets

## Data Export

Use the "Export Data (JSON)" button in the Metrics Dashboard to save session data including:
- All metrics history
- Reward generation results
- Ecology state snapshots
- Loop timing data

## Quick Iteration Tips

- Use the Metrics Dashboard to quickly validate if changes meet KPI targets
- Test different reward rarities to balance discovery excitement
- Simulate overfarming in Ecology to test sustainability mechanics
- Compare Mystery Budget distributions across biomes
- Time yourself through Loop phases to validate pacing

## Browser Compatibility

Works best in modern browsers (Chrome, Firefox, Edge, Safari) with HTML5 Canvas support.

---

**Version:** 1.0  
**Based on:** Exploration Overhaul Design Document v1.0
