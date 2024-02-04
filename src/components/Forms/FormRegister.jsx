import { Formik, Form } from 'formik'; // https://formik.org/ - документация библиотеки formik
import { useDispatch, useSelector } from 'react-redux';
import './FormLogin.scss';
import React, {
	useCallback,
	//  useEffect
} from 'react';
import { fetchLogin } from '../../services/thunks/userThunk';
import { Button } from '../Button/Button';
import {
	getErrorMessageLogin,
	// 	getIsLogin,
} from '../../services/selectors/userSelector';
import { ButtonOnRegister } from '../Button/ButtonOnRegister';
import { InputEmail } from '../ProfileInputs/InputEmail';
import { InputPassword } from '../ProfileInputs/InputPassword';
// import { closeModal, openModal } from '../../services/slices/modalSlice';
// import { CheckboxRememberMe } from '../NewInput/CheckboxRememberMe';
// import { ButtonOnPasswordRecovery } from '../Button/ButtonOnPasswordRecovery';
// import { clearLoginError } from '../../services/slices/userSlice';

export default function FormRegister() {
	const dispatch = useDispatch();
	const errorFetchLogin = useSelector(getErrorMessageLogin);
	// const isLogin = useSelector(getIsLogin);
	// const isOpenModal = useSelector((state) => state.modal.isOpen);
	// console.log(`isOpenModal ${isOpenModal}`);

	const handleSubmit = useCallback(
		(values, { resetForm }) => {
			dispatch(fetchLogin({ email: values.Email, password: values.Password }));
			resetForm();
			// .then(() => {
			// 	if (isLogin) {
			// 		resetForm();
			// 		dispatch(closeModal());
			// 	}
			// });
		},
		[
			dispatch,
			// isLogin
		]
	);

	const validate = (values) => {
		const errors = {};
		if (!values.PasswordRepeat) {
			errors.passwordRepeat = 'Подтвердите пароль';
		}
		if (values.Password !== values.PasswordRepeat) {
			errors.PasswordRepeat = 'Пароли не совпадают';
		}

		return errors;
	};

	// useEffect(() => {
	// 	if (!isOpenModal) {
	// 		dispatch(clearLoginError());
	// 	}
	// }, [isOpenModal, dispatch]);

	return (
		<>
			<Formik
				initialValues={{
					Email: '',
					Password: '',
					PasswordRepeat: '',
					RememberMe: false,
				}}
				onSubmit={handleSubmit}
				validate={validate}
			>
				{(errors, touched) => (
					<Form noValidate className="popup__login-form">
						<InputEmail />
						<InputPassword labelText="Пароль" inputId="Password" />
						<InputPassword
							labelText="Повторите пароль"
							inputId="PasswordRepeat"
						/>
						{errors.passwordRepeat && touched.passwordRepeat && (
							<div className="input__error">{errors.passwordRepeat}</div>
						)}
						{/* <div className="popup__login-form-down_group">
							<CheckboxRememberMe />
							<ButtonOnPasswordRecovery
								onClick={() => dispatch(openModal('passwordRecovery'))}
								label="Забыли пароль?"
								type="button"
								disabled={false}
							/>
						</div> */}
						<span className="popup__form-server-error">
							{errorFetchLogin || ''}
						</span>
						<Button
							className="popup__login-form-button-signin"
							type="submit"
							label="Войти"
						/>
					</Form>
				)}
			</Formik>
			<p className="popup__login-form-paragraph">
				Нет аккаунта?
				<ButtonOnRegister
					// onClick={() => dispatch(openModal('register'))}
					label="Зарегистрироваться"
					type="button"
					disabled={false}
				/>
			</p>
		</>
	);
}
