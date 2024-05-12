"use server"
import Product from "../Model/product.model";
import { scrapeAmazonProduct } from "../Scraped";
import { ConnectToDb } from "../mongoose";
import { getLowestPrice } from "../utility";
import { revalidatePath } from "next/cache";
export async function scrapeAndStroeProduct(productUrl) {
    // checking the url is pesent or not 
    if (!productUrl) {
        return;
    }

    try {
         // connecting  to Database  

         ConnectToDb();

         console.log(" Connection to Database is succesfull ")
 /// here we  are scrapoing 
      const scrapedProduct = await scrapeAmazonProduct(productUrl );
      
      let product  = scrapedProduct;
       
      const existingProduct = await Product.findOne({ productUrl });

      // abb data to store kr na agr data phele se h tho usko update krnge n ki new bnannge
      if(existingProduct){
        const updatePriceHistory = [ ...scrapedProduct,
           ...existingProduct.priceList,
          {priceList:scrapedProduct.CurentPrice}
        
            
        ] 

        product = {
          ...scrapedProduct, 
          priceList: updatePriceHistory(updatePriceHistory),
          lowestPrice : getLowestPrice(updatePriceHistory),
          highestPrice: getHighestPrice(updatePriceHistory),
          averagePrice: getAveragePrice(updatePriceHistory),
        }
      }

      // creating the obj in database 
      const newProduct = await Product.findOneAndUpdate(

      // {url:scrapedProduct.url},
        product,
        {
          upsert: true,
          new: true,
        }
      )
       revalidatePath(`/products/${newProduct._id}`)
    } catch (error) {
      console.error("Error:", error);
      throw new Error(`Failed to create/update the product: ${error.message}`);
  }
  
}
