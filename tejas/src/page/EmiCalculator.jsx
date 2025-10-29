import { useState, useEffect } from 'react';
import './EmiCalculator.css'; 

const EmiCalculator = () => {

  const [loanAmount, setLoanAmount] = useState(1000000);
  const [tenure, setTenure] = useState(10);
  const [interestRate, setInterestRate] = useState(8);


  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);


  const currencyFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  });
  
  useEffect(() => {
    const P = parseFloat(loanAmount);
    const R = parseFloat(interestRate) / 12 / 100;
    const N = parseFloat(tenure) * 12; // 

    if (P > 0 && R > 0 && N > 0) {
      const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
      const totalPaymentValue = emiValue * N;
      const totalInterestValue = totalPaymentValue - P;
      
      setEmi(emiValue);
      setTotalPayment(totalPaymentValue);
      setTotalInterest(totalInterestValue);
    } else {
      setEmi(0);
      setTotalPayment(0);
      setTotalInterest(0);
    }
  }, [loanAmount, tenure, interestRate]);

  return (
    <div className="calculator-container">
      <h1>Home Loan EMI Calculator</h1>
      
      <div className="input-section">
        <div className="input-group">
          <div className="label-group">
            <label htmlFor="loanAmount">Loan Amount</label>
            <span>{currencyFormatter.format(loanAmount)}</span>
          </div>
          <input
            type="range"
            id="loanAmount"
            min={100000}
            max={100000000}
            step={100000}
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
        </div>
        <div className="input-group">
          <div className="label-group">
            <label htmlFor="tenure">Tenure (Years)</label>
            <span>{tenure} Years</span>
          </div>
          <input
            type="range"
            id="tenure"
            min={1}
            max={30}
            step={1}
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
          />
        </div>
        <div className="input-group">
          <div className="label-group">
            <label htmlFor="interestRate">Interest Rate (% P.A.)</label>
            <span>{interestRate} %</span>
          </div>
          <input
            type="range"
            id="interestRate"
            min={0.5}
            max={15}
            step={0.1}
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
        </div>
      </div>

      <div className="output-section">
        <div>
          <p>Monthly Home Loan EMI</p>
          <h2>{currencyFormatter.format(emi)}</h2>
        </div>
        <div className="output-details">
          <div className="detail-row">
            <span>Principal Amount</span>
            <span>{currencyFormatter.format(loanAmount)}</span>
          </div>
          <div className="detail-row">
            <span>Interest Amount</span>
            <span>{currencyFormatter.format(totalInterest)}</span>
          </div>
          <hr />
          <div className="detail-row total">
            <span>Total Amount Payable</span>
            <span>{currencyFormatter.format(totalPayment)}</span>
          </div>
        </div>
        <button className="cta-button">Talk To Our Loan Expert</button>
      </div>
    </div>
  );
};

export default EmiCalculator;