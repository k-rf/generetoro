import { z } from "zod";

const schema = z.object({
  NOTION_KEY: z.string().nonempty(),
  NOTION_DATABASE_ID: z.string().nonempty(),
  NOTION_TEMPLATE_DAILY_ID: z.string().nonempty(),
  NOTION_TEMPLATE_WEEKLY_ID: z.string().nonempty(),
  NOTION_REMIND_COLUMN: z.string().nonempty(),
  NOTION_TAG_COLUMN: z.string().nonempty(),
  NOTION_TAG_DAILY: z.string().nonempty(),
  NOTION_TAG_WEEKLY: z.string().nonempty(),
  NOTION_ELEMENT_COLUMN: z.string().nonempty(),
});

export type EnvironmentVariables = z.infer<typeof schema>;

export const validate = (config: Record<string, unknown>) => {
  return schema.parse(config);
};
