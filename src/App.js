import './App.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Appbar from './components/Appbar';
import StudentAppBar from './components/StudentAppBar'; // Import the new AppBar
import User from './components/User';
import Show from './components/Show';
import Home from './components/Home';
import { useState } from 'react';
import City from './components/City';
import About from './components/About';
import AdminPanel from './components/AdminPanel';
import AdminAppBar from './components/AdminAppBar';
import AddAchievements from './components/AddAchievements';
import ViewAchievements from './components/ViewAchievements';
import Achievements from './components/Achievements';
import AddEvent from './components/AddEvent';
import FetchEvents from './components/FetchEvents';
import AchievementsDisplay from './components/AchievementsDisplay';
import FetchParticipants from "./components/FetchParticipants";



function App() {
  const [page, setPage] = useState("Home");
  const [userEmail, setUserEmail] = useState(''); // Store email here

  function Page() {
    switch (page) {
      case "Signin":
        return (
          <div>
            <Appbar setPage={setPage} />
            <SignIn setPage={setPage} setUserEmail={setUserEmail} />
          </div>
        );
      case "Signup":
        return (
          <div>
            <Appbar setPage={setPage} />
            <SignUp setPage={setPage} />
          </div>
        );

        case "FetchParticipants":
        return (
          <div>
            <AdminAppBar setPage={setPage} />
            <FetchParticipants setPage={setPage} />
          </div>
        );
        case "Achievements":
        return (
          <div>
            <AdminAppBar setPage={setPage} />
            <Achievements setPage={setPage} />
          </div>
        );
        
      case "User":
        return (
          <div>
            <AdminAppBar setPage={setPage} />
            <User setPage={setPage} />
          </div>
        );
      case "Show":
        return (
          <div>
            <AdminAppBar setPage={setPage} /> {/* Admin navbar only for Show */}
            <Show setPage={setPage} />
          </div>
        );
      case "City":
        return (
          <div>
            <StudentAppBar setPage={setPage} /> {/* Student navbar */}
            <City setPage={setPage} email={userEmail} /> {/* Pass email to City */}
          </div>
        );
        case "About":
          return (
            <div>
              <Appbar setPage={setPage} /> {/* Home navbar */}
              <About setPage={setPage} />
            </div>
          );     

        case "Achievements":
        return (
          <div>
            <AddAchievements setPage={setPage} /> {/* Student navbar */}
            <About setPage={setPage} />
          </div>
        );

        case "ViewAchievements":
        return (
          <div>
            <ViewAchievements setPage={setPage} /> {/* Student navbar */}
            <About setPage={setPage} />
          </div>
        );
      case "AdminPanel":
        return (
          <div>
            <AdminAppBar setPage={setPage} />
            <AdminPanel setPage={setPage} />
          </div>
        );
        
        case "FetchEvents":
          return (
            <div>
              <StudentAppBar setPage={setPage} /> {/* Student navbar */}
              <FetchEvents setPage={setPage} />
            </div>
          );

          case "AchievementsDisplay":
          return (
            <div>
              <StudentAppBar setPage={setPage} /> {/* Student navbar */}
              <AchievementsDisplay setPage={setPage} />
            </div>
          );

      default:
        return (
          <div>
            <Appbar setPage={setPage} />
            <Home setPage={setPage} />
          </div>
        );
    }
  }

  return (
    <div className="App">
      <div className='App-body'>
        <Page />
      </div>
    </div>
  );
}

export default App;