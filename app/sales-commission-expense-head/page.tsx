'use client'
import { useGetSalesTrip, useGetYear } from '@/hooks';
import React from 'react'
import CommissionExpenseHeadFilters from './_components/CommissionExpenseHeadFilters';
import CommissionExpenseHeadTable from './_components/CommissionExpenseHeadTable';
import { Heading } from '@/components/Heading';

const sampleData = [
    {
        grouping_name: "Group A",
        grouping_place: "Place A",
        grouping_host: "Host A",
        grouping_event: "Event A",
        grouping_fromdate: "2024-04-01",
        grouping_todate: "2024-04-10",
        grouping_status: "Active",
        grouping_closedate: "2024-04-15",
        host_sales_commision: 10,
        other_host_sales_commision: 5,
        new_size_meas_commission: 8,
        old_size_meas_commission: 6
    },
    {
        grouping_name: "Group B",
        grouping_place: "Place B",
        grouping_host: "Host B",
        grouping_event: "Event B",
        grouping_fromdate: "2024-05-01",
        grouping_todate: "2024-05-10",
        grouping_status: "Inactive",
        grouping_closedate: "2024-05-15",
        host_sales_commision: 12,
        other_host_sales_commision: 6,
        new_size_meas_commission: 9,
        old_size_meas_commission: 7
    },
];
const page = () => {
    const getSalesTrip = useGetSalesTrip('salestripactive', { fromdate: '', todate: '' });
    const getYear = useGetYear();
    const [searchFilter, setSearchFilter] = React.useState({ year: '2024', salestrip: '', search: '' });
    console.log(searchFilter);
    return (
        <div>
            <Heading text="Sales Commission Expense Head" />
            <CommissionExpenseHeadFilters getSalesTrip={getSalesTrip} getYear={getYear} searchFilter={searchFilter} setSearchFilter={setSearchFilter} />
            <div className="my-4"> <CommissionExpenseHeadTable comissionDetails={sampleData} /></div>
        </div>
    )
}

export default page