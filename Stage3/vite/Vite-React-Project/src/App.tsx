import UnorderedList from './components/UnorderedList'
import './App.css'
import Counter from './components/Counter'
import BARISProject1 from './components/BuildAReactInfoSiteProject1'
function App() {
  return (
    <>
    <h2>Please enter your credit card number<br/>(example: 58265985236):</h2>
    <Counter/>
    <UnorderedList/>
    <h2>Please enter your credit card number again</h2>
    <Counter/>
    <BARISProject1></BARISProject1>
    </>
  )
}

export default App
