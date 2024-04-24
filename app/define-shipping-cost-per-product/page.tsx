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
import { useGetSalesTrip, useGetYear } from '@/hooks';
import React, { useEffect } from 'react';
import SalesTripListCard from './_components/SalesTripListCard';
import ShippingCostCard from './_components/ShippingCostCard';

const DefineShippingCostPerProduct = () => {
    const [year, setYear] = React.useState('2024');

    const getYear = useGetYear();
    const getSalesTrip = useGetSalesTrip('salestripactive', { fromdate: '', todate: '' });

    const [selectedSalesTrip, setSelectedSalesTrip] = React.useState({
        salestrip_name: '',
    });

    console.log(selectedSalesTrip, 'selectedSalesTrip');

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
        <div className="flex gap-4 mt-4">
            <SalesTripListCard selectedSalesTrip={selectedSalesTrip} setSelectedSalesTrip={setSelectedSalesTrip} salestripData={filteredData} />
            <ShippingCostCard selectedSalesTrip={selectedSalesTrip} shippingCostData={shippingCostData} />
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
