'use client';
import { Heading } from '@/components/Heading';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
// import { useGetSalesTrip, useGetYear } from '@/hooks';
import { Button } from '@/components/ui/button';
import useGetYear from '@/hooks/Years/useGetYear';
import useGetSalesTrip from '@/hooks/salesTrip/useGetSalesTrip';
import React, { useEffect } from 'react';
import AddModifyShippingCostForm from './_components/AddModifyShippingCostForm';
import SalesTripListCard from './_components/SalesTripListCard';
import ShippingCostCard from './_components/ShippingCostCard';
import useDataProvider from '@/hooks/useDataProvider';
import usePostProvider from '@/hooks/usePostProvider';
import { toast } from 'sonner';
type ShippingData = {
    productname: string;
    productid: number;
    expense_type: 'SH';
    category_name: string;
    category_type: 'S';
    subcategory_name: string;
    currency: string;
    total_cost: number;
    narration: string;
    sortorder: number;
    total_weight: number;
};
const DefineShippingCostPerProduct = () => {
    const [year, setYear] = React.useState('2024');
    const [showDialog, setShowDialog] = React.useState(false)
    const getYear = useGetYear();
    const getSalesTrip = useGetSalesTrip('salestripactive', { fromdate: '', todate: '' });

    const [selectedSalesTrip, setSelectedSalesTrip] = React.useState({
        salestrip_name: '',
    });

    console.log(selectedSalesTrip, 'selectedSalesTrip');

    const fetchAllProducts = useDataProvider({
        querykey: ['all-products-ship-exp'],
        endpoint: 'api/fabric-types/products'
    })

    const fetchShippingOptions = useDataProvider({
        querykey: ['shipping-options'],
        endpoint: 'api/expense/type/id?expensetype=SH'
    })

    const fetchShippingExpenses = useDataProvider({
        querykey: ['production-expenses'],
        endpoint: 'api/operating-costs/fetch?expensetype=SH&categoryname=Shipping&categorytype=S'
    })

    const addNewShippingHead = usePostProvider()
    function handleShippingHeadSubmit(payload: ShippingData) {
        addNewShippingHead.mutateAsync({
            method: 'POST',
            endpoint: 'api/operating-costs/new',
            payload: payload
        }, {
            onSuccess: () => {
                fetchShippingExpenses.refetch()
                toast.success('Expense Head Added Successfully')
                setShowDialog(false)
            },
            onError: (error) => {
                toast.error('Error Adding Expense Head')
            }
        })
    }

    const filteredData =
        getSalesTrip &&
        getSalesTrip?.data?.filter((item: any) => {
            const yearFromDate = new Date(item.createdAt).getFullYear();
            return yearFromDate == Number(year);
        });

    useEffect(() => {
        if (filteredData?.length != 0) {
            setSelectedSalesTrip({ salestrip_name: filteredData?.[0]?.salestrip_name });
        }
    }, [year, filteredData?.length]);

    return <div>
        <Heading text='Define Shipping Cost Per Product' />
        <div className="flex items-center justify-between">
            <div>
                <p className=" font-medium">Select Year</p>
                <Select
                    value={year}
                    onValueChange={(value) => {
                        setYear(value);
                    }}
                >
                    <SelectTrigger className="w-[200px] ">
                        <SelectValue placeholder="Select Supplier" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {getYear &&
                                getYear?.data?.map((item: {
                                    year: number;
                                }) => (
                                    <SelectItem key={item.year} value={String(item.year)} className="flex gap-2">
                                        {item.year}
                                    </SelectItem>
                                ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className='flex items-baseline'>
                {!showDialog && <Button onClick={() => {
                    setShowDialog(true)
                }}>+Add / Modify Shipping Cost
                </Button>}
            </div>
        </div>
        {showDialog && <AddModifyShippingCostForm salestripData={getSalesTrip} options={fetchShippingOptions?.data?.data} productsData={fetchAllProducts} setShowDialog={setShowDialog} sortorder={10} handleShippingHeadSubmit={handleShippingHeadSubmit} />}
        <div className="flex gap-4 mt-4">
            <SalesTripListCard selectedSalesTrip={selectedSalesTrip} setSelectedSalesTrip={setSelectedSalesTrip} salestripData={filteredData} />
            <ShippingCostCard selectedSalesTrip={selectedSalesTrip} shippingCostData={fetchShippingExpenses} />
        </div>
    </div>;
};

export default DefineShippingCostPerProduct;

const shippingCostData = [
    {
        "sr_no": 1,
        "productname": "Product A",
        "category_name": "Category X",
        "subcategory_name": "Sub-category 1",
        "weight": 5,
        "currency": "USD",
        "unit_cost": 10.5,
        "narration": "Sample narration 1"
    },
    {
        "sr_no": 2,
        "productname": "Product B",
        "category_name": "Category Y",
        "subcategory_name": "Sub-category 2",
        "weight": 10,
        "currency": "EUR",
        "unit_cost": 20.75,
        "narration": "Sample narration 2"
    }
]
