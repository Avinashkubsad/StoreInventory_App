<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card style="min-width: 400px">
      <q-card-section>
        <div class="text-h6">Customer Details</div>
      </q-card-section>

      <q-card-section>
        <q-input
          filled
          v-model="customer.name"
          label="Name"
          :rules="[val => !!val || 'Name is required']"
        />
        <q-input
          filled
          v-model="customer.email"
          label="Email"
          type="email"
          :rules="[val => !!val || 'Email is required', val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Invalid email format']"
        />
        <q-input
          filled
          v-model="customer.phone"
          label="Phone"
          type="tel"
          :rules="[val => !!val || 'Phone number is required', val => /^[0-9]{10}$/.test(val) || 'Enter a valid 10-digit phone number']"
        />
      </q-card-section>

      <q-card-section v-if="cartItems.length">
        <div class="text-subtitle2 q-mb-sm">Cart Items:</div>
        <ul>
          <li v-for="item in cartItems" :key="item.name">
            {{ item.name }} - Qty: {{ item.quantity }}
          </li>
        </ul>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" @click="showDialog = false" />
        <q-btn color="primary" label="Submit" @click="submitForm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Notify } from 'quasar'

// Router instance
const router = useRouter()

const showDialog = ref(false)
const cartItems = ref([])

const customer = ref({
  name: '',
  email: '',
  phone: ''
})

function open(cart) {
  cartItems.value = cart
  showDialog.value = true
}

function submitForm() {
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.value.email)
  const isPhoneValid = /^[0-9]{10}$/.test(customer.value.phone)
  const isNameValid = customer.value.name.trim() !== ''

  if (!isNameValid || !isEmailValid || !isPhoneValid) {
    Notify.create({
      color: 'negative',
      position: 'top',
      message: 'Please fill out all fields with valid values.'
    })
    return
  }

  const payload = {
    customer: customer.value,
    cart: cartItems.value
  }

  console.log('🚀 Sending to backend:', payload)

  // TODO: Send to backend (axios/fetch can be added here)

  showDialog.value = false

  // Clear form
  customer.value = { name: '', email: '', phone: '' }

  // Redirect to home
  router.push('/')
}

defineExpose({ open })
</script>

