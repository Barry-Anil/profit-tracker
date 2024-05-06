'use client';
import useDataProvider from '@/hooks/useDataProvider';
import React from 'react';
import ProductionExpenseCard from './ProductionExpenseCard';
import ProductsCard from './ProductsCard';
import { Button } from '@/components/ui/button';
import ProductionExpenseToolbar from './ProductionExpenseToolbar';
import { Heading } from '@/components/Heading';
import usePostProvider from '@/hooks/usePostProvider';
import { toast } from 'sonner';

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
        querykey: ['all-products-prod-exp'],
        endpoint: 'api/fabric-types/products'
    })

    const fetchProductionOptions = useDataProvider({
        querykey: ['production-options'],
        endpoint: 'api/expense/type/id?expensetype=PR'
    })

    const fetchProductionExpenses = useDataProvider({
        querykey: ['production-expenses'],
        endpoint: 'api/operating-costs/fetch?expensetype=PR&categoryname=Production&categorytype=P'
    })

    console.log(fetchProductionExpenses);

    const addNewExpenseHead = usePostProvider()

    function handleExpenseHeadSubmit(payload: ExpenseData) {
        addNewExpenseHead.mutateAsync({
            method: 'POST',
            endpoint: 'api/operating-costs/new',
            payload: payload
        }, {
            onSuccess: () => {
                fetchProductionExpenses.refetch()
                toast.success('Expense Head Added Successfully')
                setShowDialog(false)
            },
            onError: (error) => {
                toast.error('Error Adding Expense Head')
            }
        })
    }

    console.log(fetchProductionExpenses, 'fetchProductionExpenses');
    const nextSortOrder = 10;
    // const nextSortOrder = fetchProductionExpenses?.data?.data?.length > 0 ? Math.max(...fetchProductionExpenses?.data?.data?.map((obj: any) => obj.sortorder)) + 10 : 10;


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
            {showDialog && <ProductionExpenseToolbar options={fetchProductionOptions?.data?.data} setShowDialog={setShowDialog} productsData={fetchAllProducts} sortorder={nextSortOrder} handleExpenseHeadSubmit={handleExpenseHeadSubmit} />}
            <div className='flex gap-4 w-full'>
                <ProductsCard selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} productsData={fetchAllProducts} />
                <ProductionExpenseCard selectedProduct={selectedProduct} expenseData={fetchProductionExpenses} />
            </div></>
    )
}

export default Wrapper


