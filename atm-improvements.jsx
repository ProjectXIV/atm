const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ['Deposit', 'Cash Back'];
  return (
    <label className="label huge">
      <h3>{choice[Number(!isDeposit)]}</h3>
      <input id="number-input" type="number" onChange={onChange}></input>
      <input type="submit" value="Submit" id="submit-input" disabled={!isValid}></input>
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState('');
  const [totalState, setTotalState] = React.useState(0);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Account Balance $ ${totalState} `;

  const handleChange = (event) => {
    setDeposit(event.target.value);
    setValidTransaction(true); // Simplified for reverting to known good state
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validTransaction) return;
    const numDeposit = Number(deposit);
    let newTotal = atmMode === "Deposit" ? totalState + numDeposit : totalState - numDeposit;
    setTotalState(newTotal);
    setDeposit(''); // Clear the input field
  };

  const handleModeSelect = (e) => {
    setAtmMode(e.target.value);
    setDeposit(''); // Clear the field when changing modes
    setValidTransaction(false); // Reset the validation state
  };

  return (
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
  );
};

ReactDOM.render(<Account />, document.getElementById('root'));
