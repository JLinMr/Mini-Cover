import { defaultConfig } from '../config';
import { reactive } from 'vue';

const loadedImages = new Map();
export const state = reactive({
    bgImageUrl: null,
    squareImageUrl: null,
    bgColor: '#ffffff',
    textColor: '#eeeeee',
    watermarkColor: '#dddddd',
    iconColor: '#eeeeee',
    rotation: 0,
    shadowColor: '#646464',
    shadowBlur: 120,
    shadowOffsetX: 1,
    shadowOffsetY: 1,
    shadowStrength: 60,
    watermark: defaultConfig.watermark,
    textSize: 200,
    lineHeight: 1,
    text3D: 0,
    squareSize: 300,
    text: defaultConfig.text,
    bgBlur: 3,
    iconBgSize: 0,
    selectedFont: defaultConfig.fontFamily,
    isFontMenuOpen: false,
    hasMultipleLines: false
});

export let canvas = null;
export let ctx = null;

const createCanvas = (width, height) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return { canvas, ctx: canvas.getContext('2d') };
};

export const { canvas: bgCanvas, ctx: bgCtx } = createCanvas(1000, 500);
export const { canvas: textCanvas, ctx: textCtx } = createCanvas(1000, 500);
export const { canvas: watermarkCanvas, ctx: watermarkCtx } = createCanvas(1000, 500);
export const { canvas: squareCanvas, ctx: squareCtx } = createCanvas(1000, 500);

export function updatePreview(type, event) {
    const updateFunctions = {
        bg: updateBackgroundImage,
        bgColor: updateBackgroundColor,
        textColor: updateTextColor,
        watermarkColor: updateWatermarkColor,
        square: updateSquareImage,
        rotation: updateRotation,
        text: updateText,
        watermark: updateWatermark,
        textSize: updateTextSize,
        squareSize: updateSquareSize,
        bgBlur: updateBgBlur,
        iconColor: updateIconColor,
        iconBgSize: updateIconBgSize,
        font: updateFont,
        lineHeight: drawText,
        text3D: updateText3D,
        shadowColor: updateShadowColor,
        shadowStrength: updateShadowStrength
    };
    updateFunctions[type](event);
}

export function updateText3D(event) {
    state.text3D = event.target.value;
    drawText();
}

export function updateFont(event) {
    state.selectedFont = event.target.value;
    drawText();
    drawWatermark();
}

export function updateBackgroundImage(event) {
    const bgImage = event.target.files[0];
    if (bgImage) {
        loadImage(bgImage, (url) => {
            state.bgImageUrl = url;
            drawBackground();
        });
    }
}

export function updateBackgroundColor(event) {
    state.bgColor = event.target.value;
    state.bgImageUrl = null;
    drawBackground();
}

export function updateTextColor(event) {
    state.textColor = event.target.value;
    drawText();
}

export function updateWatermarkColor(event) {
    state.watermarkColor = event.target.value;
    drawWatermark();
}

export function updateSquareImage(event) {
    const squareImage = event.target.files[0];
    if (squareImage) {
        loadImage(squareImage, (url) => {
            state.squareImageUrl = url;
            drawSquareImage();
        });
    }
}

export function updateRotation(event) {
    state.rotation = event.target.value;
    drawSquareImage();
}

export function updateText(event) {
    state.text = event.target.value || defaultConfig.text;
    state.hasMultipleLines = state.text.includes('\n');
    drawText();
}

export function updateWatermark(event) {
    state.watermark = event.target.value;
    drawWatermark();
}

export function updateTextSize(event) {
    state.textSize = event.target.value;
    drawText();
}

export function updateSquareSize(event) {
    state.squareSize = event.target.value;
    drawSquareImage();
}

export function updateBgBlur(event) {
    state.bgBlur = event.target.value;
    drawBackground();
}

export function updateIconColor(event) {
    state.iconColor = event.target.value;
    drawSquareImage();
}

export function updateIconBgSize(event) {
    state.iconBgSize = Number(event.target.value);
    drawSquareImage();
}

export function updateShadowColor(event) {
    state.shadowColor = event.target.value;
    drawSquareImage();
}

