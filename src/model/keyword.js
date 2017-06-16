import { query, create, del } from '../service/keyword'
import { message } from 'antd'

export default {
    namespace: 'keyword',
    state: {
        keywords: [],
    },
    subscriptions: {},
    effects: {
        *requireKeywords({payload, next}, {call, put, take}) {
            yield put({type: 'query'})
            yield take('keyword/querySuccess')
            typeof next === 'function' && next()
        },
        *query({payload, next}, {call, put}) {
            try {
                const { data } = yield call(query)
                yield put({type: 'querySuccess', payload: data})
            } catch (err) {
                console.log(err)
            }
        },
        *create({payload}, {call, put}) {
            try {
                const { data } = yield call(create, payload)
                yield put({ type: 'createKeyword', payload: data })
                message.success('创建成功！')
            } catch (err) {
                message.error(err.message)
            }
        },
        *del({payload}, {call, put}) {
            const _id = payload
            try {
                const { data } = yield call(del, _id)
                yield put({type: 'deleteKeyword', payload: _id})
                message.success('删除成功！')
            }catch(err){
                console.log(err)
                message.error(err.message)
            }
        }
    },
    reducers: {
        querySuccess(state, {payload}){
            return {
                ...state, keywords: payload
            }
        },
        createKeyword(state, {payload}){
            let { keywords } = state
            const newKeywords = keywords.slice()
            newKeywords.push(payload)
            return {
                ...state, keywords: newKeywords
            }
        },
        deleteKeyword(state, {payload}){
            const _id = payload
            let { keywords } = state
            keywords = keywords.filter(item => item._id !== _id)
            return {
                ...state, keywords
            }
        }
    }
}