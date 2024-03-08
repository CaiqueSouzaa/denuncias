/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

import style from './Navbar.module.css';
import NavbarItem from './NavbarItem';

const Navbar = ({ clickedItem }) => {
    const [denuncias, setDenuncias] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/denuncias`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDk5MTI1NTMsImV4cCI6MTcxMDUxNzM1M30.CwS7_2nu5eOEZF9hqQUAJ9df4w3MxHeN4lugv6RLweQ'
            },
            method: 'GET',
        })
        .then((resolve) => resolve.json())
        .then((data) => setDenuncias(data))
        .catch((err) => console.error(err));
    }, []);

    return (
        <div className={style.navbar}>
            <div className={style.navbar_title}>
                <div className={style.navbar_title_span}>
                    <span>Denúncias</span>
                </div>
                <div className={style.navbar_title_quant}>
                    <span>Quant {`=> ${denuncias.amount}`}</span>
                </div>
            </div>
            <div className={style.navbar_list}>
                <ul>
                    {denuncias.code === 903 ? denuncias.denuncias.map((item) => <NavbarItem key={item.id} id={item.id} title={item.title} date={item.date} hour={item.hour} clickedItem={clickedItem}/>) : null}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
