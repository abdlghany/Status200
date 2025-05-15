import ListItem from "./ListItem";

interface ListGroupProps {
    name: string;
    items: { label: string; value: string; active: boolean }[];
}

function ListGroup({ name, items }: ListGroupProps) {
    return (
        <>
            <h2>{name} </h2>
            <ul className="list-group">
                {items.map((item) => (
                    <ListItem item={item} />
                ))}
            </ul>
        </>
    );
}

export default ListGroup;
