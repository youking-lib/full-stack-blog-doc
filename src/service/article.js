import { request, requestWidthToken } from '../utils'
import { stringify } from 'querystring'

export const post = (payload) => {
    return requestWidthToken('/article', {
        method: 'post',
        body: JSON.stringify(payload)
    })
}

export const query = (_query = '') => {
    return request('/article?' + _query)
}

export const getDetail = _id => {
    return request('/article/' + _id)
}

export const del = (_id) => {
    return requestWidthToken(`/article/${_id}`, {
        method: 'delete',
    })
}

export const update = (payload) => {
    return requestWidthToken(`/article`, {
        method: 'put',
        body: JSON.stringify(payload)
    })
}