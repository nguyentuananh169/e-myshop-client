const objectRules = {
    required: (value) => {
        if (typeof value === 'string') {
            const formatValue = value.trim();
            if (!formatValue) {
                return 'Trường này không được để trống';
            }
        } else {
            if (!value) {
                return 'Trường này không được để trống';
            }
        }
    },
    email: (value) => {
        const formatValue = value.trim();
        const reg = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        if (!reg.test(formatValue) && formatValue) {
            return 'Nội dung chưa hợp lệ. VD: abc@gmail.com';
        }
    },
    number: (value) => {
        if (!(value % 1 === 0)) {
            return 'Nội dung phải là dạng số';
        }
    },
    minNumber: (value, number) => {
        if (!(value % 1 === 0)) {
            return 'Nội dung phải là dạng số';
        }
        if (value < number) {
            return `Giá trị phải lớn hơn ${number}`;
        }
    },
    maxNumber: (value, number) => {
        if (!(value % 1 === 0)) {
            return 'Nội dung phải là dạng số';
        }
        if (value > number) {
            return `Giá trị phải nhỏ hơn ${number}`;
        }
    },
    numberInteger: (value) => {
        if (!(value % 1 === 0)) {
            return 'Nội dung phải là dạng số nguyên và lớn hơn 0';
        }
    },
    phoneNumber: (value) => {
        const formatValue = value.trim();
        const reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if (!reg.test(formatValue) && formatValue) {
            return 'Nội dung phải là một số điện thoại hợp lệ. VD: 0123456789';
        }
    },
    rePassword: (value1, value2) => {
        const formatValue1 = value1.trim();
        const formatValue2 = value2.trim();
        if (formatValue1 !== formatValue2) {
            return `Mật khẩu mới nhập lại không trùng khớp `;
        }
    },
    minLength: (value, min) => {
        const formatValue = value.trim();
        if (formatValue.length < min && formatValue) {
            return `Nội dung phải ít nhất ${min} ký tự `;
        }
    },
    maxLength: (value, max) => {
        const formatValue = value.trim();
        if (formatValue.length > max) {
            return `Nội dung phải nhỏ hơn ${max} ký tự`;
        }
    },
    fileImg: (file) => {
        if (file) {
            const covert = file.split('.');
            const type = covert[covert.length - 1].toLowerCase();
            if (type !== 'png' && type !== 'jpg' && type !== 'gif') {
                return `Hình ảnh không đúng định dạng (PNG, JPEG, GIF)`;
            }
        }
    },
    fileLength: (count, length) => {
        if (count) {
            if (count > length) {
                return `Chỉ được chọn tối đa ${length} file`;
            }
        }
    },
};
export const invalidInput = (name, value, rules) => {
    const arrayRules = Object.keys(rules);
    for (let i = 0; i < arrayRules.length; i++) {
        let key = arrayRules[i];
        let message = objectRules[key](value, rules[key]);
        if (message) {
            return { name, message };
        }
    }
};
export const submitForm = (elements, validates) => {
    let messageError = [];
    for (let i = 0; i < validates.length; i++) {
        const element = elements[validates[i].inputName];
        let message = invalidInput(validates[i].inputName, element.value, validates[i].rules);
        if (message) {
            messageError.push(message);
        }
    }
    return messageError;
};
