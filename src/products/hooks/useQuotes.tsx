import { useInfiniteQuery } from '@tanstack/react-query'
import { productActions } from '..'

export const useQuotes = () => {
    const { data, isError, isFetching, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
        useInfiniteQuery({
            queryKey: ['quotes'],
            queryFn: ({ pageParam = 1 }) => productActions.getQuotes({ pageParam }),
            initialPageParam: 1,
            getNextPageParam: (lastPage, pages) => {
                console.log("lastPage", lastPage)
                console.log("Page", pages)
                return lastPage.hasNextPage ? pages.length + 1 : undefined
            },
        })
        console.log(data)
    const quotes = data?.pages.flatMap((page) => page.quotes) ?? []
    return {
        quotes,
        isError,
        isFetching,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    }
}
