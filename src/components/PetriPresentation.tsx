import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { User } from "lucide-react";

<User className="w-8 h-8 text-secondary mx-auto mb-3" />

import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw, Car, Users, Clock, CheckCircle, UserCheck, ArrowRight, Grid3X3, MapPin, Settings, Cpu } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  background?: string;
}

// Modélisation du réseau de Petri de réservation de stationnement selon le projet GitHub
const ParkingPetriVisualization = ({ animate, step = 0 }: { animate: boolean; step?: number }) => {
  const places = [
    { id: 'P1', label: 'Places Libres', x: 80, y: 60, tokens: step === 0 ? 3 : step === 1 ? 2 : step === 2 ? 2 : step === 3 ? 1 : step === 4 ? 2 : step === 5 ? 3 : 3, color: 'success' },
    { id: 'P2', label: 'Demandes en Attente', x: 280, y: 60, tokens: step === 0 ? 0 : step === 1 ? 1 : step === 2 ? 0 : step === 3 ? 0 : step === 4 ? 0 : step === 5 ? 0 : 0, color: 'warning' },
    { id: 'P3', label: 'Places Réservées', x: 480, y: 60, tokens: step === 0 ? 0 : step === 1 ? 0 : step === 2 ? 1 : step === 3 ? 0 : step === 4 ? 0 : step === 5 ? 0 : 0, color: 'primary' },
    { id: 'P4', label: 'Places Occupées', x: 280, y: 180, tokens: step === 0 ? 0 : step === 1 ? 0 : step === 2 ? 0 : step === 3 ? 1 : step === 4 ? 0 : step === 5 ? 0 : 0, color: 'destructive' },
    { id: 'P5', label: 'Utilisateurs Satisfaits', x: 80, y: 180, tokens: step === 0 ? 0 : step === 1 ? 0 : step === 2 ? 0 : step === 3 ? 0 : step === 4 ? 1 : step === 5 ? 0 : 0, color: 'accent' }
  ];

  const transitions = [
    { id: 'T1', label: 'Demander', x: 180, y: 40, active: step === 1, color: 'warning' },
    { id: 'T2', label: 'Réserver', x: 380, y: 40, active: step === 2, color: 'primary' },
    { id: 'T3', label: 'Occuper', x: 450, y: 120, active: step === 3, color: 'destructive' },
    { id: 'T4', label: 'Libérer', x: 180, y: 160, active: step === 4, color: 'success' },
    { id: 'T5', label: 'Partir', x: 80, y: 120, active: step === 5, color: 'secondary' }
  ];

  const getColorClass = (colorName: string) => {
    const colors = {
      'success': 'bg-success border-success-foreground',
      'warning': 'bg-warning border-warning-foreground', 
      'primary': 'bg-primary border-primary-foreground',
      'destructive': 'bg-destructive border-destructive-foreground',
      'accent': 'bg-accent border-accent-foreground',
      'secondary': 'bg-secondary border-secondary-foreground'
    };
    return colors[colorName as keyof typeof colors] || 'bg-muted border-muted-foreground';
  };

  return (
    <div className="relative w-full h-80 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10"></div>
      
      {/* Places (cercles) */}
      {places.map((place) => {
        const isActive = step > 0 && places.find(p => p.id === place.id)?.tokens > 0;
        return (
          <div
            key={place.id}
            className={`absolute w-16 h-16 rounded-full border-2 ${getColorClass(place.color)} 
              ${isActive && animate ? 'animate-pulse-glow' : ''} 
              ${step > 0 && place.tokens > 0 ? 'shadow-primary' : ''} 
              transition-all duration-1000 flex items-center justify-center`}
            style={{ left: place.x, top: place.y }}
          >
            <div className="text-xs font-bold text-center">
              <div>{place.id}</div>
              {place.tokens > 0 && <div className="text-[10px]">{place.tokens}</div>}
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-[10px] text-muted-foreground text-center whitespace-nowrap">
              {place.label}
            </div>
          </div>
        );
      })}

      {/* Transitions (rectangles) */}
      {transitions.map((transition) => (
        <div
          key={transition.id}
          className={`absolute w-12 h-6 rounded border-2 ${getColorClass(transition.color)}
            ${transition.active && animate ? 'animate-float shadow-accent' : ''} 
            transition-all duration-1000 flex items-center justify-center`}
          style={{ left: transition.x, top: transition.y }}
        >
          <div className="text-[10px] font-bold text-center">{transition.id}</div>
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[8px] text-muted-foreground text-center whitespace-nowrap">
            {transition.label}
          </div>
        </div>
      ))}

      {/* Arcs (flèches) - simplifiées pour la lisibilité */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="hsl(var(--foreground))" opacity="0.6" />
          </marker>
        </defs>
        
        {/* P1 -> T1 */}
        <path d="M 140 70 L 175 50" stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead)" opacity="0.6" />
        
        {/* T1 -> P2 */}
        <path d="M 195 50 L 275 70" stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead)" opacity="0.6" />
        
        {/* P1 + P2 -> T2 */}
        <path d="M 140 80 Q 200 100 375 50" stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead)" opacity="0.6" />
        <path d="M 290 80 Q 330 70 375 55" stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead)" opacity="0.6" />
        
        {/* T2 -> P3 */}
        <path d="M 395 50 L 475 70" stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead)" opacity="0.6" />
        
        {/* P3 -> T3 */}
        <path d="M 490 90 L 460 115" stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead)" opacity="0.6" />
        
        {/* T3 -> P4 */}
        <path d="M 440 130 L 320 170" stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead)" opacity="0.6" />
        
        {/* P4 -> T4 */}
        <path d="M 270 190 L 195 170" stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead)" opacity="0.6" />
        
        {/* T4 -> P1 + P5 */}
        <path d="M 170 150 Q 120 120 100 90" stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead)" opacity="0.6" />
        <path d="M 175 170 L 140 185" stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead)" opacity="0.6" />
        
        {/* P5 -> T5 */}
        <path d="M 90 170 L 90 135" stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead)" opacity="0.6" />
      </svg>

      {/* Étiquette de l'étape active */}
      {step > 0 && (
        <div className="absolute top-2 right-2 gradient-card px-3 py-1 rounded-lg border border-border/50">
          <span className="text-xs font-semibold text-accent">Étape {step}</span>
        </div>
      )}
    </div>
  );
};

