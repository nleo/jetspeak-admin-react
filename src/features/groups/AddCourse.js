import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Select from 'react-select'
import Header from './new/header-breadcrumbs'
import CuratorSelect from './components/CuratorSelect'
import FormGroup from '../../components/common/forms/FormGroup'
import { useForm } from 'react-hook-form'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import WrapperBox from '../../components/wrapper'
import IBox from '../../components/ibox'

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

import UnitSelect from './components/UnitSelect'

const query_gql = gql`
{
  courses{
    id
    name
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
  let { id } = useParams();

  const onSubmit = data => {
    const formData = { ...data, ...formState };
    // createGroup({ variables: { group: { params: formData } } })
    console.log(formData)
  }

  const [courseId, setCourseId] = useState(0);

  const courseSelected = (optionSelected) => {
    setCourseId(optionSelected.value)
    handleSelectChange(optionSelected, 'courseId')
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

  const [startDate, setStartDate] = useState(new Date());

  const { loading, error, data } = useQuery(query_gql);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const courses_options = data.courses.map(item => ({ value: item.id, label: item.name }))
  return (
    <div id="page-wrapper" className="gray-bg">
      <Header />
      <WrapperBox size="6" rowClass="justify-content-md-center">
        <IBox title="Учебный курс">

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup label="Учебный курс">
              <Select onChange={courseSelected} options={courses_options} />
            </FormGroup>
            <FormGroup label="Дата начала обучения">
              <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
            </FormGroup>
            <FormGroup label="Продолжительность (месяцы)">
              <input name="duration" type="text" className="form-control" ref={register} />
            </FormGroup>
            <FormGroup label="Юнит старта">
              <UnitSelect courseId={courseId} handle={handleSelectChange} />
            </FormGroup>
            <FormGroup label="Число занятий на один юнит">
              <input name="classesPerUnit" type="text" className="form-control" ref={register} />
            </FormGroup>

            <div className="form-group row justify-content-end">
              <div className="col-sm-2">
                <input className="btn btn-primary btn-sm" type="submit" value="Добавить" />
              </div>
            </div>

          </form>
        </IBox>

      </WrapperBox>

    </div>
  )
}