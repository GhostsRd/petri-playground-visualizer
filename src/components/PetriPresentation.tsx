import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw, Layers, Zap, GitBranch, Target, Users, Code, Lightbulb } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  background?: string;
}

const PetriVisualization = ({ animate }: { animate: boolean }) => (
  <div className="relative w-full h-64 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
    
    {/* Places (cercles) */}
    <div className={`absolute top-8 left-8 w-12 h-12 bg-primary rounded-full border-2 border-primary-foreground shadow-primary transition-all duration-1000 ${animate ? 'animate-pulse-glow' : ''}`}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-primary-foreground">P1</div>
    </div>
    
    <div className={`absolute top-8 right-8 w-12 h-12 bg-secondary rounded-full border-2 border-foreground shadow-accent transition-all duration-1000 ${animate ? 'animate-pulse-glow delay-300' : ''}`}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-foreground">P2</div>
    </div>
    
    <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-accent rounded-full border-2 border-accent-foreground shadow-accent transition-all duration-1000 ${animate ? 'animate-pulse-glow delay-500' : ''}`}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-accent-foreground">P3</div>
    </div>

    {/* Transitions (rectangles) */}
    <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-8 bg-warning rounded border-2 border-warning-foreground transition-all duration-1000 ${animate ? 'animate-float delay-200' : ''}`}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-warning-foreground">T1</div>
    </div>

    {/* Arcs (flèches) */}
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--foreground))" />
        </marker>
      </defs>
      
      <path
        d="M 70 50 Q 120 80 160 128"
        stroke="hsl(var(--foreground))"
        strokeWidth="2"
        fill="none"
        markerEnd="url(#arrowhead)"
        className={animate ? 'animate-pulse' : ''}
      />
      
      <path
        d="M 290 50 Q 240 80 200 128"
        stroke="hsl(var(--foreground))"
        strokeWidth="2"
        fill="none"
        markerEnd="url(#arrowhead)"
        className={animate ? 'animate-pulse delay-100' : ''}
      />
      
      <path
        d="M 190 170 Q 140 200 70 80"
        stroke="hsl(var(--foreground))"
        strokeWidth="2"
        fill="none"
        markerEnd="url(#arrowhead)"
        className={animate ? 'animate-pulse delay-200' : ''}
      />
    </svg>

    {/* Tokens */}
    <div className={`absolute top-10 left-10 w-3 h-3 bg-success rounded-full transition-all duration-1000 ${animate ? 'animate-bounce' : ''}`}></div>
    <div className={`absolute top-12 right-12 w-3 h-3 bg-success rounded-full transition-all duration-1000 ${animate ? 'animate-bounce delay-100' : ''}`}></div>
  </div>
);

