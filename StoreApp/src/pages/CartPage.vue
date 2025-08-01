<template>
  <q-page padding>
    <q-form @submit.prevent="submitPurchase">
      <q-card>
        <q-card-section>
          <div class="text-h6">New Purchase</div>
        </q-card-section>

        <q-card-section>
          <div v-for="(item, index) in purchaseItems" :key="index" class="q-mb-sm">
            <q-select
              v-model="item.item_id"
              :options="itemOptions"
              label="Select Item"
              option-label="name"
              option-value="id"
              emit-value
              map-options
              class="q-mb-sm"
            />
            <q-input
              v-model="item.quantity"
              type="number"
              label="Quantity"
              class="q-mb-sm"
            />
          </div>
          <q-btn label="Add Another Item" @click="addItem" color="secondary" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn type="submit" label="Submit Purchase" color="primary" />
        </q-card-actions>
      </q-card>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const itemOptions = ref([])
const purchaseItems = ref([{ item_id: null, quantity: 1 }])

const fetchItemOptions = async () => {
  const res = await axios.get('http://localhost:5000/api/items')
  itemOptions.value = res.data
}

const addItem = () => {
  purchaseItems.value.push({ item_id: null, quantity: 1 })
}

const submitPurchase = async () => {
  try {
    await axios.post('http://localhost:5000/api/purchase/submit', {
      items: purchaseItems.value
    })
    alert('Purchase submitted successfully!')
    purchaseItems.value = [{ item_id: null, quantity: 1 }]
  } catch (err) {
    alert('Submission failed.',err)
  }
}

onMounted(fetchItemOptions)
</script>