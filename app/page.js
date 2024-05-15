import Navbar from '@/component/Navbar'
import React from 'react'
import Image from 'next/image'
import Searchbar from '@/component/Searchbar'
import HomeCarousel from '@/component/HomeCarousel'
import { getAllProducts } from '@/lib/actions'
import { all } from 'axios'

 const page = async () =>{
  const  allProducts = await getAllProducts();
   
  return (
    <>
       

      <section className=" px-10 md:py-20   py-10 mx-10" >

        <div className='flex max-xl:flex-col   gap-16 ' >
          <div className="flex flex-col justify-center">

            <p className="small-text">
              Smart shoping Starts Here
              <Image src="/assets/icons/arrow-right.svg"
                alt='arrow-right'
                width={16}
                height={16}
              />
            </p>

            <h1 className="head-text">
              Unleash the power of
              <span className="text-primary">  Price Track</span>

            </h1>



            <p className="mt-6">
              Powerful,self-serve  product and growth analytics to help you convert , engage, and retain more</p>

              <Searchbar />
          </div>

          <div>
          <HomeCarousel />

       
          </div>
        
         

        </div>
   
       
      </section>

      <section className="trendinng-section  px-10">
        <div  >
            <h1 className="head-text mt-4 font-bold ml-3 ">Trending </h1>
             
               <div>
                {allProducts.map((product) =>{
                  <div>
                    {product.title}
                  </div>
                })}
               </div>

        </div>
      </section>

    </>
  )
}

export default page