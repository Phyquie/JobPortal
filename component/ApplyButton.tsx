import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { usePostApplicationMutation, useGetUserByIdQuery } from "@/redux/slices/userSlice"
import React from "react"
import { useUser } from "@clerk/nextjs"

export function ApplyButton({ JobId }: { JobId: string }) {
    const [postApplication, { isLoading }] = usePostApplicationMutation()
    const { user } = useUser();
    if (!user) return null; // Ensure user is authenticated
    const { data: userData } = useGetUserByIdQuery(user.id)
    console.log("User Data:", userData)
    const [form, setForm] = React.useState({
        resumeUrl: "",
        coverLetter: "",
        JobId: JobId, // This should be set to the job ID you are applying for
    })

    const handleSubmit = async () => {
        await postApplication(form)
        alert("Application submitted successfully!")
        setForm({ resumeUrl: "", coverLetter: "", JobId: JobId }) // Reset form after submission
    }

    return (
        <Dialog>
            <div>
                <DialogTrigger asChild>
                    <Button variant="outline" className=" h-full text-white font-semibold px-6 py-2 rounded-md" style={{
                        "backgroundColor": "#a989f6",
                    }}>Apply</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">First Name</Label>
                            <Input id="name-1" name="name" value={userData?.firstName} placeholder="Enter your first name" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="lastname">Last Name</Label>
                            <Input id="lastname" name="lastname" value={userData?.lastName} placeholder="Enter your last name" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" value={userData?.email} placeholder="Enter your email" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="resume">Resume</Label>
                            <Input id="resume" name="resume" type="text" placeholder="Upload your resume" value={form.resumeUrl} onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="coverLetter">Cover Letter</Label>
                            <Input id="coverLetter" name="coverLetter" type="text" placeholder="Upload your cover letter" value={form.coverLetter} onChange={(e) => setForm({ ...form, coverLetter: e.target.value })} />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={handleSubmit}>{isLoading ? "Applying..." : "Apply"}</Button>
                    </DialogFooter>
                </DialogContent>
            </div>
        </Dialog>
    )
}
