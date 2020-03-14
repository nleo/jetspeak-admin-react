import React from 'react'
import Dl from '../../../../components/dl'

export default function (props) {
  const { group } = props
  return (
    <div className="col-lg-6">
      <Dl label="ID">
        {group.id}
      </Dl>

      <Dl label="Name">
        {group.name}
      </Dl>

      <Dl label="Customer">
        {group.customerCompany.name}
      </Dl>

      <Dl label="Status">
        <span className="label label-warning">{group.humanStatus}</span>
      </Dl>
    </div>
  )
}