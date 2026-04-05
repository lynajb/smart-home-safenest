import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

const MenuButton = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const menuOptions = [
    { screen: 'Home', icon: 'home' },
    { screen: 'Login', icon: 'sign-in' },
    { screen: 'Register', icon: 'user-plus' },
    { screen: 'Hello', icon: 'envelope' },
    { screen: 'Led', icon: 'plus' }
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.menuButton}>
        <Text style={styles.menuButtonText}>Menu</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            {menuOptions.map(({ screen, icon }) => (
              <TouchableOpacity
                key={screen}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate(screen);
                }}
                style={styles.menuOption}
              >
                <Icon name={icon} size={20} color="#6A1B9A" style={styles.menuIcon} />
                <Text style={styles.menuOptionText}>{screen}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

MenuButton.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 20,
  },
  menuButtonText: {
    color: '#6A1B9A',
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: '#6A1B9A',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginVertical: 8,
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  menuOptionText: {
    fontSize: 18,
    color: '#6A1B9A',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  menuIcon: {
    marginRight: 10,
  },
});

export default MenuButton;
