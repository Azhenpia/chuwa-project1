
const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const createGraphQLServer = require("./graphql.js");

// 定义 GraphQL Schema
const { gql } = require("graphql-tag");

const typeDefs = gql`
  type Query {
    products: [Product]
  }

  type Product {
    name: String!
    price: Float!
    stock: Int!
    imgUrl: String!
  }
`;

module.exports = typeDefs;

