import { Pressable, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Button({children, onPress, mode, style}) {
    return (
        <View style={style}>
            <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
                <View style={[styles.button, mode === 'flat' && styles.flat ]}>
                    <Text style={[styles.buttonText, mode === 'flat' && styles.flatText ]}>{children}</Text>
                </View>
            </Pressable>
        </View>
    )
};

export default Button;

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary200,
    },
    flat: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: GlobalStyles.colors.accent600
    },
    buttonText: {
        color: "white",
        textAlign: 'center',
        fontFamily: 'M-400'
    },
    flatText: {
        color: GlobalStyles.colors.primary100
    },
    pressed: {
        opacity: 0.75,
        backgroundColor: GlobalStyles.colors.primary700,
        borderRadius: 4
    }
});