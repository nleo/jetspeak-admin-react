import React from 'react'
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

export default function () {
  return (
    <div id="page-wrapper" className="gray-bg">
      <div className="wrapper wrapper-content animated fadeInRight">
        <div className="row justify-content-md-center">
          <div className="col-lg-6">
            <div className="ibox ">
              <div className="ibox-title">
                <h5>Войти</h5>
              </div>
              <div className="ibox-content">



                <form>
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Login</label>
                    <div className="col-sm-10">
                      <input name="name-ru" type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="hr-line-dashed"></div>

                  <div className="form-group  row">
                    <label className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                      <input name="name-en" type="password" className="form-control" />
                    </div>
                  </div>
                  <div className="hr-line-dashed"></div>


                  <div class="form-group row justify-content-end">
                    <div class="col-sm-2">
                      <input className="btn btn-primary btn-sm" type="submit" value="Войти" />
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