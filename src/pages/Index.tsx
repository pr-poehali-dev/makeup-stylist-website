import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import BookingDialog from '@/components/BookingDialog';
import AuthDialog from '@/components/AuthDialog';
import { Toaster } from '@/components/ui/toaster';
import Logo from '@/components/Logo';

const services = [
  {
    title: 'Свадебный макияж',
    description: 'Роскошный образ для вашего особенного дня',
    price: 'от 8 000 ₽',
    duration: '2-3 часа',
    includes: ['Консультация', 'Пробный макияж', 'Макияж в день свадьбы', 'Коррекция в течение дня']
  },
  {
    title: 'Вечерний макияж',
    description: 'Элегантный образ для торжественных мероприятий',
    price: 'от 4 500 ₽',
    duration: '1.5 часа',
    includes: ['Консультация по образу', 'Подбор косметики', 'Профессиональный макияж', 'Рекомендации по уходу']
  },
  {
    title: 'Дневной макияж',
    description: 'Естественный образ на каждый день',
    price: 'от 3 000 ₽',
    duration: '1 час',
    includes: ['Подготовка кожи', 'Легкий макияж', 'Оформление бровей', 'Укладка']
  },
  {
    title: 'Укладка волос',
    description: 'Профессиональные прически для любого случая',
    price: 'от 3 500 ₽',
    duration: '1-2 часа',
    includes: ['Консультация', 'Подбор прически', 'Укладка', 'Фиксация стайлингом']
  },
  {
    title: 'Образ для фотосессии',
    description: 'Идеальный образ для съемки',
    price: 'от 5 000 ₽',
    duration: '2 часа',
    includes: ['Макияж для фото', 'Укладка волос', 'Коррекция во время съемки', 'Работа на локации']
  },
  {
    title: 'Обучение макияжу',
    description: 'Индивидуальный мастер-класс',
    price: 'от 6 000 ₽',
    duration: '3 часа',
    includes: ['Теория макияжа', 'Подбор косметики', 'Практика', 'Методические материалы']
  }
];

