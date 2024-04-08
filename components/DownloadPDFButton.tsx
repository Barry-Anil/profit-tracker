import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Button } from './ui/button';
import { Files } from 'lucide-react';

const DownloadPDFButton = ({ table, filename, excludedColumns, cols }: { table: any; filename: string; excludedColumns?: string[] | undefined; cols?: string[] }) => {
    // this gives the filtered out data for the csv
    const data = table.getPrePaginationRowModel().rows.map((row: any) => {
        return row
            .getAllCells()
            .filter((cell: any) => cell.column && (!excludedColumns || !excludedColumns.includes(cell.column.id)))
            .map((cell: any) => cell.getValue() as string) as string[];
    });

    const columnNames = table
        .getAllColumns()
        .filter((c: any) => !excludedColumns || !excludedColumns.includes(c.id))
        .map((c: any) => c.columnDef.header);

    const columns = cols ? cols : columnNames;
    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        autoTable(doc, {
            head: [columns],
            body: data,
            styles: {
                fontSize: 9,
            },
            headStyles: {
                fillColor: '#2563eb',
            },
            margin: 5,
            didDrawPage: function (data) {
                // Footer
                let str = `Page ${data.pageNumber}  ${new Date().toLocaleDateString()}`;

                doc.setFontSize(10);
                doc.text(str, data.settings.margin.top, doc.internal.pageSize.height - 5);
            },
        });

        doc.setFont('courier', 'bold');
        doc.save(`${filename}.pdf`);
    };

    return (
        <Button variant="link" disabled={data.length === 0} onClick={handleDownloadPDF}>
            <Files className="mr-2 h-4 w-4" /> Download PDF
        </Button>
    );
};

export default DownloadPDFButton;
