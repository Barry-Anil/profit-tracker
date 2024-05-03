'use client';
import useDataProvider from '@/hooks/useDataProvider';
import React from 'react';
import ProductionExpenseCard from './ProductionExpenseCard';
import ProductsCard from './ProductsCard';
import { Button } from '@/components/ui/button';
import ProductionExpenseToolbar from './ProductionExpenseToolbar';
import { Heading } from '@/components/Heading';
import usePostProvider from '@/hooks/usePostProvider';

type ExpenseData = {
    productname: string;
    productid: number;
    expense_type: 'PR';
    category_name: string;
    category_type: 'P';
    subcategory_name: string;
    currency: string;
    total_cost: number;
    narration: string;
    sortorder: number;
};

const Wrapper = () => {
    const [showDialog, setShowDialog] = React.useState(false)
    const [selectedProduct, setSelectedProduct] = React.useState({
        productId: 12,
        productName: "Jacket/เสื้อสูท",
        productShortName: "J  "
    })


    const fetchAllProducts = useDataProvider({
        querykey: ['all-products-dp'],
        endpoint: 'api/fabric-types/products'
    })

    const fetchProductionOptions = useDataProvider({
        querykey: ['production-options'],
        endpoint: 'api/expense/type/id?expensetype=PR'
    })

    const addNewExpenseHead = usePostProvider()

    function handleExpenseHeadSubmit(payload: ExpenseData) {
        addNewExpenseHead.mutate({
            method: 'POST',
            endpoint: 'api/expense/production/new',
            payload: payload
        })
    }


    // const nextSortOrder = typeData?.data?.success?.[0]?.fabric_type.length > 0 ? Math.max(...typeData?.data?.success?.[0]?.fabric_type?.map((obj: any) => obj.sortorder)) + 10 : null;


    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <Heading text="Define Production Expense" />
                <div>
                    {!showDialog && <Button onClick={() => {
                        setShowDialog(true)
                    }}>+Add New Expense
                    </Button>}
                </div>
            </div>
            {showDialog && <ProductionExpenseToolbar options={fetchProductionOptions?.data?.data} setShowDialog={setShowDialog} productsData={fetchAllProducts} sortorder={10} handleExpenseHeadSubmit={handleExpenseHeadSubmit} />}
            <div className='flex gap-4 w-full'>

                <ProductsCard selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} productsData={fetchAllProducts} />
                <ProductionExpenseCard selectedProduct={selectedProduct} expenseData={sampleData} />
            </div></>
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