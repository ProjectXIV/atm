const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ['Deposit', 'Cash Back'];
  return (
    <label className="label huge">
      <h3>{choice[Number(!isDeposit)]}</h3>
      <input id="number-input" type="number" width="200" onChange={onChange}></input>
      <input type="submit" width="200" value="Submit" id="submit-input" disabled={!isValid}></input>
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
    if (!validTransaction) return;
    let newTotal = atmMode === "Deposit" ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    const newTransaction = {
      date: new Date().toLocaleString(),
      amount: atmMode === "Deposit" ? deposit : -deposit,
      total: newTotal,
    };
    setTransactions([...transactions, newTransaction]);
  };

  const handleModeSelect = (e) => {
    const mode = e.target.value;
    setAtmMode(mode);
    setDeposit(0); // Reset deposit amount on mode change
    setValidTransaction(false); // Reset transaction validity on mode change
  };

  return (
    <div className="atm-container">
      <form onSubmit={handleSubmit}>
        <h2 id="total">{status}</h2>
        <label>Select an action below to continue</label>
        <select onChange={handleModeSelect} name="mode" id="mode-select">
          <option id="no-selection" value=""></option>
          <option id="deposit-selection" value="Deposit">Deposit</option>
          <option id="cashback-selection" value="Cash Back">Cash Back</option>
        </select>
        {atmMode && <ATMDeposit onChange={handleChange} isDeposit={atmMode === "Deposit"} isValid={validTransaction}></ATMDeposit>}
      </form>
      <TransactionHistory transactions={transactions} />
    </div>
  );
};

const TransactionHistory = ({ transactions }) => {
  return (
    <div className="transaction-history">
      <h3>Transaction History</h3>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index} className={transaction.amount < 0 ? "withdrawal" : ""}>
            {transaction.date} - 
            {transaction.amount > 0 ? `Deposit: $${transaction.amount}` : `Withdrawal: $${Math.abs(transaction.amount)}`}
            - Running Total: ${transaction.total}
          </li>
        ))}
      </ul>
    </div>
  );
};

ReactDOM.render(<Account />, document.getElementById('root'));
