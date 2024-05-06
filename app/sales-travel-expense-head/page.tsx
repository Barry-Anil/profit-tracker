'use client';
import React from 'react';
import TravelExpenseHeadForm from './_components/TravelExpenseHeadForm';
import TravelExpenseHeadsFilter from './_components/TravelExpenseHeadsFilter';
import { Button } from '@/components/ui/button';
import TravelExpenseHeadTable from './_components/TravelExpenseHeadTable';
import { Heading } from '@/components/Heading';
import useGetSalesTrip from '@/hooks/salesTrip/useGetSalesTrip';
import useGetYear from '@/hooks/Years/useGetYear';
const travelExpSampleData = [
    {
        "sr_no": 1,
        "date": "2024-04-01",
        "invoice_no": "INV001",
        "expense_head": "Travel",
        "expense_category": "Transportation",
        "currency": "USD",
        "invoice_amount": 500,
        "approved_amount": 450,
        "notes": "Business trip expenses",
        "orderNo": "ORD123",
        "salestrip": "Trip to Client A",
        "grouping": "Sales",
        "salesperson": "John Doe"
    },
    {
        "sr_no": 2,
        "date": "2024-04-05",
        "invoice_no": "INV002",
        "expense_head": "Meals",
        "expense_category": "Client Entertainment",
        "currency": "USD",
        "invoice_amount": 200,
        "approved_amount": 180,
        "notes": "Dinner with potential clients",
        "orderNo": "ORD124",
        "salestrip": "Client Dinner Event",
        "grouping": "Marketing",
        "salesperson": "Jane Smith"
    }
]

const SalesTravellExpenseHead = () => {
    const [travelExpHeadForm, setTravelExpHeadForm] = React.useState<any>({
        year: '2024',
        salesTrip: '',
        grouping: '',
    });

    const [showDialog, setShowDialog] = React.useState(false);

    const getSalesTrip = useGetSalesTrip('salestripactive', { fromdate: '', todate: '' });
    const getYear = useGetYear();
    return (
        <div>
            <Heading text="Sales Travel Expense" />
            <div className="flex items-center justify-between">
                <TravelExpenseHeadsFilter />
                <div className="flex flex-col">
                    <p>&nbsp;</p>
                    {!showDialog && <Button
                        className="w-[200px] text-base"
                        onClick={() => {
                            setShowDialog(true);
                        }}
                    >
                        +Add Expense
                    </Button>}
                </div>
            </div>
            {showDialog && <TravelExpenseHeadForm getYear={getYear} getSalesTrip={getSalesTrip} travelExpHeadForm={travelExpHeadForm} setTravelExpHeadForm={setTravelExpHeadForm} setShowDialog={setShowDialog} />}
            <TravelExpenseHeadTable travelExpenseHeadDetails={travelExpSampleData} />
        </div>
    );
};

export default SalesTravellExpenseHead;
