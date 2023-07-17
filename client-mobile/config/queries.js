import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query Products {
    getProducts {
      id
      name
      slug
      price
      description
      mainImg
      categoryId
      createdAt
      updatedAt

      Category {
        id
        name
        createdAt
        updatedAt
      }
      Images {
        id
        productId
        imgUrl
        updatedAt
        createdAt
      }
    }
  }
`;
export const GET_PRODUCTBYID = gql`
  query Query($id: Int!) {
    getProduct(id: $id) {
      id
      name
      slug
      description
      price
      mainImg
      categoryId
      createdAt
      updatedAt
      authorId
      Author {
        _id
        email
        username
        password
      }
      Category {
        id
        name
        createdAt
        updatedAt
      }
      Images {
        id
        productId
        imgUrl
        createdAt
        updatedAt
      }
    }
  }
`;
