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

export interface IPizzas {
  items: Partial<Array<IPizzasItem>>,
  sizes: Partial<Array<IPizzasSize>>,
  variants: Partial<Array<IPizzasVariant>>,
  topings: Partial<Array<IPizzasToping>>
}

/* Drinks */

export interface IDrinksItems {
  id: number,
  title: string,
  description: string,
  image: string
}

export interface IDrinksSizes {
  id: number,
  drink_id: number,
  volume: number,
  image: string,
  cost: number,
}

export interface IDrinks {
  items?: Array<IDrinksItems>,
  sizes?: Array<IDrinksSizes>
}

export interface ProductState {
  pizzas: IPizzas,
  drinks: IDrinks
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
  cost: number,
  discount: number,
  promocod: string | null
}
