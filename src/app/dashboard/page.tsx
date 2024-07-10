import { currentUser } from '@clerk/nextjs/server'
import React from 'react'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import DeleteCategoryForm from '@/components/forms/DeleteCategoryForm'
import AddNewCategoryForm from '@/components/forms/AddNewCategoryForm'
import MainModal from '@/components/modals/MainModal'
import { DeletingCategoryConfirmProps, ShowCategoryDetailsProps } from '@/data/modalProps'
import { Category } from '@prisma/client'
import { ShowDetails } from '@/components/Button/Button.styled'
import EditIcon from '@/components/icons/EditIcon'
import capitalize from '@/lib/capitalize'

async function Dashboard() {
  const user = await currentUser()
  const creator = user?.firstName || ""; // Provide a fallback value for creator
  const categories = await prisma.category.findMany({
    where: {
      creator
    }
  })
  return (
    <section className='dashboard py-4 space-y-6 min-h-screen flex flex-col'>
        <div>
         <AddNewCategoryForm 
         creator={creator}
         />
        </div>
        {categories.length > 0 ? (
          <table className='Mtable min-w-full leading-normal text-center'>
            <thead className='headst rounded-ss-2xl'>
              <tr>
                <th className='mtext px-5 py-3 text-sm font-normal text-center  uppercase  border-b border-gray-200 bl'>
                  Name
                </th>
                <th className='mtext px-5 py-3 text-sm font-medium text-center  uppercase  border-b border-gray-200 br'>
                  Update
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category:Category, idx:number) => (
                <tr key={idx} className='border-b border-[var(--text-color)]'>
                  <td className=' px-2 py-3 text-sm font-normal text-left text-gray-900 '>
                    <Link 
                    className='mtext'
                    href={`/dashboard/category/${category.id}`}>
                      {capitalize(category.name)}
                    </Link>
                  </td>
                  <td className= 'flex items-center gap-4 px-1 py-3 text-sm font-normal text-center '>
                    <ShowDetails
                    className='mtext'
                    href={`/dashboard/category/${category.id}/update`}>
                      <EditIcon/>
                      details
                    </ShowDetails>
                    <MainModal 
                    modalTypes={DeletingCategoryConfirmProps}
                    id={category.id}
                    />
                  {/* <DeleteCategoryForm
                  id={category.id}/> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className='text-center'>
            Add Category today
          </div>
        )}
    </section>
  )
}

export default Dashboard