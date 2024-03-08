import { useState } from 'react';

import style from './Denuncias.module.css';
import DenunciasMain from './DenunciasMain';
import Navbar from './Navbar';

const Denuncias = () => {
    const [itemId, setItemId] = useState(0);

    const updateSetClickedItem = (id) => {
        setItemId(id);
    }

    return (
        <div className={style.denuncias}>
            <Navbar clickedItem={updateSetClickedItem}/>
            <DenunciasMain itemId={itemId}/>
        </div>
    );
};

export default Denuncias;
