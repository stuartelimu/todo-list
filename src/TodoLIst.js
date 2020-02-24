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
    this.editItem = this.editItem.bind(this);
  }

  componentDidUpdate() {
    this._inputElement.focus();
  }

  addItem(e) {
    e.preventDefault();
    const newItem = this.state.currentItem;
    if (newItem.text !== "") {
      const items = [...this.state.items, newItem];
      const updatedItems = this.state.items.map(item => {
        if (item.key === newItem.key) {
          item = { ...newItem };
        }
        return item;
      });
      this.state.isEditing
        ? this.setState({
            items: updatedItems,
            currentItem: { text: "", key: "" },
            isEditing: false
          })
        : this.setState({
            items: items,
            currentItem: { text: "", key: "" }
          });
    }
  }

  handleInput(e) {
    const itemText = e.target.value;
    const itemKey = this.state.currentItem.key;
    const updatedItem = { text: itemText, key: itemKey };
    const currentItem = { text: itemText, key: Date.now() };
    this.state.isEditing
      ? this.setState({
          currentItem: updatedItem
        })
      : this.setState({ currentItem });
  }

  deleteItem(key) {
    const filteredItems = this.state.items.filter(item => {
      return item.key !== key;
    });

    this.setState({ items: filteredItems });
  }

  editItem(e, key) {
    if (e.shiftKey) {
      let selectedItem = {};

      this.setState({
        items: this.state.items.map(item => {
          if (item.key === key) {
            selectedItem = { ...item };

            return selectedItem;
          }

          return item;
        })
      });

      this.setState({
        currentItem: selectedItem,
        isEditing: true
      });
    } else {
      this.deleteItem(key);
    }
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
            <button type="submit">
              {this.state.isEditing ? "Save" : "Add"}
            </button>
          </form>
        </div>
        <TodoItems entries={this.state.items} editItem={this.editItem} />
      </div>
    );
  }
}

export default TodoList;
