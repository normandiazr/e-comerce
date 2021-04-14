import React from 'react';
import { View} from 'react-native';
import { TextInput, Button} from "react-native-paper";
import { useFormik  } from 'formik';
import * as Yup from "yup";
import { registerAPI  } from "../../api/user";

import { formStyle  } from '../../styles';


export default function RegisterForm( props ) {

    const { changeForms } = props ;

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object( validationSchema() ),
        onSubmit: async( formData ) => {
                
                try {

                    await registerAPI( formData ) ;
                    console.log("ok");
                    console.log( formData );
                    
                } catch (error) {
                    console.log(error);
                }

            },
    });

    return (
        <View>

           <TextInput 
                label="Email" 
                style={ formStyle.input } 
                onChangeText={ (text) => formik.setFieldValue("email", text ) } 
                value={ formik.values.email}
                error={ formik.errors.email}
                />
            <TextInput 
                label="Usuario"
                style={ formStyle.input }
                onChangeText={ (text) => formik.setFieldValue("username", text ) }
                value={ formik.values.username}
                error={ formik.errors.username}
                />
           <TextInput 
                label="Contraseña"
                style={ formStyle.input } 
                secureTextEntry 
                onChangeText={ (text) => formik.setFieldValue("password", text ) }
                value={ formik.values.password}
                error={ formik.errors.password}
                />
           <TextInput 
                label="Repetir contraseña"
                style={ formStyle.input }
                secureTextEntry
                onChangeText={ (text) => formik.setFieldValue("rpassword", text ) }
                value={ formik.values.rpassword}
                error={ formik.errors.rpassword}
                />
            
           <Button mode="container" style={formStyle.btnSucces} onPress={ formik.handleSubmit} >Registrarse</Button>

           <Button 
           mode="text" 
           style={formStyle.btnText} 
           labelStyle={ formStyle.btnTextLabel}
           onPress= { changeForms } 
           >Iniciar sesión</Button>
          
        </View>
    )
}


function initialValues() {
    return {
       
        email: "",
        username: "",
        password: "",
        rpassword : "",
 
    }
}


function validationSchema() {
    return {
       
        email: Yup.string().email(true).required(true),
        username: Yup.string().required(true),
        password: Yup.string().required(true),
        rpassword: Yup.string()
                   .required(true)
                   .oneOf( [ Yup.ref( "password" ) ], true),
    }

}