import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {setCount} from "../redusers/reposReduser";


export function App() {
    const count = useSelector(state => state.repos.count)
    const dispatch = useDispatch()

    function onCountClick() {
        dispatch(setCount(5))
    }

    return (
        <div className="container">
            <h1>webpack</h1>
            <hr/>
            < div className="logo"/>
            <hr/>
            <div className="box">
            </div>
            <button onClick={() => onCountClick()}
            > count
            </button>
            <div className="card">
                <h2>{count}</h2>
            </div>
            <pre/>
        </div>
    )
}

