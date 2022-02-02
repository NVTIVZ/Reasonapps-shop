import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'urql';

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

const ProductPage = () => {
  const router = useRouter();

  const slug = router.query.id as string;

  const [result, reexecuteQuery] = useQuery({
    query: ItemQuery,
    variables: { slug },
    pause: !slug,
  });

  const { data, fetching, error } = result;
  console.log(slug);
  console.log(data);
  console.log(fetching);

  if (fetching) {
    return <div>loading</div>;
  }

  return <div>{data ? data.products[0].name : ''}</div>;
};

export default ProductPage;
