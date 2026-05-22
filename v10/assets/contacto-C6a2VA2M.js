import{i as e}from"./vendor-CKz6wYoq.js";import{t}from"./wii-CfHJrYZI.js";import{E as n,S as r,T as i,i as a,x as o}from"./widev-C5MihLHB.js";import{i as s}from"./index-DlnccYRf.js";/* empty css               */var c={pub:void 0,sid:void 0,tid:void 0};o({js:[()=>s(()=>import(`https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js`),[])]});var l=[{ico:`fa-envelope`,color:`#0EBEFF`,label:`Email Soporte`,value:`wilder.taype@hotmail.com`,copiable:!0},{ico:`fa-users`,color:`#FF5C69`,label:`Comunidad`,value:`Soporte Comunitario GitHub`,copiable:!1},{ico:`fa-clock`,color:`#29C72E`,label:`Atención Técnica`,value:`Lunes a Viernes (Respuesta en 24h)`,copiable:!1}],u=[`Preguntar sobre planes (Free, Pro, Vip)`,`Reportar problema con inicio de sesión o cuenta`,`Sugerir una canción para la app`,`Sugerir una idea de regalo o artículo para el blog`,`Soporte general con CumpleWii`,`Otro motivo de contacto`],d=[{q:`¿Respondemos todos los mensajes?`,r:`Sí. Cada mensaje que recibimos se lee y responde de forma personal por el equipo.`},{q:`¿CumpleWii sigue siendo gratis?`,r:`Sí. El plan base de CumpleWii es y será gratuito, buscamos mantener la app accesible para todos.`},{q:`¿Tus mensajes son confidenciales?`,r:`Absolutamente. Solo los revisa el equipo de soporte de CumpleWii y no se comparten con terceros bajo ninguna circunstancia.`},{q:`¿El formulario interno vendrá después?`,r:`Por ahora preferimos usar correo directo y GitHub Issues para mantener la seguridad, simplicidad y rapidez en las respuestas.`}],f=500,p=`wi_ct_last`,m=60*1e3,h=()=>{let e=parseInt(localStorage.getItem(p)||`0`,10);return Date.now()-e>m},g=()=>localStorage.setItem(p,String(Date.now())),_=[],v=()=>`
<main id="wimain">
<div class="ac_wrap ct_wrap">

  <!-- ══ HERO ══ -->
  <section class="ac_hero ct_hero">
    <div class="ac_hero_orb ac_orb1"></div>
    <div class="ac_hero_orb ac_orb2"></div>
    <div class="ac_hero_orb ac_orb3"></div>
    <div class="ac_hero_body">
      <div class="ac_hero_badge"><i class="fas fa-headset"></i> Estamos para ti</div>
      <h1 class="ac_hero_tit">Soporte y<br><span class="ac_grad">Contacto 💌</span></h1>
      <p class="ac_hero_sub">
        Si tienes una duda, una sugerencia o solo quieres saludar, 
        <strong>aquí tienes los caminos más directos hacia nosotros.</strong>
      </p>
      <div class="tm_hero_chips">
        <span class="tm_chip"><i class="fas fa-clock"></i> Respuesta rápida</span>
        <span class="tm_chip"><i class="fas fa-shield-halved"></i> 100% Seguro</span>
        <span class="tm_chip"><i class="fas fa-heart"></i> Atención Personal</span>
      </div>
    </div>
  </section>

  <!-- ══ GRID: FORM + INFO ══ -->
  <section class="ac_sec ct_sec">
    <div class="ct_grid">

      <!-- Formulario -->
      <div class="ct_form_wrap">
        <div class="ac_sec_head" style="text-align:left;margin-bottom:4vh">
          <div class="ac_sec_badge"><i class="fas fa-comment-dots"></i> Escríbenos</div>
          <h2 class="ac_sec_tit">Enviar <span class="ac_grad">un mensaje</span></h2>
        </div>
        <form id="ctForm" class="ct_form" novalidate autocomplete="off">
          <!-- Honeypot anti-bot (invisible) -->
          <input type="text" name="ct_honey" id="ct_honey" tabindex="-1" aria-hidden="true" style="position:absolute;left:-9999px;opacity:0">

          <div class="ct_field">
            <label for="ct_nombre"><i class="fas fa-user"></i> Tu Nombre</label>
            <input type="text" id="ct_nombre" name="from_name" placeholder="Ingresa tu nombre o alias" required maxlength="80">
          </div>
          <div class="ct_field">
            <label for="ct_email"><i class="fas fa-envelope"></i> Correo Electrónico</label>
            <input type="email" id="ct_email" name="email" placeholder="ejemplo@correo.com" required maxlength="120">
          </div>
          <div class="ct_field">
            <label for="ct_asunto"><i class="fas fa-tag"></i> Motivo</label>
            <select id="ct_asunto" name="asunto" required>
              <option value="">Selecciona un motivo</option>
              ${u.map(e=>`<option value="${e}">${e}</option>`).join(``)}
            </select>
          </div>
          <div class="ct_field">
            <label for="ct_mensaje"><i class="fas fa-comment-dots"></i> Detalles de tu mensaje</label>
            <textarea id="ct_mensaje" name="message" rows="6" placeholder="Escribe aquí tu duda, sugerencia o comentario..." required maxlength="${f}"></textarea>
            <div class="ct_chars"><span id="ct_count">0</span> / ${f}</div>
          </div>

          <div class="ct_actions">
            <button type="submit" class="ac_btn_p ct_btn_submit" id="ct_submit">
              <i class="fas fa-paper-plane"></i> <span>Enviar Mensaje</span>
            </button>
            <button type="reset" class="ac_btn_s">
              <i class="fas fa-redo"></i> <span>Limpiar</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Info -->
      <div class="ct_info_wrap">
        <div class="ct_info_card wi_fadeUp">
          <h3><i class="fas fa-address-card"></i> Contacto Directo</h3>
          <div class="ct_info_items">
            ${l.map(e=>`
              <div class="ct_info_item">
                <div class="ct_info_ico" style="background:color-mix(in srgb,${e.color} 15%,transparent);color:${e.color}">
                  <i class="fas ${e.ico}"></i>
                </div>
                <div class="ct_info_data">
                  <span class="ct_info_label">${e.label}</span>
                  <span class="ct_info_value">${e.value}</span>
                </div>
                ${e.copiable?`<button class="ct_copy" data-copy="${e.value}" title="Copiar"><i class="fas fa-copy"></i></button>`:``}
              </div>`).join(``)}
          </div>
        </div>

        <a href="https://github.com/wtaype/CumpleWii/issues" target="_blank" class="ct_info_card wi_fadeUp" style="margin-top:3vh; text-decoration:none; display:block; border-color:var(--mco);">
          <h3><i class="fab fa-github"></i> GitHub Issues</h3>
          <div style="font-size:0.8rem; line-height:1.6; padding:12px; color:var(--tx2);">
            Si prefieres un seguimiento técnico, puedes reportar errores o pedir nuevas funciones directamente en nuestro repositorio oficial de GitHub.
          </div>
        </a>
      </div>

    </div>
  </section>

  <!-- ══ FAQ ══ -->
  <section class="ac_sec ac_sec_alt">
    <div class="ac_sec_head">
      <div class="ac_sec_badge"><i class="fas fa-circle-question"></i> Respuestas Rápidas</div>
      <h2 class="ac_sec_tit">Preguntas <span class="ac_grad">Frecuentes</span></h2>
    </div>
    <div class="ct_faq">
      ${d.map((e,t)=>`
        <div class="ct_faq_item wi_fadeUp" id="faq_${t}">
          <div class="ct_faq_q">
            <i class="fas fa-circle-question"></i>
            <h3>${e.q}</h3>
            <i class="fas fa-chevron-down ct_faq_arr"></i>
          </div>
          <div class="ct_faq_a"><p>${e.r}</p></div>
        </div>`).join(``)}
    </div>
  </section>

</div></main>`,y=()=>{e(document).on(`input.contacto`,`#ct_mensaje`,function(){let t=e(this).val();t.length>f&&e(this).val(t.slice(0,f)),e(`#ct_count`).text(Math.min(t.length,f))}),e(document).on(`reset.contacto`,`#ctForm`,()=>{setTimeout(()=>e(`#ct_count`).text(`0`),10)}),e(document).on(`submit.contacto`,`#ctForm`,async function(n){if(n.preventDefault(),e(`#ct_honey`).val())return;if(!h()){a(`Espera un momento antes de enviar otro mensaje.`,`warning`);return}let i=e(`#ct_nombre`).val().trim(),o=e(`#ct_email`).val().trim(),s=e(`#ct_asunto`).val(),l=e(`#ct_mensaje`).val().trim();if(i.length<3)return a(`El nombre debe tener al menos 3 caracteres.`,`error`);if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o))return a(`Ingresa un email válido.`,`error`);if(!s)return a(`Selecciona una incidencia.`,`error`);if(l.length<10)return a(`El mensaje debe tener al menos 10 caracteres.`,`error`);let u=e(`#ct_submit`);r(u,!0,`Enviando…`);try{window.emailjs===void 0&&await new Promise((e,t)=>{let n=document.createElement(`script`);n.src=`https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js`,n.onload=e,n.onerror=()=>t(Error(`No se pudo cargar EmailJS`)),document.head.appendChild(n)}),window.emailjs.init(c.pub),await window.emailjs.send(c.sid,c.tid,{nombre:i,email:o,telefono:`N/A`,asunto:s,mensaje:l,app_name:t}),g(),a(`¡Mensaje enviado al equipo de CumpleWii! Te responderemos pronto. 💌`,`success`,4500),this.reset(),e(`#ct_count`).text(`0`)}catch(e){console.error(`[contacto] EmailJS error:`,e),a(`No se pudo enviar el mensaje. Revisa tu conexión o intenta más tarde.`,`error`)}finally{r(u,!1,`Enviar Mensaje`)}}),e(document).on(`click.contacto`,`.ct_copy`,function(){n(e(this).data(`copy`),this,`¡Copiado!`)}),e(document).on(`click.contacto`,`.ct_faq_q`,function(){let t=e(this).closest(`.ct_faq_item`),n=t.hasClass(`active`);e(`.ct_faq_item`).removeClass(`active`).find(`.ct_faq_a`).slideUp(280),e(`.ct_faq_arr`).removeClass(`rotated`),n||(t.addClass(`active`).find(`.ct_faq_a`).slideDown(280),t.find(`.ct_faq_arr`).addClass(`rotated`))}),_.push(i(`.wi_fadeUp`,t=>e(t).addClass(`visible`))),_.push(i(`.ct_faq_item`,(t,n)=>setTimeout(()=>e(t).addClass(`visible`),n*80))),console.log(`📩 ${t} Contacto cargado`),window.__WIREADY__=!0},b=()=>{e(document).off(`.contacto`),_.forEach(e=>e?.disconnect?.()),_=[]};export{b as cleanup,y as init,v as render};