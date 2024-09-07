<template>
<main class="container">
  <div class="input-container">
    <div class="icon-selector">
      <input type="text" class="input-icon" v-model="iconName" placeholder="输入图标名称，例如 logos:chrome" @input="loadIcon" />
      <a href="https://yesicon.app/" target="_blank" class="icon-link">图标库</a>
    </div>
    <div class="background-settings">
      <div class="background-upload">
        <label for="inputBgImage" class="file-input-label">选择背景图片</label>
        <input type="file" id="inputBgImage" class="input-file" accept="image/*" @change="updatePreview('bg', $event)">
        <label for="inputSquareImage" class="file-input-label">选择图标图片</label>
        <input type="file" id="inputSquareImage" class="input-file" accept="image/*" @change="updatePreview('square', $event)">
      </div>
    </div>
    <div class="color-group">
      <label for="inputBgColor">背景颜色:</label>
      <input type="color" id="inputBgColor" class="input-color" v-model="state.bgColor" @input="updatePreview('bgColor', $event)">
      <label for="inputTextColor">标题颜色:</label>
      <input type="color" id="inputTextColor" class="input-color" v-model="state.textColor" @input="updatePreview('textColor', $event)">
      <label for="inputWatermarkColor">水印颜色:</label>
      <input type="color" id="inputWatermarkColor" class="input-color" v-model="state.watermarkColor" @input="updatePreview('watermarkColor', $event)">
      <label for="inputIconColor">边框背景:</label>
      <input type="color" id="inputIconColor" class="input-color" v-model="state.iconColor" @input="updatePreview('iconColor', $event)">
    </div>
    <div class="background-blur">
      <label for="inputBgBlur">背景模糊:</label>
      <input type="range" id="inputBgBlur" class="input-range" min="0" max="8" v-model="state.bgBlur" @input="updatePreview('bgBlur', $event)">
    </div>
    <div class="icon-settings">
      <div class="setting-item">
        <label for="inputSquareSize">图标大小:</label>
        <input type="range" id="inputSquareSize" class="input-range" min="200" max="500" v-model="state.squareSize" @input="updatePreview('squareSize', $event)">
      </div>
      <div class="setting-item">
        <label for="inputRotation">图标旋转:</label>
        <input type="range" id="inputRotation" class="input-range" min="0" max="360" v-model="state.rotation" @input="updatePreview('rotation', $event)">
      </div>
    </div>
    <div class="radio-group">
      <label><input type="radio" name="shadowPreset" value="none" @change="updateShadowPreset"><span>无阴影</span></label>
      <label><input type="radio" name="shadowPreset" value="light" @change="updateShadowPreset"><span>小阴影</span></label>
      <label><input type="radio" name="shadowPreset" value="medium" @change="updateShadowPreset"><span>中阴影</span></label>
      <label><input type="radio" name="shadowPreset" value="heavy" checked @change="updateShadowPreset"><span>大阴影</span></label>
    </div>
    <div class="text-settings">
      <label for="inputTextSize">标题大小:</label>
      <input type="range" id="inputTextSize" class="input-range" min="20" max="300" v-model="state.textSize" @input="updatePreview('textSize', $event)">
    </div>
    <input type="text" id="inputText" class="input-text" @input="updatePreview('text', $event)" placeholder="输入标题">
    <div class="watermark-group">
      <input type="text" id="inputWatermark" class="input-text" @input="updatePreview('watermark', $event)" placeholder="输入水印">
      <label class="input-checkbox"><input type="checkbox" v-model="state.iconBackground" @change="drawSquareImage"><span>图标背景</span></label>
      <label class="input-checkbox"><input type="checkbox" v-model="state.iconBorder" @change="drawSquareImage"><span>图标边框</span></label>
    </div>
    <button class="btn-save" @click="saveWebp">保存图片</button>
  </div>
  <canvas id="canvasPreview" width="1000" height="500"></canvas>
</main>
</template>

<script>
import { state, updateShadowPreset, updatePreview, saveWebp, drawSquareImage, initialize} from '../assets/script.js';

export default {
  data() {
    return {
      state,
      iconName: '',
      iconUrl: null
    };
  },
  mounted() {
    initialize();
  },
  methods: {
    updateShadowPreset,
    updatePreview,
    saveWebp,
    loadIcon() {
      if (this.iconName) {
        this.iconUrl = `https://api.iconify.design/${this.iconName}.svg`;
        this.selectIcon();
      } else {
        this.iconUrl = null;
        state.squareImageUrl = null;
      }
    },
    selectIcon() {
      if (this.iconUrl) {
        fetch(this.iconUrl)
          .then(response => response.blob())
          .then(blob => {
            const file = new File([blob], 'icon.svg', { type: 'image/svg+xml' });
            state.squareImageUrl = URL.createObjectURL(file);
            updatePreview('square', { target: { files: [file] } });
          })
          .catch(error => console.error('Error fetching icon:', error));
      }
    },
    drawSquareImage
  }
};
</script>