import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../services/slices/modalSlice';
import { fetchUserInfo } from '../../../services/thunks/userThunk';
import { fetchInitiatingPasswordReset } from '../../../services/thunks/resetPasswordThunk';
import { getUserInfo } from '../../../services/selectors/userSelector';
import { Button } from '../../../components/Button/Button';
import ResetButtonIcon from '../../../images/reset-password-icon.svg';
import DeleteAccIcon from '../../../images/delete-account-icon.svg';

import './PasswordData.scss';

export default function PasswordData() {
	const dispatch = useDispatch();
	const user = useSelector(getUserInfo);

	useEffect(() => {
		dispatch(fetchUserInfo());
	}, [dispatch]);

	const handleClick = () => {
		const email = user?.email;
		dispatch(fetchInitiatingPasswordReset({ email }))
			.then(() => {
				dispatch(openModal('passwordReset'));
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<section className="password-data">
				<h2 className="form__title_place_profile">Пароль</h2>
				<Button
					customStyle="form__change-password-button no-margin"
					type="button"
					onClick={handleClick}
					label="Сбросить"
					ariaLabel="Сбросить пароль"
					startIcon={
						<img
							src={ResetButtonIcon}
							alt="blue key icon for resetting password button"
						/>
					}
				/>
			</section>
			<section className="password-data">
				<h2 className="form__title_place_profile">Действия с аккаунтом</h2>
				<Button
					customStyle="profile__nav-button profile__button-account-delete"
					type="button"
					onClick={() => dispatch(openModal('deleteProfile'))}
					label="Удалить аккаунт"
					ariaLabel="Удалить аккаунт"
					startIcon={
						<img
							src={DeleteAccIcon}
							alt="red trash icon for deleting account button"
						/>
					}
				/>
			</section>
		</>
	);
}
