import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Container from './Container/Container';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    // return this.state.contacts;

    const newUserData = {
      id: nanoid(10),
      name,
      number,
    };

    const checkedName = this.state.contacts.find(
      ({ name }) => name === newUserData.name
    );
    if (checkedName) {
      alert(`${name} is already in list. Please enter other name.`);
      return;
    }
    this.setState(prevState => ({
      contacts: [newUserData, ...prevState.contacts],
    }));
  };
  //   addContact = data => {
  //   console.log(data); // {name: 'knhih', number: '34-34-34'} введені дані
  //   //з затримкою в асинхронному коді теж працює:
  //   // setTimeout(() => {
  //   //   console.log(data);
  //   // }, 1000);
  // };

  hendleChangeFilter = event => {
    event.preventDefault(event);
    // додаються дані в стейт при вводі (див.фільтр)
    this.setState({ filter: event.currentTarget.value });
  };

  deleteContact = userId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(({ id }) => userId !== id),
    }));
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    // console.log(normalizedFilter); // дані з фільтру

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  componentDidMount() {
    //визивається один раз при маунті компоненту, щоб взяти дані
    // console.log('app component didmount');

    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
    // console.log(parsedContacts);
  }
  componentDidUpdate(prevProps, prevState) {
    //визивається після кожного оновлення
    // console.log('did update componentDidUpdate');

    if (this.state.contacts !== prevState.contacts) {
      // console.log('updates contacts');
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
    // console.log(prevState); //попередній
    // console.log(this.state); //фактичний, оновлений
    // this.setState() не варто визивати, зациклить рендер, сетстейт, дідапдейт
  }
  render() {
    const filteredContacts = this.getVisibleContacts();

    return (
      <div>
        <Container title={'Phonebook'}>
          <ContactForm onSubmit={this.addContact} />
        </Container>

        <Container title={'Contacts'}>
          <Filter
            value={this.state.filter}
            onChange={this.hendleChangeFilter}
          />
          <ContactList
            contacts={filteredContacts}
            deleteContact={this.deleteContact}
          />
        </Container>
      </div>
    );
  }
}

export default App;
