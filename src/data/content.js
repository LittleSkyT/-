// ============================================================
//  站点内容集中管理：改这里即可替换文案、项目、优势等信息
// ============================================================
import work01 from '../assets/works/work-01.webp'
import work02 from '../assets/works/work-02.webp'
import work03 from '../assets/works/work-03.webp'
import work04 from '../assets/works/work-04.webp'
import work05 from '../assets/works/work-05.webp'
import work06 from '../assets/works/work-06.webp'
import panel01 from '../assets/hero/panel-01.jpg'
import panel02 from '../assets/hero/panel-02.jpg'
import panel03 from '../assets/hero/panel-03.jpg'
import panel04 from '../assets/hero/panel-04.jpg'

export const site = {
  name: '李长春',
  nameEn: 'LI CHANGCHUN',
  netName: '小天不是小兲',
  role: '插画师 / 原画师',
  roleEn: 'Illustrator & Visual Artist',
  slogan: '献给想象无尽的山海',
  tagline: '六年接稿经验，用画笔把创意变成可落地的商业作品。',
  email: '2840249848@qq.com',
  phone: '+86 13030806881',
  wechat: 'LittleSky_T',
  weibo: '@小天不是小兲',
  location: '福建 · 接受全国远程委托',
}

// 首页右侧手风琴画廊（需要横图，比例见交付说明）
export const heroPanels = [
  { image: panel01, label: '插画作品 01', alt: '插画作品 01' },
  { image: panel02, label: '插画作品 02', alt: '插画作品 02' },
  { image: panel03, label: '插画作品 03', alt: '插画作品 03' },
  { image: panel04, label: '插画作品 04', alt: '插画作品 04' },
]

export const navLinks = [
  { label: '关于', href: '#about' },
  { label: '精选作品', href: '#works' },
  { label: '优势', href: '#strengths' },
  { label: '联系', href: '#contact' },
]

export const marqueeItems = [
  '商业插画',
  '原画设计',
  '绘本创作',
  '品牌视觉',
  '角色设定',
  '海报插画',
]

export const stats = [
  { value: '6+', label: '年接稿经验' },
  { value: '100+', label: '完成项目' },
  { value: '90+', label: '合作客户' },
  { value: '100%', label: '按期交付' },
]

export const experience = [
  {
    year: '2020 — 至今',
    title: '自由插画师 / 原画师',
    desc: '从高二开始接稿，六年间持续承接品牌插画、绘本与游戏原画等商业委托。',
  },
  {
    year: '2022 — 2025',
    title: '闽南师范高等专科学校 · 在读',
    desc: '在校期间保持稳定接稿，把专业训练与商业项目并行推进。',
  },
  {
    year: '2025 — 2027',
    title: '闽南科技学院 · 在读',
    desc: '本科阶段继续深造，同时持续输出商业插画作品。',
  },
]

// 关于我 · 个人信息（带 icon 的用图标代替文字标签）
export const profile = [
  { label: '姓名', value: '李长春' },
  { label: '网名', value: '小天不是小兲' },
  { icon: 'mail', title: '邮箱', value: '2840249848@qq.com', href: 'mailto:2840249848@qq.com' },
  { icon: 'phone', title: '电话', value: '+86 13030806881', href: 'tel:+8613030806881' },
  { icon: 'wechat', title: '微信', value: 'LittleSky_T' },
]

// 精选作品：顺序 = 轮播顺序，src/assets/works/ 里一一对应
// title = 作品名 / category = 角色 · 题材（显示为轮播副标题）/ date = 完成日期
export const projects = [
  { id: 'wang-yi-wei-qi', title: '王亦为棋', category: '刻律德菈', date: '2025.09.06', img: work01 },
  { id: 'ji-ban', title: '羁绊', category: '魔法少女小圆', date: '2025.09.02', img: work02 },
  { id: 'cong-wei-fa-sheng', title: '从未发生过的事实', category: '魔法少女小圆', date: '2026.09.06', img: work03 },
  { id: 'bai-yang', title: '白羊', category: '难言岛', date: '2026.04.26', img: work04 },
  { id: 'wang-xiang-tian-shi', title: '妄想天使', category: '千夏', date: '2026.03.01', img: work05 },
  { id: 'xing-hai', title: '星海', category: '懒幻', date: '2026.09.09', img: work06 },
]

export const strengths = [
  {
    icon: 'commercial',
    title: '商业落地能力',
    desc: '多年服务品牌与出版客户，能快速读懂需求，把创意转化为可落地、可交付的作品。',
  },
  {
    icon: 'versatile',
    title: '风格多元',
    desc: '厚涂、扁平、国风、绘本、卡通均可驾驭，可依据项目调性提供多种风格方案。',
  },
  {
    icon: 'delivery',
    title: '高效交付',
    desc: '流程规范、响应及时，按节点交付并配合修改，项目从未延期。',
  },
  {
    icon: 'pipeline',
    title: '全流程把控',
    desc: '从需求沟通、草图、色稿到终稿与印刷 / 上线，一条龙把控品质与细节。',
  },
]
