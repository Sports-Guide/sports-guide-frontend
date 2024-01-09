import React from 'react';
import './AreaApp.scss';
import { NavLink } from 'react-router-dom';
import { ButtonKindsOfSports } from '../Button/ButtonKindsOfSports';
import MapComponent from '../Map/Map';

export function AreaApp() {
	return (
		<div className="area-app">
			<NavLink className="area-app__link" to="/">
				&larr; К выбору площадки
			</NavLink>
			<div className="area-app__information">
				<h2 className="area-app__title">Добавление площадки</h2>
				<p className="area-app__subtitle">Основная информация</p>
				<form action="" className="input-container">
					<label htmlFor="name-site" className="input-container__label">
						Название площадки*
						<input
							type="text"
							className="input-container__input"
							name="name-site"
							placeholder="Например, Футбольное поле"
						/>
					</label>
					<label htmlFor="name-site" className="input-container__label">
						Адрес площадки
						<input
							type="text"
							className="input-container__input"
							name="name-site"
							placeholder="Россия, Москва, Южный административный округ, район Зябликово"
						/>
					</label>
					<MapComponent />
					<div className="kinds-of-sports">
						<h3 className="kinds-of-sports__title">Виды спорта</h3>
						<div className="kinds-of-sports__buttons">
							<ButtonKindsOfSports ball="football" label="Футбол" />
							<ButtonKindsOfSports ball="bascetball" label="Баскетбол" />
							<ButtonKindsOfSports ball="football" label="Волейбол" />
							<ButtonKindsOfSports ball="bascetball" label="Каток" />
							<ButtonKindsOfSports ball="bascetball" label="Тренажеры" />
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
