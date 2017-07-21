export * as LocalStorage from './localStorage'
export request, { requestWidthToken } from './request'
export draftUtils from './draftjs'

export function formatDate (date) {
    const d = new Date(date)
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

// https://github.com/lodash/lodash/blob/master/debounce.js
export function debounce (fun, wait, ctx) {
    let timer, lastCallTime
    function shouldInvoke (time) {
        const timeSinceLastCall = time - lastCallTime
        return (lastCallTime === undefined || timeSinceLastCall >= wait)
    }
    return function(...args){
        var dateNow = (new Date).now()
        if (shouldInvoke(dateNow)) {
            fun.apply(ctx, args)
            lastCallTime = dateNow
        }
    }
}

export const generateTagColor = (() => {
    const TAG_COLOR = ['orange', 'green', 'yellow', 'red', 'blue']
    let index = -1;
    return function(){
        index = (++index) % TAG_COLOR.length
        return TAG_COLOR[index]
    }
})()
