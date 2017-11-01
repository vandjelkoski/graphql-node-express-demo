var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String
    hanSolo: Hero
    heroes: [Hero]
    hero(episode: Episode!): Hero
  }
  type Hero {
      id: ID
      name: String!
      appearsIn: [Episode]!
  }
  enum Episode {
    NEWHOPE
    EMPIRE
    JEDI
  }
`);

var Hero = function(id, name, episodes = []){
    this.id = id;
    this.name = name;
    this.appearsIn = episodes ;
}

const JEDI = "JEDI";
const EMPIRE = "EMPIRE";


var heroes = [
    new Hero(1, "Han Solo", [JEDI,EMPIRE]), 
    new Hero(2, "Luke Skywalker", [JEDI, EMPIRE]), 
    new Hero(3, "R2-D2", [EMPIRE]),
    new Hero(4, "Darth Vader")
]

var root = { 
    hello: () => 'Hello world!',
    hanSolo: () => heroes[0],
    heroes: () => heroes,
    hero: function(args) {
        return heroes.find(x => x.appearsIn.some(e => e== args.episode));
    }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));