<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div
        v-for="(product, index) in products"
        :key="index"
        :id="`item-${product.name}`"
        class="col-12 col-sm-6 col-md-4"
      >
        <q-card flat bordered class="q-mb-md">
          <q-card-section>
            <div class="row items-center justify-between">
              <div class="text-h6">{{ product.name }}</div>
              <div class="text-subtitle2">₹{{ product.price }}</div>
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              v-if="!product.added"
              label="Add to Cart"
              color="primary"
              @click="addToCart(product)"
            />
          </q-card-actions>

          <q-card-section
            v-if="product.added"
            class="row items-center justify-between q-px-md q-pb-md"
          >
            <div class="text-body2">Quantity:</div>
            <div class="row items-center">
              <q-btn flat round dense icon="remove" @click="decreaseQty(product)" />
              <div class="q-mx-md">{{ product.quantity }}</div>
              <q-btn flat round dense icon="add" @click="increaseQty(product)" />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-card-actions align="between" class="q-mt-md">
      <q-btn label="Back" color="secondary" @click="goBack" />
      <q-space />
      <q-btn label="Place Order" color="positive" @click="goToCart" />
    </q-card-actions>
  </q-page>
  <OrderNavigation />
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import OrderNavigation from 'components/OrderNavigation.vue'
import { useCartStore } from 'stores/cartStore'

const cartStore = useCartStore()

export default {
  name: 'ProductPage',
  components: {
    OrderNavigation,
  },

  data() {
    return {
      router: useRouter(),
      cartStore,
      products: reactive([
        { name: 'Apple', price: 30, quantity: 1, added: false },
        { name: 'Car', price: 500, quantity: 1, added: false },
        { name: 'Toothpaste', price: 20, quantity: 1, added: false },
        { name: 'pen', price: 20, quantity: 1, added: false },
      ]),
    }
  },

  mounted() {
    // Restore previously added items from the cart store
    this.cartStore.cartItems.forEach((cartItem) => {
      const product = this.products.find((p) => p.name === cartItem.name)
      if (product) {
        product.added = true
        product.quantity = cartItem.quantity
      }
    })

    // Scroll to last selected item (optional)
    const selectedId = this.cartStore.lastSelectedItemId
    if (selectedId) {
      const element = document.getElementById(`item-${selectedId}`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        element.classList.add('highlight')
      }
    }
  },

  methods: {
    goToCart() {
      this.router.push('/cart')
    },
    goBack() {
      //this.cartStore.clearCart() //final check this
      this.router.push('/')
    },
    addToCart(product) {
      this.cartStore.addToCart({
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      })
      product.added = true
    },
    increaseQty(product) {
      product.quantity++
      this.cartStore.updateQuantity(product.name, product.quantity)
    },
    decreaseQty(product) {
      if (product.quantity > 1) {
        product.quantity--
        this.cartStore.updateQuantity(product.name, product.quantity)
      } else {
        product.added = false
        this.cartStore.removeFromCart(product.name)
        product.quantity = 1
      }
    },
  },
}
</script>
