import React, {useState} from "react";
import Layout from "@/Layouts/Layout";
import Input from "@/Components/Input";
import InputMask from "react-input-mask";
import {useForm} from "@inertiajs/inertia-react";

export default function CreateProduct({ user, product, image }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: product?.title ?? '',
        weight: product?.weight ?? '',
        price: product?.price ?? '',
        description: product?.description ?? '',
        image: image ?? null,
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const [productImage, setProductImage] = useState(null);
    const [unitOfMeasurement, setUnitOfMeasurement] = useState('piece');

    const onUnitChange = (e) => {
        setUnitOfMeasurement(e.target.value);
    }

    const onProductImgChange = (e) => {
        setData('image', e.target.files[0]);
        const reader = new FileReader();
        reader.onload = function (ev) {
            setProductImage(ev.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const submit = (e) => {
        e.preventDefault();

        if (product) {

        } else {
            post(route('product.create'));
        }
    };

    return (
        <Layout user={user}>
            <form className="w-[90%] lg:w-[50%] mx-auto text-white" onSubmit={submit}>
                <Input placeholder={'Название'} value={data.title} type={'text'} name={'title'} onHandleChange={onHandleChange}/>
                <div className="text-[1rem] lg:text-[1.4rem] text-zinc-400 pt-5 pb-3">
                    Единица измерения:
                </div>
                <div className="flex items-center text-center space-x-2">
                    <div>
                        <input type="radio" name="unitOfMeasurement" value="weight" defaultChecked={false} onChange={onUnitChange} />
                        <div>По весу (г)</div>
                    </div>
                    <div>
                        <input type="radio" name="unitOfMeasurement" value="piece" defaultChecked={true} onChange={onUnitChange} />
                        <div>Поштучно</div>
                    </div>
                </div>
                {unitOfMeasurement === 'weight'
                    ? <Input placeholder={'Вес в граммах'} value={data.weight} type={'text'} name={'weight'} onHandleChange={onHandleChange}/>
                    : null
                }
                <Input placeholder={'Цена'} value={data.price} type={'text'} name={'price'} onHandleChange={onHandleChange}/>
                <textarea
                    placeholder={'Описание'}
                    value={data.description}
                    name={'description'}
                    onChange={onHandleChange}
                    className="w-full text-[0.9rem] lg:text-[1.7rem] placeholder-amber-50 pt-8 bg-transparent border-transparent focus:border-transparent focus:ring-0 focus:border-b-[1px] focus:border-b-orange-500 border-b-[1px] border-b-zinc-400"
                />
                <input type="file" name={'file'} onChange={onProductImgChange} className="pt-6"/>
                {productImage
                    ? <img className={`max-h-[340px] object-cover rounded-lg`} src={productImage} alt="course image"/>
                    : null
                }
                <button type="submit" className="mt-12 p-3 bg-[#ff8a00] w-full uppercase text[1.1rem] lg:text-[1.7rem]">
                    Сохранить
                </button>
            </form>
        </Layout>
    )
}
