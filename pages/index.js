import React from "react";

import { client } from "../lib/client";
import { Product, FooterBanner, HeroBanner } from "../components";

const Home = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      {console.log(bannerData)}
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
  // console.log(`products ${products}`);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);
  // console.log(`bannerData ${bannerData}`);
  return {
    props: { products, bannerData },
  };
};

export default Home;
