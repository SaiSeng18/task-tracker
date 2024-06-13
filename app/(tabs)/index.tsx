import { Link } from "expo-router";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { COLORS, SPACING } from "@/constants/theme";
import { Header } from "@/components/home-page/Header";
import { CurrentTask } from "@/components/home-page/CurrentTask";
import { PreviewTask } from "@/components/home-page/PreviewTask";
import { CommunityBlog } from "@/components/home-page/CommunityBlog";
import { Statistic } from "@/components/home-page/Statistic";
import { SharedStatus } from "@/components/home-page/SharedStatus";
import { Progress } from "@/components/home-page/Progress";

export default function Page() {
	return (
		<ScrollView
			style={{
				backgroundColor: COLORS.dark,
			}}>
			<View style={styles.container}>
				<Header />

				<CurrentTask />

				<PreviewTask />

				<CommunityBlog />

				<Statistic />

				<SharedStatus />

				<Progress />

				<Link href="/tasks">Tasks</Link>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		padding: SPACING.small,
		gap: SPACING.small,
	},
});
