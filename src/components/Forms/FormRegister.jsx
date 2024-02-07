import { Formik, Form } from 'formik'; // https://formik.org/ - документация библиотеки formik
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './FormRegister.scss';
import { Button } from '../Button/Button';
import InputEmail from '../Inputs/InputEmail';
import InputPassword from '../Inputs/InputPassword';
import InputNickname from '../Inputs/InputNickname';
import InputCheckbox from '../Inputs/InputCheckbox';
import { ButtonOnLoginPopUp } from '../Button/ButtonOnLoginPopUp';
import { fetchRegister } from '../../services/thunks/registerUserThunk';
import { openModal } from '../../services/slices/modalSlice';
import { clearRegisterError } from '../../services/slices/registerUserSliсe';

export default function FormRegister() {
	const dispatch = useDispatch();
	const isOpenModal = useSelector((state) => state.modal.isOpen);
	const isRegister = useSelector((state) => state.registerUser.isRegister);
	const isLoadingRegister = useSelector(
		(state) => state.registerUser.isLoadingRegister
	);
	const errorMessageRegister = useSelector(
		(state) => state.registerUser.errorMessageRegister
	);

	const handleSubmit = useCallback(
		(values) => {
			dispatch(
				fetchRegister({
					nickname: values.Nickname,
					email: values.Email,
					password: values.Password,
					passwordConfirmation: values.PasswordRepeat,
				})
			);
		},
		[dispatch]
	);

	const validate = (values) => {
		const errors = {};
		if (values.Password !== values.PasswordRepeat) {
			errors.PasswordRepeat = 'Пароли не совпадают';
		}
		return errors;
	};

	useEffect(() => {
		if (isRegister) {
			dispatch(openModal('successSentActivation'));
		}
	}, [isRegister, dispatch]);

	useEffect(() => {
		dispatch(clearRegisterError());
	}, [isOpenModal, dispatch]);

	return (
		<div className="register-form__container">
			<Formik
				initialValues={{
					Nickname: '',
					Email: '',
					Password: '',
					PasswordRepeat: '',
					AgreeWithPolitiks: false,
				}}
				onSubmit={handleSubmit}
				validate={validate}
			>
				{() => (
					<Form noValidate className="register-form">
						<InputNickname />
						<InputEmail />
						<InputPassword labelText="Пароль" inputId="Password" />
						<InputPassword
							labelText="Повторите пароль"
							inputId="PasswordRepeat"
						/>
						<InputCheckbox inputId="AgreeWithPolitiks">
							<span>
								Я соглашаюсь с{' '}
								<a href="/politika" className="register-form__link-politiks">
									Политикой обработки персональных данных
								</a>
							</span>
						</InputCheckbox>

						<span className="register-form__server-error">
							{errorMessageRegister || ''}
						</span>
						<Button
							className="register-form__button-register"
							type="submit"
							label={
								isLoadingRegister ? 'Регистрация...' : 'Зарегистрироваться'
							}
						/>
					</Form>
				)}
			</Formik>
			<p className="register-form__paragraph">
				Уже есть аккаунт?
				<ButtonOnLoginPopUp
					onClick={() => dispatch(openModal('login'))}
					label="Войти"
					type="button"
					disabled={false}
				/>
			</p>
		</div>
	);
}
