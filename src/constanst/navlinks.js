import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
export default [
    {
        name: "Informations personnelles",
        icon: <MaterialIcons name="person" size={24} color="#777a" />,
        to: "personnelles"
    },
    {
        name: "Favoris",
        icon: <MaterialIcons name="favorite-border" size={24} color="#777a" />,
        to: "favorite"
    },
    {
        name: "ma panier",
        icon: <AntDesign name="shoppingcart" size={24} color="#777a" />,
        to: "card"
    },
    {
        name: "Histoire",
        icon: <FontAwesome name="history" size={24} color="#777a" />,
        to: "history"
    },
    {
        name: "Conditions générales",
        icon: <FontAwesome name="handshake-o" size={24} color="#777a" />,
        to: "terms"
    },
    {
        name: "Service d'assistance",
        icon: <MaterialIcons name="support-agent" size={24} color="#777a" />,
        to: "support"
    },
    {
        name: "À propos de nous",
        icon: <AntDesign name="questioncircleo" size={24} color="#777a" />,
        to: "about"
    },
    {
        name: "Feedback",
        icon: <MaterialIcons name="feedback" size={24} color="#777a" />,
        to: "feedback"
    }
]