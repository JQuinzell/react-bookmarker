import BookmarkCollection from 'models/BookmarkCollection'
import { BookmarkFactory } from '../factories/BookmarkFactory'

describe('BookmarkCollection', () => {
  it('is iterable', () => {
    const bookmarks = [
      BookmarkFactory.build(),
      BookmarkFactory.build(),
      BookmarkFactory.build()
    ]
    const collection = new BookmarkCollection(bookmarks)

    expect([...collection]).toEqual(bookmarks)
  })

  it('filters by tags', () => {
    const [tag1, tag2] = ['tag1', 'tag2']
    const bookmarks = [
      BookmarkFactory.build({ tags: [tag1] }),
      BookmarkFactory.build({ tags: [tag2] }),
      BookmarkFactory.build({ tags: [tag1, tag2] })
    ]
    const [bookmark1, bookmark2, bookmark3] = bookmarks
    const collection = new BookmarkCollection(bookmarks)

    const result = [...collection.withTags([tag1])]

    expect(result).toEqual([bookmark1, bookmark3])
  })
})