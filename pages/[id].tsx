import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useQuery } from 'urql';
import { addToCart } from '../app/cartSlice';
import Layout from '../components/Layout';

const ItemQuery = `
query ($slug:String){
  products(slug:$slug){
    name
    id
    price
    description
    image
    categories{
      id
      slug
      name
    }
  }
}

`;

const ProductPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const slug = router.query.id as string;

  const [result, reexecuteQuery] = useQuery({
    query: ItemQuery,
    variables: { slug },
    pause: !slug,
  });

  const { data, fetching, error } = result;
  if (fetching || !data) {
    return (
      <Layout>
        <Product>
          <Loading></Loading>
        </Product>
      </Layout>
    );
  }

  return (
    <Layout>
      <Product>
        <ImageBox>
          <Image
            src={data.products[0].image}
            alt={data.products[0].name}
            height={480}
            width={640}
            priority
          />
        </ImageBox>
        <ProductData>
          <Title>{data.products[0].name}</Title>
          <Description>{data.products[0].description}</Description>
          <Categories>
            Categories:
            {data.products[0].categories.map((category: { name: string }) => {
              return <Category key={category.name}>{category.name}</Category>;
            })}
          </Categories>
          <Price>Price: {data.products[0].price} ZŁ</Price>

          <Button onClick={() => dispatch(addToCart(data.products[0]))}>
            Add to Cart
          </Button>
        </ProductData>
      </Product>
    </Layout>
  );
};

export default ProductPage;

const Product = styled.div`
  margin-left: 25px;
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 75px;
  justify-content: center;
  @media (max-width: 1350px) {
    flex-direction: column;
    align-items: center;

    margin-left: 5px;
    margin-right: 5px;
  }
`;

const ImageBox = styled.div`
  max-height: 480px;
  max-width: 640px;
`;

const ProductData = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 0 0 25px;
  @media (max-width: 1600px) {
    max-width: 400px;
  }
  @media (max-width: 1350px) {
    flex-direction: column;
    align-items: center;
    max-width: 600px;
    margin: 0 5px;
  }
`;

const Title = styled.p`
  font-size: 36px;
  font-weight: 500;
`;

const Price = styled.p`
  font-size: 24px;
  font-weight: 500;
  margin-top: 10px;
`;

const Description = styled.p`
  font-size: 24px;
  font-weight: 300;
  margin-top: 10px;
`;

const Categories = styled.ul`
  margin-top: 10px;
  list-style: none;
  font-size: 24px;
`;

const Category = styled.li`
  font-size: 16px;
  font-weight: 300;
`;

const Button = styled.button`
  border: none;
  background: transparent;
  border: solid 2px black;
  width: 180px;
  height: 60px;
  font-size: 20px;
  cursor: pointer;
  transition: ease-in-out background 0.3s;
  font-weight: 400;
  margin: auto;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  @media (max-width: 1350px) {
    margin-top: 15px;
    margin-bottom: 15px;
  }
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
