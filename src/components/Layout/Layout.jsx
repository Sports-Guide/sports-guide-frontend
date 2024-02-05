import React from 'react';
import { Outlet } from 'react-router-dom';
import '../App/App.scss';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

function Layuot() {
	return (
		<div className="app">
			<div className="page__container">
				<Header />
				<Outlet />
				<Footer />
			</div>
		</div>
	);
}

export default Layuot;
