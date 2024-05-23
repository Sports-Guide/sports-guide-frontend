import React from 'react';
import './CardList.scss';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import { areasToShowSelector } from '../../services/selectors/areaSelector';
import { SportGround, SportGrounds } from '../../utils/types';

const CardList: React.FC = () => {
	const areasToShow: SportGrounds = useSelector(areasToShowSelector);
	return (
		<article className="card-list">
			{areasToShow.map((area: SportGround) => (
				<Card key={area.id} area={area} />
			))}
		</article>
	);
};

export default CardList;
