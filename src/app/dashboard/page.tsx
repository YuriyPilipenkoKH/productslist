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
        Dashboardpage
    </section>
  )
}

export default Dashboard