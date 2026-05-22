import './ranking.css';
import $ from 'jquery';

const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const d = new Date();
const mesActual = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;

const empleados = [
  { nombre: 'María López', iniciales: 'ML', color: '#38bdf8', desc: 'Guía Senior' },
  { nombre: 'Carlos Torres', iniciales: 'CT', color: '#10b981', desc: 'Coordinador' },
  { nombre: 'Ana Huamán', iniciales: 'AH', color: '#f59e0b', desc: 'Guía Oficial' },
  { nombre: 'Pedro Castillo', iniciales: 'PC', color: '#8b5cf6', desc: 'Operador' },
  { nombre: 'Lucía Fernández', iniciales: 'LF', color: '#ef4444', desc: 'Guía Turístico' },
  { nombre: 'Diego Quispe', iniciales: 'DQ', color: '#06b6d4', desc: 'Asistente' },
  { nombre: 'Rosa Mamani', iniciales: 'RM', color: '#f97316', desc: 'Guía Bilingüe' },
  { nombre: 'Jorge Paredes', iniciales: 'JP', color: '#22c55e', desc: 'Coordinador' }
];

const tours = ['City Tour Cusco','Machu Picchu Clásico','Valle Sagrado','Montaña 7 Colores','Laguna Humantay','Camino Inca 4D','Maras Moray','Rainbow Mountain'];

function rand(min, max) { return Math.floor(Math.random()*(max-min+1))+min; }

function generarRanking() {
  const mapa = {};
  empleados.forEach(e => {
    const ventas = rand(5, 30);
    const puntos = rand(80, 600);
    const ganancia = rand(500, 4000);
    mapa[e.nombre] = { ...e, ventas, puntos, ganancia };
  });
  return Object.entries(mapa).sort((a, b) => b[1].puntos - a[1].puntos);
}

export const render = () => `
  <div class="rk_page">
    <div class="rk_hero">
      <div class="rk_hero_left">
        <div class="rk_hero_icon"><i class="fas fa-trophy"></i></div>
        <div class="rk_hero_txt">
          <h1>Ranking</h1>
          <p>Clasificación del equipo · ${meses[d.getMonth()]} ${d.getFullYear()}</p>
        </div>
      </div>
      <span style="font-size:var(--fz_s3);color:var(--tx3);font-weight:600;background:var(--bg);padding:0.6vh 1.5vh;border-radius:1vh">
        <i class="fas fa-users"></i> ${empleados.length} participantes
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
        <span style="font-size:var(--fz_s3);color:var(--tx3);font-weight:600">${empleados.length} empleados</span>
      </div>
      <table class="rk_table">
        <thead><tr><th>#</th><th>Empleado</th><th>Ventas</th><th>Puntos</th><th>Ganancia</th><th>Rol</th></tr></thead>
        <tbody id="rkTableBody"></tbody>
      </table>
    </div>
  </div>`;

export const init = () => {
  const ranking = generarRanking();
  const totalPts = ranking.reduce((s, [, e]) => s + e.puntos, 0);
  const totalVen = ranking.reduce((s, [, e]) => s + e.ventas, 0);
  const totalGan = ranking.reduce((s, [, e]) => s + e.ganancia, 0);
  const prom = Math.round(totalPts / ranking.length);

  animarNumero('#rkTotalPuntos', totalPts);
  animarNumero('#rkTotalVentas', totalVen);
  animarMoneda('#rkTotalGanancia', totalGan);
  animarNumero('#rkPromedio', prom);

  const top3 = ranking.slice(0, 3);
  const medals = ['🥇', '🥈', '🥉'];
  const cls = ['rk_pod_1', 'rk_pod_2', 'rk_pod_3'];
  const podiumHtml = top3.map(([, e], i) => {
    const pos = cls[i];
    return `<div class="rk_pod_item ${pos}">
      <div class="rk_pod_avatar" style="background:${e.color}22;color:${e.color}">
        ${i === 0 ? '<span class="rk_pod_crown">👑</span>' : ''}
        ${e.iniciales}
      </div>
      <div class="rk_pod_name">${e.nombre.split(' ')[0]}</div>
      <div class="rk_pod_pts">${medals[i]} ${e.puntos} pts</div>
      <div class="rk_pod_pedestal">${i + 1}</div>
    </div>`;
  }).join('');
  $('#rkPodium').html(podiumHtml);

  const rowsHtml = ranking.map(([, e], i) => {
    const posCls = i === 0 ? 'rk_pos_1' : i === 1 ? 'rk_pos_2' : i === 2 ? 'rk_pos_3' : 'rk_pos_n';
    return `<tr>
      <td><span class="rk_pos ${posCls}">${i + 1}</span></td>
      <td><span class="rk_avatar_sm" style="background:${e.color}">${e.iniciales}</span>${e.nombre}</td>
      <td><strong>${e.ventas}</strong></td>
      <td><strong style="color:var(--Oro)">${e.puntos}</strong></td>
      <td>S/ ${e.ganancia.toFixed(2)}</td>
      <td><span style="font-size:var(--fz_s3);color:var(--tx3)">${e.desc}</span></td>
    </tr>`;
  }).join('');
  $('#rkTableBody').html(rowsHtml);
};

export const cleanup = () => {};

function animarNumero(sel, objetivo) {
  let actual = 0;
  const paso = Math.max(1, Math.floor(objetivo / 40));
  const id = setInterval(() => {
    actual += paso;
    if (actual >= objetivo) { $(sel).text(objetivo); clearInterval(id); }
    else $(sel).text(actual);
  }, 20);
}

function animarMoneda(sel, objetivo) {
  let actual = 0;
  const paso = objetivo / 40;
  const id = setInterval(() => {
    actual += paso;
    if (actual >= objetivo) { $(sel).text(`S/ ${objetivo.toFixed(2)}`); clearInterval(id); }
    else $(sel).text(`S/ ${actual.toFixed(2)}`);
  }, 20);
}
