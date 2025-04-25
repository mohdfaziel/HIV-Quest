import { Module } from '../types';

export const initialModules: Module[] = [
  {
    id: 'what-is-hiv-aids',
    titleKey: 'module1.title',
    descriptionKey: 'module1.description',
    icon: 'info',
    unlocked: true,
    completed: false,
    score: 0,
    order: 1
  },
  {
    id: 'hiv-aids-prevention',
    titleKey: 'module2.title',
    descriptionKey: 'module2.description',
    icon: 'shield',
    unlocked: false,
    completed: false,
    score: 0,
    order: 2
  },
  {
    id: 'symptoms-and-treatment',
    titleKey: 'module3.title',
    descriptionKey: 'module3.description',
    icon: 'stethoscope',
    unlocked: false,
    completed: false,
    score: 0,
    order: 3
  },
  {
    id: 'stigma-and-discrimination',
    titleKey: 'module4.title',
    descriptionKey: 'module4.description',
    icon: 'users',
    unlocked: false,
    completed: false,
    score: 0,
    order: 4
  },
  {
    id: 'healthy-relationships',
    titleKey: 'module5.title',
    descriptionKey: 'module5.description',
    icon: 'heart',
    unlocked: false,
    completed: false,
    score: 0,
    order: 5
  }
];

export const moduleContent = {
  'what-is-hiv-aids': {
    sections: [
      {
        titleKey: 'module1.section1.title',
        contentKey: 'module1.section1.content'
      },
      {
        titleKey: 'module1.section2.title',
        contentKey: 'module1.section2.content'
      },
      {
        titleKey: 'module1.section3.title',
        contentKey: 'module1.section3.content'
      },
      {
        titleKey: 'module1.section4.title',
        contentKey: 'module1.section4.content'
      }
    ]
  },
  'hiv-aids-prevention': {
    sections: [
      {
        titleKey: 'module2.section1.title',
        contentKey: 'module2.section1.content'
      },
      {
        titleKey: 'module2.section2.title',
        contentKey: 'module2.section2.content'
      },
      {
        titleKey: 'module2.section3.title',
        contentKey: 'module2.section3.content'
      }
    ]
  },
  'symptoms-and-treatment': {
    sections: [
      {
        titleKey: 'module3.section1.title',
        contentKey: 'module3.section1.content'
      },
      {
        titleKey: 'module3.section2.title',
        contentKey: 'module3.section2.content'
      },
      {
        titleKey: 'module3.section3.title',
        contentKey: 'module3.section3.content'
      },
      {
        titleKey: 'module3.section4.title',
        contentKey: 'module3.section4.content'
      }
    ]
  },
  'stigma-and-discrimination': {
    sections: [
      {
        titleKey: 'module4.section1.title',
        contentKey: 'module4.section1.content'
      },
      {
        titleKey: 'module4.section2.title',
        contentKey: 'module4.section2.content'
      },
      {
        titleKey: 'module4.section3.title',
        contentKey: 'module4.section3.content'
      },
      {
        titleKey: 'module4.section4.title',
        contentKey: 'module4.section4.content'
      }
    ]
  },
  'healthy-relationships': {
    sections: [
      {
        titleKey: 'module5.section1.title',
        contentKey: 'module5.section1.content'
      },
      {
        titleKey: 'module5.section2.title',
        contentKey: 'module5.section2.content'
      },
      {
        titleKey: 'module5.section3.title',
        contentKey: 'module5.section3.content'
      },
      {
        titleKey: 'module5.section4.title',
        contentKey: 'module5.section4.content'
      }
    ]
  }
};