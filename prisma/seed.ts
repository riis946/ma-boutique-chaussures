import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 1. Créer une catégorie et une marque par défaut si elles n'existent pas
  const category = await prisma.category.upsert({
    where: { slug: 'sneakers' },
    update: {},
    create: {
      nom: 'Sneakers',
      slug: 'sneakers',
    },
  })

  const brand = await prisma.brand.upsert({
    where: { slug: 'nike' },
    update: {},
    create: {
      nom: 'Nike',
      slug: 'nike',
    },
  })

  // 2. Insérer des produits de test
  await prisma.product.createMany({
    data: [
      {
        nom: 'Air Max Pulse',
        slug: 'air-max-pulse',
        description: 'Inspirée de la scène musicale londonienne, cette chaussure apporte une touche underground à la ligne iconique Air Max.',
        prix: 149.99,
        brandId: brand.id,
        categoryId: category.id,
        active: true,
      },
      {
        nom: 'Court Vision Low',
        slug: 'court-vision-low',
        description: 'Amoureuse du look basketball des années 80 avec le confort moderne.',
        prix: 74.99,
        brandId: brand.id,
        categoryId: category.id,
        active: true,
      },
    ],
    skipDuplicates: true,
  })

  console.log('Données de test insérées avec succès !')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })