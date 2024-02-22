const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ['Deposit', 'Cash Back'];
  return (
    <label className="label huge">
      <h3>{choice[Number(!isDeposit)]}</h3>
      <input id="number-input" type="number" onChange={onChange} style={{ width: "100px" }}></input>
      <input type="submit" value="Submit" id="submit-input" disabled={!isValid} style={{ width: "auto", padding: "0 10px" }}></input>
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState('');
  const [totalState, setTotalState] = React.useState(0);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);
  const [transactions, setTransactions] = React.useState([]);

  let status = `Account Balance $ ${totalState} `;

  const handleChange = (event) => {
    setDeposit(event.target.value);
    const numDeposit = parseFloat(event.target.value) || 0;
    setValidTransaction(atmMode === "Deposit" || (atmMode === "Cash Back" && numDeposit <= totalState));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validTransaction) return;
    const numDeposit = Number(deposit);
    let newTotal = atmMode === "Deposit" ? totalState + numDeposit : totalState - numDeposit;
    setTotalState(newTotal);
    setTransactions([...transactions, { date: new Date().toLocaleString(), transaction: atmMode, amount: numDeposit, balance: newTotal }]);
    setDeposit(''); // Clear the input field
  };

  const handleModeSelect = (e) => {
    setAtmMode(e.target.value);
    setDeposit(''); // Clear the field when changing modes
    setValidTransaction(false); // Reset the validation state
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 id="total">{status}</h2>
        <label>Select an action below to continue</label>
        <select onChange={handleModeSelect} name="mode" id="mode-select">
          <option value="">Select Action</option>
          <option value="Deposit">Deposit</option>
          <option value="Cash Back">Cash Back</option>
        </select>
        {atmMode && <ATMDeposit onChange={handleChange} isDeposit={atmMode === "Deposit"} isValid={validTransaction} />}
      </form>
      <TransactionHistory transactions={transactions} />
    </div>
  );
};

const TransactionHistory = ({ transactions }) => {
  return (
    <div className="transaction-history">
      <h2>Transaction History</h2>
      <div className="transaction-list-header">
        <span>Date</span><span>Transaction</span><span>Subtotal</span>
      </div>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            <span>{transaction.date}</span>
            <span>{transaction.transaction === "Deposit" ? `+${transaction.amount}` : `-${transaction.amount}`}</span>
            <span>${transaction.balance}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};


ReactDOM.render(<Account />, document.getElementById('root'));
