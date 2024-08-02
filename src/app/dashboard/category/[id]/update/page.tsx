// 'use client'
import { EditBtn } from '@/components/Button/Button';
import AddNewProductForm from '@/components/forms/AddNewProductForm';
import DeleteProductForm from '@/components/forms/DeleteProductForm';
import UpdateCategoryForm from '@/components/forms/UpdateCategoryForm'
import prisma from '@/lib/prisma'
// import { useRouter } from 'next/navigation';
import React from 'react'
import { PiArrowFatLinesLeftFill } from 'react-icons/pi';
interface Params {
    params: {
      id: string;
    };
  }

async function UpdateCategoryPage({ params }: Params) {
    // const router = useRouter()
    const id = params.id
    const data = await prisma.category.findUnique({
        where: { id },
        include: {
            products: true
        }
    })
  return (
    <section className='p-4 space-y-6 min-h-screen flex flex-col'>
      <EditBtn
        // onClick={() => router.back()}
          >
              <PiArrowFatLinesLeftFill />
      </EditBtn>
        <UpdateCategoryForm 
        id={data?.id || ''} 
        name={data?.name || ''} />
        <hr />
        <h2 className='text-center my-4 '>Products below</h2>
        <div>
         <AddNewProductForm categoryId= {data?.id || ''}/>
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
                    <DeleteProductForm id ={product.id}/>
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