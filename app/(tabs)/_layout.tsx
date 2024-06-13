import CustomTab from "@/components/CustomTab";
import { COLORS } from "@/constants/theme";
import { Tabs } from "expo-router";

const Layout = () => {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,

				tabBarStyle: [
					{
						backgroundColor: COLORS.dark,
						height: 75,
						paddingHorizontal: 20,
						borderTopWidth: 0,
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
						paddingBottom: 0,
					},
				],
			}}>
			<Tabs.Screen
				name="index"
				options={{
					tabBarLabel: "",

					tabBarIcon: ({ focused }) => (
						<CustomTab focused={focused} isIcon={false} text="Home" />
					),
				}}
			/>
			<Tabs.Screen
				name="task"
				options={{
					tabBarLabel: "",
					tabBarIcon: ({ focused }) => <CustomTab focused={focused} isIcon={true} />,
				}}
			/>
			<Tabs.Screen
				name="setting"
				options={{
					tabBarLabel: "",
					tabBarIcon: ({ focused }) => (
						<CustomTab focused={focused} text="Setting" />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					tabBarLabel: "",
					tabBarIcon: ({ color, focused }) => (
						<CustomTab focused={focused} text="Profile" />
					),
				}}
			/>
		</Tabs>
	);
};
export default Layout;
