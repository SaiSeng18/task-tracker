import { Icon } from "@/constants/icons";
import { COLORS, SPACING } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
	View,
	Text,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	TextInput,
	Pressable,
	StyleSheet,
} from "react-native";
const SignIn = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const router = useRouter();

	const handleSignIn = () => {
		router.navigate("/");
	};

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -150}>
			<ScrollView
				style={{ backgroundColor: COLORS.dark, flex: 1, padding: SPACING.small }}>
				<View
					style={{
						width: "100%",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						paddingVertical: 16,
						marginBottom: 50,
						gap: 20,
					}}>
					<Icon name="logo" size={150} color={COLORS.light} />
					<Text style={{ fontSize: 24, color: COLORS.light }}>Sign In</Text>
				</View>
				<View style={{ width: "100%", gap: 20, marginBottom: 50 }}>
					<View style={{ gap: 10 }}>
						<Text style={{ fontSize: 18, color: COLORS.light }}>Username</Text>
						<TextInput style={styles.textInput} onChangeText={setUsername} />
					</View>
					<View style={{ gap: 10 }}>
						<Text style={{ fontSize: 18, color: COLORS.light }}>Password</Text>
						<TextInput
							style={styles.textInput}
							onChangeText={setPassword}
							secureTextEntry
						/>
					</View>
					<View
						style={{
							flexDirection: "row",
						}}>
						<Text
							style={{
								color: COLORS.light,
							}}>
							Don't have an account?{" "}
						</Text>
						<Pressable style={{}} onPress={() => router.navigate("/signup")}>
							<Text style={{ color: COLORS.blue }}>Sign Up</Text>
						</Pressable>
					</View>
				</View>

				<Pressable
					onPress={handleSignIn}
					style={{
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						height: 50,
						backgroundColor: COLORS.lime,
						borderRadius: 10,
						gap: 10,
					}}>
					<Text style={{ fontSize: 18 }}>Sign In</Text>
				</Pressable>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};
export default SignIn;

const styles = StyleSheet.create({
	textInput: {
		backgroundColor: COLORS.light,
		borderRadius: 10,
		padding: 10,
		color: COLORS.dark,
		flex: 1,
	},
	tag: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 10,
		backgroundColor: COLORS.lime,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 10,
		flexShrink: 1,
	},
});
