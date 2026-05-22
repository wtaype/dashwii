import './productos.css';
import $ from 'jquery';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

let chart = null;
const d = new Date();
const mesActual = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;

const listadoTours = [
  { id: 1, tour: 'City Tour Cusco', precio: 65, puntos: 10, comision: 5, pax: 280, ico: 'fa-landmark', color: '#38bdf8', desc: 'Recorrido por los 4 ruinas cercanas a Cusco' },
  { id: 2, tour: 'Machu Picchu Clásico', precio: 180, puntos: 25, comision: 15, pax: 220, ico: 'fa-mountain', color: '#10b981', desc: 'La maravilla del mundo en un día' },
  { id: 3, tour: 'Valle Sagrado', precio: 120, puntos: 18, comision: 10, pax: 190, ico: 'fa-tree', color: '#f59e0b', desc: 'Pisac, Urubamba, Ollantaytambo y Chinchero' },
  { id: 4, tour: 'Montaña 7 Colores', precio: 95, puntos: 15, comision: 8, pax: 160, ico: 'fa-palette', color: '#8b5cf6', desc: 'Trekking al Vinicunca' },
  { id: 5, tour: 'Laguna Humantay', precio: 110, puntos: 16, comision: 9, pax: 145, ico: 'fa-water', color: '#06b6d4', desc: 'Laguna turquesa a los pies del nevado' },
  { id: 6, tour: 'Camino Inca 4D', precio: 450, puntos: 50, comision: 30, pax: 60, ico: 'fa-hiking', color: '#ef4444', desc: 'La caminata clásica a Machu Picchu' },
  { id: 7, tour: 'Maras Moray', precio: 85, puntos: 12, comision: 6, pax: 200, ico: 'fa-cube', color: '#f97316', desc: 'Salineras y laboratorio agrícola inca' },
  { id: 8, tour: 'Montaña Putucusi', precio: 75, puntos: 11, comision: 5, pax: 90, ico: 'fa-leaf', color: '#22c55e', desc: 'Subida gratuita con vista panorámica' },
  { id: 9, tour: 'Museo de Sitio Koricancha', precio: 55, puntos: 8, comision: 4, pax: 130, ico: 'fa-gem', color: '#a855f7', desc: 'Templo del Sol y museo' },
  { id: 10, tour: 'Rafting Urubamba', precio: 130, puntos: 20, comision: 12, pax: 75, ico: 'fa-water-ladder', color: '#0ea5e9', desc: 'Aventura en los rápidos del río sagrado' }
];

function rand(min, max) { return Math.floor(Math.random()*(max-min+1))+min; }

function generarVentas() {
  const ventas = [];
  const diasMes = new Date(d.getFullYear(), d.getMonth()+1, 0).getDate();
  for (let i = 0; i < 200; i++) {
    const t = listadoTours[rand(0, listadoTours.length-1)];
    const pax = rand(1, 6);
    ventas.push({
      fecha: `${mesActual}-${String(rand(1, diasMes)).padStart(2,'0')}`,
      tour: t.tour,
      pax,
      total: t.precio * pax,
      ganancia: (t.precio - t.comision) * pax
    });
  }
  return ventas;
}

function filtrarMes(ventas, mes) { return ventas.filter(v => v.fecha.startsWith(mes)); }

export const render = () => `
  <div class="pr_page">
    <div class="pr_hero">
      <div class="pr_hero_left">
        <div class="pr_hero_icon"><i class="fas fa-box"></i></div>
        <div class="pr_hero_txt">
          <h1>Productos</h1>
          <p>Catálogo de tours · ${listadoTours.length} productos activos</p>
        </div>
      </div>
      <span style="font-size:var(--fz_s3);color:var(--tx3);font-weight:600;background:var(--bg);padding:0.6vh 1.5vh;border-radius:1vh">
        <i class="fas fa-calendar"></i> ${meses[d.getMonth()]} ${d.getFullYear()}
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
  </div>`;

const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

