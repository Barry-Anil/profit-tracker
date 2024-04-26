'use client'
import useDataProvider from '@/hooks/useDataProvider'
import React from 'react'
import { Button } from '@/components/ui/button'


const page = () => {

    const [products, setProducts] = React.useState([])
    const getProducts = useDataProvider({
        querykey: ['allProductsThroughMasterData'],
        endpoint: 'api/fabric-types/products',
        enabled: false,
        utilityFunction: (res: any) => {
            console.log(res);
            setProducts(res?.data?.success?.[0]?.products)
        }
    })
    console.log(products);
    return (
        <div>
            products api
            <Button onClick={() => getProducts.refetch()}>
                {getProducts?.isFetching ? "Loading.." : "Fetch products"}
            </Button>
            <div className='flex gap-4'>
                {products?.map((product: any) => (
                    <div key={product?.id}>
                        {product?.productname}
                    </div>
                ))}
            </div>

        </div>
    )
}

export default page