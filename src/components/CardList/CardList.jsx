import React from 'react';
import './CardList.scss';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import { areasToShowSelector } from '../../services/selectors/areaSelector';

function CardList() {
	const areasToShow = useSelector(areasToShowSelector);
	return (
		<article className="card-list">
			{areasToShow.map((area) => (
				<Card key={area.id} area={area} />
			))}
		</article>
	);
}

export default CardList;
