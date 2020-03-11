import React from 'react';

export default function (props) {
  return (
    <div className="form-group row">
      <label className="col-sm-2 col-form-label">{props.label}</label>
      <div className="col-sm-10">
        {props.children}
      </div>
    </div>
  )
}
