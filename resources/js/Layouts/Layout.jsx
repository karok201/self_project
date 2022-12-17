import {useState} from "react";
import { Link, Head } from '@inertiajs/inertia-react';
import Menu from "@/Components/Menu";
import '../../css/Menu.css';
import '../../css/Profile.css';
import {
    UsersIcon,
    ArrowLeftOnRectangleIcon,
    MapPinIcon,
    DocumentTextIcon,
    VideoCameraIcon,
    CreditCardIcon,
    UserPlusIcon, BuildingStorefrontIcon
} from "@heroicons/react/20/solid";
import Nav from "@/Components/Landing/Nav";
import Footer from "@/Components/Landing/Footer";
import LoginMenu from "@/Components/LoginMenu";
import RegisterMenu from "@/Components/RegisterMenu";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ user, children }) {
    const [menuActive, setActive] = useState(false);
    const [authMenuActive, setAuthMenuActive] = useState(false);
    const [registerMenuActive, setRegisterMenuActive] = useState(false);

    const products = [
        {value: "Заморозка", href: "/main", icon:"anchor"},
        {value: "Пикник", href: "/service", icon:"api"},
        {value: "Кофе МСК", href: "/service", icon:"api"},
        {value: "Салаты", href: "/service", icon:"api"},
        {value: "Горячее", href: "/service", icon:"api"},
        {value: "Супы", href: "/service", icon:"api"},
        {value: "Напитки", href: "/service", icon:"api"},
        {value: "Хлеб", href: "/service", icon:"api"},
        {value: "Выпечка", href: "/service", icon:"api"},
        {value: "Сладкое", href: "/shop", icon:"android"}
    ];

    const links = [
        {value: 'Вакансии', icon: <UsersIcon className="h-7" />},
        {value: 'Личный кабинет', icon: <ArrowLeftOnRectangleIcon className="h-7" />},
        {value: 'Адреса лавок', icon: <MapPinIcon className="h-7" />},
        {value: 'Обратная связь', icon: <DocumentTextIcon className="h-7" />},
        {value: 'Арендодателям', icon: <BuildingStorefrontIcon className="h-7" />},
        {value: 'Видео', icon: <VideoCameraIcon className="h-7" />},
        {value: 'Наши друзья', icon: <UserPlusIcon className="h-7" />},
        {value: 'Оплата и реквизиты', icon: <CreditCardIcon className="h-7" />},
    ];
    return (
        <>
            <Head title="Welcome" />

            <Nav menuActive={menuActive}
                 setActive={setActive}
                 authMenuActive={authMenuActive}
                 setAuthMenuActive={setAuthMenuActive}
                 user={user}
            />
            <Menu active={menuActive} setActive={setActive} header={"Бургер меню"} links={links} products={products}/>
            <LoginMenu
                authMenuActive={authMenuActive}
                setAuthMenuActive={setAuthMenuActive}
                registerMenuActive={registerMenuActive}
                setRegisterMenuActive={setRegisterMenuActive}
            />
            <RegisterMenu
                authMenuActive={authMenuActive}
                setAuthMenuActive={setAuthMenuActive}
                registerMenuActive={registerMenuActive}
                setRegisterMenuActive={setRegisterMenuActive}
            />

            <main className="pt-[4.3rem] profile bg-[#0c193f] min-h-screen items-center overflow-hidden">
                {children}
            </main>

            <Footer />
            <ToastContainer />
        </>
    );
}
