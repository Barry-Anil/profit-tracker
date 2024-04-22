import { Input } from '@/components/ui/input';
import { Column, Row, Table } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

type EditableCellProps = {
    row: Row<any>;
    column: Column<any>;
    table: Table<any>;
    getValue: any;
};

const EditableCell = ({ getValue, row, column, table }: EditableCellProps) => {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);



    const onBlur = () => {
        table.options.meta?.updateCommissionExpenseHead?.(row.index, column.id as keyof any, value);
    };

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return (
        <div className="flex gap-2 w-full">
            <Input type='number' value={value} onChange={(e) => setValue(e.target.value)} onBlur={onBlur} />
        </div>
    );
};

export default EditableCell;
