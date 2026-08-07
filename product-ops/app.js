// ============================================================
// 渲染逻辑 v2 —— 用户洞察驱动的软件运营工作台
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("meta-title").textContent = SIM.meta.title;
  document.getElementById("meta-sub").textContent = SIM.meta.subtitle;
  document.getElementById("meta-sample").textContent = "DAU " + SIM.meta.sample.toLocaleString();
  document.getElementById("meta-updated").textContent = SIM.meta.updated;

  const navBtns = document.querySelectorAll(".nav-btn");
  navBtns.forEach((b) => b.addEventListener("click", () => {
    navBtns.forEach((x) => x.classList.remove("active"));
    b.classList.add("active");
    document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
    document.getElementById("view-" + b.dataset.view).classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }));

  renderLevers(); renderKPI(); renderTrend();
  renderPersonas(); renderActions(); renderInfluence();
  renderRhythm(); renderMethods(); renderMetrics();

  // ---------- 杠杆 ----------
  function renderLevers() {
    document.getElementById("lever-grid").innerHTML = SIM.levers.map((l) => `
      <div class="lever" style="--c:${l.color}">
        <div class="lv-top"><span class="lv-icon">${l.icon}</span><span class="lv-name">${l.name}</span></div>
        <div class="lv-desc">${l.desc}</div>
        <div class="lv-ex">${l.examples.map((e) => `<span class="lv-tag">${e}</span>`).join("")}</div>
      </div>`).join("");
  }

  // ---------- KPI ----------
  function renderKPI() {
    document.getElementById("kpi-grid").innerHTML = SIM.kpis.map((k) => `
      <div class="kpi">
        <div class="label">${k.label}</div>
        <div class="value">${k.value}<span class="unit">${k.unit}</span></div>
        <div class="delta">${k.delta}</div>
        <div class="note">${k.note}</div>
      </div>`).join("");
  }

  // ---------- 趋势 ----------
  function renderTrend() {
    const svg = document.getElementById("trend-chart");
    const W = 520, H = 260, pad = 36, t = SIM.trend, n = t.quarters.length;
    const xStep = (W - pad * 2) / (n - 1);
    const maxNps = 50, maxUse = 100;
    let s = `<line x1="${pad}" y1="${H - pad}" x2="${W - pad}" y2="${H - pad}" stroke="#e5e7eb"/>`;
    t.quarters.forEach((q, i) => { s += `<text x="${pad + i * xStep}" y="${H - pad + 16}" font-size="10" fill="#6b7280" text-anchor="middle">${q}</text>`; });
    const npsPts = t.nps.map((v, i) => [pad + i * xStep, H - pad - (v / maxNps) * (H - pad * 2)]);
    const usePts = t.usage.map((v, i) => [pad + i * xStep, H - pad - (v / maxUse) * (H - pad * 2)]);
    const usePath = usePts.map((p, i) => (i ? "L" : "M") + p[0] + " " + p[1]).join(" ");
    s += `<path d="${usePath}" fill="none" stroke="#0891b2" stroke-width="2.5"/>`;
    usePts.forEach((p, i) => { s += `<circle cx="${p[0]}" cy="${p[1]}" r="3" fill="#0891b2"/>`; s += `<text x="${p[0]}" y="${p[1] - 7}" font-size="9" fill="#0891b2" text-anchor="middle">${t.usage[i]}</text>`; });
    const npsPath = npsPts.map((p, i) => (i ? "L" : "M") + p[0] + " " + p[1]).join(" ");
    s += `<path d="${npsPath}" fill="none" stroke="#1f6f54" stroke-width="2.5"/>`;
    npsPts.forEach((p, i) => { s += `<circle cx="${p[0]}" cy="${p[1]}" r="3" fill="#1f6f54"/>`; s += `<text x="${p[0]}" y="${p[1] + 14}" font-size="9" fill="#1f6f54" text-anchor="middle">${t.nps[i]}</text>`; });
    svg.innerHTML = s;
  }

  // ---------- 用户画像 ----------
  const leverMap = Object.fromEntries(SIM.levers.map((l) => [l.id, l]));
  function renderPersonas() {
    const grid = document.getElementById("persona-grid");
    grid.innerHTML = SIM.personas.map((p) => `
      <div class="persona-card" data-id="${p.id}">
        <div class="pc-top"><span class="pc-icon">${p.icon}</span><div><div class="pc-name">${p.name}</div></div></div>
        <div class="pc-tag">${p.tagline}</div>
        <div class="pc-bar"><i style="width:${p.pct * 2.6}%;background:${p.color}"></i></div>
        <div class="pc-pct">占用户约 ${p.pct}%</div>
      </div>`).join("");
    grid.querySelectorAll(".persona-card").forEach((c) => c.addEventListener("click", () => {
      grid.querySelectorAll(".persona-card").forEach((x) => x.classList.remove("active"));
      c.classList.add("active"); showPersona(c.dataset.id);
    }));
    grid.querySelector(".persona-card").classList.add("active");
    showPersona(SIM.personas[0].id);
  }
  function showPersona(id) {
    const p = SIM.personas.find((x) => x.id === id), el = document.getElementById("persona-detail");
    el.innerHTML = `
      <div>
        <div class="pd-head"><span class="pd-icon">${p.icon}</span><span class="pd-name">${p.name}</span></div>
        <p class="pd-tagline">${p.tagline}</p>
        <div class="pd-block"><h4>在我的软件里怎么表现</h4><p>${p.inSoftware}</p></div>
      </div>
      <div>
        <div class="pd-block"><h4>我能为他们做的（软件侧）</h4>
          <ul class="pd-actions">${p.myAction.map((a) => `<li><span class="chk">✓</span><span>${a}</span></li>`).join("")}</ul>
        </div>
        <div class="pd-block"><h4>主要杠杆</h4>
          <div class="pd-levers">${p.leverage.map((l) => `<span class="pd-lever" style="background:${leverMap[l].color}">${leverMap[l].name}</span>`).join("")}</div>
        </div>
      </div>`;
  }

  // ---------- 痛点→动作 ----------
  function renderActions() {
    document.getElementById("action-list").innerHTML = SIM.painToAction.map((a) => {
      const lv = leverMap[a.leverage];
      return `
      <div class="action-row" style="--c:${a.color}">
        <div class="ar-head">
          <span class="ar-name">${a.pain}</span>
          <span class="ar-pct">${a.percent}%</span>
          <span class="ar-count">（反馈 ${a.count} 条）</span>
        </div>
        <div class="ar-body">
          <div class="ar-box"><div class="t">🔧 我能直接做的软件动作（杠杆：${lv.name}）</div><div class="v green">${a.myAction}</div></div>
          <div class="ar-box"><div class="t">💡 需要向上游提的建议</div><div class="v orange">${a.influence}</div></div>
        </div>
      </div>`;
    }).join("");
  }

  // ---------- 建议清单 ----------
  function renderInfluence() {
    document.getElementById("influence-table").innerHTML = `
      <table class="influence-table">
        <thead><tr><th>建议事项</th><th>影响对象</th><th>我的数据依据</th><th>优先级</th><th>预期效果</th></tr></thead>
        <tbody>
          ${SIM.influenceBacklog.map((r) => `
            <tr>
              <td><b>${r.item}</b></td>
              <td>${r.target}</td>
              <td>${r.basis}</td>
              <td><span class="prio ${r.priority}">${r.priority}</span></td>
              <td>${r.effect}</td>
            </tr>`).join("")}
        </tbody>
      </table>`;
  }

  // ---------- 运营节奏 ----------
  function renderRhythm() {
    document.getElementById("rhythm").innerHTML = SIM.rhythm.map((r) => `
      <div class="tl-item">
        <div class="tl-head"><span class="tl-freq">${r.freq}</span></div>
        <ul class="tl-tasks">${r.tasks.map((t) => `<li>${t}</li>`).join("")}</ul>
      </div>`).join("");
  }

  // ---------- 方法 ----------
  function renderMethods() {
    document.getElementById("method-grid").innerHTML = SIM.methods.map((m) => `
      <div class="method-card">
        <div class="mc-top"><span class="mc-icon">${m.icon}</span><span class="mc-name">${m.name}</span><span class="mc-type ${m.type}">${m.type}</span></div>
        <div class="mc-desc">${m.desc}</div>
        <div class="mc-tool">🛠 ${m.tool}</div>
      </div>`).join("");
  }

  // ---------- 指标 ----------
  function renderMetrics() {
    document.getElementById("metrics-table").innerHTML = `
      <table class="metrics-table">
        <thead><tr><th>指标</th><th>当前</th><th></th><th>目标</th><th>时限</th></tr></thead>
        <tbody>${SIM.metrics.map((m) => `<tr><td>${m.k}</td><td>${m.from}</td><td class="arrow">→</td><td>${m.to}</td><td>${m.by}</td></tr>`).join("")}</tbody>
      </table>`;
  }
});
