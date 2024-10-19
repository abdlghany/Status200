import './App.css'
import Page from './components/Page'
import RevisionListGroup from './components/List/RevisionListGroup'

const myList = ["Item 1", "Item 2", "Item 30", "Item 40", "..."];
const items = [
  {
    label: "Karel",
    value: "15"
  },
  {
    label: "Ferry",
    value: "25"
  },
  {
    label: "Aboo",
    value: "38"
  }
]
function App() {
  return (
    <div className='m-4s'>
      <Page/>
        <RevisionListGroup name="My List" ListItems={items}/>
    </div>
  )
}

export default App
