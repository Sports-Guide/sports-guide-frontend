import React from 'react';
import { useLocation } from 'react-router-dom';
import './Card.scss';
import ButtonLike from '../Button/ButtonLike';
import { renderImage } from '../../utils/renderImage';
import { SportGround } from '../../utils/types';

interface CardProps {
	area: SportGround;
}

const Card: React.FC<CardProps> = ({ area }) => {
	// проверяем, что категорий > 2
	const hasExtraCategories = area.categories.length > 2;
	const areaModerationStatus = area.moderation_status;
	const location = useLocation();

	return (
		<div className="card">
			{location.pathname === '/profile/my-areas' ? (
				<nav className="card__buttons-container">
					{areaModerationStatus === 'pending' ? (
						<span className="card__status" role="status">
							Идет проверка
						</span>
					) : (
						<ButtonLike area={area} />
					)}
					<button
						className="card__button-settings"
						aria-label="лайк"
						onClick={() => alert('тут скоро будут настройки карточки :)')}
					/>
				</nav>
			) : (
				<ButtonLike area={area} />
			)}
			<a
				className="card__link"
				href={`/sports-ground/${area.id}`}
				aria-label="ссылка"
				target="_blank"
				rel="noreferrer"
			>
				<div
					className="card__image"
					style={{ backgroundImage: `url(${renderImage(area)})` }}
				>
					<div className="card__categories-container">
						{area.categories.slice(0, 2).map((category) => (
							<span className="card__categories" key={category.id}>
								<img
									src={category.icon}
									alt="знак категории"
									className="card__categories-ball"
								/>
								<span className="card__categories-name">{category.name}</span>
							</span>
						))}
						{/* отражаем кол-во категогий, если оно больше 2 */}
						{hasExtraCategories && (
							<span className="card__extra-categories">
								+{area.categories.length - 2}
							</span>
						)}
					</div>
				</div>
				<div className="card__container">
					<h3 className="card__title">{area.name}</h3>
					<p className="card__subtitle">{area.address}</p>
				</div>
			</a>
		</div>
	);
};

export default Card;
