import { Formik, Form, useFormikContext } from 'formik';
import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchUserInfo,
	fetchEditUserInfo,
	fetchChangeAvatar,
} from '../../../services/thunks/userThunk';
import {
	getUserInfo,
	getIsUserDataEditing,
	getErrorMessageEditUserData,
} from '../../../services/selectors/userSelector';
import {
	setIsUserDataEditingTrue,
	setIsUserDataEditingFalse,
	clearEditUserDataError,
} from '../../../services/slices/userSlice';
import './PersonalData.scss';
import InputNickname from '../../../components/Inputs/InputNickname';
import { Button } from '../../../components/Button/Button';

export default function PersonalData() {
	const dispatch = useDispatch();
	const user = useSelector(getUserInfo);
	const isUserDataEditing = useSelector(getIsUserDataEditing);

	// const profilePhoto = useSelector((state) => state.user.photo);

	useEffect(() => {
		dispatch(fetchUserInfo());
	}, [dispatch]);

	// ресетим состояние редактирования при свиче на другое меню
	// useCallback запоминает функцию и предотвращает ререндеринг компонентов
	const resetUserDataEditing = useCallback(() => {
		dispatch(setIsUserDataEditingFalse()); // отключаем режим редактирования при размонтировании компонента (при свиче)
	}, [dispatch]);

	function updateProfilePhoto(e) {
		const selectedFile = e.target.files[0];
		dispatch(fetchChangeAvatar({ photo: selectedFile }));
	}

	useEffect(() => {
		// при каждом рендере вызываем ресет состояния редактирования
		const cleanup = () => {
			resetUserDataEditing();
		};

		return cleanup;
	}, [resetUserDataEditing]);

	const validate = (values) => {
		const errors = {};
		if (user?.nickname === values.Nickname) {
			errors.Nickname = 'Никнейм должен отличаться от текущего';
		}
		// добавить проверку почты
		return errors;
	};

	const handleSubmit = useCallback(
		(values) => {
			dispatch(fetchEditUserInfo({ nickname: values.Nickname }));
		},
		[dispatch]
	);

	return (
		<section className="personal-data">
			<h2 className="form__title_place_profile">Личные данные</h2>
			<div className="form_place_profile">
				<div className="profile__personal-info-container">
					<label htmlFor="avatar-input" className="profile__avatar-button">
						<img
							src={user?.photo}
							alt="Аватар профиля"
							className="profile__avatar"
						/>
					</label>
					{/* Скрытый input для загрузки файла */}
					<input
						type="file"
						id="avatar-input"
						accept="image/*"
						style={{ display: 'none' }}
						onChange={updateProfilePhoto}
					/>
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
						validate={validate}
					>
						{() => <FormComponent />}
					</Formik>
				) : (
					<>
						<div className="profile__info-container">
							<p className="profile__field-title">Никнейм</p>
							<p className="profile__field-name">{user?.nickname}</p>
							<p className="profile__field-title">E-mail</p>
							<p className="profile__field-name">{user?.email}</p>
						</div>
						<Button
							label="Изменить данные"
							type="button"
							onClick={() => dispatch(setIsUserDataEditingTrue())}
							ariaLabel="Изменить данные"
							customStyle="profile__change-button"
						/>
					</>
				)}
			</div>
		</section>
	);
}

function FormComponent() {
	const user = useSelector(getUserInfo);
	const isLoadingUserData = useSelector(
		(state) => state.user.isLoadingUserData
	);
	const isUserDataEditing = useSelector(getIsUserDataEditing);
	const errorMessageEditUserData = useSelector(getErrorMessageEditUserData);
	const dispatch = useDispatch();

	const { values } = useFormikContext();

	useEffect(() => {
		dispatch(clearEditUserDataError());
	}, [values, dispatch]);

	const isDataChanged = (e) => user?.nickname !== e.target.value;

	return (
		<Form noValidate className="profile__change-info-form">
			<InputNickname />
			{/* <InputEmail /> */}
			<span className="profile__server-error">
				{errorMessageEditUserData || ''}
			</span>
			<div className="profile__button-container">
				<Button
					customStyle="profile__change-button no-margin"
					label={
						isUserDataEditing && !isLoadingUserData
							? 'Сохранить'
							: 'Сохранение...'
					}
					type="submit"
					disabled={!isDataChanged}
				/>
				<Button
					customStyle="profile__cancel-button"
					type="button"
					onClick={() => dispatch(setIsUserDataEditingFalse())}
					label="Отмена"
					ariaLabel="Отмена"
				/>
			</div>
		</Form>
	);
}
