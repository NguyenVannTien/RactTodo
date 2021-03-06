import React, { useEffect } from 'react'

const Alert = (props) =>{
  const {type, msg, list, removeAlert} = props;
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list]);
  return <p className={`alert alert-${type}`}>{msg}</p>

}

export default Alert;
