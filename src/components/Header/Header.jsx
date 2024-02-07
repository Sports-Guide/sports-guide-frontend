import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../Button/Button';
import { ButtonLoginSite } from '../Button/ButtonLoginSite';
import { ButtonMap } from '../Button/ButtonMap';
import logo from '../../images/logo.svg';

import { getIsUserAuth } from '../../services/selectors/userSelector';
import './Header.scss';
import { openModal } from '../../services/slices/modalSlice';
import { addPoint } from '../../services/slices/getAreasSlice';

export function Header() {
	const isUserAuth = useSelector(getIsUserAuth);
	const navigate = useNavigate();

	const areas = useSelector((state) => state.getAreas.areasList);

	const newPoint = {
		id: 21,
		name: '1',
		moderation_status: 'approved',
		author: {
			id: 3,
			nickname: 'sport-user1',
			email: 'user1@sports-map.ru',
			photo: null,
		},
		latitude: '100.776209',
		longitude: '37.673443',
		categories: [
			{ id: 1, name: 'category0', area_name: '1', slug: 'slug-category0' },
		],
		images: [
			{
				id: 1,
				image:
					'http://sports-map.ru/media/area_images/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA_%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2024-02-01_142402.png',
			},
			{
				id: 2,
				image:
					'http://sports-map.ru/media/area_images/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA_%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2024-02-02_093944.png',
			},
			{
				id: 3,
				image:
					'http://sports-map.ru/media/area_images/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA_%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2024-02-01_133855.png',
			},
			{
				id: 4,
				image:
					'http://sports-map.ru/media/area_images/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA_%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2024-02-01_133855_CfGfIi3.png',
			},
		],
		is_favorited: false,
	};

	const newAreas = [...areas, newPoint];

	const navigateHome = () => {
		navigate('app-area');
	};

	const navigateToPersonalArea = () => {
		navigate('profile');
	};

	const dispatch = useDispatch();

	const handleOpenModal = (type) => {
		dispatch(openModal(type));
	};

	return (
		<header className="header">
			<div className="header__container">
				<Link to="/" className="header__logo">
					<img className="logo" src={logo} alt="" />
					<h4 className="header__title">СПОРТИВНЫЙ ГИД</h4>
					<ButtonMap label="Москва" />
				</Link>
				<div className="header__buttons">
					<ButtonLoginSite
						onClick={() => dispatch(addPoint(newAreas))}
						type="button"
						label="Получить список"
					/>
					<Button
						className="button-app"
						onClick={isUserAuth ? navigateHome : () => handleOpenModal('login')}
						label="Добавить площадку"
					/>
					{isUserAuth ? (
						<ButtonLoginSite
							onClick={navigateToPersonalArea}
							label="Личный&nbsp;кабинет"
						/>
					) : (
						<ButtonLoginSite
							onClick={() => dispatch(openModal('login'))}
							type="button"
							label="Войти"
						/>
					)}
				</div>
			</div>
		</header>
	);
}
