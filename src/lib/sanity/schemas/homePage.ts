import { defineField, defineType } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string' }),
    defineField({ name: 'heroSubheadline', title: 'Hero Subheadline', type: 'text' }),
    defineField({ name: 'heroCtaText', title: 'Hero CTA Button Text', type: 'string' }),
    defineField({
      name: 'whyPoints',
      title: 'Why Gymhur Points',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', type: 'string', title: 'Title' },
          { name: 'description', type: 'text', title: 'Description' },
        ],
      }],
    }),
  ],
});
