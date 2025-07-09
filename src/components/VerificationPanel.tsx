
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, ShieldCheck, ShieldX, FileText, AlertCircle, CheckCircle } from 'lucide-react';

interface VerificationPanelProps {
  isVerified: boolean;
  onVerificationSubmit: (file: File) => void;
}

const VerificationPanel: React.FC<VerificationPanelProps> = ({ 
  isVerified, 
  onVerificationSubmit 
}) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!uploadedFile) return;
    
    setIsSubmitting(true);
    try {
      await onVerificationSubmit(uploadedFile);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isVerified) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-green-800">
            <ShieldCheck className="h-5 w-5" />
            <span>Perfil Verificado</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 mb-2">
                Sua identidade foi verificada com sucesso!
              </p>
              <Badge className="bg-green-600 text-white">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verificado
              </Badge>
            </div>
            <div className="text-right">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                <ShieldCheck className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-red-200 bg-red-50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-red-800">
          <ShieldX className="h-5 w-5" />
          <span>Verificação de Identidade</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
          <div>
            <p className="text-sm text-red-700 mb-2">
              Seu perfil ainda não foi verificado. Faça o upload de um documento oficial 
              para validar sua identidade e idade.
            </p>
            <Badge variant="destructive">
              <ShieldX className="h-3 w-3 mr-1" />
              Não Verificado
            </Badge>
          </div>
        </div>

        <div className="border-2 border-dashed border-red-300 rounded-lg p-6 text-center">
          <FileText className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h3 className="font-semibold text-red-800 mb-2">
            Documentos Aceitos
          </h3>
          <ul className="text-sm text-red-700 mb-4 space-y-1">
            <li>• RG (Registro Geral)</li>
            <li>• CNH (Carteira de Motorista)</li>
            <li>• Passaporte</li>
            <li>• Certidão de Nascimento</li>
          </ul>

          <div className="space-y-3">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileUpload}
              className="hidden"
              id="verification-upload"
            />
            <label htmlFor="verification-upload">
              <Button 
                variant="outline" 
                className="border-red-600 text-red-600 hover:bg-red-50"
                asChild
              >
                <span className="cursor-pointer flex items-center space-x-2">
                  <Upload className="h-4 w-4" />
                  <span>Selecionar Documento</span>
                </span>
              </Button>
            </label>

            {uploadedFile && (
              <div className="text-sm text-red-700">
                <p>Arquivo selecionado: {uploadedFile.name}</p>
                <Button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="mt-2 bg-red-600 hover:bg-red-700"
                  size="sm"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar para Verificação'}
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="text-xs text-red-600 space-y-1">
          <p>• Seus documentos são tratados com total segurança</p>
          <p>• A verificação leva até 24 horas para ser processada</p>
          <p>• Perfis verificados têm maior visibilidade</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VerificationPanel;
