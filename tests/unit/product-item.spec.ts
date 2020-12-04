import { mount, createLocalVue } from '@vue/test-utils'
import router from '@/router'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import Item from '@/components/products/Item.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(ElementUI)

describe('Component component/products/Item.vue', () => {

  let wrapper: any
  let getters
  let store
  /*
  const push = jest.fn();
  const $router = {
    push: jest.fn(),
  }
  */

  const product = {
    id: 5,
    title: "Чизбургер-пицца",
    description: "Мясной соус болоньезе, моцарелла, красный лук, соленые огурчики, томаты, соус бургер",
    image: "https://localhost/pizzas/5_standart_sm.jpeg",
    new: 1,
    likes: 11,
    topings: null
  }
  const sizes = [
    {
      id: 13,
      pizza_id: 5,
      title: "Маленькая",
      diametr: 25,
      cost: 395
    },
    {
      id: 14,
      pizza_id: 5,
      title: "Средняя",
      diametr: 30,
      cost: 595
    },
    {
      id: 15,
      pizza_id: 5,
      title: "Большая",
      diametr: 35,
      cost: 745
    }
  ]

  const props = {
    product: product,
    type: 'pizzas'
  }

  beforeEach(() => {
    getters = {
      'pizzas/sizesByProductId': () => () => sizes
    }

    store = new Vuex.Store({
      getters
    })

    wrapper = mount(Item, {
      propsData: props,
      localVue,
      store,
      router,
      /*
      mocks: {
        $router
      }
      */
    })
  })

  it('render', () => {
    expect(wrapper.is(Item)).toBeTruthy()
    expect(wrapper.find('.product__title').text()).toBe(product.title)
    expect(wrapper.find('.product__description').text()).toBe(product.description)
  })

  it('show min cost', () => {
    const costs = sizes.map(value => value.cost)
    const min = Math.min.apply(null, costs)
    expect(wrapper.find('.product__cost').text()).toContain(min)
  })
  /*
  it('go to link' , () => {
    const link = wrapper.find('.product__link')
    link.trigger('click')
    expect(push).toHaveBeenCalledWith(`/products/${props.type}/${props.product.id}`);
  })
  */
})

