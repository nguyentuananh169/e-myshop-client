const useSliceString = (string, length) => {
    const stringFormat = string.trim();
    let result = '';
    if (stringFormat.length > length) {
        result = stringFormat.slice(0, length).concat('...');
    } else {
        result = stringFormat;
    }
    return result;
};
export default useSliceString;
