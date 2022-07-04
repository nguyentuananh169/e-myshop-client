import { useEffect, useState } from 'react';
const useForm = (validates = [], callback) => {
    const objectRules = {
        isRequired: (initial, value) => {
            if (!initial) {
                return;
            }
            if (typeof value === 'string') {
                const formatValue = value.trim();
                if (!formatValue) {
                    return 'Trường này không được để trống';
                }
            } else {
                if (!value.length) {
                    return 'Trường này không được để trống';
                }
            }
        },
        isEmail: (initial, value) => {
            if (!initial || !value) {
                return;
            }
            const formatValue = value.trim();
            const reg = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
            if (!reg.test(formatValue)) {
                return 'Nội dung email chưa hợp lệ. VD: abc@gmail.com';
            }
        },
        isPhoneNumber: (initial, value) => {
            if (!initial || !value) {
                return;
            }
            const formatValue = value.trim();
            const reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            if (!reg.test(formatValue)) {
                return 'Nội dung phải là một số điện thoại hợp lệ. VD: 0123456789';
            }
        },
        isNumber: (initial, value) => {
            if (!initial || !value) {
                return;
            }
            const formatValue = value.trim();
            if (isNaN(Number(formatValue))) {
                return 'Nội dung phải là dạng số';
            }
        },
        isInteger: (initial, value) => {
            if (!initial || !value) {
                return;
            }
            const formatValue = value.trim();
            if (!(formatValue % 1 === 0)) {
                return 'Nội dung phải là dạng số nguyên';
            }
        },
        minLength: (initial, value) => {
            if (!initial || !value) {
                return;
            }
            const formatValue = value.trim();
            if (initial > formatValue.length) {
                return `Nội dung phải ít nhất ${initial} ký tự`;
            }
        },
        maxLength: (initial, value) => {
            if (!initial || !value) {
                return;
            }
            const formatValue = value.trim();
            if (initial < formatValue.length) {
                return `Nội dung phải nhỏ hơn ${initial} ký tự`;
            }
        },
        minNumber: (initial, value) => {
            if (!initial || !value) {
                return;
            }
            const formatValue = value.trim();
            if (initial > formatValue) {
                return `Giá trị phải lớn hơn ${initial}`;
            }
        },
        maxNumber: (initial, value) => {
            if (!initial || !value) {
                return;
            }
            const formatValue = value.trim();
            if (initial < formatValue) {
                return `Giá trị phải nhỏ hơn ${initial}`;
            }
        },
        isFileImg: (initial, file) => {
            if (!initial || !file) {
                return;
            }
            for (let i = 0; i < file.length; i++) {
                if (
                    file[i].type !== 'image/png' &&
                    file[i].type !== 'image/jpeg' &&
                    file[i].type !== 'image/gif'
                ) {
                    return `Hình ảnh không đúng định dạng (PNG, JPEG, GIF)`;
                }
            }
        },
        minFile: (initial, file) => {
            if (!initial || !file.length) {
                return;
            }
            if (initial > file.length) {
                return `Phải nhập ít nhất ${initial} file`;
            }
        },
        maxFile: (initial, file) => {
            if (!initial || !file.length) {
                return;
            }
            if (initial < file.length) {
                return `Chỉ được nhập tối đa ${initial} file`;
            }
        },
        alike: (initial, value) => {
            const initialValue = values[initial];
            if (initialValue !== value) {
                return `Nội dung không trùng khớp`;
            }
        },
    };
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [typeAction, setTypeAction] = useState('');
    let error2 = {};
    useEffect(() => {
        if (Object.keys(errors).length === 0 && typeAction === 'submit') {
            callback();
        }
    });
    const formChange = (name, value) => {
        const newObj = errors;
        delete newObj[name];
        setTypeAction('change');
        setValues({ ...values, [name]: value });
        setErrors(newObj);
    };
    const invalid = (name, value) => {
        setTypeAction('invalid');
        setValues((state) => ({ ...state, [name]: value }));
        const validate = validates.filter((item) => item.name === name);
        const rules = Object.keys(validate[0].rules);
        for (let item of rules) {
            let messageError = objectRules[item](validate[0].rules[item], value);
            if (messageError) {
                setErrors((state) => ({ ...state, [name]: messageError }));
                error2 = { ...error2, [name]: messageError };
                break;
            } else {
                setErrors((state) => {
                    const newObj = state;
                    delete newObj[name];
                    return newObj;
                });
                const newObj = error2;
                delete newObj[name];
                error2 = newObj;
            }
        }
    };
    const formSubmit = (e) => {
        e.preventDefault();
        for (let i = 0; i < e.target.elements.length; i++) {
            if (e.target.elements[i].localName === 'input') {
                if (e.target.elements[i].attributes.type.value === 'file') {
                    invalid(e.target.elements[i].name, e.target.elements[i].files);
                } else {
                    invalid(e.target.elements[i].name, e.target.elements[i].value);
                }
            } else if (e.target.elements[i].localName === 'select') {
                invalid(
                    e.target.elements[i].name,
                    e.target.elements[i].options[e.target.elements[i].options.selectedIndex].value,
                );
            } else if (e.target.elements[i].localName === 'textarea') {
                invalid(e.target.elements[i].name, e.target.elements[i].value);
            }
        }
        setTypeAction('submit');
    };
    return {
        values,
        errors,
        formChange,
        invalid,
        formSubmit,
    };
};
export default useForm;
