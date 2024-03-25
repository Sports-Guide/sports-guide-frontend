import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../services/slices/modalSlice';
import { fetchUserInfo } from '../../../services/thunks/userThunk';
import { fetchInitiatingPasswordReset } from '../../../services/thunks/resetPasswordThunk';
import { getUserInfo } from '../../../services/selectors/userSelector';
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
				<button
					className="form__change-password-button no-margin"
					type="button"
					onClick={handleClick}
					disabled={false}
				>
					<img
						src={ResetButtonIcon}
						alt="blue key icon for resetting password button"
					/>
					Сбросить
				</button>
			</section>
			<section className="password-data">
				<h2 className="form__title_place_profile">Действия с аккаунтом</h2>
				<button
					className="profile__nav-button profile__button-account-delete"
					onClick={() => dispatch(openModal('deleteProfile'))}
				>
					<img
						src={DeleteAccIcon}
						alt="red trash icon for deleting account button"
					/>
					Удалить аккаунт
				</button>
			</section>
		</>
	);
}
