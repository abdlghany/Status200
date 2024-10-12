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
    {href:"https://www.instagram.com", src:"./src/assets/instagram.png"},
    {href:"https://www.facebook.com", src:"./src/assets/facebook.png"},
    {href:"https://www.twitter.com", src:"./src/assets/twitter.png"},
    {href:"https://www.linkedin.com", src:"./src/assets/linkedin.png"}
  ];
  return (
    <div className = "bg-primary d-flex flex-column justify-content-around" style={{ height: '80vh' }}>
     <Header liClasses = "list-group-item bg-primary align-middle fs-5"
             aClasses = "decoration-none text-black link-underline-opacity-0 link-underline fw-bold"
             lis = {lis}
             ulClasses = "list-group list-group-flush bg-primary d-flex justify-content-around flex-row"/>
    <Body  
          BodyClasses = "border border-1 border-black p-4 d-flex flex-row h-75 text-start ps-5"
          TitleText = "Bethany Jones"
          TitleClasses = "fw-semibold fs-1"
          AboutText = "I'm a dedicated culture critic and blogger located in San Francisco, California."
          AboutClasses = "fs-3"
          profilePicture = "./src/assets/profilepic.png"
          aClasses = "decoration-none text-black link-underline link-underline-opacity-0"
          ulClasses = "list-inline p-0 d-flex flex-row justify-content-start"
          imgClasses = "mw-100 image me-3"
          lis={socialMedia}
          liClasses = "list-inline-item p-0 m-0 bg-primary"
          hashTag = "@reallygreatsite"
          hashTagClasses ="fw-bold fs-5"
          leftSide="d-flex flex-column"
      />
    </div>
  )
}
export default App
