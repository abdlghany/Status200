interface ListItemProps {
    name: string;
}

function ListItem({ name }: ListItemProps) {
    return <li className="list-group-item">{name}</li>;
}

export default ListItem;
a;
