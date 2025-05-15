import { useEffect, useState } from "react";
import productData from "../../data/products.json";
import ProductDetails from "./ProductDetails";

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

interface ProductListProps {
    category: Category;
}

const ProductList = ({ category }: ProductListProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeProduct, setActiveProduct] = useState<Product | null>(null);

    // The code inside this useEffect will run when the category prop changes
    useEffect(() => {
        // Pretend to fetch data from an API (1 second delay)
        const timeout = setTimeout(() => {
            // Filter products based on category
            setProducts(
                productData.filter(
                    (product) => product.categoryId === category.id
                )
            );

            // Just for visual feedback
            setLoading(false);
        }, 1000);

        // The code below runs immediately, because it's not inside a setTimeout

        // Just for visual feedback
        setLoading(true);

        // Reset active product
        setActiveProduct(null);

        // Clean up by clearing the timeout on component unmount or category change
        return () => clearTimeout(timeout);
    }, [category]);

    if (loading) {
        return (
            <div className="p-4">
                Loading product data for category {category.name}...
            </div>
        );
    }

    return (
        <>
            <div className="p-4">
                <h2>Products in {category.name}</h2>
                <div className="list-group">
                    {products.map((product) => (
                        <a
                            href="#"
                            key={`product-${product.id}`}
                            className={`list-group-item list-group-item-action ${
                                product.id === activeProduct?.id ? "active" : ""
                            }`}
                            onClick={() => setActiveProduct(product)}
                        >
                            {product.name}
                        </a>
                    ))}
                </div>
            </div>
            {activeProduct ? <ProductDetails product={activeProduct} /> : ""}
        </>
    );
};

export default ProductList;
