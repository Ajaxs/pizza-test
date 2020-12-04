import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import ProductButton from '@/components/products/pizzas/Button.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(ElementUI)

describe('Component pizzas/Button.vue', () => {
  let wrapper: any
  let getters
  let actions: any
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

  const size = {
    id: 10,
    pizza_id: 4,
    title: "Маленькая",
    diametr: 25,
    cost: 345
  }

  const topings = [
    {
      id: 3,
      title: "Халапенью",
      image: "https://localhost/topings/t_3.png",
      cost: 30
    },
    {
      id: 4,
      title: "Грибы",
      image: "https://localhost/topings/t_4.png",
      cost: 30
    }
  ]

  beforeEach(() => {
    actions = {
      'cart/updateAmountItem': jest.fn(),
      'cart/addItem': jest.fn(),
    }

    getters = {
      'cart/itemsByType': () => () => cart,
      'pizzas/topingsById': () => () => topings,
      'pizzas/sizeById': () => () => size
    }

    store = new Vuex.Store({
      actions,
      getters
    })

    wrapper = mount(ProductButton, {
      propsData: {
        productId: 4,
        prepareItem: {
          sizeId: 10,
          dough: 'standart',
          amount: 1,
          topings: [3, 4]
        }
      },
      store,
      localVue
    })
  })

  it('render', () => {
    expect(wrapper.is(ProductButton)).toBeTruthy()
  })

  it('cost product', () => {
    expect(wrapper.find('.product-pizza__button').text()).toContain(405)
  })

  it('update item to cart', () => {
    const button = wrapper.find('.product-pizza__button')
    button.trigger('click')
    expect(actions['cart/updateAmountItem']).toHaveBeenCalled()
  })

  it('add item to cart', async () => {
    const button = wrapper.find('.product-pizza__button')
    await wrapper.setProps({
      productId: 2
    })
    button.trigger('click')
    expect(actions['cart/addItem']).toHaveBeenCalled()
  })

})
