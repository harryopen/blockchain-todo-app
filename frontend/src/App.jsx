import React, { useEffect, useState } from "react";
import { addTodo, getTodos, toggleTodos } from "./web3/contract";
import { connectWallet, disconnectWallet } from "./web3/wallet";

import Header from "./components/Header";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

import './App.css';

const App = () => {
  const [account, setAccount] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);

  const connect = async () => {
    try {
      const acc = await connectWallet();
      console.log("Connected account:", acc);
      setAccount(acc);
      loadTodos();
    } catch (error) {
      console.error("Connection failed:", error);
    }
  };

  const disconnect = async () => {
    try {
      await disconnectWallet();
      console.log("Disconnected wallet");
      setAccount("");
      setTodos([]);
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  const loadTodos = async () => {
    setLoading(true);
    try {
      const [texts, completed] = await getTodos();
      
      const formatted = texts.map((text, i) => ({
        text,
        completed: completed[i],
      }));
      setTodos(formatted);
    } catch (error) {
      console.error("Failed to load todos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (text) => {
    setAdding(true);
    setLoading(true);
    try {
      await addTodo(text);
      await loadTodos();
    } catch (error) {
      console.error("Failed to add todo:", error);
    } finally {
      setLoading(false);
      setAdding(false);
    }
  };

  const handleToggle = async (index) => {
    setLoading(true);
    try {
      await toggleTodos(index);
      await loadTodos();
    } catch (error) {
      console.error("Failed to toggle todo:", error);
    } finally {
      setLoading(false);
    }
  };

  // Auto connect if already connected (in an ideal app, you'd check ethereum.selectedAddress)
  useEffect(() => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      setAccount(window.ethereum.selectedAddress);
      loadTodos();
    }
  }, []);

  return (
    <div className="app-container">
      <Header 
        account={account} 
        onConnect={connect} 
        onDisconnect={disconnect} 
      />
      
      <main className="app-content">
        <div className="app-intro">
          <h2>Decentralized Task Management</h2>
          <p>Secure, borderless, and entirely on the BNB Smart Chain.</p>
        </div>

        <TodoInput 
          onAdd={handleAdd} 
          disabled={!account || adding} 
        />
        
        {adding && (
          <div className="transaction-status">
            <div className="spinner-small"></div>
            <span>Confirming transaction on blockchain...</span>
          </div>
        )}

        <TodoList 
          todos={todos} 
          onToggle={handleToggle}
          loading={loading} 
        />
      </main>
    </div>
  );
};

export default App;
