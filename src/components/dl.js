import React from 'react'

export default function (props) {
  return (
    <dl className="row mb-0">
      <div className="col-sm-4 text-sm-right">
        <dt>{props.label}:</dt>
      </div>
      <div className="col-sm-8 text-sm-left">
        <dd className="mb-1">
          {props.children}
        </dd>
      </div>
    </dl>
  )
}