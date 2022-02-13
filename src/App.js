import React, { useState } from 'react';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import './styles.css';

import logo from './logo/Soccerball.svg';

import Test from './Test';
import Fa from './Fa';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

export default function App() {
  return (
    <div>
      {/*
      <h1>Basic Example</h1>

      <p>
        This example demonstrates some of the core features of React Router
        including nested <code>&lt;Route&gt;</code>s,{" "}
        <code>&lt;Outlet&gt;</code>s, <code>&lt;Link&gt;</code>s, and using a
        "*" route (aka "splat route") to render a "not found" page when someone
        visits an unrecognized URL.
      </p>
      */}

      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="center" element={<Center />} />
          <Route path="test" element={<Test />} />
          <Route path="fa" element={<Fa />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);

  return (
    <div className="main2-layout">

        <div className="header2-layout">
          <div>RANDOM GRAPH PWA</div>
          <div className="nav-icon" onClick={handleClick} ><FontAwesomeIcon icon={click ? faTimes : faBars} /></div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <Link to="/">
            <li className="nav-item">
              <div class="nav-links" onClick={click ? handleClick : null}>Home</div>
            </li>
            </Link>
            <Link to="/test">
            <li className="nav-item">
              <div class="nav-links" onClick={click ? handleClick : null}>Test</div>
            </li>
            </Link>
          </ul>
        </div>

        <div className="content2-layout" onClick={Close}>
           
          <Outlet />
      
        </div>

    </div>
  );
}

function Home() {
  return (
    <div className="center-container">
      <div className="home">
        <img src={logo} className="home-logo" alt="logo" />
        <h2>Random Graph PWA</h2>
      </div>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>Random Graph is a collection reference of useful React Components with source code</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

function Center() {
  return (

    <div className="center-container">
      <div>center</div>
    </div>
  
  );
}
