"use client"

import React from 'react';
import Image from 'next/image';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

function HomeCarousel() {
  const heroImage = [
    { imgUrl:'/assets/images/hero-1.svg', alt: 'smartWach' },
    { imgUrl:'/assets/images/hero-2.svg', alt: 'bag' },
    { imgUrl:'/assets/images/hero-3.svg', alt: 'lamp' },
    { imgUrl:'/assets/images/hero-4.svg', alt: 'air fryer' },
    { imgUrl:'/assets/images/hero-5.svg', alt: 'chair' }
  ];

  return (
    <div className="hero-carousel">
      <Carousel  
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={2000}
        showArrows={false}
        showStatus={false}
      >
        {heroImage.map((image) => (
          <div key={image.alt}>
            <Image
              src={image.imgUrl}
              alt={image.alt}
              width={484}
              height={484}
              className="object-contain"    
            />
          </div>
        ))}
      
      </Carousel>
    
      <Image
      
      src="/assets/icons/hand-drawn-arrow.svg"
      alt='arrow'
      width={200}
      height={175}
      className="max-xl:hidden absolute bottom-0 -left-[20%] z-0  "
      />
    
    </div>
    
  );
}

export default HomeCarousel;
