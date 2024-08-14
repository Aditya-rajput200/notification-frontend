import axios from 'axios'
import * as cheerio from 'cheerio'
import { extractCurrencySymbol, extractPrice,extractDescription } from '../utility';
import dynamic from 'next/dynamic';


export async function scrapeAmazonProduct(url){
    if (!url) {
        return;
    }


    // Bright data configuration 
// curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_0052fe97-zone-pricetrack:imj2gb69gn8x -k "http://lumtest.com/myip.json"

   const username = process.env.BRIGHT_DATA_USERNAME;
   const password  = process.env.BRIGHT_DATA_PASSWORD   ;
   const port = 22225;
   const session_id = (100000 * Math.random()) | 0;

   const options  = {

    auth : {
        username : `${username}-session-${session_id}`,
        password,

    },

    host : 'brd.superproxy.io',
    port,
    rejectUnauthorised : false,

   }

   try {
    // Fetching the data  
    const responce = await axios.get(url,options)
    const $ = cheerio.load(responce.data)

    // Scraping the title 
    const title = $('#productTitle').text().trim();

    // Scraping the Current Price 
    const currentPrice =  extractPrice(
       $('span.priceToPay'),
    );

     // Scraping the Original price 
    
     const originalPrice = extractPrice(
      
      $('.a-price.a-text-price span.a-offscreen')


     ) 
     

    // Scraping the crrency 
    const currency = extractCurrencySymbol(
     $('.priceToPay span.a-price-symbol')

    )


    // Scraping the  Avibility

    const outOfStock = $('#availability span ').text().trim().toLowerCase() === 'currently unavilabel'

    // Scraping the image

    const images = $('#imgBlkFront').attr('data-a-dynamic-image') ||
                  $('#landingImage').attr('data-a-dynamic-image') || '{}'

      const imgUrl = Object.keys(JSON.parse(images));

// Scrapraing the Discount percentage

const discount_percentage = $('.savingsPercentage').text().replace(/[-]/g, '')

// disription 
const description  =extractDescription($)

const data = {

  
        title,
        currency,
        url,
        priceHistory: [],
        currentPrice: Number(currentPrice),
        originalPrice: Number(originalPrice),
        lowestPrice: Number(currentPrice) || Number(originalPrice),
        highestPrice: Number(originalPrice) || Number(currentPrice),
        averagePrice: Number(currentPrice) || Number(originalPrice),
        image: imgUrl[0],
        reviewsCount: 100,
        stars: 4.5,
        category: 'category',
        discount_percentage: discount_percentage,
        isoutOfStock: outOfStock,
        description,  lowestPrice: Number(currentPrice) || Number(originalPrice),
        highestPrice: Number(originalPrice) || Number(currentPrice),
        averagePrice: Number(currentPrice) || Number(originalPrice),
    };

console.log(data)
    return data;
  


// checkPrice(url);
   } catch (error) {
    throw new Error(`Failed to fetch the data ${error.message}`)
   }
}









// yhe futer mai kaam ayy skta hai

// async function checkPrice(url) {
//     try {
//         await scrapeAmazonProduct(url);
//     } catch (error) {
//         console.error(error.message);
//     } finally {
//         // Call checkPrice recursively after a delay (in milliseconds)
//         setTimeout(() => checkPrice(url), 5000); // Check every minute  
//     }
// } 


