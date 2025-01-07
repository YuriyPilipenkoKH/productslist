import React from 'react'

interface ProductDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

const ProductDetailsPage = async({ params }: ProductDetailsProps)  => {
  const { id} = await params
  return (
    <div>
      {id}
    </div>
  )
}

export default ProductDetailsPage