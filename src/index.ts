interface ProductData {
  id: string;
  price: number;
}

interface MappedProductData {
  id: string;
  price: number;
  priceWithVat: number;
}

// Problem: business logic mixed with query!
// The logic could be reusable
function Example1() {
  const productData: ProductData = queryProduct();

  const mappedProductData: MappedProductData = {
    ...productData,
    priceWithVat: productData.price * 1.2
  };

  return mappedProductData;
}

// Better, we can now reuse mapProductData across the site, 
// so that the BL stays the same
function Example2() {
  const productData: ProductData = queryProduct();
  const mappedProductData = mapProductData(productData);
  return mappedProductData;

  function mapProductData(productData: ProductData) {
    return {
      ...productData,
      priceWithVat: productData.price * 1.2
    };
  }
}

// Generic example, where we can truly reuse the business logic across a full range of objects
function Example3() {
  const productData: ProductData = queryProduct();
  const mappedProductData = mapProductData(productData);
  return mappedProductData;

  function mapProductData<T extends { price: number }>(productData: T) {
    return {
      ...productData,
      priceWithVat: productData.price * 1.2
    };
  }
}

console.log(Example1());
console.log(Example2());
console.log(Example3());

function queryProduct() {
  const product: ProductData = {
    price: 12,
    id: "foo"
  };

  return product;
}
