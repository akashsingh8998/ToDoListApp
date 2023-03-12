import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './components/Task'

export default function App() {

  const [task,setTask] = useState();
  const [taskList, setTaskList] = useState([]);

  // "hi","hello","there","bro","wassup","hi","hellheloo","there","bro","wassup"

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskList([...taskList, {task, isCompleted: false}]);
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskList];
    // itemsCopy.splice(index,1);
    itemsCopy[index].isCompleted = !itemsCopy[index].isCompleted;
    setTaskList(itemsCopy);
  } 

  const removeTask = (index) => {
    let itemsCopy = [...taskList];
    itemsCopy.splice(index,1);
    setTaskList(itemsCopy);
  } 

  const updateTask = (index,text) => {
    let itemsCopy = [...taskList]; 
    itemsCopy[index] = text;
    setTaskList(itemsCopy);
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView style={{maxHeight: '90%'}}>
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Today's tasks!</Text>
          <View style={styles.items}>
            {taskList.map((item,index) => 
              !item.isCompleted ? (<Task 
                key={index} 
                text={item} 
                index={index} 
                completeTask={completeTask}
                removeTask={removeTask}
                setTask={setTask}
                updateTask={updateTask}
              />) : null
            )}
            
          </View>
          {/* <Text style={styles.sectionTitle}>Completed tasks!</Text> */}
          <View >
            {taskList.map((item,index) => 
              item.isCompleted ? (<Task 
                key={index} 
                text={item} 
                index={index} 
                completeTask={completeTask}
                removeTask={removeTask}
                setTask={setTask}
                updateTask={updateTask}
              />) : null
            )}
            
          </View>
        </View>
      </ScrollView>
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder="Write a task" value={task} onChangeText={text => setTask(text)}/>
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1
  },
  addText: {
    color: '#C0C0C0',
    fontSize: 28
  }
});
