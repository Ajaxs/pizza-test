import { Module, ActionTree, MutationTree, GetterTree } from 'vuex'
import { RootState, IPizza, IPizzasToping, IPizzasVariant, IPizzasSize, IPizzasItem } from '@/types/types'

const state: IPizza = {
  items: [],
  sizes: [],
  variants: [],
  topings: [],
  doughs: []
}

// mutations
const mutations: MutationTree<IPizza> = {}

// actions
const actions: ActionTree<IPizza, RootState> = {}

// getters
const getters: GetterTree<IPizza, RootState> = {
  items: (state: IPizza) => {
    return state.items
  },
  sizes: (state: IPizza) => {
    return state.sizes
  },
  variants: (state: IPizza) => {
    return state.variants
  },
  topings: (state: IPizza) => {
    return state.topings
  },
  doughs: (state: IPizza) => {
    return state.doughs
  },
  itemById: (state: IPizza) => (id: number): IPizzasItem | null => {
    return state.items.find((value: IPizzasItem) => value.id === id)
  },
  sizesByProductId: (state: IPizza) => (pizzaId: number): Array<IPizzasSize> => {
    return state.sizes.filter((value: IPizzasSize) => {
      return value.pizza_id === pizzaId
    })
  },
  sizeById: (state: IPizza) => (sizeId: number): IPizzasSize => {
    return state.sizes.find((value: IPizzasSize) => {
      return value.id === sizeId
    })
  },
  varintBySizeAndDough: (state: IPizza) => (sizeId: number, dough: string): IPizzasVariant => {
    return state.variants.find((value: IPizzasVariant) => {
      return value.size_id === sizeId && value.dough === dough
    })
  },
  topingsById: (state: IPizza) => (topings: number[]): Array<IPizzasToping> => {
    return state.topings.filter((value: IPizzasToping) => {
      return topings.includes(value.id)
    })
  }
}

export const pizzas: Module<IPizza, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
