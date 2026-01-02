<template>
  <nav class="flex justify-end">
    <div
      ref="navContainer"
      class="inline-flex gap-5 md:gap-6 px-4 md:px-6 py-2 md:py-2.5 bg-[#f0f0f0] rounded-full text-sm font-medium text-[#262626] backdrop-blur-sm cursor-pointer"
      :style="containerStyle"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <a
        v-for="link in links"
        :key="link.key"
        :href="link.href"
        class="relative transition-all duration-300"
        :class="[
          currentPage === link.key
            ? 'underline decoration-1 underline-offset-2 decoration-[#262626]'
            : 'hover:text-[#525252]'
        ]"
        @mouseenter="handleLinkHover(link.key)"
        @mouseleave="handleLinkLeave"
        :style="getLinkStyle(link.key)"
      >
        {{ link.label }}
        <span
          v-if="hoveredLink === link.key && currentPage !== link.key"
          class="absolute bottom-0 left-0 h-[1px] bg-[#525252] transition-all duration-300"
          :style="{ width: underlineWidth }"
        />
      </a>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';

interface Props {
  currentPage?: 'work' | 'about' | 'contact';
}

const props = withDefaults(defineProps<Props>(), {
  currentPage: 'work'
});

const links = [
  { href: '/', label: 'Work', key: 'work' },
  { href: '/about-me', label: 'About', key: 'about' },
  { href: '/contact', label: 'Contact', key: 'contact' },
];

const navContainer = ref<HTMLElement | null>(null);
const hoveredLink = ref<string | null>(null);
const isHovered = ref(false);
const underlineWidth = ref('0%');
const shadowIntensity = ref(0.1);

// 进入动画
onMounted(async () => {
  await nextTick();
  if (navContainer.value) {
    navContainer.value.style.opacity = '0';
    navContainer.value.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      if (navContainer.value) {
        navContainer.value.style.transition = 'all 0.3s ease-out';
        navContainer.value.style.opacity = '1';
        navContainer.value.style.transform = 'translateY(0)';
      }
    }, 50);
  }
});

const containerStyle = computed(() => ({
  boxShadow: isHovered.value
    ? `0 4px 6px -1px rgba(0, 0, 0, ${shadowIntensity.value}), 0 2px 4px -2px rgba(0, 0, 0, ${shadowIntensity.value})`
    : `0 1px 3px 0 rgba(0, 0, 0, ${shadowIntensity.value}), 0 1px 2px -1px rgba(0, 0, 0, ${shadowIntensity.value})`,
  transform: isHovered.value ? 'scale(1.02)' : 'scale(1)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
}));

const handleMouseEnter = () => {
  isHovered.value = true;
  shadowIntensity.value = 0.15;
};

const handleMouseLeave = () => {
  isHovered.value = false;
  shadowIntensity.value = 0.1;
};

const handleLinkHover = (key: string) => {
  hoveredLink.value = key;
  underlineWidth.value = '100%';
};

const handleLinkLeave = () => {
  hoveredLink.value = null;
  underlineWidth.value = '0%';
};

const getLinkStyle = (key: string) => {
  if (hoveredLink.value === key && props.currentPage !== key) {
    return {
      transform: 'translateY(-2px) scale(1.05)',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
    };
  }
  return {
    transform: 'translateY(0) scale(1)',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
  };
};
</script>

<style scoped>
a {
  display: inline-block;
}

a:active {
  transform: scale(0.95) !important;
}
</style>

