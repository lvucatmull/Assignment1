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
  const prevValue = e.target.value;
  const sanitizedValue = e.target.value.match(/^-?\d*$/);
  
  // 유효하지 않은 입력인 경우 이전 값으로 복원
  e.target.value = sanitizedValue ? sanitizedValue[0] : prevValue;
  return parseInt(e.target.value) || 0;
};

export const degreeToRadian = (degree) => {
    return (degree * Math.PI) / 180;
};