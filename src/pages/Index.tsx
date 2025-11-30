import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { id: 0, title: 'Титульный слайд' },
    { id: 1, title: 'Содержание' },
    { id: 2, title: 'Основное содержание' },
    { id: 3, title: 'Статистика и данные' },
    { id: 4, title: 'Галерея работ' },
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 overflow-hidden">
      <div className="relative h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-6xl">
            {currentSlide === 0 && <TitleSlide />}
            {currentSlide === 1 && <ContentSlide goToSlide={goToSlide} />}
            {currentSlide === 2 && <MainContentSlide />}
            {currentSlide === 3 && <StatisticsSlide />}
            {currentSlide === 4 && <GallerySlide />}
          </div>
        </div>

        <div className="pb-8 px-8">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              variant="outline"
              size="lg"
              className="gap-2 bg-white/80 backdrop-blur-sm hover:bg-white"
            >
              <Icon name="ChevronLeft" size={20} />
              Назад
            </Button>

            <div className="flex gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'w-8 bg-gradient-to-r from-primary to-secondary'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Перейти к слайду ${index + 1}`}
                />
              ))}
            </div>

            <Button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              size="lg"
              className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
              Далее
              <Icon name="ChevronRight" size={20} />
            </Button>
          </div>

          <div className="text-center mt-4 text-sm text-gray-600">
            Слайд {currentSlide + 1} из {slides.length}
          </div>
        </div>
      </div>
    </div>
  );
};

const TitleSlide = () => (
  <div className="text-center animate-fade-in">
    <div className="mb-8">
      <div className="inline-block p-4 bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl mb-6 animate-scale-in">
        <Icon name="GraduationCap" size={64} className="text-white" />
      </div>
    </div>
    <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
      Современное образование
    </h1>
    <p className="text-2xl text-gray-600 mb-8">
      Инновационные подходы к обучению в цифровую эпоху
    </p>
    <div className="flex items-center justify-center gap-4 text-gray-500">
      <div className="flex items-center gap-2">
        <Icon name="Calendar" size={20} />
        <span>30 ноября 2025</span>
      </div>
      <div className="w-1 h-1 rounded-full bg-gray-400" />
      <div className="flex items-center gap-2">
        <Icon name="Clock" size={20} />
        <span>45 минут</span>
      </div>
    </div>
  </div>
);

const ContentSlide = ({ goToSlide }: { goToSlide: (index: number) => void }) => {
  const contents = [
    {
      icon: 'BookOpen',
      title: 'Основное содержание',
      description: 'Ключевые концепции и методология',
      color: 'from-purple-500 to-pink-500',
      slideIndex: 2,
    },
    {
      icon: 'BarChart3',
      title: 'Статистика и данные',
      description: 'Результаты исследований и метрики',
      color: 'from-pink-500 to-orange-500',
      slideIndex: 3,
    },
    {
      icon: 'Image',
      title: 'Галерея работ',
      description: 'Практические примеры и кейсы',
      color: 'from-blue-500 to-purple-500',
      slideIndex: 4,
    },
  ];

  return (
    <div className="animate-fade-in">
      <h2 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Содержание презентации
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {contents.map((item, index) => (
          <Card
            key={index}
            className="group cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm overflow-hidden"
            onClick={() => goToSlide(item.slideIndex)}
          >
            <CardContent className="p-8">
              <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon name={item.icon as any} size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
              <div className="mt-6 flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform duration-300">
                Перейти
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const MainContentSlide = () => {
  const topics = [
    {
      icon: 'Lightbulb',
      title: 'Персонализация обучения',
      description: 'Адаптивные образовательные траектории для каждого студента',
    },
    {
      icon: 'Users',
      title: 'Коллаборативное обучение',
      description: 'Групповые проекты и peer-to-peer взаимодействие',
    },
    {
      icon: 'Laptop',
      title: 'Цифровые инструменты',
      description: 'Интерактивные платформы и мультимедийный контент',
    },
    {
      icon: 'Target',
      title: 'Геймификация процесса',
      description: 'Мотивация через игровые механики и достижения',
    },
  ];

  return (
    <div className="animate-fade-in">
      <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Ключевые аспекты
      </h2>
      <p className="text-center text-xl text-gray-600 mb-12">
        Основные направления современного образования
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {topics.map((topic, index) => (
          <Card
            key={index}
            className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
          >
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Icon name={topic.icon as any} size={28} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">{topic.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{topic.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const StatisticsSlide = () => {
  const stats = [
    { label: 'Вовлеченность студентов', value: 87, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { label: 'Успеваемость', value: 92, color: 'bg-gradient-to-r from-pink-500 to-orange-500' },
    { label: 'Удовлетворенность', value: 85, color: 'bg-gradient-to-r from-blue-500 to-purple-500' },
    { label: 'Завершение курсов', value: 78, color: 'bg-gradient-to-r from-green-500 to-blue-500' },
  ];

  return (
    <div className="animate-fade-in">
      <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
        Результаты исследований
      </h2>
      <p className="text-center text-xl text-gray-600 mb-12">
        Ключевые показатели эффективности
      </p>
      <div className="grid md:grid-cols-2 gap-8">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">{stat.label}</h3>
                <span className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {stat.value}%
                </span>
              </div>
              <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`absolute inset-y-0 left-0 ${stat.color} rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${stat.value}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="mt-8 border-0 bg-gradient-to-br from-primary via-secondary to-accent text-white">
        <CardContent className="p-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon name="TrendingUp" size={32} />
            <h3 className="text-3xl font-bold">Рост на 34%</h3>
          </div>
          <p className="text-lg opacity-90">
            Эффективность обучения повысилась по сравнению с традиционными методами
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

const GallerySlide = () => {
  const examples = [
    {
      title: 'Интерактивная доска',
      description: 'Цифровая среда для совместной работы',
      icon: 'Monitor',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Виртуальная реальность',
      description: 'Иммерсивные образовательные опыты',
      icon: 'Glasses',
      gradient: 'from-pink-500 to-orange-500',
    },
    {
      title: 'Мобильное обучение',
      description: 'Доступ к материалам в любое время',
      icon: 'Smartphone',
      gradient: 'from-blue-500 to-purple-500',
    },
    {
      title: 'Аналитика данных',
      description: 'Отслеживание прогресса и адаптация',
      icon: 'LineChart',
      gradient: 'from-green-500 to-blue-500',
    },
    {
      title: 'Видеолекции',
      description: 'Асинхронное обучение высокого качества',
      icon: 'Video',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      title: 'Тестирование',
      description: 'Автоматизированная оценка знаний',
      icon: 'ClipboardCheck',
      gradient: 'from-indigo-500 to-purple-500',
    },
  ];

  return (
    <div className="animate-fade-in">
      <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
        Инструменты и технологии
      </h2>
      <p className="text-center text-xl text-gray-600 mb-12">
        Практические примеры современных решений
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {examples.map((example, index) => (
          <Card
            key={index}
            className="group cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm overflow-hidden"
          >
            <CardContent className="p-0">
              <div className={`h-32 bg-gradient-to-br ${example.gradient} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                <Icon name={example.icon as any} size={48} className="text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">{example.title}</h3>
                <p className="text-gray-600">{example.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;
