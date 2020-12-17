import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <div>
        <Link to="/">Home page</Link>
        <Link to="/login">Login page</Link>
        <Link to="/files">File Repo page</Link>
    </div>
);

export default Header;
