import { Formik, Form, useFormikContext } from 'formik'; // https://formik.org/ - документация библиотеки formik
import './FormPasswordRecovery.scss';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect } from 'react';
import { ButtonOld } from '../Button/ButtonOld';
// import Timer from '../Timer/Timer';
import InputEmail from '../Inputs/InputEmail';
import { fetchInitiatingPasswordReset } from '../../services/thunks/resetPasswordThunk';
import { openModal } from '../../services/slices/modalSlice';
import {
	clearSentEmailError,
	setEmail,
} from '../../services/slices/resetPasswordSliсe';
import { fetchResendActivation } from '../../services/thunks/registerUserThunk';
import { setIsResendActivation } from '../../services/slices/registerUserSliсe';

export default function FormPasswordRecovery() {
	const dispatch = useDispatch();
	const isSentEmail = useSelector((state) => state.resetPassword.isSentEmail);
	const isResendActivation = useSelector(
		(state) => state.registerUser.isResendActivation
	);

	const handleSubmit = useCallback(
		(values) => {
			dispatch(setEmail(values.Email));
			dispatch(fetchInitiatingPasswordReset({ email: values.Email }));
		},
		[dispatch]
	);

	useEffect(() => {
		if (isSentEmail) {
			dispatch(openModal('passwordRecoverySuccessSent'));
		}
	}, [isSentEmail, dispatch]);

	useEffect(() => {
		if (isResendActivation) {
			dispatch(openModal('successSentActivation'));
			dispatch(setIsResendActivation(false));
		}
	}, [isResendActivation, dispatch]);

	return (
		<div className="password-recovery-form__container">
			<Formik
				initialValues={{
					Email: '',
				}}
				onSubmit={handleSubmit}
			>
				{() => <FormComponent />}
			</Formik>
		</div>
	);
}

function FormComponent() {
	const isOpenModal = useSelector((state) => state.modal.isOpen);

	const isLoadingSentEmail = useSelector(
		(state) => state.resetPassword.isLoadingSentEmail
	);
	const errorMessageSentEmail = useSelector(
		(state) => state.resetPassword.errorMessageSentEmail
	);
	const { values } = useFormikContext();
	const dispatch = useDispatch();

	const handleResendActivation = (e, { email }) => {
		e.preventDefault();
		dispatch(fetchResendActivation({ email }));
	};

	useEffect(() => {
		dispatch(clearSentEmailError());
	}, [values, isOpenModal, dispatch]);

	return (
		<Form noValidate className="password-recovery-form">
			<p className="password-recovery-form__text">
				Введите Ваш email, используемый для входа. Мы&nbsp;вышлем письмо
				с&nbsp;инструкцией.
			</p>
			<InputEmail />
			<div>
				<span className="password-recovery-form__error">
					{errorMessageSentEmail || ''}
				</span>

				{errorMessageSentEmail ===
				'Пожалуйста, активируйте вашу учетную запись, перейдя по ссылке в письме.' ? (
					<button
						className="password-recovery-form__mail_activate"
						onClick={(e) => handleResendActivation(e, { email: values.Email })}
					>
						Отправить письмо повторно
					</button>
				) : null}
			</div>
			<ButtonOld
				className="password-recovery-form__button-send"
				type="submit"
				label={isLoadingSentEmail ? 'Отправка...' : 'Восстановить'}
			/>
			{/* <Timer /> */}
		</Form>
	);
}
