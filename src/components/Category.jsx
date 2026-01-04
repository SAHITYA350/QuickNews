import { useState } from 'react'
import Wrapper from './Wrapper'
import { useNewsContext } from "../context/NewsContext";

const Category = ({classname}) => {
   const { setNews, fetchNews } = useNewsContext();
   const [activeCategory, setActiveCategory] = useState("general");
   const [loading, setLoading] = useState(false);

    const categories = [
        { id: "general", label: "General", icon: "📰" },
        { id: "business", label: "Business", icon: "💼" },
        { id: "entertainment", label: "Entertainment", icon: "🎬" },
        { id: "health", label: "Health", icon: "⚕️" },
        { id: "science", label: "Science", icon: "🔬" },
        { id: "sports", label: "Sports", icon: "⚽" },
        { id: "technology", label: "Technology", icon: "💻" },
        { id: "world", label: "World", icon: "🌍" }
    ];

    const handleClick = async (categoryId) => {
      if (loading || activeCategory === categoryId) return;
      
      try {
        setLoading(true);
        setActiveCategory(categoryId);
        
        const data = await fetchNews(`/everything?q=${categoryId}`);
        
        if (data?.articles) {
          setNews(data.articles);
        } else {
          console.error("No articles found for category:", categoryId);
          setNews([]);
        }
      } catch (error) {
        console.error("Failed to fetch category news:", error);
        setNews([]);
      } finally {
        setLoading(false);
      }
    }

  return (
    <div className={`bg-base-200/90 backdrop-blur-md sticky top-16 z-30 border-b border-base-300 shadow-sm ${classname}`}>
      <Wrapper>
        <div className="py-2">
          <h2 className="text-3xl font-semibold mb-3">Explore Categories</h2>
          
          {/* Categories Container */}
          <div className="relative">
            {/* Gradient Overlays for scroll indication */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-linear-to-r from-base-200 via-base-200/50 to-transparent z-10 pointer-events-none md:hidden"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-base-200 via-base-200/50 to-transparent z-10 pointer-events-none md:hidden"></div>
            
            {/* Scrollable Categories */}
            <div className="overflow-x-auto scrollbar-hide pb-1">
              <div className="flex gap-2 md:gap-3 min-w-min md:flex-wrap md:justify-center px-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleClick(category.id)}
                    disabled={loading}
                    className={`
                      btn btn-sm
                      shrink-0
                      transition-all duration-300
                      relative
                      ${activeCategory === category.id 
                        ? 'btn-primary shadow-lg scale-105' 
                        : 'btn-ghost hover:btn-primary hover:shadow-md'
                      }
                      ${loading ? 'opacity-50 cursor-wait' : ''}
                      group
                      whitespace-nowrap
                    `}
                  >
                    <span className="text-base group-hover:scale-110 transition-transform">
                      {category.icon}
                    </span>
                    <span className="text-xs font-medium">
                      {category.label}
                    </span>
                    
                    {/* Active Indicator */}
                    {activeCategory === category.id && (
                      <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary-content rounded-full"></span>
                    )}
                    
                    {/* Loading spinner for active category */}
                    {loading && activeCategory === category.id && (
                      <span className="loading loading-spinner loading-xs ml-1"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Wrapper>

      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

export default Category;