import { Product, ProductCard, usePrefetchProduct } from '..'

interface ProductListProps {
    products: Product[]
}

export const ProductList = ({ products }: ProductListProps) => {

    const prefetchProduct = usePrefetchProduct()


    return (
        <div className='mt-2 columns-1 sm:columns-2 xl:columns-3 gap-4 space-y-4'>
            {products.map((product) => (
                <div key={product.id} className='break-inside-avoid'>
                    <ProductCard product={product} prefetchProduct={prefetchProduct}  />
                </div>
            ))}
        </div>
    )
}
