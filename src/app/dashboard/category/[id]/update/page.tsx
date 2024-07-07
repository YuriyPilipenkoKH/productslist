import UpdateCategoryForm from '@/components/forms/UpdateCategoryForm'
import prisma from '@/lib/prisma'
import React from 'react'
interface Params {
    params: {
      id: string;
    };
  }

async function UpdateCategoryPage({ params }: Params) {
    const id = params.id
    console.log(id)
    const data = await prisma.category.findUnique({
        where: { id },
        include: {
            products: true
        }
    })
    console.log(data)
  return (
    <section className='p-24 space-y-6 min-h-screen flex flex-col'>
        <UpdateCategoryForm 
        id={data?.id || ''} 
        name={data?.name || ''} />
    </section>
  )
}

export default UpdateCategoryPage