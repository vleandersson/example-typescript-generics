import { queryProduct } from "./DummyQueries";

interface ProductData {
  id: string;
  price: number;
}

interface MappedProductData {
  id: string;
  price: number;
  priceWithVat: number;
}

////////////////////
// Example B - extend and stay immutable
////////////////////

function ExampleB1() {
  const productData: ProductData = queryProduct();
  const mappedProductData = mapProductData(productData);

  return mappedProductData;
}

function ExampleB2() {
  const productData: ProductData = queryProduct();
  const mappedProductData = mapProductDataSmart(productData);

  return mappedProductData;
}

////////////////////
// Ok mapper
////////////////////
interface MinimumProductData {
  price: number;
}

function mapProductData<TProduct extends MinimumProductData>(
  productData: TProduct
) {
  return {
    ...productData,
    priceWithVat: productData.price * 1.2
  };
}

////////////////////
// More scalable mapper
////////////////////

interface MinimumProductDataSmart
  extends MinimumExtendProductDataWithPriceWithVat {}

function mapProductDataSmart<TProduct extends MinimumProductDataSmart>(
  productData: TProduct
) {
  return {
    ...productData,
    ...extendProductDataWithPriceWithVat(productData)
  };
}

interface MinimumExtendProductDataWithPriceWithVat {
  price: number;
}

function extendProductDataWithPriceWithVat<
  TProduct extends MinimumExtendProductDataWithPriceWithVat
>(productData: TProduct) {
  return { ...productData, priceWithVat: productData.price * 1.2 };
}

console.group("Example B");
console.log(ExampleB1());
console.log(ExampleB2());
console.groupEnd();
