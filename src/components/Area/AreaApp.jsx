import React, { useState } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import './AreaApp.scss';
import { NavLink } from 'react-router-dom';
import MapComponent from '../Map/Map';
import addPictures from '../../images/Camera.svg';
import { ButtonAppSite } from '../Button/ButtonAppSite';

export function AreaApp(onAreaApp) {
	const data = [
		{ Country: 'Футбол', id: 1 },
		{ Country: 'Баскетбол', id: 2 },
		{ Country: 'Волейбол', id: 3 },
		{ Country: 'Каток', id: 4 },
	];
	const [options] = useState(data);
	return (
		<div className="area-app">
			<div className="area-app__information">
				<NavLink className="area-app__link" to="/">
					К выбору площадки
				</NavLink>
				<h2 className="area-app__title">Добавление площадки</h2>
				<form className="addition-area">
					<div className="kinds-of-sports">
						<h3 className="kinds-of-sports__title">Виды спорта</h3>
						<Multiselect
							showCheckbox
							placeholder=" "
							options={options}
							displayValue="Country"
						/>
					</div>
					<div className="location">
						<label htmlFor="text" className="location__label">
							Адрес площадки
							<input type="text" id="text" className="location__adress" />
						</label>
						<MapComponent className="map-container_place_area-app" />
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
					<div className="app-area">
						<p className="app-area__subtitle">
							Перед публикацией площадка будет проверена модерацией нашего
							сервиса. Это может занять некоторое время.
						</p>
						<div className="test">
							<ButtonAppSite onClick={onAreaApp} label="Добавить площадку" />
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
