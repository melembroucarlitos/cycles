export function getStrapiURL(path) {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path) {
  const requestUrl = getStrapiURL(path);
  const response = await fetch(requestUrl);
  const data = await response.json();
  return data;
}

export async function getCategories() {
  const categories = await fetchAPI("/categories");
  return categories;
}

export async function getCategory(slug) {
  const categories = await fetchAPI(`/categories?slug=${slug}`);
  return categories?.[0];
}

export async function getProducts() {
  const products = await fetchAPI("/products");
  return products;
}

export async function getProduct(slug) {
  const products = await fetchAPI(`/products?slug=${slug}`);
  return products?.[0];
}

export async function getOrders(token) {
  const url = getStrapiURL("/orders");
  const orders = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await orders.json();
  return data;
}

export const postOrder = (token) => (stripe) => async (product) => {
  const url = getStrapiURL("/orders");
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ product }),
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const session = await res.json();
  const result = await stripe.redirectToCheckout({
    sessionId: session.id,
  });

  return result;
};

export const postOrderConfirm = async (session_id) => {
  const url = getStrapiURL("/orders/confirm");
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ checkout_session: session_id }),
  });

  const data = await res.json();
  return data;
};
