import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';


function SalesTripListCard({ selectedSalesTrip, setSelectedSalesTrip, salestripData }: { selectedSalesTrip: any; setSelectedSalesTrip: any; salestripData: any }) {
    return (
        <Card className=" overflow-hidden pt-0  w-1/4">
            <CardHeader className=" p-4">
                <CardTitle>Select Salestrip</CardTitle>
            </CardHeader>

            {salestripData?.isLoading ? (
                <CardContent className="flex flex-col gap-4 p-4 w-full ">
                    {Array.from({ length: 12 }, (_, i) => (
                        <Card key={i}>
                            <CardContent className="p-3">
                                <div className="flex items-center space-x-4">
                                    <Skeleton className="h-12 w-12 rounded-full bg-slate-300" />
                                    <div className="space-y-2 flex-grow">
                                        <Skeleton className="h-4 w-11/12 bg-slate-300" />
                                        <Skeleton className="h-4 w-9/12 bg-slate-200" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </CardContent>
            ) : (
                <ScrollArea className="h-screen">
                    <CardContent className="flex flex-col gap-4 p-4 hover:cursor-pointer">
                        {salestripData?.map((salestrip: any) => (
                            <div
                                key={salestrip.id}
                                className={`w-full text-center font-bold px-4 py-2 rounded-md bg-secondary ${selectedSalesTrip?.salestrip_name === salestrip?.salestrip_name && 'outline outline-primary'}`}
                                onClick={() => {
                                    setSelectedSalesTrip({ salestrip_name: salestrip?.salestrip_name, });
                                }}
                            >
                                {salestrip?.salestrip_name}
                            </div>
                        ))}
                    </CardContent>
                </ScrollArea>
            )}
        </Card>
    );
}

export default SalesTripListCard;
