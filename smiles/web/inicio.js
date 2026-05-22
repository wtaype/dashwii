import $ from 'jquery';
import { app, version, by, linkme } from '../wii.js';
import { wiVista, year, wiTip, Saludar } from '../widev.js';

// ── DATA ──────────────────────────────────────────────────────
const roles = [
  'Recordatorios Inteligentes ⏰',
  'Organizador de Eventos 🎉',
  'Lista de Invitados 👥',
  'Ideas de Regalos Perfectas 🎁',
  'Tarjetas de Invitación con QR ✉️'
];

const stats = [
  { valor:100,  label: 'Recordatorios Exitosos', sufijo: '%' },
  { valor:0,    label: 'Cumpleaños Olvidados',   sufijo: '' },
  { valor:10,   label: 'Más Fácil y Rápido',     sufijo: 'x' }
];

const features = [
  { id:'recordatorios', icon:'fa-bell', color:'#FF5C69', nombre:'Avisos Inteligentes', desc:'Nunca más olvides un cumpleaños especial',
    items:[{icon:'fa-whatsapp',name:'WhatsApp Directo',desc:'Envía saludos predefinidos o personalizados en un clic'},{icon:'fa-envelope',name:'Alertas al Email',desc:'Recibe notificaciones en tu correo con días de anticipación'},{icon:'fa-clock',name:'Planificación de Alertas',desc:'Configura avisos a la hora exacta que prefieras'}]},
  { id:'eventos', icon:'fa-gift', color:'#29C72E', nombre:'Gestor de Eventos', desc:'Planifica fiestas inolvidables fácilmente',
    items:[{icon:'fa-list-check',name:'Lista de Tareas',desc:'Asigna responsables y organiza la compra de decoración'},{icon:'fa-money-bill-wave',name:'Control de Presupuesto',desc:'Lleva la cuenta de gastos de pastel, bebidas y regalos'},{icon:'fa-users',name:'Lista de Invitados',desc:'Gestiona confirmaciones de asistencia en tiempo real'}]},
  { id:'regalos', icon:'fa-wand-magic-sparkles', color:'#FFDA34', nombre:'Sugerencias de Regalo', desc:'Encuentra el detalle perfecto para cada quien',
    items:[{icon:'fa-heart',name:'Lista de Deseos',desc:'Guarda gustos, tallas y marcas favoritas de tus amigos'},{icon:'fa-basket-shopping',name:'Tiendas Recomendadas',desc:'Acceso rápido a ideas de regalo ordenadas por categorías'},{icon:'fa-note-sticky',name:'Notas Rápidas',desc:'Anota ideas que surjan en conversaciones casuales'}]},
  { id:'invitaciones', icon:'fa-paper-plane', color:'#7000FF', nombre:'Invitaciones con QR', desc:'Crea pases interactivos para tus fiestas',
    items:[{icon:'fa-qrcode',name:'Acceso con Código QR',desc:'Tus invitados solo escanean para ver la ubicación de la fiesta'},{icon:'fa-map-location-dot',name:'Ubicación GPS Integrada',desc:'Vincula mapas de Google Maps o Waze en la invitación'},{icon:'fa-mobile-screen',name:'Diseño 100% Móvil',desc:'Invitaciones responsivas que lucen hermosas en WhatsApp'}]},
  { id:'calendario', icon:'fa-calendar-days', color:'#0EBEFF', nombre:'Calendario Visual', desc:'Organiza tus celebraciones anuales',
    items:[{icon:'fa-eye',name:'Vista de un Vistazo',desc:'Todos los cumpleaños ordenados cronológicamente por meses'},{icon:'fa-circle-chevron-right',name:'Días Restantes',desc:'Visualiza cuántos días faltan para la próxima gran fiesta'},{icon:'fa-user-plus',name:'Importación Sencilla',desc:'Añade contactos rápidamente sin formularios tediosos'}]},
  { id:'estadisticas', icon:'fa-chart-pie', color:'#FF8F00', nombre:'Datos de Celebración', desc:'Métricas divertidas sobre tus festejos',
    items:[{icon:'fa-champagne-glasses',name:'Fiestas Organizadas',desc:'Muestra el conteo de eventos exitosos del año'},{icon:'fa-cake-candles',name:'Pasteles Compartidos',desc:'Reportes interactivos y curiosidades de tus amigos'},{icon:'fa-heart',name:'Amigo del Año',desc:'Estadísticas sobre quién ha recibido las mejores fiestas'}]},
];

