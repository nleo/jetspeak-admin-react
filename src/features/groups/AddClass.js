import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Select from 'react-select'
import Header from './new/header-breadcrumbs'
import FormGroup from '../../components/common/forms/FormGroup'
import { useForm } from 'react-hook-form'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect
} from "react-router-dom";
import WrapperBox from '../../components/wrapper'
import IBox from '../../components/ibox'

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const addClassToGroupGQL = gql`
mutation addClassToGroup($data: AddClassToGroupInput!){
  addClassToGroup(input: $data){
    status
  }
}`

export default function () {
  const [addClassToGroup, result] = useMutation(addClassToGroupGQL);
  let { groupId, groupRelationId } = useParams();

  console.log(result)

  const onSubmit = data => {
    let formData = { ...data, ...formState, startAt: startDate }
    formData.hours =  Number(formData.hours)
    addClassToGroup({ variables: { data: formData } })
    console.log(formData)
  }

  // const [courseId, setCourseId] = useState(0);

  const courseSelected = (optionSelected) => {
    // setCourseId(optionSelected.value)
    handleSelectChange(optionSelected, 'learningCourseId')
  }

  const { control, setValue, register, handleSubmit, watch, errors } = useForm()
  const [formState, setFormState] = useState({ groupRelationId: groupRelationId });

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

  const typeOpions = [
    { value: 'fulltime', label: 'Очное' },
    { value: 'webinar', label: 'Webinar'},

  ]

  if(result.data?.addClassToGroup?.status === 'ok')
    return <Redirect to={`/groups/${groupId}`} />

  return (
    <div id="page-wrapper" className="gray-bg">
      <Header />
      <WrapperBox size="6" rowClass="justify-content-md-center">
        <IBox title="Занятие">

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup label="Тип занятия">
              <Select onChange={e => handleSelectChange(e, 'type')} options={typeOpions} />
            </FormGroup>
            <FormGroup label="Количество ак. часов по лицензии">
              <input name="hours" type="text" className="form-control" ref={register} />
            </FormGroup>
            <FormGroup label="Дата начала занятий">
              <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
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