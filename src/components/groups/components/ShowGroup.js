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

const index_gql = gql`
{
  groups{
    id
    name
    humanStatus
    customerCompany{
      id
      name
    }
  }
}
`;

export default function () {
  let { id } = useParams();

  return (

    <div id="page-wrapper" className="gray-bg">

      <div className="row wrapper border-bottom white-bg page-heading">
        <div className="col-lg-10">
          <h2>Учебные группы</h2>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a>Управление обучением</a>
            </li>
            <li className="breadcrumb-item active">
              <strong>Учебные группы</strong>
            </li>
          </ol>
        </div>
      </div>

      <div className="wrapper wrapper-content animated fadeInRight">
        <div className="row">
          <div className="col-lg-12">
            <div className="ibox ">
              <div className="ibox-title">
                <h5> Группа: </h5>
              </div>
              <div className="ibox-content">
                Группа: {id}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )


}