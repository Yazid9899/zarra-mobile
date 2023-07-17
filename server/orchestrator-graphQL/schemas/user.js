const { USER_SERVICE_URL } = require("../config/api");

const axios = require("axios");
const typeDefs = `#graphql


type MutationRes {
    statusCode: Int
    message: String
  }

type User{
  _id: String
  email: String
  username: String
}
type UserRes {
statusCode: Int
email: String
  }

input UserPayload{
  email: String
  password: String
  username: String
}

type Query {
  getUsers: [User]
}

type Mutation {
  createUser(input:UserPayload): UserRes
  deleteUser(id:String):MutationRes
}


`;

const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const { data } = await axios.get(`${USER_SERVICE_URL}/users`);
        console.log(data, "USERINI BOYS GRAPHQL");
        return data.data;
      } catch (err) {
        console.log("ERRORRSZZ", err);
      }
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const { data } = await axios.post(`${USER_SERVICE_URL}/users`, input);
      return data;
    },
    deleteUser: async (_, { id }) => {
      const { data } = await axios.delete(`${USER_SERVICE_URL}/users/${id}`);
      return data;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
