import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import Logo from '@/components/Logo';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === 'admin_ekaterina' && password === 'ES_Beauty_2025!') {
      const token = 'admin_' + Date.now();
      localStorage.setItem('adminToken', token);
      
      toast({
        title: 'Добро пожаловать!',
        description: 'Вы успешно вошли в админ-панель'
      });
      
      navigate('/admin/panel');
    } else {
      toast({
        title: 'Ошибка входа',
        description: 'Неверный логин или пароль',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Logo size={60} className="text-accent" />
          </div>
          <CardTitle className="text-3xl font-light">Админ-панель</CardTitle>
          <CardDescription>Вход для администратора</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Логин</Label>
              <div className="relative">
                <Icon name="User" size={18} className="absolute left-3 top-3 text-muted-foreground" />
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin_ekaterina"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <div className="relative">
                <Icon name="Lock" size={18} className="absolute left-3 top-3 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10"
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
              Войти в панель
            </Button>

            <div className="text-center pt-4">
              <Button
                type="button"
                variant="link"
                onClick={() => navigate('/')}
                className="text-sm text-muted-foreground"
              >
                ← Вернуться на главную
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
