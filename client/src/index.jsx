import './styles/style.css'
import {App} from './components/App'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {store} from './redusers/store'


render(
    <Provider store={store}>
    <App/>
    </Provider>
    ,document.getElementById('root')
)