import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../YandexMap/YandexMap.scss';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { areaOptions } from '../../constants/OptionsConstants';
import WelcomeBanner from '../WelcomeBanner/WelcomeBanner';
import MobileMenu from '../MobileMenu/MobileMenu';

import { categoryList } from '../../services/selectors/areaSelector';
import InputSuggest from '../Inputs/InputSuggest';

function SearchBar({
	handleCategoryChange,
	handleAreaChange,
	setIsCardListShow,
	isCardListShow,
	setIsPolygonShow,
}) {
	const location = useLocation();
	const areaPath = location.pathname === '/app-area';
	const categories = useSelector(categoryList);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<div className="map__search">
			{areaPath ? (
				<InputSuggest />
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
							onClick={() => {
								setIsCardListShow(!isCardListShow);
								setIsPolygonShow(false);
							}}
						/>
						<select
							type="text"
							className="map__search-bar map__search-bar_kinds-of-sports"
							onChange={handleCategoryChange}
						>
							<option selected>Вид спорта</option>
							{categories.map((option) => (
								<option key={option.id}>{option.name}</option>
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
						<InputSuggest />
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
