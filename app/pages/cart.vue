<template>
  <main class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-4xl mx-auto">
      <!-- En-tête -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-extrabold text-gray-900">Mon Panier 🛒</h1>
        <NuxtLink to="/" class="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
          &larr; Continuer mes achats
        </NuxtLink>
      </div>

      <!-- Panier vide -->
      <div v-if="cart.length === 0" class="bg-white rounded-xl shadow-sm p-12 text-center">
        <p class="text-gray-500 text-lg mb-6">Votre panier est vide pour le moment.</p>
        <NuxtLink to="/" class="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition">
          Découvrir nos chaussures
        </NuxtLink>
      </div>

      <!-- Liste des articles -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Articles -->
        <div class="lg:col-span-2 space-y-4">
          <div v-for="(item, index) in cart" :key="`${item.id}-${item.selectedSize}`" class="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center">
            <div>
              <h3 class="font-bold text-gray-900">{{ item.nom }}</h3>
              <p class="text-sm text-gray-500 mt-1">Taille : <span class="font-medium text-gray-700">{{ item.selectedSize }}</span></p>
              <p class="text-indigo-600 font-semibold mt-1">{{ item.prix }} €</p>
            </div>

            <div class="flex items-center gap-4">
              <!-- Contrôle quantité -->
              <div class="flex items-center border border-gray-300 rounded-md">
                <button @click="decreaseQuantity(index)" class="px-3 py-1 text-gray-600 hover:bg-gray-100">-</button>
                <span class="px-3 py-1 text-sm font-medium">{{ item.quantity }}</span>
                <button @click="increaseQuantity(index)" class="px-3 py-1 text-gray-600 hover:bg-gray-100">+</button>
              </div>

              <!-- Supprimer -->
              <button @click="removeFromCart(index)" class="text-red-500 hover:text-red-700 text-sm font-medium">
                Supprimer
              </button>
            </div>
          </div>
        </div>

        <!-- Résumé de la commande -->
        <div class="bg-white p-6 rounded-xl shadow-sm h-fit">
          <h2 class="text-lg font-bold text-gray-900 mb-4">Résumé</h2>
          <div class="flex justify-between py-2 border-b border-gray-100 text-sm text-gray-600">
            <span>Nombre d'articles</span>
            <span class="font-medium text-gray-900">{{ totalItems }}</span>
          </div>
          <div class="flex justify-between py-4 text-base font-bold text-gray-900">
            <span>Total</span>
            <span class="text-indigo-600">{{ totalAmount.toFixed(2) }} €</span>
          </div>

          <button 
            @click="checkout" 
            class="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition shadow-sm text-center block"
          >
            Valider la commande
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
const { cart, removeFromCart, totalAmount, totalItems } = useCart()
const router = useRouter() // <-- Ajout indispensable de cette ligne

// Gérer l'incrémentation de la quantité d'un article
const increaseQuantity = (index) => {
  cart.value[index].quantity += 1
}

// Gérer la décrémentation (ou suppression si quantité = 1)
const decreaseQuantity = (index) => {
  if (cart.value[index].quantity > 1) {
    cart.value[index].quantity -= 1
  } else {
    removeFromCart(index)
  }
}

// Redirection vers la page du formulaire de commande
const checkout = () => {
  router.push('/checkout')
}
</script>