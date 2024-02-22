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
    // Correct use of setValidTransaction to update the form's validity
    if (atmMode === "Deposit") {
      setValidTransaction(amount > 0);
    } else if (atmMode === "Cash Back" && amount <= totalState && amount > 0) {
      setValidTransaction(true);
    } else {
      setValidTransaction(false);
    }
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
    }
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
