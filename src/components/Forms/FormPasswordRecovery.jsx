import { Formik, Form, useFormikContext } from 'formik'; // https://formik.org/ - документация библиотеки formik
import './FormPasswordRecovery.scss';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect } from 'react';
import { Button } from '../Button/Button';

import InputEmail from '../Inputs/InputEmail';
import { fetchInitiatingPasswordReset } from '../../services/thunks/resetPasswordThunk';
import { openModal } from '../../services/slices/modalSlice';
import {
	clearSentEmailError,
	setEmail,
} from '../../services/slices/resetPasswordSliсe';

export default function FormPasswordRecovery() {
	const dispatch = useDispatch();
	const isSentEmail = useSelector((state) => state.resetPassword.isSentEmail);

	const handleSubmit = useCallback(
		(values) => {
			console.log(values);
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

			<span className="password-recovery-form__error">
				{errorMessageSentEmail || ''}
			</span>
			<Button
				className="password-recovery-form__button-send"
				type="submit"
				label={isLoadingSentEmail ? 'Отправка...' : 'Отправить'}
			/>
		</Form>
	);
}
