/**
 * 图表库
 * Chart utilities - 复用图表函数
 */

// 首页可能用到的图表
function initCharts() {
  // 雷达图：技能覆盖度
  const radarEl = document.getElementById('radarChart');
  if (radarEl && typeof Chart !== 'undefined') {
    new Chart(radarEl, {
      type: 'radar',
      data: {
        labels: ['测试设计', '容灾', '网络', '数据库', 'Python', '安全', '性能', 'CI/CD'],
        datasets: [{
          label: '当前水平',
          data: [4, 3, 4, 4, 2, 3, 3, 3],
          backgroundColor: 'rgba(124, 58, 237, 0.2)',
          borderColor: '#7C3AED',
          pointBackgroundColor: '#7C3AED'
        }, {
          label: '目标水平',
          data: [5, 5, 5, 4, 4, 4, 4, 4],
          backgroundColor: 'rgba(244, 63, 94, 0.1)',
          borderColor: '#F43F5E',
          pointBackgroundColor: '#F43F5E'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: { color: 'rgba(255,255,255,0.1)' },
            grid: { color: 'rgba(255,255,255,0.05)' },
            pointLabels: { color: '#94a3b8', font: { size: 11 } },
            ticks: { display: false, stepSize: 1 },
            suggestedMin: 0,
            suggestedMax: 5
          }
        },
        plugins: {
          legend: { labels: { color: '#94a3b8' } }
        }
      }
    });
  }

  // 进度图
  const progressEl = document.getElementById('progressChart');
  if (progressEl && typeof Chart !== 'undefined') {
    new Chart(progressEl, {
      type: 'bar',
      data: {
        labels: ['岗位画像', '容灾测试', '服务器架构', '网络协议', '数据库', '性能测试'],
        datasets: [{
          label: '掌握度',
          data: [85, 70, 65, 75, 60, 55],
          backgroundColor: [
            'rgba(124, 58, 237, 0.7)',
            'rgba(244, 63, 94, 0.7)',
            'rgba(59, 130, 246, 0.7)',
            'rgba(16, 185, 129, 0.7)',
            'rgba(245, 158, 11, 0.7)',
            'rgba(239, 68, 68, 0.7)'
          ],
          borderColor: [
            '#7C3AED', '#F43F5E', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: { color: '#94a3b8' },
            grid: { color: 'rgba(255,255,255,0.05)' }
          },
          x: {
            ticks: { color: '#94a3b8' },
            grid: { display: false }
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }
}
