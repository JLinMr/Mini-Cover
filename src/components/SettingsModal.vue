<template>
  <Teleport to="body">
    <div v-if="mounted" 
         class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <!-- 背景遮罩 -->
      <Transition
        appear
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        enter-active-class="transition-opacity duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        leave-active-class="transition-opacity duration-300"
      >
        <div v-show="modelValue"
             class="absolute inset-0 bg-black/60" 
             @click="$emit('update:modelValue', false)"
        ></div>
      </Transition>
      
      <!-- 设置容器 -->
      <Transition
        appear
        enter-from-class="opacity-0 translate-y-4 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        enter-active-class="transition-all duration-300 transform"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 translate-y-4 scale-95"
        leave-active-class="transition-all duration-300 transform"
        @after-leave="onAfterLeave"
      >
        <div v-show="modelValue"
             class="relative bg-white rounded-lg shadow-xl w-full max-w-lg
                    border border-gray-200 p-6"
             @click.stop
        >
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium">设置</h3>
            <button @click="$emit('update:modelValue', false)"
                    class="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- 设置内容 -->
          <div class="flex flex-col items-center justify-center py-12 text-gray-400">
            <svg class="w-16 h-16 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <p class="text-sm">设置内容待添加</p>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script>
export default {
  name: 'SettingsModal',
  props: {
    modelValue: Boolean
  },
  emits: ['update:modelValue'],
  data() {
    return {
      mounted: false
    }
  },
  watch: {
    modelValue(val) {
      if (val) {
        this.mounted = true
      }
    }
  },
  methods: {
    onAfterLeave() {
      this.mounted = false
    }
  }
}
</script> 