export const init = () => {
  const ventas = filtrarMes(generarVentas(), mesActual);
  const totalPax = ventas.reduce((s, v) => s + v.pax, 0);
  const totalRev = ventas.reduce((s, v) => s + v.total, 0);
  const mapaTours = {};
  ventas.forEach(v => {
    if (!mapaTours[v.tour]) mapaTours[v.tour] = { pax: 0, rev: 0 };
    mapaTours[v.tour].pax += v.pax;
    mapaTours[v.tour].rev += v.total;
  });

  const sorted = Object.entries(mapaTours).sort((a, b) => b[1].pax - a[1].pax);
  const topTour = sorted.length ? sorted[0][0] : '—';
  const precios = listadoTours.map(t => t.precio);
  const precioProm = precios.reduce((s, p) => s + p, 0) / precios.length;

  animarNumero('#prTotalVentas', totalPax);
  animarMoneda('#prRevenue', totalRev);
  $('#prTopTour').text(topTour.length > 20 ? topTour.slice(0,20)+'…' : topTour);
  $('#prPrecioProm').text(`S/ ${precioProm.toFixed(0)}`);

  const cardsHtml = listadoTours.map(t => {
    const vendidos = mapaTours[t.tour]?.pax || 0;
    return `<div class="pr_card">
      <div class="pr_card_top">
        <div class="pr_card_ico" style="background:${t.color}22;color:${t.color}"><i class="fas ${t.ico}"></i></div>
        <span class="pr_card_badge" style="background:${t.color}22;color:${t.color}">${vendidos} PAX</span>
      </div>
      <div class="pr_card_body">
        <div class="pr_card_name">${t.tour}</div>
        <p style="font-size:var(--fz_s4);color:var(--tx3);margin:0 0 1.5vh 0">${t.desc}</p>
        <div class="pr_card_meta">
          <div class="pr_card_meta_item">
            <div class="pr_card_meta_val" style="color:var(--mco)">S/ ${t.precio}</div>
            <div class="pr_card_meta_lbl">Precio</div>
          </div>
          <div class="pr_card_meta_item">
            <div class="pr_card_meta_val" style="color:var(--Oro)">${t.puntos} pts</div>
            <div class="pr_card_meta_lbl">Puntos</div>
          </div>
          <div class="pr_card_meta_item">
            <div class="pr_card_meta_val" style="color:var(--Paz)">S/ ${t.comision}</div>
            <div class="pr_card_meta_lbl">Comisión</div>
          </div>
          <div class="pr_card_meta_item">
            <div class="pr_card_meta_val" style="color:var(--Cielo)">${t.pax} PAX</div>
            <div class="pr_card_meta_lbl">Capacidad</div>
          </div>
        </div>
      </div>
    </div>`;
  }).join('');
  $('#prGrid').html(cardsHtml);

  const ctx = document.getElementById('prChart');
  if (!ctx) return;
  if (chart) chart.destroy();
  const s = getComputedStyle(document.documentElement);
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sorted.map(s => s[0].length > 18 ? s[0].slice(0,18)+'…' : s[0]),
      datasets: [{
        label: 'PAX Vendidos',
        data: sorted.map(s => s[1].pax),
        backgroundColor: listadoTours.map(t => `${t.color}33`),
        borderColor: listadoTours.map(t => t.color),
        borderWidth: 1.5,
        borderRadius: 4
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, indexAxis: 'y',
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: s.getPropertyValue('--brd').trim() }, ticks: { color: s.getPropertyValue('--tx3').trim() } },
        y: { grid: { display: false }, ticks: { color: s.getPropertyValue('--tx').trim(), font: { size: 10 } } }
      }
    }
  });
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

function animarMoneda(sel, objetivo) {
  let actual = 0;
  const paso = objetivo / 40;
  const id = setInterval(() => {
    actual += paso;
    if (actual >= objetivo) { $(sel).text(`S/ ${objetivo.toFixed(2)}`); clearInterval(id); }
    else $(sel).text(`S/ ${actual.toFixed(2)}`);
  }, 20);
}
