import React from 'react'
import { Link } from "react-router-dom";

export default function () {
  return (
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
  )
}