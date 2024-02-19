import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../services/selectors/userSelector';
import { fetchResendActivationEmail } from '../../services/thunks/resetPasswordThunk';
import './Timer.scss';

const Timer = () => {
	const [timeLeft, setTimeLeft] = useState(20);
	const dispatch = useDispatch();
	const user = useSelector(getUserInfo);
	//   console.log(user);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (timeLeft > 0) {
				setTimeLeft(timeLeft - 1);
			} else {
				dispatch(fetchResendActivationEmail({ email: user?.email })); // Вызов функции повторной отправки письма
			}
		}, 1000);

		return () => clearTimeout(timer);
	}, [timeLeft, dispatch, user]);

	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
	};

	return <div className="timer">Повторная отправка {formatTime(timeLeft)}</div>;
};

export default Timer;
