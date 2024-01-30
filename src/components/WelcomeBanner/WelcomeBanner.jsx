import React from 'react';

import './WelcomeBanner.scss';

/* import { Input } from '../Input/Input'; */
/* import { Form } from 'react-router-dom'; */

function WelcomeBanner() {
	return (
		<main>
			<div className="location__container">
				<h2 className="location__title">
					Ваш путеводитель по спортивным площадкам
				</h2>
				<p className="location__subtitle">
					Находите новые площадки и занимайтесть спортом вместе
				</p>

				{/* 				<form action="" className="search-form">
					<input type="text" id="text" className="" placeholder="Вид спорта" />
					<input type="text" id="text" className="" placeholder="Район" />
					<input
						type="text"
						id="text"
						className=""
						placeholder="Название площадки или адрес"
					/>
				</form>
				<button className="button-search" type="submit" label="Найти" /> */}
			</div>
		</main>
	);
}

export default WelcomeBanner;