const portfolioItems = [
  { id: 1, category: 'Свадебный', image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80' },
  { id: 2, category: 'Вечерний', image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80' },
  { id: 3, category: 'Естественный', image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80' },
  { id: 4, category: 'Прически', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80' },
  { id: 5, category: 'Фотосессия', image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80' },
  { id: 6, category: 'Креативный', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80' }
];

const testimonials = [
  {
    name: 'Анна Петрова',
    text: 'Невероятный профессионализм! Макияж держался весь день, я чувствовала себя королевой на своей свадьбе.',
    rating: 5
  },
  {
    name: 'Мария Соколова',
    text: 'Спасибо за волшебный образ! Все гости спрашивали, кто делал макияж. Обязательно вернусь снова.',
    rating: 5
  },
  {
    name: 'Елена Иванова',
    text: 'Мастер с золотыми руками! Прислушивается к пожеланиям и создает идеальный образ. Рекомендую!',
    rating: 5
  }
];

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  const handleAuthSuccess = (userData: { name: string; email: string }) => {
    setUser(userData);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm z-50 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Logo size={40} className="text-accent" />
              <h1 className="text-2xl font-bold text-primary">Екатерина Сергеевна</h1>
            </div>
            <div className="hidden md:flex gap-8">
              {['home', 'portfolio', 'services', 'about', 'reviews', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm uppercase tracking-wider transition-colors hover:text-accent ${
                    activeSection === section ? 'text-accent' : 'text-foreground'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'portfolio' && 'Портфолио'}
                  {section === 'services' && 'Услуги'}
                  {section === 'about' && 'О мастере'}
                  {section === 'reviews' && 'Отзывы'}
                  {section === 'contacts' && 'Контакты'}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3">
                  <Button size="sm" variant="outline" onClick={() => navigate('/cabinet')}>
                    <Icon name="User" size={16} className="mr-2" />
                    {user.name}
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleLogout}>
                    Выйти
                  </Button>
                </div>
              ) : (
                <Button size="sm" variant="outline" onClick={() => setAuthOpen(true)}>
                  Войти
                </Button>
              )}
              <Button size="sm" className="bg-accent hover:bg-accent/90" onClick={() => setBookingOpen(true)}>
                Записаться
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-6xl md:text-7xl font-light mb-6 text-primary leading-tight">
                Искусство<br />красоты
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Профессиональный визажист и стилист по причёскам. Создаю образы, которые подчёркивают вашу естественную красоту и индивидуальность.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-accent hover:bg-accent/90" onClick={() => setBookingOpen(true)}>
                  Записаться онлайн
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('portfolio')}>
                  Портфолио
                </Button>
              </div>
            </div>
            <div className="animate-scale-in">
              <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <Icon name="User" size={120} className="opacity-20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl font-light text-center mb-4 text-primary">Портфолио</h2>
          <p className="text-center text-muted-foreground mb-12">Мои работы и созданные образы</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((item, index) => (
              <div
                key={item.id}
                className="group relative aspect-[3/4] bg-muted rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img 
                  src={item.image} 
                  alt={item.category}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white text-lg font-light">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl font-light text-center mb-4 text-primary">Услуги</h2>
          <p className="text-center text-muted-foreground mb-12">Профессиональные услуги визажа и стилистики</p>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-border">
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-semibold text-primary">{service.title}</h3>
                    <div className="text-right">
                      <p className="text-2xl font-light text-accent">{service.price}</p>
                      <p className="text-sm text-muted-foreground">{service.duration}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">В стоимость входит:</p>
                    {service.includes.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="Check" size={16} className="text-accent" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-2">
              <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <Icon name="User" size={100} className="opacity-20 text-muted-foreground" />
                </div>
              </div>
            </div>
            <div className="md:col-span-3">
              <h2 className="text-5xl font-light mb-6 text-primary">О мастере</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Профессиональный визажист и стилист по причёскам с более чем 8-летним опытом работы. Моя страсть — создавать образы, которые подчёркивают природную красоту и индивидуальность каждого клиента.
                </p>
                <p>
                  Я работаю с лучшими косметическими брендами и постоянно совершенствую свои навыки, посещая международные мастер-классы и обучения. Каждый образ — это уникальное произведение искусства, созданное специально для вас.
                </p>
                <div className="pt-4 space-y-2">
                  <div className="flex items-center gap-3">
                    <Icon name="Award" size={20} className="text-accent" />
                    <span>Сертифицированный специалист</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Star" size={20} className="text-accent" />
                    <span>Более 500 довольных клиентов</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Heart" size={20} className="text-accent" />
                    <span>Индивидуальный подход к каждому</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl font-light text-center mb-4 text-primary">Отзывы</h2>
          <p className="text-center text-muted-foreground mb-12">Что говорят мои клиенты</p>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={18} className="fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                  <p className="font-medium text-primary">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-5xl font-light mb-6 text-primary">Контакты</h2>
          <p className="text-muted-foreground mb-12 text-lg">Свяжитесь со мной для записи или консультации</p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                <Icon name="Phone" size={28} className="text-accent" />
              </div>
              <p className="text-foreground font-medium">+7 (999) 123-45-67</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                <Icon name="Mail" size={28} className="text-accent" />
              </div>
              <p className="text-foreground font-medium">elena@stylist.ru</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                <Icon name="MapPin" size={28} className="text-accent" />
              </div>
              <p className="text-foreground font-medium">Самара, ул. Ленинградская, 55</p>
            </div>
          </div>
          <Button size="lg" className="bg-accent hover:bg-accent/90" onClick={() => setBookingOpen(true)}>
            Записаться на консультацию
          </Button>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-muted-foreground">© 2025 Екатерина Сергеевна. Все права защищены.</p>
        </div>
      </footer>

      <BookingDialog open={bookingOpen} onOpenChange={setBookingOpen} />
      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} onAuthSuccess={handleAuthSuccess} />
      <Toaster />
    </div>
  );
}