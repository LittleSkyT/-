// 个人优势卡片用的线性图标（stroke 描边，跟随 currentColor）
const base = {
  width: 30,
  height: 30,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const icons = {
  // 商业落地：靶心
  commercial: (
    <svg {...base}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.6" />
    </svg>
  ),
  // 风格多元：交叠的色块
  versatile: (
    <svg {...base}>
      <circle cx="9" cy="12" r="5.5" />
      <circle cx="15" cy="12" r="5.5" />
      <path d="M9 12a3 3 0 0 1 6 0" />
    </svg>
  ),
  // 高效交付：时钟 + 对勾
  delivery: (
    <svg {...base}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
      <path d="M8 13.5l2.2 2.2L14.5 11" />
    </svg>
  ),
  // 全流程：分层
  pipeline: (
    <svg {...base}>
      <rect x="3.5" y="4" width="17" height="5" rx="1" />
      <rect x="3.5" y="9.5" width="17" height="5" rx="1" />
      <rect x="3.5" y="15" width="17" height="5" rx="1" />
    </svg>
  ),
  // 邮箱
  mail: (
    <svg {...base}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="M4.4 7.6l6.8 4.8a1.6 1.6 0 0 0 1.8 0l6.8-4.8" />
    </svg>
  ),
  // 电话
  phone: (
    <svg {...base}>
      <path d="M7.6 3.6H5.4A2.4 2.4 0 0 0 3 6.1c0 8.2 6.7 14.9 14.9 14.9a2.4 2.4 0 0 0 2.5-2.4v-2.2a1.5 1.5 0 0 0-1.2-1.5l-2.6-.5a1.5 1.5 0 0 0-1.5.6l-1 1.3a11.6 11.6 0 0 1-4.6-4.6l1.3-1a1.5 1.5 0 0 0 .6-1.5l-.5-2.6a1.5 1.5 0 0 0-1.5-1.2z" />
    </svg>
  ),
  // 微信
  wechat: (
    <svg {...base}>
      <path d="M9.3 3.9C5.4 3.9 2.3 6.5 2.3 9.7c0 1.8 1 3.4 2.7 4.5l-.7 2.2 2.6-1.3c.6.2 1.2.3 1.9.3" />
      <path d="M21.7 14.6c0-2.7-2.6-4.8-5.7-4.8s-5.7 2.1-5.7 4.8 2.6 4.8 5.7 4.8c.6 0 1.2-.1 1.8-.3l2.2 1.1-.6-1.9c1.4-.9 2.3-2.2 2.3-3.7z" />
      <circle cx="6.7" cy="8.6" r="0.95" fill="currentColor" stroke="none" />
      <circle cx="11.7" cy="8.6" r="0.95" fill="currentColor" stroke="none" />
      <circle cx="13.9" cy="13.7" r="0.85" fill="currentColor" stroke="none" />
      <circle cx="18.1" cy="13.7" r="0.85" fill="currentColor" stroke="none" />
    </svg>
  ),
}
