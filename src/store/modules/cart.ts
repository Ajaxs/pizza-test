import { Module, ActionTree, MutationTree, GetterTree } from 'vuex'
import { RootState, CartState, ICartItem, IPizzasSize, IPizzasToping } from '@/types/types'

const updateCart = (items) => {
  localStorage.setItem('cart', JSON.stringify(items))
}

const stateInitItems = JSON.parse(localStorage.getItem('cart') || '[]')

const state: CartState = {
  items: stateInitItems,
  cost: 0,
  discount: Number(localStorage.getItem('discount')),
  promocod: localStorage.getItem('promocod') || ''
}

// mutations
const mutations: MutationTree<CartState> = {
  updateCost (state: CartState, payload: number) {
    state.cost = payload
  },
  addItem (state: CartState, payload: any) {
    const items = [...state.items, payload]
    updateCart(items)
    state.items = items
  },
  removeItem (state: CartState, payload: number) {
    const items = state.items.filter(value => {
      if (value.id !== payload) {
        return value
      }
    })
    updateCart(items)
    state.items = items
  },
  updateAmountItem (state: CartState, payload: any) {
    const items = state.items.map(value => {
      if (value.id === payload.id) {
        return { ...value, amount: payload.amount }
      }
      return value
    })
    updateCart(items)
    state.items = items
  },
  applayDiscount (state: CartState, payload: any) {
    state.promocod = payload.promocod
    state.discount = payload.discount
  }
}

// actions
const actions: ActionTree<CartState, RootState> = {
  updateCost ({ commit, state, rootState }) {
    const pizzas = rootState.pizzas
    const cartItems = state.items
    let cost = 0

    cartItems.forEach((element: ICartItem) => {
      if (element.type === 'pizzas') {
        const size = pizzas.sizes.find((value: IPizzasSize) => value.id === element.sizeId)
        let topingsCost = 0
        element.topings.forEach(value => {
          const topingCurrent = pizzas.topings.find((toping: IPizzasToping) => toping.id === value)
          if (topingCurrent) {
            topingsCost += topingCurrent.cost
          }
        })
        cost += (size.cost + topingsCost) * element.amount
      }
    })
    commit('updateCost', cost)
  },
  addItem ({ commit, dispatch }, payload: any): any {
    commit('addItem', payload)
    dispatch('updateCost')
  },
  removeItem ({ commit, dispatch }, payload: any) {
    commit('removeItem', payload)
    dispatch('updateCost')
  },
  updateAmountItem ({ commit, dispatch }, payload: any) {
    commit('updateAmountItem', payload)
    dispatch('updateCost')
  },
  applayDiscount ({ commit }, payload: any) {
    localStorage.setItem('promocod', payload.promocod)
    localStorage.setItem('discount', payload.discount)
    commit('applayDiscount', payload)
  }
}

// getters
const getters: GetterTree<CartState, RootState> = {
  items: (state: CartState) => {
    return state.items
  },
  itemsByType: (state: CartState) => (type: string) => {
    return state.items.filter(value => value.type === type)
  },
  cost: (state: CartState) => {
    return state.cost
  },
  discount: (state: CartState) => {
    return state.discount
  },
  promocod: (state: CartState) => {
    return state.promocod
  }
}

export const cart: Module<CartState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
