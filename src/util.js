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
  const value = e.target.value;
  const sanitizedValue = value.match(/^-?\d*$/);

  if (!sanitizedValue) {
      e.target.value = value.slice(0, -1);
  }

  if (value.indexOf('-') > 0 || (value.match(/-/g) || []).length > 1) {
      e.target.value = value.replace(/-/g, '');
  }

  return parseInt(e.target.value) || 0;
};

export const degreeToRadian = (degree) => {
    return (degree * Math.PI) / 180;
};