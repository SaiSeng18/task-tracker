import { Link } from "expo-router";
import {
	ActivityIndicator,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { COLORS, SPACING } from "@/constants/theme";
import { Header } from "@/components/home-page/Header";
import { CurrentTask } from "@/components/home-page/CurrentTask";
import { PreviewTask } from "@/components/home-page/PreviewTask";
import { CommunityBlog } from "@/components/home-page/CommunityBlog";
import { Statistic } from "@/components/home-page/Statistic";
import { SharedStatus } from "@/components/home-page/SharedStatus";
import { Progress } from "@/components/home-page/Progress";
import useTasksStore from "@/utils/store";
import { useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";

export default function Page() {
	const db = useSQLiteContext();
	const { tasks, fetchAll, loading } = useTasksStore();

	useEffect(() => {
		fetchAll(db);
	}, []);

	return (
		<ScrollView
			style={{
				backgroundColor: COLORS.dark,
			}}>
			<View style={styles.container}>
				<Header />
				{loading ? (
					<ActivityIndicator size="large" color={COLORS.light} />
				) : (
					<>
						<CurrentTask tasks={tasks} />

						<PreviewTask />

						<CommunityBlog />

						<Statistic tasks={tasks} />

						<SharedStatus />

						<Progress tasks={tasks} />
					</>
				)}
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
