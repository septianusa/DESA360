export default {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                leaf: {
                    50: "#f2f8f1",
                    100: "#dcefd9",
                    200: "#b9dfb4",
                    300: "#8bc783",
                    400: "#5ea85a",
                    500: "#3f873d",
                    600: "#2f6b30",
                    700: "#28562a",
                    800: "#234526",
                    900: "#1f3921",
                    950: "#142617"
                },
                merah: {
                    50: "#fff1f1",
                    100: "#ffe0e0",
                    500: "#cf2f2f",
                    600: "#aa2424",
                    700: "#891f1f"
                },
                rice: "#fbfaf4"
            },
            boxShadow: {
                soft: "0 16px 45px rgba(31, 57, 33, 0.10)"
            },
            fontFamily: {
                sans: [
                    "Inter",
                    "ui-sans-serif",
                    "system-ui",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    "Segoe UI",
                    "sans-serif"
                ]
            }
        }
    },
    plugins: []
};
