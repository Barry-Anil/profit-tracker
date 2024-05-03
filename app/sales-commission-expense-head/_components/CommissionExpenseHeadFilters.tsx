import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SalesTrip, Year } from '../types';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

type SelectGroupNameProps = {
    getSalesTrip: any;
    getYear: any;
    searchFilter?: any;
    setSearchFilter?: any;
};

const CommissionExpenseHeadFilters = ({ getSalesTrip, getYear, searchFilter, setSearchFilter }: SelectGroupNameProps) => {
    const searchParams = useSearchParams();
    // const grouping = searchParams.get('grouping') as string;
    const router = useRouter();
    const filteredData =
        getSalesTrip &&
        getSalesTrip?.data?.filter((item: any) => {
            const yearFromDate = new Date(item.createdAt).getFullYear();
            return yearFromDate == Number(searchFilter?.year);
        });
    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-4">
                <div><p className="font-medium">Select Year</p>
                    <Select
                        value={searchFilter?.year || '2024'}
                        onValueChange={(value) => {
                            setSearchFilter({ ...searchFilter, year: value });
                        }}
                    >
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select Salestrip" />
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
                    </Select></div>
                <div>
                    <p className="font-medium">Select Sales Trip</p>
                    <Select
                        value={searchFilter?.salestrip || ''}
                        onValueChange={(value) => {
                            setSearchFilter({ ...searchFilter, salestrip: value });
                        }}
                    >
                        <SelectTrigger className="min-w-[200px] max-w-[280px]">
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
                {searchFilter?.salestrip && (
                    <div>
                        <p>&nbsp;</p>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSearchFilter({ year: '2024', salestrip: '', search: '' });
                            }}
                        >
                            Clear Sales Trip
                        </Button>
                    </div>
                )}
                {/* {salestrip && (
                    <>
                        <Select
                            value={grouping || ''}
                            onValueChange={(value) =>
                                router.replace(`?${new URLSearchParams({ ...Object.fromEntries(new URLSearchParams(window.location.search).entries()), grouping: value }).toString()}`)
                            }
                        >
                            <SelectTrigger className="max-w-[200px]">
                                <SelectValue placeholder="Select Grouping" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {filteredData &&
                                        filteredData
                                            ?.find((s: any) => s.salestrip_name === salestrip)
                                            ?.salestrip_detail?.salestripdetail?.map((group: any) => (
                                                <SelectItem key={group.grouping_name} value={group.grouping_name} className="flex gap-2">
                                                    {group.grouping_name}
                                                </SelectItem>
                                            ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Button
                            variant="outline"
                            onClick={() => {
                                router.replace(
                                    `?${new URLSearchParams({
                                        ...Object.fromEntries(new URLSearchParams(window.location.search).entries()),
                                        salestrip: '',
                                        grouping: '',
                                        viewShipTogetherOrder: '',
                                    }).toString()}`
                                );
                            }}
                        >
                            Clear Sales Trip
                        </Button>
                    </>
                )} */}
            </div>
            <div className="flex flex-wrap items-center gap-4">
                <div>
                    <p className="font-medium">Search Grouping</p>
                    <Input className='w-fit' placeholder='Search' value={searchFilter.search} onChange={(e) => setSearchFilter({ ...searchFilter, search: e.target.value })} />
                </div>
                <div>
                    <p className="font-medium">&nbsp;</p>
                    <Button><Search size={18} /></Button>
                </div>
            </div>
        </div>
    );
};

export default CommissionExpenseHeadFilters;
