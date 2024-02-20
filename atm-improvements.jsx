const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ['Deposit', 'Cash Back'];
  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
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

  let status = `Account Balance $ ${totalState} `;
  const handleChange = (event) => {
    const amount = Number(event.target.value);
    setDeposit(amount);
    // Validation logic for Cash Back transactions
    if (amount <= 0) {
      setValidTransaction(false);
    } else if (atmMode === "Cash Back" && amount > totalState) {
      setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }
  };

  const handleSubmit = (event) => {
    if (validTransaction) {
      let newTotal = atmMode === "Deposit" ? totalState + deposit : totalState - deposit;
      setTotalState(newTotal);
    }
    event.preventDefault();
  };

  const handleModeSelect = (e) => {
    const mode = e.target.value;
    setAtmMode(mode);
    // Reset the form upon changing the mode
    setValidTransaction(false);
    setDeposit(0);
  };

  return (
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
  );
};

// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));
