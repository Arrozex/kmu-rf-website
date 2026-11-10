
import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "常見問題 FAQ",
  type: "document",

  fields: [
    defineField({
      name: "question",
      title: "問題",
      type: "string",
      description: "例如：沒有 AI 基礎也能參加嗎？",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "answer",
      title: "回答內容",
      type: "text",
      rows: 6,
      description:
        "可以輸入多段文字，網站會保留換行。",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "category",
      title: "問題分類",
      type: "string",
      options: {
        list: [
          {
            title: "參與資格",
            value: "eligibility",
          },
          {
            title: "課程與報名",
            value: "courses",
          },
          {
            title: "學分與證書",
            value: "credits",
          },
          {
            title: "Capstone 與場域",
            value: "capstone",
          },
          {
            title: "其他問題",
            value: "other",
          },
        ],
      },
      initialValue: "other",
    }),

    defineField({
      name: "sortOrder",
      title: "排序編號",
      type: "number",
      description:
        "數字越小越前面，例如 1、2、3。",
      initialValue: 100,
      validation: (Rule) =>
        Rule.required().integer().min(0),
    }),

    defineField({
      name: "showOnHome",
      title: "顯示於首頁",
      type: "boolean",
      description:
        "開啟後，這個問題可出現在首頁 FAQ 區塊。",
      initialValue: true,
    }),

    defineField({
      name: "visible",
      title: "公開顯示",
      type: "boolean",
      description:
        "關閉後，首頁及完整 FAQ 頁面都不顯示此問題。",
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: "question",
      category: "category",
    },

    prepare({ title, category }) {
      const categoryLabels: Record<string, string> = {
        eligibility: "參與資格",
        courses: "課程與報名",
        credits: "學分與證書",
        capstone: "Capstone 與場域",
        other: "其他問題",
      };

      return {
        title: title || "未命名問題",
        subtitle:
          categoryLabels[String(category ?? "")] ??
          "未分類",
      };
    },
  },
});
