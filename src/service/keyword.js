import { request, requestWidthToken} from '../utils'
import LocalStorage from '../utils/localStorage'

export const query = (url, options) => {
    return request('/keyword')
}

export const create = (payload) => {
    return requestWidthToken('/keyword', {
        method: 'POST',
        body: JSON.stringify(payload)
    })
}

export const del = (_id) => {
    return requestWidthToken(`/keyword/${_id}`, {
        method: 'DELETE'
    })
}