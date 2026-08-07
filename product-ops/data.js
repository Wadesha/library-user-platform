// ============================================================
// 模拟数据层 v2 —— 用户洞察驱动的「软件运营工作台」
// 视角：软件运营者（非图书馆决策方）
// 核心命题：你比你以为的更有影响力。把"无能为力"的痛点，
//          翻译成你能直接执行的软件/内容/流程动作，以及能
//          向上游（IT/空间/采购/决策）提出的建议。
// ============================================================

const SIM = {
  meta: {
    title: "用户洞察驱动的软件运营工作台",
    subtitle: "作为软件运营者：你手里的杠杆，比你以为的更多",
    updated: "2026-08",
    sample: 3200, // 软件日活（DAU）
  },

  // 我的四类杠杆（回答"我到底能做什么"）
  levers: [
    { id: "feature", name: "软件功能", icon: "⚙️", color: "#1f6f54",
      desc: "我能直接配置、迭代、上线的功能模块",
      examples: ["座位预约规则", "权限状态看板", "无障碍模式", "荐购入口", "故障自助排查"] },
    { id: "content", name: "内容与运营", icon: "📣", color: "#0891b2",
      desc: "我能直接策划的活动、推送与社群运营",
      examples: ["个性化书单", "活动推送", "打卡路线", "学伴匹配", "交叉学科专题"] },
    { id: "process", name: "流程与规则", icon: "📋", color: "#7c3aed",
      desc: "我能直接定义的预约 / 权限 / 黑名单策略",
      examples: ["超时释放", "黑名单", "续座提醒", "分区预约", "校友数字卡流"] },
    { id: "influence", name: "建议与影响", icon: "💡", color: "#ea580c",
      desc: "我向上游提的结构化需求（间接撬动硬件/采购）",
      examples: ["向 IT 提稳定性", "向空间提改造", "向采购提资源", "向决策提开放"] },
  ],

  // 运营视角 KPI（软件指标）
  kpis: [
    { label: "日活用户 DAU", value: "3,200", unit: "人", delta: "+9%", good: true, note: "软件日活跃用户规模" },
    { label: "核心功能使用率", value: "68", unit: "%", delta: "+5pt", good: true, note: "预约 / 检索 / 荐购等" },
    { label: "推送打开率", value: "22", unit: "%", delta: "+4pt", good: true, note: "运营推送触达效率" },
    { label: "用户净推荐值", value: "+35", unit: "NPS", delta: "+6", good: true, note: "满意度与口碑指标" },
  ],

  // 运营趋势（近6季度）
  trend: {
    quarters: ["24Q1", "24Q2", "24Q3", "24Q4", "25Q1", "25Q2"],
    nps: [29, 30, 31, 33, 34, 35],
    usage: [58, 60, 62, 64, 66, 68],
  },

  // 七类用户（软件运营视角）
  personas: [
    { id: "research", name: "研究型用户", icon: "🔬", color: "#2563eb", pct: 18, tagline: "高频检索与文献产出的深耕者",
      inSoftware: "高频使用检索、导出、引用功能，是软件最重度用户",
      myAction: ["检索历史与引用格式一键导出", "TDM/批量下载引导与合规提示", "到期/权限变更主动推送提醒"],
      leverage: ["feature", "content"] },
    { id: "study", name: "学习型用户", icon: "📚", color: "#0891b2", pct: 32, tagline: "占座、自习、备考的常驻人群",
      inSoftware: "座位预约主力，依赖计时、续座、提醒功能",
      myAction: ["座位地图实时可视化", "续座提醒 + 超时自动释放", "考试季开放时间动态标注"],
      leverage: ["process", "feature"] },
    { id: "leisure", name: "休闲型用户", icon: "🛋️", color: "#65a30d", pct: 15, tagline: "为兴趣与放松而来的阅读者",
      inSoftware: "浏览书架、看推荐、参加活动推送",
      myAction: ["个性化书单与猜你喜欢", "活动日历推送与一键报名", "热门书到货提醒"],
      leverage: ["content", "feature"] },
    { id: "experience", name: "体验型用户", icon: "📸", color: "#db2777", pct: 10, tagline: "为空间美学与打卡而来的探访者",
      inSoftware: "首次使用、找路、分享内容",
      myAction: ["新手引导路线 + 出片打卡点", "可分享的图文素材生成", "清晰的导览与无障碍导航"],
      leverage: ["content", "feature"] },
    { id: "intel", name: "情报型用户", icon: "🧭", color: "#7c3aed", pct: 8, tagline: "为决策参考寻找信息的人",
      inSoftware: "使用专题库、定题跟踪",
      myAction: ["定题推送与情报简报模板", "跨库检索结果聚合", "趋势监测订阅"],
      leverage: ["feature", "content"] },
    { id: "collab", name: "合作型用户", icon: "🤝", color: "#ea580c", pct: 12, tagline: "在协作中创造知识的共建者",
      inSoftware: "讨论间预约、小组空间使用",
      myAction: ["小组讨论间预约 + 共享白板", "学伴匹配与读书会发起", "成果展示与经验分享区"],
      leverage: ["process", "content"] },
    { id: "special", name: "特需型用户", icon: "♿", color: "#475569", pct: 5, tagline: "需要被特别照拂的读者",
      inSoftware: "无障碍、适老、儿童功能使用者",
      myAction: ["大字模式 + 朗读 + 高对比", "无障碍导航与键盘可达", "适老操作辅导短视频"],
      leverage: ["feature"] },
  ],

  // 痛点 → 我的动作（核心映射，回应"我能做什么"）
  painToAction: [
    { pain: "数据库访问与权限", percent: 40, count: 144, color: "#dc2626",
      myAction: "权限状态透明化 + 故障自助排查引导 + 到期/变更推送 + 一键提工单",
      leverage: "feature",
      influence: "向 IT / 数据库商提稳定性需求（附 40% 占比数据）" },
    { pain: "空间管理与噪音", percent: 27, count: 96, color: "#ea580c",
      myAction: "分区预约引导（安静区 / 讨论区）+ 超时释放规则",
      leverage: "process",
      influence: "向空间改造提隔音改造建议（附 27% 投诉数据）" },
    { pain: "占座治理", percent: 18, count: 65, color: "#d97706",
      myAction: "预约规则优化 + 续座提醒 + 超时释放 + 黑名单",
      leverage: "process",
      influence: "—（软件内可直接闭环）" },
    { pain: "设施维护", percent: 12, count: 43, color: "#ca8a04",
      myAction: "设施报修入口 + 故障位置地图标注",
      leverage: "feature",
      influence: "向物业提维护清单（附热点区域标注）" },
    { pain: "资源建设", percent: 8, count: 29, color: "#65a30d",
      myAction: "荐购入口 + 热门需求榜单 + 交叉学科专题",
      leverage: "content",
      influence: "向采购提资源增补建议（附需求榜）" },
    { pain: "校友 / 校外服务", percent: 10, count: 36, color: "#0891b2",
      myAction: "校友数字卡申请流 + 权限状态透明化",
      leverage: "process",
      influence: "向决策提远程权限开放建议" },
  ],

  // 建议清单（结构化向上游提需求）
  influenceBacklog: [
    { item: "数据库校外访问稳定性提升", target: "IT / 数据库商", basis: "权限类反馈占比 40%，居首位", priority: "最高", effect: "研究型 / 学习型用户科研效率显著提升" },
    { item: "研讨间隔音改造 / 增设静音舱", target: "空间改造团队", basis: "空间与噪音投诉 27%，讨论间预约集中", priority: "高", effect: "协作与自习体验双提升" },
    { item: "交叉学科 / 外文数据库增补", target: "资源采购", basis: "荐购榜交叉学科需求明显上升", priority: "中", effect: "研究型用户资源覆盖补全" },
    { item: "无障碍与适老化设施升级", target: "空间 / 物业", basis: "特需型用户无障碍投诉集中", priority: "中", effect: "包容性服务达标" },
    { item: "校友远程权限与数字卡", target: "决策层", basis: "校友 / 校外诉求 10% 且升温", priority: "低", effect: "开放服务体系延伸" },
  ],

  // 运营节奏
  rhythm: [
    { freq: "每日", tasks: ["看板巡检：DAU / 功能使用率 / 新增反馈", "推送触达与活动运营", "回复用户反馈（目标 < 2 天）"] },
    { freq: "每周", tasks: ["痛点归因：本周高频反馈分类", "功能使用复盘：哪些功能被冷落", "更新「建议清单」推进状态"] },
    { freq: "每月", tasks: ["用户画像更新：占比与需求漂移", "运营指标月度回顾", "向相关方提交结构化建议单"] },
    { freq: "每季", tasks: ["满意度 / NPS 复盘", "路线图对齐与优先级重排", "影响杠杆效果评估"] },
  ],

  // 运营可用的研究方法
  methods: [
    { type: "软件", name: "行为埋点分析", icon: "📈", desc: "分析功能点击、留存、转化漏斗", tool: "埋点 / 增长分析平台" },
    { type: "软件", name: "推送 A/B 测试", icon: "🧪", desc: "对比不同文案 / 时段的打开率", tool: "推送平台实验功能" },
    { type: "运营", name: "用户反馈分类", icon: "💬", desc: "工单 / 评论结构化归类与归因", tool: "工单系统 + 标签体系" },
    { type: "运营", name: "问卷与访谈", icon: "📝", desc: "针对新功能做轻量调研", tool: "问卷星 + 用户访谈" },
    { type: "影响", name: "建议单机制", icon: "💡", desc: "把软件无解的痛点整理成结构化需求", tool: "影响对象 + 数据依据 + 优先级" },
    { type: "影响", name: "数据武器化", icon: "🗺️", desc: "用热力图 / 占比数据支撑建议", tool: "空间热力图 + 占比报告" },
  ],

  // 成功指标（运营视角 OKR）
  metrics: [
    { k: "用户净推荐值 NPS", from: "+29", to: "+45", by: "M10" },
    { k: "核心功能使用率", from: "58%", to: "78%", by: "M10" },
    { k: "推送打开率", from: "18%", to: "30%", by: "M7" },
    { k: "反馈响应时长", from: "5 天", to: "≤2 天", by: "M4" },
    { k: "建议单采纳数", from: "0", to: "≥3 项/季", by: "M12" },
  ],
};
