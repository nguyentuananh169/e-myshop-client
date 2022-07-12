import { useRef } from 'react';
import clsx from 'clsx';
import { Editor } from '@tinymce/tinymce-react';
import styles from './Form.module.css';
function TabContent({ active, dataForm, handleChange, errors }) {
    const editorRef = useRef(null);
    return (
        <div className={clsx(styles.tabContent, { [styles.active]: active })}>
            {errors.content && (
                <span className={clsx(styles.errorMessage, styles.des)}>{errors.content}</span>
            )}
            <Editor
                initialValue={dataForm.content}
                onInit={(event, editor) => (editorRef.current = editor)}
                init={{
                    draggable_modal: true,
                    height: 350,
                    menubar: 'edit | view | insert | format | tools | table',
                    plugins:
                        'lists code emoticons | image | link | table | code | insertdatetime | media | preview',
                    toolbar:
                        'undo redo | styleselect | bold italic | ' +
                        'alignleft aligncenter alignright alignjustify | ' +
                        'outdent indent | numlist bullist ',
                }}
                onBlur={() => handleChange('content', editorRef.current.getContent())}
            />
        </div>
    );
}

export default TabContent;
