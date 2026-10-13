import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)

  // 1. Gérer la récupération de tous les produits (GET)
  if (method === 'GET') {
    try {
      const products = await prisma.product.findMany()
      return { success: true, data: products }
    } catch (error: any) {
      throw createError({
        statusCode: 500,
        statusMessage: `Erreur lors de la récupération des produits : ${error.message}`
      })
    }
  }

  // 2. Gérer l'ajout d'un produit (POST)
  if (method === 'POST') {
    try {
      const body = await readBody(event)
      
      const newProduct = await prisma.product.create({
        data: {
          nom: body.nom,
          description: body.description,
          prix: Number(body.prix),
          stock: Number(body.stock) || 0,
          image: body.image
        }
      })

      return { success: true, data: newProduct }
    } catch (error: any) {
      throw createError({
        statusCode: 500,
        statusMessage: `Erreur lors de la création du produit : ${error.message}`
      })
    }
  }
})