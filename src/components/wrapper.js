import React from 'react'
import cn from 'classnames'

export default function (props) {
  const size = props.size || 12
  const rowClass = cn('row', props.rowClass)
  const className = `col-lg-${size}`
  return (
    <div className="wrapper wrapper-content animated fadeInRight">
      <div className={rowClass}>
        <div className={className}>
          {props.children}
        </div>
      </div>
    </div>
  )
}