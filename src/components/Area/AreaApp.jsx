import React from 'react';
import './AreaApp.scss';
import { NavLink } from 'react-router-dom';
import { ButtonKindsOfSports } from '../Button/ButtonKindsOfSports';
import MapComponent from '../Map/Map';
import addPictures from '../../images/icon-plus.svg';
import { ButtonAppSite } from '../Button/ButtonAppSite';

export function AreaApp(onAreaApp) {
	return (
		<div className="area-app">
			<div className="area-app__information">
				<NavLink className="area-app__link" to="/">
					&larr; К выбору площадки
				</NavLink>
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
					<MapComponent className="map-container_place_area-app" />
					<div className="kinds-of-sports">
						<h3 className="kinds-of-sports__title">Виды спорта</h3>
						<form className="input-container">
							<label htmlFor="name-site" className="input-container__label">
								Название площадки*
								<input
									type="text"
									className="input-container__input"
									name="name-site"
									placeholder="Например, Футбольное поле"
								/>
							</label>
						</form>
						<div className="kinds-of-sports__buttons">
							<ButtonKindsOfSports ball="football" label="Футбол" />
							<ButtonKindsOfSports ball="bascetball" label="Баскетбол" />
							<ButtonKindsOfSports ball="football" label="Волейбол" />
							<ButtonKindsOfSports ball="bascetball" label="Каток" />
							<ButtonKindsOfSports ball="bascetball" label="Тренажеры" />
						</div>
					</div>
					<div className="foto">
						<h3 className="foto__title">Фотографии</h3>
						<div className="foto__container">
							<label htmlFor="add-file" className="foto__file-label">
								<input
									type="file"
									className="foto__file-add"
									name="add-file"
									multiple
									accept="image/png, image/jpeg"
									id="add-file"
								/>
								<img
									className="foto-file-img"
									src={addPictures}
									alt="Добавление картинки"
								/>
							</label>
						</div>
					</div>
					<ButtonAppSite onClick={onAreaApp} label="Добавить площадку" />
				</form>
			</div>
		</div>
	);
}
