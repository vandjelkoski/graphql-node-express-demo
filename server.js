var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String
    hanSolo: Hero
    heroes: [Hero]
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
var heroes = [
    new Hero(1, "Han Solo"), 
    new Hero(2, "Luke Skywalker"), 
    new Hero(3, "R2-D2"),
    new Hero(4, "Darth Vader")
]

var root = { 
    hello: () => 'Hello world!',
    hanSolo: () => heroes[0],
    heroes: () => heroes  
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));