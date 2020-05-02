import React, { Fragment } from "react";

export const InputField = ({ input, type, meta: { touched, error, warning }, ...props }) =>   
    <Fragment>
      <input {...input} {...props} className={['form-control', touched && error ? 'is-invalid' : '' ].join(' ')} type={type} />
      {touched && error && <div className='text-danger'>{error} </div>}
    </Fragment>;

export const SelectField = ({ input, type, meta: { touched, error, warning }, ...props }) =>   
<Fragment>
  <select {...input} {...props} className={['form-control', touched && error ? 'is-invalid' : '' ].join(' ')}>
    {props.children}
  </select>
  {touched && error && <div className='text-danger'>{error} </div>}
 </Fragment>