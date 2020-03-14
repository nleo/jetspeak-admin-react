import React from 'react';
import GroupIndex from './features/groups/IndexPage'
import LoginPage from './features/Auth/LoginPage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function AppRouter() {
  return (
    <Router>
      <div id="wrapper">
        <nav className="navbar-default navbar-static-side" role="navigation">
          <div className="sidebar-collapse">
            <ul className="nav metismenu" id="side-menu">
              <li>
                <Link to="/login"><i className="fa fa-pie-chart"></i> <span className="nav-label">Войти</span></Link>
              </li>
              <li>
                <Link to="/users"><i className="fa fa-pie-chart"></i> <span className="nav-label">Users</span>  </Link>
              </li>
              <li>
                <Link to="/groups"><i className="fa fa-pie-chart"></i> <span className="nav-label">Учебные группы</span>  </Link>
              </li>
            </ul>
          </div>
        </nav>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/groups">
            <GroupIndex />
          </Route>
        </Switch>
      </div>
    </Router >
  )
}
