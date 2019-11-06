import * as express from 'express'
import * as graphqlHTTP from 'express-graphql'
import schema from './types'
import resolvers from './resolvers'
import * as mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/librarian', {
  useNewUrlParser: true
})

const app = express()

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  } else {
    return next()
  }
})

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
  })
)

app.listen(4000)

console.log('Running server at localhost:4000/graphql')
