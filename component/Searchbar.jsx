
"use client"

import { scrapeAmazonProduct } from '@/lib/Scraped';
import { scrapeAndStroeProduct } from '@/lib/actions';
import React, { useState } from 'react'


const isValidAmazonProductURL = (url) =>{
  try {
    const parsedURL = new URL(url);
    const hostname  =  parsedURL.hostname;
    // here we  are checking the condition 
    if(hostname.includes('amazon.com') || hostname.includes('amazon.') || hostname.includes('amazon')) {
      return true;
    }
  } catch (error) {
    return false;
  }
  
 return false;
}
function Searchbar() {
    const [searchPromt, setSearchPromt] = useState('')
     const [isloding, setIsloding] = useState(false)
    
    const  handelSubmit = async (e) => {
       e.preventDefault();

       // submit hone se pehele we have to ckeck the the some cond ====
      //  1] valid link 2]  amazon link 3] 


      const isValidLink = isValidAmazonProductURL(searchPromt);
      if(!isValidLink) return alert("Please Provides  the Valid Amazon link")

      try {
        setIsloding(true)  

        ///   here we are scraping the data

        const  product = await scrapeAndStroeProduct(searchPromt);
      } catch (error) {
        console.log(error)
      }
      finally{
        setIsloding(false)
      }
    }
  return (
<>

<form className="flex min:flex-col gap-4 mt-12"
  onSubmit={handelSubmit}
>

<input 

 value={searchPromt}
 onChange={(e)=>{setSearchPromt(e.target.value)}}
 type="text" 
 placeholder=" Enter the Link here..." 
 className="searchbar-input" />



     <button 
     
      disabled ={searchPromt === ''}
     type="submit"
      className='searchbar-btn'
      
      >  {isloding ? 'Searching...' : 'Search' }</button>
</form>
</>
  )
}

export default Searchbar