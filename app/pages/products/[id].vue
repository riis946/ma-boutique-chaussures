<template>
  <main class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Bouton de retour -->
      <NuxtLink to="/" class="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800 mb-6">
        &larr; Retour à la boutique
      </NuxtLink>

      <!-- Chargement / Erreur -->
      <div v-if="pending" class="text-gray-500 text-center py-12">Chargement du produit...</div>
      <div v-else-if="error" class="bg-red-50 text-red-600 p-4 rounded-lg">Produit introuvable ou erreur de chargement.</div>

      <!-- Fiche Produit -->
      <div v-else-if="product" class="bg-white rounded-xl shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        <!-- Vraie Image du produit -->
        <div class="bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden h-80">
          <img 
            v-if="product.image" 
            :src="product.image" 
            :alt="product.nom" 
            class="w-full h-full object-cover rounded-lg" 
          />
          <span v-else class="text-gray-400 text-lg">👟 [Pas d'image]</span>
        </div>

        <!-- Informations -->
        <div class="flex flex-col justify-between">
          <div>
            <span class="text-xs uppercase tracking-wider font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded">
              Chaussures
            </span>
            <h1 class="text-3xl font-extrabold text-gray-900 mt-2">{{ product.nom }}</h1>
            <p class="text-2xl font-bold text-indigo-600 mt-4">{{ product.prix }} €</p>
            
            <p class="text-gray-600 mt-4 leading-relaxed">{{ product.description }}</p>
            <p class="text-sm text-gray-500 mt-4">Stock disponible : {{ product.stock }} unités</p>
          </div>

          <!-- Bouton d'action "Ajouter au panier" -->
          <div class="mt-8">
            <button 
              @click="handleAddToCart"
              class="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition shadow-sm flex items-center justify-center gap-2"
            >
              <span>🛒</span> Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
const route = useRoute()
const productId = route.params.id

// Récupération dynamique du produit via l'API
const { data: response, pending, error } = await useFetch(`/api/products/${productId}`)
const product = computed(() => response.value?.data || null)

const handleAddToCart = () => {
  if (product.value) {
    alert(`"${product.value.nom}" a été ajouté à votre panier !`)
  }
}
</script>