import { shallowMount, createLocalVue } from '@vue/test-utils'
import Cart from '@/views/Cart.vue'

const localVue = createLocalVue()

describe('Component view/Cart.vue', () => {

  let wrapper: any

  beforeEach(() => {
    wrapper = shallowMount(Cart, {
      localVue
    })
  })

  it('render', () => {
    expect(wrapper.is(Cart)).toBeTruthy()
  })

})

