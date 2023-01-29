import { Coupon } from "./models/coupon.model";
import { Order } from "./models/order.model";
import { Product } from "./models/product.model";

test('Calcular valor total de um pedido', () => {
  const order = new Order();

  const product1 = new Product('Livro Java Efetivo', 20);
  const product2 = new Product('Mouse', 10);
  const product3 = new Product('Monitor', 100);

  order.addProduct(product1, 2);
  order.addProduct(product2, 1);
  order.addProduct(product3, 4);

  expect(order.calculateTotal()).toBe(450);
});

test('Atualizar valor total do pedido com cupom de desconto', () => {
  const order = new Order();

  const product1 = new Product('Livro Java Efetivo', 20);
  const product2 = new Product('Mouse', 10);
  const product3 = new Product('Monitor', 100);

  order.addProduct(product1, 2);
  order.addProduct(product2, 1);
  order.addProduct(product3, 4);

  const coupon = new Coupon(10);

  order.applyCoupon(coupon);

  expect(order.calculateTotal()).toBe(405);
});

test.todo('Não criar pedido com CPF inválido');