export function updateShadowStrength(event) {
    const strength = state.shadowStrength;
    state.shadowBlur = strength * 2;
    state.shadowOffsetX = 0;
    state.shadowOffsetY = 0;
    drawSquareImage();
}

function loadImage(file, callback) {
    if (!loadedImages.has(file)) {
        const reader = new FileReader();
        reader.onload = (e) => {
            loadedImages.set(file, e.target.result);
            callback(e.target.result);
        };
        reader.readAsDataURL(file);
    } else {
        callback(loadedImages.get(file));
    }
}

export function drawBackground() {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

    if (state.bgImageUrl) {
        const img = new Image();
        img.onload = () => {
            const scaleX = bgCanvas.width / img.width;
            const scaleY = bgCanvas.height / img.height;
            const scale = Math.max(scaleX, scaleY);
            const width = img.width * scale;
            const height = img.height * scale;
            const x = (bgCanvas.width - width) / 2;
            const y = (bgCanvas.height - height) / 2;

            bgCtx.filter = `blur(${state.bgBlur}px)`;
            bgCtx.drawImage(img, x, y, width, height);
            composeCanvases();
        };
        img.src = state.bgImageUrl;
    } else {
        bgCtx.fillStyle = state.bgColor;
        bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
        composeCanvases();
    }
}

export function drawSquareImage() {
    squareCtx.clearRect(0, 0, squareCanvas.width, squareCanvas.height);
    if (state.squareImageUrl) {
        const squareImg = new Image();
        squareImg.onload = () => {
            const totalSize = state.squareSize;
            const borderWidth = 20;
            const size = totalSize - 2 * borderWidth;
            const x = (squareCanvas.width - totalSize) / 2;
            const y = (squareCanvas.height - totalSize) / 2;
            const radius = 30;

            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = totalSize;
            tempCanvas.height = totalSize;
            const tempCtx = tempCanvas.getContext('2d');

            // 绘制背景
            if (state.iconBgSize > 0) {
                const bgPadding = state.iconBgSize;
                tempCtx.fillStyle = state.iconColor;
                tempCtx.beginPath();
                tempCtx.moveTo(radius + borderWidth - bgPadding, borderWidth - bgPadding);
                tempCtx.arcTo(
                    totalSize - borderWidth + bgPadding, 
                    borderWidth - bgPadding, 
                    totalSize - borderWidth + bgPadding, 
                    radius + borderWidth - bgPadding, 
                    radius
                );
                tempCtx.arcTo(
                    totalSize - borderWidth + bgPadding, 
                    totalSize - borderWidth + bgPadding, 
                    totalSize - radius - borderWidth + bgPadding, 
                    totalSize - borderWidth + bgPadding, 
                    radius
                );
                tempCtx.arcTo(
                    borderWidth - bgPadding, 
                    totalSize - borderWidth + bgPadding, 
                    borderWidth - bgPadding, 
                    totalSize - radius - borderWidth + bgPadding, 
                    radius
                );
                tempCtx.arcTo(
                    borderWidth - bgPadding, 
                    borderWidth - bgPadding, 
                    radius + borderWidth - bgPadding, 
                    borderWidth - bgPadding, 
                    radius
                );
                tempCtx.closePath();
                tempCtx.fill();
            }

            tempCtx.save();
            tempCtx.beginPath();
            tempCtx.moveTo(radius + borderWidth, borderWidth);
            tempCtx.arcTo(totalSize - borderWidth, borderWidth, totalSize - borderWidth, radius + borderWidth, radius);
            tempCtx.arcTo(totalSize - borderWidth, totalSize - borderWidth, totalSize - radius - borderWidth, totalSize - borderWidth, radius);
            tempCtx.arcTo(borderWidth, totalSize - borderWidth, borderWidth, totalSize - radius - borderWidth, radius);
            tempCtx.arcTo(borderWidth, borderWidth, radius + borderWidth, borderWidth, radius);
            tempCtx.closePath();
            tempCtx.clip();

            // 计算图像的缩放比例
            const imgAspectRatio = squareImg.width / squareImg.height;
            const containerAspectRatio = size / size; // 因为容器是正方形，所以宽高比为1

            let scaledWidth, scaledHeight;
            if (imgAspectRatio > containerAspectRatio) {
                // 图像比容器宽，按宽度缩放
                scaledWidth = size;
                scaledHeight = size / imgAspectRatio;
            } else {
                // 图像比容器高，按高度缩放
                scaledWidth = size * imgAspectRatio;
                scaledHeight = size;
            }

            // 计算图像在容器中的偏移量，使其居中
            const offsetX = (size - scaledWidth) / 2;
            const offsetY = (size - scaledHeight) / 2;

            tempCtx.drawImage(squareImg, borderWidth + offsetX, borderWidth + offsetY, scaledWidth, scaledHeight);
            tempCtx.restore();

            squareCtx.save();
            squareCtx.shadowColor = state.shadowColor;
            squareCtx.shadowBlur = state.shadowBlur;
            squareCtx.shadowOffsetX = state.shadowOffsetX;
            squareCtx.shadowOffsetY = state.shadowOffsetY;

            squareCtx.translate(x + totalSize / 2, y + totalSize / 2);
            squareCtx.rotate(state.rotation * Math.PI / 180);
            squareCtx.translate(-(x + totalSize / 2), -(y + totalSize / 2));

            squareCtx.drawImage(tempCanvas, x, y, totalSize, totalSize);
            squareCtx.restore();

            composeCanvases();
        };
        squareImg.src = state.squareImageUrl;
    } else {
        composeCanvases();
    }
}

