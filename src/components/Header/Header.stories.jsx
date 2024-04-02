import React from 'react';
import { Provider } from 'react-redux';
import { createMockStore } from '../../stories/mockStore';
import { Header } from './Header';

export default {
	title: 'Components/Header',
	component: Header,
};

const Template = (args, { parameters }) => (
	<Provider store={createMockStore(parameters.storeState)}>
		<Header {...args} />
	</Provider>
);

export const AuthorizedUser = Template.bind({});
AuthorizedUser.parameters = {
	storeState: {
		user: { isUserAuth: true },
	},
};

export const UnauthorizedUser = Template.bind({});
UnauthorizedUser.parameters = {
	storeState: {
		user: { isUserAuth: false },
	},
};
