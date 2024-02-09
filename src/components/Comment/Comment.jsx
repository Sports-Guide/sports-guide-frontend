import PropTypes from 'prop-types';
import React from 'react';
import './Comment.css';
import logo from '../../images/fa-solid_basketball-ball.svg';

export function Comment({ author, date, text }) {
	return (
		<div className="comment">
			<div className="comment-content">
				<img className="comment-icon" src={logo} alt="avatar" />
				<div className="comment-info">
					<h3 className="comment-author">{author}</h3>
					<span className="comment-date">{date}</span>
					<p className="comment-text">{text}</p>
				</div>
			</div>
		</div>
	);
}

Comment.propTypes = {
	author: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
};

export default Comment;
