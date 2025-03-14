"use client"
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import {ClerkProvider, useUser} from "@clerk/nextjs";
import { RedirectToSignIn, useAuth } from "@clerk/nextjs";
import { Loading } from "@/components/auth/loading";
import {useGlobalState} from "@/store/use-global";
import {useEffect} from "react";
interface ConvexClientProviderProps {
    children: React.ReactNode;
}

const convexUrl:string|undefined = process.env.NEXT_PUBLIC_CONVEX_URL;
const convex = new ConvexReactClient(typeof convexUrl === "string" ? convexUrl :'');
export const ConvexClientProvider:React.FC<ConvexClientProviderProps> = ({children}) => {
    return (
        <ClerkProvider>
            <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
                <AuthWrapper >
                    {children}
                </AuthWrapper>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}
const AuthWrapper:React.FC<{children:React.ReactNode}> = ({children})=>{
    const { user } = useUser()
    const { updateUserData } =  useGlobalState()
    const { isLoaded, isSignedIn } = useAuth();
    useEffect(()=>{
        if(user){
            updateUserData({
                name: user.fullName || '',
                email: user.emailAddresses[0].emailAddress|| '',
                avatar: user.imageUrl || ''
            });
        }
    },[
        user,updateUserData
    ])
    if(!isLoaded){
        return <Loading />
    }
    // 确保在加载后处理重定向
    if (!isSignedIn) {
        return <RedirectToSignIn />;
    }
    return <div className=" w-full h-full">{children}</div>; // 登录后渲染子组件
}