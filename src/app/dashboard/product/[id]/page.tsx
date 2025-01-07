import { fetchCategory } from '@/actions/fetch-category';
import { fetchProduct } from '@/actions/fetch-product';
import Image from 'next/image';
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
  // Provide a fallback URL for when imageUrl is null
  const fallbackImage = '/path-to-default-image.jpg';
  return (
    <div className='flex flex-col gap-5 items-center justify-center'>
      <h3>{product?.name}</h3>
      <Image
        src={imageUrl ?? ''}
        alt={name}
        width={192} // equivalent to 48 * 4 (tailwind's w-48)
        height={160} // equivalent to 40 * 4 (tailwind's h-40)
        className="object-cover"
      />
      <Link href={`/dashboard/category/${category?.id}/update`}>
      back to {category?.name}
      </Link>
    </div>
  )
}

export default ProductDetailsPage