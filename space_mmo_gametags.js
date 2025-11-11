const CATEGORY_DEFINITIONS = [
  {
    id: "player",
    name: "Player",
    rootTag: "Player",
    approxCount: 150,
    group: "core",
    description: "Character attributes, skills, and progression",
    nodes: [
      {
        tag: "Player",
        desc: "Root tag for player gameplay systems",
        children: [
          {
            tag: "Player.Class",
            desc: "Player role specializations",
            children: [
              {
                tag: "Player.Class.Pilot",
                desc: "Ship combat specialist",
                children: [
                  { tag: "Player.Class.Pilot.Fighter", desc: "Small ship dogfighter" },
                  { tag: "Player.Class.Pilot.Bomber", desc: "Heavy ordinance specialist" },
                  { tag: "Player.Class.Pilot.Interceptor", desc: "High-speed pursuit pilot" },
                  { tag: "Player.Class.Pilot.Command", desc: "Fleet command pilot" }
                ]
              },
              {
                tag: "Player.Class.Engineer",
                desc: "Ship systems specialist",
                children: [
                  { tag: "Player.Class.Engineer.Mechanical", desc: "Hull and armor engineer" },
                  { tag: "Player.Class.Engineer.Electrical", desc: "Power and shield engineer" },
                  { tag: "Player.Class.Engineer.Propulsion", desc: "Engine and warp engineer" },
                  { tag: "Player.Class.Engineer.AI", desc: "Ship AI systems engineer" }
                ]
              },
              {
                tag: "Player.Class.Trader",
                desc: "Commerce specialist",
                children: [
                  { tag: "Player.Class.Trader.Merchant", desc: "Legal trade focus" },
                  { tag: "Player.Class.Trader.Smuggler", desc: "Black market expert" },
                  { tag: "Player.Class.Trader.Industrialist", desc: "Manufacturing mogul" },
                  { tag: "Player.Class.Trader.Logistics", desc: "Supply chain strategist" }
                ]
              },
              {
                tag: "Player.Class.Explorer",
                desc: "Discovery specialist",
                children: [
                  { tag: "Player.Class.Explorer.Surveyor", desc: "Planetary survey expert" },
                  { tag: "Player.Class.Explorer.Xenobiologist", desc: "Alien life researcher" },
                  { tag: "Player.Class.Explorer.Archaeologist", desc: "Ancient ruins specialist" },
                  { tag: "Player.Class.Explorer.Cartographer", desc: "Stellar map maker" }
                ]
              },
              {
                tag: "Player.Class.Marine",
                desc: "Ground combat specialist",
                children: [
                  { tag: "Player.Class.Marine.Assault", desc: "Heavy assault trooper" },
                  { tag: "Player.Class.Marine.Stealth", desc: "Infiltration operative" },
                  { tag: "Player.Class.Marine.Medic", desc: "Field medic" },
                  { tag: "Player.Class.Marine.Sniper", desc: "Long-range specialist" }
                ]
              }
            ]
          },
          {
            tag: "Player.Skill",
            desc: "Player skill disciplines",
            children: [
              {
                tag: "Player.Skill.Combat",
                desc: "Combat proficiency",
                children: [
                  { tag: "Player.Skill.Combat.Gunnery", desc: "Energy and ballistic accuracy" },
                  { tag: "Player.Skill.Combat.Missile", desc: "Missile guidance expertise" },
                  { tag: "Player.Skill.Combat.Tactics", desc: "Fleet tactics strategist" },
                  { tag: "Player.Skill.Combat.EvasiveManeuvering", desc: "Advanced evasive piloting" },
                  { tag: "Player.Skill.Combat.TargetTracking", desc: "Target lock optimization" }
                ]
              },
              {
                tag: "Player.Skill.Engineering",
                desc: "Ship engineering skills",
                children: [
                  { tag: "Player.Skill.Engineering.Repair", desc: "Emergency repair mastery" },
                  { tag: "Player.Skill.Engineering.Overcharge", desc: "Safe system overclocking" },
                  { tag: "Player.Skill.Engineering.Efficiency", desc: "Power optimization" },
                  { tag: "Player.Skill.Engineering.Calibration", desc: "Precision calibration" }
                ]
              },
              {
                tag: "Player.Skill.Navigation",
                desc: "Flight navigation skills",
                children: [
                  { tag: "Player.Skill.Navigation.Warp", desc: "Warp path plotting" },
                  { tag: "Player.Skill.Navigation.Jump", desc: "Jump corridor mastery" },
                  { tag: "Player.Skill.Navigation.Autopilot", desc: "Autopilot custom routines" },
                  { tag: "Player.Skill.Navigation.Astrogation", desc: "Deep space navigation" }
                ]
              },
              {
                tag: "Player.Skill.Science",
                desc: "Research and discovery skills",
                children: [
                  { tag: "Player.Skill.Science.Scanning", desc: "Sensor analysis" },
                  { tag: "Player.Skill.Science.Research", desc: "Laboratory research" },
                  { tag: "Player.Skill.Science.Analysis", desc: "Data analysis" },
                  { tag: "Player.Skill.Science.ReverseEngineering", desc: "Reverse-engineering" }
                ]
              },
              {
                tag: "Player.Skill.Trade",
                desc: "Economic skills",
                children: [
                  { tag: "Player.Skill.Trade.Negotiation", desc: "Trade negotiation" },
                  { tag: "Player.Skill.Trade.Appraisal", desc: "Commodity appraisal" },
                  { tag: "Player.Skill.Trade.Manufacturing", desc: "Production management" },
                  { tag: "Player.Skill.Trade.Finance", desc: "Credit management" }
                ]
              },
              {
                tag: "Player.Skill.Social",
                desc: "Social influence skills",
                children: [
                  { tag: "Player.Skill.Social.Leadership", desc: "Fleet leadership" },
                  { tag: "Player.Skill.Social.Diplomacy", desc: "Diplomatic relations" },
                  { tag: "Player.Skill.Social.Intimidation", desc: "Coercive negotiation" },
                  { tag: "Player.Skill.Social.Subterfuge", desc: "Black ops coordination" }
                ]
              },
              {
                tag: "Player.Skill.Mining",
                desc: "Resource extraction skills",
                children: [
                  { tag: "Player.Skill.Mining.AsteroidMining", desc: "Asteroid mining proficiency" },
                  { tag: "Player.Skill.Mining.GasHarvesting", desc: "Gas harvesting proficiency" },
                  { tag: "Player.Skill.Mining.Salvage", desc: "Salvage operations" },
                  { tag: "Player.Skill.Mining.DeepCore", desc: "Deep core mining" }
                ]
              }
            ]
          },
          {
            tag: "Player.Attribute",
            desc: "Core character attributes",
            children: [
              {
                tag: "Player.Attribute.Physical",
                desc: "Physical proficiencies",
                children: [
                  { tag: "Player.Attribute.Physical.Strength", desc: "Physical strength" },
                  { tag: "Player.Attribute.Physical.Dexterity", desc: "Agility and coordination" },
                  { tag: "Player.Attribute.Physical.Endurance", desc: "Physical resilience" }
                ]
              },
              {
                tag: "Player.Attribute.Mental",
                desc: "Mental proficiencies",
                children: [
                  { tag: "Player.Attribute.Mental.Intelligence", desc: "Problem solving" },
                  { tag: "Player.Attribute.Mental.Perception", desc: "Situational awareness" },
                  { tag: "Player.Attribute.Mental.Willpower", desc: "Mental resilience" }
                ]
              },
              {
                tag: "Player.Attribute.Social",
                desc: "Social influence proficiencies",
                children: [
                  { tag: "Player.Attribute.Social.Charisma", desc: "Social presence" },
                  { tag: "Player.Attribute.Social.Leadership", desc: "Group leadership" },
                  { tag: "Player.Attribute.Social.Intimidation", desc: "Coercive presence" }
                ]
              }
            ]
          },
          {
            tag: "Player.Reputation",
            desc: "Faction and organization reputation",
            children: [
              {
                tag: "Player.Reputation.Military",
                desc: "Military faction standings",
                children: [
                  { tag: "Player.Reputation.Military.Friendly", desc: "Trusted by military" },
                  { tag: "Player.Reputation.Military.Neutral", desc: "Neutral with military" },
                  { tag: "Player.Reputation.Military.Hostile", desc: "Enemy of the military" }
                ]
              },
              {
                tag: "Player.Reputation.Trading",
                desc: "Trade guild standings",
                children: [
                  { tag: "Player.Reputation.Trading.Friendly", desc: "Preferred trader" },
                  { tag: "Player.Reputation.Trading.Neutral", desc: "Neutral trader" },
                  { tag: "Player.Reputation.Trading.Hostile", desc: "Blacklisted trader" }
                ]
              },
              {
                tag: "Player.Reputation.Scientific",
                desc: "Scientific coalition standing",
                children: [
                  { tag: "Player.Reputation.Scientific.Trusted", desc: "Trusted researcher" },
                  { tag: "Player.Reputation.Scientific.Affiliate", desc: "Affiliate researcher" },
                  { tag: "Player.Reputation.Scientific.Disgraced", desc: "Disgraced researcher" }
                ]
              },
              {
                tag: "Player.Reputation.Criminal",
                desc: "Criminal network standing",
                children: [
                  { tag: "Player.Reputation.Criminal.Friendly", desc: "Trusted by pirates" },
                  { tag: "Player.Reputation.Criminal.Neutral", desc: "Known to pirates" },
                  { tag: "Player.Reputation.Criminal.Hostile", desc: "Bounty target" }
                ]
              },
              {
                tag: "Player.Reputation.Rank",
                desc: "Formal rank track",
                children: [
                  { tag: "Player.Reputation.Rank.Cadet", desc: "Entry-level cadet" },
                  { tag: "Player.Reputation.Rank.Lieutenant", desc: "Commissioned officer" },
                  { tag: "Player.Reputation.Rank.Commander", desc: "Commanding officer" },
                  { tag: "Player.Reputation.Rank.Captain", desc: "Ship captain" },
                  { tag: "Player.Reputation.Rank.Admiral", desc: "Fleet admiral" }
                ]
              }
            ]
          },
          {
            tag: "Player.State",
            desc: "Realtime player states",
            children: [
              { tag: "Player.State.InCombat", desc: "Actively engaged in combat" },
              { tag: "Player.State.Trading", desc: "Currently trading" },
              { tag: "Player.State.Docked", desc: "Docked at station" },
              { tag: "Player.State.Piloting", desc: "Piloting a ship" },
              { tag: "Player.State.EVA", desc: "Performing EVA" },
              { tag: "Player.State.Scanning", desc: "Performing scanning operation" },
              { tag: "Player.State.Mining", desc: "Mining resources" },
              { tag: "Player.State.Crafting", desc: "Crafting items" },
              { tag: "Player.State.Dead", desc: "Player is dead" },
              { tag: "Player.State.Incapacitated", desc: "Player incapacitated" },
              { tag: "Player.State.Cloaked", desc: "Player ship cloaked" },
              { tag: "Player.State.Warping", desc: "Player in warp transit" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "ship",
    name: "Ship",
    rootTag: "Ship",
    approxCount: 320,
    group: "core",
    description: "Ship hulls, components, capabilities, and states",
    nodes: [
      {
        tag: "Ship",
        desc: "Root tag for spaceship systems",
        children: [
          {
            tag: "Ship.Type",
            desc: "Ship hull classification",
            children: [
              {
                tag: "Ship.Type.Fighter",
                desc: "Small combat craft",
                children: [
                  { tag: "Ship.Type.Fighter.Light", desc: "Light interceptor" },
                  { tag: "Ship.Type.Fighter.Heavy", desc: "Heavy dogfighter" },
                  { tag: "Ship.Type.Fighter.Interceptor", desc: "High-speed interceptor" },
                  { tag: "Ship.Type.Fighter.Bomber", desc: "Torpedo bomber" }
                ]
              },
              {
                tag: "Ship.Type.Corvette",
                desc: "Small multi-role vessel",
                children: [
                  { tag: "Ship.Type.Corvette.Assault", desc: "Assault corvette" },
                  { tag: "Ship.Type.Corvette.Support", desc: "Support corvette" },
                  { tag: "Ship.Type.Corvette.Stealth", desc: "Covert operations corvette" }
                ]
              },
              {
                tag: "Ship.Type.Frigate",
                desc: "Medium combat vessel",
                children: [
                  { tag: "Ship.Type.Frigate.Assault", desc: "Close-quarters assault frigate" },
                  { tag: "Ship.Type.Frigate.Support", desc: "Remote logistics frigate" },
                  { tag: "Ship.Type.Frigate.Stealth", desc: "Stealth frigate" }
                ]
              },
              {
                tag: "Ship.Type.Destroyer",
                desc: "Heavy combat vessel",
                children: [
                  { tag: "Ship.Type.Destroyer.Missile", desc: "Missile destroyer" },
                  { tag: "Ship.Type.Destroyer.Railgun", desc: "Railgun destroyer" },
                  { tag: "Ship.Type.Destroyer.Siege", desc: "Siege platform" }
                ]
              },
              {
                tag: "Ship.Type.Cruiser",
                desc: "Large combat vessel",
                children: [
                  { tag: "Ship.Type.Cruiser.Battle", desc: "Battle cruiser" },
                  { tag: "Ship.Type.Cruiser.Heavy", desc: "Heavy cruiser" },
                  { tag: "Ship.Type.Cruiser.Strike", desc: "Fast strike cruiser" }
                ]
              },
              { tag: "Ship.Type.Battleship", desc: "Capital gunship" },
              { tag: "Ship.Type.Carrier", desc: "Carrier vessel" },
              { tag: "Ship.Type.Dreadnought", desc: "Super capital artillery ship" },
              { tag: "Ship.Type.Titan", desc: "Planet-killer titan" },
              {
                tag: "Ship.Type.Freighter",
                desc: "Cargo vessel",
                children: [
                  { tag: "Ship.Type.Freighter.Light", desc: "Light hauler" },
                  { tag: "Ship.Type.Freighter.Heavy", desc: "Heavy hauler" },
                  { tag: "Ship.Type.Freighter.Bulk", desc: "Bulk superfreighter" }
                ]
              },
              {
                tag: "Ship.Type.Mining",
                desc: "Industrial extraction ship",
                children: [
                  { tag: "Ship.Type.Mining.Asteroid", desc: "Asteroid miner" },
                  { tag: "Ship.Type.Mining.Gas", desc: "Gas harvesting ship" },
                  { tag: "Ship.Type.Mining.Ice", desc: "Ice mining ship" }
                ]
              },
              {
                tag: "Ship.Type.Science",
                desc: "Research and exploration vessel",
                children: [
                  { tag: "Ship.Type.Science.Survey", desc: "Survey vessel" },
                  { tag: "Ship.Type.Science.Research", desc: "Laboratory vessel" },
                  { tag: "Ship.Type.Science.Explorer", desc: "Deep space explorer" }
                ]
              }
            ]
          },
          {
            tag: "Ship.Component",
            desc: "Ship modular components",
            children: [
              {
                tag: "Ship.Component.Weapon",
                desc: "Weapons systems",
                children: [
                  {
                    tag: "Ship.Component.Weapon.Projectile",
                    desc: "Projectile weapon systems",
                    children: [
                      { tag: "Ship.Component.Weapon.Projectile.Kinetic", desc: "Standard kinetic cannons" },
                      { tag: "Ship.Component.Weapon.Projectile.Explosive", desc: "Explosive ordnance" },
                      { tag: "Ship.Component.Weapon.Projectile.Incendiary", desc: "Incendiary ordnance" }
                    ]
                  },
                  {
                    tag: "Ship.Component.Weapon.Energy",
                    desc: "Energy weapon systems",
                    children: [
                      { tag: "Ship.Component.Weapon.Energy.Laser", desc: "Laser emitters" },
                      { tag: "Ship.Component.Weapon.Energy.Plasma", desc: "Plasma emitters" },
                      { tag: "Ship.Component.Weapon.Energy.Ion", desc: "Ion disruptors" },
                      { tag: "Ship.Component.Weapon.Energy.Particle", desc: "Particle lances" }
                    ]
                  },
                  {
                    tag: "Ship.Component.Weapon.Missile",
                    desc: "Missile launch systems",
                    children: [
                      { tag: "Ship.Component.Weapon.Missile.Standard", desc: "Unguided missile racks" },
                      { tag: "Ship.Component.Weapon.Missile.Guided", desc: "Guided missile racks" },
                      { tag: "Ship.Component.Weapon.Missile.Torpedo", desc: "Torpedo tubes" },
                      { tag: "Ship.Component.Weapon.Missile.Cruise", desc: "Cruise missile silos" }
                    ]
                  },
                  {
                    tag: "Ship.Component.Weapon.Exotic",
                    desc: "Exotic weapon systems",
                    children: [
                      { tag: "Ship.Component.Weapon.Exotic.Graviton", desc: "Graviton projector" },
                      { tag: "Ship.Component.Weapon.Exotic.Quantum", desc: "Quantum destabilizer" },
                      { tag: "Ship.Component.Weapon.Exotic.Antimatter", desc: "Antimatter lance" }
                    ]
                  }
                ]
              },
              {
                tag: "Ship.Component.Defense",
                desc: "Defensive systems",
                children: [
                  {
                    tag: "Ship.Component.Defense.Shield",
                    desc: "Shield emitters",
                    children: [
                      { tag: "Ship.Component.Defense.Shield.Light", desc: "Light shield suite" },
                      { tag: "Ship.Component.Defense.Shield.Medium", desc: "Medium shield suite" },
                      { tag: "Ship.Component.Defense.Shield.Heavy", desc: "Heavy shield suite" },
                      { tag: "Ship.Component.Defense.Shield.Capital", desc: "Capital shield array" }
                    ]
                  },
                  {
                    tag: "Ship.Component.Defense.Armor",
                    desc: "Armor plating",
                    children: [
                      { tag: "Ship.Component.Defense.Armor.Light", desc: "Light armor" },
                      { tag: "Ship.Component.Defense.Armor.Medium", desc: "Medium armor" },
                      { tag: "Ship.Component.Defense.Armor.Heavy", desc: "Heavy armor" },
                      { tag: "Ship.Component.Defense.Armor.Ablative", desc: "Ablative armor" },
                      { tag: "Ship.Component.Defense.Armor.Reactive", desc: "Reactive armor" }
                    ]
                  },
                  {
                    tag: "Ship.Component.Defense.Countermeasure",
                    desc: "Countermeasure suites",
                    children: [
                      { tag: "Ship.Component.Defense.Countermeasure.Chaff", desc: "Chaff launchers" },
                      { tag: "Ship.Component.Defense.Countermeasure.Flare", desc: "Flare dispensers" },
                      { tag: "Ship.Component.Defense.Countermeasure.ECM", desc: "Electronic countermeasures" },
                      { tag: "Ship.Component.Defense.Countermeasure.PointDefense", desc: "Point defense turrets" },
                      { tag: "Ship.Component.Defense.Countermeasure.Radiation", desc: "Radiation shielding" }
                    ]
                  }
                ]
              },
              {
                tag: "Ship.Component.Engine",
                desc: "Propulsion systems",
                children: [
                  {
                    tag: "Ship.Component.Engine.Sublight",
                    desc: "Sublight engines",
                    children: [
                      { tag: "Ship.Component.Engine.Sublight.Chemical", desc: "Chemical thrusters" },
                      { tag: "Ship.Component.Engine.Sublight.Ion", desc: "Ion drives" },
                      { tag: "Ship.Component.Engine.Sublight.Fusion", desc: "Fusion drives" }
                    ]
                  },
                  {
                    tag: "Ship.Component.Engine.FTL",
                    desc: "Faster-than-light engines",
                    children: [
                      { tag: "Ship.Component.Engine.FTL.Warp", desc: "Warp core" },
                      { tag: "Ship.Component.Engine.FTL.Jump", desc: "Jump drive" },
                      { tag: "Ship.Component.Engine.FTL.Hyperdrive", desc: "Hyperdrive" }
                    ]
                  },
                  { tag: "Ship.Component.Engine.Maneuvering", desc: "Maneuvering thrusters" }
                ]
              },
              {
                tag: "Ship.Component.Power",
                desc: "Power generation and storage",
                children: [
                  { tag: "Ship.Component.Power.Reactor", desc: "Primary reactors" },
                  { tag: "Ship.Component.Power.Reactor.Fusion", desc: "Fusion reactor" },
                  { tag: "Ship.Component.Power.Reactor.Antimatter", desc: "Antimatter reactor" },
                  { tag: "Ship.Component.Power.Reactor.ZeroPoint", desc: "Zero-point reactor" },
                  { tag: "Ship.Component.Power.Capacitor", desc: "Power capacitor banks" },
                  { tag: "Ship.Component.Power.Generator", desc: "Auxiliary generators" }
                ]
              },
              {
                tag: "Ship.Component.Sensor",
                desc: "Sensor suites",
                children: [
                  { tag: "Ship.Component.Sensor.Radar", desc: "Radar systems" },
                  { tag: "Ship.Component.Sensor.Lidar", desc: "Lidar systems" },
                  { tag: "Ship.Component.Sensor.Gravitational", desc: "Gravitational sensors" },
                  { tag: "Ship.Component.Sensor.Quantum", desc: "Quantum entanglement sensors" },
                  { tag: "Ship.Component.Sensor.LongRange", desc: "Long-range sensor arrays" },
                  { tag: "Ship.Component.Sensor.ShortRange", desc: "Short-range tactical sensors" }
                ]
              },
              {
                tag: "Ship.Component.Special",
                desc: "Specialty modules",
                children: [
                  { tag: "Ship.Component.Special.Cloak", desc: "Cloaking device" },
                  { tag: "Ship.Component.Special.MiningLaser", desc: "Mining laser arrays" },
                  { tag: "Ship.Component.Special.SalvageDrone", desc: "Salvage drone control" },
                  { tag: "Ship.Component.Special.RepairDrone", desc: "Repair drone control" },
                  { tag: "Ship.Component.Special.TractorBeam", desc: "Tractor beam" },
                  { tag: "Ship.Component.Special.JumpDrive", desc: "Jump drive core" },
                  { tag: "Ship.Component.Special.CargoExpander", desc: "Cargo expansion module" }
                ]
              }
            ]
          },
          {
            tag: "Ship.Capability",
            desc: "Functional ship capabilities",
            children: [
              { tag: "Ship.Capability.Warp", desc: "Capable of warp travel" },
              { tag: "Ship.Capability.Jump", desc: "Capable of jump travel" },
              { tag: "Ship.Capability.Cloak", desc: "Can cloak from sensors" },
              { tag: "Ship.Capability.Mine", desc: "Can mine resources" },
              { tag: "Ship.Capability.Salvage", desc: "Can salvage wreckage" },
              { tag: "Ship.Capability.Repair", desc: "Can perform repairs" },
              { tag: "Ship.Capability.Trade", desc: "Has trade facilities" },
              { tag: "Ship.Capability.Scan", desc: "Advanced scanning" },
              { tag: "Ship.Capability.Launch", desc: "Launches strike craft" },
              { tag: "Ship.Capability.Dock", desc: "Hosts docking bays" },
              { tag: "Ship.Capability.Manufacture", desc: "Manufacturing facilities" },
              { tag: "Ship.Capability.Research", desc: "Research laboratories" }
            ]
          },
          {
            tag: "Ship.State",
            desc: "Dynamic ship states",
            children: [
              { tag: "Ship.State.Operational", desc: "Fully operational" },
              { tag: "Ship.State.Damaged", desc: "Moderate damage sustained" },
              { tag: "Ship.State.Critical", desc: "Critical damage sustained" },
              { tag: "Ship.State.Destroyed", desc: "Destroyed ship" },
              { tag: "Ship.State.Docked", desc: "Docked at structure" },
              { tag: "Ship.State.Warping", desc: "In warp travel" },
              { tag: "Ship.State.Jumping", desc: "In jump transit" },
              { tag: "Ship.State.Cloaked", desc: "Cloaked state" },
              { tag: "Ship.State.Anchored", desc: "Anchored/static position" },
              { tag: "Ship.State.Overheating", desc: "Modules overheating" },
              { tag: "Ship.State.ShieldsDown", desc: "No shield coverage" },
              { tag: "Ship.State.PowerLoss", desc: "Experiencing power failure" },
              { tag: "Ship.State.EngineDamage", desc: "Engines compromised" },
              { tag: "Ship.State.WeaponsDamage", desc: "Weapons offline" },
              { tag: "Ship.State.LifeSupportFailure", desc: "Life support failing" }
            ]
          },
          {
            tag: "Ship.Size",
            desc: "Hull size classification",
            children: [
              { tag: "Ship.Size.Small", desc: "Frigate-class or smaller" },
              { tag: "Ship.Size.Medium", desc: "Destroyer-class" },
              { tag: "Ship.Size.Large", desc: "Cruiser-class" },
              { tag: "Ship.Size.Capital", desc: "Battleship/carrier" },
              { tag: "Ship.Size.SuperCapital", desc: "Dreadnought or titan" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "celestial",
    name: "Celestial",
    rootTag: "Celestial",
    approxCount: 200,
    group: "world",
    description: "Stars, planets, moons, and stellar phenomena",
    nodes: [
      {
        tag: "Celestial",
        desc: "Root tag for celestial bodies and phenomena",
        children: [
          {
            tag: "Celestial.Star",
            desc: "Stellar classification",
            children: [
              {
                tag: "Celestial.Star.Type",
                desc: "Star spectral types",
                children: [
                  { tag: "Celestial.Star.Type.MainSequence.O", desc: "Blue main sequence star" },
                  { tag: "Celestial.Star.Type.MainSequence.B", desc: "Blue-white main sequence star" },
                  { tag: "Celestial.Star.Type.MainSequence.A", desc: "White main sequence star" },
                  { tag: "Celestial.Star.Type.MainSequence.F", desc: "Yellow-white main sequence star" },
                  { tag: "Celestial.Star.Type.MainSequence.G", desc: "Yellow main sequence star" },
                  { tag: "Celestial.Star.Type.MainSequence.K", desc: "Orange main sequence star" },
                  { tag: "Celestial.Star.Type.MainSequence.M", desc: "Red dwarf star" },
                  { tag: "Celestial.Star.Type.Giant.Red", desc: "Red giant star" },
                  { tag: "Celestial.Star.Type.Giant.Blue", desc: "Blue giant star" },
                  { tag: "Celestial.Star.Type.WhiteDwarf", desc: "White dwarf star" },
                  { tag: "Celestial.Star.Type.NeutronStar", desc: "Neutron star" },
                  { tag: "Celestial.Star.Type.Pulsar", desc: "Pulsar star" },
                  { tag: "Celestial.Star.Type.BlackHole.Stellar", desc: "Stellar black hole" },
                  { tag: "Celestial.Star.Type.BlackHole.Supermassive", desc: "Supermassive black hole" }
                ]
              },
              {
                tag: "Celestial.Star.System",
                desc: "Star system structure",
                children: [
                  { tag: "Celestial.Star.System.Single", desc: "Single star system" },
                  { tag: "Celestial.Star.System.Binary", desc: "Binary star system" },
                  { tag: "Celestial.Star.System.Trinary", desc: "Trinary star system" },
                  { tag: "Celestial.Star.System.Multiple", desc: "Multiple star system" }
                ]
              }
            ]
          },
          {
            tag: "Celestial.Planet",
            desc: "Planetary classification",
            children: [
              {
                tag: "Celestial.Planet.Type.Terrestrial",
                desc: "Terrestrial planets",
                children: [
                  { tag: "Celestial.Planet.Type.Terrestrial.Barren", desc: "Barren rocky world" },
                  { tag: "Celestial.Planet.Type.Terrestrial.Desert", desc: "Arid desert world" },
                  { tag: "Celestial.Planet.Type.Terrestrial.Tundra", desc: "Frozen tundra world" },
                  { tag: "Celestial.Planet.Type.Terrestrial.Oceanic", desc: "Oceanic water world" },
                  { tag: "Celestial.Planet.Type.Terrestrial.Volcanic", desc: "Volcanic lava world" },
                  { tag: "Celestial.Planet.Type.Terrestrial.Earthlike", desc: "Habitable earthlike world" }
                ]
              },
              {
                tag: "Celestial.Planet.Type.GasGiant",
                desc: "Gas giant planets",
                children: [
                  { tag: "Celestial.Planet.Type.GasGiant.Jupiter", desc: "Jupiter-class gas giant" },
                  { tag: "Celestial.Planet.Type.GasGiant.Saturn", desc: "Saturn-class gas giant" },
                  { tag: "Celestial.Planet.Type.GasGiant.Uranus", desc: "Ice giant" }
                ]
              },
              { tag: "Celestial.Planet.Type.IceGiant", desc: "Ice giant planet" },
              { tag: "Celestial.Planet.Type.Lava", desc: "Lava covered planet" },
              { tag: "Celestial.Planet.Type.Carbon", desc: "Carbon planet" },
              { tag: "Celestial.Planet.Type.Iron", desc: "Iron-rich planet" },
              {
                tag: "Celestial.Planet.Habitability",
                desc: "Habitability rating",
                children: [
                  { tag: "Celestial.Planet.Habitability.Habitable", desc: "Comfortably habitable" },
                  { tag: "Celestial.Planet.Habitability.Marginal", desc: "Marginally habitable" },
                  { tag: "Celestial.Planet.Habitability.Uninhabitable", desc: "Unable to support life" },
                  { tag: "Celestial.Planet.Habitability.Toxic", desc: "Toxic environment" }
                ]
              },
              {
                tag: "Celestial.Planet.Atmosphere",
                desc: "Atmospheric density",
                children: [
                  { tag: "Celestial.Planet.Atmosphere.None", desc: "No atmosphere" },
                  { tag: "Celestial.Planet.Atmosphere.Thin", desc: "Thin atmosphere" },
                  { tag: "Celestial.Planet.Atmosphere.Standard", desc: "Standard atmosphere" },
                  { tag: "Celestial.Planet.Atmosphere.Dense", desc: "Dense atmosphere" },
                  { tag: "Celestial.Planet.Atmosphere.Toxic", desc: "Poisonous atmosphere" }
                ]
              },
              {
                tag: "Celestial.Planet.Temperature",
                desc: "Planetary temperature band",
                children: [
                  { tag: "Celestial.Planet.Temperature.Frozen", desc: "Frozen world" },
                  { tag: "Celestial.Planet.Temperature.Cold", desc: "Cold world" },
                  { tag: "Celestial.Planet.Temperature.Temperate", desc: "Temperate world" },
                  { tag: "Celestial.Planet.Temperature.Hot", desc: "Hot world" },
                  { tag: "Celestial.Planet.Temperature.Molten", desc: "Molten world" }
                ]
              }
            ]
          },
          {
            tag: "Celestial.Moon",
            desc: "Satellite classification",
            children: [
              { tag: "Celestial.Moon.Type.Rocky", desc: "Rocky moon" },
              { tag: "Celestial.Moon.Type.Icy", desc: "Icy moon" },
              { tag: "Celestial.Moon.Type.Volcanic", desc: "Volcanic moon" },
              { tag: "Celestial.Moon.Type.Captured", desc: "Captured asteroid moon" },
              { tag: "Celestial.Moon.Size.Small", desc: "Small moon" },
              { tag: "Celestial.Moon.Size.Medium", desc: "Medium moon" },
              { tag: "Celestial.Moon.Size.Large", desc: "Large moon" }
            ]
          },
          {
            tag: "Celestial.Phenomenon",
            desc: "Stellar phenomena",
            children: [
              { tag: "Celestial.Phenomenon.Nebula.Emission", desc: "Emission nebula" },
              { tag: "Celestial.Phenomenon.Nebula.Reflection", desc: "Reflection nebula" },
              { tag: "Celestial.Phenomenon.Nebula.Dark", desc: "Dark nebula" },
              { tag: "Celestial.Phenomenon.Nebula.Planetary", desc: "Planetary nebula" },
              { tag: "Celestial.Phenomenon.Nebula.Supernova", desc: "Supernova remnant" },
              { tag: "Celestial.Phenomenon.AsteroidBelt", desc: "Asteroid belt" },
              { tag: "Celestial.Phenomenon.AsteroidField", desc: "Asteroid field" },
              { tag: "Celestial.Phenomenon.CometTrail", desc: "Comet trail" },
              { tag: "Celestial.Phenomenon.IonStorm", desc: "Ion storm" },
              { tag: "Celestial.Phenomenon.GravityWell", desc: "Gravity well" },
              { tag: "Celestial.Phenomenon.QuantumAnomaly", desc: "Quantum anomaly" },
              { tag: "Celestial.Phenomenon.Wormhole.Stable", desc: "Stable wormhole" },
              { tag: "Celestial.Phenomenon.Wormhole.Unstable", desc: "Unstable wormhole" },
              { tag: "Celestial.Phenomenon.SpaceTimeRift", desc: "Spacetime rift" },
              { tag: "Celestial.Phenomenon.DarkMatterCloud", desc: "Dark matter cloud" },
              { tag: "Celestial.Phenomenon.RadiationBelt", desc: "Radiation belt" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "resource",
    name: "Resource",
    rootTag: "Resource",
    approxCount: 120,
    group: "economy",
    description: "Raw materials, processed goods, commodities, and currency",
    nodes: [
      {
        tag: "Resource",
        desc: "Root tag for economic resources",
        children: [
          {
            tag: "Resource.Raw",
            desc: "Raw extraction materials",
            children: [
              {
                tag: "Resource.Raw.Metal",
                desc: "Refinable metals",
                children: [
                  { tag: "Resource.Raw.Metal.Iron", desc: "Iron ore" },
                  { tag: "Resource.Raw.Metal.Copper", desc: "Copper ore" },
                  { tag: "Resource.Raw.Metal.Titanium", desc: "Titanium ore" },
                  { tag: "Resource.Raw.Metal.Aluminum", desc: "Bauxite ore" },
                  { tag: "Resource.Raw.Metal.Platinum", desc: "Platinum ore" },
                  { tag: "Resource.Raw.Metal.Gold", desc: "Gold ore" },
                  { tag: "Resource.Raw.Metal.Uranium", desc: "Uranium ore" }
                ]
              },
              {
                tag: "Resource.Raw.Mineral",
                desc: "Industrial minerals",
                children: [
                  { tag: "Resource.Raw.Mineral.Silicon", desc: "Silicon ore" },
                  { tag: "Resource.Raw.Mineral.Carbon", desc: "Carbon deposit" },
                  { tag: "Resource.Raw.Mineral.Sulfur", desc: "Sulfur deposit" },
                  { tag: "Resource.Raw.Mineral.Phosphorus", desc: "Phosphorus deposit" }
                ]
              },
              {
                tag: "Resource.Raw.Crystal",
                desc: "Crystal formations",
                children: [
                  { tag: "Resource.Raw.Crystal.Quartz", desc: "Quartz crystal" },
                  { tag: "Resource.Raw.Crystal.Diamond", desc: "Diamond crystal" },
                  { tag: "Resource.Raw.Crystal.Exotic", desc: "Exotic crystalline structure" }
                ]
              },
              {
                tag: "Resource.Raw.Gas",
                desc: "Harvested gases",
                children: [
                  { tag: "Resource.Raw.Gas.Hydrogen", desc: "Hydrogen" },
                  { tag: "Resource.Raw.Gas.Helium", desc: "Helium" },
                  { tag: "Resource.Raw.Gas.Nitrogen", desc: "Nitrogen" },
                  { tag: "Resource.Raw.Gas.Oxygen", desc: "Oxygen" },
                  { tag: "Resource.Raw.Gas.Methane", desc: "Methane" }
                ]
              },
              {
                tag: "Resource.Raw.Ice",
                desc: "Harvested ices",
                children: [
                  { tag: "Resource.Raw.Ice.Water", desc: "Water ice" },
                  { tag: "Resource.Raw.Ice.Ammonia", desc: "Ammonia ice" },
                  { tag: "Resource.Raw.Ice.CO2", desc: "Carbon dioxide ice" }
                ]
              },
              {
                tag: "Resource.Raw.Organic",
                desc: "Organic materials",
                children: [
                  { tag: "Resource.Raw.Organic.Biomass", desc: "Biomass" },
                  { tag: "Resource.Raw.Organic.Protein", desc: "Protein matter" },
                  { tag: "Resource.Raw.Organic.Hydrocarbon", desc: "Hydrocarbon compounds" }
                ]
              }
            ]
          },
          {
            tag: "Resource.Processed",
            desc: "Refined industrial materials",
            children: [
              {
                tag: "Resource.Processed.Alloy",
                desc: "Manufactured alloys",
                children: [
                  { tag: "Resource.Processed.Alloy.Steel", desc: "Steel alloy" },
                  { tag: "Resource.Processed.Alloy.Titanium", desc: "Titanium alloy" },
                  { tag: "Resource.Processed.Alloy.Composite", desc: "Composite alloy" }
                ]
              },
              {
                tag: "Resource.Processed.Polymer",
                desc: "Industrial polymers",
                children: [
                  { tag: "Resource.Processed.Polymer.Plastic", desc: "Industrial plastics" },
                  { tag: "Resource.Processed.Polymer.Fiber", desc: "Structural fiber" },
                  { tag: "Resource.Processed.Polymer.Resin", desc: "Industrial resin" }
                ]
              },
              {
                tag: "Resource.Processed.Fuel",
                desc: "Refined fuels",
                children: [
                  { tag: "Resource.Processed.Fuel.Chemical", desc: "Chemical fuel" },
                  { tag: "Resource.Processed.Fuel.Nuclear", desc: "Nuclear fuel pellets" },
                  { tag: "Resource.Processed.Fuel.Antimatter", desc: "Antimatter fuel" }
                ]
              },
              {
                tag: "Resource.Processed.Electronics",
                desc: "Electronic components",
                children: [
                  { tag: "Resource.Processed.Electronics.Chip", desc: "Microchip assembly" },
                  { tag: "Resource.Processed.Electronics.Sensor", desc: "Sensor module" },
                  { tag: "Resource.Processed.Electronics.Power", desc: "Power regulation unit" }
                ]
              }
            ]
          },
          {
            tag: "Resource.Commodity",
            desc: "Trade commodities",
            children: [
              { tag: "Resource.Commodity.Food", desc: "Food supplies" },
              { tag: "Resource.Commodity.Water", desc: "Water supplies" },
              { tag: "Resource.Commodity.Medicine", desc: "Medical supplies" },
              { tag: "Resource.Commodity.Luxury", desc: "Luxury goods" },
              { tag: "Resource.Commodity.Technology", desc: "Technological goods" },
              { tag: "Resource.Commodity.Weapons", desc: "Weapon shipments" },
              { tag: "Resource.Commodity.Slaves", desc: "Illegal slave cargo" },
              { tag: "Resource.Commodity.Narcotics", desc: "Illegal narcotics cargo" }
            ]
          },
          {
            tag: "Resource.Currency",
            desc: "Monetary units",
            children: [
              { tag: "Resource.Currency.Credits", desc: "Standard galactic credits" },
              { tag: "Resource.Currency.Premium", desc: "Premium currency" },
              { tag: "Resource.Currency.Faction", desc: "Faction-specific scrip" },
              { tag: "Resource.Currency.Black", desc: "Black market currency" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "combat",
    name: "Combat",
    rootTag: "Combat",
    approxCount: 180,
    group: "gameplay",
    description: "Weapons, damage types, tactics, and combat states",
    nodes: [
      {
        tag: "Combat",
        desc: "Root tag for combat systems",
        children: [
          {
            tag: "Combat.Damage",
            desc: "Damage classification",
            children: [
              {
                tag: "Combat.Damage.Type",
                desc: "Damage types",
                children: [
                  { tag: "Combat.Damage.Type.Kinetic", desc: "Physical kinetic damage" },
                  { tag: "Combat.Damage.Type.Energy", desc: "Directed energy damage" },
                  { tag: "Combat.Damage.Type.Explosive", desc: "Explosive ordnance damage" },
                  { tag: "Combat.Damage.Type.Thermal", desc: "Thermal heat damage" },
                  { tag: "Combat.Damage.Type.EMP", desc: "Electromagnetic pulse damage" },
                  { tag: "Combat.Damage.Type.Ion", desc: "Ion disruption damage" },
                  { tag: "Combat.Damage.Type.Plasma", desc: "Plasma damage" },
                  { tag: "Combat.Damage.Type.Antimatter", desc: "Antimatter annihilation damage" },
                  { tag: "Combat.Damage.Type.Graviton", desc: "Graviton shear damage" }
                ]
              },
              {
                tag: "Combat.Damage.Severity",
                desc: "Damage severity scale",
                children: [
                  { tag: "Combat.Damage.Severity.Minor", desc: "Minor damage" },
                  { tag: "Combat.Damage.Severity.Moderate", desc: "Moderate damage" },
                  { tag: "Combat.Damage.Severity.Major", desc: "Major damage" },
                  { tag: "Combat.Damage.Severity.Critical", desc: "Critical damage" },
                  { tag: "Combat.Damage.Severity.Catastrophic", desc: "Catastrophic damage" }
                ]
              }
            ]
          },
          {
            tag: "Combat.Weapon",
            desc: "Weapon classification",
            children: [
              {
                tag: "Combat.Weapon.Class",
                desc: "Weapon size class",
                children: [
                  { tag: "Combat.Weapon.Class.Light", desc: "Light weaponry" },
                  { tag: "Combat.Weapon.Class.Medium", desc: "Medium weaponry" },
                  { tag: "Combat.Weapon.Class.Heavy", desc: "Heavy weaponry" },
                  { tag: "Combat.Weapon.Class.Capital", desc: "Capital weaponry" }
                ]
              },
              {
                tag: "Combat.Weapon.Range",
                desc: "Effective range",
                children: [
                  { tag: "Combat.Weapon.Range.Close", desc: "Close range" },
                  { tag: "Combat.Weapon.Range.Medium", desc: "Medium range" },
                  { tag: "Combat.Weapon.Range.Long", desc: "Long range" },
                  { tag: "Combat.Weapon.Range.Extreme", desc: "Extreme range" }
                ]
              },
              {
                tag: "Combat.Weapon.Tracking",
                desc: "Target tracking",
                children: [
                  { tag: "Combat.Weapon.Tracking.Poor", desc: "Poor tracking" },
                  { tag: "Combat.Weapon.Tracking.Average", desc: "Average tracking" },
                  { tag: "Combat.Weapon.Tracking.Good", desc: "Good tracking" },
                  { tag: "Combat.Weapon.Tracking.Excellent", desc: "Excellent tracking" }
                ]
              }
            ]
          },
          {
            tag: "Combat.Tactic",
            desc: "Combat maneuver doctrines",
            children: [
              {
                tag: "Combat.Tactic.Offensive",
                desc: "Offensive combat tactics",
                children: [
                  { tag: "Combat.Tactic.Offensive.Brawl", desc: "Close quarters brawling" },
                  { tag: "Combat.Tactic.Offensive.Kite", desc: "Kiting tactics" },
                  { tag: "Combat.Tactic.Offensive.Alpha", desc: "Alpha strike" },
                  { tag: "Combat.Tactic.Offensive.Siege", desc: "Siege bombardment" }
                ]
              },
              {
                tag: "Combat.Tactic.Defensive",
                desc: "Defensive combat tactics",
                children: [
                  { tag: "Combat.Tactic.Defensive.Tank", desc: "Damage soaking" },
                  { tag: "Combat.Tactic.Defensive.Evasive", desc: "Evasive maneuvers" },
                  { tag: "Combat.Tactic.Defensive.Shield", desc: "Shield rotation" }
                ]
              },
              {
                tag: "Combat.Tactic.Support",
                desc: "Support combat tactics",
                children: [
                  { tag: "Combat.Tactic.Support.Repair", desc: "Logistics repair" },
                  { tag: "Combat.Tactic.Support.ECM", desc: "Electronic warfare" },
                  { tag: "Combat.Tactic.Support.Buff", desc: "Combat buffs" }
                ]
              }
            ]
          },
          {
            tag: "Combat.State",
            desc: "Combat engagement state",
            children: [
              { tag: "Combat.State.InCombat", desc: "Currently in combat" },
              { tag: "Combat.State.Targeting", desc: "Acquiring target" },
              { tag: "Combat.State.Firing", desc: "Actively firing weapons" },
              { tag: "Combat.State.Reloading", desc: "Reloading weapons" },
              { tag: "Combat.State.Overheated", desc: "Modules overheated" },
              { tag: "Combat.State.OutOfAmmo", desc: "Ammunition depleted" },
              { tag: "Combat.State.WeaponJammed", desc: "Weapons malfunctioning" },
              { tag: "Combat.State.EvasiveManeuvers", desc: "Executing evasive maneuvers" },
              { tag: "Combat.State.Retreating", desc: "Disengaging from battle" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "faction",
    name: "Faction",
    rootTag: "Faction",
    approxCount: 100,
    group: "gameplay",
    description: "Factions, diplomacy, territory, and political states",
    nodes: [
      {
        tag: "Faction",
        desc: "Root tag for factions and polities",
        children: [
          {
            tag: "Faction.Type",
            desc: "Faction archetypes",
            children: [
              {
                tag: "Faction.Type.Military",
                desc: "Military organizations",
                children: [
                  { tag: "Faction.Type.Military.Navy", desc: "Naval command" },
                  { tag: "Faction.Type.Military.Marines", desc: "Marine corps" },
                  { tag: "Faction.Type.Military.Intelligence", desc: "Military intelligence" }
                ]
              },
              {
                tag: "Faction.Type.Corporate",
                desc: "Corporate entities",
                children: [
                  { tag: "Faction.Type.Corporate.Mining", desc: "Mining conglomerate" },
                  { tag: "Faction.Type.Corporate.Manufacturing", desc: "Manufacturing syndicate" },
                  { tag: "Faction.Type.Corporate.Trading", desc: "Trading cartel" },
                  { tag: "Faction.Type.Corporate.Technology", desc: "Tech megacorp" }
                ]
              },
              {
                tag: "Faction.Type.Scientific",
                desc: "Scientific organizations",
                children: [
                  { tag: "Faction.Type.Scientific.Research", desc: "Research collective" },
                  { tag: "Faction.Type.Scientific.Exploration", desc: "Exploration league" }
                ]
              },
              {
                tag: "Faction.Type.Criminal",
                desc: "Underworld organizations",
                children: [
                  { tag: "Faction.Type.Criminal.Pirates", desc: "Pirate clans" },
                  { tag: "Faction.Type.Criminal.Smugglers", desc: "Smuggling rings" },
                  { tag: "Faction.Type.Criminal.Cartel", desc: "Crime cartel" }
                ]
              },
              { tag: "Faction.Type.Religious", desc: "Religious order" },
              { tag: "Faction.Type.Political", desc: "Political consortium" },
              { tag: "Faction.Type.Mercenary", desc: "Mercenary company" }
            ]
          },
          {
            tag: "Faction.Relation",
            desc: "Diplomatic standings",
            children: [
              { tag: "Faction.Relation.Allied", desc: "Formal alliance" },
              { tag: "Faction.Relation.Friendly", desc: "Friendly relations" },
              { tag: "Faction.Relation.Neutral", desc: "Neutral relations" },
              { tag: "Faction.Relation.Unfriendly", desc: "Strained relations" },
              { tag: "Faction.Relation.Hostile", desc: "Active hostility" },
              { tag: "Faction.Relation.AtWar", desc: "Open warfare" }
            ]
          },
          {
            tag: "Faction.Territory",
            desc: "Territorial control",
            children: [
              { tag: "Faction.Territory.Core", desc: "Core sovereign space" },
              { tag: "Faction.Territory.Controlled", desc: "Controlled territory" },
              { tag: "Faction.Territory.Contested", desc: "Contested region" },
              { tag: "Faction.Territory.Border", desc: "Border zone" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "mission",
    name: "Mission",
    rootTag: "Mission",
    approxCount: 140,
    group: "gameplay",
    description: "Mission types, objectives, difficulties, and rewards",
    nodes: [
      {
        tag: "Mission",
        desc: "Root tag for mission content",
        children: [
          {
            tag: "Mission.Type",
            desc: "Mission category",
            children: [
              {
                tag: "Mission.Type.Combat",
                desc: "Combat-oriented missions",
                children: [
                  { tag: "Mission.Type.Combat.Patrol", desc: "Patrol mission" },
                  { tag: "Mission.Type.Combat.Assault", desc: "Assault mission" },
                  { tag: "Mission.Type.Combat.Defense", desc: "Defense mission" },
                  { tag: "Mission.Type.Combat.Bounty", desc: "Bounty hunting mission" },
                  { tag: "Mission.Type.Combat.Assassination", desc: "Assassination mission" }
                ]
              },
              {
                tag: "Mission.Type.Trade",
                desc: "Trade-focused missions",
                children: [
                  { tag: "Mission.Type.Trade.Delivery", desc: "Standard delivery" },
                  { tag: "Mission.Type.Trade.Courier", desc: "Courier run" },
                  { tag: "Mission.Type.Trade.Smuggling", desc: "Smuggling run" }
                ]
              },
              {
                tag: "Mission.Type.Mining",
                desc: "Resource acquisition missions",
                children: [
                  { tag: "Mission.Type.Mining.Harvest", desc: "Harvest quota" },
                  { tag: "Mission.Type.Mining.Survey", desc: "Resource survey" }
                ]
              },
              {
                tag: "Mission.Type.Exploration",
                desc: "Exploration missions",
                children: [
                  { tag: "Mission.Type.Exploration.Survey", desc: "Survey region" },
                  { tag: "Mission.Type.Exploration.Discovery", desc: "Discovery expedition" },
                  { tag: "Mission.Type.Exploration.Archaeology", desc: "Archaeological dig" }
                ]
              },
              {
                tag: "Mission.Type.Rescue",
                desc: "Rescue missions",
                children: [
                  { tag: "Mission.Type.Rescue.Personnel", desc: "Personnel rescue" },
                  { tag: "Mission.Type.Rescue.Ship", desc: "Ship rescue" }
                ]
              },
              { tag: "Mission.Type.Escort", desc: "Escort mission" },
              { tag: "Mission.Type.Research", desc: "Research mission" },
              { tag: "Mission.Type.Diplomacy", desc: "Diplomacy mission" }
            ]
          },
          {
            tag: "Mission.Difficulty",
            desc: "Challenge level",
            children: [
              { tag: "Mission.Difficulty.Trivial", desc: "Minimal challenge" },
              { tag: "Mission.Difficulty.Easy", desc: "Low challenge" },
              { tag: "Mission.Difficulty.Normal", desc: "Standard challenge" },
              { tag: "Mission.Difficulty.Hard", desc: "High challenge" },
              { tag: "Mission.Difficulty.Extreme", desc: "Extreme challenge" },
              { tag: "Mission.Difficulty.Impossible", desc: "Nearly impossible" }
            ]
          },
          {
            tag: "Mission.Objective",
            desc: "Mission objectives",
            children: [
              { tag: "Mission.Objective.Destroy", desc: "Destroy target" },
              { tag: "Mission.Objective.Collect", desc: "Collect items" },
              { tag: "Mission.Objective.Deliver", desc: "Deliver cargo" },
              { tag: "Mission.Objective.Scan", desc: "Scan target" },
              { tag: "Mission.Objective.Rescue", desc: "Rescue target" },
              { tag: "Mission.Objective.Protect", desc: "Protect asset" },
              { tag: "Mission.Objective.Infiltrate", desc: "Infiltrate location" },
              { tag: "Mission.Objective.Hack", desc: "Hack systems" },
              { tag: "Mission.Objective.Negotiate", desc: "Negotiate outcome" }
            ]
          },
          {
            tag: "Mission.Reward",
            desc: "Reward packages",
            children: [
              { tag: "Mission.Reward.Credits", desc: "Credit payout" },
              { tag: "Mission.Reward.Items", desc: "Item rewards" },
              { tag: "Mission.Reward.Reputation", desc: "Reputation reward" },
              { tag: "Mission.Reward.Blueprints", desc: "Blueprint reward" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "station",
    name: "Station",
    rootTag: "Station",
    approxCount: 90,
    group: "world",
    description: "Stations, services, security levels, and infrastructure",
    nodes: [
      {
        tag: "Station",
        desc: "Root tag for stations and hubs",
        children: [
          {
            tag: "Station.Type",
            desc: "Station archetypes",
            children: [
              { tag: "Station.Type.TradeHub", desc: "Major trading hub" },
              { tag: "Station.Type.MilitaryStarbase", desc: "Military starbase" },
              { tag: "Station.Type.MiningOutpost", desc: "Mining outpost" },
              { tag: "Station.Type.ResearchColony", desc: "Research colony" },
              { tag: "Station.Type.Shipyard", desc: "Ship construction yard" }
            ]
          },
          {
            tag: "Station.Service",
            desc: "Services provided",
            children: [
              { tag: "Station.Service.Repair", desc: "Repair facilities" },
              { tag: "Station.Service.Refuel", desc: "Refueling" },
              { tag: "Station.Service.Market", desc: "Marketplace access" },
              { tag: "Station.Service.Research", desc: "Research labs" },
              { tag: "Station.Service.Clinic", desc: "Medical services" },
              { tag: "Station.Service.Hangar", desc: "Hangar services" }
            ]
          },
          {
            tag: "Station.Security",
            desc: "Security level",
            children: [
              { tag: "Station.Security.High", desc: "High security" },
              { tag: "Station.Security.Medium", desc: "Medium security" },
              { tag: "Station.Security.Low", desc: "Low security" },
              { tag: "Station.Security.Lawless", desc: "Lawless" }
            ]
          },
          {
            tag: "Station.Size",
            desc: "Station scale",
            children: [
              { tag: "Station.Size.Outpost", desc: "Small outpost" },
              { tag: "Station.Size.Station", desc: "Standard station" },
              { tag: "Station.Size.Megastation", desc: "Mega-scale station" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "economy",
    name: "Economy",
    rootTag: "Economy",
    approxCount: 110,
    group: "economy",
    description: "Markets, trade routes, manufacturing chains, economic zones",
    nodes: [
      {
        tag: "Economy",
        desc: "Root tag for economic simulation",
        children: [
          {
            tag: "Economy.Market",
            desc: "Market conditions",
            children: [
              { tag: "Economy.Market.Bull", desc: "Prices rising" },
              { tag: "Economy.Market.Bear", desc: "Prices falling" },
              { tag: "Economy.Market.Stable", desc: "Stable prices" },
              { tag: "Economy.Market.Volatile", desc: "Volatile price swings" }
            ]
          },
          {
            tag: "Economy.TradeRoute",
            desc: "Trade route designations",
            children: [
              { tag: "Economy.TradeRoute.Core", desc: "Core corridor" },
              { tag: "Economy.TradeRoute.Border", desc: "Border run" },
              { tag: "Economy.TradeRoute.Smuggling", desc: "Smuggling lane" },
              { tag: "Economy.TradeRoute.Black", desc: "Black market chain" }
            ]
          },
          {
            tag: "Economy.Manufacturing",
            desc: "Manufacturing chains",
            children: [
              { tag: "Economy.Manufacturing.Raw", desc: "Raw material stage" },
              { tag: "Economy.Manufacturing.Refined", desc: "Refinement stage" },
              { tag: "Economy.Manufacturing.Assembly", desc: "Assembly stage" },
              { tag: "Economy.Manufacturing.Advanced", desc: "Advanced manufacturing" }
            ]
          },
          {
            tag: "Economy.Zone",
            desc: "Economic zones",
            children: [
              { tag: "Economy.Zone.FreeTrade", desc: "Free trade zone" },
              { tag: "Economy.Zone.Tariff", desc: "Tariff regulated zone" },
              { tag: "Economy.Zone.Embargo", desc: "Embargoed zone" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "technology",
    name: "Technology",
    rootTag: "Technology",
    approxCount: 160,
    group: "economy",
    description: "Research trees, tech tiers, unlocks, and blueprints",
    nodes: [
      {
        tag: "Technology",
        desc: "Root tag for technology progression",
        children: [
          {
            tag: "Technology.Field",
            desc: "Research disciplines",
            children: [
              { tag: "Technology.Field.Propulsion", desc: "Propulsion research" },
              { tag: "Technology.Field.Energy", desc: "Energy systems" },
              { tag: "Technology.Field.Weapons", desc: "Weapons development" },
              { tag: "Technology.Field.Defense", desc: "Defensive systems" },
              { tag: "Technology.Field.Industry", desc: "Industrial processes" },
              { tag: "Technology.Field.Biotech", desc: "Biotechnology" }
            ]
          },
          {
            tag: "Technology.Tier",
            desc: "Tech tier progression",
            children: [
              { tag: "Technology.Tier.T1", desc: "Tier 1 tech" },
              { tag: "Technology.Tier.T2", desc: "Tier 2 tech" },
              { tag: "Technology.Tier.T3", desc: "Tier 3 tech" },
              { tag: "Technology.Tier.T4", desc: "Tier 4 tech" },
              { tag: "Technology.Tier.Experimental", desc: "Experimental tech" }
            ]
          },
          {
            tag: "Technology.Unlock",
            desc: "Unlock requirements",
            children: [
              { tag: "Technology.Unlock.Research", desc: "Requires research" },
              { tag: "Technology.Unlock.Reputation", desc: "Requires reputation" },
              { tag: "Technology.Unlock.Event", desc: "Requires event completion" },
              { tag: "Technology.Unlock.Mission", desc: "Requires mission completion" }
            ]
          },
          {
            tag: "Technology.Blueprint",
            desc: "Blueprint categories",
            children: [
              { tag: "Technology.Blueprint.Ship", desc: "Ship hull blueprints" },
              { tag: "Technology.Blueprint.Module", desc: "Ship module blueprints" },
              { tag: "Technology.Blueprint.Weapon", desc: "Weapon blueprints" },
              { tag: "Technology.Blueprint.Structure", desc: "Station structure blueprints" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "exploration",
    name: "Exploration",
    rootTag: "Exploration",
    approxCount: 130,
    group: "world",
    description: "Discovery mechanics, anomalies, scanning, archaeology",
    nodes: [
      {
        tag: "Exploration",
        desc: "Root tag for exploration content",
        children: [
          {
            tag: "Exploration.Discovery",
            desc: "Discovery types",
            children: [
              { tag: "Exploration.Discovery.Scan", desc: "Scanning discovery" },
              { tag: "Exploration.Discovery.Sample", desc: "Sample collection" },
              { tag: "Exploration.Discovery.Analyze", desc: "Analysis discovery" },
              { tag: "Exploration.Discovery.Decode", desc: "Signal decoding" }
            ]
          },
          {
            tag: "Exploration.Anomaly",
            desc: "Anomaly types",
            children: [
              { tag: "Exploration.Anomaly.Gravitational", desc: "Gravitational anomaly" },
              { tag: "Exploration.Anomaly.Energy", desc: "Energy anomaly" },
              { tag: "Exploration.Anomaly.Biological", desc: "Biological anomaly" },
              { tag: "Exploration.Anomaly.Archaeological", desc: "Archaeological site" }
            ]
          },
          {
            tag: "Exploration.ScanMode",
            desc: "Scanning modes",
            children: [
              { tag: "Exploration.ScanMode.Passive", desc: "Passive scanning" },
              { tag: "Exploration.ScanMode.Active", desc: "Active scanning" },
              { tag: "Exploration.ScanMode.Deep", desc: "Deep scan" },
              { tag: "Exploration.ScanMode.Triad", desc: "Triangulation scan" }
            ]
          },
          {
            tag: "Exploration.Site",
            desc: "Site types",
            children: [
              { tag: "Exploration.Site.Ruins", desc: "Ancient ruins" },
              { tag: "Exploration.Site.Wreck", desc: "Shipwreck" },
              { tag: "Exploration.Site.Biome", desc: "Unique biome" },
              { tag: "Exploration.Site.Laboratory", desc: "Abandoned lab" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "social",
    name: "Social",
    rootTag: "Social",
    approxCount: 80,
    group: "gameplay",
    description: "Organizations, communication, social events, roles",
    nodes: [
      {
        tag: "Social",
        desc: "Root tag for social systems",
        children: [
          {
            tag: "Social.Organization",
            desc: "Player-run organizations",
            children: [
              { tag: "Social.Organization.Corporation", desc: "Player corporation" },
              { tag: "Social.Organization.Guild", desc: "Player guild" },
              { tag: "Social.Organization.Alliance", desc: "Alliance of orgs" }
            ]
          },
          {
            tag: "Social.Channel",
            desc: "Communication channels",
            children: [
              { tag: "Social.Channel.Local", desc: "Local chat" },
              { tag: "Social.Channel.Corporate", desc: "Corporation chat" },
              { tag: "Social.Channel.Alliance", desc: "Alliance chat" },
              { tag: "Social.Channel.Fleet", desc: "Fleet coordination" },
              { tag: "Social.Channel.Private", desc: "Private channel" }
            ]
          },
          {
            tag: "Social.Event",
            desc: "Social event types",
            children: [
              { tag: "Social.Event.Gathering", desc: "Social gathering" },
              { tag: "Social.Event.PvP", desc: "Organized PvP event" },
              { tag: "Social.Event.PvE", desc: "Co-op PvE event" },
              { tag: "Social.Event.Trade", desc: "Trade fair" }
            ]
          },
          {
            tag: "Social.Role",
            desc: "Organization roles",
            children: [
              { tag: "Social.Role.Leader", desc: "Organization leader" },
              { tag: "Social.Role.Officer", desc: "Organization officer" },
              { tag: "Social.Role.Member", desc: "Organization member" },
              { tag: "Social.Role.Recruit", desc: "New recruit" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "pvp",
    name: "PvP",
    rootTag: "PvP",
    approxCount: 70,
    group: "gameplay",
    description: "PvP zones, tiers, rankings, and match types",
    nodes: [
      {
        tag: "PvP",
        desc: "Root tag for PvP systems",
        children: [
          {
            tag: "PvP.Zone",
            desc: "PvP zone classifications",
            children: [
              { tag: "PvP.Zone.HighSec", desc: "High security space" },
              { tag: "PvP.Zone.LowSec", desc: "Low security space" },
              { tag: "PvP.Zone.NullSec", desc: "Null security space" },
              { tag: "PvP.Zone.Arena", desc: "Structured arena" }
            ]
          },
          {
            tag: "PvP.Rank",
            desc: "PvP ranking tiers",
            children: [
              { tag: "PvP.Rank.Bronze", desc: "Bronze tier" },
              { tag: "PvP.Rank.Silver", desc: "Silver tier" },
              { tag: "PvP.Rank.Gold", desc: "Gold tier" },
              { tag: "PvP.Rank.Platinum", desc: "Platinum tier" },
              { tag: "PvP.Rank.Diamond", desc: "Diamond tier" }
            ]
          },
          {
            tag: "PvP.Mode",
            desc: "PvP match modes",
            children: [
              { tag: "PvP.Mode.Deathmatch", desc: "Free-for-all deathmatch" },
              { tag: "PvP.Mode.Team", desc: "Team deathmatch" },
              { tag: "PvP.Mode.Siege", desc: "Siege warfare" },
              { tag: "PvP.Mode.Conquest", desc: "Territory conquest" }
            ]
          },
          {
            tag: "PvP.Flag",
            desc: "PvP engagement flags",
            children: [
              { tag: "PvP.Flag.OptIn", desc: "Opt-in PvP" },
              { tag: "PvP.Flag.Forced", desc: "Forced PvP" },
              { tag: "PvP.Flag.Immunity", desc: "Temporary immunity" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "pve",
    name: "PvE",
    rootTag: "PvE",
    approxCount: 90,
    group: "gameplay",
    description: "AI factions, encounter types, difficulty tiers",
    nodes: [
      {
        tag: "PvE",
        desc: "Root tag for PvE content",
        children: [
          {
            tag: "PvE.Enemy",
            desc: "Enemy archetypes",
            children: [
              { tag: "PvE.Enemy.Pirates", desc: "Pirate faction" },
              { tag: "PvE.Enemy.Aliens", desc: "Alien species" },
              { tag: "PvE.Enemy.RogueAI", desc: "Rogue AI" },
              { tag: "PvE.Enemy.Cultists", desc: "Cultist faction" }
            ]
          },
          {
            tag: "PvE.Encounter",
            desc: "Encounter structures",
            children: [
              { tag: "PvE.Encounter.Patrol", desc: "Patrol encounter" },
              { tag: "PvE.Encounter.Ambush", desc: "Ambush encounter" },
              { tag: "PvE.Encounter.Siege", desc: "Siege encounter" },
              { tag: "PvE.Encounter.Raid", desc: "Raid encounter" }
            ]
          },
          {
            tag: "PvE.Difficulty",
            desc: "Encounter difficulty",
            children: [
              { tag: "PvE.Difficulty.Easy", desc: "Easy difficulty" },
              { tag: "PvE.Difficulty.Normal", desc: "Normal difficulty" },
              { tag: "PvE.Difficulty.Hard", desc: "Hard difficulty" },
              { tag: "PvE.Difficulty.Elite", desc: "Elite difficulty" },
              { tag: "PvE.Difficulty.Boss", desc: "Boss encounter" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "environment",
    name: "Environment",
    rootTag: "Environment",
    approxCount: 100,
    group: "world",
    description: "Hazards, weather, zones, environmental modifiers",
    nodes: [
      {
        tag: "Environment",
        desc: "Root tag for environmental simulation",
        children: [
          {
            tag: "Environment.Hazard",
            desc: "Environmental hazards",
            children: [
              { tag: "Environment.Hazard.Radiation", desc: "Radiation hazard" },
              { tag: "Environment.Hazard.EMP", desc: "Electromagnetic pulse" },
              { tag: "Environment.Hazard.Gravity", desc: "Extreme gravity" },
              { tag: "Environment.Hazard.Temperature", desc: "Extreme temperature" },
              { tag: "Environment.Hazard.Corrosive", desc: "Corrosive atmosphere" }
            ]
          },
          {
            tag: "Environment.Weather",
            desc: "Space weather patterns",
            children: [
              { tag: "Environment.Weather.IonStorm", desc: "Ion storm" },
              { tag: "Environment.Weather.AsteroidShower", desc: "Asteroid shower" },
              { tag: "Environment.Weather.SolarFlare", desc: "Solar flare" },
              { tag: "Environment.Weather.NebulaDrift", desc: "Nebula drift" }
            ]
          },
          {
            tag: "Environment.Zone",
            desc: "Environmental zones",
            children: [
              { tag: "Environment.Zone.Safe", desc: "Safe zone" },
              { tag: "Environment.Zone.Hazardous", desc: "Hazardous zone" },
              { tag: "Environment.Zone.Extreme", desc: "Extreme zone" },
              { tag: "Environment.Zone.Deadly", desc: "Deadly zone" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "crafting",
    name: "Crafting",
    rootTag: "Crafting",
    approxCount: 120,
    group: "economy",
    description: "Blueprints, quality levels, processes, modifications",
    nodes: [
      {
        tag: "Crafting",
        desc: "Root tag for crafting systems",
        children: [
          {
            tag: "Crafting.Blueprint",
            desc: "Blueprint rarity",
            children: [
              { tag: "Crafting.Blueprint.Common", desc: "Common blueprint" },
              { tag: "Crafting.Blueprint.Uncommon", desc: "Uncommon blueprint" },
              { tag: "Crafting.Blueprint.Rare", desc: "Rare blueprint" },
              { tag: "Crafting.Blueprint.Epic", desc: "Epic blueprint" },
              { tag: "Crafting.Blueprint.Legendary", desc: "Legendary blueprint" }
            ]
          },
          {
            tag: "Crafting.Quality",
            desc: "Crafted item quality",
            children: [
              { tag: "Crafting.Quality.Poor", desc: "Poor quality" },
              { tag: "Crafting.Quality.Common", desc: "Common quality" },
              { tag: "Crafting.Quality.Uncommon", desc: "Uncommon quality" },
              { tag: "Crafting.Quality.Rare", desc: "Rare quality" },
              { tag: "Crafting.Quality.Epic", desc: "Epic quality" },
              { tag: "Crafting.Quality.Legendary", desc: "Legendary quality" }
            ]
          },
          {
            tag: "Crafting.Process",
            desc: "Crafting processes",
            children: [
              { tag: "Crafting.Process.Manufacture", desc: "Standard manufacturing" },
              { tag: "Crafting.Process.Repair", desc: "Component repair" },
              { tag: "Crafting.Process.Refit", desc: "Ship refit" },
              { tag: "Crafting.Process.Enhancement", desc: "Item enhancement" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "event",
    name: "Event",
    rootTag: "Event",
    approxCount: 150,
    group: "gameplay",
    description: "Dynamic events, triggers, rewards, and states",
    nodes: [
      {
        tag: "Event",
        desc: "Root tag for dynamic events",
        children: [
          {
            tag: "Event.Type",
            desc: "Event categories",
            children: [
              { tag: "Event.Type.Invasion", desc: "Invasion event" },
              { tag: "Event.Type.Discovery", desc: "Discovery event" },
              { tag: "Event.Type.Trade", desc: "Trade boom" },
              { tag: "Event.Type.War", desc: "Faction war" }
            ]
          },
          {
            tag: "Event.Trigger",
            desc: "Event triggers",
            children: [
              { tag: "Event.Trigger.Time", desc: "Time-based trigger" },
              { tag: "Event.Trigger.PlayerCount", desc: "Population trigger" },
              { tag: "Event.Trigger.Faction", desc: "Faction trigger" },
              { tag: "Event.Trigger.Discovery", desc: "Discovery trigger" }
            ]
          },
          {
            tag: "Event.Reward",
            desc: "Reward packages",
            children: [
              { tag: "Event.Reward.Credits", desc: "Credit reward" },
              { tag: "Event.Reward.Items", desc: "Item reward" },
              { tag: "Event.Reward.Reputation", desc: "Reputation reward" },
              { tag: "Event.Reward.Unlock", desc: "Unlock reward" }
            ]
          },
          {
            tag: "Event.State",
            desc: "Event lifecycle",
            children: [
              { tag: "Event.State.Announced", desc: "Event announced" },
              { tag: "Event.State.Active", desc: "Event active" },
              { tag: "Event.State.Completed", desc: "Event completed" },
              { tag: "Event.State.Expired", desc: "Event expired" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "ability",
    name: "Ability",
    rootTag: "Ability",
    approxCount: 140,
    group: "gameplay",
    description: "Active skills, passive traits, cooldowns, ultimate abilities",
    nodes: [
      {
        tag: "Ability",
        desc: "Root tag for abilities",
        children: [
          {
            tag: "Ability.Active",
            desc: "Active abilities",
            children: [
              { tag: "Ability.Active.Cloak", desc: "Ship cloaking ability" },
              { tag: "Ability.Active.Overcharge", desc: "Module overcharge" },
              { tag: "Ability.Active.EMPPulse", desc: "EMP pulse" },
              { tag: "Ability.Active.WarpDisrupt", desc: "Warp disruption" }
            ]
          },
          {
            tag: "Ability.Passive",
            desc: "Passive abilities",
            children: [
              { tag: "Ability.Passive.DamageBoost", desc: "Damage boost" },
              { tag: "Ability.Passive.ShieldRegen", desc: "Shield regeneration" },
              { tag: "Ability.Passive.FuelEfficiency", desc: "Improved fuel efficiency" }
            ]
          },
          {
            tag: "Ability.Ultimate",
            desc: "Ultimate abilities",
            children: [
              { tag: "Ability.Ultimate.NovaStrike", desc: "Nova strike" },
              { tag: "Ability.Ultimate.GravityWell", desc: "Localized gravity well" }
            ]
          },
          {
            tag: "Ability.Cooldown",
            desc: "Cooldown states",
            children: [
              { tag: "Ability.Cooldown.Ready", desc: "Ability ready" },
              { tag: "Ability.Cooldown.Active", desc: "Ability active" },
              { tag: "Ability.Cooldown.Recharging", desc: "Ability recharging" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "status",
    name: "Status",
    rootTag: "Status",
    approxCount: 110,
    group: "gameplay",
    description: "Buffs, debuffs, conditions, crowd control states",
    nodes: [
      {
        tag: "Status",
        desc: "Root tag for status effects",
        children: [
          {
            tag: "Status.Buff",
            desc: "Positive modifiers",
            children: [
              { tag: "Status.Buff.DamageUp", desc: "Damage increased" },
              { tag: "Status.Buff.SpeedUp", desc: "Speed increased" },
              { tag: "Status.Buff.ShieldUp", desc: "Shield reinforced" },
              { tag: "Status.Buff.Regen", desc: "Regeneration enhanced" }
            ]
          },
          {
            tag: "Status.Debuff",
            desc: "Negative modifiers",
            children: [
              { tag: "Status.Debuff.Slow", desc: "Movement slowed" },
              { tag: "Status.Debuff.EMP", desc: "Systems disrupted" },
              { tag: "Status.Debuff.Burning", desc: "Taking burn damage" },
              { tag: "Status.Debuff.Radiation", desc: "Radiation sickness" }
            ]
          },
          {
            tag: "Status.Condition",
            desc: "Persistent conditions",
            children: [
              { tag: "Status.Condition.Stunned", desc: "Unable to act" },
              { tag: "Status.Condition.Disabled", desc: "Systems disabled" },
              { tag: "Status.Condition.Docked", desc: "Docked to structure" },
              { tag: "Status.Condition.Flagged", desc: "Flagged for engagement" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "region",
    name: "Region",
    rootTag: "Region",
    approxCount: 80,
    group: "world",
    description: "Space regions, security levels, territorial features",
    nodes: [
      {
        tag: "Region",
        desc: "Root tag for spatial regions",
        children: [
          {
            tag: "Region.Security",
            desc: "Security classification",
            children: [
              { tag: "Region.Security.High", desc: "High security" },
              { tag: "Region.Security.Low", desc: "Low security" },
              { tag: "Region.Security.Null", desc: "Null security" },
              { tag: "Region.Security.Anomalous", desc: "Anomalous space" }
            ]
          },
          {
            tag: "Region.Territory",
            desc: "Control designation",
            children: [
              { tag: "Region.Territory.Faction", desc: "Faction-held space" },
              { tag: "Region.Territory.Neutral", desc: "Neutral space" },
              { tag: "Region.Territory.Uncharted", desc: "Uncharted frontier" }
            ]
          },
          {
            tag: "Region.Feature",
            desc: "Regional features",
            children: [
              { tag: "Region.Feature.TradeLane", desc: "Trade lane" },
              { tag: "Region.Feature.WormholeHub", desc: "Wormhole hub" },
              { tag: "Region.Feature.FleetAnchorage", desc: "Fleet anchorage" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "npc",
    name: "NPC",
    rootTag: "NPC",
    approxCount: 100,
    group: "gameplay",
    description: "AI roles, behavioral profiles, faction allegiances",
    nodes: [
      {
        tag: "NPC",
        desc: "Root tag for non-player characters",
        children: [
          {
            tag: "NPC.Type",
            desc: "NPC archetypes",
            children: [
              { tag: "NPC.Type.Trader", desc: "Trader NPC" },
              { tag: "NPC.Type.Miner", desc: "Miner NPC" },
              { tag: "NPC.Type.Pirate", desc: "Pirate NPC" },
              { tag: "NPC.Type.Military", desc: "Military NPC" },
              { tag: "NPC.Type.Scientist", desc: "Scientist NPC" }
            ]
          },
          {
            tag: "NPC.Behavior",
            desc: "Behavioral patterns",
            children: [
              { tag: "NPC.Behavior.Aggressive", desc: "Aggressive AI" },
              { tag: "NPC.Behavior.Defensive", desc: "Defensive AI" },
              { tag: "NPC.Behavior.Neutral", desc: "Neutral AI" },
              { tag: "NPC.Behavior.Friendly", desc: "Friendly AI" }
            ]
          },
          {
            tag: "NPC.Affiliation",
            desc: "Faction allegiance",
            children: [
              { tag: "NPC.Affiliation.Faction", desc: "Aligned to major faction" },
              { tag: "NPC.Affiliation.Independent", desc: "Independent NPC" },
              { tag: "NPC.Affiliation.Criminal", desc: "Criminal NPC" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "ui",
    name: "UI",
    rootTag: "UI",
    approxCount: 60,
    group: "technical",
    description: "Interface states, notifications, tutorials, overlays",
    nodes: [
      {
        tag: "UI",
        desc: "Root tag for user interface systems",
        children: [
          {
            tag: "UI.Screen",
            desc: "Primary interface screens",
            children: [
              { tag: "UI.Screen.Menu", desc: "Main menu" },
              { tag: "UI.Screen.HUD", desc: "Heads-up display" },
              { tag: "UI.Screen.Map", desc: "Galaxy map" },
              { tag: "UI.Screen.Inventory", desc: "Inventory screen" }
            ]
          },
          {
            tag: "UI.Notification",
            desc: "Notification severity",
            children: [
              { tag: "UI.Notification.Info", desc: "Informational notification" },
              { tag: "UI.Notification.Warning", desc: "Warning notification" },
              { tag: "UI.Notification.Critical", desc: "Critical alert" }
            ]
          },
          {
            tag: "UI.Tutorial",
            desc: "Tutorial states",
            children: [
              { tag: "UI.Tutorial.Active", desc: "Tutorial active" },
              { tag: "UI.Tutorial.Completed", desc: "Tutorial completed" },
              { tag: "UI.Tutorial.Hidden", desc: "Tutorial hidden" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "analytics",
    name: "Analytics",
    rootTag: "Analytics",
    approxCount: 50,
    group: "technical",
    description: "Telemetry, tracking, funnel events, and KPIs",
    nodes: [
      {
        tag: "Analytics",
        desc: "Root tag for gameplay analytics",
        children: [
          {
            tag: "Analytics.Category",
            desc: "Tracking categories",
            children: [
              { tag: "Analytics.Category.Combat", desc: "Combat telemetry" },
              { tag: "Analytics.Category.Trade", desc: "Trade telemetry" },
              { tag: "Analytics.Category.Exploration", desc: "Exploration telemetry" },
              { tag: "Analytics.Category.Social", desc: "Social telemetry" }
            ]
          },
          {
            tag: "Analytics.Metric",
            desc: "Key performance indicators",
            children: [
              { tag: "Analytics.Metric.DamageDealt", desc: "Total damage dealt" },
              { tag: "Analytics.Metric.DistanceTraveled", desc: "Distance traveled" },
              { tag: "Analytics.Metric.CreditsEarned", desc: "Credits earned" },
              { tag: "Analytics.Metric.MissionsCompleted", desc: "Missions completed" }
            ]
          },
          {
            tag: "Analytics.Event",
            desc: "Funnel events",
            children: [
              { tag: "Analytics.Event.SessionStart", desc: "Session start" },
              { tag: "Analytics.Event.SessionEnd", desc: "Session end" },
              { tag: "Analytics.Event.Purchase", desc: "Purchase event" },
              { tag: "Analytics.Event.Abandon", desc: "Abandon event" }
            ]
          }
        ]
      }
    ]
  }
];

const CATEGORY_GROUP_CONTAINERS = {
  core: "coreCategories",
  gameplay: "gameplayCategories",
  world: "worldCategories",
  economy: "economyCategories",
  technical: "technicalCategories"
};

const generatorState = {
  selectedCategories: new Set(),
  generatedTags: [],
  filteredTags: [],
  activeFormat: "ini",
  tagIndex: new Map()
};

document.addEventListener("DOMContentLoaded", () => {
  initializeCategoryCards();
  initializeControls();
  selectAllCategories();
  updateHeaderStats();
});

function initializeCategoryCards() {
  CATEGORY_DEFINITIONS.forEach((category) => {
    const containerId = CATEGORY_GROUP_CONTAINERS[category.group];
    if (!containerId) return;

    const container = document.getElementById(containerId);
    if (!container) return;

    const card = document.createElement("label");
    card.className = "category-card";
    card.dataset.categoryId = category.id;

    card.innerHTML = `
      <input type="checkbox" id="cat-${category.id}" checked>
      <span class="category-name">${category.name}</span>
      <span class="category-count"><span class="tag-count">~${category.approxCount}</span> tags</span>
      <span class="category-count" style="color:#95a5a6; font-size:0.8em;">${category.description}</span>
    `;

    const input = card.querySelector("input");
    input.addEventListener("change", (event) => {
      toggleCategorySelection(category.id, event.target.checked);
      card.classList.toggle("selected", event.target.checked);
    });

    card.classList.add("selected");
    generatorState.selectedCategories.add(category.id);
    container.appendChild(card);
  });
}

function initializeControls() {
  const searchInput = document.getElementById("tagSearch");
  if (searchInput) {
    searchInput.addEventListener("input", filterTags);
  }

  document.querySelectorAll(".export-tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => switchExportFormat(btn.dataset.format));
  });
}

function toggleCategorySelection(categoryId, isSelected) {
  if (isSelected) {
    generatorState.selectedCategories.add(categoryId);
  } else {
    generatorState.selectedCategories.delete(categoryId);
  }
}

function selectAllCategories() {
  document.querySelectorAll(".category-card input[type='checkbox']").forEach((checkbox) => {
    checkbox.checked = true;
    const card = checkbox.closest(".category-card");
    if (card) card.classList.add("selected");
    generatorState.selectedCategories.add(checkbox.id.replace("cat-", ""));
  });
}

function deselectAllCategories() {
  document.querySelectorAll(".category-card input[type='checkbox']").forEach((checkbox) => {
    checkbox.checked = false;
    const card = checkbox.closest(".category-card");
    if (card) card.classList.remove("selected");
  });
  generatorState.selectedCategories.clear();
  generatorState.generatedTags = [];
  generatorState.filteredTags = [];
  updateTagTreeDisplay();
  updateStatisticsPanels();
  updateExportPreview();
}

function generateAllTags() {
  const allTags = [];
  const tagSet = new Set();

  generatorState.tagIndex.clear();

  CATEGORY_DEFINITIONS.forEach((category) => {
    if (!generatorState.selectedCategories.has(category.id)) return;
    category.nodes.forEach((node) => collectTagsRecursive(node, category.id, allTags, tagSet));
  });

  allTags.sort((a, b) => a.tag.localeCompare(b.tag));
  generatorState.generatedTags = allTags;
  generatorState.filteredTags = [...allTags];

  updateTagTreeDisplay();
  updateStatisticsPanels();
  updateCategoryCounts();
  updateExportPreview(generatorState.activeFormat);

  const exportSection = document.getElementById("exportSection");
  if (exportSection) exportSection.style.display = allTags.length ? "block" : "none";
}

function collectTagsRecursive(node, categoryId, collection, seen) {
  if (!node || !node.tag) return;
  if (seen.has(node.tag)) return;
  seen.add(node.tag);

  const entry = {
    tag: node.tag,
    desc: node.desc || "",
    categoryId
  };

  collection.push(entry);
  generatorState.tagIndex.set(node.tag, entry);

  if (Array.isArray(node.children)) {
    node.children.forEach((child) => collectTagsRecursive(child, categoryId, collection, seen));
  }
}

function updateTagTreeDisplay() {
  const treeElement = document.getElementById("tagTree");
  const countElement = document.getElementById("tagCount");

  if (!treeElement || !countElement) return;

  if (!generatorState.filteredTags.length) {
    treeElement.innerHTML = '<p style="color: #95a5a6; font-style: italic; text-align: center; padding: 40px;">No tags generated. Select categories and generate to view results.</p>';
    countElement.textContent = "0";
    return;
  }

  const hierarchy = buildTagHierarchy(generatorState.filteredTags);
  treeElement.innerHTML = renderTagHierarchy(hierarchy);
  countElement.textContent = generatorState.filteredTags.length.toLocaleString();
}

function buildTagHierarchy(tags) {
  const root = {};
  tags.forEach((tagObj) => {
    const parts = tagObj.tag.split(".");
    let current = root;

    parts.forEach((part, index) => {
      if (!current[part]) {
        const fullTag = parts.slice(0, index + 1).join(".");
        const original = generatorState.tagIndex.get(fullTag);

        current[part] = {
          name: part,
          fullTag,
          description: original?.desc || "",
          categoryId: original?.categoryId || null,
          children: {}
        };
      }
      current = current[part].children;
    });
  });

  return root;
}

function renderTagHierarchy(hierarchy, depth = 0) {
  let html = "";
  const categoryColors = {
    player: "#3498db",
    ship: "#9b59b6",
    celestial: "#e67e22",
    resource: "#2ecc71",
    combat: "#e74c3c",
    faction: "#f1c40f",
    mission: "#1abc9c",
    station: "#8e44ad",
    economy: "#16a085",
    technology: "#2980b9",
    exploration: "#d35400",
    social: "#f39c12",
    pvp: "#c0392b",
    pve: "#27ae60",
    environment: "#2c3e50",
    crafting: "#7f8c8d",
    event: "#d35400",
    ability: "#8e44ad",
    status: "#16a085",
    region: "#34495e",
    npc: "#95a5a6",
    ui: "#1abc9c",
    analytics: "#e74c3c"
  };

  Object.values(hierarchy).forEach((node) => {
    const hasChildren = Object.keys(node.children).length > 0;
    const nodeClass = depth === 0 ? "tag-node root" : "tag-node";
    const categoryColor = categoryColors[node.categoryId] || "#3498db";

    html += `<div class="${nodeClass}">`;
    html += `<span class="tag-name${hasChildren ? " parent" : " leaf"}" style="color:${categoryColor}">${node.fullTag}</span>`;

    if (node.description) {
      html += `<span class="tag-description">${node.description}</span>`;
    }

    if (hasChildren) {
      html += renderTagHierarchy(node.children, depth + 1);
    }

    html += "</div>";
  });

  return html;
}

function updateStatisticsPanels() {
  const totalTagsElement = document.getElementById("totalTags");
  const parentTagsElement = document.getElementById("parentTags");
  const leafTagsElement = document.getElementById("leafTags");
  const maxDepthElement = document.getElementById("maxDepth");

  const tags = generatorState.generatedTags;
  const tagSet = new Set(tags.map((t) => t.tag));

  let parentCount = 0;
  let maxDepth = 0;

  tags.forEach((tag) => {
    const depth = tag.tag.split(".").length;
    if (depth > maxDepth) maxDepth = depth;

    const childPrefix = `${tag.tag}.`;
    const isParent = tags.some((other) => other.tag.startsWith(childPrefix));
    if (isParent) parentCount += 1;
  });

  const leafCount = tags.length - parentCount;

  if (totalTagsElement) totalTagsElement.textContent = tags.length.toLocaleString();
  if (parentTagsElement) parentTagsElement.textContent = parentCount.toLocaleString();
  if (leafTagsElement) leafTagsElement.textContent = Math.max(leafCount, 0).toLocaleString();
  if (maxDepthElement) maxDepthElement.textContent = maxDepth.toString();
}

function updateCategoryCounts() {
  const categoryTotals = new Map();

  generatorState.generatedTags.forEach((tag) => {
    const categoryId = tag.categoryId;
    if (!categoryId) return;
    categoryTotals.set(categoryId, (categoryTotals.get(categoryId) || 0) + 1);
  });

  document.querySelectorAll(".category-card").forEach((card) => {
    const categoryId = card.dataset.categoryId;
    const countSpan = card.querySelector(".tag-count");
    if (!countSpan) return;

    const total = categoryTotals.get(categoryId);
    if (typeof total === "number") {
      countSpan.textContent = total.toLocaleString();
    } else {
      const category = CATEGORY_DEFINITIONS.find((c) => c.id === categoryId);
      countSpan.textContent = category ? `~${category.approxCount}` : "0";
    }
  });
}

function filterTags(event) {
  const term = (event?.target?.value || "").trim().toLowerCase();
  if (!term) {
    generatorState.filteredTags = [...generatorState.generatedTags];
  } else {
    generatorState.filteredTags = generatorState.generatedTags.filter((entry) => {
      return entry.tag.toLowerCase().includes(term) || entry.desc.toLowerCase().includes(term);
    });
  }

  updateTagTreeDisplay();
}

function exportTags(format) {
  if (!generatorState.generatedTags.length) {
    alert("No tags to export. Generate the taxonomy first.");
    return;
  }

  let content = "";
  let extension = "txt";

  switch (format) {
    case "ini":
      content = generateIniExport();
      extension = "ini";
      break;
    case "cpp":
      content = generateCppExport();
      extension = "h";
      break;
    case "json":
      content = generateJsonExport();
      extension = "json";
      break;
    default:
      content = generateIniExport();
      extension = "ini";
      break;
  }

  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `SpaceMMO_GameplayTags_${Date.now()}.${extension}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function generateIniExport() {
  const lines = [];
  lines.push("; Unreal Engine GameplayTags Configuration");
  lines.push("; Generated by Space MMO GameTags Generator");
  lines.push(`; Tag Count: ${generatorState.generatedTags.length}`);
  lines.push(`; Generated: ${new Date().toISOString()}`);
  lines.push("");
  lines.push("[/Script/GameplayTags.GameplayTagsSettings]");
  lines.push("");

  generatorState.generatedTags.forEach((entry) => {
    const comment = entry.desc ? entry.desc.replace(/"/g, "'") : "";
    lines.push(`+GameplayTagList=(Tag="${entry.tag}",DevComment="${comment}")`);
  });

  return lines.join("\n");
}

function generateCppExport() {
  const namespaceLines = [];
  const definitionLines = [];

  const grouped = new Map();
  generatorState.generatedTags.forEach((entry) => {
    const root = entry.tag.split(".")[0];
    if (!grouped.has(root)) grouped.set(root, []);
    grouped.get(root).push(entry);
  });

  const headerLines = [];
  headerLines.push("// Auto-generated gameplay tag declarations");
  headerLines.push("// Generated by Space MMO GameTags Generator");
  headerLines.push(`# Generated: ${new Date().toISOString()}`);
  headerLines.push("#pragma once");
  headerLines.push("");
  headerLines.push('#include "NativeGameplayTags.h"');
  headerLines.push("");
  headerLines.push("namespace SpaceMMOTags");
  headerLines.push("{");

  grouped.forEach((tags, root) => {
    headerLines.push("");
    headerLines.push(`\t// ${root}`);
    tags.forEach((entry) => {
      const varName = entry.tag.replace(/\./g, "_");
      const comment = entry.desc ? ` // ${entry.desc}` : "";
      headerLines.push(`\tUE_DECLARE_GAMEPLAY_TAG_EXTERN(${varName});${comment}`);
    });
  });

  headerLines.push("}");
  headerLines.push("");
  headerLines.push("// Implementation (add to .cpp file)");
  headerLines.push("/*");
  headerLines.push("namespace SpaceMMOTags");
  headerLines.push("{");

  grouped.forEach((tags, root) => {
    headerLines.push("");
    headerLines.push(`\t// ${root}`);
    tags.forEach((entry) => {
      const varName = entry.tag.replace(/\./g, "_");
      headerLines.push(`\tUE_DEFINE_GAMEPLAY_TAG(${varName}, "${entry.tag}");`);
    });
  });

  headerLines.push("}");
  headerLines.push("*/");

  return headerLines.join("\n");
}

function generateJsonExport() {
  return JSON.stringify(generatorState.generatedTags, null, 2);
}

function updateExportPreview(format = generatorState.activeFormat) {
  generatorState.activeFormat = format;
  const previewElement = document.getElementById("exportContent");
  if (!previewElement) return;

  if (!generatorState.generatedTags.length) {
    previewElement.innerHTML = "<code>No tags generated yet</code>";
    return;
  }

  let content = "";
  switch (format) {
    case "ini":
      content = generateIniExport();
      break;
    case "cpp":
      content = generateCppExport();
      break;
    case "json":
      content = generateJsonExport();
      break;
    default:
      content = generateIniExport();
      break;
  }

  const escaped = content
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  previewElement.innerHTML = `<code>${escaped}</code>`;

  document.querySelectorAll(".export-tab-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.format === format);
  });
}

function switchExportFormat(format) {
  updateExportPreview(format);
}

function copyToClipboard() {
  if (!generatorState.generatedTags.length) {
    alert("No tags to copy. Generate the taxonomy first.");
    return;
  }

  let content = "";
  switch (generatorState.activeFormat) {
    case "ini":
      content = generateIniExport();
      break;
    case "cpp":
      content = generateCppExport();
      break;
    case "json":
      content = generateJsonExport();
      break;
    default:
      content = generateIniExport();
      break;
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(content)
      .then(() => alert("Gameplay tags copied to clipboard."))
      .catch((err) => {
        console.error("Clipboard copy failed", err);
        fallbackCopyToClipboard(content);
      });
  } else {
    fallbackCopyToClipboard(content);
  }
}

function fallbackCopyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  alert("Gameplay tags copied to clipboard.");
}

function clearTags() {
  if (!generatorState.generatedTags.length) return;
  if (!confirm("Clear generated tags?")) return;

  generatorState.generatedTags = [];
  generatorState.filteredTags = [];
  generatorState.tagIndex.clear();

  updateTagTreeDisplay();
  updateStatisticsPanels();
  updateCategoryCounts();
  updateExportPreview();

  const exportSection = document.getElementById("exportSection");
  if (exportSection) exportSection.style.display = "none";
}

function updateHeaderStats() {
  const categoryCount = document.getElementById("categoryCount");
  const estimatedTags = document.getElementById("estimatedTags");

  if (categoryCount) {
    categoryCount.textContent = CATEGORY_DEFINITIONS.length.toString();
  }

  if (estimatedTags) {
    const estimate = CATEGORY_DEFINITIONS.reduce((sum, category) => sum + (category.approxCount || 0), 0);
    estimatedTags.textContent = `~${estimate.toLocaleString()}`;
  }
}

window.selectAllCategories = selectAllCategories;
window.deselectAllCategories = deselectAllCategories;
window.generateAllTags = generateAllTags;
window.exportTags = exportTags;
window.copyToClipboard = copyToClipboard;
window.clearTags = clearTags;
window.switchExportFormat = switchExportFormat;
