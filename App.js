import React , { useState }  from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { layoutStyle  } from './src/styles';
import { Provider as PaperProvider  } from 'react-native-paper';
import AuthScreen from "./src/screen/auth" ;

export default function App() {

    const [ auth , setAuth ] = useState(undefined) ;


    return ( 
       <PaperProvider>

        { auth ? <Text>Zona de Usarios</Text> : <AuthScreen /> } 
            
        </PaperProvider>


    );
}

const styles = StyleSheet.create({

});

