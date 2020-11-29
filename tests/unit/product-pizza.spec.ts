import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ProductPizza from '@/components/products/pizzas/ProductPizza.vue'
import ProductToping from '@/components/products/pizzas/ProductToping.vue'
import ProductSize from '@/components/products/pizzas/ProductSize.vue'
import ProductDough from '@/components/products/pizzas/ProductDough.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Component ProductPizza.vue', () => {

  let wrapper: any
  let getters
  let store

  const $route = {
    params: {
      id: 1
    }
  }

  beforeEach(() => {
    getters = {
      getPizzaProduct: () => () => {
        return {
          id: 1,
          title: "Пепперони",
          description: "Пикантная пепперони, увеличенная порция моцареллы, томаты",
          image: "https://localhost/pizzas/1_standart_sm.jpeg",
          new: 1,
          likes: 10,
          topings: [ 1, 4, 7 ]
        }
      }
    }

    store = new Vuex.Store({
      getters
    })

    wrapper = shallowMount(ProductPizza, {
      store,
      localVue,
      mocks: {
        $route
      }
    })
  })

  it('render', () => {
    expect(wrapper.is(ProductPizza)).toBeTruthy()
  })

  it('show data init', () => {
    expect(wrapper.find('.product-pizza__title').text()).toBe('Пепперони')
  })

  it('emit topings:update in ProductToping.vue', () => {
    wrapper.findComponent(ProductToping).vm.$emit('topings:update', [5, 8])
    expect(wrapper.vm.$data.prepareItem.topings).toEqual([5, 8])
  })

  it('emit dough:update in ProductDough.vue', () => {
    wrapper.findComponent(ProductDough).vm.$emit('dough:update', 'thin')
    expect(wrapper.vm.$data.prepareItem.dough).toBe('thin')
  })

  /*
  it('emit size:update in ProductSize.vue', () => {
    let data = { sizeId: 5, diametr: 30 }
    wrapper.findComponent(ProductSize).vm.$emit('size:update', data)
    expect(wrapper.vm.$data.prepareItem.sizeId).toBe(data.sizeId)

    data = { sizeId: 7, diametr: 25 }
    wrapper.findComponent(ProductSize).vm.$emit('size:update', data)
    expect(wrapper.vm.$data.prepareItem.sizeId).toBe(data.sizeId)
    expect(wrapper.vm.$data.prepareItem.dough).toBe('standart')
  })
  */

  afterEach(() => {
    wrapper = null
  })

})
