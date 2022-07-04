import useForm from './hook/useForm';
function TestForm() {
    const validates = [
        {
            name: 'name',
            rules: { isRequired: true, minLength: 6, maxLength: 10 },
        },
        {
            name: 'email',
            rules: { isRequired: true, isEmail: true },
        },
        {
            name: 'img',
            rules: { isFileImg: true },
        },
        {
            name: 'status',
            rules: { isRequired: true },
        },
        {
            name: 'textarea',
            rules: { isRequired: true },
        },
    ];
    const callback = () => {
        console.log(values);
    };
    console.log('render');
    const { values, errors, formChange, invalid, formSubmit } = useForm(validates, callback);
    return (
        <form
            style={{ display: 'block', margin: '50px auto', width: '700px' }}
            onSubmit={formSubmit}
        >
            <div>
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    onChange={(e) => formChange('name', e.target.value)}
                    onBlur={(e) => invalid('name', e.target.value)}
                />
                {errors.name}
            </div>
            <div>
                <label>Email</label>
                <input
                    type="text"
                    name="email"
                    onChange={(e) => formChange('name', e.target.value)}
                    onBlur={(e) => invalid('email', e.target.value)}
                />
                {errors.email}
            </div>
            <div>
                <label>Hinh anh</label>
                <input
                    type="file"
                    name="img"
                    multiple
                    onChange={(e) => formChange('img', e.target.files)}
                    onBlur={(e) => invalid('img', e.target.files)}
                />
                {errors.img}
            </div>
            <div>
                <label>status</label>
                <select
                    name="status"
                    onChange={(e) =>
                        formChange('status', e.target.options[e.target.options.selectedIndex].value)
                    }
                    onBlur={(e) =>
                        invalid('status', e.target.options[e.target.options.selectedIndex].value)
                    }
                >
                    <option value="">test0</option>
                    <option value="1">test1</option>
                    <option value="2">test2</option>
                </select>
                {errors.status}
            </div>
            <div>
                <label>textarea</label>
                <textarea
                    name="textarea"
                    onChange={(e) => formChange('textarea', e.target.value)}
                    onBlur={(e) => invalid('textarea', e.target.value)}
                ></textarea>
                {errors.textarea}
            </div>
            <button type="submit">Gui di</button>
        </form>
    );
}

export default TestForm;
