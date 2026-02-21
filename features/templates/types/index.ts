import { Category } from "@/features/categories/types";

export interface Template {
  id: number;
  name: string;
  amount: number;
  is_default: boolean;
  icon_name: string;
  category: Category;
}

export type TemplateRequest = Omit<
  Template,
  "id" | "is_default" | "created_at" | "updated_at" | "category"
> & {
  category_id: number;
};
