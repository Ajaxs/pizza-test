import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Cart from '@/views/Cart.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Component view/Cart.vue', () => {

  let wrapper: any
  let getters
  let store

  const cart = [
    {
      id: 1605722816686,
      type: "pizzas",
      productId: 4,
      sizeId: 10,
      amount: 4,
      dough: "standart",
      topings: [3,4]
    },
    {
      id: 1605723523490,
      type: "pizzas",
      productId: 3,
      sizeId: 8,
      amount: 2,
      dough: "thin",
      topings: []
    }
  ]

  beforeEach(() => {
    getters = {
      'cart/items': () => () => cart
    }

    store = new Vuex.Store({
      getters
    })

    wrapper = shallowMount(Cart, {
      localVue,
      store
    })
  })

  it('render', () => {
    expect(wrapper.is(Cart)).toBeTruthy()
  })

})

