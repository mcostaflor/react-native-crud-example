import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Easing, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
    dadoContainer: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 4,
        borderRadius: 4,
        marginBottom: 8,
    },
    dadoTexto: {
        flex: 1,
        fontSize: 18,
    },
    dadoActions: {
        // backgroundColor: 'red',
        flexDirection: 'row'
    },
    removeButton: {
        width: 32,
        height: 32,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

class Item extends Component {

    state = {
        editInput: this.props.item.texto
    };
    editCoverLeft = new Animated.Value(1000)


    openEdit = () => {
        Animated.timing(
            this.editCoverLeft,
            {
                toValue: 0,
                duration: 500,
                easing: Easing.linear
            }
        ).start()
    }

    closeEdit = () => {
        Animated.timing(
            this.editCoverLeft,
            {
                toValue: 1000,
                duration: 500,
                easing: Easing.linear
            }
        ).start()
    }

    render() {
        return (
            <View style={styles.dadoContainer}>
                <Text style={styles.dadoTexto}>{this.props.item.texto}</Text>
                <View style={styles.dadoActions}>
                    <TouchableOpacity onPress={this.openEdit}>
                        <View style={styles.removeButton}>
                            <Icon name="pen" size={24} color="yellow" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.handleDelete(this.props._id)}>
                        <View style={styles.removeButton}>
                            <Icon name="delete" size={24} color="#cc0000" />
                        </View>
                    </TouchableOpacity>
                </View>
                <Animated.View style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, left: this.editCoverLeft, backgroundColor: 'yellow', flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ width: 40, height: '100%', alignItems: 'center', justifyContent: 'center' }} onPress={this.closeEdit}>
                        <Icon name="close" color="#000" size={24} />
                    </TouchableOpacity>
                    <TextInput style={{ flex: 1, fontSize: 18, padding: 0 }} value={this.state.editInput} onChangeText={(text) => this.setState({ editInput: text })} />
                    <TouchableOpacity style={{ width: 40, height: '100%', alignItems: 'center', justifyContent: 'center' }} onPress={() => this.props.handleEdit(this.props._id, this.state.editInput)}>
                        <Icon name="check" color="#000" size={24} />
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    }
}

export default Item;
