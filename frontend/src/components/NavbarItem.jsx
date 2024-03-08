/* eslint-disable react/prop-types */
import style from './NavbarItem.module.css';

const NavbarItem = ({ id, title, date, hour, clickedItem }) => {
    return (
        <li className={style.denuncia_item} onClick={() => clickedItem(id)}>
            <div>
                <span>
                    {title}
                </span>
                <span>
                    {date}
                </span>
            </div>
        </li>
    );
};

export default NavbarItem;
