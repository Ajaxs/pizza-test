import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import Toping from '@/components/products/pizzas/Toping.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(ElementUI)

describe('Component pizzas/Toping.vue', () => {

  let wrapper: any
  let getters
  let store
  const topings = [
    {
      id: 1,
      title: "Моцарелла",
      image: "https://localhost/topings/t_1.png",
      cost: 35
    },
    {
      id: 2,
      title: "Сладкий перец",
      image: "https://localhost/topings/t_2.png",
      cost: 20
    }
  ]

  beforeEach(() => {
    getters = {
      'pizzas/topingsById': () => () => topings
    }

    store = new Vuex.Store({
      getters
    })

    wrapper = mount(Toping, {
      propsData: {
        topingsProduct: [1,2]
      },
      store,
      localVue
    })
  })

  it('render', () => {
    expect(wrapper.is(Toping)).toBeTruthy()
  })

  it('init data', () => {
    expect(wrapper.vm.$data.topings).toEqual([])
  })

  it('count show toping', () => {
    const topingCards = wrapper.findAll('.toping-card')
    expect(topingCards.length).toBe(topings.length)
  })

  it('add toping', () => {
    const buttons = wrapper.findAll('.toping-add')
    buttons.at(0).trigger('click')
    expect(wrapper.vm.$data.topings).toEqual([1])
    buttons.at(0).trigger('click')
    expect(wrapper.vm.$data.topings).toEqual([])
  })

})
