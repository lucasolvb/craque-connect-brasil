import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, XCircle, MapPin, Calendar, Ruler, Weight, Zap } from "lucide-react";

const Perfil = () => {
  // Dados fictícios do usuário - substituir por dados reais do contexto/API
  const userData = {
    nome: "João Silva",
    email: "joao@email.com",
    dataNascimento: "15/03/2000",
    altura: "1.75m",
    peso: "70kg",
    pernaDominante: "Direita",
    habilidades: ["Velocidade", "Drible", "Finalização", "Passe"],
    localizacao: "São Paulo, SP",
    verificado: true,
    avatar: ""
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header do Perfil */}
        <Card>
          <CardHeader className="text-center">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={userData.avatar} />
                <AvatarFallback className="text-2xl font-bold">
                  {userData.nome.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{userData.nome}</CardTitle>
                <p className="text-muted-foreground">{userData.email}</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Informações Pessoais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Informações Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Data de Nascimento</label>
              <p className="text-lg">{userData.dataNascimento}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Localização</label>
              <p className="text-lg flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {userData.localizacao}
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Altura</label>
              <p className="text-lg flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                {userData.altura}
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Peso</label>
              <p className="text-lg flex items-center gap-2">
                <Weight className="w-4 h-4" />
                {userData.peso}
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Perna Dominante</label>
              <p className="text-lg flex items-center gap-2">
                <Zap className="w-4 h-4" />
                {userData.pernaDominante}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Habilidades */}
        <Card>
          <CardHeader>
            <CardTitle>Habilidades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {userData.habilidades.map((habilidade, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {habilidade}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Verificação de Identidade */}
        <Card>
          <CardHeader>
            <CardTitle>Verificação de Identidade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              {userData.verificado ? (
                <>
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <div>
                    <p className="font-medium text-green-700">Perfil Verificado</p>
                    <p className="text-sm text-muted-foreground">
                      Sua identidade foi verificada com sucesso
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6 text-red-500" />
                  <div>
                    <p className="font-medium text-red-700">Perfil Não Verificado</p>
                    <p className="text-sm text-muted-foreground">
                      Faça o upload de sua identidade para verificar seu perfil
                    </p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Perfil;