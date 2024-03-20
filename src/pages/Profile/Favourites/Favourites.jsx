import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { openModal } from '../../../services/slices/modalSlice';
import { fetchUserInfo } from '../../../services/thunks/userThunk';
// import { getUserInfo } from '../../../services/selectors/userSelector';

import './Favourites.scss';

export default function Favourites() {
	const dispatch = useDispatch();
	// const user = useSelector(getUserInfo);

	useEffect(() => {
		dispatch(fetchUserInfo());
	}, [dispatch]);

	return (
		<section className="favourites">
			<nav className="favourites__navigation">
				<h2 className="form__title_place_profile">Избранные площадки</h2>
			</nav>
		</section>
	);
}
