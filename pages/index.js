import React from "react";

import { client } from "../lib/client";
import { Product, FooterBanner, HeroBanner } from "../components";

const Home = ({ products, bannderData }) => {
  return (
    <>
      {/* {test change} */}
      {/* {test change} */}
      <HeroBanner />
      {console.log(`products ${products}`)}
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Fresh Local Produce</p>
      </div>
      {/*  */}
      <div className="products-container">
        {products?.map((product) => product.name)}
      </div>
      {/*  */}
      <FooterBanner />
    </>
  );
};

// nextjs fetch data method, similar to react useEffect
export const getServerSideProps = async () => {
  const query = '*[_type == "product"]'; // sanity query
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannderData = await client.fetch(bannerQuery);

  return {
    props: { products, bannderData },
  };
};

export default Home;
