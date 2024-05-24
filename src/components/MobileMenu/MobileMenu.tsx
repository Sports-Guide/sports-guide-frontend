import './MobileMenu.scss';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { areaOptions } from '../../constants/OptionsConstants';
import { categoryList } from '../../services/selectors/areaSelector';
import { setIsPolygonShow } from '../../services/slices/areaSlice';
import { AppDispatch } from '../../services/store';

interface MobileMenuProps {
	isMobileMenuOpen: boolean;
	setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
	// eslint-disable-next-line no-unused-vars
	handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	// eslint-disable-next-line no-unused-vars
	handleAreaChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
	isMobileMenuOpen,
	setIsMobileMenuOpen,
	handleCategoryChange,
	handleAreaChange,
}) => {
	const [selectedCategory, setSelectedCategory] = useState<string>('');
	const [selectedMobileArea, setSelectedMobileArea] = useState<string>('');
	const categories = useSelector(categoryList);
	const dispatch: AppDispatch = useDispatch();

	const handleClear = () => {
		setSelectedCategory('Вид спорта');
		setSelectedMobileArea('Все округа');
		dispatch(setIsPolygonShow(false));
	};

	const handleClick = () => {
		handleCategoryChange({
			target: { value: selectedCategory },
		} as React.ChangeEvent<HTMLSelectElement>);
		handleAreaChange({
			target: { value: selectedMobileArea },
		} as React.ChangeEvent<HTMLSelectElement>);
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<aside
			className={` mobile-menu
                ${isMobileMenuOpen ? 'mobile-menu_opened' : ''}
            `}
		>
			<div className="mobile-menu__container">
				<button
					type="button"
					aria-label="Кнопка закрытия меню"
					className="mobile-menu__button-close"
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
				/>
				<button
					type="button"
					aria-label="Кнопка очистки фильтров"
					className="mobile-menu__button-clear"
					onClick={handleClear}
				>
					Очистить фильтры
				</button>
			</div>
			<div className="mobile-menu__input-container">
				<select
					className="mobile-menu__input"
					value={selectedCategory}
					onChange={(e) => setSelectedCategory(e.target.value)}
				>
					<option selected>Вид спорта</option>
					{categories.map((option) => (
						<option key={option.id}>{option.name}</option>
					))}
				</select>
				<select
					className="mobile-menu__input"
					value={selectedMobileArea}
					onChange={(e) => setSelectedMobileArea(e.target.value)}
				>
					{areaOptions.map((option) => (
						<option key={option.id} selected={option.id === 1}>
							{option.value}
						</option>
					))}
				</select>
			</div>
			<button
				type="button"
				aria-label="кнопка подтверждения"
				className="mobile-menu__button-confirmation"
				onClick={handleClick}
			>
				Применить
			</button>
		</aside>
	);
};

export default MobileMenu;
