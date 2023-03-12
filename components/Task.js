import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Task = (props) => {

    const [currTask, setCurrTask] = useState(props.text);

    return(
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <TouchableOpacity onPress={() => props.completeTask(props.index)}>
                    <View style={currTask.isCompleted ? [styles.square, {backgroundColor:'#55BCF6'}] : styles.square}>
                        <Text style={styles.checkIcon}>✓</Text>
                    </View>
                </TouchableOpacity>
                <TextInput 
                    style={currTask.isCompleted ? [styles.itemText, styles.strikeThroughText] : styles.itemText} 
                    placeholder="Write a task" 
                    value={currTask.task}
                    onChangeText={text => setCurrTask({...currTask,task: text})}
                    onBlur={() => {
                        props.updateTask(props.index,currTask);
                    }}
                />
            </View>
            <TouchableOpacity onPress={() => props.removeTask(props.index)}>
                <View style={styles.circular}>
                    <Text style={styles.crossIcon}>X</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
      backgroundColor: '#FFF',
      padding: 15,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20
    },
    itemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    square: {
      width: 28,
      height: 28,
      borderColor: '#55BCF6',
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0.5,
      borderRadius: 5,
      marginRight: 15
    },
    itemText: {
        maxHeight: '80%'
    },
    strikeThroughText: {
        textDecorationLine: 'line-through'
    },
    circular: {
        height: 24,
        width: 24,
        borderColor: '#55BCF6',
        borderWidth: 2,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.6,
    },
    checkIcon: {
        color: '#FFF',
        fontSize: 18
    },
    crossIcon: {
        color: '#55BCF6',
        fontWeight: 'bold'
    }
  });

export default Task;