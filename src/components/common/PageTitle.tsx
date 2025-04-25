import React, { useEffect } from 'react';

interface PageTitleProps {
  title: string;
  description?: string;
}

/**
 * Component to manage page titles and meta descriptions
 * Usage: <PageTitle title="Page Name" description="Optional description" />
 */
const PageTitle: React.FC<PageTitleProps> = ({ title, description }) => {
  useEffect(() => {
    // Update document title
    const prevTitle = document.title;
    document.title = title ? `${title} – HIV Quest` : 'HIV Quest';
    
    // Update meta description if provided
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      
      metaDescription.setAttribute('content', description);
    }
    
    // Clean up when component unmounts
    return () => {
      document.title = prevTitle;
    };
  }, [title, description]);
  
  // This component doesn't render anything visible
  return null;
};

export default PageTitle; 