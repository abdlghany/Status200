export default function Body(
      {BodyClasses, TitleText, AboutText, liClasses, aClasses, lis, ulClasses, hashTag, profilePicture, imgClasses, hashTagClasses,
             TitleClasses, AboutClasses, ProfilePictureClasses, SocialMediaClasses, leftSide}:
      {BodyClasses?:string, TitleText?:string, AboutText?:string, liClasses?:string, aClasses?:string, lis:any, ulClasses?:string,
            hashTag?:string, profilePicture?:string, imgClasses?:string, hashTagClasses?:string, TitleClasses?:string, AboutClasses?:string,
            ProfilePictureClasses?:string, SocialMediaClasses?:string, leftSide?:string}) {
    return (
      <div className={BodyClasses}>
          <div className={leftSide}>
            <Title TitleText = {TitleText}
                   TitleClasses = {TitleClasses}/>
            <About AboutText = {AboutText} 
                   AboutClasses = {AboutClasses}/>
            <div className="mt-auto">
            <HashTag hashTag={hashTag} 
                     hashTagClasses = {hashTagClasses}/>
            <SocialMedia
                  SocialMediaClasses = {SocialMediaClasses} 
                  liClasses = {liClasses}
                  aClasses = {aClasses}
                  lis = {lis}
                  ulClasses = {ulClasses}
                  imgClasses = {imgClasses}
            />
            </div>
          </div>
          <ProfilePicture 
          imgSrc={profilePicture}
          ProfilePictureClasses = {ProfilePictureClasses}
          />
      </div>
    )
}

function Title({TitleText, TitleClasses}:{TitleText?:string, TitleClasses?:string}){
      return (
            <h1 className={TitleClasses}>{TitleText}</h1>
      )
}

function About({AboutText, AboutClasses}:{AboutText?:string, AboutClasses?:string}){
      return(
            <p className={AboutClasses}>{AboutText}</p>
      )
}

function ProfilePicture({imgSrc, ProfilePictureClasses}: {imgSrc?: string, ProfilePictureClasses?:string}){
      return(
            <img src={imgSrc} alt="Profile Picture" className={ProfilePictureClasses}/>
      )
}

function HashTag({hashTag, hashTagClasses}:{hashTag?: string, hashTagClasses?:string}){
      return (
            <p className={hashTagClasses}>{hashTag}</p>
      )
}

function SocialMedia({liClasses, aClasses, lis, ulClasses,imgClasses, SocialMediaClasses}:
      {liClasses?:string, aClasses?:string, lis?:any, ulClasses?:string, imgClasses?:string, SocialMediaClasses?:string}){
      return (
      <div className={SocialMediaClasses}>
            <ul className={ulClasses}>
                  {lis.map(
                        (item: any) =>
                        <li className={liClasses}>
                              <a href={item.href} className={aClasses} target="_blank"><img src={item.src} alt={item.src} className={imgClasses}/></a>
                              </li>
                  )}
            </ul>
      </div>
      )
}
