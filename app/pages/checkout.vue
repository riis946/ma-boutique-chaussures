<template>
  <main class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-4xl mx-auto">
      <!-- En-tête -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-extrabold text-gray-900">Validation de la commande 📦</h1>
        <NuxtLink to="/cart" class="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
          &larr; Retour au panier
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Formulaire de livraison et paiement -->
        <form @submit.prevent="handleSubmit" class="lg:col-span-2 space-y-6">
          <!-- Informations personnelles & Adresse -->
          <div class="bg-white p-6 rounded-xl shadow-sm space-y-4">
            <h2 class="text-lg font-bold text-gray-900 mb-4">1. Adresse de livraison</h2>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                <input v-model="form.prenom" type="text" required class="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                <input v-model="form.nom" type="text" required class="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
              <input v-model="form.adresse" type="text" required placeholder="123 rue de la Paix" class="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                <input v-model="form.ville" type="text" required class="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                <input v-model="form.telephone" type="tel" required class="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            class="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition shadow-sm text-center"
          >
            Confirmer et payer ({{ totalAmount.toFixed(2) }} €)
          </button>
        </form>

        <!-- Récapitulatif rapide de la commande -->
        <div class="bg-white p-6 rounded-xl shadow-sm h-fit">
          <h2 class="text-lg font-bold text-gray-900 mb-4">Récapitulatif</h2>
          <div class="space-y-3 mb-4 max-h-60 overflow-y-auto">
            <div v-for="item in cart" :key="`${item.id}-${item.selectedSize}`" class="flex justify-between text-sm">
              <span class="text-gray-600">{{ item.nom }} (x{{ item.quantity }})</span>
              <span class="font-medium text-gray-900">{{ (item.prix * item.quantity).toFixed(2) }} €</span>
            </div>
          </div>
          <div class="border-t border-gray-100 pt-4 flex justify-between font-bold text-gray-900">
            <span>Total</span>
            <span class="text-indigo-600">{{ totalAmount.toFixed(2) }} €</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
const { cart, totalAmount } = useCart()
const router = useRouter()

const form = reactive({
  prenom: '',
  nom: '',
  adresse: '',
  ville: '',
  telephone: ''
})

const handleSubmit = () => {
  if (cart.value.length === 0) {
    alert('Votre panier est vide.')
    router.push('/')
    return
  }

  // Simulation d'enregistrement de commande
  alert('Commande validée avec succès ! Merci pour votre achat.')
  cart.value = [] // Vider le panier
  router.push('/') // Rediriger vers l'accueil
}
</script>