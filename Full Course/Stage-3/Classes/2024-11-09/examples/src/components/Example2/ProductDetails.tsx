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
