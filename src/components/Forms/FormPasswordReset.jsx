import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, useFormikContext } from 'formik';
import InputPassword from '../Inputs/InputPassword';
import { fetchConfirmPasswordReset } from '../../services/thunks/resetPasswordThunk';
import { clearConfirmPasswordError } from '../../services/slices/resetPasswordSliсe';
import './FormPasswordReset.scss';

export default function FormPasswordReset() {
	const dispatch = useDispatch();
	const { uid, token } = useParams();

	const validate = (values) => {
		const errors = {};
		if (values.newPassword !== values.confirmPassword) {
			errors.confirmPassword = 'Пароли не совпадают';
		}
		return errors;
	};
	const handleSubmit = (values) => {
		dispatch(
			fetchConfirmPasswordReset({
				uid,
				token,
				new_password: values.newPassword,
			})
		);
	};

	return (
		<Formik
			initialValues={{
				newPassword: '',
				confirmPassword: '',
			}}
			onSubmit={handleSubmit}
			validate={validate}
		>
			{() => <FormComponent />}
		</Formik>
	);
}

function FormComponent() {
	const isLoadingConfirmPassword = useSelector(
		(state) => state.resetPassword.isLoadingConfirmPassword
	);
	const errorMessageConfirmPassword = useSelector(
		(state) => state.resetPassword.errorMessageConfirmPassword
	);

	const { values } = useFormikContext();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(clearConfirmPasswordError());
	}, [values, dispatch]);

	return (
		<Form noValidate className="reset-password-form">
			<h2 className="reset-password-form__title">Введите новый пароль</h2>
			<p className="reset-password-form__text">
				Новый пароль должен отличаться от текущего
			</p>
			<InputPassword labelText="Пароль" inputId="newPassword" />
			<InputPassword labelText="Повторите пароль" inputId="confirmPassword" />
			<span className="reset-password-form__server-error">
				{errorMessageConfirmPassword || ''}
			</span>
			<button className="reset-password-form__button" type="submit">
				{isLoadingConfirmPassword ? 'Сохраняю...' : 'Сохранить'}
			</button>
		</Form>
	);
}
