import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import UpdatePage from './routes/UpdatePage';
import RestaurantdetailPage from './routes/RestaurantdetailPage';
import Home from './routes/Home';
import { RestaurantsContextProvider } from './context/RestaurantsContext';

const App = () => {
    return (
        <RestaurantsContextProvider>
            <div className='container'>
                <Router>
                    <Routes>
                    <Route path="/" element={<Home/>} exact />
                    <Route path="/restaurants/:id/update" element={<UpdatePage/>} exact />
                    <Route path="/restaurants/:id" element={<RestaurantdetailPage/>} exact />
                    </Routes>
                </Router>
            </div>
        </RestaurantsContextProvider>
    ) 
}

export default App;