export type StatMetric = {
  id: string;
  label: string;
  value: string | number;
  delta?: number; // percentage change
  hint?: string;
};

export type ProductSummary = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  sold?: number;
};

export type ActivityItem = {
  id: string;
  title: string;
  description?: string;
  timestamp: string; // ISO
  type?: string;
};

export type DashboardProps = {
  stats?: StatMetric[];
  activities?: ActivityItem[];
  products?: ProductSummary[];
};
