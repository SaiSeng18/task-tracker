import { CARD_CONTAINER, COLORS } from "@/constants/theme";
import { Image as ExImage } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useScaleAnimation } from "@/utils/animations";
import Animated from "react-native-reanimated";

export const SharedStatus = () => {
	const { animatedStyle } = useScaleAnimation({ delay: 400 });

	return (
		<Animated.View
			style={[
				CARD_CONTAINER,
				animatedStyle,
				{
					backgroundColor: COLORS.lightYellow,
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				},
			]}>
			<Text style={{ fontSize: 16 }}>
				Statistic shared to 1 <Text style={{ color: "grey" }}>friend</Text>
			</Text>

			<View style={{ flexDirection: "row", gap: 8 }}>
				<Pressable
					style={[
						styles.iconButton,
						{
							borderWidth: 1,
							borderColor: COLORS.dark,
						},
					]}>
					<FontAwesome6
						name="arrow-right-arrow-left"
						size={15}
						color={COLORS.dark}
					/>
				</Pressable>
				<Pressable
					style={[
						styles.iconButton,
						{ backgroundColor: COLORS.dark, overflow: "hidden" },
					]}>
					<ExImage
						source={
							"https://i.pinimg.com/564x/22/f9/6a/22f96af983c8d13b751ae874291d34c6.jpg"
						}
						style={StyleSheet.absoluteFill}
					/>
				</Pressable>
			</View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	iconButton: {
		height: 45,
		width: 45,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 45 / 2,
	},
});
