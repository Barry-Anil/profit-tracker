import DateRangePicker from '@/components/DateRangePicker';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, Search } from 'lucide-react';
import React from 'react';

const TravelExpenseHeadsFilter = () => {

    const [fromDate, setFromDate] = React.useState<any>(new Date());
    const [toDate, setToDate] = React.useState<any>(new Date());



    const fromDateFormatted = fromDate ? format(fromDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd');
    const toDateFormatted = toDate ? format(toDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd');
    return (
        <>
            <div className='flex items-center gap-4 '>
                <div className='flex flex-col'>
                    <p className=" font-medium">Select Expense:</p>
                    <Select value='' onValueChange={(value) => { }}>
                        <SelectTrigger className="min-w-[200px] max-w-[280px] ">
                            <SelectValue placeholder="Select Expense" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Salesperson Travel" className="flex gap-2">
                                    Salesperson Travel
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex flex-col'>
                    <p className=" font-medium">From Date - To Date</p><DateRangePicker fromDate={fromDate} toDate={toDate} setFromDate={setFromDate} setToDate={setToDate} />
                </div>

                <div className='flex flex-col'>
                    <p className=" font-medium"> &nbsp;</p> <Button><Search /></Button></div>
            </div>
        </>
    );
};

export default TravelExpenseHeadsFilter;
