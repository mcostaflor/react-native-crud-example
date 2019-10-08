import React from 'react';
import { StyleSheet, View, Text, Alert, FlatList, ActivityIndicator, Animated, TextInput, Easing } from 'react-native';
import Axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class App extends React.Component {

  state = {
    dados: [],
    fetchingDados: false,
  }

  componentDidMount() {
    this.fetchDados();
  }

  fetchDados = () => {
    this.setState({ fetchingDados: true });
    Axios.get('http://192.168.100.33/dado/')
      .then(res => {
        this.setState({ dados: res.data });
      })
      .catch(error => {
        Alert.alert('alert', 'alert');
      })
      .finally(() => {
        this.setState({ fetchingDados: false })
      })
  }

  handleDelete = (_id) => {
    Axios.delete('http://192.168.100.33/dado/' + _id)
      .then(res => {
        // alert(res.data.length);
      })
      .then(error => {
        // alert(error);
      })
      .finally(() => {
        this.fetchDados();
      })
  }

  handleAdd = () => {
    Axios.post('http://192.168.100.33/dado/', { newText: '' }, { headers: { 'content-type': 'application/json' } })
      .then(res => {
        // alert(res.data.length);
      })
      .catch(error => {
        alert(error);
      })
      .finally(() => {
        this.fetchDados();
      })
  }

  slideX = new Animated.Value(1000);

  openAdd = () => {
    // this.slideX.setValue(0);
    Animated.timing(
      this.slideX,
      {
        toValue: 0,
        duration: 500,
        easing: Easing.linear
      }
    ).start()
  };

  closeAdd = () => {
    // this.slideX.setValue(0);
    Animated.timing(
      this.slideX,
      {
        toValue: 1000,
        duration: 500,
        easing: Easing.linear
      }
    ).start()
  };


  render() {
    const x = this.slideX.interpolate({
      inputRange: [0, 1],
      outputRange: ['0', '56']
    })
    return (
      <View style={styles.page}>
        <Animated.View style={styles.title}>
          <View style={styles.titleLeft}>
            {/* <ActivityIndicator hidesWhenStopped animating={this.state.fetchingDados} size={28} /> */}
            <TouchableOpacity onPress={this.closeAdd}>
              <Icon name="plus" size={32} color="#000" />
            </TouchableOpacity>
          </View>
          <Text style={styles.titleText}>Dados</Text>
          <Animated.View style={{ position: 'absolute', left: 0, top: 0, bottom: 0, right: 56, justifyContent: 'center', transform: [{ translateX: this.slideX }] }}>
            <TextInput style={{ backgroundColor: '#DDD', padding: 4, fontSize: 18, borderRadius: 4 }} />
          </Animated.View>
          <View style={styles.titleRight}>
            <TouchableOpacity onPress={this.openAdd}>
              <Icon name="plus" size={32} color="#000" />
            </TouchableOpacity>
          </View>
        </Animated.View>
        <View style={styles.content}>
          <FlatList
            data={this.state.dados}
            renderItem={({ item }) => (
              <View style={styles.dadoContainer}>
                <Text style={styles.dadoTexto}>
                  {item.texto}
                </Text>
                <View style={styles.dadoActions}>
                  <TouchableOpacity onPress={() => this.handleDelete(item._id)}>
                    <View style={styles.removeButton}>
                      <Icon name="delete" size={18} color="#FFF" />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>)}
            keyExtractor={item => item.texto}
            ListEmptyComponent={() => <View style={{ alignItems: 'center' }}><Text style={{ fontSize: 18, color: '#333' }}>x</Text></View>}
          />
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#CCC',
  },
  title: {
    height: 56,
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 8,
  },
  dadoContainer: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  dadoTexto: {
    flex: 1,
    fontSize: 18
  },
  dadoActions: {
    // backgroundColor: 'red',
  },
  removeButton: {
    backgroundColor: '#cc0000',
    width: 32,
    height: 32,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,

    width: 56,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,

    width: 56,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default App;
