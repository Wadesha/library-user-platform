// ============================================================
// 模拟数据层 —— 图书馆用户洞察数据交易市场
// 说明：完全模拟，用于演示数据产品的定价与流通逻辑。
//       所有数据均为虚构，不包含任何真实用户信息。
// ============================================================

const DM = {
  meta: {
    title: "用户洞察数据交易市场",
    subtitle: "让数据资产被看见、被定价、被安全地流通",
    updated: "2026-08-07",
  },

  // 市场总览 KPI
  kpis: [
    { label: "在架数据产品", value: "28", unit: "件", note: "覆盖 7 类用户画像" },
    { label: "累计交易额", value: "¥1,247", unit: "万", note: "模拟累计交易流水" },
    { label: "活跃买家", value: "47", unit: "家", note: "图书馆 / 研究机构 / 出版商" },
    { label: "数据安全评级", value: "AAA", unit: "", note: "通过隐私合规审计" },
  ],

  // 数据产品清单
  products: [
    {
      id: "p1",
      name: "2026 Q2 用户画像全景报告",
      category: "用户画像",
      icon: "🎭",
      cover: "bg1",
      price: "¥18,000",
      desc: "基于 7,314 份有效问卷的七类用户深度画像，包含动机、行为、痛点与需求雷达。适用于服务设计决策。",
      tags: ["匿名化", "可视化", "PDF+Excel"],
      seller: "数据研究院",
      rating: 4.8,
      sales: 23,
      updated: "2026-07-15",
    },
    {
      id: "p2",
      name: "空间使用热力图数据集",
      category: "空间分析",
      icon: "🗺️",
      cover: "bg2",
      price: "¥12,500",
      desc: "7 大区域 × 6 时段的拥挤度热力数据，可导出为 CSV 或接入 BI 工具。用于空间改造决策。",
      tags: ["脱敏", "CSV", "API"],
      seller: "空间分析实验室",
      rating: 4.6,
      sales: 18,
      updated: "2026-06-30",
    },
    {
      id: "p3",
      name: "用户需求雷达对比套装",
      category: "需求分析",
      icon: "🎯",
      cover: "bg3",
      price: "¥9,800",
      desc: "七类用户在七个维度的需求强度对比数据集，附分析方法论文档。适用于精准服务设计。",
      tags: ["匿名化", "Excel", "方法论文档"],
      seller: "数据研究院",
      rating: 4.9,
      sales: 31,
      updated: "2026-07-20",
    },
    {
      id: "p4",
      name: "痛点归因与反馈分类语料",
      category: "文本分析",
      icon: "💬",
      cover: "bg4",
      price: "¥22,000",
      desc: "经 NLP 处理的 3,200+ 条用户反馈分类语料，含情绪标注与归因标签。适用于 AI 模型训练。",
      tags: ["脱敏文本", "JSON", "标注"],
      seller: "NLP 研究组",
      rating: 4.7,
      sales: 12,
      updated: "2026-07-28",
    },
    {
      id: "p5",
      name: "协作空间需求评估报告",
      category: "空间分析",
      icon: "🤝",
      cover: "bg5",
      price: "¥8,500",
      desc: "五层协作需求（物理/工具/社交/知识/生态）的量化评估，含讨论间预约看板数据。",
      tags: ["匿名化", "PDF", "看板数据"],
      seller: "空间分析实验室",
      rating: 4.4,
      sales: 9,
      updated: "2026-07-10",
    },
    {
      id: "p6",
      name: "图书馆运营 OKR 基准数据集",
      category: "运营管理",
      icon: "📊",
      cover: "bg6",
      price: "¥6,800",
      desc: "12 家图书馆的运营指标基准数据（NPS / DAU / 功能使用率 / 响应时长），含匿名对标。",
      tags: ["脱敏", "Excel", "对标报告"],
      seller: "数据研究院",
      rating: 4.5,
      sales: 15,
      updated: "2026-08-01",
    },
    {
      id: "p7",
      name: "校友与远程用户需求调研",
      category: "用户画像",
      icon: "🎓",
      cover: "bg7",
      price: "¥15,000",
      desc: "针对校友/校外用户的专项需求调研，含数字卡申请意愿与远程权限偏好分析。",
      tags: ["匿名化", "PDF", "问卷原始数据"],
      seller: "数据研究院",
      rating: 4.3,
      sales: 7,
      updated: "2026-07-05",
    },
    {
      id: "p8",
      name: "特需用户无障碍体验报告",
      category: "用户画像",
      icon: "♿",
      cover: "bg8",
      price: "¥11,000",
      desc: "无障碍设施使用情况、适老化需求、特殊格式资源需求分析，含改进建议路线图。",
      tags: ["匿名化", "PDF", "路线图"],
      seller: "包容性设计团队",
      rating: 4.6,
      sales: 5,
      updated: "2026-06-20",
    },
  ],

  // 最近交易流水（模拟）
  transactions: [
    { id: "tx1", buyer: "北京城市图书馆", product: "p1", amount: "¥18,000", date: "2026-08-05", status: "已完成" },
    { id: "tx2", buyer: "华东师范大学图书馆", product: "p3", amount: "¥9,800", date: "2026-08-03", status: "已完成" },
    { id: "tx3", buyer: "深圳科技图书馆", product: "p2", amount: "¥12,500", date: "2026-08-02", status: "进行中" },
    { id: "tx4", buyer: "武汉大学信息管理学院", product: "p4", amount: "¥22,000", date: "2026-07-28", status: "已完成" },
    { id: "tx5", buyer: "浙江图书馆", product: "p6", amount: "¥6,800", date: "2026-07-25", status: "已完成" },
    { id: "tx6", buyer: "复旦大学图书馆", product: "p5", amount: "¥8,500", date: "2026-07-22", status: "已完成" },
    { id: "tx7", buyer: "南京大学图书馆", product: "p7", amount: "¥15,000", date: "2026-07-18", status: "已完成" },
    { id: "tx8", buyer: "重庆图书馆", product: "p8", amount: "¥11,000", date: "2026-07-15", status: "已完成" },
  ],

  // 数据隐私保护机制
  privacy: [
    { name: "数据匿名化", icon: "🔒", desc: "所有出售的数据产品均经过严格的匿名化处理，移除姓名、学工号、联系方式等个人标识。" },
    { name: "聚合脱敏", icon: "🛡️", desc: "个体行为数据仅以聚合统计形式呈现，单一样本不可还原。采用 k-anonymity 标准。" },
    { name: "知情同意", icon: "📝", desc: "原始数据采集阶段已获得用户明确的知情同意，并记录授权范围与用途限制。" },
    { name: "合规审计", icon: "✅", desc: "定期通过第三方隐私合规审计，符合《个人信息保护法》及图书馆行业数据安全标准。" },
    { name: "用途限制", icon: "⚖️", desc: "购买协议明确限定数据使用范围，禁止二次转售或用于歧视性用户画像。" },
    { name: "销毁机制", icon: "🗑️", desc: "数据产品设有有效期，超期自动提醒销毁。买方需提供数据销毁证明。" },
  ],

  // 交易流程
  tradeFlow: [
    { step: 1, name: "浏览与筛选", desc: "按类别、价格、卖家筛选数据产品，查看详情与样例。" },
    { step: 2, name: "提交购买意向", desc: "选择产品，填写用途声明，签署数据使用协议。" },
    { step: 3, name: "合规审查", desc: "平台自动审查用途与隐私合规性，人工复核高风险交易。" },
    { step: 4, name: "支付与交割", desc: "完成支付后，数据产品通过加密通道交付，含使用说明。" },
    { step: 5, name: "使用与反馈", desc: "买方在协议范围内使用数据，可提交评价与反馈。" },
  ],

  // 卖家入驻
  sellers: [
    { name: "数据研究院", icon: "🏛️", products: 12, revenue: "¥680万", desc: "专注图书馆用户行为与需求研究" },
    { name: "空间分析实验室", icon: "🏗️", products: 5, revenue: "¥280万", desc: "空间使用与设施规划数据产品" },
    { name: "NLP 研究组", icon: "🤖", products: 4, revenue: "¥195万", desc: "文本分析与反馈归因数据" },
    { name: "包容性设计团队", icon: "🌍", products: 3, revenue: "¥92万", desc: "无障碍与适老化数据产品" },
  ],

  // 市场趋势
  trend: {
    months: ["2月", "3月", "4月", "5月", "6月", "7月"],
    volume: [145, 168, 190, 210, 235, 260],
    products: [18, 20, 22, 24, 26, 28],
  },
};
