import { useEffect, useState } from "react";
import ProductList from "./ProductList";

interface Category {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    categoryId: number;
    price: number;
    stock: number;
    description: string;
}

interface CategoriesProps {
    categoryData: Category[];
    productData: Product[];
}

const Categories = ({ categoryData, productData }: CategoriesProps) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [activeCategory, setactiveCategory] = useState<Category | null>(null);

    // The code inside this useEffect will run when the categoryData prop changes
    useEffect(() => {
        setCategories(categoryData);
    }, [categoryData]);

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
            {activeCategory ? (
                <ProductList
                    productData={productData}
                    category={activeCategory}
                />
            ) : (
                ""
            )}
        </>
    );
};

export default Categories;
