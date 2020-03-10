import React from 'react';
import GroupIndex from './components/groups/IndexPage'
import GroupNew from './components/groups/NewPage'
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
          <Route path="/groups/new">
            <GroupNew />
          </Route>
          <Route path="/groups">
            <GroupIndex />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router >
  )
}

function Home() {
  return <h2>Home</h2>;
}

function Groups() {
  return <h2>Groups</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
