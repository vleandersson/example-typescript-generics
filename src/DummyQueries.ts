////////////////////
// Dummy queries
////////////////////

interface ProductData {
  id: string;
  price: number;
}

interface AnotherProductData {
  id: string;
  price: number;
  size: string;
}

export function queryProduct() {
  const product: ProductData = {
    price: 12,
    id: "foo"
  };

  return product;
}

export function queryAnotherProduct() {
  const product: AnotherProductData = {
    price: 12,
    id: "bar",
    size: "L"
  };

  return product;
}
