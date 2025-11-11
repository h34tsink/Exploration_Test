# Exploration System Tester

An interactive web application for testing and iterating on exploration game mechanics. Features procedural object generation, dynamic ecosystems, reward scaling systems, and comprehensive testing tools for game balance.

## Quick Start

### Running Locally

#### Option 1: Using the start script (Recommended)

```bash
# Windows
start.bat

# Linux/Mac
./start.sh
```

**Option 2: Direct Python command**

```bash
python start_server.py
```

The server will display access URLs:

- **Local access**: `http://localhost:8000`
- **Network access**: `http://[your-ip]:8000`

### Running Over LAN

1. Start the server using one of the methods above
2. Note your local IP address displayed in the terminal
3. On other devices connected to the same network, open a browser and navigate to:

   ```
   http://[your-ip]:8000
   ```

   For example: `http://192.168.1.100:8000`

**Firewall Note**: You may need to allow Python through your firewall for LAN access.

## Features

### 🎯 Exploration Verbs Testing

Test five distinct interaction mechanics for discovering objects in the game world:

- **Trace**: Triangulate signals, radiation, or sound through spatial reasoning challenges
- **Sample**: Collect biological or chemical samples with resource management
- **Decode**: Solve pattern-based puzzles requiring cognitive engagement
- **Shadow**: Track migratory species or weather patterns with observation skills
- **Excavate**: Dig, drill, or cut into ruins with persistence-based mechanics

Each verb represents a unique gameplay loop with different inputs and skill expressions, designed to match specific discovery types.

### 🧬 Procedural Object Generator

Generate unique discoverable objects with deep scientific properties:

- **32 Substats per Object**: 8 scientific fields × 4 subfields each
  - Biology, Chemistry, Physics, Geology, Ecology, Astronomy, Engineering, Medicine
- **Rarity-Based Stat Pools**:
  - Common (300 pts), Uncommon (450 pts), Rare (600 pts), Epic (800 pts), Legendary (1000 pts)
- **8 Object Types**: Plants, Animals, Minerals, Crystals, Gases, Artifacts, Microorganisms, Compounds
- **9 Biome Origins**: Volcanic, Arctic, Forest, Desert, Ocean, Cave, Asteroid, Space, Radioactive
- **Evolution System**: Living organisms can mutate, boosting random subfields by 10-25%
- **Tech Tree Integration**: 10 research branches with dual requirement system
  - Biotechnology, Energy & Physics, Environmental, Spacecraft, Power Armor, Personal Equipment, Medical, Weapons, Nanotechnology, Xenobiology

### 🎁 Reward System

Test and balance reward scaling with comprehensive analysis tools:

- **Rarity-Based REP**: Common (20), Uncommon (50), Rare (100), Unique (250) base values
- **First Discoverer Bonus**: 2× REP multiplier for first global discovery
- **Diminishing Returns**: 5% reduction per subsequent discovery (10% minimum)
- **Discovery Simulator**: Calculate REP values for different scenarios
- **Comparison Panel**: View REP values at 0, 5, 10, and 20 discovery counts
- **Session Tracking**: Real-time counters for each rarity tier
- **Discovery Log**: Timestamped history with color-coded entries

### 🌍 Ecology Simulator

Dynamic ecosystem simulation with consequences for over-harvesting:

- **Time-Based Recovery**: Flora and fauna regenerate based on world health
- **Environmental Impact**: Harvesting reduces density and triggers warnings
- **Day/Night Cycle**: Temperature and fauna activity vary with time
- **Health System**: World health tracks overall ecosystem status
- **Smart Warnings**:
  - 🔴 Critical (< 30% health) - Immediate stop required
  - ⚠️ Stressed (< 60% health) - Reduce harvesting
  - ⚡ Frequent farming - Suggests relocation
  - ✅ Stable - Sustainable harvesting OK
- **Recovery Metrics**: Shows estimated hours needed for full recovery
- **Event Log**: Tracks all actions and ecosystem changes

### 🗺️ Mystery Budget Manager

Procedural discovery distribution system:

- Landmark, micro-point, and occluded secret placement
- Biome-specific generation patterns
- Visual map representation with canvas rendering
- Discovery breakdown statistics

### ⏱️ Loop Timer

Exploration loop phase tracking:

- **Micro Loop** (5-8 minutes target): Detect → Approach → Interact → Reward → Record
- **Macro Loop** (1-2 hours): Extended session tracking
- Phase-by-phase timing with real-time updates
- Optimal pacing validation against design targets
- Automatic metrics collection for dashboard

### 📊 Metrics Dashboard

Real-time KPI tracking and session analysis:

- **Curiosity Conversion Rate** (Target: +25%)
- **Loop Completion Time** (Target: 5-8 min)
- **Souvenir Density** (Target: 1/12-15min)
- **Predictive Success** (Target: 60%)
- **Solo/Co-op Parity** (Target: ±12%)
- Session history visualization with charts
- Export data to JSON for external analysis
- Reset functionality for clean testing sessions

