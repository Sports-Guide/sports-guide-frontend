import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Multiselect from 'multiselect-react-dropdown';
import PropTypes from 'prop-types';
import './AreaApp.scss';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import addPictures from '../../images/Camera.svg';
import { Button } from '../Button/Button';
import YandexMap from '../YandexMap/YandexMap';
import { openModal } from '../../services/slices/modalSlice';

function AreaApp({ areas, categories, handleAddArea }) {
	const dispatch = useDispatch();

	const [options] = useState(categories);
	// отправка формы на сервер
	const [areaDescription, setAreaDiscriptin] = useState([]);
	// добавление категорий
	const [category, setCategory] = useState([]);
	// добавление фотографий
	const [addFoto, setAddFoto] = useState([]);
	// координаты карт
	const [coordinate, setCoordinate] = useState([]);
	const [adressText, setAdressText] = useState([]);
	// широта

	const handlDescription = (e) => {
		setAreaDiscriptin(e.target.value);
	};

	const handleFoto = (e) => {
		const file = Array.from(e.target.files);
		if (file.length > 3) {
			console.log('Большое количество');
		} else {
			setAddFoto(file);
		}
	};

	const handleDeletePhoto = (index) => {
		const filteredFoto = addFoto.filter((_, i) => i !== index);
		setAddFoto(filteredFoto);
	};

	const handleCategories = (e) => {
		setCategory(e.target.value);
	};

	const handleSubmit = (event) => {
		dispatch(openModal('createAreasSuccess'));
		event.preventDefault();
		handleAddArea(
			adressText,
			areaDescription,
			coordinate.map((cord) => cord[0]),
			coordinate.map((cord) => cord[1]),
			category.map((categor) => categor.id),
			addFoto
		);
	};

	useEffect(() => {}, [addFoto]);

	return (
		<div className="area-app">
			<div className="area-app__information">
				<NavLink className="area-app__link" to="/">
					К выбору площадки
				</NavLink>
				<h2 className="area-app__title">Добавление площадки</h2>
				<form className="addition-area" onSubmit={handleSubmit}>
					<div className="kinds-of-sports">
						<h3 className="kinds-of-sports__title">Виды спорта</h3>
						<Multiselect
							showCheckbox
							placeholder=""
							options={options}
							displayValue="name"
							customCloseIcon={<> </>}
							onSelect={(event) => {
								setCategory(event);
							}}
							onRemove={(event) => {
								setCategory(event);
							}}
							onChange={handleCategories}
						/>
					</div>
					<div className="location">
						<p htmlFor="text" className="location__label">
							Адрес площадки
						</p>
						<YandexMap
							areas={areas}
							areaAppClass="map_area-app"
							setCoordinate={setCoordinate}
							setAdressText={setAdressText}
							placeholder="Двигайте ползунок на карте, чтобы указать адрес"
						/>
					</div>
					<div className="description-of-the-site">
						<h3 className="description-of-the-site__title">
							Описание площадки
						</h3>
						<textarea
							className="description-of-the-site__textarea"
							id="add-text"
							name="add-text"
							placeholder=" "
							onChange={handlDescription}
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
										onClick={() => handleDeletePhoto(index)}
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
							label="Добавить площадку"
							onClick={handleSubmit}
						/>
					</div>
				</form>
			</div>
		</div>
	);
}

AreaApp.propTypes = {
	areas: PropTypes.arrayOf.isRequired,
	categories: PropTypes.arrayOf.isRequired,
	handleAddArea: PropTypes.arrayOf.isRequired,
};
export default AreaApp;
