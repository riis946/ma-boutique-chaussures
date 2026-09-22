import { useState, computed } from '#imports'

export interface CartItem {
  id: number
  nom: string
  prix: number
  quantity: number
  selectedSize?: string
}

export const useCart = () => {
  const cart = useState<CartItem[]>('cart', () => [])

  const addToCart = (product: any, size: string = 'Unique') => {
    const existingItem = cart.value.find(
      (item: CartItem) => item.id === product.id && item.selectedSize === size
    )

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.value.push({
        id: product.id,
        nom: product.nom,
        prix: product.prix,
        quantity: 1,
        selectedSize: size,
      })
    }
  }

  const removeFromCart = (index: number) => {
    cart.value.splice(index, 1)
  }

  const totalAmount = computed(() => {
    return cart.value.reduce((total: number, item: CartItem) => total + item.prix * item.quantity, 0)
  })

  const totalItems = computed(() => {
    return cart.value.reduce((total: number, item: CartItem) => total + item.quantity, 0)
  })

  return {
    cart,
    addToCart,
    removeFromCart,
    totalAmount,
    totalItems,
  }
}