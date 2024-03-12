import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert
} from "react-native";
import React, { useState } from "react";
import { IconButton } from "react-native-paper";
import Fallback from "../component/Fallback";

const TodoScreen = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editTodo, setEditTodo] = useState(null);

  /// handle add new todo
  const handleAddTodoList = () => {
    if (todo) {
      setTodoList([...todoList, { id: Date.now().toString(), title: todo }]);
      setTodo("");
    } else {
      alert("Please fill input.");
    }
  };

  /// handle delete todo
  const handleDeleteToDo = (id) => {
    const updatedTodoList = todoList.filter((x) => x.id !== id);
    setTodoList(updatedTodoList);
    setTodo("");
  };

  const handleDeleteAlert = (item) => {
    Alert.alert(
      "Delete Todo",
      `Are you sure you want to delete ${item.title}`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => handleDeleteToDo(item.id) }
      ]
    );
  };
  /// fect data for Edit todo list
  const handleEditTodo = (todo) => {
    setEditTodo(todo);
    setTodo(todo.title);
  };

  ///update todo list
  const handleUpdateTodo = () => {
    if (todo) {
      const updatetodo = todoList.map((item) => {
        if (item.id === editTodo.id) {
          return { ...item, title: todo };
        }

        return item;
      });
      setTodoList(updatetodo);
      setEditTodo(null);
      setTodo("");
    } else {
      alert("Please fill input.");
    }
  };
  const renderToDoList = ({ item, index }) => {
    return (
      <View
        style={{
          backgroundColor: "#1e90ff",
          borderRadius: 6,
          paddingHorizontal: 6,
          paddingVertical: 8,
          marginVertical: 12,
          flexDirection: "row",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 3
        }}
      >
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: 800, flex: 1 }}>
          {item.title}
        </Text>
        <IconButton
          icon="pencil"
          iconColor="#fff"
          onPress={() => handleEditTodo(item)}
        />
        <IconButton
          icon="trash-can"
          iconColor="#fff"
          onPress={() => handleDeleteAlert(item)}
        />
      </View>
    );
  };
  return (
    <View style={{ marginHorizontal: 16, marginTop: 50 }}>
      <TextInput
        style={{
          borderWidth: 2,
          borderColor: "#1e90ff",
          borderRadius: 6,
          paddingVertical: 12,
          paddingHorizontal: 16
        }}
        placeholder="Add new task"
        value={todo}
        onChangeText={(text) => setTodo(text)}
      />

      {editTodo ? (
        <TouchableOpacity
          style={{
            backgroundColor: "#000",
            borderRadius: 6,
            paddingVertical: 8,
            marginTop: 25,
            alignItems: "center"
          }}
          onPress={() => handleUpdateTodo()}
        >
          <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 22 }}>
            Save
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            backgroundColor: "#000",
            borderRadius: 6,
            paddingVertical: 8,
            marginTop: 25,
            alignItems: "center"
          }}
          onPress={() => handleAddTodoList()}
        >
          <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 22 }}>
            Add
          </Text>
        </TouchableOpacity>
      )}

      {/* render todo list */}
      <FlatList data={todoList} renderItem={renderToDoList} />

      {todoList.length <= 0 && <Fallback />}
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({});
