import{i as e,n as t,t as n}from"./vendor-CKz6wYoq.js";n.register(...t);var r=null,i=new Date,a=`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,`0`)}`,o=[{id:1,tour:`City Tour Cusco`,precio:65,puntos:10,comision:5,pax:280,ico:`fa-landmark`,color:`#38bdf8`,desc:`Recorrido por los 4 ruinas cercanas a Cusco`},{id:2,tour:`Machu Picchu Clásico`,precio:180,puntos:25,comision:15,pax:220,ico:`fa-mountain`,color:`#10b981`,desc:`La maravilla del mundo en un día`},{id:3,tour:`Valle Sagrado`,precio:120,puntos:18,comision:10,pax:190,ico:`fa-tree`,color:`#f59e0b`,desc:`Pisac, Urubamba, Ollantaytambo y Chinchero`},{id:4,tour:`Montaña 7 Colores`,precio:95,puntos:15,comision:8,pax:160,ico:`fa-palette`,color:`#8b5cf6`,desc:`Trekking al Vinicunca`},{id:5,tour:`Laguna Humantay`,precio:110,puntos:16,comision:9,pax:145,ico:`fa-water`,color:`#06b6d4`,desc:`Laguna turquesa a los pies del nevado`},{id:6,tour:`Camino Inca 4D`,precio:450,puntos:50,comision:30,pax:60,ico:`fa-hiking`,color:`#ef4444`,desc:`La caminata clásica a Machu Picchu`},{id:7,tour:`Maras Moray`,precio:85,puntos:12,comision:6,pax:200,ico:`fa-cube`,color:`#f97316`,desc:`Salineras y laboratorio agrícola inca`},{id:8,tour:`Montaña Putucusi`,precio:75,puntos:11,comision:5,pax:90,ico:`fa-leaf`,color:`#22c55e`,desc:`Subida gratuita con vista panorámica`},{id:9,tour:`Museo de Sitio Koricancha`,precio:55,puntos:8,comision:4,pax:130,ico:`fa-gem`,color:`#a855f7`,desc:`Templo del Sol y museo`},{id:10,tour:`Rafting Urubamba`,precio:130,puntos:20,comision:12,pax:75,ico:`fa-water-ladder`,color:`#0ea5e9`,desc:`Aventura en los rápidos del río sagrado`}];function s(e,t){return Math.floor(Math.random()*(t-e+1))+e}function c(){let e=[],t=new Date(i.getFullYear(),i.getMonth()+1,0).getDate();for(let n=0;n<200;n++){let n=o[s(0,o.length-1)],r=s(1,6);e.push({fecha:`${a}-${String(s(1,t)).padStart(2,`0`)}`,tour:n.tour,pax:r,total:n.precio*r,ganancia:(n.precio-n.comision)*r})}return e}function l(e,t){return e.filter(e=>e.fecha.startsWith(t))}var u=()=>`
  <div class="pr_page">
    <div class="pr_hero">
      <div class="pr_hero_left">
        <div class="pr_hero_icon"><i class="fas fa-box"></i></div>
        <div class="pr_hero_txt">
          <h1>Productos</h1>
          <p>Catálogo de tours · ${o.length} productos activos</p>
        </div>
      </div>
      <span style="font-size:var(--fz_s3);color:var(--tx3);font-weight:600;background:var(--bg);padding:0.6vh 1.5vh;border-radius:1vh">
        <i class="fas fa-calendar"></i> ${d[i.getMonth()]} ${i.getFullYear()}
      </span>
    </div>

    <div class="pr_stats" id="prStats">
      <div class="pr_stat">
        <div class="pr_stat_val" id="prTotalVentas">0</div>
        <div class="pr_stat_lbl">PAX Vendidos</div>
      </div>
      <div class="pr_stat">
        <div class="pr_stat_val" id="prRevenue">S/ 0</div>
        <div class="pr_stat_lbl">Revenue Total</div>
      </div>
      <div class="pr_stat">
        <div class="pr_stat_val" id="prTopTour">—</div>
        <div class="pr_stat_lbl">Tour más vendido</div>
      </div>
      <div class="pr_stat">
        <div class="pr_stat_val" id="prPrecioProm">S/ 0</div>
        <div class="pr_stat_lbl">Precio Promedio</div>
      </div>
    </div>

    <div class="pr_grid" id="prGrid"></div>

    <div class="pr_chart_card">
      <div class="pr_chart_head">
        <span><i class="fas fa-chart-bar"></i> Tours más vendidos (PAX)</span>
        <span style="font-size:var(--fz_s3);color:var(--tx3);font-weight:600">top 10</span>
      </div>
      <div class="pr_chart_wrap"><canvas id="prChart" style="width:100%;height:300px"></canvas></div>
    </div>
  </div>`,d=[`Enero`,`Febrero`,`Marzo`,`Abril`,`Mayo`,`Junio`,`Julio`,`Agosto`,`Septiembre`,`Octubre`,`Noviembre`,`Diciembre`],f=()=>{let t=l(c(),a),i=t.reduce((e,t)=>e+t.pax,0),s=t.reduce((e,t)=>e+t.total,0),u={};t.forEach(e=>{u[e.tour]||(u[e.tour]={pax:0,rev:0}),u[e.tour].pax+=e.pax,u[e.tour].rev+=e.total});let d=Object.entries(u).sort((e,t)=>t[1].pax-e[1].pax),f=d.length?d[0][0]:`—`,p=o.map(e=>e.precio),g=p.reduce((e,t)=>e+t,0)/p.length;m(`#prTotalVentas`,i),h(`#prRevenue`,s),e(`#prTopTour`).text(f.length>20?f.slice(0,20)+`…`:f),e(`#prPrecioProm`).text(`S/ ${g.toFixed(0)}`);let _=o.map(e=>{let t=u[e.tour]?.pax||0;return`<div class="pr_card">
      <div class="pr_card_top">
        <div class="pr_card_ico" style="background:${e.color}22;color:${e.color}"><i class="fas ${e.ico}"></i></div>
        <span class="pr_card_badge" style="background:${e.color}22;color:${e.color}">${t} PAX</span>
      </div>
      <div class="pr_card_body">
        <div class="pr_card_name">${e.tour}</div>
        <p style="font-size:var(--fz_s4);color:var(--tx3);margin:0 0 1.5vh 0">${e.desc}</p>
        <div class="pr_card_meta">
          <div class="pr_card_meta_item">
            <div class="pr_card_meta_val" style="color:var(--mco)">S/ ${e.precio}</div>
            <div class="pr_card_meta_lbl">Precio</div>
          </div>
          <div class="pr_card_meta_item">
            <div class="pr_card_meta_val" style="color:var(--Oro)">${e.puntos} pts</div>
            <div class="pr_card_meta_lbl">Puntos</div>
          </div>
          <div class="pr_card_meta_item">
            <div class="pr_card_meta_val" style="color:var(--Paz)">S/ ${e.comision}</div>
            <div class="pr_card_meta_lbl">Comisión</div>
          </div>
          <div class="pr_card_meta_item">
            <div class="pr_card_meta_val" style="color:var(--Cielo)">${e.pax} PAX</div>
            <div class="pr_card_meta_lbl">Capacidad</div>
          </div>
        </div>
      </div>
    </div>`}).join(``);e(`#prGrid`).html(_);let v=document.getElementById(`prChart`);if(!v)return;r&&r.destroy();let y=getComputedStyle(document.documentElement);r=new n(v,{type:`bar`,data:{labels:d.map(e=>e[0].length>18?e[0].slice(0,18)+`…`:e[0]),datasets:[{label:`PAX Vendidos`,data:d.map(e=>e[1].pax),backgroundColor:o.map(e=>`${e.color}33`),borderColor:o.map(e=>e.color),borderWidth:1.5,borderRadius:4}]},options:{responsive:!0,maintainAspectRatio:!1,indexAxis:`y`,plugins:{legend:{display:!1}},scales:{x:{grid:{color:y.getPropertyValue(`--brd`).trim()},ticks:{color:y.getPropertyValue(`--tx3`).trim()}},y:{grid:{display:!1},ticks:{color:y.getPropertyValue(`--tx`).trim(),font:{size:10}}}}}})},p=()=>{r&&=(r.destroy(),null)};function m(t,n){let r=0,i=Math.max(1,Math.floor(n/40)),a=setInterval(()=>{r+=i,r>=n?(e(t).text(n),clearInterval(a)):e(t).text(r)},20)}function h(t,n){let r=0,i=n/40,a=setInterval(()=>{r+=i,r>=n?(e(t).text(`S/ ${n.toFixed(2)}`),clearInterval(a)):e(t).text(`S/ ${r.toFixed(2)}`)},20)}export{p as cleanup,f as init,u as render};