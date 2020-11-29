import { Module, ActionTree, MutationTree, GetterTree } from 'vuex'
import { RootState, ProductState, IPizzasToping, IPizzasVariant, IPizzasSize, IPizzasItem } from '@/types/types'
import axios from '@/config/axios'

const state: ProductState = {
  pizzas: {
    items: [],
    sizes: [],
    variants: [],
    topings: [],
    doughs: []
  },
  drinks: {
    items: [],
    sizes: []
  }
}

// mutations
const mutations: MutationTree<ProductState> = {
  init (state: ProductState, payload: ProductState): void {
    state.pizzas = payload.pizzas
    state.drinks = payload.drinks
  }
}

// actions
const actions: ActionTree<ProductState, RootState> = {
  async init ({ commit, dispatch }): Promise<void> {
    const result = await axios.get('/api.php')
    commit('init', result.data)
    dispatch('updateCost')
  }
}

// getters
const getters: GetterTree<ProductState, RootState> = {
  getPizzaItemsAll: (state: ProductState) => {
    return state.pizzas.items
  },
  getPizzaSizesAll: (state: ProductState) => {
    return state.pizzas.sizes
  },
  getPizzaVariantsAll: (state: ProductState) => {
    return state.pizzas.variants
  },
  getPizzaTopingsAll: (state: ProductState) => {
    return state.pizzas.topings
  },
  getPizzaDoughsAll: (state: ProductState) => {
    return state.pizzas.doughs
  },
  getProductsType: (state: ProductState) => (type: string) => {
    return state[type].items
  },
  getPizzaProduct: (state: ProductState) => (id: number): IPizzasItem | null => {
    return state.pizzas.items.find((value: IPizzasItem) => value.id === id)
  },
  getPizzaSizes: (state: ProductState) => (pizzaId: number): Array<IPizzasSize> => {
    return state.pizzas.sizes.filter((value: IPizzasSize) => {
      return value.pizza_id === pizzaId
    })
  },
  getPizzaSize: (state: ProductState) => (sizeId: number): IPizzasSize => {
    return state.pizzas.sizes.find((value: IPizzasSize) => {
      return value.id === sizeId
    })
  },
  getPizzaVariant: (state: ProductState) => (sizeId: number, dough: string): IPizzasVariant => {
    return state.pizzas.variants.find((value: IPizzasVariant) => {
      return value.size_id === sizeId && value.dough === dough
    })
  },
  getPizzaTopings: (state: ProductState) => (topings: number[]): Array<IPizzasToping> => {
    return state.pizzas.topings.filter((value: IPizzasToping) => {
      return topings.includes(value.id)
    })
  }
}

export const products: Module<ProductState, RootState> = {
  state,
  getters,
  actions,
  mutations
}
