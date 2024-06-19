import React, { useState, useEffect } from 'react';
import ItemService from './services/ItemService';

const App = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', age: '', grade: ''});
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = () => {
        ItemService.getItems().then(response => {
            setItems(response.data);
        });
    };

    const handleCreateItem = (e) => {
        e.preventDefault();
        ItemService.createItem(newItem).then(response => {
            setItems([...items, response.data]);
            setNewItem({ name: '', description: '' });
        });
    };

    const handleUpdateItem = (e) => {
        e.preventDefault();
        ItemService.updateItem(selectedItem.id, selectedItem).then(response => {
            setItems(items.map(item => item.id === selectedItem.id ? response.data : item));
            setSelectedItem(null);
        });
    };

    const handleDeleteItem = (id) => {
        ItemService.deleteItem(id).then(() => {
            setItems(items.filter(item => item.id !== id));
        });
    };

    return (
        <div>
            <h1>Student management</h1>
            <h3>List of students</h3>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        Id : {item.id}; Name : {item.name}; Age : {item.age} ans; Grade : {item.grade}
                        <button onClick={() => setSelectedItem(item)}>Update</button>
                        <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <h2>Create New Student</h2>
            <form onSubmit={handleCreateItem}>
                <input 
                    type="text"
                    placeholder="Name"
                    value={newItem.name}
                    onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                />
                <input 
                    type="text"
                    placeholder="Age"
                    value={newItem.age}
                    onChange={e => setNewItem({ ...newItem, age: e.target.value })}
                />
                <input 
                    type="text"
                    placeholder="Grade"
                    value={newItem.grade}
                    onChange={e => setNewItem({ ...newItem, grade: e.target.value })}
                />
                <button type="submit">Create</button>
            </form>

            {selectedItem && (
                <div>
                    <h2>Update Item</h2>
                    <form onSubmit={handleUpdateItem}>
                        <input 
                            type="text"
                            placeholder="Name"
                            value={selectedItem.name}
                            onChange={e => setSelectedItem({ ...selectedItem, name: e.target.value })}
                        />
                        <input 
                            type="text"
                            placeholder="Age"
                            value={selectedItem.age}
                            onChange={e => setSelectedItem({ ...selectedItem, age: e.target.value })}
                        />
                        <input 
                            type="text"
                            placeholder="Grade"
                            value={selectedItem.grade}
                            onChange={e => setSelectedItem({ ...selectedItem, grade: e.target.value })}
                        />
                        <button type="submit">Update</button>
                    </form>
                    <div class="image-container">
                      <img src="https://media.lesechos.com/api/v1/images/view/5e394ed3d286c214a25eff75/1280x720/0602692345984-web-tete.jpg" alt="Description of image"></img>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
