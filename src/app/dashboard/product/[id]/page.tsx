import { fetchCategory } from '@/actions/fetch-category';
import { fetchProduct } from '@/actions/fetch-product';
import Link from 'next/link';
import React from 'react'

interface ProductDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

const ProductDetailsPage = async({ params }: ProductDetailsProps)  => {
  const { id} = await params
  const product = await fetchProduct(id)
  if(!product) {
    return null
  }
  const {categoryId, name, imageUrl} = product
  const category = await fetchCategory(categoryId)

  return (
    <div className='flex flex-col gap-5 items-center justify-center'>
      <h3>{product?.name}</h3>
      <div className='w-48 h-40 bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: `url(${imageUrl})` }}>
      </div>
      <Link href={`/dashboard/category/${category?.id}/update`}>
      back to {category?.name}
      </Link>
    </div>
  )
}

export default ProductDetailsPage