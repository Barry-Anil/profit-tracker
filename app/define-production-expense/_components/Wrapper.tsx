'use client';
import React, { useEffect } from 'react'
import ProductsCard from './ProductsCard'
import ProductionExpenseCard from './ProductionExpenseCard'
import useGetAllProducts from '@/hooks/products';
import useDataProvider from '@/hooks/useDataProvider';

const Wrapper = () => {
    const [selectedProduct, setSelectedProduct] = React.useState({
        productId: 12,
        productName: "Jacket/เสื้อสูท",
        productShortName: "J  "
    })

    const fetchAllProducts = useDataProvider({
        queryKey: 'all-products-dp',
        endpoint: 'api/fabric-types/products',
        utilityFunction: (res: any) => {
            console.log(res?.data);
        }
    })


    return (
        <div className='flex gap-4 w-full'>
            <ProductsCard selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} productsData={fetchAllProducts} />
            <ProductionExpenseCard selectedProduct={selectedProduct} expenseData={sampleData} />
        </div>
    )
}

export default Wrapper


const sampleData = [
    {
        productname: 'Jacket',
        category_name: 'Production Cost (Direct)',
        subcategory_name: 'Factory',
        currency: 'THB',
        unit_cost: 10.00,
        notes: 'Machine washable',
    },
    {
        productname: 'Jacket',
        category_name: 'Production Cost (Direct)',
        subcategory_name: 'Factory',
        currency: 'USD',
        unit_cost: 1.00,
        notes: 'Slim fit',
    },
];