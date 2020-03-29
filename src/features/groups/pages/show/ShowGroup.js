import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import Header from './header'
import WrapperBox from '../../../../components/wrapper'
import IBox from '../../../../components/ibox'
import GroupInfo from './GroupInfo'
import CgsrInfo from './CgsrInfo'

const index_gql = gql`
query Group($id: ID!){
  groups(id: $id){
    id
    name
    humanStatus
    courseGroupScenarioRelations{
      id
      learningCourse {
        id
        name
      }
      startDate
      duration
      classesPerUnit
      startUnit {
        id
        name
      }
    }
    customerCompany{
      id
      name
    }
  }
}
`;

export default function () {
  let { id } = useParams();

  const { loading, error, data } = useQuery(index_gql, { variables: { id } });
  // let match = useRouteMatch();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  // let match = useRouteMatch();


  const group = data.groups[0]
  console.log(group)

  const courses = group.courseGroupScenarioRelations.map( cgsr =>
    <IBox key={cgsr.id} title={cgsr.learningCourse.name}>
      <CgsrInfo cgsr={cgsr} />
    </IBox>
  )

  return (

    <div id="page-wrapper" className="gray-bg">

      <Header name={group.name} />
      <WrapperBox >
        <IBox title={group.name}>
          <GroupInfo group={group} />
        </IBox>
        <IBox title={<span>Занятия <Link to={`/groups/${group.id}/add-course`} className="btn btn-primary">+</Link></span>}>
          <GroupInfo group={group} />
        </IBox>
        {courses}
        <IBox title={<span>Студенты <Link to={`/groups/${group.id}/add-students`} className="btn btn-primary">+</Link></span>}>
          <GroupInfo group={group} />
        </IBox>
      </WrapperBox>

    </div>

  )


}