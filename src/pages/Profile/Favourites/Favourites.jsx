import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../../components/Card/Card';
import { fetchGetFavoriteAreas } from '../../../services/thunks/favoriteAreasThunk';
import { favoriteAreaList } from '../../../services/selectors/areaSelector';
import { Button } from '../../../components/Button/Button';

import './Favourites.scss';

export default function Favourites() {
	const dispatch = useDispatch();
	const favoritesArea = useSelector(favoriteAreaList);
	const [isCardRendered, setIsCardRendered] = useState(true);

	useEffect(() => {
		dispatch(fetchGetFavoriteAreas());
	}, [dispatch]);

	const handleSwitchCardsDisplay = () => {
		if (isCardRendered) {
			setIsCardRendered(false);
		} else setIsCardRendered(true);
	};

	return (
		<section className="favourites">
			<nav className="favourites__navigation">
				<h2 className="favourites__title">Избранные площадки</h2>
				<div className="favourites__buttons">
					<Button
						customStyle={`favourites__button ${
							isCardRendered
								? 'favourites__button_type_card_active'
								: 'favourites__button_type_card'
						}`}
						type="button"
						aria-label="Переключатель отображения площадок в виде карточек"
						onClick={handleSwitchCardsDisplay}
					/>
					<Button
						customStyle={`favourites__button favourites__button_type_list ${
							!isCardRendered
								? 'favourites__button_type_list_active'
								: 'favourites__button_type_list'
						}`}
						type="button"
						aria-label="Переключатель отображения площадок в виде списка"
						onClick={handleSwitchCardsDisplay}
					/>
				</div>
			</nav>
			{isCardRendered ? (
				<article className="favourites__card-list">
					{favoritesArea.map((area) => (
						<Card key={area.id} area={area} />
					))}
				</article>
			) : (
				<article className="favourites__list">
					{favoritesArea.map((area) => (
						<Card key={area.id} area={area} />
					))}
				</article>
			)}
		</section>
	);
}
