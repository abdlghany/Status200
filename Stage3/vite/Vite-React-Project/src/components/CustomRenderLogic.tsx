import React from 'react';

type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
};

// Generic List component
function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Example usage in a parent component
type User = {
  id: number;
  name: string;
  age: number;
};

const users: User[] = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
  { id: 3, name: 'Charlie', age: 35 },
];

const ParentComponent: React.FC = () => {
  return (
    <div>
      <h2>User List</h2>
      <List
        items={users}
        renderItem={(user) => (
          <div>
            <strong>{user.name}</strong> (Age: {user.age})
          </div>
        )}
      />
    </div>
  );
};

export default ParentComponent;
