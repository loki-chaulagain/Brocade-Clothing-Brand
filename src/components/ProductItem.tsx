import React from "react";
import Image from "next/image";
import Link from "next/link";
import products from "../data/banners.json";

export default function ProductItem() {
  return (
    <div className="row d-flex">
      {products &&
        products.map((product: any, id: any) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 card-group ">
            <div className="cursor-pointer card border-0 mb-4">
              <Link href={"/product/bomber-jacket-premium-original-brocade"}>
                <Image
                  src={product.image}
                  objectFit="scale-down"
                  height={500}
                  width={500}
                />
              </Link>

              <div className={`card-body text-center`}>
                <p className="h6 text-uppercase fw-bold">Product Name</p>
                <p className="h6">
                  NPR. 500 &nbsp;<s> 700</s>
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}