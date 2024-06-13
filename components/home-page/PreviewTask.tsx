import { CARD_CONTAINER, COLORS } from "@/constants/theme";
import { useScaleAnimation } from "@/utils/animations";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAnimatedStyle } from "react-native-reanimated";
import EtIcon from "react-native-vector-icons/Entypo";
import Animated from "react-native-reanimated";

export const PreviewTask = () => {
	const { animatedStyle } = useScaleAnimation({ delay: 100 });

	return (
		<Animated.View
			style={[
				styles.container,
				animatedStyle,
				{
					backgroundColor: COLORS.light,
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					gap: 10,
				},
			]}>
			<View style={{ flexDirection: "row", gap: 8 }}>
				<View
					style={{
						padding: 16,
						alignItems: "center",
						backgroundColor: COLORS.dark,
						borderRadius: 30,
					}}>
					<Text style={{ color: COLORS.light, fontSize: 16 }}>08</Text>
					<Text style={{ color: COLORS.light, fontSize: 12 }}>FRI</Text>
				</View>

				<View style={{ alignItems: "flex-start", justifyContent: "center" }}>
					<Text style={{ color: COLORS.dark, fontWeight: "700" }}>Webinar</Text>
					<Text style={{ color: COLORS.gray }}>Implementation of habits</Text>
				</View>
			</View>

			<View style={{ flexDirection: "row", gap: 8 }}>
				<Pressable
					style={[styles.iconButton, { borderColor: COLORS.gray, borderWidth: 1 }]}>
					<EtIcon name="dots-three-horizontal" size={15} color={COLORS.dark} />
				</Pressable>
				<Pressable style={[styles.iconButton, { backgroundColor: COLORS.dark }]}>
					<EtIcon name="link" size={15} color={COLORS.light} />
				</Pressable>
			</View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: CARD_CONTAINER,

	iconButton: {
		height: 45,
		width: 45,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 45 / 2,
	},
});
