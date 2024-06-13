import { CARD_CONTAINER, COLORS } from "@/constants/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useState } from "react";
import { useScaleAnimation } from "@/utils/animations";
import Animated from "react-native-reanimated";

export const Progress = () => {
	const [time, setTime] = useState<"week" | "month">("week");
	const { animatedStyle } = useScaleAnimation({ delay: 500 });

	return (
		<Animated.View
			style={[CARD_CONTAINER, animatedStyle, { backgroundColor: COLORS.cyan }]}>
			<View
				style={[
					{
						width: "100%",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						marginBottom: 32,
					},
				]}>
				<View
					style={[
						styles.iconButton,
						{
							backgroundColor: COLORS.light,
						},
					]}>
					<FontAwesome6 name="arrow-trend-up" size={15} color={COLORS.dark} />
				</View>

				<View
					style={{
						height: 45,
						borderRadius: 45 / 2,
						backgroundColor: COLORS.dark,
						flexDirection: "row",
						padding: 2,
					}}>
					<Pressable
						onPress={() => setTime("week")}
						style={{
							height: "100%",
							width: 100,
							borderRadius: 49 / 2,
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: time === "week" ? COLORS.cyan : "transparent",
						}}>
						<Text style={{ color: time === "week" ? COLORS.dark : COLORS.light }}>
							Week
						</Text>
					</Pressable>

					<Pressable
						onPress={() => setTime("month")}
						style={{
							height: "100%",
							width: 100,
							borderRadius: 49 / 2,
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: time === "month" ? COLORS.cyan : "transparent",
						}}>
						<Text style={{ color: time === "month" ? COLORS.dark : COLORS.light }}>
							Month
						</Text>
					</Pressable>
				</View>
			</View>

			<View
				style={{
					width: "100%",
					flexDirection: "row",
					gap: 8,
					justifyContent: "flex-end",
					alignItems: "flex-end",
				}}>
				<View style={{ flex: 1 }}>
					<Text style={{ fontSize: 16 }}>Your progress</Text>

					<Text style={{ fontSize: 32 }}>You are doing well 🙂</Text>
				</View>
				<View
					style={{ flex: 1, alignItems: "flex-end", justifyContent: "flex-end" }}>
					<Text style={{ fontSize: 62 }}>78%</Text>
				</View>
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
