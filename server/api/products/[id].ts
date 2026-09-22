import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const idParam = getRouterParam(event, 'id')

  if (!idParam) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID du produit manquant",
    })
  }

  // Conversion de l'ID en nombre (number)
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
      include: {
        brand: true,
        category: true,
        images: true,
        variants: {
          include: {
            size: true,
          },
        },
      },
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