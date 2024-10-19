interface properties {
    value?: string
}
export default function RevisionListItem({value}:properties){

    return(
        <>
        <li className="list-group-item">{value}</li>
        </>
    )
}
