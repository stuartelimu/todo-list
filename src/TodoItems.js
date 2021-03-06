import React, { Component } from "react";

class TodoItems extends Component {

  constructor(props) {
    super(props);
    this.createTasks = this.createTasks.bind(this);
  }

  createTasks(item) {
    return (
      <li key={item.key} onClick={e => this.props.editItem(e, item.key)}>
        {item.text}
      </li>
    );
  }

  render() {
    const todoEntries = this.props.entries;
    const listItems = todoEntries.map(this.createTasks);

    return <ul className="theList">{listItems}</ul>;
  }
}

export default TodoItems;
