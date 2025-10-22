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
import { Edit, Trash2, User, MapPin, Calendar, Phone, MessageSquare, IndianRupee, GraduationCap, ChevronDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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

  const handleStatusChange = async (newStatus: 'on_process' | 'positive' | 'completed') => {
    try {
      await updateLead(lead.id, { ...lead, status: newStatus });
      toast.success("Status updated successfully!");
      onUpdate();
    } catch (error) {
      toast.error("Failed to update status. Please try again.");
      console.error("Error updating status:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'positive':
        return 'bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-500/20';
      case 'completed':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400 hover:bg-blue-500/20';
      default:
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-500/20';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'on_process':
        return 'On Process';
      case 'positive':
        return 'Positive';
      case 'completed':
        return 'Completed';
      default:
        return status;
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={`gap-1 ${getStatusColor(lead.status)}`}
              >
                {getStatusLabel(lead.status)}
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 bg-popover z-50">
              <DropdownMenuItem 
                onClick={() => handleStatusChange('on_process')}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-yellow-500" />
                  On Process
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleStatusChange('positive')}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  Positive
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleStatusChange('completed')}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  Completed
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
          <div className="flex items-start gap-2 text-sm">
            <span className="font-medium text-muted-foreground">Preferred Course:</span>
            <span className="text-muted-foreground">{lead.coursePreferred}</span>
          </div>
        )}

        {lead.qualification && (
          <div className="flex items-center gap-2 text-sm">
            <GraduationCap className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">{lead.qualification}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">{lead.phoneNo}</span>
        </div>

        {lead.fees && (
          <div className="flex items-center gap-2 text-sm">
            <IndianRupee className="h-4 w-4 text-primary" />
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
                  <Label htmlFor="edit-qualification">Qualification</Label>
                  <Input
                    id="edit-qualification"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
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

                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: 'on_process' | 'positive' | 'completed') => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="on_process">On Process</SelectItem>
                      <SelectItem value="positive">Positive</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
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
