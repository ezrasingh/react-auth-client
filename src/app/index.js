import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { Provider } from 'react-redux'
import store from 'store'
import Views from 'app/views'

const App = () => {
    if(!sessionStorage.getItem('UI-START-MESSAGE')){
        toast("Simple Auth Client", { autoClose: 7800 })
        toast.info("By Ezra Singh", { autoClose: 8000 })
        sessionStorage.setItem('UI-START-MESSAGE', true)
    }
    return(
        <BrowserRouter>
            <Provider store={store}>
                <ToastContainer/>
                <Views/>
            </Provider>
        </BrowserRouter>
    )
}

export default App