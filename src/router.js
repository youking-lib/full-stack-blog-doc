import React from 'react'
import { Router, Route, IndexRoute, IndexRedirect } from 'dva/router'

import AppLayout from './container/App'
import Home from './container/Home'
import Archive from './container/Archive'
import About from './container/About'
import Article from './container/Article'
import AdminArticles from './container/Admin/Articles'
import AdminKeywrods from './container/Admin/Keywords'
import AdminEditor from './container/Admin/Editor'
import AdminLayout from './container/Admin/Admin'

export default ({history, app}) => {
    const store = app._store

    function requireAuth(nextState, replace, next) {
        store.dispatch({
            type: 'app/requireAuth',
            next
        })
    }

    function onEnterIndex(nextState, replace, next) {
        store.dispatch({
            type: 'app/autoAuth'
        })
        next()
    }

    return (
        <Router history={history}>
            <Route path="/" component={AppLayout} onEnter={onEnterIndex}>
                <IndexRoute component={Home} />
                <Route path="archive" component={Archive} />
                <Route path="about" component={About} />
                <Route path="article/:id" component={Article} />
                <Route path="admin" component={AdminLayout} onEnter={requireAuth}>
                    <IndexRedirect to="articles" />
                    <Route path="articles" component={AdminArticles} />
                    <Route path="keywords" component={AdminKeywrods} />
                    <Route path="editor" component={AdminEditor} />
                </Route>
            </Route>
        </Router>
    )
}