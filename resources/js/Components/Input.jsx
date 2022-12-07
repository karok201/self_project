import React from "react";

const Input = ({ type = '', placeholder = '', value, name, onHandleChange, defaultValue}) => {
    return (
        <input type={type}
               placeholder={placeholder}
               value={value}
               name={name}
               onChange={(e) => onHandleChange(e)}
               defaultValue={defaultValue}
               className="w-full text-[1.5rem] lg:text-[2.3rem] placeholder-amber-50 pt-6 bg-transparent border-transparent focus:border-transparent focus:ring-0 focus:border-b-[1px] focus:border-b-orange-500 border-b-[1px] border-b-zinc-400"
        />
    )
}

export default Input;
