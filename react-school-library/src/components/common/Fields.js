import React, { Fragment } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const InputField = ({ input, type, meta: { touched, error, warning }, ...props }) =>   
    <Fragment>
      <input {...input} {...props} className={['form-control', touched && error ? 'is-invalid' : '' ].join(' ')} type={type} />
      {touched && error && <div className='text-danger'>{error} </div>}
    </Fragment>;

export const DatePickerField = ({ input, type, meta: { touched, error, warning }, ...props }) =>   
<Fragment>
<DatePicker {...input} {...props} minDate={moment([1900, 0, 1])} maxDate={moment()}
  peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select"
  selected={ input.value ?  moment(input.value) : null} 
  onChange={(date) => input.onChange(date ? date.format('YYYY-MM-DD') : null)} 
  className={['form-control', touched && error ? 'is-invalid' : '' ].join(' ')}  
  dateFormat="YYYY-MM-DD"
  />  
  {touched && error && <div className='text-danger'>{error} </div>}
</Fragment>

export const SelectField = ({ input, type, meta: { touched, error, warning }, ...props }) =>   
<Fragment>
  <select {...input} {...props} className={['form-control', touched && error ? 'is-invalid' : '' ].join(' ')}>
    {props.children}
  </select>
  {touched && error && <div className='text-danger'>{error} </div>}
 </Fragment>