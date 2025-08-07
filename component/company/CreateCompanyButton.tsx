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
import { useCreateCompanyMutation } from "@/redux/slices/companySlice"
import { set } from "lodash"
import React, { useState } from "react"

export function CompanyButton() {
    const [createCompany, { isLoading }] = useCreateCompanyMutation()
    const [fileToggle, setFileToggle] = useState(0)

    const [form, setForm] = React.useState({
        name: "",
        logoUrl: "",
        description: "",
    })

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setForm((prev) => ({ ...prev, logoUrl: (reader.result as string) || "" }));
        };
        reader.readAsDataURL(file);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            // Replace 'companyId' with the actual company id value as needed
            await createCompany(form).unwrap()
            setForm({ name: "", logoUrl: "", description: "" }) // Reset form after successful submission
        } catch (error) {
            console.error("Failed to create company:", error)
        }
    }



    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline" className="text-white " style={{
                        backgroundColor: "#a989f6",
                        color: "white",
                        border: "none"
                    }}>Add Company</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create Comapny</DialogTitle>
                        <DialogDescription>
                            Create company to post jobs and manage your listings.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name" >Company Name</Label>
                            <Input id="name" name="name" placeholder="Enter company name" value={form.name} onChange={handleInputChange} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="name" >Description</Label>
                            <Input id="description" name="description" placeholder="Enter company description" value={form.description} onChange={handleInputChange} />
                        </div>
                        {fileToggle ? (
                            <div className="grid gap-3">
                                <Label htmlFor="logo">Logo</Label>
                                <Input type="file" id="logo" name="logoUrl" accept="image/*" placeholder="Enter logo URL" onChange={handleImageChange} />
                            </div>
                        ) :
                            (<div className="grid gap-3">
                                <Label htmlFor="logo">Logo</Label>
                                <Input type="text" id="logo" name="logoUrl" value={form.logoUrl} placeholder="Enter logo URL" onChange={handleInputChange} />
                            </div>)
                        }
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={fileToggle === 1}
                                onChange={(e) => {
                                    setFileToggle(e.target.checked ? 1 : 0)
                                    setForm((prev) => ({ ...prev, logoUrl: "" }))
                                }}
                                className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Add File</span>
                        </label>

                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" onClick={handleSubmit}>   {isLoading ? "Creating..." : "Create"}</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
