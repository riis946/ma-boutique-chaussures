import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const method = getMethod(event)

  // GET : Récupérer tous les produits
  if (method === 'GET') {
    try {
      const products = await prisma.product.findMany()
      return { success: true, data: products }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // POST : Ajouter un produit (Admin)
  if (method === 'POST') {
    const body = await readBody(event)
    try {
      const newProduct = await prisma.product.create({
        data: {
          nom: body.nom,
          description: body.description,
          prix: parseFloat(body.prix),
          stock: parseInt(body.stock),
          image: body.image
        }
      })
      return { success: true, data: newProduct }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
})