const beneficios = [
  { icon:'fa-face-smile-beam', titulo:'100% Fácil y Divertido', desc:'Diseñado para arrancar sonrisas. Registra fechas, crea invitaciones y planifica celebraciones de la forma más amigable posible.' },
  { icon:'fa-lock', titulo:'Privacidad Garantizada', desc:'Tus datos y los de tus seres queridos están completamente seguros, encriptados y bajo tu absoluto control en todo momento.' },
  { icon:'fa-champagne-glasses', titulo:'Totalmente Gratis', desc:'Sin cargos ocultos ni suscripciones obligatorias. Creemos que celebrar la vida con quienes amas debe ser libre y accesible para todos.' },
];

// ── PLANTILLAS ────────────────────────────────────────────────
const tplStat = s => `
  <div class="ini_stat">
    <div class="ini_stat_n" data-target="${s.valor}" data-sufijo="${s.sufijo}">0</div>
    <div class="ini_stat_l">${s.label}</div>
  </div>`;

const tplFeature = f => `
  <div class="ini_cat_card" style="--cc:${f.color}">
    <div class="ini_cat_bar"></div>
    <div class="ini_cat_top">
      <div class="ini_cat_ico"><i class="fas ${f.icon}"></i></div>
      <div class="ini_cat_info"><h3>${f.nombre}</h3><p>${f.desc}</p></div>
    </div>
    <ul class="ini_cat_tools">
      ${f.items.map(it=>`
        <li><div class="ini_tool_a">
          <i class="fas ${it.icon}"></i>
          <div><strong>${it.name}</strong><span>${it.desc}</span></div>
          <i class="fas fa-check ini_ext" style="color:var(--success)"></i>
        </div></li>`).join('')}
    </ul>
  </div>`;

const tplBeneficio = (b,i) => `
  <div class="ini_about_card" style="--d:${i*.15}s">
    <div class="ini_card_ico"><i class="fas ${b.icon}"></i></div>
    <h3>${b.titulo}</h3>
    <p>${b.desc}</p>
  </div>`;

// Variable para el control del intervalo del conteo regresivo
let timerInterval;

