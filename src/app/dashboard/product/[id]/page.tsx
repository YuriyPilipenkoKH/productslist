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
    <div className='flex flex-col gap-4'>
      {product?.name}
      <Link href={`/dashboard/category/${category?.id}/update`}>
      back to {category?.name}
      </Link>
    </div>
  )
}

export default ProductDetailsPage