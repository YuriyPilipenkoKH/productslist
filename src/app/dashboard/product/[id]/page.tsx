import React from 'react'

interface Params {
  params: Promise<{
    id: string;
  }>;
}

const ProductDetails = async({ params }: Params)  => {
  const { id } = await params
  return (
    <div>ProductDetails</div>
  )
}

export default ProductDetails