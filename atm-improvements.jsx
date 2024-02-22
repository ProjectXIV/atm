const ATMDeposit = ({ onChange, isDeposit, isValid, deposit }) => {
  const choice = ['Deposit', 'Cash Back'];
  return (
    <label className="label huge">
      <h3>{choice[Number(!isDeposit)]}</h3>
      <input id="number-input" type="number" value={deposit} onChange={onChange} min="0"></input>
      <input type="submit" value="Submit" id="submit-input" disabled={!isValid}></input>
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(''); // Use an empty string to keep the field initially blank
  const [totalState, setTotalState] = React.useState(0);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);
  const [transactions, setTransactions] = React.useState([]);

  let status = `Account Balance $ ${totalState} `;

  const handleChange = (event) => {
    let value = event.target.value;
    setDeposit(value); // Directly use the input value
    let amount = value ? parseFloat(value) : 0; // Parse the input value to float, default to 0 if empty
    // Validate transaction only if there's an amount and mode selected
    if (amount > 0) {
      if (atmMode === "Deposit") {
        setValidTransaction(true);
      } else if (atmMode === "Cash Back" && amount <= totalState) {
        setValidTransaction(true);
      } else {
        setValidTransaction(false);
      }
    } else {
      setValidTransaction(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validTransaction && deposit) {
      let numAmount = parseFloat(deposit); // Ensure the deposit is treated as a number
      let newTotal = atmMode === "Deposit" ? totalState + numAmount : totalState - numAmount;
      setTotalState(newTotal);
      setTransactions([...transactions, { date: new Date().toLocaleString(), amount: atmMode === "Deposit" ? numAmount : -numAmount, total: newTotal }]);
      setDeposit(''); // Clear the input after submission
    }
  };

  const handleModeSelect = (e) => {
    setAtmMode(e.target.value);
    setDeposit(''); // Ensure the field is blank when changing modes
    setValidTransaction(false); // Reset validation
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
        {atmMode && <ATMDeposit onChange={handleChange} isDeposit={atmMode === "Deposit"} isValid={validTransaction} deposit={deposit} />}
      </div>
      <TransactionHistory transactions={transactions} />
    </div>
  );
};

const TransactionHistory = ({ transactions }) => {
  // TransactionHistory component remains the same
};
