import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import ProductSize from '@/components/products/pizzas/Size.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(ElementUI)

describe('Component pizzas/Size.vue', () => {
  let wrapper: any
  let getters
  let store

  let sizes = [
    {
      id: 1,
      pizza_id: 1,
      title: "Маленькая",
      diametr: 25,
      cost: 295
    },
    {
      id: 2,
      pizza_id: 1,
      title: "Средняя",
      diametr: 30,
      cost: 495
    },
    {
      id: 3,
      pizza_id: 1,
      title: "Большая",
      diametr: 35,
      cost: 695
    }
  ]

  beforeEach(() => {

    getters = {
      'pizzas/sizesByProductId': () => () => sizes
    }

    store = new Vuex.Store({
      getters
    })

    wrapper = shallowMount(ProductSize, {
      propsData: {
        productId: 1
      },
      store,
      localVue
    })
  })

  it('render', () => {
    expect(wrapper.is(ProductSize)).toBeTruthy()
  })

  it('init data', () => {
    expect(wrapper.vm.$data.diametr).toBe(25)
  })

  it('count radio buttons', () => {
    const labels = wrapper.findAll('.label')
    expect(labels.length).toBe(sizes.length)
  })

})
