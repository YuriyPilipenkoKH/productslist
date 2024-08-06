// 'use client'
import { BackBtn } from '@/components/Button/Button';
import AddNewProductForm from '@/components/forms/AddNewProductForm';
import DeleteProductForm from '@/components/forms/DeleteProductForm';
import { PicWrapper } from '@/components/forms/FormStyles.styled';
import UpdateCategoryForm from '@/components/forms/UpdateCategoryForm'
import MainModal from '@/components/modals/MainModal';
import { DeletingProductConfirmProps, EditProductProps } from '@/data/modalProps';
import prisma from '@/lib/prisma'
import { MdOutlineAddAPhoto } from "react-icons/md";

import React from 'react'
import { PiArrowFatLinesLeftFill } from 'react-icons/pi';
interface Params {
    params: {
      id: string;
    };
  }

async function UpdateCategoryPage({ params }: Params) {

    const id = params.id
    const data = await prisma.category.findUnique({
        where: { id },
        include: {
            products: true
        }
    })
  return (
    <section className='p-4 space-y-6 min-h-screen flex flex-col'>
      <BackBtn >
          <PiArrowFatLinesLeftFill />
      </BackBtn>
        <UpdateCategoryForm 
        id={data?.id || ''} 
        name={data?.name || ''} />
        <hr />
        <h2 className='text-center my-4 '>Products below</h2>
        <div>
         <AddNewProductForm 
          categoryId= {data?.id || ''}/>
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
                 className='hover:bg-gray-700 transition duration-400'>
                  <td className='px-2 py-3  border-b text-center border-gray-200'>
                    {product.name}
                  </td>
                  <td className='flex justify-end gap-3 px-2 py-3  border-b text-center border-gray-200'>

                    <PicWrapper  className='pic'>
                      <MdOutlineAddAPhoto size={20}/>
                    </PicWrapper>
                    <MainModal 
                    modalTypes={EditProductProps}
                    id={product.id}
                    name={product.name}
                                  />
                    <MainModal 
                    modalTypes={DeletingProductConfirmProps}
                    id={product.id}
                    name={product.name}
                                  />
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