// ── RENDER ────────────────────────────────────────────────────
export const render = () => `
<div class="ini_wrap">

  <!-- ===== HERO ===== -->
  <section class="ini_hero">
    <div class="ini_hero_content">

      <div class="ini_saludo" style="--d:0s">
        <span>${Saludar()}</span><span class="ini_wave">👋</span>
      </div>

      <h1 class="ini_titulo" style="--d:.18s">
        Gestiona Cumpleaños Feliz con <span class="ini_grad">${app}</span>
      </h1>

      <div class="ini_roles" style="--d:.36s">
        ${roles.map((r,i)=>`<span class="ini_role${i===0?' active':''}">${r}</span>`).join('')}
      </div>

      <p class="ini_sub" style="--d:.54s">
        Organiza celebraciones, recuerda fechas especiales y planifica momentos inolvidables con tus amigos y familiares de la manera más sencilla y amigable del mundo.
      </p>

      <div class="ini_stats" id="in_stats" style="--d:.72s">
        ${stats.map(tplStat).join('')}
      </div>

      <div class="ini_btns" style="--d:.9s">
        <a href="/login" class="ini_btn_p"><i class="fas fa-arrow-right-to-bracket"></i> Empezar Gratis</a>
      </div>

    </div>

    <!-- Derecha: simulador de tarjeta de cumpleaños interactiva -->
    <div class="ini_hero_visual">
      <div class="ini_nw_preview" style="--d:.3s; padding: 2.5vh; max-width: 330px; height: auto;">
        <div class="ini_nw_head" style="height: auto; padding: 1vh 0; display: flex; justify-content: space-between; border-bottom: 2px solid var(--brd); background: transparent;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <i class="fas fa-cake-candles" style="color: var(--mco); font-size: 1.4rem;"></i>
            <span style="font-weight: 800; font-size: 0.95rem; color: var(--tx);">${app}</span>
          </div>
          <div style="font-size: 0.65rem; font-weight: 700; background: var(--bg5); color: var(--mco); padding: 2px 6px; border-radius: 20px;">
            ${version}
          </div>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 2vh; padding: 2.5vh 0 1vh;">
          <div class="txc">
            <span style="font-size: 0.7rem; font-weight: 600; color: var(--tx3); text-transform: uppercase; letter-spacing: 0.5px;">Próximo Cumpleaños</span>
            <h3 id="widget_nombre" style="font-size: 1.2rem; font-weight: 800; color: var(--mco); margin-top: 0.5vh;">🎂 ¡Wilder Taype! 🥳</h3>
          </div>
          
          <!-- Cuenta regresiva interactiva -->
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; text-align: center;">
            <div style="background: var(--bg1); padding: 6px; border-radius: 8px; border: 1px solid var(--brd);">
              <div id="wd_dias" style="font-size: 1.1rem; font-weight: 800; color: var(--tx);">0</div>
              <div style="font-size: 0.55rem; color: var(--tx3); font-weight: 600;">DÍAS</div>
            </div>
            <div style="background: var(--bg1); padding: 6px; border-radius: 8px; border: 1px solid var(--brd);">
              <div id="wd_horas" style="font-size: 1.1rem; font-weight: 800; color: var(--tx);">0</div>
              <div style="font-size: 0.55rem; color: var(--tx3); font-weight: 600;">HORAS</div>
            </div>
            <div style="background: var(--bg1); padding: 6px; border-radius: 8px; border: 1px solid var(--brd);">
              <div id="wd_mins" style="font-size: 1.1rem; font-weight: 800; color: var(--tx);">0</div>
              <div style="font-size: 0.55rem; color: var(--tx3); font-weight: 600;">MINS</div>
            </div>
            <div style="background: var(--bg1); padding: 6px; border-radius: 8px; border: 1px solid var(--brd);">
              <div id="wd_segs" style="font-size: 1.1rem; font-weight: 800; color: var(--tx);">0</div>
              <div style="font-size: 0.55rem; color: var(--tx3); font-weight: 600;">SEGS</div>
            </div>
          </div>
          
          <!-- Inputs interactivos del widget de portada -->
          <div style="border-top: 1px solid var(--brd); padding-top: 2vh; display: flex; flex-direction: column; gap: 1vh;">
            <div style="display: flex; flex-direction: column; gap: 0.4vh;">
              <label style="font-size: 0.7rem; font-weight: 700; color: var(--tx2); text-align: left;">Prueba el planificador:</label>
              <input type="text" id="widget_input_nombre" value="Wilder Taype" placeholder="Nombre del cumpleañero" style="font-size: 0.8rem; padding: 0.8vh 1.2vh; border-radius: 6px; border: 1px solid var(--brd); background: var(--inp); color: var(--tx);" />
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.4vh;">
              <label style="font-size: 0.7rem; font-weight: 700; color: var(--tx2); text-align: left;">Fecha especial:</label>
              <input type="date" id="widget_input_fecha" style="font-size: 0.8rem; padding: 0.8vh 1.2vh; border-radius: 6px; border: 1px solid var(--brd); background: var(--inp); color: var(--tx);" />
            </div>
          </div>
        </div>
      </div>
      <div class="ini_ftech ini_ft1" style="--d:.5s"  ${wiTip('Pastel')}><i class="fas fa-cake-candles"></i></div>
      <div class="ini_ftech ini_ft2" style="--d:.65s" ${wiTip('Regalos')}><i class="fas fa-gift"></i></div>
      <div class="ini_ftech ini_ft3" style="--d:.8s"  ${wiTip('Celebrar')}><i class="fas fa-champagne-glasses"></i></div>
      <div class="ini_ftech ini_ft4" style="--d:.95s" ${wiTip('Amigos')}><i class="fas fa-face-smile-beam"></i></div>
    </div>
  </section>

  <!-- ===== FUNCIONALIDADES ===== -->
  <section class="ini_cats_sec">
    <div class="ini_sec_head">
      <h2 class="ini_sec_tit">Los <span class="ini_grad">6 Pilares</span> de ${app}</h2>
      <div class="ini_sec_line"></div>
      <p class="ini_sec_desc">Todo lo necesario para celebrar la vida en grande y sin complicaciones</p>
    </div>
    <div class="ini_cats_grid">${features.map(tplFeature).join('')}</div>
  </section>

  <!-- ===== ¿POR QUÉ? ===== -->
  <section class="ini_about_sec">
    <div class="ini_sec_head">
      <h2 class="ini_sec_tit">¿Qué beneficios tienes al usar <span class="ini_grad">${app}?</span></h2>
      <div class="ini_sec_line"></div>
    </div>
    <div class="ini_about_grid">${beneficios.map(tplBeneficio).join('')}</div>
  </section>

  <!-- ===== CTA ===== -->
  <section class="ini_cta_sec">
    <div class="ini_cta_wrap">
      <i class="fas fa-cake-candles ini_cta_ico"></i>
      <h2>Comienza a organizar cumpleaños inolvidables hoy</h2>
      <p>Regístrate en segundos y descubre lo fácil que es hacer felices a tus seres queridos.</p>
      <div class="ini_cta_chips">
        <a href="/login" class="ini_btn_p"><i class="fas fa-arrow-right-to-bracket"></i> Registrarme Gratis</a>
      </div>
    </div>
  </section>

</div>`;

