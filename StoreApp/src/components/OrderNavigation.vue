<template>
  <q-card-actions align="between" class="q-mt-md">
    <q-btn label="Back" color="secondary" @click="goBack" />
    <q-space />
    <q-btn label="Place Order" color="positive" @click="goToCart" />
  </q-card-actions>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

function goBack() {
  router.back();
}

function goToCart() {
  router.push('/cart');
}
</script>
