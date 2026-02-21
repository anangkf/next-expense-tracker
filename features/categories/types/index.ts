export interface Category {
  id: number;
  name: string;
  type: "expense" | "income";
  is_default: boolean;
  bucket_type_id: number;
  total_expense: number;
  icon_name: string;
  created_at: string;
  updated_at: string;
}

export type CategoryRequest = Omit<
  Category,
  "id" | "is_default" | "created_at" | "updated_at"
>;
