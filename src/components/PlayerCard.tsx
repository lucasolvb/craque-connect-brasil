
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Eye, MapPin, Calendar, User } from 'lucide-react';
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
  const age = new Date().getFullYear() - new Date(player.dataNascimento).getFullYear();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative">
        {/* Player Image/Video Preview */}
        <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 relative overflow-hidden">
          {player.avatar ? (
            <img 
              src={player.avatar} 
              alt={player.nomeCompleto}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="h-16 w-16 text-gray-400" />
            </div>
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button 
                size="sm" 
                className="bg-white text-green-600 hover:bg-gray-100"
                onClick={onView}
              >
                <Eye className="h-4 w-4 mr-1" />
                Ver Perfil
              </Button>
            </div>
          </div>

          {/* Favorite Button */}
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-2 right-2 p-2 bg-white bg-opacity-80 hover:bg-opacity-100"
            onClick={onFavorite}
          >
            <Heart 
              className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
            />
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Player Name & Position */}
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-1">
              {player.nomeCompleto}
            </h3>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {player.posicaoPrincipal}
            </Badge>
          </div>

          {/* Player Info */}
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{player.cidade}, {player.estado}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{age} anos</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium mr-2">⚽</span>
              <span>Pé {player.pernaHabil}</span>
            </div>
          </div>

          {/* Skills */}
          <div>
            <p className="text-xs text-gray-500 mb-2">Principais habilidades:</p>
            <div className="flex flex-wrap gap-1">
              {player.habilidades.slice(0, 3).map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs py-0 px-2"
                >
                  {skill}
                </Badge>
              ))}
              {player.habilidades.length > 3 && (
                <Badge variant="outline" className="text-xs py-0 px-2">
                  +{player.habilidades.length - 3}
                </Badge>
              )}
            </div>
          </div>

          {/* Bio */}
          {player.bio && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {player.bio}
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button 
              size="sm" 
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={onView}
            >
              Ver Perfil Completo
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerCard;
