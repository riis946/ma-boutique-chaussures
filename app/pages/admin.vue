<template>
  <main class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-6xl mx-auto">
      <!-- En-tête Admin -->
      <div class="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm">
        <div>
          <h1 class="text-2xl font-extrabold text-gray-900">Espace Administrateur ⚙️</h1>
          <p class="text-sm text-gray-500 mt-1">Gestion de la boutique, des stocks et des commandes</p>
        </div>
        <NuxtLink to="/" class="text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition">
          &larr; Retour au site
        </NuxtLink>
      </div>

      <!-- Statistiques rapides -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-6 rounded-xl shadow-sm border-l-4 border-indigo-600">
          <p class="text-sm font-medium text-gray-500">Produits au catalogue</p>
          <p class="text-3xl font-bold text-gray-900 mt-2">12</p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-600">
          <p class="text-sm font-medium text-gray-500">Commandes en attente</p>
          <p class="text-3xl font-bold text-gray-900 mt-2">3</p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-600">
          <p class="text-sm font-medium text-gray-500">Chiffre d'affaires</p>
          <p class="text-3xl font-bold text-gray-900 mt-2">1 450.00 €</p>
        </div>
      </div>

      <!-- Gestion des produits -->
      <div class="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-bold text-gray-900">Liste des Produits</h2>
          <button @click="openAddModal" class="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
            + Ajouter un produit
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200 text-sm">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Air Max Pulse</td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-600">149.99 €</td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-600">15 paires</td>
                <td class="px-6 py-4 whitespace-nowrap text-right font-medium space-x-3">
                  <button class="text-indigo-600 hover:text-indigo-900">Modifier</button>
                  <button class="text-red-600 hover:text-red-900">Supprimer</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
const { isAdmin } = useAuth()
const router = useRouter()

// Sécurité basique : si l'utilisateur n'est pas admin, on le redirige vers l'accueil
onMounted(() => {
  if (!isAdmin.value) {
    alert('Accès refusé. Réservé aux administrateurs.')
    router.push('/')
  }
})

const openAddModal = () => {
  alert('Fonctionnalité d\'ajout de produit (CRUD) prête à être connectée à l\'API / base de données.')
}
</script>