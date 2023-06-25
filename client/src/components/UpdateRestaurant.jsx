import React, { useEffect } from 'react'
// import { useContext } from 'react';
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
// import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from '../apis/RestaurantFinder';

const UpdateRestaurant = (props) => {
    const {id} = useParams();
    // const {restaurants} = useContext(RestaurantsContext);
    const[name, setName] = useState("");
    const[location, setLocation] = useState("");
    const[priceRange, setPriceRange] = useState("");
    let navigate = useNavigate();

    useEffect(() =>{
        const fetchData = async() => {
            const response = await RestaurantFinder.get(`/${id}`);

            setName(response.data.data.restaurant.name);
            setLocation(response.data.data.restaurant.location);
            setPriceRange(response.data.data.restaurant.price_range);

        };

        fetchData()
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedRestaurent = await RestaurantFinder.put(`/${id}`, {
            name,
            location,
            price_range: priceRange
        });
        navigate("/")

    };


  return (
    <div>
        <form action=''>
            <div className="form-group">
                <label htmlFor='name'>Name</label>
                <input value={name} onChange={e => setName(e.target.value)} id='name' type="text" className="form-control" />
            </div>

            <div className="form-group">
                <label htmlFor='location'>Location</label>
                <input value={location} onChange={e => setLocation(e.target.value)} id='location' type="text" className="form-control" />
            </div>

            <div className="form-group">
                <label htmlFor='price_range'>Price Range</label>
                <input value={priceRange} onChange={e => setPriceRange(e.target.value)} id='price_range' type="number" className="form-control" />
            </div>

            <button onClick={handleSubmit} className="btn btn-primary" type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default UpdateRestaurant