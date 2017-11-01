var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String
    hanSolo: Hero
  }
  type Hero {
      id: ID
      name: String!
  }
`);

var Hero = function(id, name){
    this.id = id;
    this.name = name;
}
var root = { 
    hello: () => 'Hello world!',
    hanSolo: () => new Hero(1, "Han Solo")    
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));