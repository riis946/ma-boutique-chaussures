<template>
  <main class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="text-center text-3xl font-extrabold text-gray-900">Connexion à votre compte</h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Ou <NuxtLink to="/register" class="font-medium text-indigo-600 hover:text-indigo-500">créez un nouveau compte</NuxtLink>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleLogin">
          <div>
            <label class="block text-sm font-medium text-gray-700">Adresse email</label>
            <div class="mt-1">
              <input v-model="email" type="email" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="client@example.com ou admin@example.com" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Mot de passe</label>
            <div class="mt-1">
              <input v-model="password" type="password" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div>
            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
const { login, isAdmin } = useAuth()
const router = useRouter()

const email = ref('')
const password = ref('')

const handleLogin = () => {
  login(email.value, password.value)
  if (isAdmin.value) {
    router.push('/admin')
  } else {
    router.push('/')
  }
}
</script>