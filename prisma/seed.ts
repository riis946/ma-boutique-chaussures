import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Insérer des produits directement selon votre schéma Product
  await prisma.product.createMany({
    data: [
      {
        nom: 'Air Max Pulse',
        description: 'Inspirée de la scène musicale londonienne, cette chaussure apporte une touche underground à la ligne iconique Air Max.',
        prix: 149.99,
        stock: 10,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      },
      {
        nom: 'Court Vision Low',
        description: 'Amoureuse du look basketball des années 80 avec le confort moderne.',
        prix: 74.99,
        stock: 15,
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a',
      },
      {
        nom: "Air Force 1 '07",
        description: "La légende continue de briller avec la Nike Air Force 1 '07, le modèle de basketball iconique.",
        prix: 119.99,
        stock: 8,
        image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519',
      },
    ],
    skipDuplicates: true,
  })

  console.log('Produits insérés avec succès !')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })