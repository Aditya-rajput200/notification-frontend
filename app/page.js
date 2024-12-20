import React from 'react'
import Image from 'next/image'
import Searchbar from '@/component/Searchbar'
import HomeCarousel from '@/component/HomeCarousel'

 const page = async () =>{


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

     

    </>
  )
}

// export default ProtectedRoute(page)
export default page