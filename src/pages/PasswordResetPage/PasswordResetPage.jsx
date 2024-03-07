import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../services/slices/modalSlice';
import './PasswordResetPage.scss';
import { getIsUserAuth } from '../../services/selectors/userSelector';
import FormPasswordReset from '../../components/Forms/FormPasswordReset';

export default function PasswordResetPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isConfirmPassword = useSelector(
		(state) => state.resetPassword.isConfirmPassword
	);

	const isUserAuth = useSelector(getIsUserAuth);

	const navigateHome = () => {
		navigate('/');
	};

	return (
		<main className="reset-password-form__container">
			{isConfirmPassword ? (
				<div className="reset-password-form__success-container">
					<h2 className="reset-password-form__title">Пароль изменен</h2>
					<p>Установлен новый пароль для учетной записи</p>
					{isUserAuth ? (
						<button
							className="reset-password-form__button"
							type="button"
							onClick={navigateHome}
						>
							На главную
						</button>
					) : (
						<button
							className="reset-password-form__button"
							type="button"
							onClick={() => dispatch(openModal('login'))}
						>
							Войти
						</button>
					)}
				</div>
			) : (
				<FormPasswordReset />
			)}
		</main>
	);
}
