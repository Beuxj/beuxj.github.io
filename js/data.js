

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
    title:  "Knight Metroidvania Demo",
    type:   "DEMO",
    status: "PUBLISHED",
    date:   "08 Apr 2026",
    image:  "assets/thumbnails/Screenshot 2026-04-09 093857.png",
    link:   "html/godot.html",
    desc:   "A demo for a metroidvania style game with a knight protagonist. Features a small level with platforming elements.",
    specs: [
      { key: "ENGINE",   val: "Godot Engine 4.4" },
      { key: "LANGUAGE", val: "GDScript" },
      { key: "RENDERER", val: "Forward+" },
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
