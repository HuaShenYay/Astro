// @ts-check
import { defineConfig } from 'astro/config';

import sanity from '@sanity/astro';
import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [
    sanity({
      projectId: 'y6sc85uh', // 去 sanity.io/manage 拷贝那串 8 位左右的代码
      dataset: 'production',
      useCdn: false,
    }), 
    react()
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});