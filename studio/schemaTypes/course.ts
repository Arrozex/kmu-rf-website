import {defineField, defineType} from 'sanity'

export const course = defineType({
  name: 'course',
  title: '課程與活動',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: '課程／活動名稱',
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
      name: 'status',
      title: '目前狀態',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          {title: '報名開放', value: 'enrolling'},
          {title: '停止報名', value: 'closed'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'registrationMode',
      title: '選課／報名方式',
      type: 'string',
      options: {
        list: [
          {title: 'WAC 選課', value: 'wac'},
          {title: '線上報名', value: 'online'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'level',
      title: '課程類別',
      type: 'string',
      options: {
        list: [
          {title: '專業領域', value: 'professional'},
          {title: 'AI 基礎', value: 'basic'},
          {title: 'AI 應用', value: 'advanced'},
          {title: 'AI 技術實務', value: 'practical'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'unit',
      title: '開課單位',
      type: 'string',
      options: {
        list: [
          {title: '護理學系', value: 'nursing'},
          {title: '職能治療學系', value: 'occupational'},
          {title: '物理治療學系', value: 'physical'},
          {title: '人工智慧生醫研究院', value: 'baia'},
          {title: '醫務管理暨醫療資訊學系', value: 'hami'},
          {title: 'TAICA', value: 'taica'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'instructors',
      title: '授課教師',
      type: 'string',
    }),

    defineField({
      name: 'description',
      title: '課程說明',
      type: 'text',
      rows: 5,
    }),

    defineField({
      name: 'delivery',
      title: '上課方式',
      type: 'string',
      placeholder: '例如：實體授課、實體工作坊、線上自學',
    }),

    defineField({
      name: 'dateText',
      title: '顯示日期',
      type: 'string',
      description: '網站上實際顯示的日期，可填「2026.09.12」或「隨時開始」。',
    }),

    defineField({
      name: 'sortDate',
      title: '排序用日期',
      type: 'date',
      description: '用來判斷近期課程排序；若是無固定日期的線上課程可留白。',
    }),

    defineField({
      name: 'time',
      title: '上課時間',
      type: 'string',
      placeholder: '例如：09:00–16:00',
    }),

    defineField({
      name: 'location',
      title: '上課地點',
      type: 'string',
    }),

    defineField({
      name: 'registrationType',
      title: '報名頁呈現方式',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          {
            title: '嵌入線上報名表單',
            value: 'embed',
          },
          {
            title: '外部選課／報名網站',
            value: 'external',
          },
        ],
      },
    }),

    defineField({
      name: 'registrationUrl',
      title: '報名網址',
      type: 'url',
      description: '例如 BeClass 或其他報名網址。',
    }),

    defineField({
      name: 'pretestUrl',
      title: '前測問卷網址',
      type: 'url',
      description: '若沒有前測可留白。',
    }),

    defineField({
      name: 'detailUrl',
      title: '詳細課程資料網址',
      type: 'url',
      description: '例如課程簡章、Google Drive 或其他說明頁。',
    }),

    defineField({
      name: 'notice',
      title: '報名注意事項',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
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
      status: 'status',
      date: 'dateText',
    },

    prepare({title, status, date}) {
      const statusLabel: Record<string, string> = {
        enrolling: '報名中',
        closed: '停止報名',
      }

      return {
        title,
        subtitle: `${statusLabel[status] ?? ''}${date ? `｜${date}` : ''}`,
      }
    },
  },
})