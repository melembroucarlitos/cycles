import Head from "next/head";
import { useRouter } from "next/router";
import { useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { getProducts, getProduct, postOrder } from "../../utils/api";
import AuthContext from "../../contexts/AuthContext";
import { twoDecimals } from "../../utils/format";
import { getStrapiMedia } from "../../utils/medias";

const ProductPage = ({ product }) => {
  const { user, getToken } = useContext(AuthContext);
  const router = useRouter();

  const STRIPE_PK =
    process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY ||
    "pk_test_51JCD1cDPr5JW7a1XB1CEkHDV7VJ2aA0jZk0pIH19HVLXLCC5dXKby96pTWCt4BnKmZstDvS5Y0RX9qFRxtHfJNbS00TLLZrIHQ";

  const stripePromise = loadStripe(STRIPE_PK);

  if (router.isFallback) {
    return <div>Loading category...</div>;
  }

  // Not sure if I need a button type for this to work
  const handleClick = async () => {
    if (!user) {
      router.push("/login");
    } else {
      const stripe = await stripePromise;
      const token = await getToken();

      postOrder(token)(stripe)(product);
    }
  };

  // TODO: Have add to cart post to order
  return (
    <div className="grid grid-cols-1 gap-4 m-6 mt-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
      <Head>
        <title>Shop | {product.title}</title>
      </Head>
      <div className="pt-2 pb-2 rounded-t-lg">
        <img
          src={getStrapiMedia(product.image.formats.thumbnail.url)}
          className="m-auto"
          alt={product.title}
        />
      </div>
      <div className="flex flex-col justify-between w-full p-5">
        <div>
          <h4 className="mt-1 text-lg font-semibold leading-tight text-gray-700 truncate">
            {product.title} - ${twoDecimals(product.price)}
          </h4>
          <div className="mt-1 text-gray-600">{product.description}</div>
        </div>

        {product.status === "published" ? (
          <button
            className="px-4 py-2 mt-4 font-semibold text-gray-700 bg-white border border-gray-200 rounded shadow snipcart-add-item d hover:shadow-lg"
            data-item-id={product.id}
            data-item-price={product.price}
            data-item-url={router.asPath}
            data-item-description={product.description}
            data-item-image={getStrapiMedia(
              product.image.formats.thumbnail.url
            )}
            data-item-name={product.title}
            v-bind="customFields"
            onClick={handleClick}
          >
            {user ? "Add to cart" : "Login to start shopping"}
          </button>
        ) : (
          <div className="mb-1 mr-10 text-center" v-else>
            <div
              className="flex items-center p-2 leading-none text-indigo-100 bg-indigo-800 lg:rounded-full lg:inline-flex"
              role="alert"
            >
              <span className="flex px-2 py-1 mr-3 text-xs font-bold uppercase bg-indigo-500 rounded-full">
                Coming soon...
              </span>
              <span className="flex-auto mr-2 font-semibold text-left">
                This article is not available yet.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;

export async function getStaticProps({ params }) {
  const product = await getProduct(params.slug);
  return { props: { product } };
}

export async function getStaticPaths() {
  const products = await getProducts();
  return {
    paths: products.map((_product) => {
      return {
        params: { slug: _product.slug },
      };
    }),
    fallback: true,
  };
}
