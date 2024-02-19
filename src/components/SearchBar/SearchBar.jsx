// /* eslint-disable */
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../YandexMap/YandexMap.scss';

import PropTypes from 'prop-types';

function SearchBar({
	handleCategoryChange,
	handleAreaChange,
	address,
	setAddress,
	setIsCardListShow,
	isCardListShow,
}) {
	const location = useLocation();
	const areaPath = location.pathname === '/app-area';

	const handleChange = (e) => {
		setAddress(e.target.value);
	};

	// Обнулиние значения инпута при каждом изменении страницы
	useEffect(() => {
		const suggestInput = document.getElementById('suggest');
		if (suggestInput) {
			suggestInput.value = '';
		}
	}, [location]);

	return (
		<div className="map__search">
			{areaPath ? (
				<input
					type="text"
					className={
						areaPath
							? 'map__search-bar map__search-bar_type_search-area'
							: 'map__search-bar map__search-bar_type_search'
					}
					id="suggest"
					placeholder="Двигайте ползунок на карте, чтобы указать адрес"
					onChange={handleChange}
					value={address}
				/>
			) : (
				<div className="map__inputs map__inputs_aprea">
					<button
						className={
							isCardListShow ? 'map__button map__button_active' : 'map__button'
						}
						aria-label="Переключатель отображения"
						onClick={() => setIsCardListShow(!isCardListShow)}
					/>
					<select
						type="text"
						className="map__search-bar map__search-bar_kinds-of-sports"
						onChange={handleCategoryChange}
					>
						<option selected>Вид спорта</option>
						<option>Футбол</option>
						<option>Баскетбол</option>
						<option>Волейбол</option>
						<option>Теннис</option>
						<option>Воркаут</option>
					</select>
					<select
						type="text"
						className="map__search-bar map__search-bar_area"
						onChange={handleAreaChange}
					>
						<option selected>Все округа</option>
						<option>Центральный округ</option>
						<option>Северный округ</option>
						<option>Северо-Восточный округ</option>
						<option>Восточный округ</option>
						<option>Юго-Восточный округ</option>
						<option>Южный округ</option>
						<option>Юго-Западный округ</option>
						<option>Западный округ</option>
						<option>Северо-Западный округ</option>
						<option>Зеленоградский округ</option>
					</select>
					<input
						type="text"
						className="map__search-bar map__search-bar_type_search"
						id="suggest"
						placeholder="Введите адрес"
						onChange={handleChange}
						value={address}
					/>
				</div>
			)}
		</div>
	);
}

SearchBar.propTypes = {
	address: PropTypes.string.isRequired,
	setAddress: PropTypes.string.isRequired,
	handleAreaChange: PropTypes.func.isRequired,
	handleCategoryChange: PropTypes.func.isRequired,
	setIsCardListShow: PropTypes.bool.isRequired,
	isCardListShow: PropTypes.bool.isRequired,
};

export default SearchBar;
