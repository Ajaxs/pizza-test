import { shallowMount, createLocalVue } from '@vue/test-utils'
import Navbar from '@/components/navbar/Navbar.vue'

const localVue = createLocalVue()

describe('Component components/navbar/Navbar.vue', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = shallowMount(Navbar, {
      localVue,
      stubs: {
        'router-link': true
      }
    })
  })

  it('render', () => {
    expect(wrapper.is(Navbar)).toBeTruthy()
  })

  it('render links', () => {
    const links = wrapper.findAll('.menu__item')
    expect(wrapper.vm.$data.links.length).toBe(links.length)
  })

})
