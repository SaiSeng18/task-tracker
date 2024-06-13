import { createIconSetFromIcoMoon } from "@expo/vector-icons";

const Icon = createIconSetFromIcoMoon(
	require("../assets/icomoon/selection.json"),
	"IcoMoon",
	"Icomoon.ttf"
);

export { Icon };
