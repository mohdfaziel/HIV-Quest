import { Question } from '../types';

export const quizQuestions: Question[] = [
  // Module 1: What is HIV/AIDS?
  {
    id: 'q1-m1',
    moduleId: 'what-is-hiv-aids',
    question: 'What does HIV stand for?',
    options: [
      'Human Immunodeficiency Virus',
      'Highly Infectious Virus',
      'Human Immune Variant',
      'Health Impaired Virus'
    ],
    correctAnswer: 0,
    explanation: 'HIV stands for Human Immunodeficiency Virus. It attacks the body\'s immune system, specifically the CD4 cells (T cells), which help the immune system fight off infections.'
  },
  {
    id: 'q2-m1',
    moduleId: 'what-is-hiv-aids',
    question: 'Which of the following is NOT a way HIV can be transmitted?',
    options: [
      'Through sexual contact',
      'By sharing food or drinks',
      'From mother to child during birth',
      'By sharing needles'
    ],
    correctAnswer: 1,
    explanation: 'HIV cannot be transmitted by sharing food or drinks, casual contact, hugging, or mosquito bites. It is primarily transmitted through bodily fluids such as blood, semen, vaginal fluids, and breast milk.'
  },
  {
    id: 'q3-m1',
    moduleId: 'what-is-hiv-aids',
    question: 'What is AIDS?',
    options: [
      'A virus that causes immune system damage',
      'The most advanced stage of HIV infection',
      'A curable infectious disease',
      'A bacterial infection related to HIV'
    ],
    correctAnswer: 1,
    explanation: 'AIDS (Acquired Immunodeficiency Syndrome) is the most advanced stage of HIV infection. It occurs when the immune system is badly damaged and becomes vulnerable to opportunistic infections.'
  },
  {
    id: 'q4-m1',
    moduleId: 'what-is-hiv-aids',
    question: 'Which of these statements about HIV is true?',
    options: [
      'HIV always leads to AIDS within one year',
      'HIV can be transmitted by mosquitoes',
      'With proper treatment, people with HIV can live long, healthy lives',
      'HIV can be cured with current medications'
    ],
    correctAnswer: 2,
    explanation: 'With proper antiretroviral treatment, people with HIV can live long, healthy lives and prevent transmitting the virus to their sexual partners. While there is no cure yet, treatment can reduce the viral load to undetectable levels.'
  },
  
  // Module 2: HIV/AIDS Prevention
  {
    id: 'q1-m2',
    moduleId: 'hiv-aids-prevention',
    question: 'Which of these is the most effective way to prevent sexual transmission of HIV?',
    options: [
      'Taking antibiotics before sexual contact',
      'Using condoms correctly every time',
      'Washing after sexual contact',
      'Having fewer sexual partners'
    ],
    correctAnswer: 1,
    explanation: 'Using condoms correctly and consistently during sexual contact is one of the most effective ways to prevent HIV transmission. Condoms create a barrier that prevents the exchange of bodily fluids.'
  },
  {
    id: 'q2-m2',
    moduleId: 'hiv-aids-prevention',
    question: 'What is PrEP?',
    options: [
      'A treatment for people who already have HIV',
      'A vaccine against HIV',
      'A medication people at risk for HIV take to prevent getting HIV',
      'A test to determine if someone has been exposed to HIV'
    ],
    correctAnswer: 2,
    explanation: 'PrEP (Pre-Exposure Prophylaxis) is a medication that people at high risk for HIV take to prevent getting infected. When taken as prescribed, PrEP is highly effective at preventing HIV infection.'
  },
  {
    id: 'q3-m2',
    moduleId: 'hiv-aids-prevention',
    question: 'How can people who inject drugs reduce their risk of HIV transmission?',
    options: [
      'By sharing only with close friends',
      'By rinsing needles with water between uses',
      'By using only new, sterile needles and equipment',
      'By injecting drugs less frequently'
    ],
    correctAnswer: 2,
    explanation: 'Using only new, sterile needles and injection equipment for each injection is the most effective way to prevent HIV transmission among people who inject drugs. Never share needles, syringes, or other injection equipment.'
  },
  {
    id: 'q4-m2',
    moduleId: 'hiv-aids-prevention',
    question: 'Which statement about HIV testing is TRUE?',
    options: [
      'HIV tests can detect the virus immediately after infection',
      'Regular testing is recommended for people with multiple partners',
      'A negative HIV test means you can\'t get HIV in the future',
      'HIV testing is only necessary if you have symptoms'
    ],
    correctAnswer: 1,
    explanation: 'Regular HIV testing is recommended for people with multiple partners or other risk factors. Most HIV tests can detect infection 2-3 weeks after exposure, though some may take longer to show a positive result.'
  },
  
  // Module 3: Symptoms and Treatment
  {
    id: 'q1-m3',
    moduleId: 'symptoms-and-treatment',
    question: 'What are common early symptoms of HIV infection?',
    options: [
      'No symptoms at all',
      'Flu-like symptoms including fever, sore throat, and fatigue',
      'Skin rashes and blindness',
      'Immediate weight loss and night sweats'
    ],
    correctAnswer: 1,
    explanation: 'Many people experience flu-like symptoms 2-4 weeks after HIV infection, including fever, sore throat, fatigue, swollen lymph nodes, and rash. However, some people may have no symptoms at all for years.'
  },
  {
    id: 'q2-m3',
    moduleId: 'symptoms-and-treatment',
    question: 'What is antiretroviral therapy (ART)?',
    options: [
      'A cure for HIV',
      'A combination of medications that suppress HIV replication',
      'A vaccine to prevent HIV infection',
      'A treatment for opportunistic infections'
    ],
    correctAnswer: 1,
    explanation: 'Antiretroviral therapy (ART) is a combination of medications that suppress HIV replication in the body. While not a cure, ART can reduce the amount of virus in the blood to undetectable levels, allowing the immune system to recover and preventing transmission.'
  },
  {
    id: 'q3-m3',
    moduleId: 'symptoms-and-treatment',
    question: 'Why is medication adherence important in HIV treatment?',
    options: [
      'Missing doses isn\'t a problem with modern medications',
      'Adherence is only important in the first year of treatment',
      'Missing doses can lead to drug resistance',
      'Adherence only affects the person\'s own health, not transmission risk'
    ],
    correctAnswer: 2,
    explanation: 'Missing doses of HIV medication can allow the virus to replicate and develop resistance to the drugs, making them less effective. Consistent adherence to treatment is essential for maintaining an undetectable viral load and preventing transmission.'
  },
  {
    id: 'q4-m3',
    moduleId: 'symptoms-and-treatment',
    question: 'What does "undetectable = untransmittable" (U=U) mean?',
    options: [
      'People with undetectable viral loads are cured of HIV',
      'People with undetectable viral loads cannot transmit HIV sexually',
      'Undetectable viral loads mean the test is faulty',
      'Treatment is no longer needed once the virus is undetectable'
    ],
    correctAnswer: 1,
    explanation: 'U=U means that people with HIV who maintain an undetectable viral load (through consistent ART) have effectively no risk of sexually transmitting HIV to their partners. This is a major advancement in HIV prevention and treatment.'
  },
  
  // Module 4: Stigma and Discrimination
  {
    id: 'q1-m4',
    moduleId: 'stigma-and-discrimination',
    question: 'What is HIV stigma?',
    options: [
      'A medical complication of HIV infection',
      'Negative attitudes and beliefs about people living with HIV',
      'A legal classification for HIV transmission',
      'A support group for people with HIV'
    ],
    correctAnswer: 1,
    explanation: 'HIV stigma refers to negative attitudes, beliefs, and judgments about people living with HIV. It can lead to discrimination, fear of seeking testing or treatment, and social isolation.'
  },
  {
    id: 'q2-m4',
    moduleId: 'stigma-and-discrimination',
    question: 'How can stigma affect HIV prevention and treatment?',
    options: [
      'Stigma has no effect on HIV prevention',
      'Stigma only affects people already diagnosed with HIV',
      'Stigma can discourage people from getting tested or seeking care',
      'Stigma helps motivate people to avoid risky behaviors'
    ],
    correctAnswer: 2,
    explanation: 'Stigma can discourage people from getting tested, seeking care, or disclosing their status to partners. It creates barriers to effective prevention and treatment, contributing to ongoing transmission.'
  },
  {
    id: 'q3-m4',
    moduleId: 'stigma-and-discrimination',
    question: 'Which of the following is an example of HIV discrimination?',
    options: [
      'Providing information about HIV prevention',
      'Refusing to hire someone because they have HIV',
      'Recommending regular HIV testing',
      'Using accurate language when discussing HIV'
    ],
    correctAnswer: 1,
    explanation: 'Refusing to hire someone because they have HIV is discrimination. In many countries, laws protect people with HIV from discrimination in employment, housing, and public accommodations.'
  },
  {
    id: 'q4-m4',
    moduleId: 'stigma-and-discrimination',
    question: 'Which approach helps reduce HIV stigma?',
    options: [
      'Using terms like "HIV victim" to emphasize the seriousness of HIV',
      'Keeping HIV status private to avoid uncomfortable conversations',
      'Educating people about the facts of HIV transmission and treatment',
      'Separating people with HIV from the general population'
    ],
    correctAnswer: 2,
    explanation: 'Education about the facts of HIV transmission, prevention, and treatment helps combat misinformation and fear, which are major drivers of stigma. Using respectful, person-first language and challenging stereotypes also helps reduce stigma.'
  },
  
  // Module 5: Healthy Relationships
  {
    id: 'q1-m5',
    moduleId: 'healthy-relationships',
    question: 'What are key components of a healthy relationship?',
    options: [
      'One person making all the decisions',
      'Keeping secrets from each other',
      'Mutual respect, trust, and good communication',
      'Always agreeing with your partner'
    ],
    correctAnswer: 2,
    explanation: 'Healthy relationships are built on mutual respect, trust, honesty, support, equality, good communication, and clear boundaries. Both partners should feel safe and valued.'
  },
  {
    id: 'q2-m5',
    moduleId: 'healthy-relationships',
    question: 'What does it mean to give consent?',
    options: [
      'Saying yes because you feel pressured',
      'Freely agreeing to participate in a specific activity',
      'Not saying no when someone suggests an activity',
      'Agreeing once means consenting to all future activities'
    ],
    correctAnswer: 1,
    explanation: 'Consent means freely and enthusiastically agreeing to participate in a specific activity. Consent must be given without pressure, can be withdrawn at any time, and should be continuous throughout any activity.'
  },
  {
    id: 'q3-m5',
    moduleId: 'healthy-relationships',
    question: 'Which of these is a warning sign of an unhealthy relationship?',
    options: [
      'Respecting each other\'s privacy',
      'Taking time for individual interests',
      'Setting clear boundaries',
      'Controlling who the other person can see or talk to'
    ],
    correctAnswer: 3,
    explanation: 'Controlling behavior, such as dictating who the other person can see or talk to, is a serious warning sign of an unhealthy or potentially abusive relationship. Other red flags include jealousy, isolation, pressure, disrespect for boundaries, and manipulation.'
  },
  {
    id: 'q4-m5',
    moduleId: 'healthy-relationships',
    question: 'How should sexual health be discussed in relationships?',
    options: [
      'It\'s better not to discuss it to avoid awkwardness',
      'Only if there\'s a problem or symptom',
      'Openly, honestly, and without judgment',
      'Only after becoming sexually active'
    ],
    correctAnswer: 2,
    explanation: 'Sexual health should be discussed openly, honestly, and without judgment, ideally before becoming sexually active. This includes talking about STI testing, prevention methods, boundaries, and comfort levels with different activities.'
  }
];