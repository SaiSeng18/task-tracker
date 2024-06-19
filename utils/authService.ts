// utils/authService.ts
import * as SecureStore from "expo-secure-store";

async function saveCredentials(username: string, password: string) {
	await SecureStore.setItemAsync(
		"userCredentials",
		JSON.stringify({ username, password })
	);
}

async function getCredentials() {
	const result = await SecureStore.getItemAsync("userCredentials");
	if (result) {
		return JSON.parse(result);
	}
	return null;
}

async function validateCredentials(username: string, password: string) {
	const credentials = await getCredentials();
	return (
		credentials &&
		credentials.username === username &&
		credentials.password === password
	);
}

export { saveCredentials, validateCredentials };
