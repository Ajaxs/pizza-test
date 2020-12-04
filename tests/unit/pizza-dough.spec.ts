import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import ProductDough from '@/components/products/pizzas/Dough.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(ElementUI)

describe('Component pizzas/Dough.vue', () => {

  let wrapper: any
  let getters
  let store
  const doughs = [
    {
      id: 1,
      dough: "standart",
      title: "Стандартное"
    },
    {
      id: 2,
      dough: "thin",
      title: "Тонкое"
    }
  ]

  beforeEach(() => {
    getters = {
      'pizzas/doughs': () => doughs
    }

    store = new Vuex.Store({
      getters
    })

    wrapper = shallowMount(ProductDough, {
      store,
      localVue
    })
  })

  it('render', () => {
    expect(wrapper.is(ProductDough)).toBeTruthy()
  })

  it('init data', () => {
    expect(wrapper.vm.$data.dough).toBe('standart')
  })

  it('count radio buttons', () => {
    const labels = wrapper.findAll('.label')
    expect(labels.length).toBe(doughs.length)
  })

})
