import React, { createContext, useState, useContext, useEffect } from 'react';
import { collection, query, where, getDocs, doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';
import { Module, UserProgress } from '../types';
import { initialModules } from '../data/moduleData';

interface ModuleContextProps {
  modules: Module[];
  loading: boolean;
  updateProgress: (moduleId: string, score: number) => Promise<void>;
  getModuleProgress: (moduleId: string) => UserProgress | null;
  unlockNextModule: (currentModuleId: string) => Promise<void>;
}

const ModuleContext = createContext<ModuleContextProps>({
  modules: [],
  loading: true,
  updateProgress: async () => {},
  getModuleProgress: () => null,
  unlockNextModule: async () => {},
});

export const useModules = () => useContext(ModuleContext);

export const ModuleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modules, setModules] = useState<Module[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  // Initialize and fetch modules
  useEffect(() => {
    const fetchModules = async () => {
      if (!currentUser) {
        // If not logged in, show modules but locked
        setModules(initialModules.map((module, index) => ({
          ...module,
          unlocked: index === 0, // Only first module unlocked
          completed: false,
          score: 0
        })));
        setLoading(false);
        return;
      }

      try {
        // Get user progress from Firestore
        const progressRef = collection(db, 'users', currentUser.uid, 'progress');
        const progressSnapshot = await getDocs(progressRef);
        
        const progress: UserProgress[] = [];
        progressSnapshot.forEach((doc) => {
          progress.push(doc.data() as UserProgress);
        });
        
        setUserProgress(progress);
        
        // Update modules with progress data
        const updatedModules = initialModules.map((module, index) => {
          const moduleProgress = progress.find(p => p.moduleId === module.id);
          
          // Determine if module should be unlocked
          let unlocked = index === 0; // First module always unlocked
          
          if (index > 0) {
            // Check if previous module was completed with score > 60%
            const prevModuleProgress = progress.find(
              p => p.moduleId === initialModules[index - 1].id
            );
            unlocked = prevModuleProgress?.completed && (prevModuleProgress?.score >= 60) || false;
          }
          
          return {
            ...module,
            unlocked,
            completed: moduleProgress?.completed || false,
            score: moduleProgress?.score || 0
          };
        });
        
        setModules(updatedModules);
      } catch (error) {
        console.error('Error fetching modules:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, [currentUser]);

  // Update progress for a module
  const updateProgress = async (moduleId: string, score: number) => {
    if (!currentUser) return;
    
    try {
      const progressRef = doc(db, 'users', currentUser.uid, 'progress', moduleId);
      const progressSnap = await getDoc(progressRef);
      
      const progressData: UserProgress = {
        moduleId,
        completed: true,
        score,
        lastAttemptDate: new Date()
      };
      
      // Update or create progress document
      if (progressSnap.exists()) {
        await updateDoc(progressRef, progressData);
      } else {
        await setDoc(progressRef, progressData);
      }
      
      // Update local state
      setUserProgress(prev => {
        const existing = prev.findIndex(p => p.moduleId === moduleId);
        if (existing !== -1) {
          const updated = [...prev];
          updated[existing] = progressData;
          return updated;
        }
        return [...prev, progressData];
      });
      
      // Update modules state
      setModules(prev => 
        prev.map(module => 
          module.id === moduleId 
            ? { ...module, completed: true, score } 
            : module
        )
      );
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  // Get progress for a specific module
  const getModuleProgress = (moduleId: string): UserProgress | null => {
    return userProgress.find(p => p.moduleId === moduleId) || null;
  };

  // Unlock the next module after completing current one
  const unlockNextModule = async (currentModuleId: string) => {
    if (!currentUser) return;
    
    try {
      const currentIndex = modules.findIndex(m => m.id === currentModuleId);
      if (currentIndex === -1 || currentIndex >= modules.length - 1) return;
      
      const nextModule = modules[currentIndex + 1];
      
      // Update modules state to unlock next module
      setModules(prev => 
        prev.map(module => 
          module.id === nextModule.id 
            ? { ...module, unlocked: true } 
            : module
        )
      );
    } catch (error) {
      console.error('Error unlocking next module:', error);
    }
  };

  const value = {
    modules,
    loading,
    updateProgress,
    getModuleProgress,
    unlockNextModule
  };

  return (
    <ModuleContext.Provider value={value}>
      {children}
    </ModuleContext.Provider>
  );
};