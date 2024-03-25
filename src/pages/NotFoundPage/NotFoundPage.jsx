import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFoundPage.scss';
import image404 from '../../images/image404.svg';

export default function PageNotFound() {
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<main className="not-found">
			<div className="not-found__container">
				<h1 className="not-found__title">404</h1>
				<p className="not-found__subtitle">
					Упс! Запрашиваемая вами страница не&nbsp;существует, вернитесь
					<button className="not-found__link" onClick={handleGoBack}>
						на главную
					</button>
				</p>
				<img className="not-found__image" src={image404} alt="" />
			</div>
		</main>
	);
}
