import { Module, ActionTree, MutationTree, GetterTree } from 'vuex'
import { RootState, CartState, ICartItem, IPizzasSize, IPizzasToping, IPizzas } from '@/types/types'

const updateCart = (items) => {
  localStorage.setItem('cart', JSON.stringify(items))
}

const stateInitItems = JSON.parse(localStorage.getItem('cart') || '[]')

const state: CartState = {
  items: stateInitItems,
  cost: 0,
  discount: 0,
  promocod: null
}

// mutations
const mutations: MutationTree<CartState> = {
  updateCost (state: CartState, payload: number) {
    state.cost = payload
  },
  addItemToCart (state: CartState, payload: any) {
    const items = [...state.items, payload]
    updateCart(items)
    state.items = items
  },
  /*
  updateItemToCart (state: CartState, payload: any) {
    const items = state.items.map(value => {
      if (value.id === payload.id) {
        return { ...value, amount: value.amount + payload.amount }
      }
      return value
    })
    updateCart(items)
    state.items = items
  },
  */
  removeItemCart (state: CartState, payload: number) {
    const items = state.items.filter(value => {
      if (value.id !== payload) {
        return value
      }
    })
    updateCart(items)
    state.items = items
  },
  updateAmountItemToCart (state: CartState, payload: any) {
    const items = state.items.map(value => {
      if (value.id === payload.id) {
        return { ...value, amount: payload.amount }
      }
      return value
    })
    updateCart(items)
    state.items = items
  },
  setPromocod (state: CartState, payload: any) {
    state.promocod = payload.promocod
    state.discount = payload.discount
  }
}

// actions
const actions: ActionTree<CartState, RootState> = {
  updateCost ({ commit, state, rootState }) {
    const products = rootState.products
    const cartItems = state.items
    let cost = 0

    cartItems.forEach((element: ICartItem) => {
      if (element.type === 'pizzas') {
        const size = products.pizzas.sizes.find((value: IPizzasSize) => value.id === element.sizeId)
        let topingsCost = 0
        element.topings.forEach(value => {
          const topingCurrent = products.pizzas.topings.find((toping: IPizzasToping) => toping.id === value)
          if (topingCurrent) {
            topingsCost += topingCurrent.cost
          }
        })
        cost += (size.cost + topingsCost) * element.amount
      }
    })
    commit('updateCost', cost)
  },
  addItemToCart ({ commit, dispatch }, payload: any): any {
    commit('addItemToCart', payload)
    dispatch('updateCost')
  },
  /*
  updateItemToCart ({ commit }, payload: any) {
    commit('updateItemToCart', payload)
  },
  */
  removeItemCart ({ commit, dispatch }, payload: any) {
    commit('removeItemCart', payload)
    dispatch('updateCost')
  },
  updateAmountItemToCart ({ commit, dispatch }, payload: any) {
    commit('updateAmountItemToCart', payload)
    dispatch('updateCost')
  },
  setPromocod ({ commit }, payload: any) {
    commit('updateAmountItemToCart', payload)
  }
}

// getters
const getters: GetterTree<CartState, RootState> = {
  getItemsCart: (state: CartState) => {
    return state.items
  },
  getItemsCartToType: (state: CartState) => (type: string) => {
    return state.items.filter(value => value.type === type)
  },
  getCost: (state: CartState) => {
    return state.cost
  },
  getDiscount: (state: CartState) => {
    return state.discount
  },
  getPromocod: (state: CartState) => {
    return state.promocod
  }
}

export const cart: Module<CartState, RootState> = {
  state,
  getters,
  actions,
  mutations
}
