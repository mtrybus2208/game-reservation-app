import { useState, useEffect } from 'react';

const useForm = (submitCb, changeCb = null) => {
  const [values, setValues] = useState({});
  useEffect(() => {
    if (changeCb) {
      changeCb(values);
    }
  }, [values]);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    submitCb();
  };

  const handleChange = (event) => {
    event.persist();
    setValues(vals => ({ ...vals, [event.target.name]: event.target.value }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
  };
};

export default useForm;
