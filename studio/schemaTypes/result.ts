import {defineField, defineType} from 'sanity'

export const result = defineType({
  name: 'result',
  title: '成果回顧',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: '活動／課程名稱',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
        name: 'slug',
        title: '識別代碼',
        type: 'slug',
        description: '按 Generate 自動產生即可，不用自己填。',
        options: {
            source: 'title',

            slugify: (input) =>
            input
                .trim()
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\p{L}\p{N}-]+/gu, '')
                .replace(/-+/g, '-')
                .slice(0, 96),
        },

        validation: (Rule) => Rule.required(),
        }),

    defineField({
      name: 'eventDate',
      title: '活動日期',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'category',
      title: '成果類型',
      type: 'string',
      options: {
        list: [
          {title: '課程', value: 'course'},
          {title: '工作坊', value: 'workshop'},
          {title: '活動', value: 'event'},
        ],
      },
    }),

    defineField({
      name: 'description',
      title: '活動說明',
      type: 'text',
      rows: 5,
    }),

    defineField({
      name: 'coverImage',
      title: '封面照片',
      type: 'image',

      options: {
        hotspot: true,
      },

      fields: [
        defineField({
          name: 'alt',
          title: '圖片替代文字',
          type: 'string',
          description: '簡單描述照片內容即可。',
        }),
      ],
    }),

    defineField({
      name: 'gallery',
      title: '活動照片',
      type: 'array',
      description: '可一次加入多張活動照片並自行排序。',

      of: [
        {
          type: 'image',

          options: {
            hotspot: true,
          },

          fields: [
            defineField({
              name: 'alt',
              title: '圖片替代文字',
              type: 'string',
            }),

            defineField({
              name: 'caption',
              title: '照片說明',
              type: 'string',
            }),
          ],
        },
      ],
    }),

    defineField({
      name: 'featured',
      title: '置頂顯示',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'visible',
      title: '顯示於網站',
      type: 'boolean',
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      date: 'eventDate',
      media: 'coverImage',
    },

    prepare({title, date, media}) {
      return {
        title,
        subtitle: date ?? '',
        media,
      }
    },
  },
})