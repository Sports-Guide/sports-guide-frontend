import React from 'react';
import './AreaApp.scss';
import { NavLink } from 'react-router-dom';

export function AreaApp() {
	return (
		<div className="area-app">
			<NavLink className="area-app__link" to="/">
				&larr; К выбору площадки
			</NavLink>
		</div>
	);
}
