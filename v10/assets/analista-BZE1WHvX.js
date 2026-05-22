import{i as e,n as t,t as n}from"./vendor-CKz6wYoq.js";n.register(...t);var r=[];function i(){r.forEach(e=>{try{e.destroy()}catch{}}),r=[]}function a(e,t){return Math.floor(Math.random()*(t-e+1))+e}var o=[`City Tour Cusco`,`Machu Picchu Clásico`,`Valle Sagrado`,`Montaña 7 Colores`,`Laguna Humantay`,`Camino Inca 4D`,`Maras Moray`,`Rainbow Mountain`,`Sacred Valley Premium`,`Machu Picchu + Huayna Picchu`],s=[{nombre:`María López`,iniciales:`ML`},{nombre:`Carlos Torres`,iniciales:`CT`},{nombre:`Ana Huamán`,iniciales:`AH`},{nombre:`Pedro Castillo`,iniciales:`PC`},{nombre:`Lucía Fernández`,iniciales:`LF`},{nombre:`Diego Quispe`,iniciales:`DQ`},{nombre:`Rosa Mamani`,iniciales:`RM`},{nombre:`Jorge Paredes`,iniciales:`JP`}],c=[`Tarjeta`,`Efectivo`,`Yape`,`Plin`,`Transferencia`];function l(e=200){let t=[],n=new Date,r=n.getFullYear(),i=n.getMonth(),l=new Date(r,i+1,0).getDate();for(let n=0;n<e;n++){let e=a(1,l),u=a(1,6),d=a(50,450),f=d*u,p=a(10,80),m=a(5,30)*u,h=s[a(0,s.length-1)],g=o[a(0,o.length-1)],_=c[a(0,c.length-1)],v=[`pagado`,`pagado`,`pagado`,`cobrar`,`cobrado`],y=v[a(0,v.length-1)],b=[`Juan Pérez`,`María García`,`Carlos Ruiz`,`Ana Torres`,`Luis Vega`,`Sofía Castro`,`Miguel Ríos`,`Elena Paz`,`José Díaz`,`Rita Oro`];t.push({id:`venta_${n}`,fecha:`${r}-${String(i+1).padStart(2,`0`)}-${String(e).padStart(2,`0`)}`,vendedor:h.nombre,avatarIniciales:h.iniciales,tour:g,cliente:b[a(0,b.length-1)],pax:u,precioUnitario:d,total:f,pagoOperador:p,ganancia:f-p,metodoPago:_,estado:y,puntos:m})}return t.sort((e,t)=>t.fecha.localeCompare(e.fecha)),t}var u=l(200),d=[`Enero`,`Febrero`,`Marzo`,`Abril`,`Mayo`,`Junio`,`Julio`,`Agosto`,`Septiembre`,`Octubre`,`Noviembre`,`Diciembre`],f=new Date,p=`${f.getFullYear()}-${String(f.getMonth()+1).padStart(2,`0`)}`,m=d[f.getMonth()];function h(e,t){return e.filter(e=>e.fecha.startsWith(t))}function g(e){let t=new Date,n=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,`0`)}-${String(t.getDate()).padStart(2,`0`)}`,r=0,i=0,a=0,o=0;e.forEach(e=>{i+=e.pax,a+=e.puntos,o+=e.ganancia,e.fecha===n&&(r+=e.pax)}),_(`#daValVentasHoy`,r),_(`#daValToursMes`,i),_(`#daValPuntosMes`,a),v(`#daValGanancia`,o)}function _(t,n){let r=0,i=Math.max(1,Math.floor(n/40)),a=setInterval(()=>{r+=i,r>=n?(e(t).text(n),clearInterval(a)):e(t).text(r)},20)}function v(t,n){let r=0,i=n/40,a=setInterval(()=>{r+=i,r>=n?(e(t).text(`S/ ${n.toFixed(2)}`),clearInterval(a)):e(t).text(`S/ ${r.toFixed(2)}`)},20)}function y(){let e=getComputedStyle(document.documentElement);return{tx:e.getPropertyValue(`--tx1`).trim()||`#000`,tx3:e.getPropertyValue(`--tx3`).trim()||`#666`,grid:e.getPropertyValue(`--brd`).trim()||`#ddd`,mco:e.getPropertyValue(`--mco`).trim()||`#1978d7`,bg4:e.getPropertyValue(`--bg4`).trim()||`rgba(25,120,215,0.1)`,wb:e.getPropertyValue(`--wb`).trim()||`#fff`}}function b(e){let t={},i=new Date;for(let e=29;e>=0;e--){let n=new Date(i.getFullYear(),i.getMonth(),i.getDate()-e),r=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}-${String(n.getDate()).padStart(2,`0`)}`;t[r]=0}e.forEach(e=>{t[e.fecha]!==void 0&&(t[e.fecha]+=e.total)});let a=Object.keys(t).map(e=>{let t=e.split(`-`);return`${t[2]}/${t[1]}`}),o=Object.values(t),s=document.getElementById(`daChartLinea`);if(!s)return;let c=y();r.push(new n(s,{type:`line`,data:{labels:a,datasets:[{label:`Ingresos S/`,data:o,borderColor:c.mco,backgroundColor:c.bg4,fill:!0,tension:.35,pointRadius:3,pointHoverRadius:6,borderWidth:2.5}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{backgroundColor:c.wb,titleColor:c.tx,bodyColor:c.tx,borderColor:c.grid,borderWidth:1,callbacks:{label:e=>`S/ ${e.raw.toFixed(2)}`}}},scales:{x:{grid:{color:c.grid},ticks:{color:c.tx3,maxTicksLimit:10,font:{size:10}}},y:{grid:{color:c.grid},ticks:{color:c.tx3,callback:e=>`S/ `+e}}},interaction:{intersect:!1,mode:`index`}}}))}function x(e){let t={};e.forEach(e=>{t[e.tour]||(t[e.tour]=0),t[e.tour]+=e.pax});let i=Object.entries(t).sort((e,t)=>t[1]-e[1]).slice(0,10),a=i.map(e=>e[0].length>22?e[0].slice(0,22)+`…`:e[0]),o=i.map(e=>e[1]),s=document.getElementById(`daChartBarras`);if(!s)return;let c=y();r.push(new n(s,{type:`bar`,data:{labels:a,datasets:[{label:`PAX`,data:o,backgroundColor:Array(i.length).fill(c.bg4),borderColor:Array(i.length).fill(c.mco),borderWidth:1.5,borderRadius:4}]},options:{responsive:!0,maintainAspectRatio:!1,indexAxis:`y`,plugins:{legend:{display:!1}},scales:{x:{grid:{color:c.grid},ticks:{color:c.tx3}},y:{grid:{display:!1},ticks:{color:c.tx,font:{size:10}}}}}}))}function S(e){let t={Tarjeta:0,Efectivo:0,Yape:0,Plin:0,Transferencia:0};e.forEach(e=>{t[e.metodoPago]!==void 0&&(t[e.metodoPago]+=e.total)});let i=Object.keys(t).filter(e=>t[e]>0),a=i.map(e=>t[e]),o=[`#38bdf8`,`#10b981`,`#f59e0b`,`#8b5cf6`,`#ef4444`],s=document.getElementById(`daChartPastel`);if(!s)return;let c=y();r.push(new n(s,{type:`doughnut`,data:{labels:i,datasets:[{data:a,backgroundColor:o.slice(0,i.length),borderWidth:2,borderColor:c.wb}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:`bottom`,labels:{color:c.tx,padding:12,font:{size:11},usePointStyle:!0}},tooltip:{callbacks:{label:e=>`${e.label}: S/ ${e.raw.toFixed(2)}`}}}}}))}function C(e){let t={};e.forEach(e=>{t[e.vendedor]||(t[e.vendedor]={puntos:0,ventas:0}),t[e.vendedor].puntos+=e.puntos,t[e.vendedor].ventas+=e.pax});let i=Object.entries(t).sort((e,t)=>t[1].puntos-e[1].puntos).slice(0,10),a=i.map(e=>e[0].length>18?e[0].slice(0,18)+`…`:e[0]),o=i.map(e=>e[1].puntos),s=document.getElementById(`daChartRanking`);if(!s)return;let c=y(),l=o.map((e,t)=>t===0?`rgba(255,218,52,0.2)`:c.bg4),u=o.map((e,t)=>t===0?`#FFDA34`:c.mco);r.push(new n(s,{type:`bar`,data:{labels:a,datasets:[{label:`Puntos`,data:o,backgroundColor:l,borderColor:u,borderWidth:1.5,borderRadius:4}]},options:{responsive:!0,maintainAspectRatio:!1,indexAxis:`y`,plugins:{legend:{display:!1}},scales:{x:{grid:{color:c.grid},ticks:{color:c.tx3}},y:{grid:{display:!1},ticks:{color:c.tx,font:{size:10}}}}}}))}function w(t){let n=t.slice(0,20);if(!n.length){e(`#daTableBody`).html(`<tr><td colspan="7" class="da_empty"><i class="fas fa-inbox"></i><p>Sin datos este mes</p></td></tr>`);return}let r=n.map(e=>{let t=e.estado===`pagado`||e.estado===`cobrado`?`da_status_pagado`:`da_status_deuda`,n=e.estado===`pagado`||e.estado===`cobrado`?`Pagado`:`Deuda`,r=e.fecha.split(`-`);return`<tr>
      <td>${r[2]}/${r[1]}/${r[0]}</td>
      <td><span class="da_avatar_sm">${e.avatarIniciales}</span>${e.vendedor}</td>
      <td><span class="da_tour_pill">${e.tour}</span></td>
      <td>${e.cliente}</td>
      <td class="da_amount">S/ ${e.total.toFixed(2)}</td>
      <td><span class="da_status ${t}">${n}</span></td>
      <td><strong>${e.puntos}</strong> pts</td>
    </tr>`}).join(``);e(`#daTableBody`).html(r),e(`#daTableCount`).text(`${n.length} registros`)}function T(t){i();let n=h(u,t);g(n),setTimeout(()=>{b(n),x(n),S(n),C(n)},50),w(n),e(`#daLoading`).fadeOut(300)}var E=()=>`
  <div class="da_page">
    <div class="da_hero">
      <div class="da_hero_left">
        <div class="da_hero_icon"><i class="fas fa-chart-pie"></i></div>
        <div class="da_hero_txt">
          <h1>Dashboard Analista</h1>
          <p>Métricas e inteligencia de negocio · Demo con datos simulados</p>
        </div>
      </div>
      <div class="da_period" id="daPeriodBtn">
        <i class="fas fa-calendar-alt"></i>
        <span id="daPeriodText">${m} ${f.getFullYear()}</span>
        <select id="daMesSelect" style="display:none">
          ${Array.from({length:12},(e,t)=>{let n=new Date(f.getFullYear(),f.getMonth()-t,1),r=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}`,i=`${d[n.getMonth()]} ${n.getFullYear()}`;return`<option value="${r}"${t===0?` selected`:``}>${i}</option>`}).join(``)}
        </select>
      </div>
    </div>

    <div class="da_kpi_grid">
      <div class="da_kpi" style="--kpi-color:var(--Cielo)">
        <div class="da_kpi_head">
          <div class="da_kpi_ico"><i class="fas fa-shopping-cart"></i></div>
          <span class="da_kpi_label">Ventas Hoy</span>
        </div>
        <div class="da_kpi_val">
          <span class="da_sk_kpi"></span>
          <span id="daValVentasHoy" style="display:none"></span>
        </div>
        <div class="da_kpi_sub">PAX registrados hoy</div>
      </div>
      <div class="da_kpi" style="--kpi-color:var(--Paz)">
        <div class="da_kpi_head">
          <div class="da_kpi_ico"><i class="fas fa-route"></i></div>
          <span class="da_kpi_label">Tours del Mes</span>
        </div>
        <div class="da_kpi_val">
          <span class="da_sk_kpi"></span>
          <span id="daValToursMes" style="display:none"></span>
        </div>
        <div class="da_kpi_sub">PAX vendidos en ${m}</div>
      </div>
      <div class="da_kpi" style="--kpi-color:var(--Oro)">
        <div class="da_kpi_head">
          <div class="da_kpi_ico"><i class="fas fa-star"></i></div>
          <span class="da_kpi_label">Puntos Equipo</span>
        </div>
        <div class="da_kpi_val">
          <span class="da_sk_kpi"></span>
          <span id="daValPuntosMes" style="display:none"></span>
        </div>
        <div class="da_kpi_sub">Acumulados en el mes</div>
      </div>
      <div class="da_kpi" style="--kpi-color:var(--Mora)">
        <div class="da_kpi_head">
          <div class="da_kpi_ico"><i class="fas fa-sack-dollar"></i></div>
          <span class="da_kpi_label">Ganancia Total</span>
        </div>
        <div class="da_kpi_val">
          <span class="da_sk_kpi"></span>
          <span id="daValGanancia" style="display:none"></span>
        </div>
        <div class="da_kpi_sub">Revenue neto del mes</div>
      </div>
    </div>

    <div id="daLoading" style="text-align:center;padding:5vh 0;color:var(--tx3)">
      <i class="fas fa-spinner fa-spin" style="font-size:2rem;color:var(--mco);margin-bottom:1vh;display:block"></i>
      <span>Preparando dashboard...</span>
    </div>

    <div id="daCharts" style="display:none">
      <div class="da_charts_grid">
        <div class="da_chart_card da_chart_full">
          <div class="da_chart_head">
            <span class="da_chart_title"><i class="fas fa-chart-line"></i> Ingresos Últimos 30 Días</span>
            <span class="da_chart_badge">S/ revenue diario</span>
          </div>
          <div class="da_chart_wrap">
            <span class="da_sk_chart"></span>
            <canvas id="daChartLinea" style="display:none;width:100%;height:280px"></canvas>
          </div>
        </div>
      </div>

      <div class="da_charts_grid">
        <div class="da_chart_card">
          <div class="da_chart_head">
            <span class="da_chart_title"><i class="fas fa-trophy"></i> Top Tours</span>
            <span class="da_chart_badge">PAX vendidos</span>
          </div>
          <div class="da_chart_wrap">
            <span class="da_sk_chart"></span>
            <canvas id="daChartBarras" style="display:none;width:100%;height:280px"></canvas>
          </div>
        </div>
        <div class="da_chart_card">
          <div class="da_chart_head">
            <span class="da_chart_title"><i class="fas fa-credit-card"></i> Métodos de Pago</span>
            <span class="da_chart_badge">S/ volumen</span>
          </div>
          <div class="da_chart_wrap">
            <span class="da_sk_chart"></span>
            <canvas id="daChartPastel" style="display:none;width:100%;height:280px"></canvas>
          </div>
        </div>
      </div>

      <div class="da_charts_grid">
        <div class="da_chart_card">
          <div class="da_chart_head">
            <span class="da_chart_title"><i class="fas fa-users"></i> Ranking Empleados</span>
            <span class="da_chart_badge">Puntos del mes</span>
          </div>
          <div class="da_chart_wrap">
            <span class="da_sk_chart"></span>
            <canvas id="daChartRanking" style="display:none;width:100%;height:280px"></canvas>
          </div>
        </div>
      </div>

      <div class="da_table_section">
        <div class="da_table_card">
          <div class="da_table_head">
            <span class="da_table_title"><i class="fas fa-table"></i> Últimas Ventas</span>
            <span class="da_table_count" id="daTableCount">—</span>
          </div>
          <div class="da_table_wrap">
            <table class="da_table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Vendedor</th>
                  <th>Tour</th>
                  <th>Cliente</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Puntos</th>
                </tr>
              </thead>
              <tbody id="daTableBody">
                <tr><td colspan="7" class="da_empty"><i class="fas fa-spinner fa-spin"></i><p>Cargando...</p></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>`,D=()=>{e(`#daLoading`).show(),e(`#daCharts`).hide(),setTimeout(()=>{T(e(`#daMesSelect`).val()||p),e(`#daCharts`).fadeIn(400),e(`.da_sk_kpi, .da_sk_chart`).hide(),e(`#daCharts canvas`).show().css(`display`,`block`)},600),e(document).off(`.da`).on(`change.da`,`#daMesSelect`,function(){let t=this.selectedIndex;e(`#daPeriodText`).text(this.options[t].text),e(`#daCharts`).hide(),e(`#daLoading`).show(),e(`.da_sk_kpi, .da_sk_chart`).show(),setTimeout(()=>{T(e(this).val()),e(`#daCharts`).fadeIn(400),e(`.da_sk_kpi, .da_sk_chart`).hide(),e(`#daCharts canvas`).show().css(`display`,`block`)},300)}).on(`click.da`,`#daPeriodBtn`,function(t){t.stopPropagation(),e(`#daMesSelect`).toggle()}).on(`click.da`,function(t){e(t.target).closest(`#daPeriodBtn, #daMesSelect`).length||e(`#daMesSelect`).hide()})},O=()=>{i(),e(document).off(`.da`)};export{O as cleanup,D as init,E as render};