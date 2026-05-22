import{i as e}from"./vendor-CKz6wYoq.js";import{t}from"./wii-CfHJrYZI.js";import{i as n}from"./index-DlnccYRf.js";/* empty css               *//* empty css                 */var r=[{ico:`fa-github`,color:`#0EBEFF`,bg:`var(--wb)`,txt:`var(--tx)`,tit:`GitHub Issues`,desc:`Reporta errores o pide nuevas funciones directamente en nuestro repositorio oficial de manera transparente.`,url:`https://github.com/wtaype/CumpleWii/issues`,cta:`Abrir GitHub`},{ico:`fa-envelope`,color:`#29C72E`,bg:`var(--wb)`,txt:`var(--tx)`,tit:`Correo directo`,desc:`Escríbenos con tus comentarios, sugerencias o cualquier duda que tengas, preferentemente desde la sección de contacto.`,url:`/contacto`,cta:`Enviar correo`}],i=[{ico:`fa-bug`,color:`#FF5C69`,tit:`Reportar un error`,desc:`Algo no funciona como debería y quieres ayudarnos a corregirlo (bugs, errores visuales).`},{ico:`fa-lightbulb`,color:`#FFDA34`,tit:`Sugerir una idea`,desc:`Tienes una propuesta de mejora que haría a CumpleWii más útil o más bonito.`},{ico:`fa-star`,color:`#0EBEFF`,tit:`Dejar una opinión`,desc:`Quieres contarnos cómo ha sido tu experiencia con la app o qué es lo que más te gusta.`},{ico:`fa-spa`,color:`#7000FF`,tit:`Contenido y datos`,desc:`Algo relacionado con música, blog, privacidad, planes de usuario o datos guardados.`}],a=()=>`
<main id="wimain">
<div class="ac_wrap tm_wrap">

  <section class="ac_hero tm_hero">
    <div class="ac_hero_orb ac_orb1"></div><div class="ac_hero_orb ac_orb2"></div><div class="ac_hero_orb ac_orb3"></div>
    <div class="ac_hero_body">
      <div class="ac_hero_badge"><i class="fas fa-heart"></i> Tu opinión nos importa</div>
      <h1 class="ac_hero_tit">Centro de<br><span class="ac_grad">Feedback 💡</span></h1>
      <p class="ac_hero_sub">
        <strong>${t}</strong> crece gracias a tus ideas, tus reportes y lo que sientes al usar la app.
        Ayúdanos a construir la mejor experiencia para celebrar.
      </p>
      <div class="tm_hero_chips">
        <span class="tm_chip"><i class="fas fa-bullhorn"></i> Tu Voz Importa</span>
        <span class="tm_chip"><i class="fas fa-users"></i> App Comunitaria</span>
        <span class="tm_chip"><i class="fas fa-rocket"></i> Mejora Constante</span>
      </div>
    </div>
  </section>

  <section class="ac_sec">
    <div class="ac_sec_head">
      <div class="ac_sec_badge"><i class="fas fa-comments"></i> Canales de ayuda</div>
      <h2 class="ac_sec_tit">¿Cómo <span class="ac_grad">escribirnos?</span></h2>
      <p class="ac_sec_sub">Elige la forma más cómoda para hacer llegar tus comentarios</p>
    </div>
    <div class="fb_canales">
      ${r.map(e=>`
        <a href="${e.url}" class="${e.url.startsWith(`/`)?`nv_item`:``} fb_canal wi_fadeUp" style="--cc:${e.color}" ${e.url.startsWith(`/`)?``:`target="_blank"`}>
          <div class="fb_canal_ico" style="background:${e.bg};color:${e.txt}"><i class="fab ${e.ico}"></i> <i class="fas ${e.ico}"></i></div>
          <div class="fb_canal_info">
            <strong>${e.tit}</strong>
            <span>${e.desc}</span>
          </div>
          <div class="fb_canal_cta" style="color:${e.color}">${e.cta} <i class="fas fa-arrow-right"></i></div>
        </a>`).join(``)}
    </div>
  </section>

  <section class="ac_sec ac_sec_alt">
    <div class="ac_sec_head">
      <div class="ac_sec_badge"><i class="fas fa-layer-group"></i> Categorías</div>
      <h2 class="ac_sec_tit">¿De qué trata <span class="ac_grad">tu mensaje?</span></h2>
      <p class="ac_sec_sub">Así puedes enfocar mejor tus ideas al escribirnos</p>
    </div>
    <div class="ac_feat_grid">
      ${i.map(e=>`
        <div class="ac_feat_card wi_fadeUp" style="--sc:${e.color}">
          <div class="ac_feat_ico"><i class="fas ${e.ico}"></i></div>
          <h3>${e.tit}</h3><p>${e.desc}</p>
        </div>`).join(``)}
    </div>
  </section>

</div></main>`,o=null,s=()=>{o=new IntersectionObserver(t=>t.forEach(t=>{t.isIntersecting&&e(t.target).addClass(`visible`)}),{threshold:.1}),e(`.wi_fadeUp`).each(function(){o.observe(this)}),e(document).on(`click.feedback`,`.nv_item`,function(t){let r=e(this).attr(`href`);r&&r.startsWith(`/`)&&(t.preventDefault(),n(()=>import(`./index-DlnccYRf.js`).then(e=>e.r).then(e=>e.rutas.navigate(r)),[]))}),console.log(`💬 ${t} Feedback cargado`)},c=()=>{o?.disconnect?.(),o=null,e(document).off(`.feedback`)};export{c as cleanup,s as init,a as render};