import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  TextInput, 
  PasswordInput, 
  Button, 
  Paper, 
  Title, 
  Text,
  Container,
  Stack,
  Alert,
  Box
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Receipt, Lock, User, AlertCircle } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(username, password);
      if (success) {
        notifications.show({
          title: 'Connexion réussie',
          message: 'Bienvenue sur RecuPro',
          color: 'green',
        });
        navigate('/dashboard');
      } else {
        setError('Identifiants incorrects');
      }
    } catch {
      setError('Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-60" />
      </div>

      <Container size={420} className="relative z-10">
        <Paper radius="lg" p="xl" withBorder shadow="xl" className="bg-white/95 backdrop-blur-sm">
          <Stack align="center" mb="lg">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
              <Receipt className="w-8 h-8 text-white" />
            </div>
            <div className="text-center">
              <Title order={2} className="text-gray-800">Gestion des Reçus</Title>
              <Text c="dimmed" size="sm" mt={4}>
                Connectez-vous pour accéder à votre espace
              </Text>
            </div>
          </Stack>

          {error && (
            <Alert icon={<AlertCircle size={16} />} color="red" mb="md" variant="light">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <TextInput
                label="Nom d'utilisateur"
                placeholder="Entrez votre nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                leftSection={<User size={16} />}
                required
                size="md"
              />

              <PasswordInput
                label="Mot de passe"
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftSection={<Lock size={16} />}
                required
                size="md"
              />

              <Button
                type="submit"
                fullWidth
                size="md"
                loading={isLoading}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                Se connecter
              </Button>
            </Stack>
          </form>

          <Box mt="lg" p="md" className="rounded-lg bg-gray-50 border border-gray-200">
            <Text size="xs" c="dimmed" ta="center">
              <span className="font-medium">Compte démo:</span><br />
              Utilisateur: <code className="bg-white px-1.5 py-0.5 rounded text-gray-700">admin</code><br />
              Mot de passe: <code className="bg-white px-1.5 py-0.5 rounded text-gray-700">admin123</code>
            </Text>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
