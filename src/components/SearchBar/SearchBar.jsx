// /* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../YandexMap/YandexMap.scss';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { sportsOptions, areaOptions } from '../../constants/OptionsConstants';
import WelcomeBanner from '../WelcomeBanner/WelcomeBanner';
import MobileMenu from '../MobileMenu/MobileMenu';
import { setAddress } from '../../services/slices/areaSlice';
import { addressSelector } from '../../services/selectors/areaSelector';

function SearchBar({
	handleCategoryChange,
	handleAreaChange,
	setIsCardListShow,
	isCardListShow,
	setIsPolygonShow,
}) {
	const location = useLocation();
	const dispatch = useDispatch();
	const areaPath = location.pathname === '/app-area';
	const address = useSelector(addressSelector);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const handleChange = (e) => {
		dispatch(setAddress(e.target.value));
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
				<div className="map__search-container">
					<WelcomeBanner />
					<div className="map__inputs map__inputs_aprea">
						<button
							className={`map__button map__button-mobile ${
								isCardListShow
									? 'map__button_active map__button-mobile_active'
									: ''
							}`}
							aria-label="Переключатель отображения"
							onClick={() => setIsCardListShow(!isCardListShow)}
						/>
						<select
							type="text"
							className="map__search-bar map__search-bar_kinds-of-sports"
							onChange={handleCategoryChange}
						>
							{sportsOptions.map((option) => (
								<option key={option.id} selected={option.id === 1}>
									{option.value}
								</option>
							))}
						</select>
						<select
							type="text"
							className="map__search-bar map__search-bar_area"
							onChange={handleAreaChange}
						>
							{areaOptions.map((option) => (
								<option key={option.id} selected={option.id === 1}>
									{option.value}
								</option>
							))}
						</select>
						<input
							type="text"
							className="map__search-bar map__search-bar_type_search "
							id="suggest"
							placeholder="Введите адрес"
							onChange={handleChange}
							value={address}
						/>
						<button
							className="map__filter-button"
							aria-label="меню фильтров"
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						/>
					</div>
					<MobileMenu
						setIsMobileMenuOpen={setIsMobileMenuOpen}
						isMobileMenuOpen={isMobileMenuOpen}
						handleAreaChange={handleAreaChange}
						handleCategoryChange={handleCategoryChange}
						setIsPolygonShow={setIsPolygonShow}
					/>
				</div>
			)}
		</div>
	);
}

SearchBar.propTypes = {
	handleAreaChange: PropTypes.func.isRequired,
	handleCategoryChange: PropTypes.func.isRequired,
	setIsCardListShow: PropTypes.bool.isRequired,
	isCardListShow: PropTypes.bool.isRequired,
	setIsPolygonShow: PropTypes.bool.isRequired,
};

export default SearchBar;
