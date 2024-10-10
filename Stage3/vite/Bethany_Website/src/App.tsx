import './App.css'
import Header from './components/header.tsx'
import Body from './components/body.tsx'

function App() {
  const lis:any = [
    {name:"BIO", href:"#"},
    {name:"PORTFOLIO", href:"#"},
    {name:"PODCAST", href:"#"},
    {name:"BLOG", href:"#"}
  ];
  const socialMedia:any = [
    {href:"#", src:"./src/assets/instagram.png"},
    {href:"#", src:"./src/assets/facebook.png"},
    {href:"#", src:"./src/assets/twitter.png"},
    {href:"#", src:"./src/assets/linkedin.png"}
  ];
  return (
    <div className="bg-primary">
     <Header liClasses="list-group-item bg-primary align-middle"
             aClasses="decoration-none text-black link-underline-opacity-0 link-underline fw-bold"
             lis = {lis}
             ulClasses="list-group list-group-flush bg-primary d-flex justify-content-around flex-row"/>
     <Body  BodyClasses="border border-1 border-black p-4 d-flex flex-row"
            TitleText='Bethany Jones'
            AboutText = "I'm a dedicated cultire critic and blogger located in San Francisco, California."
            profilePicture="./src/assets/profilepic.png"
            liClasses='list-group-item bg-primary align-middle'
            aClasses='decoration-none text-black link-underline-opacity-0 link-underline'
            ulClasses='list-group d-flex flex-row'
            imgClasses = "w-50"
            lis={socialMedia}
            hashTag="@reallygreatsite"
            hashTagClasses = "fw-bold"
            titleClasses = "fw-bold"
     />
    </div>
  )
}

export default App
