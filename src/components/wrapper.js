import React from 'react'

export default function (props) {
  return (
    <div className="wrapper wrapper-content animated fadeInRight">
      <div className="row">
        <div className="col-lg-12">
          {props.children}
        </div>
      </div>
    </div>
  )
}