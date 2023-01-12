import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { API } from "../const/endpoint";
import './NewCarPage.css'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const NewCarPage = () => {
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

    const handleCreate = () => {
        const token = localStorage.getItem("token");

        const config = {
            headers: {
                access_token: token,
            },
        };
        const formData = new FormData();
        formData.append("image", img);
        formData.append("name", name);
        formData.append("category", cate);
        formData.append("price", price);
        formData.append("status", false);

        axios
        .post(API.POST_CAR, formData, config)
        .then((res) => {
            navigate("/discovery")
        })
        .catch((err) => console.log(err))
    };

    console.log(name, price, img, cate);

    return (
        <div>
            <Navbar />
            <h1 className="title">Add New Car</h1>
            <div className='edit-container'>
            <Form>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label className='label' column sm="2">
                        Nama Mobil
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control className='input' onChange={handleName} placeholder="name" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label className='label' column sm="2">
                        Harga
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control className='input' onChange={handlePrice} placeholder="price" />
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
                    <button className='btn-save' onClick={handleCreate}>Save</button>
                </div>
        </div>
    </div>
    );
}

export default NewCarPage;