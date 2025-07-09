
import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Upload, X, Play, CheckCircle, AlertCircle } from 'lucide-react';

interface VideoUploadProps {
  onUpload: (videoUrl: string, thumbnail?: string) => void;
  onRemove: () => void;
  videoUrl?: string;
  label?: string;
  maxSize?: number; // in MB
  maxDuration?: number; // in seconds
}

const VideoUpload: React.FC<VideoUploadProps> = ({ 
  onUpload, 
  onRemove, 
  videoUrl, 
  label = "Upload de Vídeo",
  maxSize = 100,
  maxDuration = 60
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [validationStatus, setValidationStatus] = useState<'idle' | 'validating' | 'valid' | 'invalid'>('idle');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const validateVideo = useCallback(async (file: File): Promise<boolean> => {
    setValidationStatus('validating');
    setError(null);

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`Arquivo muito grande. Máximo permitido: ${maxSize}MB`);
      setValidationStatus('invalid');
      return false;
    }

    // Check file type
    if (!file.type.startsWith('video/')) {
      setError('Formato de arquivo não suportado. Use apenas vídeos.');
      setValidationStatus('invalid');
      return false;
    }

    // Create video element to check duration
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      
      video.onloadedmetadata = () => {
        if (video.duration > maxDuration) {
          setError(`Vídeo muito longo. Máximo permitido: ${maxDuration} segundos`);
          setValidationStatus('invalid');
          resolve(false);
        } else {
          setValidationStatus('valid');
          resolve(true);
        }
      };

      video.onerror = () => {
        setError('Erro ao validar o vídeo');
        setValidationStatus('invalid');
        resolve(false);
      };

      video.src = URL.createObjectURL(file);
    });
  }, [maxSize, maxDuration]);

  const generateThumbnail = useCallback((videoFile: File): Promise<string> => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      video.onloadedmetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        video.currentTime = Math.min(2, video.duration / 2); // Thumbnail at 2s or middle
      };

      video.onseeked = () => {
        if (ctx) {
          ctx.drawImage(video, 0, 0);
          const thumbnail = canvas.toDataURL('image/jpeg', 0.8);
          resolve(thumbnail);
        }
      };

      video.src = URL.createObjectURL(videoFile);
    });
  }, []);

  const simulateUpload = useCallback(async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Generate thumbnail
    const thumbnail = await generateThumbnail(file);
    
    // Complete upload simulation
    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      
      const videoUrl = URL.createObjectURL(file);
      onUpload(videoUrl, thumbnail);
      
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
        setPreviewVideo(null);
      }, 1000);
    }, 1500);
  }, [onUpload, generateThumbnail]);

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    setPreviewVideo(URL.createObjectURL(file));
    
    const isValid = await validateVideo(file);
    if (isValid) {
      await simulateUpload(file);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Show uploaded video
  if (videoUrl && !isUploading) {
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
            <p className="text-sm text-gray-600 flex items-center">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
              {label} - Upload concluído
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show upload progress
  if (isUploading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Fazendo upload...
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {uploadProgress < 100 ? 'Enviando seu vídeo' : 'Finalizando...'}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progresso</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>

            {previewVideo && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                <video 
                  ref={videoRef}
                  src={previewVideo} 
                  className="w-full h-32 object-cover rounded-lg"
                  muted
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show upload area
  return (
    <Card 
      className={`border-2 border-dashed transition-all duration-200 cursor-pointer ${
        isDragging 
          ? 'border-green-500 bg-green-50 scale-105' 
          : 'border-gray-300 hover:border-green-400 hover:bg-gray-50'
      } ${error ? 'border-red-300 bg-red-50' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => fileInputRef.current?.click()}
    >
      <CardContent className="p-8">
        <div className="text-center space-y-4">
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${
            error ? 'bg-red-100' : 'bg-gray-100'
          }`}>
            {validationStatus === 'validating' ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            ) : error ? (
              <AlertCircle className="h-8 w-8 text-red-500" />
            ) : validationStatus === 'valid' ? (
              <CheckCircle className="h-8 w-8 text-green-600" />
            ) : (
              <Upload className="h-8 w-8 text-gray-400" />
            )}
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {label}
            </h3>
            
            {error ? (
              <p className="text-sm text-red-600 mb-4">{error}</p>
            ) : validationStatus === 'validating' ? (
              <p className="text-sm text-blue-600 mb-4">Validando vídeo...</p>
            ) : validationStatus === 'valid' ? (
              <p className="text-sm text-green-600 mb-4">Vídeo válido! Clique para fazer upload.</p>
            ) : isDragging ? (
              <p className="text-sm text-green-600 mb-4">Solte o vídeo aqui!</p>
            ) : (
              <>
                <p className="text-sm text-gray-600 mb-4">
                  Arraste um vídeo aqui ou clique para selecionar
                </p>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">
                    Formatos: MP4, MOV, AVI, WebM
                  </p>
                  <p className="text-xs text-gray-500">
                    Máximo: {maxDuration}s • Até {maxSize}MB
                  </p>
                </div>
              </>
            )}
          </div>

          <Button 
            type="button" 
            variant="outline"
            className={validationStatus === 'valid' ? 'border-green-600 text-green-600 hover:bg-green-50' : ''}
            disabled={validationStatus === 'validating'}
          >
            {validationStatus === 'validating' ? 'Validando...' : 'Selecionar Vídeo'}
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
