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
import React from "react"

export function CompanyButton() {
    const [createCompany] = useCreateCompanyMutation()

    const [form, setForm] = React.useState({
        name: "",
        logoUrl: "",
        description: "",
    })

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
                        <div className="grid gap-3">
                            <Label htmlFor="logo">Logo</Label>
                            <Input type="text" id="logo" name="logoUrl" value={form.logoUrl} placeholder="Enter logo URL" onChange={handleInputChange} />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" onClick={handleSubmit}>Create</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
