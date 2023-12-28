import PropTypes from 'prop-types';
import React from 'react';
import './Comment.css';
import logo from '../../images/logo.svg';

export function Comment({ author, date, text }) {
	return (
		<div className="comment">
			<img className="icon" src={logo} alt="avatar" />
			<div className="comment-content">
				<h3 className="comment-author">{author}</h3>
				<span className="comment-date">{date}</span>
				<p className="comment-text">{text}</p>
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
