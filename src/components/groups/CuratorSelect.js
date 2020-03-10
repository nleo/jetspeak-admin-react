import React from 'react'
import Select from 'react-select'
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const curators_gql = gql`
query Curators($companyId: ID!){
  curators (companyId: $companyId) {
    id
    fullName
  }
}`

export default function (props) {
  let curators_options = []
  if (props.companyId > 0) {
    const { loading, error, data } = useQuery(curators_gql, {
      variables: { companyId: props.companyId },
    });
    if(!loading && !error)
      curators_options = data.curators.map(item => ({value: item.id, label: item.fullName }) )
  }
  return (
    <Select options={curators_options} name="curator_id" />
  )
}