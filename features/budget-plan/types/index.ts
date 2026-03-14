import { BudgetBucket } from "@/features/budget-bucket/types";

export interface ActiveBudgetPlan {
  id: number;
  user_id: number;
  name: string;
  description: string;
  is_template: boolean;
  created_at: string;
  updated_at: string;
  total_income: number;
  buckets: BudgetBucket[];
}
