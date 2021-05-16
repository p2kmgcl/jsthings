import {Riact, useState} from './riact.js';

function App() {
  const [todoItems, setTodoItems] = useState([]);
  const inputRef = { current: null };

  const onClick = () => {
    if (inputRef.current?.value) {
      const nextTodoItems = [...todoItems, inputRef.current.value];

      setTodoItems(nextTodoItems);
    }
  };

  return [
    {
      tagName: "ul",
      children: todoItems.map((item) => ({
        tagName: "li",
        children: item,
        props: {},
      })),
      props: {},
    },
    {
      tagName: "input",
      ref: inputRef,
      props: {
        type: "text",
      },
    },
    {
      tagName: "button",
      children: "Add",
      props: {
        type: "button",
        click: onClick,
      },
    },
  ];
}

Riact(App, document.getElementById("app"));

