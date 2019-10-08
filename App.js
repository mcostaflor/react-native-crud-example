import React from 'react';
import { StyleSheet, View, Text, Alert, FlatList, ActivityIndicator, Animated, TextInput, Easing } from 'react-native';
import Axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Item from './Item';

class App extends React.Component {

  state = {
    dados: [],
    fetchingDados: false,
    addInput: ''
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


  handleAdd = () => {
    Axios.post('http://192.168.100.33/dado/', { newTexto: this.state.addInput }, { headers: { 'content-type': 'application/json' } })
      .then(res => {
        // alert(res.data.length);
        this.setState({ addInput: '' }),
          this.closeAdd()
      })
      .catch(error => {
        alert(error);
      })
      .finally(() => {
        this.fetchDados();
      })
  }

  handleEdit = (_id, newTexto) => {
    Axios.put('http://192.168.100.33/dado/' + _id, { newTexto }, { headers: { 'content-type': 'application/json' } })
      .then(res => {

      })
      .catch(error => {

      })
      .finally(() => {
        this.fetchDados();
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

  slideX = new Animated.Value(1000);

  openAdd = () => {
    // this.slideX.setValue(0);
    this.setState({ addInput: '' })
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
    return (
      <View style={styles.page}>
        <Animated.View style={styles.title}>
          <View style={styles.titleRight}>
            <TouchableOpacity onPress={this.openAdd}>
              <Icon name="pencil" size={32} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={styles.titleLeft}>
          </View>
          <Text style={styles.titleText}>Dados</Text>

          <Animated.View style={{ backgroundColor: '#DDD', position: 'absolute', left: 0, top: 0, bottom: 0, right: 0, flexDirection: 'row', alignItems: 'center', left: this.slideX/* transform: [{ translateX: this.slideX }] */ }}>
            <View style={{ width: 56, alignItems: 'center', justifyContent: 'center' }}><TouchableOpacity onPress={this.closeAdd}><Icon name={'close'} color="#193" size={32} /></TouchableOpacity></View>
            <TextInput style={{ flex: 1, backgroundColor: '#EEE', padding: 4, fontSize: 18, borderRadius: 4 }} onChangeText={(text) => this.setState({ addInput: text })} value={this.state.addInput} />
            <View style={{ width: 56, alignItems: 'center', justifyContent: 'center' }}><TouchableOpacity onPress={this.handleAdd}><Icon name={'send'} color="#193" size={32} /></TouchableOpacity></View>
          </Animated.View>

        </Animated.View>
        <View style={styles.content}>
          <FlatList
            data={this.state.dados}
            renderItem={({ item }) => <Item handleDelete={this.handleDelete} handleEdit={this.handleEdit} _id={item._id} item={item} />}
            keyExtractor={item => item.texto}
            ListEmptyComponent={() => <View style={{ alignItems: 'center' }}><Text style={{ fontSize: 18, color: '#333' }}>.</Text></View>}
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
    backgroundColor: '#FFF',
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 4,
    marginBottom: 8
  },
  dadoTexto: {
    flex: 1,
    fontSize: 18
  },
  dadoActions: {
    // backgroundColor: 'red',
  },
  removeButton: {
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
