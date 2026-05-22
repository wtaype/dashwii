import './tablero.css';
import $ from 'jquery';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

let charts = [];
const d = new Date();
const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const mesActual = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;

const tours = ['City Tour','MP Clásico','Valle Sagrado','7 Colores','Humantay','Camino Inca','Maras Moray'];
const destinos = ['Cusco','Valle Sagrado','Machu Picchu','Arequipa','Puno','Lima','Iquitos'];

function rand(min, max) { return Math.floor(Math.random()*(max-min+1))+min; }

function generarActividad() {
  const act = [];
  const dias = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
  for (let i = 0; i < 14; i++) {
    act.push({
      dia: dias[rand(0, 6)],
      hora: `${String(rand(8, 18)).padStart(2,'0')}:${String(rand(0,5)*10).padStart(2,'0')}`,
      evento: tours[rand(0, tours.length-1)],
      cliente: `${['Juan','María','Carlos','Ana','Pedro','Lucía','Diego'][rand(0,6)]} ${['García','Torres','Huamán','Quispe','Paredes'][rand(0,4)]}`,
      pax: rand(1, 6),
      tipo: ['Reserva','Check-in','Check-out','Cancelación','Reagendado'][rand(0,4)],
      color: ['#38bdf8','#10b981','#f59e0b','#8b5cf6','#ef4444','#06b6d4','#22c55e'][rand(0,6)]
    });
  }
  return act;
}

const diasSemanaData = {
  labels: ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'],
  data: [rand(15, 35), rand(18, 40), rand(20, 38), rand(22, 42), rand(30, 55), rand(40, 70), rand(25, 45)]
};

const destinosData = {
  labels: destinos,
  data: destinos.map(() => rand(5, 30))
};

export const render = () => `
  <div class="tb_page">
    <div class="tb_hero">
      <div class="tb_hero_left">
        <div class="tb_hero_icon"><i class="fas fa-th-large"></i></div>
        <div class="tb_hero_txt">
          <h1>Tablero</h1>
          <p>Vista rápida · ${meses[d.getMonth()]} ${d.getFullYear()}</p>
        </div>
      </div>
      <span style="font-size:var(--fz_s3);color:var(--tx3);font-weight:600;background:var(--bg);padding:0.6vh 1.5vh;border-radius:1vh">
        <i class="fas fa-clock"></i> ${new Date().toLocaleDateString('es-PE', {weekday:'long', day:'numeric', month:'long'})}
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
  </div>`;

export const init = () => {
  const s = getComputedStyle(document.documentElement);

  const act = generarActividad();
  const activityHtml = act.slice(0, 8).map(a => `
    <div class="tb_act_item">
      <div class="tb_act_dot" style="background:${a.color}"></div>
      <div class="tb_act_info">
        <div class="tb_act_title">${a.evento}</div>
        <div class="tb_act_sub">${a.cliente} · ${a.pax} pax</div>
      </div>
      <div style="font-size:var(--fz_s2);color:var(--tx3);font-weight:600;background:var(--bg4);padding:0.2vh 1vh;border-radius:0.6vh">${a.tipo}</div>
      <div class="tb_act_time">${a.dia} ${a.hora}</div>
    </div>
  `).join('');
  $('#tbActivity').html(activityHtml);

  animarNumero('#tbReservasHoy', rand(8, 25));
  animarNumero('#tbPaxHoy', rand(20, 80));
  animarMoneda('#tbRevenueHoy', rand(2000, 9000));
  animarNumero('#tbPorConfirmar', rand(2, 12));

  const ctx1 = document.getElementById('tbChartSemana');
  if (ctx1) {
    const c1 = new Chart(ctx1, {
      type: 'line',
      data: {
        labels: diasSemanaData.labels,
        datasets: [{
          label: 'PAX',
          data: diasSemanaData.data,
          borderColor: '#38bdf8',
          backgroundColor: 'rgba(56,189,248,0.08)',
          fill: true,
          tension: 0.3,
          pointBackgroundColor: '#38bdf8',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: s.getPropertyValue('--tx3').trim() } },
          y: { grid: { color: s.getPropertyValue('--brd').trim() }, ticks: { color: s.getPropertyValue('--tx3').trim() }, beginAtZero: true }
        }
      }
    });
    charts.push(c1);
  }

  const ctx2 = document.getElementById('tbChartDestinos');
  if (ctx2) {
    const c2 = new Chart(ctx2, {
      type: 'doughnut',
      data: {
        labels: destinosData.labels,
        datasets: [{
          data: destinosData.data,
          backgroundColor: ['#38bdf8','#10b981','#f59e0b','#8b5cf6','#ef4444','#06b6d4','#22c55e'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
          legend: { position: 'bottom', labels: { color: s.getPropertyValue('--tx').trim(), font: { size: 10 }, padding: 12 } }
        }
      }
    });
    charts.push(c2);
  }
};

export const cleanup = () => {
  charts.forEach(c => c.destroy());
  charts = [];
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

function animarMoneda(sel, objetivo) {
  let actual = 0;
  const paso = objetivo / 40;
  const id = setInterval(() => {
    actual += paso;
    if (actual >= objetivo) { $(sel).text(`S/ ${objetivo.toFixed(2)}`); clearInterval(id); }
    else $(sel).text(`S/ ${actual.toFixed(2)}`);
  }, 20);
}
