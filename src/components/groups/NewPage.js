import React, { useState } from 'react';
// import { Link } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Select from 'react-select'
import Header from './new/header-breadcrumbs'
import CuratorSelect from './CuratorSelect'

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
  const [state, setState] = useState({customerCompany: 0});

  const customerCompanySelected = (optionSelected) => {
    setState({customerCompany: optionSelected.value})
  }

  const { loading, error, data } = useQuery(query_gql);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const distributors_options = data.distributors.map(item => ({value: item.id, label: item.name }) )
  const institutions_options = data.institutions.map(item => ({value: item.id, label: item.name }) )
  const customer_companies_options = data.customerCompanies.map(item => ({value: item.id, label: item.name }) )
  const languages_options = data.languages.map(item => ({value: item.id, label: item.name }) )
  const coordinators_options = data.coordinators.map(item => ({value: item.id, label: item.fullName }) )

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



                <form>
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Name RU</label>
                    <div className="col-sm-10">
                      <input name="name-ru" type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="hr-line-dashed"></div>

                  <div className="form-group  row">
                    <label className="col-sm-2 col-form-label">Name EN</label>
                    <div className="col-sm-10">
                      <input name="name-en" type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="hr-line-dashed"></div>

                  <div className="form-group  row">
                    <label className="col-sm-2 col-form-label">Дистрибьютор</label>
                    <div className="col-sm-10">
                      <Select options={distributors_options} name="distributor_id" defaultValue={distributors_options[2]}/>
                    </div>
                  </div>
                  <div className="hr-line-dashed"></div>

                  <div className="form-group  row">
                    <label className="col-sm-2 col-form-label">Учреждение</label>
                    <div className="col-sm-10">
                      <Select options={institutions_options} name="institution_id" defaultValue={institutions_options[4]}/>
                    </div>
                  </div>
                  <div className="hr-line-dashed"></div>

                  <div className="form-group  row">
                    <label className="col-sm-2 col-form-label">Компания-заказчик</label>
                    <div className="col-sm-10">
                      <Select options={customer_companies_options} name="customer_company_id" onChange={customerCompanySelected} />
                    </div>
                  </div>
                  <div className="hr-line-dashed"></div>

                  <div className="form-group  row">
                    <label className="col-sm-2 col-form-label">Изучаемый язык</label>
                    <div className="col-sm-10">
                      <Select options={languages_options} name="language_id" defaultValue={languages_options[0]}/>
                    </div>
                  </div>
                  <div className="hr-line-dashed"></div>

                  <div className="form-group  row">
                    <label className="col-sm-2 col-form-label">Координаторы</label>
                    <div className="col-sm-10">
                      <Select options={coordinators_options} name="coordinator_ids" isMulti/>
                    </div>
                  </div>
                  <div className="hr-line-dashed"></div>

                  <div className="form-group  row">
                    <label className="col-sm-2 col-form-label">HR (Куратор от Компании-заказчика)</label>
                    <div className="col-sm-10">
                      <CuratorSelect companyId={state.customerCompany} />
                    </div>
                  </div>
                  <div className="hr-line-dashed"></div>

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