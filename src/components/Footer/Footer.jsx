import './Footer.scss';
import logo from '../../images/logo.svg';

export function Footer() {
	return (
		<footer className="footer">
			<img
				className="footer__logo"
				src={logo}
				alt="Логотип веб-приложения Спортивный гид"
			/>

			<div className="footer__container">
				<nav className="footer__nav">
					<p className="footer__title">Спортивный гид </p>
					<p className="footer__nav-link">
						Ваш путеводитель по спортивным площадкам. Находите новые площадки и
						занимайтесть спортом вместе.
					</p>

					<p className="footer__title">Правила</p>
					<a
						className="footer__nav-link"
						href="###"
						target="_blank"
						rel="noreferrer"
					>
						Политика конфиденциальности
					</a>
					<a
						className="footer__nav-link"
						href="###"
						target="_blank"
						rel="noreferrer"
					>
						Условия использования сервиса
					</a>
					<p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
				</nav>
			</div>
		</footer>
	);
}
