import{i as e,n as t,t as n}from"./vendor-CKz6wYoq.js";n.register(...t);var r=[],i=new Date,a=[`Enero`,`Febrero`,`Marzo`,`Abril`,`Mayo`,`Junio`,`Julio`,`Agosto`,`Septiembre`,`Octubre`,`Noviembre`,`Diciembre`];`${i.getFullYear()}${String(i.getMonth()+1).padStart(2,`0`)}`;var o=[`City Tour`,`MP Clásico`,`Valle Sagrado`,`7 Colores`,`Humantay`,`Camino Inca`,`Maras Moray`],s=[`Cusco`,`Valle Sagrado`,`Machu Picchu`,`Arequipa`,`Puno`,`Lima`,`Iquitos`];function c(e,t){return Math.floor(Math.random()*(t-e+1))+e}function l(){let e=[],t=[`Lun`,`Mar`,`Mié`,`Jue`,`Vie`,`Sáb`,`Dom`];for(let n=0;n<14;n++)e.push({dia:t[c(0,6)],hora:`${String(c(8,18)).padStart(2,`0`)}:${String(c(0,5)*10).padStart(2,`0`)}`,evento:o[c(0,o.length-1)],cliente:`${[`Juan`,`María`,`Carlos`,`Ana`,`Pedro`,`Lucía`,`Diego`][c(0,6)]} ${[`García`,`Torres`,`Huamán`,`Quispe`,`Paredes`][c(0,4)]}`,pax:c(1,6),tipo:[`Reserva`,`Check-in`,`Check-out`,`Cancelación`,`Reagendado`][c(0,4)],color:[`#38bdf8`,`#10b981`,`#f59e0b`,`#8b5cf6`,`#ef4444`,`#06b6d4`,`#22c55e`][c(0,6)]});return e}var u={labels:[`Lun`,`Mar`,`Mié`,`Jue`,`Vie`,`Sáb`,`Dom`],data:[c(15,35),c(18,40),c(20,38),c(22,42),c(30,55),c(40,70),c(25,45)]},d={labels:s,data:s.map(()=>c(5,30))},f=()=>`
  <div class="tb_page">
    <div class="tb_hero">
      <div class="tb_hero_left">
        <div class="tb_hero_icon"><i class="fas fa-th-large"></i></div>
        <div class="tb_hero_txt">
          <h1>Tablero</h1>
          <p>Vista rápida · ${a[i.getMonth()]} ${i.getFullYear()}</p>
        </div>
      </div>
      <span style="font-size:var(--fz_s3);color:var(--tx3);font-weight:600;background:var(--bg);padding:0.6vh 1.5vh;border-radius:1vh">
        <i class="fas fa-clock"></i> ${new Date().toLocaleDateString(`es-PE`,{weekday:`long`,day:`numeric`,month:`long`})}
      </span>
    </div>

    <div class="tb_big_grid">
      <div class="tb_card">
        <div class="tb_card_head">
          <span class="tb_card_title"><i class="fas fa-chart-area"></i> Movimiento Semanal</span>
          <span style="font-size:var(--fz_s3);color:var(--tx3)">PAX</span>
        </div>
        <div class="tb_chart_wrap"><canvas id="tbChartSemana"></canvas></div>
      </div>

      <div class="tb_card">
        <div class="tb_card_head">
          <span class="tb_card_title"><i class="fas fa-globe-americas"></i> Por Destino</span>
          <span style="font-size:var(--fz_s3);color:var(--tx3)">reservas</span>
        </div>
        <div class="tb_chart_wrap"><canvas id="tbChartDestinos"></canvas></div>
      </div>

      <div class="tb_card tb_card_full">
        <div class="tb_card_head">
          <span class="tb_card_title"><i class="fas fa-bolt"></i> Actividad Reciente</span>
          <span style="font-size:var(--fz_s3);color:var(--tx3)">hoy</span>
        </div>
        <div class="tb_activity" id="tbActivity"></div>
      </div>
    </div>

    <div class="tb_metric_row" id="tbMetrics">
      <div class="tb_metric">
        <div class="tb_metric_val" id="tbReservasHoy">0</div>
        <div class="tb_metric_lbl">Reservas Hoy</div>
      </div>
      <div class="tb_metric">
        <div class="tb_metric_val" id="tbPaxHoy">0</div>
        <div class="tb_metric_lbl">PAX Hoy</div>
      </div>
      <div class="tb_metric">
        <div class="tb_metric_val" id="tbRevenueHoy">S/ 0</div>
        <div class="tb_metric_lbl">Revenue Hoy</div>
      </div>
      <div class="tb_metric">
        <div class="tb_metric_val" id="tbPorConfirmar">0</div>
        <div class="tb_metric_lbl">Por Confirmar</div>
      </div>
    </div>
  </div>`,p=()=>{let t=getComputedStyle(document.documentElement),i=l().slice(0,8).map(e=>`
    <div class="tb_act_item">
      <div class="tb_act_dot" style="background:${e.color}"></div>
      <div class="tb_act_info">
        <div class="tb_act_title">${e.evento}</div>
        <div class="tb_act_sub">${e.cliente} · ${e.pax} pax</div>
      </div>
      <div style="font-size:var(--fz_s2);color:var(--tx3);font-weight:600;background:var(--bg4);padding:0.2vh 1vh;border-radius:0.6vh">${e.tipo}</div>
      <div class="tb_act_time">${e.dia} ${e.hora}</div>
    </div>
  `).join(``);e(`#tbActivity`).html(i),h(`#tbReservasHoy`,c(8,25)),h(`#tbPaxHoy`,c(20,80)),g(`#tbRevenueHoy`,c(2e3,9e3)),h(`#tbPorConfirmar`,c(2,12));let a=document.getElementById(`tbChartSemana`);if(a){let e=new n(a,{type:`line`,data:{labels:u.labels,datasets:[{label:`PAX`,data:u.data,borderColor:`#38bdf8`,backgroundColor:`rgba(56,189,248,0.08)`,fill:!0,tension:.3,pointBackgroundColor:`#38bdf8`,pointBorderColor:`#fff`,pointBorderWidth:2,pointRadius:4}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{grid:{display:!1},ticks:{color:t.getPropertyValue(`--tx3`).trim()}},y:{grid:{color:t.getPropertyValue(`--brd`).trim()},ticks:{color:t.getPropertyValue(`--tx3`).trim()},beginAtZero:!0}}}});r.push(e)}let o=document.getElementById(`tbChartDestinos`);if(o){let e=new n(o,{type:`doughnut`,data:{labels:d.labels,datasets:[{data:d.data,backgroundColor:[`#38bdf8`,`#10b981`,`#f59e0b`,`#8b5cf6`,`#ef4444`,`#06b6d4`,`#22c55e`],borderWidth:0}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:`60%`,plugins:{legend:{position:`bottom`,labels:{color:t.getPropertyValue(`--tx`).trim(),font:{size:10},padding:12}}}}});r.push(e)}},m=()=>{r.forEach(e=>e.destroy()),r=[]};function h(t,n){let r=0,i=Math.max(1,Math.floor(n/40)),a=setInterval(()=>{r+=i,r>=n?(e(t).text(n),clearInterval(a)):e(t).text(r)},20)}function g(t,n){let r=0,i=n/40,a=setInterval(()=>{r+=i,r>=n?(e(t).text(`S/ ${n.toFixed(2)}`),clearInterval(a)):e(t).text(`S/ ${r.toFixed(2)}`)},20)}export{m as cleanup,p as init,f as render};