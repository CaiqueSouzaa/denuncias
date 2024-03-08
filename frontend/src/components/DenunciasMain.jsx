/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

import style from './DenunciasMain.module.css';

const DenunciasMain = ({ itemId }) => {
    const [itemData, setItemData] = useState({});

    useEffect(() => {
        if (itemId !== 0) {
            fetch(`${import.meta.env.VITE_API_URL}/denuncias/${itemId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDk5MTI1NTMsImV4cCI6MTcxMDUxNzM1M30.CwS7_2nu5eOEZF9hqQUAJ9df4w3MxHeN4lugv6RLweQ',
                },
                method: 'GET',
            })
            .then((resolve) => resolve.json())
            .then((data) => setItemData(data))
            .catch((err) => console.error(err));
        }
    }, [itemId]);

    const showData = itemData.code === 904 ? (<Main title={itemData.denuncia.title} content={itemData.denuncia.content} date={itemData.denuncia.date} hour={itemData.denuncia.hour}/>) : undefined;


    return (
        <main className={style.main}>
            {showData}
        </main>
    );
};

const Main = ({ title, content, date, hour }) => {
    return (
        <div className={style.main_two}>
            <div className={style.main_data}>
                <span>Data: {date}-</span>
                <span>Horário: {hour}</span>
            </div>
            <div className={style.main_title}>
                <span>Título: {title}</span>
            </div>
            <div className={style.main_content}>
                <span>Denúncia: {content}</span>
            </div>
        </div>
    );
};

export default DenunciasMain;
