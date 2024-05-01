import React from "react";
import { StyleSheet, Text, Pressable, View, Image } from "react-native";
import Carousel from 'react-native-snap-carousel';
import { useRouter } from "expo-router";

const Onboarding = () => {
    const router = useRouter();

    const slides = [
        {
            title: 'Добро пожаловать в приложение Grind',
            text: '4 основных блока для совершенствования и поддержания здорового образа жизни',
            image: { uri: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXRqNjNlbGVkNjQ5OTFhOHJjYjNvNGNkYjJvaWZ1dmlvbnBmaDc0NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RIqh9nbpblgvWvd6ZK/giphy.gif' }
        },
        {
            title: 'Задачи',
            text: 'Создавай и выполняй задачи из разных категорий на любые даты',
            image: { uri: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTU0M2U3enEwdDVwZnhwcWowc2U4ZnMwZmw5YjEyazRrcXBhcDc3ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dWOKEQ5ewh94RJLemj/giphy.gif' }
        },
        {
          title: 'Активности',
          text: 'Поддерживай здоровый образ жизни благодаря тренировкам и медитациям',
          image: { uri: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDF0cTB4NGd1b3VsdWw4Nzk3cGh2aHc5NW5waWR6emVrZGw1azM1bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cgfK6GyhXHpnSqdxc7/giphy.gif' }
        },
        {
            title: 'Планирование',
            text: 'Планируй свое время и отслеживай выполнение задач сразу на 3 недели',
            image: { uri: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDdiOGdvbHJ5dGttMjFxY3praDJuMzByMDV5aG1lc3lrdXZ2bGpjdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3og0IJLXCkjr37X91C/giphy.gif' }
        }, 
        {
          title: 'Профиль',
          text: 'Отслеживай свой прогресс используя графики и характеристики совершенствования',
          image: { uri: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTN1Zm9sOW95bjZiZGNobmMzZXp6bnYzM2wxNDJiOHU0NXo1ZWk0ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jsZMTxV5mBiykc35RR/giphy.gif' }
        },
    ];

    const renderItem = ({ item }) => (
        <View style={styles.slide}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.text}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Carousel
                data={slides}
                renderItem={renderItem}
                sliderWidth={300}
                itemWidth={300}
                layout="default"
            />
            

            <Pressable
              onPress={() => router.replace("/register")}
              style={{
                width: 250,
                backgroundColor: "black",
                padding: 15,
                borderRadius: 25,
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 50,
                marginBottom: 85,
                
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Зарегистрироваться
              </Text>
            </Pressable>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: 400,
    },
    image: {
        padding: 150,
        width: 300,
        height: 400,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center'
    },
    text: {
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center',
    },
    registerButton: {
        marginTop: 100,
        marginBottom: 50,
        padding: 20,
        backgroundColor: 'black',
        borderRadius: 15,
    },
    registerButtonText: {
        fontSize: 15,
        color: 'white',
    },
});

export default Onboarding;
