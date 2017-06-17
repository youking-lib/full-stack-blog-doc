import { query } from '../service/archive'
import { message } from 'antd'

export default {
    namespace: 'archive',
    state: {
        // archives: [
        //     {
        //         records: [],
        //         date: null
        //     },
        // ]
        archives: null
    },
    subscriptions: {},
    effects: {
        *lazyloadTimeline({}, {call, put}){
            try {
                const { data, success } = yield call(query)
                if (success) {
                    yield put({type: 'queryTimelineSuccess', payload: data})
                }
            } catch (err) {
                console.error(err)
                message.error(err.message)
            }
        }
    },
    reducers: {
        queryTimelineSuccess(state, {payload}){
            return {
                ...state, archives: payload
            }
        }
    }
}