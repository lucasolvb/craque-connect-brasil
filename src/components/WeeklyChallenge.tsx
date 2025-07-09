
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Target, Video, Award } from 'lucide-react';

interface WeeklyChallengeProps {
  title: string;
  description: string;
  progress: number;
  reward: string;
  deadline: string;
}

const WeeklyChallenge = ({
  title = "Mostre Seus Dribles",
  description = "Adicione um vídeo mostrando suas melhores jogadas de drible",
  progress = 60,
  reward = "+200 pontos + Badge Habilidoso",
  deadline = "3 dias restantes"
}: WeeklyChallengeProps) => {
  return (
    <Card className="bg-white border-0 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
            <Target className="h-5 w-5 mr-2 text-yellow-600" />
            Desafio da Semana
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            {deadline}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Progresso</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
          <div className="flex items-center text-yellow-800">
            <Award className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Recompensa: {reward}</span>
          </div>
        </div>

        {progress < 100 && (
          <div className="flex items-center justify-center py-2">
            <div className="flex items-center text-green-600 text-sm font-medium">
              <Video className="h-4 w-4 mr-1" />
              Adicionar Vídeo de Drible
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeeklyChallenge;
