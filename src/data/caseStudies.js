// ============================================================
//  作品详情页内容（首页「创作过程」模块 → 点大图进入的那一页）
// ------------------------------------------------------------
//  ✓ 这个案例的文案已经是真实内容，所以 placeholder 为 false，
//    页面顶部那条「内容待替换」的提示条不会再出现。
//    以后哪个案例还有没换掉的占位文字，把它的 placeholder 改回 true，
//    提示条就会重新出现提醒你。
//
//  图片怎么换：
//    · 首页那块大图 + 详情页首图 = cover
//      现在放的是 src/assets/case/chun-ri-liu-ying.webp ——由桌面
//      《春日流萤（后期水印）.jpg》压成 1800×845 / WebP q80 / 144 KB（比例 2.13:1 宽幅横图）
//    · 步骤图 = 每个 step 的 image 字段，现在都是 null，所以页面显示虚线占位框
//      把图放进 src/assets/case/，import 进来填到 image 即可
//
//  想加第二个作品的详情页：
//    把下面整个对象复制一份 → 改 id / no / title / category / date / palette
//    → 回到首页模块 CaseFeature.jsx，它会自动按数组多渲染一个入口
// ============================================================
import coverChunRiLiuYing from '../assets/case/chun-ri-liu-ying.webp'
import refChunRiLiuYing01 from '../assets/case/chun-ri-liu-ying-ref-01.webp'
import refChunRiLiuYing02 from '../assets/case/chun-ri-liu-ying-ref-02.webp'
import refChunRiLiuYing03 from '../assets/case/chun-ri-liu-ying-ref-03.webp'
import modelChunRiLiuYing01 from '../assets/case/chun-ri-liu-ying-model-01.webp'
import modelChunRiLiuYing02 from '../assets/case/chun-ri-liu-ying-model-02.webp'
import baseChunRiLiuYing from '../assets/case/chun-ri-liu-ying-base.webp'
import finaleChunRiLiuYing from '../assets/case/chun-ri-liu-ying-final.webp'

/* 第二个作品「妄想天使」—— 桌面《成品（无水印）.png》压成 1800×771 / 176 KB（比例 2.33:1） */
import coverWangXiangTianShi from '../assets/case/wang-xiang-tian-shi.webp'

/* 第二个作品的参考图 —— 桌面《图片/千夏/参考图1~3.png》原尺寸转 WebP q82 */
import refWangXiangTianShi01 from '../assets/case/wang-xiang-tian-shi-ref-01.webp'
import refWangXiangTianShi02 from '../assets/case/wang-xiang-tian-shi-ref-02.webp'
import refWangXiangTianShi03 from '../assets/case/wang-xiang-tian-shi-ref-03.webp'

/* 第二个作品的草稿 —— 桌面《图片/千夏/草稿1.png》原尺寸（648×278）转 WebP q82 */
import sketchWangXiangTianShi01 from '../assets/case/wang-xiang-tian-shi-sketch-01.webp'

/* 第二个作品的打光对比 —— 桌面《图片/千夏/打光1.png》《打光2.png》原尺寸转 WebP q82 */
import lightWangXiangTianShi01 from '../assets/case/wang-xiang-tian-shi-light-01.webp'
import lightWangXiangTianShi02 from '../assets/case/wang-xiang-tian-shi-light-02.webp'

/* 第二个作品的终稿 —— 桌面《成品（无水印）.png》（7000×3000 / 26.8 MB）压成 2400×1029 转 WebP q84 */
import finaleWangXiangTianShi from '../assets/case/wang-xiang-tian-shi-final.webp'

