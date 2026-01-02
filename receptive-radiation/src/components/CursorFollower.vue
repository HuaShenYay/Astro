<template>
  <div
    ref="cursorRef"
    class="fixed pointer-events-none z-50"
    :style="cursorStyle"
  >
    <div 
      class="w-6 h-6 rounded-full bg-[#262626] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out mix-blend-difference"
      :class="{ 'scale-150': isHovering }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const cursorRef = ref<HTMLElement | null>(null);
const mouseX = ref(0);
const mouseY = ref(0);
const isHovering = ref(false);

const cursorStyle = computed(() => ({
  left: `${mouseX.value}px`,
  top: `${mouseY.value}px`,
  transition: 'left 0.1s ease-out, top 0.1s ease-out'
}));

const updateCursor = (e: MouseEvent) => {
  mouseX.value = e.clientX;
  mouseY.value = e.clientY;
  
  // 检查是否悬停在可交互元素上
  const target = e.target as HTMLElement;
  isHovering.value = !!(
    target.closest('a') ||
    target.closest('button') ||
    target.closest('[role="button"]') ||
    target.closest('[class*="cursor-pointer"]')
  );
};

onMounted(() => {
  if (window.innerWidth > 768) {
    window.addEventListener('mousemove', updateCursor);
    document.body.style.cursor = 'none';
  }
});

onUnmounted(() => {
  window.removeEventListener('mousemove', updateCursor);
  document.body.style.cursor = 'auto';
});
</script>
