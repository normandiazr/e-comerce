import React,  { useState } from 'react' ;
import { View } from 'react-native' ;
import { TextInput, Button  } from "react-native-paper";
import { loginApi  } from "../../api/user";
import { useFormik  } from 'formik';
import * as Yup from "yup";
import { RootSiblingParent } from "react-native-root-siblings";
import Toast from "react-native-root-toast";

import  formStyle    from "../../styles/formStyle";

export default function LoginForms( props ) {

    const { changeForms } = props ;
    
    const [ loading, setLoading ] = useState(false) ;
    

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object( validationSchema() ),
        onSubmit: async( formData ) => {
            
                setLoading( true ) ;

                try {


                    const response = await loginApi( formData ) ;
                    
                    if( response.statusCode ) throw "Error en la entrada del usuario" ;
                   
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
                
                setLoading( false ) ;
            },
    });

    return (
        <View>

        <RootSiblingParent>

            <TextInput 
                label="Email o Username" 
                style={ formStyle.input }
                onChangeText={ (text) => formik.setFieldValue("identifier", text ) }
                value={ formik.values.identifier }
                error={ formik.errors.identifier}/>
            <TextInput 
                label="Contraseña" 
                style={ formStyle.input } 
                secureTextEntry 
                onChangeText={ (text) => formik.setFieldValue("password", text ) }
                value={ formik.values.password}
                error={ formik.errors.password}
                />
            <Button 
                mode="contained" 
                style={ formStyle.btnSucces  }
                onPress={ formik.handleSubmit }
                loading ={loading}
                >
                Entrar</Button>

            <Button 
                mode = "Text" 
                style = { formStyle.btnText } 
                labelStyle = { formStyle.btnTextLabel }
                onPress = { changeForms  }
                 >
                Registarse</Button>

        </RootSiblingParent>        
        </View>
    )
}


function initialValues() {
    return {
        identifier: "",
        password: "",
    }
}


function validationSchema() {
    return {
       
        identifier: Yup.string().required(true),
        password: Yup.string().required(true),
    }

}