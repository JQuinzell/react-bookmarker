import { Box, Container, createMuiTheme, CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { getInitial } from 'api'
import Bookmarks from 'components/Bookmarks/Bookmarks'
import * as React from 'react'
import { useBookmarksStore } from 'stores/BookmarkStore'
import AppBar from './AppBar'
import BookmarkFilter from './BookmarkFilter'
import SpeedDialButton from './SpeedDialButton'

const theme = createMuiTheme()

const Main: React.FunctionComponent = () => {
  const [{ folders, currentFolderId }, dispatch] = useBookmarksStore()
  const bookmarks = folders.get(currentFolderId)!.bookmarks
  const [filteredBookmarks, setFiltered] = React.useState(bookmarks)

  React.useEffect(() => {
    getInitial().then((data) => {
      dispatch({ type: 'INITIALIZE', ...data })
      setFiltered(data.bookmarks)
    })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl">
        <AppBar />
        <BookmarkFilter bookmarks={bookmarks} onResults={setFiltered} />
        <Bookmarks bookmarks={filteredBookmarks} />
        <Box position="fixed" bottom={0} right={0} m={3}>
          <SpeedDialButton />
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Main
