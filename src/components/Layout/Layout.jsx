import React from 'react';
import { Outlet } from 'react-router-dom';
import '../App/App.scss';
import PropTypes from 'prop-types';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

function Layuot({ handleOnLogInClick, loggedIn }) {
	return (
		<div className="app">
			<div className="page__container">
				<Header onLogIn={handleOnLogInClick} loggedIn={loggedIn} />
				<Outlet />
				<Footer />
			</div>
		</div>
	);
}

Layuot.propTypes = {
	handleOnLogInClick: PropTypes.func.isRequired,
	loggedIn: PropTypes.bool.isRequired,
};

export default Layuot;
