import { currentUser } from '@clerk/nextjs/server'
import React from 'react'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@nextui-org/react'
import AddNewCategoryForm from '@/components/forms/AddNewcategoryForm'

async function Dashboard() {
  const user = await currentUser()
  const creator = user?.firstName || ""; // Provide a fallback value for creator
  const categories = await prisma.category.findMany({
    where: {
      creator
    }
  })
  return (
    <section className='p-24 space-y-6 min-h-screen flex flex-col'>
        <div>
         <AddNewCategoryForm 
         creator={creator}
         />
        </div>
        {categories.length > 0 ? (
          <table className='min-w-full leading-normal text-center'>
            <thead>
              <tr>
                <th className='px-5 py-3 text-sm font-normal text-center text-gray-900 uppercase bg-slate-400 border-b border-gray-200'>
                  Name
                </th>
                <th className='px-5 py-3 text-sm font-normal text-center text-gray-900 uppercase bg-slate-400 border-b border-gray-200'>
                  Update
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category:any, idx:number) => (
                <tr key={idx}>
                  <td className='px-5 py-3 text-sm font-normal text-center text-gray-900 border-b border-gray-200'>
                    <Link href={`/dashboard/category/${category.id}`}>
                      {category.name}
                    </Link>
                  </td>
                  <td className= 'flex items-center gap-4 px-5 py-3 text-sm font-normal text-center text-gray-900 border-b border-gray-200'>
                    <Link href={`/dashboard/category/${category.id}/update`}>
                    Details
                    </Link>
                    <Button className='bg-transparent text-gray-900'>
                      Delete
                    </Button>
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