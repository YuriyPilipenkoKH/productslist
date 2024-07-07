import prisma from '@/lib/prisma'
import React from 'react'
interface UpdateCategoryPageProps {
    id:string
}

async function UpdateCategoryPage({ id }:UpdateCategoryPageProps) {

    const data = await prisma.category.findUnique({
        where: { id },
        include: {
            products: true
        }
    })
  return (
    <section className='p-24 space-y-6 min-h-screen flex flex-col'>
        UpdateCategory
    </section>
  )
}

export default UpdateCategoryPage