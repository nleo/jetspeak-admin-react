import React, { useState } from 'react';
// import { Link } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Select from 'react-select'
import Header from './new/header-breadcrumbs'
import CuratorSelect from './CuratorSelect'
import FormGroup from '../common/forms/FormGroup'

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

export default function () {

  const onSubmit = data => {
    const formData = { ...data, ...formState };
    console.log(formData)
  }

  const [customerCompanyId, setCustomerCompanyId] = useState(0);

  const customerCompanySelected = (optionSelected) => {
    setCustomerCompanyId(optionSelected.value)
    handleSelectChange(optionSelected, 'customerCompanyId')
  }

  const { control, setValue, register, handleSubmit, watch, errors } = useForm()
  const [formState, setFormState] = useState({ customerCompanyId: 0 });

  const handleSelectChange = (selectedOption, name) => {
    console.log('selectedOption', selectedOption)
    setValue(name, selectedOption);
    let state = formState
    if (name === 'coordinator_ids') {
      state[name] = selectedOption.map(el => el.value)
      setFormState(state);
     }
    else {
      state[name] = selectedOption.value
      setFormState(state);
    }
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
                    <Select onChange={e => handleSelectChange(e, 'distributor_id')}
                      options={distributors_options}
                      name="distributor_id"
                      defaultValue={distributors_options[2]} />
                  </FormGroup>

                  <FormGroup label="Учреждение">
                    <Select onChange={e => handleSelectChange(e, 'institution_id')} options={institutions_options} name="institution_id" defaultValue={institutions_options[4]} />
                  </FormGroup>

                  <FormGroup label="Компания-заказчик">
                    <Select onChange={customerCompanySelected} options={customer_companies_options} name="customer_company_id" />
                  </FormGroup>

                  <FormGroup label="Изучаемый язык">
                    <Select onChange={e => handleSelectChange(e, 'language_id')} options={languages_options} name="language_id" defaultValue={languages_options[0]} />
                  </FormGroup>

                  <FormGroup label="Координаторы">
                    <Select onChange={e => handleSelectChange(e, 'coordinator_ids')} options={coordinators_options} name="coordinator_ids" isMulti />
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