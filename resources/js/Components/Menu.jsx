import React from 'react';

const Menu = ({links, products, active, setActive}) => {
    return (
        <div className={active ? 'menu active' : 'menu'} onClick={() => setActive(false)}>
            <div className="menu__content grid grid-cols-7 text-white" onClick={(e) => e.stopPropagation()}>
                <div className="menu__left col-span-3 uppercase">
                    <ul className="space-y-2">
                        {products.map((product, i) =>
                            <li key={i}>
                                <a href={product.href} className="text-white">{product.value}</a>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="menu__right col-span-4">
                    <ul className="space-y-2">
                        {links.map((link, i) =>
                            <li key={i} className="flex">
                                <span>{link.icon}</span>
                                <span className="pl-2">{link.value}</span>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Menu;
