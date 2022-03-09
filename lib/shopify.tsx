import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";
// import fetch, { RequestInit } from 'node-fetch'

const domain = process.env.SHOPIFY_STORE_DOMAIN;

const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN;

interface RequestInit {
  options: {
    endpoint: string;
    method: string;
    headers: {
        "X-Shopify-Storefront-Access-Token": string | undefined;
        Accept: string;
        "Content-Type": string;
    };
    body: JSON | null;
}
}

async function ShopifyData(query:string) {
  const URL = `https://${domain}/api/2022-01/graphql.json`;

  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };
  try {


    const data = await fetch(URL, options)
    .then((response:any) => {
      return response.json();
    });
    return data;
  } catch (error) {
    console.log("Product not fetched", error);
  }
}

export async function getProductsInCollection() {
  const query = `
  {
    collection(handle:"frontpage"){
      title
      products(first:25){
        edges{
          node{
              id
            title
            handle
            priceRange{
                minVariantPrice{
                  amount
                }
              }
            images(first:5){
              edges{
                node{
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }`;

  const response = await ShopifyData(query);

  const allProducts = response.data.collection.products.edges
    ? response.data.collection.products.edges
    : [];

  return allProducts;
}

export async function getAllProducts() {
  const query = `
  {
    products(first:25){
      edges {
        node {
          handle
          id
          
        }
      }
    }
  }`;

  const response = await ShopifyData(query);

  const slugs = response.data.products.edges
    ? response.data.products.edges
    : [];

  return slugs;
}

export async function getProduct(handle:any) {
  const query = `
  {
    product(handle:"${handle}"){
      id
      title
      handle
      description
      images(first:5){
        edges{
          node{
            url
            altText
          }
        }
      }
      options{
        name
        values
        id
      }
      variants(first:25){
        edges{
          node{
            selectedOptions{
              name
              value
            }
            image{
              altText
            }
            title
            id
            priceV2{
              amount
            }
          }
        }
      }
    }
  }`;

  const response = await ShopifyData(query);

  const product = response.data.product ? response.data.product : [];

  return product;
}
