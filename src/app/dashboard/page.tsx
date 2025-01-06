import React from 'react'
import Link from 'next/link'
import MainModal from '@/components/modals/MainModal'
import { DeletingCategoryConfirmProps } from '@/data/modalProps'
import { ShowDetails } from '@/components/Button/Button.styled'
import EditIcon from '@/components/icons/EditIcon'
import capitalize from '@/lib/capitalize'
import ProductsCounter from '@/components/ProductsCounter'
import {AddNewCategoryForm} from '@/components/forms/AddNewCategoryForm'
import { auth } from '../../../auth'
import { redirect } from 'next/navigation'
import { retrieveUserId } from '@/actions/retrieve-userId'
import { grabCategories } from '@/actions/grab-categories'
import { CategoryWithProducts } from '@/types/Category'


async function Dashboard() {

  const session = await auth();
  if (!session) {
    redirect('/login'); 
  }
  
  const {user} = session
  const creator = user?.name || "Unknown"
  // Check if email is valid
  if (!user?.email) {
    console.error("User email is missing");
    redirect('/login'); // Or handle the missing email case as needed
  }
  const userId = await retrieveUserId(user.email)
  const categories = await grabCategories(creator)

  return (
    <section className='dashboard py-4 space-y-6 min-h-screen flex flex-col'>
        <div>
         <AddNewCategoryForm 
         creator={creator}
         userId={userId || ""}
         />
        </div>
        {categories.length > 0 ? (
          <table className='Mtable min-w-full leading-normal text-center'>
            <thead className='headst rounded-ss-2xl'>
              <tr >
                <th className='mtext px-5 py-3 text-sm font-semibold text-center  uppercase  bl'>
                  Name
                </th>
                <th className='mtext px-5 py-3 text-sm font-semibold text-center  uppercase  br'>
                  Update
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category:CategoryWithProducts, idx:number) => (
                <tr key={idx} className='border-b border-[var(--text-color)]'>
                  <td className=' px-2 py-3 text-sm font-normal text-left text-gray-900 '>
                    <div className='flex items-center justify-between gap-2 text-[var(--text-color)]'>
                      <Link
                      className='mtext'
                      href={`/dashboard/category/${category.id}/update`}>
                        {capitalize(category.name)}
                      </Link>
                    <ProductsCounter qty={category.products.length}/>
                    </div>
                  </td>
       
                  <td className= 'flex items-center justify-end gap-4 px-1 py-3 text-sm font-medium text-center '>
                    <ShowDetails
                    className='mtext'
                    href={`/dashboard/category/${category.id}/update`}>
                      <EditIcon/>
                      {/* details */}
                    </ShowDetails>
                    <MainModal 
                    modalTypes={DeletingCategoryConfirmProps}
                    id={category.id}
                    name={category.name}
                                  />
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