import * as express from 'express'
import * as graphqlHTTP from 'express-graphql'
import { buildSchema } from 'graphql'
import BookmarkStore from './bookmarks'

const store = new BookmarkStore()

const schema = buildSchema(`
  type Bookmark {
    url: String
    title: String
    description: String
    img: String
  }

  type Query {
    bookmarks: [Bookmark]
  }
`)

const root = {
  bookmarks: () => {
    return store.data
  }
}

const app = express()

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  if (req.method === 'OPTIONS') {
    return res.send(200)
  } else {
    return next()
  }
})

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
)

app.listen(4000)

console.log('Running server at localhost:4000/graphql')
