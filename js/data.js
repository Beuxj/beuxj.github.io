/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║           BEUXJ.DEV — CONTENT MANAGEMENT FILE               ║
 * ╠══════════════════════════════════════════════════════════════╣
 * ║  THIS IS THE ONLY FILE YOU EVER EDIT TO UPDATE YOUR SITE    ║
 * ║                                                              ║
 * ║  HOW TO ADD A NEW PROJECT:                                   ║
 * ║  1. Upload image/video to Google Drive                       ║
 * ║  2. Share → "Anyone with the link" → copy link               ║
 * ║  3. Grab the FILE_ID from the URL                            ║
 * ║  4. Add a new object at the TOP of BEUXJ_PROJECTS below      ║
 * ║  5. git add . && git commit -m "add: project" && git push    ║
 * ║     → GitHub Pages updates in ~60 seconds                    ║
 * ║                                                              ║
 * ║  GOOGLE DRIVE LINK FORMATS:                                  ║
 * ║  image    → https://drive.google.com/uc?id=FILE_ID           ║
 * ║  video    → https://drive.google.com/file/d/FILE_ID/preview  ║
 * ║  download → https://drive.google.com/uc?export=download&id=FILE_ID ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

const BEUXJ_PROJECTS = [

  // ══════════════════════════════════════════════════════════════
  // ADD NEW PROJECTS AT THE TOP — newest first
  // The first item always shows as the "What's New" featured card
  // ══════════════════════════════════════════════════════════════

  {
    // ── Identity ───────────────────────────────────────────────
    id:       "cave-escape",
    title:    "Cave Escape",
    category: "GAME",          // GAME | RENDER | DEMO | ASSET
    status:   "IN DEV",        // NEW | LIVE | IN DEV | UPDATED
    date:     "08 Apr 2026",
    page:     "html/godot.html",

    // ── Media (paste Google Drive links) ──────────────────────
    image:       "",           // "https://drive.google.com/uc?id=FILE_ID"
    video:       "",           // "https://drive.google.com/file/d/FILE_ID/preview"

    // ── Links ─────────────────────────────────────────────────
    itchUrl:     "https://beuxj.itch.io/knight-metroidvania-demo",           // shows "PLAY ON ITCH.IO" button
    steamUrl:    "",           // shows "VIEW ON STEAM" button
    downloadUrl: "",           // shows "DOWNLOAD" button
    githubUrl:   "",           // shows secondary "VIEW SOURCE" button
    devlogUrl:   "",           // shows secondary "DEV LOG" button

    // ── Text ──────────────────────────────────────────────────
    desc:  "A realistic first-person survival game set deep underground. Trapped, no memory, limited light — navigate, solve, escape.",
    tags:  ["SURVIVAL", "HORROR", "FPS", "ATMOSPHERIC"],

    specs: [
      { key: "ENGINE",   val: "Unreal Engine 5.4" },
      { key: "LIGHTING", val: "Lumen RT / SSG" },
      { key: "GEOMETRY", val: "Nanite Virtualized" },
      { key: "WORKFLOW", val: "Procedural PCG" }
    ],

    stats: [
      { key: "PLATFORM", val: "PC" },
      { key: "ENGINE",   val: "UE5 + Godot 4" },
      { key: "STATUS",   val: "In Development" }
    ]
  },

  {
    id:       "crystal-chamber",
    title:    "Crystal Chamber",
    category: "RENDER",
    status:   "NEW",
    date:     "02 Apr 2026",
    page:     "html/blender.html",
    image:       "",
    video:       "",
    itchUrl:     "",
    downloadUrl: "",
    githubUrl:   "",
    devlogUrl:   "",
    desc:  "Cycles render with a fully procedural crystal shader, real-time light caustics, and volumetric depth.",
    tags:  ["ENVIRONMENT", "CRYSTAL", "CAUSTICS", "PROCEDURAL"],
    specs: [
      { key: "ENGINE",   val: "Blender 4.x / Cycles" },
      { key: "LIGHTING", val: "HDRI + Caustics" },
      { key: "SHADER",   val: "Procedural PBR" },
      { key: "OUTPUT",   val: "4096px / EXR" }
    ],
    stats: [
      { key: "RESOLUTION", val: "4096px" },
      { key: "FORMAT",     val: "EXR + PNG" },
      { key: "RENDER",     val: "~2.5 hrs" }
    ]
  },

  {
    id:       "enemy-sight-ai",
    title:    "Enemy Sight AI",
    category: "DEMO",
    status:   "IN DEV",
    date:     "28 Mar 2026",
    page:     "html/godot.html",
    image:       "",
    video:       "",
    itchUrl:     "",
    downloadUrl: "",
    githubUrl:   "",
    devlogUrl:   "",
    desc:  "Raycasted cone-of-sight detection with patrol, alert, and chase states. Noise-reactive for cave environments.",
    tags:  ["AI", "STATE MACHINE", "RAYCAST", "GODOT"],
    specs: [
      { key: "ENGINE",   val: "Godot 4.x" },
      { key: "LANGUAGE", val: "GDScript" },
      { key: "SYSTEM",   val: "Finite State Machine" },
      { key: "PERF",     val: "60+ FPS" }
    ],
    stats: [
      { key: "NODES",   val: "38" },
      { key: "SCRIPTS", val: "9" },
      { key: "FPS",     val: "60+" }
    ]
  },

  {
    id:       "sound-atmosphere",
    title:    "Sound Atmosphere System",
    category: "DEMO",
    status:   "LIVE",
    date:     "20 Mar 2026",
    page:     "html/godot.html",
    image:       "",
    video:       "",
    itchUrl:     "",
    downloadUrl: "",
    githubUrl:   "",
    devlogUrl:   "",
    desc:  "Spatial audio manager with zone-based ambient layers, reverb zones, and procedural drip/echo generation.",
    tags:  ["AUDIO", "SPATIAL", "ATMOSPHERE", "GODOT"],
    specs: [
      { key: "ENGINE",   val: "Godot 4.x" },
      { key: "AUDIO",    val: "AudioStreamPlayer3D" },
      { key: "FX",       val: "Reverb + Echo" },
      { key: "ZONES",    val: "Area3D Triggers" }
    ],
    stats: [
      { key: "NODES",   val: "19" },
      { key: "SCRIPTS", val: "4" },
      { key: "FPS",     val: "60+" }
    ]
  },

  {
    id:       "cave-interior",
    title:    "Cave Interior",
    category: "RENDER",
    status:   "NEW",
    date:     "15 Mar 2026",
    page:     "html/blender.html",
    image:       "",
    video:       "",
    itchUrl:     "",
    downloadUrl: "",
    githubUrl:   "",
    devlogUrl:   "",
    desc:  "Cinematic cave interior with volumetric fog, procedural rock displacement, and dramatic HDRI lighting.",
    tags:  ["ENVIRONMENT", "CAVE", "VOLUMETRIC", "CINEMATIC"],
    specs: [
      { key: "RENDERER", val: "Cycles" },
      { key: "LIGHTING", val: "HDRI + Point" },
      { key: "SHADER",   val: "Procedural Rock" },
      { key: "POLYS",    val: "2.4M" }
    ],
    stats: [
      { key: "RESOLUTION", val: "4096px" },
      { key: "FORMAT",     val: "EXR + PNG" },
      { key: "RENDER",     val: "~45 min" }
    ]
  },

  {
    id:       "torch-prop",
    title:    "Torch Prop",
    category: "ASSET",
    status:   "LIVE",
    date:     "10 Mar 2026",
    page:     "html/blender.html",
    image:       "",
    video:       "",
    itchUrl:     "",
    downloadUrl: "",
    githubUrl:   "",
    devlogUrl:   "",
    desc:  "Game-ready torch prop at 512 triangles with baked emission, normal, and AO maps. Compatible with UE5 and Godot 4.",
    tags:  ["ASSET", "PROP", "GAME-READY", "LOW-POLY"],
    specs: [
      { key: "RENDERER", val: "EEVEE" },
      { key: "FORMAT",   val: "FBX + GLB" },
      { key: "MAPS",     val: "Diffuse + Emission + Normal" },
      { key: "ENGINES",  val: "UE5 + Godot 4" }
    ],
    stats: [
      { key: "TRIS",     val: "512" },
      { key: "TEX SIZE", val: "2K" },
      { key: "MAPS",     val: "4 Maps" }
    ]
  },

  {
    id:       "descent",
    title:    "Descent",
    category: "GAME",
    status:   "LIVE",
    date:     "01 Mar 2026",
    page:     "html/games.html",
    image:       "",
    video:       "",
    itchUrl:     "",
    downloadUrl: "",
    githubUrl:   "",
    devlogUrl:   "",
    desc:  "A short atmospheric game jam entry exploring vertical cave traversal and environment storytelling. Built in 72 hours.",
    tags:  ["JAM", "PLATFORMER", "ATMOSPHERIC", "SHORT"],
    specs: [
      { key: "ENGINE",    val: "Godot 4" },
      { key: "PLATFORM",  val: "PC + Web" },
      { key: "DURATION",  val: "~20 min" },
      { key: "BUILD",     val: "72 Hours" }
    ],
    stats: [
      { key: "PLATFORM", val: "PC + Web" },
      { key: "ENGINE",   val: "Godot 4" },
      { key: "DURATION", val: "~20 min" }
    ]
  },

  {
    id:       "the-last-light",
    title:    "The Last Light",
    category: "GAME",
    status:   "LIVE",
    date:     "20 Feb 2026",
    page:     "html/games.html",
    image:       "",
    video:       "",
    itchUrl:     "",
    downloadUrl: "",
    githubUrl:   "",
    devlogUrl:   "",
    desc:  "A puzzle game built around a single dying torch. Manage fuel, plan your route, survive the dark across 12 levels.",
    tags:  ["PUZZLE", "RESOURCE MANAGEMENT", "DARK", "ATMOSPHERIC"],
    specs: [
      { key: "ENGINE",   val: "Godot 4" },
      { key: "PLATFORM", val: "PC" },
      { key: "LEVELS",   val: "12" },
      { key: "MECHANIC", val: "Fuel Management" }
    ],
    stats: [
      { key: "PLATFORM", val: "PC" },
      { key: "ENGINE",   val: "Godot 4" },
      { key: "LEVELS",   val: "12" }
    ]
  }

];
