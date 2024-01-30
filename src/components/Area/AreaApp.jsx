import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Multiselect from 'multiselect-react-dropdown';
import PropTypes from 'prop-types';
import './AreaApp.scss';
import { NavLink } from 'react-router-dom';
import addPictures from '../../images/Camera.svg';
import { Button } from '../Button/Button';
import { Popup } from '../Popup/Popup';
import YandexMap from '../YandexMap/YandexMap';

function AreaApp({ isCheckPopup, onClose, handleAreaApp, areas }) {
	const data = [
		{ Country: 'Футбол', id: 1 },
		{ Country: 'Баскетбол', id: 2 },
		{ Country: 'Волейбол', id: 3 },
		{ Country: 'Каток', id: 4 },
	];
	const [options] = useState(data);

	const handleSubmit = (event) => {
		event.preventDefault();
		handleAreaApp(!isCheckPopup);
	};

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
							placeholder=""
							options={options}
							displayValue="Country"
							customCloseIcon={<> </>}
						/>
					</div>
					<div className="location">
						<label htmlFor="text" className="location__label">
							Адрес площадки
							<input
								type="text"
								id="text"
								className="location__adress"
								placeholder="Введите адрес"
							/>
						</label>
						<YandexMap areas={areas} areaAppClass="map_area-app" />
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

						<Button
							className="button-add"
							onClick={handleSubmit}
							label="Добавить площадку"
						/>
					</div>
					<Popup
						onClose={onClose}
						isOpen={isCheckPopup}
						title="Проверка началась"
						checkPopup="popup-check"
						headerClassName="popup-check__title"
					>
						<p className="popup-check__subtitle">
							Как только площадка пройдет проверку, она будет доступна для всех
							пользователей.
						</p>
						<Button className="button-add__check" label="На главную" />
					</Popup>
				</form>
			</div>
		</div>
	);
}

AreaApp.propTypes = {
	isCheckPopup: PropTypes.bool.isRequired,
	onClose: PropTypes.bool.isRequired,
	handleAreaApp: PropTypes.bool.isRequired,
	areas: PropTypes.arrayOf.isRequired,
};
export default AreaApp;
