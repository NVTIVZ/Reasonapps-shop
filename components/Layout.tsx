import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../app/store';
import ShoppingCart from './ShoppingCart';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const cart = useSelector((state: RootState) => state.cart);
  const [mobile, setMobile] = useState('none');

  return (
    <Content>
      <Banner>
        <Link href={'/'}>ReasonApps Shop</Link>
      </Banner>

      <MainArea>
        {children}
        <CartArea>
          <ShoppingCart />
          <Amount>
            <ProductTitle>Total Amount:</ProductTitle>{' '}
            {cart.amount ? cart.amount : '0'} ZŁ
          </Amount>
        </CartArea>
        <CartIcon onClick={() => setMobile('flex')}>
          <Image src="/shopping-cart.svg" alt="cart" width={32} height={32} />
        </CartIcon>
        <MobileCart open={mobile}>
          <ShoppingCart />
          <Amount>
            <ProductTitle>Total Amount:</ProductTitle>{' '}
            {cart.amount ? cart.amount : '0'} ZŁ
          </Amount>
          <CloseIcon onClick={() => setMobile('none')}>
            <Image src="/x.svg" alt="cart" width={32} height={32} />
          </CloseIcon>
        </MobileCart>
      </MainArea>
    </Content>
  );
};

export default Layout;

const Content = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Banner = styled.div`
  display: flex;
  font-size: 68px;
  justify-content: center;
  padding: 25px 0;
  background: black;
  font-weight: 600;
  a {
    text-decoration: none;
    color: white;
  }
  @media (max-width: 625px) {
    font-size: 36px;
  }
`;

const MainArea = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;

const CartArea = styled.div`
  position: sticky;
  width: 400px;
  height: 650px;
  right: 0;
  top: 20px;
  margin-top: 20px;
  margin-right: 25px;
  border: solid 2px black;
  overflow-y: auto;
  & > div > div {
    border-bottom: 1px solid black;
  }
  display: flex;
  flex-direction: column;
  @media (max-width: 895px) {
    display: none;
  }
`;

const Amount = styled.div`
  padding: 5px;
  margin-top: auto;
`;

const ProductTitle = styled.p`
  font-size: 22px;
  font-weight: 300;
  margin: 0 auto;
`;

const CartIcon = styled.div`
  position: fixed;
  width: 45px;
  height: 45px;
  right: 0;
  margin-top: 50px;

  @media (min-width: 896px) {
    display: none;
  }
`;

const MobileCart = styled.div<{ open: string }>`
  display: ${(props) => props.open || 'none'};
  flex-direction: column;
  position: fixed;
  background: white;
  overflow-y: scroll;
  right: 0;
  top: 0;
  width: 300px;
  transition: 0.5s all ease-in-out;
  & > div > div {
    border-bottom: 1px solid black;
  }
  height: 100vh;
`;

const CloseIcon = styled.div`
  position: fixed;
  background: white;
  display: flex;
  justify-content: center;
  width: 45px;
  right: 300px;
  height: 45px;
  margin-top: 140px;
`;
