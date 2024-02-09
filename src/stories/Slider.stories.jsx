import { Slider } from '../components/Slider/Slider';

export default {
	title: 'UI/Slider',
	component: Slider,
};

const Template = (args) => (
	<Slider {...args}>
		<div className="slider-window" />
	</Slider>
);

export const Default = Template.bind({});
Default.args = {};
