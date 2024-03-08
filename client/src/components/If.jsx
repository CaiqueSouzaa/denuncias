/* eslint-disable react/prop-types */
const If = ({ condition, children }) => {
    if (condition) {
        return children;
    } else {
        return null;
    }
};

export default If;
