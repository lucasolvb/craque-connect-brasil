
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface BrazilMapProps {
  selectedState: string;
  onStateSelect: (state: string) => void;
  onClose: () => void;
}

const states = [
  { code: 'AC', name: 'Acre', x: 15, y: 45 },
  { code: 'AL', name: 'Alagoas', x: 75, y: 35 },
  { code: 'AP', name: 'Amapá', x: 60, y: 15 },
  { code: 'AM', name: 'Amazonas', x: 25, y: 30 },
  { code: 'BA', name: 'Bahia', x: 70, y: 40 },
  { code: 'CE', name: 'Ceará', x: 75, y: 25 },
  { code: 'DF', name: 'Distrito Federal', x: 60, y: 50 },
  { code: 'ES', name: 'Espírito Santo', x: 75, y: 60 },
  { code: 'GO', name: 'Goiás', x: 60, y: 50 },
  { code: 'MA', name: 'Maranhão', x: 65, y: 25 },
  { code: 'MT', name: 'Mato Grosso', x: 45, y: 50 },
  { code: 'MS', name: 'Mato Grosso do Sul', x: 45, y: 60 },
  { code: 'MG', name: 'Minas Gerais', x: 65, y: 60 },
  { code: 'PA', name: 'Pará', x: 50, y: 25 },
  { code: 'PB', name: 'Paraíba', x: 80, y: 30 },
  { code: 'PR', name: 'Paraná', x: 55, y: 75 },
  { code: 'PE', name: 'Pernambuco', x: 75, y: 30 },
  { code: 'PI', name: 'Piauí', x: 70, y: 30 },
  { code: 'RJ', name: 'Rio de Janeiro', x: 70, y: 65 },
  { code: 'RN', name: 'Rio Grande do Norte', x: 80, y: 25 },
  { code: 'RS', name: 'Rio Grande do Sul', x: 50, y: 85 },
  { code: 'RO', name: 'Rondônia', x: 30, y: 45 },
  { code: 'RR', name: 'Roraima', x: 40, y: 10 },
  { code: 'SC', name: 'Santa Catarina', x: 55, y: 80 },
  { code: 'SP', name: 'São Paulo', x: 60, y: 70 },
  { code: 'SE', name: 'Sergipe', x: 75, y: 35 },
  { code: 'TO', name: 'Tocantins', x: 60, y: 40 }
];

const BrazilMap: React.FC<BrazilMapProps> = ({ selectedState, onStateSelect, onClose }) => {
  return (
    <Card className="fixed inset-4 z-50 bg-white shadow-2xl md:inset-8 lg:inset-16">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Selecione um Estado</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative w-full h-96 bg-gradient-to-b from-blue-50 to-green-50 rounded-lg overflow-hidden">
          {/* Simplified Brazil outline */}
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d="M20 20 L80 15 L85 25 L90 35 L85 50 L80 65 L75 80 L60 85 L45 80 L35 70 L25 55 L15 40 Z"
              fill="rgba(34, 197, 94, 0.1)"
              stroke="rgba(34, 197, 94, 0.3)"
              strokeWidth="0.5"
            />
          </svg>
          
          {/* State markers */}
          {states.map((state) => (
            <button
              key={state.code}
              className={`absolute w-8 h-8 rounded-full border-2 text-xs font-bold transition-all duration-200 transform -translate-x-1/2 -translate-y-1/2 ${
                selectedState === state.code
                  ? 'bg-green-600 text-white border-green-600 scale-110'
                  : 'bg-white text-green-600 border-green-600 hover:bg-green-50 hover:scale-105'
              }`}
              style={{
                left: `${state.x}%`,
                top: `${state.y}%`
              }}
              onClick={() => onStateSelect(state.code)}
              title={state.name}
            >
              {state.code}
            </button>
          ))}
        </div>
        
        {/* State grid for mobile */}
        <div className="mt-6 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-2">
          {states.map((state) => (
            <Button
              key={state.code}
              variant={selectedState === state.code ? "default" : "outline"}
              size="sm"
              onClick={() => onStateSelect(state.code)}
              className="text-xs"
            >
              {state.code}
            </Button>
          ))}
        </div>
        
        {selectedState && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800">
              Estado selecionado: <strong>{states.find(s => s.code === selectedState)?.name}</strong>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BrazilMap;
