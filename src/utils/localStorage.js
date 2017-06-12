/**
 * Custom window.localStorage
 */

const STORE_PREFIX = 'blog'

export function getItem (key) {
    return window.localStorage.getItem(STORE_PREFIX + '-' + key)
}

export function setItem (key, value) {
    window.localStorage.setItem(STORE_PREFIX + '-' + key, value)
}

export function removeItem (key) {
    window.localStorage.removeItem(STORE_PREFIX + '-' + key)
}