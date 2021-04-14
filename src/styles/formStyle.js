import { StyleSheet  } from "react-native";
import colors from "../styles/color";

const formStyle = StyleSheet.create({

    input: {
        marginBottom: 20,
    },

    btnSucces: {
        padding: 5,
        backgroundColor: colors.primary,
    },

    btnText:{
        marginTop: 20,
 
    },

    btnTextLabel: {
        color: colors.dark ,
    }
})

export default formStyle;
