import { useState } from "react";
import Layout from "@/components/Layout";
import LeadForm from "@/components/LeadForm";

const Index = () => {
  const [refreshKey, setRefreshKey] = useState(0);

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
