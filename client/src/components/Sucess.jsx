/* eslint-disable react/prop-types */
import style from './Sucess.module.css';

const Sucess = ({ setStatus, setTitle, setContent }) => {
    const updateState = () => {
        setStatus(false);
        setTitle('');
        setContent('');
    }

    return (
        <div className={style.sucess}>
            <div>
                <span>Formulário enviado com sucesso!</span>
            </div>
            <div className={style.sucess_button}>
                <button onClick={updateState}>Fechar</button>
            </div>
        </div>
    );
};

export default Sucess;
