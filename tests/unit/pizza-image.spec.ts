import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ProductImage from '@/components/products/pizzas/Image.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Component pizzas/Image.vue', () => {
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
        image: '/pizzas/1_standart_sm.jpeg',
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
    expect(wrapper.vm.$props.image).toBe('/pizzas/1_standart_sm.jpeg')
    expect(wrapper.vm.$props.title).toBe('Image')
  })

  it('attributes image', () => {
    expect(wrapper.find('img').attributes('src')).toBe('/pizzas/1_standart_sm.jpeg')
    expect(wrapper.find('img').attributes('alt')).toBe('Image')
  })
})
