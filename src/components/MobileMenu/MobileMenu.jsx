import './MobileMenu.scss';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { sportsOptions, areaOptions } from '../../constants/OptionsConstants';

function MobileMenu({
	isMobileMenuOpen,
	setIsMobileMenuOpen,
	handleCategoryChange,
	handleAreaChange,
	setIsPolygonShow,
}) {
	const [selectedCategory, setSelectedCategory] = useState('');
	const [selectedMobileArea, setSelectedMobileArea] = useState('');

	const handleClear = () => {
		setSelectedCategory('Вид спорта');
		setSelectedMobileArea('Все округа');
		setIsPolygonShow(false);
	};

	const handleClick = () => {
		handleCategoryChange({ target: { value: selectedCategory } });
		handleAreaChange({ target: { value: selectedMobileArea } });
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
					type="text"
					className="mobile-menu__input"
					value={selectedCategory}
					onChange={(e) => setSelectedCategory(e.target.value)}
				>
					{sportsOptions.map((option) => (
						<option key={option.id} selected={option.id === 1}>
							{option.value}
						</option>
					))}
				</select>
				<select
					type="text"
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
}

MobileMenu.propTypes = {
	isMobileMenuOpen: PropTypes.bool.isRequired,
	setIsMobileMenuOpen: PropTypes.bool.isRequired,
	handleAreaChange: PropTypes.func.isRequired,
	handleCategoryChange: PropTypes.func.isRequired,
	setIsPolygonShow: PropTypes.func.isRequired,
};

export default MobileMenu;
