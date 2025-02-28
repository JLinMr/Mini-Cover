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
        <label for="inputTextColor">标题颜色</label>
        <input type="color" id="inputTextColor" class="input-color" v-model="state.textColor" @input="updatePreview('textColor', $event)">
        <label for="inputWatermarkColor">水印颜色</label>
        <input type="color" id="inputWatermarkColor" class="input-color" v-model="state.watermarkColor" @input="updatePreview('watermarkColor', $event)">
        <label for="inputIconColor">边框背景</label>
        <input type="color" id="inputIconColor" class="input-color" v-model="state.iconColor" @input="updatePreview('iconColor', $event)">
      </div>
      <div class="background-blur">
        <label for="inputBgBlur">背景模糊</label>
        <input type="range" id="inputBgBlur" class="input-range" min="0" max="8" v-model="state.bgBlur" @input="updatePreview('bgBlur', $event)">
        <label for="inputBgColor">背景颜色</label>
        <input type="color" id="inputBgColor" class="input-color" v-model="state.bgColor" @input="updatePreview('bgColor', $event)">
      </div>
      <div class="icon-settings">
        <div class="setting-item">
          <label for="inputSquareSize">图标大小</label>
          <input type="range" id="inputSquareSize" class="input-range" min="200" max="500" v-model="state.squareSize" @input="updatePreview('squareSize', $event)">
        </div>
        <div class="setting-item">
          <label for="inputRotation">图标旋转</label>
          <input type="range" id="inputRotation" class="input-range" min="0" max="360" v-model="state.rotation" @input="updatePreview('rotation', $event)">
        </div>
      </div>
      <div class="radio-group">
        <label><input type="radio" name="shadowPreset" value="none" @change="updateShadowPreset"><span>无阴影</span></label>
        <label><input type="radio" name="shadowPreset" value="light" @change="updateShadowPreset"><span>小阴影</span></label>
        <label><input type="radio" name="shadowPreset" value="medium" @change="updateShadowPreset"><span>中阴影</span></label>
        <label><input type="radio" name="shadowPreset" value="heavy" checked @change="updateShadowPreset"><span>大阴影</span></label>
        <label><input type="checkbox" id="inputText3D" v-model="state.text3D" @change="updatePreview('text3D', $event)"><span>立体字</span></label>
      </div>
      <div class="text-settings">
        <div class="text-size-container">
          <label for="inputTextSize">标题大小</label>
          <input type="range" id="inputTextSize" class="input-range" min="100" max="300" v-model="state.textSize" @input="updatePreview('textSize', $event)">
        </div>
        <div class="text-line-height-container">
          <label for="inputTextLineHeight">标题行高</label>
          <input type="range" id="inputTextLineHeight" class="input-range" min="0.1" max="2" step="0.1" v-model="state.textLineHeight" @input="updatePreview('textLineHeight', $event)">
        </div>
        <div class="font-selector">
          <label for="inputFont">字体</label>
          <select id="inputFont" v-model="state.selectedFont" @change="updatePreview('font', $event)">
            <option v-for="font in defaultConfig.fontOptions" :key="font.value" :value="font.value">{{ font.label }}</option>
          </select>
        </div>
      </div>
      <textarea id="inputText" class="input-text" @input="updatePreview('text', $event)" placeholder="输入标题"/>
      <div class="watermark-group">
        <input type="text" id="inputWatermark" class="input-text" @input="updatePreview('watermark', $event)" placeholder="输入水印">
        <label class="input-checkbox"><input type="checkbox" v-model="state.iconBackground" @change="drawSquareImage"><span>图标背景</span></label>
        <label class="input-checkbox"><input type="checkbox" v-model="state.iconBorder" @change="drawSquareImage"><span>图标边框</span></label>
      </div>
      <div class="button-container">
        <button class="btn" @click="saveWebp">保存图片</button>
        <ImageUploader canvas-id="canvasPreview" />
      </div>
    </div>
    <canvas id="canvasPreview" width="1000" height="500" @dragover.prevent @drop.prevent="handleCanvasDrop" class="preview-canvas"></canvas>
  </main>
  </template>

  <script>
  import { state, updateShadowPreset, updatePreview, saveWebp, drawSquareImage, initialize } from '../assets/script.js';
  import { defaultConfig } from '../config';
  import ImageUploader from './ImageUploader.vue';

  export default {
    components: {
      ImageUploader
    },
    data() {
      return {
        state,
        defaultConfig,
        iconName: '',
        iconUrl: null,
      };
    },
    mounted() {
      this.loadStyles();
      initialize();
    },
    methods: {
      loadStyles() {
        defaultConfig.fontStyles.forEach(url => {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = url;
          document.head.appendChild(link);
        });
      },
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
            .catch(error => {
              console.error('加载图标时出错:', error);
              this.showSuccessPopup('加载图标时出错: ' + error.message, false);
            });
        }
      },
      drawSquareImage,
      handleCanvasDrop(event) {
        const file = event.dataTransfer.files[0];
        if (!file || !file.type.startsWith('image/')) return;
        
        const canvas = event.target;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const centerRadius = 100;
        
        const distanceToCenter = Math.sqrt(
          Math.pow(x - centerX, 2) + 
          Math.pow(y - centerY, 2)
        );
        
        if (distanceToCenter < centerRadius) {
          this.updatePreview('square', { target: { files: [file] } });
        } else {
          this.updatePreview('bg', { target: { files: [file] } });
        }
      },
    }
  };
  </script>