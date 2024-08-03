import React from 'react'
interface ProductsCounterProps {
    qty: number
}

function ProductsCounter({qty}:ProductsCounterProps) {
  return (
    <div className='flex items-center justify-center p-1 w-9 rounded-full bg-green-800 font-semibold' >
        { qty }
    </div>
  )
}

export default ProductsCounter