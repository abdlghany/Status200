interface ListItemProps {
    item: { label: string; value: string; active: boolean };
}

function ListItem({ item }: ListItemProps) {
    return (
        <li className={`list-group-item ${item.active ? "active" : null}`}>
            {item.label}: {item.value}
        </li>
    );
}

export default ListItem;
