/**
 * 主脚本 - 全局交互
 * Global JavaScript
 */

// ============ 粒子背景 ============
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      position: absolute;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      background: ${['#7C3AED', '#F43F5E', '#3B82F6'][Math.floor(Math.random() * 3)]};
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      opacity: ${Math.random() * 0.6 + 0.2};
      pointer-events: none;
      animation: float ${Math.random() * 8 + 4}s ease-in-out infinite;
      animation-delay: ${Math.random() * 4}s;
    `;
    container.appendChild(p);
  }
}

// ============ 数字计数动画 ============
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    let current = 0;
    const step = target / 40;
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      el.textContent = Math.floor(current);
    }, 30);
  });
}

// ============ 滚动渐入 ============
function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.observe-fade, [data-reveal]').forEach(el => {
    observer.observe(el);
  });
}

// ============ 全局搜索 ============
function initGlobalSearch() {
  const btn = document.getElementById('searchBtn');
  const modal = document.getElementById('searchModal');
  const overlay = document.getElementById('searchOverlay');
  const input = document.getElementById('globalSearchInput');
  const results = document.getElementById('searchResults');

  if (!btn) return;

  btn.onclick = () => {
    modal.classList.add('open');
    setTimeout(() => input.focus(), 100);
  };
  overlay.onclick = () => modal.classList.remove('open');

  input.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    if (!q) { results.innerHTML = ''; return; }
    const matches = KNOWLEDGE_BASE.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.id.toLowerCase().includes(q) ||
      (item.tags || []).some(t => t.toLowerCase().includes(q))
    ).slice(0, 8);

    results.innerHTML = matches.length === 0
      ? '<div style="padding:2rem; text-align:center; color:var(--c-text-muted);">没有找到结果</div>'
      : matches.map(m => `
        <a href="catalog.html#${m.id}" class="search-result-item" style="display:block; padding:0.75rem 1rem; border-bottom:1px solid var(--c-border); cursor:pointer; text-decoration:none; color:inherit;">
          <div style="font-weight:600; color:var(--c-primary);">${m.title}</div>
          <div style="font-size:0.8rem; color:var(--c-text-muted); margin-top:0.2rem;">📂 ${m.category} · ${m.summary ? m.summary.substring(0, 60) + '...' : ''}</div>
        </a>
      `).join('');
  });

  // Ctrl+K 快捷键
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      btn.click();
    }
    if (e.key === 'Escape') {
      modal.classList.remove('open');
    }
  });
}

// ============ 主题切换 ============
function initTheme() {
  const btn = document.getElementById('themeBtn');
  if (!btn) return;
  btn.onclick = () => {
    document.body.classList.toggle('theme-light');
    const isLight = document.body.classList.contains('theme-light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  };
  const saved = localStorage.getItem('theme');
  if (saved === 'light') document.body.classList.add('theme-light');
}

// ============ 导航栏滚动效果 ============
function initNavScroll() {
  const nav = document.getElementById('topNav');
  if (!nav) return;
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
    lastY = y;
  });
}

// ============ 首页领域卡片渲染 ============
function renderDomainGrid() {
  const grid = document.getElementById('domainGrid');
  if (!grid) return;

  const domains = [
    { icon: '🎯', name: '岗位核心', desc: 'JD拆解 · 优劣势分析 · 匹配度评估', count: 1, color: '#7C3AED' },
    { icon: '⚡', name: '容灾测试', desc: 'RTO/RPO/SLA · Chaos Mesh · 故障注入', count: 4, color: '#F43F5E' },
    { icon: '🏗️', name: '服务器架构', desc: '三层架构 · CAP · 同步方式 · 微服务', count: 3, color: '#3B82F6' },
    { icon: '🌐', name: '网络协议', desc: 'TCP/UDP · HTTP · WebSocket · HTTPS', count: 2, color: '#10B981' },
    { icon: '💾', name: '数据库', desc: 'MySQL · Redis · MongoDB · 事务隔离', count: 3, color: '#F59E0B' },
    { icon: '🚀', name: '性能测试', desc: 'Locust · 压测模型 · 性能瓶颈定位', count: 2, color: '#EF4444' },
    { icon: '🔒', name: '安全测试', desc: 'OWASP · XSS/CSRF · 渗透测试', count: 2, color: '#8B5CF6' },
    { icon: '🤖', name: 'CI/CD', desc: 'Jenkins · GitLab CI · 蓝绿发布', count: 1, color: '#06B6D4' },
    { icon: '📡', name: '监控告警', desc: 'Prometheus · Grafana · SLO', count: 1, color: '#84CC16' },
    { icon: '🐍', name: 'Python编程', desc: '语法速成 · 自动化脚本 · 6大场景', count: 2, color: '#EAB308' },
    { icon: '📚', name: '案例库', desc: '真实生产事故 · 6大复盘案例', count: 4, color: '#EC4899' },
    { icon: '🧠', name: 'AI测试', desc: '智能NPC · AIGC审核 · 智能体评测', count: 1, color: '#A855F7' }
  ];

  grid.innerHTML = domains.map(d => `
    <a href="catalog.html" class="domain-card" style="--c:${d.color};">
      <div class="domain-icon">${d.icon}</div>
      <div class="domain-name">${d.name}</div>
      <div class="domain-desc">${d.desc}</div>
      <div class="domain-count">${d.count} 个知识点 →</div>
    </a>
  `).join('');
}

// ============ 启动 ============
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  animateCounters();
  initScrollReveal();
  initGlobalSearch();
  initTheme();
  initNavScroll();
  renderDomainGrid();
});
