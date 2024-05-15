"use server"
import Product from "../Model/product.model";
import { scrapeAmazonProduct } from "../Scraped";
import { ConnectToDb } from "../mongoose";
import { getLowestPrice,getHighestPrice,getAveragePrice } from "../utility";
import { revalidatePath } from "next/cache";


// strong the product into the db
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
        let updatePriceHistory = []
        if (Array.isArray(existingProduct.priceList)) {
          updatePriceHistory = [
              ...existingProduct.priceList,
              { price: scrapedProduct.currentPrice }
          ];
      } else {
          updatePriceHistory = [{ price: scrapedProduct.currentPrice }];
      }

        product = {
          ...scrapedProduct, 
          priceList: updatePriceHistory,
          lowestPrice : getLowestPrice(updatePriceHistory),
          highestPrice: getHighestPrice(updatePriceHistory),
          averagePrice: getAveragePrice(updatePriceHistory),
        }
      }

      // creating the obj in database 
      const newProduct = await Product.findOneAndUpdate(
   
      {url:scrapedProduct.url},
        product,
        {
          upsert: true,
          new: true,
        }
      )
      console.log("this the product" +newProduct.id )
       revalidatePath(`/products/${newProduct._id}`)
    } catch (error) {
      console.error("Error:", error);
      throw new Error(`Failed to create/update the product: ${error.message}`);
  }
  
}


// Geting the product from the database
export async function getProductById(productId){
try{
    ConnectToDb();
    const product = await Product.findOne({_id:productId});
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }
  catch (error) {
    console.error("Error:", error);
    throw new Error(`Failed to get the product: ${error.message}`);
  }
}

// Getting the all the prodict
export async function  getAllProducts(){
 
  ConnectToDb();
try{
  const product = await Product.find();
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
}
  catch (error) {
    console.error("Error:", error);
    throw new Error(`Failed to get the product: ${error.message}`);
  }



}
