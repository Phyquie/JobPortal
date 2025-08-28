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
import React, { useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import toast from "react-hot-toast"

export function ApplyButton({ JobId }: { JobId: string }) {
    const [postApplication, { isLoading }] = usePostApplicationMutation();
    const { user } = useUser();
    if (!user) return null; // Ensure user is authenticated
    const { data: userData } = useGetUserByIdQuery(user.id);
    const [fileToggle, setFileToggle] = React.useState(0);
    const [form, setForm] = React.useState({
        resumeUrl: "",
        coverLetter: "",
        JobId: JobId,
    });

    React.useEffect(() => {
        if (userData) {
            setForm((prev) => ({
                ...prev,
                resumeUrl: userData.savedResumeUrl || "",
            }));
        }
    }, [userData]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setForm((prev) => ({ ...prev, resumeUrl: (reader.result as string) || "" }));
        };
        reader.readAsDataURL(file);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        await postApplication(form);
        toast.success("Application submitted successfully!");
        window.location.reload();
        setForm({ resumeUrl: "", coverLetter: "", JobId: JobId }); // Reset form after submission
    };

    return (
        <Dialog>
            <div>
                <DialogTrigger asChild>
                    <Button variant="outline" className=" h-full text-white font-semibold px-6 py-2 rounded-md" style={{
                        backgroundColor: "#a989f6",
                    }}>Apply</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">First Name</Label>
                            <Input id="name-1" name="name" value={userData?.firstName} placeholder="Enter your first name" readOnly />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="lastname">Last Name</Label>
                            <Input id="lastname" name="lastname" value={userData?.lastName} placeholder="Enter your last name" readOnly />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" value={userData?.email} placeholder="Enter your email" readOnly />
                        </div>
                        {fileToggle ? (
                            <div className="grid gap-3">
                                <Label htmlFor="resume">Resume</Label>
                                <Input id="resume" name="resumeUrl" type="file" accept="application/pdf,.doc,.docx,.txt" onChange={handleFileChange} />
                            </div>
                        ) : (
                            <div className="grid gap-3">
                                <Label htmlFor="resume">Resume</Label>
                                <Input id="resume" name="resumeUrl" type="text" placeholder="Upload your resume" value={form.resumeUrl} onChange={handleInputChange} />
                            </div>
                        )}
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={fileToggle === 1}
                                onChange={(e) => {
                                    setFileToggle(e.target.checked ? 1 : 0);
                                    setForm((prev) => ({ ...prev, resumeUrl: "" }));
                                }}
                                className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#a989f6] dark:peer-checked:[#a989f6]"></div>
                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Add File</span>
                        </label>
                        {/* <div className="grid gap-3">
                            <Label htmlFor="coverLetter">Cover Letter</Label>
                            <Input id="coverLetter" name="coverLetter" type="text" placeholder="Upload your cover letter" value={form.coverLetter} onChange={handleInputChange} />
                        </div> */}
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
    );
}
