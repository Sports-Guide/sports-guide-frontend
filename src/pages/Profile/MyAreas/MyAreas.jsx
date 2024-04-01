import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../../components/Card/Card';
import { fetchGetMyAreas } from '../../../services/thunks/favoriteAreasThunk';

import './MyAreas.scss';

export default function MyAreas() {
	const dispatch = useDispatch();
	const myAreas = useSelector((state) => state.favoriteAreas.myAreasList);
	const [isCardRendered, setIsCardRendered] = useState(true);

	useEffect(() => {
		dispatch(fetchGetMyAreas());
	}, [dispatch]);

	const handleSwitchCardsDisplay = () => {
		if (isCardRendered) {
			setIsCardRendered(false);
		} else setIsCardRendered(true);
	};

	return (
		<section className="my-areas">
			<nav className="my-areas__navigation">
				<h2 className="my-areas__title">Мои площадки</h2>
				<div className="my-areas__buttons">
					<button
						className={`my-areas__button ${
							isCardRendered
								? 'my-areas__button_type_card_active'
								: 'my-areas__button_type_card'
						}`}
						type="button"
						aria-label="Переключатель отображения площадок в виде карточек"
						onClick={handleSwitchCardsDisplay}
					/>
					<button
						className={`my-areas__button my-areas__button_type_list ${
							!isCardRendered
								? 'my-areas__button_type_list_active'
								: 'my-areas__button_type_list'
						}`}
						type="button"
						aria-label="Переключатель отображения площадок в виде списка"
						onClick={handleSwitchCardsDisplay}
					/>
				</div>
			</nav>
			{isCardRendered ? (
				<article className="my-areas__card-list">
					{myAreas.map((area) => (
						<Card key={area.id} area={area} />
					))}
				</article>
			) : (
				<article className="my-areas__list">
					{myAreas.map((area) => (
						<Card key={area.id} area={area} />
					))}
				</article>
			)}
		</section>
	);
}
