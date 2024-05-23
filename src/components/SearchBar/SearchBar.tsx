import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../YandexMap/YandexMap.scss';
import { useSelector, useDispatch } from 'react-redux';
import { areaOptions } from '../../constants/OptionsConstants';
import WelcomeBanner from '../WelcomeBanner/WelcomeBanner';
import MobileMenu from '../MobileMenu/MobileMenu';
import {
	categoryList,
	isCardListShowStatus,
	areasList,
} from '../../services/selectors/areaSelector';
import InputSuggest from '../Inputs/InputSuggest';
import {
	setIsCardListShow,
	setIsPolygonShow,
	setSelectedArea,
	setAreasToShow,
} from '../../services/slices/areaSlice';
import { AppDispatch } from '../../services/store';

const SearchBar: React.FC = () => {
	const location = useLocation();
	const areaPath = location.pathname === '/app-area';
	const areas = useSelector(areasList);
	const categories = useSelector(categoryList);
	const isCardListShow = useSelector(isCardListShowStatus);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
	const dispatch: AppDispatch = useDispatch();

	const handleAreaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		if (isCardListShow) {
			return;
		}
		dispatch(setIsPolygonShow(true));
		const selectedCurrentArea = event.target.value;
		if (selectedCurrentArea === 'Все округа') {
			dispatch(setSelectedArea('город Москва'));
			return;
		}
		dispatch(setSelectedArea(selectedCurrentArea));
	};

	const handleCategoryChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		const selectedCategory = event.target.value;
		if (selectedCategory === 'Вид спорта') {
			return dispatch(setAreasToShow(areas));
		}
		const filteredAreas = areas.filter((area) =>
			area.categories.some((category) => category.name === selectedCategory)
		);
		return dispatch(setAreasToShow(filteredAreas));
	};

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
								dispatch(setIsCardListShow(!isCardListShow));
								dispatch(setIsPolygonShow(false));
							}}
						/>
						<select
							className="map__search-bar map__search-bar_kinds-of-sports"
							onChange={handleCategoryChange}
						>
							<option selected>Вид спорта</option>
							{categories.map((option) => (
								<option key={option.id} value={option.name}>
									{option.name}
								</option>
							))}
						</select>
						<select
							className="map__search-bar map__search-bar_area"
							onChange={handleAreaChange}
						>
							{areaOptions.map((option) => (
								<option
									key={option.id}
									value={option.value}
									selected={option.id === 1}
								>
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
					/>
				</div>
			)}
		</div>
	);
};

export default SearchBar;
