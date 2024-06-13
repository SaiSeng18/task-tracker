import { CARD_CONTAINER, COLORS, SPACING } from "@/constants/theme";
import { BlurView } from "expo-blur";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image as ExImage } from "expo-image";
import FeIcon from "react-native-vector-icons/Feather";
import FaIcon from "react-native-vector-icons/FontAwesome";
import { useScaleAnimation } from "@/utils/animations";
import Animated from "react-native-reanimated";

export const CommunityBlog = () => {
	const { animatedStyle } = useScaleAnimation({ delay: 200 });

	return (
		<Animated.View
			style={[styles.container, animatedStyle, { backgroundColor: COLORS.light }]}>
			<View style={styles.head}>
				<View
					style={{
						height: 20,
						flexDirection: "row",
						gap: 8,
						justifyContent: "flex-end",
						alignItems: "center",
					}}>
					<FaIcon name="globe" size={20} color={COLORS.dark} />
					<Text style={{ fontWeight: "500" }}>
						<Text style={{ color: COLORS.gray }}>by </Text>Habit Journey
					</Text>
				</View>

				<View style={{ flexDirection: "row", gap: 8 }}>
					<Pressable
						style={[
							styles.iconButton,
							{
								backgroundColor: COLORS.light,
								borderWidth: 1,
								borderColor: COLORS.gray,
							},
						]}>
						<FeIcon name="eye" size={15} color={COLORS.dark} />
					</Pressable>
					<Pressable style={[styles.iconButton, { backgroundColor: COLORS.dark }]}>
						<FeIcon name="arrow-up-right" size={15} color={COLORS.light} />
					</Pressable>
				</View>
			</View>

			<View style={{ marginVertical: 20 }}>
				<Text style={{ fontSize: 20 }}>Community Blog</Text>
				<Text style={{ fontSize: 32 }}>Productive Routine</Text>
				<View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
					<Text style={{ color: COLORS.gray, textDecorationLine: "underline" }}>
						Read Now
					</Text>

					<View
						style={{
							height: 30,
							width: 30,
							borderRadius: 15,
							backgroundColor: COLORS.gray,
							justifyContent: "center",
							alignItems: "center",
						}}>
						<FeIcon name="arrow-right" size={20} color={COLORS.light} />
					</View>
				</View>
			</View>

			<View
				style={{
					width: "100%",
					height: 250,
					backgroundColor: COLORS.gray,
					borderTopLeftRadius: 40,
					borderTopRightRadius: 40,
					borderBottomLeftRadius: 40,
					position: "relative",
					overflow: "hidden",
				}}>
				<ExImage
					style={[StyleSheet.absoluteFillObject]}
					source={
						"https://i.pinimg.com/564x/a5/e1/c3/a5e1c31c327694f86c8a1f33fc3ff732.jpg"
					}
				/>

				{/* Link */}
				<View
					style={{
						position: "absolute",
						top: 20,
						left: 20,
						padding: 8,
						borderRadius: 15,
						backgroundColor: COLORS.light,
					}}>
					<Text style={{ color: COLORS.dark }}>www.example.com</Text>
				</View>

				{/* Bottom Tabs */}
				<View
					style={{
						width: "100%",
						position: "absolute",
						bottom: 0,
						padding: 12,
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}>
					<BlurView intensity={50} style={styles.blurContainer}>
						{/* <View
							style={{
								height: 75,
								width: 75,
								borderRadius: 75 / 2,
								backgroundColor: COLORS.light,
							}}></View> */}
						<FeIcon name="eye" size={20} color={COLORS.light} />
						<Text style={{ fontSize: 20, color: COLORS.light }}>1.5k</Text>
					</BlurView>

					<View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
						<Text style={{ textAlign: "right", color: COLORS.light }}>
							Liked {"\n"} by
						</Text>
						<BlurView
							intensity={50}
							style={{
								flexDirection: "row",
								padding: 4,
								gap: 4,
								borderRadius: 50,
								justifyContent: "center",
								alignItems: "center",
								overflow: "hidden",
							}}>
							<View
								style={{
									height: 35,
									aspectRatio: 1,
									backgroundColor: COLORS.gray,
									borderRadius: 15,
								}}></View>

							<View
								style={{
									height: 35,
									aspectRatio: 1,
									backgroundColor: COLORS.gray,
									borderRadius: 15,
								}}></View>

							<View
								style={{
									height: 35,
									aspectRatio: 1,
									backgroundColor: COLORS.gray,
									borderRadius: 15,
								}}></View>

							<View
								style={{
									height: 35,
									aspectRatio: 1,
									backgroundColor: COLORS.gray,
									borderRadius: 15,
								}}></View>
						</BlurView>
					</View>
				</View>
			</View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: CARD_CONTAINER,
	head: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	iconButton: {
		height: 45,
		width: 45,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 45 / 2,
	},
	blurContainer: {
		height: 60,
		width: 60,
		borderRadius: 30,
		textAlign: "center",
		justifyContent: "center",
		alignItems: "center",
		overflow: "hidden",
	},
});
