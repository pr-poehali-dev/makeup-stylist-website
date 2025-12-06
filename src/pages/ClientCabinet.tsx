import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/Logo';

interface UserBooking {
  id: number;
  service: string;
  booking_date: string;
  booking_time: string;
  status: string;
}

export default function ClientCabinet() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [bookings, setBookings] = useState<UserBooking[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      navigate('/');
      return;
    }
    setUser(JSON.parse(savedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      pending: 'secondary',
      confirmed: 'default',
      cancelled: 'destructive',
      completed: 'outline'
    };
    
    const labels: Record<string, string> = {
      pending: 'Ожидает подтверждения',
      confirmed: 'Подтверждено',
      cancelled: 'Отменено',
      completed: 'Завершено'
    };

    return <Badge variant={variants[status] || 'default'}>{labels[status] || status}</Badge>;
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Logo size={40} className="text-accent" />
              <h1 className="text-2xl font-bold text-primary">Личный кабинет</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => navigate('/')}>
                <Icon name="Home" size={18} className="mr-2" />
                На главную
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <Icon name="LogOut" size={18} className="mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Профиль</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Имя</p>
                <p className="font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div className="pt-4">
                <Button className="w-full bg-accent hover:bg-accent/90" onClick={() => navigate('/')}>
                  Записаться на услугу
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Мои записи</CardTitle>
            </CardHeader>
            <CardContent>
              {bookings.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="Calendar" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground mb-4">У вас пока нет записей</p>
                  <Button onClick={() => navigate('/')} className="bg-accent hover:bg-accent/90">
                    Записаться на услугу
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <h3 className="font-semibold text-lg">{booking.service}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Icon name="Calendar" size={16} />
                                {new Date(booking.booking_date).toLocaleDateString('ru-RU')}
                              </div>
                              <div className="flex items-center gap-1">
                                <Icon name="Clock" size={16} />
                                {booking.booking_time}
                              </div>
                            </div>
                          </div>
                          {getStatusBadge(booking.status)}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
