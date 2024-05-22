import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../YandexMap/YandexMap.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../services/store'; // Предполагая, что у вас есть эти типы
import { setAddress } from '../../services/slices/areaSlice';
import { addressSelector } from '../../services/selectors/areaSelector';

const InputSuggest: React.FC = () => {
	const location = useLocation();
	const dispatch: AppDispatch = useDispatch();
	const areaPath = location.pathname === '/app-area';
	const address = useSelector((state: RootState) => addressSelector(state));

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setAddress(e.target.value));
	};

	// Обнуление значения инпута при каждом изменении страницы
	useEffect(() => {
		const suggestInput = document.getElementById('suggest') as HTMLInputElement;
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
			className="map__search-bar map__search-bar_type_search"
			id="suggest"
			placeholder="Введите адрес"
			onChange={handleChange}
			value={address}
		/>
	);
};

export default InputSuggest;
