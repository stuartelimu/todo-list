import React, { Component } from "react";
import TodoItems from "./TodoItems";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItem: { text: "", key: "" }
    };

    this.addItem = this.addItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidUpdate() {
    this._inputElement.focus();
  }

  addItem(e) {
    e.preventDefault();
    const newItem = this.state.currentItem;
    if (newItem.text !== "") {
      console.log(newItem);
      const items = [...this.state.items, newItem];
      this.setState({
        items: items,
        currentItem: {text: "", key: ""}
      })
    }
  }

  handleInput(e) {
    const itemText = e.target.value;
    const currentItem = {text: itemText, key: Date.now()}
    this.setState({
      currentItem,
    });
  }

  deleteItem(key) {
    const filteredItems = this.state.items.filter(item => {
      return item.key !== key
    })

    this.setState({items: filteredItems});
  }

  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <form onSubmit={this.addItem}>
            <input
              placeholder="Task"
              ref={a => (this._inputElement = a)}
              onChange={this.handleInput}
              value={this.state.currentItem.text}
            />
            <button type="submit">Add</button>
          </form>
        </div>
        <TodoItems entries={this.state.items} deleteItem={this.deleteItem} />
      </div>
    );
  }
}

export default TodoList;
