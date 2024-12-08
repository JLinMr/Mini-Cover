export const defaultConfig = {
    text: '梦爱吃鱼',       // 默认文本
    watermark: '@梦爱吃鱼', // 默认水印
    fontFamily: import.meta.env.VITE_APP_FONT_FAMILY,
    fontStyles: [
        'https://chinese-fonts-cdn.deno.dev/packages/yozai/dist/Yozai-Regular/result.css',
        'https://chinese-fonts-cdn.deno.dev/packages/hcqyt/dist/ChillRoundFRegular/result.css',
        'https://chinese-fonts-cdn.deno.dev/packages/dymh/dist/DouyinSansBold/result.css',
        'https://chinese-fonts-cdn.deno.dev/packages/mkzyt/dist/猫啃珠圆体/result.css'
    ],
    fontOptions: [
        { value: import.meta.env.VITE_APP_FONT_FAMILY, label: '默认全局' },
        { value: 'Microsoft YaHei', label: '微软雅黑' },
        { value: 'yozai', label: '悠哉字体' },
        { value: '寒蝉全圆体', label: '寒蝉全圆体' },
        { value: 'Douyin Sans', label: '抖音美好体' },
        { value: 'MaokenZhuyuanTi', label: '猫啃珠圆体' }
    ]
};