export const caseStudies = [
  {
    id: 'long-zhong-niao',
    no: '01',
    placeholder: false,

    /* 这条的身份信息和「精选作品」列表里的第 1 张【不是同一个作品】：
         精选作品第 1 张 = 王亦为棋 / 刻律德菈 / 2025.09.06（见 content.js 的 projects）
         这里          = 笼中鸟   / 春日流萤 / 2025.09.14
       两者只是曾经共用过同一个 id，别再把它们写成一样。 */
    title: '笼中鸟',
    category: '春日流萤',
    date: '2025.09.14',
    type: '商业插画',

    cover: coverChunRiLiuYing,
    coverAlt: '笼中鸟 · 春日流萤',

    // 每个作品一套配色，详情页整页跟随，用来和画面本身呼应。
    // 这一套 = 深色低饱和蓝底 + 高饱和绿点缀。
    palette: {
      mode: 'dark', // 决定背景粒子走哪一套上色，见 CaseDetail.jsx
      bg: '#050a15', // 深色 · 低饱和蓝
      surface: '#0b1424',
      line: 'rgba(150, 190, 235, 0.16)',
      ink: '#e8eef8',
      inkSoft: 'rgba(232, 238, 248, 0.72)',
      inkFaint: 'rgba(232, 238, 248, 0.40)',
      accent: '#38e07b', // 高饱和绿 · 只用在编号、细线、强调上
      accentSoft: 'rgba(56, 224, 123, 0.14)',
    },

    /* ---------- 01 拿到的需求 ---------- */
    brief: [
      '需求是以《崩坏：星穹铁道》的春日流萤为主角，创作一幅横板插画。甲方没有说明用途，比例也不限定，只给了氛围上的要求。',
      '期望氛围是「有故事感」，要能表现人物的困境。交付时间一星期。',
    ],
    // 需求要点：显示成一张细线表格，填不出就留空数组
    briefFacts: [
      { label: '主角', value: '《崩坏：星穹铁道》春日流萤' },
      { label: '规格', value: '13248 × 6219 px · 300 dpi · RGB' },
      { label: '比例', value: '不限定' },
      { label: '期望氛围', value: '有故事感，能表现人物的困境' },
      { label: '交付时间', value: '一星期' },
    ],

    /* ---------- 02 创作思路 ----------
       字符串 = 段落；{ image, caption } = 单张插图；
       { images: [{ src, caption }] } = 一组插图并排。
       写在数组哪个位置，就渲染在哪个位置。 */
    approach: [
      '我拿到需求的第一步，是把它拆成三个模块：画面内容、色调、构图。拆开之后才好一块一块去判断，也才不至于一上手就陷进细节里。',
      '这份需求里，我最先注意到的是「困境」这个词。为了弄清楚它到底指什么，我去翻了角色流萤的背景故事。',
      '翻的过程中注意到一件事：游戏里常常用萤火虫来比喻她 —— 生命短暂，却又璀璨。那么，怎么把这个比喻落到画面上？',
      '我第一个想到的是光影。用画面的明暗去制造角色和环境之间的反差，让亮处是「短暂」、暗处是「困境」。这是我最初的想法，后面关于构图和色调的判断，都从这里长出来。',
      {
        images: [
          { src: refChunRiLiuYing01, caption: '参考图 1' },
          { src: refChunRiLiuYing02, caption: '参考图 2' },
          { src: refChunRiLiuYing03, caption: '参考图 3' },
        ],
      },
      '看完这几张参考，我得到了两个想法。',
      '第一，矩形这个图案在表达「困境」的时候经常出现。这是摄影里常用的手法，我想把它挪到插画里来。第二，黑白剪影的重叠能最大程度地拉开两个物体之间的区别 —— 这是构成上的知识。',
      '两条合到一起，就有了这一版的草稿想法：用矩形分割角色与外部环境，用光影对比把人物推出来，再加上一个鸟笼，把这个概念钉死。',
      '草稿定下来之后，我开始用 AI 建模并渲染，先把空间关系和光影试出来，再决定最终怎么画。',
      {
        images: [
          { src: modelChunRiLiuYing01, caption: '建模 1' },
          { src: modelChunRiLiuYing02, caption: '建模 2' },
        ],
      },
      '模型给的是空间和光影的参考，接下来要把它变回一张画 —— 这一步回到手绘。',
      '我先在模型图的基础上把人物重绘了一遍，再对整个画面重新填色。',
      '这一步有两个关键。第一是去掉模型感：直接拿模型出来的东西贴在画面上，会显得格格不入。第二是能分图层画：底色、人物、光影各占一层，画面才好最大程度地控制。',
      { image: baseChunRiLiuYing, caption: '底色', wide: true },
      '最后一步是细化。这一步我的重点并不在人物，而在整体氛围 —— 没有着重去细化人物本身，而是尽可能把「两个世界」的反差做出来。',
      '色调上，前景的人物和环境我选了大面积的深蓝色影调，只留些许绿色的光做点缀，再配一个「上暗中亮下暗」的光影，把压抑的感觉压住。相反，室外的天空我选了五颜六色的纷飞气球，以及高纯度、高明度的彩虹。两边越对立，「困境」就越站得住。',
    ],

    /* ---------- 终稿大图 ----------
       和上面的插图同栏同宽，只在最后出现一次，作为整页的收束。
       别给它加横向出血：那会比它上面那张底色图大出一半，改过一次了。 */
    finale: {
      image: finaleChunRiLiuYing,
      caption: '终稿 · 春日流萤',
      alt: '笼中鸟 · 春日流萤 终稿完整画面',
    },

    /* ---------- 总结 ----------
       紧跟在终稿大图下面，是整页的最后一块。留空数组就不渲染。 */
    summary: [
      '这幅图首先带给我的思考，是如何从一个词推导出整幅画。甲方需求里的「困境」和「流萤」这两个词，是我推导整幅画面的关键词，萤火虫、矩形、鸟笼这些想法都是从这里延伸出来的。',
      '最后我把重心停在了画面本身，而不是人物本身。对我而言这是一次突破 —— 当画面从人物身上拉远，看见不同的环境，我认为这才是表达的正确方法。',
    ],

    /* ---------- 下面两块现在都是空的，页面就不渲染它们 ----------
       · approachPoints = 02 里的三张小卡
       · steps          = 03 创作步骤
       想恢复哪一块，把内容填回数组就会自动出现。 */
    approachPoints: [],
    steps: [],
  },

  /* ============================================================
     第二个作品「妄想天使」/ 千夏 / 2025.05.05
     ------------------------------------------------------------
     这一页和第一个作品一样走深色：底色直接用案例 1 那层黑 #050a15，
     雪花粒子在深底上才亮得起来。
     画面本身其实很亮（缩到 300px 宽做中位量化，主色 #56a3a8 · 青绿
     H184，占 15.7%，十个色块清一色浅色，均值 #96afbd）—— 但这一页
     不跟着画面走浅色，理由见上面那句。
     点缀色取画面自己的主色 #56a3a8：它跟案例 1 的绿明显不同，又是
     从这张画里取的颜色，在 #050a15 上对比度 6.87:1。
     01 需求、02 思路、终稿、总结都已经填好，所以 placeholder 为 false，
     顶部那条提示不会再出现。03 创作步骤至今没填，页面就不渲染它。
     ============================================================ */
  {
    id: 'wang-xiang-tian-shi',
    no: '02',
    placeholder: false,

    title: '妄想天使',
    category: '千夏',
    date: '2025.05.05',
    type: '商业插画',

    cover: coverWangXiangTianShi,
    coverAlt: '妄想天使 · 千夏',

    palette: {
      mode: 'dark',
      bg: '#050a15',
      surface: '#0b1424',
      line: 'rgba(150, 190, 235, 0.16)',
      ink: '#e8eef8',
      inkSoft: 'rgba(232, 238, 248, 0.72)',
      inkFaint: 'rgba(232, 238, 248, 0.40)',
      accent: '#56a3a8',
      accentSoft: 'rgba(86, 163, 168, 0.16)',
    },

    /* ---------- 01 拿到的需求 ---------- */
    brief: [
      '需求是以游戏《绝区零》的千夏为主角，创作一幅横板插画。用途是壁纸，以及后续的周边制作。',
      '氛围要求与「妄想天使」的角色背景相呼应。交付时间 15 天。',
    ],
    // 需求要点：显示成一张细线表格，填不出就留空数组
    briefFacts: [
      { label: '主角', value: '《绝区零》千夏' },
      { label: '规格', value: '7000 × 3000 px · 300 dpi · RGB' },
      { label: '用途', value: '壁纸 · 后续周边制作' },
      { label: '期望氛围', value: '与「妄想天使」的角色背景相呼应' },
      { label: '交付时间', value: '15 天' },
    ],

    /* ---------- 02 创作思路 ----------
       字符串 = 段落；{ image, caption } = 单张插图；
       { images: [{ src, caption }] } = 一组插图并排。
       写在数组哪个位置，就渲染在哪个位置。 */
    approach: [
      '拿到需求时，我并没有看到太多关于人物以外的要求。因此我判断甲方的重点想放在人物身上，就从搜集「千夏」和「妄想天使」的资料开始。',
      '查下来发现，绝区零给「妄想天使」的定位类似于地下偶像，而千夏在团队里是「团宠」的身份。',
      '这两点落到画面上，就是我初步的想法：以角色为中心去组织光影与构图。带着这个想法，我开始找参考图。',
      {
        images: [
          { src: refWangXiangTianShi01, caption: '参考图 1' },
          { src: refWangXiangTianShi02, caption: '参考图 2' },
          { src: refWangXiangTianShi03, caption: '参考图 3' },
        ],
      },
      '找到参考图后，我注意到一件事：拍人像的时候，很多摄影师不会用过暗的画面去表现人物 —— 那会让主体的存在感丢掉。所以大部分人选择明亮的画面，并且通常会用暖色光把氛围柔化。',
      '我也注意到，花朵这个元素可以衬托角色的性格。',
      '到这里，我得出了一个大致构图，并把它画成了草稿。',
      { image: sketchWangXiangTianShi01, caption: '草稿 1', wide: true },
      '草稿画完后我发现，粉色纸的用色有些过于用力了，但环境的颜色我很满意。于是我决定在铺色阶段让米白色成为画面中心的主要颜色，随着往外扩散，逐渐过渡成黄绿色的配色。',
      '从颜色上来说，我十分满意这次的配色 —— 它营造出了一种梦幻的感觉，和「妄想天使」的主题是符合的。',
      '但问题随之而来：这样一幅图，我该怎么安排光影？作为高明度的配色，配合不同的影调会产生完全不同的效果，氛围也会随之改变。再三斟酌后，我做了两个版本的打光来选。',
      {
        images: [
          { src: lightWangXiangTianShi01, caption: '打光 1' },
          { src: lightWangXiangTianShi02, caption: '打光 2' },
        ],
      },
      '在构思的时候，人物主体光最后就剩这两个版本。考虑到黑白剪影的形状之后，我选了左图（打光 1）的打光 —— 画面比例将近 2:1，人物落在右侧的三分之一处，如果用聚光灯，左侧会留下太多空白；而左侧的灯光可以让黑白的形状更加丰富。',
      '但我也考虑到，我需要一个柔和的画面去配合人物的性格，于是我选了柔和的明暗交界线，并且让光影的形状配合人物形成一个爱心形状。再配合上灯球的高饱和破形，最终完成了这幅作品。',
    ],

    /* ---------- 终稿大图 ----------
       和上面的插图同栏同宽，只在最后出现一次，作为整页的收束。
       别给它加横向出血（案例 1 加过一次，比上面的图大出一半，返工了）。 */
    finale: {
      image: finaleWangXiangTianShi,
      caption: '终稿 · 妄想天使',
      alt: '妄想天使 · 千夏 终稿完整画面',
    },

    /* ---------- 总结 ----------
       紧跟在终稿大图下面，是整页的最后一块。留空数组就不渲染。 */
    summary: [
      '首先，甲方给我的发挥空间很大，但我却选择了一种比较平庸、保守的构图。因此我也认识到：这方面也许是我的舒适区，我应该逃离。',
      '说回作品本身，这次作品让我学到了如何用影调、配色、光影来暗示一个角色的性格，让一幅图有灵魂。它也让我产生另一方面的思考：一幅图的配色好固然重要，但光影的部署可能会引导整个画面走向另一种风格，因此在之后的作品里，优先考虑最终的效果输出才是最稳妥的选择。',
    ],

    approachPoints: [],
    steps: [],
  },
]

export const getCaseStudy = (id) =>
  caseStudies.find((study) => study.id === id) || null
