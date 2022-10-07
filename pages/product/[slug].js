// dynamic file
import React from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";

import { client, urlFor } from "../../lib/client";

const ProductDetails = ({ product, products }) => {
  // destructure product values
  {
    console.log(product);
  }

  const { image, name, detailts, price } = product;
  const details = detailts; // schema typo fix

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[0])}
              className="product-detail-image"
            />
          </div>
          {/* <div className="small-images-container">
            {image?.map((item, i) => (
              <img src={urlFor(item)} className="" onMouseEnter="" />
            ))}
          </div> */}
        </div>

        <div className="product-details-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  // return the current slug property of the relavent item
  const query = `*[_type == "product"] {
        slug {
            current
        }
    }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

//
export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`; // specific item
  const productsQuery = '*[_type == "product"]'; // all products

  const product = await client.fetch(query); // specific item
  const products = await client.fetch(productsQuery); // all products
  console.log(product);
  console.log(products);
  return {
    props: { products, product },
  };
};

export default ProductDetails;
