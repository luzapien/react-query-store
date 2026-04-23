import { Card, CardBody, CardHeader, Divider } from '@heroui/react'
import { useQuotes } from '..'
import { p } from 'framer-motion/client'

export const CompleteListPage = () => {
    const { isLoading, quotes, fetchNextPage, hasNextPage, isFetchingNextPage } = useQuotes()
    return (
        <div className='flex flex-col gap-4'>
            <h1 className='text-2xl font-bold'>Todas las cotizaciones</h1>

            {isLoading && <p>Cargando...</p>}

            <div className='grid grid-cols-1 gap-5 lg:grid-cols-3 md:grid-cols-2'>
                {quotes.map((product: any, index: number) => (
                    <div key={`${product.id}-${index}`}>
                        <Card>
                            <CardHeader className='flex gap-3'>
                                <div className='flex flex-col'>
                                    {product.tren_type ? <p>Tren 2</p> : <p>Tren 1</p>}
                                    <p className='text-md'> Proyecto : {product.product.name}</p>
                                    <p className='text-md'> Asesor : {product.consultant.name}</p>
                                </div>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <p>Margen de ganancia : $ {product.profitMargin1Decimal}</p>
                                <p>Porcentaje de ganancia : {product.profitMargin2Percent} %</p>
                            </CardBody>
                            <Divider />
                        </Card>
                    </div>
                ))}
            </div>

            {/* 👇 LOAD MORE */}
            <div className='flex justify-center mt-5'>
                <button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
                    {isFetchingNextPage ? 'Cargando más...' : 'Cargar más'}
                </button>
            </div>
        </div>
    )
}
