import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import CartTable from '@/components/cart/Table.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Component components/cart/Table.vue', () => {
  let wrapper: any
  let actions: any
  let store: any

  beforeEach(() => {
    actions = {
      'cart/updateAmountItem': jest.fn()
    }
    store = new Vuex.Store({
      actions
    })

    wrapper = shallowMount(CartTable, {
      store,
      localVue,
      propsData: { amount, id }
    })
  })

})
