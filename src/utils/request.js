import fetch from 'dva/fetch'
import * as LocalStorage from './localStorage'

const URL_PREFIX = '/api/v1'
const TOKEN_NAME = 'token'

function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response
	}
	const error = new Error(response.statusText)
	error.response = response
	throw error
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
	options = Object.assign({
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	}, options)
	return fetch(URL_PREFIX + url, options)
		.then(checkStatus)
		.then(res => res.json())
		.then(data => data)
}


/**
 * Request width token
 * @param  {[type]} url    
 * @param  {[type]} options
 * @return {[type]}        
 */
export function requestWidthToken (url, options) {
		const TOKEN = LocalStorage.getItem(TOKEN_NAME)
		options = Object.assign({
			headers: new Headers({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${TOKEN}`
			})
		}, options)
		return request(url, options)
}