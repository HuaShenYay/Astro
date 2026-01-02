<template>
  <section
    ref="sectionRef"
    class="relative overflow-hidden"
    :style="sectionStyle"
  >
    <slot />
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const sectionRef = ref<HTMLElement | null>(null);
const scrollY = ref(0);
const parallaxOffset = ref(0);

const sectionStyle = computed(() => ({
  transform: `translateY(${parallaxOffset.value}px)`,
  transition: 'transform 0.1s ease-out'
}));

const handleScroll = () => {
  if (sectionRef.value) {
    const rect = sectionRef.value.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // 当元素在视口中时应用视差效果
    if (rect.top < windowHeight && rect.bottom > 0) {
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distance = elementCenter - viewportCenter;
      
      // 视差强度（可调整）
      parallaxOffset.value = distance * 0.1;
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>


