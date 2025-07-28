<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">🛒 Cart Summary</div>

    <q-table
      :rows="cartStore.cartItems"
      :columns="columns"
      row-key="name"
      flat
      bordered
    >
      <!-- Combined column templates -->
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">{{ props.row.name }}</q-td>
          <q-td key="quantity" :props="props">{{ props.row.quantity }}</q-td>
          <q-td key="price" :props="props">₹{{ props.row.price }}</q-td>
          <q-td key="total" :props="props">
            ₹{{ (props.row.price * props.row.quantity).toFixed(2) }}
          </q-td>
          <q-td key="action" :props="props">
            <q-btn
              flat
              dense
              icon="delete"
              color="negative"
              @click="cartStore.removeFromCart(props.row.name)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-card class="q-mt-md">
      <div class="q-pa-md text-right">
        <div class="text-subtitle1">Total Items: {{ totalItems }}</div>
        <div class="text-subtitle1">Grand Total: ₹{{ totalPrice.toFixed(2) }}</div>
      </div>
    </q-card>

    <q-card-actions align="between" class="q-mt-md">
      <q-btn label=" < Back" color="primary" @click="goBack" />
      <q-space />
      <q-btn
        label="Clear Cart"
        color="negative"
        @click="cartStore.clearCart()"
        :disable="cartStore.cartItems.length === 0"
      />
    </q-card-actions>
  </q-page>
</template>


<script>
import { defineComponent } from 'vue'
import { useCartStore } from 'stores/cartStore'

export default defineComponent({
  name: 'CartPage',

  data() {
    return {
      columns: [
        { name: 'name', label: 'Item Name', field: 'name', align: 'left' },
        { name: 'quantity', label: 'Quantity', field: 'quantity', align: 'right' },
        { name: 'price', label: 'Price (₹)', field: 'price', align: 'right' },
        { name: 'total', label: 'Total (₹)', field: 'total', align: 'right' },
        { name: 'action', label: 'Action', field: 'action', align: 'center' },
      ],
    }
  },

  computed: {
    cartStore() {
      return useCartStore()
    },
    totalItems() {
      return this.cartStore.cartItems.reduce((sum, item) => sum + Number(item.quantity), 0)
    },
    totalPrice() {
      return this.cartStore.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },
  },

  methods: {
    goToCart() {
      this.$router.push('/cart')
    },
    goBack() {
      this.$router.back('/')
    },
  },
})
</script>