function getHtmlFontStyles() {
    const htmlElement = document.documentElement;
    const computedStyle = getComputedStyle(htmlElement);
    const fontFamily = computedStyle.fontFamily;
    return { fontFamily };
}

export function drawText() {
    textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);
    const { fontFamily } = getHtmlFontStyles();
    const font = state.selectedFont ? `${state.selectedFont}, ${fontFamily}` : fontFamily;
    textCtx.font = `600 ${state.textSize}px ${font}`;
    textCtx.fillStyle = state.textColor;
    textCtx.textAlign = 'center';
    textCtx.textBaseline = 'middle';

    if (state.text3D > 0) {
        textCtx.shadowColor = 'rgba(0, 0, 0, .4)';
        textCtx.shadowBlur = state.text3D * 0.5;
        textCtx.shadowOffsetX = state.text3D;
        textCtx.shadowOffsetY = state.text3D;
    } else {
        textCtx.shadowColor = 'transparent';
        textCtx.shadowBlur = 0;
        textCtx.shadowOffsetX = 0;
        textCtx.shadowOffsetY = 0;
    }

    // 处理多行文本
    const lines = state.text.split('\n');
    const lineHeight = state.textSize * state.lineHeight;
    const totalHeight = lineHeight * lines.length;
    const startY = (textCanvas.height - totalHeight) / 2 + lineHeight / 2;

    lines.forEach((line, index) => {
        const y = startY + index * lineHeight;
        textCtx.fillText(line, textCanvas.width / 2, y);
    });

    composeCanvases();
}

export function drawWatermark() {
    watermarkCtx.clearRect(0, 0, watermarkCanvas.width, watermarkCanvas.height);
    const { fontFamily } = getHtmlFontStyles();
    const font = state.selectedFont ? `${state.selectedFont}, ${fontFamily}` : fontFamily;
    watermarkCtx.font = `italic 14px ${font}`;
    watermarkCtx.fillStyle = state.watermarkColor;
    watermarkCtx.textAlign = 'right';
    watermarkCtx.fillText(state.watermark, watermarkCanvas.width - 20, watermarkCanvas.height - 20);
    composeCanvases();
}

export function composeCanvases() {
    if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bgCanvas, 0, 0);
        ctx.drawImage(textCanvas, 0, 0);
        ctx.drawImage(squareCanvas, 0, 0);
        ctx.drawImage(watermarkCanvas, 0, 0);
    }
}

export function saveWebp() {
    if (canvas) {
        canvas.toBlob(blob => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'Canvas-Ruom.webp';
            link.click();
            URL.revokeObjectURL(link.href);
        }, 'image/webp');
    }
}

export function initialize() {
    canvas = document.getElementById('canvasPreview');
    if (canvas) {
        ctx = canvas.getContext('2d');
        drawBackground();
        drawText();
        drawWatermark();
    } else {
        console.error('Canvas element not found');
    }
}