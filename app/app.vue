<template>
  <div>
    <!-- En-tête global -->
    <header class="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <!-- Logo / Titre -->
        <NuxtLink to="/" class="text-xl font-extrabold text-gray-900 flex items-center gap-2">
          Ma Boutique 👟
        </NuxtLink>

        <!-- Navigation & Actions -->
        <div class="flex items-center gap-6">
          <NuxtLink to="/" class="text-sm font-medium text-gray-700 hover:text-indigo-600">Catalogue</NuxtLink>

          <!-- Lien Panier -->
          <NuxtLink to="/cart" class="relative inline-flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
            Panier 🛒
            <span v-if="totalItems > 0" class="ml-2 bg-indigo-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {{ totalItems }}
            </span>
          </NuxtLink>

          <!-- Zone Authentification -->
          <div v-if="isAuthenticated" class="flex items-center gap-4">
            <NuxtLink v-if="isAdmin" to="/admin" class="text-sm font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-3 py-1.5 rounded-md">
              Espace Admin ⚙️
            </NuxtLink>
            <span class="text-sm text-gray-700 font-medium">Bonjour, {{ user.nom }}</span>
            <button @click="logout" class="text-sm text-red-500 hover:text-red-700 font-medium">
              Déconnexion
            </button>
          </div>
          <div v-else class="flex items-center gap-3">
            <NuxtLink to="/login" class="text-sm font-medium text-gray-700 hover:text-indigo-600">Connexion</NuxtLink>
            <NuxtLink to="/register" class="text-sm font-medium text-white bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
              Inscription
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <!-- Affichage des pages -->
    <NuxtPage />
  </div>
</template>

<script setup>
const { totalItems } = useCart()
const { user, isAuthenticated, isAdmin, logout } = useAuth()
</script>