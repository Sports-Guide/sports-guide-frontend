import { Formik, Form } from 'formik';
import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchUserInfo,
	fetchEditUserInfo,
} from '../../services/thunks/userThunk';
import {
	getUserInfo,
	getIsUserDataEditing,
} from '../../services/selectors/userSelector';
import {
	setIsUserDataEditingTrue,
	setIsUserDataEditingFalse,
} from '../../services/slices/userSlice';
import './PersonalData.scss';
import InputNickname from '../Inputs/InputNickname';
// import InputEmail from '../Inputs/InputEmail';

export function PersonalData() {
	const dispatch = useDispatch();
	const user = useSelector(getUserInfo);
	const isUserDataEditing = useSelector(getIsUserDataEditing);
	const errorMessageEditUserData = useSelector(
		(state) => state.user.errorMessageEditUserData
	);

	useEffect(() => {
		dispatch(fetchUserInfo());
	}, [dispatch]);

	// ресетим состояние редактирования при свиче на другое меню
	// useCallback запоминает функцию и предотвращает ререндеринг компонентов
	const resetUserDataEditing = useCallback(() => {
		dispatch(setIsUserDataEditingFalse()); // отключаем режим редактирования при размонтировании компонента (при свиче)
	}, [dispatch]);

	useEffect(() => {
		// при каждом рендере вызываем ресет состояния редактирования
		const cleanup = () => {
			resetUserDataEditing();
		};

		return cleanup;
	}, [resetUserDataEditing]);

	const isDataChanged = (e) => user?.nickname !== e.target.value;

	const handleSubmit = ({ Nickname }) => {
		if (user?.nickname !== Nickname) {
			// диспачим только если есть изменения
			dispatch(fetchEditUserInfo({ nickname: Nickname }))
				.then(() => {
					dispatch(setIsUserDataEditingFalse());
				})
				.catch((error) => {
					console.error('Ошибка обновления профиля:', error);
				});
		} else {
			console.log('No changes made');
		}
	};

	return (
		<>
			<h2 className="form__title_place_profile">Личные данные</h2>
			<div className="form_place_profile">
				<div className="profile__personal-info-container">
					<button
						type="button"
						className="profile__avatar-button"
						// onClick={onEditAvatar}
					>
						<img
							src={user?.photo}
							alt="Аватар профиля"
							className="profile__avatar"
						/>
					</button>
					<div className="profile__name-container">
						<p className="profile__name">{user?.nickname}</p>
						<p className="profile__email">{user?.email}</p>
					</div>
				</div>
				{isUserDataEditing ? (
					<Formik
						initialValues={{
							Nickname: user?.nickname,
							// Email: user?.email,
						}}
						className="profile__change-info-container"
						onSubmit={handleSubmit}
					>
						{() => (
							<Form noValidate className="profile__change-info-form">
								<InputNickname />
								{/* <InputEmail /> */}
								<span className="profile_server-error">
									{errorMessageEditUserData}
								</span>
								<div className="profile__button-container">
									<button
										className="profile__change-button no-margin"
										type="submit"
										disabled={!isDataChanged}
									>
										{isUserDataEditing ? 'Сохранить' : 'Изменить'}
									</button>
									<button
										className="profile__cancel-button"
										type="button"
										onClick={() => dispatch(setIsUserDataEditingFalse())}
									>
										Отмена
									</button>
								</div>
							</Form>
						)}
					</Formik>
				) : (
					<>
						<div className="profile__info-container">
							<p className="profile__field-title">Никнейм</p>
							<p className="profile__field-name">{user?.nickname}</p>
							<p className="profile__field-title">E-mail</p>
							<p className="profile__field-name">{user?.email}</p>
						</div>
						<button
							className="profile__change-button"
							type="button"
							onClick={() => dispatch(setIsUserDataEditingTrue())}
							disabled={false}
						>
							{isUserDataEditing ? 'Сохранить' : 'Изменить'}
						</button>
					</>
				)}
			</div>
		</>
	);
}

export default PersonalData;
