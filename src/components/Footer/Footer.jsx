import './Footer.scss';
/* import PropTypes from 'prop-types'; */

export function Footer() {
	return (
		<footer className="footer">
			<div className="footer__container">
				<p className="footer__copyright">
					&copy; {new Date().getFullYear()} Спортивный гид
				</p>
				<a
					className="footer__nav-link"
					href="###"
					target="_blank"
					rel="noreferrer"
				>
					Политика в отношении обработки персональных данных
				</a>
			</div>
		</footer>
	);
}

/* Footer.propTypes = {

};
 */
