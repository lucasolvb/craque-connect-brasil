
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Eye, MapPin, Calendar, User, Play, Shield, ShieldCheck, ShieldX } from 'lucide-react';
import { JogadorProfile } from '@/lib/auth';

interface PlayerCardProps {
  player: JogadorProfile;
  onView?: () => void;
  onFavorite?: () => void;
  isFavorited?: boolean;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ 
  player, 
  onView, 
  onFavorite, 
  isFavorited = false 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const age = new Date().getFullYear() - new Date(player.dataNascimento).getFullYear();

  // Skills icons mapping
  const skillIcons: { [key: string]: string } = {
    'velocidade': '⚡',
    'finalização': '🎯',
    'passe': '⚽',
    'drible': '🔄',
    'cabeceio': '🏐',
    'defesa': '🛡️',
    'força': '💪',
    'técnica': '✨'
  };

  // Calculate talent level based on age and skills
  const talentLevel = Math.min(100, (player.habilidades.length * 15) + (age < 18 ? 20 : age < 21 ? 15 : 10));

  const getTalentColor = (level: number) => {
    if (level >= 80) return 'bg-green-500';
    if (level >= 60) return 'bg-yellow-500';
    if (level >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-0 shadow-lg transform hover:-translate-y-2 bg-white">
      <div className="relative">
        {/* Player Image/Video Preview */}
        <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 relative overflow-hidden">
          {player.videos && player.videos.length > 0 ? (
            <div className="relative w-full h-full">
              {!isPlaying ? (
                <>
                  <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2 cursor-pointer hover:bg-green-700 transition-colors"
                           onClick={handleVideoPlay}>
                        <Play className="h-8 w-8 text-white ml-1" />
                      </div>
                      <p className="text-white text-sm">Clique para assistir</p>
                    </div>
                  </div>
                </>
              ) : (
                <video 
                  src={player.videos[0]} 
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                />
              )}
            </div>
          ) : player.avatar ? (
            <img 
              src={player.avatar} 
              alt={player.nomeCompleto}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-green-600" />
              </div>
            </div>
          )}
          
          {/* Overlay com ações */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button 
                size="sm" 
                className="bg-white text-green-600 hover:bg-gray-100 shadow-lg"
                onClick={onView}
              >
                <Eye className="h-4 w-4 mr-1" />
                Ver Perfil
              </Button>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="absolute top-3 left-3">
            {player.isVerified ? (
              <Badge className="bg-green-600 text-white flex items-center space-x-1">
                <ShieldCheck className="h-3 w-3" />
                <span className="text-xs">Verificado</span>
              </Badge>
            ) : (
              <Badge variant="destructive" className="flex items-center space-x-1">
                <ShieldX className="h-3 w-3" />
                <span className="text-xs">Não Verificado</span>
              </Badge>
            )}
          </div>

          {/* Favorite Button */}
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white shadow-lg"
            onClick={onFavorite}
          >
            <Heart 
              className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
            />
          </Button>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Player Info Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center overflow-hidden">
                {player.avatar ? (
                  <img 
                    src={player.avatar} 
                    alt={player.nomeCompleto}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="h-8 w-8 text-green-600" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-1">
                  {player.nomeCompleto}
                </h3>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800 font-medium">
                    {player.posicaoPrincipal}
                  </Badge>
                  <span className="text-sm text-gray-500">{age} anos</span>
                </div>
              </div>
            </div>
          </div>

          {/* Talent Level Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 font-medium">Nível de Talento</span>
              <span className="font-bold">{talentLevel}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${getTalentColor(talentLevel)}`}
                style={{ width: `${talentLevel}%` }}
              ></div>
            </div>
          </div>

          {/* Location & Details */}
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-green-600" />
              <span>{player.cidade}, {player.estado}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium mr-2 text-green-600">⚽</span>
              <span>Pé {player.pernaHabil}</span>
            </div>
            {player.altura && player.peso && (
              <div className="flex items-center space-x-4">
                <span>📏 {player.altura}cm</span>
                <span>⚖️ {player.peso}kg</span>
              </div>
            )}
          </div>

          {/* Skills */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Principais habilidades:</p>
            <div className="flex flex-wrap gap-2">
              {player.habilidades.slice(0, 4).map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs py-1 px-2 border-green-200 text-green-700 bg-green-50 hover:bg-green-100 transition-colors"
                >
                  <span className="mr-1">{skillIcons[skill.toLowerCase()] || '⭐'}</span>
                  {skill}
                </Badge>
              ))}
              {player.habilidades.length > 4 && (
                <Badge variant="outline" className="text-xs py-1 px-2 border-gray-200">
                  +{player.habilidades.length - 4} mais
                </Badge>
              )}
            </div>
          </div>

          {/* Bio */}
          {player.bio && (
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {player.bio}
            </p>
          )}

          {/* Video Count */}
          {player.videos && player.videos.length > 0 && (
            <div className="flex items-center text-sm text-green-600">
              <Play className="h-4 w-4 mr-1" />
              <span>{player.videos.length} vídeo{player.videos.length > 1 ? 's' : ''} disponível</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button 
              size="sm" 
              className="flex-1 bg-green-600 hover:bg-green-700 font-medium transition-all duration-200 transform hover:scale-105"
              onClick={onView}
            >
              Ver Perfil Completo
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50 transition-all duration-200 transform hover:scale-105"
              onClick={onFavorite}
            >
              <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerCard;
