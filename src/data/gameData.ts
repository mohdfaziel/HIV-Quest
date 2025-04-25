import { PuzzlePiece, WordGame, SimulationStep } from '../types';

// Matching puzzle pieces
export const puzzlePieces: PuzzlePiece[] = [
  // Module 1: What is HIV/AIDS?
  { id: 'p1-m1-1', term: 'HIV', definition: 'Human Immunodeficiency Virus that attacks the immune system' },
  { id: 'p1-m1-2', term: 'AIDS', definition: 'Acquired Immunodeficiency Syndrome, the most advanced stage of HIV' },
  { id: 'p1-m1-3', term: 'CD4 cells', definition: 'White blood cells that HIV targets and destroys' },
  { id: 'p1-m1-4', term: 'Viral Load', definition: 'Amount of HIV in the blood' },
  { id: 'p1-m1-5', term: 'Window Period', definition: 'Time after infection when HIV tests may not detect the virus' },
  
  // Module 2: HIV/AIDS Prevention
  { id: 'p2-m2-1', term: 'PrEP', definition: 'Pre-Exposure Prophylaxis, a medication to prevent HIV infection' },
  { id: 'p2-m2-2', term: 'PEP', definition: 'Post-Exposure Prophylaxis, medication taken after potential exposure' },
  { id: 'p2-m2-3', term: 'Safer Sex', definition: 'Sexual practices that reduce the risk of STI transmission' },
  { id: 'p2-m2-4', term: 'Barrier Methods', definition: 'Physical barriers like condoms that prevent fluid exchange' },
  { id: 'p2-m2-5', term: 'Harm Reduction', definition: 'Strategies to minimize health risks associated with behaviors' },
  
  // Module 3: Symptoms and Treatment
  { id: 'p3-m3-1', term: 'Antiretroviral Therapy', definition: 'Medications that prevent HIV from replicating' },
  { id: 'p3-m3-2', term: 'Opportunistic Infections', definition: 'Infections that occur due to a weakened immune system' },
  { id: 'p3-m3-3', term: 'Adherence', definition: 'Taking medications exactly as prescribed' },
  { id: 'p3-m3-4', term: 'CD4 Count', definition: 'A measure of immune function used to monitor HIV progression' },
  { id: 'p3-m3-5', term: 'U=U', definition: 'Undetectable equals Untransmittable, meaning HIV cannot be transmitted sexually' },
  
  // Module 4: Stigma and Discrimination
  { id: 'p4-m4-1', term: 'Stigma', definition: 'Negative attitudes and beliefs toward people living with HIV' },
  { id: 'p4-m4-2', term: 'Discrimination', definition: 'Treating someone differently based on their HIV status' },
  { id: 'p4-m4-3', term: 'Disclosure', definition: 'The process of telling others about one\'s HIV status' },
  { id: 'p4-m4-4', term: 'Advocacy', definition: 'Supporting and promoting the interests of people living with HIV' },
  { id: 'p4-m4-5', term: 'Internalized Stigma', definition: 'When someone accepts negative societal views about their condition' },
  
  // Module 5: Healthy Relationships
  { id: 'p5-m5-1', term: 'Consent', definition: 'Freely given, reversible permission for a specific activity' },
  { id: 'p5-m5-2', term: 'Boundaries', definition: 'Limits and rules we set for ourselves in relationships' },
  { id: 'p5-m5-3', term: 'Coercion', definition: 'Pressuring someone to do something they don\'t want to do' },
  { id: 'p5-m5-4', term: 'Red Flags', definition: 'Warning signs of an unhealthy or abusive relationship' },
  { id: 'p5-m5-5', term: 'Communication', definition: 'The exchange of thoughts, feelings, and needs between people' }
];

