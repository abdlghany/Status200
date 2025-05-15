import { useEffect, useState } from "react";
import categoryData from "../../data/categories.json";
import ProductList from "./ProductList";

interface Category {
    id: number;
    name: string;
}

const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [activeCategory, setactiveCategory] = useState<Category | null>(null);

    // The code inside this useEffect will run when the component mounts
    useEffect(() => {
        setCategories(categoryData);
    }, []);

    return (
        <>
            <div className="p-4">
                <h2>Categories</h2>
                <div className="list-group">
                    {categories.map((category) => (
                        <a
                            href="#"
                            key={`product-${category.id}`}
                            className={`list-group-item list-group-item-action ${
                                category.id === activeCategory?.id
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() => setactiveCategory(category)}
                        >
                            {category.name}
                        </a>
                    ))}
                </div>
            </div>
            {activeCategory ? <ProductList category={activeCategory} /> : ""}
        </>
    );
};

export default Categories;
