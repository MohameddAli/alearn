import TopNav from '../components/TopNav';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/reset.css';
import "../public/css/styles.css";
// toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from '../context';

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      {/* Start toastify */}
      <ToastContainer position='top-center'/>
      {/* End toastify */}
      <TopNav />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp;