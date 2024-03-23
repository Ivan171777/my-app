import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { View, Text, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Entypo, FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";

const db = SQLite.openDatabase('my-app.db');

const HomeScreen = () => {
  const currentDate = moment();
  const startOfWeek = currentDate.clone().startOf('week');
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM tasktodos',
        [],
        (_, { rows: { _array } }) => {
          console.log("Menu Data:", _array); // Отладочный вывод
          setMenuData(_array);
        },
        (_, error) => console.log(error)
      );
    });
  };

  const renderWeekDates = startOfWeek => {
    let weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = startOfWeek.clone().add(i, 'days');
      const formattedDate = date.format('D MMMM');
      const tasksForDate = menuData.filter(menu => moment(menu.createdAt).format('D MMMM') === formattedDate); // Фильтруем задачи для текущей даты
      console.log("Formatted Date:", formattedDate, "Tasks For Date:", tasksForDate);
      const isCurrentDate = date.isSame(currentDate, 'day');
  
      weekDates.push(
        <View key={formattedDate}>
          <View
            style={[
              {
                height: 40,
                width: 40,
                borderRadius: 20,
                backgroundColor: 'white',
                marginVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
              },
              isCurrentDate && { backgroundColor: 'black' },
            ]}
          >
            <Text
              style={{
                fontSize: 11,
                fontWeight: '500',
                color: isCurrentDate ? 'white' : 'black',
              }}
            >
              {date.format('DD')}
            </Text>
            <Text
              style={{
                fontSize: 11,
                fontWeight: '500',
                color: isCurrentDate ? 'white' : 'black',
              }}
            >
              {date.format('ddd')}
            </Text>
          </View>
          
          <View
            style={[
              {backgroundColor: 'white',
                borderRadius: 8,
                padding: 10,
                width: '85%',
                height: "auto",
                marginTop: -50,
                marginLeft: 55
              },
            ]}
          >
            <View style ={{marginLeft: 310}}>
            <Ionicons name="checkmark-done" size={10} color="black"/>
          </View >
            {tasksForDate.length > 0 ? (
              tasksForDate.map((task, index) => (
                <Text
                  key={index}
                  style={{
                    textAlign: "left",
                    marginTop: 2,
                    marginBottom: 2,
                    marginLeft: 10,
                    fontSize: 12,
                    fontWeight: '600',
                    textDecorationLine: task.status === 'completed' ? 'line-through' : '',
                    
                  }}
                >
                  <View>
                    <FontAwesome style={{marginRight: 5}} name="circle" size={10} color="gray" />
                  </View>
                  
                    {task.title}
                </Text>
              ))
            ) : (
              <Text
                style={{
                  textAlign: "left",
                  marginTop: 0,
                  marginLeft: 10,
                  fontSize: 12,
                  fontWeight: '600',
                  color: 'gray',
                }}
              >
                No Tasks
              </Text>
            )}
          </View>
        </View>
      );
    }
    return weekDates;
  };
  

  const renderWeeks = numWeeks => {
    const weeks = [];
    for (let i = 0; i < numWeeks; i++) {
      weeks.push(
        <View key={i}>
          <Text style={{ fontSize: 17, fontWeight: 'bold', marginBottom: 10 }}>
            {startOfWeek.clone().add(i * 7, 'days').format('DD MMM')}
          </Text>
          <View>{renderWeekDates(startOfWeek.clone().add(i * 7, 'days'))}</View>
        </View>
      );
    }
    return weeks;
  };

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          width: '100%',
          height: '7%',
        }}
      >
        <Text
          style={{
            marginTop: 5,
            marginHorizontal: 15,
            color: 'black',
            fontWeight: 'bold',
            fontSize: 26,
          }}
        >
          Planner
        </Text>
      </View>
      <ScrollView style={{ marginTop: 0 }}>
        <View style={{ flex: 1, padding: 12 }}>
          {renderWeeks(3)}
        </View>
      </ScrollView>
    </>
  );
};

export default HomeScreen;
