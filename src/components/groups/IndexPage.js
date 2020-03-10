import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Link } from "react-router-dom";

const INDEX = gql`
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

export default function GroupIndex() {
  const { loading, error, data } = useQuery(INDEX);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const rows = data.groups.map(group =>
    <tr key={group.id}>
      <td>{group.id}</td>
      <td>{group.name}</td>
      <td>{group.customerCompany?.name}</td>
      <td>Учебный курс и расписание</td>
      <td>Студенты</td>
      <td>{group.humanStatus}</td>
    </tr>
  )

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
                <h5>
                  Учебные группы&nbsp;
                  <Link to="/groups/new" className="btn btn-primary">+</Link>


                </h5>
              </div>
              <div className="ibox-content">

                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Группа</th>
                      <th>Заказчик</th>
                      <th>Учебный курс и расписание</th>
                      <th>Студенты</th>
                      <th>Статус</th>
                      <th>Управление</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows}
                  </tbody>
                </table>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )


}
