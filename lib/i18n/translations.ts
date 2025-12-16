export type Language = 'en' | 'es'

export interface Translations {
  // Navigation & Header
  header: {
    title: string
    home: string
    incomePlanner: string
    about: string
  }

  footer: {
    docs: string
    incomePlanner: string
    about: string
    github: string
    prd: string
    predeployAudit: string
    copyright: string
  }

  about: {
    title: string
    subtitle: string
    whatIsTitle: string
    whatIsBody: string
    whoIsForTitle: string
    whoIsForBody: string
    howToUseTitle: string
    howToUseBody: string
    privacyTitle: string
    privacyBody: string
  }

  // Home Page
  home: {
    tagline: string
    headline: string
    subheading: string
    ctaPrimary: string
    ctaSecondary: string
    features: {
      fast: {
        title: string
        description: string
      }
      realUse: {
        title: string
        description: string
      }
      personal: {
        title: string
        description: string
      }
    }
  }

  // Income Planner - Hero
  hero: {
    title: string
    subtitle: string
    note: string
  }

  // View Toggle
  viewToggle: {
    snapshot: string
    forecast: string
  }

  // Input Panel
  inputs: {
    title: string
    hourlyRate: string
    hoursPerWeek: string
    vacationWeeks: string
    taxRate: string
    targetAnnualNet: string
    targetOptional: string
    targetPlaceholder: string
    currency: string
    language: string
    rangeLabel: string
  }

  // Summary Cards
  summary: {
    title: string
    perDay: string
    perWeek: string
    perMonth: string
    perYear: string
    gross: string
    net: string
    netAfterTax: string
    whatIf: string
    whatIfText: string
    whatIfSuffix: string
  }

  // Scenario Builder
  scenarios: {
    title: string
    pessimistic: string
    pessimisticDesc: string
    realistic: string
    realisticDesc: string
    optimistic: string
    optimisticDesc: string
    sharedTaxRate: string
  }

  // Range Visualization
  range: {
    title: string
    incomeSpread: string
    range: string
  }

  // Monthly Chart
  chart: {
    title: string
    steady: string
    q4Heavy: string
    summerSlow: string
    steadyDesc: string
    q4HeavyDesc: string
    summerSlowDesc: string
  }

  // Insights
  insights: {
    title: string
    realisticIncome: string
    incomeRange: string
    capacityWarning: string
    pessimisticFloor: string
    rateIncrease: string
    spread: string
  }

  // Toast Messages
  toast: {
    currencyChanged: string
    fxFetchError: string
    languageChanged: string
    languageChangedEs: string
  }

  errors: {
    unableToCalculateIncome: string
    unableToCalculateRange: string
    unableToGenerateChartData: string
  }

  chartLegend: {
    pessimistic: string
    realistic: string
    optimistic: string
    rangeBand: string
    target: string
  }

  caseStudy: {
    title: string
    builtBy: string
    sections: {
      problem: {
        title: string
        body: string
      }
      design: {
        title: string
        body: string
      }
      stack: {
        title: string
        body: string
      }
      privacy: {
        title: string
        body: string
      }
    }
  }

  // Chart Placeholder
  chartPlaceholder: {
    title: string
    comingSoon: string
  }

  rateBenchmark: {
    title: string
    subtitle: string
    monthlyRangesTitle: string
    you: string
    youMarker: string
    perMonthNet: string
    disclaimer: string
    tutoringTitle: string
    tutoringPrivateLessons: string
    tutoringNote: string
    fxUnavailable: string
    perHour: string
    factorsTitle: string
    factors: {
      experience: string
      schoolType: string
      hours: string
    }
    institutions: {
      international: string
      universities: string
      private: string
      public: string
      language: string
    }
  }

  // Common
  common: {
    loading: string
    error: string
    reset: string
  }
}

