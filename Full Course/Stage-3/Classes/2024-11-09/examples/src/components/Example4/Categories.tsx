import { useEffect, useState } from "react";
import categoryData from "../../data/categories.json";
import ProductList from "./ProductList";

interface Category {
    id: number;
    name: string;
}

const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setactiveCategory] = useState<Category | null>(null);

    // The code inside this useEffect will run when the component mounts
    useEffect(() => {
        // Pretend to fetch data from an API (1 second delay)
        setTimeout(() => {
            setCategories(categoryData);
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return <div className="p-4">Loading category data...</div>;
    }

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
