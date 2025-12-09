"use client";
import Image from "next/image";
import Link from "next/link";
import { getImagePath } from "@/lib/utils";

// MIDDLE LINKS DATA
interface ProductType {
  id: number;
  link: string[];
}

const products: ProductType[] = [
  {
    id: 1,
    link: ["Home", "Shop"],
  }
];

const footer = () => {
  return (
    <div className="bg-darkblue">
      <div className="mx-auto max-w-2xl pt-48 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="my-24 grid grid-cols-1 gap-y-10 gap-x-16 sm:grid-cols-2 lg:grid-cols-12 xl:gap-x-8">
          {/* COLUMN-1 */}

          <div className="col-span-4 md:col-span-12 lg:col-span-4">
            <img
              src={getImagePath("/assets/footer/footer-logo.png")}
              alt="logo"
              className="pb-8 w-1/2"
            />
            <div className="flex gap-4">
              <Link
                href="#!"
                onClick={(e) => e.preventDefault()}
                className="footer-fb-icons"
              >
                <Image
                  src={getImagePath("/assets/footer/facebook.svg")}
                  alt="facebook"
                  width={15}
                  height={20}
                />
              </Link>
              <Link
                href="#!"
                onClick={(e) => e.preventDefault()}
                className="footer-icons"
              >
                <Image
                  src={getImagePath("/assets/footer/twitter.svg")}
                  alt="twitter"
                  width={20}
                  height={20}
                />
              </Link>
              <Link
                href="#!"
                onClick={(e) => e.preventDefault()}
                className="footer-icons"
              >
                <Image
                  src={getImagePath("/assets/footer/instagram.svg")}
                  alt="instagram"
                  width={20}
                  height={20}
                />
              </Link>
            </div>
          </div>

          {/* CLOUMN-2/3 */}

          {products.map((product) => (
            <div
              key={product.id}
              className="group relative col-span-2 md:col-span-4 lg:col-span-2"
            >
              <ul>
                {product.link.map((link: string, index: number) => (
                  <li key={index} className="mb-5">
                    <Link
                      href="/"
                      className="text-white text-sm font-normal mb-6 space-links"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CLOUMN-4 */}

          <div className="col-span-4 md:col-span-4 lg:col-span-4">
            <div className="flex gap-2">
              <Image
                src={getImagePath("/assets/footer/mask.svg")}
                alt="mask-icon"
                width={24}
                height={24}
              />
              <h5 className="text-base font-normal text-offwhite">
                Systems ltd
              </h5>
            </div>
            <div className="flex gap-2 mt-10">
              <Image
                src={getImagePath("/assets/footer/telephone.svg")}
                alt="telephone-icon"
                width={24}
                height={24}
              />
              <h5 className="text-base font-normal text-offwhite">
                + 92 303 7707234
              </h5>
            </div>
            <div className="flex gap-2 mt-10">
              <Image
                src={getImagePath("/assets/footer/email.svg")}
                alt="email-icon"
                width={24}
                height={24}
              />
              <h5 className="text-base font-normal text-offwhite">
                mabrarnoor.shami@systemsltd.com
              </h5>
            </div>
          </div>
        </div>

        {/* All Rights Reserved */}

        <div className="py-10 lg:flex items-center justify-between border-t border-t-bordertop">
          <h4 className="text-offwhite text-sm text-center lg:text-start font-normal">
            @2025. All Rights Reserved by{" "}
          </h4>

        </div>
      </div>
    </div>
  );
};

export default footer;
