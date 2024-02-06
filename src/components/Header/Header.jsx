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

export function Header() {
	const isUserAuth = useSelector(getIsUserAuth);
	const navigate = useNavigate();

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
