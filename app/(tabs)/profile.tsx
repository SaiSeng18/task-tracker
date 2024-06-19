import { Icon } from "@/constants/icons";
import { COLORS } from "@/constants/theme";
import { CommonActions } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router";
import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	Button,
	Pressable,
} from "react-native";
const ProfilePage = () => {
	const router = useRouter();
	const navigation = useNavigation();

	return (
		<ScrollView
			style={{
				flex: 1,
				backgroundColor: COLORS.dark,
				paddingHorizontal: 8,
				flexDirection: "column",
			}}>
			<View
				style={{
					width: "100%",

					paddingVertical: 16,
				}}>
				<Icon name="logo" size={50} color={COLORS.light} />
			</View>

			<View style={styles.profileContainer}>
				<View style={styles.avatar}></View>
				<Text style={styles.profileName}>John Doe</Text>
			</View>

			<Pressable style={styles.editButton}>
				<Text style={{ color: COLORS.dark, fontSize: 20 }}>Edit Profile</Text>
			</Pressable>

			<Pressable
				style={styles.signOutButton}
				onPress={() =>
					navigation.dispatch(
						CommonActions.reset({
							index: 0,
							routes: [{ name: "(auth)" }],
						})
					)
				}>
				<Text style={{ color: COLORS.light, fontSize: 20 }}>Sign Out</Text>
			</Pressable>
		</ScrollView>
	);
};
export default ProfilePage;

const styles = StyleSheet.create({
	profileContainer: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 20,
		gap: 20,
	},
	avatar: {
		width: 150,
		height: 150,
		borderRadius: 75,
		backgroundColor: COLORS.light,
	},
	profileName: {
		fontSize: 20,
		color: COLORS.light,
	},
	editButton: {
		backgroundColor: COLORS.lime,
		color: COLORS.light,
		borderRadius: 10,
		width: "100%",
		height: 75,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20,
	},
	signOutButton: {
		backgroundColor: COLORS.red,
		color: COLORS.light,
		borderRadius: 10,
		width: "100%",
		height: 75,
		justifyContent: "center",
		alignItems: "center",
	},
});
