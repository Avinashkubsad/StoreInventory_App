<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6">Item List</div>
      </q-card-section>

      <!-- Customer Info -->
      <q-card-section>
        <q-input v-model="customer.name" label="Name" class="q-mb-sm" :rules="[val => !!val || 'Name is required']" />
        <q-input v-model="customer.email" label="Email" class="q-mb-sm" :rules="[val => /.+@.+\..+/.test(val) || 'Valid email required']" />
        <q-input v-model="customer.phone" label="Phone" class="q-mb-sm" :rules="[val => /^\d{10}$/.test(val) || '10-digit phone required']" />
      </q-card-section>

      <!-- Item Table -->
      <q-card-section>
        <q-table
          :rows="items"
          :columns="columns"
          row-key="id"
        >
          <template v-slot:body-cell-action="props">
            <q-td>
              <q-input
                type="number"
                v-model.number="quantities[props.row.id]"
                :min="1"
                dense
                style="width: 60px"
                @keydown.stop
              />
              <q-btn label="Add" color="primary" dense @click="addToCart(props.row)" class="q-ml-sm" />
            </q-td>
          </template>
        </q-table>
      </q-card-section>

      <!-- Cart Section -->
      <q-card-section>
        <div class="text-subtitle1">Cart</div>
        <q-list bordered>
          <q-item v-for="(item, index) in purchaseItems" :key="index">
            <q-item-section>
              {{ item.name }} ({{ item.quantity }})
            </q-item-section>
            <q-item-section side>
              <q-btn dense icon="delete" color="negative" @click="removeFromCart(index)" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <!-- Submit Button -->
      <q-card-actions align="right">
        <q-btn label="Submit Purchase" color="positive" @click="submitPurchase" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const items = ref([])
const quantities = ref({})
const purchaseItems = ref([])

const customer = ref({
  name: '',
  email: '',
  phone: ''
})

const columns = [
  { name: 'id', label: 'ID', align: 'left', field: 'id' },
  { name: 'name', label: 'Item Name', align: 'left', field: 'name' },
  { name: 'type', label: 'Type', align: 'left', field: 'type' },
  { name: 'stock', label: 'Stock', align: 'right', field: 'stock' },
  { name: 'action', label: 'Quantity', align: 'center' }
]

const fetchItems = async () => {
  const res = await axios.get('http://localhost:5000/api/items')
  items.value = res.data
}

const addToCart = (item) => {
  const quantity = quantities.value[item.id] || 1
  if (quantity <= 0 || quantity > item.stock) {
    alert('Invalid quantity')
    return
  }

  const existing = purchaseItems.value.find(i => i.id === item.id)
  if (existing) {
    existing.quantity += quantity
  } else {
    purchaseItems.value.push({ ...item, quantity })
  }
  quantities.value[item.id] = 1
}

const removeFromCart = (index) => {
  purchaseItems.value.splice(index, 1)
}

const submitPurchase = async () => {
  // Basic validation
  if (!customer.value.name || !customer.value.email || !customer.value.phone) {
    alert('All customer fields are required')
    return
  }

  if (!/.+@.+\..+/.test(customer.value.email)) {
    alert('Invalid email format')
    return
  }

  if (!/^\d{10}$/.test(customer.value.phone)) {
    alert('Phone must be 10 digits')
    return
  }

  if (purchaseItems.value.length === 0) {
    alert('Cart is empty')
    return
  }

  const payload = {
    customer: customer.value,
    cart: purchaseItems.value
  }

  console.log('Submitting:', payload)

  try {
    await axios.post('http://localhost:5000/api/purchase/submit', payload)
    alert('Purchase submitted successfully!')
    purchaseItems.value = []
  } catch (err) {
    console.error(err)
    alert('Error submitting purchase')
  }
}

onMounted(fetchItems)
</script>