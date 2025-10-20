import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import LeadForm from "@/components/LeadForm";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
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
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
            Lead Management System
          </h1>
          <p className="text-lg text-muted-foreground">
            Capture and organize your leads efficiently
          </p>
        </div>

        <LeadForm key={refreshKey} onLeadAdded={() => setRefreshKey((k) => k + 1)} />
      </div>
    </Layout>
  );
};

export default Index;
