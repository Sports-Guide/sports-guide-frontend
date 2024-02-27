import React from 'react';

import './WelcomeBanner.scss';

function WelcomeBanner() {
	return (
		<div className="location__container">
			<h2 className="location__title">
				Ваш путеводитель по спортивным площадкам
			</h2>
			<p className="location__subtitle">
				Находите новые площадки и занимайтесть спортом вместе
			</p>
		</div>
	);
}

export default WelcomeBanner;
