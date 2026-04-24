/* =============================================
   GODOT PAGE — scrolling terminal background
   Cards are built by script.js from data.js
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {
  const termBg = document.getElementById('gdTerminal');
  if (!termBg) return;

  const lines = [
    'func _ready(): setup_scene()',
    'var player = $Player/CharacterBody3D',
    'emit_signal("cave_entered", zone_id)',
    'PhysicsServer3D.body_apply_force()',
    'if light_radius > awareness_threshold:',
    '    enemy.set_state(ALERT)',
    'NavigationServer3D.map_get_path()',
    'AudioServer.set_bus_effect_enabled()',
    'var noise = FastNoiseLite.new()',
    'noise.seed = randi()',
    'func generate_cave(width, height):',
    '    for x in range(width):',
    '        for y in range(height):',
    '            map[x][y] = _cellular(x,y)',
    'shader_type spatial;',
    'uniform float flicker_speed = 2.0;',
    'void fragment() { ALBEDO = texture(albedo_tex, UV).rgb; }',
    '$AnimationPlayer.play("torch_flicker")',
    'RigidBody3D.apply_central_impulse()',
    'Input.get_action_strength("ui_up")',
  ];

  const doubled = [...lines, ...lines];
  const wrap = document.createElement('div');
  wrap.className = 'gd-terminal-wrap';
  wrap.innerHTML = doubled.map(l => `<div class="gd-term-line">${l}</div>`).join('');
  termBg.appendChild(wrap);
});
