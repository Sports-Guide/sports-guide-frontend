import { Comment } from '../components/Comment/Comment';

export default {
	title: 'Comment',
	component: Comment,
};

export const Default = () => (
	<Comment author="Иван" text="Отличное поле" date="05.07.2022" />
);
