export const handleDebounce = (callback, limit) => {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        callback.apply(this, args);
      }, limit);
    };
};

export const validateInput = (e) => {
    const sanitizedValue = e.target.value.match(/^-?\d*$/);
    e.target.value = sanitizedValue ? sanitizedValue[0] : '';
    return parseInt(e.target.value) || 0;
};

export const degreeToRadian = (degree) => {
    return (degree * Math.PI) / 180;
};