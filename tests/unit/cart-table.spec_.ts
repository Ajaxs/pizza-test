import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import CartTable from '@/components/cart/Table.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Component components/cart/Table.vue', () => {
  let wrapper: any
  let actions: any
  let getters: any
  let store: any

  const pizzas = [
    {
      id: 1,
      title: "Пепперони",
      description: "Пикантная пепперони, увеличенная порция моцареллы, томаты",
      image: "https://localhost/pizzas/1_standart_sm.jpeg",
      new: 1,
      likes: 10,
      topings: [ 1, 4, 5 ]
    },
    {
      id: 2,
      title: "Сырная",
      description: "Увеличенная порция моцареллы, томатный соус",
      image: "https://localhost/pizzas/2_standart_sm.jpg",
      new: 0,
      likes: 15,
      topings: [ 1, 3 ]
    }
  ]

  const sizes = [
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
    },
    {
      id: 4,
      pizza_id: 2,
      title: "Маленькая",
      diametr: 25,
      cost: 245
    },
    {
      id: 5,
      pizza_id: 2,
      title: "Средняя",
      diametr: 30,
      cost: 375
    },
    {
      id: 6,
      pizza_id: 2,
      title: "Большая",
      diametr: 35,
      cost: 495
    }
  ]

  const variants = [
    {
      id: 1,
      size_id: 1,
      dough: "standart",
      image: "https://localhost/pizzas/1_standart_sm.jpeg",
      weight: 410
    },
    {
      id: 2,
      size_id: 2,
      dough: "standart",
      image: "https://localhost/pizzas/1_standart_md.jpeg",
      weight: 610
    },
    {
      id: 3,
      size_id: 2,
      dough: "thin",
      image: "https://localhost/pizzas/1_thin_md.jpeg",
      weight: 500
    },
    {
      id: 4,
      size_id: 3,
      dough: "standart",
      image: "https://localhost/pizzas/1_standart_lg.jpeg",
      weight: 800
    },
    {
      id: 5,
      size_id: 3,
      dough: "thin",
      image: "https://localhost/pizzas/1_thin_lg.jpeg",
      weight: 680
    },
    {
      id: 6,
      size_id: 4,
      dough: "standart",
      image: "https://localhost/pizzas/2_standart_sm.jpg",
      weight: 360
    },
    {
      id: 7,
      size_id: 5,
      dough: "standart",
      image: "https://localhost/pizzas/2_standart_md.jpg",
      weight: 530
    },
    {
      id: 8,
      size_id: 5,
      dough: "thin",
      image: "https://localhost/pizzas/2_thin_md.jpg",
      weight: 430
    },
    {
      id: 9,
      size_id: 6,
      dough: "standart",
      image: "https://localhost/pizzas/2_standart_lg.jpg",
      weight: 690
    },
    {
      id: 10,
      size_id: 6,
      dough: "thin",
      image: "https://localhost/pizzas/2_thin_lg.jpg",
      weight: 580
    }
  ]
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
    },
    {
      id: 3,
      title: "Халапенью",
      image: "https://localhost/topings/t_3.png",
      cost: 30
    },
    {
      id: 4,
      title: "Грибы",
      image: "https://localhost/topings/t_4.png",
      cost: 30
    },
    {
      id: 5,
      title: "Бекон",
      image: "https://localhost/topings/t_5.png",
      cost: 45
    }
  ]

  const cart = [
    { id:1607074164779, type:"pizzas", productId:1, sizeId:1, amount:2, dough:"standart", topings:[] },
    { id:1607089626069, type:"pizzas", productId:2, sizeId:6, amount:3 ,dough:"thin", topings:[3,4] }
  ]

  beforeEach(() => {
    actions = {
      'cart/removeItem': jest.fn()
    }

    getters = {
      'pizzas/items': () => pizzas,
      'pizzas/sizes': () => sizes,
      'pizzas/variants': () => variants,
      'pizzas/topings': () => topings,
      'cart/items': () => cart,
    }

    store = new Vuex.Store({
      actions,
      getters
    })

    wrapper = shallowMount(CartTable, {
      store,
      localVue
    })
  })

})
