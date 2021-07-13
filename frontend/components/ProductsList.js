import Link from "next/link";
import { twoDecimals } from "../utils/format";
import { getStrapiMedia } from "../utils/medias";

const ProductsList = ({ products }) => {
  return (
    <div className="grid grid-cols-1 gap-4 m-6 mt-8 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
      {products.map((_product) => (
        <div
          key={_product.id}
          className="bg-gray-100 border rounded-lg shadow-md hover:shadow-lg"
        >
          <Link href={`/products/${_product.slug}`}>
            <a>
              <div className="pt-2 pb-2 bg-white rounded-t-lg">
                <img
                  className="mx-auto crop"
                  src={getStrapiMedia(_product.image.formats.thumbnail.url)}
                  alt={_product.title}
                />
              </div>
              <div className="pt-4 pb-4 pl-4 pr-4 rounded-lg">
                <h4 className="mt-1 text-base font-semibold leading-tight text-gray-700 truncate">
                  {_product.title}
                </h4>
                <div className="mt-1 text-sm text-gray-700">
                  {`$${twoDecimals(_product.price)}`}
                </div>
              </div>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
