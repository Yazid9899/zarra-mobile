const { APP_SERVICE_URL, USER_SERVICE_URL } = require("../config/api");
const redis = require("../config/redisConfig");

const axios = require("axios");
const typeDefs = `#graphql

type Product {
  id: ID!
  name: String!
  slug: String!
  description: String!
  price: Int!
  mainImg: String!
  categoryId: ID!
  createdAt: String!
  updatedAt: String!
  authorId: String!
  Author: Author!
  Category: Category!
  Images: [Image!]!
  
  }
type Author{
  _id:String!
  email:String!
  username:String!
  password:String!
  }
type Category {
  id: ID!
  name: String!
  createdAt: String!
  updatedAt: String!
  }

type Image {
  id: ID!
  productId: ID!
  imgUrl: String!
  createdAt: String!
  updatedAt: String!
  }


type MutationRes {
    statusCode: Int
    message: String
  }

input payload {
  name: String!
  description: String!
  price: Int!
  mainImg: String!
  categoryId: Int!
  images: [String]
  imageId: [Int]
  }



type Query {
  getProducts: [Product!]!
  getProduct(id: Int!): Product!
}

type Mutation {
  createProduct(input: payload): MutationRes
  deleteProduct(id:Int):MutationRes
  updateProduct(input:payload, id:Int): MutationRes
}


`;

const resolvers = {
  Query: {
    getProducts: async () => {
      const productsCache = await redis.get("products:get");
      if (productsCache) {
        return JSON.parse(productsCache);
      }

      const { data } = await axios.get(`${APP_SERVICE_URL}/products`);

      redis.set("products:get", JSON.stringify(data.data));

      return data.data;
    },
    getProduct: async (_, { id }) => {
      const { data } = await axios.get(`${APP_SERVICE_URL}/products/${id}`);
      const { data: userData } = await axios.get(
        `${USER_SERVICE_URL}/users/${data.data.authorId}`
      );
      data.data.Author = userData.data;
      return data.data;
    },
  },
  Mutation: {
    createProduct: async (_, { input }) => {
      const { data: newProduct } = await axios.post(
        `${APP_SERVICE_URL}/products`,
        input
      );
      redis.del("products:get");

      return newProduct;
    },
    deleteProduct: async (_, { id }) => {
      const { data } = await axios.delete(`${APP_SERVICE_URL}/products/${id}`);
      redis.del("products:get");

      return data;
    },
    updateProduct: async (_, { input, id }) => {
      const { data } = await axios.put(
        `${APP_SERVICE_URL}/products/${id}`,
        input
      );
      redis.del("products:get");

      return data;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
