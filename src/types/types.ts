export interface RootState {
  version: string;
  /* [propNane: string]: any */
}

export interface IPizzasItem {
  id: number,
  title: string,
  description: string,
  image: string,
  new: boolean,
  likes: number,
  topings: number[],
  bju: number[],
}

export interface IPizzasSize {
  id: number,
  pizza_id: number,
  size: number,
  cost: number,
}

export interface IPizzasVariant {
  size_id: number,
  dough: string,
  image: string,
  weight: number,
}

export interface IPizzasToping {
  id: number,
  title: string,
  image: string,
  cost: number,
}

export interface IPizzasDough {
  id: number,
  title: string,
  dough: string
}

export interface IPizza {
  items: Partial<IPizzasItem[]>,
  sizes: Partial<IPizzasSize[]>,
  variants: Partial<IPizzasVariant[]>,
  topings: Partial<IPizzasToping[]>,
  doughs: Partial<IPizzasDough[]>
}

/* Drinks */

export interface IDrinksItem {
  id: number,
  title: string,
  description: string,
  image: string
}

export interface IDrinksSize {
  id: number,
  drink_id: number,
  volume: number,
  image: string,
  cost: number,
}

export interface IDrinks {
  items?: Array<IDrinksItem>,
  sizes?: Array<IDrinksSize>
}

export interface ICartItem {
  type: string,
  productId: number,
  amount: number,
  sizeId: number,
  id: number,
  dough?: string,
  topings?: number[]
}

export interface CartState {
  items: Array<ICartItem>,
  discount: number,
  promocod: string
}
