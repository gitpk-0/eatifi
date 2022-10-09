import React from "react";
import Link from "next/link";

import { urlFor } from "../lib/client";

const Product = ({ product: { image, name, slug, price, uom } }) => {
  // const

  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img
            src={urlFor(image && image[0])}
            className="product-image"
            width={250}
            height={250}
          />
          <p className="product-name">{name}</p>
          <p className="product-price">
            ${price} {uom === "each" ? "each" : "/lb"}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