// ── INIT ──────────────────────────────────────────────────────
export const init = () => {

  // Roles rotantes
  let ri = 0;
  const $r = $('.ini_role');
  const roleInterval = setInterval(() => { 
    $r.removeClass('active'); 
    $r.eq(ri = (ri+1) % $r.length).addClass('active'); 
  }, 2800);

  // Stats contador — al entrar en viewport
  wiVista('#in_stats', () => {
    $('.ini_stat_n').each(function() {
      const $n = $(this), obj = +$n.data('target'), suf = $n.data('sufijo') || '';
      let v = 0;
      const t = setInterval(() => {
        v += obj / 50;
        if (v >= obj) { $n.text(obj + suf); clearInterval(t); }
        else $n.text(Math.floor(v));
      }, 28);
    });
  });

  // Scroll animations
  wiVista('.ini_cat_card',   null, { anim:'wi_fadeUp', stagger:80  });
  wiVista('.ini_about_card', null, { anim:'wi_fadeUp', stagger:140 });

  // --- WIDGET PLANNER INTERACTIVO ---
  // Establecer fecha futura por defecto (5 días después de hoy)
  const hoy = new Date();
  const fut = new Date(hoy.getTime() + 5 * 24 * 60 * 60 * 1000);
  const yyyy = fut.getFullYear();
  const mm = String(fut.getMonth() + 1).padStart(2, '0');
  const dd = String(fut.getDate()).padStart(2, '0');
  const defaultDate = `${yyyy}-${mm}-${dd}`;
  $('#widget_input_fecha').val(defaultDate);

  // Función para calcular y renderizar el conteo regresivo
  const actualizarRegresivo = () => {
    const targetStr = $('#widget_input_fecha').val();
    if (!targetStr) return;
    
    // Crear la fecha con el string y forzar hora 00:00:00 local
    const parts = targetStr.split('-');
    const targetDate = new Date(parts[0], parts[1] - 1, parts[2]);
    const ahora = new Date();
    
    // Si la fecha seleccionada ya pasó, sumamos 1 año para mantener el conteo futuro
    if (targetDate < ahora) {
      targetDate.setFullYear(ahora.getFullYear() + (targetDate.getMonth() < ahora.getMonth() || (targetDate.getMonth() === ahora.getMonth() && targetDate.getDate() < ahora.getDate()) ? 1 : 0));
    }
    
    const dif = targetDate.getTime() - ahora.getTime();
    if (dif <= 0) {
      $('#wd_dias').text(0);
      $('#wd_horas').text(0);
      $('#wd_mins').text(0);
      $('#wd_segs').text(0);
      return;
    }
    
    const d = Math.floor(dif / (1000 * 60 * 60 * 24));
    const h = Math.floor((dif % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((dif % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((dif % (1000 * 60)) / 1000);
    
    $('#wd_dias').text(d);
    $('#wd_horas').text(h);
    $('#wd_mins').text(m);
    $('#wd_segs').text(s);
  };

  // Escuchar inputs y actualizar en tiempo real
  $('#widget_input_nombre').on('input', function() {
    const val = $(this).val().trim() || 'Alguien especial';
    $('#widget_nombre').html(`🎂 ¡${val}! 🥳`);
  });

  $('#widget_input_fecha').on('change', () => {
    actualizarRegresivo();
  });

  // Inicializar conteo
  actualizarRegresivo();
  timerInterval = setInterval(actualizarRegresivo, 1000);

  // Agregar los intervalos y timers activos en un array de control del módulo
  window._inicio_timers = [roleInterval, timerInterval];

  console.log(`🚀 ${app} ${version} · Inicio CumpleWii OK`);
};

export const cleanup = () => {
  if (window._inicio_timers) {
    window._inicio_timers.forEach(t => clearInterval(t));
  }
  clearInterval(timerInterval);
};