export type BudgetBucket = {
  id: number;
  budget_plan_id: number;
  bucket_type_id: number;
  name: string;
  percentage: number;
  max_allocation: number;
  total_spending: number;
  spending_percentage: number;
  created_at: string;
  updated_at: string;
  bucket_type: BudgetBucketType;
};

export type BudgetBucketType = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};
