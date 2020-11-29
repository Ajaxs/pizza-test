import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ProductImage from '@/components/products/pizzas/ProductImage.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Component ProductImage.vue', () => {
  let wrapper: any
  let getters
  let store

  beforeEach(() => {
    getters = {
      getPizzaVariant: () => () => {
        return {
          id: 1,
          size_id: 1,
          dough: "standart",
          image: "https://localhost/pizzas/1_standart_sm.jpeg",
          weight: 410
        }
      }
    }

    store = new Vuex.Store({
      getters
    })

    wrapper = shallowMount(ProductImage, {
      propsData: {
        sizeId: 1,
        dough: 'standart',
        title: 'Image'
      },
      store,
      localVue
    })
  })

  it('render', () => {
    expect(wrapper.is(ProductImage)).toBeTruthy()
  })

  it('init props', () => {
    expect(wrapper.vm.$props.sizeId).toBe(1)
    expect(wrapper.vm.$props.dough).toBe('standart')
    expect(wrapper.vm.$props.title).toBe('Image')
  })

  it('attributes image', () => {
    expect(wrapper.find('img').attributes('src')).toBe('https://localhost/pizzas/1_standart_sm.jpeg')
    expect(wrapper.find('img').attributes('alt')).toBe('Image')
  })
})
