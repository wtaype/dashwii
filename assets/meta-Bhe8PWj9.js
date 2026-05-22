import{i as e,n as t,t as n}from"./vendor-CKz6wYoq.js";n.register(...t);var r=null,i=2500,a=[`Enero`,`Febrero`,`Marzo`,`Abril`,`Mayo`,`Junio`,`Julio`,`Agosto`,`Septiembre`,`Octubre`,`Noviembre`,`Diciembre`],o=new Date,s=`${o.getFullYear()}-${String(o.getMonth()+1).padStart(2,`0`)}`,c=[`María López`,`Carlos Torres`,`Ana Huamán`,`Pedro Castillo`,`Lucía Fernández`,`Diego Quispe`,`Rosa Mamani`,`Jorge Paredes`],l=[`City Tour Cusco`,`Machu Picchu Clásico`,`Valle Sagrado`,`Montaña 7 Colores`,`Laguna Humantay`,`Camino Inca 4D`,`Maras Moray`,`Rainbow Mountain`];function u(e,t){return Math.floor(Math.random()*(t-e+1))+e}function d(){let e=[],t=new Date(o.getFullYear(),o.getMonth()+1,0).getDate();for(let n=0;n<150;n++){let n=u(1,t),r=u(1,5);e.push({fecha:`${s}-${String(n).padStart(2,`0`)}`,vendedor:c[u(0,c.length-1)],tour:l[u(0,l.length-1)],pax:r,puntos:u(8,28)*r,total:u(80,400)*r})}return e}function f(e,t){return e.filter(e=>e.fecha.startsWith(t))}var p=()=>`
  <div class="me_page">
    <div class="me_hero">
      <div class="me_hero_left">
        <div class="me_hero_icon"><i class="fas fa-bullseye"></i></div>
        <div class="me_hero_txt">
          <h1>Meta del Mes</h1>
          <p>Seguimiento de objetivos · ${i} pts mensuales</p>
        </div>
      </div>
      <span style="font-size:var(--fz_s3);color:var(--tx3);font-weight:600;background:var(--bg);padding:0.6vh 1.5vh;border-radius:1vh">
        <i class="fas fa-calendar"></i> ${new Date(o.getFullYear(),o.getMonth()+1,0).getDate()} días · ${a[o.getMonth()]} ${o.getFullYear()}
      </span>
    </div>

    <div class="me_big_ring">
      <div class="me_ring_wrap">
        <svg class="me_ring_svg" viewBox="0 0 120 120">
          <circle class="me_ring_bg" cx="60" cy="60" r="52"/>
          <circle class="me_ring_fg" id="meRingFg" cx="60" cy="60" r="52" stroke-dasharray="326.73" stroke-dashoffset="326.73"/>
        </svg>
        <div class="me_ring_center">
          <div class="me_ring_pct" id="meRingPct">0%</div>
          <div class="me_ring_lbl">de meta</div>
        </div>
      </div>
    </div>

    <div class="me_stats_row">
      <div class="me_stat_card">
        <div class="me_stat_ico"><i class="fas fa-star" style="color:var(--Oro)"></i></div>
        <div class="me_stat_val" id="mePuntosActuales">0</div>
        <div class="me_stat_lbl">Puntos Acumulados</div>
      </div>
      <div class="me_stat_card">
        <div class="me_stat_ico"><i class="fas fa-flag-checkered" style="color:var(--Paz)"></i></div>
        <div class="me_stat_val" id="mePuntosFaltan">0</div>
        <div class="me_stat_lbl">Puntos Restantes</div>
      </div>
      <div class="me_stat_card">
        <div class="me_stat_ico"><i class="fas fa-clock" style="color:var(--Cielo)"></i></div>
        <div class="me_stat_val" id="meDiasRestantes">0</div>
        <div class="me_stat_lbl">Días Restantes</div>
      </div>
      <div class="me_stat_card">
        <div class="me_stat_ico"><i class="fas fa-gauge-high" style="color:var(--Dulce)"></i></div>
        <div class="me_stat_val"><span id="mePuntosDia">0</span></div>
        <div class="me_stat_lbl">Puntos/día necesarios</div>
      </div>
    </div>

    <div class="me_chart_card">
      <div class="me_chart_head">
        <span class="me_chart_title"><i class="fas fa-chart-area"></i> Progreso Diario vs Meta</span>
        <span class="me_chart_badge">línea real · — — proyectado</span>
      </div>
      <div class="me_chart_wrap"><canvas id="meChartLinea" style="width:100%;height:280px"></canvas></div>
    </div>

    <div class="me_chart_card">
      <div class="me_chart_head">
        <span class="me_chart_title"><i class="fas fa-table"></i> Desglose Diario</span>
        <span class="me_chart_badge">últimos 10 días</span>
      </div>
      <table class="me_daily_table">
        <thead><tr><th>Día</th><th>Puntos</th><th>Acumulado</th><th>vs Meta</th><th>Progreso</th></tr></thead>
        <tbody id="meDailyBody"></tbody>
      </table>
    </div>
  </div>`,m=()=>{let t=f(d(),s),a=t.reduce((e,t)=>e+t.puntos,0),c=new Date(o.getFullYear(),o.getMonth()+1,0).getDate(),l=o.getDate(),u=c-l,p=Math.min(Math.round(a/i*100),100),m=Math.max(i-a,0),h=u>0?Math.ceil(m/u):0,_=document.getElementById(`meRingFg`),v=2*Math.PI*52,y=v-p/100*v;setTimeout(()=>{_.style.strokeDashoffset=y},100),g(`#mePuntosActuales`,a),g(`#mePuntosFaltan`,m),g(`#meDiasRestantes`,u),e(`#mePuntosDia`).text(h),e(`#meRingPct`).text(`${p}%`);let b=[],x=0;for(let e=1;e<=Math.min(l,31);e++){let n=t.filter(t=>parseInt(t.fecha.split(`-`)[2])===e);x+=n.reduce((e,t)=>e+t.puntos,0),b.push(x)}let S=b.map((e,t)=>`${t+1}`),C=b.map((e,t)=>i/c*(t+1)),w=document.getElementById(`meChartLinea`);if(!w)return;r&&r.destroy();let T=getComputedStyle(document.documentElement);r=new n(w,{type:`line`,data:{labels:S,datasets:[{label:`Puntos Reales`,data:b,borderColor:T.getPropertyValue(`--mco`).trim()||`#1978d7`,backgroundColor:T.getPropertyValue(`--bg4`).trim()||`rgba(25,120,215,0.1)`,fill:!0,tension:.3,pointRadius:3,borderWidth:2.5},{label:`Meta Proyectada`,data:C,borderColor:`#FFDA34`,borderDash:[6,4],pointRadius:0,borderWidth:2.5,fill:!1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:`bottom`,labels:{color:T.getPropertyValue(`--tx`).trim(),font:{size:11},usePointStyle:!0}},tooltip:{callbacks:{label:e=>`${e.dataset.label}: ${e.raw} pts`}}},scales:{x:{grid:{color:T.getPropertyValue(`--brd`).trim()},ticks:{color:T.getPropertyValue(`--tx3`).trim(),font:{size:10}}},y:{grid:{color:T.getPropertyValue(`--brd`).trim()},ticks:{color:T.getPropertyValue(`--tx3`).trim()}}},interaction:{intersect:!1,mode:`index`}}});let E=[];for(let e=Math.max(1,l-9);e<=l;e++){let n=t.filter(t=>parseInt(t.fecha.split(`-`)[2])===e).reduce((e,t)=>e+t.puntos,0);E.push({dia:e,pts:n,acum:(E.length?E[E.length-1].acum:0)+n})}let D=i/c,O=E.map(e=>{let t=Math.min(e.acum/(D*e.dia)*100,100);return`<tr>
      <td><strong>Día ${e.dia}</strong></td>
      <td>${e.pts} pts</td>
      <td><strong>${e.acum}</strong></td>
      <td>${e.acum>=D*e.dia?`<span style="color:var(--success)">✓ Meta cumplida</span>`:`<span style="color:var(--warning)">${Math.round(D*e.dia-e.acum)} pts atrás</span>`}</td>
      <td><div class="me_bar_tiny"><div class="me_bar_tiny_fill" style="width:${Math.min(t,100)}%"></div></div></td>
    </tr>`}).join(``);e(`#meDailyBody`).html(O)},h=()=>{r&&=(r.destroy(),null)};function g(t,n){let r=0,i=Math.max(1,Math.floor(n/40)),a=setInterval(()=>{r+=i,r>=n?(e(t).text(n),clearInterval(a)):e(t).text(r)},20)}export{h as cleanup,m as init,p as render};