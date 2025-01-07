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
  if(!category) {
    return null
  }
  const {name: categoryName} = category
  return (
    <div className='flex flex-col gap-4'>
      {name}
      <Link href={'/'}>
      back to {categoryName}
      </Link>
    </div>
  )
}

export default ProductDetailsPage