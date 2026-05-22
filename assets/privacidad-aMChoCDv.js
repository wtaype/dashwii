import{n as e}from"./vendor-BuoCFfzO.js";import{t}from"./wii-CfHJrYZI.js";import{O as n}from"./widev-j_LPqVJz.js";import{i as r}from"./index-DfUZS8On.js";/* empty css               *//* empty css                 */var i=[{ico:`fa-info`,color:`#0EBEFF`,num:`01`,tit:`Información que recopilamos`,body:`<p>Pedimos lo necesario para la app: cuenta, perfil, plan, cumpleaños guardados, notas, favoritos, feedback y token de notificaciones si lo autorizas.</p>`},{ico:`fa-chart-line`,color:`#29C72E`,num:`02`,tit:`Cómo usamos tu información`,body:`<p>La usamos para autenticarte, sincronizar tus datos, calcular avisos, aplicar límites por plan y mejorar estabilidad.</p>`},{ico:`fa-globe`,color:`#FF5C69`,num:`03`,tit:`Publicidad y servicios externos`,body:`<p>Usamos Firebase y servicios de Google para autenticación, Firestore, Cloud Messaging y análisis técnico cuando corresponda.</p>`},{ico:`fa-users`,color:`#7000FF`,num:`04`,tit:`Compartir información con terceros`,body:`<p>No vendemos ni alquilamos tus datos. Solo compartimos información con proveedores necesarios para operar CumpleWii.</p>`},{ico:`fa-lock`,color:`#FFDA34`,num:`05`,tit:`Tus derechos`,body:`<p>Puedes pedir acceso, corrección o eliminación de tu información escribiendo al equipo. Queremos que tengas control real sobre tus datos.</p>`},{ico:`fa-user-shield`,color:`#0EBEFF`,num:`06`,tit:`Seguridad`,body:`<p>Usamos conexiones cifradas y proveedores con estándares modernos de seguridad para cuidar tus sesiones y datos sincronizados.</p>`}],a=()=>`
<main id="wimain">
<div class="ac_wrap tm_wrap">

  <!-- ══ HERO ══ -->
  <section class="ac_hero tm_hero">
    <div class="ac_hero_orb ac_orb1"></div>
    <div class="ac_hero_orb ac_orb2"></div>
    <div class="ac_hero_orb ac_orb3"></div>
    <div class="ac_hero_body">
      <div class="ac_hero_badge"><i class="fas fa-shield-halved"></i> Datos Claros, Uso Responsable</div>
      <h1 class="ac_hero_tit">Política de<br><span class="ac_grad">Privacidad</span></h1>
      <p class="ac_hero_sub">
        <strong>${t}</strong> guarda solo lo necesario para iniciar sesión, sincronizar tus cumpleaños, activar recordatorios y mejorar la experiencia.
      </p>
      <div class="tm_hero_chips">
        <span class="tm_chip"><i class="fas fa-ban"></i> 0 Venta de Datos</span>
        <span class="tm_chip"><i class="fas fa-lock"></i> 100% Cifrado</span>
        <span class="tm_chip"><i class="fas fa-bell"></i> Avisos Locales</span>
      </div>
      <div class="tm_last_upd">
        <i class="fas fa-calendar-check"></i>
        Última actualización: ${n()} · Versión v10
      </div>
    </div>
  </section>

  <!-- ══ ÍNDICE RÁPIDO ══ -->
  <div class="tm_index_band">
    ${i.map((e,t)=>`
      <a href="#tm_sec_${t}" class="tm_index_item">
        <i class="fas ${e.ico}" style="color:${e.color}"></i>
        <span>${e.tit}</span>
      </a>`).join(``)}
  </div>

  <!-- ══ SECCIONES ══ -->
  <section class="ac_sec tm_secciones">
    <div class="ac_sec_head">
      <div class="ac_sec_badge"><i class="fas fa-shield-halved"></i> Protección</div>
      <h2 class="ac_sec_tit">Nuestros Compromisos de <span class="ac_grad">Privacidad</span></h2>
      <p class="ac_sec_sub">Tus fechas y notas se guardan con transparencia y control absoluto.</p>
    </div>
    <div class="tm_secs_grid">
      ${i.map((e,t)=>`
        <div class="tm_sec_card wi_fadeUp" id="tm_sec_${t}">
          <div class="tm_sec_header">
            <div class="tm_sec_ico" style="--tc:${e.color}"><i class="fas ${e.ico}"></i></div>
            <div>
              <span class="tm_sec_num" style="color:${e.color}">${e.num}</span>
              <h2 class="tm_sec_tit">${e.tit}</h2>
            </div>
          </div>
          <div class="tm_sec_body">${e.body}</div>
        </div>`).join(``)}
    </div>
  </section>

</div></main>
`,o=null,s=()=>{o=new IntersectionObserver(t=>t.forEach(t=>{t.isIntersecting&&e(t.target).addClass(`visible`)}),{threshold:.1}),e(`.wi_fadeUp`).each(function(){o.observe(this)}),e(document).on(`click.privacidad`,`.tm_nav`,function(t){t.preventDefault(),r(()=>import(`./index-DfUZS8On.js`).then(e=>e.r).then(t=>t.rutas.navigate(e(this).attr(`href`))),[])}),e(document).on(`click.privacidad`,`.tm_index_item`,function(t){t.preventDefault();let n=document.querySelector(e(this).attr(`href`));n&&window.scrollTo({top:n.getBoundingClientRect().top+scrollY-90,behavior:`smooth`})}),console.log(`🔒 ${t} Privacidad cargada`),window.__WIREADY__=!0},c=()=>{o?.disconnect?.(),o=null,e(document).off(`.privacidad`)};export{c as cleanup,s as init,a as render};