# Space MMO Open Universe GameTags - Deep Dive

**Document Version:** 1.0  
**Date:** November 11, 2025  
**Author:** Nova Praxis Systems Architecture  
**Purpose:** Comprehensive taxonomy design for space MMO gameplay tag architecture

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [GameTags Architecture Philosophy](#gametags-architecture-philosophy)
3. [Tag Hierarchy Design Principles](#tag-hierarchy-design-principles)
4. [Core Tag Categories](#core-tag-categories)
5. [Detailed Tag Taxonomies](#detailed-tag-taxonomies)
6. [Tag Usage Patterns](#tag-usage-patterns)
7. [Performance Considerations](#performance-considerations)
8. [Integration Guidelines](#integration-guidelines)
9. [Implementation Examples](#implementation-examples)

---

## Executive Summary

This document presents a complete GameplayTags architecture for a space-themed MMO with an open universe design. The system encompasses **2,000+ hierarchical tags** across **23 major categories**, designed to support:

- **Player Progression**: Skills, attributes, reputation, ranks
- **Ship Systems**: Components, loadouts, states, capabilities
- **Universe Simulation**: Celestial bodies, regions, phenomena, weather
- **Economy**: Resources, trade, manufacturing, markets
- **Combat**: Weapons, damage types, tactics, combat states
- **Social Systems**: Factions, diplomacy, organizations, communication
- **Exploration**: Discovery, scanning, anomalies, archaeology
- **Character Systems**: Classes, specializations, traits, conditions
- **Mission Systems**: Quest types, objectives, rewards, progression
- **PvP/PvE**: Combat modes, zones, rankings, matchmaking
- **Crafting**: Blueprints, materials, quality, modifications
- **Environmental**: Hazards, buffs, debuffs, zones
- **Technology**: Research trees, unlocks, tiers, categories
- **Events**: Dynamic events, triggers, rewards, states
- **UI/UX**: Interface states, notifications, tutorials

### Key Statistics

- **Total Tags**: ~2,000+
- **Root Categories**: 23
- **Max Hierarchy Depth**: 5 levels
- **Designed for**: MMO scalability, network replication, database queries
- **Engine Target**: Unreal Engine 5 (GameplayTags system)

---

## GameTags Architecture Philosophy

### Why GameplayTags?

GameplayTags provide a **lightweight, replicated, hierarchical** system for categorizing and querying game state. In a space MMO context, they enable:

1. **Flexible Gameplay Logic**: Query ships for `Ship.Capability.Warp` instead of hardcoded class checks
2. **Network Efficiency**: Tags replicate as compact identifiers rather than full data structures
3. **Designer-Friendly**: Non-programmers can modify gameplay by adding/removing tags
4. **Database Integration**: Tags can be indexed for player search, market filtering, faction queries
5. **AI Decision Making**: NPCs can query tags to determine combat tactics, trading behavior
6. **Procedural Generation**: Use tags to categorize generated content (planets, missions, encounters)

### Design Goals

- **Discoverability**: Clear hierarchy makes tags easy to find
- **Consistency**: Naming conventions follow strict patterns
- **Scalability**: Architecture supports expansion to 5,000+ tags
- **Performance**: Fast queries even with thousands of active tags per entity
- **Multiplayer**: Tags designed for server authority and client prediction
- **Modularity**: Categories can be enabled/disabled for different game modes

---

## Tag Hierarchy Design Principles

### Naming Conventions

1. **PascalCase**: All tags use PascalCase: `Ship.Component.Engine.Warp`
2. **Hierarchical Structure**: Parent.Child.GrandChild.GreatGrandChild
3. **No Abbreviations**: Prefer `Shield.Regeneration` over `Shield.Regen`
4. **Verb Forms**: Actions use present tense: `Action.Fire`, not `Action.Firing`
5. **Singular Nouns**: `Ship.Type.Frigate` not `Ship.Types.Frigates`

### Hierarchy Depth Guidelines

- **Level 1 (Root)**: Broad category (e.g., `Ship`, `Player`, `Combat`)
- **Level 2**: Major subdivision (e.g., `Ship.Component`, `Ship.Type`, `Ship.State`)
- **Level 3**: Specific classification (e.g., `Ship.Component.Weapon`, `Ship.Type.Capital`)
- **Level 4**: Fine-grained detail (e.g., `Ship.Component.Weapon.Projectile`)
- **Level 5**: Extreme specificity (e.g., `Ship.Component.Weapon.Projectile.Kinetic`)

### Tag Query Patterns

Tags support hierarchical queries:

```cpp
// Match exact tag
HasTag("Ship.Type.Cruiser")

// Match all children (Cruiser, Battlecruiser, etc.)
HasTagExact("Ship.Type")

// Match any parent in hierarchy
HasTagAny({"Ship.Type.Cruiser", "Ship.Type.Destroyer"})

// Match all required tags
HasAllTags({"Ship.Capability.Cloak", "Ship.Capability.Warp"})
```

---

## Core Tag Categories

### Category Overview

| Category | Root Tag | Tag Count | Purpose |
|----------|----------|-----------|---------|
| **Player** | `Player` | ~150 | Character attributes, skills, progression |
| **Ship** | `Ship` | ~300 | Ship types, components, states, capabilities |
| **Celestial** | `Celestial` | ~200 | Planets, stars, moons, phenomena |
| **Resource** | `Resource` | ~120 | Materials, commodities, currencies |
| **Combat** | `Combat` | ~180 | Weapons, damage, tactics, states |
| **Faction** | `Faction` | ~100 | Factions, reputation, diplomacy |
| **Mission** | `Mission` | ~140 | Quest types, objectives, rewards |
| **Station** | `Station` | ~90 | Space stations, outposts, facilities |
| **Economy** | `Economy` | ~110 | Trade, markets, manufacturing |
| **Technology** | `Technology` | ~160 | Research, unlocks, blueprints |
| **Exploration** | `Exploration` | ~130 | Discovery, scanning, archaeology |
| **Social** | `Social` | ~80 | Organizations, communication, events |
| **PvP** | `PvP` | ~70 | Combat zones, rankings, modes |
| **PvE** | `PvE` | ~90 | AI enemies, encounters, difficulty |
| **Environment** | `Environment` | ~100 | Hazards, weather, zones |
| **Crafting** | `Crafting` | ~120 | Manufacturing, modification, quality |
| **Event** | `Event` | ~150 | Dynamic events, triggers, states |
| **Ability** | `Ability` | ~140 | Active skills, cooldowns, effects |
| **Status** | `Status` | ~110 | Buffs, debuffs, conditions |
| **Region** | `Region` | ~80 | Space zones, territories, control |
| **NPC** | `NPC` | ~100 | AI types, behaviors, roles |
| **UI** | `UI` | ~60 | Interface states, notifications |
| **Analytics** | `Analytics` | ~50 | Tracking, telemetry, metrics |

**Total Estimated Tags**: ~2,430

---

## Detailed Tag Taxonomies

### 1. Player Tags (`Player`)

Player tags categorize character progression, skills, attributes, and states.

#### 1.1 Player.Class

```text
Player.Class                          // Root for player classes
Player.Class.Pilot                    // Ship combat specialist
Player.Class.Pilot.Fighter           // Small ship dogfighter
Player.Class.Pilot.Bomber            // Heavy ordinance specialist
Player.Class.Pilot.Interceptor       // Fast pursuit specialist
Player.Class.Engineer                 // Ship systems specialist
Player.Class.Engineer.Mechanical     // Hull/armor specialist
Player.Class.Engineer.Electrical     // Power/shields specialist
Player.Class.Engineer.Propulsion     // Engine/warp specialist
Player.Class.Trader                   // Commerce specialist
Player.Class.Trader.Merchant         // Commodity trading
Player.Class.Trader.Smuggler         // Black market operations
Player.Class.Trader.Industrialist    // Manufacturing focus
Player.Class.Explorer                 // Discovery specialist
Player.Class.Explorer.Surveyor       // Planet/asteroid scanning
Player.Class.Explorer.Xenobiologist  // Alien life specialist
Player.Class.Explorer.Archaeologist  // Ancient ruins specialist
Player.Class.Scientist                // Research specialist
Player.Class.Scientist.Physicist     // Energy/matter research
Player.Class.Scientist.Chemist       // Materials/synthesis
Player.Class.Scientist.Geneticist    // Biological research
Player.Class.Marine                   // Ground combat specialist
Player.Class.Marine.Assault          // Heavy weapons
Player.Class.Marine.Stealth          // Infiltration
Player.Class.Marine.Medic            // Field medicine
Player.Class.Diplomat                 // Faction relations specialist
Player.Class.Diplomat.Negotiator     // Trade agreements
Player.Class.Diplomat.Spy            // Intelligence gathering
Player.Class.Diplomat.Ambassador     // Political influence
```

#### 1.2 Player.Skill

```text
Player.Skill                          // Root for skills
Player.Skill.Combat                   // Combat skills
Player.Skill.Combat.Gunnery          // Weapon accuracy
Player.Skill.Combat.Missile          // Missile systems
Player.Skill.Combat.Tactics          // Combat maneuvers
Player.Skill.Combat.EvasiveManeuvering
Player.Skill.Combat.TargetTracking
Player.Skill.Engineering             // Engineering skills
Player.Skill.Engineering.Repair
Player.Skill.Engineering.Overcharge
Player.Skill.Engineering.Efficiency
Player.Skill.Navigation              // Navigation skills
Player.Skill.Navigation.Warp
Player.Skill.Navigation.Jump
Player.Skill.Navigation.Autopilot
Player.Skill.Science                 // Science skills
Player.Skill.Science.Scanning
Player.Skill.Science.Research
Player.Skill.Science.Analysis
Player.Skill.Trade                   // Trading skills
Player.Skill.Trade.Negotiation
Player.Skill.Trade.Appraisal
Player.Skill.Trade.Manufacturing
Player.Skill.Social                  // Social skills
Player.Skill.Social.Leadership
Player.Skill.Social.Diplomacy
Player.Skill.Social.Intimidation
Player.Skill.Mining                  // Resource gathering
Player.Skill.Mining.AsteroidMining
Player.Skill.Mining.GasHarvesting
Player.Skill.Mining.Salvage
```

#### 1.3 Player.Attribute

```text
Player.Attribute                      // Character attributes
Player.Attribute.Physical            // Physical stats
Player.Attribute.Physical.Strength
Player.Attribute.Physical.Dexterity
Player.Attribute.Physical.Endurance
Player.Attribute.Mental              // Mental stats
Player.Attribute.Mental.Intelligence
Player.Attribute.Mental.Perception
Player.Attribute.Mental.Willpower
Player.Attribute.Social              // Social stats
Player.Attribute.Social.Charisma
Player.Attribute.Social.Leadership
Player.Attribute.Social.Intimidation
```

#### 1.4 Player.Reputation

```text
Player.Reputation                     // Faction standings
Player.Reputation.Military           // Military faction standing
Player.Reputation.Military.Friendly
Player.Reputation.Military.Neutral
Player.Reputation.Military.Hostile
Player.Reputation.Trading            // Trading guild standing
Player.Reputation.Scientific         // Science coalition
Player.Reputation.Criminal           // Pirate/smuggler rep
Player.Reputation.Rank               // Specific ranks
Player.Reputation.Rank.Cadet
Player.Reputation.Rank.Lieutenant
Player.Reputation.Rank.Commander
Player.Reputation.Rank.Captain
Player.Reputation.Rank.Admiral
```

#### 1.5 Player.State

```text
Player.State                          // Player states
Player.State.InCombat
Player.State.Trading
Player.State.Docked
Player.State.Piloting
Player.State.EVA                     // Extra-vehicular activity
Player.State.Scanning
Player.State.Mining
Player.State.Crafting
Player.State.Dead
Player.State.Incapacitated
Player.State.Cloaked
Player.State.Warping
```

---

### 2. Ship Tags (`Ship`)

Ship tags are the most extensive category, covering types, components, states, and capabilities.

#### 2.1 Ship.Type

```text
Ship.Type                             // Root for ship types
Ship.Type.Fighter                    // Small combat ships
Ship.Type.Fighter.Light              // Light fighter
Ship.Type.Fighter.Heavy              // Heavy fighter
Ship.Type.Fighter.Interceptor        // Fast interceptor
Ship.Type.Fighter.Bomber             // Bomber variant
Ship.Type.Corvette                   // Small multi-role
Ship.Type.Frigate                    // Medium combat
Ship.Type.Frigate.Assault            // Attack frigate
Ship.Type.Frigate.Support            // Support frigate
Ship.Type.Frigate.Stealth            // Stealth frigate
Ship.Type.Destroyer                  // Heavy combat
Ship.Type.Destroyer.Missile          // Missile destroyer
Ship.Type.Destroyer.Railgun          // Railgun destroyer
Ship.Type.Cruiser                    // Large combat
Ship.Type.Cruiser.Battle             // Battle cruiser
Ship.Type.Cruiser.Heavy              // Heavy cruiser
Ship.Type.Cruiser.Strike             // Strike cruiser
Ship.Type.Battleship                 // Capital combat
Ship.Type.Carrier                    // Fighter carrier
Ship.Type.Carrier.Fleet              // Fleet carrier
Ship.Type.Carrier.Assault            // Assault carrier
Ship.Type.Dreadnought                // Super capital
Ship.Type.Titan                      // Massive capital
Ship.Type.Freighter                  // Cargo ships
Ship.Type.Freighter.Light            // Light cargo
Ship.Type.Freighter.Heavy            // Heavy cargo
Ship.Type.Freighter.Bulk             // Bulk hauler
Ship.Type.Transport                  // Passenger transport
Ship.Type.Mining                     // Mining vessels
Ship.Type.Mining.Asteroid            // Asteroid miner
Ship.Type.Mining.Gas                 // Gas harvester
Ship.Type.Mining.Ice                 // Ice miner
Ship.Type.Industrial                 // Industrial ships
Ship.Type.Industrial.Constructor     // Ship constructor
Ship.Type.Industrial.Refinery        // Refinery ship
Ship.Type.Science                    // Science vessels
Ship.Type.Science.Survey             // Survey ship
Ship.Type.Science.Research           // Research vessel
Ship.Type.Science.Explorer           // Deep space explorer
Ship.Type.Support                    // Support ships
Ship.Type.Support.Repair             // Repair ship
Ship.Type.Support.Medical            // Medical ship
Ship.Type.Support.Command            // Command ship
Ship.Type.Stealth                    // Stealth ships
Ship.Type.Stealth.Recon              // Recon ship
Ship.Type.Stealth.Infiltrator        // Infiltration ship
```

#### 2.2 Ship.Component

```text
Ship.Component                        // Ship components
Ship.Component.Weapon                // Weapons
Ship.Component.Weapon.Projectile     // Projectile weapons
Ship.Component.Weapon.Projectile.Kinetic
Ship.Component.Weapon.Projectile.Explosive
Ship.Component.Weapon.Projectile.Incendiary
Ship.Component.Weapon.Energy         // Energy weapons
Ship.Component.Weapon.Energy.Laser
Ship.Component.Weapon.Energy.Plasma
Ship.Component.Weapon.Energy.Ion
Ship.Component.Weapon.Energy.Particle
Ship.Component.Weapon.Missile        // Missile systems
Ship.Component.Weapon.Missile.Standard
Ship.Component.Weapon.Missile.Guided
Ship.Component.Weapon.Missile.Torpedo
Ship.Component.Weapon.Missile.Cruise
Ship.Component.Weapon.Exotic         // Exotic weapons
Ship.Component.Weapon.Exotic.Graviton
Ship.Component.Weapon.Exotic.Quantum
Ship.Component.Weapon.Exotic.Antimatter

Ship.Component.Defense               // Defense systems
Ship.Component.Defense.Shield        // Shields
Ship.Component.Defense.Shield.Light
Ship.Component.Defense.Shield.Medium
Ship.Component.Defense.Shield.Heavy
Ship.Component.Defense.Shield.Capital
Ship.Component.Defense.Armor         // Armor
Ship.Component.Defense.Armor.Light
Ship.Component.Defense.Armor.Medium
Ship.Component.Defense.Armor.Heavy
Ship.Component.Defense.Armor.Ablative
Ship.Component.Defense.Armor.Reactive
Ship.Component.Defense.Countermeasure // ECM/ECCM
Ship.Component.Defense.Countermeasure.Chaff
Ship.Component.Defense.Countermeasure.Flare
Ship.Component.Defense.Countermeasure.ECM
Ship.Component.Defense.Countermeasure.PointDefense

Ship.Component.Engine                // Propulsion
Ship.Component.Engine.Sublight       // Normal engines
Ship.Component.Engine.Sublight.Chemical
Ship.Component.Engine.Sublight.Ion
Ship.Component.Engine.Sublight.Fusion
Ship.Component.Engine.FTL            // FTL systems
Ship.Component.Engine.FTL.Warp
Ship.Component.Engine.FTL.Jump
Ship.Component.Engine.FTL.Hyperdrive
Ship.Component.Engine.Maneuvering    // Thrusters

Ship.Component.Power                 // Power systems
Ship.Component.Power.Reactor
Ship.Component.Power.Reactor.Fusion
Ship.Component.Power.Reactor.Antimatter
Ship.Component.Power.Reactor.ZeroPoint
Ship.Component.Power.Capacitor
Ship.Component.Power.Generator

Ship.Component.Sensor                // Sensors
Ship.Component.Sensor.Radar
Ship.Component.Sensor.Lidar
Ship.Component.Sensor.Gravitational
Ship.Component.Sensor.Quantum
Ship.Component.Sensor.LongRange
Ship.Component.Sensor.ShortRange

Ship.Component.Special               // Special systems
Ship.Component.Special.Cloak
Ship.Component.Special.MiningLaser
Ship.Component.Special.SalvageDrone
Ship.Component.Special.RepairDrone
Ship.Component.Special.TractorBeam
Ship.Component.Special.JumpDrive
Ship.Component.Special.CargoExpander
```

#### 2.3 Ship.Capability

```text
Ship.Capability                       // Ship capabilities
Ship.Capability.Warp                 // Can warp
Ship.Capability.Jump                 // Can jump
Ship.Capability.Cloak                // Can cloak
Ship.Capability.Mine                 // Can mine
Ship.Capability.Salvage              // Can salvage
Ship.Capability.Repair               // Can repair
Ship.Capability.Trade                // Can trade
Ship.Capability.Scan                 // Can scan
Ship.Capability.Launch               // Can launch fighters
Ship.Capability.Dock                 // Can dock small ships
Ship.Capability.Manufacture          // Can manufacture
Ship.Capability.Research             // Can research
```

#### 2.4 Ship.State

```text
Ship.State                            // Ship states
Ship.State.Operational
Ship.State.Damaged
Ship.State.Critical
Ship.State.Destroyed
Ship.State.Docked
Ship.State.Warping
Ship.State.Jumping
Ship.State.Cloaked
Ship.State.Anchored
Ship.State.Overheating
Ship.State.ShieldsDown
Ship.State.PowerLoss
Ship.State.EngineDamage
Ship.State.WeaponsDamage
Ship.State.LifeSupportFailure
```

#### 2.5 Ship.Size

```text
Ship.Size                             // Ship size categories
Ship.Size.Small                      // Fighter/corvette
Ship.Size.Medium                     // Frigate/destroyer
Ship.Size.Large                      // Cruiser/battleship
Ship.Size.Capital                    // Carrier/dreadnought
Ship.Size.SuperCapital               // Titan
```

---

### 3. Celestial Tags (`Celestial`)

Celestial tags categorize astronomical bodies and phenomena.

#### 3.1 Celestial.Star

```text
Celestial.Star                        // Stars
Celestial.Star.Type                  // Star types
Celestial.Star.Type.MainSequence     // Main sequence stars
Celestial.Star.Type.MainSequence.O   // Blue giants
Celestial.Star.Type.MainSequence.B   // Blue-white
Celestial.Star.Type.MainSequence.A   // White
Celestial.Star.Type.MainSequence.F   // Yellow-white
Celestial.Star.Type.MainSequence.G   // Yellow (Sun-like)
Celestial.Star.Type.MainSequence.K   // Orange
Celestial.Star.Type.MainSequence.M   // Red dwarf
Celestial.Star.Type.Giant            // Giant stars
Celestial.Star.Type.Giant.Red
Celestial.Star.Type.Giant.Blue
Celestial.Star.Type.Giant.Yellow
Celestial.Star.Type.SuperGiant       // Supergiants
Celestial.Star.Type.WhiteDwarf       // White dwarf
Celestial.Star.Type.NeutronStar      // Neutron star
Celestial.Star.Type.Pulsar           // Pulsar
Celestial.Star.Type.BlackHole        // Black hole
Celestial.Star.Type.BlackHole.Stellar
Celestial.Star.Type.BlackHole.Supermassive
Celestial.Star.System                // Star systems
Celestial.Star.System.Single         // Single star
Celestial.Star.System.Binary         // Binary system
Celestial.Star.System.Trinary        // Three stars
Celestial.Star.System.Multiple       // Multiple stars
```

#### 3.2 Celestial.Planet

```text
Celestial.Planet                      // Planets
Celestial.Planet.Type                // Planet types
Celestial.Planet.Type.Terrestrial    // Rocky planets
Celestial.Planet.Type.Terrestrial.Barren
Celestial.Planet.Type.Terrestrial.Desert
Celestial.Planet.Type.Terrestrial.Tundra
Celestial.Planet.Type.Terrestrial.Oceanic
Celestial.Planet.Type.Terrestrial.Volcanic
Celestial.Planet.Type.Terrestrial.Earthlike
Celestial.Planet.Type.GasGiant       // Gas giants
Celestial.Planet.Type.GasGiant.Jupiter   // Jupiter-like
Celestial.Planet.Type.GasGiant.Saturn    // Saturn-like
Celestial.Planet.Type.GasGiant.Uranus    // Ice giant
Celestial.Planet.Type.IceGiant       // Ice giants
Celestial.Planet.Type.Lava           // Lava planet
Celestial.Planet.Type.Carbon         // Carbon planet
Celestial.Planet.Type.Iron           // Iron planet
Celestial.Planet.Habitability        // Habitability
Celestial.Planet.Habitability.Habitable
Celestial.Planet.Habitability.Marginal
Celestial.Planet.Habitability.Uninhabitable
Celestial.Planet.Habitability.Toxic
Celestial.Planet.Atmosphere          // Atmosphere
Celestial.Planet.Atmosphere.None
Celestial.Planet.Atmosphere.Thin
Celestial.Planet.Atmosphere.Standard
Celestial.Planet.Atmosphere.Dense
Celestial.Planet.Atmosphere.Toxic
Celestial.Planet.Temperature         // Temperature
Celestial.Planet.Temperature.Frozen
Celestial.Planet.Temperature.Cold
Celestial.Planet.Temperature.Temperate
Celestial.Planet.Temperature.Hot
Celestial.Planet.Temperature.Molten
```

#### 3.3 Celestial.Moon

```text
Celestial.Moon                        // Moons
Celestial.Moon.Type.Rocky
Celestial.Moon.Type.Icy
Celestial.Moon.Type.Volcanic
Celestial.Moon.Type.Captured        // Captured asteroid
Celestial.Moon.Size.Small
Celestial.Moon.Size.Medium
Celestial.Moon.Size.Large
```

#### 3.4 Celestial.Phenomenon

```text
Celestial.Phenomenon                  // Space phenomena
Celestial.Phenomenon.Nebula          // Nebulae
Celestial.Phenomenon.Nebula.Emission
Celestial.Phenomenon.Nebula.Reflection
Celestial.Phenomenon.Nebula.Dark
Celestial.Phenomenon.Nebula.Planetary
Celestial.Phenomenon.Nebula.Supernova
Celestial.Phenomenon.AsteroidBelt
Celestial.Phenomenon.AsteroidField
Celestial.Phenomenon.CometTrail
Celestial.Phenomenon.IonStorm
Celestial.Phenomenon.GravityWell
Celestial.Phenomenon.QuantumAnomaly
Celestial.Phenomenon.Wormhole
Celestial.Phenomenon.Wormhole.Stable
Celestial.Phenomenon.Wormhole.Unstable
Celestial.Phenomenon.SpaceTimeRift
Celestial.Phenomenon.DarkMatterCloud
Celestial.Phenomenon.RadiationBelt
```

---

### 4. Resource Tags (`Resource`)

Resources are the economy's foundation.

#### 4.1 Resource.Raw

```text
Resource.Raw                          // Raw materials
Resource.Raw.Metal                   // Metals
Resource.Raw.Metal.Iron
Resource.Raw.Metal.Copper
Resource.Raw.Metal.Titanium
Resource.Raw.Metal.Aluminum
Resource.Raw.Metal.Platinum
Resource.Raw.Metal.Gold
Resource.Raw.Metal.Uranium
Resource.Raw.Mineral                 // Minerals
Resource.Raw.Mineral.Silicon
Resource.Raw.Mineral.Carbon
Resource.Raw.Mineral.Sulfur
Resource.Raw.Mineral.Phosphorus
Resource.Raw.Crystal                 // Crystals
Resource.Raw.Crystal.Quartz
Resource.Raw.Crystal.Diamond
Resource.Raw.Crystal.Exotic
Resource.Raw.Gas                     // Gases
Resource.Raw.Gas.Hydrogen
Resource.Raw.Gas.Helium
Resource.Raw.Gas.Nitrogen
Resource.Raw.Gas.Oxygen
Resource.Raw.Gas.Methane
Resource.Raw.Ice                     // Ice
Resource.Raw.Ice.Water
Resource.Raw.Ice.Ammonia
Resource.Raw.Ice.CO2
Resource.Raw.Organic                 // Organics
Resource.Raw.Organic.Biomass
Resource.Raw.Organic.Protein
Resource.Raw.Organic.Hydrocarbon
```

#### 4.2 Resource.Processed

```text
Resource.Processed                    // Processed materials
Resource.Processed.Alloy             // Alloys
Resource.Processed.Alloy.Steel
Resource.Processed.Alloy.Titanium
Resource.Processed.Alloy.Composite
Resource.Processed.Polymer           // Polymers
Resource.Processed.Polymer.Plastic
Resource.Processed.Polymer.Fiber
Resource.Processed.Polymer.Resin
Resource.Processed.Fuel              // Fuels
Resource.Processed.Fuel.Chemical
Resource.Processed.Fuel.Nuclear
Resource.Processed.Fuel.Antimatter
Resource.Processed.Electronics       // Electronics
Resource.Processed.Electronics.Chip
Resource.Processed.Electronics.Sensor
Resource.Processed.Electronics.Power
```

#### 4.3 Resource.Commodity

```text
Resource.Commodity                    // Trade commodities
Resource.Commodity.Food
Resource.Commodity.Water
Resource.Commodity.Medicine
Resource.Commodity.Luxury
Resource.Commodity.Technology
Resource.Commodity.Weapons
Resource.Commodity.Slaves            // Illegal
Resource.Commodity.Narcotics         // Illegal
```

#### 4.4 Resource.Currency

```text
Resource.Currency                     // Currencies
Resource.Currency.Credits            // Standard credits
Resource.Currency.Premium            // Premium currency
Resource.Currency.Faction            // Faction-specific
Resource.Currency.Black              // Black market
```

---

### 5. Combat Tags (`Combat`)

Combat tags define weapons, damage, and combat mechanics.

#### 5.1 Combat.Damage

```text
Combat.Damage                         // Damage types
Combat.Damage.Type                   // Damage type
Combat.Damage.Type.Kinetic           // Physical damage
Combat.Damage.Type.Energy            // Energy damage
Combat.Damage.Type.Explosive         // Explosive damage
Combat.Damage.Type.Thermal           // Heat damage
Combat.Damage.Type.EMP               // Electromagnetic
Combat.Damage.Type.Ion               // Ionized particles
Combat.Damage.Type.Plasma            // Plasma
Combat.Damage.Type.Antimatter        // Antimatter
Combat.Damage.Type.Graviton          // Gravity-based
Combat.Damage.Severity               // Damage severity
Combat.Damage.Severity.Minor
Combat.Damage.Severity.Moderate
Combat.Damage.Severity.Major
Combat.Damage.Severity.Critical
Combat.Damage.Severity.Catastrophic
```

#### 5.2 Combat.Weapon

```text
Combat.Weapon                         // Weapon categories
Combat.Weapon.Class                  // Weapon class
Combat.Weapon.Class.Light
Combat.Weapon.Class.Medium
Combat.Weapon.Class.Heavy
Combat.Weapon.Class.Capital
Combat.Weapon.Range                  // Range
Combat.Weapon.Range.Close
Combat.Weapon.Range.Medium
Combat.Weapon.Range.Long
Combat.Weapon.Range.Extreme
Combat.Weapon.Tracking               // Tracking
Combat.Weapon.Tracking.Poor
Combat.Weapon.Tracking.Average
Combat.Weapon.Tracking.Good
Combat.Weapon.Tracking.Excellent
```

#### 5.3 Combat.Tactic

```text
Combat.Tactic                         // Combat tactics
Combat.Tactic.Offensive              // Offensive tactics
Combat.Tactic.Offensive.Brawl        // Close combat
Combat.Tactic.Offensive.Kite         // Hit and run
Combat.Tactic.Offensive.Alpha        // Alpha strike
Combat.Tactic.Offensive.Siege        // Long range bombardment
Combat.Tactic.Defensive              // Defensive tactics
Combat.Tactic.Defensive.Tank         // Absorb damage
Combat.Tactic.Defensive.Evasive      // Dodge
Combat.Tactic.Defensive.Shield       // Shield focus
Combat.Tactic.Support                // Support tactics
Combat.Tactic.Support.Repair
Combat.Tactic.Support.ECM
Combat.Tactic.Support.Buff
```

#### 5.4 Combat.State

```text
Combat.State                          // Combat states
Combat.State.InCombat
Combat.State.Targeting
Combat.State.Firing
Combat.State.Reloading
Combat.State.Overheated
Combat.State.OutOfAmmo
Combat.State.WeaponJammed
Combat.State.EvasiveManeuvers
Combat.State.Retreating
```

---

### 6. Faction Tags (`Faction`)

Factions drive the political landscape.

#### 6.1 Faction.Type

```text
Faction.Type                          // Faction types
Faction.Type.Military                // Military factions
Faction.Type.Military.Navy
Faction.Type.Military.Marines
Faction.Type.Military.Intelligence
Faction.Type.Corporate               // Corporations
Faction.Type.Corporate.Mining
Faction.Type.Corporate.Manufacturing
Faction.Type.Corporate.Trading
Faction.Type.Corporate.Technology
Faction.Type.Scientific              // Science organizations
Faction.Type.Scientific.Research
Faction.Type.Scientific.Exploration
Faction.Type.Criminal                // Criminal organizations
Faction.Type.Criminal.Pirates
Faction.Type.Criminal.Smugglers
Faction.Type.Criminal.Cartel
Faction.Type.Religious               // Religious groups
Faction.Type.Political               // Political groups
Faction.Type.Mercenary               // Mercenary groups
```

#### 6.2 Faction.Relation

```text
Faction.Relation                      // Faction relations
Faction.Relation.Allied
Faction.Relation.Friendly
Faction.Relation.Neutral
Faction.Relation.Unfriendly
Faction.Relation.Hostile
Faction.Relation.AtWar
```

#### 6.3 Faction.Territory

```text
Faction.Territory                     // Territory control
Faction.Territory.Core               // Core territory
Faction.Territory.Controlled         // Controlled space
Faction.Territory.Contested          // Contested zones
Faction.Territory.Border             // Border regions
```

---

### 7. Mission Tags (`Mission`)

Missions drive player engagement.

#### 7.1 Mission.Type

```text
Mission.Type                          // Mission types
Mission.Type.Combat                  // Combat missions
Mission.Type.Combat.Patrol
Mission.Type.Combat.Assault
Mission.Type.Combat.Defense
Mission.Type.Combat.Bounty
Mission.Type.Combat.Assassination
Mission.Type.Trade                   // Trade missions
Mission.Type.Trade.Delivery
Mission.Type.Trade.Courier
Mission.Type.Trade.Smuggling
Mission.Type.Mining                  // Mining missions
Mission.Type.Mining.Harvest
Mission.Type.Mining.Survey
Mission.Type.Exploration             // Exploration missions
Mission.Type.Exploration.Survey
Mission.Type.Exploration.Discovery
Mission.Type.Exploration.Archaeology
Mission.Type.Rescue                  // Rescue missions
Mission.Type.Rescue.Personnel
Mission.Type.Rescue.Ship
Mission.Type.Escort                  // Escort missions
Mission.Type.Research                // Research missions
Mission.Type.Diplomacy               // Diplomacy missions
```

#### 7.2 Mission.Difficulty

```text
Mission.Difficulty                    // Difficulty levels
Mission.Difficulty.Trivial
Mission.Difficulty.Easy
Mission.Difficulty.Normal
Mission.Difficulty.Hard
Mission.Difficulty.Extreme
Mission.Difficulty.Impossible
```

#### 7.3 Mission.Objective

```text
Mission.Objective                     // Objective types
Mission.Objective.Destroy
Mission.Objective.Collect
Mission.Objective.Deliver
Mission.Objective.Scan
Mission.Objective.Rescue
Mission.Objective.Protect
Mission.Objective.Infiltrate
Mission.Objective.Hack
Mission.Objective.Negotiate
```

---

### 8. Additional Categories (Summary)

Due to length constraints, here's a summary of remaining major categories:

#### 8. Station Tags (`Station`)

- Station types (Trading Hub, Military Starbase, Mining Outpost)
- Services (Repair, Refuel, Market, Research)
- Security levels
- Size categories

#### 9. Economy Tags (`Economy`)

- Market conditions (Bull, Bear, Stable, Volatile)
- Trade routes
- Manufacturing chains
- Economic zones

#### 10. Technology Tags (`Technology`)

- Research fields (matching Science tags)
- Tech tiers (T1-T10)
- Unlock requirements
- Blueprint categories

#### 11. Exploration Tags (`Exploration`)

- Discovery types (Scan, Sample, Analyze, Decode)
- Anomaly categories
- Archaeological sites
- Scanning modes

#### 12. Social Tags (`Social`)

- Organizations (Corporations, Guilds, Alliances)
- Communication channels
- Events (Social, PvP, PvE, Trade)
- Roles (Leader, Officer, Member)

#### 13. PvP Tags (`PvP`)

- Combat zones (Low Sec, Null Sec, Arena)
- Rankings (Bronze, Silver, Gold, Platinum, Diamond)
- Match modes (Deathmatch, Team, Siege, Conquest)

#### 14. PvE Tags (`PvE`)

- AI difficulty (Easy, Normal, Hard, Elite, Boss)
- Enemy types (Pirates, Aliens, Rogue AI)
- Encounter types (Patrol, Ambush, Siege)

#### 15. Environment Tags (`Environment`)

- Hazards (Radiation, EMP, Gravity, Temperature)
- Weather (Ion Storm, Asteroid Shower, Solar Flare)
- Zone types (Safe, Hazardous, Extreme, Deadly)

#### 16. Crafting Tags (`Crafting`)

- Blueprint rarity
- Quality levels (Poor, Common, Uncommon, Rare, Epic, Legendary)
- Modification types (Upgrade, Repair, Refit)

#### 17. Event Tags (`Event`)

- Dynamic events (Invasion, Discovery, Trade Boom, War)
- Triggers (Time, Player Count, Faction)
- Rewards (Credits, Items, Rep)

#### 18. Ability Tags (`Ability`)

- Active abilities (Cloak, Overcharge, EMP Pulse)
- Passive abilities (Damage Boost, Shield Regen)
- Cooldown states

#### 19. Status Tags (`Status`)

- Buffs (Damage+, Speed+, Shield+)
- Debuffs (Slow, EMP, Burning, Radiation)
- Conditions (Stunned, Disabled, Docked)

#### 20. Region Tags (`Region`)

- Space types (High Sec, Low Sec, Null Sec, Wormhole)
- Territory ownership
- Special zones (PvP, PvE, Safe, Trading)

#### 21. NPC Tags (`NPC`)

- AI roles (Trader, Miner, Pirate, Military)
- Behaviors (Aggressive, Defensive, Neutral, Friendly)
- Spawn types

#### 22. UI Tags (`UI`)

- Interface states (Menu, HUD, Map, Inventory)
- Notifications (Warning, Info, Critical)
- Tutorial states

#### 23. Analytics Tags (`Analytics`)

- Tracking categories (Combat, Trade, Exploration)
- Metrics (Damage Dealt, Distance Traveled, Credits Earned)
- Event logging

---

## Tag Usage Patterns

### Pattern 1: Ship Loadout Validation

```cpp
// Check if ship can equip a capital weapon
bool CanEquipCapitalWeapon(ASpaceShip* Ship)
{
    return Ship->HasTag("Ship.Size.Capital") || 
           Ship->HasTag("Ship.Size.SuperCapital");
}
```

### Pattern 2: Mission Eligibility

```cpp
// Check if player can accept combat mission
bool CanAcceptCombatMission(APlayerCharacter* Player)
{
    return Player->HasTag("Player.Class.Pilot") &&
           Player->HasMinimumSkillLevel("Player.Skill.Combat.Gunnery", 3);
}
```

### Pattern 3: Damage Calculation

```cpp
// Calculate damage reduction based on damage type
float CalculateDamageReduction(EDamageType DamageType, ASpaceShip* Target)
{
    if (DamageType == EDamageType::Kinetic)
    {
        return Target->HasTag("Ship.Component.Defense.Armor.Reactive") ? 0.75f : 0.5f;
    }
    else if (DamageType == EDamageType::Energy)
    {
        return Target->HasTag("Ship.Component.Defense.Shield.Heavy") ? 0.9f : 0.6f;
    }
    return 0.0f;
}
```

### Pattern 4: Procedural Mission Generation

```cpp
// Generate mission based on player skills and location
FMissionData GenerateMission(APlayerCharacter* Player, FVector Location)
{
    FMissionData Mission;
    
    if (IsInHighSecSpace(Location))
    {
        Mission.AddTag("Mission.Type.Trade.Delivery");
        Mission.Difficulty = "Mission.Difficulty.Easy";
    }
    else if (IsInNullSecSpace(Location))
    {
        Mission.AddTag("Mission.Type.Combat.Bounty");
        Mission.Difficulty = "Mission.Difficulty.Hard";
    }
    
    return Mission;
}
```

### Pattern 5: AI Decision Making

```cpp
// AI chooses combat tactic based on ship state
FGameplayTag ChooseCombatTactic(ASpaceShip* Ship)
{
    if (Ship->HasTag("Ship.State.ShieldsDown"))
    {
        return FGameplayTag::RequestGameplayTag("Combat.Tactic.Defensive.Evasive");
    }
    else if (Ship->GetShieldPercentage() > 0.8f)
    {
        return FGameplayTag::RequestGameplayTag("Combat.Tactic.Offensive.Brawl");
    }
    else
    {
        return FGameplayTag::RequestGameplayTag("Combat.Tactic.Offensive.Kite");
    }
}
```

---

## Performance Considerations

### Tag Query Optimization

1. **Cache Tag Containers**: Store frequently queried tags in member variables
2. **Use Exact Matches**: `HasTagExact()` is faster than hierarchical queries
3. **Batch Queries**: Query multiple tags at once using `HasAllTags()` / `HasAnyTags()`
4. **Avoid String Comparisons**: Use `FGameplayTag` handles, not string parsing

### Network Replication

- **Replicate Tag Containers**: Use `FGameplayTagContainer` with `UPROPERTY(Replicated)`
- **Delta Compression**: Only replicate tag changes, not full containers
- **Authority**: Server is authoritative for gameplay-critical tags
- **Client Prediction**: Allow client-side cosmetic tags (UI states, effects)

### Database Integration

For MMO persistence:

```sql
-- Player tags table
CREATE TABLE player_tags (
    player_id BIGINT,
    tag_name VARCHAR(255),
    acquired_at TIMESTAMP,
    PRIMARY KEY (player_id, tag_name),
    INDEX idx_tag_name (tag_name)
);

-- Query all players with specific tag
SELECT player_id FROM player_tags WHERE tag_name = 'Player.Class.Pilot.Fighter';

-- Query players with hierarchical tag match
SELECT player_id FROM player_tags WHERE tag_name LIKE 'Player.Class.Pilot%';
```

---

## Integration Guidelines

### Unreal Engine Setup

1. **DefaultGameplayTags.ini**: Define all tags in project config
2. **C++ Tag Definitions**: Create native tag handles for performance
3. **Blueprint Exposure**: Expose tag queries to Blueprint for designers
4. **Editor Tools**: Create custom editor utilities for tag management

### Tag Governance

- **Naming Authority**: Designate tag owners for each category
- **Review Process**: All new tags require design review
- **Deprecation Policy**: Mark deprecated tags, migrate data before removal
- **Documentation**: Maintain tag usage documentation and examples

### Testing Strategy

- **Unit Tests**: Test tag queries for correctness
- **Integration Tests**: Test tag-driven gameplay systems
- **Performance Tests**: Profile tag query performance at scale
- **Networking Tests**: Verify tag replication in multiplayer

---

## Implementation Examples

### Example 1: Dynamic Loot Tables

```cpp
TArray<FItemData> GenerateLoot(FGameplayTagContainer SourceTags)
{
    TArray<FItemData> Loot;
    
    // High-tier enemies drop rare materials
    if (SourceTags.HasTag(FGameplayTag::RequestGameplayTag("NPC.Difficulty.Elite")))
    {
        Loot.Add(GetRandomItem("Resource.Processed.Alloy.Titanium"));
    }
    
    // Pirate NPCs drop contraband
    if (SourceTags.HasTag(FGameplayTag::RequestGameplayTag("NPC.Type.Pirate")))
    {
        Loot.Add(GetRandomItem("Resource.Commodity.Narcotics"));
    }
    
    return Loot;
}
```

### Example 2: Station Service Access

```cpp
bool CanAccessService(APlayerCharacter* Player, EStationService Service)
{
    switch (Service)
    {
        case EStationService::BlackMarket:
            return Player->HasTag("Player.Reputation.Criminal.Friendly");
        
        case EStationService::MilitaryArmory:
            return Player->HasTag("Player.Reputation.Military.Friendly") &&
                   Player->HasTag("Player.Reputation.Rank.Lieutenant");
        
        case EStationService::ResearchLab:
            return Player->HasTag("Player.Class.Scientist");
        
        default:
            return true; // Public services
    }
}
```

### Example 3: Environmental Hazards

```cpp
void ApplyEnvironmentalEffects(ASpaceShip* Ship, FGameplayTagContainer RegionTags)
{
    if (RegionTags.HasTag("Environment.Hazard.Radiation"))
    {
        if (!Ship->HasTag("Ship.Component.Defense.Radiation"))
        {
            Ship->TakeDamage(10.0f, FDamageEvent(), nullptr, nullptr);
        }
    }
    
    if (RegionTags.HasTag("Environment.Phenomenon.IonStorm"))
    {
        Ship->ApplyDebuff("Status.Debuff.SensorsJammed");
    }
}
```

---

## Conclusion

This GameplayTags architecture provides a **comprehensive, scalable foundation** for a space MMO. The ~2,400 tags across 23 categories enable:

- **Deep gameplay systems**: Ship customization, faction dynamics, complex combat
- **Procedural content**: Mission generation, loot tables, NPC behaviors
- **Player progression**: Skills, reputation, unlocks, achievements
- **MMO features**: Server-side validation, database queries, matchmaking
- **Designer empowerment**: Non-programmers can modify gameplay via tags

The hierarchical structure ensures **discoverability and maintainability** as the game scales to thousands of unique items, ships, abilities, and content pieces.

---

**Next Steps:**

1. Review and approve tag categories with game design team
2. Implement tag generator tool (see companion `space_mmo_gametags.html`)
3. Create C++ native tag definitions for performance-critical tags
4. Set up database schema for persistent tag storage
5. Develop editor tools for tag validation and migration

---

Document End
