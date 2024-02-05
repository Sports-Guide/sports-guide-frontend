import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Multiselect from 'multiselect-react-dropdown';
import PropTypes from 'prop-types';
import './AreaApp.scss';
import { NavLink, useNavigate } from 'react-router-dom';
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

	const navigate = useNavigate();

	// добавление фотографий
	const [addFoto, setAddFoto] = useState([]);
	// const [addFotoArray,setAddFotoArray]= useState([]);

	const navigateToMain = () => {
		navigate('/');
	};

	const handleFoto = (e) => {
		const file = Array.from(e.target.files);
		if (file.length > 3) {
			console.log('Большое количество');
		} else {
			setAddFoto(file);
			console.log(file);
		}
	};

	const deletePhoto = (index) => {
		console.log(index);
		console.log(addFoto);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		handleAreaApp(!isCheckPopup);
		console.log(addFoto);
	};

	useEffect(() => {}, [addFoto]);

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
						<p htmlFor="text" className="location__label">
							Адрес площадки
						</p>
						<YandexMap
							areas={areas}
							areaAppClass="map_area-app"
							placeHolder="Введите адресс"
						/>
					</div>
					<div className="foto">
						<h3 className="foto__title">Фотографии</h3>

						<div className="foto__container">
							<label htmlFor="add-file" className="foto__file-label">
								<input
									type="file"
									className="foto__file-add"
									name="add-file"
									accept="image/png, image/jpeg"
									id="add-file"
									onChange={handleFoto}
									multiple
								/>
								<img
									className="foto-file-img"
									src={addPictures}
									alt="Добавление картинки"
								/>
								<p className="foto__file-text">
									Макс. размер: 5 Мб. Формат: JPEG или PNG.
								</p>
							</label>

							{addFoto.map((file, index) => (
								<div className="foto-file__container" key={file}>
									<Button
										className="button-clouse-foto-file"
										onClick={() => deletePhoto(index)}
									/>
									<img
										className="foto-file__add-server"
										src={URL.createObjectURL(file)}
										alt="Добавление картинки"
									/>
								</div>
							))}
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
						<Button
							className="button-add__check"
							label="На главную"
							onClick={navigateToMain}
						/>
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
