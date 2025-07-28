import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
    lastSelectedItemId: null
  }),

  actions: {
    addToCart(newItem) {
      const existing = this.cartItems.find(item => item.name === newItem.name);
      if (existing) {
        existing.quantity += newItem.quantity;
      } else {
        this.cartItems.push({ ...newItem });
      }
    },

    removeFromCart(name) {
      this.cartItems = this.cartItems.filter(item => item.name !== name);
    },
     setLastSelectedItem(id) {
      this.lastSelectedItemId = id
    },

    clearCart() {
      this.cartItems = [];
    },

    updateQuantity(name, quantity) {
      const item = this.cartItems.find(i => i.name === name);
      if (item) {
        item.quantity = quantity;
      }
    }
  }
});
