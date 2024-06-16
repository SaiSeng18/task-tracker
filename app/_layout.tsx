import React from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import { SQLiteProvider } from "expo-sqlite/next";
import { migrateDbIfNeeded } from "@/utils/db";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "@/constants/theme";

const RootLayout = () => {
	const [fontsLoaded] = useFonts({
		IcoMoon: require("@/assets/icomoon/fonts/icomoon.ttf"),
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<SQLiteProvider databaseName="task.db" onInit={migrateDbIfNeeded}>
			<StatusBar style="dark" />
			<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.dark }}>
				<Stack>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					<Stack.Screen
						name="new-task"
						options={{ headerShown: false, presentation: "modal" }}
					/>
					<Stack.Screen
						name="edit-task/[id]"
						options={{ headerShown: false, presentation: "modal" }}
					/>

					{/* <Stack.Screen name="+not-found" /> */}
				</Stack>
			</SafeAreaView>
		</SQLiteProvider>
	);
};

export default RootLayout;
