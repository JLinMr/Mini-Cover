const loadedImages = new Map();
export const state = {
    bgImageUrl: null,
    squareImageUrl: null,
    bgColor: '#ffffff',
    textColor: '#eeeeee',
    watermarkColor: '#dddddd',
    iconColor: '#ffffff',
    rotation: 0,
    shadowBlur: 120,
    shadowOffsetX: 1,
    shadowOffsetY: 1,
    watermark: "@梦爱吃鱼",
    textSize: 200,
    squareSize: 300,
    text: '梦爱吃鱼',
    bgBlur: 3,
    iconBackground: false,
    iconBorder: false
};

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

export function updateShadowPreset() {
    const preset = document.querySelector('input[name="shadowPreset"]:checked').value;
    const presets = {
        none: { blur: 0, offsetX: 0, offsetY: 0 },
        light: { blur: 60, offsetX: 1, offsetY: 1 },
        medium: { blur: 90, offsetX: 1, offsetY: 1 },
        heavy: { blur: 120, offsetX: 1, offsetY: 1 }
    };
    const { blur, offsetX, offsetY } = presets[preset];
    state.shadowBlur = blur;
    state.shadowOffsetX = offsetX;
    state.shadowOffsetY = offsetY;
    drawSquareImage();
}

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
        iconBackground: drawSquareImage,
        iconBorder: drawSquareImage
    };
    updateFunctions[type](event);
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
    state.text = event.target.value;
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
    if (state.iconBackground || state.iconBorder) {
        state.iconColor = event.target.value;
        drawSquareImage();
    }
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
            if (state.iconBackground) {
                tempCtx.fillStyle = state.iconColor;
                tempCtx.beginPath();
                tempCtx.moveTo(radius + borderWidth, borderWidth);
                tempCtx.arcTo(totalSize - borderWidth, borderWidth, totalSize - borderWidth, radius + borderWidth, radius);
                tempCtx.arcTo(totalSize - borderWidth, totalSize - borderWidth, totalSize - radius - borderWidth, totalSize - borderWidth, radius);
                tempCtx.arcTo(borderWidth, totalSize - borderWidth, borderWidth, totalSize - radius - borderWidth, radius);
                tempCtx.arcTo(borderWidth, borderWidth, radius + borderWidth, borderWidth, radius);
                tempCtx.closePath();
                tempCtx.fill();
            }

            // 绘制边框
            if (state.iconBorder) {
                tempCtx.strokeStyle = state.iconColor;
                tempCtx.lineWidth = borderWidth;
                tempCtx.beginPath();
                tempCtx.moveTo(radius + borderWidth, borderWidth);
                tempCtx.arcTo(totalSize - borderWidth, borderWidth, totalSize - borderWidth, radius + borderWidth, radius);
                tempCtx.arcTo(totalSize - borderWidth, totalSize - borderWidth, totalSize - radius - borderWidth, totalSize - borderWidth, radius);
                tempCtx.arcTo(borderWidth, totalSize - borderWidth, borderWidth, totalSize - radius - borderWidth, radius);
                tempCtx.arcTo(borderWidth, borderWidth, radius + borderWidth, borderWidth, radius);
                tempCtx.closePath();
                tempCtx.stroke();
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

            tempCtx.drawImage(squareImg, borderWidth, borderWidth, size, size);
            tempCtx.restore();

            squareCtx.save();
            squareCtx.shadowColor = 'rgba(0, 0, 0, 0.5)';
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
    textCtx.font = `600 ${state.textSize}px ${fontFamily}`;
    textCtx.fillStyle = state.textColor;
    textCtx.textAlign = 'center';
    textCtx.textBaseline = 'middle';
    textCtx.fillText(state.text, textCanvas.width / 2, textCanvas.height / 2);
    composeCanvases();
}

export function drawWatermark() {
    watermarkCtx.clearRect(0, 0, watermarkCanvas.width, watermarkCanvas.height);
    const { fontFamily } = getHtmlFontStyles();
    watermarkCtx.font = `italic 14px ${fontFamily}`;
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