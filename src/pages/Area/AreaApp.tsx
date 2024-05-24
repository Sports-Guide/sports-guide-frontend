import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import './AreaApp.scss';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import addPictures from '../../images/Camera.svg';
import { ButtonOld } from '../../components/Button/ButtonOld';
import '../../components/Button/ButtonOld.scss';
import YandexMap from '../../components/YandexMap/YandexMap';
import SearchBar from '../../components/SearchBar/SearchBar';
import { openModal } from '../../services/slices/modalSlice';
import {
	categoryList,
	addressSelector,
	coordinatesSelector,
	categoryErrorMessage,
	isAreaAddedStatus,
	isAreaAddedError,
} from '../../services/selectors/areaSelector';
import { fetchAddArea } from '../../services/thunks/areasThunk';
import {
	setIsAreaAdded,
	setIsAreaError,
} from '../../services/slices/areaSlice';
import { AppDispatch } from '../../services/store';
import { Categories, AddAreaRequestData } from '../../utils/types';

const AreaApp: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const categories = useSelector(categoryList);
	const address = useSelector(addressSelector);
	const coordinates = useSelector(coordinatesSelector);
	const categoryError = useSelector(categoryErrorMessage);
	const isAreaAdded = useSelector(isAreaAddedStatus);
	const isAreaAddError = useSelector(isAreaAddedError);

	const [options, setOptions] = useState<Categories>(categories);

	// отправка формы на сервер
	const [areaDescription, setAreaDiscriptin] = useState<string>('');
	// добавление категорий
	const [category, setCategory] = useState<any[]>([]);
	const [categoryCount, setCategoryCount] = useState<number>(0);
	// добавление фотографий
	const [addFoto, setAddFoto] = useState<File[]>([]);

	const [fotoFour, setFotoFour] = useState<boolean>(true);
	const [largeFoto, setLargeFoto] = useState<string>('');

	// настройка под разные разрешения экрана
	const browserWindowSize = window.innerWidth;
	const [windowSize, setWindowSize] = useState<boolean>(true);
	const [isSubmitAvailable, setIsSubmitAvailable] = useState<boolean>(false);

	useEffect(() => {
		if (categoryError) {
			dispatch(openModal('getCategoryError'));
		}
	}, [categoryError, dispatch]);

	useEffect(() => {
		setIsSubmitAvailable(categoryCount !== 0 && address !== '');
	}, [address, categoryCount]);

	// широта

	const handlDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setAreaDiscriptin(e.target.value);
	};

	const handleFoto = (e: ChangeEvent<HTMLInputElement>) => {
		const file = Array.from(e.target.files || []);
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

	const handleDeletePhoto = (index: number) => {
		const filteredFoto = addFoto.filter((_, i) => i !== index);
		setAddFoto(filteredFoto);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const requestData: AddAreaRequestData = {
			address,
			description: areaDescription,
			latitude: coordinates.map((cord) => cord[0].toString()).join(', '),
			longitude: coordinates.map((cord) => cord[1].toString()).join(', '),
			categories: category.map((categor) => categor.id.toString()),
			images: addFoto,
		};
		dispatch(fetchAddArea(requestData));
	};

	useEffect(() => {
		if (isAreaAdded) {
			dispatch(openModal('createAreasSuccess'));
			dispatch(setIsAreaAdded(false));
		} else if (isAreaAddError) {
			dispatch(openModal('createAreasError'));
			dispatch(setIsAreaError(false));
		}
	}, [dispatch, isAreaAdded, isAreaAddError]);

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
							placeholder="Выберите из списка"
							hidePlaceholder
							options={options}
							displayValue="name"
							emptyRecordMsg="Закончились доступные категории"
							avoidHighlightFirstOption
							customCloseIcon={<> </>}
							onSelect={(event) => {
								setCategory(event);
								setCategoryCount((prevCount) => prevCount + 1);
							}}
							onRemove={(event) => {
								setCategory(event);
								setCategoryCount((prevCount) => prevCount - 1);
							}}
						/>
					</div>
					<div className="location">
						<p className="location__label">Адрес площадки</p>
						<SearchBar />
						<YandexMap />
					</div>
					<div className="description-of-the-site">
						<h3 className="description-of-the-site__title">
							Описание площадки
						</h3>
						<textarea
							className="description-of-the-site__textarea"
							id="add-text"
							name="add-text"
							placeholder="Начните писать..."
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
								// eslint-disable-next-line
								<div className="foto-file__container" key={index}>
									<ButtonOld
										className="button-clouse-foto-file"
										onClick={() => handleDeletePhoto(index)}
										disabled={!isSubmitAvailable}
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
						{isSubmitAvailable ? null : (
							<h4 className="app-area__error-message">
								Поля выбора категорий и адреса обязательны к заполнению.
							</h4>
						)}
						<ButtonOld
							className="button-add"
							label="Добавить площадку"
							onClick={handleSubmit}
							disabled={!isSubmitAvailable}
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AreaApp;
