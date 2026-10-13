import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const idParam = getRouterParam(event, 'id')

  if (!idParam) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID du produit manquant",
    })
  }

  const id = Number(idParam)

  if (isNaN(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID du produit invalide",
    })
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id },
    })

    if (!product) {
      throw createError({
        statusCode: 404,
        statusMessage: "Produit introuvable",
      })
    }

    return { success: true, data: product }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Erreur lors de la récupération du produit : ${error.message}`,
    })
  }
})