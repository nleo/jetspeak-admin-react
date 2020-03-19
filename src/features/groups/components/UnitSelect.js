import React from 'react'
import Select from 'react-select'
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const unitsGql = gql`
query Units($courseId: ID!){
  units (courseId: $courseId) {
    id
    name
  }
}`

export default function (props) {
  let units_options = []
  if (props.courseId > 0) {
    const { loading, error, data } = useQuery(unitsGql, {
      variables: { courseId: props.courseId },
    });
    if(!loading && !error){
      units_options = data.units.map(item => ({value: item.id, label: item.name }) )}
  }
  return (
    <Select options={units_options} name="unitId" onChange={e => props.handle(e, 'unitId')} />
  )
}