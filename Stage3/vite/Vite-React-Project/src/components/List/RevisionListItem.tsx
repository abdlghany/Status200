interface properties {
    value?: any,
    name?: string
}
export default function RevisionListItem({value, name}:properties){

    return(
            <li className="list-group-item">{name}: {value}</li>
    )
}
