const ATMDeposit = ({ onChange, isDeposit, isValid, deposit }) => {
  const choice = ['Deposit', 'Cash Back'];
  return (
    <label className="label huge">
      <h3>{choice[Number(!isDeposit)]}</h3>
      <input id="number-input" type="number" value={deposit} onChange={onChange}></input>
      <input type="submit" value="Submit" id="submit-input" disabled={!isValid}></input>
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);
  const [transactions, setTransactions] = React.useState([]);

  let status = `Account Balance $ ${totalState} `;

  const handleChange = (event) => {
    const amount = Number(event.target.value);
    setDeposit(amount);
    setValidTransaction((atmMode === "Deposit" && amount > 0) || (atmMode === "Cash Back" && amount > 0 && amount <= totalState));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validTransaction) {
      let newTotal = atmMode === "Deposit" ? totalState + deposit : totalState - deposit;
      setTotalState(newTotal);
      const newTransaction = {
        date: new Date().toLocaleString(),
        amount: atmMode === "Deposit" ? deposit : -deposit,
        total: newTotal,
      };
      setTransactions([...transactions, newTransaction]);
      setDeposit(0); // Clear the input field after submission
    }
  };

  const handleModeSelect = (e) => {
    const mode = e.target.value;
    setAtmMode(mode);
    setDeposit(0); // Clear the input field when changing mode
    setValidTransaction(false);
  };

  return (
    <div className="atm-container">
      <div className="atm-interface">
        <h1 id="total">{status}</h1>
        <label>Select an action below to continue</label>
        <select onChange={handleModeSelect} name="mode" id="mode-select">
          <option value="">Select Action</option>
          <option value="Deposit">Deposit</option>
          <option value="Cash Back">Cash Back</option>
        </select>
        {atmMode && (
          <ATMDeposit
            onChange={handleChange}
            isDeposit={atmMode === "Deposit"}
            isValid={validTransaction}
            deposit={deposit}
          />
        )}
      </div>
      <TransactionHistory transactions={transactions} />
    </div>
  );
};

const TransactionHistory = ({ transactions }) => {
  return (
    <div className="transaction-history">
      <h1>Transaction History</h1>
      <div className="transaction-list">
        <div className="transaction-list-header">
          <div>Date</div>
          <div>Transaction</div>
          <div>Subtotal</div>
        </div>
        {transactions.map((transaction, index) => (
          <div key={index} className={`transaction-list-item ${transaction.amount < 0 ? "withdrawal" : ""}`}>
            <div>{transaction.date}</div>
            <div>{transaction.amount >= 0 ? `+$${transaction.amount}` : `-$${Math.abs(transaction.amount)}`}</div>
            <div>${transaction.total}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

ReactDOM.render(<Account />, document.getElementById('root'));
