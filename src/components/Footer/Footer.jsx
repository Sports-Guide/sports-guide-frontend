import { Link } from 'react-router-dom';
import './Footer.scss';
/* import PropTypes from 'prop-types'; */

export function Footer() {
	return (
		<footer className="footer">
			<div className="footer__container">
				<p className="footer__copyright">
					&copy; {new Date().getFullYear()} Спортивный гид
				</p>
				<Link to="/privacy-policy" className="footer__nav-link">
					Политика в отношении обработки персональных данных
				</Link>
			</div>
		</footer>
	);
}

/* Footer.propTypes = {

};
 */
