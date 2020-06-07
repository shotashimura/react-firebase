// ItemList.jsx
import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import InputForm from "./InputForm";
import Item from "./Item";

const ItemList = (props) => {
  const [todoList, setTodoList] = useState(null);
  const [doneList, setDoneList] = useState(null);
  const doneFlag = props.toDoStatus;

  // firestoreから全データを取得してstateに格納する関数
  const getTodosFromFirestore = async () => {
    const itemListArray = await firebase
      .firestore()
      .collection("todos")
      //orderByは二回できる
      //firebase index https://firebase.google.com/docs/firestore/query-data/indexing?hl=ja
      .orderBy("isDone")
      .orderBy("limit")
      .get();
    const todoArray = itemListArray.docs.map((x) => {
      return {
        id: x.id,
        data: x.data(),
      };
    });
    setTodoList(todoArray);
    //実行済タスクのstateの作成
    const doneArray = todoArray.filter((task) => {
      // console.log(task);
      return task.data.isDone == true;
    });
    // console.log(todoArray);
    setDoneList(doneArray);
    return todoArray;
  };

  // useEffectを利用してFirestoreからデータの一覧を取得．
  useEffect(() => {
    const result = getTodosFromFirestore();
  }, [props]);

  return (
    <div>
      {doneFlag == "none" ? (
        <InputForm getTodosFromFirestore={getTodosFromFirestore} />
      ) : (
        <div>
          <p>完了済みのタスク一覧</p>
        </div>
      )}
      {doneFlag == "none" ? (
        <ul>
          {todoList?.map((x, index) => (
            <Item
              key={index}
              todo={x}
              index={index}
              getTodosFromFirestore={getTodosFromFirestore}
              doneFlag={doneFlag}
            />
          ))}
        </ul>
      ) : (
        <ul>
          {doneList?.map((x, index) => (
            <Item
              key={index}
              todo={x}
              index={index}
              getTodosFromFirestore={getTodosFromFirestore}
              doneFlag={doneFlag}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
export default ItemList;