// Matrice d'incidence pour le réseau de stationnement
const IncidenceMatrix = () => {
  const matrix = [
    ['', 'T1', 'T2', 'T3', 'T4', 'T5'],
    ['P1', '0', '-1', '0', '+1', '0'],
    ['P2', '+1', '-1', '0', '0', '0'], 
    ['P3', '0', '+1', '-1', '0', '0'],
    ['P4', '0', '0', '+1', '-1', '0'],
    ['P5', '0', '0', '0', '+1', '-1']
  ];

  return (
    <div className="w-full max-w-md mx-auto gradient-card p-4 rounded-lg border border-border/50">
      <h3 className="text-lg font-semibold text-center mb-4 text-primary">Matrice d'Incidence</h3>
      <div className="grid grid-cols-6 gap-1 text-center text-sm">
        {matrix.map((row, i) => 
          row.map((cell, j) => (
            <div 
              key={`${i}-${j}`} 
              className={`p-2 rounded ${
                i === 0 || j === 0 
                  ? 'bg-secondary/20 font-semibold text-secondary' 
                  : cell.includes('+') 
                    ? 'bg-success/20 text-success' 
                    : cell.includes('-') 
                      ? 'bg-destructive/20 text-destructive'
                      : 'bg-muted/20 text-muted-foreground'
              }`}
            >
              {cell}
            </div>
          ))
        )}
      </div>
      <p className="text-xs text-muted-foreground mt-4 text-center">
        +1 = Production de jetons<br/>
        -1 = Consommation de jetons<br/>
        0 = Pas d'interaction
      </p>
    </div>
  );
};

