import React from 'react';
interface Properties {
  items: string[];
  active?: number;
}

const UnorderedList: React.FC<Properties> = ({ items, active = 0 }) => {
  return (
    <ul className="list-group">
      {items.map((item: any, index: number) => (
        <li
          key={index}
          className={`list-group-item ${index === active ? 'active' : ''}`}
        >
          {index + 1}. {item}
        </li>
      ))}
    </ul>
  );
};

export default UnorderedList;
