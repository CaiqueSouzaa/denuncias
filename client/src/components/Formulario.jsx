import { useState } from 'react';

import style from './Formulario.module.css';
import If from './If';
import Sucess from './Sucess';

const Formulario = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState(false);

    const sendData = () => {
        fetch(`${import.meta.env.VITE_API_URL}/denuncias`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                title,
                content,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.code === 902) {
                setStatus(true);
            }
        })
        .catch((err) => console.error(err));
    }

    return (
        <div  className={style.formulario}>
            <If condition={status}>
                <Sucess setStatus={setStatus} setTitle={setTitle} setContent={setContent}/>
            </If>
            <div className={style.formulario_header}>
                <span>Denúncias</span>
            </div>
            <div className={style.formulario_content}>
                <div className={style.formulario_description}>
                    <span>
                        <b>Este formulário é completamente anônimo.</b> <br/><br/>Evite incluir seu nome ou informações pessoais para garantir a confidencialidade dos dados coletados.
                    </span>
                </div>
                <div className={style.div_questions}>
                    <label htmlFor="title-input">Título</label>
                    <input id="title-input" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className={style.div_questions}>
                    <label htmlFor="content-input">Conteúdo</label>
                    <textarea id="content-input" cols="30" rows="10" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                </div>
                <div className={style.formulario_send_button}>
                    <button onClick={sendData}>Enviar</button>
                </div>
            </div>
            <div className={style.formulario_bottom}></div>
        </div>
    );
};

export default Formulario;
