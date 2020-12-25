import { useState } from 'react';

function useInputHook(initialValue) {
  const [value, setValue] = useState(initialValue);

  const reset = () => {
    setValue(initialValue);
  };

  let onChange;
  if (typeof initialValue === 'object') {
    onChange = e => {
      setValue({ ...value, [e.target.name]: e.target.value });
    };
  } else {
    onChange = e => {
      setValue(e.target.value);
    };
  }

  const bind = {
    value,
    onChange,
  };

  return [value, bind, reset];
}

export default useInputHook;
