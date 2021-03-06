import Main from 'components/Global/Main'
import * as React from 'react'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from 'stores/BookmarkStore'

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace browser {
  const bookmarks: string[]
}

ReactDOM.render(
  <DndProvider backend={Backend}>
    <Provider store={store}>
      <Main />
    </Provider>
  </DndProvider>,
  document.getElementById('app')
)
