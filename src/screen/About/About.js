import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../compunent/header/Header'
import { SafeAreaView } from 'react-native-safe-area-context'

const About = () => {
    return (
        <SafeAreaView
            className="flex-1  pt-1 bg-white"
        >
            <Header ret={true} showlogo={false} text={"About Us"} />
            <ScrollView>
                <Text
                    className=" text-2xl px-5 mt-5"
                >À propos de nous</Text>
                <Text
                    className="px-5 text-center mt-2"
                >Veuillez lire attentivement ces termes et conditions avant d'utiliser notre service.</Text>
                <Text
                    className="text-xl  px-5 mt-5"
                >Qu'est-ce que Tawssilat</Text>
                <Text
                    className="px-5 mt-2"
                >Les mots dont la lettre initiale est une majuscule ont des significations définies dans les conditions suivantes. Les définitions suivantes ont la même signification, qu'elles apparaissent au singulier ou au pluriel.</Text>
                <Text
                    className="text-xl  px-5 mt-5"
                >Ce que nous offrons</Text>
                <Text
                    className="px-5 mt-2"
                >Aux fins des présentes Conditions générales :</Text>
                <Text
                    className="px-5 mt-2"
                >Application désigne le programme logiciel fourni par la Société téléchargé par vous sur tout appareil électronique, nommé tawssilat</Text>
                <Text
                    className="px-5 mt-2"
                >Application Store désigne la distribution numérique (Apple App Store) ou Google Inc. (Google Play Store) dans laquelle l'Application a été téléchargée.</Text>
                <Text
                    className="px-5 mt-2"
                >Une filiale désigne une entité qui contrôle, est contrôlée par ou est sous contrôle commun avec une partie, où « contrôle » signifie la propriété de 50 % ou plus des actions, des participations ou d’autres titres donnant droit de vote pour l’élection des administrateurs ou d’autres autorités de gestion.</Text>
                <Text
                    className="px-5 mt-2"
                >Pays faisant référence à : Algérie</Text>
                <Text
                    className="px-5 mt-2 mb-10"
                >La Société (appelée « la Société », « Nous », « Notre » ou « Nos » dans le présent Contrat) fait référence à tawssilat, M497+F7V, Cite El Maredja, Baraki.</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

export default About