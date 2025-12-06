import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const services = [
  { value: 'wedding', label: 'Свадебный макияж', price: 8000 },
  { value: 'evening', label: 'Вечерний макияж', price: 4500 },
  { value: 'daily', label: 'Дневной макияж', price: 3000 },
  { value: 'hair', label: 'Укладка волос', price: 3500 },
  { value: 'photo', label: 'Образ для фотосессии', price: 5000 },
  { value: 'training', label: 'Обучение макияжу', price: 6000 }
];

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', 
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
];

export default function BookingDialog({ open, onOpenChange }: BookingDialogProps) {
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedService || !selectedDate || !selectedTime || !name || !phone) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, заполните все обязательные поля',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Заявка отправлена!',
      description: 'Мы свяжемся с вами в ближайшее время для подтверждения записи.',
    });

    onOpenChange(false);
    setSelectedService('');
    setSelectedDate(undefined);
    setSelectedTime('');
    setName('');
    setPhone('');
    setEmail('');
  };

  const selectedServiceData = services.find(s => s.value === selectedService);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-light">Онлайн-запись</DialogTitle>
          <DialogDescription>
            Выберите услугу, дату и время, и мы свяжемся с вами для подтверждения
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="service">Услуга *</Label>
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите услугу" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.value} value={service.value}>
                    {service.label} — от {service.price.toLocaleString()} ₽
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Дата *</Label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date()}
              className="rounded-md border"
            />
          </div>

          {selectedDate && (
            <div className="space-y-2">
              <Label htmlFor="time">Время *</Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите время" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Ваше имя *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Анна"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Телефон *</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 (999) 123-45-67"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="anna@example.com"
            />
          </div>

          {selectedServiceData && (
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Выбранная услуга:</p>
              <p className="font-medium">{selectedServiceData.label}</p>
              <p className="text-lg text-accent font-light mt-2">
                от {selectedServiceData.price.toLocaleString()} ₽
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <Button type="submit" className="flex-1 bg-accent hover:bg-accent/90">
              Отправить заявку
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Отмена
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
