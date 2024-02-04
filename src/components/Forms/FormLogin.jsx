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
import InputEmail from '../ProfileInputs/InputEmail';
import InputPassword from '../ProfileInputs/InputPassword';
import InputCheckbox from '../ProfileInputs/InputCheckbox';
// import { closeModal, openModal } from '../../services/slices/modalSlice';
import { ButtonOnPasswordRecovery } from '../Button/ButtonOnPasswordRecovery';
// import { clearLoginError } from '../../services/slices/userSlice';

export default function FormLogin() {
	const dispatch = useDispatch();
	const errorFetchLogin = useSelector(getErrorMessageLogin);
	// const isLogin = useSelector(getIsLogin);
	// const isOpenModal = useSelector((state) => state.modal.isOpen);
	// console.log(`isOpenModal ${isOpenModal}`);

	const handleSubmit = useCallback(
		(values) => {
			dispatch(fetchLogin({ email: values.Email, password: values.Password }));
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

	// useEffect(() => {
	// 	if (!isOpenModal) {
	// 		dispatch(clearLoginError());
	// 	}
	// }, [isOpenModal, dispatch]);

	return (
		<div className="login-form__container">
			<Formik
				initialValues={{
					Email: '',
					Password: '',
					RememberMe: false,
				}}
				onSubmit={handleSubmit}
			>
				{() => (
					<Form noValidate className="login-form">
						<InputEmail />
						<InputPassword labelText="Пароль" inputId="Password" />
						<div className="login-form__down_group">
							<InputCheckbox inputId="RememberMe">Запомнить меня</InputCheckbox>
							<ButtonOnPasswordRecovery
								// onClick={() => dispatch(openModal('passwordRecovery'))}
								label="Забыли пароль?"
								type="button"
								disabled={false}
							/>
						</div>
						<span className="login-form__server-error">
							{errorFetchLogin || ''}
						</span>
						<Button
							className="login-form__button-signin"
							type="submit"
							label="Войти"
						/>
					</Form>
				)}
			</Formik>
			<p className="login-form__paragraph">
				Нет аккаунта?
				<ButtonOnRegister
					// onClick={() => dispatch(openModal('register'))}
					label="Зарегистрироваться"
					type="button"
					disabled={false}
				/>
			</p>
		</div>
	);
}