// Word Games for each module
export const wordGames: WordGame[] = [
  {
    id: 'wg-m1',
    moduleId: 'what-is-hiv-aids',
    words: ['VIRUS', 'IMMUNE', 'TRANSMISSION', 'PREVENTION', 'ANTIBODY', 'TEST', 'BLOOD', 'INFECTION'],
    clues: [
      'A microorganism that infects cells and may cause disease',
      'The body system that HIV attacks',
      'How HIV passes from one person to another',
      'Actions taken to stop HIV infection',
      'Protein produced by the body to fight infections',
      'Way to determine if someone has HIV',
      'Bodily fluid that can transmit HIV',
      'The process of HIV entering the body'
    ],
    wordsTranslationKeys: [
      'wordgame.m1.word1',
      'wordgame.m1.word2',
      'wordgame.m1.word3',
      'wordgame.m1.word4',
      'wordgame.m1.word5',
      'wordgame.m1.word6',
      'wordgame.m1.word7',
      'wordgame.m1.word8'
    ],
    cluesTranslationKeys: [
      'wordgame.m1.clue1',
      'wordgame.m1.clue2',
      'wordgame.m1.clue3',
      'wordgame.m1.clue4',
      'wordgame.m1.clue5',
      'wordgame.m1.clue6',
      'wordgame.m1.clue7',
      'wordgame.m1.clue8'
    ]
  },
  {
    id: 'wg-m2',
    moduleId: 'hiv-aids-prevention',
    words: ['CONDOM', 'PREP', 'PEP', 'TESTING', 'NEEDLE', 'ABSTINENCE', 'PROTECTION', 'BARRIER'],
    clues: [
      'Latex covering used during sex to prevent HIV',
      'Medication taken daily to prevent HIV infection',
      'Emergency HIV prevention after possible exposure',
      'Regular screening for HIV status',
      'Item used for injection that should never be shared',
      'Not having sex, 100% effective for preventing sexual transmission',
      'Methods to shield oneself from HIV',
      'Something that blocks the transmission of HIV'
    ]
  },
  {
    id: 'wg-m3',
    moduleId: 'symptoms-and-treatment',
    words: ['SYMPTOMS', 'MEDICATION', 'TREATMENT', 'ADHERENCE', 'DOCTOR', 'VIRAL', 'UNDETECTABLE', 'THERAPY'],
    clues: [
      'Signs that the body is fighting HIV',
      'Drugs taken to control HIV',
      'Medical care for HIV',
      'Taking medications as prescribed',
      'Healthcare provider who manages HIV care',
      'Related to the virus in the body',
      'When HIV levels are so low they cannot be measured',
      'Systematic approach to treating HIV'
    ]
  },
  {
    id: 'wg-m4',
    moduleId: 'stigma-and-discrimination',
    words: ['STIGMA', 'PREJUDICE', 'SUPPORT', 'EDUCATION', 'RIGHTS', 'ACCEPTANCE', 'ADVOCACY', 'EMPATHY'],
    clues: [
      'Negative attitudes toward people with HIV',
      'Unfair judgment before knowing facts',
      'Helping others with HIV',
      'Learning accurate information about HIV',
      'Legal protections for people with HIV',
      'Embracing people regardless of HIV status',
      'Working to improve conditions for people with HIV',
      'Understanding another\'s feelings and perspective'
    ]
  },
  {
    id: 'wg-m5',
    moduleId: 'healthy-relationships',
    words: ['CONSENT', 'RESPECT', 'BOUNDARY', 'COMMUNICATION', 'TRUST', 'HONESTY', 'EQUALITY', 'SAFETY'],
    clues: [
      'Permission that is freely given',
      'Valuing another person\'s wishes and feelings',
      'Personal limit in a relationship',
      'Sharing thoughts and feelings clearly',
      'Belief in someone\'s reliability',
      'Being truthful with partners',
      'Balance of power in a relationship',
      'Freedom from harm in a relationship'
    ]
  }
];

