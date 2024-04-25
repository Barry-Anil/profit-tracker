import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

function ExpenseCategoryCard({ selectedCategory, setSelectedCategory, categoryData }: {
    selectedCategory: {
        categoryName: string;
        categoryType: string;
    }; setSelectedCategory: any; categoryData: any
}) {

    const data = categoryData?.data?.data?.category_names ?? []
    return (
        <Card className="overflow-hidden pt-0  w-1/4">
            <CardHeader className="p-4">
                <CardTitle>Categories</CardTitle>
            </CardHeader>

            {
                categoryData?.isLoading ? (
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
                            {data?.map((category: any) => (
                                <div
                                    key={category?.category_name}
                                    className={`w-full text-center font-bold px-4 py-2 rounded-md bg-secondary ${selectedCategory.categoryName === category.category_name && 'outline outline-primary'}`}
                                    onClick={() => {
                                        setSelectedCategory({ categoryName: category?.category_name });
                                    }}
                                >
                                    {category.category_name}
                                </div>
                            ))}
                        </CardContent>
                    </ScrollArea>
                )
            }
        </Card>
    );
}

export default ExpenseCategoryCard;
