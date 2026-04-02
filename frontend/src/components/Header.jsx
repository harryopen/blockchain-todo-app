import React from 'react';
import './Header.css';

const Header = ({ account, onConnect, onDisconnect }) => {
  return (
    <header className="app-header">
      <div className="logo-section">
        <div className="logo-icon"></div>
        <h1 className="logo-text">TODO <span>LIST</span></h1>
      </div>
      <div className="wallet-section">
        {account ? (
          <div className="wallet-connected">
            <span className="account-address">
              {account.substring(0, 6)}...{account.substring(account.length - 4)}
            </span>
            <button className="btn-disconnect" onClick={onDisconnect}>
              Disconnect
            </button>
          </div>
        ) : (
          <button className="btn-connect" onClick={onConnect}>
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
