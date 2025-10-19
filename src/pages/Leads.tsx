import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import LeadCard from "@/components/LeadCard";
import { getLeads } from "@/utils/storage";
import { Lead } from "@/types/lead";
import { Users } from "lucide-react";

const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);

  const loadLeads = () => {
    setLeads(getLeads());
  };

  useEffect(() => {
    loadLeads();
  }, []);

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-hover text-primary-foreground">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">All Leads</h1>
            <p className="text-muted-foreground">
              {leads.length} {leads.length === 1 ? "lead" : "leads"} in your pipeline
            </p>
          </div>
        </div>

        {leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 p-12 text-center">
            <Users className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No leads yet</h3>
            <p className="text-muted-foreground max-w-md">
              Start adding leads from the home page to see them here. Your lead cards will appear in a beautiful grid layout.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} onUpdate={loadLeads} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Leads;
