import React from 'react';
import './CardList.scss';
import PropTypes from 'prop-types';
import Card from '../Card/Card';

function CardList({ areasToShow }) {
	return (
		<article className="card-list">
			{areasToShow.map((area) => (
				<Card key={area.id} area={area} />
			))}
		</article>
	);
}

CardList.propTypes = {
	areasToShow: PropTypes.arrayOf.isRequired,
};

export default CardList;
