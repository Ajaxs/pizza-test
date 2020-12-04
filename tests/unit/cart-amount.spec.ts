import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import CartAmount from '@/components/cart/Amount.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Component components/cart/Amount.vue', () => {
  let wrapper: any
  let actions: any
  let store: any
  let amount: number
  let id: number

  beforeEach(() => {
    actions = {
      'cart/updateAmountItem': jest.fn()
    }
    store = new Vuex.Store({
      actions
    })

    amount = 5
    id = 1

    wrapper = shallowMount(CartAmount, {
      store,
      localVue,
      propsData: { amount, id }
    })
  })

  /*
  it('Test snapshot', () => {
    const wrapper = mount(CartAmount, {
      propsData: { amount, id }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  */

  it('Click buttons minus', async () => {
    expect(wrapper.find('.num').text()).toMatch(amount.toString())
    const minus = wrapper.find('.minus')
    minus.trigger('click')
    expect(actions['cart/updateAmountItem']).toHaveBeenCalled()

    amount--
    await wrapper.setProps({ amount: amount })
    expect(wrapper.find('.num').text()).toMatch(amount.toString())

    wrapper.destroy()
  })

  it('Click buttons plus', async () => {
    expect(wrapper.find('.num').text()).toMatch(amount.toString())
    const plus = wrapper.find('.plus')
    plus.trigger('click')
    expect(actions['cart/updateAmountItem']).toHaveBeenCalled()

    amount++
    await wrapper.setProps({ amount: amount })
    expect(wrapper.find('.num').text()).toMatch(amount.toString())

    wrapper.destroy()
  })
})
