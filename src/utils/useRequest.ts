import useSWR from 'swr'

export function useRequest<Model>(url = '/', fetcher: () => Promise<Model>) {
  const { data, error } = useSWR<Model, Error>(url, fetcher)

  return { data, isLoading: !error && !data, isError: error }
}
