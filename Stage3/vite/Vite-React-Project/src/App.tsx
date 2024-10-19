import './App.css'
import Page from './components/Page'
import RevisionListGroup from './components/List/RevisionListGroup'

const myList = ["Item 1", "Item 2", "Item 30", "Item 40", "..."];
function App() {
  return (
    <>
      <Page/>
      <RevisionListGroup name="My List" ListItems={myList}/>
    </>
  )
}

export default App