const slides: Slide[] = [
   {
    id: 1,
    title: "Système de Réservation de Stationnement",
    subtitle: "Modélisation par Réseaux de Petri  ",
    icon: <Car className="w-12 h-12 text-primary" />,
    content: (
      <div className="text-center space-y-6">
        <div className="animate-fade-in-up">
          <div className="text-6xl mb-6">👥</div>
          <p className="text-subtitle text-muted-foreground mb-6">
            GROUPE
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-6 mt-8">
          <div className="gradient-card p-6 rounded-lg text-center animate-fade-in-up delay-200">
            <User className="w-8 h-8 text-secondary mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">RAKOTONIRINA Rado Léonce</h3>
            <h4 className="">
              N° 1186H-F <br />
              M1 IG G1
            </h4>
          </div>
          
          <div className="gradient-card p-6 rounded-lg text-center animate-fade-in-up delay-300">
           <User className="w-8 h-8 text-secondary mx-auto mb-3" />
           <h3 className="font-semibold text-lg mb-2">RAZAFIMIANDRISOARIVONY <br /> Onjanirina Théodose Lyoncia</h3>
            <h4 className="">
              N° 1287H-F <br />
              M1 IG G1
            </h4>
          </div>
        </div>

      
      </div>
    )
  },
  {
    id: 2,
    title: "Système de Réservation de Stationnement",
    subtitle: "Modélisation par Réseaux de Petri ",
    icon: <Car className="w-12 h-12 text-primary" />,
    content: (
      <div className="text-center space-y-6">
        <div className="animate-fade-in-up">
          <div className="text-6xl mb-6">🅿️</div>
          <p className="text-subtitle text-muted-foreground mb-6">
            Un modèle formel pour analyser et visualiser les processus de réservation de places de parking
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-6 mt-8">
          <div className="gradient-card p-6 rounded-lg text-center animate-fade-in-up delay-200">
            <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">Contexte</h3>
            <p className="text-sm text-muted-foreground">
              Gestion intelligente des places de stationnement en temps réel avec modélisation mathématique
            </p>
          </div>
          
          <div className="gradient-card p-6 rounded-lg text-center animate-fade-in-up delay-300">
            <Settings className="w-8 h-8 text-secondary mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">Objectif</h3>
            <p className="text-sm text-muted-foreground">
              Analyser les flux d'utilisateurs, optimiser les ressources et prévenir les blocages
            </p>
          </div>
        </div>

        <div className="mt-8 gradient-primary p-6 rounded-lg border border-border/50 animate-fade-in-up delay-400">
          <h3 className="text-lg font-semibold text-primary-foreground mb-3">Avantages de la Modélisation</h3>
          <div className="grid grid-cols-3 gap-4 text-primary-foreground/90">
            <div className="text-center">
              <Cpu className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm">Simulation</span>
            </div>
            <div className="text-center">
              <CheckCircle className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm">Validation</span>
            </div>
            <div className="text-center">
              <Users className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm">Optimisation</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "Composants du Réseau de Petri",
    icon: <Grid3X3 className="w-8 h-8 text-secondary" />,
    content: (
      <div className="space-y-8">
        <div className="animate-slide-in-left">
          <p className="text-lg text-muted-foreground mb-8">
            Notre modèle utilise 5 places et 5 transitions pour représenter le cycle complet de réservation.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          <div className="animate-slide-in-left delay-200">
            <h3 className="text-xl font-semibold mb-6 text-success flex items-center gap-2">
              <div className="w-4 h-4 bg-success rounded-full"></div>
              Places (États)
            </h3>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-center gap-3">
                <div className="w-4 h-4 bg-success rounded-full"></div>
                <span><strong>P1 - Places Libres</strong> : Ressources disponibles</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-4 h-4 bg-warning rounded-full"></div>
                <span><strong>P2 - Demandes en Attente</strong> : Files d'attente</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-4 h-4 bg-primary rounded-full"></div>
                <span><strong>P3 - Places Réservées</strong> : Réservations actives</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-4 h-4 bg-destructive rounded-full"></div>
                <span><strong>P4 - Places Occupées</strong> : Utilisation effective</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-4 h-4 bg-accent rounded-full"></div>
                <span><strong>P5 - Utilisateurs Satisfaits</strong> : Processus terminé</span>
              </li>
            </ul>
          </div>
          
          <div className="animate-slide-in-right delay-300">
            <h3 className="text-xl font-semibold mb-6 text-warning flex items-center gap-2">
              <div className="w-6 h-3 bg-warning rounded"></div>
              Transitions (Actions)
            </h3>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-center gap-3">
                <div className="w-6 h-3 bg-warning rounded"></div>
                <span><strong>T1 - Faire une Demande</strong> : Nouvel utilisateur</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-3 bg-primary rounded"></div>
                <span><strong>T2 - Réserver</strong> : Allocation de ressource</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-3 bg-destructive rounded"></div>
                <span><strong>T3 - Occuper</strong> : Utilisation physique</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-3 bg-success rounded"></div>
                <span><strong>T4 - Libérer</strong> : Fin d'utilisation</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-3 bg-secondary rounded"></div>
                <span><strong>T5 - Partir</strong> : Sortie du système</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="gradient-card p-6 rounded-lg border border-border/50 animate-fade-in-up delay-400">
          <p className="text-center text-muted-foreground">
            <strong>Les jetons</strong> représentent les ressources (places) ou les entités (utilisateurs) 
            circulant dans le système selon les règles définies par les transitions.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: "État Initial du Système (M0)",
    icon: <Play className="w-8 h-8 text-primary" />,
    content: (
      <div className="space-y-6">
        <div className="animate-fade-in-up">
          <p className="text-lg text-muted-foreground mb-6">
            Configuration initiale : 3 places libres, aucune demande en cours.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 animate-slide-in-left delay-200">
            <ParkingPetriVisualization animate={true} step={0} />
          </div>
          
          <div className="animate-slide-in-right delay-300 space-y-4">
            <h3 className="text-xl font-semibold text-primary">Marquage Initial M0</h3>
            <div className="space-y-3">
              <div className="gradient-card p-3 rounded-lg border border-border/50">
                <div className="flex items-center justify-between">
                  <span className="font-medium">P1 (Places Libres)</span>
                  <span className="text-success font-bold">3 jetons</span>
                </div>
              </div>
              <div className="gradient-card p-3 rounded-lg border border-border/50">
                <div className="flex items-center justify-between">
                  <span className="font-medium">P2 (Demandes)</span>
                  <span className="text-muted-foreground">0 jeton</span>
                </div>
              </div>
              <div className="gradient-card p-3 rounded-lg border border-border/50">
                <div className="flex items-center justify-between">
                  <span className="font-medium">P3 (Réservées)</span>
                  <span className="text-muted-foreground">0 jeton</span>
                </div>
              </div>
              <div className="gradient-card p-3 rounded-lg border border-border/50">
                <div className="flex items-center justify-between">
                  <span className="font-medium">P4 (Occupées)</span>
                  <span className="text-muted-foreground">0 jeton</span>
                </div>
              </div>
              <div className="gradient-card p-3 rounded-lg border border-border/50">
                <div className="flex items-center justify-between">
                  <span className="font-medium">P5 (Satisfaits)</span>
                  <span className="text-muted-foreground">0 jeton</span>
                </div>
              </div>
            </div>
            
            <div className="gradient-primary p-4 rounded-lg border border-border/50">
              <p className="text-primary-foreground text-sm">
                <strong>État stable :</strong> Le système est prêt à traiter les demandes de réservation.
                Seule la transition T1 (Demander) est activable.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
{
  id: 5,
  title: "Séquence d'Exécution - Étapes 1 à 5",
  icon: <ArrowRight className="w-8 h-8 text-accent" />,
  content: (
    <div className="space-y-6">
      <div className="animate-fade-in-up">
        <p className="text-lg text-muted-foreground mb-8">
          Suivez l'évolution du système à travers un cycle complet de réservation.
        </p>
      </div>

      {/* ===== Colonne unique : une étape par ligne ===== */}
      <div className="flex flex-col gap-6 w-full">
        {/* Étape 1 */}
        <div className="gradient-card p-4 rounded-lg border border-border/50 animate-slide-in-left">
          <h3 className="text-lg font-semibold text-warning mb-3">
            Étape 1 : Faire une Demande (T1)
          </h3>
          <div className="overflow-x-auto">
            <ParkingPetriVisualization
              animate={true}
              step={1}
              className="w-full max-w-none min-w-[640px] h-auto"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Un utilisateur fait une demande → 1 jeton apparaît en P2 (Demandes en Attente)
          </p>
        </div>

        {/* Étape 2 */}
        <div className="gradient-card p-4 rounded-lg border border-border/50 animate-slide-in-left delay-200">
          <h3 className="text-lg font-semibold text-primary mb-3">
            Étape 2 : Réserver (T2)
          </h3>
          <div className="overflow-x-auto">
            <ParkingPetriVisualization
              animate={true}
              step={2}
              className="w-full max-w-none min-w-[640px] h-auto"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            La demande est traitée → 1 place libre et 1 demande deviennent 1 réservation
          </p>
        </div>

        {/* Étape 3 */}
        <div className="gradient-card p-4 rounded-lg border border-border/50 animate-slide-in-right">
          <h3 className="text-lg font-semibold text-destructive mb-3">
            Étape 3 : Occuper (T3)
          </h3>
          <div className="overflow-x-auto">
            <ParkingPetriVisualization
              animate={true}
              step={3}
              className="w-full max-w-none min-w-[640px] h-auto"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            L'utilisateur arrive → La réservation devient occupation
          </p>
        </div>

        {/* Étape 4 */}
        <div className="gradient-card p-4 rounded-lg border border-border/50 animate-slide-in-right delay-200">
          <h3 className="text-lg font-semibold text-success mb-3">
            Étape 4 : Libérer (T4)
          </h3>
          <div className="overflow-x-auto">
            <ParkingPetriVisualization
              animate={true}
              step={4}
              className="w-full max-w-none min-w-[640px] h-auto"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Fin de parking → Place libre + utilisateur satisfait
          </p>
        </div>

        {/* Étape 5 */}
        <div className="gradient-card p-4 rounded-lg border border-border/50 animate-slide-in-right delay-300">
          <h3 className="text-lg font-semibold text-secondary mb-3">
            Étape 5 : Partir (T5)
          </h3>
          <div className="overflow-x-auto">
            <ParkingPetriVisualization
              animate={true}
              step={5}
              className="w-full max-w-none min-w-[640px] h-auto"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            L'utilisateur quitte le système → Retour à l'état initial
          </p>
        </div>
      </div>

      <div className="gradient-accent p-6 rounded-lg border border-border/50 animate-fade-in-up delay-400">
        <h3 className="text-lg font-semibold text-accent-foreground mb-3 text-center">
          Cycle Complet
        </h3>
        <p className="text-accent-foreground/90 text-center">
          Le système retrouve son état initial après chaque cycle, garantissant la conservation des ressources
          et permettant de traiter de nouvelles demandes en continu.
        </p>
      </div>
    </div>
  )
}
,
  {
    id: 6,
    title: "Matrice d'Incidence",
    icon: <Grid3X3 className="w-8 h-8 text-success" />,
    content: (
      <div className="space-y-8">
        <div className="animate-fade-in-up">
          <p className="text-lg text-muted-foreground mb-8">
            La matrice d'incidence encode les relations entre places et transitions du réseau.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="animate-slide-in-left">
            <IncidenceMatrix />
          </div>
          
          <div className="space-y-6 animate-slide-in-right delay-200">
            <h3 className="text-xl font-semibold text-primary">Interprétation</h3>
            
            <div className="space-y-4">
              <div className="gradient-card p-4 rounded-lg border border-border/50">
                <h4 className="font-semibold text-success mb-2">Valeurs Positives (+1)</h4>
                <p className="text-sm text-muted-foreground">
                  Indiquent qu'une transition <strong>produit</strong> un jeton dans une place.
                  Ex: T1 produit 1 jeton en P2 (nouvelle demande).
                </p>
              </div>
              
              <div className="gradient-card p-4 rounded-lg border border-border/50">
                <h4 className="font-semibold text-destructive mb-2">Valeurs Négatives (-1)</h4>
                <p className="text-sm text-muted-foreground">
                  Indiquent qu'une transition <strong>consomme</strong> un jeton d'une place.
                  Ex: T2 consomme 1 jeton de P1 (place libre utilisée).
                </p>
              </div>
              
              <div className="gradient-card p-4 rounded-lg border border-border/50">
                <h4 className="font-semibold text-muted mb-2">Valeurs Nulles (0)</h4>
                <p className="text-sm text-muted-foreground">
                  Aucune interaction entre la place et la transition.
                  La plupart des cases de la matrice.
                </p>
              </div>
            </div>
            
            <div className="gradient-primary p-4 rounded-lg border border-border/50">
              <h4 className="font-semibold text-primary-foreground mb-2">Propriétés Importantes</h4>
              <ul className="text-sm text-primary-foreground/90 space-y-1">
                <li>• <strong>Conservation :</strong> Somme des colonnes = 0</li>
                <li>• <strong>Invariants :</strong> P1 + P3 + P4 = constant</li>
                <li>• <strong>Vivacité :</strong> Toutes les transitions sont activables</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 7,
    title: "Conclusion et Perspectives",
    icon: <CheckCircle className="w-8 h-8 text-warning" />,
    content: (
      <div className="space-y-8">
        <div className="text-center animate-fade-in-up">
          <div className="text-6xl mb-4">✅</div>
          <p className="text-lg text-muted-foreground">
            Le modèle Petri permet une analyse rigoureuse et une simulation efficace du système de réservation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4 animate-slide-in-left delay-200">
            <h3 className="text-xl font-semibold text-success">Avantages Démontrés</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success" />
                <span>Modélisation mathématique rigoureuse</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success" />
                <span>Vérification formelle des propriétés</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success" />
                <span>Détection des blocages potentiels</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success" />
                <span>Optimisation des ressources</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success" />
                <span>Simulation avant déploiement</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4 animate-slide-in-right delay-300">
            <h3 className="text-xl font-semibold text-accent">Extensions Possibles</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-3">
                <ArrowRight className="w-5 h-5 text-accent" />
                <span>Gestion des priorités d'utilisateurs</span>
              </li>
              <li className="flex items-center gap-3">
                <ArrowRight className="w-5 h-5 text-accent" />
                <span>Modélisation des temps d'attente</span>
              </li>
              <li className="flex items-center gap-3">
                <ArrowRight className="w-5 h-5 text-accent" />
                <span>Intégration de capteurs IoT</span>
              </li>
              <li className="flex items-center gap-3">
                <ArrowRight className="w-5 h-5 text-accent" />
                <span>Réseaux de Petri colorés</span>
              </li>
              <li className="flex items-center gap-3">
                <ArrowRight className="w-5 h-5 text-accent" />
                <span>Optimisation multi-objectifs</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center gradient-primary p-8 rounded-lg border border-border/50 animate-fade-in-up delay-400">
          <h3 className="text-2xl font-bold text-primary-foreground mb-4">Merci pour votre attention !</h3>
          <p className="text-primary-foreground/80 mb-6">
            Questions sur la modélisation ou la simulation ?
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Grid3X3 className="w-4 h-4 mr-2" />
              Voir le Code GitHub
            </Button>
            <Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Play className="w-4 h-4 mr-2" />
              
              <a href="http://localhost:8081/">Lancer la Simulation</a>
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
              <Car className="w-4 h-4 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">Système de Réservation de Stationnement</h1>
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