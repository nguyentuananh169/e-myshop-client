import { useRef } from 'react';
import clsx from 'clsx';
import { Editor } from '@tinymce/tinymce-react';
import styles from './Form.module.css';
function TabDescription({ active, dataForm, handleSetDataForm }) {
    const editorRef = useRef(null);
    return (
        <div className={clsx(styles.tabDescription, { [styles.active]: active })}>
            <Editor
                initialValue={dataForm.des}
                onInit={(event, editor) => (editorRef.current = editor)}
                init={{
                    menubar: 'edit | view | insert | format | tools | table',
                    plugins:
                        'lists code emoticons | image | link | table | code | insertdatetime | media | preview',
                    toolbar:
                        'undo redo | styleselect | bold italic | ' +
                        'alignleft aligncenter alignright alignjustify | ' +
                        'outdent indent | numlist bullist ',
                }}
                onBlur={() =>
                    handleSetDataForm({ ...dataForm, des: editorRef.current.getContent() })
                }
            />
        </div>
    );
}

export default TabDescription;
