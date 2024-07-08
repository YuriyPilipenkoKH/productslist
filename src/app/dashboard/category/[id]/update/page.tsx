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
        <hr />
        <h2 className='text-center my-4 '>Products below</h2>
        <div>
          Addd product
        </div>
        {(data?.products?.length ?? 0) > 0 ? (

          <table>
            <thead>
              <tr>
                <th className='px-5 py-3 border-b-1  text-gray-800 text-sm uppercase tracking-wider'>
                Name
                </th>
                <th className='px-5 py-3 border-b-1  text-gray-800 text-sm uppercase tracking-wider'>
                Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.products.map((product, idx:number) => (
                <tr
                 key={idx}
                 className='hover:bg-gray-200 transition duration-400'>
                  <td className='px-5 py-3  border-b text-center border-gray-200'>
                    {product.name}
                  </td>
                  <td className='px-5 py-3  border-b text-center border-gray-200'>
                    Delete
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className='text-center '> Add your first product
          </div>
        )}
    </section>
  )
}

export default UpdateCategoryPage