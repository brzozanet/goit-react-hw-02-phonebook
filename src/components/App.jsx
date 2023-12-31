import { Component } from "react";
import { nanoid } from "nanoid";
import { ContactForm } from "./ContactForm";
import { Filter } from "./Filter";
import { ContactList } from "./ContactList";

export class App extends Component {
  state = {
    contacts: [],
    filter: "",
    name: "",
    number: "",
  };

  addContact = event => {
    event.preventDefault();
    const contact = {
      id: nanoid(),
      name: event.target.elements.name.value,
      number: event.target.elements.number.value,
    };

    if (
      this.state.contacts.find(
        contact =>
          contact.name.toLowerCase() ===
          event.target.elements.name.value.toLowerCase()
      )
    ) {
      alert(`${event.target.elements.name.value} is already in contacts.`);
      event.target.reset();
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));

    event.target.reset();
  };

  handleFilterChange = event => {
    this.setState({ filter: event.target.value });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />

        <h2>Contacts</h2>
        <Filter handleFilterChange={this.handleFilterChange} />
        <ContactList
          filteredContacts={filteredContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
