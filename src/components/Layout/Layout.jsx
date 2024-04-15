import './Layout.scss';
import React from 'react';
import { Outlet } from 'react-router-dom';
import '../App/App.scss';
import { YMaps } from '@pbe/react-yandex-maps';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

const apiKey = process.env.REACT_APP_API_KEY;
const suggestApiKey = process.env.REACT_APP_SUGGEST_API_KEY;

function Layout() {
	return (
		<div className="layout">
			<YMaps
				query={{
					ns: 'use-load-option',
					load: 'Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon',
					apikey: apiKey,
					suggest_apikey: suggestApiKey,
					coordorder: 'longlat',
				}}
			>
				<Header />
				<Outlet />
				<Footer />
			</YMaps>
		</div>
	);
}

export default Layout;
