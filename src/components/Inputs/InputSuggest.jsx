// /* eslint-disable */
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../YandexMap/YandexMap.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setAddress } from '../../services/slices/areaSlice';
import { addressSelector } from '../../services/selectors/areaSelector';

function InputSuggest() {
	const location = useLocation();
	const dispatch = useDispatch();
	const areaPath = location.pathname === '/app-area';
	const address = useSelector(addressSelector);

	const handleChange = (e) => {
		dispatch(setAddress(e.target.value));
	};

	// Обнуление значения инпута при каждом изменении страницы
	useEffect(() => {
		const suggestInput = document.getElementById('suggest');
		if (suggestInput) {
			suggestInput.value = '';
		}
	}, [location]);

	return areaPath ? (
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
		<input
			type="text"
			className="map__search-bar map__search-bar_type_search "
			id="suggest"
			placeholder="Введите адрес"
			onChange={handleChange}
			value={address}
		/>
	);
}

export default InputSuggest;
