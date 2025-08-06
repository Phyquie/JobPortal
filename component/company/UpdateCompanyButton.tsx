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
import { useGetCompanyByIdQuery, useUpdateCompanyMutation } from "@/redux/slices/companySlice"
import React, { useEffect } from "react"

export function UpdateCompanyButton({ companyId }: { companyId?: string }) {
    const [updateCompany] = useUpdateCompanyMutation()
    const { data: company } = useGetCompanyByIdQuery(companyId || "")

    const [form, setForm] = React.useState({
        name: company?.name || "",
        logoUrl: company?.logoUrl || "",
        description: company?.description || "",
    })
    useEffect(() => {
        if (company) {
            setForm({
                name: company.name,
                logoUrl: company.logoUrl,
                description: company.description,
            })
        }
    }, [company])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (!companyId) {
                console.error("Company ID is required for updating")
                return
            }
            await updateCompany({ id: companyId, updatedCompany: form }).unwrap()
            setForm({ name: "", logoUrl: "", description: "" })
        } catch (error) {
            console.error("Failed to update company:", error)
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
                    }}>Edit</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Update Comapny</DialogTitle>
                        <DialogDescription>
                            Update company to post jobs and manage your listings.
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
                        <Button type="submit" onClick={handleSubmit}>Update</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
