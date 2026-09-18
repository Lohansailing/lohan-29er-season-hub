"use client";

import { FileText, LockKeyhole, Sailboat, School, ShieldCheck, Users } from "lucide-react";
import { useHub } from "@/components/data-provider";
import { Card, PageHeader, Pill, SectionTitle } from "@/components/ui";
import { formatDate } from "@/lib/format";

const visibility = {
  private: { label: "Privé", icon: LockKeyhole },
  crew: { label: "Équipage", icon: Sailboat },
  coach: { label: "Coach", icon: ShieldCheck },
  parents: { label: "Parents", icon: Users }
};

export default function DocumentsPage() {
  const { state } = useHub();
  return (
    <div className="page">
      <PageHeader eyebrow="Documents & médias" title="Bibliothèque" description="Les documents utiles de la saison, avec une visibilité explicite." />
      <SectionTitle>Fichiers récents</SectionTitle>
      <Card className="file-list">
        {state.documents.map((doc) => {
          const VisIcon = visibility[doc.visibility].icon;
          return (
            <div className="file-row" key={doc.id}>
              <div className="file-icon"><FileText size={20} /></div>
              <div className="grow"><strong>{doc.title}</strong><p>{doc.category} · mis à jour {formatDate(doc.updatedAt)}</p></div>
              <Pill><VisIcon size={13} /> {visibility[doc.visibility].label}</Pill>
            </div>
          );
        })}
      </Card>
      <Card className="empty-upload">
        <School size={24} /><div><strong>Stockage objet à connecter</strong><p>Le MVP inclut la structure documentaire. Le stockage Supabase/S3 sera activé avec les clés d'environnement.</p></div>
      </Card>
    </div>
  );
}
