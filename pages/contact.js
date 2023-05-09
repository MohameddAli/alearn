import { useState } from "react";
import axios from 'axios'
 
const EmailSend = () => {
  
  const [msg,setMsg] = useState('');
  const [mes, setUser] = useState({
    email: "",
    subject: "",
    description: ""
  });
 
  const { name, phone, email, subject, description} = mes;
  const onInputChange = e => {
    setUser({ ...mes, [e.target.name]: e.target.value });
  };
 
  const onSubmit = async e => {
    e.preventDefault();
    await axios.post("/api/send-email", mes)
   .then(response => setMsg(response.data.respMesg));
  };
  
  return (

    <div className="flex items-center justify-center h-screen">
        
      <div className="w-full max-w-md">
        <h3 className="text-center text-green-600 text-2xl mb-2 mt-4 font-bold">Email Send using React and Node</h3>
          <h6 className="text-white-600 text-center mb-4 mt-1">By Improve Programming Logic</h6>
        <form onSubmit={onSubmit} className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
          <h4 className="text-black font-bold text-xl text-center mb-2">Send E-Mail</h4>
          <p className="text-green-600 mb-3 mt-2 text-center font-bold">{msg}</p>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Your Name"
              name="name"
              onChange={onInputChange}
              value={name}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
              Email:
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="From"
              name="email"
              onChange={onInputChange}
              value={email}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
              Phone:
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Phone Number"
              name="phone"
              onChange={onInputChange}
              value={phone}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="subject">
              Subject:
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Subject"
              name="subject"
              onChange={onInputChange}
              value={subject}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
              Description:
            </label>
            <textarea
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Description"
              name="description"
              onChange={onInputChange}
              value={description}
            ></textarea>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Send Mail
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailSend;