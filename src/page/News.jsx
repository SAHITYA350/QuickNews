import Wrapper from "../components/Wrapper"
import { useEffect, useState } from "react"
import { useNewsContext } from "../context/NewsContext";

const News = ({className}) => {
   const { news, setNews, fetchNews } = useNewsContext();
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

    useEffect(() => {
       (async () => {
        try {
          setLoading(true);
          setError(null);
          const data = await fetchNews();
          
          if (data?.articles) {
            setNews(data.articles);
          } else {
            setError("No articles found");
          }
        } catch (err) {
          setError("Failed to load news. Please try again later.");
          console.error("News fetch error:", err);
        } finally {
          setLoading(false);
        }
       })()
    }, [])

    // Filter valid news items
    const validNews = news.filter(item => 
      item && 
      (item.title || item.description) && 
      item.urlToImage &&
      item.url
    );

    if (loading) {
      return (
        <Wrapper>
          <div className="flex items-center justify-center min-h-100 mt-8">
            <div className="text-center">
              <span className="loading loading-spinner loading-lg text-primary"></span>
              <p className="mt-4 text-base-content/60">Loading latest news...</p>
            </div>
          </div>
        </Wrapper>
      );
    }

    if (error) {
      return (
        <Wrapper>
          <div className="alert alert-error max-w-2xl mx-auto mt-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        </Wrapper>
      );
    }

    if (validNews.length === 0) {
      return (
        <Wrapper>
          <div className="alert alert-info max-w-2xl mx-auto mt-12">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>No news articles available at the moment.</span>
          </div>
        </Wrapper>
      );
    }
    
  return (
   <Wrapper>
     <div className={`py-6 mt-4 ${className}`}>
       {/* Section Header */}
       <div className="mb-6">
         <h1 className="text-2xl md:text-3xl font-bold mb-2">Latest News</h1>
         <div className="h-1 w-16 bg-primary rounded-full"></div>
       </div>

       {/* Featured Article (First article as hero) */}
       {validNews.length > 0 && (
         <div className="mb-8">
           <FeaturedNewsCard details={validNews[0]} />
         </div>
       )}

       {/* News Grid */}
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
         {validNews.slice(1).map((newsDetails, index) => (
           <NewsCard key={`${newsDetails.url}-${index}`} details={newsDetails} />
         ))}
       </div>
     </div>
   </Wrapper>
  )  
}

const FeaturedNewsCard = ({details}) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return '';
    }
  };

  return (
    <div className="card lg:card-side bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      <figure className="lg:w-1/2 relative overflow-hidden">
        <img
          className="w-full h-full object-cover min-h-75 lg:min-h-100 group-hover:scale-105 transition-transform duration-500"
          src={details?.urlToImage}
          alt={details?.title || 'News image'}
          loading="lazy"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <div className="absolute top-4 left-4">
          <span className="badge badge-primary badge-lg gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Featured
          </span>
        </div>
      </figure>
      <div className="card-body lg:w-1/2 p-6 lg:p-8">
        <div className="flex items-center gap-2 mb-3">
          {details?.source?.name && (
            <span className="badge badge-outline">{details.source.name}</span>
          )}
          {details?.publishedAt && (
            <span className="text-xs text-base-content/60">
              {formatDate(details.publishedAt)}
            </span>
          )}
        </div>
        
        <h2 className="card-title text-xl lg:text-2xl font-bold mb-3 leading-tight">
          {details?.title || 'Untitled Article'}
        </h2>
        
        {details?.description && (
          <p className="text-base-content/80 mb-4 line-clamp-3 text-sm lg:text-base">
            {details.description}
          </p>
        )}
        
        <div className="card-actions justify-end mt-auto pt-4">
          <button 
            className="btn btn-primary gap-2"
            onClick={() => window.open(details?.url, "_blank", "noopener,noreferrer")}
            aria-label="Read full article"
          >
            Read Full Story
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const NewsCard = ({details}) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return '';
    }
  };

  return (
    <div className="card bg-base-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full group">
      <figure className="relative overflow-hidden">
        <img
          className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
          src={details?.urlToImage}
          alt={details?.title || 'News image'}
          loading="lazy"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        {details?.source?.name && (
          <div className="absolute top-2 right-2 badge badge-sm bg-base-100/90 backdrop-blur-sm border-0">
            {details.source.name}
          </div>
        )}
      </figure>
      
      <div className="card-body p-4 flex flex-col grow">
        <h2 className="card-title text-base font-bold leading-tight line-clamp-2 mb-2">
          {details?.title || 'Untitled Article'}
        </h2>
        
        {details?.description && (
          <p className="text-sm text-base-content/70 line-clamp-3 mb-3 grow">
            {details.description}
          </p>
        )}
        
        <div className="card-actions flex items-center justify-between mt-auto pt-3 border-t border-base-300">
          {details?.publishedAt && (
            <span className="text-xs text-base-content/60">
              {formatDate(details.publishedAt)}
            </span>
          )}
          <button 
            className="btn btn-outline btn-sm gap-1"
            onClick={() => window.open(details?.url, "_blank", "noopener,noreferrer")}
            aria-label="Read full article"
          >
            Read
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default News;