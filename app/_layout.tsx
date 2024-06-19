import React, { useEffect, useState } from "react";
import { router, Slot, SplashScreen, Stack, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import { SQLiteProvider } from "expo-sqlite/next";
import { migrateDbIfNeeded } from "@/utils/db";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "@/constants/theme";

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
	const [loaded, error] = useFonts({
		IcoMoon: require("@/assets/icomoon/fonts/icomoon.ttf"),
	});
	const [authenticated, setAuthenticated] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (authenticated) {
			router.replace("/");
		} else {
			router.replace("/signin");
		}
	}, [authenticated, router]);

	useEffect(() => {
		if (error) {
			console.error("Failed to load fonts", error);
		}
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return <Slot />;
	}

	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen name="(auth)" options={{ headerShown: false }} />
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
	);
};

const RootLayout = () => {
	return (
		<SQLiteProvider databaseName="task.db" onInit={migrateDbIfNeeded}>
			<StatusBar style="dark" />
			<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.dark }}>
				<InitialLayout />
			</SafeAreaView>
		</SQLiteProvider>
	);
};

export default RootLayout;
