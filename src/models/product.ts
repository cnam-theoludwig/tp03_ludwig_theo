export const PRODUCT_CATEGORIES = [
  "Computers",
  "Phones",
  "Accessories",
  "Appliances",
] as const
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]

export interface Product {
  id: number
  title: string
  description: string
  price: number
  imageURL: string
  category: ProductCategory
  available: boolean
}
