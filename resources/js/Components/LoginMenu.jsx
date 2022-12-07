import React, {useState, useEffect} from 'react';
import '../../css/AuthMenu.css'
import Input from "@/Components/Input";
import {useForm} from "@inertiajs/inertia-react";
import InputMask from 'react-input-mask';
import useErrors from "@/Components/Hooks/useError";

const LoginMenu = ({authMenuActive, setAuthMenuActive, registerMenuActive, setRegisterMenuActive}) => {
    const { data, setData, post, get, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    const [phone, setPhone] = useState('');
    const [isPhoneCode, setPhoneCode] = useState(false);
    const [code, setCode] = useState(false);

    useErrors(errors);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    const submitPhone = (e) => {
        e.preventDefault();

        const formatPhone = phone.replace(/[\D]+/g, '').replace('+', '')
        axios.post(route('phone'), {phone: formatPhone}).then(res => {
            setPhoneCode(res.data.phoneCode);
        });
    }

    const submitCode = (e) => {
        e.preventDefault();

        axios.post(route('code'), {code}).then(res => {
            const user = res.data.user;
            if (user) get(route('profile.edit'));
        });
    }

    return (
        <div className={`${authMenuActive ? 'auth-menu active' : 'auth-menu'}`} onClick={() => setAuthMenuActive(false)}>
            <div className="auth-menu__content text-white flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <div className="w-[90%] lg:mt-0 lg:w-[50%]">
                    <div className="flex justify-between text-[1.4rem] lg:text-[2.2rem] uppercase">
                        <span>Вход</span>
                        <button className="bg-[#ff8a00] px-3 py-1" onClick={() => {
                            setRegisterMenuActive(!registerMenuActive);
                            setAuthMenuActive(!authMenuActive);
                        }}>Регистрация</button>
                    </div>
                    <div className="text-[1rem] lg:text-[1.4rem] text-zinc-400 pt-5">
                        Войти через логин и пароль
                    </div>
                    <form onSubmit={submit}>
                        <Input type={'email'} placeholder={'Логин'} value={data.email} onHandleChange={onHandleChange} name={'email'}/>
                        <Input type={'password'} placeholder={'Пароль'} value={data.password} onHandleChange={onHandleChange} name={'password'}/>
                        {errors.password !== undefined || errors.email !== undefined
                            ? <div className="mx-aut pt-2 text-red-500 text-[1.5rem]">Неверен логин или пароль</div>
                            : null
                        }
                        <button type="submit" className="mt-10 p-3 bg-[#ff8a00] w-full uppercase text-[1.1rem] lg:text-[1.7rem]">
                            Войти
                        </button>
                    </form>
                    <div className="text-[1rem] lg:text-[1.4rem] text-zinc-400 pt-5">
                        Войти по номеру телефона
                    </div>
                    {!isPhoneCode
                        ? <form onSubmit={submitPhone}>
                            <InputMask
                                mask='+7 (999) 999-9999'
                                value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                }}
                                name={'phone'}
                                placeholder={'Введите номер телефона'}
                                className="w-full text-[1.5rem] lg:text-[2.3rem] placeholder-amber-50 pt-8 bg-transparent border-transparent focus:border-transparent focus:ring-0 focus:border-b-[1px] focus:border-b-orange-500 border-b-[1px] border-b-zinc-400"
                            />
                            <button type="submit" className="mt-10 p-3 bg-[#ff8a00] w-full uppercase text[1.1rem] lg:text-[1.7rem]">
                                Получить пароль
                            </button>
                        </form>
                        : <form onSubmit={submitCode}>
                            <InputMask
                                mask='99999'
                                value={code}
                                onChange={(e) => {
                                    setCode(e.target.value);
                                }}
                                name={'code'}
                                placeholder={'Введите пароль из sms'}
                                className="w-full text-[1.5rem] lg:text-[2.3rem] placeholder-amber-50 pt-8 bg-transparent border-transparent focus:border-transparent focus:ring-0 focus:border-b-[1px] focus:border-b-orange-500 border-b-[1px] border-b-zinc-400"
                            />
                            <button type="submit" className="mt-12 p-3 bg-[#ff8a00] w-full uppercase text[1.1rem] lg:text-[1.7rem]">
                                Ок
                            </button>
                        </form>
                    }
                    <div className="text-[1rem] lg:text-[1.4rem] text-zinc-400 pt-5">
                        На ваш телефон поступит смс с разовым паролем для входа. Ваш личный кабинет будет привязан к этому номеру телефона
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginMenu;
