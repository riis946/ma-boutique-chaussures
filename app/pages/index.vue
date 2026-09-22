<template>
  <main class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-6xl mx-auto">
      <header class="mb-8">
        <h1 class="text-3xl font-extrabold text-gray-900">
          Ma Boutique de Chaussures 👟
        </h1>
        <p class="text-gray-600 mt-2">
          Découvrez notre collection exclusive de chaussures.
        </p>
      </header>

      <!-- Barre de filtres par catégorie -->
      <div class="flex gap-2 mb-8 overflow-x-auto pb-2">
        <button 
          @click="selectedCategory = null"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition',
            selectedCategory === null 
              ? 'bg-indigo-600 text-white shadow-sm' 
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          ]"
        >
          Tous les produits
        </button>
        <button 
          v-for="cat in categories" 
          :key="cat.id"
          @click="selectedCategory = cat.id"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition',
            selectedCategory === cat.id 
              ? 'bg-indigo-600 text-white shadow-sm' 
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          ]"
        >
          {{ cat.nom }}
        </button>
      </div>

      <!-- État de chargement -->
      <div v-if="pending" class="text-gray-500 py-12 text-center">Chargement des produits...</div>

      <!-- Erreur éventuelle -->
      <div v-else-if="error" class="bg-red-50 text-red-600 p-4 rounded-lg">
        Une erreur est survenue lors du chargement des produits.
      </div>

      <!-- Liste des produits filtrés -->
      <div v-else>
        <div
          v-if="filteredProducts.length === 0"
          class="bg-white p-12 rounded-xl shadow-sm text-center text-gray-500"
        >
          Aucun produit ne correspond à cette catégorie pour le moment.
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between transition hover:shadow-md"
          >
            <div>
              <span class="text-xs uppercase tracking-wider font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded">
                {{ product.category?.nom || 'Chaussures' }}
              </span>
              <h2 class="font-bold text-lg text-gray-900 mt-3">{{ product.nom }}</h2>
              <p class="text-gray-600 text-sm mt-1 line-clamp-2">
                {{ product.description }}
              </p>
            </div>
            
            <div class="mt-6 flex justify-between items-center">
              <span class="text-indigo-600 font-extrabold text-lg"
                >{{ product.prix }} €</span
              >
              <NuxtLink
                :to="`/products/${product.id}`"
                class="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
              >
                Voir
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
// Récupération des données de votre API en SSR avec Nuxt useFetch
const { data: response, pending, error } = await useFetch("/api/products");
const products = computed(() => response.value?.data || []);

// État pour la catégorie sélectionnée
const selectedCategory = ref(null);

// Extraction dynamique des catégories uniques à partir des produits récupérés
const categories = computed(() => {
  const map = new Map();
  products.value.forEach(p => {
    if (p.category) {
      map.set(p.category.id, p.category);
    }
  });
  return Array.from(map.values());
});

// Filtrage des produits selon la catégorie active
const filteredProducts = computed(() => {
  if (selectedCategory.value === null) {
    return products.value;
  }
  return products.value.filter(p => p.category?.id === selectedCategory.value);
});
</script>