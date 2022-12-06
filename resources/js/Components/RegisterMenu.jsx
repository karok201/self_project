import React, {useEffect, useState} from 'react';
import '../../css/AuthMenu.css'
import Input from "@/Components/Input";
import Tippy from "@tippyjs/react";
import 'tippy.js/dist/tippy.css';
import {useForm} from "@inertiajs/inertia-react"; // optional

const RegisterMenu = ({authMenuActive, setAuthMenuActive, registerMenuActive, setRegisterMenuActive}) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        last_name: '',
        phone: '',
        email: '',
        password: '',
        agree: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    const [isAgree, setIsAgree] = useState(false);

    return (
        <div className={`${registerMenuActive ? 'auth-menu active' : 'auth-menu'}`} onClick={() => setRegisterMenuActive(false)}>
            <div className="auth-menu__content text-white flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <div className="w-[90%] mt-[-10rem] lg:mt-0 lg:w-[50%]">
                    <div className="flex justify-between text-[1.4rem] lg:text-[2.2rem] uppercase">
                        <span>Регистрация</span>
                        <button className="bg-[#ff8a00] px-3 py-1" onClick={() => {
                            setRegisterMenuActive(!registerMenuActive);
                            setAuthMenuActive(!authMenuActive);
                        }}>Вход</button>
                    </div>
                    <form onSubmit={submit}>
                        <Input type={'text'} placeholder={'Имя'} value={data.name} onHandleChange={onHandleChange} name={'name'} />
                        <Input type={'text'} placeholder={'Фамилия'} value={data.last_name} onHandleChange={onHandleChange} name={'last_name'} />
                        <Input type={'tel'} placeholder={'Телефон'} value={data.phone} onHandleChange={onHandleChange} name={'phone'} />
                        <Input type={'email'} placeholder={'Почта'} value={data.email} onHandleChange={onHandleChange} name={'email'} />
                        <Input type={'password'} placeholder={'Пароль'} value={data.password} onHandleChange={onHandleChange} name={'password'} />
                        <div className="pt-6 px-4 lg:px-6 flex items-center">
                            <input type="checkbox" value={isAgree} onChange={() => {
                                setIsAgree(!isAgree);
                                setData('agree', !isAgree);
                            }} className="w-5 h-5 lg:w-9 lg:h-9" required/>
                            <span className="bold text-[0.8rem] lg:text-[1.3rem] font-semibold pl-3 lg:px-7">
                                Настоящим подтверждаю, что я ознакомлен и согласен с условиями <a href="" className="border-b-2 ">политики конфиденциальности</a>.
                            </span>
                        </div>
                        <button
                            type="submit"
                            className={`mt-12 p-3 bg-[#ff8a00] w-full uppercase text-[1.1rem] lg:text-[1.7rem]`}
                            data-tip
                            data-for="register"
                        >
                            Зарегистрироваться
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterMenu;
