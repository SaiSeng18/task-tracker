// Blog.js
import BlogCard from "@/components/blog-page/BlogCard";
import { Header } from "@/components/home-page/Header";
import { COLORS, SPACING } from "@/constants/theme";
import { View, FlatList, StyleSheet } from "react-native";

const Blog = () => {
	const data = Array(10).fill(null);

	return (
		<View style={styles.container}>
			<Header />
			<FlatList
				contentContainerStyle={styles.list}
				ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
				data={data}
				renderItem={({ index }) => <BlogCard index={index} />}
			/>
		</View>
	);
};

export default Blog;

const styles = StyleSheet.create({
	container: {
		flex: 1,

		backgroundColor: COLORS.dark,
	},
	list: {
		flexGrow: 1,
		padding: SPACING.small,
	},
});
