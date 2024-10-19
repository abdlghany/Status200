import RevisionListItem from "./RevisionListItem"
interface properties {
    name: string,
    ListItems: {label: string, value: string}[],
}
export default function RevisionListGroup({name, ListItems}:properties){

    return(
        <div className="w-25 m-auto">
            <h2>{name}</h2>
            <ul className="list-group">
                {ListItems?.map(
                    (element) => (
                        <>
                        <RevisionListItem value={element.value} name={element.label}/>
                        </>
                    )
                    
                )}
            </ul>
        </div>
    )
}
