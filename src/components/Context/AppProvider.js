import React, { useContext, useState } from 'react';
import useFirebaseStore from '../../hooks/useFirebaseStore';
import { AuthContext } from './AuthProvider';
export const AppContext = React.createContext();
export default function AppProvider({ children }) {
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
    const [isInviteVisible, setIsInviteVisible] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState('');

    const { uid } = useContext(AuthContext);
    const roomsCondition = React.useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: uid,
        };
    }, [uid]);
    const rooms = useFirebaseStore('rooms', roomsCondition);
    const selectedRoom = React.useMemo(
        () => rooms.find((room) => room.id === selectedRoomId) || {},
        [rooms, selectedRoomId]
    );
    const usersCondition = React.useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: selectedRoom.members,
        };
    }, [selectedRoom.members]);

    const members = useFirebaseStore('users', usersCondition);

    return (
        <AppContext.Provider
            value={{
                rooms,
                members,
                isAddRoomVisible,
                isInviteVisible,
                setIsAddRoomVisible,
                setIsInviteVisible,
                selectedRoomId,
                selectedRoom,
                setSelectedRoomId,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
