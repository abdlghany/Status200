import { useEffect, useState } from "react";

interface Product {
    id: number;
    name: string;
    categoryId: number;
    price: number;
    stock: number;
    description: string;
}

interface ProductDetailsProps {
    product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
    const [loading, setLoading] = useState(true);

    // The code inside this useEffect will run when the product prop changes
    useEffect(() => {
        // Pretend to fetch data from an API (1 second delay)
        const timeout = setTimeout(() => {
            // Just for visual feedback
            setLoading(false);
        }, 1000);

        // The code below runs immediately, because it's not inside a setTimeout

        // Just for visual feedback
        setLoading(true);

        // Clean up by clearing the timeout on component unmount or product change
        return () => clearTimeout(timeout);
    }, [product]);

    if (loading) {
        return <div className="p-4">Loading product details...</div>;
    }

    return (
        <>
            <div className="p-4">
                <h2>Details</h2>
                <ul className="list-group">
                    <li className="list-group-item">
                        <strong>ID</strong>: {product.id}
                    </li>
                    <li className="list-group-item">
                        <strong>Name</strong>: {product.name}
                    </li>
                    <li className="list-group-item">
                        <strong>Price</strong>: {product.price}
                    </li>
                    <li className="list-group-item">
                        <strong>Stock</strong>: {product.stock}
                    </li>
                    <li className="list-group-item">
                        <strong>Description</strong>: {product.description}
                    </li>
                </ul>
            </div>
        </>
    );
};

export default ProductDetails;
