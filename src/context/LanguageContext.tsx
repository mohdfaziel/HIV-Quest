import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define available languages
export type Language = 'en' | 'id';

// Define context type
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Create the LanguageProvider component
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'en';
  });

  // Update local storage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translate function
  const t = (key: string): string => {
    const translations = language === 'en' ? enTranslations : idTranslations;
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Create a custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// English translations
const enTranslations: Record<string, string> = {
  // Navigation
  'nav.home': 'Home',
  'nav.meetCreator': 'Meet the Creator',
  'nav.signIn': 'Sign In',
  'nav.logout': 'Logout',
  'nav.dashboard': 'Dashboard',
  'nav.profile': 'Profile',
  
  // Login Page
  'login.title': 'Login',
  'login.description': 'Sign in to access HIV Quest and continue your educational journey.',
  'login.welcome': 'Welcome',
  'login.signIn': 'Sign in to access HIV Quest',
  'login.loginRequired': 'Please log in to continue your HIV Quest journey.',
  'login.googleSignIn': 'Sign in with Google',
  'login.agreement': 'By signing in, you agree to our',
  'login.terms': 'Terms of Service',
  'login.privacy': 'Privacy Policy',
  'login.disclaimer': 'This educational resource is designed to provide accurate information about HIV to teenagers. All information is sourced from reputable health organizations.',
  
  // Footer
  'footer.resources': 'Resources',
  'footer.support': 'Support',
  'footer.contactUs': 'Contact Us',
  'footer.rights': 'All rights reserved.',
  'footer.disclaimer': 'This educational resource is for informational purposes only and is not a substitute for professional medical advice.',
  
  // Contact Form
  'contact.title': 'Contact Us',
  'contact.description': 'Fill out the form below and click "Compose Email" to open Gmail with your message pre-filled.',
  'contact.name': 'Your Name',
  'contact.email': 'Email Address',
  'contact.subject': 'Subject',
  'contact.message': 'Message',
  'contact.send': 'Compose Email',
  'contact.sending': 'Opening Gmail...',
  'contact.thankYou': 'Thank You!',
  'contact.success': 'A Gmail compose window has been opened in a new tab. Please review and send your email from there.',
  'contact.another': 'Send Another Message',
  
  // About Creator
  'creator.title': 'About the Creator',
  'creator.nursing': 'Nursing Student',
  'creator.metaDescription': 'Learn about Juwita Farah Shamlotta, the creator of HIV Quest educational platform.',
  'creator.goBack': 'Go back',
  'creator.instagramProfile': 'Instagram profile',
  'creator.sendEmail': 'Send email',
  'creator.paragraph1': 'I am 21 years old and currently a 6th-semester student in the Bachelor of Nursing program. I have a strong passion for education and enjoy contributing to meaningful and impactful learning experiences.',
  'creator.paragraph2': 'As part of my final assignment, I am conducting research focused on health education. To support this, I proposed the idea of creating an educational game as a learning medium about HIV/AIDS, aimed at increasing awareness and knowledge—especially among teenagers.',
  'creator.paragraph3': 'With the valuable support of my friend',
  'creator.paragraph3Continued': 'a talented Software Engineer, I was able to bring this idea to life. He helped develop this interactive game to ensure it is both informative and engaging.',
  'creator.paragraph4': 'This educational media was created to help inform and empower young people in a fun and accessible way, while also supporting efforts to reduce stigma and promote healthier, more informed communities.',
  'creator.contactPrompt': 'Feel free to reach out via Instagram or email if you have any questions or would like to connect!',
  
  // Home Page
  'home.title': 'HIV Quest - A Journey to Knowledge',
  'home.subtitle': 'Learn about HIV through interactive education',
  'home.getStarted': 'Get Started',
  'home.learnMore': 'Learn More',
  'home.welcomeMessage': 'Welcome to HIV Quest, your interactive guide to understanding HIV/AIDS. Explore our educational modules, take quizzes, and learn important facts about HIV prevention, treatment, and support.',
  
  // Home Features Section
  'home.features.title': 'How You Will Learn',
  'home.features.subtitle': 'Our platform offers multiple ways to engage with the content and improve your understanding of HIV/AIDS.',
  'home.features.educational.title': 'Educational Content',
  'home.features.educational.description': 'Access evidence-based information about HIV/AIDS presented in clear, easy-to-understand modules.',
  'home.features.interactive.title': 'Interactive Learning',
  'home.features.interactive.description': 'Engage with games, quizzes, and simulations that reinforce key concepts in an enjoyable way.',
  'home.features.progress.title': 'Track Progress',
  'home.features.progress.description': 'Monitor your learning journey and see how your knowledge improves over time.',
  'home.features.stigma.title': 'Combat Stigma',
  'home.features.stigma.description': 'Learn how to address misconceptions and reduce stigma around HIV/AIDS in your community.',
  
  // Home CTA Section
  'home.cta.title': 'Ready to Begin Your Learning Journey?',
  'home.cta.description': 'Sign up today and start exploring our interactive educational content on HIV/AIDS awareness and prevention.',
  
  // Home Modules Section
  'home.modules.title': 'Explore Our Learning Modules',
  'home.modules.subtitle': 'Each module covers key aspects of HIV/AIDS education, from basics to advanced topics.',
  
  // Dashboard
  'dashboard.title': 'Your Learning Dashboard',
  'dashboard.welcome': 'Welcome back',
  'dashboard.continueLearn': 'Continue Learning',
  'dashboard.startNewModule': 'Start a New Module',
  'dashboard.progress': 'Your Progress',
  'dashboard.completed': 'Completed',
  'dashboard.inProgress': 'In Progress',
  'dashboard.notStarted': 'Not Started',
  'dashboard.moreModules': 'More modules coming soon!',
  'dashboard.moreModulesDesc': 'We\'re developing additional learning content to enhance your educational journey.',
  'dashboard.achievements': 'Your Achievements',
  'dashboard.achievementsDesc': 'Congratulations on your achievements! Each badge represents a module you\'ve completed.',
  'dashboard.noAchievements': 'No achievements yet',
  'dashboard.noAchievementsDesc': 'Complete modules to earn achievement badges and track your learning progress.',
  
  // Activities - Combined section to avoid duplicates
  'activities.tab': 'Activities',
  'activities.continueToActivities': 'Continue to Activities',
  'activities.backToActivities': 'Back to Activities',
  'activities.matchingGame.title': 'Matching Game',
  'activities.matchingGame.description': 'Match terms with their definitions to test your knowledge.',
  'activities.matchingGame.start': 'Start Game',
  'activities.wordGame.title': 'Word Game',
  'activities.wordGame.description': 'Unscramble words related to this module\'s topics.',
  'activities.wordGame.start': 'Start Game',
  'activities.simulation.title': 'Decision Simulation',
  'activities.simulation.description': 'Practice making informed decisions in realistic scenarios.',
  'activities.simulation.start': 'Start Simulation',
  'activities.quiz.title': 'Module Quiz',
  'activities.quiz.description': 'Test your knowledge with a quiz covering all topics in this module.',
  'activities.quiz.requirement': 'Score at least 60% to unlock the next module',
  'activities.quiz.start': 'Take Quiz',
  
  // Modules
  'module.start': 'Start Module',
  'module.continue': 'Continue',
  'module.complete': 'Complete',
  'module.next': 'Next',
  'module.previous': 'Previous',
  'module.finishModule': 'Finish Module',
  'module.duration': 'Duration',
  'module.minutes': 'minutes',
  'module.difficulty': 'Difficulty',
  'module.beginner': 'Beginner',
  'module.intermediate': 'Intermediate',
  'module.advanced': 'Advanced',
  'module.content': 'Content',
  
  // Module 1: HIV Basics
  'module1.title': 'HIV Basics',
  'module1.description': 'Learn the fundamentals of HIV, how it affects the body, and the difference between HIV and AIDS.',
  'module1.section1.title': 'What is HIV?',
  'module1.section1.content': 'HIV (Human Immunodeficiency Virus) is a virus that attacks the body\'s immune system, specifically the CD4 cells (T cells), which help the immune system fight off infections.',
  'module1.section2.title': 'How HIV Spreads',
  'module1.section2.content': 'HIV can be transmitted through specific bodily fluids including blood, semen, pre-seminal fluid, rectal fluids, vaginal fluids, and breast milk. These fluids must come in contact with a mucous membrane or damaged tissue or be directly injected into the bloodstream for transmission to occur.',
  'module1.section3.title': 'Difference Between HIV and AIDS',
  'module1.section3.content': 'HIV is the virus that causes AIDS. AIDS (Acquired Immunodeficiency Syndrome) is the most severe phase of HIV infection. People with AIDS have such badly damaged immune systems that they get an increasing number of severe illnesses, called opportunistic infections.',
  'module1.section4.title': 'Testing and Diagnosis',
  'module1.section4.content': 'HIV testing is the only way to know for sure if someone has HIV. There are several types of tests available, including antibody tests, antigen/antibody tests, and nucleic acid tests (NATs). Most tests can detect HIV 2-3 weeks after infection, though some may take longer to show a positive result.',
  
  // Module 2: Prevention & Safety
  'module2.title': 'Prevention & Safety',
  'module2.description': 'Discover effective strategies to prevent HIV transmission and understand safer practices.',
  'module2.section1.title': 'Prevention Methods',
  'module2.section1.content': 'There are several ways to prevent HIV transmission including using condoms, taking PrEP (pre-exposure prophylaxis), getting tested regularly, and avoiding sharing needles or other injection equipment.',
  'module2.section2.title': 'PrEP and PEP',
  'module2.section2.content': 'PrEP is a daily pill that can prevent HIV infection. PEP (post-exposure prophylaxis) is a treatment that may prevent HIV infection if started within 72 hours after possible exposure to the virus.',
  'module2.section3.title': 'HIV and Vulnerable Populations',
  'module2.section3.content': 'Certain populations may be at higher risk for HIV due to various social, economic, and behavioral factors. Understanding these vulnerabilities helps create more effective prevention strategies.',
  
  // Module 3: Testing & Treatment
  'module3.title': 'Testing & Treatment',
  'module3.description': 'Learn about HIV testing options, what to expect, and current treatment approaches.',
  'module3.section1.title': 'Types of HIV Tests',
  'module3.section1.content': 'There are several types of HIV tests including antibody tests, antigen/antibody tests, and nucleic acid tests (NATs). These tests may be performed on blood, oral fluid, or urine depending on the specific test.',
  'module3.section2.title': 'Treatment Options',
  'module3.section2.content': 'While there is no cure for HIV, it can be effectively controlled with proper medical care. Antiretroviral therapy (ART) is the use of HIV medicines to treat HIV infection. ART helps people with HIV live longer, healthier lives and reduces the risk of HIV transmission.',
  'module3.section3.title': 'Living with HIV',
  'module3.section3.content': 'With proper treatment, people with HIV can live long, healthy lives. Regular medical care, taking medications as prescribed, and maintaining overall health through proper nutrition, exercise, and mental health care are essential components of living well with HIV.',
  'module3.section4.title': 'Undetectable = Untransmittable (U=U)',
  'module3.section4.content': 'When people with HIV take their medication as prescribed and maintain an undetectable viral load, they have effectively no risk of sexually transmitting HIV to their HIV-negative partners. This concept, known as U=U, has transformed how we think about HIV treatment and prevention.',
  
  // Module 4: Stigma and Discrimination
  'module4.title': 'Stigma and Discrimination',
  'module4.description': 'Learn about the impact of stigma and discrimination on people living with HIV and strategies to combat these harmful attitudes.',
  'module4.section1.title': 'Understanding HIV Stigma',
  'module4.section1.content': 'HIV stigma refers to negative attitudes and beliefs about people living with HIV. It can lead to discrimination, which is the unfair treatment of people based on their HIV status.',
  'module4.section2.title': 'Impact of Stigma',
  'module4.section2.content': 'Stigma can lead to isolation, anxiety, depression, and reluctance to seek testing or treatment. It affects individuals, families, and communities and can be a major barrier to HIV prevention and care.',
  'module4.section3.title': 'Addressing Misconceptions',
  'module4.section3.content': 'Many stigmatizing attitudes are based on outdated information or misconceptions about how HIV is transmitted and what it means to live with HIV today. Education and accurate information are key to combating stigma.',
  'module4.section4.title': 'Creating Supportive Environments',
  'module4.section4.content': 'Communities, healthcare settings, and workplaces can take steps to reduce stigma and create supportive environments for people living with HIV. This includes implementing anti-discrimination policies and providing education and training.',
  
  // Module 5: Healthy Relationships
  'module5.title': 'Healthy Relationships',
  'module5.description': 'Explore how to maintain healthy relationships and communicate effectively about HIV status, testing, and prevention methods.',
  'module5.section1.title': 'Communication in Relationships',
  'module5.section1.content': 'Open and honest communication is essential in any relationship, especially when discussing sensitive topics like sexual health and HIV status. Learning effective communication skills can help build trust and understanding.',
  'module5.section2.title': 'Disclosure and Privacy',
  'module5.section2.content': 'Deciding when and how to disclose HIV status is a personal choice. Understanding your rights to privacy and developing strategies for disclosure can help navigate these sensitive conversations.',
  'module5.section3.title': 'Negotiating Safer Sex',
  'module5.section3.content': 'Learning how to discuss and negotiate safer sex practices with partners is an important skill that can help prevent HIV transmission and promote sexual health.',
  'module5.section4.title': 'Supporting Partners',
  'module5.section4.content': 'Whether you or your partner is living with HIV, supporting each other through testing, treatment, and maintaining health is an important aspect of a caring relationship.',
  
  // Quizzes
  'quiz.start': 'Start Quiz',
  'quiz.next': 'Next Question',
  'quiz.previous': 'Previous Question',
  'quiz.submit': 'Submit Answers',
  'quiz.correct': 'Correct!',
  'quiz.incorrect': 'Incorrect',
  'quiz.review': 'Review Answers',
  'quiz.tryAgain': 'Try Again',
  'quiz.score': 'Your Score',
  'quiz.outOf': 'out of',
  'quiz.selectAnswer': 'Please select an answer',
  'quiz.question': 'Question',
  
  // Quiz 1: HIV Basics
  'quiz1.title': 'HIV Basics Quiz',
  'quiz1.q1': 'What does HIV stand for?',
  'quiz1.q1.a': 'Human Immunodeficiency Virus',
  'quiz1.q1.b': 'Human Immune Virus',
  'quiz1.q1.c': 'Human Infection Virus',
  'quiz1.q1.d': 'High Immune Virus',
  'quiz1.q2': 'Which cells does HIV primarily attack?',
  'quiz1.q2.a': 'CD4 cells (T cells)',
  'quiz1.q2.b': 'Red blood cells',
  'quiz1.q2.c': 'Liver cells',
  'quiz1.q2.d': 'Brain cells',
  
  // Quiz Questions - By Module
  'quiz.m1.q1.question': 'What does HIV stand for?',
  'quiz.m1.q1.option1': 'Human Immunodeficiency Virus',
  'quiz.m1.q1.option2': 'Highly Infectious Virus',
  'quiz.m1.q1.option3': 'Human Immune Variant',
  'quiz.m1.q1.option4': 'Health Impaired Virus',
  'quiz.m1.q1.explanation': 'HIV stands for Human Immunodeficiency Virus. It attacks the body\'s immune system, specifically the CD4 cells (T cells), which help the immune system fight off infections.',
  
  'quiz.m1.q2.question': 'Which of the following is NOT a way HIV can be transmitted?',
  'quiz.m1.q2.option1': 'Through sexual contact',
  'quiz.m1.q2.option2': 'By sharing food or drinks',
  'quiz.m1.q2.option3': 'From mother to child during birth',
  'quiz.m1.q2.option4': 'By sharing needles',
  'quiz.m1.q2.explanation': 'HIV cannot be transmitted by sharing food or drinks, casual contact, hugging, or mosquito bites. It is primarily transmitted through bodily fluids such as blood, semen, vaginal fluids, and breast milk.',
  
  'quiz.m1.q3.question': 'What is AIDS?',
  'quiz.m1.q3.option1': 'A virus that causes immune system damage',
  'quiz.m1.q3.option2': 'The most advanced stage of HIV infection',
  'quiz.m1.q3.option3': 'A curable infectious disease',
  'quiz.m1.q3.option4': 'A bacterial infection related to HIV',
  'quiz.m1.q3.explanation': 'AIDS (Acquired Immunodeficiency Syndrome) is the most advanced stage of HIV infection. It occurs when the immune system is badly damaged and becomes vulnerable to opportunistic infections.',
  
  'quiz.m1.q4.question': 'Which of these statements about HIV is true?',
  'quiz.m1.q4.option1': 'HIV always leads to AIDS within one year',
  'quiz.m1.q4.option2': 'HIV can be transmitted by mosquitoes',
  'quiz.m1.q4.option3': 'With proper treatment, people with HIV can live long, healthy lives',
  'quiz.m1.q4.option4': 'HIV can be cured with current medications',
  'quiz.m1.q4.explanation': 'With proper antiretroviral treatment, people with HIV can live long, healthy lives and prevent transmitting the virus to their sexual partners. While there is no cure yet, treatment can reduce the viral load to undetectable levels.',
  
  'quiz.m2.q1.question': 'Which of these is the most effective way to prevent sexual transmission of HIV?',
  'quiz.m2.q1.option1': 'Taking antibiotics before sexual contact',
  'quiz.m2.q1.option2': 'Using condoms correctly every time',
  'quiz.m2.q1.option3': 'Washing after sexual contact',
  'quiz.m2.q1.option4': 'Having fewer sexual partners',
  'quiz.m2.q1.explanation': 'Using condoms correctly and consistently during sexual contact is one of the most effective ways to prevent HIV transmission. Condoms create a barrier that prevents the exchange of bodily fluids.',
  
  'quiz.m2.q2.question': 'Apa itu PrEP?',
  'quiz.m2.q2.option1': 'Pengobatan untuk orang yang sudah memiliki HIV',
  'quiz.m2.q2.option2': 'Vaksin melawan HIV',
  'quiz.m2.q2.option3': 'Obat yang diminum oleh orang berisiko HIV untuk mencegah terinfeksi HIV',
  'quiz.m2.q2.option4': 'Tes untuk menentukan apakah seseorang telah terpapar HIV',
  'quiz.m2.q2.explanation': 'PrEP (Pre-Exposure Prophylaxis) adalah obat yang diminum oleh orang-orang yang berisiko tinggi tertular HIV untuk mencegah infeksi. Bila diminum sesuai petunjuk, PrEP sangat efektif mencegah infeksi HIV.',
  
  // Game UI text
  'game.correct': 'Correct!',
  'game.incorrect': 'Incorrect',
  'game.selectAnswer': 'Select an answer to continue',
  'game.clickNext': 'Click Next to continue',
  'game.next': 'Next',
  'game.finish': 'Finish',
  'game.question': 'Question',
  'game.of': 'of',
  'game.score': 'Score',
  'game.congratulations': 'Congratulations!',
  'game.keepLearning': 'Keep Learning!',
  'game.youScored': 'You scored',
  'game.onThisQuiz': 'on this quiz.',
  'game.successMessage': 'Great job! You\'ve successfully completed this module.',
  'game.failMessage': 'You need to score at least 60% to complete this module. Try reviewing the content and taking the quiz again.',
  'game.retryQuiz': 'Retry Quiz',
  
  // Word Game
  'wordgame.title': 'Unscramble the Word',
  'wordgame.instructions': 'Rearrange the letters to form a word related to HIV/AIDS.',
  'wordgame.wordsSolved': 'Words solved',
  'wordgame.clue': 'Clue:',
  'wordgame.yourAnswer': 'Your answer',
  'wordgame.checkAnswer': 'Check Answer',
  'wordgame.hint': 'Hint',
  'wordgame.correct': 'Correct! Well done!',
  'wordgame.incorrect': 'Not quite right. Try again!',
  'wordgame.hintText': 'The first letter is',
  'wordgame.nextWord': 'Next Word',
  'wordgame.completeGame': 'Complete Game',
  'wordgame.complete': 'Word Game Complete!',
  'wordgame.success': 'You\'ve successfully unscrambled all the words. Great job!',
  'wordgame.playAgain': 'Play Again',
  'wordgame.continue': 'Continue',
  
  // Word Game Module 1
  'wordgame.m1.word1': 'VIRUS',
  'wordgame.m1.word2': 'IMMUNE',
  'wordgame.m1.word3': 'PENULARAN',
  'wordgame.m1.word4': 'PENCEGAHAN',
  'wordgame.m1.word5': 'ANTIBODI',
  'wordgame.m1.word6': 'TES',
  'wordgame.m1.word7': 'DARAH',
  'wordgame.m1.word8': 'INFEKSI',
  'wordgame.m1.clue1': 'Mikroorganisme yang menginfeksi sel dan dapat menyebabkan penyakit',
  'wordgame.m1.clue2': 'Sistem tubuh yang diserang HIV',
  'wordgame.m1.clue3': 'Bagaimana HIV berpindah dari satu orang ke orang lain',
  'wordgame.m1.clue4': 'Tindakan yang diambil untuk menghentikan infeksi HIV',
  'wordgame.m1.clue5': 'Protein yang diproduksi oleh tubuh untuk melawan infeksi',
  'wordgame.m1.clue6': 'Cara untuk menentukan apakah seseorang memiliki HIV',
  'wordgame.m1.clue7': 'Cairan tubuh yang dapat menularkan HIV',
  'wordgame.m1.clue8': 'Proses HIV memasuki tubuh',
  
  // Simulation Game
  'simulation.title': 'Decision Simulation',
  'simulation.scenario': 'Scenario',
  'simulation.of': 'of',
  'simulation.whatWouldYouDo': 'What would you do?',
  'simulation.goodChoice': 'Good choice!',
  'simulation.feedback': 'Consider this feedback:',
  'simulation.betterApproach': 'Better approach:',
  'simulation.nextScenario': 'Next Scenario',
  'simulation.finish': 'Finish',
  'simulation.complete': 'Simulation Complete',
  'simulation.success': 'You\'ve successfully completed all the scenarios in this simulation.',
  'simulation.continue': 'Continue',
  
  // Simulation module 2
  'simulation.m2.s1.scenario': 'You\'re about to have sex with a new partner. What\'s the most important step to protect yourself?',
  'simulation.m2.s1.option1': 'Assume they don\'t have any STIs since they look healthy',
  'simulation.m2.s1.option2': 'Use protection and discuss sexual health history',
  'simulation.m2.s1.option3': 'Take antibiotics after sex just in case',
  'simulation.m2.s1.option4': 'There\'s no need to worry if you only do it once',
  'simulation.m2.s1.consequence1': 'Appearances tell you nothing about someone\'s HIV status. Many people with HIV look and feel completely healthy.',
  'simulation.m2.s1.consequence2': 'This is the safest approach. Using condoms and having an open conversation about testing and sexual health protects both of you.',
  'simulation.m2.s1.consequence3': 'Antibiotics don\'t prevent or treat HIV, and taking them unnecessarily contributes to antibiotic resistance.',
  'simulation.m2.s1.consequence4': 'Even one instance of unprotected sex can lead to HIV transmission if your partner is infected.',
  
  // Matching Game
  'matching.title': 'Match the Terms with Definitions',
  'matching.instruction': 'Click on a term, then click on its matching definition.',
  'matching.matches': 'Matches',
  'matching.loading': 'Loading terms and definitions...',
  'matching.terms': 'Terms',
  'matching.definitions': 'Definitions',
  'matching.resetGame': 'Reset Game',
  'matching.congrats': 'Great job!',
  'matching.success': 'You\'ve successfully matched all the terms with their definitions.',
  'matching.playAgain': 'Play Again',
  'matching.continue': 'Continue',
  
  // Error messages
  'error.generic': 'An error occurred. Please try again.',
  'error.login': 'Unable to log in. Please check your credentials and try again.',
  'error.network': 'Network error. Please check your connection and try again.',
  'error.pageNotFound': 'Page not found.',
  'error.unauthorized': 'You do not have permission to access this resource.',
  'error.sessionExpired': 'Your session has expired. Please log in again.',
  
  // Success messages
  'success.login': 'Login successful!',
  'success.logout': 'You have been successfully logged out.',
  'success.profileUpdate': 'Profile updated successfully.',
  'success.moduleComplete': 'Module completed successfully!',
  
  // Buttons & Actions
  'button.save': 'Save',
  'button.cancel': 'Cancel',
  'button.confirm': 'Confirm',
  'button.edit': 'Edit',
  'button.delete': 'Delete',
  'button.back': 'Back',
  'button.continue': 'Continue',
  'button.submit': 'Submit',
  'button.reset': 'Reset',
  'button.getStarted': 'Get Started',
  'button.learnMore': 'Learn More',
};

// Indonesian translations
const idTranslations: Record<string, string> = {
  // Navigation
  'nav.home': 'Beranda',
  'nav.meetCreator': 'Tentang Pembuat',
  'nav.signIn': 'Masuk',
  'nav.logout': 'Keluar',
  'nav.dashboard': 'Dasbor',
  'nav.profile': 'Profil',
  
  // Login Page
  'login.title': 'Masuk',
  'login.description': 'Masuk untuk mengakses HIV Quest dan lanjutkan perjalanan pendidikan Anda.',
  'login.welcome': 'Selamat Datang',
  'login.signIn': 'Masuk untuk mengakses HIV Quest',
  'login.loginRequired': 'Silakan masuk untuk melanjutkan perjalanan HIV Quest Anda.',
  'login.googleSignIn': 'Masuk dengan Google',
  'login.agreement': 'Dengan masuk, Anda menyetujui',
  'login.terms': 'Ketentuan Layanan',
  'login.privacy': 'Kebijakan Privasi',
  'login.disclaimer': 'Sumber informasi edukasi ini dirancang untuk memberikan informasi akurat tentang HIV kepada remaja. Semua informasi bersumber dari organisasi kesehatan terkemuka.',
  
  // Footer
  'footer.resources': 'Sumber Daya',
  'footer.support': 'Dukungan',
  'footer.contactUs': 'Hubungi Kami',
  'footer.rights': 'Seluruh hak cipta dilindungi.',
  'footer.disclaimer': 'Sumber informasi edukasi ini hanya untuk tujuan informasi dan bukan pengganti saran medis profesional.',
  
  // Contact Form
  'contact.title': 'Hubungi Kami',
  'contact.description': 'Isi formulir di bawah ini dan klik "Buat Email" untuk membuka Gmail dengan pesan yang telah diisi.',
  'contact.name': 'Nama Anda',
  'contact.email': 'Alamat Email',
  'contact.subject': 'Subjek',
  'contact.message': 'Pesan',
  'contact.send': 'Buat Email',
  'contact.sending': 'Membuka Gmail...',
  'contact.thankYou': 'Terima Kasih!',
  'contact.success': 'Jendela Gmail telah dibuka di tab baru. Silakan periksa dan kirim email Anda dari sana.',
  'contact.another': 'Kirim Pesan Lain',
  
  // About Creator
  'creator.title': 'Tentang Pembuat',
  'creator.nursing': 'Mahasiswa Keperawatan',
  'creator.metaDescription': 'Pelajari tentang Juwita Farah Shamlotta, pencipta platform edukasi HIV Quest.',
  'creator.goBack': 'Kembali',
  'creator.instagramProfile': 'Profil Instagram',
  'creator.sendEmail': 'Kirim email',
  'creator.paragraph1': 'Saya berusia 21 tahun dan saat ini seorang mahasiswa semester 6 dalam program Sarjana Keperawatan. Saya memiliki passion yang kuat terhadap pendidikan dan senang berkontribusi pada pengalaman belajar yang bermakna dan berdampak.',
  'creator.paragraph2': 'Sebagai bagian dari tugas akhir saya, saya melakukan penelitian yang berfokus pada pendidikan kesehatan. Untuk mendukung hal ini, saya mengusulkan ide untuk membuat permainan edukatif sebagai media pembelajaran tentang HIV/AIDS, yang bertujuan untuk meningkatkan kesadaran dan pengetahuan—terutama di kalangan remaja.',
  'creator.paragraph3': 'Dengan dukungan berharga dari teman saya',
  'creator.paragraph3Continued': 'seorang Software Engineer yang berbakat, saya dapat mewujudkan ide ini. Dia membantu mengembangkan permainan interaktif ini untuk memastikan bahwa permainan ini informatif dan menarik.',
  'creator.paragraph4': 'Media edukasi ini dibuat untuk membantu menginformasikan dan memberdayakan kaum muda dengan cara yang menyenangkan dan mudah diakses, sambil juga mendukung upaya untuk mengurangi stigma dan mempromosikan komunitas yang lebih sehat dan lebih terinformasi.',
  'creator.contactPrompt': 'Jangan ragu untuk menghubungi melalui Instagram atau email jika Anda memiliki pertanyaan atau ingin terhubung!',
  
  // Home Page
  'home.title': 'HIV Quest - Perjalanan Menuju Pengetahuan',
  'home.subtitle': 'Belajar tentang HIV melalui edukasi interaktif',
  'home.getStarted': 'Mulai',
  'home.learnMore': 'Pelajari Lebih Lanjut',
  'home.welcomeMessage': 'Selamat datang di HIV Quest, panduan interaktif Anda untuk memahami HIV/AIDS. Jelajahi modul pendidikan kami, ikuti kuis, dan pelajari fakta penting tentang pencegahan, pengobatan, dan dukungan HIV.',
  
  // Home Features Section
  'home.features.title': 'Bagaimana Anda Akan Belajar',
  'home.features.subtitle': 'Platform kami menawarkan beberapa cara untuk berinteraksi dengan konten dan meningkatkan pemahaman Anda tentang HIV/AIDS.',
  'home.features.educational.title': 'Konten Edukatif',
  'home.features.educational.description': 'Akses informasi berbasis bukti tentang HIV/AIDS yang disajikan dalam modul yang jelas dan mudah dipahami.',
  'home.features.interactive.title': 'Pembelajaran Interaktif',
  'home.features.interactive.description': 'Berinteraksi dengan permainan, kuis, dan simulasi yang memperkuat konsep kunci dengan cara yang menyenangkan.',
  'home.features.progress.title': 'Pantau Kemajuan',
  'home.features.progress.description': 'Pantau perjalanan belajar Anda dan lihat bagaimana pengetahuan Anda meningkat seiring waktu.',
  'home.features.stigma.title': 'Melawan Stigma',
  'home.features.stigma.description': 'Pelajari cara mengatasi kesalahpahaman dan mengurangi stigma seputar HIV/AIDS di komunitas Anda.',
  
  // Home CTA Section
  'home.cta.title': 'Siap Memulai Perjalanan Belajar Anda?',
  'home.cta.description': 'Daftar hari ini dan mulai jelajahi konten pendidikan interaktif kami tentang kesadaran dan pencegahan HIV/AIDS.',
  
  // Home Modules Section
  'home.modules.title': 'Jelajahi Modul Pembelajaran Kami',
  'home.modules.subtitle': 'Setiap modul membahas aspek-aspek penting pendidikan HIV/AIDS, dari dasar hingga topik lanjutan.',
  
  // Dashboard
  'dashboard.title': 'Dasbor Pembelajaran Anda',
  'dashboard.welcome': 'Selamat datang kembali',
  'dashboard.continueLearn': 'Lanjutkan Pembelajaran',
  'dashboard.startNewModule': 'Mulai Modul Baru',
  'dashboard.progress': 'Kemajuan Anda',
  'dashboard.completed': 'Selesai',
  'dashboard.inProgress': 'Dalam Proses',
  'dashboard.notStarted': 'Belum Dimulai',
  'dashboard.moreModules': 'Modul lainnya akan segera hadir!',
  'dashboard.moreModulesDesc': 'Kami sedang mengembangkan konten pembelajaran tambahan untuk meningkatkan perjalanan pendidikan Anda.',
  'dashboard.achievements': 'Pencapaian Anda',
  'dashboard.achievementsDesc': 'Selamat atas pencapaian Anda! Setiap lencana mewakili modul yang telah Anda selesaikan.',
  'dashboard.noAchievements': 'Belum ada pencapaian',
  'dashboard.noAchievementsDesc': 'Selesaikan modul untuk mendapatkan lencana pencapaian dan lacak kemajuan pembelajaran Anda.',
  
  // Activities - Combined section to avoid duplicates
  'activities.tab': 'Aktivitas',
  'activities.continueToActivities': 'Lanjutkan ke Aktivitas',
  'activities.backToActivities': 'Kembali ke Aktivitas',
  'activities.matchingGame.title': 'Permainan Mencocokkan',
  'activities.matchingGame.description': 'Cocokkan istilah dengan definisinya untuk menguji pengetahuan Anda.',
  'activities.matchingGame.start': 'Mulai Permainan',
  'activities.wordGame.title': 'Permainan Kata',
  'activities.wordGame.description': 'Susun kata-kata yang terkait dengan topik modul ini.',
  'activities.wordGame.start': 'Mulai Permainan',
  'activities.simulation.title': 'Simulasi Keputusan',
  'activities.simulation.description': 'Latih membuat keputusan yang tepat dalam skenario realistis.',
  'activities.simulation.start': 'Mulai Simulasi',
  'activities.quiz.title': 'Kuis Modul',
  'activities.quiz.description': 'Uji pengetahuan Anda dengan kuis yang mencakup semua topik dalam modul ini.',
  'activities.quiz.requirement': 'Skor setidaknya 60% untuk membuka modul berikutnya',
  'activities.quiz.start': 'Ikuti Kuis',
  
  // Modules
  'module.start': 'Mulai Modul',
  'module.continue': 'Lanjutkan',
  'module.complete': 'Selesai',
  'module.next': 'Selanjutnya',
  'module.previous': 'Sebelumnya',
  'module.finishModule': 'Selesaikan Modul',
  'module.duration': 'Durasi',
  'module.minutes': 'menit',
  'module.difficulty': 'Tingkat Kesulitan',
  'module.beginner': 'Pemula',
  'module.intermediate': 'Menengah',
  'module.advanced': 'Lanjutan',
  'module.content': 'Konten',
  
  // Module 1: Dasar-dasar HIV
  'module1.title': 'Dasar-dasar HIV',
  'module1.description': 'Pelajari dasar-dasar HIV, bagaimana virus ini mempengaruhi tubuh, dan perbedaan antara HIV dan AIDS.',
  'module1.section1.title': 'Apa itu HIV?',
  'module1.section1.content': 'HIV (Human Immunodeficiency Virus) adalah virus yang menyerang sistem kekebalan tubuh, khususnya sel CD4 (sel T), yang membantu sistem kekebalan tubuh melawan infeksi.',
  'module1.section2.title': 'Bagaimana HIV Menyebar',
  'module1.section2.content': 'HIV dapat ditularkan melalui cairan tubuh tertentu termasuk darah, air mani, cairan pra-mani, cairan rektal, cairan vagina, dan air susu ibu. Cairan-cairan ini harus bersentuhan dengan selaput lendir atau jaringan yang rusak atau disuntikkan langsung ke dalam aliran darah agar penularan terjadi.',
  'module1.section3.title': 'Perbedaan Antara HIV dan AIDS',
  'module1.section3.content': 'HIV adalah virus yang menyebabkan AIDS. AIDS (Acquired Immunodeficiency Syndrome) adalah fase paling parah dari infeksi HIV. Orang dengan AIDS memiliki sistem kekebalan tubuh yang rusak parah sehingga mereka mendapat peningkatan jumlah penyakit serius, yang disebut infeksi oportunistik.',
  'module1.section4.title': 'Pengujian dan Diagnosis',
  'module1.section4.content': 'Tes HIV adalah satu-satunya cara untuk mengetahui dengan pasti apakah seseorang memiliki HIV. Ada beberapa jenis tes yang tersedia, termasuk tes antibodi, tes antigen/antibodi, dan tes asam nukleat (NAT). Sebagian besar tes dapat mendeteksi HIV 2-3 minggu setelah infeksi, meskipun beberapa mungkin membutuhkan waktu lebih lama untuk menunjukkan hasil positif.',
  
  // Module 2: Pencegahan & Keamanan
  'module2.title': 'Pencegahan & Keamanan',
  'module2.description': 'Temukan strategi efektif untuk mencegah penularan HIV dan memahami praktik yang lebih aman.',
  'module2.section1.title': 'Metode Pencegahan',
  'module2.section1.content': 'Ada beberapa cara untuk mencegah penularan HIV termasuk menggunakan kondom, mengonsumsi PrEP (profilaksis pra-paparan), melakukan tes secara teratur, dan menghindari berbagi jarum atau peralatan suntik lainnya.',
  'module2.section2.title': 'PrEP dan PEP',
  'module2.section2.content': 'PrEP adalah pil harian yang dapat mencegah infeksi HIV. PEP (profilaksis pasca-paparan) adalah pengobatan yang dapat mencegah infeksi HIV jika dimulai dalam waktu 72 jam setelah kemungkinan terpapar virus.',
  'module2.section3.title': 'HIV dan Populasi Rentan',
  'module2.section3.content': 'Populasi tertentu mungkin berisiko lebih tinggi terkena HIV karena berbagai faktor sosial, ekonomi, dan perilaku. Memahami kerentanan ini membantu menciptakan strategi pencegahan yang lebih efektif.',
  
  // Module 3: Pengujian & Pengobatan
  'module3.title': 'Pengujian & Pengobatan',
  'module3.description': 'Pelajari tentang pilihan tes HIV, apa yang diharapkan, dan pendekatan pengobatan saat ini.',
  'module3.section1.title': 'Jenis Tes HIV',
  'module3.section1.content': 'Ada beberapa jenis tes HIV termasuk tes antibodi, tes antigen/antibodi, dan tes asam nukleat (NAT). Tes-tes ini dapat dilakukan pada darah, cairan oral, atau urin tergantung pada jenis tes tertentu.',
  'module3.section2.title': 'Pilihan Pengobatan',
  'module3.section2.content': 'Meskipun tidak ada obat untuk HIV, virus ini dapat dikontrol secara efektif dengan perawatan medis yang tepat. Terapi antiretroviral (ART) adalah penggunaan obat HIV untuk mengobati infeksi HIV. ART membantu orang dengan HIV hidup lebih lama, lebih sehat dan mengurangi risiko penularan HIV.',
  'module3.section3.title': 'Hidup dengan HIV',
  'module3.section3.content': 'Dengan pengobatan yang tepat, orang dengan HIV dapat hidup lama dan sehat. Perawatan medis reguler, mengonsumsi obat-obatan sebagaimana mestinya, dan menjaga kesehatan secara keseluruhan melalui nutrisi yang tepat, olahraga, dan perawatan kesehatan mental adalah komponen penting untuk hidup baik dengan HIV.',
  'module3.section4.title': 'Undetectable = Untransmittable (U=U)',
  'module3.section4.content': 'Ketika orang dengan HIV mengonsumsi obat mereka sesuai resep dan mempertahankan viral load yang tidak terdeteksi, mereka secara efektif tidak berisiko menularkan HIV secara seksual kepada pasangan mereka yang HIV-negatif. Konsep ini, yang dikenal sebagai U=U, telah mengubah cara kita berpikir tentang pengobatan dan pencegahan HIV.',
  
  // Module 4: Stigma dan Diskriminasi
  'module4.title': 'Stigma dan Diskriminasi',
  'module4.description': 'Pelajari tentang dampak stigma dan diskriminasi terhadap orang yang hidup dengan HIV dan strategi untuk melawan sikap berbahaya ini.',
  'module4.section1.title': 'Memahami Stigma HIV',
  'module4.section1.content': 'Stigma HIV mengacu pada sikap dan keyakinan negatif tentang orang yang hidup dengan HIV. Ini dapat menyebabkan diskriminasi, yang merupakan perlakuan tidak adil terhadap orang berdasarkan status HIV mereka.',
  'module4.section2.title': 'Dampak Stigma',
  'module4.section2.content': 'Stigma dapat menyebabkan isolasi, kecemasan, depresi, dan keengganan untuk melakukan tes atau pengobatan. Ini mempengaruhi individu, keluarga, dan komunitas dan dapat menjadi hambatan utama untuk pencegahan dan perawatan HIV.',
  'module4.section3.title': 'Mengatasi Kesalahpahaman',
  'module4.section3.content': 'Banyak sikap yang menstigmatisasi didasarkan pada informasi yang ketinggalan zaman atau kesalahpahaman tentang bagaimana HIV ditularkan dan apa artinya hidup dengan HIV saat ini. Pendidikan dan informasi yang akurat adalah kunci untuk melawan stigma.',
  'module4.section4.title': 'Menciptakan Lingkungan yang Mendukung',
  'module4.section4.content': 'Komunitas, fasilitas kesehatan, dan tempat kerja dapat mengambil langkah-langkah untuk mengurangi stigma dan menciptakan lingkungan yang mendukung bagi orang yang hidup dengan HIV. Ini termasuk menerapkan kebijakan anti-diskriminasi dan memberikan pendidikan dan pelatihan.',
  
  // Module 5: Hubungan Sehat
  'module5.title': 'Hubungan Sehat',
  'module5.description': 'Jelajahi cara menjaga hubungan yang sehat dan berkomunikasi secara efektif tentang status HIV, pengujian, dan metode pencegahan.',
  'module5.section1.title': 'Komunikasi dalam Hubungan',
  'module5.section1.content': 'Komunikasi yang terbuka dan jujur sangat penting dalam hubungan apa pun, terutama saat membahas topik sensitif seperti kesehatan seksual dan status HIV. Mempelajari keterampilan komunikasi yang efektif dapat membantu membangun kepercayaan dan pemahaman.',
  'module5.section2.title': 'Pengungkapan dan Privasi',
  'module5.section2.content': 'Memutuskan kapan dan bagaimana mengungkapkan status HIV adalah pilihan pribadi. Memahami hak Anda atas privasi dan mengembangkan strategi untuk pengungkapan dapat membantu menavigasi percakapan sensitif ini.',
  'module5.section3.title': 'Menegosiasikan Seks yang Lebih Aman',
  'module5.section3.content': 'Mempelajari cara mendiskusikan dan menegosiasikan praktik seks yang lebih aman dengan pasangan adalah keterampilan penting yang dapat membantu mencegah penularan HIV dan mempromosikan kesehatan seksual.',
  'module5.section4.title': 'Mendukung Pasangan',
  'module5.section4.content': 'Apakah Anda atau pasangan Anda hidup dengan HIV, saling mendukung melalui pengujian, pengobatan, dan menjaga kesehatan adalah aspek penting dari hubungan yang peduli.',
  
  // Quizzes
  'quiz.start': 'Mulai Kuis',
  'quiz.next': 'Pertanyaan Selanjutnya',
  'quiz.previous': 'Pertanyaan Sebelumnya',
  'quiz.submit': 'Kirim Jawaban',
  'quiz.correct': 'Benar!',
  'quiz.incorrect': 'Salah',
  'quiz.review': 'Tinjau Jawaban',
  'quiz.tryAgain': 'Coba Lagi',
  'quiz.score': 'Skor Anda',
  'quiz.outOf': 'dari',
  'quiz.selectAnswer': 'Silakan pilih jawaban',
  'quiz.question': 'Pertanyaan',
  
  // Quiz 1: Dasar-dasar HIV
  'quiz1.title': 'Kuis Dasar-dasar HIV',
  'quiz1.q1': 'Apa kepanjangan dari HIV?',
  'quiz1.q1.a': 'Human Immunodeficiency Virus',
  'quiz1.q1.b': 'Human Immune Virus',
  'quiz1.q1.c': 'Human Infection Virus',
  'quiz1.q1.d': 'High Immune Virus',
  'quiz1.q2': 'Sel mana yang terutama diserang oleh HIV?',
  'quiz1.q2.a': 'Sel CD4 (sel T)',
  'quiz1.q2.b': 'Sel darah merah',
  'quiz1.q2.c': 'Sel hati',
  'quiz1.q2.d': 'Sel otak',
  
  // Quiz Questions - By Module
  'quiz.m1.q1.question': 'Apa kepanjangan dari HIV?',
  'quiz.m1.q1.option1': 'Human Immunodeficiency Virus',
  'quiz.m1.q1.option2': 'Highly Infectious Virus',
  'quiz.m1.q1.option3': 'Human Immune Variant',
  'quiz.m1.q1.option4': 'Health Impaired Virus',
  'quiz.m1.q1.explanation': 'HIV adalah singkatan dari Human Immunodeficiency Virus. Virus ini menyerang sistem kekebalan tubuh, khususnya sel CD4 (sel T), yang membantu sistem kekebalan tubuh melawan infeksi.',
  
  'quiz.m1.q2.question': 'Manakah dari berikut ini yang BUKAN cara penularan HIV?',
  'quiz.m1.q2.option1': 'Melalui kontak seksual',
  'quiz.m1.q2.option2': 'Dengan berbagi makanan atau minuman',
  'quiz.m1.q2.option3': 'Dari ibu ke anak saat melahirkan',
  'quiz.m1.q2.option4': 'Dengan berbagi jarum',
  'quiz.m1.q2.explanation': 'HIV tidak dapat ditularkan dengan berbagi makanan atau minuman, kontak biasa, berpelukan, atau gigitan nyamuk. Virus ini terutama ditularkan melalui cairan tubuh seperti darah, air mani, cairan vagina, dan air susu ibu.',
  
  // Game UI text
  'game.correct': 'Benar!',
  'game.incorrect': 'Salah',
  'game.selectAnswer': 'Pilih jawaban untuk melanjutkan',
  'game.clickNext': 'Klik Selanjutnya untuk melanjutkan',
  'game.next': 'Selanjutnya',
  'game.finish': 'Selesai',
  'game.question': 'Pertanyaan',
  'game.of': 'dari',
  'game.score': 'Skor',
  'game.congratulations': 'Selamat!',
  'game.keepLearning': 'Terus Belajar!',
  'game.youScored': 'Anda mencetak',
  'game.onThisQuiz': 'pada kuis ini.',
  'game.successMessage': 'Kerja bagus! Anda telah berhasil menyelesaikan modul ini.',
  'game.failMessage': 'Anda perlu mencetak setidaknya 60% untuk menyelesaikan modul ini. Coba tinjau konten dan ambil kuis lagi.',
  'game.retryQuiz': 'Coba Kuis Lagi',
  
  // Word Game
  'wordgame.title': 'Susun Kata',
  'wordgame.instructions': 'Susun huruf-huruf untuk membentuk kata yang terkait dengan HIV/AIDS.',
  'wordgame.wordsSolved': 'Kata yang diselesaikan',
  'wordgame.clue': 'Petunjuk:',
  'wordgame.yourAnswer': 'Jawaban Anda',
  'wordgame.checkAnswer': 'Periksa Jawaban',
  'wordgame.hint': 'Petunjuk',
  'wordgame.correct': 'Benar! Kerja bagus!',
  'wordgame.incorrect': 'Tidak cukup benar. Coba lagi!',
  'wordgame.hintText': 'Huruf pertama adalah',
  'wordgame.nextWord': 'Kata Selanjutnya',
  'wordgame.completeGame': 'Selesaikan Permainan',
  'wordgame.complete': 'Permainan Kata Selesai!',
  'wordgame.success': 'Anda telah berhasil menyusun semua kata. Kerja bagus!',
  'wordgame.playAgain': 'Main Lagi',
  'wordgame.continue': 'Lanjutkan',
  
  // Simulation Game
  'simulation.title': 'Simulasi Keputusan',
  'simulation.scenario': 'Skenario',
  'simulation.of': 'dari',
  'simulation.whatWouldYouDo': 'Apa yang akan Anda lakukan?',
  'simulation.goodChoice': 'Pilihan yang baik!',
  'simulation.feedback': 'Pertimbangkan umpan balik ini:',
  'simulation.betterApproach': 'Pendekatan yang lebih baik:',
  'simulation.nextScenario': 'Skenario Selanjutnya',
  'simulation.finish': 'Selesai',
  'simulation.complete': 'Simulasi Selesai',
  'simulation.success': 'Anda telah berhasil menyelesaikan semua skenario dalam simulasi ini.',
  'simulation.continue': 'Lanjutkan',
  
  // Matching Game
  'matching.title': 'Cocokkan Istilah dengan Definisi',
  'matching.instruction': 'Klik pada istilah, lalu klik pada definisi yang cocok.',
  'matching.matches': 'Kecocokan',
  'matching.loading': 'Memuat istilah dan definisi...',
  'matching.terms': 'Istilah',
  'matching.definitions': 'Definisi',
  'matching.resetGame': 'Atur Ulang Permainan',
  'matching.congrats': 'Kerja bagus!',
  'matching.success': 'Anda telah berhasil mencocokkan semua istilah dengan definisinya.',
  'matching.playAgain': 'Main Lagi',
  'matching.continue': 'Lanjutkan',
  
  // Error messages
  'error.generic': 'Terjadi kesalahan. Silakan coba lagi.',
  'error.login': 'Tidak dapat masuk. Silakan periksa kredensial Anda dan coba lagi.',
  'error.network': 'Kesalahan jaringan. Silakan periksa koneksi Anda dan coba lagi.',
  'error.pageNotFound': 'Halaman tidak ditemukan.',
  'error.unauthorized': 'Anda tidak memiliki izin untuk mengakses sumber ini.',
  'error.sessionExpired': 'Sesi Anda telah berakhir. Silakan masuk lagi.',
  
  // Success messages
  'success.login': 'Login berhasil!',
  'success.logout': 'Anda telah berhasil keluar.',
  'success.profileUpdate': 'Profil berhasil diperbarui.',
  'success.moduleComplete': 'Modul berhasil diselesaikan!',
  
  // Buttons & Actions
  'button.save': 'Simpan',
  'button.cancel': 'Batal',
  'button.confirm': 'Konfirmasi',
  'button.edit': 'Edit',
  'button.delete': 'Hapus',
  'button.back': 'Kembali',
  'button.continue': 'Lanjutkan',
  'button.submit': 'Kirim',
  'button.reset': 'Atur Ulang',
  'button.getStarted': 'Mulai',
  'button.learnMore': 'Pelajari Lebih Lanjut',
};