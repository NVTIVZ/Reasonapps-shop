import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useQuery } from 'urql';
import { addToCart } from '../app/cartSlice';
import Layout from '../components/Layout';
import { stateProps } from '../app/cartSlice';

const ItemsQuery = `
  query
    {
    products
      { 
      id
      price
      name
      image
      description
      slug
      categories {
        id
        name
        slug 
        }
      }
    } 
`;

const Home: NextPage = () => {
  const [search, setSearch] = useState('');
  const [result, reexecuteQuery] = useQuery({
    query: ItemsQuery,
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, fetching, error } = result;

  if (fetching)
    return (
      <Layout>
        <LoadingPlace>
          <Loading></Loading>
        </LoadingPlace>
      </Layout>
    );

  const filteredResult = (array: stateProps[], query: string) => {
    return array.filter(
      (prod: any) => prod.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  };
  return (
    <Layout>
      <ProductsNsearch>
        <Search>
          <Image src="/search.svg" width={24} height={24} alt="search" />
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          />
        </Search>

        <ProductsArea>
          {filteredResult(data.products, search).map((product: any) => {
            return (
              <ProductCard
                key={product.id}
                onClick={() => router.push(`/${product.slug}`)}
              >
                {' '}
                <ImageBox>
                  <Image
                    src={product.image}
                    layout="responsive"
                    alt={product.name}
                    height={192}
                    width={256}
                  />
                </ImageBox>
                <ProductDetails>
                  <ProductTitle>{product.name}</ProductTitle>
                  <Price>{product.price} ZŁ</Price>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(addToCart(product));
                    }}
                  >
                    Add to cart
                  </Button>
                </ProductDetails>
              </ProductCard>
            );
          })}
        </ProductsArea>
      </ProductsNsearch>
    </Layout>
  );
};

export default Home;

const ProductsArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  @media (max-width: 1700px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 1300px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 625px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled.div`
  max-width: 330px;
  display: flex;
  flex-direction: column;
  margin: 10px 10px;
  transition: 0.5s ease-in-out;
  cursor: pointer;
  :hover {
    transition: 0.5s ease-in-out;
    opacity: 0.9;
  }
  @media (max-width: 625px) {
    margin: 5px 5px;
  }
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductTitle = styled.p`
  font-size: 22px;
  font-weight: 300;
  margin: 0 auto;
`;
const ImageBox = styled.div`
  margin: 5px auto 5px auto;
  height: 192px;
  width: 256px;
`;

const Price = styled.p`
  margin-left: auto;
  margin-right: auto;
  font-size: 14px;
  font-weight: 600;
  margin-top: 5px;
`;

const Search = styled.div`
  margin: 20px 65px 20px auto;
  display: flex;
  border: solid 2px black;
  @media (max-width: 895px) {
    margin: 20px auto;
  }
`;

const SearchBar = styled.input`
  width: 250px;
  height: 24px;
  font-size: 20px;
  background: transparent;
  border: none;
  outline: none;
  margin-left: 5px;
`;

const Button = styled.button`
  border: none;
  background: transparent;
  border: solid 2px black;
  width: 120px;
  height: 40px;
  cursor: pointer;
  font-size: 15px;
  transition: ease-in-out background 0.3s;
  font-weight: 400;
  margin: 5px auto;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const ProductsNsearch = styled.div`
  margin-left: 25px;
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (max-width: 625px) {
    margin: 0 auto;
    align-items: center;
  }
`;

const LoadingPlace = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 75px;
`;

const Loading = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;
  &:after {
    content: ' ';
    display: block;
    width: 96px;
    height: 96px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #000f;
    border-color: #000 transparent #000 transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
