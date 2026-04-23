import { Card, CardBody, CardFooter, CardHeader, Divider } from '@heroui/react'
import { Product, ProductCard, usePrefetchProduct } from '..'

interface ProductListProps {
    products: Product[]
}

export const ProductList = ({ products }: any) => {
    const prefetchProduct = usePrefetchProduct()

    return (
        <div className='mt-2 columns-1 sm:columns-2 xl:columns-3 gap-4 space-y-4'>
            {products.map((product: any) => (
                <div key={product.id} className='break-inside-avoid'>
                    <Card className='max-w-[400px]'>
                        <CardHeader className='flex gap-3'>
                            <div className='flex flex-col'>
                                <p className='text-md'>{product.product.name}</p>
                            </div>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <p>Make beautiful websites regardless of your design experience.</p>
                        </CardBody>
                        <Divider />
                    </Card>
                    {/* <ProductCard product={product} prefetchProduct={prefetchProduct}  /> */}
                </div>
            ))}
        </div>
    )
}
