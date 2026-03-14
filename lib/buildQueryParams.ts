type CategoryType = "expense" | "income";

export type QueryParams = {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
  name?: string;
  type?: string;
  category_name?: string;
  category_type?: CategoryType;
  withTotal?: boolean;
  start_date?: string;
  end_date?: string;
  expense_start_date?: string;
  expense_end_date?: string;
};

export const buildQueryParams = (params: QueryParams) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, String(value));
    }
  });

  return query.toString();
};
