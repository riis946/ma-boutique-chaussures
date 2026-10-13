<template>
  <main class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-7xl mx-auto">
      
      <!-- En-tête et Bouton d'ajout -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-extrabold text-gray-900">Gestion des Produits</h1>
          <p class="text-sm text-gray-500 mt-1">Gérez votre catalogue de chaussures, suivez les stocks et modifiez vos articles.</p>
        </div>
        <div class="flex items-center gap-3">
          <NuxtLink to="/" class="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
            &larr; Retour à la boutique
          </NuxtLink>
          <button 
            @click="openCreateModal"
            class="bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition shadow-sm flex items-center gap-2"
          >
            <span>➕</span> Ajouter un produit
          </button>
        </div>
      </div>

      <!-- Barre de recherche instantanée -->
      <div class="bg-white p-4 rounded-xl shadow-sm mb-6 flex items-center gap-3 border border-gray-100">
        <span class="text-gray-400 text-lg">🔍</span>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Rechercher un produit par son nom ou sa description..." 
          class="w-full bg-transparent border-none focus:outline-none text-gray-800 placeholder-gray-400 text-sm"
        />
        <button v-if="searchQuery" @click="searchQuery = ''" class="text-xs text-gray-400 hover:text-gray-600">
          Effacer
        </button>
      </div>

      <!-- Chargement / Erreur -->
      <div v-if="pending" class="text-gray-500 text-center py-12">Chargement du catalogue...</div>
      <div v-else-if="error" class="bg-red-50 text-red-600 p-4 rounded-lg">Erreur lors du chargement des produits.</div>

      <!-- Tableau des produits -->
      <div v-else-if="filteredProducts.length > 0" class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider border-b border-gray-100">
                <th class="p-4">Image</th>
                <th class="p-4">Nom</th>
                <th class="p-4">Prix</th>
                <th class="p-4">Stock</th>
                <th class="p-4">Ajouté le</th>
                <th class="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-sm text-gray-700">
              <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-gray-50/50 transition">
                <td class="p-4">
                  <img :src="product.image || 'https://via.placeholder.com/150'" :alt="product.nom" class="w-12 h-12 object-cover rounded-lg border" />
                </td>
                <td class="p-4 font-semibold text-gray-900">{{ product.nom }}</td>
                <td class="p-4 text-indigo-600 font-bold">{{ product.prix }} €</td>
                <td class="p-4">
                  <span :class="product.stock > 0 ? 'bg-green-50 text-green-700 px-2.5 py-1 rounded-full text-xs font-medium' : 'bg-red-50 text-red-700 px-2.5 py-1 rounded-full text-xs font-medium'">
                    {{ product.stock }} en stock
                  </span>
                </td>
                <td class="p-4 text-gray-500 text-xs">
                  {{ new Date(product.createdAt).toLocaleDateString('fr-FR') }}
                </td>
                <td class="p-4 text-right space-x-2">
                  <NuxtLink 
                    :to="`/products/${product.id}`" 
                    class="inline-block bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-200 transition"
                  >
                    Voir
                  </NuxtLink>
                  <button 
                    @click="openEditModal(product)"
                    class="bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-indigo-100 transition"
                  >
                    Modifier
                  </button>
                  <button 
                    @click="deleteProduct(product.id)"
                    class="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-100 transition"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Aucun résultat de recherche -->
      <div v-else class="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
        <p class="text-gray-500 text-base">Aucun produit ne correspond à votre recherche "{{ searchQuery }}".</p>
      </div>

      <!-- Modale de Création / Modification -->
      <div v-if="isModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 overflow-hidden">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold text-gray-900">
              {{ isEditing ? 'Modifier le produit' : 'Ajouter un nouveau produit' }}
            </h2>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600 text-xl font-bold">&times;</button>
          </div>

          <form @submit.prevent="saveProduct" class="space-y-4">
            <div>
              <label class="block text-xs font-semibold uppercase text-gray-600 mb-1">Nom du produit</label>
              <input v-model="form.nom" type="text" required class="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold uppercase text-gray-600 mb-1">Prix (€)</label>
                <input v-model.number="form.prix" type="number" step="0.01" required class="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div>
                <label class="block text-xs font-semibold uppercase text-gray-600 mb-1">Stock</label>
                <input v-model.number="form.stock" type="number" required class="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold uppercase text-gray-600 mb-1">URL de l'image</label>
              <input v-model="form.image" type="url" placeholder="https://..." class="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>

            <div>
              <label class="block text-xs font-semibold uppercase text-gray-600 mb-1">Description</label>
              <textarea v-model="form.description" rows="3" class="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"></textarea>
            </div>

            <div class="flex justify-end gap-3 pt-4 border-t">
              <button type="button" @click="closeModal" class="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition">
                Annuler
              </button>
              <button type="submit" class="px-5 py-2 text-sm font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-sm">
                {{ isEditing ? 'Mettre à jour' : 'Créer' }}
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'

// Récupération des produits depuis l'API
const { data: response, pending, error, refresh } = await useFetch('/api/products')
const products = computed(() => {
  if (Array.isArray(response.value)) return response.value
  return response.value?.data || []
})

// Barre de recherche instantanée
const searchQuery = ref('')
const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value
  const query = searchQuery.value.toLowerCase()
  return products.value.filter(p => 
    p.nom.toLowerCase().includes(query) || 
    (p.description && p.description.toLowerCase().includes(query))
  )
})

// Gestion de la modale et du formulaire
const isModalOpen = ref(false)
const isEditing = ref(false)
const form = ref({
  id: null,
  nom: '',
  prix: 0,
  stock: 0,
  image: '',
  description: ''
})

const openCreateModal = () => {
  isEditing.value = false
  form.value = { id: null, nom: '', prix: 0, stock: 0, image: '', description: '' }
  isModalOpen.value = true
}

const openEditModal = (product) => {
  isEditing.value = true
  form.value = { ...product }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

// Actions API (Création / Modification / Suppression)
const saveProduct = async () => {
  try {
    if (isEditing.value) {
      // Modification (PUT ou PATCH selon votre route /api/products/[id])
      await $fetch(`/api/products/${form.value.id}`, {
        method: 'PUT',
        body: form.value
      })
      alert('Produit mis à jour avec succès !')
    } else {
      // Création (POST sur /api/products)
      await $fetch('/api/products', {
        method: 'POST',
        body: form.value
      })
      alert('Produit créé avec succès !')
    }
    closeModal()
    refresh() // Recharge la liste des produits
  } catch (err) {
    alert('Une erreur est survenue lors de l\'enregistrement.')
    console.error(err)
  }
}

const deleteProduct = async (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
    try {
      await $fetch(`/api/products/${id}`, {
        method: 'DELETE'
      })
      alert('Produit supprimé avec succès.')
      refresh() // Recharge la liste
    } catch (err) {
      alert('Erreur lors de la suppression du produit.')
      console.error(err)
    }
  }
}
</script>