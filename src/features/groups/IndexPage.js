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
import IndexTable from './components/IndexTable'
import GroupNew from './NewPage'
import ShowGroup from './pages/show/ShowGroup'
import AddClass from './AddClass'

export default function GroupIndex() {
  let match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/new`}>
        <GroupNew />
      </Route>
      <Route path={`${match.path}/:id/add-class`}>
        <AddClass />
      </Route>
      <Route path={`${match.path}/:id/add-students`}>
        <AddClass />
      </Route>
      <Route path={`${match.path}/:id`}>
        <ShowGroup />
      </Route>
      <Route path={match.path}>
        <IndexTable />
      </Route>
    </Switch>
  )

}
