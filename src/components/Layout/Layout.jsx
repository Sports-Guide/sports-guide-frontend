import React from 'react';
import { Outlet } from 'react-router-dom';
import '../App/App.scss';
import { YMaps } from '@pbe/react-yandex-maps';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

function Layuot() {
	return (
		<div className="app">
			<div className="page__container">
				<YMaps
					query={{
						ns: 'use-load-option',
						load: 'Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon',
						apikey: 'c062e9ac-db0c-4d73-b5b2-71830702f484',
						suggest_apikey: '7841f93a-196d-47c1-9184-54f3c937df30',
						coordorder: 'longlat',
					}}
				>
					<Header />
					<Outlet />
					<Footer />
				</YMaps>
			</div>
		</div>
	);
}

export default Layuot;
