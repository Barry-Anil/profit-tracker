import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';
export function costingColumns() {
    const columns: ColumnDef<any>[] = [
        {
            id: 'sr_no',
            header: 'Sr No',
            cell: ({ row }) => <p>{row.index + 1}</p>,
            enableSorting: false,
            enableHiding: false,
            size: 20,
        },
        {
            accessorKey: 'productname',
            header: 'Product',
            cell: ({ row }) => <p className="truncate">{row.getValue('productname') ?? 'NA'}</p>,
        },
        {
            accessorKey: 'category_name',
            header: 'Category',
            cell: ({ row }) => <p className="truncate">{row.getValue('category_name') ?? 'NA'}</p>,
        },
        {
            accessorKey: 'subcategory_name',
            header: 'Sub-category',
            cell: ({ row }) => <p className="truncate">{row.getValue('subcategory_name') ?? 'NA'}</p>,
        },
        {
            accessorKey: 'currency',
            header: 'Currency',
            cell: ({ row }) => <p className="truncate">{row.getValue('currency') ?? 'NA'}</p>,
        },
        {
            accessorKey: 'unit_cost',
            header: 'Unit Cost',
            cell: ({ row }) => {
                const cost = Number(row.getValue('unit_cost'))?.toFixed(2)
                return <p className="truncate">{cost ?? 'NA'}</p>
            },
        },
        {
            accessorKey: 'notes',
            header: 'Notes',
            cell: ({ row }) => <p className="truncate">{row.getValue('notes') ?? 'NA'}</p>,
        },

    ];
    return columns;
}
