import { request, requestWidthToken } from '../utils'

export function doLogin (payload) {
    return request('/auth', {
        method: 'post',
        body: JSON.stringify(payload)
    })
}

export function getUserByToken (payload) {
    return requestWidthToken('/auth')
}