<template>
  <div
    class="bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 relative overflow-hidden"
    :style="cardStyle"
  >
    <!-- 渐变光晕效果 -->
    <div
      class="absolute inset-0 opacity-30 pointer-events-none"
      :style="gradientStyle"
    />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const mouseX = ref(0);
const mouseY = ref(0);

const cardStyle = {
  background: 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
};

const gradientStyle = computed(() => ({
  background: `radial-gradient(circle at ${mouseX.value}px ${mouseY.value}px, rgba(147, 51, 234, 0.1), transparent 50%)`,
  transition: 'background 0.3s ease-out'
}));

const handleMouseMove = (e: MouseEvent) => {
  const card = (e.currentTarget as HTMLElement).closest('[class*="bg-white"]');
  if (card) {
    const rect = card.getBoundingClientRect();
    mouseX.value = e.clientX - rect.left;
    mouseY.value = e.clientY - rect.top;
  }
};

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove);
});
</script>

<style scoped>
/* 玻璃态效果 */
</style>
