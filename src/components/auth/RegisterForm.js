import React , { useState } from 'react';
import { View} from 'react-native';
import { TextInput, Button} from "react-native-paper";
import { useFormik  } from 'formik';
import * as Yup from "yup";
import { registerAPI  } from "../../api/user";
import Toast from "react-native-root-toast";
import { RootSiblingParent } from "react-native-root-siblings";
import { formStyle  } from '../../styles';


export default function RegisterForm( props ) {

    const { changeForms } = props ;

    const [ loading, setLoading ] = useState(false) ;

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object( validationSchema() ),
        onSubmit: async( formData ) => {

                setLoading(true) ;
                
                try {

                    const response = await registerAPI( formData ) ;
                    if( response.statusCode )throw "Usuario y/o email ya existen, repita su operacion" ;
                    
                    changeForms();
                    
                } catch (error) {
                    Toast.show(error, { 
                        position: Toast.positions.CENTER,
                        shadow: false,
                        animation: true,
                        hideOnPress: true,
                        delay: 10,

                    }) ;
                }

                setLoading(false);
                

            },
    });

    return (
        <View>
            <RootSiblingParent>
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
            
           <Button 
                mode="container" 
                style={formStyle.btnSucces} 
                onPress={ formik.handleSubmit} 
                loading = { loading }
                
                >Registrarse</Button>

           <Button 
           mode="text" 
           style={formStyle.btnText} 
           labelStyle={ formStyle.btnTextLabel}
           onPress= { changeForms } 
           >Iniciar sesión</Button>
          </RootSiblingParent>
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