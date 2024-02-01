import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsUserAuth } from '../../services/selectors/userSelector';

const ProtectedOnlyAuth = ({ component }) => {
	const isUserAuthd = useSelector(getIsUserAuth);

	if (!isUserAuthd) {
		return <Navigate to="/" />;
	}

	return component;
};

export default ProtectedOnlyAuth;

ProtectedOnlyAuth.propTypes = {
	component: PropTypes.element.isRequired,
};
