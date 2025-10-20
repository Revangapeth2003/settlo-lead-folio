import { Lead } from "@/types/lead";
import { supabase } from "@/integrations/supabase/client";

export const getLeads = async (): Promise<Lead[]> => {
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  
  return data.map(lead => ({
    id: lead.id,
    name: lead.name,
    age: lead.age,
    location: lead.location,
    coursePreferred: lead.course_preferred,
    qualification: lead.qualification || "",
    queries: lead.queries || "",
    phoneNo: lead.phone_no,
    fees: lead.fees,
    date: lead.date,
  }));
};

export const addLead = async (lead: Omit<Lead, "id">): Promise<Lead> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("leads")
    .insert({
      user_id: user.id,
      name: lead.name,
      age: lead.age,
      location: lead.location,
      course_preferred: lead.coursePreferred,
      qualification: lead.qualification,
      queries: lead.queries,
      phone_no: lead.phoneNo,
      fees: lead.fees,
      date: lead.date,
    })
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    name: data.name,
    age: data.age,
    location: data.location,
    coursePreferred: data.course_preferred,
    qualification: data.qualification || "",
    queries: data.queries || "",
    phoneNo: data.phone_no,
    fees: data.fees,
    date: data.date,
  };
};

export const updateLead = async (id: string, updatedLead: Omit<Lead, "id">): Promise<void> => {
  const { error } = await supabase
    .from("leads")
    .update({
      name: updatedLead.name,
      age: updatedLead.age,
      location: updatedLead.location,
      course_preferred: updatedLead.coursePreferred,
      qualification: updatedLead.qualification,
      queries: updatedLead.queries,
      phone_no: updatedLead.phoneNo,
      fees: updatedLead.fees,
      date: updatedLead.date,
    })
    .eq("id", id);

  if (error) throw error;
};

export const deleteLead = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("leads")
    .delete()
    .eq("id", id);

  if (error) throw error;
};
