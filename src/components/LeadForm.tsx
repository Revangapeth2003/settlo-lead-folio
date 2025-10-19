import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { addLead } from "@/utils/storage";
import { toast } from "sonner";
import { Plus } from "lucide-react";

const LeadForm = ({ onLeadAdded }: { onLeadAdded: () => void }) => {
  const today = new Date().toISOString().split("T")[0];
  
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    location: "",
    coursePreferred: "",
    queries: "",
    phoneNo: "",
    date: today,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.age || !formData.phoneNo) {
      toast.error("Please fill in all required fields");
      return;
    }

    addLead({
      ...formData,
      age: parseInt(formData.age),
    });

    setFormData({
      name: "",
      age: "",
      location: "",
      coursePreferred: "",
      queries: "",
      phoneNo: "",
      date: today,
    });

    toast.success("Lead added successfully!");
    onLeadAdded();
  };

  return (
    <Card className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Plus className="h-6 w-6 text-primary" />
          Add New Lead
        </CardTitle>
        <CardDescription>Fill in the details to add a new lead to your pipeline</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                placeholder="25"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="New York, USA"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coursePreferred">Course Preferred</Label>
              <Input
                id="coursePreferred"
                value={formData.coursePreferred}
                onChange={(e) => setFormData({ ...formData, coursePreferred: e.target.value })}
                placeholder="Web Development"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNo">Phone Number *</Label>
              <Input
                id="phoneNo"
                type="tel"
                value={formData.phoneNo}
                onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
                placeholder="+1 234 567 8900"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="queries">Queries</Label>
            <Textarea
              id="queries"
              value={formData.queries}
              onChange={(e) => setFormData({ ...formData, queries: e.target.value })}
              placeholder="Any specific questions or requirements..."
              rows={4}
              className="resize-none"
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            <Plus className="mr-2 h-4 w-4" />
            Add Lead
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LeadForm;
