import RevisionListItem from "./RevisionListItem"
interface properties {
    name?: string,
    ListItems?: string[]

}
export default function RevisionListGroup({name, ListItems}:properties){

    return(
        <>
            <h2>{name}</h2>
            <ul className="list-group">
                {ListItems?.map(
                    (element) => <RevisionListItem value={element}/>
                )}
            </ul>
        </>
    )
}
