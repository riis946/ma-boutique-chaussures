export const useAuth = () => {
  const user = useState('auth_user', () => null)

  const login = (email, password) => {
    // Simulation simple : si l'email contient 'admin', on le met admin, sinon client
    const isAdmin = email.includes('admin')
    user.value = {
      id: Date.now(),
      nom: isAdmin ? 'Administrateur' : 'Client Test',
      email: email,
      role: isAdmin ? 'admin' : 'client'
    }
    return true
  }

  const register = (nom, prenom, email, password) => {
    user.value = {
      id: Date.now(),
      nom: `${prenom} ${nom}`,
      email: email,
      role: 'client'
    }
    return true
  }

  const logout = () => {
    user.value = null
  }

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  return {
    user,
    login,
    register,
    logout,
    isAuthenticated,
    isAdmin
  }
}