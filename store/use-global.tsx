import { create } from 'zustand';
type userProps = {
    name: string;
    email: string;
    avatar: string;
}
interface userDataProps {
    userData: userProps;
    updateUserData: (userData: userProps) => void;
}
export const useGlobalState = create<userDataProps>((set)=>({
    userData:{
        name:'',
        email:'',
        avatar:''
    },
    updateUserData:(userData)=>set((state)=>({userData:state.userData=userData}))
}))