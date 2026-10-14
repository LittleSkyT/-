// ============================================================
//  全部作品页（#/gallery）的数据
// ------------------------------------------------------------
//  16 张图，每张两份：
//    · thumb = 网格里的缩略图（600px 宽 / WebP q78）
//    · full  = 点开后看的大图（1600px 宽 / WebP q82）
//  源图在 C:\Users\28402\Desktop\作品集网站\作品\，
//  由 I:\大肥鱼工作台\gen_gallery.py 批量压缩，原图没有改动。
//
//  想改顺序：直接调这个数组的先后。
//  想改名字：把下面的 title 换成真实作品名（现在只能写「作品 NN」，
//  因为助手看不到图，说不出每张画的是什么）。
// ============================================================
import g01Thumb from '../assets/gallery/g01-thumb.webp'
import g01 from '../assets/gallery/g01.webp'
import g02Thumb from '../assets/gallery/g02-thumb.webp'
import g02 from '../assets/gallery/g02.webp'
import g03Thumb from '../assets/gallery/g03-thumb.webp'
import g03 from '../assets/gallery/g03.webp'
import g04Thumb from '../assets/gallery/g04-thumb.webp'
import g04 from '../assets/gallery/g04.webp'
import g05Thumb from '../assets/gallery/g05-thumb.webp'
import g05 from '../assets/gallery/g05.webp'
import g06Thumb from '../assets/gallery/g06-thumb.webp'
import g06 from '../assets/gallery/g06.webp'
import g07Thumb from '../assets/gallery/g07-thumb.webp'
import g07 from '../assets/gallery/g07.webp'
import g08Thumb from '../assets/gallery/g08-thumb.webp'
import g08 from '../assets/gallery/g08.webp'
import g09Thumb from '../assets/gallery/g09-thumb.webp'
import g09 from '../assets/gallery/g09.webp'
import g10Thumb from '../assets/gallery/g10-thumb.webp'
import g10 from '../assets/gallery/g10.webp'
import g11Thumb from '../assets/gallery/g11-thumb.webp'
import g11 from '../assets/gallery/g11.webp'
import g12Thumb from '../assets/gallery/g12-thumb.webp'
import g12 from '../assets/gallery/g12.webp'
import g13Thumb from '../assets/gallery/g13-thumb.webp'
import g13 from '../assets/gallery/g13.webp'
import g14Thumb from '../assets/gallery/g14-thumb.webp'
import g14 from '../assets/gallery/g14.webp'
import g15Thumb from '../assets/gallery/g15-thumb.webp'
import g15 from '../assets/gallery/g15.webp'
import g16Thumb from '../assets/gallery/g16-thumb.webp'
import g16 from '../assets/gallery/g16.webp'

export const galleryItems = [
  // 源文件：333.png（4640 × 2000）
  {
    id: 'g01',
    title: '作品 01',
    thumb: g01Thumb,
    full: g01,
    thumbSize: [600, 259],
    fullSize: [1600, 690],
    orient: 'landscape',
  },
  // 源文件：乔葛.png（6026 × 3000）
  {
    id: 'g02',
    title: '作品 02',
    thumb: g02Thumb,
    full: g02,
    thumbSize: [600, 299],
    fullSize: [1600, 797],
    orient: 'landscape',
  },
  // 源文件：二色桃(最终)_d2b5968ce155ca8b8ca96f56e620bd2c.png（6493 × 3652）
  {
    id: 'g03',
    title: '作品 03',
    thumb: g03Thumb,
    full: g03,
    thumbSize: [600, 338],
    fullSize: [1600, 900],
    orient: 'landscape',
  },
  // 源文件：刻律.jpg（5476 × 7378）
  {
    id: 'g04',
    title: '作品 04',
    thumb: g04Thumb,
    full: g04,
    thumbSize: [600, 808],
    fullSize: [1600, 2156],
    orient: 'portrait',
  },
  // 源文件：小圆.jpg（3344 × 6764）
  {
    id: 'g05',
    title: '作品 05',
    thumb: g05Thumb,
    full: g05,
    thumbSize: [600, 1214],
    fullSize: [1600, 3236],
    orient: 'portrait',
  },
  // 源文件：小圆2(无水印).png（3000 × 6000）
  {
    id: 'g06',
    title: '作品 06',
    thumb: g06Thumb,
    full: g06,
    thumbSize: [600, 1200],
    fullSize: [1600, 3200],
    orient: 'portrait',
  },
  // 源文件：弦月小魔(水印) (1).png（8000 × 4500）
  {
    id: 'g07',
    title: '作品 07',
    thumb: g07Thumb,
    full: g07,
    thumbSize: [600, 338],
    fullSize: [1600, 900],
    orient: 'landscape',
  },
  // 源文件：懒幻壁纸拆分.jpg（6804 × 3828）
  {
    id: 'g08',
    title: '作品 08',
    thumb: g08Thumb,
    full: g08,
    thumbSize: [600, 338],
    fullSize: [1600, 900],
    orient: 'landscape',
  },
  // 源文件：成品（无水印）.png（7000 × 3000）
  {
    id: 'g09',
    title: '作品 09',
    thumb: g09Thumb,
    full: g09,
    thumbSize: [600, 257],
    fullSize: [1600, 686],
    orient: 'landscape',
  },
  // 源文件：春日流萤（后期水印）.jpg（13248 × 6219）
  {
    id: 'g10',
    title: '作品 10',
    thumb: g10Thumb,
    full: g10,
    thumbSize: [600, 282],
    fullSize: [1600, 751],
    orient: 'landscape',
  },
  // 源文件：水印.png（6000 × 3000）
  {
    id: 'g11',
    title: '作品 11',
    thumb: g11Thumb,
    full: g11,
    thumbSize: [600, 300],
    fullSize: [1600, 800],
    orient: 'landscape',
  },
  // 源文件：沙丁鱼罐头疼（水印） (1).png（3000 × 6000）
  {
    id: 'g12',
    title: '作品 12',
    thumb: g12Thumb,
    full: g12,
    thumbSize: [600, 1200],
    fullSize: [1600, 3200],
    orient: 'portrait',
  },
  // 源文件：白羊.jpg（6000 × 3000）
  {
    id: 'g13',
    title: '作品 13',
    thumb: g13Thumb,
    full: g13,
    thumbSize: [600, 300],
    fullSize: [1600, 800],
    orient: 'landscape',
  },
  // 源文件：茵陈大人(男水印).png（6000 × 3000）
  {
    id: 'g14',
    title: '作品 14',
    thumb: g14Thumb,
    full: g14,
    thumbSize: [600, 300],
    fullSize: [1600, 800],
    orient: 'landscape',
  },
  // 源文件：莫白悲（真最终）.png（6000 × 3000）
  {
    id: 'g15',
    title: '作品 15',
    thumb: g15Thumb,
    full: g15,
    thumbSize: [600, 300],
    fullSize: [1600, 800],
    orient: 'landscape',
  },
  // 源文件：赋神(2).png（3508 × 4961）
  {
    id: 'g16',
    title: '作品 16',
    thumb: g16Thumb,
    full: g16,
    thumbSize: [600, 849],
    fullSize: [1600, 2263],
    orient: 'portrait',
  },
]
