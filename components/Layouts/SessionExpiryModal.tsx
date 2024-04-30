'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { ArrowRight } from 'lucide-react'
import { signIn } from 'next-auth/react'
import useClientSession from "../../store/session"
import { useEffect } from "react"
const SessionExpiryModal = () => {
    const { clientSession, setData } = useClientSession()

    return (
        <Dialog open={clientSession}  >
            {/* <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </DialogTrigger> */}
            <DialogContent className="sm:max-w-[425px]" onPointerDownOutside={(event) => {
                event.preventDefault()
            }} >
                <DialogHeader>
                    <DialogTitle>Session Expired</DialogTitle>
                    <DialogDescription>
                        Your session has expired. Please login again to continue.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button type="submit" onClick={() => {
                        signIn('azure-ad');
                        setData(() => ({
                            clientSession: false,
                        }));
                    }}>Login using Azure AD &nbsp; <ArrowRight size={16} /></Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default SessionExpiryModal