export const initialTheme = { mode: "light" };

export const themeReducer = (state, action) => {
    switch (action.type) {
        case "TOGGLE":
            return { mode: state.mode === "light" ? "dark" : "light" };
        case "SET":
            return { mode: action.payload };
        default:
            return state;
    }
};
