export type Sales = {
  weekEnding: string;
  retailSales: number;
  wholesaleSales: number;
  unitsSold: number;
  retailerMargin: number;
}[];

type Reviews = {
  customer: string;
  review: string;
  score: number;
}[];

export type Product = {
  id: string;
  title: string;
  image: string;
  subtitle: string;
  brand: string;
  reviews: Reviews;
  retailer: string;
  details: string[];
  tags: string[];
  sales: Sales;
};

export type ProductsState = {
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};
