// BlogCard.js
import { COLORS } from "@/constants/theme";
import { useScaleAnimation } from "@/utils/animations";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import FeIcon from "react-native-vector-icons/Feather";
import FaIcon from "react-native-vector-icons/FontAwesome";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

const BlogCard = ({ index }: { index: number }) => {
	const { animatedStyle } = useScaleAnimation({ delay: index * 200 });

	return (
		<Animated.View style={[styles.container, animatedStyle]}>
			<View style={styles.head}>
				<View style={styles.headDetails}>
					<FaIcon name="globe" size={20} color={COLORS.dark} />
					<Text style={styles.authorText}>
						<Text style={styles.grayText}>by </Text>Habit Journey
					</Text>
				</View>

				<View style={styles.iconRow}>
					<Pressable style={[styles.iconButton, styles.eyeButton]}>
						<FeIcon name="eye" size={15} color={COLORS.dark} />
					</Pressable>
					<Pressable style={[styles.iconButton, styles.arrowButton]}>
						<FeIcon name="arrow-up-right" size={15} color={COLORS.light} />
					</Pressable>
				</View>
			</View>

			<View style={styles.content}>
				<Text style={styles.blogTitle}>Community Blog</Text>
				<Text style={styles.blogSubtitle}>Productive Routine</Text>
				<View style={styles.readNowRow}>
					<Text style={styles.readNowText}>Read Now</Text>

					<View style={styles.readNowIcon}>
						<FeIcon name="arrow-right" size={20} color={COLORS.light} />
					</View>
				</View>
			</View>

			<View style={styles.imageContainer}>
				<Image
					style={StyleSheet.absoluteFillObject}
					source={
						"https://i.pinimg.com/564x/a5/e1/c3/a5e1c31c327694f86c8a1f33fc3ff732.jpg"
					}
				/>

				<View style={styles.linkContainer}>
					<Text style={styles.linkText}>www.example.com</Text>
				</View>

				<View style={styles.bottomTabs}>
					<BlurView intensity={50} style={styles.blurContainer}>
						<FeIcon name="eye" size={20} color={COLORS.light} />
						<Text style={styles.viewCount}>1.5k</Text>
					</BlurView>

					<View style={styles.likedByContainer}>
						<Text style={styles.likedByText}>Liked {"\n"} by</Text>
						<BlurView intensity={50} style={styles.likedByIcons}>
							<View style={styles.icon}></View>
							<View style={styles.icon}></View>
							<View style={styles.icon}></View>
							<View style={styles.icon}></View>
						</BlurView>
					</View>
				</View>
			</View>
		</Animated.View>
	);
};

export default BlogCard;

const styles = StyleSheet.create({
	container: {
		padding: 16,
		borderRadius: 20,
		flex: 1,
		backgroundColor: COLORS.light,
		width: "100%",
	},
	head: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	headDetails: {
		height: 20,
		flexDirection: "row",
		gap: 8,
		justifyContent: "flex-end",
		alignItems: "center",
	},
	authorText: {
		fontWeight: "500",
	},
	grayText: {
		color: COLORS.gray,
	},
	iconRow: {
		flexDirection: "row",
		gap: 8,
	},
	iconButton: {
		height: 45,
		width: 45,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 45 / 2,
	},
	eyeButton: {
		backgroundColor: COLORS.light,
		borderWidth: 1,
		borderColor: COLORS.gray,
	},
	arrowButton: {
		backgroundColor: COLORS.dark,
	},
	content: {
		marginVertical: 20,
	},
	blogTitle: {
		fontSize: 20,
	},
	blogSubtitle: {
		fontSize: 32,
	},
	readNowRow: {
		flexDirection: "row",
		gap: 8,
		alignItems: "center",
	},
	readNowText: {
		color: COLORS.gray,
		textDecorationLine: "underline",
	},
	readNowIcon: {
		height: 30,
		width: 30,
		borderRadius: 15,
		backgroundColor: COLORS.gray,
		justifyContent: "center",
		alignItems: "center",
	},
	imageContainer: {
		width: "100%",
		height: 250,
		backgroundColor: COLORS.gray,
		borderTopLeftRadius: 40,
		borderTopRightRadius: 40,
		borderBottomLeftRadius: 40,
		position: "relative",
		overflow: "hidden",
	},
	linkContainer: {
		position: "absolute",
		top: 20,
		left: 20,
		padding: 8,
		borderRadius: 15,
		backgroundColor: COLORS.light,
	},
	linkText: {
		color: COLORS.dark,
	},
	bottomTabs: {
		width: "100%",
		position: "absolute",
		bottom: 0,
		padding: 12,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
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
	viewCount: {
		fontSize: 20,
		color: COLORS.light,
	},
	likedByContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	likedByText: {
		textAlign: "right",
		color: COLORS.light,
	},
	likedByIcons: {
		flexDirection: "row",
		padding: 4,
		gap: 4,
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center",
		overflow: "hidden",
	},
	icon: {
		height: 35,
		aspectRatio: 1,
		backgroundColor: COLORS.gray,
		borderRadius: 15,
	},
});
