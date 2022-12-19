import React from "react";
import Layout from "@/Layouts/Layout";
import Input from "@/Components/Input";
import {useForm} from "@inertiajs/inertia-react";
import InputMask from "react-input-mask";

export default function Profile({user}) {
    const { data, setData, post, patch, processing, errors, reset } = useForm({});

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <Layout user={user}>
            <form className="w-[90%] lg:w-[50%] mx-auto text-white" onSubmit={submit}>
                <Input placeholder={'Имя'} defaultValue={user.name} type={'text'} name={'name'} onHandleChange={onHandleChange}/>
                <Input placeholder={'Фамилия'} defaultValue={user.last_name} type={'text'} name={'last_name'} onHandleChange={onHandleChange}/>
                <Input placeholder={'Телефон'} defaultValue={user.phone} type={'tel'} name={'phone'} onHandleChange={onHandleChange}/>
                <Input placeholder={'Email'} defaultValue={user.email} type={'email'} name={'email'} onHandleChange={onHandleChange}/>
                <div className="text-[1rem] lg:text-[1.4rem] text-zinc-400 pt-10">
                    Адрес:
                </div>
                <Input placeholder={'улица, дом, квартира'} value={user.address} name={'address'} onHandleChange={onHandleChange}/>
                <Input placeholder={'Комментарий'} value={user.comment} name={'comment'} onHandleChange={onHandleChange}/>
                <div className="text-[1rem] lg:text-[1.4rem] text-zinc-400 pt-10">
                    * Онлайн оплата на сайте осуществляется с помощью платёжной системы Robocassa.
                    Данные вашей банковской карты не хранятся на сайте, а сохранены только в платёжной системе.
                </div>
                <div className="flex items-center pt-8 border-b-[1px] border-b-zinc-400">
                    <span className="bg-zinc-700 text-center items-center px-4 py-1 text-lg">
                        VISA
                    </span>
                    <InputMask
                        mask='9999 9999 9999 9999'
                        value={data.bank_card}
                        onChange={onHandleChange}
                        name={'bank_card'}
                        placeholder={'**** **** **** ****'}
                        className="w-full px-4 text-[1.5rem] lg:text-[2.3rem] placeholder-amber-50 bg-transparent border-transparent focus:border-transparent focus:ring-0"
                    />
                </div>
                <button type="submit" className="mt-12 p-3 bg-[#16a34a] w-full uppercase text[1.1rem] lg:text-[1.7rem]">
                    Сохранить
                </button>
            </form>
        </Layout>
    )
}
