function priceList(price) {
    return {
      price: price
    };
  }
  
  function User(email) {
    return {
      email: email
    };
  }
  
  function Product(
    _id,
    url,
    currency,
    image,
    title,
    currentPrice,
    originalPrice,
    priceList,
    highestPrice,
    lowestPrice,
    averagePrice,
    discountRate,
    description,
    category,
    reviewsCount,
    stars,
    isOutOfStock,
    users
  ) {
    return {
      _id: _id,
      url: url,
      currency: currency,
      image: image,
      title: title,
      currentPrice: currentPrice,
      originalPrice: originalPrice,
      priceHistory: priceList || [],
      highestPrice: highestPrice,
      lowestPrice: lowestPrice,
      averagePrice: averagePrice,
      discountRate: discountRate,
      description: description,
      category: category,
      reviewsCount: reviewsCount,
      stars: stars,
      isOutOfStock: isOutOfStock,
      users: users || []
    };
  }
  
  function EmailContent(subject, body) {
    return {
      subject: subject,
      body: body
    };
  }
  
  function EmailProductInfo(title, url) {
    return {
      title: title,
      url: url
    };
  }
  
  function NotificationType(type) {
    return type;
  }
  