import React from 'react'
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

export default function () {
  return (
    <div id="page-wrapper" className="gray-bg">
      <div className="row wrapper border-bottom white-bg page-heading">
        <div className="col-lg-10">
          <h2>Новая группа</h2>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a>Управление обучением</a>
            </li>
            <li className="breadcrumb-item active">
              <Link to="/groups">Учебные группы</Link>
            </li>
            <li className="breadcrumb-item active">
              <strong>Новая группа</strong>
            </li>
          </ol>
        </div>
      </div>

      <div className="wrapper wrapper-content animated fadeInRight">
        <div className="row">
          <div className="col-lg-12">
            <div className="ibox ">
              <div className="ibox-title">
                <h5>Учебные группы</h5>
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