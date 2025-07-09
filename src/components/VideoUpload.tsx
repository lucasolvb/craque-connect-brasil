
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, Play } from 'lucide-react';

interface VideoUploadProps {
  onUpload: (videoUrl: string) => void;
  onRemove: () => void;
  videoUrl?: string;
  label?: string;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ 
  onUpload, 
  onRemove, 
  videoUrl, 
  label = "Upload de Vídeo" 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith('video/')) {
      // Simula upload - em produção, enviaria para servidor/storage
      const mockUrl = URL.createObjectURL(file);
      onUpload(mockUrl);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  if (videoUrl) {
    return (
      <Card className="relative overflow-hidden">
        <CardContent className="p-0">
          <div className="relative aspect-video bg-gray-900">
            <video 
              src={videoUrl} 
              className="w-full h-full object-cover" 
              controls
              preload="metadata"
            />
            <Button
              size="sm"
              variant="destructive"
              className="absolute top-2 right-2"
              onClick={onRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-3 bg-white">
            <p className="text-sm text-gray-600">{label}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className={`border-2 border-dashed transition-colors cursor-pointer ${
        isDragging 
          ? 'border-green-500 bg-green-50' 
          : 'border-gray-300 hover:border-green-400'
      }`}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onClick={() => fileInputRef.current?.click()}
    >
      <CardContent className="p-8">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <Upload className="h-8 w-8 text-gray-400" />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {label}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Arraste um vídeo aqui ou clique para selecionar
            </p>
            <p className="text-xs text-gray-500">
              Formatos: MP4, MOV, AVI • Máximo: 1 minuto • Até 100MB
            </p>
          </div>

          <Button type="button" variant="outline">
            Selecionar Vídeo
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </CardContent>
    </Card>
  );
};

export default VideoUpload;
