import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import LeadCard from "@/components/LeadCard";
import { getLeads } from "@/utils/storage";
import { Lead } from "@/types/lead";
import { Users, Loader2, Search, RefreshCw, Plus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const loadLeads = async () => {
    try {
      setLoading(true);
      const data = await getLeads();
      setLeads(data);
    } catch (error) {
      console.error("Error loading leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    } else if (user) {
      loadLeads();
    }
  }, [user, authLoading, navigate]);

  const filteredLeads = leads.filter((lead) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = (
      lead.name.toLowerCase().includes(query) ||
      lead.phoneNo.includes(query) ||
      lead.coursePreferred.toLowerCase().includes(query) ||
      lead.location.toLowerCase().includes(query) ||
      (lead.qualification && lead.qualification.toLowerCase().includes(query))
    );
    
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getLeadCountByStatus = (status: string) => {
    if (status === "all") return leads.length;
    return leads.filter(lead => lead.status === status).length;
  };

  if (authLoading || loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
          
          <div className="flex gap-2">
            <Button
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Lead</span>
            </Button>
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button
              onClick={loadLeads}
              variant="outline"
              size="icon"
              className="shrink-0"
              title="Refresh leads"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="sr-only">Refresh</span>
            </Button>
          </div>
        </div>

        <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              All Leads ({getLeadCountByStatus("all")})
            </TabsTrigger>
            <TabsTrigger value="on_process">
              On Process ({getLeadCountByStatus("on_process")})
            </TabsTrigger>
            <TabsTrigger value="positive">
              Positives ({getLeadCountByStatus("positive")})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({getLeadCountByStatus("completed")})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={statusFilter} className="mt-6">
            {filteredLeads.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 p-12 text-center">
                <Users className="h-16 w-16 text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {searchQuery ? "No leads found" : "No leads yet"}
                </h3>
                <p className="text-muted-foreground max-w-md">
                  {searchQuery
                    ? "Try adjusting your search query to find what you're looking for."
                    : "Start adding leads from the home page to see them here. Your lead cards will appear in a beautiful grid layout."}
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredLeads.map((lead) => (
                  <LeadCard key={lead.id} lead={lead} onUpdate={loadLeads} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Leads;
