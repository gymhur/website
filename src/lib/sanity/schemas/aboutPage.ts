import { defineField, defineType } from 'sanity';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({ name: 'story', title: 'Our Story', type: 'text' }),
    defineField({ name: 'teamInfo', title: 'Team Info', type: 'text' }),
  ],
});
