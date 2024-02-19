import React, { useState } from 'react';
import './Card.scss';
import PropTypes from 'prop-types';

function Card({ area }) {
	console.log(area);
	const [isLiked, setIsLiked] = useState(false);
	return (
		<div className="card">
			<button
				className={isLiked ? 'card__like card__like_active' : 'card__like'}
				aria-label="лайк"
				onClick={() => setIsLiked(!isLiked)}
			/>
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
	area: PropTypes.arrayOf.isRequired,
};

export default Card;
