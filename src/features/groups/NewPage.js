import React, { useState } from 'react';
// import { Link } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Select from 'react-select'
import Header from './new/header-breadcrumbs'
import CuratorSelect from './CuratorSelect'
import FormGroup from '../../components/common/forms/FormGroup'

// import { useForm } from 'react-hook-form'

import { useForm, Controller } from "react-hook-form";

const query_gql = gql`
{
  distributors{
    id
    name
  }
  institutions{
    id
    name
  }
  customerCompanies{
    id
    name
  }
  languages{
    id
    name
  }
  coordinators{
    id
    fullName
  }
}`

const create_group_gql = gql`
mutation createGroup($group: CreateGroupInput!){
  createGroup(input: $group){
    status
  }
}`

export default function () {
  const [createGroup, { createGroupData }] = useMutation(create_group_gql);

  const onSubmit = data => {
    const formData = { ...data, ...formState };
    createGroup({ variables: { group: { params: formData } } })
    console.log(formData)
  }

  const [customerCompanyId, setCustomerCompanyId] = useState(0);

  const customerCompanySelected = (optionSelected) => {
    setCustomerCompanyId(optionSelected.value)
    handleSelectChange(optionSelected, 'customerCompanyId')
  }

  const { control, setValue, register, handleSubmit, watch, errors } = useForm()
  const [formState, setFormState] = useState({ customerCompanyId: 0 });

  const handleSelectChange = (selectedOption, name, isMulti = false) => {
    console.log('selectedOption', selectedOption)
    setValue(name, selectedOption);
    let state = formState
    if (isMulti) state[name] = selectedOption.map(el => el.value)
    else state[name] = selectedOption.value
    setFormState(state);
    console.log(state)
  }

  const { loading, error, data } = useQuery(query_gql);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const distributors_options = data.distributors.map(item => ({ value: item.id, label: item.name }))
  const institutions_options = data.institutions.map(item => ({ value: item.id, label: item.name }))
  const customer_companies_options = data.customerCompanies.map(item => ({ value: item.id, label: item.name }))
  const languages_options = data.languages.map(item => ({ value: item.id, label: item.name }))
  const coordinators_options = data.coordinators.map(item => ({ value: item.id, label: item.fullName }))
  return (
    <div id="page-wrapper" className="gray-bg">
      <Header />
      <div className="wrapper wrapper-content animated fadeInRight">
        <div className="row justify-content-md-center">
          <div className="col-lg-6">
            <div className="ibox ">
              <div className="ibox-title">
                <h5>Новая учебная группа</h5>
              </div>
              <div className="ibox-content">

                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormGroup label="Name RU">
                    <input name="nameRu" type="text" className="form-control" ref={register} />
                  </FormGroup>

                  <FormGroup label="Name EN">
                    <input name="nameEn" type="text" className="form-control" ref={register} />
                  </FormGroup>

                  <FormGroup label="Дистрибьютор">
                    <Select onChange={e => handleSelectChange(e, 'distributorId')} options={distributors_options} />
                  </FormGroup>

                  <FormGroup label="Учреждение">
                    <Select onChange={e => handleSelectChange(e, 'institutionId')} options={institutions_options} />
                  </FormGroup>

                  <FormGroup label="Компания-заказчик">
                    <Select onChange={customerCompanySelected} options={customer_companies_options} />
                  </FormGroup>

                  <FormGroup label="Изучаемый язык">
                    <Select onChange={e => handleSelectChange(e, 'languageId')} options={languages_options} />
                  </FormGroup>

                  <FormGroup label="Координаторы">
                    <Select onChange={e => handleSelectChange(e, 'coordinatorIds', true)} options={coordinators_options} isMulti />
                  </FormGroup>

                  <FormGroup label="HR (Куратор от Компании-заказчика)">
                    <CuratorSelect companyId={customerCompanyId} />
                  </FormGroup>

                  <div className="form-group row justify-content-end">
                    <div className="col-sm-2">
                      <input className="btn btn-primary btn-sm" type="submit" value="Создать" />
                    </div>
                  </div>

                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}