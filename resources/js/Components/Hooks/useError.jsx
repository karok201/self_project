import { useEffect } from "react";
import {toast} from "react-toastify";

const useErrors = (errors) => {
    useEffect(() => {
        const values = Object.values(errors);
        if (values.length) {
            values.forEach(val => {
                toast.error(val);
            })
        }
    }, [errors])
};

export default useErrors;
