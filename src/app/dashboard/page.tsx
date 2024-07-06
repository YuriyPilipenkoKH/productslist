import { currentUser } from '@clerk/nextjs/server'
import React from 'react'
import prisma from '@/lib/prisma'

async function Dashboard() {
  const user = await currentUser()
  const creator = user?.firstName
  const categories = await prisma.category.findMany({
    where: {
      creator
    }
  })
  return (
    <section className='p-24 space-y-6 min-h-screen flex flex-col'>
        <div>
          Add category
        </div>
        {categories.length > 0 ? (
          <table className='min-w-full leading-normal text-center'>
            <thead>
              <tr>
                <th className='px-5 py-3 text-sm font-normal text-center text-gray-900 uppercase bg-slate-400 border-b border-gray-200'>
                  Name
                </th>
              </tr>
            </thead>
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