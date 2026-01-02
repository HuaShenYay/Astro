<template>
  <h1 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.2] mb-8 md:mb-10 text-[#262626] tracking-tight">
    <span
      v-for="(line, index) in lines"
      :key="index"
      ref="lineRefs"
      class="block"
      :style="getLineStyle(index)"
    >
      {{ line }}
    </span>
  </h1>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';

interface Props {
  lines: string[];
}

const props = defineProps<Props>();

const lineRefs = ref<(HTMLElement | null)[]>([]);

const getLineStyle = (index: number) => {
  return {
    opacity: 0,
    transform: 'translateY(20px)',
    transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
  };
};

onMounted(async () => {
  await nextTick();
  
  lineRefs.value.forEach((el, index) => {
    if (el) {
      // 使用 setTimeout 触发动画
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 150 + 100);
    }
  });
});
</script>

