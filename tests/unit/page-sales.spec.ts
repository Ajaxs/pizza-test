import { shallowMount, createLocalVue } from '@vue/test-utils'
import Sales from '@/views/Sales.vue'

const localVue = createLocalVue()

describe('Component view/Sales.vue', () => {

  let wrapper: any

  beforeEach(() => {
    wrapper = shallowMount(Sales, {
      localVue
    })
  })

  it('render', () => {
    expect(wrapper.is(Sales)).toBeTruthy()
  })

})

