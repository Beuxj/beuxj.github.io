

// {
//   title:  "Your Project Name",
//   type:   "GAME",           // GAME | RENDER | DEMO | ASSET | UPDATE
//   status: "NEW",            // NEW | LIVE | IN DEV | UPDATED
//   date:   "10 Apr 2026",
//   image:  "assets/your-image.jpg",
//   link:   "html/games.html",
//   desc:   "One or two sentences describing the project.",
//   specs: [
//     { key: "ENGINE",   val: "Godot 4.x" },
//     { key: "TYPE",     val: "First Person" },
//     { key: "STATUS",   val: "Early Access" },
//     { key: "PLATFORM", val: "PC / Web" }
//   ]
// },

const BEUXJ_RECENTS = [

//- this is the example data .. need to change when i upload a file ^^^^
  {
    title:  "Cave Escape",
    type:   "GAME",
    status: "IN DEV",
    date:   "08 Apr 2026",
    image:  "assets/gm-featured.jpg",
    link:   "html/games.html",
    desc:   "A realistic first-person survival game set deep underground. Trapped, no memory, limited light — navigate, solve, escape.",
    specs: [
      { key: "ENGINE",   val: "Unreal Engine 5.4" },
      { key: "LIGHTING", val: "Lumen RT / SSG" },
      { key: "GEOMETRY", val: "Nanite Virtualized" },
      { key: "WORKFLOW", val: "Procedural PCG" }
    ]
  },

  {
    title:  "Crystal Chamber",
    type:   "RENDER",
    status: "NEW",
    date:   "02 Apr 2026",
    image:  "assets/bl-06.jpg",
    link:   "html/blender.html",
    desc:   "Cycles render featuring a fully procedural crystal shader with real-time light caustics and volumetric depth.",
    specs: [
      { key: "ENGINE",   val: "Blender 4.x / Cycles" },
      { key: "LIGHTING", val: "HDRI + Caustics" },
      { key: "SHADER",   val: "Procedural PBR" },
      { key: "OUTPUT",   val: "4096px / EXR" }
    ]
  },

  {
    title:  "Enemy Sight AI",
    type:   "DEMO",
    status: "IN DEV",
    date:   "28 Mar 2026",
    image:  "assets/gd-06.jpg",
    link:   "html/godot.html",
    desc:   "Raycasted cone-of-sight system with patrol, alert, and chase states. Noise-reactive behaviour for cave environments.",
    specs: [
      { key: "ENGINE",   val: "Godot 4.x" },
      { key: "LANGUAGE", val: "GDScript" },
      { key: "SYSTEM",   val: "State Machine" },
      { key: "PERF",     val: "60+ FPS" }
    ]
  }

];
