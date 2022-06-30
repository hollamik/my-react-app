import React, {useEffect, useState} from 'react';
import styles from './Style.css';

// get data from localStorage

const getListItemsFromLocalStorage = () => {
    let listItemsInLocalStorage = localStorage.getItem('list');
    
    if(listItemsInLocalStorage){
        return JSON.parse(listItemsInLocalStorage);
    }
    else{
        return [];
    }
}

const Todo = () => {
    const [item, setItem] = useState("");
    const [listItem, setListItem] = useState(getListItemsFromLocalStorage());
    const inputEvent = (event) => {
        setItem(event.target.value);
    }

    const addItem = () => {
        if(!item){

        }
        else{
            setListItem((oldListOfItems) => {
                return [...oldListOfItems, item];
            })
        }
        setItem("");
    }

    const deleteItem = (indexOfItem) => {
        setListItem((oldListOfItems) => {
            return oldListOfItems.filter((arrElement, index)=> {
                return index !== indexOfItem;
            })
        })
    }

    // add to localStorage
    useEffect(() => {
        localStorage.setItem('list',JSON.stringify(listItem));
    },[listItem]);

    return (
        <div className={styles.container}>
            <div className='wrapper'>
            <div className={styles.card}>
                <h1>My Todo List</h1>
                <input type="text" onChange={inputEvent} value={item} placeholder="Enter Your Task" />
                <button className={styles.btn} onClick={addItem} >Add</button>
                <ul className={styles.list}>
                    {listItem.map((items, indexOfItem) => {
                        return <li id={indexOfItem}> <p onClick={() => deleteItem(indexOfItem)}>&times;</p> {items} </li>;     
                    })}
                </ul>
            </div>
            <p>Copyright &copy; hollamik 2022</p>
            </div>
        </div>
    );
}

export default Todo;