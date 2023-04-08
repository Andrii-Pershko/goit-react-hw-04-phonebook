import { useState, useEffect, useMemo } from 'react';
import contactsList from 'backEnd_imitation/contacts';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import Notiflix from 'notiflix';

export default function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? contactsList
  );
  const [filter, setFilter] = useState('');

  //visibleContacts формує відфільтрований список
  // В даному додатку виконуватись буде при будь яких діях, але якщо буде контент незалежний від контактів то контакти не будуть перерендюватись.
  const visibleContacts = useMemo(() => {
    console.log('memo');
    const filterNormalize = filter.toLowerCase();
    
    const visibleContacts = filter
      ? contacts.filter(contact =>
          contact.name.toLocaleLowerCase().includes(filterNormalize)
        )
      : contacts;
    return visibleContacts;
  }, [contacts, filter]);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  // добавляє контакт і перевіряє чи такий вже є
  const addContacts = (id, name, number) => {
    if (contacts.find(contact => contact.name === name) !== undefined) {
      Notiflix.Notify.failure(`${name} already in your contact book`);
      return;
    }
    setContacts(prevState => [{ id, name, number }, ...prevState]);
    Notiflix.Notify.success(`You add ${name} to phonebook`);
  };
  // записує значення яке ввели в поле фільтр
  const handleChangeFilter = e => {
    setFilter(e.target.value);
  };

  //видаляє контакт//
  const handleDeleteContact = e => {
    const deleteSelectContact = contacts.filter(
      contact => contact.id !== e.target.id
    );
    setContacts([...deleteSelectContact]);
  };

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContacts}></ContactForm>
      <h2>Contacts</h2>
      <Filter onChange={handleChangeFilter} />
      <ContactList
        contactList={visibleContacts}
        onChange={handleDeleteContact}
      />
    </>
  );
}
