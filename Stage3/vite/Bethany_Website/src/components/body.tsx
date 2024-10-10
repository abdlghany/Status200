export default function Body(
      {BodyClasses, TitleText, AboutText, liClasses, aClasses, lis, ulClasses, hashTag, profilePicture, imgClasses, hashTagClasses, titleClasses}:
      {BodyClasses?:string, TitleText?:string, AboutText?:string, liClasses?:string, aClasses?:string, lis:any, ulClasses?:string,
            hashTag?:string, profilePicture?:string, imgClasses?:string, hashTagClasses?:string, titleClasses?:string}) {
    return (
      <div className={BodyClasses}>
          <div>
            <Title TitleText = {TitleText}
                  titleClasses = {titleClasses}/>
            <About AboutText = {AboutText}/>
            <HashTag hashTag={hashTag} hashTagClasses = {hashTagClasses}/>
            <SocialMedia 
                  liClasses = {liClasses}
                  aClasses = {aClasses}
                  lis = {lis}
                  ulClasses = {ulClasses}
                  imgClasses = {imgClasses}
            />
          </div>
          <ProfilePicture imgSrc={profilePicture}/>
      </div>
    )
}

function Title({TitleText, titleClasses}:{TitleText?:string, titleClasses?:string}){
      return (
            <h1 className={titleClasses}>{TitleText}</h1>
      )
}

function About({AboutText}:{AboutText?:string}){
      return(
            <p>{AboutText}</p>
      )
}

function ProfilePicture({ imgSrc }: { imgSrc?: string }){
      return(
            <img src={imgSrc} alt="Profile Picture" />
      )
}

function HashTag({hashTag, hashTagClasses}:{hashTag?: string, hashTagClasses?:string}){
      return (
            <p className={hashTagClasses}>{hashTag}</p>
      )
}

function SocialMedia({liClasses, aClasses, lis, ulClasses,imgClasses}:{liClasses?:string, aClasses?:string, lis?:any, ulClasses?:string, imgClasses?:string}){
      return (
      <ul className={ulClasses}>
            {lis.map(
                  (item: any) =>
                  <li className={liClasses}>
                        <a href={item.href} className={aClasses}><img src={item.src} alt={item.src} className={imgClasses}/></a>
                        </li>
                )}
      </ul>
      )
}
