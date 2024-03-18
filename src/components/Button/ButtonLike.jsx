import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchAddAreaToFavorite,
	fetchDeleteAreaFromFavorite,
} from '../../services/thunks/favoriteAreasThunk';
import { favoriteAreaList } from '../../services/selectors/areaSelector';

function ButtonLike({ area }) {
	const location = useLocation();
	const dispatch = useDispatch();
	const mainPath = location.pathname === '/';
	const favoriteAreasList = useSelector(favoriteAreaList);
	const [isLiked, setIsLiked] = useState(false);

	useEffect(() => {
		const isAreaLiked = favoriteAreasList.some(
			(favoriteArea) => favoriteArea.id === area.id
		);
		setIsLiked(isAreaLiked);
	}, [favoriteAreasList, area]);

	const changeLikeStatus = async () => {
		setIsLiked(!isLiked);
		if (!isLiked) {
			await dispatch(fetchAddAreaToFavorite(area));
		} else {
			await dispatch(fetchDeleteAreaFromFavorite(area));
		}
	};

	return mainPath ? (
		<button
			className={isLiked ? 'card__like card__like_active' : 'card__like'}
			aria-label="лайк"
			onClick={changeLikeStatus}
		/>
	) : (
		<button
			type="button"
			onClick={changeLikeStatus}
			className="sports-ground__button"
		>
			{isLiked ? (
				<>
					<p className=" sports-ground__button-like sports-ground__button-like_active" />
					<p className="sports-ground__button-text sports-ground__button-text_active">
						В избранном
					</p>
				</>
			) : (
				<>
					<p className="sports-ground__button-like" />
					<p className="sports-ground__button-text">Добавить в избранное</p>
				</>
			)}
		</button>
	);
}

ButtonLike.propTypes = {
	area: PropTypes.objectOf.isRequired,
};

export default ButtonLike;
