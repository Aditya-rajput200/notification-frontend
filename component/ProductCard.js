import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
function ProductCard({product}) {
  return (
    <>
 
 <Link href={`/product/${product._id}`} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-50 dark:border-gray-40 dark:hover:bg-gray-50">
      <div className="product-card_img-container ">
        <Image 
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="product-card_img"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="product-title">{product.title}</h3>

        <div className="flex justify-between">
          <p className="text-black opacity-50 text-lg capitalize">
            {product.category}
          </p>

          <p className="text-black text-lg font-semibold">
            <span>{product?.currency}</span>
            <span>{product?.currentPrice}</span>
          </p>
        </div>
      </div>
    </Link>
   

    </>
  )
}

export default ProductCard