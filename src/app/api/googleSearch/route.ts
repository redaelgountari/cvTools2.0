import { NextRequest, NextResponse } from 'next/server';

// Define interfaces for type safety
interface SearchFilters {
  experience?: string;
  location?: string;
  jobType?: string;
  publicationDate?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { query, filters = {}, page = 1 } = await request.json() as { 
      query: string; 
      filters: SearchFilters;
      page?: number;
    };
    
    const API_KEY = process.env.GOOGLE_API;
    const SEARCH_ENGINE_ID = process.env.ID_MOTEUR_RECHERCHE;
    const RESULTS_PER_PAGE = 10;

    // Validate API credentials
    if (!API_KEY || !SEARCH_ENGINE_ID) {
      return NextResponse.json(
        { error: "Missing API credentials" },
        { status: 500 }
      );
    }

    // Validate query
    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Query parameter is required" },
        { status: 400 }
      );
    }

    // Construct advanced query with intelligent filtering
    const baseQuery = "web developer jobs";
    const excludedTerms = "-reddit -discussion -forum -blog -news";
    
    // Job site filters with international and local job platforms
    const siteFilters = [
      "indeed.com", 
      "linkedin.com", 
      "ziprecruiter.com", 
      "glassdoor.com", 
      "monster.com",
      "arc.dev", 
      "alwadifa-maroc.com", 
      "dreamjob.ma", 
      "anapec.org", 
      "rekrute.com", 
      "emploi.ma", 
      "bayt.com",
      "emploi-public.ma"
    ].map(site => `site:${site}`).join(" OR ");

    // Apply experience level filter
    const experienceFilter = filters.experience 
      ? {
          "entry": "entry level OR junior OR beginner",
          "mid": "mid level OR intermediate",
          "senior": "senior level OR expert",
          "internship": "internship OR intern"
        }[filters.experience] || ""
      : "";

    // Apply job type filter
    const jobTypeFilter = filters.jobType 
      ? {
          "full-time": '"full time" OR "full-time"',
          "part-time": '"part time" OR "part-time"',
          "contract": "contract OR freelance",
          "remote": "remote OR work from home",
          "hybrid": "hybrid OR flexible"
        }[filters.jobType] || ""
      : "";

    const publicationDateFilter = filters.publicationDate
    ? {
        "24h": "after:1d",
        "3d": "after:3d",
        "7d": "after:7d",
        "30d": "after:30d",
        "60d": "after:60d",
        "90d": "after:90d"
      }[filters.publicationDate] || ""
    : "";
    
    const locationFilter = filters.location 
      ? `"${filters.location}"` 
      : "";

    const queryComponents = [
      baseQuery,
      query,
      excludedTerms,
      `(${siteFilters})`,
      experienceFilter,
      jobTypeFilter,
      locationFilter,
      publicationDateFilter
    ].filter(Boolean).join(" ");

    const url = new URL("https://www.googleapis.com/customsearch/v1");
    url.searchParams.append("key", API_KEY);
    url.searchParams.append("cx", SEARCH_ENGINE_ID);
    url.searchParams.append("q", queryComponents);
    
    url.searchParams.append("num", String(RESULTS_PER_PAGE));  
    url.searchParams.append("start", String((page - 1) * RESULTS_PER_PAGE + 1));
    url.searchParams.append("sort", "date");

    console.log("Final Search URL:", url.toString());

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Google Search API Error:", errorData);
      
      return NextResponse.json(
        { 
          error: errorData.error?.message || "Search request failed",
          details: errorData 
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json({ 
      results: data.items || [],
      searchInformation: data.searchInformation,
      query: queryComponents,
      pagination: {
        currentPage: page,
        resultsPerPage: RESULTS_PER_PAGE,
        totalResults: parseInt(data.searchInformation?.totalResults || '0'),
        totalPages: Math.ceil(parseInt(data.searchInformation?.totalResults || '0') / RESULTS_PER_PAGE)
      }
    }, { 
      status: 200,
      headers: { 
        'Cache-Control': 'no-store, max-age=0' 
      }
    });

  } catch (err) {
    console.error("Search API Unexpected Error:", err);
    
    return NextResponse.json(
      { 
        error: "Unexpected error processing search",
        details: err instanceof Error ? err.message : String(err)
      },
      { status: 500 }
    );
  }
}