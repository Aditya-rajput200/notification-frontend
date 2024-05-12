import { FUNCTIONS_CONFIG_MANIFEST } from "next/dist/shared/lib/constants";
import { priceList, Product } from "@/types";


// notification 


const Notification = {
    WELCOME: 'WELCOME',
    CHANGE_OF_STOCK: 'CHANGE_OF_STOCK',
    LOWEST_PRICE: 'LOWEST_PRICE',
    THRESHOLD_MET: 'THRESHOLD_MET',
  }
  
  const THRESHOLD_PERCENTAGE = 40;



export function extractPrice(...elements){
    for(const elment of elements){
        const priceText = elment.text().trim();
        if(priceText) return priceText.replace(/\D/g, '')
    }
return '';
}
 export function extractCurrencySymbol(...elements){
    for(const elment of elements){
        const curencySymbol = elment.text().trim();
        if(curencySymbol) return curencySymbol.replace(/[a-zA-Z0-9]/g, '')
    }
return '';
}



  // Extracts description from two possible elements from amazon
export function extractDescription($) {
    // these are possible elements holding description of the product
    const selectors = [
      ".a-unordered-list .a-list-item",
      ".a-expander-content p",
      // Add more selectors here if needed
    ];
  
    for (const selector of selectors) {
      const elements = $(selector);
      if (elements.length > 0) {
        const textContent = elements
          .map((_, element) => $(element).text().trim())
          .get()
          .join("\n");
        return textContent;
      }
    }
  
    // If no matching elements were found, return an empty string
    return "";
  }



  export function getHighestPrice( priceList) {
    let highestPrice = priceList[0];
  
    for (let i = 0; i < priceList.length; i++) {
      if (priceList[i].price > highestPrice.price) {
        highestPrice = priceList[i];
      }
    }
  
    return highestPrice.price;
  }
  
  export function getLowestPrice( priceList) {
    let lowestPrice = priceList[0];
  
    for (let i = 0; i < priceList.length; i++) {
      if (priceList[i].price < lowestPrice.price) {
        lowestPrice = priceList[i];
      }
    }
  
    return lowestPrice.price;
  }
  
  export function getAveragePrice(priceList) {
    const sumOfPrices = priceList.reduce((acc, curr) => acc + curr.price, 0);
    const averagePrice = sumOfPrices / priceList.length || 0;
  
    return averagePrice;
  }