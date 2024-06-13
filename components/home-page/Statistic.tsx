import { CARD_CONTAINER, COLORS } from "@/constants/theme";
import { useScaleAnimation } from "@/utils/animations";
import { Image as ExImage } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import EtIcon from "react-native-vector-icons/Entypo";
import FeIcon from "react-native-vector-icons/Feather";

export const Statistic = () => {
	const { animatedStyle } = useScaleAnimation({ delay: 300 });

	return (
		<Animated.View
			style={[CARD_CONTAINER, animatedStyle, { backgroundColor: COLORS.gray }]}>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					marginBottom: 120,
				}}>
				<ExImage
					source={require("@/assets/icon.svg")}
					style={{ width: 45, height: 45 }}
				/>
				<Pressable style={[styles.iconButton, { backgroundColor: COLORS.light }]}>
					<EtIcon name="share" size={15} color={COLORS.dark} />
				</Pressable>
			</View>

			<View style={{ marginBottom: 50 }}>
				<Text style={{ fontSize: 16 }}>Statistics</Text>
				<Text style={{ fontSize: 50 }}>
					Hello 👋🏻 Daniel{"\n"}
					<ExImage
						source={
							"https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						}
						style={{
							transform: [{ translateY: 5 }],
							height: 35,
							width: 35,
							borderRadius: 35 / 2,
							overflow: "hidden",
						}}
					/>{" "}
					your overall score is{" "}
					<Text style={{ fontWeight: "700" }}>above average.</Text>
				</Text>
			</View>

			<View style={{ width: "100%", flexDirection: "row", gap: 8, height: 50 }}>
				<View
					style={{
						flexShrink: 1,
						paddingHorizontal: 8,
						height: "100%",
						borderRadius: 25,
						backgroundColor: COLORS.light,
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						gap: 8,
					}}>
					<Text style={{ fontSize: 10 }}>📈 Growth: 15%</Text>
				</View>

				<View
					style={{
						flex: 1,
						height: "100%",
						borderRadius: 25,
						backgroundColor: COLORS.light,
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						gap: 8,
					}}>
					<Text style={{ fontSize: 10 }}>🏆 Best Result: 5/6 Tasks</Text>
				</View>

				<Pressable
					style={{
						height: "100%",
						aspectRatio: 1,
						borderRadius: 25,
						backgroundColor: COLORS.light,
						justifyContent: "center",
						alignItems: "center",
					}}>
					<FeIcon name="arrow-up-right" size={20} color={COLORS.dark} />
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
