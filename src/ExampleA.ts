import { queryProduct, queryAnotherProduct } from "./DummyQueries";

interface ProductData {
  id: string;
  price: number;
}

interface AnotherProductData {
  id: string;
  price: number;
  size: string;
}

////////////////////
// Example A
////////////////////

/**
 * Non-reusable business logic
 */
function ExampleA1() {
  const productData: ProductData = queryProduct();

  const mappedProductData = {
    ...productData,
    id: `product id: ${productData.id}`
  };

  return mappedProductData;
}

/**
 * Reusable business logic, but limited to the ProductData model
 */
function ExampleA2() {
  const productData: ProductData = queryProduct();
  const mappedProductData = mapProductData(productData);

  return mappedProductData;
}

/**
 * Opps! We discover some problems if we introduce a new data model of another product
 */
function ExampleA3() {
  const anotherProductData: AnotherProductData = queryAnotherProduct();
  const mappedProductData = mapProductData(anotherProductData);

  // console.log(mappedProductData.size);
  // => Property 'size' does not exist on type '{ id: string; price: number; }'
  // Oops, typescript think we lost size!

  return mappedProductData;
}

/**
 * Fully reusable business logic, that only describes
 * the minimal model it needs and returns the correct model
 */
function ExampleA4() {
  const anotherProductData: AnotherProductData = queryAnotherProduct();
  const mappedProductData = mapAnyProductData(anotherProductData);

  console.log("We have size again!", mappedProductData.size); // => L

  return mappedProductData;
}

////////////////////
// The magic behind Example A
////////////////////

/**
 * Reusable (for ProductData) business logic
 */
function mapProductData(productData: ProductData) {
  return {
    ...productData,
    id: `product id: ${productData.id}`
  };
}

// Note!
// This interface doesn't need to describe the full model.
// Success!!
interface MinimumProductData {
  id: string;
}

/**
 * Reusable business logic
 */
function mapAnyProductData<TProduct extends MinimumProductData>(
  anyProductData: TProduct
): TProduct {
  return {
    ...anyProductData,
    id: `product id: ${anyProductData.id}`
  };
}

console.group("Example A");
console.log("Raw query: ", queryProduct()); // {price: 12, id: "foo"}
console.log("Example A1: ", ExampleA1()); // {price: 12, id: "product id: foo"}
console.log("Example A2: ", ExampleA2()); // {price: 12, id: "product id: foo"}
console.log("Example A3: ", ExampleA3()); // {price: 12, id: "product id: foo", size: "L"}
console.log("Example A4: ", ExampleA4()); // {price: 12, id: "product id: foo", size: "L"}
console.groupEnd();
