export interface IBookmark {
  url: string
  title: string
  description: string
  img: string
  logo: string
}

export type IBookmarkCreate = Pick<IBookmark, 'title' | 'description' | 'url'>
