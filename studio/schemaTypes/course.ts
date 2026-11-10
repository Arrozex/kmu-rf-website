
import { defineField, defineType } from "sanity";

export const course = defineType({
  name: "course",
  title: "課程與活動",
  type: "document",

  // 舊欄位保留，避免破壞既有課程資料
  fieldsets: [
    {
      name: "legacyRegistration",
      title: "舊版報名設定（既有資料相容）",
      description:
        "舊資料會保留在此。新課程請使用下方的 BeClass 與 WAC 欄位。",
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],

  fields: [
    // =========================
    // 基本資料
    // =========================

    defineField({
      name: "title",
      title: "課程／活動名稱",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "識別代碼",
      type: "slug",
      description: "按 Generate 自動產生即可，不用自己填。",
      options: {
        source: "title",
        slugify: (input: string) =>
          input
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\p{L}\p{N}-]+/gu, "")
            .replace(/-+/g, "-")
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "status",
      title: "目前狀態",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "報名開放", value: "enrolling" },
          { title: "停止報名", value: "closed" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "level",
      title: "課程類別",
      type: "string",
      options: {
        list: [
          { title: "專業領域", value: "professional" },
          { title: "AI 基礎", value: "basic" },
          { title: "AI 應用", value: "advanced" },
          { title: "AI 技術實務", value: "practical" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "unit",
      title: "開課單位",
      type: "string",
      options: {
        list: [
          { title: "護理學系", value: "nursing" },
          { title: "職能治療學系", value: "occupational" },
          { title: "物理治療學系", value: "physical" },
          { title: "人工智慧生醫研究院", value: "baia" },
          {
            title: "醫務管理暨醫療資訊學系",
            value: "hami",
          },
          {
            title: "TAICA 臺灣大專院校人工智慧學程聯盟",
            value: "taica",
          },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    // =========================
    // 舊版報名分類
    // 保留資料，但新課程不再使用
    // =========================

    defineField({
      name: "registrationMode",
      title: "舊版選課／報名方式",
      type: "string",
      fieldset: "legacyRegistration",
      readOnly: true,
      options: {
        list: [
          { title: "WAC 選課", value: "wac" },
          { title: "線上報名", value: "online" },
        ],
      },
    }),

    // =========================
    // 授課資訊
    // =========================

    defineField({
      name: "instructors",
      title: "授課教師",
      type: "string",
    }),

    defineField({
      name: "delivery",
      title: "上課方式",
      type: "string",
      placeholder:
        "例如：實體授課、實體工作坊、線上自學",
    }),

    defineField({
      name: "dateText",
      title: "顯示日期",
      type: "string",
      description:
        "網站上實際顯示的日期，可填「2026.09.12」或「隨時開始」。",
    }),

    defineField({
      name: "sortDate",
      title: "排序用日期",
      type: "date",
      description:
        "用來判斷近期課程排序；若是無固定日期的線上課程可留白。",
    }),

    defineField({
      name: "time",
      title: "上課時間",
      type: "string",
      placeholder: "例如：09:00–16:00",
    }),

    defineField({
      name: "location",
      title: "上課地點",
      type: "string",
    }),

    defineField({
      name: "description",
      title: "課程說明",
      type: "text",
      rows: 5,
    }),

    // =========================
    // 舊版報名設定
    // 保留既有資料
    // =========================

    defineField({
      name: "registrationType",
      title: "舊版線上報名表呈現方式",
      type: "string",
      fieldset: "legacyRegistration",
      readOnly: true,
      description:
        "舊欄位保留供資料相容。新版有 BeClass 網址就會嵌入表單。",
      options: {
        layout: "radio",
        list: [
          {
            title: "嵌入報名表",
            value: "embed",
          },
          {
            title: "按鈕開啟外部報名頁",
            value: "external",
          },
        ],
      },
    }),

    defineField({
      name: "registrationUrl",
      title: "舊版主要報名網址／WAC 網址",
      type: "url",
      fieldset: "legacyRegistration",
      readOnly: true,
      description:
        "既有課程保留。舊線上課程作為 BeClass 網址，舊 WAC 課程作為 WAC 網址。",
    }),

    // =========================
    // 新版 BeClass 報名設定
    // =========================

    defineField({
      name: "beclassUrl",
      title: "BeClass／線上報名表網址",
      type: "url",
      description:
        "填入後，官網會固定嵌入此報名表，並同時顯示「在新分頁開啟報名表」按鈕。沒有可留空。",
    }),

    // =========================
    // 新版 WAC 設定
    // =========================

    defineField({
      name: "enableWacRegistration",
      title: "另外提供 WAC 校務選課",
      type: "boolean",
      description:
        "勾選後，若也有 BeClass 網址，官網將顯示 BeClass／WAC 兩個切換按鈕。",
      initialValue: false,
    }),

    defineField({
      name: "wacUrl",
      title: "WAC 校務選課網址",
      type: "url",
      description:
        "勾選 WAC 後填寫。若舊課程已在舊版報名網址儲存 WAC 連結，可先沿用。",
      hidden: ({ document }) =>
        document?.enableWacRegistration !== true,

      validation: (Rule) =>
        Rule.custom((value, context) => {
          const document = context.document;

          if (document?.enableWacRegistration !== true) {
            return true;
          }

          const hasLegacyWac =
            document?.registrationMode === "wac" &&
            Boolean(document?.registrationUrl);

          if (value || hasLegacyWac) {
            return true;
          }

          return "已啟用 WAC，請填寫 WAC 網址。";
        }),
    }),

    // =========================
    // 課程前測
    // =========================

    defineField({
      name: "pretestUrl",
      title: "前測問卷網址",
      type: "url",
      description: "若沒有前測可留白。",
    }),

    // =========================
    // 詳細課程安排
    // =========================

    defineField({
      name: "detailUrl",
      title: "詳細課程資料網址",
      type: "url",
      description:
        "例如課程簡章、Google Drive 或其他說明頁。官網會顯示大型的「查看詳細課程安排」按鈕。",
    }),

    // =========================
    // 管理員自訂補充連結
    // =========================

    defineField({
      name: "additionalLinks",
      title: "其他補充連結",
      type: "array",
      description:
        "可自行新增連結名稱及網址，例如教材、教師個人網頁、補充閱讀、課程簡章等。",
      of: [
        {
          type: "object",
          title: "補充連結",
          fields: [
            defineField({
              name: "label",
              title: "顯示名稱",
              type: "string",
              placeholder: "例如：教材下載",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "url",
              title: "連結網址",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
          ],

          preview: {
            select: {
              title: "label",
              subtitle: "url",
            },
          },
        },
      ],
    }),

    // =========================
    // 注意事項
    // =========================

    defineField({
      name: "notice",
      title: "報名注意事項",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
    }),

    // =========================
    // 顯示狀態
    // =========================

    defineField({
      name: "visible",
      title: "顯示於網站",
      type: "boolean",
      initialValue: true,
    }),
  ],

  // =========================
  // Sanity 文件列表預覽
  // =========================

  preview: {
    select: {
      title: "title",
      status: "status",
      date: "dateText",
    },

    prepare({ title, status, date }) {
      const statusLabel: Record<string, string> = {
        enrolling: "報名開放",
        closed: "停止報名",
      };

      return {
        title,
        subtitle:
          `${statusLabel[status] ?? ""}` +
          `${date ? `｜${date}` : ""}`,
      };
    },
  },
});
