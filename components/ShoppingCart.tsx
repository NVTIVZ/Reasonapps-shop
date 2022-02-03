import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../app/store';
import { clearCart, removeFromCart } from '../app/cartSlice';
import { NextPage } from 'next';

const ShoppingCart: NextPage = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  return (
    <Cart>
      <CartTitle>
        Shopping Cart <Clear onClick={() => dispatch(clearCart())}>Clear</Clear>
      </CartTitle>
      {cart.items[0]
        ? cart.items.map((item) => {
            return (
              <Product key={item.id}>
                <First>
                  <Title>{item.name}</Title>
                  <Quantity>Quantity: {item.quantity}</Quantity>
                  <Price>
                    Price: {parseInt(item.price) * item.quantity} ZŁ
                  </Price>
                </First>

                <Button onClick={() => dispatch(removeFromCart(item))}></Button>
              </Product>
            );
          })
        : ''}
    </Cart>
  );
};

export default ShoppingCart;

const Cart = styled.div`
  display: flex;
  flex-direction: column;
`;

const CartTitle = styled.div`
  padding: 5px;
  font-weight: 500;
  background: black;
  color: white;
  display: flex;
`;

const Product = styled.div`
  display: flex;
  padding: 5px;
  align-items: center;
`;

const Button = styled.button`
  margin-left: auto;
  margin-right: 5px;
  border: none;
  background: black;
  width: 20px;
  height: 6px;
  cursor: pointer;
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: 600;
`;

const Quantity = styled.p`
  font-weight: 500;
`;
const Price = styled.p`
  font-weight: 500;
`;

const First = styled.div`
  width: 100%;
`;

const Clear = styled.p`
  margin-left: auto;
  cursor: pointer;
`;
