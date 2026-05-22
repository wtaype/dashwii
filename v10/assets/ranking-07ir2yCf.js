import{i as e}from"./vendor-CKz6wYoq.js";var t=[`Enero`,`Febrero`,`Marzo`,`Abril`,`Mayo`,`Junio`,`Julio`,`Agosto`,`Septiembre`,`Octubre`,`Noviembre`,`Diciembre`],n=new Date;`${n.getFullYear()}${String(n.getMonth()+1).padStart(2,`0`)}`;var r=[{nombre:`María López`,iniciales:`ML`,color:`#38bdf8`,desc:`Guía Senior`},{nombre:`Carlos Torres`,iniciales:`CT`,color:`#10b981`,desc:`Coordinador`},{nombre:`Ana Huamán`,iniciales:`AH`,color:`#f59e0b`,desc:`Guía Oficial`},{nombre:`Pedro Castillo`,iniciales:`PC`,color:`#8b5cf6`,desc:`Operador`},{nombre:`Lucía Fernández`,iniciales:`LF`,color:`#ef4444`,desc:`Guía Turístico`},{nombre:`Diego Quispe`,iniciales:`DQ`,color:`#06b6d4`,desc:`Asistente`},{nombre:`Rosa Mamani`,iniciales:`RM`,color:`#f97316`,desc:`Guía Bilingüe`},{nombre:`Jorge Paredes`,iniciales:`JP`,color:`#22c55e`,desc:`Coordinador`}];function i(e,t){return Math.floor(Math.random()*(t-e+1))+e}function a(){let e={};return r.forEach(t=>{let n=i(5,30),r=i(80,600),a=i(500,4e3);e[t.nombre]={...t,ventas:n,puntos:r,ganancia:a}}),Object.entries(e).sort((e,t)=>t[1].puntos-e[1].puntos)}var o=()=>`
  <div class="rk_page">
    <div class="rk_hero">
      <div class="rk_hero_left">
        <div class="rk_hero_icon"><i class="fas fa-trophy"></i></div>
        <div class="rk_hero_txt">
          <h1>Ranking</h1>
          <p>Clasificación del equipo · ${t[n.getMonth()]} ${n.getFullYear()}</p>
        </div>
      </div>
      <span style="font-size:var(--fz_s3);color:var(--tx3);font-weight:600;background:var(--bg);padding:0.6vh 1.5vh;border-radius:1vh">
        <i class="fas fa-users"></i> ${r.length} participantes
      </span>
    </div>

    <div class="rk_kpis" id="rkKpis">
      <div class="rk_kpi">
        <div class="rk_kpi_val" id="rkTotalPuntos">—</div>
        <div class="rk_kpi_lbl">Puntos Totales</div>
      </div>
      <div class="rk_kpi">
        <div class="rk_kpi_val" id="rkTotalVentas">—</div>
        <div class="rk_kpi_lbl">Ventas Totales</div>
      </div>
      <div class="rk_kpi">
        <div class="rk_kpi_val" id="rkTotalGanancia">—</div>
        <div class="rk_kpi_lbl">Ganancia Total</div>
      </div>
      <div class="rk_kpi">
        <div class="rk_kpi_val" id="rkPromedio">—</div>
        <div class="rk_kpi_lbl">Promedio Puntos</div>
      </div>
    </div>

    <div class="rk_podium" id="rkPodium"></div>

    <div class="rk_table_card">
      <div class="rk_table_head">
        <span><i class="fas fa-list"></i> Clasificación General</span>
        <span style="font-size:var(--fz_s3);color:var(--tx3);font-weight:600">${r.length} empleados</span>
      </div>
      <table class="rk_table">
        <thead><tr><th>#</th><th>Empleado</th><th>Ventas</th><th>Puntos</th><th>Ganancia</th><th>Rol</th></tr></thead>
        <tbody id="rkTableBody"></tbody>
      </table>
    </div>
  </div>`,s=()=>{let t=a(),n=t.reduce((e,[,t])=>e+t.puntos,0),r=t.reduce((e,[,t])=>e+t.ventas,0),i=t.reduce((e,[,t])=>e+t.ganancia,0),o=Math.round(n/t.length);l(`#rkTotalPuntos`,n),l(`#rkTotalVentas`,r),u(`#rkTotalGanancia`,i),l(`#rkPromedio`,o);let s=t.slice(0,3),c=[`🥇`,`🥈`,`🥉`],d=[`rk_pod_1`,`rk_pod_2`,`rk_pod_3`],f=s.map(([,e],t)=>`<div class="rk_pod_item ${d[t]}">
      <div class="rk_pod_avatar" style="background:${e.color}22;color:${e.color}">
        ${t===0?`<span class="rk_pod_crown">👑</span>`:``}
        ${e.iniciales}
      </div>
      <div class="rk_pod_name">${e.nombre.split(` `)[0]}</div>
      <div class="rk_pod_pts">${c[t]} ${e.puntos} pts</div>
      <div class="rk_pod_pedestal">${t+1}</div>
    </div>`).join(``);e(`#rkPodium`).html(f);let p=t.map(([,e],t)=>`<tr>
      <td><span class="rk_pos ${t===0?`rk_pos_1`:t===1?`rk_pos_2`:t===2?`rk_pos_3`:`rk_pos_n`}">${t+1}</span></td>
      <td><span class="rk_avatar_sm" style="background:${e.color}">${e.iniciales}</span>${e.nombre}</td>
      <td><strong>${e.ventas}</strong></td>
      <td><strong style="color:var(--Oro)">${e.puntos}</strong></td>
      <td>S/ ${e.ganancia.toFixed(2)}</td>
      <td><span style="font-size:var(--fz_s3);color:var(--tx3)">${e.desc}</span></td>
    </tr>`).join(``);e(`#rkTableBody`).html(p)},c=()=>{};function l(t,n){let r=0,i=Math.max(1,Math.floor(n/40)),a=setInterval(()=>{r+=i,r>=n?(e(t).text(n),clearInterval(a)):e(t).text(r)},20)}function u(t,n){let r=0,i=n/40,a=setInterval(()=>{r+=i,r>=n?(e(t).text(`S/ ${n.toFixed(2)}`),clearInterval(a)):e(t).text(`S/ ${r.toFixed(2)}`)},20)}export{c as cleanup,s as init,o as render};