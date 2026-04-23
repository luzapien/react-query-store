import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Product, productActions } from '..'

export const useProductMutation = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: productActions.createProduct,

        onMutate: (data) => {
            console.log('Mutando - Optimistic update')

            //Optional - Optimistic product

            const optimisticProduct = { id: Math.random(), ...data } as Product
            console.log({ optimisticProduct })
            // storage product in query client caché

            queryClient.setQueryData<Product[]>(['products', { filterKey: data.category }], (old) => {
                if (!old) return [optimisticProduct]

                return [...old, optimisticProduct]
            })

            return {
                optimisticProduct,
            }
        },

        onSuccess: (data, variables, context) => {
            console.log({ data, variables, context })

            // queryClient.invalidateQueries({
            //     queryKey: ["products", { "filterKey": data.category }]
            // })
            queryClient.removeQueries({ queryKey: ['product', context?.optimisticProduct.id] })
            queryClient.setQueryData<Product[]>(['products', { filterKey: data.category }], (old) => {
                console.log(old)
                if (!old) return [data]

                return old.map((cacheProduct) => {
                    return cacheProduct.id === context?.optimisticProduct.id ? data : cacheProduct
                })
            })
        },

        onError: (error, variables, context) => {
            console.log({ error, variables, context })

            queryClient.removeQueries({ queryKey: ['product', context?.optimisticProduct.id] })

            queryClient.setQueryData<Product[]>(['products', { filterKey: variables.category }], (old) => {
                console.log(old)
                if (!old) return []

                return old.filter((cacheProduct) => {
                    return cacheProduct.id !== context?.optimisticProduct.id
                })
            })
        },
    })

    return mutation
}
