import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Login from './components/Login';
import Chatroom from './components/Chatroom';
import AuthProvider from './components/Context/AuthProvider';
import AppProvider from './components/Context/AppProvider';
import AddRoomModal from './components/Modals/AddRoomModal';
import InviteMemberModal from './components/Modals/InviteMemberModal';
function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppProvider>
                    <Routes>
                        <Route element={<Login />} path={'/login'}></Route>
                        <Route element={<Chatroom />} path={'/'}></Route>
                    </Routes>
                    <AddRoomModal />
                    <InviteMemberModal />
                </AppProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
