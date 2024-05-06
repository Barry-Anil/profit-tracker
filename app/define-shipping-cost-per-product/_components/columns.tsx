import { ColumnDef } from '@tanstack/react-table';
export function ShippingCostColumns() {
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
            accessorKey: 'weight',
            header: 'Weight (Kg)',
            cell: ({ row }) => <p className="truncate">{row.getValue('weight') ?? 'NA'}</p>,
        },
        {
            accessorKey: 'currency',
            header: 'Currency',
            cell: ({ row }) => <p className="truncate">{row.getValue('currency') ?? 'NA'}</p>,
        },
        {
            accessorKey: 'total_cost',
            header: 'Total Cost',
            cell: ({ row }) => {
                const cost = Number(row.getValue('total_cost'))?.toFixed(2)
                return <p className="truncate">{cost ?? 'NA'}</p>
            },
        },
        {
            accessorKey: 'narration',
            header: 'Narration',
            cell: ({ row }) => <p className="truncate">{row.getValue('narration') ?? 'NA'}</p>,
        },

    ];
    return columns;
}
