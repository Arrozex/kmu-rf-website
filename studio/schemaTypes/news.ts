import {defineField, defineType} from 'sanity'

export const news = defineType({
  name: 'news',
  title: '最新消息',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: '標題',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'date',
      title: '日期',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'category',
      title: '分類',
      type: 'string',
      options: {
        list: [
          {title: '課程資訊', value: 'course'},
          {title: '活動消息', value: 'event'},
          {title: '計畫公告', value: 'announcement'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'visible',
      title: '顯示於網站',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'pinned',
      title: '置頂',
      type: 'boolean',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
    },
  },
})