// Simulation scenarios
export const simulationSteps: SimulationStep[] = [
  // Module 2: HIV/AIDS Prevention
  {
    id: 'sim-m2-1',
    moduleId: 'hiv-aids-prevention',
    scenario: 'You\'re about to have sex with a new partner. What\'s the most important step to protect yourself?',
    options: [
      'Assume they don\'t have any STIs since they look healthy',
      'Use protection and discuss sexual health history',
      'Take antibiotics after sex just in case',
      'There\'s no need to worry if you only do it once'
    ],
    consequences: [
      'Appearances tell you nothing about someone\'s HIV status. Many people with HIV look and feel completely healthy.',
      'This is the safest approach. Using condoms and having an open conversation about testing and sexual health protects both of you.',
      'Antibiotics don\'t prevent or treat HIV, and taking them unnecessarily contributes to antibiotic resistance.',
      'Even one instance of unprotected sex can lead to HIV transmission if your partner is infected.'
    ],
    correctOption: 1,
    scenarioKey: 'simulation.m2.s1.scenario',
    optionsKeys: [
      'simulation.m2.s1.option1',
      'simulation.m2.s1.option2',
      'simulation.m2.s1.option3',
      'simulation.m2.s1.option4'
    ],
    consequencesKeys: [
      'simulation.m2.s1.consequence1',
      'simulation.m2.s1.consequence2',
      'simulation.m2.s1.consequence3',
      'simulation.m2.s1.consequence4'
    ]
  },
  // Module 3: Symptoms and Treatment
  {
    id: 'sim-m3-1',
    moduleId: 'symptoms-and-treatment',
    scenario: 'You\'ve been diagnosed with HIV and started medication. After a few months, you feel completely normal. What should you do?',
    options: [
      'Stop taking your medication since you feel better',
      'Continue taking your medication exactly as prescribed',
      'Take your medication only when you feel sick',
      'Cut your dosage in half to reduce side effects'
    ],
    consequences: [
      'Stopping your medication allows HIV to multiply and damage your immune system, even if you feel fine. It can also lead to drug resistance.',
      'This is the correct approach. HIV medications work by keeping the virus suppressed, which requires consistent daily treatment even when you feel healthy.',
      'HIV medication must be taken consistently to be effective. Taking it irregularly can lead to drug resistance.',
      'Never adjust your HIV medication dosage without medical supervision. The prescribed dose is necessary to suppress the virus.'
    ],
    correctOption: 1
  },
  // Module 4: Stigma and Discrimination
  {
    id: 'sim-m4-1',
    moduleId: 'stigma-and-discrimination',
    scenario: 'Your friend tells you they are HIV positive. How should you respond?',
    options: [
      'Tell them you need some time away from them for your safety',
      'Ask invasive questions about how they got infected',
      'Tell other friends so they can protect themselves',
      'Express support and ask how you can be there for them'
    ],
    consequences: [
      'This response is based on misinformation. HIV cannot be transmitted through casual contact like sharing food, hugging, or being in the same room.',
      'How someone acquired HIV isn\'t relevant to your friendship. This question often comes from a place of judgment and can be hurtful.',
      'Sharing someone\'s HIV status without their permission violates their privacy and can expose them to discrimination and harm.',
      'This supportive response acknowledges their trust in you and offers help without judgment or fear.'
    ],
    correctOption: 3
  },
  // Module 5: Healthy Relationships
  {
    id: 'sim-m5-1',
    moduleId: 'healthy-relationships',
    scenario: 'Your partner wants to have sex, but you don\'t feel ready. What\'s the healthiest response?',
    options: [
      'Give in to avoid conflict or disappointing them',
      'Clearly communicate that you\'re not ready and suggest other ways to be intimate',
      'Make up an excuse this time but expect to give in eventually',
      'Tell them they should see other people if they want sex'
    ],
    consequences: [
      'Consent given under pressure isn\'t true consent. Doing something you\'re not comfortable with can harm your emotional well-being and the relationship.',
      'This response respects your own boundaries while acknowledging your partner\'s feelings. Healthy relationships involve open communication about needs and boundaries.',
      'Using excuses avoids the real issue and sets up expectations that you\'ll eventually do something you\'re not comfortable with.',
      'This response is passive-aggressive and doesn\'t address the core issue of communication and respecting each other\'s boundaries.'
    ],
    correctOption: 1
  }
];