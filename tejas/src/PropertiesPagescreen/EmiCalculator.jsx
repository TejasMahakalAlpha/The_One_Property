import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw } from 'lucide-react'; // BarChart hata diya

const EmiCalculator = () => {
  const navigate = useNavigate();
  const [principal, setPrincipal] = useState('');
  const [interest, setInterest] = useState('');
  const [tenure, setTenure] = useState('');
  const [tenureType, setTenureType] = useState('years'); // 'years' ya 'months'
  const [emi, setEmi] = useState(null);

  const calculateEmi = () => {
    const p = parseFloat(principal);
    const r = parseFloat(interest) / 12 / 100; // Monthly interest rate
    let n;

    if (tenureType === 'years') {
      n = parseFloat(tenure) * 12; // Total months
    } else {
      n = parseFloat(tenure); // Total months
    }

    if (p > 0 && r > 0 && n > 0) {
      const emiValue = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setEmi(emiValue.toFixed(2));
    } else {
      setEmi(null);
    }
  };

  const handleReset = () => {
    setPrincipal('');
    setInterest('');
    setTenure('');
    setEmi(null);
  };

  // Common input class
  const inputClass = "w-full p-3 border border-gray-300 rounded-lg text-base text-gray-900 focus:outline-none focus:border-[#623654] focus:ring-1 focus:ring-[#623654] transition-colors";

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-md mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={16} /> Back
        </button>

        {/* Calculator Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <h1 className="text-3xl font-serif font-bold text-center text-[#623654] mb-6">
            EMI Calculator
          </h1>

          <div className="space-y-5">
            {/* Principal Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Principal Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  ₹
                </span>
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  placeholder="e.g., 5000000"
                  className={`${inputClass} pl-8`}
                />
              </div>
            </div>

            {/* Interest Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rate of Interest
              </label>
              <div className="relative">
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  %
                </span>
                <input
                  type="number"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  placeholder="e.g., 8.5"
                  className={`${inputClass} pr-8`}
                />
              </div>
            </div>

            {/* Tenure Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Loan Tenure
              </label>
              <input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                placeholder="e.g., 20"
                className={inputClass}
              />
              <div className="grid grid-cols-2 gap-2 mt-2">
                <button
                  onClick={() => setTenureType('years')}
                  className={`py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    tenureType === 'years'
                      ? 'bg-[#623654] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Years
                </button>
                <button
                  onClick={() => setTenureType('months')}
                  className={`py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    tenureType === 'months'
                      ? 'bg-[#623654] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Months
                </button>
              </div>
            </div>

            {/* Buttons (Calculate, Reset) */}
            <div className="pt-3 space-y-3">
              <button
                onClick={calculateEmi}
                className="w-full inline-flex justify-center items-center py-3 px-4 border border-transparent shadow-sm text-base font-bold rounded-lg text-white bg-[#623654] hover:bg-[#522d46] transition-colors"
              >
                Calculate
              </button>
              <button
                onClick={handleReset}
                className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 shadow-sm text-base font-bold rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <RefreshCw size={18} className="mr-2" /> Reset
              </button>
            </div>

            {/* EMI Result */}
            {emi && (
              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm font-medium text-gray-600">
                  Your Monthly EMI
                </p>
                <p className="text-4xl font-bold text-[#623654] mt-1">
                  ₹ {emi}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmiCalculator;