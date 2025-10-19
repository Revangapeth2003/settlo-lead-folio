import { Lead } from "@/types/lead";

const STORAGE_KEY = "settlo_leads";

export const getLeads = (): Lead[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveLeads = (leads: Lead[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
};

export const addLead = (lead: Omit<Lead, "id">): Lead => {
  const leads = getLeads();
  const newLead: Lead = {
    ...lead,
    id: crypto.randomUUID(),
  };
  leads.push(newLead);
  saveLeads(leads);
  return newLead;
};

export const updateLead = (id: string, updatedLead: Omit<Lead, "id">): void => {
  const leads = getLeads();
  const index = leads.findIndex((lead) => lead.id === id);
  if (index !== -1) {
    leads[index] = { ...updatedLead, id };
    saveLeads(leads);
  }
};

export const deleteLead = (id: string): void => {
  const leads = getLeads();
  const filtered = leads.filter((lead) => lead.id !== id);
  saveLeads(filtered);
};
