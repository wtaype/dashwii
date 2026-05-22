import './analista.css';
import $ from 'jquery';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

let misGraficos = [];

function destruirGraficos() {
  misGraficos.forEach(g => { try { g.destroy(); } catch(e) {} });
  misGraficos = [];
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const tours = [
  'City Tour Cusco', 'Machu Picchu Clásico', 'Valle Sagrado', 'Montaña 7 Colores',
  'Laguna Humantay', 'Camino Inca 4D', 'Maras Moray', 'Rainbow Mountain',
  'Sacred Valley Premium', 'Machu Picchu + Huayna Picchu'
];

const vendedores = [
  { nombre: 'María López', iniciales: 'ML' },
  { nombre: 'Carlos Torres', iniciales: 'CT' },
  { nombre: 'Ana Huamán', iniciales: 'AH' },
  { nombre: 'Pedro Castillo', iniciales: 'PC' },
  { nombre: 'Lucía Fernández', iniciales: 'LF' },
  { nombre: 'Diego Quispe', iniciales: 'DQ' },
  { nombre: 'Rosa Mamani', iniciales: 'RM' },
  { nombre: 'Jorge Paredes', iniciales: 'JP' }
];

const pagos = ['Tarjeta', 'Efectivo', 'Yape', 'Plin', 'Transferencia'];

function generarVentasMock(cantidad = 200) {
  const ventas = [];
  const hoy = new Date();
  const anio = hoy.getFullYear();
  const mes = hoy.getMonth();
  const diasMes = new Date(anio, mes + 1, 0).getDate();

  for (let i = 0; i < cantidad; i++) {
    const dia = random(1, diasMes);
    const pax = random(1, 6);
    const precio = random(50, 450);
    const total = precio * pax;
    const pagoOp = random(10, 80);
    const puntos = random(5, 30) * pax;
    const vendedor = vendedores[random(0, vendedores.length - 1)];
    const tour = tours[random(0, tours.length - 1)];
    const pago = pagos[random(0, pagos.length - 1)];
    const estados = ['pagado', 'pagado', 'pagado', 'cobrar', 'cobrado'];
    const estado = estados[random(0, estados.length - 1)];
    const clientes = ['Juan Pérez', 'María García', 'Carlos Ruiz', 'Ana Torres', 'Luis Vega', 'Sofía Castro', 'Miguel Ríos', 'Elena Paz', 'José Díaz', 'Rita Oro'];

    ventas.push({
      id: `venta_${i}`,
      fecha: `${anio}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`,
      vendedor: vendedor.nombre,
      avatarIniciales: vendedor.iniciales,
      tour,
      cliente: clientes[random(0, clientes.length - 1)],
      pax,
      precioUnitario: precio,
      total,
      pagoOperador: pagoOp,
      ganancia: total - pagoOp,
      metodoPago: pago,
      estado,
      puntos
    });
  }
  ventas.sort((a, b) => b.fecha.localeCompare(a.fecha));
  return ventas;
}

const ventasMock = generarVentasMock(200);
const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const d = new Date();
const mesActual = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
const mesNombre = meses[d.getMonth()];

function filtrarMes(ventas, mes) {
  return ventas.filter(v => v.fecha.startsWith(mes));
}

function pintarKpis(ventas) {
  const hoy = new Date();
  const hoyStr = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`;
  let ventasHoy = 0, totalPax = 0, totalPuntos = 0, totalGanancia = 0;

  ventas.forEach(v => {
    totalPax += v.pax;
    totalPuntos += v.puntos;
    totalGanancia += v.ganancia;
    if (v.fecha === hoyStr) ventasHoy += v.pax;
  });

  animarNumero('#daValVentasHoy', ventasHoy);
  animarNumero('#daValToursMes', totalPax);
  animarNumero('#daValPuntosMes', totalPuntos);
  animarMoneda('#daValGanancia', totalGanancia);
}

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

function chartTheme() {
  const s = getComputedStyle(document.documentElement);
  return {
    tx: s.getPropertyValue('--tx1').trim() || '#000',
    tx3: s.getPropertyValue('--tx3').trim() || '#666',
    grid: s.getPropertyValue('--brd').trim() || '#ddd',
    mco: s.getPropertyValue('--mco').trim() || '#1978d7',
    bg4: s.getPropertyValue('--bg4').trim() || 'rgba(25,120,215,0.1)',
    wb: s.getPropertyValue('--wb').trim() || '#fff'
  };
}

function graficoLinea(ventas) {
  const dias = {};
  const hoy = new Date();
  for (let i = 29; i >= 0; i--) {
    const f = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - i);
    const k = `${f.getFullYear()}-${String(f.getMonth() + 1).padStart(2, '0')}-${String(f.getDate()).padStart(2, '0')}`;
    dias[k] = 0;
  }
  ventas.forEach(v => { if (dias[v.fecha] !== undefined) dias[v.fecha] += v.total; });
  const labels = Object.keys(dias).map(k => { const p = k.split('-'); return `${p[2]}/${p[1]}`; });
  const data = Object.values(dias);
  const ctx = document.getElementById('daChartLinea');
  if (!ctx) return;
  const t = chartTheme();
  misGraficos.push(new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Ingresos S/',
        data,
        borderColor: t.mco,
        backgroundColor: t.bg4,
        fill: true,
        tension: 0.35,
        pointRadius: 3,
        pointHoverRadius: 6,
        borderWidth: 2.5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: t.wb,
          titleColor: t.tx,
          bodyColor: t.tx,
          borderColor: t.grid,
          borderWidth: 1,
          callbacks: { label: ctx => `S/ ${ctx.raw.toFixed(2)}` }
        }
      },
      scales: {
        x: { grid: { color: t.grid }, ticks: { color: t.tx3, maxTicksLimit: 10, font: { size: 10 } } },
        y: { grid: { color: t.grid }, ticks: { color: t.tx3, callback: v => 'S/ ' + v } }
      },
      interaction: { intersect: false, mode: 'index' }
    }
  }));
}

function graficoTopTours(ventas) {
  const mapa = {};
  ventas.forEach(v => {
    if (!mapa[v.tour]) mapa[v.tour] = 0;
    mapa[v.tour] += v.pax;
  });
  const sorted = Object.entries(mapa).sort((a, b) => b[1] - a[1]).slice(0, 10);
  const labels = sorted.map(s => s[0].length > 22 ? s[0].slice(0, 22) + '…' : s[0]);
  const data = sorted.map(s => s[1]);
  const ctx = document.getElementById('daChartBarras');
  if (!ctx) return;
  const t = chartTheme();
  misGraficos.push(new Chart(ctx, {
    type: 'bar',
    data: {
      labels, datasets: [{
        label: 'PAX',
        data,
        backgroundColor: Array(sorted.length).fill(t.bg4),
        borderColor: Array(sorted.length).fill(t.mco),
        borderWidth: 1.5,
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: t.grid }, ticks: { color: t.tx3 } },
        y: { grid: { display: false }, ticks: { color: t.tx, font: { size: 10 } } }
      }
    }
  }));
}

function graficoPastel(ventas) {
  const mapa = { Tarjeta: 0, Efectivo: 0, Yape: 0, Plin: 0, Transferencia: 0 };
  ventas.forEach(v => {
    if (mapa[v.metodoPago] !== undefined) mapa[v.metodoPago] += v.total;
  });
  const labels = Object.keys(mapa).filter(k => mapa[k] > 0);
  const data = labels.map(k => mapa[k]);
  const colors = ['#38bdf8', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];
  const ctx = document.getElementById('daChartPastel');
  if (!ctx) return;
  const t = chartTheme();
  misGraficos.push(new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels, datasets: [{ data, backgroundColor: colors.slice(0, labels.length), borderWidth: 2, borderColor: t.wb }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { color: t.tx, padding: 12, font: { size: 11 }, usePointStyle: true } },
        tooltip: { callbacks: { label: ctx => `${ctx.label}: S/ ${ctx.raw.toFixed(2)}` } }
      }
    }
  }));
}

function graficoRanking(ventas) {
  const mapa = {};
  ventas.forEach(v => {
    if (!mapa[v.vendedor]) mapa[v.vendedor] = { puntos: 0, ventas: 0 };
    mapa[v.vendedor].puntos += v.puntos;
    mapa[v.vendedor].ventas += v.pax;
  });
  const sorted = Object.entries(mapa).sort((a, b) => b[1].puntos - a[1].puntos).slice(0, 10);
  const labels = sorted.map(s => s[0].length > 18 ? s[0].slice(0, 18) + '…' : s[0]);
  const data = sorted.map(s => s[1].puntos);
  const ctx = document.getElementById('daChartRanking');
  if (!ctx) return;
  const t = chartTheme();
  const bgColors = data.map((_, i) => i === 0 ? 'rgba(255,218,52,0.2)' : t.bg4);
  const bdColors = data.map((_, i) => i === 0 ? '#FFDA34' : t.mco);
  misGraficos.push(new Chart(ctx, {
    type: 'bar',
    data: {
      labels, datasets: [{
        label: 'Puntos',
        data,
        backgroundColor: bgColors,
        borderColor: bdColors,
        borderWidth: 1.5,
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: t.grid }, ticks: { color: t.tx3 } },
        y: { grid: { display: false }, ticks: { color: t.tx, font: { size: 10 } } }
      }
    }
  }));
}


function pintarTabla(ventas) {
  const top = ventas.slice(0, 20);
  if (!top.length) {
    $('#daTableBody').html(`<tr><td colspan="7" class="da_empty"><i class="fas fa-inbox"></i><p>Sin datos este mes</p></td></tr>`);
    return;
  }
  const html = top.map(v => {
    const badgeCls = v.estado === 'pagado' || v.estado === 'cobrado' ? 'da_status_pagado' : 'da_status_deuda';
    const badgeTxt = v.estado === 'pagado' || v.estado === 'cobrado' ? 'Pagado' : 'Deuda';
    const f = v.fecha.split('-');
    return `<tr>
      <td>${f[2]}/${f[1]}/${f[0]}</td>
      <td><span class="da_avatar_sm">${v.avatarIniciales}</span>${v.vendedor}</td>
      <td><span class="da_tour_pill">${v.tour}</span></td>
      <td>${v.cliente}</td>
      <td class="da_amount">S/ ${v.total.toFixed(2)}</td>
      <td><span class="da_status ${badgeCls}">${badgeTxt}</span></td>
      <td><strong>${v.puntos}</strong> pts</td>
    </tr>`;
  }).join('');
  $('#daTableBody').html(html);
  $('#daTableCount').text(`${top.length} registros`);
}

function cargarDashboard(mes) {
  destruirGraficos();
  const ventas = filtrarMes(ventasMock, mes);
  pintarKpis(ventas);
  setTimeout(() => {
    graficoLinea(ventas);
    graficoTopTours(ventas);
    graficoPastel(ventas);
    graficoRanking(ventas);
  }, 50);
  pintarTabla(ventas);
  $('#daLoading').fadeOut(300);
}

export const render = () => `
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
        <span id="daPeriodText">${mesNombre} ${d.getFullYear()}</span>
        <select id="daMesSelect" style="display:none">
          ${Array.from({length: 12}, (_, i) => {
            const f = new Date(d.getFullYear(), d.getMonth() - i, 1);
            const val = `${f.getFullYear()}-${String(f.getMonth() + 1).padStart(2, '0')}`;
            const lbl = `${meses[f.getMonth()]} ${f.getFullYear()}`;
            return `<option value="${val}"${i === 0 ? ' selected' : ''}>${lbl}</option>`;
          }).join('')}
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
        <div class="da_kpi_sub">PAX vendidos en ${mesNombre}</div>
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
  </div>`;

export const init = () => {
  $('#daLoading').show();
  $('#daCharts').hide();

  setTimeout(() => {
    const mesSel = $('#daMesSelect').val() || mesActual;
    cargarDashboard(mesSel);
    $('#daCharts').fadeIn(400);
    $('.da_sk_kpi, .da_sk_chart').hide();
    $('#daCharts canvas').show().css('display', 'block');
  }, 600);

  $(document).off('.da').on('change.da', '#daMesSelect', function() {
    const idx = this.selectedIndex;
    $('#daPeriodText').text(this.options[idx].text);
    $('#daCharts').hide();
    $('#daLoading').show();
    $('.da_sk_kpi, .da_sk_chart').show();
    setTimeout(() => {
      cargarDashboard($(this).val());
      $('#daCharts').fadeIn(400);
      $('.da_sk_kpi, .da_sk_chart').hide();
      $('#daCharts canvas').show().css('display', 'block');
    }, 300);
  }).on('click.da', '#daPeriodBtn', function(e) {
    e.stopPropagation();
    $('#daMesSelect').toggle();
  }).on('click.da', function(e) {
    if (!$(e.target).closest('#daPeriodBtn, #daMesSelect').length) $('#daMesSelect').hide();
  });
};

export const cleanup = () => {
  destruirGraficos();
  $(document).off('.da');
};
