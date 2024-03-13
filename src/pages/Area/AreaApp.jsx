import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Multiselect from 'multiselect-react-dropdown';
import PropTypes from 'prop-types';
import './AreaApp.scss';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import addPictures from '../../images/Camera.svg';
import { Button } from '../../components/Button/Button';
import '../../components/Button/Button.scss';
import YandexMap from '../../components/YandexMap/YandexMap';
import SearchBar from '../../components/SearchBar/SearchBar';
import { openModal } from '../../services/slices/modalSlice';
import {
	areasList,
	categoryList,
	addressSelector,
	coordinatesSelector,
} from '../../services/selectors/areaSelector';

export default function AreaApp({ handleAddArea }) {
	const dispatch = useDispatch();
	const areas = useSelector(areasList);
	const categories = useSelector(categoryList);
	const address = useSelector(addressSelector);
	const coordinates = useSelector(coordinatesSelector);

	const [options, setOptions] = useState(categories);

	// отправка формы на сервер
	const [areaDescription, setAreaDiscriptin] = useState([]);
	// добавление категорий
	const [category, setCategory] = useState([]);
	// добавление фотографий
	const [addFoto, setAddFoto] = useState([]);

	const [fotoFour, setFotoFour] = useState(true);
	const [largeFoto, setLargeFoto] = useState('');

	// настройка под разные разрешения экрана
	const browserWindowSize = window.innerWidth;
	const [windowSize, setWindowSize] = useState(true);

	// широта

	const handlDescription = (e) => {
		setAreaDiscriptin(e.target.value);
	};

	const handleFoto = (e) => {
		const file = Array.from(e.target.files);
		if (file.length === 4) {
			setFotoFour(false);
			setAddFoto(file);
			setLargeFoto('');
		} else if (file.length > 4) {
			setLargeFoto('Можно добавлять не больше 4 фотографий за раз');
		} else {
			setAddFoto(file);
			setLargeFoto('');
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
			address,
			areaDescription,
			coordinates.map((cord) => cord[0]),
			coordinates.map((cord) => cord[1]),
			category.map((categor) => categor.id),
			addFoto
		);
	};

	useEffect(() => {
		setOptions(categories);
	}, [categories]);

	useEffect(() => {
		if (addFoto.length === 4) {
			setFotoFour(false);
		} else {
			setFotoFour(true);
		}
	}, [addFoto, windowSize]);

	useEffect(() => {
		const CheckWindowWidth = () => {
			if (browserWindowSize >= 495) {
				setWindowSize(true);
			} else {
				setWindowSize(false);
			}
		};
		CheckWindowWidth();
		window.addEventListener('resize', CheckWindowWidth);
	}, [browserWindowSize]);

	return (
		<div className="area-app">
			<div className="area-app__information">
				<NavLink
					className={windowSize ? 'area-app__link' : 'area-app__link-none'}
					to="/"
				>
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
						<SearchBar />
						<YandexMap areas={areas} />
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
						{windowSize ? (
							''
						) : (
							<div
								className={
									fotoFour
										? 'foto__file-label-small'
										: 'foto__file-label-small-none'
								}
							>
								<p className="foto__file-text-small">
									Макс. размер: 5 Мб. Формат: JPEG или PNG.
								</p>
								<div className="foto-file__small">
									<label htmlFor="add-file-small" className="button-add-foto">
										Загрузить фото
										<input
											type="file"
											className="foto__file-add"
											name="add-file-small"
											accept="image/png, image/jpeg"
											id="add-file-small"
											onChange={handleFoto}
											multiple
										/>
									</label>
									<p className="foto__large-foto-small">Не более 4 фото.</p>
								</div>
							</div>
						)}
						<div className="foto__container">
							{windowSize ? (
								<label
									htmlFor="add-file"
									className={
										fotoFour ? 'foto__file-label' : 'foto__file-label_none'
									}
								>
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
							) : (
								''
							)}

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
						<p className="foto__large-foto">{largeFoto}</p>
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
	handleAddArea: PropTypes.arrayOf.isRequired,
};
