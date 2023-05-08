import { Text, TextInput, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Input({label, inValid, textInputConfig, style }) {

    const inputStyles = [styles.input];

    if(textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.imputMultiline)
    }

    if (inValid) {
        inputStyles.push(styles.inValidInput);
    }

    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={[styles.label, inValid && styles.inValidLabel]}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig} />
        </View>
    );
};

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
        elevation: 6,
    },
    label : {
        fontSize: 16,
        color: GlobalStyles.colors.primary200,
        marginBottom: 4,
        fontFamily: 'M-500'
    },
    input: {
        backgroundColor: GlobalStyles.colors.accent400,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 8,
        fontSize: 15,
        color: GlobalStyles.colors.primary700,
        fontFamily: 'M-500'
    },
    imputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top'
    },
    inValidLabel: {
        color: GlobalStyles.colors.error500
    },
    inValidInput: {
        backgroundColor: GlobalStyles.colors.error50
    }
})