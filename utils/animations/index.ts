import { useEffect } from "react";
import {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withTiming,
} from "react-native-reanimated";

export const useScaleAnimation = ({
	duration = 1000,
	easing = Easing.out(Easing.exp),
	delay = 0,
}) => {
	const scale = useSharedValue(0.5);
	const opacity = useSharedValue(0);

	useEffect(() => {
		scale.value = withDelay(
			delay,
			withTiming(1, {
				duration,
				easing,
			})
		);

		opacity.value = withDelay(
			delay,
			withTiming(1, {
				duration,
				easing,
			})
		);
	}, []);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: scale.value }],
			opacity: opacity.value,
		};
	});

	return { scale, opacity, animatedStyle };
};
