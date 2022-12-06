import React from 'react';
import '../../css/BurgerBtn.scss';

const BurgerBtn = ({ isActive }) => {
    return (
        <button className={`select-none ${isActive ? "menu-toggle is-active" : "menu-toggle"}`}>
            Menu
        </button>
    );
};

export default BurgerBtn;
