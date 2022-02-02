import type { NextPage } from 'next';
import Image from 'next/image';
import styled from 'styled-components';
import { useQuery } from 'urql';

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
  const [result, reexecuteQuery] = useQuery({
    query: ItemsQuery,
  });

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading</p>;

  console.log(error);
  console.log(data);
  return (
    <Content>
      <ProductsArea>
        {data.products.map((product: any) => {
          return (
            <ProductCard key={product.id}>
              {' '}
              <ImageBox>
                <Image
                  src={product.image}
                  height={192}
                  width={256}
                  alt={product.name}
                ></Image>
              </ImageBox>
              <ProductDetails>
                <ProductTitle>{product.name}33</ProductTitle>
                <Price>{product.price} ZŁ</Price>
              </ProductDetails>
            </ProductCard>
          );
        })}
      </ProductsArea>
    </Content>
  );
};

export default Home;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProductsArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

const ProductCard = styled.div`
  width: 330px;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.3);
  margin: 10px 10px;
  border-radius: 4px;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductTitle = styled.p`
  font-size: 22px;
  font-weight: 600;
  margin: 0 auto;
`;
const ImageBox = styled.div`
  margin: 5px auto 5px auto;
`;

const Price = styled.p``;
