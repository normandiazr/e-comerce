import React, { useState } from 'react' ;
import { StyleSheet, View, Text, Image  } from 'react-native' ;
import logo from "../../assets/logo.png";
import RegisterForm from "../components/auth/RegisterForm";
import { layoutStyle } from "../styles";



export default function auth() {
    const [ showLogin , setshowLogin  ] = useState(false) ;


    const changeForms = () => setshowLogin(!showLogin) ;

    return (
        <View style={ layoutStyle.Container }>
            <Image style={ style.logo  } source = { logo } />
            { showLogin ? <Text>Carga login de zuly</Text> : <RegisterForm changeForms = { changeForms } /> }
        </View>
    )
}


const style = StyleSheet.create({
    logo: {
        width: "100%",
        height: 100,
        resizeMode: "contain",
        marginBottom: 20

    },

   }
)