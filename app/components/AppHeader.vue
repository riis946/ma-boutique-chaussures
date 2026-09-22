<template>
  <header class="bg-white shadow-sm border-b border-gray-100 py-4 px-8 flex justify-between items-center">
    <NuxtLink to="/" class="text-xl font-extrabold text-gray-900">
      Ma Boutique 👟
    </NuxtLink>
    
    <div class="flex items-center gap-4">
      <NuxtLink to="/cart" class="relative bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-100 transition flex items-center gap-2">
        <span>🛒 Panier</span>
        <span class="bg-indigo-600 text-white px-2 py-0.5 rounded-full text-xs font-bold">{{ totalItems }}</span>
      </NuxtLink>
    </div>
  </header>
</template>

<script setup>
const { totalItems } = useCart()
</script>