export const translations: Record<Language, Translations> = {
  en: {
    header: {
      title: 'CushLabs.ai',
      home: 'Home',
      incomePlanner: 'Income Planner',
      about: 'About',
    },

    footer: {
      docs: 'Docs',
      incomePlanner: 'Income Planner',
      about: 'About',
      github: 'GitHub',
      prd: 'PRD',
      predeployAudit: 'Predeploy Audit',
      copyright: '© {year} CushLabs.ai. All rights reserved.',
    },

    about: {
      title: 'About',
      subtitle: 'A quick guide to what this planner does and how to use it.',
      whatIsTitle: 'What is this?',
      whatIsBody:
        'This is a simple income planning tool for freelancers and consultants. It helps you translate your hourly rate, billable hours, vacation, and taxes into clear take-home numbers.',
      whoIsForTitle: 'Who is it for?',
      whoIsForBody:
        'Freelancers, solo consultants, and small business owners who bill for time and want clarity on realistic income outcomes.',
      howToUseTitle: 'How do I use it?',
      howToUseBody:
        'Use Snapshot for a single plan. Use Forecast to compare pessimistic, realistic, and optimistic scenarios so you can see your income floor, upside, and volatility.',
      privacyTitle: 'Privacy & storage',
      privacyBody:
        'Your inputs are stored locally in your browser for convenience. No accounts required. No personal data is sent anywhere by default.',
    },

    home: {
      tagline: 'CUSHLABS.AI',
      headline: 'AI Integration & Modern Software Development for SMBs',
      subheading:
        'I help businesses leverage AI, automate workflows, and build modern tools that are ready for real-world use.',
      ctaPrimary: 'Try Income Planner',
      ctaSecondary: 'View Projects',
      features: {
        fast: {
          title: 'Fast Delivery',
          description:
            'Production-ready systems in weeks, not months. Direct access, no handoffs.',
        },
        realUse: {
          title: 'Built for Real Use',
          description:
            'Clean code, proper testing, and documentation. No shortcuts or prototypes.',
        },
        personal: {
          title: 'Personal & Direct',
          description:
            'One experienced builder. 25+ years of enterprise depth. You work directly with me.',
        },
      },
    },

    hero: {
      title: 'Income Planner',
      subtitle:
        'Plan your income like a pro. Adjust your rate, hours, and taxes to see what you can realistically earn per year.',
      note: 'Built by Robert Cushman for freelancers, consultants, and solo founders who want clarity on their numbers.',
    },

    viewToggle: {
      snapshot: 'Snapshot',
      forecast: 'Forecast',
    },

    inputs: {
      title: 'Your Inputs',
      hourlyRate: 'Hourly Rate',
      hoursPerWeek: 'Billable Hours per Week',
      vacationWeeks: 'Vacation Weeks per Year',
      taxRate: 'Tax Rate (%)',
      targetAnnualNet: 'Target Annual Net Income',
      targetOptional: '(optional)',
      targetPlaceholder: 'Leave blank to calculate from inputs',
      currency: 'Currency',
      language: 'Language',
      rangeLabel: 'Range',
    },

    summary: {
      title: 'Your Income',
      perDay: 'Per Day',
      perWeek: 'Per Week',
      perMonth: 'Per Month',
      perYear: 'Per Year',
      gross: 'Gross',
      net: 'Net',
      netAfterTax: 'Net (after tax)',
      whatIf: 'What if:',
      whatIfText:
        'If you increased your hourly rate by 10%, you would earn',
      whatIfSuffix: 'per year.',
    },

    scenarios: {
      title: 'Scenario Builder',
      pessimistic: 'Pessimistic',
      pessimisticDesc: 'Conservative estimate',
      realistic: 'Realistic',
      realisticDesc: 'Most likely outcome',
      optimistic: 'Optimistic',
      optimisticDesc: 'Stretch goal',
      sharedTaxRate: 'Tax Rate (shared across all scenarios)',
    },

    range: {
      title: 'Annual Income Range',
      incomeSpread: 'Income Spread',
      range: 'Range',
    },

    chart: {
      title: 'Monthly Income Projection',
      steady: 'Steady',
      q4Heavy: 'Q4 Heavy',
      summerSlow: 'Summer Slow',
      steadyDesc:
        'Steady: Consistent income throughout the year with no seasonal variation.',
      q4HeavyDesc:
        'Q4 Heavy: Higher income in Q4 (Oct-Dec) due to year-end projects and budget spending. Common for consultants and B2B services.',
      summerSlowDesc:
        'Summer Slow: Reduced income in summer months (Jun-Aug) when clients take vacations. Common for many service businesses.',
    },

    insights: {
      title: 'Key Insights',
      realisticIncome: 'Your realistic annual income:',
      incomeRange: 'Income range:',
      capacityWarning:
        'Optimistic scenario requires {hours} hrs/week - near max capacity. Consider raising rates instead.',
      pessimisticFloor:
        'Even in pessimistic case, you earn {amount} - that is your income floor.',
      rateIncrease:
        'A 10% rate increase would add {amount} to your annual income.',
      spread: 'spread',
    },

    toast: {
      currencyChanged: 'Currency set to',
      fxFetchError: 'Unable to fetch exchange rate. Showing formatting only.',
      languageChanged: 'Language set to English',
      languageChangedEs: 'Language set to Spanish',
    },

    errors: {
      unableToCalculateIncome: 'Unable to calculate income. Please check your inputs.',
      unableToCalculateRange: 'Unable to calculate income range. Please check your inputs.',
      unableToGenerateChartData: 'Unable to generate chart data. Please check your inputs.',
    },

    chartLegend: {
      pessimistic: 'Pessimistic',
      realistic: 'Realistic',
      optimistic: 'Optimistic',
      rangeBand: 'Range',
      target: 'Target',
    },

    caseStudy: {
      title: 'Built & Designed',
      builtBy: 'Built by Robert Cushman (CushLabs.ai) as a real-use planning tool and flagship portfolio project.',
      sections: {
        problem: {
          title: 'Problem',
          body: 'Freelancers and consultants often know their hourly rate, but not what that becomes after taxes, time off, and realistic weekly capacity. This tool turns inputs into clear income outcomes and scenarios.',
        },
        design: {
          title: 'Design choices',
          body: 'Fast, keyboard-friendly inputs, instant feedback, and a forecasting mode that compares downside, baseline, and upside. Charts are designed to communicate range + trend (not just raw numbers).',
        },
        stack: {
          title: 'Stack',
          body: 'Next.js (App Router), TypeScript, Tailwind CSS, Zustand persistence, Recharts, and an EN/ES translation layer.',
        },
        privacy: {
          title: 'Privacy',
          body: 'Inputs are stored locally in your browser for convenience. No accounts required and no personal data is sent anywhere by default.',
        },
      },
    },

    chartPlaceholder: {
      title: 'Income Chart',
      comingSoon: 'Chart visualization coming soon',
    },

    rateBenchmark: {
      title: 'Rate Benchmark',
      subtitle: 'Example market ranges for English teachers in Guadalajara, Mexico (monthly).',
      monthlyRangesTitle: 'Salary ranges by institution type',
      you: 'You:',
      youMarker: 'Your estimated monthly net',
      perMonthNet: 'net/month',
      disclaimer:
        'These are example estimates for UX testing only. In a future version, this panel can be powered by live research and citations.',
      tutoringTitle: 'Private tutoring',
      tutoringPrivateLessons: 'Private lessons often range around',
      tutoringNote: 'Hourly tutoring can materially change monthly totals when combined with a school role.',
      fxUnavailable: 'FX unavailable — showing MXN values only.',
      perHour: 'per hour',
      factorsTitle: 'Factors that move the number',
      factors: {
        experience: 'Experience & certifications (TEFL/CELTA/TESOL) can raise pay significantly.',
        schoolType: 'International schools and universities tend to pay more than language centers.',
        hours: 'Teaching hours and private lessons can increase monthly income.',
      },
      institutions: {
        international: 'International Schools',
        universities: 'Universities',
        private: 'Private Schools',
        public: 'Public/Government Schools',
        language: 'Private Language Schools',
      },
    },

    common: {
      loading: 'Loading...',
      error: 'Error',
      reset: 'Reset',
    },
  },

  es: {
    header: {
      title: 'CushLabs.ai',
      home: 'Inicio',
      incomePlanner: 'Planificador de Ingresos',
      about: 'Acerca de',
    },

    footer: {
      docs: 'Documentación',
      incomePlanner: 'Planificador',
      about: 'Acerca de',
      github: 'GitHub',
      prd: 'PRD',
      predeployAudit: 'Auditoría Predeploy',
      copyright: '© {year} CushLabs.ai. Todos los derechos reservados.',
    },

    about: {
      title: 'Acerca de',
      subtitle:
        'Una guía rápida sobre lo que hace este planificador y cómo usarlo.',
      whatIsTitle: '¿Qué es esto?',
      whatIsBody:
        'Es una herramienta simple para planificar ingresos para freelancers y consultores. Te ayuda a convertir tu tarifa por hora, horas facturables, vacaciones e impuestos en números claros de ingreso neto.',
      whoIsForTitle: '¿Para quién es?',
      whoIsForBody:
        'Freelancers, consultores independientes y dueños de pequeños negocios que cobran por tiempo y quieren claridad sobre resultados realistas.',
      howToUseTitle: '¿Cómo lo uso?',
      howToUseBody:
        'Usa Vista Rápida para un solo plan. Usa Pronóstico para comparar escenarios pesimista, realista y optimista y ver tu piso de ingresos, potencial y volatilidad.',
      privacyTitle: 'Privacidad y almacenamiento',
      privacyBody:
        'Tus datos se guardan localmente en tu navegador por conveniencia. No se requiere cuenta. Por defecto no se envían datos personales a ningún lugar.',
    },

    home: {
      tagline: 'CUSHLABS.AI',
      headline:
        'Integración de IA y Desarrollo de Software Moderno para PyMEs',
      subheading:
        'Ayudo a empresas a aprovechar la IA, automatizar flujos de trabajo y construir herramientas modernas listas para uso real.',
      ctaPrimary: 'Probar Planificador',
      ctaSecondary: 'Ver Proyectos',
      features: {
        fast: {
          title: 'Entrega Rápida',
          description:
            'Sistemas listos para producción en semanas, no meses. Acceso directo, sin intermediarios.',
        },
        realUse: {
          title: 'Construido para Uso Real',
          description:
            'Código limpio, pruebas adecuadas y documentación. Sin atajos ni prototipos.',
        },
        personal: {
          title: 'Personal y Directo',
          description:
            'Un desarrollador experimentado. Más de 25 años de experiencia empresarial. Trabajas directamente conmigo.',
        },
      },
    },

    hero: {
      title: 'Planificador de Ingresos',
      subtitle:
        'Planifica tus ingresos como un profesional. Ajusta tu tarifa, horas e impuestos para ver lo que puedes ganar realmente al año.',
      note: 'Construido por Robert Cushman para freelancers, consultores y fundadores independientes que quieren claridad sobre sus números.',
    },

    viewToggle: {
      snapshot: 'Vista Rápida',
      forecast: 'Pronóstico',
    },

    inputs: {
      title: 'Tus Datos',
      hourlyRate: 'Tarifa por Hora',
      hoursPerWeek: 'Horas Facturables por Semana',
      vacationWeeks: 'Semanas de Vacaciones al Año',
      taxRate: 'Tasa de Impuestos (%)',
      targetAnnualNet: 'Ingreso Anual Neto Objetivo',
      targetOptional: '(opcional)',
      targetPlaceholder: 'Dejar en blanco para calcular de los datos',
      currency: 'Moneda',
      language: 'Idioma',
      rangeLabel: 'Rango',
    },

    summary: {
      title: 'Tus Ingresos',
      perDay: 'Por Día',
      perWeek: 'Por Semana',
      perMonth: 'Por Mes',
      perYear: 'Por Año',
      gross: 'Bruto',
      net: 'Neto',
      netAfterTax: 'Neto (después de impuestos)',
      whatIf: '¿Qué pasaría si:',
      whatIfText:
        'Si aumentaras tu tarifa por hora en 10%, ganarías',
      whatIfSuffix: 'al año.',
    },

    scenarios: {
      title: 'Constructor de Escenarios',
      pessimistic: 'Pesimista',
      pessimisticDesc: 'Estimación conservadora',
      realistic: 'Realista',
      realisticDesc: 'Resultado más probable',
      optimistic: 'Optimista',
      optimisticDesc: 'Meta ambiciosa',
      sharedTaxRate: 'Tasa de Impuestos (compartida en todos los escenarios)',
    },

    range: {
      title: 'Rango de Ingresos Anuales',
      incomeSpread: 'Diferencia de Ingresos',
      range: 'Rango',
    },

    chart: {
      title: 'Proyección Mensual de Ingresos',
      steady: 'Estable',
      q4Heavy: 'Q4 Alto',
      summerSlow: 'Verano Lento',
      steadyDesc:
        'Estable: Ingresos consistentes durante todo el año sin variación estacional.',
      q4HeavyDesc:
        'Q4 Alto: Mayores ingresos en Q4 (Oct-Dic) debido a proyectos de fin de año y gasto presupuestario. Común para consultores y servicios B2B.',
      summerSlowDesc:
        'Verano Lento: Ingresos reducidos en meses de verano (Jun-Ago) cuando los clientes toman vacaciones. Común para muchos negocios de servicios.',
    },

    insights: {
      title: 'Perspectivas Clave',
      realisticIncome: 'Tu ingreso anual realista:',
      incomeRange: 'Rango de ingresos:',
      capacityWarning:
        'El escenario optimista requiere {hours} hrs/semana - cerca de la capacidad máxima. Considera aumentar las tarifas en su lugar.',
      pessimisticFloor:
        'Incluso en el caso pesimista, ganas {amount} - ese es tu piso de ingresos.',
      rateIncrease:
        'Un aumento de tarifa del 10% agregaría {amount} a tu ingreso anual.',
      spread: 'diferencia',
    },

    toast: {
      currencyChanged: 'Moneda establecida en',
      fxFetchError: 'No se pudo obtener el tipo de cambio. Solo se mostrará el formato.',
      languageChanged: 'Idioma cambiado a inglés',
      languageChangedEs: 'Idioma cambiado a español',
    },

    errors: {
      unableToCalculateIncome: 'No se pudo calcular el ingreso. Por favor revisa tus datos.',
      unableToCalculateRange: 'No se pudo calcular el rango de ingresos. Por favor revisa tus datos.',
      unableToGenerateChartData: 'No se pudieron generar los datos del gráfico. Por favor revisa tus datos.',
    },

    chartLegend: {
      pessimistic: 'Pesimista',
      realistic: 'Realista',
      optimistic: 'Optimista',
      rangeBand: 'Rango',
      target: 'Objetivo',
    },

    caseStudy: {
      title: 'Construido y Diseñado',
      builtBy: 'Construido por Robert Cushman (CushLabs.ai) como una herramienta de planeación para uso real y proyecto principal de portafolio.',
      sections: {
        problem: {
          title: 'Problema',
          body: 'Freelancers y consultores suelen conocer su tarifa por hora, pero no cómo se traduce después de impuestos, vacaciones y una capacidad semanal realista. Esta herramienta convierte tus datos en resultados claros y escenarios.',
        },
        design: {
          title: 'Decisiones de diseño',
          body: 'Datos rápidos y amigables para teclado, retroalimentación instantánea y un modo de pronóstico que compara el peor caso, el caso base y el mejor caso. Los gráficos están pensados para comunicar rango + tendencia.',
        },
        stack: {
          title: 'Tecnología',
          body: 'Next.js (App Router), TypeScript, Tailwind CSS, persistencia con Zustand, Recharts y un sistema de traducción EN/ES.',
        },
        privacy: {
          title: 'Privacidad',
          body: 'Tus datos se guardan localmente en tu navegador por conveniencia. No se requiere cuenta y por defecto no se envían datos personales a ningún lugar.',
        },
      },
    },

    chartPlaceholder: {
      title: 'Gráfico de Ingresos',
      comingSoon: 'Visualización de gráfico próximamente',
    },

    rateBenchmark: {
      title: 'Referencia de Tarifas',
      subtitle: 'Rangos de ejemplo para maestros de inglés en Guadalajara, México (mensual).',
      monthlyRangesTitle: 'Rangos salariales por tipo de institución',
      you: 'Tú:',
      youMarker: 'Tu neto mensual estimado',
      perMonthNet: 'neto/mes',
      disclaimer:
        'Estas cifras son estimaciones de ejemplo solo para probar la interfaz. En una versión futura, este panel puede usar investigación en vivo con citas.',
      tutoringTitle: 'Clases particulares',
      tutoringPrivateLessons: 'Las clases privadas suelen estar alrededor de',
      tutoringNote: 'Las clases por hora pueden cambiar mucho el total mensual si se combinan con una escuela.',
      fxUnavailable: 'Tipo de cambio no disponible — mostrando solo valores en MXN.',
      perHour: 'por hora',
      factorsTitle: 'Factores que cambian el resultado',
      factors: {
        experience: 'Experiencia y certificaciones (TEFL/CELTA/TESOL) pueden aumentar el pago.',
        schoolType: 'Escuelas internacionales y universidades suelen pagar más que centros de idiomas.',
        hours: 'Más horas y clases privadas pueden aumentar el ingreso mensual.',
      },
      institutions: {
        international: 'Escuelas Internacionales',
        universities: 'Universidades',
        private: 'Escuelas Privadas',
        public: 'Escuelas Públicas/Gobierno',
        language: 'Escuelas de Idiomas Privadas',
      },
    },

    common: {
      loading: 'Cargando...',
      error: 'Error',
      reset: 'Restablecer',
    },
  },
}

export function useTranslation(language: Language): Translations {
  return translations[language]
}
