import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function ExpensesSummary({expenses, periodName}) {
    const expensesSum = expenses.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0);

    return (
        <View style={styles.container}>
          <Text style={styles.period}>{periodName}</Text>
          <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
        </View>
    );
};

export default ExpensesSummary;

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white'
    },
    period: {
        color: GlobalStyles.colors.primary700,
        fontFamily: 'M-500',
        fontSize: 14
    },
    sum: {
        fontSize: 16,
        fontFamily: 'M-700',
        color: GlobalStyles.colors.primary500
    }
})