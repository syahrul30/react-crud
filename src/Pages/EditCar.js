import React from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import './EditCar.css'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const EditCar = () => {
    const {id} = useParams()

    const [cars, setCars] = useState({})
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [img, setImg] = useState(null);
    const [cate, setCate] = useState("");
    const navigate = useNavigate();

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handlePrice = (e) => {
        setPrice(e.target.value);
    };

    const handleCategory = (e) => {
        setCate(e.target.value);
    };

    const handleImage = (e) => {
        setImg(e.target.files[0]);
    };

    const getCars = () => {
        const token = localStorage.getItem("token");

        const config = {
            headers: {
                access_token: token,
            },
        };

        axios
            .get(`https://bootcamp-rent-cars.herokuapp.com/admin/car/${id}`, config)
            .then((ress) => {
                console.log(ress.data)
                setCars(ress.data)
            })
            .catch((err) => console.log(err.message))
    }

    useEffect(() => {
        getCars()
    },[])

    const handleEdit = () => {
        const token = localStorage.getItem("token")

        const config = {
            headers : {
                access_token: token
            },
        }

        const formData = new FormData();
        formData.append("image", img);
        formData.append("name", name);
        formData.append("category", cate);
        formData.append("price", price);
        formData.append("status", false);

        axios
        .put(`https://bootcamp-rent-cars.herokuapp.com/admin/car/${id}`, formData, config)
        .then((ress) => {
            console.log(ress)
            navigate("/discovery")
        })
    };

    return (
        <div>
            <Navbar />
            <h1 className='title'>Edit Car</h1>
            <div className='edit-container'>
            <Form>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label className='label' column sm="2">
                        Nama Mobil
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control className='input' onChange={handleName} placeholder={cars.name} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label className='label' column sm="2">
                        Harga
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control className='input' onChange={handlePrice} placeholder={cars.price} />
                    </Col>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className='label'>Gambar Mobil</Form.Label>
                    <Form.Control className='input-img' onChange={handleImage} type="file"/>
                </Form.Group>
                    <Form.Label className='label' column sm="2">
                        Kategori
                    </Form.Label>
                <select className='input-dropdown' onChange={handleCategory}>
                    <option value="small">2-4 Orang</option>
                    <option value="medium">4-6 Orang</option>
                    <option value="large">6-8 Orang</option>
                </select> 
            </Form>
                <div className='button-edit'>
                    <button className='btn-cancel'>
                        <Link to="/discovery">Cancel</Link>
                    </button>
                    <button className='btn-save' onClick={handleEdit}>Save</button>
                </div>
            </div>
        </div>
    );
}

export default EditCar;