import React from 'react';
import './Card.scss';
import PropTypes from 'prop-types';
import ButtonLike from '../Button/ButtonLike';

function Card({ area }) {
	return (
		<div className="card">
			<ButtonLike area={area} />
			<a
				className="card__link"
				href={`/sports-ground/${area.id}`}
				aria-label="ссылка"
				target="_blank"
				rel="noreferrer"
			>
				<div
					className="card__image"
					style={{ backgroundImage: `url(${area.images[0].image})` }}
				>
					<div className="card__categories-container">
						{area.categories.map((category) => (
							<span className="card__categories">
								<img
									src={category.icon}
									alt="знак категории"
									className="card__categories-ball"
								/>
								<span key={category.id} className="card__categories-name">
									{category.name}
								</span>
							</span>
						))}
					</div>
				</div>
				<div className="card__container">
					<h3 className="card__title">{area.name}</h3>
					<p className="card__subtitle">{area.address}</p>
				</div>
			</a>
		</div>
	);
}

Card.propTypes = {
	area: PropTypes.objectOf.isRequired,
};

export default Card;
