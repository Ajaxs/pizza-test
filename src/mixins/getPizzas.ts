import { mapGetters } from 'vuex'

export const getPizzas = {
  computed: {
    ...mapGetters({
      pizzasItems: 'pizzas/items',
      pizzasSizes: 'pizzas/sizes',
      pizzasVariants: 'pizzas/variants',
      pizzasTopings: 'pizzas/topings',
      pizzasDoughs: 'pizzas/doughs'
    })
  }
}
