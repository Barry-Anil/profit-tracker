import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { SelectSingleEventHandler } from 'react-day-picker';

type DateRangePickerProps = {
    fromDate: Date;
    toDate: Date;
    setFromDate: SelectSingleEventHandler | undefined;
    setToDate: SelectSingleEventHandler | undefined;
};

const DateRangePicker = ({ fromDate, toDate, setFromDate, setToDate }: DateRangePickerProps) => {
    return (
        <div className="flex items-center gap-2">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant={'outline'} className={cn('w-[280px] justify-start text-left font-normal text-base', !fromDate && 'text-muted-foreground')}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {fromDate ? format(fromDate, 'PPP') : <span>From date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={fromDate} onSelect={setFromDate} initialFocus />
                </PopoverContent>
            </Popover>

            <Popover>
                <PopoverTrigger asChild>
                    <Button variant={'outline'} className={cn('w-[280px] justify-start text-left font-normal text-base', !toDate && 'text-muted-foreground')}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {toDate ? format(toDate, 'PPP') : <span>To date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={toDate} onSelect={setToDate} initialFocus />
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default DateRangePicker;
