/**
 * 腾讯游戏测试岗 - 知识库数据库
 * Knowledge Base Database
 *
 * 数据来源：
 * 1. 腾讯游戏互娱测试岗 JD（用户提供）
 * 2. 腾讯云社区官方文章（Chaos Mesh 实践）
 * 3. 92道腾讯测试面试真题（CSDN 数据分析）
 * 4. OWASP 安全测试标准
 * 5. 行业公开技术资料
 *
 * 字段说明：
 * - id: 唯一标识
 * - category: 一级分类
 * - subcategory: 二级分类
 * - title: 标题
 * - summary: 摘要
 * - content: 详细内容（Markdown 格式）
 * - difficulty: 难度（1-5）
 * - importance: 重要性（1-5）
 * - tags: 标签数组
 * - source: 数据来源
 * - relatedIds: 关联知识点
 * - codeExample: 代码示例（可选）
 * - videoUrl: 视频演练URL（可选）
 * - quiz: 互动问答（可选）
 * - createdAt: 创建时间
 */

const KNOWLEDGE_BASE = [
  // ============ 1. 岗位核心 ============
  {
    id: 'jd-overview',
    category: '岗位核心',
    subcategory: 'JD 拆解',
    title: '腾讯游戏测试工程师 - 容灾测试方向 JD 解析',
    summary: '游戏测试工程师负责游戏功能/性能/容灾/安全测试，5年以上经验要求',
    content: `# 岗位职责

1. **专项测试** - 负责游戏后端服务/工具链的功能、性能、安全测试
2. **自动化测试** - 设计和实现自动化测试用例与框架
3. **容灾演练** - 实施故障注入、混沌工程演练
4. **质量改进** - 推动 Bug 跟踪、回归测试、问题闭环

# 任职要求

- 5年以上游戏或互联网后端测试经验
- 精通 Python/Java/Go 至少一门
- 熟悉 Linux、MySQL、Redis、网络协议
- 熟悉 Docker/K8s 容器化技术
- 有混沌工程、容灾测试经验优先
- 良好的工程化思维和跨团队协作能力

# 核心技能图谱

\`\`\`
测试能力
├── 功能测试（用例设计、Bug定位）
├── 自动化测试（Pytest/JUnit）
├── 性能测试（Locust/JMeter）
├── 容灾测试（Chaos Mesh）
└── 安全测试（OWASP）
\`

# 与本岗位匹配度

- ✅ 西山居1年游戏测试经验
- ✅ 全栈开发背景（理解系统架构）
- ⚠️ Python 需快速恢复
- ⚠️ 混沌工程为加分项，需重点准备`,
    difficulty: 1,
    importance: 5,
    tags: ['JD', '容灾', '游戏测试', '腾讯'],
    source: '腾讯招聘官网 JD',
    relatedIds: ['disaster-rto-rpo', 'chaos-engineering-tencent'],
    codeExample: null,
    videoUrl: null,
    quiz: null
  },

  // ============ 2. 容灾测试 ============
  {
    id: 'disaster-rto-rpo',
    category: '容灾测试',
    subcategory: '核心指标',
    title: 'RTO / RPO / SLA 三大容灾核心指标',
    summary: '灾备领域最关键的三个指标，决定容灾等级',
    content: `# RTO (Recovery Time Objective) 恢复时间目标

**定义**：从灾难发生到业务恢复所能容忍的最长时间

| 业务等级 | RTO 目标 | 适用场景 |
|---------|---------|---------|
| L0 关键 | < 1 分钟 | 支付、登录 |
| L1 重要 | < 5 分钟 | 交易、聊天 |
| L2 一般 | < 30 分钟 | 内容、社区 |
| L3 普通 | < 4 小时 | 后台管理 |

# RPO (Recovery Point Objective) 恢复点目标

**定义**：灾难发生后，允许丢失的数据量（时间维度）

- **RPO=0**：零数据丢失（如 Redis 主从同步、AOF）
- **RPO=秒级**：支付、订单（MySQL binlog 实时同步）
- **RPO=分钟级**：一般业务（每 5 分钟备份）
- **RPO=小时级**：可容忍的离线数据

# SLA (Service Level Agreement) 服务等级协议

**核心指标公式**：

\`\`\`
可用性 = (总时间 - 不可用时间) / 总时间 × 100%

SLA 99.99% = 年不可用 ≤ 52.6 分钟
SLA 99.9%  = 年不可用 ≤ 8.76 小时
SLA 99%    = 年不可用 ≤ 3.65 天
\`\`\`

# 游戏行业典型 SLA

- 登录服：99.99%（必须）
- 战斗服：99.95%（容忍偶发抖动）
- 排行/邮件：99.9%（可异步降级）
- 充值：100%（绝对可靠）

# 面试话术

> "在设计容灾方案时，我们首先要根据业务等级确定 RTO/RPO 目标。例如游戏登录服要求 RTO<1分钟、RPO=0，这就需要异地多活架构配合 Redis 实时同步。"

# 数据来源

- 国家标准 GB/T 20988-2007《信息安全技术 信息系统灾难恢复规范》
- 行业普遍认可的容灾等级体系`,
    difficulty: 2,
    importance: 5,
    tags: ['容灾', 'RTO', 'RPO', 'SLA', '基础指标'],
    source: '国家标准 + 行业最佳实践',
    relatedIds: ['jd-overview', 'disaster-level', 'chaos-engineering-tencent'],
    codeExample: `// 计算 SLA 实际可用性
function calculateSLA(downtimeMinutes) {
  const totalMinutes = 365 * 24 * 60;
  const availability = (1 - downtimeMinutes / totalMinutes) * 100;
  return availability.toFixed(4) + '%';
}

console.log('52.6分钟/年:', calculateSLA(52.6));   // 99.99%
console.log('8.76小时/年:', calculateSLA(8.76 * 60)); // 99.9%`,
    videoUrl: 'https://www.youtube.com/embed/2lXb2pH7t9k',
    quiz: [
      {
        question: 'SLA 99.99% 意味着一年最多不可用多长时间？',
        options: ['52.6分钟', '8.76小时', '3.65天', '1小时'],
        answer: 0,
        explanation: 'SLA 99.99% = 1 - 0.01% = (1 - 0.0001) = 可用时间占比 99.99%；一年总分钟数 525600，0.01% = 52.56 分钟'
      }
    ]
  },

  {
    id: 'chaos-engineering-tencent',
    category: '容灾测试',
    subcategory: '混沌工程',
    title: '🔥 腾讯互娱混沌工程实战（基于 Chaos Mesh）',
    summary: '腾讯互娱真实数据：每周150+次演练、提前发现100+问题',
    content: `# 背景

腾讯互娱基于 **Chaos Mesh** 打造云原生混沌工程平台，落地半年提前发现 **100+ 个问题/周**，演练效率提升 **10倍以上**。

# 关键数据

| 指标 | 数值 |
|------|------|
| 每周演练次数 | > **150 次** |
| 每周参与人数 | > **50 人** |
| 每周提前发现问题 | > **100 个** |
| 演练效率提升 | **10 倍+** |

# 故障注入能力

1. **资源类故障** - CPU高负载、内存耗尽、磁盘IO异常
2. **容器/Pod故障** - K8s场景下的Pod杀死、节点故障
3. **网络类故障** - 网络延迟、丢包、乱序、重复
4. **IO类故障** - 存储IO异常、磁盘满、读写超时
5. **精细化流量故障** - 网关层劫持流量，针对**特定账号**注入故障

# 腾讯实施方法论（可借鉴）

## 1. 平台集成与权限打通
- 所有 TKE 集群部署 Chaos Mesh
- 通过 Dashboard API 实现实验全流程管理
- 对接现有平台观测能力和权限体系

## 2. 实验编排与执行
- 支持并行、串行编排
- **拖拉拽**完成多服务、多故障编排
- 实时观测 QPS、延时、响应成功率
- 自动输出实验报告

## 3. 风险精细化控制
- 针对特定账号演练
- 在网关层劫持流量并下发故障
- 仅影响目标账号，控制爆炸半径

## 4. 红蓝对抗机制
- 运维主动对服务发起混沌实验
- 检验开发服务的容错能力
- 演练结果全公司公示
- 倒逼团队主动排查隐患

## 5. 强弱依赖验证
- 给被调服务注入故障（延时 > 3-5秒）
- 观察主调服务的 QPS、延迟抖动
- 判断依赖强弱，避免非核心服务拖垮主链路

## 6. 迭代闭环管理
\`\`\`
搭建平台 → 风险控制 → 实时观测 → 发现问题 → 优化验证
\`\`\`

# 面试必杀技

**问**：你们团队做过混沌工程吗？

**答**：
> "我了解腾讯互娱基于 Chaos Mesh 的实践，每周演练 150+ 次，半年提前发现 100+ 问题/周。我之前在项目中虽然没有大规模实施，但熟悉混沌工程五大原则：建立稳态假设、多样化事件、生产环境运行、自动化持续、最小化爆炸半径。我能在新团队中快速落地。"

# 数据来源

腾讯云开发者社区：https://cloud.tencent.com/developer/article/1826103`,
    difficulty: 4,
    importance: 5,
    tags: ['腾讯', '混沌工程', 'Chaos Mesh', '容灾', '真实案例'],
    source: '腾讯云官方文章 (cloud.tencent.com/developer/article/1826103)',
    relatedIds: ['jd-overview', 'disaster-rto-rpo', 'chaos-principles'],
    codeExample: `# Chaos Mesh 演练 YAML 示例
apiVersion: chaos-mesh.org/v1alpha1
kind: NetworkChaos
metadata:
  name: network-delay-test
  namespace: chaos-testing
spec:
  action: delay
  mode: one
  selector:
    namespaces:
      - game-server
  delay:
    latency: "3s"
    jitter: "500ms"
  duration: "5m"
  scheduler:
    cron: "@every 30m"`,
    videoUrl: 'https://www.youtube.com/embed/V_BMyqCLM_w',
    quiz: [
      {
        question: '腾讯互娱每周混沌演练的次数大约是？',
        options: ['15次', '50次', '150次以上', '500次'],
        answer: 2,
        explanation: '腾讯官方数据：每周演练次数 > 150 次'
      },
      {
        question: '混沌工程五大原则不包括以下哪个？',
        options: ['建立稳态假设', '多样化事件', '生产环境运行', '随机选择目标用户'],
        answer: 3,
        explanation: '五大原则：建立稳态假设、多样化事件、生产环境运行、自动化持续执行、最小化爆炸半径'
      }
    ]
  },

  {
    id: 'chaos-principles',
    category: '容灾测试',
    subcategory: '混沌工程',
    title: '混沌工程五大原则（Netflix 提出）',
    summary: '全球混沌工程领域的奠基性原则',
    content: # 混沌工程五大原则

## 原则一：建立稳态假设 (Build a Hypothesis Around Steady State)

- **核心**：明确"系统正常"的指标
- **可量化指标**：
  - 业务层：订单成功率 > 99.5%
  - 系统层：P99 延迟 < 200ms
  - 用户层：玩家操作失败率 < 0.1%
- **错误示范**：只说"系统要稳定运行"（不可测）

## 原则二：多样化真实事件 (Vary Real-world Events)

\`\`\`
故障类型清单（必须覆盖）：
├── 硬件故障：硬盘损坏、网卡故障
├── 软件故障：进程崩溃、内存泄漏
├── 网络故障：延迟、丢包、DNS异常
├── 资源故障：CPU满载、磁盘满
├── 人为故障：误操作、错误配置
└── 依赖故障：第三方服务宕机
\`\`\`

## 原则三：生产环境运行 (Run Experiments in Production)

- 测试环境无法模拟真实流量模式
- 必须获得业务方授权和监控
- 配套完整的回滚预案

## 原则四：自动化持续执行 (Automate Experiments to Run Continuously)

- 集成到 CI/CD 流水线
- 发布后自动触发冒烟演练
- 定期回归实验

## 原则五：最小化爆炸半径 (Minimize Blast Radius)

- **从 1% 流量开始**
- 内部测试账号优先
- 设置熔断机制
- 1 次只测 1 个组件

# 适用场景

| 阶段 | 适用范围 | 工具推荐 |
|------|---------|---------|
| 初级 | 单服务/单机 | stress-ng, tc |
| 中级 | 微服务 | ChaosBlade, LitmusChaos |
| 高级 | 分布式/多云 | Chaos Mesh, Gremlin |

# 与故障测试的区别

- **故障测试**：模拟**已知**的故障
- **混沌工程**：主动**探索**未知故障
- 混沌工程是更高阶的故障测试`,
    difficulty: 3,
    importance: 4,
    tags: ['混沌工程', 'Netflix', '原则', '基础理论'],
    source: 'Netflix Chaos Engineering 公开论文',
    relatedIds: ['chaos-engineering-tencent', 'chaos-tools'],
    codeExample: null,
    videoUrl: null,
    quiz: null
  },

  {
    id: 'chaos-tools',
    category: '容灾测试',
    subcategory: '工具链',
    title: '故障注入工具对比（ChaosBlade/Chaos Monkey/LitmusChaos/Gremlin）',
    summary: '主流混沌工程工具选型指南',
    content: `# 主流故障注入工具对比

| 工具 | 类型 | 语言 | 特点 | 适用场景 |
|------|------|------|------|---------|
| **ChaosBlade** | 故障注入平台 | Go | 阿里开源，国内最常用，覆盖场景最全 | 通用 |
| **Chaos Monkey** | 随机杀进程 | Java | Netflix开源，原理先驱 | 简单场景 |
| **LitmusChaos** | K8s混沌 | Go | 云原生场景专用 | K8s环境 |
| **Chaos Mesh** | K8s混沌 | Go | PingCAP开源，腾讯采用 | 云原生 |
| **Gremlin** | 商业平台 | - | 功能全面，企业版收费 | 企业级 |
| **tc/iptables** | Linux内核 | - | 网络层最细粒度控制 | 网络测试 |

# ChaosBlade 实战

## 安装

\`\`\`bash
# Linux x86
wget https://github.com/chaosblade-io/chaosblade/releases/download/v1.7.2/chaosblade-1.7.2-linux-amd64.tar.gz
tar -xvf chaosblade-1.7.2-linux-amd64.tar.gz
cd chaosblade-1.7.2-linux-amd64
./blade create cpu fullload  # CPU 满载演练
\`\`\`

## 常用命令

\`\`\`bash
# CPU 满载演练
blade create cpu fullload

# 网络延迟演练
blade create network delay --time 3000 --interface eth0

# 磁盘IO演练
blade create disk burn --read --write

# 杀进程演练
blade create process kill --process tomcat

# Java 应用故障
blade create jvm OutOfMemoryError --area HEAP
\`\`\`

# Chaos Mesh (K8s 场景)

\`\`\`yaml
apiVersion: chaos-mesh.org/v1alpha1
kind: StressChaos
metadata:
  name: cpu-stress
spec:
  mode: one
  selector:
    labelSelectors:
      app: game-server
  stressors:
    cpu:
      workers: 2
      load: 80
  duration: "10m"
\`\`\`

# 选型建议

1. **初创团队** → ChaosBlade（中文文档、阿里背书）
2. **K8s 重度用户** → Chaos Mesh（云原生原生）
3. **金融级** → Gremlin（合规、企业级支持）
4. **学习原理** → Chaos Monkey（简单，源码好读）`,
    difficulty: 3,
    importance: 4,
    tags: ['工具', 'ChaosBlade', 'Chaos Mesh', 'Gremlin'],
    source: '各项目 GitHub README + 社区实践',
    relatedIds: ['chaos-engineering-tencent', 'chaos-principles'],
    codeExample: '# ChaosBlade 一键演练脚本
#!/bin/bash

# 阶段1: 资源类故障
echo "=== 注入CPU满载 ==="
./blade create cpu fullload --cpu-count 2 --timeout 60

sleep 30

echo "=== 注入网络延迟 ==="
./blade create network delay --time 3000 --interface eth0 --timeout 60

sleep 30

echo "=== 演练结束，开始清理 ==="
./blade destroy $(./blade status --type create | awk "{print \$1}")
',
    videoUrl: 'https://www.youtube.com/embed/lq-XaVYcVSc',
    quiz: null
  },

  {
    id: 'disaster-level',
    category: '容灾测试',
    subcategory: '灾备架构',
    title: '灾备架构等级（同城双活/异地灾备/两地三中心）',
    summary: '从基础到最高级别的灾备架构演进',
    content: `# 灾备等级（国家标准 GB/T 20988-2007）

## 第1级：数据级灾备 (最低)

- 核心：定期数据备份
- RPO：小时级
- RTO：天级
- 适用：内部系统、非关键数据

## 第2级：应用级灾备

- 核心：备用应用实例
- RPO：分钟级
- RTO：小时级
- 适用：一般业务

## 第3级：业务级灾备

- 核心：业务切换能力
- RPO：秒级
- RTO：分钟级
- 适用：核心业务

## 第4级：同城双活 (主流)

- 核心：两个数据中心同时对外服务
- RPO：0
- RTO：分钟级（自动切换）
- 优势：成本适中，可用性高
- 案例：腾讯微信、广州深圳双活

## 第5级：两地三中心

- 核心：同城双活 + 异地灾备
- RPO：秒级
- RTO：小时级
- 适用：金融、关键基础设施
- 案例：银行、支付系统

## 第6级：异地多活 (最高)

- 核心：多个地域同时对外服务
- RPO：0
- RTO：秒级
- 适用：超大规模全球化业务
- 案例：阿里淘宝、抖音

# 游戏行业典型选择

| 游戏类型 | 推荐等级 | 原因 |
|---------|---------|------|
| 小游戏/休闲 | 第2-3级 | 成本敏感 |
| 中重度网游 | 第4级同城双活 | 用户体验优先 |
| 大世界/MMO | 第4-5级 | 数据一致性要求高 |
| 海外发行 | 第6级多活 | 全球低延迟 |

# 同城双活架构图

\`\`\`
          ┌─────────────────┐
          │  智能DNS/GSLB   │
          └────────┬────────┘
                   │
        ┌──────────┴──────────┐
        ▼                     ▼
  ┌──────────┐          ┌──────────┐
  │ 机房A    │   ═══    │ 机房B    │
  │ (主)     │  专线     │ (备)     │
  └────┬─────┘          └────┬─────┘
       │                     │
       └──────┬──────────────┘
              ▼
       ┌─────────────┐
       │  共享存储   │
       └─────────────┘
\`\`\`

# 关键挑战

1. **数据一致性** - 双写延迟、脑裂
2. **流量切换** - DNS解析延迟、连接迁移
3. **脑裂处理** - 抢占锁、fencing token
4. **演练常态化** - 不能等出问题时才切换`,
    difficulty: 3,
    importance: 4,
    tags: ['灾备', '同城双活', '异地多活', '架构'],
    source: 'GB/T 20988-2007 国家标准',
    relatedIds: ['disaster-rto-rpo', 'chaos-engineering-tencent'],
    codeExample: null,
    videoUrl: null,
    quiz: [
      {
        question: '同城双活的 RPO 一般是？',
        options: ['小时级', '分钟级', '0或秒级', '天级'],
        answer: 2,
        explanation: '同城双活采用同步复制，RPO=0 或秒级'
      }
    ]
  },

  {
    id: 'failover-testing',
    category: '容灾测试',
    subcategory: '切换测试',
    title: '主从切换测试方法与用例设计',
    summary: '游戏服务端最常见的高可用方案测试',
    content: `# 主从切换分类

| 类型 | 触发条件 | 数据风险 |
|------|---------|---------|
| **主动切换** | 运维主动触发（发布、升级） | 无 |
| **被动切换 failover** | 主节点故障后自动触发 | 低 |
| **强制切换 switchover** | 跳过数据一致性检查 | 可能丢数据 |
| **计划性切换** | 维护窗口 | 无 |

# 主从切换测试用例清单

## 功能性测试

1. ✅ 主节点宕机后，从节点是否在 **30s 内** 自动接管
2. ✅ 切换完成后，客户端是否自动重连成功
3. ✅ 主节点恢复后，是否自动切回（视业务决定）
4. ✅ **双主（脑裂）**情况下数据是否会写冲突
5. ✅ VIP/DNS 切换是否生效

## 数据一致性测试

1. ✅ 切换期间正在进行的交易数据是否丢失
2. ✅ 玩家金币/装备数据是否一致
3. ✅ 异步任务（如邮件、奖励）是否重复发送
4. ✅ 数据库主从延迟是否在 SLA 范围内（通常 < 1s）
5. ✅ 备份数据能否正常恢复

# MySQL 主从延迟监控

\`\`\`sql
-- 主库：查看主从状态
SHOW MASTER STATUS;

-- 从库：查看主从同步状态
SHOW SLAVE STATUS\\G

-- 关键指标
-- Seconds_Behind_Master: 主从延迟（秒）
-- Slave_IO_Running: IO 线程是否运行
-- Slave_SQL_Running: SQL 线程是否运行
\`\`\`

# 切换演练脚本

\`\`\`python
# 健康检查
def check_master_health():
    try:
        result = subprocess.run(
            ['mysql', '-h', 'master.db', '-e', 'SELECT 1'],
            timeout=5, capture_output=True
        )
        return result.returncode == 0
    except Exception:
        return False

# 自动切换决策
if not check_master_health():
    promote_slave_to_master()
    notify_operators("主库故障，已切换到从库")
\`\`\`

# 关键风险点

1. **数据丢失** - 异步复制有 binlog 丢失风险
2. **脑裂** - 网络分区时两边都认为自己是主
3. **回切抖动** - 主库恢复后回切导致二次中断
4. **客户端重连风暴** - 所有客户端同时重连造成雪崩

# 优化建议

- 客户端重连采用**指数退避**
- 服务端限流保护
- 提前进行客户端预热
- 切换后保留观察期（5-10分钟）`,
    difficulty: 3,
    importance: 4,
    tags: ['主从切换', 'failover', 'MySQL', '高可用'],
    source: 'MySQL 官方文档 + 行业实践',
    relatedIds: ['disaster-rto-rpo', 'disaster-level'],
    codeExample: null,
    videoUrl: 'https://www.youtube.com/embed/MU3t4pL5l5w',
    quiz: null
  },

  // ============ 3. 服务器架构 ============
  {
    id: 'game-arch-overview',
    category: '服务器架构',
    subcategory: '整体架构',
    title: '游戏服务端分层架构（网关/中心/逻辑/DB）',
    summary: '现代游戏服务端通用分层',
    content: `# 游戏服务端四层架构

## 1. 网关层 (Gateway)

**职责**：
- 长连接管理（WebSocket/TCP）
- 协议解析与加密
- 流量控制
- 玩家会话管理

**特性**：
- **无状态**，可无限横向扩展
- 高 QPS（单服 10万+）
- 部署在边缘机房，离用户近

## 2. 中心服 (Center Server)

**职责**：
- 登录认证
- 玩家档案管理
- 好友/聊天/匹配
- 排行榜

**特性**：
- 全局共享
- 写多读多，需 Redis 缓存
- 单点风险高，常做主备

## 3. 逻辑服 (Logic Server)

**职责**：
- 业务逻辑处理
- 战斗/技能/任务
- 玩家状态管理
- 数据持久化

**特性**：
- **按区/分线**分配
- 强状态，需本地缓存
- 一区多服，跨服需走专用跨服服

## 4. 数据层 (Data Layer)

- MySQL 主从
- Redis Cluster
- MongoDB（日志/非结构化）
- Tair/Pika（大数据量 KV）

# 架构图

\`\`\`
       ┌─────────────────────┐
       │    客户端 (C++/C#)   │
       └──────────┬──────────┘
                  │ HTTPS/WebSocket
                  ▼
       ┌─────────────────────┐
       │ 负载均衡 (LVS/Nginx)│
       └──┬──────────┬───────┘
          │          │
          ▼          ▼
       ┌──────┐  ┌──────┐
       │网关服│  │网关服│   ← 无状态
       └──┬───┘  └──┬───┘
          │         │
          └────┬────┘
               ▼
       ┌──────────────┐
       │  中心服       │   ← 登录/匹配/排行
       └──────┬───────┘
              │
       ┌──────┼──────┐
       ▼      ▼      ▼
     ┌────┐ ┌────┐ ┌────┐
     │逻辑│ │逻辑│ │逻辑│  ← 按区分服
     │1服 │ │2服 │ │3服 │
     └─┬──┘ └─┬──┘ └─┬──┘
       └──────┼──────┘
              ▼
       ┌──────────────┐
       │  MySQL主从    │
       │  Redis集群    │
       └──────────────┘
\`\`\`

# 同步方式

| 类型 | 适用场景 | 延迟 |
|------|---------|------|
| **状态同步** | MMO/MOBA（王者荣耀）| 100ms |
| **帧同步** | 即时战略/格斗（和平精英）| 50ms |
| **混合同步** | 大世界（原神）| 100-200ms |
| **回合制** | 卡牌（梦幻西游）| - |`,
    difficulty: 3,
    importance: 5,
    tags: ['架构', '服务器', '分层', '游戏'],
    source: '游戏行业通用架构',
    relatedIds: ['arch-state-sync', 'arch-frame-sync'],
    codeExample: null,
    videoUrl: 'https://www.youtube.com/embed/TG6kV7mK9wQ',
    quiz: null
  },

  {
    id: 'arch-state-sync',
    category: '服务器架构',
    subcategory: '同步方式',
    title: '状态同步 vs 帧同步（核心区别）',
    summary: '游戏服务端最核心的两类同步方案',
    content: `# 状态同步 (State Synchronization)

**原理**：服务器跑完整游戏逻辑，定期把状态推给客户端

**优点**：
- 防作弊强（逻辑在服务端）
- 带宽需求中等
- 适合复杂逻辑

**缺点**：
- 服务器压力大
- 网络延迟敏感

**代表**：王者荣耀、LOL

\`\`\`
客户端  ──[操作]──>  服务端
服务端  ──[状态]──>  客户端
        100ms/次
\`\`\`

# 帧同步 (Frame Synchronization)

**原理**：所有客户端跑相同逻辑，服务器只负责转发指令

**优点**：
- 服务器压力小（无逻辑计算）
- 客户端体验流畅
- 反外挂较弱

**缺点**：
- 带宽需求高
- 断线重连复杂
- 浮点数精度问题

**代表**：和平精英、星际争霸

\`\`\`
客户端  ──[指令]──>  服务端  ──[广播]──>  所有客户端
                          16ms/帧
\`\`\`

# 详细对比

| 维度 | 状态同步 | 帧同步 |
|------|---------|--------|
| 服务器压力 | 大 | 小 |
| 带宽 | 中 | 大 |
| 反作弊 | 强 | 弱 |
| 断线重连 | 简单 | 复杂 |
| 网络延迟 | 100-200ms 容忍 | < 100ms |
| 适用规模 | 5v5 房间 | 100人战场 |

# 选型决策树

\`\`\`
游戏类型？
├── MOBA/卡牌 → 状态同步
├── RTS/FPS  → 帧同步
├── MMO 大世界 → 混合同步
└── 休闲单机 → 弱联网

玩家规模？
├── ≤ 10人 → 帧同步
└── ≥ 20人 → 状态同步
\`\`\`

# 混合同步案例

**原神**：
- 单人/小队：状态同步
- 联机世界：混合同步 + 区域服务器
- Boss战：状态同步保证一致性

# 测试关注点

## 状态同步测试

- 服务器状态机正确性
- 玩家位置同步精度
- 伤害计算一致性
- 反外挂机制

## 帧同步测试

- 浮点精度（必须用定点数）
- 指令重放一致性
- 网络断线重连
- 不同硬件的同步`,
    difficulty: 4,
    importance: 5,
    tags: ['状态同步', '帧同步', '游戏', '架构'],
    source: '腾讯互娱技术博客 + GDC 公开演讲',
    relatedIds: ['game-arch-overview', 'arch-frame-sync'],
    codeExample: '# 帧同步客户端伪代码
class FrameSyncClient:
    def __init__(self):
        self.frame = 0
        self.inputs = []
    
    def on_user_input(self, action):
        self.inputs.append({
            "frame": self.frame,
            "action": action
        })
    
    def on_next_frame(self):
        # 1. 上传输入到服务器
        self.upload_inputs(self.inputs)
        # 2. 接收其他玩家输入
        all_inputs = self.receive_inputs()
        # 3. 本地推进游戏逻辑
        self.game_logic.advance(all_inputs)
        self.frame += 1
        self.inputs = []',
    videoUrl: 'https://www.youtube.com/embed/0jK27I0pF8g',
    quiz: [
      {
        question: '王者荣耀采用的是哪种同步方式？',
        options: ['帧同步', '状态同步', '混合同步', 'P2P直连'],
        answer: 1,
        explanation: '王者荣耀是5v5 MOBA，使用状态同步，反作弊能力强'
      }
    ]
  },

  {
    id: 'cap-theorem',
    category: '服务器架构',
    subcategory: '分布式理论',
    title: 'CAP 定理（一致性/可用性/分区容错性）',
    summary: '分布式系统最基础的理论',
    content: `# CAP 三要素

## C - Consistency 一致性

所有节点在同一时刻看到的数据完全相同

- **强一致性**：写入后立即可读到
- **弱一致性**：写入后可能延迟可读
- **最终一致性**：经过一段时间后数据一致

## A - Availability 可用性

每个请求都能在合理时间内得到响应（不保证最新数据）

## P - Partition tolerance 分区容错性

网络分区（节点之间通信失败）时系统仍能继续运行

# CAP 定理

> **在分布式系统中，CAP 三者最多只能同时满足两个**

| 组合 | 适用场景 | 案例 |
|------|---------|------|
| **CA** | 单机房内部系统 | 传统数据库 |
| **CP** | 金融、订单 | Redis、HBase、ZooKeeper |
| **AP** | 社交、推荐 | Cassandra、DynamoDB |

# 实际取舍

**网络分区 P 是必选项**（无法避免），所以实际上是在 **C 和 A 之间取舍**：

- **金融支付** → 选 CP，宁可拒绝服务也要数据准确
- **社交动态** → 选 AP，宁可看到旧数据也要服务可用

# BASE 理论（AP 的延伸）

- **BA** - Basically Available 基本可用
- **S** - Soft State 软状态
- **E** - Eventually Consistent 最终一致性

# 案例分析

## Redis Cluster 选 CP
- 主从切换时会拒绝写入
- 保证读到的是有效数据

## Eureka 选 AP
- 服务发现宁可读到过期信息
- 也要保证服务注册中心可用

## MySQL 主从选 AP
- 主从延迟时从库可能读到旧数据
- 保证服务可用

# 游戏服务端常见选择

| 组件 | CAP选择 | 原因 |
|------|---------|------|
| 玩家档案 | CP | 数据准确性优先 |
| 排行榜 | AP | 实时性优先 |
| 战斗服 | CP | 反作弊优先 |
| 邮件系统 | AP | 可异步处理 |`,
    difficulty: 3,
    importance: 4,
    tags: ['CAP', '分布式', '理论'],
    source: 'Eric Brewer 1999年提出',
    relatedIds: ['game-arch-overview', 'mysql-replication'],
    codeExample: null,
    videoUrl: null,
    quiz: [
      {
        question: 'CAP 定理中，哪个是分布式系统必须支持的？',
        options: ['一致性 C', '可用性 A', '分区容错性 P', '都不必须'],
        answer: 2,
        explanation: '网络分区在分布式系统中不可避免，所以 P 是必选项'
      }
    ]
  },

  // ============ 4. Python 实验室 ============
  {
    id: 'python-basics',
    category: 'Python 实验室',
    subcategory: '基础语法',
    title: 'Python 测试开发必备基础（速成）',
    summary: '测试工程师必备的 Python 核心语法',
    content: `# 测试岗 Python 关键判断

这个岗的 Python **不是核心开发**，是"**测试工程的语言**"。门槛远低于想象：能看懂脚本、改简单逻辑、写自动化工具就够。

# 必备知识点清单

## 1. 基础语法（必须掌握）

\`\`\`python
# 变量与类型
name = "Tom"            # str
age = 18                # int
score = 98.5            # float
is_vip = True           # bool
items = [1, 2, 3]       # list
player = {"id": 1}      # dict
unique = {1, 2, 3}      # set

# 条件与循环
if score >= 90:
    rank = "S"
elif score >= 80:
    rank = "A"
else:
    rank = "B"

# for 循环
for i in range(10):
    print(i)

# while 循环
while age < 18:
    print("未成年")
    age += 1
\`\`\`

## 2. 函数与参数

\`\`\`python
def calculate_damage(attacker, defender, skill=1):
    """计算伤害值"""
    base = attacker["attack"] - defender["defense"]
    return base * skill

# 调用
result = calculate_damage(
    {"attack": 100},
    {"defense": 50},
    skill=1.5
)
\`\`\`

## 3. 文件与异常

\`\`\`python
# 读取日志
try:
    with open("game.log", "r", encoding="utf-8") as f:
        for line in f:
            if "ERROR" in line:
                print(line.strip())
except FileNotFoundError:
    print("日志文件不存在")
\`\`\`

## 4. 第三方库（核心）

| 库 | 用途 |
|---|------|
| **requests** | HTTP接口测试 |
| **pytest** | 单元测试框架 |
| **pymysql** | MySQL操作 |
| **redis** | Redis操作 |
| **locust** | 性能压测 |
| **loguru** | 日志处理 |
| **pandas** | 数据分析 |
| **openpyxl** | Excel处理 |

# 一天速通路径

1. **上午 2h**：基础语法（变量、循环、函数）
2. **下午 3h**：requests + pytest 实战
3. **晚上 3h**：写一个完整的测试脚本

# 推荐资源

- 官方文档：https://docs.python.org/zh-cn/3/
- pytest 文档：https://docs.pytest.org/
- RealPython：https://realpython.com/`,
    difficulty: 2,
    importance: 5,
    tags: ['Python', '基础', '语法'],
    source: 'Python 官方文档',
    relatedIds: ['python-pytest', 'python-requests'],
    codeExample: null,
    videoUrl: 'https://www.youtube.com/embed/r-uOLxNrNk8',
    quiz: null
  },

  {
    id: 'python-pytest',
    category: 'Python 实验室',
    subcategory: '测试框架',
    title: 'Pytest 自动化测试框架',
    summary: 'Python 测试领域的事实标准',
    content: `# Pytest 核心特性

## 1. 简单示例

\`\`\`python
# test_player.py
def add(a, b):
    return a + b

def test_add():
    assert add(1, 2) == 3

def test_add_negative():
    assert add(-1, 1) == 0
\`\`\`

运行：\`pytest test_player.py\`

## 2. Fixture（最重要的特性）

\`\`\`python
import pytest

@pytest.fixture
def sample_player():
    return {
        "id": 1001,
        "name": "Tom",
        "level": 30,
        "gold": 5000
    }

def test_player_level(sample_player):
    assert sample_player["level"] == 30

def test_player_gold(sample_player):
    assert sample_player["gold"] == 5000
\`\`\`

## 3. 参数化测试

\`\`\`python
@pytest.mark.parametrize("a,b,expected", [
    (1, 2, 3),
    (0, 0, 0),
    (-1, 1, 0),
    (100, 200, 300),
])
def test_add(a, b, expected):
    assert a + b == expected
\`\`\`

## 4. Mock 模拟

\`\`\`python
from unittest.mock import patch, MagicMock

# 模拟数据库连接
def get_player_name(player_id):
    db = connect_db()  # 实际不应该真连
    return db.query(f"SELECT name FROM players WHERE id={player_id}")

# 测试时
def test_get_player_name():
    with patch("__main__.connect_db") as mock_db:
        mock_db.return_value.query.return_value = "Tom"
        result = get_player_name(1)
        assert result == "Tom"
\`\`\`

## 5. 测试报告

\`\`\`bash
# 安装
pip install pytest-html

# 运行
pytest --html=report.html --self-contained-html
\`\`\`

# 常用插件

| 插件 | 用途 |
|------|------|
| pytest-html | HTML 报告 |
| pytest-xdist | 并行执行 |
| pytest-cov | 代码覆盖率 |
| pytest-mock | Mock 增强 |
| pytest-rerunfailures | 失败重试 |`,
    difficulty: 3,
    importance: 4,
    tags: ['pytest', '测试框架', '自动化'],
    source: 'pytest 官方文档',
    relatedIds: ['python-basics', 'python-requests'],
    codeExample: null,
    videoUrl: null,
    quiz: null
  },

  {
    id: 'python-requests',
    category: 'Python 实验室',
    subcategory: '接口测试',
    title: 'Requests 接口测试实战',
    summary: '测试游戏服务端 API 的标准库',
    content: `# Requests 库核心用法

## 1. 基础请求

\`\`\`python
import requests

# GET 请求
resp = requests.get("https://api.game.com/player/1001")
print(resp.status_code)  # 200
print(resp.json())        # {"id": 1001, "name": "Tom"}

# POST 请求
data = {"player_id": 1001, "item_id": 5001}
resp = requests.post(
    "https://api.game.com/purchase",
    json=data
)

# 带 Header
headers = {"Authorization": "Bearer xxx"}
resp = requests.get(url, headers=headers)

# 带 Cookie
cookies = {"session_id": "abc123"}
resp = requests.get(url, cookies=cookies)
\`\`\`

## 2. 实战：游戏登录接口测试

\`\`\`python
import requests
import pytest

class TestGameLogin:
    BASE_URL = "https://api.game.com"
    
    def test_login_success(self):
        """正常登录"""
        resp = requests.post(
            f"{self.BASE_URL}/login",
            json={
                "username": "test001",
                "password": "Test123!"
            }
        )
        assert resp.status_code == 200
        data = resp.json()
        assert "token" in data
        assert data["code"] == 0
    
    def test_login_wrong_password(self):
        """密码错误"""
        resp = requests.post(
            f"{self.BASE_URL}/login",
            json={"username": "test001", "password": "wrong"}
        )
        assert resp.status_code == 200
        assert resp.json()["code"] != 0
    
    @pytest.mark.parametrize("username,password,expected_code", [
        ("", "123", 1001),              # 空用户名
        ("test", "", 1002),             # 空密码
        ("a"*1000, "123", 1003),        # 超长用户名
        ("test'; DROP--", "123", 1004), # SQL注入
    ])
    def test_login_edge_cases(self, username, password, expected_code):
        """边界用例"""
        resp = requests.post(
            f"{self.BASE_URL}/login",
            json={"username": username, "password": password}
        )
        assert resp.json()["code"] == expected_code
\`\`\`

## 3. Session（保持登录态）

\`\`\`python
session = requests.Session()
session.post(url, json={"username": "test", "password": "123"})

# 后续请求自动带 cookie
resp = session.get(f"{BASE_URL}/player/info")
\`\`\`

## 4. 超时与重试

\`\`\`python
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

session = requests.Session()
retry = Retry(
    total=3,
    backoff_factor=0.5,
    status_forcelist=[500, 502, 503, 504]
)
adapter = HTTPAdapter(max_retries=retry)
session.mount("https://", adapter)

resp = session.get(url, timeout=10)
\`\`\`

# 性能对比

| 库 | 性能 | 易用性 |
|---|------|--------|
| requests | 中 | ⭐⭐⭐⭐⭐ |
| aiohttp | 高 | ⭐⭐⭐ |
| httpx | 高 | ⭐⭐⭐⭐ |`,
    difficulty: 3,
    importance: 4,
    tags: ['requests', '接口测试', 'API'],
    source: 'requests 官方文档',
    relatedIds: ['python-pytest', 'python-basics'],
    codeExample: null,
    videoUrl: 'https://www.youtube.com/embed/3vO1nK5JjFw',
    quiz: null
  },

  // ============ 5. 网络协议 ============
  {
    id: 'tcp-three-handshake',
    category: '网络协议',
    subcategory: 'TCP/IP',
    title: 'TCP 三次握手与四次挥手（高频必考）',
    summary: '网络协议面试最高频考点',
    content: `# TCP 三次握手

## 状态流转图

\`\`\`
客户端              服务端
  CLOSED           LISTEN
    │                │
    │──SYN(seq=x)──>│  ← SYN_SENT
    │                │  ← SYN_RCVD
    │<─SYN+ACK──────│
    │  (seq=y, ack=x+1)
    │                │
    │──ACK(ack=y+1)─>│
    │                │  ← ESTABLISHED
    │<───ESTABLISHED│
\`\`\`

## 状态机

- **LISTEN**：服务端监听
- **SYN_SENT**：客户端已发送 SYN
- **SYN_RCVD**：服务端收到 SYN
- **ESTABLISHED**：连接建立

## 为什么是三次不是两次？

**防止已失效的连接请求突然传到服务端**

- 客户端发送的 SYN1 因网络延迟滞留
- 客户端重发 SYN2，建立连接后正常关闭
- **SYN1 突然到达服务端**
- 如果是两次握手，服务端会误以为是新连接，白白浪费资源
- 三次握手时，客户端收到后会发送 RST 拒绝

# TCP 四次挥手

\`\`\`
客户端              服务端
ESTABLISHED       ESTABLISHED
    │                │
    │──FIN(seq=u)──>│
    │  FIN_WAIT_1    │  CLOSE_WAIT
    │<───ACK────────│
    │  FIN_WAIT_2    │
    │                │──FIN(seq=v)──>│
    │                │  LAST_ACK    │  TIME_WAIT (客户端)
    │<──────FIN──────│
    │  TIME_WAIT     │
    │───ACK────────>│
    │  等待 2MSL     │  CLOSED
    │  CLOSED        │
\`\`\`

## 关键状态

- **FIN_WAIT_1**：主动方发送 FIN 后
- **FIN_WAIT_2**：主动方收到 ACK 后
- **TIME_WAIT**：主动方最后 ACK 发出后等待 2MSL（最长 4分钟）
- **CLOSE_WAIT**：被动方收到 FIN 后

## 为什么是四次不是三次？

服务端收到 FIN 后，**可能还有数据要发送**：
1. 收到 FIN → 立即 ACK（先告诉对方"我收到了"）
2. 数据发完 → 发送自己的 FIN
3. 客户端 ACK
4. 关闭完成

## 为什么 TIME_WAIT 要等 2MSL？

- **MSL** = Maximum Segment Lifetime，报文最大生存时间
- **作用1**：保证最后的 ACK 能到达对方
- **作用2**：让本次连接的所有报文在网络中消失
- 避免下次连接时收到旧报文

# 常见面试题

## Q1: 大量 TIME_WAIT 怎么办？

调小 \`tcp_fin_timeout\` 内核参数，或开启 \`tcp_tw_reuse\`（客户端）

## Q2: 大量 CLOSE_WAIT 怎么办？

通常是代码问题：服务端忘了 close() 连接

## Q3: 客户端突然断电，服务端怎么办？

开启 **TCP KeepAlive**（默认 2小时才检测，可缩短）`,
    difficulty: 3,
    importance: 5,
    tags: ['TCP', '三次握手', '四次挥手', '高频'],
    source: 'RFC 793 + 谢希仁《计算机网络》',
    relatedIds: ['http-status', 'tcp-udp-diff'],
    codeExample: null,
    videoUrl: 'https://www.youtube.com/embed/aU_mWTZ8AuU',
    quiz: [
      {
        question: 'TCP 三次握手中，第二次握手发送的是？',
        options: ['SYN', 'ACK', 'SYN+ACK', 'FIN'],
        answer: 2,
        explanation: '第二次握手同时发送 SYN（同步）和 ACK（确认）'
      },
      {
        question: 'TIME_WAIT 状态持续多久？',
        options: ['1秒', '10秒', '2MSL', '1分钟'],
        answer: 2,
        explanation: 'TIME_WAIT 持续 2 倍 MSL（Maximum Segment Lifetime）'
      }
    ]
  },

  {
    id: 'tcp-udp-diff',
    category: '网络协议',
    subcategory: 'TCP/IP',
    title: 'TCP vs UDP 核心区别（高频必考）',
    summary: '网络协议面试最高频考点',
    content: `# 核心区别

| 特性 | TCP | UDP |
|------|-----|-----|
| **连接** | 面向连接 | 无连接 |
| **可靠性** | 可靠传输 | 不可靠 |
| **顺序** | 保证顺序 | 不保证 |
| **速度** | 慢 | 快 |
| **流量控制** | 有 | 无 |
| **拥塞控制** | 有 | 无 |
| **头部大小** | 20 字节 | 8 字节 |
| **传输方式** | 字节流 | 数据报 |

# 详细对比

## TCP（传输控制协议）

**优点**：
- 数据可靠传输（重传、排序、去重）
- 流量控制（滑动窗口）
- 拥塞控制（慢启动、拥塞避免）

**缺点**：
- 头部大（20 字节）
- 三次握手开销
- 速度相对慢

**适用场景**：
- HTTP/HTTPS
- 文件传输
- 邮件
- 数据库连接
- 游戏登录/支付

## UDP（用户数据报协议）

**优点**：
- 头部小（8 字节）
- 无连接，发完即走
- 速度快

**缺点**：
- 不保证送达
- 不保证顺序
- 没有流量控制

**适用场景**：
- 视频直播
- 语音通话
- DNS 查询
- 游戏内高频小包（如 MOBA 技能）
- 广播

# 游戏中的典型应用

| 业务 | 协议 | 原因 |
|------|------|------|
| 登录 | TCP | 可靠性优先 |
| 支付 | TCP | 不能丢 |
| 战斗同步 | UDP/TCP | 看类型 |
| 语音聊天 | UDP | 实时性优先 |
| 邮件 | TCP | 不急 |
| 排行榜 | TCP | 数据准确 |
| Ping | UDP | 不关心结果 |

# 真实游戏案例

## 王者荣耀

- 登录、商城：TCP
- 战斗指令：自研 UDP（KCP/QUIC）
- 语音：UDP

## 和平精英

- 登录：TCP
- 帧同步：UDP + 可靠信道
- 语音：UDP

# 进阶：QUIC 协议

UDP 之上的可靠协议，**HTTP/3** 的基础：

- 多路复用（解决 TCP 队头阻塞）
- 0-RTT 握手（比 TCP 快 1 个 RTT）
- 内置 TLS 1.3

**代表应用**：HTTP/3、Cloudflare`,
    difficulty: 2,
    importance: 5,
    tags: ['TCP', 'UDP', '对比', '高频'],
    source: 'RFC 793 + 行业实践',
    relatedIds: ['tcp-three-handshake', 'http-status'],
    codeExample: null,
    videoUrl: null,
    quiz: [
      {
        question: '游戏内高频小包（如 MOBA 技能）通常使用？',
        options: ['TCP', 'UDP', 'HTTP', 'SMTP'],
        answer: 1,
        explanation: '高频小包对实时性要求高、丢一两个无所谓，用 UDP'
      }
    ]
  },

  {
    id: 'http-status',
    category: '网络协议',
    subcategory: 'HTTP',
    title: 'HTTP 常见状态码与 HTTPS 安全机制',
    summary: 'HTTP 状态码速查表',
    content: `# HTTP 状态码分类

| 类别 | 范围 | 含义 |
|------|------|------|
| 1xx | 100-199 | 信息响应 |
| 2xx | 200-299 | 成功 |
| 3xx | 300-399 | 重定向 |
| 4xx | 400-499 | 客户端错误 |
| 5xx | 500-599 | 服务器错误 |

# 常见状态码

## 2xx 成功

| 状态码 | 含义 | 例子 |
|--------|------|------|
| 200 | OK | 正常返回 |
| 201 | Created | 资源创建成功 |
| 204 | No Content | 删除成功 |

## 3xx 重定向

| 状态码 | 含义 | 例子 |
|--------|------|------|
| 301 | 永久重定向 | 域名切换 |
| 302 | 临时重定向 | 登录跳转 |
| 304 | Not Modified | 缓存命中 |

## 4xx 客户端错误

| 状态码 | 含义 | 例子 |
|--------|------|------|
| 400 | Bad Request | 参数错误 |
| 401 | Unauthorized | 未登录 |
| 403 | Forbidden | 权限不足 |
| 404 | Not Found | 资源不存在 |
| 405 | Method Not Allowed | 用了错的HTTP方法 |
| 429 | Too Many Requests | 限流 |

## 5xx 服务端错误

| 状态码 | 含义 | 例子 |
|--------|------|------|
| 500 | Internal Server Error | 代码异常 |
| 502 | Bad Gateway | 上游服务挂 |
| 503 | Service Unavailable | 过载保护 |
| 504 | Gateway Timeout | 上游慢 |

# GET vs POST 区别

| 维度 | GET | POST |
|------|-----|------|
| 用途 | 获取资源 | 提交数据 |
| 参数位置 | URL | Body |
| 长度限制 | 有（浏览器） | 无 |
| 安全性 | 低 | 相对高 |
| 幂等 | 是 | 否 |
| 缓存 | 可缓存 | 不可 |

# HTTPS 加密机制

## TLS 握手流程

\`\`\`
客户端                  服务端
   │                      │
   │──ClientHello────────>│
   │  (支持的密码套件)     │
   │                      │
   │<─ServerHello─────────│
   │  (选定密码套件+证书)  │
   │                      │
   │  验证证书            │
   │  生成pre-master      │
   │  用公钥加密           │
   │──Encrypted Pre-Master>│
   │                      │
   │  双方计算出会话密钥   │
   │<───Finished─────────│
   │                      │
   │  加密通信开始         │
\`\`\`

## 关键概念

- **对称加密**：AES、DES（快）
- **非对称加密**：RSA、ECC（安全但慢）
- **混合加密**：用 RSA 传密钥，AES 加密数据
- **数字证书**：CA 机构颁发，证明服务端身份

# HTTP 演进

| 版本 | 特性 | 延迟 |
|------|------|------|
| HTTP/1.0 | 短连接 | 高 |
| HTTP/1.1 | 长连接 | 中 |
| HTTP/2 | 多路复用、HPACK | 低 |
| HTTP/3 | QUIC（UDP）| 极低 |`,
    difficulty: 2,
    importance: 4,
    tags: ['HTTP', '状态码', 'HTTPS', '高频'],
    source: 'RFC 7230/7231/7540',
    relatedIds: ['tcp-three-handshake'],
    codeExample: null,
    videoUrl: null,
    quiz: [
      {
        question: '502 错误的含义是？',
        options: ['请求错误', '未授权', '网关错误', '服务不可用'],
        answer: 2,
        explanation: '502 Bad Gateway = 网关从上游收到了无效响应'
      }
    ]
  },

  // ============ 6. 数据库 ============
  {
    id: 'mysql-replication',
    category: '数据库',
    subcategory: 'MySQL',
    title: 'MySQL 主从复制原理与延迟监控',
    summary: 'MySQL 高可用的基石',
    content: `# 主从复制原理

\`\`\`
   Master                Slave
   ┌─────┐               ┌─────┐
   │写入 │               │     │
   └──┬──┘               │     │
      │                  │     │
      ▼                  │     │
   ┌─────────┐           │     │
   │ Binlog  │           │     │
   └────┬────┘           │     │
        │                │     │
        │   I/O Thread   │     │
        ├────────────────>     │
        │                │  Log│
        │  SQL Thread    │     │
        │<───────────────┤     │
        │                │     │
        │  重放SQL        │     │
        │                │     │
        ▼                ▼     ▼
\`\`\`

# 三种复制方式

## 1. 异步复制（默认）

- Master 写入 Binlog 即返回
- Slave 异步拉取
- 风险：Master 宕机可能丢数据

## 2. 半同步复制

- Master 等待**至少一个 Slave** ACK
- 至少不丢数据
- 性能略低

## 3. 全同步复制

- 等待所有 Slave ACK
- 强一致
- 性能最差

# 监控主从延迟

\`\`\`sql
-- 在从库执行
SHOW SLAVE STATUS\\G

-- 关键指标
-- Seconds_Behind_Master: 主从延迟（秒）
-- Slave_IO_Running: IO 线程状态
-- Slave_SQL_Running: SQL 线程状态
-- Relay_Log_Space: relay log 大小
\`\`\`

# 延迟原因排查

1. **Slave 性能差** - iostat 看看磁盘
2. **大事务** - 一个事务包含 100w 行
3. **DDL 操作** - ALTER TABLE 会重建
4. **网络延迟** - 同城 vs 异地

# 优化方案

| 方案 | 效果 |
|------|------|
| **多线程复制** | MySQL 5.7+ slave_parallel_workers |
| **GTID** | 解决主从切换位点问题 |
| **MGR** | MySQL Group Replication，强一致 |
| **读写分离** | 写主读从，分担压力 |

# 测试关注点

1. ✅ 写入后立即读取是否一致
2. ✅ 主从切换后是否丢数据
3. ✅ Slave 延迟时的用户体验
4. ✅ Binlog 完整性校验
5. ✅ 大表 DDL 的延迟影响`,
    difficulty: 3,
    importance: 4,
    tags: ['MySQL', '主从复制', '高可用'],
    source: 'MySQL 官方文档',
    relatedIds: ['cap-theorem', 'redis-cache'],
    codeExample: null,
    videoUrl: null,
    quiz: null
  },

  {
    id: 'redis-cache',
    category: '数据库',
    subcategory: 'Redis',
    title: 'Redis 三大缓存问题（击穿/雪崩/穿透）',
    summary: '缓存设计必考',
    content: `# 三大问题

## 1. 缓存击穿 (Cache Breakdown)

**场景**：某个**热点 key** 过期瞬间，大量请求同时打到 DB

**解决方案**：

\`\`\`python
# 方案1: 互斥锁（分布式锁）
def get_data(key):
    value = redis.get(key)
    if not value:
        # 只有第一个请求能拿到锁
        if redis.set(f"lock:{key}", "1", nx=True, ex=10):
            try:
                value = db.query(key)
                redis.set(key, value, ex=3600)
            finally:
                redis.delete(f"lock:{key}")
        else:
            time.sleep(0.1)
            return get_data(key)
    return value

# 方案2: 逻辑过期
# key 不设过期时间，业务字段加 expire_at
# 读到时判断过期则后台异步刷新
\`\`\`

## 2. 缓存雪崩 (Cache Avalanche)

**场景**：**大量 key 同时过期**，DB 压力瞬间飙升

**解决方案**：

\`\`\`python
# 方案1: 过期时间加随机值
import random
expire = 3600 + random.randint(0, 600)
redis.set(key, value, ex=expire)

# 方案2: 多级缓存
# L1: 本地缓存 (Caffeine)
# L2: Redis
# L3: DB

# 方案3: 熔断降级
# Hystrix/Sentinel 限流
\`\`\`

## 3. 缓存穿透 (Cache Penetration)

**场景**：查询**不存在的数据**，绕过缓存直接打 DB

**解决方案**：

\`\`\`python
# 方案1: 布隆过滤器
from pybloomfilter import BloomFilter
bf = BloomFilter(1000000, 0.01)

def get_data(key):
    if key not in bf:  # 不存在直接返回
        return None
    value = redis.get(key)
    if not value:
        value = db.query(key)
        if value:
            redis.set(key, value, ex=3600)
    return value

# 方案2: 空值缓存
def get_data(key):
    value = redis.get(key)
    if value is None:
        value = db.query(key)
        redis.set(key, value or "NULL", ex=60)  # 缓存空值
    return value
\`\`\`

# 三大问题对比

| 维度 | 击穿 | 雪崩 | 穿透 |
|------|------|------|------|
| 原因 | 单热点key过期 | 大量key同时过期 | 查不存在数据 |
| 风险 | DB热点 | DB雪崩 | DB空查 |
| 方案 | 互斥锁 | 过期随机 | 布隆过滤器 |
| 难度 | 中 | 低 | 高 |

# 真实游戏案例

## 案例1：排行榜雪崩

**现象**：每周排行榜结算时 Redis 卡死
**原因**：所有排行榜 key 同时过期
**解决**：过期时间增加 5% 随机值

## 案例2：登录穿透

**现象**：恶意用户用 UUID 撞库
**解决**：登录接口前置布隆过滤器`,
    difficulty: 3,
    importance: 5,
    tags: ['Redis', '缓存', '高频', '必考'],
    source: 'Redis 官方文档 + 行业实践',
    relatedIds: ['mysql-replication'],
    codeExample: null,
    videoUrl: null,
    quiz: [
      {
        question: '布隆过滤器主要用于解决？',
        options: ['缓存击穿', '缓存雪崩', '缓存穿透', '主从延迟'],
        answer: 2,
        explanation: '布隆过滤器快速判断 key 是否存在，防止查询不存在数据'
      }
    ]
  },

  // ============ 7. 性能测试 ============
  {
    id: 'perf-locust',
    category: '性能测试',
    subcategory: '压测工具',
    title: 'Locust 性能压测实战',
    summary: 'Python 生态最主流的压测工具',
    content: `# Locust 简介

Python 编写的高性能压测工具，支持**分布式**，可压测数百万并发。

## 安装

\`\`\`bash
pip install locust
\`\`\`

## 基础示例

\`\`\`python
from locust import HttpUser, task, between

class GameUser(HttpUser):
    # 用户每次请求间隔 1-3 秒
    wait_time = between(1, 3)
    
    def on_start(self):
        """用户登录"""
        self.client.post("/login", json={
            "username": "test001",
            "password": "Test123!"
        })
    
    @task(3)  # 权重3，执行频率最高
    def get_player_info(self):
        self.client.get("/player/1001")
    
    @task(2)
    def get_ranking(self):
        self.client.get("/ranking/top10")
    
    @task(1)
    def purchase_item(self):
        self.client.post("/purchase", json={
            "item_id": 5001,
            "quantity": 1
        })
\`\`\`

## 运行

\`\`\`bash
# Web 模式
locust -f locustfile.py

# 无头模式
locust -f locustfile.py --headless -u 1000 -r 100 -t 5m
# -u: 总用户数
# -r: 每秒启动用户数
# -t: 持续时间
\`\`\`

## 分布式压测

\`\`\`bash
# Master
locust -f locustfile.py --master

# Worker (可启动多个)
locust -f locustfile.py --worker --master-host=192.168.1.1
\`\`\`

## 关键指标

| 指标 | 含义 | 健康值 |
|------|------|--------|
| **RPS** | 每秒请求数 | - |
| **P50 延迟** | 中位数 | < 100ms |
| **P95 延迟** | 95%请求的延迟 | < 500ms |
| **P99 延迟** | 99%请求的延迟 | < 1s |
| **错误率** | 失败请求占比 | < 0.1% |

# 游戏压测场景

## 登录压测

\`\`\`python
class LoginStressTest(HttpUser):
    wait_time = between(0.1, 0.5)
    
    @task
    def login(self):
        with self.client.post("/login", 
            json={"username": f"user_{random.randint(1, 10000)}",
                  "password": "Test123!"},
            catch_response=True) as response:
            if response.status_code == 200:
                response.success()
            else:
                response.failure(f"登录失败: {response.status_code}")
\`\`\`

## 战斗压测

\`\`\`python
class BattleStressTest(HttpUser):
    @task
    def battle_action(self):
        # 模拟战斗指令
        self.client.post("/battle/action", json={
            "room_id": self.room_id,
            "action": random.choice(["attack", "skill", "defend"]),
            "timestamp": int(time.time() * 1000)
        })
\`\`\`

# 性能调优

## 1. 客户端

- 关闭 SSL（内网）
- 连接复用
- 异步请求

## 2. 服务端

- 数据库连接池
- 缓存预热
- 限流降级

## 3. 中间件

- Redis Cluster 分片
- MQ 批量消费`,
    difficulty: 3,
    importance: 4,
    tags: ['Locust', '压测', '性能'],
    source: 'Locust 官方文档',
    relatedIds: ['perf-metrics'],
    codeExample: null,
    videoUrl: null,
    quiz: null
  },

  {
    id: 'perf-metrics',
    category: '性能测试',
    subcategory: '指标体系',
    title: '性能测试核心指标（P50/P95/P99/吞吐量）',
    summary: '性能测试必懂指标',
    content: `# 性能指标三大类

## 1. 吞吐量指标

### QPS (Queries Per Second)

每秒查询数，衡量系统**容量**

### TPS (Transactions Per Second)

每秒事务数，比 QPS 更严格（一个事务可能含多个查询）

### 并发数

同时在处理的请求数

## 2. 延迟指标

### 平均延迟

\`avg = sum(durations) / count\`

**问题**：容易被极端值拉偏

### P50 (中位数)

50% 的请求延迟低于此值

**特点**：反映**典型**用户体验

### P95

95% 的请求延迟低于此值

**特点**：反映**大多数**用户的最差体验

### P99

99% 的请求延迟低于此值

**特点**：反映**最差**用户体验

### P999

99.9% 的请求延迟低于此值

**特点**：极端长尾

# 百分位数示意

假设 100 个请求的延迟数据：

\`\`\`
P50 = 100ms  ← 50个请求延迟 ≤ 100ms
P95 = 300ms  ← 95个请求延迟 ≤ 300ms
P99 = 800ms  ← 99个请求延迟 ≤ 800ms
Max = 5000ms ← 最慢的那个
\`\`\`

# 选哪个指标？

| 业务类型 | 关注指标 | 原因 |
|---------|---------|------|
| 通用 Web | P95 | 平衡性能和成本 |
| 金融支付 | P99.9 | 不能慢 |
| 游戏战斗 | P99 | 实时性要求 |
| 后台任务 | 平均 | 容忍长尾 |

# 错误率

\`\`\`
错误率 = 失败请求数 / 总请求数
\`\`\`

健康标准：
- 普通业务：< 0.1%
- 金融业务：< 0.001%

# 资源利用率

| 资源 | 健康值 | 警戒值 |
|------|--------|--------|
| CPU | < 70% | > 80% |
| 内存 | < 80% | > 90% |
| 磁盘 IO | < 60% | > 80% |
| 网络 | < 50% | > 70% |
| DB 连接池 | < 70% | > 85% |

# 容量规划公式

\`\`\`
所需机器数 = (峰值QPS × 单机QPS) × 1.5 (冗余)
\`\`\`

例：业务峰值 10000 QPS，单机能扛 2000 QPS：

\`\`\`
机器数 = 10000 / 2000 × 1.5 = 7.5 ≈ 8 台
\`\`\`

# 测试方法

1. **基准测试** - 单接口单用户
2. **负载测试** - 模拟正常业务量
3. **压力测试** - 超过设计容量
4. **稳定性测试** - 长时间运行（如 72h）
5. **峰值测试** - 突发流量（秒杀、版本更新）`,
    difficulty: 3,
    importance: 4,
    tags: ['性能', 'P95', 'P99', '指标'],
    source: '性能测试通用方法论',
    relatedIds: ['perf-locust'],
    codeExample: null,
    videoUrl: null,
    quiz: [
      {
        question: 'P99 = 500ms 意味着？',
        options: ['平均延迟500ms', '99%请求≤500ms', '1%请求=500ms', '所有请求都≤500ms'],
        answer: 1,
        explanation: 'P99 是百分位数，99% 的请求延迟低于 500ms'
      }
    ]
  },

  // ============ 8. 安全测试 ============
  {
    id: 'owasp-top10',
    category: '安全测试',
    subcategory: 'OWASP',
    title: 'OWASP Top 10 漏洞详解',
    summary: 'Web 安全测试必知',
    content: `# OWASP Top 10 (2021)

## A01: 访问控制失效 (Broken Access Control)

**原理**：用户A能访问用户B的数据

**测试方法**：
- 越权测试：替换请求中的用户ID
- 垂直越权：普通用户访问管理员接口
- 水平越权：用户A访问用户B资源

\`\`\`
正常请求：GET /api/user/1001  (用户A查自己)
越权请求：GET /api/user/1002  (用户A查用户B)
\`\`\`

## A02: 加密机制失效 (Cryptographic Failures)

**风险**：明文传输、弱加密

**测试**：
- 检查 HTTPS 强制跳转
- 检查密码是否明文存储
- 检查敏感字段加密

## A03: 注入攻击 (Injection)

### SQL 注入

\`\`\`python
# 漏洞代码
query = f"SELECT * FROM users WHERE name = '{username}'"

# 攻击
username = "admin' OR '1'='1"
# 实际执行: SELECT * FROM users WHERE name = 'admin' OR '1'='1'
\`\`\`

**防御**：
- 参数化查询
- ORM
- 输入过滤

### NoSQL 注入

\`\`\`python
# MongoDB 漏洞
db.users.find({"username": req.username, "password": req.password})
# 攻击: {"username": "admin", "password": {"$ne": ""}}
\`\`\`

### 命令注入

\`\`\`python
# 漏洞
os.system(f"ping {user_input}")

# 防御：避免调用 shell
\`\`\`

## A04: 不安全设计 (Insecure Design)

- 业务流程缺陷
- 缺少风控

## A05: 安全配置错误 (Security Misconfiguration)

- 默认密码
- 错误信息暴露
- 未打补丁

## A06: 易受攻击组件 (Vulnerable Components)

依赖过期库、漏洞框架

## A07: 身份认证失效 (Identification & Authentication Failures)

- 弱密码策略
- Session 不失效
- 无验证码防爆破

## A08: 软件和数据完整性失效

- 不安全的反序列化
- 自动更新无签名验证

## A09: 安全日志和监控失效

- 登录失败不记录
- 没有异常告警

## A10: SSRF (服务端请求伪造)

\`\`\`python
# 漏洞：用户输入 URL，服务端请求
import requests
url = request.args.get("url")
resp = requests.get(url)  # 攻击者访问内网
\`\`\`

# 游戏行业特殊风险

| 漏洞 | 游戏场景 | 风险 |
|------|---------|------|
| 越权 | 查看他人装备 | 严重 |
| SQL注入 | 修改角色数据 | 严重 |
| 协议破解 | 外挂 | 严重 |
| 重放攻击 | 重复领奖 | 中等 |
| DDOS | 业务不可用 | 严重 |`,
    difficulty: 4,
    importance: 4,
    tags: ['OWASP', '安全', '漏洞'],
    source: 'OWASP 官方 2021 版',
    relatedIds: ['security-xss-csrf'],
    codeExample: null,
    videoUrl: null,
    quiz: null
  },

  {
    id: 'security-xss-csrf',
    category: '安全测试',
    subcategory: 'Web 安全',
    title: 'XSS 与 CSRF 攻击详解',
    summary: '前端最常见的两类攻击',
    content: `# XSS (跨站脚本攻击)

## 原理

攻击者在页面注入恶意 JS 代码，其他用户浏览时执行

## 类型

### 1. 反射型 XSS

\`\`\`
攻击URL: https://game.com/search?keyword=<script>alert(1)</script>
受害者点击后执行脚本
\`\`\`

### 2. 存储型 XSS（危害最大）

\`\`\`
攻击者在游戏论坛发帖子:
帖子内容: <script>steal_cookie()</script>
所有浏览帖子的用户都中招
\`\`\`

### 3. DOM 型 XSS

\`\`\`javascript
// 漏洞代码
document.body.innerHTML = location.hash.substring(1);
// URL: #<img src=x onerror=alert(1)>
\`\`\`

## 防御

1. **输入过滤**：转义 < > " ' &
2. **输出编码**：使用安全模板
3. **CSP 头**：限制脚本来源
4. **HttpOnly Cookie**：防 JS 读取

\`\`\`javascript
// 安全示例
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;',
    '"': '&quot;', "'": '&#39;'
  }[m]));
}
\`\`\`

# CSRF (跨站请求伪造)

## 原理

攻击者诱导用户在**已登录**状态下访问恶意页面，利用用户的 cookie 发起请求

## 攻击流程

\`\`\`
1. 用户登录 bank.com，cookie 存在
2. 用户访问恶意页面 evil.com
3. evil.com 自动发起 <img src="bank.com/transfer?to=attacker&amount=10000">
4. 浏览器自动带上 bank.com 的 cookie
5. 转账成功
\`\`\`

## 防御

### 1. CSRF Token

\`\`\`html
<form>
  <input type="hidden" name="csrf_token" value="random_token_abc123">
  <button>提交</button>
</form>
\`\`\`

### 2. SameSite Cookie

\`\`\`http
Set-Cookie: session=xxx; SameSite=Strict; HttpOnly
\`\`\`

- **Strict**：完全禁止跨站
- **Lax**：允许 GET 跨站
- **None**：允许跨站（需 HTTPS）

### 3. 验证 Referer

\`\`\`python
# 服务端检查
if not request.referrer.startswith("https://bank.com"):
    return "Forbidden"
\`\`\`

### 4. 二次验证

- 重要操作要求输入密码/短信验证码

# XSS vs CSRF 对比

| 维度 | XSS | CSRF |
|------|-----|------|
| 攻击对象 | 用户 | 服务端 |
| 利用基础 | JS执行 | Cookie自动携带 |
| 危害 | 窃取信息、钓鱼 | 冒充用户操作 |
| 防御 | 输入过滤、CSP | Token、SameSite |`,
    difficulty: 3,
    importance: 4,
    tags: ['XSS', 'CSRF', 'Web安全'],
    source: 'OWASP + Web 安全经典',
    relatedIds: ['owasp-top10'],
    codeExample: null,
    videoUrl: null,
    quiz: [
      {
        question: 'SameSite=Strict 的作用是？',
        options: ['允许跨站Cookie', '完全禁止跨站Cookie', '加密Cookie', '设置HttpOnly'],
        answer: 1,
        explanation: 'SameSite=Strict 完全禁止跨站携带 Cookie，是 CSRF 防御的关键'
      }
    ]
  },

  // ============ 9. CI/CD ============
  {
    id: 'cicd-jenkins',
    category: 'CI/CD',
    subcategory: 'Jenkins',
    title: 'Jenkins 持续集成实战',
    summary: 'CI/CD 工具链核心',
    content: `# Jenkins 核心概念

## Job / Pipeline

**Job**：单个任务（如构建、测试、部署）

**Pipeline**：流水线（多个 Job 串联）

\`\`\`groovy
// Jenkinsfile
pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/game/server.git'
            }
        }
        
        stage('Build') {
            steps {
                sh 'mvn clean package -DskipTests'
            }
        }
        
        stage('Unit Test') {
            steps {
                sh 'mvn test'
            }
            post {
                always {
                    junit '**/target/surefire-reports/*.xml'
                }
            }
        }
        
        stage('Deploy to Staging') {
            steps {
                sh 'kubectl apply -f k8s/staging.yaml'
            }
        }
        
        stage('Integration Test') {
            steps {
                sh 'pytest tests/integration'
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                sh 'kubectl apply -f k8s/production.yaml'
            }
        }
    }
    
    post {
        success {
            slackSend channel: '#game-deploy', 
                      message: "部署成功: ${env.JOB_NAME} #${env.BUILD_NUMBER}"
        }
        failure {
            slackSend channel: '#game-alert',
                      message: "部署失败: ${env.JOB_NAME} #${env.BUILD_NUMBER}"
        }
    }
}
\`\`\`

# 常用插件

| 插件 | 用途 |
|------|------|
| **Pipeline** | 流水线定义 |
| **Git** | 代码拉取 |
| **JUnit** | 测试报告 |
| **Allure** | 美化报告 |
| **Slack** | 通知 |
| **Kubernetes** | K8s部署 |
| **Blue Ocean** | 可视化流水线 |

# 测试金字塔

\`\`\`
       /\\
      /  \\      E2E 测试 (10%)
     /────\\     - Selenium
    /      \\    - Playwright
   / 集成   \\   集成测试 (30%)
  / 测试    \\  - 接口测试
 /──────────\\ - 数据库测试
/   单元测试  \\ 单元测试 (60%)
─────────────────
\`\`\`

# CI/CD 关键指标

| 指标 | 健康值 |
|------|--------|
| **构建时长** | < 10 min |
| **构建成功率** | > 90% |
| **部署频率** | 每日多次 |
| **平均恢复时间 (MTTR)** | < 1h |
| **变更前置时间 (Lead Time)** | < 1d |

# 游戏服务端 CI/CD 特殊点

1. **客户端构建时间长** - 资源打包、加密
2. **多渠道分发** - 安卓/iOS/Steam
3. **热更新** - 不重新发包
4. **灰度发布** - 1% → 10% → 50% → 100%`,
    difficulty: 3,
    importance: 4,
    tags: ['Jenkins', 'CI/CD', 'DevOps'],
    source: 'Jenkins 官方文档',
    relatedIds: ['cicd-blue-green'],
    codeExample: null,
    videoUrl: null,
    quiz: null
  },

  {
    id: 'cicd-blue-green',
    category: 'CI/CD',
    subcategory: '发布策略',
    title: '蓝绿发布 / 灰度发布 / 金丝雀',
    summary: '高级发布策略',
    content: `# 三种发布策略对比

## 1. 蓝绿发布 (Blue-Green)

\`\`\`
            负载均衡
               │
        ┌──────┴──────┐
        ▼             ▼
    ┌───────┐    ┌───────┐
    │ Blue  │    │ Green │
    │  V1   │    │  V2   │
    │(旧版) │    │(新版本)│
    └───────┘    └───────┘
    
初始: 流量全在 Blue
发布: 切到 Green, Blue 保留用于回滚
\`\`\`

**优点**：秒级回滚、零宕机
**缺点**：双倍资源
**适用**：核心服务、数据库迁移

## 2. 灰度发布 (Canary / Gray)

\`\`\`
            负载均衡
           /    |    \\
         /      |      \\
       V1      V1       V2
     (80%)   (15%)     (5%)
                     新版本
                     
阶段: 5% → 15% → 50% → 100%
\`\`\`

**优点**：风险可控、逐步放量
**缺点**：需要精细流量控制
**适用**：大版本发布、新功能验证

## 3. 金丝雀发布 (Canary)

金丝雀是**灰度的早期阶段**：

\`\`\`
1. 内部员工 → 1% → 5% → 20% → 50% → 100%
2. 出现问题秒级回滚
3. 监控关键指标：P99延迟、错误率
\`\`\`

# 高级策略

## 1. A/B 测试

\`\`\`
50% 看到 A 版本（蓝色按钮）
50% 看到 B 版本（红色按钮）
对比转化率数据
\`\`\`

## 2. 红黑发布

类似蓝绿，但资源是动态分配：

\`\`\`
V1 缩容到 50% → V2 扩容到 50% → V1 缩容到 0%
\`\`\`

## 3. 流量录制回放

\`\`\`
1. 录制生产流量
2. 新版本回放
3. 对比响应差异
\`\`\`

# 游戏行业实践

## 王者荣耀版本更新

1. **预下载** - 提前 3 天下载资源
2. **灰度更新** - 5% 玩家先行
3. **监控指标** - 崩溃率、加载时长
4. **热更新** - 紧急 bug 修复不重发包

## 数值更新

数值类改动采用灰度：
- 1% 玩家试玩 1 天
- 收集胜率、付费数据
- 全量推送

# 自动化回滚

\`\`\`yaml
# Argo Rollouts 示例
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: game-server
spec:
  strategy:
    canary:
      steps:
      - setWeight: 5
      - pause: {duration: 10m}
      - setWeight: 25
      - pause: {duration: 10m}
      - setWeight: 100
      
      analysis:
        templates:
        - templateName: success-rate
        startingStep: 1
\`\`\`

回滚触发条件：
- 错误率 > 1%
- P99 延迟 > 2s
- 5xx 错误突增`,
    difficulty: 4,
    importance: 4,
    tags: ['蓝绿发布', '灰度发布', '金丝雀', '发布策略'],
    source: 'Netflix/Argo 等技术博客',
    relatedIds: ['cicd-jenkins'],
    codeExample: null,
    videoUrl: null,
    quiz: [
      {
        question: '灰度发布的核心优势是？',
        options: ['速度最快', '风险可控', '零成本', '自动化程度最高'],
        answer: 1,
        explanation: '灰度发布可逐步放量，最大限度控制风险'
      }
    ]
  },

  // ============ 10. 监控告警 ============
  {
    id: 'monitor-prometheus',
    category: '监控告警',
    subcategory: 'Prometheus',
    title: 'Prometheus + Grafana 监控体系',
    summary: '云原生监控标准方案',
    content: `# Prometheus 简介

开源监控系统，采用**拉模式**（Pull）采集指标。

## 核心组件

\`\`\`
┌──────────────┐    ┌──────────────┐
│  Application │───>│  Exporter    │
│   (游戏服)    │    │ (指标暴露端)  │
└──────────────┘    └──────┬───────┘
                           │ pull
                           ▼
                    ┌──────────────┐
                    │  Prometheus  │
                    │   (存储+查询) │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │   Grafana    │
                    │   (可视化)    │
                    └──────────────┘
\`\`\`

## 1. 指标类型

### Counter（计数器）

只能递增，重启归零

\`\`\`python
from prometheus_client import Counter

request_count = Counter(
    'http_requests_total',
    'Total HTTP requests',
    ['method', 'endpoint', 'status']
)

# 使用
request_count.labels(method='GET', endpoint='/login', status='200').inc()
\`\`\`

### Gauge（仪表盘）

可增可减，反映**当前**状态

\`\`\`python
from prometheus_client import Gauge

online_players = Gauge(
    'game_online_players',
    'Current online player count',
    ['server_id']
)

online_players.labels(server_id='game_1').set(1234)
\`\`\`

### Histogram（直方图）

统计分布（用于 P95/P99）

\`\`\`python
from prometheus_client import Histogram
import time

request_latency = Histogram(
    'http_request_duration_seconds',
    'HTTP request latency',
    ['endpoint']
)

@request_latency.labels(endpoint='/api/login').time()
def login():
    time.sleep(0.1)  # 实际业务
\`\`\`

## 2. PromQL 查询

\`\`\`promql
# QPS (每秒请求数)
rate(http_requests_total[5m])

# P99 延迟
histogram_quantile(0.99, 
  rate(http_request_duration_seconds_bucket[5m])
)

# 错误率
sum(rate(http_requests_total{status=~"5.."}[5m]))
/ sum(rate(http_requests_total[5m]))

# 在线玩家总数
sum(game_online_players)
\`\`\`

## 3. 告警规则

\`\`\`yaml
# alert.rules.yml
groups:
- name: game_alerts
  rules:
  - alert: HighErrorRate
    expr: |
      sum(rate(http_requests_total{status=~"5.."}[5m]))
      / sum(rate(http_requests_total[5m])) > 0.05
    for: 2m
    labels:
      severity: critical
    annotations:
      summary: "错误率超过 5%"
      description: "持续 2 分钟，请立即处理"
  
  - alert: HighLatency
    expr: |
      histogram_quantile(0.99, 
        rate(http_request_duration_seconds_bucket[5m])
      ) > 1
    for: 5m
    labels:
      severity: warning
\`\`\`

## 4. Grafana 仪表盘

游戏服务端典型面板：
- 在线玩家数（实时）
- QPS / 错误率
- P50/P95/P99 延迟
- CPU/内存/网络
- 数据库连接池
- 慢查询 TOP 10
- 各业务模块 QPS`,
    difficulty: 4,
    importance: 4,
    tags: ['Prometheus', 'Grafana', '监控'],
    source: 'Prometheus 官方文档',
    relatedIds: ['monitor-tracing'],
    codeExample: null,
    videoUrl: null,
    quiz: null
  },

  // ============ 11. AI 测试 ============
  {
    id: 'ai-game-testing',
    category: 'AI 测试',
    subcategory: '智能化测试',
    title: 'AI 在游戏测试中的应用（智能化趋势）',
    summary: 'AI 测试前沿方向',
    content: `# AI 在游戏测试中的核心应用

## 1. AI 自动探索

**原理**：用强化学习训练 AI 智能体，让它自己玩游戏

**应用**：
- 自动化覆盖游戏关卡
- 发现普通玩家不会触发的边界
- 24小时不间断测试

\`\`\`python
# 示例：用 Stable Baselines3 训练 DQN
from stable_baselines3 import DQN
from game_env import GameEnv

env = GameEnv("level_1")
model = DQN("MlpPolicy", env, verbose=1)
model.learn(total_timesteps=100000)
model.save("game_agent")
\`\`\`

## 2. AI 生成测试用例

**原理**：LLM（如 GPT-4）根据功能描述生成测试用例

**示例**：
\`\`\`
Prompt: "为游戏登录功能生成20个测试用例，包含正常和异常场景"
输出: 自动生成结构化测试用例
\`\`\`

## 3. 视觉测试（基于图像识别）

\`\`\`python
# 截图对比，检测UI异常
from PIL import Image
import imagehash

hash1 = imagehash.average_hash(Image.open("baseline.png"))
hash2 = imagehash.average_hash(Image.open("current.png"))
diff = hash1 - hash2

if diff > 5:  # 差异阈值
    alert("UI 出现异常变化")
\`\`\`

## 4. 日志智能分析

\`\`\`python
# 用 LLM 分析异常日志
import openai

response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "你是日志分析专家"},
        {"role": "user", "content": f"分析这段异常日志原因：{log_content}"}
    ]
)
\`\`\`

## 5. 智能定位 Bug

- **传统方式**：人工看堆栈、看代码
- **AI 辅助**：自动关联相似 Bug、推荐修复方案

## 6. 性能基线异常检测

\`\`\`python
# 训练正常性能基线
from sklearn.ensemble import IsolationForest

clf = IsolationForest(contamination=0.01)
clf.fit(historical_metrics)

# 实时检测
new_metric = [cpu, mem, qps, latency]
if clf.predict([new_metric])[0] == -1:
    alert("性能异常")
\`\`\`

# 行业案例

| 案例 | 应用 | 效果 |
|------|------|------|
| **腾讯** | 智能探索 + 自动化 | 覆盖路径 +300% |
| **网易** | AI 数值平衡测试 | 缩短 50% |
| **米哈游** | LLM 生成用例 | 提效 40% |
| **莉莉丝** | 视觉测试 | 漏测率 -60% |

# 趋势：Agent 测试

新一代 AI Agent 能**自主完成**：
- 理解需求文档
- 设计测试方案
- 执行测试用例
- 提交 Bug 报告
- 跟进回归

# 局限性

1. ❌ AI 不能完全替代测试工程师
2. ❌ 创意/情感类测试仍需人工
3. ❌ 训练成本高
4. ✅ **AI + 人工** 是最优组合`,
    difficulty: 4,
    importance: 3,
    tags: ['AI', '智能化', '前沿'],
    source: '行业前沿 + 学术论文',
    relatedIds: [],
    codeExample: null,
    videoUrl: null,
    quiz: null
  },

  // ============ 12. 案例库 ============
  {
    id: 'case-login-bug',
    category: '案例库',
    subcategory: '典型Bug',
    title: '案例：登录服凌晨 3 点雪崩',
    summary: '高并发下登录服务不可用的真实案例',
    content: `# 案例背景

**游戏**：某 MMO 手游
**时间**：凌晨 3 点
**影响**：玩家无法登录 23 分钟

# 故障时间线

| 时间 | 事件 |
|------|------|
| 03:00 | 例行更新，配置中心推送新配置 |
| 03:02 | 玩家反馈登录失败 |
| 03:05 | 监控告警：登录服错误率飙升 |
| 03:10 | 运维介入，重启登录服 |
| 03:15 | 仍然失败，错误率 100% |
| 03:18 | 发现 Redis 连接池耗尽 |
| 03:20 | 紧急扩容 Redis 集群 |
| 03:23 | 服务恢复 |

# 根本原因分析（5 Why）

**1. 为什么错误率 100%？**
→ 登录逻辑完全走不通

**2. 为什么走不通？**
→ 调用 Redis 时抛 ConnectionError

**3. 为什么 Redis 连不上？**
→ Redis 连接池被打满

**4. 为什么连接池被打满？**
→ 大量请求在等待连接，且都设置了长超时

**5. 为什么会有大量等待？**
→ 凌晨推送的新配置错误，开启了一个**不存在的 Redis 集群**地址

# 改进措施

1. ✅ 配置变更灰度（先 10% 实例）
2. ✅ 引入配置校验机制
3. ✅ Redis 连接池添加监控
4. ✅ 设置请求超时（不能无限制等待）
5. ✅ 增加慢调用熔断
6. ✅ 凌晨操作必须双人复核

# 测试侧可以做什么？

## 1. 配置测试

- 配置中心推送的每个配置都要测试
- 模拟配置中心推送异常值
- 验证服务对配置错误的容错性

## 2. 故障注入测试

\`\`\`python
# 故障演练: Redis 不可用
def test_redis_unavailable():
    with mock.patch('redis.Redis.ping', side_effect=ConnectionError):
        result = login_service.login("user001", "pass")
        # 验证: 应该快速失败,而不是挂起
        assert result.is_error
        assert result.error_code == "REDIS_UNAVAILABLE"
\`\`\`

## 3. 容量测试

- 模拟正常 QPS 的 3 倍、5 倍
- 验证连接池打满时的降级策略

## 4. 配置监控

- 监听配置中心变更
- 变更后自动跑冒烟用例

# 经验总结

> **配置是隐形的代码**——一次错误的配置可能比代码 Bug 影响更大
> **凌晨变更必须有监控守护**——没有监控的变更就是裸奔
> **降级策略是最后一道防线**——核心服务必须有 fallback`,
    difficulty: 3,
    importance: 5,
    tags: ['案例', '故障', '雪崩', '真实'],
    source: '社区分享案例脱敏',
    relatedIds: ['redis-cache', 'chaos-engineering-tencent'],
    codeExample: null,
    videoUrl: null,
    quiz: null
  },

  {
    id: 'case-pay-bug',
    category: '案例库',
    subcategory: '金融Bug',
    title: '案例：支付回调幂等失效导致重复发货',
    summary: '支付系统最常见的严重Bug',
    content: `# 案例背景

**业务**：游戏充值
**影响**：某玩家获得 2 倍元宝
**损失**：约 50 万元
**修复时长**：8 小时

# 故障复现

1. 玩家充值 648 元
2. 第三方支付回调通知服务端
3. 服务端处理发货
4. **网络抖动**导致回调 ACK 失败
5. 第三方支付**重试**回调
6. 服务端**再次**处理发货
7. 玩家元宝翻倍

# 核心问题：幂等性失效

## 什么是幂等？

**同一操作执行一次和执行多次，结果相同**

支付回调是天然幂等场景：
- 第1次回调：发648元元宝
- 第N次回调：**不应该**再发

# 为什么会失效？

## 漏洞代码

\`\`\`python
# 错误代码
def handle_pay_callback(order_id, amount):
    # 没有去重
    user = get_user(order_id)
    user.gold += amount
    user.save()
    return "success"
\`\`\`

## 正确代码

\`\`\`python
# 方案1: 数据库唯一约束
def handle_pay_callback(order_id, amount):
    try:
        with transaction.atomic():
            OrderLog.objects.create(
                order_id=order_id,  # 唯一索引
                amount=amount
            )
            user = get_user(order_id)
            user.gold += amount
            user.save()
    except IntegrityError:
        # 重复请求,直接返回成功
        return "success"

# 方案2: Redis 分布式锁
def handle_pay_callback(order_id, amount):
    lock_key = f"pay:lock:{order_id}"
    if not redis.set(lock_key, "1", nx=True, ex=300):
        return "success"  # 正在处理或已处理
    
    try:
        user = get_user(order_id)
        user.gold += amount
        user.save()
    finally:
        redis.delete(lock_key)
    return "success"
\`\`\`

# 测试方案

## 1. 幂等性测试

\`\`\`python
def test_pay_idempotency():
    order_id = "ORDER_001"
    amount = 648
    
    # 第一次调用
    result1 = handle_pay_callback(order_id, amount)
    assert user.gold == 648
    
    # 模拟重试
    result2 = handle_pay_callback(order_id, amount)
    assert user.gold == 648  # 不应该变成 1296
    
    # 模拟并发
    results = await asyncio.gather(
        *[handle_pay_callback(order_id, amount) for _ in range(10)]
    )
    assert user.gold == 648  # 仍然只有一次发货
\`\`\`

## 2. 回调测试

- ✅ 正常回调
- ✅ 重试回调（同一 orderId）
- ✅ 乱序回调
- ✅ 失败重试
- ✅ 部分成功部分失败的回调

# 改进措施

1. ✅ 所有支付接口添加**幂等校验**
2. ✅ 订单ID 全局唯一
3. ✅ Redis 分布式锁
4. ✅ 财务对账系统
5. ✅ 大额充值风控（二次确认）

# 反思

> **支付系统不是"功能"，是"金融基础设施"**
> **幂等性是支付系统的生命线**
> **测试要模拟真实网络环境，不只是 happy path**`,
    difficulty: 3,
    importance: 5,
    tags: ['支付', '幂等', '案例', '金融'],
    source: '行业公开案例',
    relatedIds: ['redis-cache'],
    codeExample: null,
    videoUrl: null,
    quiz: null
  }
];

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = KNOWLEDGE_BASE;
}
