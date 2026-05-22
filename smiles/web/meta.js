import './meta.css';
import $ from 'jquery';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

let chart = null;
const META = 2500;
const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const d = new Date();
const mesActual = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;

const vendedores = ['María López','Carlos Torres','Ana Huamán','Pedro Castillo','Lucía Fernández','Diego Quispe','Rosa Mamani','Jorge Paredes'];
const tours = ['City Tour Cusco','Machu Picchu Clásico','Valle Sagrado','Montaña 7 Colores','Laguna Humantay','Camino Inca 4D','Maras Moray','Rainbow Mountain'];

function rand(min, max) { return Math.floor(Math.random()*(max-min+1))+min; }

function generarVentas() {
  const ventas = [];
  const diasMes = new Date(d.getFullYear(), d.getMonth()+1, 0).getDate();
  for (let i = 0; i < 150; i++) {
    const dia = rand(1, diasMes);
    const pax = rand(1, 5);
    ventas.push({
      fecha: `${mesActual}-${String(dia).padStart(2,'0')}`,
      vendedor: vendedores[rand(0, vendedores.length-1)],
      tour: tours[rand(0, tours.length-1)],
      pax,
      puntos: rand(8, 28) * pax,
      total: rand(80, 400) * pax
    });
  }
  return ventas;
}

function filtrarMes(ventas, mes) { return ventas.filter(v => v.fecha.startsWith(mes)); }

export const render = () => {
  const diasMes = new Date(d.getFullYear(), d.getMonth()+1, 0).getDate();
  return `
  <div class="me_page">
    <div class="me_hero">
      <div class="me_hero_left">
        <div class="me_hero_icon"><i class="fas fa-bullseye"></i></div>
        <div class="me_hero_txt">
          <h1>Meta del Mes</h1>
          <p>Seguimiento de objetivos · ${META} pts mensuales</p>
        </div>
      </div>
      <span style="font-size:var(--fz_s3);color:var(--tx3);font-weight:600;background:var(--bg);padding:0.6vh 1.5vh;border-radius:1vh">
        <i class="fas fa-calendar"></i> ${diasMes} días · ${meses[d.getMonth()]} ${d.getFullYear()}
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
  </div>`;
};

export const init = () => {
  const ventas = filtrarMes(generarVentas(), mesActual);
  const totalPuntos = ventas.reduce((s, v) => s + v.puntos, 0);
  const diasMes = new Date(d.getFullYear(), d.getMonth()+1, 0).getDate();
  const diaHoy = d.getDate();
  const diasRest = diasMes - diaHoy;
  const pct = Math.min(Math.round((totalPuntos / META) * 100), 100);
  const faltan = Math.max(META - totalPuntos, 0);
  const ptsDia = diasRest > 0 ? Math.ceil(faltan / diasRest) : 0;

  const circ = document.getElementById('meRingFg');
  const perim = 2 * Math.PI * 52;
  const offset = perim - (pct / 100) * perim;
  setTimeout(() => { circ.style.strokeDashoffset = offset; }, 100);

  animarNumero('#mePuntosActuales', totalPuntos);
  animarNumero('#mePuntosFaltan', faltan);
  animarNumero('#meDiasRestantes', diasRest);
  $('#mePuntosDia').text(ptsDia);
  $('#meRingPct').text(`${pct}%`);

  const progreso = [];
  let acum = 0;
  for (let i = 1; i <= Math.min(diaHoy, 31); i++) {
    const diaVentas = ventas.filter(v => parseInt(v.fecha.split('-')[2]) === i);
    acum += diaVentas.reduce((s, v) => s + v.puntos, 0);
    progreso.push(acum);
  }
  const labels = progreso.map((_, i) => `${i+1}`);
  const metaLinea = progreso.map((_, i) => (META / diasMes) * (i+1));

  const ctx = document.getElementById('meChartLinea');
  if (!ctx) return;
  if (chart) chart.destroy();
  const s = getComputedStyle(document.documentElement);
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        { label: 'Puntos Reales', data: progreso, borderColor: s.getPropertyValue('--mco').trim() || '#1978d7', backgroundColor: s.getPropertyValue('--bg4').trim() || 'rgba(25,120,215,0.1)', fill: true, tension: 0.3, pointRadius: 3, borderWidth: 2.5 },
        { label: 'Meta Proyectada', data: metaLinea, borderColor: '#FFDA34', borderDash: [6, 4], pointRadius: 0, borderWidth: 2.5, fill: false }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { color: s.getPropertyValue('--tx').trim(), font: { size: 11 }, usePointStyle: true } },
        tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: ${ctx.raw} pts` } }
      },
      scales: {
        x: { grid: { color: s.getPropertyValue('--brd').trim() }, ticks: { color: s.getPropertyValue('--tx3').trim(), font: { size: 10 } } },
        y: { grid: { color: s.getPropertyValue('--brd').trim() }, ticks: { color: s.getPropertyValue('--tx3').trim() } }
      },
      interaction: { intersect: false, mode: 'index' }
    }
  });

  const daily = [];
  for (let i = Math.max(1, diaHoy - 9); i <= diaHoy; i++) {
    const diaVentas = ventas.filter(v => parseInt(v.fecha.split('-')[2]) === i);
    const pts = diaVentas.reduce((s, v) => s + v.puntos, 0);
    daily.push({ dia: i, pts, acum: (daily.length ? daily[daily.length-1].acum : 0) + pts });
  }
  const metaDiaria = META / diasMes;
  const html = daily.map(d => {
    const pctBar = Math.min((d.acum / (metaDiaria * d.dia)) * 100, 100);
    return `<tr>
      <td><strong>Día ${d.dia}</strong></td>
      <td>${d.pts} pts</td>
      <td><strong>${d.acum}</strong></td>
      <td>${d.acum >= metaDiaria * d.dia ? '<span style="color:var(--success)">✓ Meta cumplida</span>' : `<span style="color:var(--warning)">${Math.round(metaDiaria * d.dia - d.acum)} pts atrás</span>`}</td>
      <td><div class="me_bar_tiny"><div class="me_bar_tiny_fill" style="width:${Math.min(pctBar,100)}%"></div></div></td>
    </tr>`;
  }).join('');
  $('#meDailyBody').html(html);
};

export const cleanup = () => {
  if (chart) { chart.destroy(); chart = null; }
};

function animarNumero(sel, objetivo) {
  let actual = 0;
  const paso = Math.max(1, Math.floor(objetivo / 40));
  const id = setInterval(() => {
    actual += paso;
    if (actual >= objetivo) { $(sel).text(objetivo); clearInterval(id); }
    else $(sel).text(actual);
  }, 20);
}
