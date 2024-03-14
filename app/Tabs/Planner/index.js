import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import moment from 'moment';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {BottomModal} from 'react-native-modals';
import {SlideAnimation} from 'react-native-modals';
import {ModalContent} from 'react-native-modals';
import { ModalPortal } from 'react-native-modals';


const HomeScreen = () => {
  const currentDate = moment();
  const startOfWeek = currentDate.clone().startOf('week');
  const [date, setDate] = useState('');
  const [nextDate, setNextDate] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const navigation = useNavigation();
  const [menuData, setMenuData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modal, setModal] = useState(false);

  const openModal = date => {
    setDate(date.format('ddd') + ' ' + date.format('DD'));
    const nextDate = moment(date, 'ddd DD').add(1, 'day').format('ddd DD');
    setNextDate(nextDate);
    setModalVisible(!modalVisible);
  };

  // Mock function to fetch menu data
  const fetchAllMenuData = () => {
    // Mock data
    const mockMenuData = [
      { date: 'Mon 14', items: [{ mealType: 'Breakfast', type: 'Type1', name: 'Food1' }, { mealType: 'Lunch', type: 'Type2', name: 'Food2' }, { mealType: 'Dinner', type: 'Type3', name: 'Food3' }] },
      { date: 'Tue 15', items: [] },
      { date: 'Wed 16', items: [{ mealType: 'Breakfast', type: 'Type4', name: 'Food4' }, { mealType: 'Lunch', type: 'Type5', name: 'Food5' }, { mealType: 'Dinner', type: 'Type6', name: 'Food6' }] },
      // Add more mock data as needed
    ];
    setMenuData(mockMenuData);
  };

  const deleteItems = date => {
    setModal(!modal);
    setSelectedDate(date.format('ddd') + ' ' + date.format('DD'));
  };

  useEffect(() => {
    fetchAllMenuData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchAllMenuData();
    }, []),
  );

  console.log('Menu', menuData);

  const renderWeekDates = startOfWeek => {
    let weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = startOfWeek.clone().add(i, 'days');

      const formattedDate = date.format('ddd DD');

      const menuForDate = menuData.find(menu => menu.date == formattedDate);

      const isCurrentDate = date.isSame(currentDate, 'day');

      weekDates.push(
        <View style={{flexDirection: 'row', gap: 12, marginVertical: 10}}>
          <ModalPortal />
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
              isCurrentDate && {backgroundColor: 'black'},
            ]}>
            <Text
              style={{
                fontSize: 11,
                fontWeight: '500',
                color: isCurrentDate ? 'white' : 'black',
              }}>
              {date.format('DD')}
            </Text>
            <Text
              style={{
                fontSize: 11,
                fontWeight: '500',
                color: isCurrentDate ? 'white' : 'black',
              }}>
              {date.format('ddd')}
            </Text>
          </View>
          <Pressable
            onPress={() =>
              navigation.navigate('Menu', {
                date: date.format('ddd') + ' ' + date.format('DD'),
                items: menuForDate?.items,
              })
            }
            style={[
              {
                backgroundColor: 'white',
                borderRadius: 8,
                padding: 10,
                width: '85%',
              },
              menuForDate && {
                height: 'auto',
              },
              !menuForDate && {
                height: 80,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 12,
                fontWeight: '600',
                color: 'gray',
              }}>
              {menuForDate ? 'Meal plan' : 'There is no menu'}
            </Text>
            <Pressable
              onPress={() => openModal(date)}
              style={{position: 'absolute', bottom: 5, right: 30}}>
              <Text style={{fontSize: 10, fontWeight: '500', color: 'gray'}}>
                Copy
              </Text>
            </Pressable>
            <Pressable
              onPress={() => deleteItems(date)}
              style={{position: 'absolute', bottom: 5, right: 10}}>
              <Text style={{fontSize: 10, fontWeight: '500', color: 'gray'}}>
                del
              </Text>
            </Pressable>
          </Pressable>
        </View>,
      );
    }

    return weekDates;
  };

  const renderWeeks = numWeeks => {
    const weeks = [];
    for (let i = 0; i < numWeeks; i++) {
      weeks.push(
        <View key={i}>
          <Text style={{fontSize: 17, fontWeight: 'bold', marginBottom: 10}}>
            {startOfWeek
              .clone()
              .add(i * 7, 'days')
              .format('DD MMM')}
          </Text>
          <View>{renderWeekDates(startOfWeek.clone().add(i * 7, 'days'))}</View>
        </View>,
      );
    }
    return weeks;
  };
  return (
    <>
      <ScrollView style={{marginTop: 10}}>
        <View
          style={{
            flex: 1,
            padding: 12,
          }}>
          {renderWeeks(3)}
        </View>
      </ScrollView>
      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={['up', 'down']}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}>
        <ModalContent>
          <View>
            <Text
              style={{fontSize: 16, fontWeight: '500', textAlign: 'center'}}>
              Copy or move
            </Text>

            <View
              style={{
                backgroundColor: '#fd5c63',
                padding: 10,
                borderRadius: 6,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 12,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                {date} - {nextDate}
              </Text>
            </View>

            <View
              style={{
                marginTop: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Pressable
                onPress={() => alert('Copy operation')}
                style={{
                  backgroundColor: '#DB7093',
                  width: 100,
                  padding: 10,
                  borderRadius: 20,
                  marginVertical: 12,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  Copy
                </Text>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: '#DB7093',
                  width: 100,
                  padding: 10,
                  borderRadius: 20,
                  marginVertical: 12,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  Move
                </Text>
              </Pressable>
            </View>
          </View>
        </ModalContent>
      </BottomModal>

      <BottomModal
        onBackdropPress={() => setModal(!modal)}
        swipeDirection={['up', 'down']}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }
        onHardwareBackPress={() => setModal(!modal)}
        visible={modal}
        onTouchOutside={() => setModal(!modal)}>
        <ModalContent style={{width: '100%', height: 280}}>
          <Text style={{fontSize: 16, fontWeight: '500', textAlign: 'center'}}>
            Delete Menu
          </Text>

          <View>
            <Pressable
              onPress={() => alert('Delete operation')}
              style={{
                backgroundColor: '#DB7093',
                width: 140,
                padding: 10,
                borderRadius: 20,
                marginVertical: 12,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                Delete Menu
              </Text>
            </Pressable>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
