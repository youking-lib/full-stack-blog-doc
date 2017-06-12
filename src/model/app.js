import { doLogin, getUserByToken } from '../service/app'
import { LocalStorage } from '../utils'
import { message } from 'antd'

export default {
    namespace: 'app',
    state: {
        isLogin: false,
        user: null
    },
    subscriptions: {},
    effects: {
        *requireAuth({next}, {take, call, put}){
            yield [put({type: 'checkToken'}), put({type: 'getUserByToken'})]
            yield [take('app/loginSuccess'), take('app/authSuccess')]
            console.log(next)
            typeof next === 'function' && next()
        },
        *autoAuth({}, {call, put}){
            const Token = LocalStorage.getItem('token')
            if (Token) {
                yield put({type: 'requireAuth'})
            }
        },
        *checkToken({next}, {call, put}){
            const Token = LocalStorage.getItem('token')
            if (Token) {
                yield put({type: 'loginSuccess'})
            } else {
                message.error('你还没有登陆哦！')
            }
        },
        *doLogin({payload}, {call, put}){
            try {
                const { success, data } = yield call(doLogin, payload)

                if (success) {
                    LocalStorage.setItem('token', data.token)
                    yield put({type: 'requireAuth'})
                }
            } catch (err) {
                message.error('授权失败！')
                yield put({type: 'authErr'})
            }
        },
        *getUserByToken({}, {call, put}){
            try {
                const { success, data } = yield call(getUserByToken)
                if (success) {
                    yield put({type: 'authSuccess', payload: data})
                }
            } catch (err) {
                message.error(err.message)
                yield put({type: 'authErr'})
            }
        }
    },
    reducers: {
        loginSuccess(state){
            return {
                ...state, isLogin: true
            }
        },
        authErr(state){
            return {
                ...state, isLogin: false, user: null
            }
        },
        authSuccess(state, {payload}){
            return {
                ...state, user: payload
            }
        }
    }
}