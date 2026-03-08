import { useState, useCallback, useEffect } from "react";

export interface CustomTopic {
  id: string;
  name: string;
  completed: boolean;
}

const STORAGE_KEY = "thookam_completed_topics";
const CUSTOM_TOPICS_KEY = "thookam_custom_topics";

export function useStudyProgress() {
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch { return new Set(); }
  });

  const [customTopics, setCustomTopics] = useState<CustomTopic[]>(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_TOPICS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...completedTopics]));
  }, [completedTopics]);

  useEffect(() => {
    localStorage.setItem(CUSTOM_TOPICS_KEY, JSON.stringify(customTopics));
  }, [customTopics]);

  const toggleTopic = useCallback((topicId: string) => {
    setCompletedTopics(prev => {
      const next = new Set(prev);
      if (next.has(topicId)) next.delete(topicId);
      else next.add(topicId);
      return next;
    });
  }, []);

  const isCompleted = useCallback((topicId: string) => completedTopics.has(topicId), [completedTopics]);

  const addCustomTopic = useCallback((name: string) => {
    const topic: CustomTopic = { id: `custom_${Date.now()}`, name, completed: false };
    setCustomTopics(prev => [...prev, topic]);
    return topic;
  }, []);

  const toggleCustomTopic = useCallback((id: string) => {
    setCustomTopics(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }, []);

  const removeCustomTopic = useCallback((id: string) => {
    setCustomTopics(prev => prev.filter(t => t.id !== id));
  }, []);

  const getSubjectProgress = useCallback((chapterIds: string[]) => {
    if (chapterIds.length === 0) return 0;
    const done = chapterIds.filter(id => completedTopics.has(id)).length;
    return Math.round((done / chapterIds.length) * 100);
  }, [completedTopics]);

  const completedCount = completedTopics.size + customTopics.filter(t => t.completed).length;
  const totalCustom = customTopics.length;

  return {
    completedTopics,
    toggleTopic,
    isCompleted,
    customTopics,
    addCustomTopic,
    toggleCustomTopic,
    removeCustomTopic,
    getSubjectProgress,
    completedCount,
    totalCustom,
  };
}
