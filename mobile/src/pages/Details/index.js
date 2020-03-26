import React from 'react';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';


import logoImg from '../../assets/logo.png';
import styles from './styles';
import api from '../../services/api'

export default function () {
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;

    const message = `Ola APAD, estou entrando em contato pois queria ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', 
    { style: 'currency', currency: 'BRL'})
    .format(incident.value)}`

    function navigateBack() {
        navigation.goBack();
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=55${incident.whatsapp}&text=${message}`);
    }

    function sendEmail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message
        })
    }

    return <View style={styles.container} >
        <View style={styles.header}>
            <Image source={logoImg} />
            <TouchableOpacity onPress={navigateBack} >
                <Feather name="arrow-left" size={28} color="#E02041" />
            </TouchableOpacity>
        </View>
        <View style={styles.incident}>
            <Text style={[styles.incidentProperty, { marginTop: 0 }]}>Ong:</Text>
            <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>
            
            <Text style={styles.incidentProperty}>Caso:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>
            
            <Text style={styles.incidentProperty}>Detalhes:</Text>
            <Text style={styles.incidentValue}>{incident.description}</Text>

            <Text style={styles.incidentProperty}>Valor:</Text>
            <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', 
            { style: 'currency', currency: 'BRL'})
            .format(incident.value)}</Text>
        </View>

        <View style={styles.contactBox}>
            <Text style={styles.heroTitle}>Salve o dia!</Text>
            <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

            <Text style={styles.heroDescription}>Entre em contato:</Text>
            <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.action} >
                    <Text style={styles.actionText} onPress={sendWhatsapp}>WhatsApp</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.action} onPress={sendEmail}>
                    <Text style={styles.actionText}>Email</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
}