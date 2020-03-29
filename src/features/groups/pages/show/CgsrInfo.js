import React from 'react'
import Dl from '../../../../components/dl'

export default function (props) {
  const { cgsr } = props
  return (
    <div className="col-lg-6">
      <Dl label="duration">
        {cgsr.duration}
      </Dl>
      <Dl label="classesPerUnit">
        {cgsr.classesPerUnit}
      </Dl>
      <Dl label="startDate">
        {cgsr.startDate}
      </Dl>
      <Dl label="startUnit">
        {cgsr.startUnit?.name}
      </Dl>


    </div>
  )
}