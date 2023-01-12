import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { API } from "../const/endpoint";
import './DiscoveryPage.css'

const DiscoveryPage = () => {
    const [cars, setCars] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        const token = localStorage.getItem('token')

        const config = {
            headers: {
            access_token: token,
        },
    };
    axios 
    .get(API.GET_CARS, config)
    .then((res) => {
        setCars(res.data.cars);
    })
    .catch((err) => console.log(err));
    };

    const handleDelete = (id) => {
        const token = localStorage.getItem("token");
    
        const config = {
        headers: {
            access_token: token,
        },
        };
    
        axios
        .delete(
            `https://bootcamp-rent-cars.herokuapp.com/admin/car/${id}`,
            config
        )
        .then((res) => {
            //ketika berhasil hapus lalu panggil function getData
            getData();
        })
        .catch((err) => console.log(err));
    };
    

    return ( 
        <div>
            <Navbar />
            <button className="btn-new">
                <Link to="/new-car"> + Add New Car</Link>
            </button>
                <div className="card-container">
                {cars.length &&
                cars.map((item) => (
                <div className="card">
                    <img src={item.image} alt="car"/>
                    <h1>{item.name}</h1>
                    <h2>{item.price}</h2>
                    <p>{item.category}</p>
                    <div className="btn">
                        <button className="btn-delete" onClick={() => handleDelete(item.id)}>Delete</button>
                        <Link to={`/edit/${item.id}`}>
                            <button className="btn-edit">Edit</button>
                        </Link>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
};

export default DiscoveryPage;