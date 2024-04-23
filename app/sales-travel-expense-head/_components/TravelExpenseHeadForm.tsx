import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

type SelectGroupNameProps = {
    getSalesTrip: any;
    getYear: any;
    travelExpHeadForm?: any;
    setTravelExpHeadForm?: any;
    setShowDialog?: any;

};

type SalesTrip = {
    salestrip_name: string;
};

type Year = {
    year: number;
};


const TravelExpenseHeadForm = ({ getSalesTrip, getYear, travelExpHeadForm, setTravelExpHeadForm, setShowDialog }: SelectGroupNameProps) => {
    const [date, setDate] = React.useState<any>(new Date());
    // const grouping = searchParams.get('grouping') as string;
    const router = useRouter();
    const filteredData =
        getSalesTrip &&
        getSalesTrip?.data?.filter((item: any) => {
            const yearFromDate = new Date(item.createdAt).getFullYear();
            return yearFromDate == Number(travelExpHeadForm?.year);
        });
    return (
        <Card className="space-y-4 my-4 overflow-hidden w-full">
            <CardHeader className="bg-primary p-4 text-white  ">
                <CardTitle>Add / Modify Expense</CardTitle>
            </CardHeader>
            <CardContent >
                <div className="flex flex-wrap gap-4 mb-6">
                    <div className='flex flex-col'>
                        <p className=" font-medium">Date</p>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant={'outline'} className={cn('min-w-[280px] max-w-[300px] justify-start text-left font-normal text-base', !date && 'text-muted-foreground')}>
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, 'PPP') : <span>Date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className='flex flex-col'>
                        <p className=" font-medium">Select Year</p>
                        <Select
                            value={travelExpHeadForm?.year || '2024'}
                            onValueChange={(value) => {
                                setTravelExpHeadForm({ ...travelExpHeadForm, year: value });
                            }}
                        >
                            <SelectTrigger className="min-w-[280px] max-w-[300px] ">
                                <SelectValue placeholder="Select Supplier" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {getYear &&
                                        getYear?.data?.map((item: Year) => (
                                            <SelectItem key={item.year} value={String(item.year)} className="flex gap-2">
                                                {item.year}
                                            </SelectItem>
                                        ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='flex flex-col'>
                        <p className=" font-medium">Select Sales Trip</p>
                        <Select
                            value={travelExpHeadForm?.salestrip || ''}
                            onValueChange={(value) => {
                                setTravelExpHeadForm({ ...travelExpHeadForm, salestrip: value });
                            }}
                        >
                            <SelectTrigger className="min-w-[280px] max-w-[300px]">
                                <SelectValue placeholder="Select Supplier" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {filteredData &&
                                        filteredData?.map((item: SalesTrip) => (
                                            <SelectItem key={item.salestrip_name} value={item.salestrip_name} className="flex gap-2">
                                                {item.salestrip_name}
                                            </SelectItem>
                                        ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* {travelExpHeadForm?.salestrip && ( */}
                    <div className='flex flex-col'>
                        <p className=" font-medium">Select Grouping</p>
                        <Select
                            value={travelExpHeadForm?.grouping}
                            onValueChange={(value) =>
                                setTravelExpHeadForm({
                                    ...travelExpHeadForm,
                                    grouping: value,

                                })
                            }
                        >
                            <SelectTrigger className="min-w-[280px] max-w-[300px] ">
                                <SelectValue placeholder="Select Grouping" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {filteredData &&
                                        filteredData
                                            ?.find((s: any) => s.salestrip_name === travelExpHeadForm?.salestrip)
                                            ?.salestrip_detail?.salestripdetail?.map((group: any) => (
                                                <SelectItem key={group.grouping_name} value={group.grouping_name} className="flex gap-2">
                                                    {group.grouping_name}
                                                </SelectItem>
                                            ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    {/* )} */}
                    {travelExpHeadForm?.salestrip && (
                        <div className='flex flex-col'>
                            <p className=" font-medium"> &nbsp;</p> <Button
                                variant="outline"
                                onClick={() => {
                                    setTravelExpHeadForm({ year: '2024', salestrip: '', grouping: '' });
                                }}
                            >
                                Clear Sales Trip
                            </Button>
                        </div>
                    )}
                </div>
                <div className="flex flex-wrap gap-4 mb-6">
                    <div className='flex flex-col'>
                        <p className=" font-medium">Select Expense Head</p>
                        <Select
                            value={travelExpHeadForm?.expenseHead || ''}
                            onValueChange={(value) => {
                                setTravelExpHeadForm({ ...travelExpHeadForm, expenseHead: value });
                            }}
                        >
                            <SelectTrigger className="min-w-[280px] max-w-[300px]">
                                <SelectValue placeholder="Select Expense Head" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value='Select Expense Head' className="flex gap-2">
                                        Select Expense Head
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='flex flex-col'>
                        <p className=" font-medium">Select Category</p>
                        <Select
                            value={travelExpHeadForm?.category || ''}
                            onValueChange={(value) => {
                                setTravelExpHeadForm({ ...travelExpHeadForm, category: value });
                            }}
                        >
                            <SelectTrigger className="min-w-[280px] max-w-[300px]">
                                <SelectValue placeholder="Select Expense Head" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value='Car Rental' className="flex gap-2">
                                        Car Rental
                                    </SelectItem>
                                    <SelectItem value='Hotel Stay' className="flex gap-2">
                                        Hotel Stay
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='flex flex-col'>
                        <p className=" font-medium">Invoice Number</p>
                        <Input className='min-w-[280px] max-w-[300px] ' placeholder="Invoice Number" value={travelExpHeadForm?.invNo} onChange={
                            (e) => setTravelExpHeadForm({ ...travelExpHeadForm, invNo: e.target.value })
                        } />
                    </div>
                    <div className='flex flex-col'>
                        <p className=" font-medium">Notes</p>
                        <Textarea className='min-w-[280px] max-w-[300px] ' placeholder="Notes" value={travelExpHeadForm?.notes} onChange={
                            (e) => setTravelExpHeadForm({ ...travelExpHeadForm, notes: e.target.value })
                        } />
                    </div>
                </div>
                <div className="flex flex-wrap justify-between gap-4">
                    <div className="grid grid-cols-4 gap-4 ">
                        <div className='flex flex-col w-[100px] max-w-[200px]'>
                            <p className=" font-medium">Currency</p>
                            <Select
                                value={travelExpHeadForm?.currency || 'THB'}
                                onValueChange={(value) => {
                                    setTravelExpHeadForm({ ...travelExpHeadForm, currency: value });
                                }}
                            >
                                <SelectTrigger >
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="THB" className="flex gap-2">
                                            THB
                                        </SelectItem>
                                        <SelectItem value="USD" className="flex gap-2">
                                            USD
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='flex flex-col w-[100px] max-w-[200px]'>
                            <p className=" font-medium">Projected</p>
                            <Input value={travelExpHeadForm?.projectedAmt} onChange={
                                (e) => setTravelExpHeadForm({ ...travelExpHeadForm, projectedAmt: e.target.value })
                            } />
                        </div>
                        <div className='flex flex-col w-[100px] max-w-[200px]'>
                            <p className=" font-medium">Invoice</p>
                            <Input value={travelExpHeadForm?.invAmt} onChange={
                                (e) => setTravelExpHeadForm({ ...travelExpHeadForm, invAmt: e.target.value })
                            } />
                        </div>
                        <div className='flex flex-col w-[100px] max-w-[200px]'>
                            <p className=" font-medium">Approved</p>
                            <Input value={travelExpHeadForm?.approvedAmt} onChange={
                                (e) => setTravelExpHeadForm({ ...travelExpHeadForm, approvedAmt: e.target.value })
                            } />
                        </div>
                        {/* //Row 2 */}
                        <div className='flex flex-col w-[100px] max-w-[200px]'>
                            <p className=" font-medium">&nbsp;</p>
                            <Input disabled value='THB' />
                        </div>
                        <div className='flex flex-col w-[100px] max-w-[200px]'>
                            <p className="text-muted-foreground font-medium">Projected</p>
                            <Input disabled value='' />
                        </div>
                        <div className='flex flex-col w-[100px] max-w-[200px]'>
                            <p className="text-muted-foreground font-medium">Invoice</p>
                            <Input disabled value='' />
                        </div>
                        <div className='flex flex-col w-[100px] max-w-[200px]'>
                            <p className="text-muted-foreground font-medium">Approved</p>
                            <Input disabled value='' />
                        </div>
                    </div>
                    <div className='flex items-end gap-4'>
                        <Button variant='destructive' className='w-[100px]' onClick={() => {
                            setShowDialog(false);
                        }}>Cancel</Button>
                        <Button className='w-[100px]'>Add</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default TravelExpenseHeadForm;
