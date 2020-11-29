import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import ProductAmount from '@/components/products/pizzas/ProductAmount.vue'

const localVue = createLocalVue()

describe('Test component ProductAmount.vue', () => {
  it('render init component', () => {
    const amount = 1
    const wrapper = shallowMount(ProductAmount, {
      propsData: { amount }
    })
    expect(wrapper.is(ProductAmount)).toBeTruthy()
    expect(wrapper.vm.$props.amount).toEqual(amount)
    expect(wrapper.find('.product-property__amount-value').text()).toMatch(amount.toString())
  })
/*
  it('Test snapshot', () => {
    const amount = 1
    const wrapper = mount(ProductAmount, {
      localVue,
      propsData: { amount }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
  */
  /*
  it('User click buttons', () => {
    const amount = 1
    const wrapper = shallowMount(ProductAmount, {
      localVue,
      propsData: { amount }
    })
    expect(wrapper.find(''))
  })*/
})
