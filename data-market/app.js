// ============================================================
// 渲染逻辑 —— 数据交易市场模拟平台
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".brand-title").textContent = DM.meta.title;
  document.querySelector(".brand-sub").textContent = DM.meta.subtitle;

  const navBtns = document.querySelectorAll(".nav-btn");
  navBtns.forEach((b) => b.addEventListener("click", () => {
    navBtns.forEach((x) => x.classList.remove("active"));
    b.classList.add("active");
    document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
    document.getElementById("view-" + b.dataset.view).classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }));

  renderMarketKPIs();
  renderProducts();
  renderFilterBtns();
  renderTransactions();
  renderTrend();
  renderSellers();
  renderPrivacy();
  renderFlow();

  // ---------- 市场 KPI ----------
  function renderMarketKPIs() {
    document.getElementById("market-kpis").innerHTML = DM.kpis.map((k) => `
      <div class="kpi">
        <div class="label">${k.label}</div>
        <div class="value">${k.value}<span class="unit">${k.unit}</span></div>
        <div class="note">${k.note}</div>
      </div>`).join("");
  }

  // ---------- 产品列表 ----------
  function renderProducts(filter = "all") {
    const list = filter === "all" ? DM.products : DM.products.filter((p) => p.category === filter);
    const grid = document.getElementById("product-grid");
    const nameMap = { p1:"2026 Q2 用户画像全景报告", p2:"空间使用热力图数据集", p3:"用户需求雷达对比套装", p4:"痛点归因与反馈分类语料", p5:"协作空间需求评估报告", p6:"图书馆运营 OKR 基准数据集", p7:"校友与远程用户需求调研", p8:"特需用户无障碍体验报告" };
    grid.innerHTML = list.map((p) => `
      <div class="product-card" onclick="showProductDetail('${p.id}')">
        <div class="pc-head">
          <span class="pc-icon">${p.icon}</span>
          <div><div class="pc-name">${p.name}</div><span class="pc-cat">${p.category}</span></div>
        </div>
        <div class="pc-desc">${p.desc}</div>
        <div class="pc-bottom">
          <span class="pc-price">${p.price}</span>
          <span class="pc-meta">⭐${p.rating} · ${p.sales}笔</span>
        </div>
        <div class="pc-tags">${p.tags.map((t) => `<span class="pc-tag">${t}</span>`).join("")}</div>
      </div>`).join("");
  }

  function renderFilterBtns() {
    document.querySelectorAll(".filter-btn").forEach((b) => {
      b.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        renderProducts(b.dataset.cat);
      });
    });
  }

  // 产品详情弹窗（全局函数）
  window.showProductDetail = function(id) {
    const p = DM.products.find((x) => x.id === id);
    if (!p) return;
    const overlay = document.getElementById("product-modal");
    document.getElementById("product-detail").innerHTML = `
      <div style="position:relative">
        <h2>${p.icon} ${p.name}</h2>
        <div class="m-row"><span class="m-tag">${p.category}</span>${p.tags.map((t) => `<span class="m-tag">${t}</span>`).join("")}</div>
        <p class="m-desc">${p.desc}</p>
        <div class="m-seller"><b>卖家：</b>${p.seller} &nbsp;|&nbsp; <b>评分：</b>⭐${p.rating} &nbsp;|&nbsp; <b>已售：</b>${p.sales} 笔 &nbsp;|&nbsp; <b>更新：</b>${p.updated}</div>
        <div class="m-price">${p.price}</div>
        <button class="m-btn" onclick="handleBuy('${p.id}')">🛒 模拟购买</button>
        <p style="font-size:12px;color:var(--muted);margin-top:8px">* 此为模拟操作，不会产生真实交易</p>
      </div>`;
    overlay.classList.add("show");
  };

  window.handleBuy = function(id) {
    alert("✅ 模拟购买成功！\n\n产品 ID: " + id + "\n\n此为模拟演示，不涉及真实交易。\n实际交易需经过合规审查与协议签署。");
    document.getElementById("product-modal").classList.remove("show");
  };

  document.getElementById("product-modal").addEventListener("click", function(e) {
    if (e.target === this) this.classList.remove("show");
  });

  // ---------- 交易记录 ----------
  function renderTransactions() {
    const nameMap = { p1:"2026 Q2 用户画像全景报告", p2:"空间使用热力图数据集", p3:"用户需求雷达对比套装", p4:"痛点归因与反馈分类语料", p5:"协作空间需求评估报告", p6:"图书馆运营 OKR 基准数据集", p7:"校友与远程用户需求调研", p8:"特需用户无障碍体验报告" };
    document.getElementById("tx-table").innerHTML = `
      <table class="tx-table">
        <thead><tr><th>交易 ID</th><th>买方</th><th>产品</th><th>金额</th><th>日期</th><th>状态</th></tr></thead>
        <tbody>
          ${DM.transactions.map((t) => `
            <tr>
              <td>${t.id}</td><td>${t.buyer}</td><td>${nameMap[t.product] || t.product}</td>
              <td><b>${t.amount}</b></td><td>${t.date}</td>
              <td><span class="tx-badge ${t.status === '已完成' ? 'done' : 'pending'}">${t.status}</span></td>
            </tr>`).join("")}
        </tbody>
      </table>`;
  }

  // ---------- 趋势 ----------
  function renderTrend() {
    const svg = document.getElementById("trend-chart");
    const W = 520, H = 260, pad = 36, t = DM.trend, n = t.months.length;
    const xStep = (W - pad * 2) / (n - 1);
    const maxV = Math.max(...t.volume) * 1.2, maxP = Math.max(...t.products) * 1.2;
    let s = `<line x1="${pad}" y1="${H - pad}" x2="${W - pad}" y2="${H - pad}" stroke="#e5e7eb"/>`;
    t.months.forEach((m, i) => { s += `<text x="${pad + i * xStep}" y="${H - pad + 16}" font-size="10" fill="#6b7280" text-anchor="middle">${m}</text>`; });

    const vPts = t.volume.map((v, i) => [pad + i * xStep, H - pad - (v / maxV) * (H - pad * 2)]);
    const vPath = vPts.map((p, i) => (i ? "L" : "M") + p[0] + " " + p[1]).join(" ");
    s += `<path d="${vPath}" fill="none" stroke="#1f6f54" stroke-width="2.5"/>`;
    vPts.forEach((p, i) => { s += `<circle cx="${p[0]}" cy="${p[1]}" r="3" fill="#1f6f54"/>`; s += `<text x="${p[0]}" y="${p[1] - 7}" font-size="9" fill="#1f6f54" text-anchor="middle">${t.volume[i]}</text>`; });

    const pPts = t.products.map((v, i) => [pad + i * xStep, H - pad - (v / maxP) * (H - pad * 2)]);
    const pPath = pPts.map((p, i) => (i ? "L" : "M") + p[0] + " " + p[1]).join(" ");
    s += `<path d="${pPath}" fill="none" stroke="#0891b2" stroke-width="2" stroke-dasharray="6,3"/>`;
    pPts.forEach((p, i) => { s += `<circle cx="${p[0]}" cy="${p[1]}" r="3" fill="#0891b2"/>`; s += `<text x="${p[0]}" y="${p[1] + 14}" font-size="9" fill="#0891b2" text-anchor="middle">${t.products[i]}</text>`; });

    svg.innerHTML = s;
  }

  // ---------- 卖家 ----------
  function renderSellers() {
    document.getElementById("seller-grid").innerHTML = DM.sellers.map((s) => `
      <div class="seller-card">
        <div class="sc-head"><span class="sc-icon">${s.icon}</span><span class="sc-name">${s.name}</span></div>
        <div class="sc-desc">${s.desc}</div>
        <div class="sc-stats">
          <span>产品 <b>${s.products}</b> 件</span>
          <span>营收 <b>${s.revenue}</b></span>
        </div>
      </div>`).join("");
  }

  // ---------- 隐私 ----------
  function renderPrivacy() {
    document.getElementById("privacy-grid").innerHTML = DM.privacy.map((p) => `
      <div class="privacy-card">
        <div class="pv-icon">${p.icon}</div>
        <div class="pv-name">${p.name}</div>
        <div class="pv-desc">${p.desc}</div>
      </div>`).join("");
  }

  // ---------- 流程 ----------
  function renderFlow() {
    document.getElementById("flow-steps").innerHTML = DM.tradeFlow.map((f) => `
      <div class="flow-step">
        <div class="fs-num">${f.step}</div>
        <div class="fs-name">${f.name}</div>
        <div class="fs-desc">${f.desc}</div>
      </div>`).join("");
  }
});
