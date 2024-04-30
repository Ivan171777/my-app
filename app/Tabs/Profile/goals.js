import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native';

const db = SQLite.openDatabase('my-app.db');

const GoalsScreen = () => {
  const [categories, setCategories] = useState([]);
  const [userInputs, setUserInputs] = useState({});
  const [averagePercentage, setAveragePercentage] = useState(0);
  const [chartData, setChartData] = useState({ dates: [], percentages: [] });
  const [summaryData, setSummaryData] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS userinputs (id INTEGER PRIMARY KEY AUTOINCREMENT, category TEXT, value INTEGER, date DATE)',
        [],
        () => {
          console.log('Table userinputs created successfully.');
        },
        (_, error) => {
          console.error('Error creating userinputs table:', error);
        }
      );

      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS inputsummary (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, averagePercentage REAL)',
        [],
        () => {
          console.log('Table inputsummary created successfully.');
        },
        (_, error) => {
          console.error('Error creating inputsummary table:', error);
        }
      );
    });

    fetchCategories();
    loadUserInputs();
    loadSummaryData();

    return () => {};
  }, []);
  
  const fetchCategories = () => {
    const lastWeekDate = new Date();
    lastWeekDate.setDate(lastWeekDate.getDate() - 7);
    const formattedDate = lastWeekDate.toISOString().slice(0, 10);
  
    db.transaction(tx => {
      tx.executeSql(
        'SELECT category, COUNT(*) as count FROM tasktodos WHERE status = ? AND date >= ? GROUP BY category',
        ['completed', formattedDate],
        (_, { rows: { _array } }) => {
          setCategories(_array);
        }
      );
    });
  };
  

  const loadUserInputs = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT category, value FROM userinputs',
        [],
        (_, { rows: { _array } }) => {
          const inputs = {};
          _array.forEach(item => {
            inputs[item.category] = item.value;
          });
          setUserInputs(inputs);
        }
      );
    });
  };

  const handleInput = (category, value) => {
    setUserInputs(prevState => ({
      ...prevState,
      [category]: parseInt(value) || 0
    }));
  };

  const calculatePercentage = (a, b) => {
    if (b === 0) return 0;
    return ((a / b) * 100).toFixed(2);
  };

  const handleSubmit = () => {
    const currentDate = new Date().toISOString().slice(0, 10);

    Object.entries(userInputs).forEach(([category, value]) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO userinputs (category, value, date) VALUES (?, ?, ?)',
          [category, value, currentDate],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              console.log(`Inserted ${rowsAffected} row into userinputs table.`);
            } else {
              console.log('Failed to insert row into userinputs table.');
            }
          },
          (_, error) => {
            console.error('Error inserting row into userinputs table:', error);
          }
        );
      });
    });

    calculateAveragePercentage();

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO inputsummary (date, averagePercentage) VALUES (?, ?)',
        [currentDate, averagePercentage],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            console.log(`Inserted ${rowsAffected} row into inputsummary table.`);
          } else {
            console.log('Failed to insert row into inputsummary table.');
          }
        },
        (_, error) => {
          console.error('Error inserting row into inputsummary table:', error);
        }
      );
    });
  };

  useEffect(() => {
    calculateAveragePercentage();
    loadSummaryData();
  }, [userInputs]);

  const calculateAveragePercentage = () => {
    let totalPercentage = 0;

    categories.forEach(({ category, count }) => {
      totalPercentage += parseFloat(calculatePercentage(count, userInputs[category]));
    });

    const average = categories.length === 0 ? 0 : (totalPercentage / categories.length).toFixed(2);
    setAveragePercentage(average);

    const dates = [];
    const percentages = [];

    db.transaction(tx => {
      tx.executeSql(
        'SELECT date, averagePercentage FROM inputsummary',
        [],
        (_, { rows: { _array } }) => {
          // Отбираем только последние 7 записей
          const lastSevenEntries = _array.slice(-7);
          
          lastSevenEntries.forEach(({ date, averagePercentage }) => {
            dates.push(date);
            percentages.push(averagePercentage);
          });

          setChartData({ dates, percentages });
        },
        (_, error) => {
          console.error('Error selecting from inputsummary table:', error);
        }
      );
    });
  };

  const loadSummaryData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM inputsummary',
        [],
        (_, { rows: { _array } }) => {
          setSummaryData(_array);
        },
        (_, error) => {
          console.error('Error selecting from inputsummary table:', error);
        }
      );
    });
  };

  return (

    <><View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        width: "100%",
        height: "7%",
      }}
    >
      <Text style={{ marginTop: 5, marginHorizontal: 15, color: "black", fontWeight: "bold", fontSize: 26 }}>
        Характеристика целей
      </Text>
    </View>
    <ScrollView style={{ backgroundColor: "white"}}>
    <View style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white"}}>
          <Text style={{ marginTop: 5, marginHorizontal: 15, color: "black", fontWeight: "bold", fontSize: 16 }}>
        Категории
      </Text>

      <View style={{ marginTop: 5, padding: 2}}>
        <View style={{padding: 10}}>
        {categories.map(({ category, count }) => (
          <View key={category} style={{ marginBottom: 5 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
              <Text style={{  }}>{category}</Text>
              <TextInput
                style={{ marginBottom: -25, color: "white", padding: 15, borderRadius: 25, backgroundColor: "black" }}
                onChangeText={value => handleInput(category, value)}
                keyboardType="numeric"
                value={userInputs[category] ? userInputs[category].toString() : ''} />
            </View>
            <View style={styles.progressBarWrapper}>
              {/* Шкала заполнения */}
              <View style={[styles.progressBar, { width: `${calculatePercentage(count, userInputs[category])}%` }]} />
              {/* Текст с процентом */}
              <Text style={styles.progressBarText}>
                {calculatePercentage(count, userInputs[category])}%
              </Text>
            </View>
          </View>
        ))}
      </View>
      </View>

      <Text style={{ marginLeft: 15, padding: 1, fontSize: 12, color: "grey"}}>
        Напротив каждой категории введите сколько бы вы хотели выполнять задач по этой категории в неделю
      </Text>


      <View style={{marginTop: 15,marginBottom: 10, marginHorizontal: 10, alignItems: "center", width: "95%", backgroundColor: "black", borderRadius: 250, padding: 5}}>
          <Text style={{ padding: 15, marginHorizontal: 10, fontWeight: 600, fontSize: 14, color: "white"}}>
            <Text> Средний процент совершенствования: {averagePercentage}%</Text>
          </Text>
        </View>

      <Button title="Обновить данные" onPress={handleSubmit} color="black"/>

        {/* Заменяем SummaryTable на компонент LineChart */}

        <View style={{padding: 20}}>
        <LineChart
  data={{
    labels: chartData.dates.map(date => {
      // Преобразование даты в нужный формат (дд:мм)
      const formattedDate = new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit'
      });
      return formattedDate;
    }),
    datasets: [
      {
        data: chartData.percentages.map(percent => Math.round(percent)), // Округление до целого
      },
    ],
  }}
  width={Dimensions.get("window").width - 40} // Ширина графика равна ширине экрана
  height={220}
  yAxisLabel="%"
  chartConfig={{
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0, // Устанавливаем 0 для округления до целого
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "4", // Размер точек на графике
      strokeWidth: "2", // Толщина обводки точек
      stroke: "white" // Цвет обводки точек
    }
  }}
  fromZero={true} // Начать отсчет по оси x с нуля
  bezier
  style={{
    marginVertical: 8,
    borderRadius: 16,
  }}
/>

          </View>
          
          </View>
          </ScrollView>
      </>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    padding: 15,
    marginRight: 100,
  },
  progressBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginRight: 120
  },
  progressBar: {
    height: 20,
    backgroundColor: 'black',
    borderRadius: 10,
    
  },
  progressBarText: {
    marginLeft: 10,
  },
});


export default GoalsScreen;