const slides: Slide[] = [
  {
    id: 1,
    title: "Petri Playland",
    subtitle: "Visualisateur de Réseaux de Petri Interactif",
    icon: <Layers className="w-12 h-12 text-primary" />,
    content: (
      <div className="text-center space-y-6">
        <div className="animate-fade-in-up">
          <div className="text-6xl mb-6">🎮</div>
          <p className="text-subtitle text-muted-foreground">
            Un environnement ludique pour comprendre et visualiser les réseaux de Petri
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="gradient-card p-4 rounded-lg text-center animate-fade-in-up delay-200">
            <Zap className="w-6 h-6 text-primary mx-auto mb-2" />
            <span className="text-sm text-muted-foreground">Interactif</span>
          </div>
          <div className="gradient-card p-4 rounded-lg text-center animate-fade-in-up delay-300">
            <GitBranch className="w-6 h-6 text-secondary mx-auto mb-2" />
            <span className="text-sm text-muted-foreground">Visuel</span>
          </div>
          <div className="gradient-card p-4 rounded-lg text-center animate-fade-in-up delay-400">
            <Target className="w-6 h-6 text-accent mx-auto mb-2" />
            <span className="text-sm text-muted-foreground">Éducatif</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Qu'est-ce qu'un Réseau de Petri ?",
    icon: <GitBranch className="w-8 h-8 text-secondary" />,
    content: (
      <div className="space-y-6">
        <div className="animate-slide-in-left">
          <p className="text-lg text-muted-foreground mb-6">
            Un réseau de Petri est un modèle mathématique pour décrire des systèmes distribués et concurrents.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          <div className="animate-slide-in-left delay-200">
            <h3 className="text-xl font-semibold mb-4 text-primary">Composants principaux :</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-3">
                <div className="w-4 h-4 bg-primary rounded-full"></div>
                <span><strong>Places</strong> - États ou conditions</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-3 bg-warning rounded"></div>
                <span><strong>Transitions</strong> - Événements ou actions</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span><strong>Tokens</strong> - Ressources ou marques</span>
              </li>
              <li className="flex items-center gap-3">
                <span>→</span>
                <span><strong>Arcs</strong> - Relations entre places et transitions</span>
              </li>
            </ul>
          </div>
          
          <div className="animate-slide-in-right delay-300">
            <PetriVisualization animate={false} />
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "Animation et Simulation",
    icon: <Play className="w-8 h-8 text-primary" />,
    content: (
      <div className="space-y-6">
        <div className="animate-fade-in-up">
          <p className="text-lg text-muted-foreground mb-6">
            Visualisez le comportement dynamique des réseaux de Petri en temps réel.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          <div className="animate-slide-in-left delay-200">
            <h3 className="text-xl font-semibold mb-4 text-secondary">Fonctionnalités :</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-3">
                <Play className="w-4 h-4 text-success" />
                <span>Animation automatique</span>
              </li>
              <li className="flex items-center gap-3">
                <Pause className="w-4 h-4 text-warning" />
                <span>Contrôle pas à pas</span>
              </li>
              <li className="flex items-center gap-3">
                <RotateCcw className="w-4 h-4 text-accent" />
                <span>Reset et rejeu</span>
              </li>
              <li className="flex items-center gap-3">
                <Zap className="w-4 h-4 text-primary" />
                <span>Vitesse ajustable</span>
              </li>
            </ul>
          </div>
          
          <div className="animate-slide-in-right delay-300">
            <PetriVisualization animate={true} />
            <div className="flex justify-center gap-2 mt-4">
              <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Play className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="border-warning text-warning hover:bg-warning hover:text-warning-foreground">
                <Pause className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: "Applications Pratiques",
    icon: <Target className="w-8 h-8 text-accent" />,
    content: (
      <div className="space-y-6">
        <div className="animate-fade-in-up">
          <p className="text-lg text-muted-foreground mb-8">
            Les réseaux de Petri sont utilisés dans de nombreux domaines pour modéliser des systèmes complexes.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <Card className="gradient-card p-6 border-border/50 animate-slide-in-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <Code className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-semibold">Systèmes Distribués</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Modélisation de processus concurrents, protocoles de communication
            </p>
          </Card>

          <Card className="gradient-card p-6 border-border/50 animate-slide-in-right delay-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-secondary" />
              </div>
              <h3 className="font-semibold">Processus Métier</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Workflows, gestion de projets, chaînes de production
            </p>
          </Card>

          <Card className="gradient-card p-6 border-border/50 animate-slide-in-left delay-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-accent" />
              </div>
              <h3 className="font-semibold">Systèmes Embarqués</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Contrôle de robots, systèmes temps réel, IoT
            </p>
          </Card>

          <Card className="gradient-card p-6 border-border/50 animate-slide-in-right delay-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-success" />
              </div>
              <h3 className="font-semibold">Recherche</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Bioinformatique, réseaux sociaux, intelligence artificielle
            </p>
          </Card>
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: "Architecture du Projet",
    icon: <Code className="w-8 h-8 text-success" />,
    content: (
      <div className="space-y-6">
        <div className="animate-fade-in-up">
          <p className="text-lg text-muted-foreground mb-8">
            Petri Playland est construit avec des technologies web modernes pour une expérience optimale.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 animate-slide-in-left">
            <h3 className="text-xl font-semibold text-primary">Frontend</h3>
            <div className="space-y-3">
              <div className="gradient-card p-4 rounded-lg border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">R</span>
                  </div>
                  <span className="font-medium">React + TypeScript</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Interface utilisateur réactive</p>
              </div>
              
              <div className="gradient-card p-4 rounded-lg border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-secondary/20 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-secondary">T</span>
                  </div>
                  <span className="font-medium">Tailwind CSS</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Styling moderne et responsive</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 animate-slide-in-right delay-200">
            <h3 className="text-xl font-semibold text-accent">Fonctionnalités</h3>
            <div className="space-y-3">
              <div className="gradient-card p-4 rounded-lg border border-border/50">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-accent" />
                  <span className="font-medium">Rendu Canvas</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Visualisation haute performance</p>
              </div>
              
              <div className="gradient-card p-4 rounded-lg border border-border/50">
                <div className="flex items-center gap-3">
                  <Play className="w-5 h-5 text-success" />
                  <span className="font-medium">Moteur d'animation</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Simulation temps réel</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 gradient-card p-6 rounded-lg border border-border/50 animate-fade-in-up delay-400">
          <h3 className="text-lg font-semibold text-warning mb-4">Avantages Techniques</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">⚡</div>
              <p className="text-sm text-muted-foreground">Performance</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-secondary">🎨</div>
              <p className="text-sm text-muted-foreground">Design</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">🔧</div>
              <p className="text-sm text-muted-foreground">Extensible</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 6,
    title: "Démonstration & Perspectives",
    icon: <Lightbulb className="w-8 h-8 text-warning" />,
    content: (
      <div className="space-y-8">
        <div className="text-center animate-fade-in-up">
          <div className="text-6xl mb-4">🚀</div>
          <p className="text-lg text-muted-foreground">
            Petri Playland transforme l'apprentissage des réseaux de Petri en une expérience interactive et engageante.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4 animate-slide-in-left delay-200">
            <h3 className="text-xl font-semibold text-primary">Fonctionnalités Actuelles</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                Éditeur visuel intuitif
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                Simulation en temps réel
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                Export/Import de modèles
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                Interface responsive
              </li>
            </ul>
          </div>

          <div className="space-y-4 animate-slide-in-right delay-300">
            <h3 className="text-xl font-semibold text-accent">Évolutions Futures</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                Collaboration multi-utilisateurs
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                Bibliothèque de modèles
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                Analyse de performances
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                Intégration API
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center gradient-primary p-8 rounded-lg border border-border/50 animate-fade-in-up delay-400">
          <h3 className="text-2xl font-bold text-primary-foreground mb-4">Merci pour votre attention !</h3>
          <p className="text-primary-foreground/80 mb-6">
            Questions et démonstration interactive
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <GitBranch className="w-4 h-4 mr-2" />
              Voir le Code
            </Button>
            <Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Play className="w-4 h-4 mr-2" />
              Essayer la Démo
            </Button>
          </div>
        </div>
      </div>
    )
  }
];

export default function PetriPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlay) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 10000); // 10 seconds per slide
    }
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      {/* Header */}
      <header className="gradient-card border-b border-border/50 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <Layers className="w-4 h-4 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">Petri Playland</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {currentSlide + 1} / {slides.length}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="transition-smooth"
            >
              {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 max-w-6xl mx-auto w-full p-8">
          <Card className="h-full gradient-card shadow-card border-border/50 overflow-hidden">
            <div className="h-full flex flex-col">
              {/* Slide Header */}
              <div className="border-b border-border/50 p-6">
                <div className="flex items-center gap-4">
                  {slides[currentSlide].icon}
                  <div>
                    <h2 className="text-title font-bold">{slides[currentSlide].title}</h2>
                    {slides[currentSlide].subtitle && (
                      <p className="text-subtitle text-muted-foreground mt-2">
                        {slides[currentSlide].subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Slide Content */}
              <div className="flex-1 p-8 overflow-auto">
                {slides[currentSlide].content}
              </div>
            </div>
          </Card>
        </div>

        {/* Navigation */}
        <div className="gradient-card border-t border-border/50 p-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Button
              variant="outline"
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="transition-smooth"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Précédent
            </Button>

            {/* Slide Indicators */}
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-smooth ${
                    index === currentSlide
                      ? 'bg-primary shadow-primary'
                      : 'bg-muted hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="transition-smooth"
            >
              Suivant
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}