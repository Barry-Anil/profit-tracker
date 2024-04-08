import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const DataTableLoader = () => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {Array.from({ length: 11 }, (_, index) => (
                        <TableHead key={index}>
                            <Skeleton className="bg-gray-300 h-6 w-[20px * (index + 1)]" />
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {Array.from({ length: 10 }, (_, index) => (
                    <TableRow key={index}>
                        {Array.from({ length: 11 }, (_, index) => (
                            <TableCell key={index}>
                                <Skeleton className="h-6" />
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default DataTableLoader;
