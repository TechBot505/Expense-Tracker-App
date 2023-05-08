import { useState } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import Input from "./Input";
import Button from '../UI/Button';
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues }) {
    const [inputs, setInputs] = useState({
        amount: { 
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true
        },
        date: {
            value : defaultValues ? defaultValues.date.toISOString().slice(0, 10) : '',
            isValid : true
        },
        description: {
            value : defaultValues ? defaultValues.description : '',
            isValid : true
    }
    });
    
    function inputChangeHandler(inputIdentifier ,enteredValue) {
        setInputs((currentInputs) => {
            return {
                ...currentInputs,
                [inputIdentifier] : {value : enteredValue, isValid: true}
            }
        });
    };

    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        };
        
        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            // Alert.alert('Invalid Input', 'Pleases check your input values');
            setInputs((currentInputs) => {
                return {
                    amount : { value: currentInputs.amount.value, isValid: amountIsValid},
                    date : { value: currentInputs.date.value, isValid: dateIsValid},
                    description : { value: currentInputs.description.value, isValid: descriptionIsValid}
                }
            })
            return;
        }

        onSubmit(expenseData);
    };

    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

    return (
        <View>
            <Text style={styles.title}>  Your Expense  </Text>
            <View style={styles.inputsRow}>
            <Input style={styles.rowInput} label="Amount" inValid={!inputs.amount.isValid} textInputConfig={{
                keyboardType: "decimal-pad",
                onChangeText: inputChangeHandler.bind(this, 'amount'),
                value: inputs.amount.value
            }} />
            <Input style={styles.rowInput} inValid={!inputs.date.isValid} label="Date" textInputConfig={{
                placeholder: 'YYYY-MM-DD',
                maxLength: 10,
                onChangeText: inputChangeHandler.bind(this, 'date'),
                value: inputs.date.value
            }} />
            </View>
            <Input label="Description" inValid={!inputs.description.isValid} textInputConfig={{
                multiline: true,
                onChangeText: inputChangeHandler.bind(this, 'description'),
                value: inputs.description.value
            }} />
            {formIsInvalid && <Text style={styles.errorText}>Invalid Input Values!</Text>}
            <View style={styles.buttons}>
                <Button style={styles.buttonStyle} mode="flat" onPress={onCancel}>Cancel</Button>
                <Button style={styles.buttonStyle} onPress={submitHandler}>{submitButtonLabel}</Button>
            </View>
        </View>
    )
};

export default ExpenseForm;

const styles = StyleSheet.create({
    inputsRow: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    rowInput: {
        flex: 1
    },
    title: {
        color: "white",
        fontSize: 28,
        fontFamily: 'M-500',
        textAlign: 'center',
        padding: 16,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8
    },
    buttonStyle: {
        minWidth: 120,
        marginHorizontal: 8
    },
    errorText: {
        color: GlobalStyles.colors.error500,
        margin: 8,
        fontFamily: 'M-400',
        textAlign: 'center',
        fontSize: 14
    }
})