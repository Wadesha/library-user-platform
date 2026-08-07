// ============================================================
// 渲染逻辑 —— 图书馆用户研究与服务平台原型
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  // 顶部 meta
  document.getElementById("meta-title").textContent = SIM.meta.title;
  document.getElementById("meta-sub").textContent = SIM.meta.subtitle;
  document.getElementById("meta-sample").textContent = "样本 " + SIM.meta.sample.toLocaleString();
  document.getElementById("meta-updated").textContent = SIM.meta.updated;

  // 导航切换
  const navBtns = document.querySelectorAll(".nav-btn");
  navBtns.forEach((b) => {
    b.addEventListener("click", () => {
      navBtns.forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
      document.getElementById("view-" + b.dataset.view).classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  renderKPI();
  renderTrend();
  renderDonut();
  renderPersonas();
  renderRadarSwitch();
  renderRadar("study");
  renderAxisList();
  renderPainBars();
  renderHeatmap();
  renderMethods();
  renderSurveyFrame();
  renderCollabLayers();
  renderRoomBoard();
  renderTimeline();
  renderMetrics();

  // ---------- KPI ----------
  function renderKPI() {
    const grid = document.getElementById("kpi-grid");
    grid.innerHTML = SIM.kpis.map((k) => `
      <div class="kpi">
        <div class="label">${k.label}</div>
        <div class="value">${k.value}<span class="unit">${k.unit}</span></div>
        <div class="delta">${k.delta}</div>
        <div class="note">${k.note}</div>
      </div>`).join("");
  }

  // ---------- 趋势折线/柱状 ----------
  function renderTrend() {
    const svg = document.getElementById("trend-chart");
    const W = 520, H = 260, pad = 36;
    const t = SIM.trend;
    const n = t.quarters.length;
    const xStep = (W - pad * 2) / (n - 1);
    const maxSat = 100, maxFb = Math.max(...t.feedback) * 1.15;
    let s = "";
    // 满意度折线
    const satPts = t.satisfaction.map((v, i) => [pad + i * xStep, H - pad - (v / maxSat) * (H - pad * 2)]);
    const fbPts = t.feedback.map((v, i) => [pad + i * xStep, H - pad - (v / maxFb) * (H - pad * 2)]);
    // 轴
    s += `<line x1="${pad}" y1="${H - pad}" x2="${W - pad}" y2="${H - pad}" stroke="#e5e7eb"/>`;
    t.quarters.forEach((q, i) => {
      s += `<text x="${pad + i * xStep}" y="${H - pad + 16}" font-size="10" fill="#6b7280" text-anchor="middle">${q}</text>`;
    });
    // 反馈柱
    fbPts.forEach((p, i) => {
      const bw = 14;
      const top = p[1];
      const h = (H - pad) - top;
      s += `<rect x="${p[0] - bw / 2}" y="${top}" width="${bw}" height="${h}" rx="3" fill="#ea580c" opacity="0.75"/>`;
    });
    // 满意度折线
    const linePath = satPts.map((p, i) => (i ? "L" : "M") + p[0] + " " + p[1]).join(" ");
    s += `<path d="${linePath}" fill="none" stroke="#0891b2" stroke-width="2.5"/>`;
    satPts.forEach((p, i) => {
      s += `<circle cx="${p[0]}" cy="${p[1]}" r="3.5" fill="#0891b2"/>`;
      s += `<text x="${p[0]}" y="${p[1] - 8}" font-size="9" fill="#0891b2" text-anchor="middle">${t.satisfaction[i]}</text>`;
    });
    svg.innerHTML = s;
  }

  // ---------- 环形图（用户构成） ----------
  function renderDonut() {
    const svg = document.getElementById("donut-chart");
    const cx = 130, cy = 130, r = 92, sw = 26;
    const total = SIM.personas.reduce((a, p) => a + p.percentage, 0);
    let angle = -90;
    let s = "";
    SIM.personas.forEach((p) => {
      const frac = p.percentage / total;
      const a2 = angle + frac * 360;
      const large = frac > 0.5 ? 1 : 0;
      const x1 = cx + r * Math.cos((angle * Math.PI) / 180);
      const y1 = cy + r * Math.sin((angle * Math.PI) / 180);
      const x2 = cx + r * Math.cos((a2 * Math.PI) / 180);
      const y2 = cy + r * Math.sin((a2 * Math.PI) / 180);
      s += `<path d="M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}" fill="none" stroke="${p.color}" stroke-width="${sw}" stroke-linecap="butt"/>`;
      angle = a2;
    });
    s += `<text x="${cx}" y="${cy - 6}" font-size="22" font-weight="800" text-anchor="middle" fill="#1f2933">7 类</text>`;
    s += `<text x="${cx}" y="${cy + 14}" font-size="11" text-anchor="middle" fill="#6b7280">用户群体</text>`;
    svg.innerHTML = s;
    document.getElementById("donut-legend").innerHTML = SIM.personas
      .map((p) => `<span><i class="dot" style="background:${p.color}"></i>${p.name} ${p.percentage}%</span>`)
      .join("");
  }

  // ---------- 用户画像卡 ----------
  function renderPersonas() {
    const grid = document.getElementById("persona-grid");
    grid.innerHTML = SIM.personas.map((p) => `
      <div class="persona-card" data-id="${p.id}">
        <div class="pc-top">
          <span class="pc-icon">${p.icon}</span>
          <div><div class="pc-name">${p.name}</div></div>
        </div>
        <div class="pc-tag">${p.tagline}</div>
        <div class="pc-bar"><i style="width:${p.percentage * 2.6}%;background:${p.color}"></i></div>
        <div class="pc-pct">占样本约 ${p.percentage}%</div>
      </div>`).join("");
    grid.querySelectorAll(".persona-card").forEach((c) => {
      c.addEventListener("click", () => {
        grid.querySelectorAll(".persona-card").forEach((x) => x.classList.remove("active"));
        c.classList.add("active");
        showPersona(c.dataset.id);
        renderRadar(c.dataset.id);
        document.querySelectorAll("#radar-switch button").forEach((b) =>
          b.classList.toggle("active", b.dataset.id === c.dataset.id));
      });
    });
    // 默认选中第一个
    grid.querySelector(".persona-card").classList.add("active");
    showPersona(SIM.personas[0].id);
  }

  function showPersona(id) {
    const p = SIM.personas.find((x) => x.id === id);
    const el = document.getElementById("persona-detail");
    el.innerHTML = `
      <div>
        <div class="pd-head"><span class="pd-icon">${p.icon}</span><span class="pd-name">${p.name}</span></div>
        <p class="pd-tagline">${p.tagline}</p>
        <div class="pd-block"><h4>核心动机</h4><div>${p.motivation}</div></div>
        <div class="pd-block"><h4>典型行为</h4><ul>${p.behaviors.map((b) => `<li>${b}</li>`).join("")}</ul></div>
        <div class="pd-block"><h4>主要痛点</h4><ul>${p.pains.map((b) => `<li>${b}</li>`).join("")}</ul></div>
      </div>
      <div>
        <div class="pd-block"><h4>需求清单</h4>
          <div class="pd-needs">
            ${Object.entries(p.needs).map(([k, v]) => `<div class="pd-need"><div class="t">${k}</div><div class="v">${v}</div></div>`).join("")}
          </div>
        </div>
        <div class="pd-quote">${p.quote}</div>
      </div>`;
  }

  // ---------- 雷达图 ----------
  function renderRadarSwitch() {
    document.getElementById("radar-switch").innerHTML = SIM.personas
      .map((p) => `<button data-id="${p.id}" class="${p.id === 'study' ? 'active' : ''}">${p.name.replace('用户','')}</button>`)
      .join("");
    document.querySelectorAll("#radar-switch button").forEach((b) => {
      b.addEventListener("click", () => {
        document.querySelectorAll("#radar-switch button").forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        renderRadar(b.dataset.id);
        document.querySelectorAll(".persona-card").forEach((c) =>
          c.classList.toggle("active", c.dataset.id === b.dataset.id));
        showPersona(b.dataset.id);
      });
    });
  }

  function renderRadar(id) {
    const svg = document.getElementById("radar-chart");
    const cx = 180, cy = 180, R = 130;
    const axes = SIM.radarAxes, n = axes.length;
    const vals = SIM.radar[id];
    const p = SIM.personas.find((x) => x.id === id);
    let s = "";
    // 网格圈
    for (let g = 1; g <= 4; g++) {
      const rr = (R * g) / 4;
      let pts = [];
      for (let i = 0; i < n; i++) {
        const ang = -Math.PI / 2 + (i * 2 * Math.PI) / n;
        pts.push(`${cx + rr * Math.cos(ang)},${cy + rr * Math.sin(ang)}`);
      }
      s += `<polygon points="${pts.join(" ")}" fill="none" stroke="#e5e7eb" stroke-width="1"/>`;
    }
    // 轴
    for (let i = 0; i < n; i++) {
      const ang = -Math.PI / 2 + (i * 2 * Math.PI) / n;
      const x = cx + R * Math.cos(ang), y = cy + R * Math.sin(ang);
      s += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#e5e7eb"/>`;
      const lx = cx + (R + 18) * Math.cos(ang), ly = cy + (R + 18) * Math.sin(ang);
      s += `<text x="${lx}" y="${ly}" font-size="11" fill="#475569" text-anchor="middle" dominant-baseline="middle">${axes[i]}</text>`;
    }
    // 数据
    let dpts = [];
    for (let i = 0; i < n; i++) {
      const ang = -Math.PI / 2 + (i * 2 * Math.PI) / n;
      const rr = (R * vals[i]) / 100;
      dpts.push(`${cx + rr * Math.cos(ang)},${cy + rr * Math.sin(ang)}`);
    }
    s += `<polygon points="${dpts.join(" ")}" fill="${p.color}33" stroke="${p.color}" stroke-width="2"/>`;
    for (let i = 0; i < n; i++) {
      const ang = -Math.PI / 2 + (i * 2 * Math.PI) / n;
      const rr = (R * vals[i]) / 100;
      s += `<circle cx="${cx + rr * Math.cos(ang)}" cy="${cy + rr * Math.sin(ang)}" r="3" fill="${p.color}"/>`;
    }
    svg.innerHTML = s;
  }

  function renderAxisList() {
    document.getElementById("axis-list").innerHTML = SIM.radarAxes
      .map((a) => `<li>${a}</li>`).join("");
  }

  // ---------- 痛点条 ----------
  function renderPainBars() {
    const el = document.getElementById("pain-bars");
    const max = Math.max(...SIM.pains.map((p) => p.percent));
    el.innerHTML = SIM.pains.map((p) => `
      <div>
        <div class="pain-row">
          <div class="pain-name">${p.name}</div>
          <div class="pain-track"><div class="pain-fill" style="width:${(p.percent / max) * 100}%;background:${p.color}">${p.percent}%</div></div>
        </div>
        <div class="pain-desc">${p.desc}（反馈 ${p.count} 条）</div>
      </div>`).join("");
  }

  // ---------- 热力图 ----------
  function renderHeatmap() {
    const el = document.getElementById("heatmap");
    const hm = SIM.heatmap;
    function color(v) {
      // 浅绿 -> 橙红
      if (v < 40) return "#bbf7d0";
      if (v < 60) return "#fde68a";
      if (v < 80) return "#fdba74";
      return "#fca5a5";
    }
    let s = `<div class="heat-row"><div class="heat-label"></div>${hm.cols.map((c) => `<div class="heat-label" style="text-align:center">${c}</div>`).join("")}</div>`;
    hm.rows.forEach((r, i) => {
      s += `<div class="heat-row"><div class="heat-label">${r}</div>`;
      hm.cells[i].forEach((v) => {
        s += `<div class="heat-cell" style="background:${color(v)}" title="${v}">${v}</div>`;
      });
      s += `</div>`;
    });
    el.innerHTML = s;
  }

  // ---------- 方法卡 ----------
  function renderMethods() {
    document.getElementById("method-grid").innerHTML = SIM.methods.map((m) => `
      <div class="method-card">
        <div class="mc-top">
          <span class="mc-icon">${m.icon}</span>
          <span class="mc-name">${m.name}</span>
          <span class="mc-type ${m.type}">${m.type}</span>
        </div>
        <div class="mc-desc">${m.desc}</div>
        <div class="mc-tool">🛠 ${m.tool}</div>
      </div>`).join("");
  }

  function renderSurveyFrame() {
    const items = [
      ["基本信息", "年龄 / 职业 / 学历 / 学科背景、到馆频率"],
      ["使用行为", "常用服务、使用渠道、数字资源习惯"],
      ["需求评估", "空间 / 资源 / 服务 / 设施（Likert 5 级）"],
      ["协作需求", "是否需要讨论空间、学伴匹配、知识共享"],
      ["满意度", "整体满意度、最不满意的三项"],
      ["开放建议", "「理想中的图书馆是什么样的？」"],
    ];
    document.getElementById("survey-frame").innerHTML = items
      .map(([t, d]) => `<div class="sf-item"><b>${t}</b><br>${d}</div>`).join("");
  }

  // ---------- 协作层 ----------
  function renderCollabLayers() {
    document.getElementById("collab-layers").innerHTML = SIM.collabLayers.map((c) => `
      <div class="collab-layer">
        <div class="cl-layer">${c.layer}</div>
        <div class="cl-need">${c.need}<br><span class="s">图书馆支持：${c.support}</span></div>
        <div class="cl-badge ${c.done ? 'on' : 'off'}">${c.done ? '已具备' : '待建设'}</div>
      </div>`).join("");
  }

  // ---------- 看板 ----------
  function renderRoomBoard() {
    const status = ["空闲", "紧张", "约满"];
    const colors = ["#65a30d", "#d97706", "#dc2626"];
    let s = `<div class="rb-row"><div class="rb-label"></div>${SIM.roomDays.map((d) => `<div class="rb-head">${d}</div>`).join("")}</div>`;
    SIM.rooms.forEach((rm, i) => {
      s += `<div class="rb-row"><div class="rb-label">${rm}</div>`;
      SIM.roomBoard[i].forEach((st) => {
        s += `<div class="rb-cell" style="background:${colors[st]}" title="${status[st]}">${status[st]}</div>`;
      });
      s += `</div>`;
    });
    document.getElementById("room-board").innerHTML = s;
  }

  // ---------- 时间线 ----------
  function renderTimeline() {
    document.getElementById("timeline").innerHTML = SIM.roadmap.map((r) => `
      <div class="tl-item">
        <div class="tl-head">
          <span class="tl-phase">${r.phase}</span>
          <span class="tl-period">${r.period}</span>
          <span class="tl-status ${r.status}">${r.status}</span>
        </div>
        <ul class="tl-goals">${r.goals.map((g) => `<li>${g}</li>`).join("")}</ul>
        <div class="tl-metric">🎯 ${r.metric}</div>
      </div>`).join("");
  }

  // ---------- 指标 ----------
  function renderMetrics() {
    document.getElementById("metrics-table").innerHTML = `
      <table class="metrics-table">
        <thead><tr><th>指标</th><th>当前</th><th></th><th>目标</th><th>时限</th></tr></thead>
        <tbody>
          ${SIM.metrics.map((m) => `<tr><td>${m.k}</td><td>${m.from}</td><td class="arrow">→</td><td>${m.to}</td><td>${m.by}</td></tr>`).join("")}
        </tbody>
      </table>`;
  }
});