## Architecture

### File Structure

```
Exploration_Test/
├── index.html          # Main application UI (581 lines)
├── app.js             # Core logic and state management (2162 lines)
├── styles.css         # Dark space theme styling (987 lines)
├── data.json          # Scientific fields & tech tree data (262 lines)
├── start_server.py    # LAN-accessible HTTP server
├── start.bat          # Windows startup script
├── start.sh           # Linux/Mac startup script
├── .gitignore         # Git ignore patterns
├── .hintrc            # Hint configuration
└── docs/
    └── exploration_overhaul_design.md
```

### Technology Stack

- **Frontend**: Vanilla JavaScript, HTML5 Canvas, CSS3
- **Data**: JSON-based configuration (async loading)
- **Server**: Python HTTP server (cross-platform)
- **No Dependencies**: Runs entirely in browser, no frameworks required

## Usage Guide

### Testing Workflow

1. **Exploration Verbs**:
   - Click each verb card to test interaction mechanics
   - Observe how different verbs require different player skills
   - Use for prototyping discovery types

2. **Material Generator**:
   - Generate objects with different types, biomes, and rarities
   - Analyze scientific field distribution
   - Test evolution/mutation mechanics
   - Allocate objects to tech tree research
   - Calculate tech unlock progress

3. **Reward System**:
   - Test REP scaling at different discovery counts
   - Compare first discoverer vs. repeat discovery values
   - Use Discovery Log to track session statistics
   - Validate diminishing returns balance

4. **Ecology Simulator**:
   - Harvest resources and observe ecosystem response
   - Use "Skip Day" to test recovery mechanics
   - Monitor world health and harvest warnings
   - Test sustainability of farming vs. exploration

5. **Mystery Budget**:
   - Generate maps for different biomes
   - Analyze discovery density and distribution
   - Validate biome-specific generation patterns

6. **Loop Timer**:
   - Time yourself through each phase
   - Validate against 5-8 minute target
   - Use for pacing design iteration

7. **Metrics Dashboard**:
   - Monitor all KPIs in real-time
   - Export session data for analysis
   - Reset between testing sessions

### Developer Notes

Each major tab includes developer notes explaining:

- **Purpose**: What the system tests
- **Mechanics**: How it works
- **Design Goals**: What it's trying to achieve

These provide context for understanding design decisions and testing focus.

## Data Export

The Metrics Dashboard "Export Data (JSON)" button saves:

- Complete metrics history
- Reward generation results
- Ecology state snapshots
- Loop timing data
- Session timestamps

Use exported data for:

- External analysis in spreadsheets
- Tracking changes across iterations
- Sharing results with team members
- Creating balance documentation

## Testing Tips

### Quick Iteration

- Developer notes provide instant context
- Generate batches of 10 objects for faster testing
- Use comparison panels to see scaling effects
- Session stats reveal long-term balance issues

### Balance Validation

- Ecology warnings show when farming becomes problematic
- Reward comparison highlights diminishing returns
- Tech tree shows if certain fields are over/under-represented
- Metrics dashboard validates against design KPIs

### Common Workflows

- **New Object Type**: Generate 10, check field distribution, test tech tree impact
- **Reward Balance**: Compare REP at counts 0, 5, 10, 20 across all rarities
- **Ecosystem Design**: Harvest until critical, note recovery time
- **Loop Pacing**: Run multiple loops, export timing data

## Browser Compatibility

Tested and working on:

- Chrome 90+
- Firefox 88+
- Edge 90+
- Safari 14+

Requires HTML5 Canvas support and ES6 JavaScript features.

## Known Limitations

- Server must run for JSON data loading (file:// protocol doesn't support fetch API)
- Session data stored in memory (cleared on page refresh)
- Canvas rendering may vary slightly across browsers
- Large inventories (100+ objects) may impact performance

## Troubleshooting

### Server Won't Start

If you encounter issues starting the server:

```powershell
# Check if port 8000 is already in use
netstat -ano | findstr :8000

# Try using Python directly
python start_server.py

# Or specify a different port
python -m http.server 8001
```

### Can't Access Over LAN

1. Check Windows Firewall settings
2. Ensure devices are on the same network
3. Verify your IP address: `ipconfig` (Windows) or `ifconfig` (Linux/Mac)
4. Try accessing with the IP shown in the server output

### Page Loads But Data Doesn't Appear

- Ensure `data.json` is in the same directory
- Check browser console for errors (F12)
- Verify server is running (shouldn't get 404 errors)
- Try a hard refresh (Ctrl + Shift + R)

## Future Enhancements

Potential additions:

- Persistent storage (LocalStorage/IndexedDB)
- Object comparison tools
- Tech tree visualization
- Biome preset templates
- A/B testing framework

---

**Version:** 1.1  
**Last Updated:** November 10, 2025  
**Repository:** [h34tsink/Exploration_Test](https://github.com/h34tsink/Exploration_Test)  
**Based on:** Exploration Overhaul Design Document v1.0
