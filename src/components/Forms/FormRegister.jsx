import { Formik, Form } from 'formik'; // https://formik.org/ - документация библиотеки formik
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './FormRegister.scss';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button/Button';
import InputEmail from '../Inputs/InputEmail';
import InputPassword from '../Inputs/InputPassword';
import InputNickname from '../Inputs/InputNickname';
import InputCheckbox from '../Inputs/InputCheckbox';
import { ButtonOnLoginPopUp } from '../Button/ButtonOnLoginPopUp';
import { fetchRegister } from '../../services/thunks/registerUserThunk';
import { openModal } from '../../services/slices/modalSlice';

export default function FormRegister({ handleClose }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isRegister = useSelector((state) => state.registerUser.isRegister);
	// const userEmail = useSelector((state) => state.registerUser.email);
	const errorMessageRegister = useSelector(
		(state) => state.registerUser.errorMessageRegister
	);

	const navigateHome = () => {
		navigate('/');
		handleClose();
	};

	const [userEmail, setUserEmail] = useState('');

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

			setUserEmail(values.Email);
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

	return (
		<div className="register-form__container">
			{isRegister ? (
				<>
					<p className="popup__title">{userEmail}</p>
					<Button
						className="register-form__button-register popup__button-y"
						type="button"
						onClick={navigateHome}
						label="На главную"
					/>
				</>
			) : (
				<>
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
										<a
											href="/politika"
											className="register-form__link-politiks"
										>
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
									label="Зарегистрироваться"
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
				</>
			)}
		</div>
	);
}

FormRegister.propTypes = {
	handleClose: PropTypes.func.isRequired,
};
