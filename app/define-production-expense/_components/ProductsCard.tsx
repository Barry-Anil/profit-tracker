import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductData {
    description: string;
    id: number;
    productname: string;
    productname_th: string;
    qtys_unit: string;
    shortname: string;
    sortorder: number;
    ssonline_sortorder: number;
}
function ProductsCard({ selectedProduct, setSelectedProduct, productsData }: { selectedProduct: any; setSelectedProduct: any; productsData: any }) {
    console.log(productsData?.data?.data?.success?.[0]?.products);
    return (
        <Card className=" overflow-hidden pt-0  w-1/4">
            <CardHeader className=" p-4">
                <CardTitle>Products</CardTitle>
            </CardHeader>

            {productsData?.isLoading ? (
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
                        {productsData?.data?.data?.success?.[0]?.products?.map((product: ProductData) => (
                            <div
                                key={product.id}
                                className={`w-full text-center font-bold px-4 py-2 rounded-md bg-secondary ${selectedProduct.productName === product.productname && 'outline outline-primary'}`}
                                onClick={() => {
                                    setSelectedProduct({ productName: product.productname, productShortName: product.shortname, productId: product.id });
                                }}
                            >
                                {product.productname}
                            </div>
                        ))}
                    </CardContent>
                </ScrollArea>
            )}
        </Card>
    );
}

export default ProductsCard;
