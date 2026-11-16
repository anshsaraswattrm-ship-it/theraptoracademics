import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FreeCounselling = () => {
  const [formData, setFormData] = useState({
    visa: '', intake: '', firstName: '', lastName: '', dob: '', contactNo: '', emailId: '', address: '',
    countryPreferred: '', coursePreferred: '', workExperience: '', educationBudget: '',
    education: {
      tenth: { subjectStream: '', score: '', startDate: '', endDate: '', universityBoard: '' },
      twelfth: { subjectStream: '', score: '', startDate: '', endDate: '', universityBoard: '' },
      graduation: { subjectStream: '', score: '', startDate: '', endDate: '', universityBoard: '' },
      other: { subjectStream: '', score: '', startDate: '', endDate: '', universityBoard: '' },
    },
    ielts: { overall: '', reading: '', writing: '', speaking: '', listening: '' },
    optInScholarshipNews: false
  });
  const [status, setStatus] = useState(null);

  const handleBasicChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleNestedChange = (category, level, field, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [level]: { ...prev[category][level], [field]: value }
      }
    }));
  };

  const handleIeltsChange = (field, value) => {
    setFormData(prev => ({ ...prev, ielts: { ...prev.ielts, [field]: value } }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    try {
      const response = await fetch('http://localhost:5000/api/counselling', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        setStatus('Application Submitted Successfully!');
      } else {
        setStatus('Submission failed.');
      }
    } catch (error) {
      console.error(error);
      setStatus('Error connecting to server.');
    }
  };

  const inputClass = "w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition";

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-5xl mx-auto pt-32 pb-20 px-4 md:px-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">Free Study Abroad Counselling Jaipur</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className="block text-sm font-semibold mb-2">Choose Your Visa</label><select name="visa" onChange={handleBasicChange} className={inputClass}><option value="">Choose your visa</option><option value="Study">Study</option></select></div>
            <div><label className="block text-sm font-semibold mb-2">Intake</label><input type="text" name="intake" placeholder="Intake" onChange={handleBasicChange} className={inputClass} /></div>
            <div><label className="block text-sm font-semibold mb-2">First Name</label><input type="text" name="firstName" placeholder="Enter first name" required onChange={handleBasicChange} className={inputClass} /></div>
            <div><label className="block text-sm font-semibold mb-2">Last Name</label><input type="text" name="lastName" placeholder="Enter last name" required onChange={handleBasicChange} className={inputClass} /></div>
            <div className="md:col-span-2"><label className="block text-sm font-semibold mb-2">Date Of Birth</label><input type="date" name="dob" onChange={handleBasicChange} className={inputClass} /></div>
            <div><label className="block text-sm font-semibold mb-2">Contact No</label><input type="tel" name="contactNo" placeholder="Enter your number" required onChange={handleBasicChange} className={inputClass} /></div>
            <div><label className="block text-sm font-semibold mb-2">Email Id</label><input type="email" name="emailId" placeholder="Enter your Email" required onChange={handleBasicChange} className={inputClass} /></div>
            <div className="md:col-span-2"><label className="block text-sm font-semibold mb-2">Address</label><textarea name="address" placeholder="Enter your address" rows="3" onChange={handleBasicChange} className={inputClass}></textarea></div>
            <div><label className="block text-sm font-semibold mb-2">Country Preferred</label><input type="text" name="countryPreferred" placeholder="Enter your preferred country" onChange={handleBasicChange} className={inputClass} /></div>
            <div><label className="block text-sm font-semibold mb-2">Course Preferred</label><input type="text" name="coursePreferred" placeholder="Enter your preferred course" onChange={handleBasicChange} className={inputClass} /></div>
            <div><label className="block text-sm font-semibold mb-2">Work Experience</label><input type="text" name="workExperience" placeholder="Enter your work experience" onChange={handleBasicChange} className={inputClass} /></div>
            <div><label className="block text-sm font-semibold mb-2">Education Budget</label><input type="text" name="educationBudget" placeholder="Enter education budget" onChange={handleBasicChange} className={inputClass} /></div>
          </div>

          {/* Section 2: Education Details Table */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Education Details</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="p-3 font-semibold text-sm">Qualification</th>
                    <th className="p-3 font-semibold text-sm">Subject / Stream</th>
                    <th className="p-3 font-semibold text-sm">% Or CGPA</th>
                    <th className="p-3 font-semibold text-sm">Start Date</th>
                    <th className="p-3 font-semibold text-sm">End Date</th>
                    <th className="p-3 font-semibold text-sm">University / Board</th>
                  </tr>
                </thead>
                <tbody>
                  {['tenth', 'twelfth', 'graduation', 'other'].map((level) => (
                    <tr key={level} className="border-b border-gray-100">
                      <td className="p-3 font-medium text-sm capitalize">{level === 'tenth' ? '10th' : level === 'twelfth' ? '12th' : level}</td>
                      <td className="p-3"><input type="text" onChange={(e) => handleNestedChange('education', level, 'subjectStream', e.target.value)} className={inputClass} /></td>
                      <td className="p-3"><input type="text" onChange={(e) => handleNestedChange('education', level, 'score', e.target.value)} className={inputClass} /></td>
                      <td className="p-3"><input type="date" onChange={(e) => handleNestedChange('education', level, 'startDate', e.target.value)} className={inputClass} /></td>
                      <td className="p-3"><input type="date" onChange={(e) => handleNestedChange('education', level, 'endDate', e.target.value)} className={inputClass} /></td>
                      <td className="p-3"><input type="text" onChange={(e) => handleNestedChange('education', level, 'universityBoard', e.target.value)} className={inputClass} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Language Score */}
          <div>
            <div className="overflow-x-auto mt-6">
              <table className="w-full text-center border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="p-3 font-semibold text-sm">Language Score</th>
                    <th className="p-3 font-semibold text-sm">Overall Score</th>
                    <th className="p-3 font-semibold text-sm">Reading</th>
                    <th className="p-3 font-semibold text-sm">Writing</th>
                    <th className="p-3 font-semibold text-sm">Speaking</th>
                    <th className="p-3 font-semibold text-sm">Listening</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="p-3 font-medium text-sm">Ielts</td>
                    <td className="p-3"><input type="text" onChange={(e) => handleIeltsChange('overall', e.target.value)} className={inputClass} /></td>
                    <td className="p-3"><input type="text" onChange={(e) => handleIeltsChange('reading', e.target.value)} className={inputClass} /></td>
                    <td className="p-3"><input type="text" onChange={(e) => handleIeltsChange('writing', e.target.value)} className={inputClass} /></td>
                    <td className="p-3"><input type="text" onChange={(e) => handleIeltsChange('speaking', e.target.value)} className={inputClass} /></td>
                    <td className="p-3"><input type="text" onChange={(e) => handleIeltsChange('listening', e.target.value)} className={inputClass} /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: Submit & Consent */}
          <div className="pt-4">
            <label className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer">
              <input type="checkbox" name="optInScholarshipNews" onChange={handleBasicChange} className="mt-1 accent-red-600" />
              <span>Keep me informed of scholarship news and special offers. By clicking submit, I Agree To TRA <span className="text-red-600">Terms</span> And <span className="text-red-600">Privacy Policy</span></span>
            </label>
            <div className="mt-8 flex flex-col items-start gap-4">
              <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition shadow-lg flex items-center gap-2">
                Submit ➜
              </button>
              <p className="text-xs text-gray-500">Your information will be securely sent to and stored in our database for the purpose of processing your form submission.</p>
              {status && <p className={`font-bold ${status.includes('Successfully') ? 'text-green-600' : 'text-red-600'}`}>{status}</p>}
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default FreeCounselling;