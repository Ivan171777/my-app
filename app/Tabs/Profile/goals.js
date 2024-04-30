import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

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
    <View>
      {categories.map(({ category, count }) => (
        <View key={category} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Text>{calculatePercentage(count, userInputs[category])}%</Text>
          <Text style={{ marginLeft: 10 }}>{category} ({count} задач)</Text>
          <TextInput
            style={{ marginLeft: 10, width: 50, borderWidth: 1, padding: 5 }}
            onChangeText={value => handleInput(category, value)}
            keyboardType="numeric"
            value={userInputs[category] ? userInputs[category].toString() : ''}
          />
        </View>
      ))}
      <Button title="Submit" onPress={handleSubmit} />

      <View style={{ marginTop: 20 }}>
        <Text>Дата: {new Date().toISOString().slice(0, 10)}</Text>
        <Text>Средний процент из всех категорий: {averagePercentage}%</Text>
      </View>

      {/* Заменяем SummaryTable на компонент LineChart */}
      
      <LineChart
        data={{
          labels: chartData.dates,
          datasets: [
            {
              data: chartData.percentages,
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
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default GoalsScreen;
