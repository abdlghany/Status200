export default function Header({liClasses, aClasses, lis, ulClasses}:{liClasses:string, aClasses:string, lis:any, ulClasses:string}) {
  return (
        <ul className={ulClasses}>
            {lis.map(
              (item: any) => <li className={liClasses}><a href={item.href} className={aClasses}>{item.name}</a></li>
            )}
        </ul>
  )
}
