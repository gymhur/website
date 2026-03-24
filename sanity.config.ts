import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { productCategory, product, siteSettings, homePage, aboutPage } from './src/lib/sanity';

export default defineConfig({
  name: 'gymhur',
  title: 'Gymhur CMS',
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [productCategory, product, siteSettings, homePage, aboutPage],
  },
});
