import { fetchCategory } from '@/actions/fetch-category';
import { fetchProduct } from '@/actions/fetch-product';
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
    <div>
      {name}
    </div>
  )
}

export default ProductDetailsPage