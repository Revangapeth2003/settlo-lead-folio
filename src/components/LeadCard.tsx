import { useState } from "react";
import { Lead } from "@/types/lead";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { updateLead, deleteLead } from "@/utils/storage";
import { toast } from "sonner";
import { Edit, Trash2, User, MapPin, Calendar, Phone, BookOpen, MessageSquare, DollarSign } from "lucide-react";

interface LeadCardProps {
  lead: Lead;
  onUpdate: () => void;
}

const LeadCard = ({ lead, onUpdate }: LeadCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(lead);

  const handleUpdate = async () => {
    try {
      await updateLead(lead.id, formData);
      toast.success("Lead updated successfully!");
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      toast.error("Failed to update lead. Please try again.");
      console.error("Error updating lead:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteLead(lead.id);
      toast.success("Lead deleted successfully!");
      onUpdate();
    } catch (error) {
      toast.error("Failed to delete lead. Please try again.");
      console.error("Error deleting lead:", error);
    }
  };

  return (
    <Card className="group h-full shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-hover text-primary-foreground">
              <User className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">{lead.name}</h3>
              <p className="text-sm text-muted-foreground">Age: {lead.age}</p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {lead.location && (
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">{lead.location}</span>
          </div>
        )}

        {lead.coursePreferred && (
          <div className="flex items-center gap-2 text-sm">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">{lead.coursePreferred}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">{lead.phoneNo}</span>
        </div>

        {lead.fees && (
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">{lead.fees}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">{new Date(lead.date).toLocaleDateString()}</span>
        </div>

        {lead.queries && (
          <div className="mt-4 space-y-1">
            <div className="flex items-center gap-2 text-sm font-medium">
              <MessageSquare className="h-4 w-4 text-primary" />
              <span>Queries:</span>
            </div>
            <p className="text-sm text-muted-foreground pl-6 line-clamp-3">{lead.queries}</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-2 border-t pt-4">
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex-1" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Lead</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Name</Label>
                  <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-age">Age</Label>
                  <Input
                    id="edit-age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-location">Location</Label>
                  <Input
                    id="edit-location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-course">Course Preferred</Label>
                  <Input
                    id="edit-course"
                    value={formData.coursePreferred}
                    onChange={(e) => setFormData({ ...formData, coursePreferred: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone Number</Label>
                  <Input
                    id="edit-phone"
                    value={formData.phoneNo}
                    onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-fees">Fees</Label>
                  <Input
                    id="edit-fees"
                    value={formData.fees}
                    onChange={(e) => setFormData({ ...formData, fees: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-date">Date</Label>
                  <Input
                    id="edit-date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-queries">Queries</Label>
                <Textarea
                  id="edit-queries"
                  value={formData.queries}
                  onChange={(e) => setFormData({ ...formData, queries: e.target.value })}
                  rows={4}
                />
              </div>

              <Button onClick={handleUpdate} className="w-full">
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="flex-1" size="sm">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete this lead. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default LeadCard;
