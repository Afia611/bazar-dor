
export type Product = {
  id: number | string;
  nameBn: string;
  categoryIcon: string;
  today: number;
  unit: string;
  change: {
    dir: string;
    pct: number;
  };
};
