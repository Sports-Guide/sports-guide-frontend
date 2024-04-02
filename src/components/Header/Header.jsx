import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../Button/Button';
import logo from '../../images/logo.svg';

import { getIsUserAuth } from '../../services/selectors/userSelector';
import './Header.scss';
import { openModal } from '../../services/slices/modalSlice';
import LocationIcon from '../svg/LocationIcon';
import PlusIcon from '../svg/PlusIcon';

export function Header() {
	const isUserAuth = useSelector(getIsUserAuth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const navigateHome = () => {
		navigate('app-area');
	};

	const navigateToPersonalArea = () => {
		navigate('profile');
	};

	const handleOpenModal = (type) => {
		dispatch(openModal(type));
	};

	return (
		<header className="header">
			<div className="header__container">
				<Link to="/" className="header__logo">
					<img className="logo" src={logo} alt="" />
					<h4 className="header__title">СПОРТИВНЫЙ ГИД</h4>
				</Link>
				<div className="header__buttons">
					<Button
						label="Москва"
						type="button"
						btnStyle="flat"
						size="small"
						disabled={false}
						startIcon={<LocationIcon />}
					/>
					<Button
						label="Добавить площадку"
						type="button"
						btnStyle="primary"
						size="small"
						onClick={isUserAuth ? navigateHome : () => handleOpenModal('login')}
						startIcon={<PlusIcon />}
					/>
					{isUserAuth ? (
						<Button
							label="Личный&nbsp;кабинет"
							type="button"
							btnStyle="secondary"
							size="small"
							onClick={navigateToPersonalArea}
						/>
					) : (
						<Button
							label="Войти"
							type="button"
							btnStyle="secondary"
							size="small"
							onClick={() => dispatch(openModal('login'))}
						/>
					)}
				</div>
			</div>
		</header>
	);
}
