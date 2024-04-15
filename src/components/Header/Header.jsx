import React from 'react';
import './Header.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../Button/Button';
import LocationIcon from '../svg/LocationIcon';
import PlusIcon from '../svg/PlusIcon';
import MenuIcon from '../svg/MenuIcon';
import { getIsUserAuth } from '../../services/selectors/userSelector';
import { openModal } from '../../services/slices/modalSlice';
import { LogoLink } from '../Logo/LogoLink';

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
				<LogoLink />
				<Button
					type="button"
					startIcon={<MenuIcon />}
					disabled={false}
					customStyle="button-menu"
					ariaLabel="Открыть меню"
				/>
				<div className="header__buttons">
					<Button
						label="Москва"
						type="button"
						btnStyle="flat"
						size="small"
						disabled={false}
						startIcon={<LocationIcon />}
						ariaLabel="Выбрать город"
					/>
					<Button
						label="Добавить площадку"
						type="button"
						btnStyle="primary"
						size="small"
						onClick={isUserAuth ? navigateHome : () => handleOpenModal('login')}
						startIcon={<PlusIcon />}
						ariaLabel="Добавить площадку"
					/>
					<Button
						label={isUserAuth ? 'Личный кабинет' : 'Войти'}
						type="button"
						btnStyle="secondary"
						size="small"
						ariaLabel={
							isUserAuth ? 'Открыть личный кабинет' : 'Войти в личный кабинет'
						}
						onClick={
							isUserAuth
								? navigateToPersonalArea
								: () => handleOpenModal('login')
						}
					/>
				</div>
			</div>
		</header>
	);
}
