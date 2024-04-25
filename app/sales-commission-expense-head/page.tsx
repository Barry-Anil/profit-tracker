'use client';
import useGetSalesTrip from '@/hooks/salesTrip/useGetSalesTrip';
import useGetYear from '@/hooks/Years/useGetYear';
import React from 'react';
import CommissionExpenseHeadFilters from './_components/CommissionExpenseHeadFilters';
import CommissionExpenseHeadTable from './_components/CommissionExpenseHeadTable';
import { Heading } from '@/components/Heading';
import useDataProvider from '@/hooks/useDataProvider';

const page = () => {
    const getSalesTrip = useGetSalesTrip('salestripactive', { fromdate: '', todate: '' });
    const getYear = useGetYear();
    const [searchFilter, setSearchFilter] = React.useState({ year: '2024', salestrip: '', search: '' });

    const getCommissionExpenseHeads = useDataProvider({
        endpoint: `api/salestrip/details/grouping?salestripyear=${searchFilter.year}&salestripname=${searchFilter.salestrip}&groupingname=${searchFilter.search}`,
        querykey: ['commissionExpenseHeads', searchFilter.year, searchFilter.salestrip, searchFilter.search],
    });

    console.log(getCommissionExpenseHeads, 'in page');
    return (
        <div>
            <Heading text="Sales Commission Expense Head" />
            <CommissionExpenseHeadFilters getSalesTrip={getSalesTrip} getYear={getYear} searchFilter={searchFilter} setSearchFilter={setSearchFilter} />
            <div className="my-4">
                <CommissionExpenseHeadTable year={searchFilter.year} comissionDetails={getCommissionExpenseHeads} />
            </div>
        </div>
    );
};

export default page;
