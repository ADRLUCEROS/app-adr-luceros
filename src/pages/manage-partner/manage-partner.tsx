import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Import } from "lucide-react";
import { importExcel } from "@/http/excel-service";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

export const ManagePartner = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Por favor selecciona un archivo Excel antes de importar.");
      return;
    }
    setLoading(true);
    try {
      const response = await importExcel(selectedFile);
      console.log(response)
      toast.success("Archivo importado exitosamente", {
        description: "Los datos se han importado correctamente.",
        richColors: true,
        closeButton: true,
        icon: "✅",
      });
    } catch (error) {
      console.error(error);
      toast.error("Error al importar el archivo", {
        description: "Hubo un problema al procesar el archivo. Por favor, inténtalo de nuevo.",
        richColors: true,
        closeButton: true,
        icon: "🚨",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-4 my-2 flex gap-2">
      <Input 
        type="file" 
        accept=".xls,.xlsx" 
        onChange={handleFileChange} 
        style={{ marginBottom: "10px" }}
      />
      <br />
      <Button 
        className="border-green-700 text-green-400 bg-green-950 hover:text-green-500"
        onClick={handleUpload}
        disabled={loading}
      >
        <Import />
        {loading ? "Importando..." : "Importar Excel"}
      </Button>
    </div>
  );
};
