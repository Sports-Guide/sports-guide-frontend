import { Formik, Form } from 'formik'; // https://formik.org/ - документация библиотеки formik
import './FormPasswordRecovery.scss';
import React, { useCallback } from 'react';
import { Button } from '../Button/Button';

import InputEmail from '../Inputs/InputEmail';

export default function FormPasswordRecovery() {
	// const dispatch = useDispatch();

	const handleSubmit = useCallback((values) => {
		console.log(values);
		// dispatch(fetch({ email: values.Email }));
	}, []);

	return (
		<div className="password-recovery-form__container">
			<Formik
				initialValues={{
					Email: '',
				}}
				onSubmit={handleSubmit}
			>
				{() => (
					<Form noValidate className="password-recovery-form">
						<p className="password-recovery-form__text">
							Введите Ваш email, используемый для входа. Мы&nbsp;вышлем письмо
							с&nbsp;инструкцией.
						</p>
						<InputEmail />

						<span className="password-recovery-form__error">
							{'ошибка от сервера' || ''}
						</span>
						<Button
							className="password-recovery-form__button-send"
							type="submit"
							label="Отправить"
						/>
					</Form>
				)}
			</Formik>
		</div>
	);
}
