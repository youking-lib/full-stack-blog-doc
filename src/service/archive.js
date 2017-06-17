import { request, requestWidthToken } from '../utils'

export const query = (_query = '') => {
    return request(`/archive?${_query}`)
}