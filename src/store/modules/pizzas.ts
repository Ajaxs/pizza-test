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
  itemById: (state: IPizza) => (id: number): IPizzasItem | undefined => {
    return state.items.find((value: IPizzasItem): boolean => value.id === id)
  },
  sizesByProductId: (state: IPizza) => (pizzaId: number): IPizzasSize[] => {
    return state.sizes.filter((value: IPizzasSize): boolean => {
      return value.pizza_id === pizzaId
    })
  },
  sizeById: (state: IPizza) => (sizeId: number): IPizzasSize | undefined => {
    return state.sizes.find((value: IPizzasSize): boolean => {
      return value.id === sizeId
    })
  },
  varintBySizeAndDough: (state: IPizza) => (sizeId: number, dough: string): IPizzasVariant | null => {
    if (state.variants.length > 0) {
      return state.variants.find((value: IPizzasVariant): boolean => {
        return value.size_id === sizeId && value.dough === dough
      })
    }

    return null
  },
  topingsById: (state: IPizza) => (topings: number[]): IPizzasToping[] => {
    if (state.topings.length > 0) {
      return state.topings.filter((value: IPizzasToping): boolean => {
        return topings.includes(value.id)
      })
    }

    return []
  }
}

export const pizzas: Module<IPizza, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
