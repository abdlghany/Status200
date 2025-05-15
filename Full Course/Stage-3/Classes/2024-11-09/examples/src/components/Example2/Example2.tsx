import Categories from "./Categories";

const Example2 = () => {
    const categoryData = [
        { id: 1, name: "Electronics" },
        { id: 2, name: "Clothing" },
    ];

    const productData = [
        {
            id: 1,
            name: "Laptop",
            categoryId: 1,
            price: 500,
            stock: 10,
            description: "This is a laptop",
        },
        {
            id: 2,
            name: "Mobile",
            categoryId: 1,
            price: 200,
            stock: 20,
            description: "This is a mobile",
        },
        {
            id: 3,
            name: "Televison",
            categoryId: 1,
            price: 1000,
            stock: 5,
            description: "This is a televison",
        },
        {
            id: 4,
            name: "Shirt",
            categoryId: 2,
            price: 50,
            stock: 50,
            description: "This is a shirt",
        },
        {
            id: 5,
            name: "T-Shirt",
            categoryId: 2,
            price: 20,
            stock: 100,
            description: "This is a t-shirt",
        },
        {
            id: 6,
            name: "Jeans",
            categoryId: 2,
            price: 70,
            stock: 30,
            description: "This is a jeans",
        },
    ];

    return <Categories categoryData={categoryData} productData={productData} />;
};

export default Example2;
